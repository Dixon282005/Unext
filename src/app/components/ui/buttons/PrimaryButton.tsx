/**
 * @file components/buttons/PrimaryButton.tsx
 * Purple gradient CTA button with animated shine sweep on hover.
 * Theme-independent — always purple regardless of dark/light mode.
 */
"use client";
import React from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function PrimaryButton({ children, onClick, className = "", type = "button" }: PrimaryButtonProps) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`group relative px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-purple-500" />
        <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
          <div className="shine-sweep absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent transform -skew-x-12" />
        </div>
        <span className="relative flex items-center justify-center gap-2 text-white font-medium">
          {children}
        </span>
      </button>
      <style>{`
        @keyframes shine { 0% { transform: translateX(-100%) skewX(-12deg); } 100% { transform: translateX(200%) skewX(-12deg); } }
        .shine-sweep { animation: shine 3s infinite; }
      `}</style>
    </>
  );
}
