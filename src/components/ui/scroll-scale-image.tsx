"use client";

import { useRef, useEffect, useState, RefObject } from "react";
import Image, { ImageProps } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollScaleImageProps extends ImageProps {
    containerClassName?: string;
    containerStyle?: React.CSSProperties;
    scaleFrom?: number;
    scaleTo?: number;
}

export function ScrollScaleImage({
    src,
    alt,
    containerClassName,
    containerStyle,
    scaleFrom = 1,
    scaleTo = 1.15,
    ...props
}: ScrollScaleImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollContainer, setScrollContainer] = useState<RefObject<HTMLElement> | undefined>(undefined);

    useEffect(() => {
        const element = document.getElementById("scroll-container");
        if (element) {
            setScrollContainer({ current: element });
        }
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        container: scrollContainer,
        offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [scaleFrom, scaleTo]);

    return (
        <div
            ref={containerRef}
            className={cn("relative overflow-hidden", containerClassName)}
            style={containerStyle}
        >
            <motion.div
                style={{
                    scale,
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transformStyle: "preserve-3d"
                }}
                className="w-full h-full"
            >
                <Image
                    src={src}
                    alt={alt}
                    className="object-cover"
                    {...props}
                />
            </motion.div>
        </div>
    );
}
