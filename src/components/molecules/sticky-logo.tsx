'use client';

import { useEffect, useState } from 'react';
import { SourceLogo } from "@/components/atoms/icons/source-logo";
import { TransitionLink } from "@/components/atoms/transition-link";
import { cn } from "@/lib/utils";

export function StickyLogo() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const scrollContainer = document.getElementById('scroll-container');
        if (!scrollContainer) return;

        const handleScroll = () => {
            // Show only when at the very top (within 10px buffer)
            const shouldBeVisible = scrollContainer.scrollTop < 10;
            setIsVisible(shouldBeVisible);
        };

        // Initial check
        handleScroll();

        scrollContainer.addEventListener('scroll', handleScroll);
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={cn(
                "fixed top-8 left-8 z-50 transition-opacity duration-300",
                isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
        >
            <TransitionLink href="/">
                <SourceLogo className="h-12 w-auto" />
            </TransitionLink>
        </div>
    );
}
