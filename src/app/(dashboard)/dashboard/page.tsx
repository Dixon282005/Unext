"use client";

import { useState } from "react";
import { Sidebar } from "@/features/dashboard/components/sidebar";
import { Header } from "@/features/dashboard/components/header";
import { logoutAction } from "@/features/auth/actions";
import { OverviewView } from "@/features/dashboard/components/overview-view"; // 👈 IMPORTANTE

// Importamos la data falsa desde nuestro archivo centralizado
import { 
  companyJobs, 
  studentJobs, 
  candidates, 
  conversations, 
  messages, 
  notifications 
} from "@/features/dashboard/lib/mockdata";

import {
  MessageSquare,
  MapPin,
  Briefcase,
  Award,
  Heart,
  CheckCircle2,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreHorizontal,
  X,
  Lock,
  CreditCard,
  Filter,
  Plus,
  Edit3,
  Trash2,
  Pause,
  Play,
  Send,
  Search,
  Bell,
  ChevronLeft,
} from "lucide-react";

interface DashboardClientProps {
  userType: "student" | "company";
  userName: string;
}

export default function DashboardClient({
  userType = "student",
  userName = "Usuario",
}: DashboardClientProps) {
  // --- ESTADOS ---
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [messageInput, setMessageInput] = useState("");
  
  // Filtros
  const [jobFilter, setJobFilter] = useState<"all" | "saved" | "applied">("all");
  const [companyJobFilter, setCompanyJobFilter] = useState<"all" | "active" | "paused" | "closed">("all");

  // Modales
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<string | null>(null); // Cambiado a string por los IDs nuevos
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);

  const handleLogout = async () => {
    await logoutAction();
  };

  // --- SELECCIÓN DE DATA SEGÚN ROL ---
  // Usamos los arrays importados directamente
  const allJobs = studentJobs; 

  // --- LÓGICA DE FILTRADO ---
  const filteredJobs = allJobs.filter((job) => {
    if (jobFilter === "saved") return job.is_saved; 
    if (jobFilter === "applied") return job.is_applied;
    return true;
  });

  const filteredCompanyJobs = companyJobs.filter((job) => {
    if (companyJobFilter === "active") return job.status === "active";
    if (companyJobFilter === "paused") return job.status === "draft";
    if (companyJobFilter === "closed") return job.status === "closed";
    return true;
  });

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput("");
    }
  };

  // --- HELPERS VISUALES ---
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "paused": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "closed": return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
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
    <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${isDark ? "bg-gray-950" : "bg-gray-50"}`}>
      
      {/* 1. JOB MODAL (Interactividad local) */}
      {showJobModal && userType === "company" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl ${isDark ? "bg-gray-900" : "bg-white"}`}>
            <div className={`sticky top-0 flex items-center justify-between p-6 border-b ${isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
              <h2 className={`text-xl ${isDark ? "text-white" : "text-gray-900"}`}>
                {editingJob ? "Editar Vacante" : "Publicar Nueva Vacante"}
              </h2>
              <button onClick={() => { setShowJobModal(false); setEditingJob(null); }} className={`p-2 rounded-lg transition-colors ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
                {/* Aquí iría tu formulario completo. Lo resumo para no saturar */}
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>Formulario de vacante...</p>
                <div className="flex justify-end gap-3 mt-4">
                    <button onClick={() => setShowJobModal(false)} className="px-4 py-2 bg-gray-200 rounded text-gray-800">Cancelar</button>
                    <button className="px-4 py-2 bg-purple-600 rounded text-white">Guardar</button>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SIDEBAR */}
      <Sidebar 
        isDark={isDark}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userType={userType}
        userName={userName}
        showProfileMenu={showProfileMenu}
        setShowProfileMenu={setShowProfileMenu}
        onLogout={handleLogout}
      />

      {/* 3. CONTENIDO PRINCIPAL */}
      <main className="flex-1 overflow-auto flex flex-col">
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isDark={isDark}
          setIsDark={setIsDark}
          activeTab={activeTab}
          userType={userType}
          userName={userName}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          notifications={notifications}
        />

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          
          {/* --- VISTA GENERAL (Modularizada) --- */}
          {activeTab === "overview" && (
            <OverviewView userType={userType} isDark={isDark} />
          )}

          {/* --- VISTA DE EMPLEOS (EMPRESA) --- */}
          {activeTab === "jobs" && userType === "company" && (
            <div className="space-y-4 md:space-y-6">
              {/* Filtros Empresa */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
                   <button onClick={() => setCompanyJobFilter("all")} className={`px-3 md:px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-200 ${companyJobFilter === "all" ? "bg-purple-500 text-white" : isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"}`}>Todas</button>
                   <button onClick={() => setCompanyJobFilter("active")} className={`px-3 md:px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-200 ${companyJobFilter === "active" ? "bg-purple-500 text-white" : isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"}`}>Activas</button>
                   {/* ... más filtros ... */}
                </div>
                <button onClick={() => setShowJobModal(true)} className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/30 whitespace-nowrap">
                  <Plus className="w-5 h-5" /> <span>Nueva Vacante</span>
                </button>
              </div>

              {/* Lista de Empleos Empresa */}
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                {filteredCompanyJobs.map((job) => (
                  <div key={job.id} className={`rounded-2xl p-4 md:p-6 border transition-all duration-200 hover:shadow-lg ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <h3 className={`text-lg md:text-xl font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{job.title}</h3>
                        <div className={`text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{job.requirements_text} • {job.created_at}</div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(job.status)}`}>{getStatusText(job.status)}</div>
                      </div>
                      {/* Acciones */}
                      <div className="flex lg:flex-col items-center justify-end gap-2 lg:border-l lg:pl-6 border-gray-200 dark:border-gray-800">
                         <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm w-full transition-colors ${isDark ? "hover:bg-gray-800 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}>
                            <Edit3 className="w-4 h-4" /> <span className="hidden lg:inline">Editar</span>
                         </button>
                         {/* ... más botones ... */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- VISTA DE EMPLEOS (ESTUDIANTE) --- */}
          {activeTab === "jobs" && userType === "student" && (
            <div className="space-y-4 md:space-y-6">
              {/* Filtros Estudiante ... */}
              <div className="flex items-center justify-between flex-wrap gap-3 md:gap-4">
                 <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    <button onClick={() => setJobFilter("all")} className={`px-3 md:px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-200 ${jobFilter === "all" ? "bg-purple-500 text-white" : isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"}`}>Todas</button>
                    <button onClick={() => setJobFilter("saved")} className={`px-3 md:px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-200 ${jobFilter === "saved" ? "bg-purple-500 text-white" : isDark ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"}`}>Guardadas</button>
                 </div>
                 {/* Input de búsqueda aquí */}
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {filteredJobs.map((job) => (
                  <div key={job.id} className={`rounded-2xl p-4 md:p-6 border transition-all duration-200 hover:shadow-lg ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-lg shadow-purple-500/20">
                        {/* AQUÍ MANEJAMOS EL LOGO CON SEGURIDAD DE TIPOS */}
                        {job.company_profiles?.logo_url ? (
                            <img src={job.company_profiles.logo_url} alt="Logo" className="w-full h-full object-cover rounded-xl" />
                        ) : (
                            job.company_profiles?.company_name?.substring(0,2).toUpperCase()
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg md:text-xl font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>{job.title}</h3>
                        <p className={`text-sm mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                           {job.company_profiles?.company_name} • {job.company_profiles?.cities?.name || "Remoto"}
                        </p>
                        <div className="flex items-center gap-2">
                           <div className={`px-3 py-1 rounded-full text-xs font-medium ${job.match_percentage >= 90 ? (isDark ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-700") : (isDark ? "bg-yellow-900/30 text-yellow-400" : "bg-yellow-100 text-yellow-700")}`}>
                              {job.match_percentage}% Coincidencia
                           </div>
                        </div>
                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800 mt-4">
                           <div className="flex-1 text-sm"><span className={isDark ? "text-gray-400" : "text-gray-600"}>Salario: </span><span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{job.salary_min} - {job.salary_max} {job.currency}</span></div>
                           <button className="px-6 py-2 rounded-lg text-sm font-medium bg-purple-500 text-white hover:bg-purple-600 shadow-purple-500/20">Ver Oferta</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- CANDIDATOS --- */}
          {activeTab === "candidates" && (
             <div className="space-y-6">
                <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Candidatos</h2>
                {/* Reutiliza tu grid de candidatos aquí, usando el array 'candidates' importado */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {candidates.map(candidate => (
                    <div key={candidate.id} className={`p-4 border rounded-xl ${isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">{candidate.full_name?.substring(0,2)}</div>
                           <div>
                              <h3 className={isDark ? "text-white" : "text-gray-900"}>{candidate.full_name}</h3>
                              <p className="text-xs text-gray-500">{candidate.job_title_applied}</p>
                           </div>
                        </div>
                    </div>
                  ))}
                </div>
             </div>
          )}

          {/* --- MENSAJES --- */}
          {activeTab === "messages" && (
             // Tu lógica de mensajes...
             <div className="h-[600px] flex items-center justify-center border rounded-xl dark:border-gray-800">
                <p className="text-gray-500">Sistema de mensajería (Usando data importada: {conversations.length} chats)</p>
             </div>
          )}

          {/* --- CONFIGURACIÓN --- */}
          {activeTab === "settings" && (
             // Tu lógica de settings...
             <div className="text-center text-gray-500 mt-10">Configuración</div>
          )}

        </div>
      </main>
    </div>
  );
}