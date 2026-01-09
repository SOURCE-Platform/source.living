import { cn } from "@/lib/utils";
import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
}

export function Badge({ children, className, ...props }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-block rounded-md bg-white dark:bg-muted px-2 pt-1 pb-1 text-xs font-medium text-foreground tracking-wider",
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
