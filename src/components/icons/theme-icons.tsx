import React from 'react';
import { cn } from '@/lib/utils';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    theme?: string;
}

const GradientDefs = ({ id }: { id: string }) => (
    <defs>
        <linearGradient id={`${id}-light`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="20" y2="20">
            <stop offset="0%" stopColor="#ABAB88" />
            <stop offset="19%" stopColor="#9B4460" />
            <stop offset="35%" stopColor="#1F1F1C" />
            <stop offset="64%" stopColor="#1F1F1C" />
            <stop offset="100%" stopColor="#141B5C" />
        </linearGradient>
        <linearGradient id={`${id}-dark`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="20" y2="20">
            <stop offset="0%" stopColor="#FFC1D5" />
            <stop offset="29.69%" stopColor="#FFC1D5" />
            <stop offset="61.98%" stopColor="#FEFFE3" />
            <stop offset="100%" stopColor="#97A1FB" />
        </linearGradient>
    </defs>
);

export const SystemIcon = ({ className, theme, ...props }: IconProps) => {
    const id = "system-icon-gradient";
    // Use light gradient for light theme (dark colors), dark gradient for dark theme (light colors)
    // If theme is undefined (during server render or load), default to dark gradient as a safe fallback? 
    // Or check if user wants specific default. Assuming dark mode default for safety or consistency with previous.
    // Actually, "resolvedTheme" is usually 'light' or 'dark'.
    const suffix = theme === 'light' ? 'light' : 'dark';
    const gradientUrl = `url(#${id}-${suffix})`;

    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-5 h-5", className)}
            {...props}
        >
            <GradientDefs id={id} />
            <rect x="2" y="3" width="16" height="12" rx="2" stroke={gradientUrl} strokeWidth="1" />
            <path d="M7 17h6" stroke={gradientUrl} strokeLinecap="round" strokeWidth="1" />
        </svg>
    );
};

export const DarkIcon = ({ className, theme, ...props }: IconProps) => {
    const id = "dark-icon-gradient";
    const suffix = theme === 'light' ? 'light' : 'dark';
    const gradientUrl = `url(#${id}-${suffix})`;

    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-5 h-5", className)}
            {...props}
        >
            <GradientDefs id={id} />
            <path d="M12.4844 2C8.0661 2 4.48438 5.58172 4.48438 10C4.48438 14.4183 8.0661 18 12.4844 18C13.673 18 14.7998 17.7411 15.8125 17.2771C12.8243 16.493 10.3559 13.5343 10.3559 10C10.3559 6.46601 12.8248 3.50713 16.1324 2.75636C15.0882 2.27905 13.82 2 12.4844 2Z" stroke={gradientUrl} strokeWidth="1" />
        </svg>
    );
};

// Email Icon with same gradient style
export const EmailIcon = ({ className, theme, ...props }: IconProps) => {
    const id = "email-icon-gradient";
    const suffix = theme === 'light' ? 'light' : 'dark';
    const gradientUrl = `url(#${id}-${suffix})`;

    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-5 h-5", className)}
            {...props}
        >
            <GradientDefs id={id} />
            <rect width="20" height="16" x="2" y="4" rx="2" stroke={gradientUrl} strokeWidth="1" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke={gradientUrl} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
        </svg>
    );
};

export const LightIcon = ({ className, theme, ...props }: IconProps) => {
    const id = "light-icon-gradient";
    const suffix = theme === 'light' ? 'light' : 'dark';
    const gradientUrl = `url(#${id}-${suffix})`;

    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-5 h-5", className)}
            {...props}
        >
            <GradientDefs id={id} />
            <circle cx="10" cy="10" r="8.5" stroke={gradientUrl} strokeWidth="1" />
        </svg>
    );
};

export const WordzIcon = ({ className, theme, ...props }: IconProps) => {
    const id = "wordz-icon-gradient";
    const suffix = theme === 'light' ? 'light' : 'dark';
    const gradientUrl = `url(#${id}-${suffix})`;

    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-5 h-5", className)}
            {...props}
        >
            <GradientDefs id={id} />
            <path
                d="M36.0769 18.5868C38.723 20.1303 38.723 23.9535 36.0769 25.497L12.0155 39.5328C9.34885 41.0884 6 39.1649 6 36.0777L6 8.00603C6 4.91886 9.34886 2.99538 12.0155 4.55091L36.0769 18.5868Z"
                stroke={gradientUrl}
                strokeWidth="2.2"
                strokeLinejoin="round"
            />
        </svg>
    );
};
