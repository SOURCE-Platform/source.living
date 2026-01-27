import React, { useMemo, useState } from 'react';
import { InfrastructureNode } from './types';
import { getX, calculateLayout } from './utils';
import { StreamsLayer } from './StreamsLayer';
import { ConnectorsLayer } from './ConnectorsLayer';

import { Theme, THEME } from './theme';

interface TimelineCanvasProps {
    items: InfrastructureNode[];
    zoomLevel: number;
    onNodeClick: (node: InfrastructureNode) => void;
    theme: Theme;
}

export function TimelineCanvas({ items, zoomLevel, onNodeClick, theme }: TimelineCanvasProps) {
    const ROW_HEIGHT = 60;
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [startX, setStartX] = React.useState(0);
    const [scrollLeft, setScrollLeft] = React.useState(0);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const onMouseLeave = () => {
        setIsDragging(false);
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1; // Scroll-fast
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const colors = THEME[theme];

    // Local state for hover to avoid re-rendering entire app
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Calculate layout
    const layout = useMemo(() => calculateLayout(items), [items]);
    const laneCount = Math.max(...Array.from(layout.values())) + 1;

    // Calculate canvas width based on max year
    const maxYear = Math.max(...items.map(i => i.endYear));
    const canvasWidth = getX(maxYear + 500, zoomLevel); // +500 buffer for right-side spacing
    const canvasHeight = laneCount * ROW_HEIGHT + 100;

    return (
        <div
            ref={scrollRef}
            className={`relative w-full h-full overflow-auto cursor-grab active:cursor-grabbing ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
            style={{ scrollbarWidth: 'none' }}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
        >
            <style jsx>{`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>

            {/* Scrollable Container Content */}
            <div style={{ width: canvasWidth, height: canvasHeight, position: 'relative' }}>

                {/* SVG Layer: Grid & Connectors */}
                <svg
                    width={canvasWidth}
                    height={canvasHeight}
                    className="absolute top-0 left-0 pointer-events-none"
                >
                    {/* Grid / Axis placeholders */}
                    {Array.from({ length: laneCount }).map((_, i) => (
                        <line
                            key={i}
                            x1={0}
                            y1={(i + 1) * ROW_HEIGHT}
                            x2={canvasWidth}
                            y2={(i + 1) * ROW_HEIGHT}
                            stroke={colors.grid}
                            strokeWidth={1}
                            strokeDasharray="5,5"
                        />
                    ))}

                    {/* Connectors Layer (Below Streams) */}
                    <ConnectorsLayer
                        items={items}
                        layout={layout}
                        zoomLevel={zoomLevel}
                        hoveredId={hoveredId}
                        theme={theme}
                    />
                </svg>

                {/* HTML Layer: Interactive Streams & Sticky Labels */}
                <StreamsLayer
                    items={items}
                    layout={layout}
                    zoomLevel={zoomLevel}
                    hoveredId={hoveredId}
                    onHover={setHoveredId}
                    onClick={onNodeClick}
                    theme={theme}
                />

                {/* Present Day Line */}
                <div
                    className="absolute top-0 bottom-0 w-px border-l-2 border-dashed border-red-500/50 pointer-events-none z-20"
                    style={{ left: getX(new Date().getFullYear(), zoomLevel) }}
                >
                    <div className="absolute -top-6 -left-12 w-24 text-center text-xs font-bold text-red-500 uppercase tracking-widest">
                        Present
                    </div>
                </div>

                {/* Century/Decade Ruler */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    {/* We'll generate century markers dynamically based on canvas width */}
                    {Array.from({ length: Math.ceil((maxYear - -4000) / 100) }).map((_, i) => {
                        const year = -4000 + (i * 100);
                        const x = getX(year, zoomLevel);
                        if (x < 0 || x > canvasWidth) return null;

                        return (
                            <div key={year} className="absolute top-0 h-full border-l border-slate-500/10" style={{ left: x }}>
                                <span className={`absolute top-2 left-1 text-[10px] font-mono ${theme === 'light' ? 'text-slate-400' : 'text-slate-600'}`}>
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
