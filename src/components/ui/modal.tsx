'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
    const [isMounted, setIsMounted] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    React.useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false);
                document.body.style.overflow = 'unset';
            }, 300); // Duration matches animation
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isMounted) return null;
    if (!isOpen && !isVisible) return null;

    // Use transitions instead of keyframe animations for reliable Reversibility
    const backdropState = isOpen ? 'opacity-100' : 'opacity-0';
    const modalState = isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95';

    return createPortal(
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ease-in-out bg-background/80 backdrop-blur-sm ${backdropState}`}>
            {/* Backdrop click handler */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Content */}
            <div
                className={`relative z-50 w-full max-w-lg overflow-hidden rounded-xl border border-border bg-background shadow-[0_0_50px_rgba(0,0,0,0.25)] dark:shadow-[0_0_80px_-20px_rgba(151,161,251,0.5)] transition-all duration-300 ease-in-out ${modalState}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col max-h-[85vh]">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-border px-6 py-4">
                        {title && (
                            <h3 className="text-base font-bold text-foreground">
                                {title}
                            </h3>
                        )}
                        <button
                            onClick={onClose}
                            className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                            <span className="sr-only">Close</span>
                        </button>
                    </div>

                    {/* Scrollable Body */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
