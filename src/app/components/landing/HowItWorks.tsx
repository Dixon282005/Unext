import { motion } from 'motion/react';

const steps = [
  {
    number: '01',
    title: 'Crea tu perfil',
    description: 'Regístrate y construye un perfil que destaque tus habilidades, proyectos y aspiraciones. Verificado a través de tu institución.',
    visual: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="6" width="32" height="36" rx="4" stroke="rgba(139,92,246,0.3)" strokeWidth="1" />
        <circle cx="24" cy="18" r="5" stroke="rgba(139,92,246,0.5)" strokeWidth="1" />
        <path d="M14 36c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="rgba(139,92,246,0.3)" strokeWidth="1" strokeLinecap="round" />
        <rect x="16" y="28" width="16" height="2" rx="1" fill="rgba(139,92,246,0.15)" />
        <rect x="18" y="32" width="12" height="2" rx="1" fill="rgba(139,92,246,0.1)" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Descubre oportunidades',
    description: 'Nuestra IA encuentra coincidencias personalizadas según tus habilidades, intereses y metas profesionales. Sin búsquedas interminables.',
    visual: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="20" cy="20" r="12" stroke="rgba(139,92,246,0.3)" strokeWidth="1" />
        <path d="M29 29l10 10" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="20" r="5" stroke="rgba(139,92,246,0.2)" strokeWidth="0.8" strokeDasharray="2 2" />
        <circle cx="20" cy="20" r="2" fill="rgba(139,92,246,0.3)" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Conecta directamente',
    description: 'Postúlate con un clic y chatea en tiempo real con reclutadores. Sin intermediarios, sin fricción, solo conexión directa.',
    visual: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="10" width="24" height="18" rx="3" stroke="rgba(139,92,246,0.3)" strokeWidth="1" />
        <rect x="20" y="20" width="24" height="18" rx="3" stroke="rgba(139,92,246,0.4)" strokeWidth="1" />
        <path d="M10 18h12M10 22h8" stroke="rgba(139,92,246,0.2)" strokeWidth="1" strokeLinecap="round" />
        <path d="M26 28h12M26 32h8" stroke="rgba(139,92,246,0.25)" strokeWidth="1" strokeLinecap="round" />
        <circle cx="32" cy="20" r="3" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.3)" strokeWidth="0.8" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Impulsa tu carrera',
    description: 'Recibe ofertas, agenda entrevistas y asegura la posición que se alinea con tu potencial. Tu futuro comienza aquí.',
    visual: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 4L28 16H40L30 24L34 36L24 28L14 36L18 24L8 16H20L24 4Z" stroke="rgba(139,92,246,0.4)" strokeWidth="1" strokeLinejoin="round" />
        <path d="M24 14L26 20H32L27 24L29 30L24 26L19 30L21 24L16 20H22L24 14Z" fill="rgba(139,92,246,0.12)" stroke="rgba(139,92,246,0.25)" strokeWidth="0.5" />
        <circle cx="24" cy="44" r="2" fill="rgba(139,92,246,0.2)" />
        <path d="M24 36v6" stroke="rgba(139,92,246,0.2)" strokeWidth="0.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
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
            Cuatro pasos hacia tu futuro
          </h2>
          <p className="text-lg text-[#8a8a8a] max-w-2xl mx-auto">
            Desde el registro hasta tu oportunidad ideal en un flujo inteligente y optimizado
          </p>
        </motion.div>

        {/* Steps - Vertical timeline on mobile, horizontal on desktop */}
        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300">
                  {/* Step number + visual */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs tabular-nums text-[#5a5a5a] font-mono">{step.number}</span>
                    <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      {step.visual}
                    </div>
                  </div>

                  {/* Connector dot */}
                  <div className="hidden lg:block absolute top-[52px] left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 rounded-full bg-purple-500/30 group-hover:bg-purple-500/60 transition-colors duration-300">
                      <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-subtlePulse" style={{ animationDelay: `${i * 0.5}s` }} />
                    </div>
                  </div>

                  <h3 className="text-white text-sm mb-2">{step.title}</h3>
                  <p className="text-sm text-[#8a8a8a] leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
