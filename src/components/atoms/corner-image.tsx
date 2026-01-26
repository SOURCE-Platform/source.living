"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface CornerImageProps {
    src: string;
    className?: string;
}

export function CornerImage({ src, className }: CornerImageProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Always visible
        setIsVisible(true);
    }, []);

    return (
        <div
            className={`fixed z-10 pointer-events-none overflow-hidden transition-opacity duration-500 ${className || ''} ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            style={{
                width: '1200px',
                height: '1200px',
                top: '-500px',
                right: '-500px',
                borderRadius: '50%',
                // Mask: fully visible center to 80%, then fade to transparent at edge
                maskImage: 'radial-gradient(circle farthest-side at center, black 0%, black 70%, rgba(0,0,0,0.5) 85%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(circle farthest-side at center, black 0%, black 70%, rgba(0,0,0,0.5) 85%, transparent 100%)',
            }}
        >
            <Image
                src={src}
                alt=""
                width={1000}
                height={1000}
                className="object-cover w-full h-full animate-spin-slow"
                priority
            />
            <style jsx global>{`
                @keyframes spin-ccw {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(-360deg);
                    }
                }
                .animate-spin-slow {
                    animation: spin-ccw 60s linear infinite;
                }
            `}</style>
        </div>
    );
}
