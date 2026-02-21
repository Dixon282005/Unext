import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const categories = ['Todas', 'Pasantías', 'Tiempo Completo', 'Freelance', 'Remoto'];

const opportunities = [
  {
    id: 1,
    title: 'Desarrollador Frontend Jr.',
    company: 'TechVentures',
    location: 'Remoto — LATAM',
    type: 'Tiempo Completo',
    salary: '$1,200 – $2,000 USD',
    tags: ['React', 'TypeScript', 'Tailwind'],
    hot: true,
    posted: 'Hace 2h',
    color: 'purple',
    description: 'Buscamos un desarrollador frontend con pasión por crear interfaces de usuario excepcionales. Trabajarás en productos SaaS de alto impacto usando React, TypeScript y Tailwind CSS.',
    responsibilities: ['Desarrollar componentes reutilizables en React', 'Colaborar con el equipo de diseño UX/UI', 'Optimizar rendimiento y accesibilidad', 'Participar en code reviews y planificación'],
    benefits: ['Trabajo 100% remoto', 'Horario flexible', 'Equipo de trabajo', 'Plan de crecimiento'],
  },
  {
    id: 2,
    title: 'Pasante de Diseño UX',
    company: 'Creative Studio',
    location: 'Bogotá, Colombia',
    type: 'Pasantías',
    salary: '$600 – $900 USD',
    tags: ['Figma', 'Research', 'Prototyping'],
    hot: false,
    posted: 'Hace 5h',
    color: 'violet',
    description: 'Únete a nuestro equipo de diseño y aprende de los mejores. Participarás en proyectos reales para clientes internacionales mientras desarrollas tus habilidades.',
    responsibilities: ['Crear wireframes y prototipos', 'Conducir investigación de usuarios', 'Diseñar interfaces en Figma', 'Iterar basado en feedback'],
    benefits: ['Mentoría personalizada', 'Certificación al completar', 'Posibilidad de contratación', 'Portfolio profesional'],
  },
  {
    id: 3,
    title: 'Analista de Datos',
    company: 'DataInsights',
    location: 'Remoto — LATAM',
    type: 'Remoto',
    salary: '$1,500 – $2,500 USD',
    tags: ['Python', 'SQL', 'Power BI'],
    hot: true,
    posted: 'Hace 1d',
    color: 'emerald',
    description: 'Buscamos un analista de datos para transformar información en insights accionables. Trabajarás con datasets complejos para impulsar decisiones estratégicas.',
    responsibilities: ['Análisis exploratorio de datos', 'Crear dashboards en Power BI', 'Automatizar reportes con Python', 'Presentar insights a stakeholders'],
    benefits: ['Stack moderno', 'Capacitación continua', 'Bono por desempeño', 'Días libres extra'],
  },
  {
    id: 4,
    title: 'Ingeniero Backend',
    company: 'Innovation Labs',
    location: 'Ciudad de México',
    type: 'Tiempo Completo',
    salary: '$1,800 – $3,000 USD',
    tags: ['Node.js', 'PostgreSQL', 'AWS'],
    hot: false,
    posted: 'Hace 1d',
    color: 'purple',
    description: 'Diseña y construye APIs escalables para nuestra plataforma de alto tráfico. Serás parte del equipo core de ingeniería con impacto directo en el producto.',
    responsibilities: ['Diseñar APIs RESTful y GraphQL', 'Optimizar queries y bases de datos', 'Implementar CI/CD pipelines', 'Monitoreo y observabilidad'],
    benefits: ['Oficina en WeWork', 'Seguro médico', 'Stock options', 'Conferencias pagadas'],
  },
  {
    id: 5,
    title: 'Diseñador de Producto',
    company: 'FinFlow',
    location: 'Remoto — LATAM',
    type: 'Freelance',
    salary: '$40 – $60 USD/hr',
    tags: ['Product Design', 'Figma', 'Design System'],
    hot: false,
    posted: 'Hace 2d',
    color: 'violet',
    description: 'Proyecto de 3 meses para rediseñar la experiencia de usuario de una app fintech. Buscamos un diseñador senior con experiencia en productos digitales complejos.',
    responsibilities: ['Rediseño completo de la app', 'Crear design system', 'User testing y validación', 'Handoff a desarrollo'],
    benefits: ['Pago semanal', 'Proyecto de alto perfil', 'Referencia profesional', 'Posibilidad de extensión'],
  },
  {
    id: 6,
    title: 'Community Manager Jr.',
    company: 'GrowthLab',
    location: 'Lima, Perú',
    type: 'Pasantías',
    salary: '$400 – $700 USD',
    tags: ['Redes Sociales', 'Copywriting', 'Analytics'],
    hot: false,
    posted: 'Hace 3d',
    color: 'emerald',
    description: 'Maneja las redes sociales de marcas emergentes y aprende estrategias de growth marketing. Ideal para estudiantes de comunicación o marketing digital.',
    responsibilities: ['Gestionar redes sociales', 'Crear contenido creativo', 'Analizar métricas de engagement', 'Reportar resultados semanales'],
    benefits: ['Home office 3 días', 'Cursos de marketing digital', 'Networking con brands', 'Horario universitario'],
  },
];

