"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { floydSteinbergDither } from "@/lib/dithering";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useControls } from "leva";

interface DitheredImageProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    alt: string;
    width?: number; // Optional explicit rendering width
    height?: number; // Optional explicit rendering height
    enableScrollZoom?: boolean;
    internalWidth?: number; // Default resolution
    controlId?: string; // If provided, shows Leva controls
    initialContrast?: number;
    initialBrightness?: number;
}

export function DitheredImage({
    src,
    alt,
    className,
    width,
    height,
    enableScrollZoom = false,
    internalWidth = 320,
    controlId,
    initialContrast = 1.0,
    initialBrightness = 1.0,
    ...props
}: DitheredImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const imageRef = useRef<HTMLImageElement | null>(null);

    // Controls
    const controls = useControls(controlId || "Dither Settings", {
        Contrast: { value: initialContrast, min: 0.0, max: 3.0, step: 0.1, render: (get) => !!controlId },
        Brightness: { value: initialBrightness, min: 0.0, max: 3.0, step: 0.1, render: (get) => !!controlId },
        Resolution: { value: internalWidth, min: 50, max: 800, step: 10, render: (get) => !!controlId },
    }, [controlId]);

    // Use controls if ID provided, otherwise defaults
    const activeContrast = controlId ? controls.Contrast : initialContrast;
    const activeBrightness = controlId ? controls.Brightness : initialBrightness;
    const activeResolution = controlId ? controls.Resolution : internalWidth;


    // Scroll Zoom Logic
    const scrollContainerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = document.getElementById("scroll-container");
        if (el) {
            scrollContainerRef.current = el;
        }
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        container: scrollContainerRef,
        offset: ["start end", "end start"],
    });

    const draw = useCallback((currentZoom: number = 1.0) => {
        const canvas = canvasRef.current;
        const image = imageRef.current;
        if (!canvas || !image) return;

        // Use fixed internal resolution for "retro" pixel look & performance
        const container = containerRef.current;
        if (!container) return;

        const containerAspect = container.clientWidth / container.clientHeight;
        const renderW = activeResolution;
        // Handle 0 aspect to avoid Infinity
        const renderH = containerAspect ? Math.round(activeResolution / containerAspect) : Math.round(activeResolution / (image.width / image.height));

        // Update canvas resolution only if changed (perf)
        if (canvas.width !== renderW || canvas.height !== renderH) {
            canvas.width = renderW;
            canvas.height = renderH;
        }

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        // Apply visual filters (Contrast/Brightness)
        ctx.filter = `contrast(${activeContrast}) brightness(${activeBrightness})`;

        // Draw Logic with Zoom
        const scaleCover = Math.max(renderW / image.width, renderH / image.height);
        const effectiveScale = scaleCover * currentZoom;

        const scaledW = image.width * effectiveScale;
        const scaledH = image.height * effectiveScale;

        const x = (renderW - scaledW) / 2;
        const y = (renderH - scaledH) / 2;

        ctx.drawImage(image, x, y, scaledW, scaledH);

        // Reset filter so it doesn't affect pixel data access/put (though usually filter only affects drawImage)
        ctx.filter = "none";

        const imageData = ctx.getImageData(0, 0, renderW, renderH);
        floydSteinbergDither(imageData);
        ctx.putImageData(imageData, 0, 0);
    }, [activeResolution, activeContrast, activeBrightness]);

    // Load Image
    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.crossOrigin = "Anonymous";

        img.onload = () => {
            imageRef.current = img;
            draw(1.0); // Initial draw
            setIsLoaded(true);
        };
    }, [src, activeResolution, activeContrast, activeBrightness]);

    // React to Scroll
    // We use a listener instead of useTransform driving CSS to force a software redraw
    useEffect(() => {
        if (!enableScrollZoom) return;

        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (!imageRef.current || !isLoaded) return;
            // Map 0..1 to 1..1.75
            // Actually let's do 1 to 2.5 for more impact as requested "increase zooming effect"
            const zoom = 1 + (latest * 0.75); // 1.0 to 1.75

            // Use requestAnimationFrame for performance throttling?
            // For now direct call is usually fine for <500px canvas
            requestAnimationFrame(() => draw(zoom));
        });

        return () => unsubscribe();
    }, [isLoaded, enableScrollZoom, scrollYProgress, draw]); // Added draw to dependencies

    // Resize handler
    useEffect(() => {
        const observer = new ResizeObserver(() => {
            if (imageRef.current && isLoaded) draw(enableScrollZoom ? (1 + scrollYProgress.get() * 0.75) : 1.0);
        });
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [isLoaded, enableScrollZoom, scrollYProgress, draw]); // Added draw to dependencies

    return (
        <div
            ref={containerRef}
            className={cn("relative overflow-hidden w-full h-full", className)}
            {...props}
        >
            <canvas
                ref={canvasRef}
                className={cn("block w-full h-full object-cover transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0")}
                style={{ imageRendering: "pixelated" }} // Ensure sharp upscaling
            />
        </div>
    );
}
