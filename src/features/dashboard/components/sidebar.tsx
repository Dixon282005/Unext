"use client";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  MoreVertical,
  User,
  ChevronLeft,
  Menu,
} from "lucide-react";

interface SidebarProps {
  isDark: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  userType: "student" | "company";
  userName: string;
  showProfileMenu: boolean;
  setShowProfileMenu: (show: boolean) => void;
  onLogout: () => void;
}

export function Sidebar({
  isDark,
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  userType,
  userName,
  showProfileMenu,
  setShowProfileMenu,
  onLogout,
}: SidebarProps) {
  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-0 md:w-20"
      } flex flex-col border-r transition-all duration-300 relative ${
        isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      } ${sidebarOpen ? "" : "md:items-center"} overflow-hidden`}
    >
      {!isDark && (
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 via-transparent to-purple-50/30 pointer-events-none" />
      )}

      {/* LOGO */}
      <div
        className={`h-16 flex items-center ${
          sidebarOpen ? "px-6" : "md:justify-center md:px-2"
        } border-b relative z-10 flex-shrink-0 ${
          isDark ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <h1
          className={`text-xl transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100" : "opacity-0 md:opacity-100"
          } ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {sidebarOpen ? (
            <>
              U<span className="text-purple-500">next</span>
            </>
          ) : (
            <span className="text-purple-500 hidden md:block">U</span>
          )}
        </h1>
      </div>

      {/* NAV LINKS */}
      <nav
        className={`flex-1 ${
          sidebarOpen ? "px-4" : "md:px-2"
        } py-6 space-y-1 relative z-10 overflow-y-auto`}
      >
        {/* Vista General */}
        <button
          onClick={() => setActiveTab("overview")}
          className={`w-full flex items-center ${
            sidebarOpen ? "gap-3 px-4" : "md:justify-center md:px-3"
          } py-3 rounded-xl transition-all duration-200 ${
            activeTab === "overview"
              ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
              : isDark
              ? "text-gray-400 hover:text-white hover:bg-gray-800"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
          title={!sidebarOpen ? "Vista General" : ""}
        >
          <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
          <span
            className={`transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0 md:hidden"
            }`}
          >
            Vista General
          </span>
        </button>

        {/* Jobs */}
        <button
          onClick={() => setActiveTab("jobs")}
          className={`w-full flex items-center ${
            sidebarOpen ? "gap-3 px-4" : "md:justify-center md:px-3"
          } py-3 rounded-xl transition-all duration-200 ${
            activeTab === "jobs"
              ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
              : isDark
              ? "text-gray-400 hover:text-white hover:bg-gray-800"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
          title={!sidebarOpen ? "Oportunidades" : ""}
        >
          <Briefcase className="w-5 h-5 flex-shrink-0" />
          <span
            className={`transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0 md:hidden"
            }`}
          >
            {userType === "student" ? "Oportunidades" : "Mis Ofertas"}
          </span>
        </button>

        {/* Candidates (Solo empresa) */}
        {userType === "company" && (
          <button
            onClick={() => setActiveTab("candidates")}
            className={`w-full flex items-center ${
              sidebarOpen ? "gap-3 px-4" : "md:justify-center md:px-3"
            } py-3 rounded-xl transition-all duration-200 ${
              activeTab === "candidates"
                ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                : isDark
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
            title={!sidebarOpen ? "Candidatos" : ""}
          >
            <Users className="w-5 h-5 flex-shrink-0" />
            <span
              className={`transition-opacity duration-300 ${
                sidebarOpen ? "opacity-100" : "opacity-0 md:hidden"
              }`}
            >
              Candidatos
            </span>
          </button>
        )}

        {/* Mensajes */}
        <button
          onClick={() => setActiveTab("messages")}
          className={`w-full flex items-center ${
            sidebarOpen ? "gap-3 px-4" : "md:justify-center md:px-3"
          } py-3 rounded-xl transition-all duration-200 relative ${
            activeTab === "messages"
              ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
              : isDark
              ? "text-gray-400 hover:text-white hover:bg-gray-800"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
          title={!sidebarOpen ? "Mensajes" : ""}
        >
          <MessageSquare className="w-5 h-5 flex-shrink-0" />
          <span
            className={`transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0 md:hidden"
            }`}
          >
            Mensajes
          </span>
          <span
            className={`absolute ${
              sidebarOpen ? "right-4 top-3" : "md:right-2 md:top-2"
            } w-2 h-2 bg-red-500 rounded-full`}
          ></span>
        </button>

        {/* Settings */}
        <div
          className={`pt-4 mt-4 border-t ${
            isDark ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center ${
              sidebarOpen ? "gap-3 px-4" : "md:justify-center md:px-3"
            } py-3 rounded-xl transition-all duration-200 ${
              activeTab === "settings"
                ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                : isDark
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
            title={!sidebarOpen ? "Configuración" : ""}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span
              className={`transition-opacity duration-300 ${
                sidebarOpen ? "opacity-100" : "opacity-0 md:hidden"
              }`}
            >
              Configuración
            </span>
          </button>
        </div>
      </nav>

      {/* FOOTER USER */}
      <div
        className={`border-t p-4 relative z-10 flex-shrink-0 ${
          isDark ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`w-full flex items-center ${
              sidebarOpen ? "gap-3" : "md:justify-center"
            } p-3 rounded-xl transition-all duration-200 ${
              isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
              {userType === "student" ? "JD" : "ME"}
            </div>
            {sidebarOpen && (
              <>
                <div className="flex-1 text-left overflow-hidden">
                  <p
                    className={`truncate ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {userName}
                  </p>
                  <p
                    className={`text-xs truncate ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {userType === "student" ? "Estudiante" : "Empresa"}
                  </p>
                </div>
                <MoreVertical
                  className={`w-4 h-4 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </>
            )}
          </button>

          {showProfileMenu && (
            <div
              className={`absolute bottom-full ${
                sidebarOpen ? "left-0 right-0" : "md:left-0 md:w-48"
              } mb-2 rounded-xl shadow-2xl border overflow-hidden z-50 ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <button
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                  isDark
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Mi Perfil</span>
              </button>
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
