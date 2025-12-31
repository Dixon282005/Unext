"use client";

import { 
  Briefcase, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  Award, 
  CheckCircle2,
  TrendingUp
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

// Importamos la data centralizada
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
  
  // 1. Lógica para decidir qué mostrar en la lista de "Recientes"
  // Si es estudiante, mostramos trabajos recomendados. Si es empresa, sus vacantes recientes.
  const recentItems = userType === "student" ? studentJobs.slice(0, 3) : companyJobs.slice(0, 3);

  return (
    <div className="space-y-6">
      
      {/* --- SECCIÓN 1: Tarjetas de Estadísticas (KPIs) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        {/* Card 1: Actividad Principal */}
        <div className={`rounded-2xl p-4 md:p-6 border transition-all duration-200 hover:shadow-lg ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${isDark ? "bg-purple-500/10" : "bg-purple-50"}`}>
              <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm">
              <ArrowUp className="w-4 h-4" /> <span>12%</span>
            </div>
          </div>
          <h3 className={`text-2xl md:text-3xl mb-1 font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            {userType === "student" ? "14" : "5"}
          </h3>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {userType === "student" ? "Postulaciones activas" : "Vacantes activas"}
          </p>
        </div>

        {/* Card 2: Vistas */}
        <div className={`rounded-2xl p-4 md:p-6 border transition-all duration-200 hover:shadow-lg ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${isDark ? "bg-cyan-500/10" : "bg-cyan-50"}`}>
              <Eye className="w-5 h-5 md:w-6 md:h-6 text-cyan-500" />
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm">
              <ArrowUp className="w-4 h-4" /> <span>8%</span>
            </div>
          </div>
          <h3 className={`text-2xl md:text-3xl mb-1 font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            {userType === "student" ? "1.2k" : "850"}
          </h3>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {userType === "student" ? "Vistas de perfil" : "Vistas totales"}
          </p>
        </div>

        {/* Card 3: Interacciones */}
        <div className={`rounded-2xl p-4 md:p-6 border transition-all duration-200 hover:shadow-lg ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${isDark ? "bg-emerald-500/10" : "bg-emerald-50"}`}>
              <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm">
              <ArrowUp className="w-4 h-4" /> <span>23%</span>
            </div>
          </div>
          <h3 className={`text-2xl md:text-3xl mb-1 font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            {userType === "student" ? "3" : "42"}
          </h3>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {userType === "student" ? "Entrevistas agendadas" : "Aplicantes nuevos"}
          </p>
        </div>

        {/* Card 4: Calidad */}
        <div className={`rounded-2xl p-4 md:p-6 border transition-all duration-200 hover:shadow-lg ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${isDark ? "bg-amber-500/10" : "bg-amber-50"}`}>
              <Award className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
            </div>
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <ArrowDown className="w-4 h-4" /> <span>1%</span>
            </div>
          </div>
          <h3 className={`text-2xl md:text-3xl mb-1 font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            {userType === "student" ? "95%" : "4.8"}
          </h3>
          <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {userType === "student" ? "Perfil completado" : "Rating de empresa"}
          </p>
        </div>
      </div>

      {/* --- SECCIÓN 2: Gráficas --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Area Chart: Actividad en el tiempo */}
        <div className={`lg:col-span-2 rounded-2xl p-4 md:p-6 border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              Rendimiento Semestral
            </h3>
            <div className={`px-3 py-1 rounded-lg text-xs ${isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
              Últimos 6 meses
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={applicationData}>
              <defs>
                <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} vertical={false} />
              <XAxis dataKey="month" stroke={isDark ? "#9ca3af" : "#6b7280"} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: isDark ? "#1f2937" : "#ffffff", borderColor: isDark ? "#374151" : "#e5e7eb", borderRadius: "8px" }}
                itemStyle={{ color: isDark ? "#fff" : "#000" }}
              />
              <Area type="monotone" dataKey="applications" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Pie Chart: Distribución */}
        <div className={`rounded-2xl p-4 md:p-6 border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
           <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
             Estado de Solicitudes
           </h3>
           <div className="h-[180px] w-full flex justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={statusData} 
                    cx="50%" 
                    cy="50%" 
                    innerRadius={50} 
                    outerRadius={70} 
                    paddingAngle={5} 
                    dataKey="value"
                    stroke="none"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ResponsiveContainer>
           </div>
           
           {/* Leyenda del gráfico circular */}
           <div className="space-y-3 mt-4">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className={isDark ? "text-gray-400" : "text-gray-600"}>{item.name}</span>
                   </div>
                   <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{item.value}%</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* --- SECCIÓN 3: Lista de Actividad Reciente / Recomendaciones --- */}
      <div className={`rounded-2xl p-4 md:p-6 border ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
         <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              {userType === "student" ? "Recomendaciones para ti" : "Vacantes Recientes"}
            </h3>
            <button className="text-purple-500 text-sm hover:text-purple-400 font-medium transition-colors">
              Ver todo
            </button>
         </div>
         
         <div className="space-y-4">
            {recentItems.map((item: any) => (
                <div key={item.id} className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center gap-4 transition-colors ${isDark ? "bg-gray-800/50 border-gray-800 hover:bg-gray-800" : "bg-gray-50 border-gray-100 hover:bg-white hover:border-purple-200 hover:shadow-sm"}`}>
                   
                   {/* Logo / Icono */}
                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/20 shrink-0">
                      {userType === "student" ? (
                        // Lógica segura para mostrar logo o iniciales
                        item.company_profiles?.logo_url ? (
                          <img src={item.company_profiles.logo_url} alt="Logo" className="w-full h-full object-cover rounded-xl"/>
                        ) : (
                          item.company_profiles?.company_name?.substring(0, 2).toUpperCase()
                        )
                      ) : (
                        // Si es empresa, mostramos las iniciales del puesto
                        item.title.substring(0, 2).toUpperCase()
                      )}
                   </div>

                   {/* Info Central */}
                   <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold truncate ${isDark ? "text-white" : "text-gray-900"}`}>
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                          {userType === "student" ? item.company_profiles?.company_name : item.department}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className={isDark ? "text-gray-500" : "text-gray-500"}>
                          {userType === "student" ? item.created_at : item.postedDate}
                        </span>
                      </div>
                   </div>

                   {/* Botón de Acción */}
                   <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${isDark ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-white border border-gray-200 text-gray-700 hover:border-purple-300 hover:text-purple-600"}`}>
                      {userType === "student" ? "Ver Detalles" : "Gestionar"}
                   </button>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
}