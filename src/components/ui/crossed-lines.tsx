"use client";

import React, { useId, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Physics state for each stop
interface StopData {
    id: string; // unique ID for key
    color: string;

    // Gap Physics
    baseGap: number; // The logic-assigned gap (0.1% - 15%)
    phase: number;   // Oscillation phase
    freq: number;    // Oscillation frequency

    // Runtime state
    currentPos: number; // Absolute position
    element: SVGStopElement | null; // Direct DOM ref
}

interface CrossedLinesProps {
    className?: string;
    targetRef?: React.RefObject<HTMLElement | null>;
}

export function CrossedLines({ className, targetRef }: CrossedLinesProps) {
    const rawId = useId();
    const idPrefix = rawId.replace(/:/g, "-");

    const lightPath1Ref = useRef<SVGPathElement>(null);
    const lightPath2Ref = useRef<SVGPathElement>(null);

    const grad1Ref = useRef<SVGLinearGradientElement>(null);
    const grad2Ref = useRef<SVGLinearGradientElement>(null);

    // Initial State for rendering (only created once per mount to seed the DOM)
    const [stops1Init, setStops1Init] = useState<StopData[]>([]);
    const [stops2Init, setStops2Init] = useState<StopData[]>([]);

    // Mutable Physics State
    const stops1Ref = useRef<StopData[]>([]);
    const stops2Ref = useRef<StopData[]>([]);

    useEffect(() => {
        // --- Generation Logic ---
        const generateInitialStops = (prefix: string) => {
            const stops: StopData[] = [];

            // Generate enough to cover > 150% ensures buffer for recycling
            // Start at a negative buffer to avoid pop-in
            let currentOffset = -50;
            let count = 0;

            // Clustered logic
            let isCluster = Math.random() > 0.5;

            while (currentOffset < 200) {
                let gap;
                if (isCluster) {
                    // 0.1% to 2.0%
                    gap = Math.random() * 1.9 + 0.1;
                } else {
                    // 1.0% to 15%
                    gap = Math.random() * 14 + 1.0;
                }

                // Switch modes
                if (isCluster && Math.random() > 0.85) isCluster = false;
                if (!isCluster && Math.random() > 0.75) isCluster = true;

                currentOffset += gap;

                const color = Math.random() > 0.5 ? "#FE0164" : "#000000";

                stops.push({
                    id: `${prefix}-${count}`,
                    color,
                    baseGap: gap,
                    phase: Math.random() * Math.PI * 2,
                    freq: Math.random() * 0.002 + 0.001, // Slow breathing
                    currentPos: currentOffset,
                    element: null // Populated via callback
                });
                count++;
            }
            return stops;
        };

        const s1 = generateInitialStops("s1");
        const s2 = generateInitialStops("s2");

        stops1Ref.current = s1;
        stops2Ref.current = s2;

        setStops1Init(s1);
        setStops2Init(s2);

    }, []);

    useEffect(() => {
        if (!targetRef) return;
        // Don't start loop until initialized
        if (stops1Ref.current.length === 0) return;

        let animationFrameId: number;
        let time = 0;

        // --- recycling helper ---
        const updateChain = (stops: StopData[], gradientEl: SVGLinearGradientElement | null) => {
            if (!gradientEl) return;

            // 1. Update Head Position (Global Flow)
            // Move entire chain left
            const speed = 0.2; // Base scroll speed
            stops[0].currentPos -= speed;

            // 2. Physics & Propagation
            // Recalculate all positions based on gaps from the head
            let prevPos = stops[0].currentPos;

            for (let i = 1; i < stops.length; i++) {
                const s = stops[i];
                // Breathing: Modulate gap
                // 0.8 to 1.2 multiplier (subtle smooth breathing)
                const breath = 1 + 0.2 * Math.sin(time * s.freq + s.phase);
                const dynamicGap = s.baseGap * breath;

                s.currentPos = prevPos + dynamicGap;
                prevPos = s.currentPos;
            }

            // 3. Recycle Check
            // If the first stop is waaay off screen (< -50 offset?), move to end
            // We use -50 buffer to be safe.
            if (stops[0].currentPos < -50) {
                const recycled = stops.shift();
                if (recycled) {
                    const last = stops[stops.length - 1];

                    // Generate new physics for it to keep pattern interesting
                    let gap;
                    // Simply random for single recycling, or maintain cluster logic state?
                    // Simple random is robust enough for infinite scroll
                    const isCluster = Math.random() > 0.6;
                    gap = isCluster ? (Math.random() * 1.9 + 0.1) : (Math.random() * 14 + 1.0);

                    recycled.baseGap = gap;
                    recycled.currentPos = last.currentPos + gap;

                    // Move to end of array
                    stops.push(recycled);

                    // Move in DOM to maintain render order (CRITICAL for gradients)
                    if (recycled.element) {
                        gradientEl.appendChild(recycled.element);
                    }
                }
            }

            // 4. Render Updates
            // Only render visual range 0-100 to avoid performance hit? 
            // SVG gradient stops work best when sorted. Our logic guarantees sorted positions.
            stops.forEach(s => {
                if (s.element) {
                    // Optimization: Only update if changed significantly? 
                    // Or just update. RAF is fast.
                    s.element.setAttribute("offset", `${s.currentPos}%`);
                }
            });
        };

        const updateFrame = () => {
            time += 16; // approx ms

            // Update Bezier (Existing Logic)
            if (targetRef.current && lightPath1Ref.current && lightPath2Ref.current) {
                const targetRect = targetRef.current.getBoundingClientRect();
                const vpW = window.innerWidth;
                const vpH = window.innerHeight;
                const targetCx = targetRect.left + targetRect.width / 2;
                const targetCy = targetRect.top + targetRect.height / 2;
                const pxToSvgX = (px: number) => (px / vpW) * 100;
                const pxToSvgY = (px: number) => (px / vpH) * 100;
                const Px = pxToSvgX(targetCx);
                const Py = pxToSvgY(targetCy);

                const Cx1 = 2 * Px - 50; const Cy1 = 2 * Py - 50;
                const Cx2 = 2 * Px - 50; const Cy2 = 2 * Py - 50;

                lightPath1Ref.current.setAttribute("d", `M 0 0 Q ${Cx1} ${Cy1} 100 100`);
                lightPath2Ref.current.setAttribute("d", `M 100 0 Q ${Cx2} ${Cy2} 0 100`);
            }

            // Update Gradients
            updateChain(stops1Ref.current, grad1Ref.current);
            updateChain(stops2Ref.current, grad2Ref.current);

            animationFrameId = requestAnimationFrame(updateFrame);
        };

        const startLoop = () => {
            animationFrameId = requestAnimationFrame(updateFrame);
        };
        startLoop();
        return () => cancelAnimationFrame(animationFrameId);

    }, [targetRef, stops1Init]); // depend on Init to restart loop if re-generated

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
                        id={`${idPrefix}-gradient-1`}
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                        spreadMethod="repeat"
                        ref={grad1Ref}
                    >
                        {stops1Init.map((stop) => (
                            <stop
                                key={stop.id}
                                ref={(el) => {
                                    const refItem = stops1Ref.current.find(s => s.id === stop.id);
                                    if (refItem) refItem.element = el;
                                }}
                                offset={`${stop.currentPos}%`}
                                stopColor={stop.color}
                            />
                        ))}
                    </linearGradient>

                    <linearGradient
                        id={`${idPrefix}-gradient-2`}
                        x1="1"
                        y1="0"
                        x2="0"
                        y2="1"
                        spreadMethod="repeat"
                        ref={grad2Ref}
                    >
                        {stops2Init.map((stop) => (
                            <stop
                                key={stop.id}
                                ref={(el) => {
                                    const refItem = stops2Ref.current.find(s => s.id === stop.id);
                                    if (refItem) refItem.element = el;
                                }}
                                offset={`${stop.currentPos}%`}
                                stopColor={stop.color}
                            />
                        ))}
                    </linearGradient>
                </defs>

                <g>
                    <path
                        ref={lightPath1Ref}
                        d="M 0 0 L 100 100"
                        fill="none"
                        stroke={`url(#${idPrefix}-gradient-1)`}
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                    />
                    <path
                        ref={lightPath2Ref}
                        d="M 100 0 L 0 100"
                        fill="none"
                        stroke={`url(#${idPrefix}-gradient-2)`}
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                    />
                </g>
            </svg>
        </div>
    );
}
