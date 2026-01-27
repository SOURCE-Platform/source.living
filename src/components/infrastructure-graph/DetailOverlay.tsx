import React from 'react';
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
        <div className={`absolute top-4 right-4 w-80 ${colors.panelBg} backdrop-blur-md border ${colors.border} rounded-lg shadow-2xl p-6 z-50 animate-in fade-in slide-in-from-right-4 transition-colors duration-300`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${colors.textMuted}`}>
                        {node.category}
                    </span>
                    <h2 className={`text-xl font-bold mt-1 ${colors.text}`}>{node.name}</h2>
                </div>
                <button
                    onClick={onClose}
                    className={`${colors.textMuted} hover:${colors.text} transition-colors`}
                >
                    ✕
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Era</h3>
                    <p className={`text-sm ${colors.textMuted}`}>
                        {formatYear(node.startYear)} — {formatYear(node.endYear)}
                    </p>
                </div>

                <div>
                    <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Description</h3>
                    <p className={`text-sm ${colors.textMuted} leading-relaxed`}>
                        {node.description}
                    </p>
                </div>

                {/* Placeholder for images or stats */}
                <div className={`pt-4 border-t ${colors.border}`}>
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
