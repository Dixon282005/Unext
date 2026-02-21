/**
 * @file components/icons/IconBox.tsx
 * Square icon container with theme-aware color swapping.
 *
 * Variants:
 *   "contrast" (default) → white bg/black icon in dark, black bg/white icon in light.
 *                          Swaps to purple on hover (parent needs `group` class).
 *   "accent"             → always purple bg/white icon.
 *                          Rotates + scales on hover (parent needs `group` class).
 *
 * Sizes: sm (48px) | md (56px, default) | lg (64px)
 */
"use client";
import React from "react";

interface IconBoxProps {
  isDark: boolean;
  icon: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "contrast" | "accent";
  className?: string;
}

const sizeMap    = { sm: "w-12 h-12", md: "w-14 h-14", lg: "w-16 h-16" };
const iconSizeMap = { sm: "w-5 h-5",  md: "w-7 h-7",   lg: "w-8 h-8"  };

export function IconBox({ isDark, icon, size = "md", variant = "contrast", className = "" }: IconBoxProps) {
  const colors =
    variant === "accent"
      ? "bg-purple-600 text-white group-hover:rotate-12 group-hover:scale-110"
      : isDark
      ? "bg-white text-[#0A0A0A] group-hover:bg-purple-500 group-hover:text-white"
      : "bg-[#0A0A0A] text-white group-hover:bg-purple-600";

  return (
    <div className={`${sizeMap[size]} rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${colors} ${className}`}>
      <span className={iconSizeMap[size]}>{icon}</span>
    </div>
  );
}
