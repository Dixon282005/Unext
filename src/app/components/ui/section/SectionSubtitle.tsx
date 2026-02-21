/**
 * @file components/section/SectionSubtitle.tsx
 * Muted paragraph shown directly below a SectionHeading.
 */
"use client";
import React from "react";

export function SectionSubtitle({ isDark, children, className = "" }: { isDark: boolean; children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-lg md:text-xl max-w-3xl mx-auto px-4 ${isDark ? "text-gray-400" : "text-gray-600"} ${className}`}>
      {children}
    </p>
  );
}
