"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HologramProps {
    children: ReactNode;
    className?: string;
    color?: string;
}

export default function Hologram({ children, className = "", color = "blue" }: HologramProps) {
    return (
        <div className={`relative group ${className}`}>
            {/* Holographic Projection Beam */}
            <div className={`absolute -inset-4 bg-gradient-to-t from-${color}-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

            {/* Main Content Container */}
            <div className={`relative z-10 bg-${color}-900/10 backdrop-blur-sm border border-${color}-500/30 p-6 rounded-xl overflow-hidden`}>
                {/* Scanlines */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />

                {/* Glitch Overlay (Animated) */}
                <motion.div
                    className={`absolute inset-0 bg-${color}-400/5 mix-blend-overlay`}
                    animate={{
                        opacity: [0, 0.1, 0],
                        x: [0, -5, 5, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "linear",
                    }}
                />

                {/* Corner Accents */}
                <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-${color}-400`} />
                <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-${color}-400`} />
                <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-${color}-400`} />
                <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-${color}-400`} />

                {children}
            </div>
        </div>
    );
}
