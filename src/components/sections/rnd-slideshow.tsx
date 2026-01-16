"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const IMAGES = [
    {
        src: "/images/r and d/rnd-hardware.png",
        alt: "R&D Hardware",
    },
    {
        src: "/images/r and d/rnd-software.png",
        alt: "R&D Software",
    }
];

export function RndSlideshow() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
        }, 4000); // Change every 4 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full aspect-[2500/1335] overflow-hidden rounded-lg mb-6 lg:mb-0">
            {IMAGES.map((image, index) => (
                <div
                    key={image.src}
                    className={cn(
                        "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                        index === currentIndex ? "opacity-100" : "opacity-0"
                    )}
                >
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                    {/* Gradient overlay for better text readability if needed, or just style matching */}
                    <div className="absolute inset-0 bg-black/10" />
                </div>
            ))}
        </div>
    );
}
