"use client"

import React, { useRef, useEffect, useState } from "react"

interface WipeLoopVideoProps {
    src: string
    className?: string
}

export function WipeLoopVideo({ src, className }: WipeLoopVideoProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const video1Ref = useRef<HTMLVideoElement>(null)
    const video2Ref = useRef<HTMLVideoElement>(null)

    // Track which video is currently "Main" (visible/active)
    // 1 means video1 is playing the main content. 2 means video2.
    const activeVideoRef = useRef<1 | 2>(1)

    // Configuration
    const WIPE_DURATION = 2.0 // seconds

    useEffect(() => {
        const v1 = video1Ref.current
        const v2 = video2Ref.current
        if (!v1 || !v2) return

        // Initial setup
        v1.src = src
        v2.src = src

        // Ensure v2 is paused and hidden initially?
        // Actually, we'll stack them.
        // Active is on TOP. When wiping, Incoming is UNDERNEATH?
        // User said: "wipe from right to left to reveal the same video underneath playing"
        // So Top Video (Old) gets wiped away to reveal Bottom Video (New).
        // Strategy:
        // - Z-Index 2: Active Video (Old)
        // - Z-Index 1: Next Video (New)
        // Operation:
        // 1. Play Active.
        // 2. Near end: Prepare Next (seek 0, play).
        // 3. Animate Active's mask (Right to Left wipe).
        // 4. Once wipe done: Active becomes Next (Index 1). Next becomes Active (Index 2, Z-Index 2).
        //    Reset the Old mask.

        // Set initial Z-indices
        v1.style.zIndex = "2"
        v2.style.zIndex = "1"
        v1.play().catch(() => { })

        // Animation Loop
        let animationFrameId: number

        const loop = () => {
            const active = activeVideoRef.current === 1 ? v1 : v2
            const next = activeVideoRef.current === 1 ? v2 : v1

            if (active.duration) {
                const timeLeft = active.duration - active.currentTime

                // TRIGGER TRANSITION
                if (timeLeft <= WIPE_DURATION) {
                    // Ensure 'next' is playing
                    if (next.paused) {
                        next.currentTime = 0
                        next.play().catch(() => { })
                    }

                    // Calculate Progress (0 to 1)
                    // 0 = Start of wipe
                    // 1 = End of wipe (Active fully hidden)
                    const progress = Math.max(0, Math.min(1, (WIPE_DURATION - timeLeft) / WIPE_DURATION))

                    // Mask Gradient Logic
                    // Wipe Right To Left:
                    // Visible part is on the Left. Invisible (transparent) part is on the Right.
                    // The boundary moves from Right (100%) to Left (0%).
                    // mask-image: linear-gradient(to right, black {STOP}%, transparent {STOP+SOFT}%)
                    // If STOP goes 100 -> 0.

                    const stop = (1 - progress) * 100
                    const soft = 10 // Soft edge

                    // We use 'to right':
                    // From Left (Black) -> Right (Transparent). 
                    // Stop is where transparency starts.
                    active.style.maskImage = `linear-gradient(to right, black ${stop - soft}%, transparent ${stop}%)`
                    active.style.webkitMaskImage = `linear-gradient(to right, black ${stop - soft}%, transparent ${stop}%)`
                } else {
                    // Not transitioning yet
                    // Ensure Next is waiting?
                    if (!next.paused && next.currentTime > 0.1) {
                        // next.pause() // Should ideally be paused
                    }
                }

                // END OF TRANSITION
                // Using a small threshold or 'ended' event. 
                // Since we rely on mask, let's wait until video actually ends or mask is fully done.
                if (active.ended || timeLeft <= 0) {
                    // Swap Roles

                    // 1. Reset the "Old Active" (now finished)
                    active.pause()
                    active.style.zIndex = "1"
                    active.style.maskImage = "none"
                    active.style.webkitMaskImage = "none"

                    // 2. Promote the "Next" (now playing from 0+)
                    next.style.zIndex = "2"

                    // Update Ref
                    activeVideoRef.current = activeVideoRef.current === 1 ? 2 : 1
                }
            }

            animationFrameId = requestAnimationFrame(loop)
        }

        loop()

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [src, WIPE_DURATION])

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
            {/* We apply 'className' (sizing etc) to container. Videos fill container. */}
            <video
                ref={video1Ref}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
            // Removed key/src prop here to control manually
            />
            <video
                ref={video2Ref}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                playsInline
            />
        </div>
    )
}
