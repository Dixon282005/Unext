import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Valentina Morales',
    role: 'Desarrolladora Frontend',
    company: 'TechCorp',
    image: 'https://images.unsplash.com/photo-1600696444233-20accba67df3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGxhdGluYSUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzE1Njg5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    quote: 'Unext me conectó con mi primera pasantía en desarrollo web. La plataforma me emparejó con empresas que genuinamente valoraban mi potencial, no solo mi currículum.',
  },
  {
    id: 2,
    name: 'Santiago Ruiz',
    role: 'Diseñador UX',
    company: 'Creative Studio',
    image: 'https://images.unsplash.com/photo-1617746652974-0be48cd984d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGxhdGlubyUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzcxNTY4OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    quote: 'La experiencia fue impecable. El proceso de postulación es increíblemente simple y las empresas responden rápido. El matching con IA es sorprendentemente preciso.',
  },
  {
    id: 3,
    name: 'Camila Torres',
    role: 'Analista de Datos',
    company: 'DataInsights',
    image: 'https://images.unsplash.com/photo-1765005204058-10418f5123c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNtaWxpbmclMjBjb3Jwb3JhdGUlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzE0OTcyNjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    quote: 'Encontré el rol perfecto para comenzar mi carrera. Unext me ayudó a destacar a través de retos de habilidades que demostraron mis capacidades reales a los reclutadores.',
  },
  {
    id: 4,
    name: 'Mateo Fernández',
    role: 'Ingeniero de Software',
    company: 'Innovation Labs',
    image: 'https://images.unsplash.com/photo-1737574107736-9e02ca5d5387?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHNvZnR3YXJlJTIwZGV2ZWxvcGVyJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcxNTY4OTk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    quote: 'Como recién egresado, Unext fue clave para conseguir mi primer empleo profesional. Los perfiles verificados de empresas me dieron confianza en cada postulación.',
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isHovered, next]);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-24 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-900/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl tracking-tight text-white mb-4">
            La confianza de miles
          </h2>
          <p className="text-lg text-[#8a8a8a] max-w-xl mx-auto">
            Estudiantes y egresados que transformaron sus carreras con Unext
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-12 min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center text-center"
              >
                {/* Quote mark */}
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="mb-6 opacity-20">
                  <path d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0l1.6 4C10.4 5.6 8 8 8 12h6v12H0zm18 0V14.4C18 6.4 22.8 1.6 32 0l.8 4C27.2 5.6 24.8 8 24.8 12H32v12H18z" fill="currentColor" className="text-purple-500" />
                </svg>

                <p className="text-white text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3">
                  <ImageWithFallback
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-white/[0.08]"
                  />
                  <div className="text-left">
                    <div className="text-sm text-white">{t.name}</div>
                    <div className="text-xs text-[#8a8a8a]">
                      {t.role} en {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-2 md:-mx-4">
            <button
              onClick={prev}
              className="pointer-events-auto w-8 h-8 rounded-full border border-white/[0.08] bg-[#121212]/80 backdrop-blur-sm flex items-center justify-center text-[#8a8a8a] hover:text-white hover:border-white/[0.15] transition-all duration-200 opacity-0 hover:opacity-100 group-hover:opacity-100"
              style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="pointer-events-auto w-8 h-8 rounded-full border border-white/[0.08] bg-[#121212]/80 backdrop-blur-sm flex items-center justify-center text-[#8a8a8a] hover:text-white hover:border-white/[0.15] transition-all duration-200"
              style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-1.5 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-6 bg-purple-500'
                    : 'w-1.5 bg-white/[0.15] hover:bg-white/[0.25]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
