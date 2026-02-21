import { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin, GraduationCap, Calendar, Github, Linkedin, Globe,
  Camera, ExternalLink, Plus, Folder, Star, Heart, Eye,
  Briefcase, Users, Download, Share2, Award, Languages,
  Code, CheckCircle2, ChevronRight
} from 'lucide-react';

interface ProfilePageProps {
  isDark: boolean;
  onNavigateToSettings: () => void;
}

const skillsData = [
  { skill: 'React', level: 92 },
  { skill: 'TypeScript', level: 85 },
  { skill: 'Next.js', level: 78 },
  { skill: 'Node.js', level: 70 },
  { skill: 'Figma', level: 60 },
  { skill: 'AWS', level: 45 },
  { skill: 'Python', level: 40 },
];

const portfolio = [
  { id: 1, title: 'Dashboard Analytics', description: 'Panel de analíticas con gráficos interactivos, data en tiempo real, exportación a PDF y dark mode. Usado por 3 empresas en producción.', tags: ['React', 'TypeScript', 'Recharts', 'Tailwind'], url: 'https://demo.unext.co/dashboard', stars: 24, views: 1200 },
  { id: 2, title: 'E-commerce Platform', description: 'Plataforma de comercio electrónico completa con carrito, pagos con Stripe, sistema de inventario y panel de admin.', tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma'], url: 'https://demo.unext.co/ecommerce', stars: 18, views: 890 },
  { id: 3, title: 'Design System — Nørd UI', description: 'Librería de componentes open-source con 40+ componentes, theming, a11y, y documentación interactiva con Storybook.', tags: ['React', 'Storybook', 'CSS-in-JS', 'TypeScript'], url: 'https://github.com/juandiaz/nord-ui', stars: 156, views: 4500 },
  { id: 4, title: 'Mobile Health App', description: 'App de seguimiento de salud con tracking de ejercicio, nutrición y sueño. Integración con Apple Health y Google Fit.', tags: ['React Native', 'Firebase', 'HealthKit'], url: null, stars: 8, views: 320 },
  { id: 5, title: 'AI Chat Interface', description: 'Interfaz de chat con IA con streaming de respuestas, syntax highlighting, y persistencia de conversaciones.', tags: ['React', 'OpenAI', 'WebSockets', 'Tailwind'], url: 'https://demo.unext.co/ai-chat', stars: 42, views: 2100 },
];

const experience = [
  { role: 'Frontend Developer', company: 'Freelance', period: 'Mar 2024 — Presente', current: true, description: 'Desarrollo de aplicaciones web para clientes internacionales usando React, Next.js y TypeScript.' },
  { role: 'Pasante de Desarrollo', company: 'TechStartup MX', period: 'Jun 2023 — Feb 2024', current: false, description: 'Contribuí al desarrollo del producto principal usando React y Node.js. Implementé 15+ features.' },
  { role: 'Diseñador Web', company: 'Creative Studio', period: 'Ene 2023 — May 2023', current: false, description: 'Diseño y desarrollo de sitios web para clientes de la agencia usando WordPress y Figma.' },
];

const education = [
  { degree: 'Ingeniería en Computación', institution: 'UNAM', period: '2021 — 2025', current: true },
  { degree: 'Certificación Frontend', institution: 'Meta (Coursera)', period: '2023', current: false },
  { degree: 'CS50x — Intro to CS', institution: 'Harvard / edX', period: '2022', current: false },
];

const certifications = [
  { name: 'Meta Frontend Developer', issuer: 'Meta / Coursera', date: 'Ago 2023', verified: true },
  { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: 'Nov 2023', verified: true },
  { name: 'TypeScript Fundamentals', issuer: 'Frontend Masters', date: 'Mar 2024', verified: false },
  { name: 'React Testing Library', issuer: 'Testing JavaScript', date: 'Jun 2024', verified: false },
];

const languages = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Inglés', level: 'Avanzado (C1)' },
  { name: 'Portugués', level: 'Básico (A2)' },
];

