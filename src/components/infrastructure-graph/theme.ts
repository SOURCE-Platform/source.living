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
