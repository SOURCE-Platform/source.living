'use client';

import { useRef, useEffect, useState } from 'react';
import Globe, { GlobeInstance } from 'globe.gl';
import * as THREE from 'three';

export function EarthScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const globeRef = useRef<GlobeInstance | null>(null);
    const cloudsRef = useRef<THREE.Mesh | null>(null);
    const whiteSphereRef = useRef<THREE.Mesh | null>(null);
    const timeRef = useRef(0);
    const animationIdRef = useRef<number>(0);
    const globeMatRef = useRef<THREE.MeshPhongMaterial | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    // DEBUG CONTROLS
    const [debugProgress, setDebugProgress] = useState(0); // 0-100
    const [showSunset, setShowSunset] = useState(true);
    const [isSpinning, setIsSpinning] = useState(true);
    const [rotationVal, setRotationVal] = useState(0); // 0-360 for UI

    const isManualRef = useRef(false);
    const rotationRef = useRef(0);
    const isSpinningRef = useRef(true); // Fix: Initialize ref

    // Sync state to ref for animation loop
    useEffect(() => {
        isSpinningRef.current = isSpinning;
    }, [isSpinning]);

    // Handle shader uniform updates when state changes
    useEffect(() => {
        if (globeMatRef.current?.userData?.shader) {
            globeMatRef.current.userData.shader.uniforms.uShowSunset.value = showSunset ? 1.0 : 0.0;
        }
    }, [showSunset]);

    useEffect(() => {
        if (!containerRef.current) return;

        // Initialize Globe with LOCAL textures
        const world = new Globe(containerRef.current, { animateIn: false })
            .globeImageUrl('/images/earth_blue_marble.jpg')
            .bumpImageUrl('/images/earth_topology.png')
            .showAtmosphere(true)
            .atmosphereColor('lightskyblue')
            .atmosphereAltitude(0.25)
            .backgroundColor('rgba(0,0,0,0)');

        // Get globe material for customization
        const globeMat = world.globeMaterial() as THREE.MeshPhongMaterial;
        globeMat.bumpScale = 10;
        globeMatRef.current = globeMat;

        // Load night lights texture (city lights) - LOCAL
        new THREE.TextureLoader().load(
            '/images/earth_night.jpg',
            (nightTexture) => {
                nightTexture.colorSpace = THREE.SRGBColorSpace;
                globeMat.emissiveMap = nightTexture;
                globeMat.emissive = new THREE.Color(0xffffff);
                globeMat.emissiveIntensity = 0; // Handled in shader now

                // CUSTOM SHADER: Sharp terminator + Sunset glow
                globeMat.onBeforeCompile = (shader) => {
                    shader.uniforms.sunDirection = { value: new THREE.Vector3(0, 0, 1) };
                    shader.uniforms.uShowSunset = { value: 1.0 }; // Default on

                    // Pass the directional light position to the customized shader
                    // We'll hook into the update loop to keep this sync'd
                    globeMat.userData.shader = shader;

                    // Vertex Shader: Pass Normal and world position if needed (Standard provides vNormal)
                    // We primarily need to ensure we have the correct lighting calculations in fragment.
                    // For MeshPhongMaterial, we can hijack the lights_phong_fragment or similar.
                    // Actually, easiest way for day/night is to modify how emissive and diffuse mix.

                    shader.fragmentShader = shader.fragmentShader.replace(
                        '#include <common>',
                        `
                        #include <common>
                        uniform float uShowSunset;
                        `
                    );

                    shader.fragmentShader = shader.fragmentShader.replace(
                        '#include <emissivemap_fragment>',
                        `
                        #ifdef USE_EMISSIVEMAP
                            vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
                            
                            // CALCULATE SUN INTENSITY MANUALLY
                            vec3 lightDir = normalize(directionalLights[0].direction); 
                            float dotNL = dot(normalize(vNormal), lightDir);
                            
                            // 1. TERMINATOR GEOMETRY
                            // Sharp transition for night lights
                            float dayStrength = smoothstep(-0.02, 0.02, dotNL); 
                            
                            // 2. ATMOSPHERIC HAZE (Day Side)
                            // "Wash out" the day side like Google Earth. 
                            // Stronger when facing sun directly, fades at terminator.
                            float atmosphereFactor = smoothstep(0.0, 1.0, dotNL); 
                            vec3 atmosphereColor = vec3(0.6, 0.75, 1.0); // Light blue-ish white
                            
                            // Mix haze into the base texture (diffuseColor)
                            // Mix 30% atmosphere at peak day
                            diffuseColor.rgb = mix(diffuseColor.rgb, atmosphereColor, atmosphereFactor * 0.3);
                            
                            // 3. SUNSET SCATTERING
                            // Natural tinting at the terminator (scattering)
                            // Band from -0.1 to 0.2
                            float sunsetFactor = 1.0 - abs(smoothstep(-0.1, 0.2, dotNL) * 2.0 - 1.0);
                            sunsetFactor = pow(sunsetFactor, 3.0);
                            
                            vec3 sunsetTint = vec3(1.2, 0.7, 0.4); // Warm glow, slightly brighter than 1.0
                            
                            // Apply tint if enabled
                            if (uShowSunset > 0.5) {
                                diffuseColor.rgb += sunsetTint * sunsetFactor * 0.5;
                            }
                            
                            // 4. NIGHT LIGHTS masking
                            totalEmissiveRadiance = emissiveColor.rgb * (1.0 - dayStrength) * 1.5; 
                            
                            // 5. REMOVE BLUE FROM NIGHT SIDE
                            // Force day side only for diffuse. 
                            // This ensures the blue marble texture is BLACK on the night side.
                            diffuseColor.rgb *= dayStrength; 
                            
                        #endif
                        `
                    );
                };
            }
        );

        globeRef.current = world;

        // Set size and center the view
        world.width(containerRef.current.clientWidth);
        world.height(500);
        world.pointOfView({ lat: 0, lng: 0, altitude: 2.5 });

        // Disable user controls
        world.controls().enabled = false;

        // Access scene
        const scene = world.scene();

        // Add OUR lights FIRST - start completely dark
        const ambientLight = new THREE.AmbientLight(0xffffff, 0);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0);
        directionalLight.position.set(0, 0, -10);
        scene.add(ambientLight);
        scene.add(directionalLight);

        // AGGRESSIVELY remove ALL existing lights EXCEPT ours
        const removeDefaultLights = () => {
            const lightsToRemove: THREE.Object3D[] = [];
            scene.traverse((child: THREE.Object3D) => {
                if (child instanceof THREE.Light &&
                    child !== ambientLight &&
                    child !== directionalLight) {
                    lightsToRemove.push(child);
                }
            });
            lightsToRemove.forEach(light => {
                light.removeFromParent();
            });
        };

        removeDefaultLights();
        setTimeout(removeDefaultLights, 100);
        setTimeout(removeDefaultLights, 500);

        // Add clouds sphere
        const CLOUDS_IMG_URL = '/images/earth_clouds.png';
        const CLOUDS_ALT = 0.004;
        let cloudsMat: THREE.MeshStandardMaterial | null = null;

        new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
            cloudsTexture.colorSpace = THREE.SRGBColorSpace;
            cloudsMat = new THREE.MeshStandardMaterial({
                map: cloudsTexture,
                transparent: true,
                opacity: 0.9,
                depthWrite: false,
            });
            const clouds = new THREE.Mesh(
                new THREE.SphereGeometry(world.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
                cloudsMat
            );
            world.scene().add(clouds);
            cloudsRef.current = clouds;
        });

        // Add WHITE sphere for whiteout effect (starts invisible)
        const whiteSphereMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0,
            depthWrite: false,
        });
        const whiteSphere = new THREE.Mesh(
            new THREE.SphereGeometry(world.getGlobeRadius() * 1.01, 64, 64), // Slightly larger
            whiteSphereMat
        );
        world.scene().add(whiteSphere);
        whiteSphereRef.current = whiteSphere;

        // Animation loop
        const R = 10;
        const animate = () => {
            // ONLY increment time if NOT in manual mode
            if (!isManualRef.current) {
                timeRef.current += 0.016;
                // Update debug slider just for visual sync if playing purely
                // But avoid re-renders loop: we'll just let the slider be controlled by user primarily
            }

            const time = timeRef.current;

            // ROTATION Logic
            // We use a ref to track accumulated rotation, but also allow UI override
            if (isSpinningRef.current) {
                rotationRef.current += 0.0010;
            }

            // Rotate globe
            const globeMesh = world.scene().children.find((c: THREE.Object3D) => c.type === 'Group');
            if (globeMesh) {
                globeMesh.rotation.y = rotationRef.current;
            }

            // Rotate clouds - sync with earth + slight drift
            if (cloudsRef.current) {
                cloudsRef.current.rotation.y = rotationRef.current + (time * 0.02);
            }

            // Rotate white sphere with the globe
            if (whiteSphereRef.current) {
                whiteSphereRef.current.rotation.y = rotationRef.current;
            }

            // --- LIGHTING ANIMATION (faster timings) ---

            // Phase 1: Dark (0-1s)
            if (time < 1) {
                directionalLight.intensity = 0;
                ambientLight.intensity = 0;
                directionalLight.position.set(0, 0, -R);

                // Fade in the scene
                if (!isVisible && time > 0.1) setIsVisible(true);
            }

            // Phase 2: Sunrise (1-5s) - 4 seconds
            else if (time >= 1 && time < 5) {
                const t = (time - 1) / 4;

                const startAngle = Math.PI * 0.85;
                const endAngle = 0.0;
                const currentAngle = startAngle - (t * (startAngle - endAngle));

                const x = R * Math.sin(currentAngle);
                const z = R * Math.cos(currentAngle);
                directionalLight.position.set(x, 0.5, z);

                directionalLight.intensity = t * 3;
                ambientLight.intensity = t * 0.1;

                // Update shader with sun direction if available (mostly auto-handled by Three.js lights, but good to know)
                if (globeMatRef.current && globeMatRef.current.userData.shader) {
                    // Force material update if needed, but directionalLights[0] is uniform
                    globeMatRef.current.needsUpdate = true;
                    // Note: We don't actually need to set userData.shader.uniforms.sunDirection 
                    // because we are reading directionalLights[0] in the shader directly.
                }
            }

            // Phase 3: Full illumination + Whiteout (5s+) - 1.5 seconds for white, 2.5 for glow
            else if (time >= 5) {
                const linearT = Math.min((time - 5) / 1.5, 1); // Sphere white in 1.5s
                const glowT = Math.min((time - 5) / 2.5, 1);   // Glow expands over 2.5s (1s after white)

                // Ease-in-out function: smooth start and end
                const t = linearT < 0.5
                    ? 2 * linearT * linearT  // Ease in
                    : 1 - Math.pow(-2 * linearT + 2, 2) / 2; // Ease out

                const glowEased = glowT < 0.5
                    ? 2 * glowT * glowT
                    : 1 - Math.pow(-2 * glowT + 2, 2) / 2;

                // Lights ramp up with easing
                directionalLight.position.set(0, 2, R);
                directionalLight.intensity = 3 + (t * 7);
                ambientLight.intensity = 0.1 + (t * 1.5);

                if (globeMatRef.current) globeMatRef.current.needsUpdate = true;

                // Expand atmosphere glow by 50% (0.25 -> 0.375)
                world.atmosphereAltitude(0.25 + (glowEased * 0.125));

                // White sphere fades in with easing
                if (whiteSphereRef.current) {
                    const mat = whiteSphereRef.current.material as THREE.MeshBasicMaterial;
                    mat.opacity = t;
                }
            }

            animationIdRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            cancelAnimationFrame(animationIdRef.current);
            if (globeRef.current) {
                globeRef.current._destructor();
            }
        };
    }, []);

    // DEBUG HANDLER
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setDebugProgress(val);

        // Pause auto-play when user interacts
        isManualRef.current = true;

        // Map 0-100 to 0-10 seconds (approx duration)
        timeRef.current = (val / 100) * 10;
    };

    const handleRotationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const degrees = parseFloat(e.target.value);
        setRotationVal(degrees);
        setIsSpinning(false); // Auto-pause spin
        rotationRef.current = degrees * (Math.PI / 180);
    };

    return (
        <div className="relative">
            <div
                ref={containerRef}
                className="w-full h-[500px] relative bg-transparent overflow-visible -mt-16 flex items-center justify-center pointer-events-none transition-opacity duration-1000"
                style={{ opacity: isVisible ? 1 : 0 }}
            />
            {/* DEBUG SLIDER UI */}
            <div className="absolute right-4 top-4 bg-black/80 p-4 rounded-xl backdrop-blur-md z-50 pointer-events-auto flex flex-col gap-3 min-w-[200px] border border-white/10">

                <div className="flex flex-col gap-1">
                    <label className="text-white text-xs font-mono text-gray-400">ANIMATION PROGRESS</label>
                    <input
                        type="range" min="0" max="100" step="0.1"
                        value={debugProgress} onChange={handleSliderChange}
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-white text-xs font-mono text-gray-400">EARTH ROTATION ({Math.round(rotationVal)}°)</label>
                    <input
                        type="range" min="0" max="360" step="1"
                        value={rotationVal} onChange={handleRotationChange}
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <label className="text-sm text-gray-300">Spinning</label>
                    <input
                        type="checkbox"
                        checked={isSpinning}
                        onChange={(e) => setIsSpinning(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-offset-gray-900"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-300">Sunset Effect</label>
                    <input
                        type="checkbox"
                        checked={showSunset}
                        onChange={(e) => setShowSunset(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-orange-500 focus:ring-offset-gray-900"
                    />
                </div>
            </div>
        </div>
    );
}
