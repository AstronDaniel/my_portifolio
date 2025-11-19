"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PreloaderScene from "./PreloaderScene";

const bootSequence = [
  "INITIALIZING NEURAL LINK...",
  "ESTABLISHING GLOBAL CONNECTION...",
  "DECRYPTING SECURE CHANNELS...",
  "SYNCING WITH SATELLITE NETWORK...",
  "CALIBRATING HOLOGRAPHIC SENSORS...",
  "OPTIMIZING NEURAL PATHWAYS...",
  "LOADING SECTOR 7 ASSETS...",
  "VERIFYING BIOMETRIC DATA...",
  "ACCESS GRANTED.",
];

const connectionMessages = [
  "Connection established from Tokyo...",
  "User detected in London...",
  "Downloading assets from Sector 7...",
  "Verifying biometric data...",
  "Uplink secure: New York Node...",
  "Ping: 12ms from Berlin...",
  "Rerouting traffic via Singapore...",
  "Packet loss detected: Retrying...",
  "Encryption key negotiated...",
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [connectionMsg, setConnectionMsg] = useState(connectionMessages[0]);

  useEffect(() => {
    const totalDuration = 10000; // 10 seconds total boot time
    const stepDuration = totalDuration / bootSequence.length;

    const sequenceInterval = setInterval(() => {
      setIndex((prev) => {
        if (prev < bootSequence.length - 1) return prev + 1;
        return prev;
      });
    }, stepDuration);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, totalDuration / 50);

    // Random connection messages
    const msgInterval = setInterval(() => {
      setConnectionMsg(connectionMessages[Math.floor(Math.random() * connectionMessages.length)]);
    }, 800);

    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, totalDuration + 500);

    return () => {
      clearInterval(sequenceInterval);
      clearInterval(progressInterval);
      clearInterval(msgInterval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
        >
          {/* 3D Background Scene */}
          <PreloaderScene />

          {/* Overlay UI */}
          <div className="relative z-10 w-full max-w-md p-8 flex flex-col items-center">
            {/* Progress Circle/Bar */}
            <div className="w-full h-1 bg-blue-900/30 rounded-full mb-4 overflow-hidden border border-blue-500/20">
              <motion.div
                className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Main Status Text */}
            <div className="h-8 flex items-center justify-center mb-2">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-blue-400 font-mono text-sm tracking-widest"
              >
                {bootSequence[index]}
              </motion.p>
            </div>

            {/* Live Feed Text */}
            <div className="h-6 flex items-center justify-center">
              <motion.p
                key={connectionMsg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                className="text-xs font-mono text-cyan-300/70"
              >
                {`> ${connectionMsg}`}
              </motion.p>
            </div>

            <div className="absolute bottom-[-100px] text-[10px] text-blue-500/30 font-mono">
              SECURE_CONNECTION_V4.0 // ENCRYPTED
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
