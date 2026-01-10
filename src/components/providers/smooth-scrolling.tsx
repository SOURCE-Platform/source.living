"use client";

import { ReactLenis } from "lenis/react";

interface SmoothScrollingProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export function SmoothScrolling({ children, className, id }: SmoothScrollingProps) {
    return (
        <ReactLenis root={false} className={className} options={{ lerp: 0.1, duration: 1.5 }} id={id}>
            {children}
        </ReactLenis>
    );
}
