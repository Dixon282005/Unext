"use client";

import {
  MapPin,
  Heart,
  CheckCircle2,
  Edit3,
  Trash2,
  Pause,
  Play,
  Briefcase,
  Eye,
  CheckSquare
} from "lucide-react";

interface JobCardProps {
  job: any; // Usamos any por ahora para facilitar la transición
  userType: "student" | "company";
  isDark: boolean;
  onEdit?: (id: any) => void;
  onToggleStatus?: (id: any, currentStatus: string) => void;
}

export function JobCard({ job, userType, isDark, onEdit, onToggleStatus }: JobCardProps) {

  // --- HELPERS VISUALES (Copiados de tu lógica original) ---
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "draft": return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"; // Antes paused/yellow, ahora draft/gray
      case "paused": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"; // Mantenemos por si acaso
      case "closed": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "pending": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "interview": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "accepted": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "rejected": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Activa";
      case "draft": return "Borrador";
      case "paused": return "Pausada";
      case "closed": return "Cerrada";
      case "pending": return "Pendiente";
      case "interview": return "Entrevista";
      case "accepted": return "Aceptado";
      case "rejected": return "Rechazado";
      default: return status;
    }
  };

  return (
    <div className={`rounded-2xl p-4 md:p-6 border transition-all duration-200 hover:shadow-lg ${
      isDark ? "bg-gray-900 border-gray-800 hover:border-purple-500/50" : "bg-white border-gray-200 hover:border-purple-500/50 hover:shadow-purple-500/10"
    }`}>
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* --- LOGO O ICONO --- */}
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-lg shadow-purple-500/20">
          {userType === "student" ? (
             // Lógica de Estudiante: Intenta mostrar logo, si no, iniciales de la empresa
             job.company_profiles?.logo_url ? (
               <img src={job.company_profiles.logo_url} alt="Logo" className="w-full h-full object-cover rounded-xl" />
             ) : (
               job.company_profiles?.company_name?.substring(0, 2).toUpperCase() || "EM"
             )
          ) : (
             // Lógica de Empresa: Iniciales del título del trabajo
             job.title.substring(0, 2).toUpperCase()
          )}
        </div>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
            <div>
              <h3 className={`text-lg md:text-xl font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                {job.title}
              </h3>
              
              {/* Meta info (Departamento/Ubicación/Fecha) */}
              <div className="flex flex-wrap items-center gap-2 text-sm mt-1">
                <span className={isDark ? "text-purple-400" : "text-purple-600"}>
                  {userType === "student" ? job.company_profiles?.company_name : job.department}
                </span>
                <span className={isDark ? "text-gray-600" : "text-gray-400"}>•</span>
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  {userType === "student" 
                    ? (job.company_profiles?.cities?.name || job.location || "Remoto") 
                    : (job.created_at || "Reciente")}
                </span>
                {userType === "student" && (
                  <>
                    <span className={isDark ? "text-gray-600" : "text-gray-400"}>•</span>
                    <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                      {job.posted || job.created_at}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Badge Superior Derecha */}
            {userType === "student" ? (
              <div className="flex items-center gap-2">
                 <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    job.match_percentage >= 90
                      ? isDark ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700"
                      : isDark ? "bg-yellow-900/30 text-yellow-400" : "bg-yellow-100 text-yellow-700"
                 }`}>
                   {job.match_percentage}% Coincidencia
                 </div>
              </div>
            ) : (
              <div className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(job.status)}`}>
                {getStatusText(job.status)}
              </div>
            )}
          </div>

          {/* --- BLOQUE ESPECÍFICO DE EMPRESA: ESTADÍSTICAS --- */}
          {userType === "company" && (
             <div className="grid grid-cols-3 gap-4 my-4">
               <div className={`p-3 rounded-xl text-center ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
                 <div className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{job.applicants_count || 0}</div>
                 <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Aplicantes</div>
               </div>
               <div className={`p-3 rounded-xl text-center ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
                 <div className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{job.views_count || 0}</div>
                 <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Vistas</div>
               </div>
               <div className={`p-3 rounded-xl text-center ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
                 <div className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{job.interviews_count || 0}</div>
                 <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Entrevistas</div>
               </div>
             </div>
          )}

          {/* --- BLOQUE ESPECÍFICO DE ESTUDIANTE: DESCRIPCIÓN --- */}
          {userType === "student" && (
            <p className={`text-sm mb-4 line-clamp-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {job.description}
            </p>
          )}

          {/* Tags de Requisitos (Común para ambos si existen) */}
          {job.requirements && Array.isArray(job.requirements) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {job.requirements.slice(0, 4).map((req: string, index: number) => (
                <span key={index} className={`px-2 py-1 rounded text-xs ${isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
                  {req}
                </span>
              ))}
            </div>
          )}

          {/* --- ACCIONES (FOOTER) --- */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800 mt-4">
            
            {userType === "company" ? (
               // ACCIONES EMPRESA
               <div className="flex lg:flex-col items-center justify-end gap-2 w-full lg:w-auto lg:pl-6 lg:border-l border-gray-200 dark:border-gray-800">
                  <button 
                    onClick={() => onEdit && onEdit(job.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm w-full transition-colors ${isDark ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}
                  >
                     <Edit3 className="w-4 h-4" /> <span className="hidden lg:inline">Editar</span>
                  </button>
                  
                  <button 
                    onClick={() => onToggleStatus && onToggleStatus(job.id, job.status)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm w-full transition-colors ${isDark ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}
                  >
                     {job.status === 'active' ? <Pause className="w-4 h-4"/> : <Play className="w-4 h-4"/>}
                     <span className="hidden lg:inline">{job.status === 'active' ? 'Pausar' : 'Publicar'}</span>
                  </button>
                  
                  <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm w-full transition-colors ${isDark ? "hover:bg-red-900/30 text-red-400" : "hover:bg-red-50 text-red-600"}`}>
                     <Trash2 className="w-4 h-4" /> <span className="hidden lg:inline">Eliminar</span>
                  </button>

                  <button className="flex items-center justify-center w-full px-4 py-2 mt-2 lg:mt-0 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/20">
                    Ver Aplicantes
                  </button>
               </div>
            ) : (
               // ACCIONES ESTUDIANTE
               <>
                 <div className="flex-1 text-sm">
                    <span className={isDark ? "text-gray-400" : "text-gray-600"}>Salario: </span>
                    <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      {job.salary_min ? `${job.salary_min} - ${job.salary_max} ${job.currency}` : job.salary}
                    </span>
                 </div>
                 <button className={`p-2 rounded-lg transition-colors ${job.is_saved ? "text-purple-500 bg-purple-50 dark:bg-purple-900/20" : (isDark ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-400 hover:text-gray-900 hover:bg-gray-100")}`}>
                    <Heart className={`w-5 h-5 ${job.is_saved ? "fill-current" : ""}`} />
                 </button>
                 <button className={`px-6 py-2 rounded-lg text-sm font-medium transition-all shadow-lg ${job.is_applied ? "bg-green-500 text-white shadow-green-500/20 cursor-default" : "bg-purple-500 text-white hover:bg-purple-600 shadow-purple-500/20"}`}>
                    {job.is_applied ? (
                      <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /><span>Aplicado</span></div>
                    ) : "Aplicar ahora"}
                 </button>
               </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}