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
                globeMat.emissiveIntensity = 0.3;
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
            timeRef.current += 0.016;
            const time = timeRef.current;

            // Rotate globe
            const globeMesh = world.scene().children.find((c: THREE.Object3D) => c.type === 'Group');
            if (globeMesh) {
                globeMesh.rotation.y += 0.0010;
            }

            // Rotate clouds - apply rotation directly to mesh
            if (cloudsRef.current) {
                cloudsRef.current.rotation.y += 0.0012; // Slightly faster to make it visible
            }

            // Rotate white sphere with the globe
            if (whiteSphereRef.current) {
                whiteSphereRef.current.rotation.y += 0.0010;
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

    return (
        <div
            ref={containerRef}
            className="w-full h-[500px] relative bg-transparent overflow-visible -mt-16 flex items-center justify-center pointer-events-none transition-opacity duration-1000"
            style={{ opacity: isVisible ? 1 : 0 }}
        />
    );
}
