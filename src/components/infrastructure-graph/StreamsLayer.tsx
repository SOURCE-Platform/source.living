import React from 'react';
import { InfrastructureNode } from './types';
import { getX } from './utils';
import { Theme, getCategoryGradient } from './theme';

interface StreamsLayerProps {
    items: InfrastructureNode[];
    layout: Map<string, number>;
    zoomLevel: number;
    hoveredId: string | null;
    onHover: (id: string | null) => void;
    onNodeHover: (node: InfrastructureNode | null) => void;
    onClick: (node: InfrastructureNode) => void;
    theme: Theme;
    isScrolling: boolean;
}

const ROW_HEIGHT = 60;

export function StreamsLayer({ items, layout, zoomLevel, hoveredId, onHover, onNodeHover, onClick, theme, isScrolling }: StreamsLayerProps) {
    return (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {items.map((item) => {
                const xStart = getX(item.startYear, zoomLevel);
                const xEnd = getX(item.endYear, zoomLevel);
                const width = Math.max(xEnd - xStart, 1);

                const laneIndex = layout.get(item.id) ?? 0;
                // const top = (laneIndex + 1) * ROW_HEIGHT; // Aligning with grid lines roughly, need adjustment

                // Adjusting to match previous SVG positioning:
                // Center was (laneIndex + 0.5) * ROW_HEIGHT + 20.
                const yCenter = (laneIndex + 0.5) * ROW_HEIGHT + 20;
                const thickness = 16;
                const y = yCenter - thickness / 2;

                const isHovered = hoveredId === item.id;
                const isDimmed = hoveredId !== null && !isHovered;

                const color = getCategoryColor(item.category);
                const gradient = getCategoryGradient(item.category);
                const textColor = theme === 'light' ? '#334155' : '#cbd5e1';

                return (
                    <div
                        key={item.id}
                        className="absolute pointer-events-auto transition-opacity duration-300"
                        style={{
                            left: xStart,
                            top: y,
                            width: width,
                            height: thickness,
                            opacity: isDimmed ? 0.55 : 0.9,
                        }}
                        onMouseEnter={() => {
                            if (!isScrolling) {
                                onHover(item.id);
                                onNodeHover(item);
                            }
                        }}
                        onMouseLeave={() => {
                            if (!isScrolling) {
                                onHover(null);
                                onNodeHover(null);
                            }
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick(item);
                        }}
                    >
                        {/* The Ribbon (Visual Background) */}
                        <div
                            className="w-full h-full rounded-full transition-all duration-300 cursor-pointer"
                            style={{
                                background: gradient,
                                filter: isHovered ? 'brightness(1.2)' : 'none'
                            }}
                        />

                        {/* Sticky Label */}
                        <div className="absolute top-0 left-0 w-full h-full flex items-center pointer-events-none">
                            <span
                                className="sticky left-4 -mt-12 whitespace-nowrap text-xs font-medium select-none transition-opacity duration-300"
                                style={{
                                    color: textColor,
                                    opacity: isDimmed ? 0.5 : 1,
                                }}
                            >
                                {item.name}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function getCategoryColor(category: string): string {
    switch (category) {
        case 'WATER': return '#22d3ee'; // cyan-400
        case 'TRANSPORT': return '#fbbf24'; // amber-400
        case 'ENERGY': return '#f87171'; // red-400
        case 'DIGITAL': return '#e879f9'; // fuchsia-400
        case 'CIVIC': return '#a3e635'; // lime-400
        default: return '#cbd5e1';
    }
}

// function getCategoryGradient removed

