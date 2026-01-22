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
uniform vec3 color;
uniform float coefficient;
uniform float power;
uniform float intensity;
varying vec3 vNormal;
void main() {
    float i = pow(coefficient - dot(vNormal, vec3(0, 0, 1.0)), power);
    gl_FragColor = vec4(color, 1.0) * i * intensity;
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
    const cloudsRef = useRef<THREE.Mesh | null>(null);
    const timeRef = useRef(0);

    // Object Refs for Updates
    const atmosphereMeshRef = useRef<THREE.Mesh | null>(null);
    const glowSpriteRef = useRef<THREE.Sprite | null>(null);
    const starfieldMeshRef = useRef<THREE.Mesh | null>(null);
    const starfieldTextureRef = useRef<THREE.Texture | null>(null);

    // React State
    const [debugProgress, setDebugProgress] = useState(0);
    const [rotationVal, setRotationVal] = useState(0);
    const [isSpinning, setIsSpinning] = useState(true);
    const [isSunMoving, setIsSunMoving] = useState(true);

    // New Controls
    const [showBacklight, setShowBacklight] = useState(false);
    const [atmColor, setAtmColor] = useState("#4d99ff"); // 0.3, 0.6, 1.0 roughly
    const [atmSize, setAtmSize] = useState(1.26);
    const [atmIntensity, setAtmIntensity] = useState(0.79); // The 0.4 multiplier
    const [atmFalloff, setAtmFalloff] = useState(2.9); // The power
    const [atmCoefficient, setAtmCoefficient] = useState(0.41); // The base

    // Background Controls
    const [bgSpeed, setBgSpeed] = useState(0.00005);
    const [bgTiling, setBgTiling] = useState(1);
    const [isBgScrolling, setIsBgScrolling] = useState(true);

    const isSpinningRef = useRef(true);
    const isSunMovingRef = useRef(true);
    const rotationRef = useRef(0);
    const isManualRef = useRef(false);
    const bgSpeedRef = useRef(0.0001);
    const isBgScrollingRef = useRef(true);

    useEffect(() => { isSpinningRef.current = isSpinning; }, [isSpinning]);
    useEffect(() => { isSunMovingRef.current = isSunMoving; }, [isSunMoving]);
    useEffect(() => { bgSpeedRef.current = bgSpeed; }, [bgSpeed]);
    useEffect(() => { isBgScrollingRef.current = isBgScrolling; }, [isBgScrolling]);

    // Update Atmosphere Uniforms & Size
    useEffect(() => {
        if (!atmosphereMeshRef.current) return;
        const mat = atmosphereMeshRef.current.material as THREE.ShaderMaterial;
        mat.uniforms.color.value.set(atmColor);
        mat.uniforms.intensity.value = atmIntensity;
        mat.uniforms.power.value = atmFalloff;
        mat.uniforms.coefficient.value = atmCoefficient;

        atmosphereMeshRef.current.scale.setScalar(atmSize);
    }, [atmColor, atmIntensity, atmFalloff, atmCoefficient, atmSize]);

    // Update Backlight Visibility
    useEffect(() => {
        if (glowSpriteRef.current) {
            glowSpriteRef.current.visible = showBacklight;
        }
    }, [showBacklight]);

    // Update Background Tiling
    useEffect(() => {
        if (starfieldTextureRef.current) {
            starfieldTextureRef.current.repeat.set(bgTiling, 1);
        }
    }, [bgTiling]);


    useEffect(() => {
        if (!mountRef.current) return;

        // CLEANUP
        while (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild);
        }

        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;

        // --- SCENE ---
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
        camera.position.z = 6.5;

        // --- RENDERER ---
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.LinearToneMapping;
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

        controls.addEventListener('start', () => {
            setIsSpinning(false);
            isManualRef.current = true;
        });

        // --- TEXTURES ---
        const loader = new THREE.TextureLoader();
        const map = loader.load('/images/earth_blue_marble.jpg');
        const lights = loader.load('/images/earth_night.jpg');
        const cloudsMap = loader.load('/images/earth_clouds.png');
        const starfieldMap = loader.load('/images/starfield.jpg');

        map.colorSpace = THREE.SRGBColorSpace;
        lights.colorSpace = THREE.SRGBColorSpace;
        starfieldMap.colorSpace = THREE.SRGBColorSpace;

        // Setup Infinite Scroll
        starfieldMap.wrapS = THREE.RepeatWrapping;
        starfieldMap.wrapT = THREE.ClampToEdgeWrapping;
        starfieldMap.repeat.set(1, 1); // Initial tiling
        starfieldTextureRef.current = starfieldMap;

        // BACKGROUND SPHERE (Infinite Scroll)
        // Large sphere, viewed from inside
        const starGeometry = new THREE.SphereGeometry(50, 64, 64);
        const starMaterial = new THREE.MeshBasicMaterial({
            map: starfieldMap,
            side: THREE.BackSide
        });
        const starMesh = new THREE.Mesh(starGeometry, starMaterial);
        scene.add(starMesh);
        starfieldMeshRef.current = starMesh;


        // --- EARTH GROUP ---
        const earthGroup = new THREE.Group();
        earthGroup.rotation.z = 23.4 * Math.PI / 180;
        earthGroup.position.y = 0.5;
        scene.add(earthGroup);
        earthGroupRef.current = earthGroup;

        // --- 1. EARTH BASE ---
        const earthMaterial = new THREE.ShaderMaterial({
            uniforms: {
                map: { value: map },
                nightMap: { value: lights },
                sunDirection: { value: new THREE.Vector3(1, 0, 0) },
                atmosphereColor: { value: new THREE.Vector3(0.3, 0.6, 1.0) },
                whiteout: { value: 0.0 }
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
                uniform float whiteout;
                varying vec2 vUv;
                varying vec3 vWorldNormal;
                varying vec3 vWorldPosition;
                
                void main() {
                    vec3 texColor = texture2D(map, vUv).rgb;
                    vec3 nightColor = texture2D(nightMap, vUv).rgb;
                    
                    float gray = dot(texColor, vec3(0.299, 0.587, 0.114));
                    texColor = mix(texColor, vec3(gray), 0.25);

                    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
                    float fresnel = pow(1.0 - max(0.0, dot(vWorldNormal, viewDir)), 2.5);
                    texColor = mix(texColor, atmosphereColor, 0.1 + fresnel * 0.4);

                    float d = dot(vWorldNormal, normalize(sunDirection));
                    
                    float sunsetBand = smoothstep(-0.15, 0.05, d) * (1.0 - smoothstep(0.05, 0.2, d));
                    float luminance = dot(texColor, vec3(0.299, 0.587, 0.114));
                    float brightMask = smoothstep(0.35, 0.8, luminance);
                    vec3 sunsetColor = vec3(1.0, 0.35, 0.1); 
                    texColor = mix(texColor, sunsetColor, sunsetBand * brightMask * 0.65);
                    
                    float dayIntensity = smoothstep(-0.05, 0.05, d);
                    float nightIntensity = 1.0 - smoothstep(-0.02, 0.0, d);
                    
                    vec3 finalDay = texColor * (dayIntensity * 3.0 + 0.01);
                    vec3 finalNight = nightColor * nightIntensity * vec3(1.0, 1.0, 0.6) * 8.0;
                    
                    gl_FragColor = vec4(mix(finalDay + finalNight, vec3(1.0), whiteout), 1.0);
                }
            `
        });

        const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), earthMaterial);
        earthGroup.add(earthMesh);


        // --- 3. CLOUDS ---
        const cloudGeometry = new THREE.SphereGeometry(1.005, 64, 64);
        const cloudMaterial = new THREE.ShaderMaterial({
            uniforms: {
                map: { value: cloudsMap },
                sunDirection: { value: new THREE.Vector3(1, 0, 0) },
                whiteout: { value: 0.0 }
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vWorldNormal;
                void main() {
                    vUv = uv;
                    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D map;
                uniform vec3 sunDirection;
                uniform float whiteout;
                varying vec2 vUv;
                varying vec3 vWorldNormal;

                void main() {
                    vec4 texColor = texture2D(map, vUv);
                    
                    // Lighting calculation
                    float d = dot(vWorldNormal, normalize(sunDirection));
                    
                    // Day/Night masking
                    // Matches Earth shader thresholds (-0.05, 0.05) to sync terminator line
                    float dayIntensity = smoothstep(-0.05, 0.05, d);
                    
                    // Apply lighting to alpha
                    float finalAlpha = texColor.a * dayIntensity;
                    
                    // Whiteout Phase: Fade OUT clouds
                    // We want opacity to go to 0 as whiteout goes to 1
                    finalAlpha *= (1.0 - whiteout);
                    
                    gl_FragColor = vec4(texColor.rgb, finalAlpha);
                }
            `,
            transparent: true,
            blending: THREE.NormalBlending,
            side: THREE.DoubleSide,
            depthWrite: false
        });
        const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
        earthGroup.add(cloudMesh);
        cloudsRef.current = cloudMesh;

        // --- 4. ATMOSPHERE (Outer GLOW) ---
        const atmosphereMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(atmColor) },
                coefficient: { value: atmCoefficient },
                power: { value: atmFalloff },
                intensity: { value: atmIntensity },
            },
            vertexShader: atmosphereVertexShader,
            fragmentShader: atmosphereFragmentShader,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            transparent: true,
            depthWrite: false
        });
        const atmosphereMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), atmosphereMaterial);
        atmosphereMesh.scale.setScalar(atmSize);
        earthGroup.add(atmosphereMesh);
        atmosphereMeshRef.current = atmosphereMesh;

        // --- 5. BACKLIGHT GLOW (Sprite) ---
        const makeGlowTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 128;
            canvas.height = 128;
            const context = canvas.getContext('2d');
            if (context) {
                const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
                gradient.addColorStop(0, 'rgba(51, 102, 255, 0.24)');
                gradient.addColorStop(0.5, 'rgba(51, 102, 255, 0.08)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
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
        glowSprite.scale.set(7, 7, 1);
        glowSprite.position.set(0, 0.5, -1.5);
        glowSprite.visible = showBacklight;
        scene.add(glowSprite);
        glowSpriteRef.current = glowSprite;

        // --- LIGHTING ---
        const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
        scene.add(sunLight);

        const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
        scene.add(ambientLight);

        // --- ANIMATION ---
        const R = 10;
        let isRunning = true;

        const animate = () => {
            if (!isRunning) return;
            frameIdRef.current = requestAnimationFrame(animate);

            if (!isManualRef.current && isSunMovingRef.current) {
                timeRef.current += 0.016;
                // Loop or stop? Let's loop for now or stop at 7s?
                // Request implies sequence, maybe loop? Or just run.
                // Stop at 7s (final state) instead of looping
                if (timeRef.current > 7.0) timeRef.current = 7.0;
            }
            const time = timeRef.current;

            // Sync slider if not manual interacting (optional, but good for visualizing auto-play)
            if (!isManualRef.current) {
                setDebugProgress(time);
            }

            const R = 10;
            // PHASE 1: 0s - 3s (Sun Rotation)
            // Start from behind (dark side) -> -Z
            // End at front (full illumination) -> +Z
            // Using a simple circular path in XZ plane
            let phase1Progress = Math.min(Math.max(time / 3.0, 0.0), 1.0);

            // Allow easing or simple linear
            // Let's go from Angle PI (back) to 0 (front)? Or similar suitable path.
            // Camera is at Z=6.5. 
            // If Sun is at Z=-10, it lights the back. If Sun is at Z=10, it lights the front.
            // Let's rotate 180 degrees.
            const startAngle = Math.PI; // Behind
            const endAngle = 0;         // Front
            const currentAngle = startAngle + (endAngle - startAngle) * phase1Progress;

            // Adjust position calculation
            // sunLight.position.set(Math.sin(angle) * R, 2, Math.cos(angle) * R);
            // We want it to end at roughly (0, 2, 10) or similar frontal position

            sunLight.position.set(Math.sin(currentAngle) * R, 2, Math.cos(currentAngle) * R);
            // At PI: sin=0, cos=-1 => (0, 2, -10) -> Behind Earth
            // At 0: sin=0, cos=1 => (0, 2, 10) -> Front of Earth

            // PHASE 2: 3s - 6s (Whiteout)
            let phase2Progress = Math.min(Math.max((time - 3.0) / 3.0, 0.0), 1.0);

            if (earthMesh.material instanceof THREE.ShaderMaterial) {
                earthMesh.material.uniforms.sunDirection.value.copy(sunLight.position).normalize();
                earthMesh.material.uniforms.whiteout.value = phase2Progress;
            }

            if (isSpinningRef.current) {
                rotationRef.current += 0.001;
            }

            if (earthGroupRef.current) {
                earthGroupRef.current.rotation.y = rotationRef.current;
            }
            if (cloudsRef.current) {
                cloudsRef.current.rotation.y = rotationRef.current * 1.1 + (time * 0.005);

                // Update Cloud Shader Uniforms
                if (cloudsRef.current.material instanceof THREE.ShaderMaterial) {
                    cloudsRef.current.material.uniforms.sunDirection.value.copy(sunLight.position).normalize();
                    cloudsRef.current.material.uniforms.whiteout.value = phase2Progress;
                }
            }

            // Phase 2: Atmosphere Color -> White
            if (atmosphereMeshRef.current) {
                const mat = atmosphereMeshRef.current.material as THREE.ShaderMaterial;
                // Using fixed blue as base to avoid complex ref logic for now, matching default state
                const baseColor = new THREE.Color("#4d99ff");
                const targetColor = new THREE.Color(1.0, 1.0, 1.0); // White

                // Lerp color
                const currentColor = baseColor.clone().lerp(targetColor, phase2Progress);
                mat.uniforms.color.value.copy(currentColor);
            }

            // Background Scroll
            if (isBgScrollingRef.current && starfieldTextureRef.current) {
                starfieldTextureRef.current.offset.x += bgSpeedRef.current;
            }

            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // RESIZE
        const handleResize = () => {
            if (!mountRef.current) return;
            const newW = mountRef.current.clientWidth;
            const newH = mountRef.current.clientHeight;
            camera.aspect = newW / newH;
            camera.updateProjectionMatrix();
            renderer.setSize(newW, newH);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            isRunning = false;
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frameIdRef.current);
            controls.dispose();
            renderer.dispose();
            if (mountRef.current) {
                while (mountRef.current.firstChild) {
                    mountRef.current.removeChild(mountRef.current.firstChild);
                }
            }
        };
    }, []); // Run once on mount

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setDebugProgress(val);
        timeRef.current = val;
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
            {/* BREAKOUT CONTAINER: w-[100vw] forces full viewport width, -translate-x-1/2 centers it. Mask applied for curved bottom. */}
            <div className="relative -mt-[140px] left-1/2 -translate-x-1/2 !w-[100vw] min-w-[100vw] h-[650px] overflow-hidden -z-10 pointer-events-none [mask-image:url(/images/viewing-mask-earth.svg)] [mask-size:100%_100%] [mask-repeat:no-repeat] [mask-position:bottom]">
                {/* CANVAS CONTAINER */}
                <div ref={mountRef} className="absolute inset-0 z-0" />
            </div>

            {/* SIDEBAR CONTROL PANEL - Fixed to Viewport Right Edge */}
            <div className="hidden fixed right-8 top-1/2 -translate-y-1/2 z-[9999] w-72 flex flex-col gap-6 bg-black/40 p-6 rounded-xl border border-white/10 backdrop-blur-md shadow-2xl pointer-events-auto max-h-[80vh] overflow-y-auto">

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

                {/* ATMOSPHERE CONTROLS */}
                <div className="flex flex-col gap-4 pb-6 border-b border-white/10">
                    <label className="text-white text-xs font-mono text-gray-400 tracking-widest text-center">ATMOSPHERE & GLOW</label>

                    <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-300 font-medium">Backlight Sprite</label>
                        <input
                            type="checkbox"
                            checked={showBacklight}
                            onChange={(e) => setShowBacklight(e.target.checked)}
                            className="w-5 h-5 rounded border-gray-600 bg-black/50 text-blue-500 focus:ring-offset-0 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <label className="text-xs text-gray-400">Color</label>
                            <input
                                type="color"
                                value={atmColor}
                                onChange={(e) => setAtmColor(e.target.value)}
                                className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-gray-400">Intensity: {atmIntensity.toFixed(2)}</label>
                        <input
                            type="range" min="0" max="2" step="0.01"
                            value={atmIntensity} onChange={(e) => setAtmIntensity(parseFloat(e.target.value))}
                            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-gray-400">Size: {atmSize.toFixed(2)}</label>
                        <input
                            type="range" min="1.01" max="1.5" step="0.01"
                            value={atmSize} onChange={(e) => setAtmSize(parseFloat(e.target.value))}
                            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-gray-400">Gradient (Power): {atmFalloff.toFixed(1)}</label>
                        <input
                            type="range" min="0.5" max="10" step="0.1"
                            value={atmFalloff} onChange={(e) => setAtmFalloff(parseFloat(e.target.value))}
                            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-gray-400">Coefficient: {atmCoefficient.toFixed(2)}</label>
                        <input
                            type="range" min="0.0" max="1.0" step="0.01"
                            value={atmCoefficient} onChange={(e) => setAtmCoefficient(parseFloat(e.target.value))}
                            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>

                    <hr className="border-white/10" />

                    <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-300 font-medium">Background Scroll</label>
                        <input
                            type="checkbox"
                            checked={isBgScrolling}
                            onChange={(e) => setIsBgScrolling(e.target.checked)}
                            className="w-5 h-5 rounded border-gray-600 bg-black/50 text-blue-500 focus:ring-offset-0 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-gray-400">BG Speed: {bgSpeed.toFixed(5)}</label>
                        <input
                            type="range" min="-0.001" max="0.001" step="0.00005"
                            value={bgSpeed} onChange={(e) => setBgSpeed(parseFloat(e.target.value))}
                            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs text-gray-400">BG Tiling (Horizontal)</label>
                        <input
                            type="range" min="1" max="10" step="1"
                            value={bgTiling} onChange={(e) => setBgTiling(parseFloat(e.target.value))}
                            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                    </div>
                </div>


                <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
                    <label className="text-white text-xs font-mono text-gray-400 tracking-widest">ANIMATION TIMELINE</label>

                    <div className="relative w-full h-6 mb-2">
                        {/* Labels positioned absolutely based on 0-7s range */}
                        <div className="absolute left-0 top-0 -translate-x-1/2 flex flex-col items-center">
                            <span className="w-px h-2 bg-white/20 mb-1"></span>
                            <span className="text-[10px] text-gray-400 whitespace-nowrap">Dark</span>
                        </div>
                        <div className="absolute left-[42.8%] top-0 -translate-x-1/2 flex flex-col items-center">
                            <span className="w-px h-2 bg-white/40 mb-1"></span>
                            <span className="text-[10px] text-gray-400 whitespace-nowrap">Illuminated</span>
                        </div>
                        <div className="absolute left-[85.7%] top-0 -translate-x-1/2 flex flex-col items-center">
                            <span className="w-px h-2 bg-white/60 mb-1"></span>
                            <span className="text-[10px] text-gray-400 whitespace-nowrap">White</span>
                        </div>
                    </div>

                    <input
                        type="range" min="0" max="7" step="0.01"
                        value={debugProgress} onChange={handleSliderChange}
                        className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500 relative z-10"
                    />
                    <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                        <span>0s</span>
                        <span>7s</span>
                    </div>
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
