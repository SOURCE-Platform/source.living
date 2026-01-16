"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Leva, useControls, folder } from "leva";
import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend } from "@react-three/fiber";

// --- Shader Material Definition ---

const WarpShaderMaterial = shaderMaterial(
    {
        uTime: 0,
        uTexture: new THREE.Texture(),

        // Primary (Vertex Distortion)
        uEnableVertex: 1.0,
        uSpeed: 0.5,
        uFrequency: 1.0,
        uAmplitude: 0.2,
        uAngle: 0.0,
        uWaveType: 0,
        uNoiseStrength: 0.2,

        // Secondary (Fragment Distortion)
        uEnableFragment: 1.0,
        uSpeed2: 0.5,
        uFrequency2: 5.0,
        uAmplitude2: 0.05,
        uWaveType2: 0,
    },
    // Vertex Shader
    `
    uniform float uTime;
    
    // Primary Uniforms
    uniform float uEnableVertex;
    uniform float uSpeed;
    uniform float uFrequency;
    uniform float uAmplitude;
    uniform float uAngle;
    uniform int uWaveType;
    uniform float uNoiseStrength;

    varying vec2 vUv;
    varying float vWave;

    // Random / Noise functions
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vUv = uv;
      vec3 pos = position;

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
    
          vWave = wave;
    
          float displacement = wave * uAmplitude;
          
          pos.z += displacement * 0.5;
          pos.x += c * displacement;
          pos.y += s * displacement;
      } else {
          vWave = 0.0;
      }

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
    // Fragment Shader
    `
    uniform float uTime;
    uniform sampler2D uTexture;
    
    // Secondary Distortion Uniforms
    uniform float uEnableFragment;
    uniform float uSpeed2;
    uniform float uFrequency2;
    uniform float uAmplitude2;
    uniform int uWaveType2;

    varying vec2 vUv;

    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vec2 uv = vUv;

      if (uEnableFragment > 0.5) {
          float t = uTime * uSpeed2;
          float wave = 0.0;
          
          float x = uv.x * uFrequency2 + t;
    
          if (uWaveType2 == 0) { // Sawtooth
              wave = fract(x) * 2.0 - 1.0; 
          } else if (uWaveType2 == 1) { // Sine
              wave = sin(x);
          } else if (uWaveType2 == 2) { // Square
              wave = sign(sin(x));
          } else if (uWaveType2 == 3) { // Noise
              float q = floor(x);
              wave = random(vec2(q, q)) * 2.0 - 1.0;
          } else if (uWaveType2 == 4) { // Bounce
              wave = abs(fract(x) * 2.0 - 1.0) * 2.0 - 1.0;
          }
    
          vec2 distortedUv = uv + vec2(wave * uAmplitude2, 0.0);
          gl_FragColor = texture2D(uTexture, distortedUv);
      } else {
          gl_FragColor = texture2D(uTexture, uv);
      }
    }
  `
);

const SmokeShaderMaterial = shaderMaterial(
    {
        uTime: 0,
        // Primary (Vertex Distortion) - MUST MATCH WARP SHADER
        uEnableVertex: 1.0,
        uSpeed: 0.5,
        uFrequency: 1.0,
        uAmplitude: 0.2,
        uAngle: 0.0,
        uWaveType: 0,
    },
    // Vertex Shader - COPY OF WARP SHADER TO ENSURE SYNC
    `
    uniform float uTime;
    
    uniform float uEnableVertex;
    uniform float uSpeed;
    uniform float uFrequency;
    uniform float uAmplitude;
    uniform float uAngle;
    uniform int uWaveType;

    varying vec2 vUv;
    varying float vWave;

    // Random / Noise functions
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vUv = uv;
      vec3 pos = position;

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
    
          vWave = wave;
    
          float displacement = wave * uAmplitude;
          
          pos.z += displacement * 0.5;
          pos.x += c * displacement;
          pos.y += s * displacement;
      } else {
          vWave = 0.0;
      }

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
    // Fragment Shader - PARTICLE SMOKE
    `
    uniform float uTime;
    varying vec2 vUv;

    // Pseudo-random function
    float random (in vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    // Value Noise
    float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        // Cubic Hermite Curve
        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }
    // (Note: The above function assumes a,b,c,d variables which need to be defined from random calls)
    // Correcting noise function implementation for full standalone:
    
    float vnoise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }

    #define OCTAVES 6
    float fbm (in vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 0.0; // Not used but good practice structure
        
        for (int i = 0; i < OCTAVES; i++) {
            value += amplitude * vnoise(st);
            st *= 2.1; // Lacunarity > 2 for more detail
            amplitude *= 0.5;
        }
        return value;
    }

    void main() {
        // Center UVs
        vec2 centeredUv = vUv - 0.5;
        float len = length(centeredUv);
        
        // --- 1. Flow Animation ---
        // Move outwards from center
        vec2 dir = normalize(centeredUv + 0.0001); // avoid div by zero
        vec2 flow = dir * uTime * 0.15;
        
        // --- 2. Particle/Grain Texture ---
        // Use high frequency noise to simulate particles
        vec2 particleSt = (vUv * 8.0) - flow; // Tiling 8x
        float particles = fbm(particleSt);
        
        // Sharpen the noise to make it look like specks
        particles = smoothstep(0.4, 0.7, particles); 
        
        // --- 3. Smoky Structures (Domain Warping) ---
        vec2 smokeSt = (vUv * 3.0) - (flow * 0.5);
        
        // Warp the coordinate system
        vec2 q = vec2(0.);
        q.x = fbm( smokeSt + 0.1 * uTime );
        q.y = fbm( smokeSt + vec2(1.0) );

        vec2 r = vec2(0.);
        r.x = fbm( smokeSt + 1.0*q + vec2(1.7,9.2)+ 0.15*uTime );
        r.y = fbm( smokeSt + 1.0*q + vec2(8.3,2.8)+ 0.126*uTime );

        float density = fbm(smokeSt + r);
        
        // --- 4. Combine Particles + Smoke ---
        // The particles ride on the density of the smoke
        float finalPattern = particles * density;
        
        // --- 5. Masking ---
        // Organic radial falloff
        float noiseDist = len + (fbm(centeredUv * 4.0 - uTime * 0.1) * 0.2);
        float mask = 1.0 - smoothstep(0.1, 0.45, noiseDist);

        // --- 6. Final Alpha ---
        float alpha = finalPattern * mask;
        
        // Boost visibility of small particles
        alpha = clamp(alpha * 2.0, 0.0, 1.0);
        
        // Fade out very center to not obscure the main image too much?
        // Actually user wants "behind", so obscuring is fine as it's z-layered behind.
        
        gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
    }
    `
);



