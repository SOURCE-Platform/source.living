"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

// --- Shader Definition ---

const SmokeParticleMaterial = shaderMaterial(
    {
        uTime: 0,
        // Primary (Vertex Distortion)
        uEnableVertex: 1.0,
        uSpeed: 0.5,
        uFrequency: 1.0,
        uAmplitude: 0.2,
        uAngle: 0.0,
        uWaveType: 0,
        // Particle specifics
        uPixelRatio: 1,
    },
    // Vertex Shader
    `
    uniform float uTime;
    
    uniform float uEnableVertex;
    uniform float uSpeed;
    uniform float uFrequency;
    uniform float uAmplitude;
    uniform float uAngle;
    uniform int uWaveType;
    uniform float uPixelRatio;

    attribute float aRandom;
    attribute float aSize;
    attribute vec3 aDirection;

    varying float vAlpha;

    // Random / Noise functions
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vec3 pos = position;

      // --- 1. Emission / Flow Logic ---
      // Cycle the particle outward based on time and its random offset
      float tProgress = mod(uTime * 0.2 + aRandom, 1.0); // 0.0 to 1.0
      
      // Move along direction vector
      // REDUCED RANGE: Keep within bounds to avoid clipping at container edges
      // Max travel: 0.6 units (relative to local space)
      pos += aDirection * (tProgress * 0.6); 
      
      // Calculate opacity fade based on life
      // Fade in quickly (0-0.2), start fading out early (0.4-1.0)
      float lifeAlpha = smoothstep(0.0, 0.2, tProgress) * (1.0 - smoothstep(0.4, 1.0, tProgress));

      // --- 2. Wave Distortion Logic (Synced with Image) ---
      if (uEnableVertex > 0.5) {
          float s = sin(uAngle);
          float c = cos(uAngle);
          vec2 rotatedPos = vec2(
              pos.x * c - pos.y * s,
              pos.x * s + pos.y * c
          );
    
          float t = uTime * uSpeed;
          float wave = 0.0;
          float x = rotatedPos.x * uFrequency + t;
    
          if (uWaveType == 0) { // Sawtooth
              wave = fract(x) * 2.0 - 1.0; 
          } else if (uWaveType == 1) { // Sine
              wave = sin(x);
          } else if (uWaveType == 2) { // Square
              wave = sign(sin(x));
          } else if (uWaveType == 3) { // Noise / Random Steps
              float q = floor(x);
              wave = random(vec2(q, q)) * 2.0 - 1.0;
          } else if (uWaveType == 4) { // Bounce / Triangle
              wave = abs(fract(x) * 2.0 - 1.0) * 2.0 - 1.0;
          }
    
          float displacement = wave * uAmplitude;
          
          pos.z += displacement * 0.5;
          pos.x += c * displacement;
          pos.y += s * displacement;
      }
      
      // --- 3. Radial Boundary Mask ---
      // Ensure particles fade out before hitting the unit square edge (0.5)
      float distFromCenter = length(pos.xy);
      float radialMask = 1.0 - smoothstep(0.4, 0.55, distFromCenter);
      
      vAlpha = lifeAlpha * radialMask;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Size attenuation
      gl_PointSize = aSize * uPixelRatio * (50.0 / -mvPosition.z);
    }
  `,
    // Fragment Shader - PARTICLE DOT
    `
    varying float vAlpha;

    void main() {
        // Soft circular particle
        vec2 uv = gl_PointCoord.xy;
        float dist = length(uv - 0.5);
        
        if (dist > 0.5) discard;

        // Soft edge
        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
        
        // Combine with vertex fade
        alpha *= vAlpha;
        
        // Dark smokey color
        gl_FragColor = vec4(0.0, 0.0, 0.0, alpha * 0.6);
    }
  `
);

// Register the shader material
extend({ SmokeParticleMaterial });

// Add types for TypeScript
declare module "@react-three/fiber" {
    interface ThreeElements {
        smokeParticleMaterial: {
            attach?: string;
            args?: any[];
            ref?: React.Ref<any>;
            key?: React.Key;
            uTime?: number;
            uEnableVertex?: number;
            uSpeed?: number;
            uFrequency?: number;
            uAmplitude?: number;
            uAngle?: number;
            uWaveType?: number;
            uPixelRatio?: number;
            toneMapped?: boolean;
            transparent?: boolean;
            depthWrite?: boolean;
            [key: string]: any;
        }
    }
}

export interface SmokeParticlesProps {
    /**
     * Optional external ref for the material if you need to control it from outside.
     * If not provided, one will be created internally.
     */
    materialRef?: React.RefObject<any>;

    /**
     * Optional controls to override internal auto-animation.
     * If provided, the internal auto-animation loop will use these values.
     * If not provided, it will use default auto-animation values.
     */
    config?: {
        enableVertex?: boolean;
        speed?: number;
        frequency?: number;
        amplitude?: number;
        angle?: number;
        waveType?: number;
    };

    /**
     * If true, the component will run its own useFrame loop to update uniforms.
     * Set to false if you are updating the material uniforms from a parent component.
     * Default: true
     */
    autoUpdate?: boolean;
}

export const SmokeParticles = ({ materialRef: externalMaterialRef, config, autoUpdate = true }: SmokeParticlesProps) => {
    const localMaterialRef = useRef<THREE.ShaderMaterial>(null);
    const materialRef = externalMaterialRef || localMaterialRef;

    // Generate particles
    const particleCount = 200;
    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const randoms = new Float32Array(particleCount);
        const sizes = new Float32Array(particleCount);
        const directions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            // Initial position: clustered near center but slightly spread
            const r = Math.random() * 0.3; // Initial radius
            const theta = Math.random() * Math.PI * 2;

            positions[i * 3] = Math.cos(theta) * r;
            positions[i * 3 + 1] = Math.sin(theta) * r * 1.2; // Taller
            positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1; // Slight Z depth

            randoms[i] = Math.random();
            sizes[i] = 20.0 + Math.random() * 100.0; // Varied sizes

            // Direction vector for flow
            // Flow outwards radially
            const flowTheta = theta + (Math.random() - 0.5) * 0.5; // Slight variation from pure radial
            directions[i * 3] = Math.cos(flowTheta);
            directions[i * 3 + 1] = Math.sin(flowTheta);
            directions[i * 3 + 2] = 0;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
        geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
        geo.setAttribute('aDirection', new THREE.BufferAttribute(directions, 3));
        return geo;
    }, []);

    useFrame((state, delta) => {
        if (!autoUpdate || !materialRef.current) return;

        const mat = materialRef.current;
        mat.uniforms.uTime.value += delta;

        // Default values or config values
        const defaults = {
            enableVertex: true,
            speed: 0.5,
            frequency: 1.0,
            amplitude: 0.2,
            angle: 0.0,
            waveType: 0
        };

        const activeConfig = { ...defaults, ...config };

        mat.uniforms.uEnableVertex.value = activeConfig.enableVertex ? 1.0 : 0.0;
        mat.uniforms.uSpeed.value = activeConfig.speed;
        mat.uniforms.uFrequency.value = activeConfig.frequency;
        mat.uniforms.uAmplitude.value = activeConfig.amplitude;
        mat.uniforms.uAngle.value = activeConfig.angle;
        mat.uniforms.uWaveType.value = activeConfig.waveType;
    });

    return (
        <points position={[0, 0, -0.2]}>
            <primitive object={geometry} />
            <smokeParticleMaterial
                ref={materialRef}
                transparent={true}
                depthWrite={false}
                uPixelRatio={typeof window !== 'undefined' ? window.devicePixelRatio : 1}
            />
        </points>
    );
};
