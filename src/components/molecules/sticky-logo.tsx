'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { SourceLogo } from "@/components/atoms/icons/source-logo";
import { TransitionLink } from "@/components/atoms/transition-link";
import { cn } from "@/lib/utils";

export function StickyLogo() {
    const [isVisible, setIsVisible] = useState(true);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
        const scrollContainer = document.getElementById('scroll-container');
        if (!scrollContainer) return;

        const handleScroll = () => {
            // On main page, stay visible until problem image passes
            if (pathname === '/') {
                const problemImageSpacer = document.getElementById('problem-image-spacer');
                if (problemImageSpacer) {
                    const rect = problemImageSpacer.getBoundingClientRect();
                    const spacerBottom = rect.bottom;
                    // Fade out 500px before the bottom of the spacer passes the top of the viewport
                    const shouldBeVisible = spacerBottom > 500;
                    setIsVisible(shouldBeVisible);
                } else {
                    // Fallback: show only at top
                    setIsVisible(scrollContainer.scrollTop < 10);
                }
            } else {
                // On other pages, show only when at the very top (within 10px buffer)
                const shouldBeVisible = scrollContainer.scrollTop < 10;
                setIsVisible(shouldBeVisible);
            }
        };

        // Initial check
        handleScroll();

        scrollContainer.addEventListener('scroll', handleScroll);
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    // During SSR and initial hydration, resolvedTheme might not match.
    // We defer theme-dependent logic until mounted to avoid hydration mismatch.
    const shouldBeWhite = mounted && pathname === '/' && resolvedTheme === 'light';

    return (
        <div
            className={cn(
                "fixed top-8 left-8 z-50 transition-opacity duration-300",
                isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
        >
            <TransitionLink href="/">
                <SourceLogo className="h-12 w-auto" forceWhite={shouldBeWhite} />
            </TransitionLink>
        </div>
    );
}
