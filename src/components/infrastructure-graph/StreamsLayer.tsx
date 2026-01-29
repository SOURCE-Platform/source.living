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

const ROW_HEIGHT = 40; // Reduced from 60 for tighter spacing

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
                const thinBarHeight = 12;
                const tabHeight = 26;
                const y = yCenter - thinBarHeight / 2;

                const isHovered = hoveredId === item.id;
                const isDimmed = hoveredId !== null && !isHovered;

                const gradient = getCategoryGradient(item.category);

                return (
                    <div
                        key={item.id}
                        className="absolute pointer-events-auto transition-opacity duration-300"
                        style={{
                            left: xStart,
                            top: y,
                            width: width,
                            height: thinBarHeight,
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
                        {/* Thin Bar Background */}
                        <div
                            className="w-full h-full rounded-full transition-all duration-300 cursor-pointer"
                            style={{
                                background: gradient,
                                filter: isHovered ? 'brightness(1.2)' : 'none'
                            }}
                        />

                        {/* Label Tab - Expanded Height at Label Position */}
                        <div className="absolute left-0 w-full" style={{ top: -(tabHeight - thinBarHeight) / 2, pointerEvents: 'none' }}>
                            <div
                                className="sticky left-8 inline-flex items-center cursor-pointer pointer-events-auto"
                                style={{
                                    background: gradient,
                                    filter: isHovered ? 'brightness(1.2)' : 'none',
                                    borderRadius: '16px',
                                    padding: '8px 16px',
                                    height: `${tabHeight}px`,
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
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
                                <span
                                    className="whitespace-nowrap text-sm font-bold select-none"
                                    style={{
                                        color: isDimmed ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.85)',
                                    }}
                                >
                                    {item.name}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
