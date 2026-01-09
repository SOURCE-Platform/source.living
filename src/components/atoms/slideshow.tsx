"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SlideshowProps {
    images: string[];
    interval?: number;
    className?: string;
}

export function Slideshow({ images, interval = 3000, className }: SlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <div className={cn("relative w-full h-full overflow-hidden", className)}>
            {images.map((src, index) => (
                <div
                    key={src}
                    className={cn(
                        "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                        index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    )}
                >
                    <Image
                        src={src}
                        alt={`Slide ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized // Important for GIFs to animate correctly if Next.js optimizes them unexpectedly
                    />
                </div>
            ))}
        </div>
    );
}
