"use client";

import { useState } from "react";
import { Sidebar } from "@/features/dashboard/components/sidebar";
import { Header } from "@/features/dashboard/components/header";
import { logoutAction } from "@/features/auth/actions"; // Importamos la acción de logout

// Importamos SOLO los iconos que se usan en el contenido principal (tarjetas, listas, etc.)
import {
  Briefcase,
  Users,
  MessageSquare,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Award,
  ArrowUp,
  ArrowDown,
  Eye,
  Heart,
  CheckCircle2,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreHorizontal,
  X,
  User,
  Lock,
  CreditCard,
  Filter,
  Plus,
  Edit3,
  Trash2,
  Pause,
  Play,
  Download,
  Send,
  Search,
  Bell,
  ChevronLeft,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface DashboardClientProps {
  userType: "student" | "company";
  userName: string;
  // stats?: any; // Descomenta esto cuando conectemos los datos reales del backend
}

export default function DashboardClient({
  userType = "student",
  userName = "Usuario",
}: DashboardClientProps) {
  // --- ESTADOS GLOBALES DEL DASHBOARD ---
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(false);

  // Estados de menús flotantes
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Estados de funcionalidad interna
  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(1);
  const [messageInput, setMessageInput] = useState("");
  const [jobFilter, setJobFilter] = useState<"all" | "saved" | "applied">(
    "all"
  );
  const [companyJobFilter, setCompanyJobFilter] = useState<
    "all" | "active" | "paused" | "closed"
  >("all");

  // Modales
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<number | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(
    null
  );

  // Función para manejar el logout
  const handleLogout = async () => {
    await logoutAction();
  };

  

  // --- LÓGICA DE FILTRADO Y HELPERS ---

  const filteredJobs = allJobs.filter((job) => {
    if (jobFilter === "saved") return job.saved;
    if (jobFilter === "applied") return job.applied;
    return true;
  });

  const filteredCompanyJobs = companyJobs.filter((job) => {
    if (companyJobFilter === "active") return job.status === "active";
    if (companyJobFilter === "paused") return job.status === "paused";
    if (companyJobFilter === "closed") return job.status === "closed";
    return true;
  });

  

  const recentJobs =
    userType === "student" ? allJobs.slice(0, 3) : companyJobs.slice(0, 3);


  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessageInput("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "paused":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "closed":
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
      case "pending":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "interview":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "accepted":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activa";
      case "paused":
        return "Pausada";
      case "closed":
        return "Cerrada";
      case "pending":
        return "Pendiente";
      case "interview":
        return "Entrevista";
      case "accepted":
        return "Aceptado";
      case "rejected":
        return "Rechazado";
      default:
        return status;
    }
  };

  return (
    <div
      className={`flex h-screen overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      {/* 1. Job Modal (Se queda aquí por ahora, es interactividad pura) */}
      {showJobModal && userType === "company" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl ${
              isDark ? "bg-gray-900" : "bg-white"
            }`}
          >
            <div
              className={`sticky top-0 flex items-center justify-between p-6 border-b ${
                isDark
                  ? "border-gray-800 bg-gray-900"
                  : "border-gray-200 bg-white"
              }`}
            >
              <h2
                className={`text-xl ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {editingJob ? "Editar Vacante" : "Publicar Nueva Vacante"}
              </h2>
              <button
                onClick={() => {
                  setShowJobModal(false);
                  setEditingJob(null);
                }}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label
                  className={`block text-sm mb-2 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Título del puesto *
                </label>
                <input
                  type="text"
                  placeholder="Ej: Senior Frontend Developer"
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDark
                      ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                      : "bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm mb-2 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Departamento *
                  </label>
                  <select
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDark
                        ? "bg-gray-800 border border-gray-700 text-white"
                        : "bg-gray-50 border border-gray-200 text-gray-900"
                    } focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
                  >
                    <option>Tecnología</option>
                    <option>Diseño</option>
                    <option>Marketing</option>
                    <option>Ventas</option>
                    <option>Recursos Humanos</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-sm mb-2 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Tipo de empleo *
                  </label>
                  <select
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDark
                        ? "bg-gray-800 border border-gray-700 text-white"
                        : "bg-gray-50 border border-gray-200 text-gray-900"
                    } focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
                  >
                    <option>Tiempo completo</option>
                    <option>Tiempo parcial</option>
                    <option>Por proyecto</option>
                    <option>Prácticas</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`block text-sm mb-2 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Ubicación *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: CDMX, Remoto, Híbrido"
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDark
                        ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                        : "bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400"
                    } focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm mb-2 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Rango salarial *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: $25,000 - $35,000"
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDark
                        ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                        : "bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400"
                    } focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm mb-2 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Descripción del puesto *
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe las responsabilidades y el rol..."
                  className={`w-full px-4 py-2 rounded-lg resize-none ${
                    isDark
                      ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                      : "bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm mb-2 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Requisitos (separados por comas) *
                </label>
                <input
                  type="text"
                  placeholder="Ej: React, TypeScript, 3+ años experiencia"
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDark
                      ? "bg-gray-800 border border-gray-700 text-white placeholder-gray-500"
                      : "bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowJobModal(false);
                    setEditingJob(null);
                  }}
                  className="flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  {editingJob ? "Guardar Cambios" : "Publicar Vacante"}
                </button>
                <button
                  onClick={() => {
                    setShowJobModal(false);
                    setEditingJob(null);
                  }}
                  className={`flex-1 px-6 py-3 rounded-lg transition-colors ${
                    isDark
                      ? "bg-gray-800 text-gray-400 hover:text-white"
                      : "bg-gray-100 text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SIDEBAR EXTRAÍDO */}
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
        {/* HEADER EXTRAÍDO */}
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

        {/* 4. ÁREA DE CONTENIDO (Pestañas) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* --- VISTA GENERAL (OVERVIEW) --- */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div
                  className={`rounded-2xl p-4 md:p-6 border transition-all duration-200 hover:shadow-lg ${
                    isDark
                      ? "bg-gray-900 border-gray-800 hover:border-purple-500/50"
                      : "bg-white border-gray-200 hover:border-purple-500/50 hover:shadow-purple-500/10"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl ${
                        isDark ? "bg-purple-500/10" : "bg-purple-50"
                      }`}
                    >
                      <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-purple-500" />
                    </div>
                    <div className="flex items-center gap-1 text-green-500 text-sm">
                      <ArrowUp className="w-4 h-4" />
                      <span>12%</span>
                    </div>
                  </div>
                  <h3
                    className={`text-2xl md:text-3xl mb-1 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {userType === "student" ? "47" : "23"}
                  </h3>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {userType === "student"
                      ? "Postulaciones activas"
                      : "Vacantes publicadas"}
                  </p>
                </div>

                <div
                  className={`rounded-2xl p-4 md:p-6 border transition-all duration-200 hover:shadow-lg ${
                    isDark
                      ? "bg-gray-900 border-gray-800 hover:border-purple-500/50"
                      : "bg-white border-gray-200 hover:border-purple-500/50 hover:shadow-purple-500/10"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl ${
                        isDark ? "bg-cyan-500/10" : "bg-cyan-50"
                      }`}
                    >
                      <Eye className="w-5 h-5 md:w-6 md:h-6 text-cyan-500" />
                    </div>
                    <div className="flex items-center gap-1 text-green-500 text-sm">
                      <ArrowUp className="w-4 h-4" />
                      <span>8%</span>
                    </div>
                  </div>
                  <h3
                    className={`text-2xl md:text-3xl mb-1 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {userType === "student" ? "1.2k" : "3.5k"}
                  </h3>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {userType === "student"
                      ? "Vistas de perfil"
                      : "Vistas totales"}
                  </p>
                </div>

                <div
                  className={`rounded-2xl p-4 md:p-6 border transition-all duration-200 hover:shadow-lg ${
                    isDark
                      ? "bg-gray-900 border-gray-800 hover:border-purple-500/50"
                      : "bg-white border-gray-200 hover:border-purple-500/50 hover:shadow-purple-500/10"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl ${
                        isDark ? "bg-emerald-500/10" : "bg-emerald-50"
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
                    </div>
                    <div className="flex items-center gap-1 text-green-500 text-sm">
                      <ArrowUp className="w-4 h-4" />
                      <span>23%</span>
                    </div>
                  </div>
                  <h3
                    className={`text-2xl md:text-3xl mb-1 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {userType === "student" ? "12" : "105"}
                  </h3>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {userType === "student"
                      ? "Entrevistas"
                      : "Candidatos totales"}
                  </p>
                </div>

                <div
                  className={`rounded-2xl p-4 md:p-6 border transition-all duration-200 hover:shadow-lg ${
                    isDark
                      ? "bg-gray-900 border-gray-800 hover:border-purple-500/50"
                      : "bg-white border-gray-200 hover:border-purple-500/50 hover:shadow-purple-500/10"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl ${
                        isDark ? "bg-amber-500/10" : "bg-amber-50"
                      }`}
                    >
                      <Award className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
                    </div>
                    <div className="flex items-center gap-1 text-red-500 text-sm">
                      <ArrowDown className="w-4 h-4" />
                      <span>3%</span>
                    </div>
                  </div>
                  <h3
                    className={`text-2xl md:text-3xl mb-1 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {userType === "student" ? "95%" : "4.8"}
                  </h3>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {userType === "student"
                      ? "Tasa de respuesta"
                      : "Rating promedio"}
                  </p>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div
                  className={`lg:col-span-2 rounded-2xl p-4 md:p-6 border ${
                    isDark
                      ? "bg-gray-900 border-gray-800"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3
                        className={`text-base md:text-lg mb-1 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {userType === "student"
                          ? "Actividad de Postulaciones"
                          : "Actividad de Vacantes"}
                      </h3>
                      <p
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Últimos 6 meses
                      </p>
                    </div>
                    <select
                      className={`px-3 md:px-4 py-2 rounded-lg text-sm ${
                        isDark
                          ? "bg-gray-800 border border-gray-700 text-white"
                          : "bg-gray-50 border border-gray-200 text-gray-900"
                      }`}
                    >
                      <option>6 meses</option>
                      <option>3 meses</option>
                      <option>1 mes</option>
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={applicationData}>
                      <defs>
                        <linearGradient
                          id="colorApplications"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8b5cf6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorInterviews"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#06b6d4"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#06b6d4"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={isDark ? "#374151" : "#e5e7eb"}
                      />
                      <XAxis
                        dataKey="month"
                        stroke={isDark ? "#9ca3af" : "#6b7280"}
                        style={{ fontSize: "12px" }}
                      />
                      <YAxis
                        stroke={isDark ? "#9ca3af" : "#6b7280"}
                        style={{ fontSize: "12px" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? "#1f2937" : "#ffffff",
                          border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                          borderRadius: "8px",
                          color: isDark ? "#ffffff" : "#111827",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="applications"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorApplications)"
                        name={
                          userType === "student"
                            ? "Postulaciones"
                            : "Aplicantes"
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="interviews"
                        stroke="#06b6d4"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorInterviews)"
                        name="Entrevistas"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div
                  className={`rounded-2xl p-4 md:p-6 border ${
                    isDark
                      ? "bg-gray-900 border-gray-800"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <h3
                    className={`text-base md:text-lg mb-1 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Estado General
                  </h3>
                  <p
                    className={`text-sm mb-6 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Distribución actual
                  </p>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? "#1f2937" : "#ffffff",
                          border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                          borderRadius: "8px",
                          color: isDark ? "#ffffff" : "#111827",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4">
                    {statusData.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span
                            className={`text-sm ${
                              isDark ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            {item.name}
                          </span>
                        </div>
                        <span
                          className={`text-sm ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div
                  className={`rounded-2xl p-4 md:p-6 border ${
                    isDark
                      ? "bg-gray-900 border-gray-800"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3
                      className={`text-base md:text-lg ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {userType === "student"
                        ? "Recomendaciones para ti"
                        : "Vacantes recientes"}
                    </h3>
                    <button className="text-purple-500 text-sm hover:text-purple-400 transition-colors">
                      Ver todo
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentJobs.map((job) => (
                      <div
                        key={job.id}
                        className={`p-3 md:p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                          isDark
                            ? "bg-gray-800 border-gray-700 hover:border-purple-500/50"
                            : "bg-gray-50 border-gray-200 hover:border-purple-500/50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 text-sm md:text-base">
                            {userType === "student"
                              ? (job as any).logo
                              : job.title.substring(0, 2).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`truncate mb-1 text-sm md:text-base ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {job.title}
                            </h4>
                            <p
                              className={`text-sm mb-2 ${
                                isDark ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {userType === "student"
                                ? (job as any).company
                                : `${job.applicants} aplicantes`}
                            </p>
                            <div className="flex items-center gap-3 text-xs">
                              <span
                                className={
                                  isDark ? "text-gray-500" : "text-gray-500"
                                }
                              >
                                {job.location}
                              </span>
                              <span
                                className={
                                  isDark ? "text-gray-500" : "text-gray-500"
                                }
                              >
                                {job.postedDate}
                              </span>
                            </div>
                          </div>
                          {userType === "student" ? (
                            <div
                              className={`px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm flex-shrink-0 ${
                                isDark
                                  ? "bg-purple-500/10 text-purple-400"
                                  : "bg-purple-50 text-purple-600"
                              }`}
                            >
                              {job.match}%
                            </div>
                          ) : (
                            <div
                              className={`px-2 md:px-3 py-1 rounded-lg text-xs flex-shrink-0 ${getStatusColor(
                                job.status
                              )}`}
                            >
                              {getStatusText(job.status)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`rounded-2xl p-4 md:p-6 border ${
                    isDark
                      ? "bg-gray-900 border-gray-800"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <h3
                    className={`text-base md:text-lg mb-6 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Actividad Reciente
                  </h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => {
                      const Icon = activity.icon;
                      return (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3 md:gap-4"
                        >
                          <div
                            className={`p-2 rounded-lg flex-shrink-0 ${
                              isDark ? "bg-purple-500/10" : "bg-purple-50"
                            }`}
                          >
                            <Icon className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`truncate text-sm md:text-base ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {activity.title}
                            </p>
                            <p
                              className={`text-xs md:text-sm ${
                                isDark ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
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
          )}

          {activeTab === "jobs" && userType === "company" && (
            <div className="space-y-4 md:space-y-6">
              {/* Header with Filters and New Job Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
                  {/* Filter buttons */}
                  <button
                    onClick={() => setCompanyJobFilter("all")}
                    className={`px-3 md:px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-200 ${
                      companyJobFilter === "all"
                        ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                        : isDark
                        ? "bg-gray-800 text-gray-400 hover:text-white"
                        : "bg-gray-100 text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Todas ({companyJobs.length})
                  </button>
                  <button
                    onClick={() => setCompanyJobFilter("active")}
                    className={`px-3 md:px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-200 ${
                      companyJobFilter === "active"
                        ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                        : isDark
                        ? "bg-gray-800 text-gray-400 hover:text-white"
                        : "bg-gray-100 text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Activas
                  </button>
                  <button
                    onClick={() => setCompanyJobFilter("paused")}
                    className={`px-3 md:px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-200 ${
                      companyJobFilter === "paused"
                        ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                        : isDark
                        ? "bg-gray-800 text-gray-400 hover:text-white"
                        : "bg-gray-100 text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Pausadas
                  </button>
                  <button
                    onClick={() => setCompanyJobFilter("closed")}
                    className={`px-3 md:px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-200 ${
                      companyJobFilter === "closed"
                        ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                        : isDark
                        ? "bg-gray-800 text-gray-400 hover:text-white"
                        : "bg-gray-100 text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Cerradas
                  </button>
                </div>
                <button
                  onClick={() => setShowJobModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/30 whitespace-nowrap"
                >
                  <Plus className="w-5 h-5" />
                  <span>Nueva Vacante</span>
                </button>
              </div>

              {/* Jobs Grid */}
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                {filteredCompanyJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`rounded-2xl p-4 md:p-6 border transition-all duration-200 hover:shadow-lg ${
                      isDark
                        ? "bg-gray-900 border-gray-800 hover:border-purple-500/50"
                        : "bg-white border-gray-200 hover:border-purple-500/50 hover:shadow-purple-500/10"
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Job Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3
                              className={`text-lg md:text-xl font-semibold mb-1 ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {job.title}
                            </h3>
                            <div className="flex flex-wrap gap-2 text-sm">
                              <span
                                className={
                                  isDark ? "text-purple-400" : "text-purple-600"
                                }
                              >
                                {job.department}
                              </span>
                              <span
                                className={
                                  isDark ? "text-gray-600" : "text-gray-400"
                                }
                              >
                                •
                              </span>
                              <span
                                className={
                                  isDark ? "text-gray-400" : "text-gray-600"
                                }
                              >
                                {job.location}
                              </span>
                              <span
                                className={
                                  isDark ? "text-gray-600" : "text-gray-400"
                                }
                              >
                                •
                              </span>
                              <span
                                className={
                                  isDark ? "text-gray-400" : "text-gray-600"
                                }
                              >
                                {job.postedDate}
                              </span>
                            </div>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              job.status
                            )}`}
                          >
                            {getStatusText(job.status)}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 my-4">
                          <div
                            className={`p-3 rounded-xl text-center ${
                              isDark ? "bg-gray-800" : "bg-gray-50"
                            }`}
                          >
                            <div
                              className={`text-2xl font-bold mb-1 ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {job.applicants}
                            </div>
                            <div
                              className={`text-xs ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              Aplicantes
                            </div>
                          </div>
                          <div
                            className={`p-3 rounded-xl text-center ${
                              isDark ? "bg-gray-800" : "bg-gray-50"
                            }`}
                          >
                            <div
                              className={`text-2xl font-bold mb-1 ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {job.views}
                            </div>
                            <div
                              className={`text-xs ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              Vistas
                            </div>
                          </div>
                          <div
                            className={`p-3 rounded-xl text-center ${
                              isDark ? "bg-gray-800" : "bg-gray-50"
                            }`}
                          >
                            <div
                              className={`text-2xl font-bold mb-1 ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {job.interviews}
                            </div>
                            <div
                              className={`text-xs ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              Entrevistas
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {job.requirements.map((req, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 rounded text-xs ${
                                isDark
                                  ? "bg-gray-800 text-gray-300"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex lg:flex-col items-center justify-end gap-2 lg:border-l lg:pl-6 border-gray-200 dark:border-gray-800">
                        <button
                          onClick={() => {
                            setEditingJob(job.id);
                            setShowJobModal(true);
                          }}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm w-full transition-colors ${
                            isDark
                              ? "hover:bg-gray-800 text-gray-300"
                              : "hover:bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Edit3 className="w-4 h-4" />
                          <span className="hidden lg:inline">Editar</span>
                        </button>
                        <button
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm w-full transition-colors ${
                            isDark
                              ? "hover:bg-gray-800 text-gray-300"
                              : "hover:bg-gray-100 text-gray-600"
                          }`}
                        >
                          {job.status === "active" ? (
                            <>
                              <Pause className="w-4 h-4" />
                              <span className="hidden lg:inline">Pausar</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              <span className="hidden lg:inline">Activar</span>
                            </>
                          )}
                        </button>
                        <button
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm w-full transition-colors ${
                            isDark
                              ? "hover:bg-red-900/30 text-red-400"
                              : "hover:bg-red-50 text-red-600"
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden lg:inline">Eliminar</span>
                        </button>
                        <button className="flex items-center justify-center w-full px-4 py-2 mt-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/20">
                          Ver Aplicantes
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "jobs" && userType === "student" && (
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3 md:gap-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {/* Filter buttons */}
                  <button
                    onClick={() => setJobFilter("all")}
                    className={`px-3 md:px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-200 ${
                      jobFilter === "all"
                        ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                        : isDark
                        ? "bg-gray-800 text-gray-400 hover:text-white"
                        : "bg-gray-100 text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Todas
                  </button>
                  <button
                    onClick={() => setJobFilter("saved")}
                    className={`px-3 md:px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-200 ${
                      jobFilter === "saved"
                        ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                        : isDark
                        ? "bg-gray-800 text-gray-400 hover:text-white"
                        : "bg-gray-100 text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Guardadas
                  </button>
                  <button
                    onClick={() => setJobFilter("applied")}
                    className={`px-3 md:px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-200 ${
                      jobFilter === "applied"
                        ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                        : isDark
                        ? "bg-gray-800 text-gray-400 hover:text-white"
                        : "bg-gray-100 text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Postulaciones
                  </button>
                </div>
                <div className="relative w-full md:w-auto">
                  <Search
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Buscar vacantes..."
                    className={`w-full md:w-64 pl-10 pr-4 py-2 rounded-lg text-sm ${
                      isDark
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-white border-gray-200 text-gray-900 placeholder-gray-400"
                    } border focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`rounded-2xl p-4 md:p-6 border transition-all duration-200 hover:shadow-lg ${
                      isDark
                        ? "bg-gray-900 border-gray-800 hover:border-purple-500/50"
                        : "bg-white border-gray-200 hover:border-purple-500/50 hover:shadow-purple-500/10"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-lg shadow-purple-500/20">
                        {job.logo}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
                          <div>
                            <h3
                              className={`text-lg md:text-xl font-semibold ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {job.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 text-sm mt-1">
                              <span className="text-purple-500 font-medium">
                                {job.company}
                              </span>
                              <span
                                className={
                                  isDark ? "text-gray-600" : "text-gray-400"
                                }
                              >
                                •
                              </span>
                              <span
                                className={
                                  isDark ? "text-gray-400" : "text-gray-600"
                                }
                              >
                                {job.location}
                              </span>
                              <span
                                className={
                                  isDark ? "text-gray-600" : "text-gray-400"
                                }
                              >
                                •
                              </span>
                              <span
                                className={
                                  isDark ? "text-gray-400" : "text-gray-600"
                                }
                              >
                                {job.posted}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                job.match >= 90
                                  ? isDark
                                    ? "bg-green-900/30 text-green-400"
                                    : "bg-green-100 text-green-700"
                                  : isDark
                                  ? "bg-yellow-900/30 text-yellow-400"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {job.match}% Coincidencia
                            </div>
                          </div>
                        </div>

                        <p
                          className={`text-sm mb-4 line-clamp-2 ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.requirements.map((req, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 rounded text-xs ${
                                isDark
                                  ? "bg-gray-800 text-gray-300"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {req}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                          <div className="flex-1 text-sm">
                            <span
                              className={
                                isDark ? "text-gray-400" : "text-gray-600"
                              }
                            >
                              Salario:{" "}
                            </span>
                            <span
                              className={`font-medium ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {job.salary}
                            </span>
                          </div>
                          <button
                            className={`p-2 rounded-lg transition-colors ${
                              job.saved
                                ? "text-purple-500 bg-purple-50 dark:bg-purple-900/20"
                                : isDark
                                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                                : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                            }`}
                          >
                            <Heart
                              className={`w-5 h-5 ${
                                job.saved ? "fill-current" : ""
                              }`}
                            />
                          </button>
                          <button
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all shadow-lg ${
                              job.applied
                                ? "bg-green-500 text-white shadow-green-500/20 cursor-default"
                                : "bg-purple-500 text-white hover:bg-purple-600 shadow-purple-500/20"
                            }`}
                          >
                            {job.applied ? (
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Aplicado</span>
                              </div>
                            ) : (
                              "Aplicar ahora"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "candidates" && (
            <div className="space-y-4 md:space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-auto">
                  <Search
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Buscar candidatos..."
                    className={`w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg text-sm ${
                      isDark
                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                        : "bg-white border-gray-200 text-gray-900 placeholder-gray-400"
                    } border focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
                  />
                </div>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                    isDark
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span>Filtrar</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    onClick={() => setSelectedCandidate(candidate.id)}
                    className={`cursor-pointer group relative overflow-hidden rounded-2xl border transition-all duration-200 hover:shadow-lg ${
                      isDark
                        ? "bg-gray-900 border-gray-800 hover:border-purple-500/50"
                        : "bg-white border-gray-200 hover:border-purple-500/50 hover:shadow-purple-500/10"
                    }`}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    <div className="p-4 md:p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm md:text-base">
                            {candidate.avatar}
                          </div>
                          <div>
                            <h3
                              className={`font-semibold text-sm md:text-base ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {candidate.name}
                            </h3>
                            <p
                              className={`text-xs md:text-sm ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {candidate.jobApplied}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`px-2 py-1 rounded text-xs ${
                            candidate.match >= 90
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {candidate.match}%
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>CDMX, México</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                          <Briefcase className="w-4 h-4" />
                          <span>{candidate.experience}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                          <Award className="w-4 h-4" />
                          <span>{candidate.education}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {candidate.skills.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className={`px-2 py-1 rounded text-xs ${
                              isDark
                                ? "bg-gray-800 text-gray-300"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                        <div
                          className={`text-xs ${
                            isDark ? "text-gray-500" : "text-gray-400"
                          }`}
                        >
                          Aplicó: {candidate.appliedDate}
                        </div>
                        <button className="text-purple-500 text-xs md:text-sm font-medium hover:text-purple-400 transition-colors">
                          Ver perfil
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div
              className={`rounded-2xl border overflow-hidden flex flex-col md:flex-row h-[calc(100vh-12rem)] ${
                isDark
                  ? "bg-gray-900 border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Conversations List */}
              <div
                className={`w-full md:w-80 border-b md:border-b-0 md:border-r ${
                  isDark ? "border-gray-800" : "border-gray-200"
                }`}
              >
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                  <div className="relative">
                    <Search
                      className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Buscar mensajes..."
                      className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm ${
                        isDark
                          ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                          : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
                      } focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
                    />
                  </div>
                </div>
                <div className="overflow-y-auto h-[calc(100%-4.5rem)]">
                  {conversations.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedConversation(chat.id)}
                      className={`p-4 border-b cursor-pointer transition-colors ${
                        isDark ? "border-gray-800" : "border-gray-100"
                      } ${
                        selectedConversation === chat.id
                          ? isDark
                            ? "bg-purple-900/10 border-l-4 border-l-purple-500"
                            : "bg-purple-50 border-l-4 border-l-purple-500"
                          : isDark
                          ? "hover:bg-gray-800"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-medium text-sm">
                            {chat.avatar}
                          </div>
                          {chat.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4
                              className={`text-sm font-semibold truncate ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {chat.name}
                            </h4>
                            <span
                              className={`text-xs ${
                                isDark ? "text-gray-500" : "text-gray-400"
                              }`}
                            >
                              {chat.time}
                            </span>
                          </div>
                          <p
                            className={`text-xs truncate ${
                              chat.unread > 0
                                ? isDark
                                  ? "text-white font-medium"
                                  : "text-gray-900 font-medium"
                                : isDark
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            {chat.lastMessage}
                          </p>
                        </div>
                        {chat.unread > 0 && (
                          <div className="px-2 py-0.5 rounded-full bg-purple-500 text-white text-[10px] font-medium">
                            {chat.unread}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900/50">
                {selectedConversation ? (
                  <>
                    <div
                      className={`p-4 border-b flex items-center justify-between ${
                        isDark
                          ? "bg-gray-900 border-gray-800"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-medium">
                          {conversations[0].avatar}
                        </div>
                        <div>
                          <h3
                            className={`font-semibold ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {conversations[0].name}
                          </h3>
                          <span className="text-xs text-green-500 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            En línea
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className={`p-2 rounded-lg transition-colors ${
                            isDark
                              ? "hover:bg-gray-800 text-gray-400"
                              : "hover:bg-gray-100 text-gray-500"
                          }`}
                        >
                          <Phone className="w-5 h-5" />
                        </button>
                        <button
                          className={`p-2 rounded-lg transition-colors ${
                            isDark
                              ? "hover:bg-gray-800 text-gray-400"
                              : "hover:bg-gray-100 text-gray-500"
                          }`}
                        >
                          <Video className="w-5 h-5" />
                        </button>
                        <button
                          className={`p-2 rounded-lg transition-colors ${
                            isDark
                              ? "hover:bg-gray-800 text-gray-400"
                              : "hover:bg-gray-100 text-gray-500"
                          }`}
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.sender === "me"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[75%] rounded-2xl p-4 ${
                              msg.sender === "me"
                                ? "bg-purple-600 text-white rounded-br-none"
                                : isDark
                                ? "bg-gray-800 text-white rounded-bl-none"
                                : "bg-white text-gray-900 rounded-bl-none shadow-sm"
                            }`}
                          >
                            <p className="text-sm">{msg.text}</p>
                            <p
                              className={`text-[10px] mt-1 text-right ${
                                msg.sender === "me"
                                  ? "text-purple-200"
                                  : "text-gray-400"
                              }`}
                            >
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div
                      className={`p-4 border-t ${
                        isDark
                          ? "bg-gray-900 border-gray-800"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <button
                          className={`p-2 rounded-full transition-colors ${
                            isDark
                              ? "hover:bg-gray-800 text-gray-400"
                              : "hover:bg-gray-100 text-gray-500"
                          }`}
                        >
                          <Paperclip className="w-5 h-5" />
                        </button>
                        <input
                          type="text"
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleSendMessage()
                          }
                          placeholder="Escribe un mensaje..."
                          className={`flex-1 px-4 py-2 rounded-full text-sm ${
                            isDark
                              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                              : "bg-gray-100 border-transparent text-gray-900 placeholder-gray-500"
                          } focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
                        />
                        <button
                          className={`p-2 rounded-full transition-colors ${
                            isDark
                              ? "hover:bg-gray-800 text-gray-400"
                              : "hover:bg-gray-100 text-gray-500"
                          }`}
                        >
                          <Smile className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleSendMessage}
                          className={`p-2 rounded-full ${
                            messageInput.trim()
                              ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20 hover:bg-purple-600"
                              : isDark
                              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          } transition-all`}
                          disabled={!messageInput.trim()}
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500">
                    <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
                    <h3 className="text-lg font-medium mb-2">
                      Selecciona una conversación
                    </h3>
                    <p className="text-sm max-w-sm">
                      Elige un chat de la lista para ver el historial y enviar
                      mensajes.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div
                className={`p-6 md:p-8 rounded-2xl border ${
                  isDark
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-purple-500/20">
                    {userName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h2
                      className={`text-2xl font-bold mb-1 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {userName}
                    </h2>
                    <p
                      className={`${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {userType === "student"
                        ? "Estudiante • Ingeniería en Sistemas"
                        : "Empresa • Tecnología"}
                    </p>
                  </div>
                  <button className="ml-auto px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                    Editar Perfil
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Información Personal
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label
                          className={`block text-xs uppercase tracking-wider mb-1 ${
                            isDark ? "text-gray-500" : "text-gray-400"
                          }`}
                        >
                          Nombre Completo
                        </label>
                        <input
                          type="text"
                          defaultValue={userName}
                          className={`w-full px-4 py-2.5 rounded-lg text-sm ${
                            isDark
                              ? "bg-gray-800 border-gray-700 text-white"
                              : "bg-gray-50 border-gray-200 text-gray-900"
                          } border focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-xs uppercase tracking-wider mb-1 ${
                            isDark ? "text-gray-500" : "text-gray-400"
                          }`}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="usuario@ejemplo.com"
                          className={`w-full px-4 py-2.5 rounded-lg text-sm ${
                            isDark
                              ? "bg-gray-800 border-gray-700 text-white"
                              : "bg-gray-50 border-gray-200 text-gray-900"
                          } border focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
                        />
                      </div>
                      <div>
                        <label
                          className={`block text-xs uppercase tracking-wider mb-1 ${
                            isDark ? "text-gray-500" : "text-gray-400"
                          }`}
                        >
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          defaultValue="+52 55 1234 5678"
                          className={`w-full px-4 py-2.5 rounded-lg text-sm ${
                            isDark
                              ? "bg-gray-800 border-gray-700 text-white"
                              : "bg-gray-50 border-gray-200 text-gray-900"
                          } border focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Seguridad y Preferencias
                    </h3>
                    <div className="space-y-3">
                      <button
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                          isDark
                            ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5 text-purple-500" />
                          <div className="text-left">
                            <h4
                              className={`text-sm font-medium ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              Cambiar contraseña
                            </h4>
                            <p
                              className={`text-xs ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              Última actualización hace 3 meses
                            </p>
                          </div>
                        </div>
                        <ChevronLeft className="w-5 h-5 rotate-180 text-gray-400" />
                      </button>

                      <button
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                          isDark
                            ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Bell className="w-5 h-5 text-purple-500" />
                          <div className="text-left">
                            <h4
                              className={`text-sm font-medium ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              Notificaciones
                            </h4>
                            <p
                              className={`text-xs ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              Gestionar alertas y correos
                            </p>
                          </div>
                        </div>
                        <ChevronLeft className="w-5 h-5 rotate-180 text-gray-400" />
                      </button>

                      <button
                        className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                          isDark
                            ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-purple-500" />
                          <div className="text-left">
                            <h4
                              className={`text-sm font-medium ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              Facturación
                            </h4>
                            <p
                              className={`text-xs ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              Métodos de pago e historial
                            </p>
                          </div>
                        </div>
                        <ChevronLeft className="w-5 h-5 rotate-180 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-3">
                  <button
                    className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isDark
                        ? "text-gray-300 hover:bg-gray-800"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Cancelar
                  </button>
                  <button className="px-6 py-2.5 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/20">
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
