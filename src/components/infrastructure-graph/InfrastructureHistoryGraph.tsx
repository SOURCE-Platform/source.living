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
    const [initialZoom, setInitialZoom] = useState<number | null>(null);
    const [selectedNode, setSelectedNode] = useState<InfrastructureNode | null>(null);
    const [hoveredNode, setHoveredNode] = useState<InfrastructureNode | null>(null);
    const [pinnedNode, setPinnedNode] = useState<InfrastructureNode | null>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const detailOverlayRef = React.useRef<HTMLDivElement>(null);
    const targetZoomRef = React.useRef(DEFAULT_ZOOM);
    const currentZoomRef = React.useRef(DEFAULT_ZOOM);
    const animationFrameRef = React.useRef<number | null>(null);

    // Determine effective theme
    // Default to 'dark' if not mounted yet to avoid hydration mismatch (or props if provided)
    const effectiveTheme = (propTheme || (mounted ? resolvedTheme : 'dark') || 'dark') as Theme;

    // Get theme colors
    const colors = THEME[effectiveTheme];

    const resetView = React.useCallback(() => {
        if (!containerRef.current) return;

        const width = containerRef.current.clientWidth;
        const isMobile = width < 640;
        const focusStart = isMobile ? 1900 : 1750;
        const focusEnd = 2050;
        const focusRange = focusEnd - focusStart;

        // Calculate zoom to fit the modern era nicely
        const fitZoom = (width * 0.85) / focusRange; // 85% of width for the range
        const finalZoom = Math.max(2, Math.min(6, fitZoom)); // Between 2-6 pixels per year

        // 1. Set the zoom level and target first
        setZoomLevel(finalZoom);
        setInitialZoom(finalZoom);
        targetZoomRef.current = finalZoom;
        currentZoomRef.current = finalZoom;

        // 2. Wait for render and scroll to the modern era
        requestAnimationFrame(() => {
            setTimeout(() => {
                if (containerRef.current) {
                    const startX = getX(focusStart, finalZoom);
                    const scrollContainer = containerRef.current.querySelector('.overflow-auto');
                    if (scrollContainer) {
                        // Center the view with some left padding
                        scrollContainer.scrollLeft = startX - (width * 0.1);
                    }
                }
            }, 100);
        });
    }, []);

    // Smooth zoom animation using refs to avoid dependency issues
    React.useEffect(() => {
        currentZoomRef.current = zoomLevel;
    }, [zoomLevel]);

    const animateZoom = React.useCallback(() => {
        const current = currentZoomRef.current;
        const target = targetZoomRef.current;
        const diff = target - current;

        // If we're close enough, snap to target and stop
        if (Math.abs(diff) < 0.001) {
            currentZoomRef.current = target;
            setZoomLevel(target);
            animationFrameRef.current = null;
            return;
        }

        // Get scroll container to maintain scroll position
        const scrollContainer = containerRef.current?.querySelector('.overflow-auto') as HTMLElement;
        const oldScrollLeft = scrollContainer?.scrollLeft || 0;
        const oldScrollWidth = scrollContainer?.scrollWidth || 0;

        // Lerp towards target with slower easing (0.08 = slower, smoother)
        const newZoom = current + diff * 0.08;
        currentZoomRef.current = newZoom;
        setZoomLevel(newZoom);

        // Adjust scroll position to maintain view of rightmost items
        if (scrollContainer) {
            requestAnimationFrame(() => {
                const newScrollWidth = scrollContainer.scrollWidth;
                const scrollWidthRatio = newScrollWidth / oldScrollWidth;

                // Adjust scroll to maintain relative position
                scrollContainer.scrollLeft = oldScrollLeft * scrollWidthRatio;
            });
        }

        // Continue animation
        animationFrameRef.current = requestAnimationFrame(animateZoom);
    }, []);

    // Auto-fit on load
    React.useEffect(() => {
        resetView();
    }, [resetView]);

    // Handle click outside to close the pinned card
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            // Check if click is inside the detail overlay
            if (detailOverlayRef.current && detailOverlayRef.current.contains(target)) {
                return;
            }

            // Check if click is inside the Leva panel (it has class 'leva-c-')
            if (target.closest('.leva-c-kWgxhW, .leva__root')) {
                return;
            }

            // Click is outside both card and Leva panel, so close
            if (pinnedNode) {
                setPinnedNode(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [pinnedNode]);

    // Handle node click to pin/unpin
    const handleNodeClick = React.useCallback((node: InfrastructureNode | null) => {
        if (pinnedNode?.id === node?.id) {
            // Clicking the same node unpins it
            setPinnedNode(null);
        } else {
            // Clicking a different node pins it
            setPinnedNode(node);
        }
        setSelectedNode(node);
    }, [pinnedNode]);

    // Handle zoom with Ctrl/Cmd + wheel and prevent page scrolling
    React.useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey || e.metaKey) {
                // Check if event originated from within our container
                if (container.contains(e.target as Node)) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Update target zoom with balanced increments for smooth control
                    const zoomDelta = e.deltaY > 0 ? 0.96 : 1.04;
                    const newTarget = Math.max(0.1, Math.min(20, targetZoomRef.current * zoomDelta));
                    targetZoomRef.current = newTarget;

                    // Start animation if not already running
                    if (animationFrameRef.current === null) {
                        animationFrameRef.current = requestAnimationFrame(animateZoom);
                    }
                }
            }
        };

        // Add to both container and document to ensure we catch it
        container.addEventListener('wheel', handleWheel, { passive: false });
        document.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
            document.removeEventListener('wheel', handleWheel);
            // Cancel animation on unmount
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [animateZoom]);

    return (
        <div ref={containerRef} className={`flex flex-col w-full relative ${className || 'h-screen'}`}>
            {/* Controls Header */}
            <div className={`flex flex-col sm:flex-row items-center sm:items-start justify-between px-0 sm:px-4 py-2 z-10 relative pointer-events-none`}>
                <div className="flex flex-col w-full sm:w-auto items-center sm:items-start gap-4 mb-4 sm:mb-0 sm:ml-8 xl:ml-36 pointer-events-auto">
                    <h2 className={`text-lg font-bold ${colors.text} pointer-events-none whitespace-nowrap text-center sm:text-left`}>
                        Infrastructure Evolution
                    </h2>

                    {/* Inline Legend */}
                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-6 gap-y-2">
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

                {initialZoom && Math.abs(zoomLevel - initialZoom) > 0.01 && (
                    <div className="flex gap-2 relative z-20 items-center transition-opacity duration-300 pointer-events-auto opacity-100">
                        <button
                            className={`h-12 px-4 text-sm font-bold ${effectiveTheme === 'light' ? 'text-slate-600 bg-slate-200 hover:bg-slate-300' : 'text-slate-300 bg-slate-800 hover:bg-slate-700'} rounded flex items-center justify-center uppercase tracking-wider`}
                            onClick={resetView}
                        >
                            RESET ZOOM
                        </button>
                        {/* Zoom controls removed */}
                    </div>
                )}
            </div>

            {/* Main Graph Area */}
            <div
                className="flex-1 relative pt-12 overflow-hidden infrastructure-graph-mask"
            >
                <TimelineCanvas
                    items={INITIAL_NODES}
                    zoomLevel={zoomLevel}
                    onZoomChange={setZoomLevel}
                    onNodeClick={handleNodeClick}
                    onNodeHover={setHoveredNode}
                    theme={effectiveTheme}
                />
            </div >

            {/* Detail Overlay - shows on click (pinned) or hover (preview) */}
            {
                (pinnedNode || hoveredNode) && (
                    <div ref={detailOverlayRef}>
                        <DetailOverlay
                            node={pinnedNode || hoveredNode}
                            onClose={() => setPinnedNode(null)}
                            theme={effectiveTheme}
                        />
                    </div>
                )
            }
        </div >
    );
}


