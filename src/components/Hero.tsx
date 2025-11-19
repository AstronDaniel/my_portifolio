"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ArrowDown, Cpu, Globe, Shield } from "lucide-react";
import GlitchText from "./GlitchText";
import EncryptionText from "./EncryptionText";
import Hologram from "./Hologram";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden perspective-1000">
      {/* Parallax Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-black to-black" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random(),
            }}
            animate={{
              y: [null, Math.random() * 100 + "%"],
              opacity: [null, Math.random()],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left: Holographic Profile */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotateY: 20 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex-1 w-full max-w-md relative group"
        >
          {/* Construction Laser */}
          <motion.div
            initial={{ top: "0%", opacity: 1 }}
            animate={{ top: "100%", opacity: 0 }}
            transition={{ duration: 2, delay: 1, ease: "linear" }}
            className="absolute left-0 right-0 h-1 bg-blue-400 z-50 shadow-[0_0_20px_rgba(59,130,246,1)]"
          />

          <Hologram className="transform transition-transform duration-500 hover:scale-105 hover:rotate-y-12 relative overflow-hidden">
            {/* Wireframe Reveal Mask */}
            <motion.div
              initial={{ height: "100%" }}
              animate={{ height: "0%" }}
              transition={{ duration: 2, delay: 1, ease: "linear" }}
              className="absolute inset-0 bg-black/90 z-20 border-b border-blue-500/50"
              style={{
                backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, .3) 25%, rgba(59, 130, 246, .3) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .3) 75%, rgba(59, 130, 246, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, .3) 25%, rgba(59, 130, 246, .3) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .3) 75%, rgba(59, 130, 246, .3) 76%, transparent 77%, transparent)",
                backgroundSize: "30px 30px"
              }}
            />

            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between border-b border-blue-500/30 pb-2 mb-2">
                <span className="text-xs text-blue-400 uppercase tracking-widest">Identity_Scan</span>
                <Shield size={14} className="text-blue-400 animate-pulse" />
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tighter">
                <GlitchText text={portfolioData.personal.name} />
              </h1>

              <div className="text-blue-300 font-mono text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="opacity-50">Role:</span>
                  <EncryptionText text="Full Stack Developer" />
                </div>
                <div className="flex justify-between">
                  <span className="opacity-50">Status:</span>
                  <span className="text-green-400">Online</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-50">Location:</span>
                  <span>Earth [Sector 7]</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-blue-500/30 flex gap-4">
                <a href="#projects" className="flex-1 py-2 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/50 text-blue-300 text-center rounded text-sm uppercase tracking-wider transition-all hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                  Initialize
                </a>
                <a href="#contact" className="flex-1 py-2 bg-transparent hover:bg-white/5 border border-white/20 text-gray-400 text-center rounded text-sm uppercase tracking-wider transition-all">
                  Contact
                </a>
              </div>
            </div>
          </Hologram>
        </motion.div>

        {/* Right: 3D Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex-1 flex justify-center items-center relative"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 perspective-1000">
            {/* Rotating Rings */}
            <motion.div
              animate={{ rotate: 360, rotateX: 10, rotateY: 10 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-dashed border-blue-500/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360, rotateX: -10, rotateY: -10 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 border border-blue-400/30 rounded-full"
            />
            <motion.div
              animate={{ rotate: 180, rotateX: 5, rotateY: -5 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-12 border-4 border-t-blue-500/40 border-r-transparent border-b-transparent border-l-transparent rounded-full"
            />

            {/* Orbital Data Field */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-20%] border border-blue-500/10 rounded-full flex items-center justify-center"
            >
              <div className="absolute top-0 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#3b82f6]" />
              <div className="absolute bottom-0 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
              <div className="absolute left-0 w-1 h-1 bg-blue-300 rounded-full" />
              <div className="absolute right-0 w-1 h-1 bg-blue-300 rounded-full" />
            </motion.div>

            {/* Central Core */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-32 h-32 bg-blue-500/10 backdrop-blur-md rounded-full flex items-center justify-center border border-blue-400/50 shadow-[0_0_50px_rgba(59,130,246,0.5)] animate-pulse group-hover:scale-110 transition-transform duration-500">
                <Cpu size={48} className="text-blue-300" />
              </div>
            </div>

            {/* Orbiting Icons */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-black border border-blue-500 text-blue-400 p-2 rounded-full hover:scale-125 transition-transform cursor-pointer">
                <Globe size={16} />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 text-blue-500/50 animate-bounce"
        >
          <ArrowDown size={24} />
        </motion.div>
      </div>
    </section>
  );
}
