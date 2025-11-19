"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CyberpunkScroll() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const [hex, setHex] = useState("00");

  useEffect(() => {
    const interval = setInterval(() => {
      setHex(Math.floor(Math.random() * 255).toString(16).toUpperCase().padStart(2, '0'));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed right-0 top-0 bottom-0 w-12 z-40 hidden md:flex flex-col items-center justify-center pointer-events-none mix-blend-screen">
      <div className="h-full w-[1px] bg-blue-900/30 relative">
        <motion.div
          className="absolute top-0 left-0 w-full bg-blue-500 origin-top"
          style={{ scaleY, height: "100%" }}
        />
        <motion.div
          className="absolute w-4 h-4 -left-2 bg-blue-500 border border-blue-300 shadow-[0_0_10px_#3b82f6]"
          style={{ top: useSpring(useScroll().scrollYProgress.get() * 100 + "%") }} // Simplified for visual
        >
           <div className="absolute left-6 top-0 text-[10px] font-mono text-blue-400 whitespace-nowrap">
             0x{hex}
           </div>
        </motion.div>
      </div>
      
      {/* Decorative markers */}
      <div className="absolute top-10 right-4 text-[10px] font-mono text-blue-900/50">START</div>
      <div className="absolute bottom-10 right-4 text-[10px] font-mono text-blue-900/50">END</div>
    </div>
  );
}
