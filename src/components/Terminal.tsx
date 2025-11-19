"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Square, Terminal as TerminalIcon, Maximize2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

interface Command {
  command: string;
  output: React.ReactNode;
}

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Command[]>([
    { command: "init", output: "Welcome to AstronDaniel Terminal v2.0. Type 'help' for commands." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [history, isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: React.ReactNode = "";

    switch (trimmedCmd) {
      case "help":
        output = (
          <div className="space-y-1 text-blue-200/80">
            <p className="mb-2 border-b border-blue-500/30 pb-1">Available commands:</p>
            <div className="grid grid-cols-[100px_1fr] gap-2 text-xs">
              <span className="text-cyan-400 font-bold">about</span>
              <span>Display profile information</span>
              <span className="text-cyan-400 font-bold">skills</span>
              <span>List technical skills</span>
              <span className="text-cyan-400 font-bold">projects</span>
              <span>Show recent projects</span>
              <span className="text-cyan-400 font-bold">contact</span>
              <span>Get contact details</span>
              <span className="text-cyan-400 font-bold">clear</span>
              <span>Clear terminal history</span>
              <span className="text-cyan-400 font-bold">exit</span>
              <span>Close terminal</span>
            </div>
          </div>
        );
        break;
      case "about":
        output = <div className="text-blue-100 leading-relaxed">{portfolioData.personal.bio}</div>;
        break;
      case "skills":
        output = (
          <div className="flex flex-wrap gap-2">
            {Object.values(portfolioData.skills).flat().map(s => (
              <span key={s} className="px-2 py-0.5 bg-blue-900/30 border border-blue-500/30 rounded text-cyan-300 text-xs">
                {s}
              </span>
            ))}
          </div>
        );
        break;
      case "projects":
        output = (
          <div className="space-y-3">
            {portfolioData.projects.map(p => (
              <div key={p.name} className="border-l-2 border-purple-500 pl-3">
                <span className="text-purple-400 font-bold block">{p.name}</span>
                <span className="text-gray-400 text-xs">{p.description}</span>
              </div>
            ))}
          </div>
        );
        break;
      case "contact":
        output = (
          <div className="p-2 bg-blue-900/10 border border-blue-500/20 rounded">
            <p className="text-blue-300">Email: <span className="text-white">{portfolioData.personal.email}</span></p>
            <p className="text-blue-300">GitHub: <span className="text-white">{portfolioData.personal.socials.github}</span></p>
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        return;
      case "exit":
        setIsOpen(false);
        return;
      case "date":
        output = new Date().toLocaleString();
        break;
      case "whoami":
        output = "astron_daniel";
        break;
      case "ls":
        output = (
          <div className="grid grid-cols-3 gap-2 text-blue-300">
            <span>about.txt</span>
            <span>skills.json</span>
            <span>projects.md</span>
            <span>contact.info</span>
            <span>secret.key</span>
          </div>
        );
        break;
      case "sudo":
        output = <span className="text-red-500">Permission denied: You are not in the sudoers file. This incident will be reported.</span>;
        break;
      default:
        if (trimmedCmd.startsWith("echo ")) {
          output = trimmedCmd.substring(5);
        } else {
          output = <span className="text-red-400">Command not found: {trimmedCmd}. Type 'help' for available commands.</span>;
        }
    }

    setHistory(prev => [...prev, { command: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(59,130,246,0.5)" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-50 p-4 bg-black/80 border border-blue-500/50 rounded-full text-blue-400 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.3)] ${isOpen ? 'hidden' : 'block'} group`}
      >
        <div className="absolute inset-0 rounded-full border border-blue-400/30 animate-ping opacity-20"></div>
        <TerminalIcon size={24} className="group-hover:text-blue-300 transition-colors" />
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed bottom-8 right-8 z-50 w-[90vw] max-w-lg h-[500px] bg-[#0a0a12]/95 border border-blue-500/30 rounded-lg shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden flex flex-col font-mono text-sm"
          >
            {/* CRT Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-4 py-2 bg-gradient-to-r from-blue-900/20 to-transparent border-b border-blue-500/20 select-none">
              <div className="flex items-center gap-2 text-blue-400">
                <TerminalIcon size={14} />
                <span className="text-xs tracking-wider font-bold text-blue-300">astron_daniel@terminal:~</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-blue-300 transition-colors">
                  <Minus size={14} />
                </button>
                <button className="text-gray-500 hover:text-blue-300 transition-colors">
                  <Maximize2 size={12} />
                </button>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-400 transition-colors">
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div
              className="relative z-10 flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-900/50 scrollbar-track-transparent"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((entry, i) => (
                <div key={i} className="mb-3">
                  <div className="flex gap-2 text-gray-400 items-center">
                    <span className="text-green-500 text-xs">➜</span>
                    <span className="text-blue-500 text-xs">~</span>
                    <span className="text-gray-200">{entry.command}</span>
                  </div>
                  {entry.output && (
                    <div className="mt-1 ml-5 text-gray-300 whitespace-pre-wrap">
                      {entry.output}
                    </div>
                  )}
                </div>
              ))}

              <form onSubmit={handleSubmit} className="flex gap-2 items-center mt-2">
                <span className="text-green-500 text-xs">➜</span>
                <span className="text-blue-500 text-xs">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white caret-blue-500 placeholder-gray-700"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
              </form>
              <div ref={bottomRef} />
            </div>

            {/* Footer Status Bar */}
            <div className="relative z-10 px-4 py-1 bg-blue-900/10 border-t border-blue-500/20 text-[10px] text-blue-500/50 flex justify-between uppercase tracking-widest">
              <span>Status: Online</span>
              <span>Secure Connection</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
