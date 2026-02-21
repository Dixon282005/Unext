import { motion } from 'motion/react';

function SidebarIcon({ d, delay }: { d: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
      viewport={{ once: true }}
      className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center hover:bg-white/[0.08] transition-colors"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d={d} stroke="rgba(139,92,246,0.5)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}

function MatchCard({ name, role, match, delay }: { name: string; role: string; match: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
    >
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-white/[0.08] flex items-center justify-center">
          <span className="text-[10px] text-purple-300">{name[0]}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] text-white truncate">{name}</div>
          <div className="text-[8px] text-[#5a5a5a]">{role}</div>
        </div>
        <div className="text-[9px] text-emerald-400/80">{match}%</div>
      </div>
      <div className="flex gap-1">
        {['React', 'TS', 'UI'].map((tag) => (
          <span key={tag} className="px-1.5 py-0.5 rounded text-[7px] bg-purple-500/10 text-purple-400/60 border border-purple-500/10">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function MiniChart({ delay }: { delay: number }) {
  const bars = [35, 55, 42, 70, 58, 80, 65, 75, 90, 68, 85, 72];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="flex items-end gap-[3px] h-12"
    >
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          transition={{ delay: delay + i * 0.04, duration: 0.4, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="w-[6px] rounded-sm bg-gradient-to-t from-purple-600/40 to-purple-400/20"
        />
      ))}
    </motion.div>
  );
}

export function PlatformPreview() {
  return (
    <section id="platform-preview" className="py-24 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-900/[0.06] rounded-full blur-[160px] pointer-events-none" />

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
            Una experiencia que lo cambia todo
          </h2>
          <p className="text-lg text-[#8a8a8a] max-w-2xl mx-auto">
            Un dashboard inteligente que organiza tu búsqueda, conecta con empresas y potencia tu carrera con IA
          </p>
        </motion.div>

        {/* Browser Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-4xl"
        >
          {/* Glow behind the mockup */}
          <div className="absolute -inset-4 bg-gradient-to-b from-purple-500/[0.06] via-transparent to-transparent rounded-3xl blur-2xl pointer-events-none" />

          {/* Browser Frame */}
          <div className="relative rounded-xl border border-white/[0.08] bg-[#0a0a0a]/90 backdrop-blur-xl overflow-hidden shadow-2xl shadow-purple-900/10">
            {/* Title Bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] text-[#5a5a5a] flex items-center gap-1.5">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M4 1v6M1 4h6" stroke="rgba(139,92,246,0.4)" strokeWidth="0.8" strokeLinecap="round" />
                  </svg>
                  app.unext.com/dashboard
                </div>
              </div>
              <div className="w-12" />
            </div>

            {/* Dashboard Content */}
            <div className="flex min-h-[380px] md:min-h-[440px]">
              {/* Sidebar */}
              <div className="hidden sm:flex flex-col items-center gap-2 py-4 px-2 border-r border-white/[0.06] bg-white/[0.01]">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-violet-600/20 flex items-center justify-center mb-2 border border-purple-500/10">
                  <span className="text-[9px] text-purple-300" style={{ letterSpacing: '-0.04em' }}>U</span>
                </div>
                <SidebarIcon d="M2 2h10v10H2zM5 2v10M2 5h10" delay={0.3} />
                <SidebarIcon d="M7 2a5 5 0 110 10 5 5 0 010-10zM7 5v4M5 7h4" delay={0.4} />
                <SidebarIcon d="M2 4h10M2 7h10M2 10h10" delay={0.5} />
                <SidebarIcon d="M7 2l5 5-5 5-5-5z" delay={0.6} />
                <div className="flex-1" />
                <SidebarIcon d="M7 2a5 5 0 110 10 5 5 0 010-10zM5.5 5.5h3M5.5 7h3M5.5 8.5h2" delay={0.7} />
              </div>

              {/* Main Content */}
              <div className="flex-1 p-4 md:p-5 overflow-hidden">
                {/* Top bar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between mb-4"
                >
                  <div>
                    <div className="text-xs text-white mb-0.5">Bienvenido, Valentina</div>
                    <div className="text-[10px] text-[#5a5a5a]">Tienes 3 matches nuevos hoy</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 1v2M5 7v2M1 5h2M7 5h2" stroke="rgba(139,92,246,0.4)" strokeWidth="0.8" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="relative w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 1.5a2.5 2.5 0 012.5 2.5c0 1.5-.5 2.5-2.5 4.5C3 6.5 2.5 5.5 2.5 4A2.5 2.5 0 015 1.5z" stroke="rgba(139,92,246,0.4)" strokeWidth="0.8" />
                      </svg>
                      <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-[#0a0a0a]" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500/30 to-violet-500/30 border border-white/[0.08]" />
                  </div>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Intelligent Match Panel */}
                  <div className="md:col-span-1 space-y-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      viewport={{ once: true }}
                      className="text-[10px] text-[#5a5a5a] mb-1 flex items-center gap-1"
                    >
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <circle cx="4" cy="4" r="3" stroke="rgba(139,92,246,0.5)" strokeWidth="0.6" />
                        <circle cx="4" cy="4" r="1" fill="rgba(139,92,246,0.3)" />
                      </svg>
                      Matches Inteligentes
                    </motion.div>
                    <MatchCard name="María González" role="Diseñadora UX" match={96} delay={0.5} />
                    <MatchCard name="Carlos Medina" role="Dev Full-Stack" match={92} delay={0.6} />
                    <MatchCard name="Ana Ríos" role="Data Science" match={88} delay={0.7} />
                  </div>

                  {/* Center — Featured Challenge */}
                  <div className="md:col-span-1">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="p-3 rounded-lg border border-purple-500/10 bg-gradient-to-b from-purple-500/[0.04] to-transparent h-full"
                    >
                      <div className="text-[10px] text-[#5a5a5a] mb-2 flex items-center gap-1">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <rect x="1" y="1" width="6" height="6" rx="1" stroke="rgba(139,92,246,0.5)" strokeWidth="0.6" />
                          <path d="M3 4h2M4 3v2" stroke="rgba(139,92,246,0.4)" strokeWidth="0.5" strokeLinecap="round" />
                        </svg>
                        Reto Destacado
                      </div>
                      <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-2.5 mb-3">
                        <div className="text-[10px] text-white mb-1">Diseño de Landing SaaS</div>
                        <div className="text-[8px] text-[#5a5a5a] mb-2">TechVentures • Remoto</div>
                        <div className="flex gap-1 mb-2">
                          {['Figma', 'UI/UX', 'SaaS'].map((tag) => (
                            <span key={tag} className="px-1 py-0.5 rounded text-[7px] bg-emerald-500/10 text-emerald-400/60 border border-emerald-500/10">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '65%' }}
                            transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                            viewport={{ once: true }}
                            className="h-full rounded-full bg-gradient-to-r from-purple-500/60 to-violet-400/40"
                          />
                        </div>
                        <div className="text-[7px] text-[#5a5a5a] mt-1">65% completado • 3 días restantes</div>
                      </div>
                      <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-2.5">
                        <div className="text-[10px] text-white mb-1">API REST Challenge</div>
                        <div className="text-[8px] text-[#5a5a5a] mb-2">Innovation Labs • Híbrido</div>
                        <div className="flex gap-1">
                          {['Node', 'API', 'SQL'].map((tag) => (
                            <span key={tag} className="px-1 py-0.5 rounded text-[7px] bg-purple-500/10 text-purple-400/60 border border-purple-500/10">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right — Stats & AI Copilot */}
                  <div className="md:col-span-1 space-y-3">
                    {/* Mini stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]"
                    >
                      <div className="text-[10px] text-[#5a5a5a] mb-2">Tu Actividad</div>
                      <MiniChart delay={0.6} />
                      <div className="flex justify-between mt-2">
                        <div className="text-center">
                          <div className="text-[10px] text-white">47</div>
                          <div className="text-[7px] text-[#5a5a5a]">Vistas</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[10px] text-emerald-400">12</div>
                          <div className="text-[7px] text-[#5a5a5a]">Matches</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[10px] text-purple-400">5</div>
                          <div className="text-[7px] text-[#5a5a5a]">Retos</div>
                        </div>
                      </div>
                    </motion.div>

                    {/* AI Copilot mini */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="p-3 rounded-lg border border-purple-500/10 bg-gradient-to-b from-purple-500/[0.03] to-transparent"
                    >
                      <div className="text-[10px] text-[#5a5a5a] mb-2 flex items-center gap-1">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M4 1L1.5 2.5v3L4 7l2.5-1.5v-3L4 1z" stroke="rgba(139,92,246,0.5)" strokeWidth="0.6" />
                          <circle cx="4" cy="4" r="1" stroke="rgba(139,92,246,0.4)" strokeWidth="0.5" />
                        </svg>
                        Copiloto IA
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex gap-1.5">
                          <div className="w-4 h-4 rounded-full bg-purple-500/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                            <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                              <path d="M3 0.5L0.5 2v2L3 5.5 5.5 4V2L3 0.5z" fill="rgba(139,92,246,0.4)" />
                            </svg>
                          </div>
                          <div className="p-1.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-[8px] text-[#8a8a8a] leading-relaxed">
                            Tu perfil tiene alta compatibilidad con roles de Frontend. Te recomiendo completar el reto de TechVentures.
                          </div>
                        </div>
                        <div className="flex items-center gap-1 pl-5">
                          <div className="flex-1 h-5 rounded-md bg-white/[0.03] border border-white/[0.06] px-2 flex items-center">
                            <span className="text-[7px] text-[#3a3a3a]">Pregunta al copiloto...</span>
                          </div>
                          <div className="w-5 h-5 rounded-md bg-purple-500/20 flex items-center justify-center">
                            <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                              <path d="M1 3h4M3 1l2 2-2 2" stroke="rgba(139,92,246,0.6)" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reflection/glow at bottom */}
          <div className="absolute -bottom-8 left-[10%] right-[10%] h-16 bg-purple-500/[0.03] rounded-full blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
