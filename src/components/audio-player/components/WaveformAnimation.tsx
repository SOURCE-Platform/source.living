"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const WaveformAnimation = ({
    className,
    isActive
}: {
    className?: string;
    isActive: boolean;
}) => {
    const [shouldRender, setShouldRender] = useState(isActive);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (isActive) {
            setShouldRender(true);
            setIsExiting(false);
        } else {
            setIsExiting(true);
            // Wait for exit animation to finish before unmounting
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 600); // 0.4s max delay + 0.2s duration approx? actually max delay is 0.4s + duration.
            return () => clearTimeout(timer);
        }
    }, [isActive]);

    if (!shouldRender) return null;

    // First bar to appear is the far right one (index 4).
    // Delays should be such that Rightmost (index 4) has smallest delay.
    // Leftmost (index 0) has largest delay.
    // Wait, the user said "first bar to appear is the far right one. ... then the bar to the left of it ...".
    // So Right to Left appearance.

    // Bars array: [0, 1, 2, 3, 4]  (Left to Right visual order)
    // We want 4 to appear first, then 3, then 2, etc.

    const bars = [
        { height: "h-3", enterDelay: "0.4s" }, // Leftmost (last to appear)
        { height: "h-5", enterDelay: "0.3s" },
        { height: "h-7", enterDelay: "0.2s" },
        { height: "h-6", enterDelay: "0.1s" },
        { height: "h-4", enterDelay: "0s" },   // Rightmost (first to appear)
    ];

    // Outro: "reverse outro sequence where all bars shrink out of existence".
    // If intro was R->L (4,3,2,1,0), reverse outro would be L->R? Or R->L shrinking?
    // "reverse outro sequence" usually implies popping off in reverse order of entry.
    // Entry: 4->0. Reverse Entry: 0->4.
    // So Leftmost shrinks first?
    // Let's set exit delays accordingly.

    // If bar 0 enters last (0.4s), it should exit first? Or exit last to maintain LIFO? 
    // "Reverse" of 4->0 appearing could be 0->4 disappearing.

    // Let's try:
    // Bar 0: exitDelay 0s
    // Bar 4: exitDelay 0.4s

    return (
        <div className={cn("flex items-center justify-center h-[30px]", className)}>
            <div className="flex items-center gap-[2px] h-full">
                {bars.map((bar, index) => {
                    // Dynamic animation assignment
                    // If exiting: waveform-exit
                    // If entering/active: waveform-enter then waveform (loop)
                    // But standard CSS doesn't easily chain enter -> loop without complex keyframes or JS events.
                    // A trick: 'waveform-enter 0.5s ease forwards, waveform 0.8s ease-in-out 0.5s infinite' 
                    // combining animations.

                    const enterAnim = `waveform-enter 0.3s ease-out ${bar.enterDelay} forwards`;
                    const loopAnim = `waveform 0.8s ease-in-out ${parseFloat(bar.enterDelay) + 0.3}s infinite`;
                    const exitAnim = `waveform-exit 0.3s ease-in ${// Calculate exit delay based on index
                        // We want 0 to exit first (0s), 4 to exit last (0.4s)
                        // index 0 -> 0s
                        // index 4 -> 0.4s
                        (index * 0.1) + "s"
                        } forwards`;

                    return (
                        <div
                            key={index}
                            className={cn(
                                "w-[2px] rounded-full opacity-0", // Start invisible
                            )}
                            style={{
                                backgroundImage: "var(--background-image-playgrade)",
                                backgroundSize: "200% 200%",
                                height: "100%",
                                maxHeight: "100%",
                                animation: isExiting
                                    ? exitAnim
                                    : `${enterAnim}, ${loopAnim}`,
                                // We need to set transform origin or initial scale? 
                                // Keyframes handle scaleY.
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};
