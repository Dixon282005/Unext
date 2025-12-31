"use client";

import { 
  Briefcase, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  Award, 
  CheckCircle2,
  MessageSquare // Agregado que faltaba para la actividad reciente
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

// Importamos la data. Asegúrate de que tu archivo se llame así.
import { 
  applicationData, 
  statusData, 
  studentJobs, 
  companyJobs, 
  recentActivity 
} from "@/features/dashboard/lib/mockdata";

interface OverviewViewProps {
  userType: "student" | "company";
  isDark: boolean;
}

export function OverviewView({ userType, isDark }: OverviewViewProps) {
  
  // Recuperamos la lógica: Si es estudiante ve empleos, si es empresa ve SUS vacantes
  const recentJobs = userType === "student" ? studentJobs.slice(0, 3) : companyJobs.slice(0, 3);

  // Helpers de estado (Los trajimos de vuelta para las etiquetas pequeñas)
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "paused": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "closed": return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Activa";
      case "paused": return "Pausada";
      case "closed": return "Cerrada";
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* --- 1. TARJETAS DE ESTADÍSTICAS (KPIs) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Card 1 */}
        <div className={`rounded-2xl p-4 md:p-6 border transition-all duration-200 hover:shadow-lg ${isDark ? "bg-gray-900 border-gray-800 hover:border-purple-500/50" : "bg-white border-gray-200 hover:border-purple-500/50 hover:shadow-purple-500/10"}`}>
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${isDark ? "bg-purple-500/10" : "bg-purple-50"}`}>
              <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm">
              <ArrowUp className="w-4 h-4" /> <span>12%</span>
            </div>
          </div>
          <h3 className={`text-2xl md:text-3xl mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
            {userType === "student" ? "47" : "23"}
          </h3>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {userType === "student" ? "Postulaciones activas" : "Vacantes publicadas"}
          </p>
        </div>

        {/* Card 2 */}
        <div className={`rounded-2xl p-4 md:p-6 border transition-all duration-200 hover:shadow-lg ${isDark ? "bg-gray-900 border-gray-800 hover:border-purple-500/50" : "bg-white border-gray-200 hover:border-purple-500/50 hover:shadow-purple-500/10"}`}>
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${isDark ? "bg-cyan-500/10" : "bg-cyan-50"}`}>
              <Eye className="w-5 h-5 md:w-6 md:h-6 text-cyan-500" />
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm">
              <ArrowUp className="w-4 h-4" /> <span>8%</span>
            </div>
          </div>
          <h3 className={`text-2xl md:text-3xl mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
            {userType === "student" ? "1.2k" : "3.5k"}
          </h3>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {userType === "student" ? "Vistas de perfil" : "Vistas totales"}
          </p>
        </div>

        {/* Card 3 */}
        <div className={`rounded-2xl p-4 md:p-6 border transition-all duration-200 hover:shadow-lg ${isDark ? "bg-gray-900 border-gray-800 hover:border-purple-500/50" : "bg-white border-gray-200 hover:border-purple-500/50 hover:shadow-purple-500/10"}`}>
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${isDark ? "bg-emerald-500/10" : "bg-emerald-50"}`}>
              <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm">
              <ArrowUp className="w-4 h-4" /> <span>23%</span>
            </div>
          </div>
          <h3 className={`text-2xl md:text-3xl mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
            {userType === "student" ? "12" : "105"}
          </h3>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {userType === "student" ? "Entrevistas" : "Candidatos totales"}
          </p>
        </div>

        {/* Card 4 */}
        <div className={`rounded-2xl p-4 md:p-6 border transition-all duration-200 hover:shadow-lg ${isDark ? "bg-gray-900 border-gray-800 hover:border-purple-500/50" : "bg-white border-gray-200 hover:border-purple-500/50 hover:shadow-purple-500/10"}`}>
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${isDark ? "bg-amber-500/10" : "bg-amber-50"}`}>
              <Award className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
            </div>
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <ArrowDown className="w-4 h-4" /> <span>3%</span>
            </div>
          </div>
          <h3 className={`text-2xl md:text-3xl mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
            {userType === "student" ? "95%" : "4.8"}
          </h3>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {userType === "student" ? "Tasa de respuesta" : "Rating promedio"}
          </p>
        </div>
      </div>

      {/* --- 2. GRÁFICAS (Charts Row) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gráfica de Área (Izquierda) */}
        <div className={`lg:col-span-2 rounded-2xl p-4 md:p-6 border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className={`text-base md:text-lg mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                {userType === "student" ? "Actividad de Postulaciones" : "Actividad de Vacantes"}
              </h3>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Últimos 6 meses
              </p>
            </div>
            <select className={`px-3 md:px-4 py-2 rounded-lg text-sm ${isDark ? "bg-gray-800 border border-gray-700 text-white" : "bg-gray-50 border border-gray-200 text-gray-900"}`}>
              <option>6 meses</option>
              <option>3 meses</option>
              <option>1 mes</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={applicationData}>
              <defs>
                <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
              <XAxis dataKey="month" stroke={isDark ? "#9ca3af" : "#6b7280"} style={{ fontSize: "12px" }} />
              <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} style={{ fontSize: "12px" }} />
              <Tooltip contentStyle={{ backgroundColor: isDark ? "#1f2937" : "#ffffff", border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`, borderRadius: "8px", color: isDark ? "#ffffff" : "#111827" }} />
              <Area type="monotone" dataKey="applications" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorApplications)" name={userType === "student" ? "Postulaciones" : "Aplicantes"} />
              <Area type="monotone" dataKey="interviews" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorInterviews)" name="Entrevistas" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica Circular (Derecha) */}
        <div className={`rounded-2xl p-4 md:p-6 border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <h3 className={`text-base md:text-lg mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
            Estado General
          </h3>
          <p className={`text-sm mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Distribución actual
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={5} dataKey="value">
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: isDark ? "#1f2937" : "#ffffff", border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`, borderRadius: "8px", color: isDark ? "#ffffff" : "#111827" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{item.name}</span>
                </div>
                <span className={`text-sm ${isDark ? "text-white" : "text-gray-900"}`}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 3. SECCIÓN INFERIOR: Listas (Bottom Section) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Columna Izquierda: Recomendaciones/Recientes */}
        <div className={`rounded-2xl p-4 md:p-6 border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-base md:text-lg ${isDark ? "text-white" : "text-gray-900"}`}>
              {userType === "student" ? "Recomendaciones para ti" : "Vacantes recientes"}
            </h3>
            <button className="text-purple-500 text-sm hover:text-purple-400 transition-colors">
              Ver todo
            </button>
          </div>
          <div className="space-y-4">
            {recentJobs.map((job: any) => (
              <div key={job.id} className={`p-3 md:p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${isDark ? "bg-gray-800 border-gray-700 hover:border-purple-500/50" : "bg-gray-50 border-gray-200 hover:border-purple-500/50"}`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 text-sm md:text-base">
                    {userType === "student" 
                        ? (job.company_profiles?.logo_url ? <img src={job.company_profiles.logo_url} className="rounded-xl"/> : job.company_profiles?.company_name?.substring(0,2)) 
                        : job.title.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`truncate mb-1 text-sm md:text-base ${isDark ? "text-white" : "text-gray-900"}`}>
                      {job.title}
                    </h4>
                    <p className={`text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      {userType === "student" ? job.company_profiles?.company_name : `${job.applicants_count || job.applicants} aplicantes`}
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className={isDark ? "text-gray-500" : "text-gray-500"}>
                        {job.location || "Remoto"}
                      </span>
                      <span className={isDark ? "text-gray-500" : "text-gray-500"}>
                        {job.created_at || "Reciente"}
                      </span>
                    </div>
                  </div>
                  {userType === "student" ? (
                    <div className={`px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm flex-shrink-0 ${isDark ? "bg-purple-500/10 text-purple-400" : "bg-purple-50 text-purple-600"}`}>
                      {job.match_percentage}%
                    </div>
                  ) : (
                    <div className={`px-2 md:px-3 py-1 rounded-lg text-xs flex-shrink-0 ${getStatusColor(job.status)}`}>
                      {getStatusText(job.status)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha: Actividad Reciente */}
        <div className={`rounded-2xl p-4 md:p-6 border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <h3 className={`text-base md:text-lg mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
            Actividad Reciente
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-3 md:gap-4">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${isDark ? "bg-purple-500/10" : "bg-purple-50"}`}>
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`truncate text-sm md:text-base ${isDark ? "text-white" : "text-gray-900"}`}>
                      {activity.title}
                    </p>
                    <p className={`text-xs md:text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      hace {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
}