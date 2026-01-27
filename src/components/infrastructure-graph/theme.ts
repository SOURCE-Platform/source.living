export type Theme = 'light' | 'dark';

export const THEME = {
    dark: {
        bg: 'bg-slate-950',
        panelBg: 'bg-slate-900/90',
        text: 'text-slate-100',
        textMuted: 'text-slate-400',
        border: 'border-slate-800',
        grid: '#1e293b',
        connector: '#475569',
    },
    light: {
        bg: 'bg-slate-50',
        panelBg: 'bg-white/90',
        text: 'text-slate-900',
        textMuted: 'text-slate-500',
        border: 'border-slate-200',
        grid: '#e2e8f0',
        connector: '#94a3b8',
    }
};

export function getCategoryGradient(category: string): string {
    switch (category) {
        // Gradients from bright/light at top to darker at bottom
        case 'WATER': return 'linear-gradient(to bottom, #C2EDFC, #74A6D8)';
        case 'TRANSPORT': return 'linear-gradient(to bottom, #E8BC92, #BB844A)';
        case 'ENERGY': return 'linear-gradient(to bottom, #FCC2D5, #D8748C)';
        case 'DIGITAL': return 'linear-gradient(to bottom, #D7C2FC, #9474D8)';
        case 'CIVIC': return 'linear-gradient(to bottom, #A0ECAC, #71B372)';
        default: return 'linear-gradient(to bottom, #cbd5e1, #64748b)';
    }
}

export function getLegendGradient(category: string): string {
    switch (category) {
        // Radial gradients from light center to darker edges for glossy effect
        case 'WATER': return 'radial-gradient(circle at 30% 30%, #C2EDFC, #74A6D8)';
        case 'TRANSPORT': return 'radial-gradient(circle at 30% 30%, #E8BC92, #BB844A)';
        case 'ENERGY': return 'radial-gradient(circle at 30% 30%, #FCC2D5, #D8748C)';
        case 'DIGITAL': return 'radial-gradient(circle at 30% 30%, #D7C2FC, #9474D8)';
        case 'CIVIC': return 'radial-gradient(circle at 30% 30%, #A0ECAC, #71B372)';
        default: return 'radial-gradient(circle at 30% 30%, #cbd5e1, #64748b)';
    }
}
