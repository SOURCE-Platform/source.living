"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface InteractiveImageProps {
    src: string;
    alt: string;
    className?: string;
}

export function InteractiveImage({ src, alt, className }: InteractiveImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || isDragging) return;

        let animationFrameId: number;
        let startTime = performance.now();

        const animate = (time: number) => {
            const elapsed = (time - startTime) / 1000; // seconds
            const speed = 0.5; // Adjust speed as needed

            // Figure 8 parameters
            // x = A * sin(at)
            // y = B * sin(bt) where a/b ratio creates the Lissajous figure (1:2 for figure 8)

            const maxScrollX = container.scrollWidth - container.clientWidth;
            const maxScrollY = container.scrollHeight - container.clientHeight;

            // X oscillates full width
            const x = (Math.sin(elapsed * speed) + 1) / 2 * maxScrollX;

            // Y oscillates full height (2x frequency for figure 8)
            const y = (Math.sin(elapsed * speed * 2) + 1) / 2 * maxScrollY;

            container.scrollLeft = x;
            container.scrollTop = y;

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isDragging]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
        setStartY(e.pageY - containerRef.current.offsetTop);
        setScrollTop(containerRef.current.scrollTop);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const y = e.pageY - containerRef.current.offsetTop;
        const walkX = (x - startX) * 1.5; // Scroll-fast multiplier
        const walkY = (y - startY) * 1.5;
        containerRef.current.scrollLeft = scrollLeft - walkX;
        containerRef.current.scrollTop = scrollTop - walkY;
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "w-full h-[600px] overflow-hidden relative cursor-grab active:cursor-grabbing select-none",
                className
            )}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            <div className="w-[300%] h-[150%] relative">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover pointer-events-none grayscale contrast-125"
                    priority
                />
                <div className="absolute inset-0 bg-red-600 mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-0 bg-red-500/50 mix-blend-color pointer-events-none" />
            </div>
        </div>
    );
}
