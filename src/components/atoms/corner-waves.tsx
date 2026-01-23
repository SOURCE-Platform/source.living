"use client";

import React, { useEffect, useRef, useId, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface CornerWavesProps {
    className?: string;
    lineCount?: number;
}

export function CornerWaves({ className, lineCount = 40 }: CornerWavesProps) {
    const rawId = useId();
    const idPrefix = rawId.replace(/:/g, "-");
    const gradientId = `${idPrefix}-gradient`;

    const svgRef = useRef<SVGSVGElement>(null);
    const lightPathsRef = useRef<(SVGPathElement | null)[]>([]);
    const darkPathsRef = useRef<(SVGPathElement | null)[]>([]);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Detect scroll to pause animation
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolling(true);

            // Clear existing timeout
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            // Resume animation 150ms after scroll stops
            scrollTimeoutRef.current = setTimeout(() => {
                setIsScrolling(false);
            }, 150);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        let animationFrameId: number;

        // Waves state
        const waves = Array.from({ length: lineCount }).map((_, i) => ({
            phase: i / lineCount,
        }));

        // Pre-calculate constants
        const k = 4;
        const expK = Math.exp(k) - 1;
        const maxRadius = 180;
        const segments = 25;
        const startAngle = Math.PI / 2;
        const angleRange = Math.PI / 2;
        const noiseFreq = 50;

        const isDarkMode = () => document.documentElement.classList.contains('dark');

        const updateEx = () => {
            // Skip updates while scrolling
            if (isScrolling) {
                animationFrameId = requestAnimationFrame(updateEx);
                return;
            }

            if (!svgRef.current) {
                animationFrameId = requestAnimationFrame(updateEx);
                return;
            }

            const dark = isDarkMode();
            const pathsRef = dark ? darkPathsRef : lightPathsRef;
            const speed = 0.0008;

            waves.forEach((wave, i) => {
                wave.phase += speed;
                if (wave.phase > 1) wave.phase -= 1;

                const normalizedR = (Math.exp(k * wave.phase) - 1) / expK;
                const r = normalizedR * maxRadius;
                const noiseAmp = 2 * wave.phase;

                // First compute all points
                const points: { x: number; y: number }[] = [];
                for (let j = 0; j <= segments; j++) {
                    const step = j / segments;
                    const baseAngle = startAngle + step * angleRange;
                    // Time offset makes the wave travel along the arc (from top-right to bottom-left)
                    const timeOffset = wave.phase * 50;
                    const wiggle = Math.sin(baseAngle * noiseFreq + timeOffset) * noiseAmp;
                    const currentR = r + wiggle;

                    const x = 100 + currentR * Math.cos(baseAngle);
                    const y = currentR * Math.sin(baseAngle);
                    points.push({ x, y });
                }

                // Build smooth path using Catmull-Rom to Bezier
                let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
                const tension = 6;

                for (let j = 0; j < points.length - 1; j++) {
                    const p0 = points[Math.max(0, j - 1)];
                    const p1 = points[j];
                    const p2 = points[j + 1];
                    const p3 = points[Math.min(points.length - 1, j + 2)];

                    const cp1x = p1.x + (p2.x - p0.x) / tension;
                    const cp1y = p1.y + (p2.y - p0.y) / tension;
                    const cp2x = p2.x - (p3.x - p1.x) / tension;
                    const cp2y = p2.y - (p3.y - p1.y) / tension;

                    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
                }

                const opacity = (1 - Math.pow(wave.phase, 3)).toFixed(2);

                const path = pathsRef.current[i];
                if (path) {
                    path.setAttribute("d", d);
                    path.style.opacity = opacity;
                }
            });

            animationFrameId = requestAnimationFrame(updateEx);
        };

        animationFrameId = requestAnimationFrame(updateEx);
        return () => cancelAnimationFrame(animationFrameId);
    }, [lineCount, isScrolling]);

    return (
        <div className={cn("w-full h-full overflow-hidden", className)}>
            <svg
                ref={svgRef}
                viewBox="0 0 100 100"
                className="w-full h-full block"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient
                        id={`${gradientId}-light`}
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                        gradientUnits="objectBoundingBox"
                    >
                        <stop offset="0%" stopColor="#02ABFF" />
                        <stop offset="100%" stopColor="#001AFF" />
                    </linearGradient>

                    <linearGradient
                        id={`${gradientId}-dark`}
                        x1="100%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                        gradientUnits="objectBoundingBox"
                    >
                        <stop offset="0%" stopColor="#FFC1D5" />
                        <stop offset="29.69%" stopColor="#FFC1D5" />
                        <stop offset="61.98%" stopColor="#FEFFE3" />
                        <stop offset="100%" stopColor="#97A1FB" />
                    </linearGradient>
                </defs>

                <g className="dark:hidden">
                    {Array.from({ length: lineCount }).map((_, i) => (
                        <path
                            key={`light-${i}`}
                            ref={(el) => { lightPathsRef.current[i] = el; }}
                            fill="none"
                            stroke="black"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                        />
                    ))}
                </g>

                <g className="hidden dark:block">
                    {Array.from({ length: lineCount }).map((_, i) => (
                        <path
                            key={`dark-${i}`}
                            ref={(el) => { darkPathsRef.current[i] = el; }}
                            fill="none"
                            stroke="black"
                            strokeWidth="1"
                            vectorEffect="non-scaling-stroke"
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
}
