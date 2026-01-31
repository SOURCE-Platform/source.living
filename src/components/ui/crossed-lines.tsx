"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface CrossedLinesProps {
    className?: string;
}

export function CrossedLines({ className }: CrossedLinesProps) {
    const rawId = useId();
    const idPrefix = rawId.replace(/:/g, "-");
    const gradientLightId = `${idPrefix}-gradient-light`;
    const gradientDarkId = `${idPrefix}-gradient-dark`;

    return (
        <div className={cn("w-full h-full pointer-events-none", className)}>
            <svg
                viewBox="0 0 100 100"
                className="w-full h-full block"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient
                        id={gradientLightId}
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                    >
                        <animateTransform
                            attributeName="gradientTransform"
                            type="rotate"
                            from="0 0.5 0.5"
                            to="360 0.5 0.5"
                            dur="15s"
                            repeatCount="indefinite"
                        />
                        <stop offset="0%" stopColor="#ABAB88" />
                        <stop offset="19%" stopColor="#9B4460" />
                        <stop offset="35%" stopColor="#1F1F1C" />
                        <stop offset="64%" stopColor="#1F1F1C" />
                        <stop offset="100%" stopColor="#141B5C" />
                    </linearGradient>

                    <linearGradient
                        id={gradientDarkId}
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                    >
                        <stop offset="0%" stopColor="#FFC1D5" />
                        <stop offset="29.69%" stopColor="#FFC1D5" />
                        <stop offset="61.98%" stopColor="#FEFFE3" />
                        <stop offset="100%" stopColor="#97A1FB" />
                    </linearGradient>
                </defs>

                <g className="dark:hidden">
                    <path
                        d="M 0 0 L 100 100"
                        fill="none"
                        stroke={`url(#${gradientLightId})`}
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M 100 0 L 0 100"
                        fill="none"
                        stroke={`url(#${gradientLightId})`}
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>

                <g className="hidden dark:block">
                    <path
                        d="M 0 0 L 100 100"
                        fill="none"
                        stroke={`url(#${gradientDarkId})`}
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        d="M 100 0 L 0 100"
                        fill="none"
                        stroke={`url(#${gradientDarkId})`}
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>
            </svg>
        </div>
    );
}
