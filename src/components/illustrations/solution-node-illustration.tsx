"use client";

import { useId, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SolutionNodeIllustrationProps {
    className?: string;
}

export function SolutionNodeIllustration({ className }: SolutionNodeIllustrationProps) {
    const rawId = useId();
    const idPrefix = rawId.replace(/:/g, "-");
    const gradientLightId = `${idPrefix}-gradient-light`;
    const gradientDarkId = `${idPrefix}-gradient-dark`;

    // Configuration
    const lineCount = 14;
    const width = 1920;
    const height = 800; // User requested 800
    const cx = width / 2;
    const cy = height / 2;
    const k = 3; // Decay factor
    const spreadY = 380; // Adjusted for 800 height (approx 800/2 minus padding)
    const speed = 0.05; // Animation speed

    // Refs for accessing DOM elements directly for performance
    const lightLeftPathsRef = useRef<(SVGPathElement | null)[]>([]);
    const lightRightPathsRef = useRef<(SVGPathElement | null)[]>([]);
    const darkLeftPathsRef = useRef<(SVGPathElement | null)[]>([]);
    const darkRightPathsRef = useRef<(SVGPathElement | null)[]>([]);

    useEffect(() => {
        let animationFrameId: number;
        let startTime: number | null = null;

        const updateFrame = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = (timestamp - startTime) / 1000; // Seconds

            // Calculate shared layout parameters for this frame
            for (let i = 0; i < lineCount; i++) {
                // Calculate normalized position 't' based on time
                // i / lineCount distributes the lines initially
                // - (elapsed * speed) moves them "up" (decreasing t)
                // % 1 wraps them around [0, 1]

                // We want moving from Bottom (1) to Top (-1).
                // Let's us a Base Phase 0..1
                const initialOffset = i / lineCount;
                const phase = (initialOffset + (elapsed * speed)) % 1;

                // Map Phase 0->1 to t = 1->-1 (Bottom to Top)
                const t = 1 - (2 * phase);

                // Apply exponential shaping
                const sign = Math.sign(t);
                const val = Math.abs(t);
                const shapedVal = (1 - Math.exp(-k * val)) / (1 - Math.exp(-k));

                // Calculate Opacity (Fade at edges)
                // t goes from 1 (bottom start) to -1 (top end)
                // Fade in near 1, fade out near -1
                const fadeRange = 0.15; // 15% of the total distance
                let opacity = 1;

                if (t > (1 - fadeRange)) {
                    // Fading in (Bottom)
                    opacity = (1 - t) / fadeRange;
                } else if (t < (-1 + fadeRange)) {
                    // Fading out (Top)
                    opacity = (t + 1) / fadeRange;
                }

                // Calculate offsets
                const offsetY = spreadY * shapedVal * sign;
                const targetY = cy + offsetY;

                const centerPinch = 450;
                const edgeFlatten = 400;

                // Build path strings
                const dLeft = `M ${cx} ${cy} C ${cx - centerPinch} ${cy}, ${edgeFlatten} ${targetY}, 0 ${targetY}`;
                const dRight = `M ${cx} ${cy} C ${cx + centerPinch} ${cy}, ${width - edgeFlatten} ${targetY}, ${width} ${targetY}`;

                // Update DOM
                const setProps = (el: SVGPathElement | null, d: string) => {
                    if (el) {
                        el.setAttribute("d", d);
                        el.setAttribute("stroke-opacity", opacity.toString());
                    }
                };

                setProps(lightLeftPathsRef.current[i], dLeft);
                setProps(lightRightPathsRef.current[i], dRight);
                setProps(darkLeftPathsRef.current[i], dLeft);
                setProps(darkRightPathsRef.current[i], dRight);
            }

            animationFrameId = requestAnimationFrame(updateFrame);
        };

        animationFrameId = requestAnimationFrame(updateFrame);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className={cn("relative w-full h-[300px] overflow-visible", className)}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                {/* Main Glow */}
                <div className="absolute w-[80px] h-[80px] bg-white rounded-full blur-[50px] opacity-60 animate-pulse" />
                <div className="absolute w-[40px] h-[40px] bg-white rounded-full blur-[25px] opacity-90" />
                {/* Central Circle - HTML to avoid SVG aspect ratio skew */}
                <div className="absolute w-[64px] h-[64px] bg-white rounded-full z-20" />
            </div>

            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <radialGradient
                        id={gradientLightId}
                        cx={cx}
                        cy={height}
                        r={height}
                        fx={cx}
                        fy={height}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="#ABAB88" />
                        <stop offset="20%" stopColor="#9B4460" />
                        <stop offset="50%" stopColor="#1F1F1C" />
                        <stop offset="100%" stopColor="#141B5C" />
                    </radialGradient>

                    <linearGradient
                        id={gradientDarkId}
                        x1={cx}
                        y1={height}
                        x2={cx}
                        y2="0"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="#FFC1D5" />
                        <stop offset="29.69%" stopColor="#FFC1D5" />
                        <stop offset="61.98%" stopColor="#FEFFE3" />
                        <stop offset="100%" stopColor="#97A1FB" />
                    </linearGradient>
                </defs>

                {/* Light Mode Paths */}
                <g className="dark:hidden">
                    {Array.from({ length: 14 }).map((_, i) => (
                        <g key={`light-group-${i}`}>
                            <path
                                ref={el => { lightLeftPathsRef.current[i] = el; }}
                                fill="none"
                                stroke={`url(#${gradientLightId})`}
                                strokeWidth="1"
                                vectorEffect="non-scaling-stroke"
                            />
                            <path
                                ref={el => { lightRightPathsRef.current[i] = el; }}
                                fill="none"
                                stroke={`url(#${gradientLightId})`}
                                strokeWidth="1"
                                vectorEffect="non-scaling-stroke"
                            />
                        </g>
                    ))}
                </g>

                {/* Dark Mode Paths */}
                <g className="hidden dark:block">
                    {Array.from({ length: 14 }).map((_, i) => (
                        <g key={`dark-group-${i}`}>
                            <path
                                ref={el => { darkLeftPathsRef.current[i] = el; }}
                                fill="none"
                                stroke={`url(#${gradientDarkId})`}
                                strokeWidth="1"
                                vectorEffect="non-scaling-stroke"
                            />
                            <path
                                ref={el => { darkRightPathsRef.current[i] = el; }}
                                fill="none"
                                stroke={`url(#${gradientDarkId})`}
                                strokeWidth="1"
                                vectorEffect="non-scaling-stroke"
                            />
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    );
}
