"use client";

import React from "react";

export default function GlitchText({ text }: { text: string }) {
  return (
    <div className="glitch-wrapper inline-block">
      <h1
        className="glitch text-5xl md:text-7xl font-bold text-white tracking-tight"
        data-text={text}
      >
        {text}
      </h1>
    </div>
  );
}
