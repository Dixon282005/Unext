"use client";

import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  CreditCard, 
  ChevronLeft, 
  Building,
  Phone
} from "lucide-react";

interface SettingsViewProps {
  userType: "student" | "company";
  userName: string;
  isDark: boolean;
}

export function SettingsView({ userType, userName, isDark }: SettingsViewProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className={`p-6 md:p-8 rounded-2xl border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
        
        {/* --- HEADER DEL PERFIL --- */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-purple-500/20">
            {userName.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
              {userName}
            </h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
              {userType === "student" ? "Estudiante • Ingeniería en Sistemas" : "Empresa • Tecnología"}
            </p>
          </div>
          <button className={`ml-auto px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${isDark ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            Editar Perfil
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* --- COLUMNA IZQUIERDA: INFORMACIÓN --- */}
          <div className="space-y-4">
            <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              Información {userType === "company" ? "de la Empresa" : "Personal"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className={`block text-xs uppercase tracking-wider mb-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                  {userType === "company" ? "Nombre Comercial" : "Nombre Completo"}
                </label>
                <div className="relative">
                    <input
                      type="text"
                      defaultValue={userName}
                      className={`w-full pl-10 px-4 py-2.5 rounded-lg text-sm ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"} border focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
                    />
                    <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        {userType === "company" ? <Building className="w-4 h-4"/> : <User className="w-4 h-4"/>}
                    </div>
                </div>
              </div>
              
              <div>
                <label className={`block text-xs uppercase tracking-wider mb-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                  Email
                </label>
                <div className="relative">
                    <input
                      type="email"
                      defaultValue="usuario@ejemplo.com"
                      className={`w-full pl-10 px-4 py-2.5 rounded-lg text-sm ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"} border focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
                    />
                    <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}/>
                </div>
              </div>

              <div>
                <label className={`block text-xs uppercase tracking-wider mb-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                  Teléfono
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    defaultValue="+58 412 123 4567"
                    className={`w-full pl-10 px-4 py-2.5 rounded-lg text-sm ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"} border focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
                  />
                  <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`}/>
                </div>
              </div>
            </div>
          </div>

          {/* --- COLUMNA DERECHA: PREFERENCIAS --- */}
          <div className="space-y-4">
            <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              Seguridad y Preferencias
            </h3>
            <div className="space-y-3">
              {/* Botón Contraseña */}
              <button className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${isDark ? "bg-gray-800 border-gray-700 hover:border-gray-600" : "bg-white border-gray-200 hover:border-gray-300"}`}>
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-purple-500" />
                  <div className="text-left">
                    <h4 className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Cambiar contraseña</h4>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Última actualización hace 3 meses</p>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 rotate-180 text-gray-400" />
              </button>

              {/* Botón Notificaciones */}
              <button className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${isDark ? "bg-gray-800 border-gray-700 hover:border-gray-600" : "bg-white border-gray-200 hover:border-gray-300"}`}>
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-purple-500" />
                  <div className="text-left">
                    <h4 className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Notificaciones</h4>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Gestionar alertas y correos</p>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 rotate-180 text-gray-400" />
              </button>

              {/* Botón Facturación */}
              <button className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${isDark ? "bg-gray-800 border-gray-700 hover:border-gray-600" : "bg-white border-gray-200 hover:border-gray-300"}`}>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-purple-500" />
                  <div className="text-left">
                    <h4 className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Facturación</h4>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Métodos de pago e historial</p>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 rotate-180 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* --- FOOTER DE ACCIONES --- */}
        <div className={`pt-6 border-t mt-6 flex justify-end gap-3 ${isDark ? "border-gray-800" : "border-gray-200"}`}>
          <button className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"}`}>
            Cancelar
          </button>
          <button className="px-6 py-2.5 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/20">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}