export function ProfilePage({ isDark, onNavigateToSettings }: ProfilePageProps) {
  const [activeSection, setActiveSection] = useState<'portfolio' | 'experience' | 'certs'>('portfolio');

  const border = isDark ? 'border-[#333]' : 'border-[#eaeaea]';
  const text = isDark ? 'text-white' : 'text-black';
  const textMuted = isDark ? 'text-[#888]' : 'text-[#666]';
  const textFaint = isDark ? 'text-[#555]' : 'text-[#999]';
  const hoverBg = isDark ? 'hover:bg-[#111]' : 'hover:bg-[#f5f5f5]';
  const cardBg = isDark ? 'bg-[#0a0a0a]' : 'bg-white';

  return (
    <div className="space-y-5">
      {/* Profile Header */}
      <div className={`p-6 rounded-lg border ${border} ${cardBg}`}>
        <div className="flex flex-col md:flex-row items-start gap-5">
          <div className="relative group flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white text-2xl ring-2 ring-purple-500/20">
              JD
            </div>
            <button className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-4 h-4 text-white" />
            </button>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center">
              <CheckCircle2 className="w-3 h-3 text-white" />
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h1 className={`text-lg ${text} tracking-tight`}>Juan Díaz</h1>
              <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-500">Pro</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-500">Verificado</span>
            </div>
            <p className={`text-sm ${textMuted} mb-2`}>Frontend Developer · Estudiante de Ing. en Computación</p>
            <p className={`text-xs ${textFaint} max-w-xl leading-relaxed mb-3`}>
              Desarrollador frontend con 2+ años de experiencia en React, TypeScript y sistemas de diseño. Enfocado en rendimiento, accesibilidad y experiencias de usuario excepcionales. Busco oportunidades donde pueda crecer y aportar a productos de alto impacto.
            </p>
            <div className={`flex flex-wrap items-center gap-3 text-[11px] ${textFaint}`}>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Ciudad de México</span>
              <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" /> UNAM</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Se unió en Ene 2024</span>
              <span className="flex items-center gap-1"><Code className="w-3 h-3" /> Disponible</span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <a href="#" className={`p-1.5 rounded-md border ${border} ${textFaint} ${hoverBg} transition-colors`}><Github className="w-3.5 h-3.5" /></a>
              <a href="#" className={`p-1.5 rounded-md border ${border} ${textFaint} ${hoverBg} transition-colors`}><Linkedin className="w-3.5 h-3.5" /></a>
              <a href="#" className={`p-1.5 rounded-md border ${border} ${textFaint} ${hoverBg} transition-colors`}><Globe className="w-3.5 h-3.5" /></a>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs border ${border} ${textMuted} ${hoverBg} transition-colors`}>
              <Share2 className="w-3 h-3" /> Compartir
            </button>
            <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs border ${border} ${textMuted} ${hoverBg} transition-colors`}>
              <Download className="w-3 h-3" /> CV
            </button>
            <button onClick={onNavigateToSettings} className={`px-3 py-1.5 rounded-md text-xs bg-purple-500 text-white hover:bg-purple-600 transition-colors`}>
              Editar Perfil
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Aplicaciones', value: '24', icon: Briefcase },
          { label: 'Entrevistas', value: '8', icon: Users },
          { label: 'Proyectos', value: String(portfolio.length), icon: Folder },
          { label: 'Vistas perfil', value: '156', icon: Eye },
          { label: 'Match promedio', value: '87%', icon: Heart },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className={`p-4 rounded-lg border ${border} ${cardBg} text-center`}>
              <Icon className={`w-4 h-4 mx-auto mb-2 ${textFaint}`} />
              <div className={`text-lg ${text} tabular-nums tracking-tight`}>{s.value}</div>
              <div className={`text-[10px] ${textFaint}`}>{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Skills + Languages + Certs preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Skills */}
        <div className={`p-5 rounded-lg border ${border} ${cardBg}`}>
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs ${text}`}>Habilidades</span>
            <button className={`text-[10px] ${textFaint} ${hoverBg} px-2 py-1 rounded transition-colors`}>Editar</button>
          </div>
          <div className="space-y-3">
            {skillsData.map((s) => (
              <div key={s.skill} className="flex items-center gap-3">
                <span className={`text-[11px] w-20 ${textMuted}`}>{s.skill}</span>
                <div className={`flex-1 h-1.5 rounded-full ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#eee]'}`}>
                  <div className="h-full rounded-full bg-purple-500" style={{ width: `${s.level}%`, opacity: 0.7 }} />
                </div>
                <span className={`text-[10px] tabular-nums ${textFaint}`}>{s.level}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className={`p-5 rounded-lg border ${border} ${cardBg}`}>
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs ${text} flex items-center gap-1.5`}><Languages className="w-3.5 h-3.5" /> Idiomas</span>
          </div>
          <div className="space-y-3">
            {languages.map((lang) => (
              <div key={lang.name} className="flex items-center justify-between">
                <span className={`text-xs ${text}`}>{lang.name}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded ${isDark ? 'bg-[#1a1a1a] text-[#888]' : 'bg-[#f0f0f0] text-[#666]'}`}>{lang.level}</span>
              </div>
            ))}
          </div>
          <div className={`mt-4 pt-4 border-t ${border}`}>
            <span className={`text-xs ${text} block mb-3`}>Educación</span>
            <div className="space-y-3">
              {education.map((edu, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${edu.current ? 'bg-emerald-500' : isDark ? 'bg-[#333]' : 'bg-[#ccc]'}`} />
                  <div>
                    <span className={`text-xs ${text} block`}>{edu.degree}</span>
                    <span className={`text-[11px] ${textMuted}`}>{edu.institution} · {edu.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className={`p-5 rounded-lg border ${border} ${cardBg}`}>
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs ${text} flex items-center gap-1.5`}><Award className="w-3.5 h-3.5" /> Certificaciones</span>
          </div>
          <div className="space-y-3">
            {certifications.map((cert, i) => (
              <div key={i} className={`flex items-start gap-3 p-2.5 rounded-lg ${hoverBg} transition-colors cursor-pointer`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${cert.verified ? 'bg-emerald-500/10' : isDark ? 'bg-[#1a1a1a]' : 'bg-[#f0f0f0]'}`}>
                  <Award className={`w-3.5 h-3.5 ${cert.verified ? 'text-emerald-400' : textFaint}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs ${text} truncate`}>{cert.name}</span>
                    {cert.verified && <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />}
                  </div>
                  <span className={`text-[10px] ${textFaint}`}>{cert.issuer} · {cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabbed section: Portfolio / Experience */}
      <div>
        <div className={`flex items-center gap-0.5 border-b ${border} mb-4`}>
          {([
            { id: 'portfolio' as const, label: 'Portafolio', count: portfolio.length },
            { id: 'experience' as const, label: 'Experiencia', count: experience.length },
          ]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`px-4 py-2.5 text-xs transition-colors relative ${activeSection === tab.id ? text : textMuted}`}
            >
              {tab.label}
              <span className={`ml-1.5 text-[10px] ${textFaint}`}>{tab.count}</span>
              {activeSection === tab.id && (
                <motion.div
                  layoutId="profile-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-500"
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          ))}
        </div>

        {activeSection === 'portfolio' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className={`text-xs ${textMuted}`}>Proyectos destacados y contribuciones</p>
              <button className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] border ${border} ${textMuted} ${hoverBg} transition-colors`}>
                <Plus className="w-3 h-3" /> Agregar proyecto
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {portfolio.map((project) => (
                <div key={project.id} className={`p-5 rounded-lg border ${border} ${cardBg} group transition-all ${isDark ? 'hover:border-[#444]' : 'hover:border-[#ddd]'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Folder className={`w-4 h-4 ${textFaint}`} />
                      <span className={`text-sm ${text}`}>{project.title}</span>
                    </div>
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className={`p-1.5 rounded ${textFaint} ${hoverBg} opacity-0 group-hover:opacity-100 transition-all`}>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className={`text-xs ${textMuted} mb-3 leading-relaxed`}>{project.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className={`px-2 py-0.5 rounded text-[10px] ${isDark ? 'bg-[#1a1a1a] text-[#888]' : 'bg-[#f0f0f0] text-[#666]'}`}>{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Eye className={`w-3 h-3 ${textFaint}`} />
                        <span className={`text-[10px] tabular-nums ${textFaint}`}>{project.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className={`w-3 h-3 ${textFaint}`} />
                        <span className={`text-[10px] tabular-nums ${textFaint}`}>{project.stars}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'experience' && (
          <div className="space-y-3">
            {experience.map((exp, i) => (
              <div key={i} className={`p-5 rounded-lg border ${border} ${cardBg} flex items-start gap-4`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${exp.current ? 'bg-purple-500/10' : isDark ? 'bg-[#1a1a1a]' : 'bg-[#f0f0f0]'}`}>
                  <Briefcase className={`w-4 h-4 ${exp.current ? 'text-purple-400' : textFaint}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-sm ${text}`}>{exp.role}</span>
                    {exp.current && <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-500">Actual</span>}
                  </div>
                  <span className={`text-xs ${textMuted} block mb-1.5`}>{exp.company} · {exp.period}</span>
                  <p className={`text-xs ${textFaint} leading-relaxed`}>{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
