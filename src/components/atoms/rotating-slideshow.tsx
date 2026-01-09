"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageItem {
    src: string;
    scale?: number;
}

interface RotatingSlideshowProps {
    images: (string | ImageItem)[];
    className?: string;
}

export function RotatingSlideshow({ images, className }: RotatingSlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [keys, setKeys] = useState<number[]>(new Array(images.length).fill(0));

    useEffect(() => {
        if (images.length <= 1) return;

        if (keys.length !== images.length) {
            setKeys(new Array(images.length).fill(0));
        }

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                const next = (prev + 1) % images.length;
                setKeys(prevKeys => {
                    const newKeys = [...prevKeys];
                    newKeys[next] = (newKeys[next] || 0) + 1;
                    return newKeys;
                });
                return next;
            });
        }, 3000); // 3 seconds per image

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className={cn("relative w-full h-full overflow-hidden flex items-center justify-center", className)}>
            {images.map((item, index) => {
                const src = typeof item === 'string' ? item : item.src;
                const scale = typeof item === 'string' ? 1 : (item.scale || 1);
                const isActive = index === currentIndex;

                return (
                    <div
                        key={`${src}-${index}`}
                        className={cn(
                            "absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ease-in-out",
                            isActive ? "z-10 opacity-100" : "z-0 opacity-0"
                        )}
                    >
                        <div
                            key={`anim-${index}-${keys[index]}`}
                            className="relative w-full h-full animate-rotate-scan flex items-center justify-center"
                        >
                            <div className="relative w-full h-full" style={{ transform: `scale(${scale})` }}>
                                <Image
                                    src={src}
                                    alt={`Slide ${index + 1}`}
                                    fill
                                    className="object-contain p-2"
                                    priority={index === 0}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
            <style jsx global>{`
                @keyframes rotate-scan {
                    0% {
                        transform: rotate(-15deg);
                    }
                    100% {
                        transform: rotate(15deg);
                    }
                }
                .animate-rotate-scan {
                    animation: rotate-scan 4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
            `}</style>
        </div>
    );
}
