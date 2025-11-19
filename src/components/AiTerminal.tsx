"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Minus, Maximize2 } from "lucide-react";
import { playClickSound } from "@/lib/audio";
import { portfolioData } from "@/data/portfolio";

const COMMANDS = {
  help: "Available commands: about, skills, projects, contact, clear, exit",
  about: portfolioData.personal.bio,
  skills: Object.values(portfolioData.skills).flat().join(", "),
  projects: portfolioData.projects.map((p) => p.name).join(", "),
  contact: `Email: ${portfolioData.personal.email} | GitHub: ${portfolioData.personal.socials.github}`,
  clear: "clear",
};

export default function AiTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Welcome to AstronDaniel AI Terminal v1.0",
    "Type 'help' for available commands.",
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
    } else if (cmd === "exit") {
      setIsOpen(false);
    } else if (cmd in COMMANDS) {
      setHistory((prev) => [
        ...prev,
        `> ${input}`,
        // @ts-ignore
        COMMANDS[cmd],
      ]);
    } else {
      setHistory((prev) => [
        ...prev,
        `> ${input}`,
        `Command not found: ${cmd}. Type 'help' for assistance.`,
      ]);
    }
    setInput("");
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-8 right-8 z-50 p-4 bg-blue-600 rounded-full shadow-lg shadow-blue-500/50 hover:bg-blue-500 transition-colors"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Terminal className="text-white" />
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: isMinimized ? "calc(100vh - 80px)" : 0,
              scale: isMinimized ? 0.5 : 1,
              x: isMinimized ? "40%" : 0
            }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-8 w-[90vw] md:w-[500px] h-[400px] bg-black/90 backdrop-blur-md border border-blue-500/30 rounded-lg shadow-2xl overflow-hidden z-50 flex flex-col font-mono text-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-blue-900/20 border-b border-blue-500/30">
              <span className="text-blue-400 flex items-center gap-2">
                <Terminal size={14} />
                AI_ASSISTANT.exe
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-gray-400 hover:text-white"
                >
                  {isMinimized ? <Maximize2 size={14} /> : <Minus size={14} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-red-400"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-2 text-gray-300"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((line, i) => (
                <div key={i} className="break-words">
                  {line.startsWith(">") ? (
                    <span className="text-blue-400">{line}</span>
                  ) : (
                    <span className="text-green-400">{line}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleCommand} className="p-4 bg-black/50 border-t border-blue-500/30 flex gap-2">
              <span className="text-blue-500">{">"}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-600"
                placeholder="Type a command..."
                autoFocus
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