const SmokeParticleMaterial = shaderMaterial(
    {
        uTime: 0,
        // Primary (Vertex Distortion) - MUST MATCH WARP SHADER
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

extend({ WarpShaderMaterial, SmokeParticleMaterial });

declare module "@react-three/fiber" {
    interface ThreeElements {
        warpShaderMaterial: {
            attach?: string;
            args?: any[];
            ref?: React.Ref<any>;
            key?: React.Key;
            children?: React.ReactNode;
            uTexture?: THREE.Texture;
            uTime?: number;
            uEnableVertex?: number;
            uSpeed?: number;
            uFrequency?: number;
            uAmplitude?: number;
            uAngle?: number;
            uWaveType?: number;
            uNoiseStrength?: number;
            uEnableFragment?: number;
            uSpeed2?: number;
            uFrequency2?: number;
            uAmplitude2?: number;
            uWaveType2?: number;
            toneMapped?: boolean;
            transparent?: boolean;
            wireframe?: boolean;
        }
        smokeShaderMaterial: {
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
            toneMapped?: boolean;
            transparent?: boolean;
            depthWrite?: boolean;
        }


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
        }
    }
}

const SmokeParticles = ({ controls, materialRef }: { controls: any, materialRef: React.RefObject<any> }) => {
    // Generate particles
    const particleCount = 200;
    const geometry = React.useMemo(() => {
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

const ImagePlane = ({ imageSrc }: { imageSrc: string }) => {
    const mesh = useRef<THREE.Mesh>(null);
    const material = useRef<THREE.ShaderMaterial>(null);
    const texture = useTexture(imageSrc);

    // Helpers to create conditionally rendered controls
    const isVertex = (get: any) => get("Warp Shader.editMode") === "Vertex";
    const isFragment = (get: any) => get("Warp Shader.editMode") === "Fragment";

    // 1. Main Controls (Edit Mode, Enables)
    const mainControls = useControls("Warp Shader", {
        editMode: { value: "Vertex", options: ["Vertex", "Fragment"], label: "Edit Mode" },
        enableVertex: { value: true, label: "Enable Vertex", render: isVertex },
        enableFragment: { value: true, label: "Enable Fragment", render: isFragment },

        "Wave Type (V)": folder({
            waveType: {
                options: { "Sawtooth": 0, "Sine": 1, "Square": 2, "Noise": 3, "Bounce": 4 },
                value: 1, // Sine
                label: "Type",
                render: isVertex
            },
        }, { render: isVertex }),

        "Wave Type (F)": folder({
            waveType2: {
                options: { "Sawtooth": 0, "Sine": 1, "Square": 2, "Noise": 3, "Bounce": 4 },
                value: 4, // Bounce
                label: "Type",
                render: isFragment
            },
        }, { render: isFragment }),
    });

    // 2. Auto Toggles (Must be separate to drive dependencies)
    const autoControls = useControls("Warp Shader", {
        "Speed (V)": folder({
            speedAuto: { value: false, label: "Auto Animate", render: isVertex },
        }, { render: isVertex }),
        "Frequency (V)": folder({
            frequencyAuto: { value: true, label: "Auto Animate", render: isVertex },
        }, { render: isVertex }),
        "Amplitude (V)": folder({
            amplitudeAuto: { value: true, label: "Auto Animate", render: isVertex },
        }, { render: isVertex }),
        "Angle (V)": folder({
            angleAuto: { value: true, label: "Auto Animate", render: isVertex },
        }, { render: isVertex }),

        "Speed (F)": folder({
            speed2Auto: { value: false, label: "Auto Animate", render: isFragment },
        }, { render: isFragment }),
        "Frequency (F)": folder({
            frequency2Auto: { value: true, label: "Auto Animate", render: isFragment },
        }, { render: isFragment }),
        "Amplitude (F)": folder({
            amplitude2Auto: { value: false, label: "Auto Animate", render: isFragment },
        }, { render: isFragment }),
    });

    // 3. Detail Controls (Dependent on Auto Toggles for 'disabled' state)
    const detailControls = useControls("Warp Shader", {
        "Speed (V)": folder({
            speed: { value: 1.4, min: 0.0, max: 5.0, step: 0.1, label: "Value", render: isVertex, disabled: autoControls.speedAuto },
            speedRange: { value: [0.0, 0.8], min: 0.0, max: 5.0, label: "Range", render: isVertex, disabled: !autoControls.speedAuto },
            speedAnimSpeed: { value: 0.3, min: 0.1, max: 5.0, label: "Anim Speed", render: isVertex, disabled: !autoControls.speedAuto },
        }, { render: isVertex }),

        "Frequency (V)": folder({
            frequency: { value: 1.0, min: 0.1, max: 20.0, step: 0.1, label: "Value", render: isVertex, disabled: autoControls.frequencyAuto },
            frequencyRange: { value: [1.7, 18.4], min: 0.1, max: 20.0, label: "Range", render: isVertex, disabled: !autoControls.frequencyAuto },
            frequencyAnimSpeed: { value: 0.3, min: 0.1, max: 5.0, label: "Anim Speed", render: isVertex, disabled: !autoControls.frequencyAuto },
        }, { render: isVertex }),

        "Amplitude (V)": folder({
            amplitude: { value: 0.13, min: 0.0, max: 1.0, step: 0.001, label: "Value", render: isVertex, disabled: autoControls.amplitudeAuto },
            amplitudeRange: { value: [0.12, 0.12], min: 0.0, max: 1.0, label: "Range", render: isVertex, disabled: !autoControls.amplitudeAuto },
            amplitudeAnimSpeed: { value: 2.75, min: 0.1, max: 5.0, label: "Anim Speed", render: isVertex, disabled: !autoControls.amplitudeAuto },
        }, { render: isVertex }),

        "Angle (V)": folder({
            angle: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1, label: "Value", render: isVertex, disabled: autoControls.angleAuto },
            angleRange: { value: [-3.1, 3.14], min: -3.14, max: 3.14, label: "Range", render: isVertex, disabled: !autoControls.angleAuto },
            angleAnimSpeed: { value: 0.3, min: 0.1, max: 5.0, label: "Anim Speed", render: isVertex, disabled: !autoControls.angleAuto },
        }, { render: isVertex }),

        "Speed (F)": folder({
            speed2: { value: 3.2, min: 0.0, max: 5.0, step: 0.1, label: "Value", render: isFragment, disabled: autoControls.speed2Auto },
            speed2Range: { value: [0.1, 1.0], min: 0.0, max: 5.0, label: "Range", render: isFragment, disabled: !autoControls.speed2Auto },
            speed2AnimSpeed: { value: 0.5, min: 0.1, max: 5.0, label: "Anim Speed", render: isFragment, disabled: !autoControls.speed2Auto },
        }, { render: isFragment }),

        "Frequency (F)": folder({
            frequency2: { value: 20.0, min: 0.1, max: 20.0, step: 0.1, label: "Value", render: isFragment, disabled: autoControls.frequency2Auto },
            frequency2Range: { value: [0.1, 20.0], min: 0.1, max: 20.0, label: "Range", render: isFragment, disabled: !autoControls.frequency2Auto },
            frequency2AnimSpeed: { value: 0.5, min: 0.1, max: 5.0, label: "Anim Speed", render: isFragment, disabled: !autoControls.frequency2Auto },
        }, { render: isFragment }),

        "Amplitude (F)": folder({
            amplitude2: { value: 0.01, min: 0.0, max: 0.5, step: 0.001, label: "Value", render: isFragment, disabled: autoControls.amplitude2Auto },
            amplitude2Range: { value: [0.01, 0.1], min: 0.0, max: 0.5, label: "Range", render: isFragment, disabled: !autoControls.amplitude2Auto },
            amplitude2AnimSpeed: { value: 1.0, min: 0.1, max: 5.0, label: "Anim Speed", render: isFragment, disabled: !autoControls.amplitude2Auto },
        }, { render: isFragment }),
    }, [autoControls]); // Re-run when auto toggles change

    // Merge all controls for consumption
    const controls = { ...mainControls, ...autoControls, ...detailControls };

    const smokeMaterial = useRef<THREE.ShaderMaterial>(null);

    // Explicitly destructure for use in useFrame to avoid access issues if accessors were used
    // (Leva returns plain values, so spread is fine)

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;

        // Update Smoke Material
        if (smokeMaterial.current) {
            smokeMaterial.current.uniforms.uTime.value += delta;

            // Sync with Main Controls (Vertex)
            smokeMaterial.current.uniforms.uEnableVertex.value = controls.enableVertex ? 1.0 : 0.0;
            smokeMaterial.current.uniforms.uWaveType.value = controls.waveType;
        }

        if (material.current) {

            material.current.uniforms.uTime.value += delta;

            // Apply enables
            material.current.uniforms.uEnableVertex.value = controls.enableVertex ? 1.0 : 0.0;
            material.current.uniforms.uEnableFragment.value = controls.enableFragment ? 1.0 : 0.0;

            material.current.uniforms.uWaveType.value = controls.waveType;
            material.current.uniforms.uWaveType2.value = controls.waveType2;

            // Helper for simple sine oscillation
            const oscillate = (min: number, max: number, speed: number, offset: number = 0) => {
                const sine = (Math.sin(t * speed + offset) + 1) / 2; // 0 to 1
                return min + sine * (max - min);
            };

            // Updates object to trigger re-render of sliders if needed
            const updates: any = {};

            let currentSpeed = controls.speed;
            let currentFreq = controls.frequency;
            let currentAmp = controls.amplitude;
            let currentAngle = controls.angle;

            // --- Vertex Updates ---
            if (controls.speedAuto) {
                const val = oscillate(controls.speedRange[0], controls.speedRange[1], controls.speedAnimSpeed);
                material.current.uniforms.uSpeed.value = val;
                currentSpeed = val;
            } else {
                material.current.uniforms.uSpeed.value = controls.speed;
            }

            if (controls.frequencyAuto) {
                const val = oscillate(controls.frequencyRange[0], controls.frequencyRange[1], controls.frequencyAnimSpeed, 1.2);
                material.current.uniforms.uFrequency.value = val;
                currentFreq = val;
            } else {
                material.current.uniforms.uFrequency.value = controls.frequency;
            }

            if (controls.amplitudeAuto) {
                const val = oscillate(controls.amplitudeRange[0], controls.amplitudeRange[1], controls.amplitudeAnimSpeed, 2.4);
                material.current.uniforms.uAmplitude.value = val;
                currentAmp = val;
            } else {
                material.current.uniforms.uAmplitude.value = controls.amplitude;
            }

            if (controls.angleAuto) {
                const val = oscillate(controls.angleRange[0], controls.angleRange[1], controls.angleAnimSpeed, 3.5);
                material.current.uniforms.uAngle.value = val;
                currentAngle = val;
            } else {
                material.current.uniforms.uAngle.value = controls.angle;
            }

            // Sync Smoke to these calculated values
            if (smokeMaterial.current) {
                smokeMaterial.current.uniforms.uSpeed.value = currentSpeed;
                smokeMaterial.current.uniforms.uFrequency.value = currentFreq;
                smokeMaterial.current.uniforms.uAmplitude.value = currentAmp;
                smokeMaterial.current.uniforms.uAngle.value = currentAngle;
            }

            // Noise controls removed from Leva, so no update here.
            // material.current.uniforms.uNoiseStrength.value = controls.noiseStrength;


            // --- Fragment Updates ---
            if (controls.speed2Auto) {
                const val = oscillate(controls.speed2Range[0], controls.speed2Range[1], controls.speed2AnimSpeed, 4.0);
                material.current.uniforms.uSpeed2.value = val;
            } else {
                material.current.uniforms.uSpeed2.value = controls.speed2;
            }

            if (controls.frequency2Auto) {
                const val = oscillate(controls.frequency2Range[0], controls.frequency2Range[1], controls.frequency2AnimSpeed, 5.1);
                material.current.uniforms.uFrequency2.value = val;
            } else {
                material.current.uniforms.uFrequency2.value = controls.frequency2;
            }

            if (controls.amplitude2Auto) {
                const val = oscillate(controls.amplitude2Range[0], controls.amplitude2Range[1], controls.amplitude2AnimSpeed, 6.2);
                material.current.uniforms.uAmplitude2.value = val;
            } else {
                material.current.uniforms.uAmplitude2.value = controls.amplitude2;
            }
        }
    });

    const aspectRatio = 1148 / 1200;
    const planeHeight = 2.5;
    const planeWidth = planeHeight * aspectRatio;

    return (
        <group scale={[planeWidth, planeHeight, 1]}>
            <SmokeParticles controls={controls} materialRef={smokeMaterial} />

            <mesh ref={mesh}>
                <planeGeometry args={[1, 1, 128, 128]} />
                <warpShaderMaterial
                    ref={material}
                    uTexture={texture}
                    toneMapped={false}
                    transparent={true}
                />
            </mesh>
        </group>
    );
};

export const WarpedImage = ({
    src = "/images/systemicconvergence/beksinski-1.jpg",
    className
}: {
    src?: string,
    className?: string
}) => {
    return (
        <div className={`relative w-full overflow-hidden ${className}`}>
            <Leva theme={{ sizes: { rootWidth: '450px' } }} hidden />
            <div className="w-full h-full absolute inset-0">
                <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
                    <React.Suspense fallback={null}>
                        <ImagePlane imageSrc={src} />
                    </React.Suspense>
                </Canvas>
            </div>
            <img
                src={src}
                className="w-full h-auto opacity-0 pointer-events-none"
                alt="placeholder for sizing"
                aria-hidden="true"
            />
        </div>
    );
};
