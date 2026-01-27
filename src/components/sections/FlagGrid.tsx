"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

// List of country codes for flags (ISO 3166-1 alpha-2)
const FLAG_CODES = [
    "us", "gb", "fr", "de", "jp", "cn", "kr", "in", "br", "mx",
    "ca", "au", "it", "es", "nl", "se", "no", "dk", "fi", "ch",
    "at", "be", "pl", "pt", "gr", "ie", "nz", "sg", "hk", "ae",
    "sa", "il", "eg", "za", "ng", "ke", "ar", "cl", "co", "pe",
    "th", "vn", "my", "id", "ph", "tw", "ru", "ua", "tr", "cz",
    "hu", "ro", "bg", "hr", "sk", "si", "lt", "lv", "ee", "is"
];

const FLAG_WIDTH = 63;
const FLAG_HEIGHT = Math.round(FLAG_WIDTH * (2 / 3)); // 42

export function FlagGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [rows, setRows] = useState(6);

    // Calculate how many rows fit in the container
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const height = containerRef.current.clientHeight;
                // Use Math.floor to ensure we don't overflow
                const calculatedRows = Math.floor(height / (FLAG_HEIGHT + 1));
                if (calculatedRows > 0) setRows(calculatedRows);
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    // Create a strip of flags large enough to seamless scroll

    // We want to randomize the flags for each row so we don't get vertical columns of the same flag.
    // A simple way is to shuffle the FLAG_CODES differently for each row, or just offset them.
    // Since we need a seamless loop, we should just ensure the sequence repeats.

    // Helper to get a randomized/shuffled version of flags for a row
    const getRowFlags = (rowIndex: number) => {
        // Create a copy to shuffle
        const shuffled = [...FLAG_CODES];

        // Fisher-Yates shuffle with a pseudo-random seed based on row index
        let seed = rowIndex * 1337 + 12345;
        const random = () => {
            const x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        };

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Return multiple copies for the loop
        return [...shuffled, ...shuffled, ...shuffled, ...shuffled];
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-full rounded-lg overflow-hidden relative bg-background"
        >
            {/* Scrolling Content */}
            <div className="absolute inset-0 flex flex-col gap-[1px] overflow-hidden">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="flex gap-[1px] min-w-max animate-scroll-right-to-left flex-1"
                        style={{
                            animationDuration: '120s',
                            animationDelay: `-${rowIndex * 13}s` // Larger offset to desynchronize
                        }}
                    >
                        {getRowFlags(rowIndex).map((code, i) => (
                            <div
                                key={`${rowIndex}-${i}`}
                                className="relative overflow-hidden shrink-0"
                                style={{ width: FLAG_WIDTH, height: '100%' }} // Fill the flex-1 row height
                            >
                                <Image
                                    src={`https://flagcdn.com/w80/${code}.png`}
                                    alt={code}
                                    fill
                                    className="object-cover"
                                    sizes={`${FLAG_WIDTH}px`}
                                    unoptimized
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-blue-500/30 dark:bg-black/20 pointer-events-none z-10" />

            {/* Logo overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-[5%] z-20">
                <div className="flex items-center gap-[5%] w-full justify-center">
                    <img
                        src="/logo/SOURCE-pictogram.svg"
                        alt="SOURCE pictogram"
                        className="h-auto w-[15%] brightness-0 invert"
                    />
                    <img
                        src="/logo/SOURCE-wordmark.svg"
                        alt="SOURCE wordmark"
                        className="h-auto w-[70%] brightness-0 invert"
                    />
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll-right-to-left {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-25%); } 
                    /* We used 4x the array, so scrolling 25% (1 full set) gives a seamless loop if the set is identical. 
                       Wait, getRowFlags returns [S1, S1, S1, S1]. 
                       So moving from 0 to -25% (width of one S1) is the loop. 
                    */
                }
                .animate-scroll-right-to-left {
                    animation: scroll-right-to-left 120s linear infinite;
                }
            `}</style>
        </div>
    );
}
