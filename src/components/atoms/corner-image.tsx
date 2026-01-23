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
        const handleScroll = () => {
            // Check scroll-container first, fall back to window
            const scrollTop = (() => {
                const container = document.getElementById('scroll-container');
                if (container) {
                    return container.scrollTop;
                }
                return window.scrollY || document.documentElement.scrollTop;
            })();

            // Visible at top, fade out when scrolling down
            const shouldBeVisible = scrollTop < 100;
            setIsVisible(shouldBeVisible);
        };

        // Initial check
        handleScroll();

        // Listen to both to cover all cases
        const container = document.getElementById('scroll-container');
        if (container) {
            container.addEventListener('scroll', handleScroll, { passive: true });
        }
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
            window.removeEventListener('scroll', handleScroll);
        };
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
