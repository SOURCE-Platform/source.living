"use client";

import { useState, useEffect, useRef } from "react";
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

// Grid dimensions
const FLAG_WIDTH = 60;
const FLAG_HEIGHT = Math.round(FLAG_WIDTH * (2 / 3));
const TRANSITION_DURATION = 1500; // 1.5 second fades

interface CellState {
    currentFlag: number;
    nextFlag: number | null;
    fadeProgress: number; // 0 = showing current, 1 = showing next
}

interface FlagCellProps {
    state: CellState;
}

function FlagCell({ state }: FlagCellProps) {
    const { currentFlag, nextFlag, fadeProgress } = state;

    return (
        <div className="relative overflow-hidden w-full h-full">
            {/* Current flag - always visible underneath */}
            <Image
                src={`https://flagcdn.com/w80/${FLAG_CODES[currentFlag]}.png`}
                alt={FLAG_CODES[currentFlag]}
                fill
                className="object-cover"
                style={{ opacity: 1 }}
                sizes={`${FLAG_WIDTH}px`}
                unoptimized
            />
            {/* Next flag fading in on top */}
            {nextFlag !== null && (
                <Image
                    src={`https://flagcdn.com/w80/${FLAG_CODES[nextFlag]}.png`}
                    alt={FLAG_CODES[nextFlag]}
                    fill
                    className="object-cover"
                    style={{
                        opacity: fadeProgress,
                        transition: `opacity ${TRANSITION_DURATION}ms ease-in-out`
                    }}
                    sizes={`${FLAG_WIDTH}px`}
                    unoptimized
                />
            )}
        </div>
    );
}

export function FlagGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ cols: 8, rows: 4 });
    const [cellStates, setCellStates] = useState<CellState[]>([]);

    // Use refs for the transition loop to avoid stale closures
    const cellStatesRef = useRef<CellState[]>([]);
    const usedFlagsRef = useRef<Set<number>>(new Set());
    const transitioningCellsRef = useRef<Set<number>>(new Set());
    const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Calculate grid dimensions based on container size
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const width = containerRef.current.clientWidth;
                const height = containerRef.current.clientHeight;
                const cols = Math.floor(width / (FLAG_WIDTH + 1));
                const rows = Math.floor(height / (FLAG_HEIGHT + 1));
                setDimensions({ cols: Math.max(1, cols), rows: Math.max(1, rows) });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        const observer = new ResizeObserver(updateDimensions);
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            window.removeEventListener('resize', updateDimensions);
            observer.disconnect();
        };
    }, []);

    // Initialize cell states with unique flags
    useEffect(() => {
        const totalCells = dimensions.cols * dimensions.rows;
        if (totalCells === 0) return;

        const initialStates: CellState[] = [];
        usedFlagsRef.current = new Set();

        for (let i = 0; i < totalCells; i++) {
            let flagIndex = i % FLAG_CODES.length;
            while (usedFlagsRef.current.has(flagIndex) && usedFlagsRef.current.size < FLAG_CODES.length) {
                flagIndex = (flagIndex + 1) % FLAG_CODES.length;
            }
            initialStates.push({
                currentFlag: flagIndex,
                nextFlag: null,
                fadeProgress: 0
            });
            usedFlagsRef.current.add(flagIndex);
        }

        cellStatesRef.current = initialStates;
        setCellStates(initialStates);
        transitioningCellsRef.current = new Set();
    }, [dimensions]);

    // Get a random unused flag
    const getUnusedFlag = (): number | null => {
        const availableFlags: number[] = [];
        for (let i = 0; i < FLAG_CODES.length; i++) {
            if (!usedFlagsRef.current.has(i)) {
                availableFlags.push(i);
            }
        }
        if (availableFlags.length === 0) return null;
        return availableFlags[Math.floor(Math.random() * availableFlags.length)];
    };

    // Transition loop
    useEffect(() => {
        if (cellStates.length === 0) return;

        const runTransitionLoop = () => {
            // Pick a random cell that isn't currently transitioning
            const availableCells: number[] = [];
            for (let i = 0; i < cellStatesRef.current.length; i++) {
                if (!transitioningCellsRef.current.has(i)) {
                    availableCells.push(i);
                }
            }

            if (availableCells.length > 0) {
                const cellIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
                const newFlag = getUnusedFlag();

                if (newFlag !== null) {
                    const oldFlag = cellStatesRef.current[cellIndex].currentFlag;

                    // Mark as transitioning and reserve new flag
                    transitioningCellsRef.current.add(cellIndex);
                    usedFlagsRef.current.add(newFlag);

                    // Set nextFlag and start fade (fadeProgress: 0 -> 1)
                    cellStatesRef.current[cellIndex] = {
                        currentFlag: oldFlag,
                        nextFlag: newFlag,
                        fadeProgress: 0
                    };
                    setCellStates([...cellStatesRef.current]);

                    // After a tiny delay to ensure the element renders at opacity 0, trigger the fade
                    requestAnimationFrame(() => {
                        cellStatesRef.current[cellIndex] = {
                            currentFlag: oldFlag,
                            nextFlag: newFlag,
                            fadeProgress: 1
                        };
                        setCellStates([...cellStatesRef.current]);
                    });

                    // Complete transition after duration
                    setTimeout(() => {
                        // Release old flag
                        usedFlagsRef.current.delete(oldFlag);

                        // Make new flag the current flag
                        cellStatesRef.current[cellIndex] = {
                            currentFlag: newFlag,
                            nextFlag: null,
                            fadeProgress: 0
                        };
                        transitioningCellsRef.current.delete(cellIndex);

                        setCellStates([...cellStatesRef.current]);
                    }, TRANSITION_DURATION + 50);
                }
            }

            // Schedule next transition (300-1500ms)
            loopTimeoutRef.current = setTimeout(runTransitionLoop, 300 + Math.random() * 1200);
        };

        // Start the loop
        loopTimeoutRef.current = setTimeout(runTransitionLoop, 500);

        return () => {
            if (loopTimeoutRef.current) {
                clearTimeout(loopTimeoutRef.current);
            }
        };
    }, [cellStates.length]);

    return (
        <div
            ref={containerRef}
            className="w-full h-full rounded-lg overflow-hidden bg-muted/30 relative"
            style={{ aspectRatio: '5/3' }}
        >
            <div
                className="grid gap-[1px] bg-muted/30 h-full"
                style={{
                    gridTemplateColumns: `repeat(${dimensions.cols}, 1fr)`,
                    gridTemplateRows: `repeat(${dimensions.rows}, 1fr)`
                }}
            >
                {cellStates.map((state, i) => (
                    <FlagCell key={i} state={state} />
                ))}
            </div>
            {/* Logo overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-[5%]">
                <div className="flex items-center gap-[5%] w-full justify-center drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
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
        </div>
    );
}
