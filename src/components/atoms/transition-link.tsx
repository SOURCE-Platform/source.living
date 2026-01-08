'use client';

import React from 'react';
import Link, { LinkProps } from 'next/link';
import { useTransitionTo } from '../providers/transition-context';

interface TransitionLinkProps extends LinkProps {
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
    children,
    href,
    className,
    onClick,
    ...props
}) => {
    const { transitionTo } = useTransitionTo();

    const handleTransition = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // If modifier keys are pressed, let the browser handle it (new tab, new window, etc.)
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
            return;
        }

        e.preventDefault();
        if (onClick) onClick(e);
        transitionTo(href.toString());
    };

    return (
        <Link
            href={href}
            className={className}
            onClick={handleTransition}
            {...props}
        >
            {children}
        </Link>
    );
};
