"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface ArcWavesProps {
    className?: string;
    lineCount?: number;
}

export function ArcWaves({ className, lineCount = 15 }: ArcWavesProps) {
    const rawId = useId();
    // React's useId generates strings like ":r1:", which are invalid in CSS selectors/class names unless escaped.
    // We'll treat it as a string and replace colons with dashes or underscores.
    const idPrefix = rawId.replace(/:/g, "-");

    const gradientLightId = `${idPrefix}-gradient-light`;
    const gradientDarkId = `${idPrefix}-gradient-dark`;

    // Generate radii for the arcs.
    // We want them to span the full width of the viewport.
    // The viewBox is 0 0 100 50 (top half of a 100x100 circle).
    // The outermost radius should be 50.
    // We want ~15 arcs.
    // Let's space them out nicely.
    const radii = Array.from({ length: lineCount }, (_, i) => {
        // Distribute from R=50 down to some inner radius, say R=20 or 10.
        // Or linear distribution.
        const t = i / (lineCount - 1);
        // Outer to inner
        return 50 - t * 35; // 50 down to 15
    });

    return (
        <div className={cn("w-full", className)}>
            <svg
                viewBox="0 0 100 50"
                className="w-full h-full block bg-blue-500/20"
                preserveAspectRatio="xMidYMax slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M 10 50 A 40 40 0 0 0 90 50" fill="none" stroke="red" strokeWidth="2" />
                <defs>
                    {/* Light Mode Gradient: Playgrade Light */}
                    <radialGradient
                        id={gradientLightId}
                        cx="30"
                        cy="30"
                        r="100"
                        fx="30"
                        fy="30"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="#ABAB88" />
                        <stop offset="20%" stopColor="#9B4460" />
                        <stop offset="50%" stopColor="#1F1F1C" />
                        <stop offset="100%" stopColor="#141B5C" />
                    </radialGradient>

                    {/* Dark Mode Gradient: Playgrade */}
                    <linearGradient
                        id={gradientDarkId}
                        x1="0"
                        y1="0"
                        x2="100"
                        y2="50"
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
                    {radii.map((r, i) => (
                        <path
                            key={`light-${i}`}
                            d={`M ${50 - r} 50 A ${r} ${r} 0 0 0 ${50 + r} 50`}
                            fill="none"
                            stroke={`url(#${gradientLightId})`}
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                        />
                    ))}
                </g>

                {/* Dark Mode Paths */}
                <g className="hidden dark:block">
                    {radii.map((r, i) => (
                        <path
                            key={`dark-${i}`}
                            d={`M ${50 - r} 50 A ${r} ${r} 0 0 0 ${50 + r} 50`}
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
