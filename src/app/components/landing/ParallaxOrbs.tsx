import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function ParallaxOrbs() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Each orb moves at a different parallax speed
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -900]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -750]);

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const x3 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const x4 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.07, 0.1, 0.06, 0.03]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.05, 0.09, 0.07, 0.02]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 0.9]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.2]);

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Orb 1 — Top left, purple, large */}
      <motion.div
        style={{ y: y1, x: x1, opacity: opacity1, scale: scale1 }}
        className="absolute top-[10%] left-[15%] w-[600px] h-[600px] bg-purple-600 rounded-full blur-[180px]"
      />

      {/* Orb 2 — Top right, violet */}
      <motion.div
        style={{ y: y2, x: x2, opacity: opacity2, scale: scale2 }}
        className="absolute top-[20%] right-[10%] w-[450px] h-[450px] bg-violet-500 rounded-full blur-[160px]"
      />

      {/* Orb 3 — Mid section, subtle emerald accent */}
      <motion.div
        style={{ y: y3, x: x3 }}
        className="absolute top-[55%] left-[5%] w-[350px] h-[350px] bg-emerald-600/[0.04] rounded-full blur-[140px]"
      />

      {/* Orb 4 — Lower section, purple glow */}
      <motion.div
        style={{ y: y4, x: x4 }}
        className="absolute top-[75%] right-[20%] w-[500px] h-[500px] bg-purple-900/[0.08] rounded-full blur-[160px]"
      />

      {/* Orb 5 — Bottom, violet, largest & slowest */}
      <motion.div
        style={{ y: y5 }}
        className="absolute top-[120%] left-[30%] w-[700px] h-[700px] bg-violet-600/[0.05] rounded-full blur-[200px]"
      />
    </div>
  );
}
