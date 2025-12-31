"use client";

import { useState } from "react";
import { Sidebar } from "@/features/dashboard/components/sidebar";
import { Header } from "@/features/dashboard/components/header";
import { logoutAction } from "@/features/auth/actions";

// --- IMPORTAMOS TUS NUEVOS FEATURES (VISTAS) ---
import { OverviewView } from "@/features/dashboard/views/overview-view";
import { JobsView } from "@/features/jobs/views/jobs-view";
import { CandidatesView } from "@/features/candidates/views/candidates-view";
import { MessagesView } from "@/features/chat/views/chat-view";
import { SettingsView } from "@/features/dashboard/views/settings-view";

// --- COMPONENTES GLOBALES Y DATA ---
import { JobModal } from "@/features/jobs/components/Job-modal";
import { notifications } from "@/features/dashboard/lib/mockdata"; 
// NOTA: Asegúrate que tu archivo de datos se llame 'mock-data.ts' o 'mockdata.ts' y ajusta el import arriba si falla.

interface DashboardClientProps {
  userType: "student" | "company";
  userName: string;
}

export default function DashboardClient({
  userType = "student",
  userName = "Usuario",
}: DashboardClientProps) {
  
  // 1. ESTADOS GLOBALES DE LA APP
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // 2. ESTADOS DE INTERFAZ (Header/Sidebar)
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // 3. ESTADOS GLOBALES DE ACCIÓN (Modales)
  // Mantenemos esto aquí porque el Modal de empleo se superpone a todo
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | number | null>(null);

  // Logout Handler
  const handleLogout = async () => {
    await logoutAction();
  };

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${isDark ? "bg-gray-950" : "bg-gray-50"}`}>
      
      {/* --- SIDEBAR IZQUIERDO --- */}
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

      {/* --- ÁREA PRINCIPAL (DERECHA) --- */}
      <main className="flex-1 overflow-auto flex flex-col">
        
        {/* HEADER SUPERIOR */}
        <Header
          
          isDark={isDark}
          setIsDark={setIsDark}
          activeTab={activeTab}
          userType={userType}
          userName={userName}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          notifications={notifications}
        />

        {/* CONTENIDO DE LAS PESTAÑAS (Aquí ocurre la magia de la limpieza) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          
          {activeTab === "overview" && (
            <OverviewView userType={userType} isDark={isDark} />
          )}

          {activeTab === "jobs" && (
            <JobsView 
              userType={userType} 
              isDark={isDark} 
              setShowJobModal={setShowJobModal} 
              setEditingJob={setEditingJobId} 
            />
          )}

          {activeTab === "candidates" && (
            <CandidatesView isDark={isDark} />
          )}

          {activeTab === "messages" && (
            <MessagesView isDark={isDark} />
          )}

          {activeTab === "settings" && (
            <SettingsView userType={userType} userName={userName} isDark={isDark} />
          )}

        </div>
      </main>

      {/* --- MODALES GLOBALES --- */}
      {/* Renderizamos el modal aquí para que flote sobre todo lo demás */}
      <JobModal 
        isOpen={showJobModal}
        onClose={() => {
          setShowJobModal(false);
          setEditingJobId(null);
        }}
        isDark={isDark}
        editingJobId={editingJobId}
      />

    </div>
  );
}