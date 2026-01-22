import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Vertex Shader for Atmosphere Glow (Outer)
const atmosphereVertexShader = `
varying vec3 vNormal;
void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Fragment Shader for Atmosphere Glow (Outer)
const atmosphereFragmentShader = `
varying vec3 vNormal;
void main() {
    float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
}
`;

export function EarthSceneV2({ setUseV2 }: { setUseV2?: (v: boolean) => void }) {
    const mountRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const frameIdRef = useRef<number>(0);
    const controlsRef = useRef<OrbitControls | null>(null);

    // Logic Refs
    const sceneRef = useRef<THREE.Scene | null>(null);
    const earthGroupRef = useRef<THREE.Group | null>(null);
    const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
    const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
    const whiteSphereRef = useRef<THREE.Mesh | null>(null);
    const cloudsRef = useRef<THREE.Mesh | null>(null);
    const timeRef = useRef(0); // Start at 0 (Sun in front)

    // React State
    const [debugProgress, setDebugProgress] = useState(0); // Start at 0
    const [rotationVal, setRotationVal] = useState(0);
    const [isSpinning, setIsSpinning] = useState(true);
    const [isSunMoving, setIsSunMoving] = useState(true); // New Control

    const isSpinningRef = useRef(true);
    const isSunMovingRef = useRef(true);
    const rotationRef = useRef(0);
    const isManualRef = useRef(false); // Restore isManualRef

    useEffect(() => { isSpinningRef.current = isSpinning; }, [isSpinning]);
    useEffect(() => { isSunMovingRef.current = isSunMoving; }, [isSunMoving]);

    useEffect(() => {
        if (!mountRef.current) return;

        // CLEANUP PREVIOUS (Strict Mode fix)
        // Instead of blocking init, we clean up the container first
        while (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild);
        }

        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight; // Use container height

        // --- SCENE ---
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
        camera.position.z = 6.5; // Zoomed out for smaller Earth presentation

        // --- RENDERER ---
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(w, h); // No pixel ratio, performance
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.LinearToneMapping; // More vivid than ACES
        renderer.toneMappingExposure = 1.5;
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // --- CONTROLS ---
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enablePan = false;
        controls.enableZoom = false;
        controlsRef.current = controls;

        // --- MANAGE USER INTERACTION ---
        controls.addEventListener('start', () => {
            setIsSpinning(false);
            isManualRef.current = true;
        });

        // --- TEXTURES (Using a potentially brighter map if preferred, but boosting marble) ---
        const loader = new THREE.TextureLoader();
        const map = loader.load('/images/earth_blue_marble.jpg');
        const bump = loader.load('/images/earth_topology.png');
        const lights = loader.load('/images/earth_night.jpg');
        const cloudsMap = loader.load('/images/earth_clouds.png');

        // Ensure proper coloring
        map.colorSpace = THREE.SRGBColorSpace;
        lights.colorSpace = THREE.SRGBColorSpace;

        // --- EARTH GROUP ---
        const earthGroup = new THREE.Group();
        earthGroup.rotation.z = 23.4 * Math.PI / 180;
        earthGroup.position.y = 0.5; // Lowered from 1.0 to 0.5 (~60px shift)
        scene.add(earthGroup);
        earthGroupRef.current = earthGroup;

        // --- 1. EARTH BASE (Shader for Sharp Day/Night + Atmosphere + Night Lights) ---
        const earthMaterial = new THREE.ShaderMaterial({
            uniforms: {
                map: { value: map },
                nightMap: { value: lights },
                sunDirection: { value: new THREE.Vector3(1, 0, 0) },
                atmosphereColor: { value: new THREE.Vector3(0.3, 0.6, 1.0) }
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vWorldNormal;
                varying vec3 vWorldPosition;
                void main() {
                    vUv = uv;
                    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
                    vec4 worldPos = modelMatrix * vec4(position, 1.0);
                    vWorldPosition = worldPos.xyz;
                    gl_Position = projectionMatrix * viewMatrix * worldPos;
                }
            `,
            fragmentShader: `
                uniform sampler2D map;
                uniform sampler2D nightMap;
                uniform vec3 sunDirection;
                uniform vec3 atmosphereColor;
                varying vec2 vUv;
                varying vec3 vWorldNormal;
                varying vec3 vWorldPosition;
                
                void main() {
                    vec3 texColor = texture2D(map, vUv).rgb;
                    vec3 nightColor = texture2D(nightMap, vUv).rgb;
                    
                    // 1. Desaturate Day
                    float gray = dot(texColor, vec3(0.299, 0.587, 0.114));
                    texColor = mix(texColor, vec3(gray), 0.25);

                    // 2. Atmospheric Haze (Day side only mostly)
                    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
                    float fresnel = pow(1.0 - max(0.0, dot(vWorldNormal, viewDir)), 2.5);
                    texColor = mix(texColor, atmosphereColor, 0.1 + fresnel * 0.4);

                    // 3. Lighting Factors
                    float d = dot(vWorldNormal, normalize(sunDirection));
                    
                    // --- SUNSET / SUNRISE EFFECT ---
                    // "Dark to warm gradient over ice/clouds"
                    // Band of effect around terminator (-0.1 to 0.1)
                    float sunsetBand = smoothstep(-0.15, 0.05, d) * (1.0 - smoothstep(0.05, 0.2, d));
                    
                    // Mask: Only affect bright areas (Ice, Clouds)
                    float luminance = dot(texColor, vec3(0.299, 0.587, 0.114));
                    float brightMask = smoothstep(0.35, 0.8, luminance);
                    
                    // Apply warm reddish-orange tint
                    vec3 sunsetColor = vec3(1.0, 0.35, 0.1); 
                    texColor = mix(texColor, sunsetColor, sunsetBand * brightMask * 0.65);
                    
                    
                    float dayIntensity = smoothstep(-0.05, 0.05, d);
                    float nightIntensity = 1.0 - smoothstep(-0.02, 0.0, d); // Tutorial Logic
                    
                    // 4. Compose
                    // Day: Boosted brightness
                    vec3 finalDay = texColor * (dayIntensity * 3.0 + 0.01);
                    
                    // Night: Tinted yellow (0xffff88) and masked
                    // Aggressive boost (8.0) to make lights clearly visible against dark side
                    vec3 finalNight = nightColor * nightIntensity * vec3(1.0, 1.0, 0.6) * 8.0;
                    
                    gl_FragColor = vec4(finalDay + finalNight, 1.0);
                }
            `
        });

        const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), earthMaterial);
        earthGroup.add(earthMesh);




        // Note: glowMesh is a plane added to a rotated group. 
        // But since the texture is a centered radial gradient, Z-rotation doesn't affect appearance.
        // However, Y-rotation (spin) WOULD make it spin if it wasn't a perfect circle.
        // Fortunately, it is a generated circle.

        // --- 3. CLOUDS ---
        const cloudGeometry = new THREE.SphereGeometry(1.02, 64, 64);
        const cloudMaterial = new THREE.MeshStandardMaterial({
            map: cloudsMap,
            transparent: true,
            opacity: 0.8,
            blending: THREE.NormalBlending,
            side: THREE.DoubleSide,
            depthWrite: false
        });
        const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
        earthGroup.add(cloudMesh);
        cloudsRef.current = cloudMesh;

        // --- 4. ATMOSPHERE (Fresnel) ---
        const atmosphereMaterial = new THREE.ShaderMaterial({
            vertexShader: atmosphereVertexShader,
            fragmentShader: atmosphereFragmentShader,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            transparent: true,
            depthWrite: false
        });
        const atmosphereMesh = new THREE.Mesh(new THREE.SphereGeometry(1.2, 64, 64), atmosphereMaterial);
        earthGroup.add(atmosphereMesh);

        // --- 5. BACKLIGHT GLOW (Sprite) ---
        // Using a Sprite ensures it always faces camera and has no "square" matrix artifacts
        const makeGlowTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 128;
            canvas.height = 128;
            const context = canvas.getContext('2d');
            if (context) {
                const gradient = context.createRadialGradient(
                    64, 64, 0,
                    64, 64, 64
                );
                // Soft blue glow
                gradient.addColorStop(0, 'rgba(51, 102, 255, 0.6)'); // Center #3366ff
                gradient.addColorStop(0.5, 'rgba(51, 102, 255, 0.2)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Edge transparent
                context.fillStyle = gradient;
                context.fillRect(0, 0, 128, 128);
            }
            return new THREE.CanvasTexture(canvas);
        };

        const glowSprite = new THREE.Sprite(new THREE.SpriteMaterial({
            map: makeGlowTexture(),
            color: 0xffffff,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        }));
        glowSprite.scale.set(7, 7, 1); // Large scale
        // Push it slightly behind Earth so it doesn't clip
        glowSprite.position.set(0, 0, -1.5);
        earthGroup.add(glowSprite);

        // --- 6. WHITEOUT SPHERE ---
        const whiteSphere = new THREE.Mesh(
            new THREE.SphereGeometry(1.05, 64, 64),
            new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 })
        );
        scene.add(whiteSphere);
        whiteSphereRef.current = whiteSphere;


        // --- LIGHTING ---
        const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
        scene.add(sunLight);
        sunLightRef.current = sunLight;

        const ambientLight = new THREE.AmbientLight(0x404040, 0.2); // Soft fill
        scene.add(ambientLight);
        ambientLightRef.current = ambientLight;

        // --- ANIMATION ---
        const R = 10;
        let isRunning = true; // Flag to control animation loop

        const animate = () => {
            if (!isRunning) return; // Stop animation if component unmounts
            frameIdRef.current = requestAnimationFrame(animate);

            // Time logic
            if (!isManualRef.current && isSunMovingRef.current) {
                timeRef.current += 0.016;
            }
            // Logic to keep time looping 0-14? Or clamp?
            // V1 logic loops 0-14? No, V1 stops at end usually.
            // Let's loop for dev for now? Or clamp.
            // V1 logic: if (time >= 450) stop.
            // We use simple 0-14 cycle here.

            const time = timeRef.current;
            setDebugProgress(Math.min((time / 14) * 100, 100)); // Sync slider

            // Light Physics
            sunLight.intensity = 7.0; // Significantly higher base intensity
            const angle = time * 0.5;
            sunLight.position.set(Math.sin(angle) * R, 2, Math.cos(angle) * R);

            // Update Light Uniforms
            if (earthMesh.material instanceof THREE.ShaderMaterial) {
                earthMesh.material.uniforms.sunDirection.value.copy(sunLight.position).normalize();
            }


            // Rotation
            if (isSpinningRef.current) {
                rotationRef.current += 0.0005; // Base rotation
            }

            // Sync Rotations
            if (earthGroupRef.current) {
                earthGroupRef.current.rotation.y = rotationRef.current;
            }
            if (cloudsRef.current) {
                // Clouds move slightly faster
                cloudsRef.current.rotation.y = rotationRef.current * 1.1 + (time * 0.005);
            }

            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // RESIZE
        const handleResize = () => {
            if (!mountRef.current) return;
            const newW = mountRef.current.clientWidth;
            const newH = 500;
            camera.aspect = newW / newH;
            camera.updateProjectionMatrix();
            renderer.setSize(newW, newH);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            isRunning = false; // Stop the animation loop
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frameIdRef.current);
            controls.dispose();
            renderer.dispose();
            // Final cleanup of the DOM element
            if (mountRef.current) {
                while (mountRef.current.firstChild) {
                    mountRef.current.removeChild(mountRef.current.firstChild);
                }
            }
        };
    }, []);

    // ... Handlers (Keep existing)
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setDebugProgress(val);
        timeRef.current = (val / 100) * 14;
        isManualRef.current = true;
        setIsSpinning(false);
    };

    const handleRotationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const degrees = parseFloat(e.target.value);
        setRotationVal(degrees);
        setIsSpinning(false);
        rotationRef.current = degrees * (Math.PI / 180);
    };

    return (
        <>
            {/* BREAKOUT CONTAINER: w-[1200px] fixed width, 650px height, -translate-x-1/2 centers it. Force width with ! and min-w */}
            <div className="relative -mt-[140px] left-1/2 -translate-x-1/2 !w-[1200px] min-w-[1200px] h-[650px] overflow-hidden -z-10 pointer-events-none">
                {/* CANVAS CONTAINER */}
                <div ref={mountRef} className="absolute inset-0 z-0" />
            </div>

            {/* SIDEBAR CONTROL PANEL - Fixed to Viewport Right Edge */}
            {/* Moved outside so it's not trapped in the -z-10 stacking context */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[9999] w-72 flex flex-col gap-6 bg-black/40 p-6 rounded-xl border border-white/10 backdrop-blur-md shadow-2xl pointer-events-auto">

                {/* VERSION TOGGLE */}
                <div className="flex flex-col gap-2 pb-6 border-b border-white/10">
                    <label className="text-white text-xs font-mono text-gray-400 tracking-widest">VERSION</label>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setUseV2 && setUseV2(false)}
                            className="flex-1 px-4 py-2 rounded-lg text-xs font-medium transition-colors bg-white/5 text-gray-400 hover:bg-white/10"
                        >
                            V1
                        </button>
                        <button
                            className="flex-1 px-4 py-2 rounded-lg text-xs font-medium transition-colors bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                        >
                            V2
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-white text-xs font-mono text-gray-400 tracking-widest">ANIMATION</label>
                    <input
                        type="range" min="0" max="100" step="0.1"
                        value={debugProgress} onChange={handleSliderChange}
                        className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-white text-xs font-mono text-gray-400 tracking-widest">ROTATION</label>
                    <input
                        type="range" min="0" max="360" step="1"
                        value={rotationVal} onChange={handleRotationChange}
                        className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>

                <div className="flex flex-col gap-3 pt-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-300 font-medium">Auto-Spin</label>
                        <input
                            type="checkbox"
                            checked={isSpinning}
                            onChange={(e) => setIsSpinning(e.target.checked)}
                            className="w-5 h-5 rounded border-gray-600 bg-black/50 text-blue-500 focus:ring-offset-0 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-300 font-medium">Sun Movement</label>
                        <input
                            type="checkbox"
                            checked={isSunMoving}
                            onChange={(e) => setIsSunMoving(e.target.checked)}
                            className="w-5 h-5 rounded border-gray-600 bg-black/50 text-blue-500 focus:ring-offset-0 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
