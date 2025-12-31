"use client";

import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { JobCard } from "@/features/jobs/components/Job-card"; 
// Importamos la data que movimos antes
import { studentJobs, companyJobs } from "@/features/dashboard/lib/mockdata";

interface JobsViewProps {
  userType: "student" | "company";
  isDark: boolean;
  setShowJobModal: (show: boolean) => void;
  setEditingJob: (id: any) => void;
}

export function JobsView({ userType, isDark, setShowJobModal, setEditingJob }: JobsViewProps) {
  // Estado único para el filtro activo
  const [filter, setFilter] = useState("all");

  // 1. Seleccionamos la lista de trabajos correcta
  const jobs = userType === "student" ? studentJobs : companyJobs;

  // 2. Lógica de filtrado unificada
  const filteredJobs = jobs.filter((job: any) => {
    if (filter === "all") return true;
    
    if (userType === "company") {
        // Filtros de empresa: active, draft, closed
        return job.status === filter;
    } else {
        // Filtros de estudiante: saved, applied
        // Nota: Asegúrate que tu mock-data use is_saved/is_applied. 
        // Si usas saved/applied, cambia esto abajo.
        if (filter === "saved") return job.is_saved || job.saved;
        if (filter === "applied") return job.is_applied || job.applied;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* --- BARRA SUPERIOR (FILTROS Y BUSCADOR) --- */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* GRUPO DE BOTONES DE FILTRO */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
           {/* Botón común "Todas" */}
           <button 
             onClick={() => setFilter("all")} 
             className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${filter === "all" ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30" : isDark ? "bg-gray-800 text-gray-300 hover:text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
           >
             Todas
           </button>
           
           {userType === "company" ? (
             <>
                <button 
                  onClick={() => setFilter("active")} 
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${filter === "active" ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30" : isDark ? "bg-gray-800 text-gray-300 hover:text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                >
                  Activas
                </button>
                <button 
                  onClick={() => setFilter("draft")} 
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${filter === "draft" ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30" : isDark ? "bg-gray-800 text-gray-300 hover:text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                >
                  Borradores
                </button>
                <button 
                  onClick={() => setFilter("closed")} 
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${filter === "closed" ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30" : isDark ? "bg-gray-800 text-gray-300 hover:text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                >
                  Cerradas
                </button>
             </>
           ) : (
             <>
                <button 
                  onClick={() => setFilter("saved")} 
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${filter === "saved" ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30" : isDark ? "bg-gray-800 text-gray-300 hover:text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                >
                  Guardadas
                </button>
                <button 
                  onClick={() => setFilter("applied")} 
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${filter === "applied" ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30" : isDark ? "bg-gray-800 text-gray-300 hover:text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                >
                  Postulaciones
                </button>
             </>
           )}
        </div>

        {/* INPUT DE BÚSQUEDA Y BOTÓN NUEVA VACANTE */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                <input 
                  type="text" 
                  placeholder={userType === "company" ? "Buscar vacantes..." : "Buscar empleos..."}
                  className={`w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${isDark ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400"}`} 
                />
            </div>
            
            {/* Solo mostramos el botón de crear si es una empresa */}
            {userType === "company" && (
                <button 
                    onClick={() => {
                        setEditingJob(null); // Reseteamos para que sea creación, no edición
                        setShowJobModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/30 whitespace-nowrap"
                >
                    <Plus className="w-5 h-5" /> 
                    <span className="hidden sm:inline">Nueva</span>
                </button>
            )}
        </div>
      </div>

      {/* --- GRID DE TARJETAS (Donde ocurre la magia) --- */}
      <div className="grid grid-cols-1 gap-4">
        {filteredJobs.map((job: any) => (
            <JobCard 
                key={job.id} 
                job={job} 
                userType={userType} 
                isDark={isDark}
                onEdit={(id) => {
                    setEditingJob(id);
                    setShowJobModal(true);
                }}
            />
        ))}
        
        {/* Estado vacío por si no hay resultados */}
        {filteredJobs.length === 0 && (
            <div className={`text-center py-12 rounded-2xl border border-dashed ${isDark ? "border-gray-800" : "border-gray-200"}`}>
                <p className={isDark ? "text-gray-500" : "text-gray-400"}>No se encontraron resultados en esta categoría.</p>
            </div>
        )}
      </div>

    </div>
  );
}