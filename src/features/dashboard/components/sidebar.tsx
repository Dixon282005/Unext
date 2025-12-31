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
  Menu, // Importamos el icono de menú para abrir
  X,    // Importamos X para cerrar
  ChevronLeft
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
    <>
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR MAIN CONTAINER */}
      <aside
        className={`fixed md:relative z-40 h-full flex flex-col border-r transition-all duration-300 ${
          sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full md:translate-x-0 md:w-20"
        } ${
          isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
        }`}
      >
        {/* Fondo decorativo */}
        {!isDark && (
          <div className="absolute inset-0 bg-linear-to-b from-purple-50/50 via-transparent to-purple-50/30 pointer-events-none" />
        )}

        {/* --- HEADER DEL SIDEBAR (LOGO Y TOGGLE) --- */}
        <div
          className={`h-16 flex items-center justify-between px-4 border-b relative z-10 shrink-0 ${
            isDark ? "border-gray-800" : "border-gray-200"
          }`}
        >
          {/* Lógica del Logo: Si está abierto muestra nombre completo, si no, solo la U (en desktop) */}
          <div className={`flex items-center ${!sidebarOpen && "md:justify-center w-full"}`}>
             {(sidebarOpen || (typeof window !== 'undefined' && window.innerWidth < 768)) ? (
               <h1 className={`text-xl font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                 <span className="bg-purple-600 text-white w-8 h-8 rounded-lg flex items-center justify-center">U</span>
                 <span className={`${!sidebarOpen && "hidden"}`}>next</span>
               </h1>
             ) : (
               <span className="text-2xl font-bold text-purple-500">U</span>
             )}
          </div>

      {/* Botón de Cerrar (X) - Solo visible si la barra está abierta */}
        {sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(false)}
            className={`p-1 rounded-lg transition-colors ${
              isDark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

        {/* Botón para ABRIR (Solo visible si está cerrado en desktop) */}
        {!sidebarOpen && (
          <div className="hidden md:flex w-full justify-center py-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className={`p-2 rounded-xl transition-colors ${isDark ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600"}`}
              >
                 <Menu className="w-6 h-6" />
              </button>
          </div>
        )}

      {/* --- NAVEGACIÓN --- */}
      {/* Usamos overflow-x-hidden para que el texto no "baile" al cerrar */}
      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto overflow-x-hidden relative z-10">
        
        <SidebarItem 
           icon={LayoutDashboard} 
           label="Vista General" 
           isActive={activeTab === "overview"} 
           onClick={() => setActiveTab("overview")}
           isOpen={sidebarOpen} isDark={isDark} 
        />

        <SidebarItem 
           icon={Briefcase} 
           label={userType === "student" ? "Oportunidades" : "Mis Ofertas"} 
           isActive={activeTab === "jobs"} 
           onClick={() => setActiveTab("jobs")}
           isOpen={sidebarOpen} isDark={isDark} 
        />

        {userType === "company" && (
          <SidebarItem 
             icon={Users} 
             label="Candidatos" 
             isActive={activeTab === "candidates"} 
             onClick={() => setActiveTab("candidates")}
             isOpen={sidebarOpen} isDark={isDark} 
          />
        )}

        <SidebarItem 
           icon={MessageSquare} 
           label="Mensajes" 
           isActive={activeTab === "messages"} 
           onClick={() => setActiveTab("messages")}
           isOpen={sidebarOpen} isDark={isDark} 
           hasNotification
        />

        <div className={`pt-4 mt-4 border-t ${isDark ? "border-gray-800" : "border-gray-200"}`}>
            <SidebarItem 
               icon={Settings} 
               label="Configuración" 
               isActive={activeTab === "settings"} 
               onClick={() => setActiveTab("settings")}
               isOpen={sidebarOpen} isDark={isDark} 
            />
        </div>
      </nav>

      {/* --- FOOTER USER (PERFIL) --- */}
      <div className={`p-4 border-t relative z-20 ${isDark ? "border-gray-800" : "border-gray-200"}`}>
        <div className="relative">
          
          {/* Botón del Perfil */}
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`w-full flex items-center ${
              sidebarOpen ? "gap-3 px-2" : "justify-center md:justify-center"
            } py-2 rounded-xl transition-all duration-200 ${
              isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shrink-0 font-bold shadow-md">
              {userName.substring(0, 2).toUpperCase()}
            </div>
            
            {(sidebarOpen) && (
              <>
                <div className="flex-1 text-left overflow-hidden">
                  <p className={`truncate text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                    {userName}
                  </p>
                  <p className={`text-xs truncate ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {userType === "student" ? "Estudiante" : "Empresa"}
                  </p>
                </div>
                <MoreVertical className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
              </>
            )}
          </button>

          {/* --- MENÚ FLOTANTE (Aquí arreglamos el bug) --- */}
          {showProfileMenu && (
            <>
                {/* Fondo invisible para cerrar al hacer clic fuera */}
                <div className="fixed inset-0 z-30" onClick={() => setShowProfileMenu(false)} />
                
                <div
                className={`absolute z-40 mb-2 rounded-xl shadow-2xl border overflow-hidden min-w-[180px] transition-all duration-200 ${
                    isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                } ${
                    sidebarOpen 
                    ? "bottom-full left-0 w-full" // Si está abierto: Sube hacia arriba normal
                    : "left-14 bottom-0 ml-2"     // Si está cerrado: Sale hacia la DERECHA (Fixed Bug)
                }`}
                >
                <button className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-50 text-gray-700"}`}>
                    <User className="w-4 h-4" />
                    <span>Mi Perfil</span>
                </button>
                <div className={`h-px ${isDark ? "bg-gray-700" : "bg-gray-100"}`} />
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Cerrar Sesión</span>
                </button>
                </div>
            </>
          )}
        </div>
      </div>
      </aside>
    </>
  );
}

// --- SUBCOMPONENTE DE ITEM (Para limpiar el código) ---
function SidebarItem({ icon: Icon, label, isActive, onClick, isOpen, isDark, hasNotification }: any) {
    return (
        <button
          onClick={onClick}
          title={!isOpen ? label : ""} // Tooltip nativo cuando está cerrado
          className={`group w-full flex items-center ${
            isOpen ? "gap-3 px-3" : "justify-center"
          } py-3 rounded-xl transition-all duration-200 relative ${
            isActive
              ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
              : isDark
              ? "text-gray-400 hover:text-white hover:bg-gray-800"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <Icon className={`w-5 h-5 shrink-0 ${!isActive && "group-hover:scale-110 transition-transform"}`} />
          
          {isOpen && (
             <span className="truncate font-medium text-sm animate-in fade-in duration-200">
                {label}
             </span>
          )}

          {/* Indicador de notificación (Punto rojo) */}
          {hasNotification && (
             <span className={`absolute ${isOpen ? "right-3 top-1/2 -translate-y-1/2" : "top-2 right-2"} w-2 h-2 bg-red-500 rounded-full border-2 ${isDark ? "border-gray-900" : "border-white"}`} />
          )}
        </button>
    )
}