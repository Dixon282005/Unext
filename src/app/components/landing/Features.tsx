import { motion } from 'motion/react';
import { useState } from 'react';

// Custom abstract SVG icons (no Lucide for feature cards)
function IconCopilot() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" stroke="url(#gc1)" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="url(#gc1)" strokeWidth="1.2" />
      <path d="M12 2v7M12 15v7M4 7l5 3M15 14l5 3M20 7l-5 3M9 14l-5 3" stroke="url(#gc1)" strokeWidth="0.8" opacity="0.5" />
      <defs>
        <linearGradient id="gc1" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconMatch() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="8" cy="8" r="3" stroke="url(#gm1)" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="3" stroke="url(#gm1)" strokeWidth="1.2" />
      <path d="M10.5 9.5L13.5 14.5" stroke="url(#gm1)" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
      <path d="M4 14c0-2 2-4 4-4" stroke="url(#gm1)" strokeWidth="0.8" opacity="0.5" strokeLinecap="round" />
      <path d="M20 10c0 2-2 4-4 4" stroke="url(#gm1)" strokeWidth="0.8" opacity="0.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="gm1" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconChallenge() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="url(#gch1)" strokeWidth="1.2" />
      <path d="M8 12h8M12 8v8" stroke="url(#gch1)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="8" cy="8" r="1" fill="url(#gch1)" opacity="0.5" />
      <circle cx="16" cy="8" r="1" fill="url(#gch1)" opacity="0.5" />
      <circle cx="8" cy="16" r="1" fill="url(#gch1)" opacity="0.5" />
      <circle cx="16" cy="16" r="1" fill="url(#gch1)" opacity="0.5" />
      <defs>
        <linearGradient id="gch1" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c084fc" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconVerified() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l2.4 3.6L18 4.2l-.6 4.2L21 11l-3.6 2.4.6 4.2-4.2-.6L12 22l-2.4-3.6L5.4 19l.6-4.2L3 11l3.6-2.4L6 4.4l4.2.6L12 2z" stroke="url(#gv1)" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="url(#gv1)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="gv1" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const features = [
  {
    icon: <IconCopilot />,
    title: 'Copiloto IA de Carrera',
    description: 'Un asistente inteligente que analiza tus habilidades, sugiere mejoras y guía tu trayectoria profesional con recomendaciones personalizadas.',
    gradient: 'from-purple-500/10 to-violet-500/5',
  },
  {
    icon: <IconMatch />,
    title: 'Matching por Habilidades',
    description: 'Nuestro algoritmo va más allá de palabras clave. Entiende competencias, afinidad cultural y potencial de crecimiento para crear conexiones significativas.',
    gradient: 'from-violet-500/10 to-purple-500/5',
  },
  {
    icon: <IconChallenge />,
    title: 'Retos en Tiempo Real',
    description: 'Demuestra tus habilidades con retos de código en vivo, sprints de diseño y casos de estudio. Destaca con logros verificados.',
    gradient: 'from-purple-600/10 to-violet-400/5',
  },
  {
    icon: <IconVerified />,
    title: 'Perfiles Verificados',
    description: 'Cada estudiante y empresa está verificado a través de nuestra red institucional. La confianza y autenticidad están integradas en cada interacción.',
    gradient: 'from-violet-400/10 to-purple-600/5',
  },
];

export function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="features" className="py-24 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-900/[0.06] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl tracking-tight text-white mb-4">
            Diseñada para la nueva generación
          </h2>
          <p className="text-lg text-[#8a8a8a] max-w-2xl mx-auto">
            Una plataforma integral que conecta inteligentemente el talento emergente con empresas visionarias
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              {/* Border glow on hover */}
              {hoveredIndex === i && (
                <div className="absolute inset-0 rounded-xl pointer-events-none" style={{
                  boxShadow: 'inset 0 0 0 1px rgba(139, 92, 246, 0.15)',
                }} />
              )}

              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center mb-4 group-hover:bg-purple-500/10 transition-colors duration-300">
                  {feature.icon}
                </div>

                <h3 className="text-white text-sm mb-2">{feature.title}</h3>
                <p className="text-sm text-[#8a8a8a] leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
