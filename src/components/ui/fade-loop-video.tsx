"use client"

import React, { useRef, useEffect, useState } from "react"

interface FadeLoopVideoProps {
    src: string
    className?: string
}

export function FadeLoopVideo({ src, className }: FadeLoopVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [opacity, setOpacity] = useState(0)
    const FADE_DURATION = 1.0 // seconds

    const handleTimeUpdate = () => {
        const video = videoRef.current
        if (!video || !video.duration) return

        const currentTime = video.currentTime
        const duration = video.duration
        const timeLeft = duration - currentTime

        // Fade In (Start)
        if (currentTime < FADE_DURATION) {
            setOpacity(currentTime / FADE_DURATION)
        }
        // Fade Out (End)
        else if (timeLeft < FADE_DURATION) {
            setOpacity(timeLeft / FADE_DURATION)
        }
        // Fully Visible
        else {
            if (opacity !== 1) setOpacity(1)
        }

        // Loop Logic: If very close to end, restart
        // We use a manual check slightly before the actual end to ensure smooth fade out completion
        if (timeLeft < 0.1) {
            // Optional: You could trigger reset here, but standard loop might be jerky. 
            // Better to let it end and catch it in onEnded, OR manually reset if we want exact timing.
            // Let's rely on onEnded for the actual loop restart, but ensure opacity is 0.
        }
    }

    const handleEnded = () => {
        const video = videoRef.current
        if (!video) return
        video.currentTime = 0
        video.play().catch(() => { })
        // Opacity should be 0 here naturally from timeUpdate logic, but ensure it starts at 0 for fade in
        setOpacity(0)
    }

    return (
        <video
            ref={videoRef}
            src={src}
            className={className}
            autoPlay
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            style={{ opacity: opacity, transition: 'opacity 0.1s linear' }}
        />
    )
}
