'use client';

import React, { useState } from 'react';
import { TimelineCanvas } from './TimelineCanvas';
import { DetailOverlay } from './DetailOverlay';
import { INITIAL_NODES } from './data';
import { DEFAULT_ZOOM, getX } from './utils';
import { InfrastructureNode } from './types';
import { Theme, THEME, getCategoryGradient, getLegendGradient } from './theme';

import { useTheme } from 'next-themes';

interface InfrastructureHistoryGraphProps {
    className?: string;
    theme?: Theme;
}

export function InfrastructureHistoryGraph({ className = '', theme: propTheme }: InfrastructureHistoryGraphProps) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Effect to handle hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM);
    const [selectedNode, setSelectedNode] = useState<InfrastructureNode | null>(null);
    const [hoveredNode, setHoveredNode] = useState<InfrastructureNode | null>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Determine effective theme
    // Default to 'dark' if not mounted yet to avoid hydration mismatch (or props if provided)
    const effectiveTheme = (propTheme || (mounted ? resolvedTheme : 'dark') || 'dark') as Theme;

    // Get theme colors
    const colors = THEME[effectiveTheme];

    const resetView = React.useCallback(() => {
        if (!containerRef.current) return;

        const width = containerRef.current.clientWidth;
        const focusStart = 1800;
        const focusEnd = 2050;
        const focusRange = focusEnd - focusStart;

        const fitZoom = width / focusRange;
        const finalZoom = Math.max(0.5, fitZoom);

        // 1. Set the zoom level first
        setZoomLevel(finalZoom);

        // 2. We need to wait for the state update and re-render to affect the TimelineCanvas width
        requestAnimationFrame(() => {
            setTimeout(() => {
                if (containerRef.current) {
                    const startX = getX(focusStart, finalZoom);
                    const scrollContainer = containerRef.current.querySelector('.overflow-auto');
                    if (scrollContainer) {
                        scrollContainer.scrollLeft = startX + 100;
                    }
                }
            }, 50);
        });
    }, []);

    // Auto-fit on load
    React.useEffect(() => {
        resetView();
    }, [resetView]);

    return (
        <div ref={containerRef} className={`flex flex-col w-full relative ${className || 'h-screen'}`}>
            {/* Controls Header */}
            <div className={`flex items-center justify-between px-4 py-2 z-10 relative mb-8`}>
                <div className="flex items-center gap-6 ml-64">
                    <h1 className={`text-lg font-bold ${colors.text} pointer-events-none`}>
                        Infrastructure Evolution
                    </h1>

                    {/* Inline Legend */}
                    <div className="flex items-center gap-4">
                        {[
                            { label: 'Water', value: 'WATER' },
                            { label: 'Transport', value: 'TRANSPORT' },
                            { label: 'Energy', value: 'ENERGY' },
                            { label: 'Digital', value: 'DIGITAL' },
                            { label: 'Civic', value: 'CIVIC' },
                        ].map((cat) => (
                            <div key={cat.value} className="flex items-center gap-2">
                                <div
                                    className="w-5 h-5 rounded-full"
                                    style={{ background: getLegendGradient(cat.value) }}
                                />
                                <span className={`text-sm ${effectiveTheme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                                    {cat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2 relative z-20 items-center">
                    <button
                        className={`h-12 px-4 text-sm font-bold ${effectiveTheme === 'light' ? 'text-slate-600 bg-slate-200 hover:bg-slate-300' : 'text-slate-300 bg-slate-800 hover:bg-slate-700'} rounded flex items-center justify-center`}
                        onClick={resetView}
                    >
                        Reset
                    </button>
                    <button
                        className={`h-12 px-4 text-sm font-bold ${effectiveTheme === 'light' ? 'text-slate-600 bg-slate-200 hover:bg-slate-300' : 'text-slate-300 bg-slate-800 hover:bg-slate-700'} rounded flex items-center justify-center`}
                        onClick={() => setZoomLevel(z => Math.max(0.1, z * 0.8))}
                    >
                        -
                    </button>
                    <span className={`text-xs ${colors.textMuted} min-w-[40px] text-center flex items-center justify-center`}>
                        {zoomLevel.toFixed(1)}x
                    </span>
                    <button
                        className={`h-12 px-4 text-sm font-bold ${effectiveTheme === 'light' ? 'text-slate-600 bg-slate-200 hover:bg-slate-300' : 'text-slate-300 bg-slate-800 hover:bg-slate-700'} rounded flex items-center justify-center`}
                        onClick={() => setZoomLevel(z => Math.min(20, z * 1.2))}
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Main Graph Area */}
            <div
                className="flex-1 relative pt-12"
                style={{
                    overflow: 'hidden',
                    overflowY: 'visible',
                    maskImage: 'linear-gradient(to right, transparent, black 15%, black 95%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 50px, black calc(100% - 150px), transparent)'
                }}
            >
                <TimelineCanvas
                    items={INITIAL_NODES}
                    zoomLevel={zoomLevel}
                    onNodeClick={setSelectedNode}
                    onNodeHover={setHoveredNode}
                    theme={effectiveTheme}
                />
            </div>

            {/* Detail Overlay - shows on hover */}
            {hoveredNode && (
                <DetailOverlay
                    node={hoveredNode}
                    onClose={() => setHoveredNode(null)}
                    theme={effectiveTheme}
                />
            )}
        </div>
    );
}


