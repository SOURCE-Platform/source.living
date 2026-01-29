import React from 'react';
import Image from 'next/image';
import { InfrastructureNode } from './types';
import { getYear } from './utils';
import { Theme, THEME } from './theme';

interface DetailOverlayProps {
    node: InfrastructureNode | null;
    onClose: () => void;
    theme: Theme;
}

export function DetailOverlay({ node, onClose, theme }: DetailOverlayProps) {
    if (!node) return null;

    const colors = THEME[theme];

    return (
        <div
            className="absolute top-4 right-4 w-80 border border-border rounded-2xl bg-card z-50 transition-all duration-300 pointer-events-none overflow-hidden"
            style={{
                animation: 'fadeIn 0.2s ease-in-out',
                boxShadow: theme === 'dark'
                    ? '0 0 30px rgba(0, 0, 0, 0.5)'
                    : '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
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

            {/* Image Section - Always shown */}
            <div className="w-full h-32 relative bg-muted/20">
                {node.image && (
                    <Image
                        src={node.image}
                        alt={node.name}
                        fill
                        className="object-cover"
                    />
                )}
            </div>

            {/* Content Section */}
            <div className="p-6">
                <div className="mb-4">
                    <span className={`text-xs font-bold uppercase tracking-wider ${colors.textMuted}`}>
                        {node.category}
                    </span>
                    <h2 className={`text-xl font-bold mt-1 ${colors.text}`}>{node.name}</h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className={`text-base font-sans font-bold uppercase tracking-wider ${colors.text} mb-1`}>Era</div>
                        <p className={`text-sm ${colors.textMuted}`}>
                            {formatYear(node.startYear)} — {formatYear(node.endYear)}
                        </p>
                    </div>

                    <div>
                        <div className={`text-base font-sans font-bold uppercase tracking-wider ${colors.text} mb-1`}>Description</div>
                        <p className={`text-sm ${colors.textMuted} leading-relaxed`}>
                            {node.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Full Width Separator and Stats */}
            <div className="border-t border-border">
                <div className="px-6 py-4">
                    <div className={`flex justify-between text-xs ${colors.textMuted}`}>
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
