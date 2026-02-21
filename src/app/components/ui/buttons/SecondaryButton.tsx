/**
 * @file components/buttons/SecondaryButton.tsx
 * Ghost/bordered button that adapts its border and background to dark/light mode.
 */
"use client";
import React from "react";

interface SecondaryButtonProps {
  isDark: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function SecondaryButton({ isDark, children, onClick, className = "" }: SecondaryButtonProps) {
  const border = isDark
    ? "bg-white/5 border-2 border-purple-500/30 hover:border-purple-500/50 hover:bg-white/10"
    : "bg-white border-2 border-purple-300/50 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-200/50";

  const hoverFill = isDark
    ? "bg-linear-to-r from-purple-500/10 to-violet-500/10"
    : "bg-linear-to-r from-purple-50 to-violet-50";

  return (
    <button
      onClick={onClick}
      className={`group relative px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 overflow-hidden ${border} ${className}`}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${hoverFill}`} />
      <span className={`relative flex items-center justify-center gap-2 font-medium ${isDark ? "text-white" : "text-[#0A0A0A]"}`}>
        {children}
      </span>
    </button>
  );
}
