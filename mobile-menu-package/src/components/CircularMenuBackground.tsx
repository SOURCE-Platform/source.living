'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface CircularMenuBackgroundProps {
    darkMode: boolean;
    isOpen: boolean;
}

export function CircularMenuBackground({ darkMode, isOpen }: CircularMenuBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    const animationIdRef = useRef<number | null>(null);

    const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

    const fragmentShader = `
    uniform float uTime;
    uniform bool uDarkMode;
    varying vec2 vUv;

    void main() {
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(vUv, center);

      // Simple tunnel rings - much more subtle
      float rings = sin((dist - uTime * 0.2) * 15.0) * 0.5 + 0.5;
      rings = smoothstep(0.45, 0.55, rings);

      // Create depth fade
      float fade = 1.0 - smoothstep(0.0, 0.35, dist);
      rings *= fade * 0.1;

      vec3 color;
      if (uDarkMode) {
        // Dark mode: very subtle dark grays
        vec3 tunnelColor = vec3(0.015, 0.015, 0.015); // Very dark gray
        vec3 baseColor = vec3(0.0, 0.0, 0.0); // Pure black
        color = mix(baseColor, tunnelColor, rings * 0.3);
      } else {
        // Light mode: very subtle warm whites
        vec3 tunnelColor = vec3(0.99, 0.99, 0.98); // Subtle warm white
        vec3 baseColor = vec3(0.97, 0.97, 0.96); // Slightly darker warm white
        color = mix(baseColor, tunnelColor, rings * 0.2);
      }

      // Make it circular with smooth edges
      float alpha = 1.0 - smoothstep(0.45, 0.5, dist);

      gl_FragColor = vec4(color, alpha);
    }
  `;

    useEffect(() => {
        if (!canvasRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true
        });

        renderer.setSize(680, 680); // Large enough to cover the expanded menu
        renderer.setClearColor(0x000000, 0);

        // Create shader material
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uDarkMode: { value: darkMode }
            },
            transparent: true
        });

        // Create plane geometry
        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;
        materialRef.current = material;

        // Animation loop
        const animate = (time: number) => {
            if (materialRef.current) {
                materialRef.current.uniforms.uTime.value = time * 0.001;
                materialRef.current.uniforms.uDarkMode.value = darkMode;
            }

            if (rendererRef.current && sceneRef.current) {
                rendererRef.current.render(sceneRef.current, camera);
            }

            animationIdRef.current = requestAnimationFrame(animate);
        };

        if (isOpen) {
            animationIdRef.current = requestAnimationFrame(animate);
        }

        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, [darkMode, isOpen]);

    useEffect(() => {
        // Start/stop animation based on isOpen
        if (isOpen && !animationIdRef.current) {
            const animate = (time: number) => {
                if (materialRef.current) {
                    materialRef.current.uniforms.uTime.value = time * 0.001;
                    materialRef.current.uniforms.uDarkMode.value = darkMode;
                }

                if (rendererRef.current && sceneRef.current && cameraRef.current) {
                    rendererRef.current.render(sceneRef.current, cameraRef.current);
                }

                animationIdRef.current = requestAnimationFrame(animate);
            };
            animationIdRef.current = requestAnimationFrame(animate);
        } else if (!isOpen && animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
            animationIdRef.current = null;
        }
    }, [isOpen, darkMode]);

    if (!isOpen) return null;

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{
                width: '100%',
                height: '100%',
                opacity: 1.0
            }}
        />
    );
}
