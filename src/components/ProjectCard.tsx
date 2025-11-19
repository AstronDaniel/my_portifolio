"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Github, ExternalLink, Database, Lock, Share2 } from "lucide-react";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

export default function ProjectCard({ project, onClick }: { project: any; onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-full group cursor-pointer"
    >
      {/* Data Shard Container */}
      <div className="absolute inset-0 bg-blue-500/5 rounded-xl transform skew-y-2 scale-95 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />

      <div className="relative h-full bg-black/40 backdrop-blur-md border border-blue-500/30 p-6 rounded-xl overflow-hidden clip-path-shard transition-all duration-300 group-hover:border-blue-400/60 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
        {/* Holographic Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shine pointer-events-none" />

        <div style={{ transform: "translateZ(50px)" }} className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-start mb-4 border-b border-blue-500/20 pb-2">
            <div className="flex items-center gap-2 text-blue-400">
              <Database size={16} />
              <span className="text-xs font-mono uppercase tracking-widest">Data_Shard_0{Math.floor(Math.random() * 9) + 1}</span>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-75" />
            </div>
          </div>

          {/* Content */}
          <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">
            {project.name}
          </h3>

          <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed group-hover:text-gray-300 transition-colors line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.slice(0, 4).map((t: string) => (
              <span key={t} className="text-[10px] font-mono text-blue-300 px-2 py-1 bg-blue-900/20 border border-blue-500/20 rounded">
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-[10px] font-mono text-blue-300 px-2 py-1 bg-blue-900/20 border border-blue-500/20 rounded">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-blue-500/20">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group/link"
            >
              <Github size={16} />
              <span className="group-hover/link:underline">Source</span>
            </a>
            <a
              href={project.link} // This might need to be project.homepage if available, but keeping consistent for now
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group/link"
            >
              <span>Access</span>
              <ExternalLink size={16} className="group-hover/link:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
