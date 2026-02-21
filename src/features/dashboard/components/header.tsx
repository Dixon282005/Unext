"use client";

import { 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  Menu, 
  ChevronLeft,
  MessageSquare,
  Eye,
  Calendar,
  CheckCircle2 
} from "lucide-react";

interface HeaderProps {
  sidebarOpen?: boolean;
  setSidebarOpen: (open: boolean) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  activeTab: string;
  userType: "student" | "company";
  userName: string;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  // Pasamos los datos de notificaciones (puedes tiparlos mejor luego)
  notifications: any[]; 
}

export function Header({
  sidebarOpen,
  setSidebarOpen,
  isDark,
  setIsDark,
  activeTab,
  userType,
  userName,
  showNotifications,
  setShowNotifications,
  notifications
}: HeaderProps) {

  // Función auxiliar para traducir el nombre del tab al español
  const getTabTitle = () => {
    switch(activeTab) {
      case "overview": return "Vista General";
      case "feed": return "Inicio";
      case "jobs": return userType === "student" ? "Oportunidades" : "Mis Vacantes";
      case "candidates": return "Candidatos";
      case "messages": return "Mensajes";
      case "settings": return "Configuración";
      default: return "";
    }
  };

  return (
    <header
      className={`h-16 border-b flex items-center justify-between px-4 md:px-8 shrink-0 ${
        isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Toggle para móvil */}
        <button
          onClick={() => setSidebarOpen(true)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            isDark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Título de la sección actual */}
        <div className="hidden md:block">
          <h2 className={`text-xl ${isDark ? "text-white" : "text-gray-900"}`}>
            {getTabTitle()}
          </h2>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Bienvenido de vuelta, {userName}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Buscador - Visible en MD+ */}
        <div className="relative hidden md:block">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}
          />
          <input
            type="text"
            placeholder="Buscar..."
            className={`pl-10 pr-4 py-2 rounded-lg w-48 lg:w-64 transition-all duration-200 ${
              isDark
                ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-purple-500"
                : "bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500"
            } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
          />
        </div>

        {/* Botón de búsqueda móvil */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${
            isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Toggle Dark Mode */}
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-2 rounded-lg transition-all duration-200 ${
            isDark
              ? "hover:bg-gray-800 text-gray-400 hover:text-white"
              : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
          }`}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notificaciones */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-lg transition-all duration-200 ${
              isDark
                ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full"></span>
          </button>

          {/* Dropdown de Notificaciones */}
          {showNotifications && (
            <div
              className={`absolute right-0 top-full mt-2 w-80 md:w-96 rounded-xl shadow-2xl border overflow-hidden z-50 ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className={`p-4 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                <h3 className={`text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
                  Notificaciones
                </h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => {
                  const Icon = notif.icon; // Esto asume que pasas el componente icono, si da error avísame
                  return (
                    <div
                      key={notif.id}
                      className={`p-4 border-b transition-colors ${
                        isDark
                          ? "border-gray-700 hover:bg-gray-750"
                          : "border-gray-100 hover:bg-gray-50"
                      } ${!notif.read ? (isDark ? "bg-gray-750" : "bg-purple-50/30") : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg shrink-0 ${isDark ? "bg-purple-500/10" : "bg-purple-50"}`}>
                          <Icon className="w-4 h-4 text-purple-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
                            {notif.title}
                          </p>
                          <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                            hace {notif.time}
                          </p>
                        </div>
                        {!notif.read && (
                          <div className="w-2 h-2 bg-purple-500 rounded-full shrink-0 mt-1"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={`p-3 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                <button className="w-full text-center text-purple-500 text-sm hover:text-purple-400 transition-colors">
                  Ver todas las notificaciones
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}