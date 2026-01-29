import React, { useMemo, useState } from 'react';
import { InfrastructureNode } from './types';
import { getX, calculateLayout } from './utils';
import { StreamsLayer } from './StreamsLayer';
import { ConnectorsLayer } from './ConnectorsLayer';

import { Theme, THEME } from './theme';

interface TimelineCanvasProps {
    items: InfrastructureNode[];
    zoomLevel: number;
    onZoomChange?: (zoom: number) => void;
    onNodeClick: (node: InfrastructureNode) => void;
    onNodeHover: (node: InfrastructureNode | null) => void;
    theme: Theme;
}

export function TimelineCanvas({ items, zoomLevel, onZoomChange, onNodeClick, onNodeHover, theme }: TimelineCanvasProps) {
    const ROW_HEIGHT = 60;
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [startX, setStartX] = React.useState(0);
    const [scrollLeft, setScrollLeft] = React.useState(0);
    const [isScrolling, setIsScrolling] = React.useState(false);
    const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setIsScrolling(true);
        setHoveredId(null);
        onNodeHover(null);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const onMouseLeave = () => {
        setIsDragging(false);
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 150);
    };

    const onMouseUp = () => {
        setIsDragging(false);
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 150);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1; // Scroll-fast
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    // Handle scroll events to disable hover during scroll
    const handleScroll = () => {
        // Clear hover state when scrolling starts
        if (!isScrolling) {
            setHoveredId(null);
            onNodeHover(null);
        }

        setIsScrolling(true);

        // Clear existing timeout
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        // Set timeout to re-enable hover after scrolling stops
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 150);
    };

    // Handle wheel event for zoom (like Google Maps)
    const handleWheel = (e: React.WheelEvent) => {
        // Only zoom if Control (Windows/Linux) or Command (Mac) key is pressed
        if ((e.ctrlKey || e.metaKey) && onZoomChange) {
            e.preventDefault();
            e.stopPropagation();

            // Determine zoom direction (negative deltaY = scroll up = zoom in)
            const zoomDelta = e.deltaY > 0 ? 0.9 : 1.1;
            const newZoom = Math.max(0.1, Math.min(20, zoomLevel * zoomDelta));

            onZoomChange(newZoom);
        }
    };

    // Add native wheel event listener to properly prevent default behavior
    React.useEffect(() => {
        const scrollElement = scrollRef.current;
        if (!scrollElement) return;

        const handleNativeWheel = (e: WheelEvent) => {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
            }
        };

        // Use passive: false to allow preventDefault to work
        scrollElement.addEventListener('wheel', handleNativeWheel, { passive: false });

        return () => {
            scrollElement.removeEventListener('wheel', handleNativeWheel);
        };
    }, []);

    // Cleanup timeout on unmount
    React.useEffect(() => {
        return () => {
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    const colors = THEME[theme];

    // Local state for hover to avoid re-rendering entire app
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Calculate layout
    const layout = useMemo(() => calculateLayout(items), [items]);
    const laneCount = Math.max(...Array.from(layout.values())) + 1;

    // Calculate canvas width based on max year
    const maxYear = Math.max(...items.map(i => i.endYear));
    const canvasWidth = getX(maxYear + 500, zoomLevel); // +500 buffer for right-side spacing
    const canvasHeight = laneCount * ROW_HEIGHT + 600; // Extra space for connector lines that extend below

    return (
        <div
            ref={scrollRef}
            className={`relative w-full h-full overflow-auto cursor-grab active:cursor-grabbing ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
            style={{ scrollbarWidth: 'none' }}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onScroll={handleScroll}
            onWheel={handleWheel}
        >
            <style jsx>{`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>

            {/* Scrollable Container Content */}
            <div style={{ width: canvasWidth, height: canvasHeight, position: 'relative' }}>

                {/* HTML Layer: Interactive Streams & Sticky Labels */}
                <div style={{ position: 'absolute', top: '30px', left: 0, right: 0, zIndex: 1 }}>
                    <StreamsLayer
                        items={items}
                        layout={layout}
                        zoomLevel={zoomLevel}
                        hoveredId={hoveredId}
                        onHover={setHoveredId}
                        onNodeHover={onNodeHover}
                        onClick={onNodeClick}
                        theme={theme}
                        isScrolling={isScrolling}
                    />
                </div>

                {/* SVG Layer: Connectors & Dots - Above bars */}
                <svg
                    width={canvasWidth}
                    height={canvasHeight}
                    className="absolute left-0 pointer-events-none"
                    style={{ top: '30px', zIndex: 2 }}
                >
                    <ConnectorsLayer
                        items={items}
                        layout={layout}
                        zoomLevel={zoomLevel}
                        hoveredId={hoveredId}
                        theme={theme}
                    />
                </svg>

                {/* Present Day Line */}
                <div
                    className="absolute bottom-0 pointer-events-none z-20"
                    style={{ left: getX(new Date().getFullYear(), zoomLevel), top: '30px' }}
                >
                    {/* Badge - aligned with century labels */}
                    <div className="absolute left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-md whitespace-nowrap" style={{ top: '-29px' }}>
                        2026
                    </div>
                    {/* Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-blue-500" style={{ top: 0, bottom: 0 }}></div>
                </div>

                {/* Century/Decade Ruler */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
                    {/* We'll generate century markers dynamically based on canvas width */}
                    {Array.from({ length: Math.ceil((maxYear - -4000) / 100) }).map((_, i) => {
                        const year = -4000 + (i * 100);
                        const x = getX(year, zoomLevel);
                        if (x < 0 || x > canvasWidth) return null;

                        return (
                            <div key={year} className={`absolute border-l ${theme === 'light' ? 'border-slate-400/30' : 'border-slate-600/30'}`} style={{ left: x, top: '30px', bottom: 0 }}>
                                <span className={`absolute left-1/2 -translate-x-1/2 text-sm font-mono font-medium ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`} style={{ top: '-25px' }}>
                                    {year < 0 ? `${Math.abs(year)} BC` : year}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
