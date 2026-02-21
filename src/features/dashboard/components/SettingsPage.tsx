import { useState } from 'react';
import { motion } from 'motion/react';
import {
  User, Link2, Globe, Github, Linkedin, BellRing, Palette,
  Shield, LogOut, Moon, Sun, Monitor, Trash2, AlertTriangle,
  Smartphone, Key, Mail, Eye, EyeOff, CheckCircle2, Download,
  CreditCard, Zap
} from 'lucide-react';

interface SettingsPageProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  onLogout: () => void;
}

export function SettingsPage({ isDark, setIsDark, onLogout }: SettingsPageProps) {
  const [activeSection, setActiveSection] = useState('profile');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [notifSettings, setNotifSettings] = useState({
    messages: true,
    opportunities: true,
    profileViews: false,
    updates: false,
    email: true,
    push: true,
  });
  const [showCurrentPw, setShowCurrentPw] = useState(false);

  const border = isDark ? 'border-[#333]' : 'border-[#eaeaea]';
  const text = isDark ? 'text-white' : 'text-black';
  const textMuted = isDark ? 'text-[#888]' : 'text-[#666]';
  const textFaint = isDark ? 'text-[#555]' : 'text-[#999]';
  const hoverBg = isDark ? 'hover:bg-[#111]' : 'hover:bg-[#f5f5f5]';
  const cardBg = isDark ? 'bg-[#0a0a0a]' : 'bg-white';
  const inputBg = isDark ? 'bg-[#111]' : 'bg-[#fafafa]';

  const sections = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'links', label: 'Enlaces', icon: Link2 },
    { id: 'notifications', label: 'Notificaciones', icon: BellRing },
    { id: 'appearance', label: 'Apariencia', icon: Palette },
    { id: 'security', label: 'Seguridad', icon: Shield },
    { id: 'connected', label: 'Cuentas conectadas', icon: Zap },
    { id: 'danger', label: 'Zona de peligro', icon: AlertTriangle },
  ];

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative w-9 h-5 rounded-full transition-colors ${checked ? 'bg-purple-500' : isDark ? 'bg-[#333]' : 'bg-[#ccc]'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-4' : ''}`} />
    </button>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-2">
        <h1 className={`text-lg ${text} tracking-tight`}>Configuración</h1>
        <p className={`text-xs ${textMuted}`}>Administra tu cuenta y preferencias</p>
      </div>

      {/* Navigation pills */}
      <div className={`flex items-center gap-1 overflow-x-auto pb-2 -mx-1 px-1`}>
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs flex-shrink-0 transition-colors ${
                activeSection === s.id
                  ? `${text} ${isDark ? 'bg-[#1a1a1a]' : 'bg-[#f0f0f0]'}`
                  : `${textMuted} ${hoverBg}`
              } ${s.id === 'danger' ? 'text-red-400' : ''}`}
            >
              <Icon className="w-3 h-3" />
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Profile Settings */}
      {activeSection === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="space-y-6"
        >
          <div className={`p-6 rounded-lg border ${border} ${cardBg}`}>
            <div className="flex items-center gap-2 mb-5">
              <User className={`w-4 h-4 ${textFaint}`} />
              <span className={`text-xs ${text}`}>Información Personal</span>
            </div>
            <div className="space-y-4">
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white text-xl ring-2 ring-purple-500/20">
                  JD
                </div>
                <div>
                  <button className="px-3 py-1.5 rounded-md text-xs bg-purple-500 text-white hover:bg-purple-600 transition-colors">
                    Cambiar foto
                  </button>
                  <p className={`text-[10px] ${textFaint} mt-1`}>JPG, PNG o GIF · Máx 2MB</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[11px] mb-1.5 ${textMuted}`}>Nombre</label>
                  <input type="text" defaultValue="Juan" className={`w-full px-3 py-2 text-xs rounded-md border ${border} ${inputBg} ${text} focus:outline-none focus:border-purple-500/50 transition-colors`} />
                </div>
                <div>
                  <label className={`block text-[11px] mb-1.5 ${textMuted}`}>Apellido</label>
                  <input type="text" defaultValue="Díaz" className={`w-full px-3 py-2 text-xs rounded-md border ${border} ${inputBg} ${text} focus:outline-none focus:border-purple-500/50 transition-colors`} />
                </div>
              </div>
              <div>
                <label className={`block text-[11px] mb-1.5 ${textMuted}`}>Email</label>
                <input type="email" defaultValue="juan@email.com" className={`w-full px-3 py-2 text-xs rounded-md border ${border} ${inputBg} ${text} focus:outline-none focus:border-purple-500/50 transition-colors`} />
              </div>
              <div>
                <label className={`block text-[11px] mb-1.5 ${textMuted}`}>Título profesional</label>
                <input type="text" defaultValue="Frontend Developer" className={`w-full px-3 py-2 text-xs rounded-md border ${border} ${inputBg} ${text} focus:outline-none focus:border-purple-500/50 transition-colors`} />
              </div>
              <div>
                <label className={`block text-[11px] mb-1.5 ${textMuted}`}>Bio</label>
                <textarea rows={3} defaultValue="Desarrollador frontend con 2+ años de experiencia en React, TypeScript y sistemas de diseño. Enfocado en rendimiento, accesibilidad y experiencias de usuario excepcionales." className={`w-full px-3 py-2 text-xs rounded-md border ${border} ${inputBg} ${text} resize-none focus:outline-none focus:border-purple-500/50 transition-colors`} />
                <p className={`text-[10px] ${textFaint} mt-1`}>Máximo 300 caracteres</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[11px] mb-1.5 ${textMuted}`}>Universidad</label>
                  <input type="text" defaultValue="UNAM" className={`w-full px-3 py-2 text-xs rounded-md border ${border} ${inputBg} ${text} focus:outline-none focus:border-purple-500/50 transition-colors`} />
                </div>
                <div>
                  <label className={`block text-[11px] mb-1.5 ${textMuted}`}>Ubicación</label>
                  <input type="text" defaultValue="Ciudad de México" className={`w-full px-3 py-2 text-xs rounded-md border ${border} ${inputBg} ${text} focus:outline-none focus:border-purple-500/50 transition-colors`} />
                </div>
              </div>
              <div>
                <label className={`block text-[11px] mb-1.5 ${textMuted}`}>Disponibilidad</label>
                <select className={`w-full px-3 py-2 text-xs rounded-md border ${border} ${inputBg} ${text} focus:outline-none focus:border-purple-500/50 transition-colors`}>
                  <option>Disponible para ofertas</option>
                  <option>Buscando activamente</option>
                  <option>No disponible</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Links */}
      {activeSection === 'links' && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className={`p-6 rounded-lg border ${border} ${cardBg}`}>
            <div className="flex items-center gap-2 mb-5">
              <Link2 className={`w-4 h-4 ${textFaint}`} />
              <span className={`text-xs ${text}`}>Enlaces y Redes Sociales</span>
            </div>
            <div className="space-y-3">
              {[
                { icon: Globe, label: 'Sitio web', value: 'https://juandiaz.dev', placeholder: 'https://tu-sitio.com' },
                { icon: Github, label: 'GitHub', value: 'github.com/juandiaz', placeholder: 'github.com/usuario' },
                { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/juandiaz', placeholder: 'linkedin.com/in/usuario' },
                { icon: Mail, label: 'Email público', value: 'hola@juandiaz.dev', placeholder: 'tu@email.com' },
              ].map((link, i) => {
                const Icon = link.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <Icon className={`w-3.5 h-3.5 ${textFaint} flex-shrink-0`} />
                    <div className="flex-1">
                      <label className={`block text-[10px] mb-1 ${textFaint}`}>{link.label}</label>
                      <input type="text" defaultValue={link.value} placeholder={link.placeholder} className={`w-full px-3 py-2 text-xs rounded-md border ${border} ${inputBg} ${text} focus:outline-none focus:border-purple-500/50 transition-colors`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Notifications */}
      {activeSection === 'notifications' && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="space-y-4"
        >
          <div className={`p-6 rounded-lg border ${border} ${cardBg}`}>
            <div className="flex items-center gap-2 mb-5">
              <BellRing className={`w-4 h-4 ${textFaint}`} />
              <span className={`text-xs ${text}`}>Notificaciones en App</span>
            </div>
            <div className="space-y-4">
              {[
                { key: 'messages' as const, label: 'Nuevos mensajes', desc: 'Notificaciones de mensajes directos de empresas' },
                { key: 'opportunities' as const, label: 'Nuevas oportunidades', desc: 'Vacantes que coinciden con tu perfil y habilidades' },
                { key: 'profileViews' as const, label: 'Vistas de perfil', desc: 'Cuando una empresa o recruiter ve tu perfil' },
                { key: 'updates' as const, label: 'Actualizaciones', desc: 'Novedades, mejoras y tips de Unext' },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between">
                  <div>
                    <span className={`text-xs ${text} block`}>{n.label}</span>
                    <span className={`text-[10px] ${textFaint}`}>{n.desc}</span>
                  </div>
                  <Toggle checked={notifSettings[n.key]} onChange={() => setNotifSettings(prev => ({ ...prev, [n.key]: !prev[n.key] }))} />
                </div>
              ))}
            </div>
          </div>

          <div className={`p-6 rounded-lg border ${border} ${cardBg}`}>
            <div className="flex items-center gap-2 mb-5">
              <Mail className={`w-4 h-4 ${textFaint}`} />
              <span className={`text-xs ${text}`}>Canales de notificación</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className={`w-3.5 h-3.5 ${textFaint}`} />
                  <div>
                    <span className={`text-xs ${text} block`}>Email</span>
                    <span className={`text-[10px] ${textFaint}`}>juan@email.com</span>
                  </div>
                </div>
                <Toggle checked={notifSettings.email} onChange={() => setNotifSettings(prev => ({ ...prev, email: !prev.email }))} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className={`w-3.5 h-3.5 ${textFaint}`} />
                  <div>
                    <span className={`text-xs ${text} block`}>Push notifications</span>
                    <span className={`text-[10px] ${textFaint}`}>Navegador y móvil</span>
                  </div>
                </div>
                <Toggle checked={notifSettings.push} onChange={() => setNotifSettings(prev => ({ ...prev, push: !prev.push }))} />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Appearance */}
      {activeSection === 'appearance' && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className={`p-6 rounded-lg border ${border} ${cardBg}`}>
            <div className="flex items-center gap-2 mb-5">
              <Palette className={`w-4 h-4 ${textFaint}`} />
              <span className={`text-xs ${text}`}>Apariencia</span>
            </div>
            <div className="space-y-5">
              <div>
                <span className={`text-xs ${text} block mb-3`}>Tema</span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'dark', label: 'Oscuro', icon: Moon, active: isDark },
                    { id: 'light', label: 'Claro', icon: Sun, active: !isDark },
                    { id: 'system', label: 'Sistema', icon: Monitor, active: false },
                  ].map(theme => {
                    const Icon = theme.icon;
                    return (
                      <button
                        key={theme.id}
                        onClick={() => {
                          if (theme.id === 'dark') setIsDark(true);
                          else if (theme.id === 'light') setIsDark(false);
                        }}
                        className={`p-4 rounded-lg border text-center transition-all ${theme.active
                          ? 'border-purple-500 bg-purple-500/5'
                          : `${border} ${hoverBg}`
                          }`}
                      >
                        <Icon className={`w-5 h-5 mx-auto mb-2 ${theme.active ? 'text-purple-400' : textFaint}`} />
                        <span className={`text-xs ${theme.active ? 'text-purple-400' : textMuted}`}>{theme.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className={`pt-4 border-t ${border}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-xs ${text} block`}>Animaciones reducidas</span>
                    <span className={`text-[10px] ${textFaint}`}>Reduce las animaciones de la interfaz</span>
                  </div>
                  <Toggle checked={false} onChange={() => {}} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Security */}
      {activeSection === 'security' && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="space-y-4"
        >
          <div className={`p-6 rounded-lg border ${border} ${cardBg}`}>
            <div className="flex items-center gap-2 mb-5">
              <Key className={`w-4 h-4 ${textFaint}`} />
              <span className={`text-xs ${text}`}>Cambiar contraseña</span>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`block text-[11px] mb-1.5 ${textMuted}`}>Contraseña actual</label>
                <div className="relative">
                  <input
                    type={showCurrentPw ? 'text' : 'password'}
                    defaultValue="password123"
                    className={`w-full px-3 py-2 text-xs rounded-md border ${border} ${inputBg} ${text} focus:outline-none focus:border-purple-500/50 transition-colors pr-10`}
                  />
                  <button
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 ${textFaint}`}
                  >
                    {showCurrentPw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[11px] mb-1.5 ${textMuted}`}>Nueva contraseña</label>
                  <input type="password" placeholder="••••••••" className={`w-full px-3 py-2 text-xs rounded-md border ${border} ${inputBg} ${text} focus:outline-none focus:border-purple-500/50 transition-colors`} />
                </div>
                <div>
                  <label className={`block text-[11px] mb-1.5 ${textMuted}`}>Confirmar contraseña</label>
                  <input type="password" placeholder="••••••••" className={`w-full px-3 py-2 text-xs rounded-md border ${border} ${inputBg} ${text} focus:outline-none focus:border-purple-500/50 transition-colors`} />
                </div>
              </div>
              <button className="px-4 py-2 rounded-md text-xs bg-purple-500 text-white hover:bg-purple-600 transition-colors">
                Actualizar contraseña
              </button>
            </div>
          </div>

          <div className={`p-6 rounded-lg border ${border} ${cardBg}`}>
            <div className="flex items-center gap-2 mb-5">
              <Shield className={`w-4 h-4 ${textFaint}`} />
              <span className={`text-xs ${text}`}>Autenticación de dos factores</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className={`text-xs ${text} block`}>2FA no habilitado</span>
                <span className={`text-[10px] ${textFaint}`}>Agrega una capa extra de seguridad a tu cuenta</span>
              </div>
              <button className={`px-3 py-1.5 rounded-md text-xs border ${border} ${textMuted} ${hoverBg} transition-colors`}>
                Habilitar 2FA
              </button>
            </div>
          </div>

          <div className={`p-6 rounded-lg border ${border} ${cardBg}`}>
            <div className="flex items-center gap-2 mb-5">
              <Smartphone className={`w-4 h-4 ${textFaint}`} />
              <span className={`text-xs ${text}`}>Sesiones activas</span>
            </div>
            <div className="space-y-3">
              {[
                { device: 'Chrome — macOS', location: 'CDMX, México', current: true, time: 'Ahora' },
                { device: 'Safari — iPhone', location: 'CDMX, México', current: false, time: 'Hace 2 horas' },
              ].map((session, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-[#111]' : 'bg-[#f8f8f8]'}`}>
                  <div className="flex items-center gap-3">
                    <Monitor className={`w-4 h-4 ${textFaint}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${text}`}>{session.device}</span>
                        {session.current && <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/10 text-emerald-400">Este dispositivo</span>}
                      </div>
                      <span className={`text-[10px] ${textFaint}`}>{session.location} · {session.time}</span>
                    </div>
                  </div>
                  {!session.current && (
                    <button className={`text-[10px] text-red-400 ${hoverBg} px-2 py-1 rounded transition-colors`}>
                      Cerrar sesión
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Connected Accounts */}
      {activeSection === 'connected' && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className={`p-6 rounded-lg border ${border} ${cardBg}`}>
            <div className="flex items-center gap-2 mb-5">
              <Zap className={`w-4 h-4 ${textFaint}`} />
              <span className={`text-xs ${text}`}>Cuentas conectadas</span>
            </div>
            <p className={`text-xs ${textMuted} mb-4`}>Conecta tus cuentas para importar datos y mejorar tu perfil.</p>
            <div className="space-y-3">
              {[
                { name: 'GitHub', icon: Github, connected: true, detail: 'juandiaz · 42 repos · 156 stars' },
                { name: 'LinkedIn', icon: Linkedin, connected: true, detail: 'Juan Díaz · 500+ conexiones' },
                { name: 'Google', icon: Globe, connected: false, detail: 'Sincroniza tu calendario' },
              ].map((account, i) => {
                const Icon = account.icon;
                return (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-lg border ${border} ${hoverBg} transition-colors`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${account.connected ? 'bg-purple-500/10' : isDark ? 'bg-[#1a1a1a]' : 'bg-[#f0f0f0]'}`}>
                        <Icon className={`w-4 h-4 ${account.connected ? 'text-purple-400' : textFaint}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs ${text}`}>{account.name}</span>
                          {account.connected && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                        </div>
                        <span className={`text-[10px] ${textFaint}`}>{account.detail}</span>
                      </div>
                    </div>
                    <button className={`px-3 py-1.5 rounded-md text-xs transition-colors ${account.connected
                      ? `border ${border} ${textMuted} ${hoverBg}`
                      : 'bg-purple-500 text-white hover:bg-purple-600'
                      }`}>
                      {account.connected ? 'Desconectar' : 'Conectar'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Danger Zone */}
      {activeSection === 'danger' && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="space-y-4"
        >
          <div className={`p-6 rounded-lg border ${isDark ? 'border-red-500/20' : 'border-red-200'} ${cardBg}`}>
            <div className="flex items-center gap-2 mb-5">
              <Download className={`w-4 h-4 ${textFaint}`} />
              <span className={`text-xs ${text}`}>Exportar datos</span>
            </div>
            <p className={`text-xs ${textMuted} mb-4`}>Descarga una copia de todos tus datos, incluyendo perfil, aplicaciones, mensajes y portfolio.</p>
            <button className={`px-4 py-2 rounded-md text-xs border ${border} ${textMuted} ${hoverBg} transition-colors`}>
              Solicitar exportación
            </button>
          </div>

          <div className={`p-6 rounded-lg border ${isDark ? 'border-red-500/20' : 'border-red-200'} ${cardBg}`}>
            <div className="flex items-center gap-2 mb-5">
              <LogOut className="w-4 h-4 text-red-400" />
              <span className={`text-xs ${text}`}>Cerrar todas las sesiones</span>
            </div>
            <p className={`text-xs ${textMuted} mb-4`}>Cierra sesión en todos los dispositivos excepto este.</p>
            <button onClick={onLogout} className="px-4 py-2 rounded-md text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
              Cerrar todas las sesiones
            </button>
          </div>

          <div className={`p-6 rounded-lg border ${isDark ? 'border-red-500/30' : 'border-red-300'} ${isDark ? 'bg-red-500/5' : 'bg-red-50'}`}>
            <div className="flex items-center gap-2 mb-5">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-xs text-red-400">Eliminar cuenta</span>
            </div>
            <p className={`text-xs ${textMuted} mb-4`}>
              Esta acción es irreversible. Se eliminará permanentemente tu cuenta, perfil, portfolio, aplicaciones, mensajes y todos los datos asociados.
            </p>
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 rounded-md text-xs bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Eliminar mi cuenta
              </button>
            ) : (
              <div className={`p-4 rounded-lg border ${isDark ? 'border-red-500/30' : 'border-red-300'} ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
                <p className={`text-xs ${text} mb-3`}>Escribe "ELIMINAR" para confirmar:</p>
                <input
                  type="text"
                  placeholder="ELIMINAR"
                  className={`w-full px-3 py-2 text-xs rounded-md border border-red-500/30 ${inputBg} ${text} focus:outline-none focus:border-red-500/50 transition-colors mb-3`}
                />
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 rounded-md text-xs bg-red-500 text-white hover:bg-red-600 transition-colors">
                    Confirmar eliminación
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className={`px-4 py-2 rounded-md text-xs border ${border} ${textMuted} ${hoverBg} transition-colors`}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Save button */}
      {['profile', 'links', 'notifications'].includes(activeSection) && (
        <div className="flex items-center justify-between pt-2 pb-8">
          <button className={`px-4 py-2 rounded-md text-xs border ${border} ${textMuted} ${hoverBg} transition-colors`}>Cancelar</button>
          <button className="px-4 py-2 rounded-md text-xs bg-purple-500 text-white hover:bg-purple-600 transition-colors">Guardar cambios</button>
        </div>
      )}
    </div>
  );
}
