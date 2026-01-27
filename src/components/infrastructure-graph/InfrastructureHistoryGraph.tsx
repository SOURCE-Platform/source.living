'use client';

import React, { useState } from 'react';
import { TimelineCanvas } from './TimelineCanvas';
import { DetailOverlay } from './DetailOverlay';
import { INITIAL_NODES } from './data';
import { DEFAULT_ZOOM, getX } from './utils';
import { InfrastructureNode } from './types';
import { Theme, THEME } from './theme';

interface InfrastructureHistoryGraphProps {
    className?: string;
    theme?: Theme;
}

export function InfrastructureHistoryGraph({ className = '', theme = 'dark' }: InfrastructureHistoryGraphProps) {
    const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM);
    const [selectedNode, setSelectedNode] = useState<InfrastructureNode | null>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Get theme colors
    const colors = THEME[theme];

    // Auto-fit on load - Two-stage process to ensure scroll happens after zoom resize
    React.useEffect(() => {
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
        // requestAnimationFrame is usually enough to wait for the DOM to be ready after React commit
        requestAnimationFrame(() => {
            // We might need a second frame or a timeout to strictly ensure the child has updated styling
            setTimeout(() => {
                if (containerRef.current) {
                    const startX = getX(focusStart, finalZoom);
                    const scrollContainer = containerRef.current.querySelector('.overflow-auto');
                    if (scrollContainer) {
                        scrollContainer.scrollLeft = startX - 20;
                    }
                }
            }, 50);
        });

    }, []); // Only run once on mount

    return (
        <div ref={containerRef} className={`flex flex-col w-full relative ${className || 'h-screen'}`}>
            {/* Controls Header - Minimalist */}
            <div className={`flex items-center justify-end px-4 py-2 z-10 relative`}>
                <h1 className={`absolute left-1/2 -translate-x-1/2 text-lg font-bold ${colors.text} text-center w-full pointer-events-none`}>
                    Infrastructure Evolution
                </h1>
                <div className="flex gap-2 relative z-20">
                    <button
                        className={`px-2 py-1 text-xs font-bold ${theme === 'light' ? 'text-slate-600 bg-slate-200 hover:bg-slate-300' : 'text-slate-300 bg-slate-800 hover:bg-slate-700'} rounded`}
                        onClick={() => setZoomLevel(z => Math.max(0.1, z * 0.8))}
                    >
                        -
                    </button>
                    <span className={`text-xs ${colors.textMuted} min-w-[40px] text-center flex items-center justify-center`}>
                        {zoomLevel.toFixed(1)}x
                    </span>
                    <button
                        className={`px-2 py-1 text-xs font-bold ${theme === 'light' ? 'text-slate-600 bg-slate-200 hover:bg-slate-300' : 'text-slate-300 bg-slate-800 hover:bg-slate-700'} rounded`}
                        onClick={() => setZoomLevel(z => Math.min(20, z * 1.2))}
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Main Graph Area */}
            <div className="flex-1 overflow-hidden relative">
                <TimelineCanvas
                    items={INITIAL_NODES}
                    zoomLevel={zoomLevel}
                    onNodeClick={setSelectedNode}
                    theme={theme}
                />
            </div>

            {/* Detail Overlay */}
            {selectedNode && (
                <DetailOverlay
                    node={selectedNode}
                    onClose={() => setSelectedNode(null)}
                    theme={theme}
                />
            )}
        </div>
    );
}
