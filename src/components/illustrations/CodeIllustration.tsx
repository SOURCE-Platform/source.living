"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface CodeIllustrationProps {
    className?: string;
    style?: React.CSSProperties;
}

export function CodeIllustration({ className, style }: CodeIllustrationProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Rotate the gradient from 0 to 360 degrees based on scroll position
    const gradientRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <div ref={ref} className={className} style={style}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 183 110"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                <path
                    d="M12.7031 12.7031H170.203M43.7031 26.7031L169.703 26.7031M43.7031 54.7031L169.703 54.7031M72.7031 40.7031L139.703 40.7031M102.703 82.7031L169.703 82.7031M102.703 96.7031H145.703M72.7031 68.7031L169.703 68.7031"
                    stroke="url(#paint0_linear_1896_867)"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
                <defs>
                    <motion.linearGradient
                        id="paint0_linear_1896_867"
                        x1="12.7031"
                        y1="-20.2969"
                        x2="170.703"
                        y2="121.203"
                        gradientUnits="userSpaceOnUse"
                        style={{ rotate: gradientRotation, transformOrigin: "center" }}
                    >
                        <stop stopColor="#FF88C8" />
                        <stop offset="0.389423" stopColor="#FFFFE4" />
                        <stop offset="0.677885" stopColor="#FFFFE4" />
                        <stop offset="1" stopColor="#8793FF" />
                    </motion.linearGradient>
                </defs>
            </svg>
        </div>
    );
}
