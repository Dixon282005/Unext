import { DashboardCompanyJob, DashboardStudentJob, DashboardCandidate } from "@/features/dashboard/types";
import { MessageSquare, Eye, Calendar, CheckCircle2 } from "lucide-react";


// --- MOCK DE VACANTES (VISTA EMPRESA) ---
export const companyJobs: DashboardCompanyJob[] = [
  {
    id: "job-1",
    company_id: "comp-1",
    title: "Senior Frontend Developer",
    description: "Buscamos experto en React...",
    requirements_text: "React, TypeScript, Tailwind",
    type: "full_time",
    modality: "remote",
    category_id: 1,
    city_id: null,
    currency: "USD",
    salary_min: 2000,
    salary_max: 3000,
    payment_period: "monthly",
    is_unpaid: false,
    is_salary_visible: true,
    status: "active",
    is_active: true,
    created_at: "2024-01-15",
    updated_at: "2024-01-15",
    // Campos extra del Dashboard
    applicants_count: 45,
    views_count: 320,
    interviews_count: 8,
  },
  {
    id: "job-2",
    company_id: "comp-1",
    title: "UX/UI Designer",
    description: "Diseñador creativo...",
    requirements_text: "Figma, Adobe XD",
    type: "full_time",
    modality: "hybrid",
    category_id: 2,
    city_id: 45, 
    currency: "USD",
    salary_min: 1500,
    salary_max: 2000,
    payment_period: "monthly",
    is_unpaid: false,
    is_salary_visible: true,
    status: "active",
    is_active: true,
    created_at: "2024-01-10",
    updated_at: "2024-01-10",
    applicants_count: 32,
    views_count: 250,
    interviews_count: 5,
  }
];

// --- MOCK DE CANDIDATOS ---
export const candidates: DashboardCandidate[] = [
  {
    id: "user-1",
    role: "user",
    full_name: "Carlos García",
    bio: "Desarrollador apasionado...",
    city_id: 1,
    city_text: "Caracas",
    country: "Venezuela",
    phone: null,
    linkedin_url: null,
    github_url: null,
    portfolio_url: null,
    avatar_url: null, 
    is_active: true,
    is_blocked: false,
    created_at: "2023-01-01",
    updated_at: "2023-01-01",
    // Datos de la aplicación
    application_id: "app-1",
    applied_at: "2024-01-20",
    status: "pending",
    match_percentage: 95,
    job_title_applied: "Senior Frontend Developer",
  },
  {
    id: "user-2",
    role: "user",
    full_name: "Ana Martínez",
    bio: "Diseñadora UX...",
    city_id: 2,
    city_text: "Maracaibo",
    country: "Venezuela",
    phone: null,
    linkedin_url: null,
    github_url: null,
    portfolio_url: null,
    avatar_url: null,
    is_active: true,
    is_blocked: false,
    created_at: "2023-02-01",
    updated_at: "2023-02-01",
    application_id: "app-2",
    applied_at: "2024-01-19",
    status: "interview",
    match_percentage: 88,
    job_title_applied: "UX/UI Designer",
  }
];

// --- MOCK DE VACANTES (VISTA ESTUDIANTE) ---
export const studentJobs: DashboardStudentJob[] = [
  {
    id: "job-101",
    company_id: "comp-55",
    title: "Desarrollador Backend Java",
    description: "Sistemas bancarios...",
    requirements_text: "Java, Spring Boot",
    type: "full_time",
    modality: "onsite",
    category_id: 3,
    city_id: 1,
    currency: "USD",
    salary_min: 1800,
    salary_max: 2500,
    payment_period: "monthly",
    is_unpaid: false,
    is_salary_visible: true,
    status: "active",
    is_active: true,
    created_at: "Hace 2 horas",
    updated_at: "",
    // Relación con Empresa
    company_profiles: {
      id: "comp-55",
      user_id: "u-55",
      company_name: "Banesco Tecnología",
      logo_url: null, 
      description: "Banco Universal",
      industry: "Finanzas",
      website: null,
      verified: true,
      city_id: 1,
      country: "Venezuela",
      phone: null,
      created_at: "",
      updated_at: ""
    },
    // Datos calculados
    match_percentage: 92,
    is_saved: true,
    is_applied: false,
  },
  {
    id: "job-102",
    company_id: "comp-66",
    title: "Pasante de Soporte Técnico",
    description: "Mantenimiento de equipos...",
    requirements_text: "Redes, Linux",
    type: "internship",
    modality: "onsite",
    category_id: 4,
    city_id: 2,
    currency: "USD",
    salary_min: 100,
    salary_max: 150,
    payment_period: "monthly",
    is_unpaid: false,
    is_salary_visible: true,
    status: "active",
    is_active: true,
    created_at: "Hace 5 horas",
    updated_at: "",
    company_profiles: {
      id: "comp-66",
      user_id: "u-66",
      company_name: "Polar",
      logo_url: null,
      description: "Alimentos Polar",
      industry: "Alimentos",
      website: null,
      verified: true,
      city_id: 2,
      country: "Venezuela",
      phone: null,
      created_at: "",
      updated_at: ""
    },
    match_percentage: 75,
    is_saved: false,
    is_applied: true,
  }
];

// --- DATOS GENÉRICOS (GRÁFICAS, CHAT, ETC) ---
// Estos no necesitan tipos estrictos por ahora, son solo para UI
export const applicationData = [
  { month: "Ene", applications: 12, interviews: 5 },
  { month: "Feb", applications: 19, interviews: 8 },
  { month: "Mar", applications: 15, interviews: 6 },
  { month: "Abr", applications: 25, interviews: 12 },
  { month: "May", applications: 30, interviews: 15 },
  { month: "Jun", applications: 28, interviews: 14 },
];

export const statusData = [
  { name: "Activos", value: 45, color: "#8b5cf6" },
  { name: "En proceso", value: 30, color: "#06b6d4" },
  { name: "Completados", value: 25, color: "#10b981" },
];

export const notifications = [
  { id: 1, type: "message", title: "Nuevo mensaje de TechCorp", time: "5m", read: false, icon: MessageSquare },
  { id: 2, type: "view", title: "DesignHub vio tu perfil", time: "1h", read: false, icon: Eye },
];

export const recentActivity = [
  { id: 1, type: "application", title: "Postulación enviada", time: "2h", icon: MessageSquare },
  { id: 2, type: "view", title: "Vistas de perfil", time: "5h", icon: Eye },
];

export const conversations = [
  {
    id: 1,
    name: "TechCorp Recruiter",
    avatar: "TC",
    lastMessage: "¿Podemos agendar una llamada?",
    time: "10m",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "DesignHub",
    avatar: "DH",
    lastMessage: "Gracias por aplicar.",
    time: "2h",
    unread: 0,
    online: false,
  }
];

export const messages = [
  { id: 1, sender: "them", text: "Hola, vimos tu perfil.", time: "10:30" },
  { id: 2, sender: "me", text: "¡Hola! Gracias por contactarme.", time: "10:35" },
];