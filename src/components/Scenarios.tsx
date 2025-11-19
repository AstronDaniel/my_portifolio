"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Scenarios() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <CyberGrid />
            <AtmosphericFog />
        </div>
    );
}

function CyberGrid() {
    return (
        <div className="absolute inset-0 transform-gpu perspective-1000">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 2 }}
                className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-blue-900/20 to-transparent"
            />
        </div>
    );
}

function AtmosphericFog() {
    return (
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-blue-900/10 pointer-events-none" />
    );
}
