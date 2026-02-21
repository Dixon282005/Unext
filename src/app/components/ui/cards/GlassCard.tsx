/**
 * @file components/cards/GlassCard.tsx
 * Frosted-glass card panel. Adapts border & background to dark/light mode.
 *
 * Props:
 *   hoverable → adds scale + highlighted border on hover
 *   large     → uses rounded-3xl instead of rounded-2xl
 */
"use client";
import React from "react";

interface GlassCardProps {
  isDark: boolean;
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  large?: boolean;
}

export function GlassCard({ isDark, children, className = "", hoverable = false, large = false }: GlassCardProps) {
  const radius = large ? "rounded-3xl" : "rounded-2xl";
  const base = isDark
    ? "bg-white/5 border border-white/10"
    : "bg-white/60 backdrop-blur-sm border border-purple-200/50";
  const hover = hoverable
    ? isDark
      ? "hover:bg-white/10 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105"
      : "hover:bg-white hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-200/30 hover:scale-105"
    : "";

  return (
    <div className={`${radius} ${base} ${hover} transition-all duration-500 ${className}`}>
      {children}
    </div>
  );
}
