"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, User, Code, Folder, Mail, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";
import { playHoverSound, playClickSound, toggleMute, getMuteState } from "@/lib/audio";

export default function Navbar() {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(getMuteState());
  }, []);

  const handleMuteToggle = () => {
    const newState = toggleMute();
    setIsMuted(newState);
    if (!newState) playClickSound();
  };

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Projects", href: "#projects", icon: Folder },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center gap-2 px-4 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)]"
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="relative group p-3 rounded-xl hover:bg-white/10 transition-all duration-300"
            onMouseEnter={() => playHoverSound()}
            onClick={() => playClickSound()}
          >
            <item.icon size={24} className="text-gray-400 group-hover:text-blue-400 transition-colors" />

            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 border border-white/10 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.name}
            </span>

            {/* Active Indicator */}
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}

        <div className="w-px h-8 bg-white/10 mx-2" />

        <button
          onClick={handleMuteToggle}
          className="p-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-gray-400 hover:text-blue-400"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </motion.div>
    </div>
  );
}
