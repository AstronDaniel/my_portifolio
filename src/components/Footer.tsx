"use client";

import { portfolioData } from "@/data/portfolio";
import { Github, Linkedin, Twitter, Mail, Activity, Wifi } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="bg-black/90 backdrop-blur-md border-t border-blue-500/20 py-8 relative overflow-hidden">
      {/* Cyberpunk Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
      
      {/* Top Status Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* System Status */}
          <div className="flex items-center gap-4 text-xs font-mono text-blue-400/80">
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-900/20 rounded-full border border-blue-500/30">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </div>
              <span>SYSTEM ONLINE</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={14} />
              <span>LATENCY: 24ms</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a
              href={portfolioData.personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110"
            >
              <Github size={20} />
            </a>
            <a
              href={portfolioData.personal.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={portfolioData.personal.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110"
            >
              <Twitter size={20} />
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Copyright & Version */}
          <div className="text-right text-xs font-mono text-gray-500">
            <p className="mb-1">
              © {new Date().getFullYear()} {portfolioData.personal.name}
            </p>
            <div className="flex items-center justify-end gap-2 text-blue-500/40">
              <Wifi size={12} />
              <span>V.2.0.4 [STABLE]</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
