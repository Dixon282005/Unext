/**
 * @file components/section/SectionHeading.tsx
 * h2 with two parts: main text in default color + one accent word in purple.
 *
 * Props:
 *   accentText      → the purple word/phrase
 *   accentPosition  → "before" or "after" (default: "after")
 */
"use client";
import React from "react";

interface SectionHeadingProps {
  isDark: boolean;
  children: React.ReactNode;
  accentText: string;
  accentPosition?: "before" | "after";
  className?: string;
}

export function SectionHeading({ isDark, children, accentText, accentPosition = "after", className = "" }: SectionHeadingProps) {
  const main = isDark ? "text-white" : "text-[#0A0A0A]";
  const accent = isDark ? "text-purple-500" : "text-purple-600";
  return (
    <h2 className={`text-4xl md:text-5xl mb-6 ${className}`}>
      {accentPosition === "before" && <span className={accent}>{accentText}{" "}</span>}
      <span className={main}>{children}{accentPosition === "after" ? " " : ""}</span>
      {accentPosition === "after" && <span className={accent}>{accentText}</span>}
    </h2>
  );
}
