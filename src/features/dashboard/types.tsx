import { 
  CompanyJob, 
  UserProfile, 
  CompanyProfile 
} from "@/app/models"; // <--- Importamos tus modelos reales

// 1. Tipo para una Vacante en el Dashboard (Empresa)
// Extendemos tu CompanyJob y le agregamos contadores que vienen de la query
export interface DashboardCompanyJob extends CompanyJob {
  applicants_count: number;
  views_count: number;
  interviews_count: number;
}

// 2. Tipo para una Vacante vista por un Estudiante (Join con Empresa)
// Así es como Supabase te devuelve los datos cuando haces:
// .select('*, company_profiles(*)')
export interface DashboardStudentJob extends CompanyJob {
  company_profiles: CompanyProfile; // Datos de la empresa (logo, nombre)
  match_percentage: number;         // Calculado por tu algoritmo
  is_saved: boolean;
  is_applied: boolean;
}

// 3. Tipo para un Candidato en el Dashboard
// Un perfil de usuario + datos de su aplicación específica
export interface DashboardCandidate extends UserProfile {
  application_id: string;
  applied_at: string;
  status: "pending" | "accepted" | "rejected" | "interview"; // Usamos tu Enum si es posible, o string
  match_percentage: number;
  job_title_applied: string;
}