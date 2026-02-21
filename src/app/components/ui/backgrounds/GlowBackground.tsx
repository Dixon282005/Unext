/**
 * @file components/backgrounds/GlowBackground.tsx
 * Animated purple/violet ambient blob orbs used as section backdrops.
 * Parent MUST have `position: relative` and `overflow-hidden`.
 *
 * Light mode: vivid, saturated blobs
 * Dark  mode: subtle, low-opacity blobs
 */
"use client";
import React from "react";

interface GlowBackgroundProps {
  isDark: boolean;
  extraBlobs?: React.ReactNode;
}

export function GlowBackground({ isDark, extraBlobs }: GlowBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {!isDark && (
        <>
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-purple-300/60 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -left-40 w-[450px] h-[450px] bg-purple-400/50 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-violet-300/60 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/3 left-1/2 w-[350px] h-[350px] bg-purple-200/50 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
        </>
      )}
      {isDark && (
        <>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-purple-800/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </>
      )}
      {extraBlobs}
    </div>
  );
}
