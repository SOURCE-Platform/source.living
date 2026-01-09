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

extend({ WarpShaderMaterial });

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
    }
}

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

    // Explicitly destructure for use in useFrame to avoid access issues if accessors were used
    // (Leva returns plain values, so spread is fine)

    useFrame((state, delta) => {
        if (material.current) {
            const t = state.clock.elapsedTime;
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

            // --- Vertex Updates ---
            if (controls.speedAuto) {
                const val = oscillate(controls.speedRange[0], controls.speedRange[1], controls.speedAnimSpeed);
                material.current.uniforms.uSpeed.value = val;
                // We update the 'speed' control value so it shows visually if we were to unhide it, 
                // but actually since we hide it, maybe we don't need to 'set' it? 
                // User wants to SEE range and animation. 
                // If we hide the manual slider, they can't see the value moving. 
                // But the user asked for range handles. 
                // Maybe we should keep the manual slider visible but disabled/readonly? Leva doesn't support that easily.
                // Or maybe we update the Range slider itself? No.
                // Let's just update the uniform. If user unchecks Auto, it snaps back to manual.
            } else {
                material.current.uniforms.uSpeed.value = controls.speed;
            }

            if (controls.frequencyAuto) {
                const val = oscillate(controls.frequencyRange[0], controls.frequencyRange[1], controls.frequencyAnimSpeed, 1.2);
                material.current.uniforms.uFrequency.value = val;
            } else {
                material.current.uniforms.uFrequency.value = controls.frequency;
            }

            if (controls.amplitudeAuto) {
                const val = oscillate(controls.amplitudeRange[0], controls.amplitudeRange[1], controls.amplitudeAnimSpeed, 2.4);
                material.current.uniforms.uAmplitude.value = val;
            } else {
                material.current.uniforms.uAmplitude.value = controls.amplitude;
            }

            if (controls.angleAuto) {
                const val = oscillate(controls.angleRange[0], controls.angleRange[1], controls.angleAnimSpeed, 3.5);
                material.current.uniforms.uAngle.value = val;
            } else {
                material.current.uniforms.uAngle.value = controls.angle;
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
        <mesh ref={mesh} scale={[planeWidth, planeHeight, 1]}>
            <planeGeometry args={[1, 1, 128, 128]} />
            <warpShaderMaterial
                ref={material}
                uTexture={texture}
                toneMapped={false}
                transparent={true}
            />
        </mesh>
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
