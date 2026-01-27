import React from 'react';
import { InfrastructureNode } from './types';
import { getX } from './utils';
import { Theme } from './theme';

interface ConnectorsLayerProps {
    items: InfrastructureNode[];
    layout: Map<string, number>;
    zoomLevel: number;
    hoveredId: string | null;
    theme: Theme;
}

const ROW_HEIGHT = 60;

export function ConnectorsLayer({ items, layout, zoomLevel, hoveredId, theme }: ConnectorsLayerProps) {
    return (
        <g className="connectors-layer">
            {/* Define playgrade gradient */}
            <defs>
                <linearGradient id="playgrade-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFC1D5" />
                    <stop offset="29.69%" stopColor="#FFC1D5" />
                    <stop offset="61.98%" stopColor="#FEFFE3" />
                    <stop offset="100%" stopColor="#97A1FB" />
                </linearGradient>
            </defs>

            {items.map((child) => {
                if (!child.parentId) return null;

                const parent = items.find(i => i.id === child.parentId);
                if (!parent) return null;

                // Dim if a node is hovered but neither parent nor child is the hovered node
                // Actually, maybe we only highlight if the direct connection is involved?
                // Let's keep it simple: dim if hoveredId exists and is neither child.id nor parent.id
                const isDimmed = hoveredId !== null && hoveredId !== child.id && hoveredId !== parent.id;

                // Coords
                const parentLane = layout.get(parent.id) ?? 0;
                const childLane = layout.get(child.id) ?? 0;

                const pY = (parentLane + 0.5) * ROW_HEIGHT + 20;
                const cY = (childLane + 0.5) * ROW_HEIGHT + 20;

                const childStartX = getX(child.startYear, zoomLevel);
                const parentX = Math.min(getX(parent.endYear, zoomLevel), childStartX - 20);

                const path = getConnectorPath(parentX, pY, childStartX, cY);

                return (
                    <g key={`${parent.id}-${child.id}`}>
                        <path
                            d={path}
                            fill="none"
                            stroke="url(#playgrade-gradient)"
                            strokeWidth={1}
                            opacity={1}
                        />
                        {/* White dot at the start of the connector line - always visible with high z-index */}
                        <circle
                            cx={parentX}
                            cy={pY}
                            r={4}
                            fill="white"
                            opacity={1}
                            style={{ pointerEvents: 'none' }}
                        />
                    </g>
                );
            })}
        </g>
    );
}

function getConnectorPath(x1: number, y1: number, x2: number, y2: number): string {
    const midX = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
}
