import React from 'react';
import { InfrastructureNode } from './types';
import { getYear } from './utils';
import { Theme, THEME } from './theme';
import { DitheredImage } from '@/components/atoms/dithered-image';

interface DetailOverlayProps {
    node: InfrastructureNode | null;
    onClose: () => void;
    theme: Theme;
}

export function DetailOverlay({ node, onClose, theme }: DetailOverlayProps) {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState({ top: 16, right: 16 });

    // Adjust position based on viewport boundaries
    React.useEffect(() => {
        if (!cardRef.current || !node) return;

        const updatePosition = () => {
            const card = cardRef.current;
            if (!card) return;

            const cardRect = card.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const margin = 16; // Margin from viewport edges

            let newTop = margin;
            const newRight = margin;

            // Check if card would overflow bottom of viewport
            if (cardRect.bottom > viewportHeight - margin) {
                // Position from bottom
                newTop = viewportHeight - cardRect.height - margin;
            }

            // Check if card would overflow top of viewport
            if (newTop < margin) {
                newTop = margin;
            }

            setPosition({ top: newTop, right: newRight });
        };

        // Initial position calculation
        updatePosition();

        // Update position on scroll
        const handleScroll = () => {
            updatePosition();
        };

        window.addEventListener('scroll', handleScroll, true);
        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('scroll', handleScroll, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [node]);

    if (!node) return null;

    const colors = THEME[theme];

    return (
        <div
            ref={cardRef}
            className="fixed w-80 z-50 transition-all duration-300 pointer-events-auto"
            style={{
                top: `${position.top}px`,
                right: `${position.right}px`,
                animation: 'fadeIn 0.2s ease-in-out',
            }}
        >
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

            {/* Main Card Container with "Ticket Stub" Shape via Masking */}
            <div
                className="relative bg-card rounded-2xl overflow-hidden flex flex-col border border-border"
                style={{
                    boxShadow: theme === 'dark'
                        ? '0 0 30px rgba(0, 0, 0, 0.5)'
                        : '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',

                    // The Mask Strategy (Fixed for Cross-Browser Compatibility):
                    // Use standard radial-gradient syntax with calc() for positioning.
                    // 1. Left half: Hole at left edge, y = 100% - 56px.
                    // 2. Right half: Hole at right edge, y = 100% - 56px.
                    // 3. No overlap (51% width each) means no composition issues.
                    maskImage: `
                        radial-gradient(circle 12px at 0 calc(100% - 56px), transparent 12px, black 12.5px) 0 0 / 51% 100% no-repeat,
                        radial-gradient(circle 12px at 100% calc(100% - 56px), transparent 12px, black 12.5px) 100% 0 / 51% 100% no-repeat
                    `,
                    WebkitMaskImage: `
                        radial-gradient(circle 12px at 0 calc(100% - 56px), transparent 12px, black 12.5px) 0 0 / 51% 100% no-repeat,
                        radial-gradient(circle 12px at 100% calc(100% - 56px), transparent 12px, black 12.5px) 100% 0 / 51% 100% no-repeat
                    `,
                }}
            >
                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    {/* Image Section */}
                    <div className="w-full h-32 shrink-0 bg-muted/20 relative border-b border-border/50">
                        {node.image && (
                            <div className="overflow-hidden w-full h-full absolute inset-0">
                                <DitheredImage
                                    src={node.image}
                                    alt={node.name}
                                    internalWidth={400}
                                    className="w-full h-full"
                                    initialContrast={1.0}
                                    initialBrightness={1.0}
                                    animateResolution={true}
                                />
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6 pb-6">
                        <div className="mb-6">
                            <span className={`text-xs font-bold uppercase tracking-wider ${colors.textMuted}`}>
                                {node.category}
                            </span>
                            <h2 className={`text-xl font-bold mt-1 leading-none ${colors.text}`}>{node.name}</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className={`text-base font-sans font-bold uppercase tracking-wider ${colors.text}`}>Era</div>
                                <p className={`text-sm ${colors.textMuted}`}>
                                    {formatYear(node.startYear)} — {formatYear(node.endYear)}
                                </p>
                            </div>

                            <div>
                                <div className={`text-base font-sans font-bold uppercase tracking-wider ${colors.text}`}>Description</div>
                                <p className={`text-sm ${colors.textMuted} leading-relaxed`}>
                                    {node.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashed Line Separator */}
                <div className="absolute w-full h-px border-t border-dashed border-border/50 bg-transparent z-10" style={{ bottom: '56px', left: 0 }} />

                {/* SVG Border Bridges for the notches */}
                {/* Left Notch Border */}
                <svg
                    className="absolute z-20 pointer-events-none"
                    style={{ bottom: '45px', left: '-1px', width: '13px', height: '24px' }}
                    viewBox="0 0 13 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 0 V0 C6.6 0 12 5.4 12 12 C12 18.6 6.6 24 0 24 V24"
                        stroke={theme === 'dark' ? '#333' : '#e2e8f0'} // Approximate border colors matching theme
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>

                {/* Right Notch Border */}
                <svg
                    className="absolute z-20 pointer-events-none"
                    style={{ bottom: '45px', right: '-1px', width: '13px', height: '24px' }}
                    viewBox="0 0 13 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13 0 V0 C6.4 0 1 5.4 1 12 C1 18.6 6.4 24 13 24 V24"
                        stroke={theme === 'dark' ? '#333' : '#e2e8f0'}
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>

                {/* Bottom Stats Section - Fixed height */}
                <div className="px-6 h-[56px] flex items-center justify-between shrink-0 bg-card">
                    <div className={`flex justify-between w-full text-xs ${colors.textMuted}`}>
                        <span>Peak: {formatYear(node.peakYear ?? node.endYear)}</span>
                        <span>Magnitude: {node.magnitude}/10</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function formatYear(year: number): string {
    if (year < 0) return `${Math.abs(year)} BCE`;
    return `${year} CE`;
}
