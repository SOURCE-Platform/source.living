'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface TransitionContextType {
    isFadingOut: boolean;
    transitionTo: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isFadingOut, setIsFadingOut] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Reset fade-out state when pathname changes (meaning navigation completed)
    useEffect(() => {
        setIsFadingOut(false);
    }, [pathname]);

    const transitionTo = (href: string) => {
        if (href === pathname) return;

        setIsFadingOut(true);
        // Wait for the 0.2s duration before navigating
        setTimeout(() => {
            router.push(href);
        }, 200);
    };

    return (
        <TransitionContext.Provider value={{ isFadingOut, transitionTo }}>
            {children}
        </TransitionContext.Provider>
    );
};

export const TransitionEffect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isFadingOut } = useTransitionTo();

    return (
        <div
            className={`transition-opacity duration-200 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
        >
            {children}
        </div>
    );
};

export const useTransitionTo = () => {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error('useTransitionTo must be used within a TransitionProvider');
    }
    return context;
};
