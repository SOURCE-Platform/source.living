"use client";

import React, { useId, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ArcWavesProps {
    className?: string;
    lineCount?: number;
    targetRef?: any;
}

export function ArcWaves({ className, lineCount = 15, targetRef }: ArcWavesProps) {
    const rawId = useId();
    const idPrefix = rawId.replace(/:/g, "-");
    const gradientLightId = `${idPrefix}-gradient-light`;
    const gradientDarkId = `${idPrefix}-gradient-dark`;

    const svgRef = useRef<SVGSVGElement>(null);
    const lightGroupRef = useRef<SVGGElement>(null);
    const darkGroupRef = useRef<SVGGElement>(null);
    const lightPathsRef = useRef<(SVGPathElement | null)[]>([]);
    const darkPathsRef = useRef<(SVGPathElement | null)[]>([]);

    useEffect(() => {
        let animationFrameId: number;

        const updatePaths = () => {
            if (!svgRef.current || !targetRef?.current) return;

            const svgRect = svgRef.current.getBoundingClientRect();
            const targetRect = targetRef.current.getBoundingClientRect();

            // Calculate target center relative to SVG top
            // SVG bottom is at svgRect.height (which is mapped to viewBox 100)
            const targetCenterYPx = (targetRect.top + targetRect.height / 2) - svgRect.top;

            // Map pixels to viewBox coordinates (0-100 vertical)
            // viewBox is 0 0 100 100. Height is 100 units.
            const scaleY = 100 / svgRect.height;
            const targetCenterY = targetCenterYPx * scaleY;

            // Update paths
            // We want arcs to stack concentrically around the target center.
            // Each arc should have a control point cy relative to targetCenterY.
            // Pinned at bottom corners: 0,100 and 100,100.

            const updateGroup = (paths: (SVGPathElement | null)[]) => {
                // Calculate strictly constrained spacing
                const targetHeightUnits = targetRect.height * scaleY;
                // Use 95% of the circle height to ensure even the strokes fit nicely inside
                const availableHeight = targetHeightUnits * 0.95;

                // Calculate spacing to distribute N lines over the available height
                // The distance between top and bottom line is availableHeight
                const spacing = lineCount > 1 ? availableHeight / (lineCount - 1) : 0;

                // Center the stack around targetCenterY
                // Top line is at -HalfHeight, Bottom at +HalfHeight
                const startY = targetCenterY - (availableHeight / 2);

                paths.forEach((path, i) => {
                    if (!path) return;

                    const apexY = startY + (i * spacing);
                    const controlY = 2 * (apexY - 50);

                    path.setAttribute("d", `M 0 100 Q 50 ${controlY} 100 100`);
                });
            };

            updateGroup(lightPathsRef.current);
            updateGroup(darkPathsRef.current);

            // Fade Out Logic
            const fadeStart = window.innerHeight / 2;
            const fadeDist = 500;
            let opacity = 1;
            if (targetCenterYPx < fadeStart) {
                opacity = Math.max(0, 1 - (fadeStart - targetCenterYPx) / fadeDist);
            }

            if (lightGroupRef.current) lightGroupRef.current.style.opacity = opacity.toString();
            if (darkGroupRef.current) darkGroupRef.current.style.opacity = opacity.toString();

            animationFrameId = requestAnimationFrame(updatePaths);
        };

        // Start loop
        animationFrameId = requestAnimationFrame(updatePaths);

        return () => cancelAnimationFrame(animationFrameId);
    }, [targetRef, lineCount]);

    return (
        <div className={cn("w-full h-full", className)}>
            <svg
                ref={svgRef}
                viewBox="0 0 100 100"
                className="w-full h-full block"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <radialGradient
                        id={gradientLightId}
                        cx="50"
                        cy="100"
                        r="100"
                        fx="50"
                        fy="100"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="#ABAB88" />
                        <stop offset="20%" stopColor="#9B4460" />
                        <stop offset="50%" stopColor="#1F1F1C" />
                        <stop offset="100%" stopColor="#141B5C" />
                    </radialGradient>

                    <linearGradient
                        id={gradientDarkId}
                        x1="50"
                        y1="100"
                        x2="50"
                        y2="0"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="#FFC1D5" />
                        <stop offset="29.69%" stopColor="#FFC1D5" />
                        <stop offset="61.98%" stopColor="#FEFFE3" />
                        <stop offset="100%" stopColor="#97A1FB" />
                    </linearGradient>
                </defs>

                <g className="dark:hidden" ref={lightGroupRef}>
                    {Array.from({ length: lineCount }).map((_, i) => (
                        <path
                            key={`light-${i}`}
                            ref={(el) => { lightPathsRef.current[i] = el; }}
                            fill="none"
                            stroke={`url(#${gradientLightId})`}
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                        />
                    ))}
                </g>

                <g className="hidden dark:block" ref={darkGroupRef}>
                    {Array.from({ length: lineCount }).map((_, i) => (
                        <path
                            key={`dark-${i}`}
                            ref={(el) => { darkPathsRef.current[i] = el; }}
                            fill="none"
                            stroke={`url(#${gradientDarkId})`}
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
}
