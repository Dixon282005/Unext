import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ConstellationCanvas } from './ConstellationCanvas';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigateToRegister?: () => void;
}

function AnimatedCounter({ target, suffix = '', duration = 2200 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function Hero({ onNavigateToRegister }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Constellation Background */}
      <div className="absolute inset-0">
        <ConstellationCanvas />
      </div>

      {/* Gradient Orbs — handled by global ParallaxOrbs */}
      
      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#080808_70%)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 pt-24 pb-20">
        <div className="text-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] tracking-tight text-white mb-6 leading-[1.05]"
          >
            Desbloquea el
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
              Talento
            </span>
            {' '}Universitario
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              .
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-lg md:text-xl text-[#8a8a8a] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            La plataforma de alto rendimiento para estudiantes verificados y empresas innovadoras.
            Encuentra tu próximo proyecto, mentor o contratación.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-20"
          >
            <button
              onClick={onNavigateToRegister}
              className="group relative px-6 py-3 rounded-lg text-sm text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500 to-purple-600 transition-opacity group-hover:opacity-90" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-purple-400 to-purple-500" />
              <span className="relative flex items-center justify-center gap-2">
                Encontrar Talento
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('oportunidades');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group px-6 py-3 rounded-lg text-sm border border-white/[0.08] text-white bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200"
            >
              <span className="flex items-center justify-center gap-2">
                Explorar Oportunidades
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="grid grid-cols-3 gap-6 sm:gap-12 max-w-xl mx-auto"
          >
            {[
              { target: 12, suffix: 'K+', label: 'Estudiantes Activos' },
              { target: 2500, suffix: '+', label: 'Empresas' },
              { target: 8, suffix: 'K+', label: 'Contrataciones' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-1">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-[#5a5a5a]">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
    </section>
  );
}