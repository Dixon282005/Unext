import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const filters = ['Todos', 'Desarrollo', 'Diseño', 'Datos', 'Marketing'];

const talents = [
  {
    id: 1,
    name: 'Valentina Morales',
    role: 'Frontend Developer',
    university: 'Universidad de los Andes',
    image: 'https://images.unsplash.com/photo-1600696444233-20accba67df3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGxhdGluYSUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzE1Njg5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    skills: ['React', 'TypeScript', 'Next.js'],
    category: 'Desarrollo',
    match: 96,
    verified: true,
    available: true,
    bio: 'Desarrolladora frontend apasionada por crear interfaces intuitivas y accesibles. 2 años de experiencia con React y TypeScript en proyectos SaaS.',
    projects: ['E-commerce Platform', 'Dashboard Analytics', 'Design System'],
    certifications: ['Meta Frontend Developer', 'AWS Cloud Practitioner'],
  },
  {
    id: 2,
    name: 'Santiago Ruiz',
    role: 'UX/UI Designer',
    university: 'ITESM',
    image: 'https://images.unsplash.com/photo-1617746652974-0be48cd984d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGxhdGlubyUyMG1hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzcxNTY4OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    skills: ['Figma', 'Design Systems', 'Research'],
    category: 'Diseño',
    match: 93,
    verified: true,
    available: true,
    bio: 'Diseñador UX/UI con enfoque en design systems y experiencias centradas en el usuario. Portfolio con +10 proyectos para startups tech.',
    projects: ['Fintech App Redesign', 'SaaS Design System', 'Mobile Health App'],
    certifications: ['Google UX Design', 'Interaction Design Foundation'],
  },
  {
    id: 3,
    name: 'Camila Torres',
    role: 'Data Analyst',
    university: 'Universidad de Chile',
    image: 'https://images.unsplash.com/photo-1765005204058-10418f5123c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNtaWxpbmclMjBjb3Jwb3JhdGUlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzE0OTcyNjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    skills: ['Python', 'SQL', 'Tableau'],
    category: 'Datos',
    match: 91,
    verified: true,
    available: false,
    bio: 'Analista de datos con experiencia en business intelligence y visualización. Especialista en transformar datos complejos en insights accionables.',
    projects: ['Sales Forecasting Model', 'Customer Segmentation', 'BI Dashboard'],
    certifications: ['IBM Data Science', 'Tableau Desktop Specialist'],
  },
  {
    id: 4,
    name: 'Mateo Fernández',
    role: 'Full-Stack Engineer',
    university: 'UNAM',
    image: 'https://images.unsplash.com/photo-1737574107736-9e02ca5d5387?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHNvZnR3YXJlJTIwZGV2ZWxvcGVyJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcxNTY4OTk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    skills: ['Node.js', 'React', 'AWS'],
    category: 'Desarrollo',
    match: 89,
    verified: true,
    available: true,
    bio: 'Ingeniero full-stack con experiencia en arquitecturas cloud y microservicios. Enfocado en construir productos escalables y de alto rendimiento.',
    projects: ['API Gateway', 'Real-time Chat App', 'Serverless Platform'],
    certifications: ['AWS Solutions Architect', 'Node.js Certified Developer'],
  },
  {
    id: 5,
    name: 'Lucía Mendoza',
    role: 'Growth Marketer',
    university: 'Pontificia Javeriana',
    image: '',
    skills: ['SEO', 'Analytics', 'Copywriting'],
    category: 'Marketing',
    match: 87,
    verified: true,
    available: true,
    bio: 'Growth marketer con enfoque en SEO técnico y content marketing. Experiencia impulsando crecimiento orgánico en startups B2B.',
    projects: ['SEO Strategy', 'Content Funnel', 'Email Automation'],
    certifications: ['Google Analytics', 'HubSpot Inbound Marketing'],
  },
  {
    id: 6,
    name: 'Andrés Vargas',
    role: 'ML Engineer',
    university: 'Universidad de Buenos Aires',
    image: '',
    skills: ['Python', 'TensorFlow', 'NLP'],
    category: 'Datos',
    match: 94,
    verified: true,
    available: true,
    bio: 'Ingeniero de ML especializado en procesamiento de lenguaje natural y modelos generativos. Investigador activo en deep learning aplicado.',
    projects: ['Chatbot NLP', 'Sentiment Analysis', 'Recommendation Engine'],
    certifications: ['DeepLearning.AI Specialization', 'Stanford ML Certificate'],
  },
];

