"use client"

import React, { ComponentPropsWithoutRef } from "react"
import { motion, Transition, Variants } from "framer-motion"

import { cn } from "@/lib/utils"

interface CircularTextProps extends ComponentPropsWithoutRef<"div"> {
    children: string
    duration?: number
    reverse?: boolean
    radius?: number
    transition?: Transition
    variants?: {
        container?: Variants
        item?: Variants
    }
}

const BASE_TRANSITION: Transition = {
    repeat: Infinity,
    ease: "linear",
}

const BASE_ITEM_VARIANTS: Variants = {
    hidden: {
        opacity: 1,
    },
    visible: {
        opacity: 1,
    },
}

export function CircularText({
    children,
    duration = 10,
    reverse = false,
    radius = 125, // Default to 125px (250px diameter)
    transition,
    variants,
    className,
    style,
}: CircularTextProps) {
    const letters = children.split("")
    // Ensure we have the spacing for the loop
    letters.push(" ")

    const finalTransition: Transition = {
        ...BASE_TRANSITION,
        ...transition,
        duration: (transition as { duration?: number })?.duration ?? duration,
    }

    const containerVariants: Variants = {
        visible: { rotate: reverse ? -360 : 360 },
        ...variants?.container,
    }

    const itemVariants: Variants = {
        ...BASE_ITEM_VARIANTS,
        ...variants?.item,
    }

    // Trail config
    const TRAIL_COUNT = 8;
    const LOOP_DURATION = 4; // Fixed 4s loop for drift/fade

    const layers = Array.from({ length: TRAIL_COUNT + 1 }).map((_, i) => {
        const isMain = i === 0;
        const opacity = isMain ? 1 : 0.8 * (1 - i / (TRAIL_COUNT + 1));

        // Drift angle: The deeper the ghost, the more it drifts backward over the loop.
        // Let's say max drift is 10-15 degrees for the last ghost.
        // drift = i * degree_step
        const driftAmount = i * 2.5;

        return {
            index: i,
            opacity,
            driftAmount,
            isMain
        };
    });

    return (
        <div
            className={cn("relative flex items-center justify-center rounded-full", className)}
            style={{
                width: radius * 2,
                height: radius * 2,
                ...style,
            }}
        >
            {/* 
                We need a wrapper for the continuous rotation so all layers spin together.
                Then each layer has its own local animation (drift + opacity).
             */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center rounded-full"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                transition={finalTransition}
            >
                {layers.reverse().map((layer) => (
                    <motion.div
                        key={layer.index}
                        className="absolute inset-0 flex items-center justify-center rounded-full"
                        animate={layer.isMain ? undefined : {
                            rotate: reverse
                                ? [0, layer.driftAmount, layer.driftAmount]
                                : [0, -layer.driftAmount, -layer.driftAmount],
                            opacity: [0, layer.opacity, 0, 0]
                        }}
                        transition={layer.isMain ? undefined : {
                            rotate: {
                                duration: LOOP_DURATION,
                                repeat: Infinity,
                                ease: "easeInOut",
                                repeatType: "loop",
                                times: [0, 0.8, 1]
                            },
                            opacity: {
                                duration: LOOP_DURATION,
                                repeat: Infinity,
                                ease: "easeInOut",
                                repeatType: "loop",
                                times: [0, 0.1, 0.8, 1] // Fade in 0-10%, Fade out 10-80%, Hold 80-100%
                            }
                        }}
                        style={{
                            opacity: layer.isMain ? 1 : undefined, // Start opacity
                            mixBlendMode: layer.index === 0 ? 'normal' : 'screen'
                        }}
                    >
                        {letters.map((letter, index) => (
                            <motion.span
                                aria-hidden="true"
                                key={`${index}-${letter}`}
                                variants={itemVariants}
                                className={cn("absolute top-1/2 left-1/2 inline-block text-center", layer.isMain ? "" : "blur-[0.5px]")}
                                style={
                                    {
                                        "--index": index,
                                        "--total": letters.length,
                                        "--radius": radius,
                                        transform: `
                              translate(-50%, -50%)
                              rotate(calc(360deg / var(--total) * var(--index)))
                              translateY(calc(var(--radius) * -1px))
                            `,
                                        transformOrigin: "center",
                                        color: layer.isMain ? undefined : "inherit"
                                    } as React.CSSProperties
                                }
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </motion.div>
                ))}
            </motion.div>
            <span className="sr-only">{children}</span>
        </div>
    )
}
