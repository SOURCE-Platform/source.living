"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { SmokeParticles } from "@/components/3d/SmokeEffect";

interface SideNoiseShaderProps {
    side: "left" | "right";
    className?: string;
}

export const SideNoiseShader = ({ side, className = "" }: SideNoiseShaderProps) => {
    // Position styling based on side
    // heavily localized to ensure it's "half off page"
    // We position the container such that its center is roughly on the edge
    const positionStyle = side === "left"
        ? { left: "-15vw" }
        : { right: "-15vw" };

    return (
        <div
            className={`fixed top-0 bottom-0 w-[30vw] pointer-events-none z-0 mix-blend-multiply opacity-80 ${className}`}
            style={positionStyle}
        >
            <Canvas
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
                camera={{ position: [0, 0, 1], fov: 75 }}
            >
                <ambientLight intensity={1} />
                <group scale={[2, 4, 1]}>
                    <SmokeParticles
                        autoUpdate={true}
                        config={{
                            enableVertex: true,
                            speed: 0.2, // Slower, more ambient
                            frequency: 1.0,
                            amplitude: 0.2,
                            angle: side === "left" ? 0.2 : -0.2, // Slight tilt inward
                            waveType: 1 // Sine wave for smooth motion
                        }}
                    />
                </group>
            </Canvas>
        </div>
    );
};
