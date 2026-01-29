"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SolutionNodeIllustration } from "@/components/illustrations/solution-node-illustration";

export function SolutionIllustrationBackground() {
    const [bgTopOffset, setBgTopOffset] = useState<number>(-9999); // Start off-screen

    const pathname = usePathname();

    useEffect(() => {
        const scrollContainer = document.getElementById('scroll-container');
        if (!scrollContainer) return;

        let spacerDocumentTop: number | null = null;

        const findSpacerPosition = () => {
            const spacer = document.getElementById('solution-illustration-spacer');
            if (!spacer) {
                spacerDocumentTop = null;
                setBgTopOffset(-9999); // Hide if spacer not found
                return;
            }

            const rect = spacer.getBoundingClientRect();
            const scrollTop = scrollContainer.scrollTop;
            spacerDocumentTop = rect.top + scrollTop;
        };

        const handleScroll = () => {
            if (spacerDocumentTop === null) {
                findSpacerPosition();
                if (spacerDocumentTop === null) return;
            }

            const scrollTop = scrollContainer.scrollTop;
            const visualPosition = spacerDocumentTop - scrollTop;

            setBgTopOffset(visualPosition);
        };

        // Initial setup
        setTimeout(() => {
            findSpacerPosition();
            handleScroll();
        }, 100);

        scrollContainer.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', () => {
            spacerDocumentTop = null; // Reset on resize
            findSpacerPosition();
            handleScroll();
        });

        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll);
        };
    }, [pathname]);

    return (
        <div
            className="absolute left-0 right-0 w-screen z-0 pointer-events-none h-[90vh]"
            style={{ top: `${bgTopOffset}px` }}
        >
            <SolutionNodeIllustration className="w-full h-full opacity-80" />
        </div>
    );
}
