"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const IMAGES = [
    {
        src: "/images/gtm/pool-ocean.jpg",
        alt: "GTM Lifestyle - Pool",
    },
    {
        src: "/images/gtm/mountain-view.jpg",
        alt: "GTM Lifestyle - Mountain",
    },
    {
        src: "/images/gtm/night-house.jpg",
        alt: "GTM Lifestyle - Night Architecture",
    },
    {
        src: "/images/gtm/flags.jpg",
        alt: "GTM Global Expansion - Flags",
    }
];

export function GTMSlideshow() {
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
                        className={cn(
                            "object-cover transition-transform duration-[6000ms] ease-linear",
                            index === currentIndex ? "scale-110" : "scale-100"
                        )}
                        priority={index === 0}
                    />
                    {/* Gradient overlay for consistency if needed */}
                    <div className="absolute inset-0 bg-black/10" />
                </div>
            ))}
        </div>
    );
}
