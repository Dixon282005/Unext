/**
 * @file components/section/SectionBadge.tsx
 * Small pill-shaped label shown at the top of a section above the heading.
 */
"use client";
import React from "react";

export function SectionBadge({ isDark, children }: { isDark: boolean; children: React.ReactNode }) {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 transition-all duration-700 hover:scale-105 ${
      isDark
        ? "bg-white/5 border border-white/10 backdrop-blur-sm"
        : "bg-white/80 border border-purple-200/50 backdrop-blur-sm shadow-lg shadow-purple-100"
    }`}>
      <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{children}</span>
    </div>
  );
}