function MatchRing({ percentage }: { percentage: number }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  const offset = c - (percentage / 100) * c;

  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="transform -rotate-90">
      <circle cx="20" cy="20" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5" />
      <circle cx="20" cy="20" r={r} fill="none" stroke="url(#matchGrad)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} />
      <defs>
        <linearGradient id="matchGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function TalentModal({ talent, onClose }: { talent: typeof talents[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl border border-white/[0.08] bg-[#0c0c0c] shadow-2xl"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#5a5a5a] hover:text-white hover:bg-white/[0.08] transition-all z-10"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="p-8">
          {/* Profile header */}
          <div className="flex items-center gap-4 mb-6">
            {talent.image ? (
              <ImageWithFallback src={talent.image} alt={talent.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-white/[0.08]" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-violet-600/20 border-2 border-white/[0.08] flex items-center justify-center">
                <span className="text-xl text-purple-300">{talent.name[0]}</span>
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-lg text-white tracking-tight">{talent.name}</h3>
                {talent.verified && (
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1l1.2 1.8 2.1-.3-.3 2.1L11 6 9 7.2l.3 2.1-2.1-.3L6 11 4.8 9l-2.1.3.3-2.1L1 6l2-1.2-.3-2.1 2.1.3L6 1z" fill="rgba(139,92,246,0.3)" stroke="rgba(139,92,246,0.5)" strokeWidth="0.5" />
                    <path d="M4.5 6l1 1 2-2" stroke="white" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div className="text-sm text-[#8a8a8a]">{talent.role}</div>
              <div className="flex items-center gap-1.5 text-xs text-[#5a5a5a] mt-1">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 1L1 3.5 5 6l4-2.5L5 1zM1 6.5L5 9l4-2.5" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {talent.university}
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <MatchRing percentage={talent.match} />
              <span className="absolute text-[10px] text-white">{talent.match}%</span>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h4 className="text-sm text-white mb-2">Sobre</h4>
            <p className="text-sm text-[#8a8a8a] leading-relaxed">{talent.bio}</p>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h4 className="text-sm text-white mb-2">Habilidades</h4>
            <div className="flex flex-wrap gap-2">
              {talent.skills.map((s) => (
                <span key={s} className="px-3 py-1 rounded-lg text-xs bg-white/[0.04] text-[#8a8a8a] border border-white/[0.06]">{s}</span>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mb-6">
            <h4 className="text-sm text-white mb-2">Proyectos</h4>
            <div className="space-y-2">
              {talent.projects.map((p, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-sm text-[#8a8a8a]">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <rect x="1" y="1" width="8" height="8" rx="2" stroke="rgba(139,92,246,0.4)" strokeWidth="0.7" />
                    <path d="M3 5h4M5 3v4" stroke="rgba(139,92,246,0.3)" strokeWidth="0.5" strokeLinecap="round" />
                  </svg>
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-8">
            <h4 className="text-sm text-white mb-2">Certificaciones</h4>
            <div className="space-y-1.5">
              {talent.certifications.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[#8a8a8a]">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M8 3L4 7.5 2 5.5" stroke="#34d399" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* Status + CTA */}
          <div className="flex items-center gap-3">
            <button className="flex-1 px-6 py-3 rounded-lg text-sm bg-gradient-to-b from-purple-500 to-purple-600 text-white hover:from-purple-400 hover:to-purple-500 transition-all">
              Contactar
            </button>
            <div className="flex items-center gap-1.5 px-4 py-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
              <span className={`w-2 h-2 rounded-full ${talent.available ? 'bg-emerald-400' : 'bg-[#5a5a5a]'}`} />
              <span className="text-xs text-[#8a8a8a]">{talent.available ? 'Disponible' : 'En proceso'}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Talento() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [selectedTalent, setSelectedTalent] = useState<typeof talents[0] | null>(null);

  const filtered = activeFilter === 'Todos'
    ? talents
    : talents.filter((t) => t.category === activeFilter);

  return (
    <section id="talento" className="py-24 relative">
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-violet-900/[0.05] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl tracking-tight text-white mb-4">
            El talento que tu empresa necesita
          </h2>
          <p className="text-lg text-[#8a8a8a] max-w-2xl mx-auto">
            Perfiles verificados, habilidades validadas y compatibilidad calculada por nuestra IA para cada posición
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                activeFilter === f
                  ? 'bg-purple-500/15 text-purple-300 border border-purple-500/20'
                  : 'text-[#8a8a8a] border border-white/[0.06] hover:border-white/[0.1] hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((talent, i) => (
            <motion.div
              key={talent.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              onClick={() => setSelectedTalent(talent)}
              whileHover={{ scale: 1.015, y: -2 }}
              className="group relative p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-purple-500/20 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Hover glow overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-violet-500/[0.04] via-transparent to-purple-500/[0.04]" />
              <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.06)' }} />

              <div className="relative flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {talent.image ? (
                    <ImageWithFallback src={talent.image} alt={talent.name} className="w-11 h-11 rounded-full object-cover ring-1 ring-white/[0.08]" />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500/20 to-violet-600/20 border border-white/[0.08] flex items-center justify-center">
                      <span className="text-sm text-purple-300">{talent.name[0]}</span>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-white">{talent.name}</span>
                      {talent.verified && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 1l1.2 1.8 2.1-.3-.3 2.1L11 6 9 7.2l.3 2.1-2.1-.3L6 11 4.8 9l-2.1.3.3-2.1L1 6l2-1.2-.3-2.1 2.1.3L6 1z" fill="rgba(139,92,246,0.3)" stroke="rgba(139,92,246,0.5)" strokeWidth="0.5" />
                          <path d="M4.5 6l1 1 2-2" stroke="white" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <div className="text-[11px] text-[#8a8a8a]">{talent.role}</div>
                  </div>
                </div>
                <div className="relative flex items-center justify-center">
                  <MatchRing percentage={talent.match} />
                  <span className="absolute text-[9px] text-white">{talent.match}%</span>
                </div>
              </div>

              <div className="relative flex items-center gap-1.5 mb-3 text-[11px] text-[#5a5a5a]">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 1L1 3.5 5 6l4-2.5L5 1zM1 6.5L5 9l4-2.5" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {talent.university}
              </div>

              <div className="relative flex flex-wrap gap-1.5 mb-3">
                {talent.skills.map((skill) => (
                  <span key={skill} className="px-2 py-0.5 rounded text-[10px] bg-white/[0.04] text-[#8a8a8a] border border-white/[0.06]">{skill}</span>
                ))}
              </div>

              <div className="relative flex items-center justify-between pt-3 border-t border-white/[0.04]">
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${talent.available ? 'bg-emerald-400' : 'bg-[#5a5a5a]'}`} />
                  <span className="text-[10px] text-[#5a5a5a]">{talent.available ? 'Disponible' : 'En proceso'}</span>
                </div>
                <span className="text-[10px] text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                  Ver perfil
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2.5 5h5M5.5 3l2 2-2 2" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <button className="px-6 py-2.5 rounded-lg text-sm border border-white/[0.08] text-[#8a8a8a] hover:text-white hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-200">
            Explorar todo el talento
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedTalent && (
          <TalentModal talent={selectedTalent} onClose={() => setSelectedTalent(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