function DetailModal({ opportunity, onClose }: { opportunity: typeof opportunities[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl border border-white/[0.08] bg-[#0c0c0c] shadow-2xl"
      >
        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#5a5a5a] hover:text-white hover:bg-white/[0.08] transition-all z-10"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-white/[0.06] ${
              opportunity.color === 'purple' ? 'bg-purple-500/10' :
              opportunity.color === 'violet' ? 'bg-violet-500/10' :
              'bg-emerald-500/10'
            }`}>
              <span className={`text-sm ${
                opportunity.color === 'purple' ? 'text-purple-400' :
                opportunity.color === 'violet' ? 'text-violet-400' :
                'text-emerald-400'
              }`}>
                {opportunity.company[0]}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl text-white mb-1 tracking-tight">{opportunity.title}</h3>
              <div className="flex items-center gap-2 text-sm text-[#8a8a8a]">
                <span>{opportunity.company}</span>
                <span className="w-1 h-1 rounded-full bg-[#3a3a3a]" />
                <span>{opportunity.posted}</span>
              </div>
            </div>
          </div>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 rounded-lg text-xs bg-white/[0.04] text-[#8a8a8a] border border-white/[0.06] flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1a3 3 0 013 3c0 2-3 5-3 5S2 6 2 4a3 3 0 013-3z" stroke="currentColor" strokeWidth="0.8" />
              </svg>
              {opportunity.location}
            </span>
            <span className="px-3 py-1 rounded-lg text-xs bg-white/[0.04] text-[#8a8a8a] border border-white/[0.06]">
              {opportunity.type}
            </span>
            <span className="px-3 py-1 rounded-lg text-xs bg-purple-500/10 text-purple-400 border border-purple-500/10">
              {opportunity.salary}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-sm text-white mb-2">Descripción</h4>
            <p className="text-sm text-[#8a8a8a] leading-relaxed">{opportunity.description}</p>
          </div>

          {/* Responsibilities */}
          <div className="mb-6">
            <h4 className="text-sm text-white mb-2">Responsabilidades</h4>
            <ul className="space-y-1.5">
              {opportunity.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#8a8a8a]">
                  <span className="w-1 h-1 rounded-full bg-purple-500/50 mt-2 flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="mb-6">
            <h4 className="text-sm text-white mb-2">Beneficios</h4>
            <div className="grid grid-cols-2 gap-2">
              {opportunity.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[#8a8a8a]">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M8 3L4 7.5 2 5.5" stroke="#34d399" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h4 className="text-sm text-white mb-2">Tecnologías</h4>
            <div className="flex flex-wrap gap-2">
              {opportunity.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-lg text-xs bg-white/[0.04] text-[#8a8a8a] border border-white/[0.06]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <button className="flex-1 px-6 py-3 rounded-lg text-sm bg-gradient-to-b from-purple-500 to-purple-600 text-white hover:from-purple-400 hover:to-purple-500 transition-all">
              Aplicar ahora
            </button>
            <button className="px-6 py-3 rounded-lg text-sm border border-white/[0.08] text-[#8a8a8a] hover:text-white hover:bg-white/[0.04] transition-all">
              Guardar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Oportunidades() {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [selectedOpp, setSelectedOpp] = useState<typeof opportunities[0] | null>(null);

  const filtered = activeCategory === 'Todas'
    ? opportunities
    : opportunities.filter((o) => o.type === activeCategory);

  return (
    <section id="oportunidades" className="py-24 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-900/[0.05] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl tracking-tight text-white mb-4">
            Oportunidades que te esperan
          </h2>
          <p className="text-lg text-[#8a8a8a] max-w-2xl mx-auto">
            Descubre posiciones curadas por nuestra IA, personalizadas para tu perfil y aspiraciones profesionales
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-purple-500/15 text-purple-300 border border-purple-500/20'
                  : 'text-[#8a8a8a] border border-white/[0.06] hover:border-white/[0.1] hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Opportunity Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((opp, i) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              onClick={() => setSelectedOpp(opp)}
              whileHover={{ scale: 1.015, y: -2 }}
              className="group relative p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-purple-500/20 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Hover glow overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-purple-500/[0.04] via-transparent to-violet-500/[0.04]" />
              <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.06)' }} />

              {/* Hot indicator */}
              {opp.hot && (
                <div className="absolute top-4 right-4 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-subtlePulse" />
                  <span className="text-[10px] text-emerald-400/80">Popular</span>
                </div>
              )}

              {/* Company + Meta */}
              <div className="relative flex items-center gap-2.5 mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center border border-white/[0.06] ${
                  opp.color === 'purple' ? 'bg-purple-500/10' :
                  opp.color === 'violet' ? 'bg-violet-500/10' :
                  'bg-emerald-500/10'
                }`}>
                  <span className={`text-xs ${
                    opp.color === 'purple' ? 'text-purple-400' :
                    opp.color === 'violet' ? 'text-violet-400' :
                    'text-emerald-400'
                  }`}>
                    {opp.company[0]}
                  </span>
                </div>
                <div>
                  <div className="text-xs text-[#8a8a8a]">{opp.company}</div>
                  <div className="text-[10px] text-[#5a5a5a]">{opp.posted}</div>
                </div>
              </div>

              <h3 className="relative text-sm text-white mb-2 group-hover:text-purple-300 transition-colors">{opp.title}</h3>

              <div className="relative flex items-center gap-3 mb-3 text-[11px] text-[#5a5a5a]">
                <span className="flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1a3 3 0 013 3c0 2-3 5-3 5S2 6 2 4a3 3 0 013-3z" stroke="currentColor" strokeWidth="0.8" />
                    <circle cx="5" cy="4" r="1" stroke="currentColor" strokeWidth="0.6" />
                  </svg>
                  {opp.location}
                </span>
              </div>
              <div className="relative text-xs text-[#8a8a8a] mb-3">{opp.salary}</div>

              <div className="relative flex flex-wrap gap-1.5">
                {opp.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-white/[0.04] text-[#8a8a8a] border border-white/[0.06]">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="relative mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] text-purple-400">Ver detalles</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 6h6M7 4l2 2-2 2" stroke="rgba(139,92,246,0.6)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <button className="px-6 py-2.5 rounded-lg text-sm border border-white/[0.08] text-[#8a8a8a] hover:text-white hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-200">
            Ver todas las oportunidades
          </button>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedOpp && (
          <DetailModal opportunity={selectedOpp} onClose={() => setSelectedOpp(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
