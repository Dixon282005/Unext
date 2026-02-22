"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Bell, Sun, Moon, ArrowUp, ArrowDown,
  Briefcase, Users, Eye, TrendingUp,
  Settings, User, LogOut
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { AIWorkspace } from '@/features/dashboard/components/AIWorkspace';
import { OpportunitiesPage } from '@/features/dashboard/components/OpportunitiesPage';
import { MessagesPage } from '@/features/dashboard/components/MessagesPage';
import { ProfilePage } from '@/features/dashboard/components/ProfilePage';
import { SettingsPage } from '@/features/dashboard/components/SettingsPage';
import { useUser } from '@/providers/UserProvider';
import { useRouter } from 'next/navigation';

type TabId = 'overview' | 'opportunities' | 'ai' | 'messages' | 'profile' | 'settings';

// ========== COMMAND PALETTE ==========
function CommandPalette({ isDark, open, onClose, onNavigate }: {
  isDark: boolean;
  open: boolean;
  onClose: () => void;
  onNavigate: (tab: TabId) => void;
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = [
    { id: 'overview', label: 'Ir a Dashboard', section: 'Navegación', icon: '◆', tab: 'overview' as TabId },
    { id: 'opportunities', label: 'Ir a Oportunidades', section: 'Navegación', icon: '◇', tab: 'opportunities' as TabId },
    { id: 'ai', label: 'Abrir AI Workspace', section: 'Navegación', icon: '⬡', tab: 'ai' as TabId },
    { id: 'messages', label: 'Ir a Mensajes', section: 'Navegación', icon: '◈', tab: 'messages' as TabId },
    { id: 'profile', label: 'Mi Perfil', section: 'Cuenta', icon: '○', tab: 'profile' as TabId },
    { id: 'settings', label: 'Configuración', section: 'Cuenta', icon: '⚙', tab: 'settings' as TabId },
    { id: 'portfolio', label: 'Mi Portafolio', section: 'Cuenta', icon: '□', tab: 'profile' as TabId },
  ];

  const filtered = query
    ? commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands;

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  if (!open) return null;

  const border = isDark ? 'border-[#333]' : 'border-[#eaeaea]';
  const bg = isDark ? 'bg-[#0a0a0a]' : 'bg-white';
  const text = isDark ? 'text-white' : 'text-black';
  const textMuted = isDark ? 'text-[#888]' : 'text-[#666]';
  const hoverBg = isDark ? 'hover:bg-[#1a1a1a]' : 'hover:bg-[#f5f5f5]';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -8 }}
        transition={{ duration: 0.15 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-lg rounded-xl border ${border} ${bg} overflow-hidden shadow-2xl`}
      >
        <div className={`flex items-center gap-3 px-4 border-b ${border}`}>
          <Search className={`w-4 h-4 ${textMuted}`} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar comando..."
            className={`flex-1 py-3 text-sm bg-transparent ${text} placeholder:${textMuted} focus:outline-none`}
          />
          <kbd className={`text-[9px] ${textMuted} px-1.5 py-0.5 rounded border ${border}`}>ESC</kbd>
        </div>
        <div className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className={`px-4 py-8 text-center text-xs ${textMuted}`}>Sin resultados</div>
          ) : (
            filtered.map((cmd) => (
              <button
                key={cmd.id}
                onClick={() => { onNavigate(cmd.tab); onClose(); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs ${text} ${hoverBg} transition-colors`}
              >
                <span className={`text-sm ${textMuted}`}>{cmd.icon}</span>
                <span className="flex-1 text-left">{cmd.label}</span>
                <span className={`text-[9px] ${textMuted}`}>{cmd.section}</span>
              </button>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ========== MAIN DASHBOARD ==========
export default function Dashboard() {
  const { userName, userEmail, userType, logoutUser, isDark, setIsDark } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // ⌘K handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') setCommandPaletteOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handler = () => { setShowNotifications(false); setShowUserMenu(false); };
    if (showNotifications || showUserMenu) {
      setTimeout(() => window.addEventListener('click', handler, { once: true }), 0);
    }
  }, [showNotifications, showUserMenu]);

  // Theme tokens
  const bg = isDark ? 'bg-[#000000]' : 'bg-[#ffffff]';
  const border = isDark ? 'border-[#333]' : 'border-[#eaeaea]';
  const text = isDark ? 'text-white' : 'text-black';
  const textMuted = isDark ? 'text-[#888]' : 'text-[#666]';
  const textFaint = isDark ? 'text-[#555]' : 'text-[#999]';
  const hoverBg = isDark ? 'hover:bg-[#111]' : 'hover:bg-[#f5f5f5]';
  const cardBg = isDark ? 'bg-[#0a0a0a]' : 'bg-white';
  const inputBg = isDark ? 'bg-[#111]' : 'bg-[#fafafa]';

  // Data
  const activityData = [
    { name: 'Ene', aplicaciones: 12, entrevistas: 3 },
    { name: 'Feb', aplicaciones: 19, entrevistas: 5 },
    { name: 'Mar', aplicaciones: 15, entrevistas: 4 },
    { name: 'Abr', aplicaciones: 25, entrevistas: 8 },
    { name: 'May', aplicaciones: 30, entrevistas: 12 },
    { name: 'Jun', aplicaciones: 28, entrevistas: 10 },
  ];

  const weeklyData = [
    { day: 'L', count: 4 }, { day: 'M', count: 7 }, { day: 'X', count: 3 },
    { day: 'J', count: 8 }, { day: 'V', count: 6 }, { day: 'S', count: 2 }, { day: 'D', count: 1 },
  ];

  const stats = [
    { label: 'Aplicaciones', value: '24', change: '+12%', up: true, icon: Briefcase },
    { label: 'Entrevistas', value: '8', change: '+8%', up: true, icon: Users },
    { label: 'Vistas de perfil', value: '156', change: '+23%', up: true, icon: Eye },
    { label: 'Tasa de éxito', value: '12.5%', change: '+3%', up: true, icon: TrendingUp },
  ];

  const recentActivity = [
    { id: 1, title: 'Aplicaste a TechCorp', time: '2h', type: 'application' },
    { id: 2, title: 'DesignHub vio tu perfil', time: '5h', type: 'view' },
    { id: 3, title: 'Mensaje de DataFlow', time: '1d', type: 'message' },
    { id: 4, title: 'Entrevista con StartupXYZ', time: '2d', type: 'interview' },
    { id: 5, title: 'Perfil actualizado', time: '3d', type: 'update' },
  ];

  const skillsData = [
    { skill: 'React', level: 92 }, { skill: 'TypeScript', level: 85 },
    { skill: 'Node.js', level: 70 }, { skill: 'Figma', level: 60 },
    { skill: 'AWS', level: 45 },
  ];

  const notifications = [
    { id: 1, title: 'Nuevo mensaje de TechCorp', time: '5m', read: false },
    { id: 2, title: 'DesignHub vio tu perfil', time: '1h', read: false },
    { id: 3, title: 'Entrevista confirmada', time: '2h', read: true },
  ];

  const navTabs = [
    { id: 'overview' as TabId, label: 'Dashboard' },
    { id: 'opportunities' as TabId, label: 'Oportunidades' },
    { id: 'ai' as TabId, label: 'AI Workspace' },
    { id: 'messages' as TabId, label: 'Mensajes' },
  ];

  const pageVariants = {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -6 },
  };

  return (
    <div className={`h-screen flex flex-col transition-colors duration-300 ${bg}`}>
      {/* ===== COMMAND PALETTE ===== */}
      <AnimatePresence>
        {commandPaletteOpen && (
          <CommandPalette
            isDark={isDark}
            open={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
            onNavigate={setActiveTab}
          />
        )}
      </AnimatePresence>

      {/* ===== TOP NAVBAR ===== */}
      <nav className={`sticky top-0 z-50 h-12 border-b ${border} ${isDark ? 'bg-[#000000]/80' : 'bg-[#ffffff]/80'} backdrop-blur-xl`}>
        <div className="h-full flex items-center justify-between px-4 md:px-6">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <button onClick={() => setActiveTab('overview')} className="flex items-center gap-0">
              <span className={`text-sm tracking-tight ${text}`} style={{ letterSpacing: '-0.03em' }}>
                U<span className="text-purple-500">next</span>
              </span>
            </button>
            <span className={`text-sm ${textFaint}`}>/</span>
            <span className={`text-xs ${text} truncate max-w-[150px]`}>
              {userType === 'student' ? (userName || 'Juan Díaz') : (userName || 'Mi Empresa')}
            </span>
          </div>

          {/* Center: Nav Tabs */}
          <div className="hidden md:flex items-center gap-0.5">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                  activeTab === tab.id
                    ? `${text} ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f0f0f0]'}`
                    : `${textMuted} ${hoverBg}`
                }`}
              >
                {tab.id === 'ai' && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 mr-1.5 relative top-[-1px]" />
                )}
                {tab.label}
                {tab.id === 'messages' && (
                  <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 inline-block" />
                )}
              </button>
            ))}
          </div>

          {/* Right: Utilities */}
          <div className="flex items-center gap-1.5">
            {/* Search trigger */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-md border ${border} ${inputBg} text-xs ${textMuted} transition-colors ${hoverBg}`}
            >
              <Search className="w-3 h-3" />
              <span>Buscar...</span>
              <kbd className={`text-[9px] ${textFaint} px-1 py-0.5 rounded border ${border} ml-4`}>⌘K</kbd>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setShowNotifications(!showNotifications); setShowUserMenu(false); }}
                className={`p-1.5 rounded-md transition-colors relative ${textMuted} ${hoverBg}`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-purple-500 rounded-full" />
              </button>
              {showNotifications && (
                <div className={`absolute right-0 mt-1 w-72 rounded-lg border ${border} ${cardBg} overflow-hidden shadow-2xl z-50`} onClick={(e) => e.stopPropagation()}>
                  <div className={`px-3 py-2 text-xs ${text} border-b ${border}`}>Notificaciones</div>
                  {notifications.map((n) => (
                    <div key={n.id} className={`px-3 py-2.5 flex items-start gap-2 border-b ${border} ${hoverBg} transition-colors cursor-pointer`}>
                      {!n.read && <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1 flex-shrink-0" />}
                      <div className={`flex-1 ${n.read ? 'ml-3.5' : ''}`}>
                        <span className={`text-xs ${text}`}>{n.title}</span>
                        <span className={`block text-[10px] ${textFaint}`}>Hace {n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button onClick={() => setIsDark(!isDark)} className={`p-1.5 rounded-md transition-colors ${textMuted} ${hoverBg}`}>
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            {/* User Avatar */}
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setShowUserMenu(!showUserMenu); setShowNotifications(false); }}
                className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white text-[10px] ring-1 ring-white/10 hover:ring-white/20 transition-all font-medium"
              >
                {userName ? userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'JD'}
              </button>
              {showUserMenu && (
                <div className={`absolute right-0 mt-1 w-48 rounded-lg border ${border} ${cardBg} overflow-hidden shadow-2xl z-50`} onClick={(e) => e.stopPropagation()}>
                  <div className={`px-3 py-2.5 border-b ${border}`}>
                    <span className={`text-xs ${text} block truncate`}>{userName || 'Juan Díaz'}</span>
                    <span className={`text-[10px] ${textFaint} block truncate`}>{userEmail || 'juan@email.com'}</span>
                  </div>
                  <button onClick={() => { setActiveTab('profile'); setShowUserMenu(false); }} className={`w-full flex items-center gap-2 text-left px-3 py-2 text-xs ${textMuted} ${hoverBg} transition-colors`}>
                    <User className="w-3 h-3" /> Mi Perfil
                  </button>
                  <button onClick={() => { setActiveTab('settings'); setShowUserMenu(false); }} className={`w-full flex items-center gap-2 text-left px-3 py-2 text-xs ${textMuted} ${hoverBg} transition-colors`}>
                    <Settings className="w-3 h-3" /> Configuración
                  </button>
                  <button onClick={() => { setShowUserMenu(false); logoutUser(); router.push('/'); }} className={`w-full flex items-center gap-2 text-left px-3 py-2 text-xs ${textMuted} ${hoverBg} transition-colors border-t ${border}`}>
                    <LogOut className="w-3 h-3" /> Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile tabs */}
        <div className={`md:hidden flex items-center gap-0.5 px-4 py-2 border-t ${border} ${isDark ? 'bg-[#000]' : 'bg-white'} overflow-x-auto`}>
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-md text-xs flex-shrink-0 transition-colors ${
                activeTab === tab.id
                  ? `${text} ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f0f0f0]'}`
                  : `${textMuted} ${hoverBg}`
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 overflow-y-auto">
        <div className={`max-w-6xl mx-auto p-6 md:p-8 ${activeTab === 'ai' ? 'h-[calc(100vh-48px)] flex flex-col' : ''}`}>
          <AnimatePresence mode="wait">

            {/* ===== OVERVIEW ===== */}
            {activeTab === 'overview' && (
              <motion.div key="overview" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} className="space-y-4">
                <div className="mb-2">
                  <h1 className={`text-lg ${text} tracking-tight`}>Buen día, {userName ? userName.split(' ')[0] : 'Juan'}</h1>
                  <p className={`text-xs ${textMuted}`}>Aquí tienes un resumen de tu actividad</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <div key={i} className={`p-4 rounded-lg border ${border} ${cardBg} transition-colors`}>
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-[11px] ${textMuted}`}>{stat.label}</span>
                          <Icon className={`w-3.5 h-3.5 ${textFaint}`} />
                        </div>
                        <div className={`text-xl ${text} tabular-nums tracking-tight`}>{stat.value}</div>
                        <div className="flex items-center gap-1 mt-1">
                          {stat.up ? <ArrowUp className="w-3 h-3 text-emerald-500" /> : <ArrowDown className="w-3 h-3 text-red-500" />}
                          <span className={`text-[10px] ${stat.up ? 'text-emerald-500' : 'text-red-500'}`}>{stat.change}</span>
                          <span className={`text-[10px] ${textFaint}`}>vs mes anterior</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Chart + Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  <div className={`lg:col-span-2 p-5 rounded-lg border ${border} ${cardBg}`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs ${text}`}>Actividad · Últimos 6 meses</span>
                      <div className="flex items-center gap-3 text-[10px]">
                        <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-purple-500 rounded" /> Aplicaciones</span>
                        <span className={`flex items-center gap-1 ${textMuted}`}><span className="w-2 h-0.5 bg-emerald-500 rounded" /> Entrevistas</span>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={activityData}>
                        <defs>
                          <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={isDark ? 0.2 : 0.1} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="gE" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#34d399" stopOpacity={isDark ? 0.12 : 0.06} />
                            <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1a1a1a' : '#eee'} />
                        <XAxis dataKey="name" tick={{ fill: isDark ? '#555' : '#999', fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: isDark ? '#555' : '#999', fontSize: 10 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: isDark ? '#111' : '#fff', border: `1px solid ${isDark ? '#333' : '#eaeaea'}`, borderRadius: '6px', fontSize: '11px', boxShadow: 'none' }} />
                        <Area type="monotone" dataKey="aplicaciones" stroke="#8b5cf6" strokeWidth={1.5} fill="url(#gA)" />
                        <Area type="monotone" dataKey="entrevistas" stroke="#34d399" strokeWidth={1.5} fill="url(#gE)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className={`p-5 rounded-lg border ${border} ${cardBg}`}>
                    <span className={`text-xs ${text} block mb-3`}>Actividad Reciente</span>
                    <div className="space-y-0.5">
                      {recentActivity.map((a) => (
                        <div key={a.id} className={`flex items-start gap-2.5 py-2 rounded-md px-2 ${hoverBg} transition-colors cursor-pointer`}>
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                            a.type === 'application' ? 'bg-purple-500' : a.type === 'view' ? 'bg-blue-500' :
                            a.type === 'message' ? 'bg-emerald-500' : a.type === 'interview' ? 'bg-amber-500' :
                            isDark ? 'bg-[#444]' : 'bg-[#ccc]'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <span className={`text-xs ${text} block truncate`}>{a.title}</span>
                            <span className={`text-[10px] ${textFaint}`}>Hace {a.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Weekly + Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className={`p-5 rounded-lg border ${border} ${cardBg}`}>
                    <span className={`text-xs ${text} block mb-3`}>Esta Semana</span>
                    <ResponsiveContainer width="100%" height={100}>
                      <BarChart data={weeklyData}>
                        <Bar dataKey="count" fill="#8b5cf6" radius={[3, 3, 0, 0]} opacity={0.6} />
                        <XAxis dataKey="day" tick={{ fill: isDark ? '#555' : '#999', fontSize: 9 }} axisLine={false} tickLine={false} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className={`p-5 rounded-lg border ${border} ${cardBg}`}>
                    <span className={`text-xs ${text} block mb-3`}>Tus Habilidades</span>
                    <div className="space-y-2.5">
                      {skillsData.map((s) => (
                        <div key={s.skill} className="flex items-center gap-3">
                          <span className={`text-[10px] w-16 ${textMuted}`} style={{ fontFamily: 'monospace' }}>{s.skill}</span>
                          <div className={`flex-1 h-1.5 rounded-full ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#eee]'}`}>
                            <div className="h-full rounded-full bg-purple-500 transition-all" style={{ width: `${s.level}%`, opacity: 0.7 }} />
                          </div>
                          <span className={`text-[10px] tabular-nums ${textFaint}`}>{s.level}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ===== OPPORTUNITIES ===== */}
            {activeTab === 'opportunities' && (
              <motion.div key="opportunities" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }}>
                <OpportunitiesPage isDark={isDark} />
              </motion.div>
            )}

            {/* ===== AI WORKSPACE ===== */}
            {activeTab === 'ai' && (
              <motion.div key="ai" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} className="flex-1 flex flex-col min-h-0">
                <AIWorkspace isDark={isDark} />
              </motion.div>
            )}

            {/* ===== MESSAGES ===== */}
            {activeTab === 'messages' && (
              <motion.div key="messages" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }}>
                <MessagesPage isDark={isDark} />
              </motion.div>
            )}

            {/* ===== PROFILE ===== */}
            {activeTab === 'profile' && (
              <motion.div key="profile" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }}>
                <ProfilePage isDark={isDark} onNavigateToSettings={() => setActiveTab('settings')} />
              </motion.div>
            )}

            {/* ===== SETTINGS ===== */}
            {activeTab === 'settings' && (
              <motion.div key="settings" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }}>
                <SettingsPage isDark={isDark} setIsDark={setIsDark} onLogout={() => { logoutUser(); router.push('/'); }} />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
