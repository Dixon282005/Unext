// -----------------------------------------------------
// ENUMS (Nuevos y Actualizados)
// -----------------------------------------------------
export type UserRole = "admin" | "company" | "user";
export type JobStatus = "active" | "closed" | "draft";
export type ApplicationStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "interview"; // Agregado interview

export type JobType =
  | "full_time"
  | "part_time"
  | "contract"
  | "internship"
  | "freelance"
  | "volunteering"; // Agregado para pasantías sin fines de lucro

export type JobModality = "onsite" | "remote" | "hybrid";
export type ProfileVisibility = "public" | "private" | "connections_only";

// NUEVOS ENUMS
export type CurrencyType = "USD" | "VES";
export type PaymentPeriod = "monthly" | "hourly" | "project" | "one_time";
export type EducationLevel =
  | "high_school"
  | "technical"
  | "undergraduate"
  | "postgraduate"
  | "bootcamp"
  | "course"
  | "other";

// -----------------------------------------------------
// AUTH USER (Lo que te devuelve supabase.auth.getUser())
// -----------------------------------------------------
export interface AuthUser {
  id: string;
  email: string;
  // password_hash NO se maneja en el frontend por seguridad
  created_at: string;
  last_sign_in_at?: string;
}

// -----------------------------------------------------
// PUBLIC PROFILE (Tabla: profiles)
// -----------------------------------------------------
export interface UserProfile {
  id: string; // Es igual al user_id de auth
  role: UserRole;
  full_name: string | null;
  bio: string | null;

  // Ubicación mejorada (Google Places)
  city: string | null; // Nombre legible "Caracas"
  country: string | null; // "Venezuela"
  location_lat?: number | null;
  location_lng?: number | null;
  google_place_id?: string | null;

  phone: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  avatar_url: string | null; // Corregido de profile_photo_url a avatar_url (según SQL)

  // Estado
  is_active: boolean;
  is_blocked: boolean;

  created_at: string;
  updated_at: string;
}

// -----------------------------------------------------
// COMPANY PROFILE (Tabla: company_profiles)
// -----------------------------------------------------
export interface CompanyProfile {
  id: string;
  user_id: string; // Dueño de la empresa
  company_name: string | null;
  description: string | null;
  industry: string | null;
  website: string | null;
  logo_url: string | null;
  verified: boolean;

  // Ubicación
  city: string | null;
  country: string | null;
  phone: string | null;

  created_at: string;
  updated_at: string;
}

// -----------------------------------------------------
// JOBS (Tabla: company_jobs) - CAMBIOS IMPORTANTES
// -----------------------------------------------------
export interface CompanyJob {
  id: string;
  company_id: string;
  title: string;
  description: string;
  requirements_text: string | null;

  type: JobType;
  modality: JobModality;
  category_id: number | null;

  // Ubicación
  location: string | null; // Texto legible
  location_lat?: number | null;
  location_lng?: number | null;
  google_place_id?: string | null;

  // >>> NUEVA LÓGICA DE SALARIOS <<<
  currency: CurrencyType; // 'USD' | 'VES'
  salary_min: number | null; // Antes string, ahora number
  salary_max: number | null; // Nuevo
  payment_period: PaymentPeriod; // Nuevo
  is_unpaid: boolean; // Nuevo (True = "A convenir" o Pasantía)
  is_salary_visible: boolean; // Nuevo (Para ocultar monto exacto)

  status: JobStatus;
  is_active: boolean;
  created_at: string;
  updated_at: string;

  // Opcional: Para cuando haces JOIN con la empresa
  company_profiles?: CompanyProfile;
}

// -----------------------------------------------------
// JOB APPLICATIONS (Tabla: job_applications)
// -----------------------------------------------------
export interface JobApplication {
  id: string;
  job_id: string;
  user_id: string;
  status: ApplicationStatus;

  // Nuevos campos
  resume_url: string | null; // PDF del CV
  cover_letter: string | null;

  created_at: string;

  // Opcional: Para JOINs
  company_jobs?: CompanyJob;
  profiles?: UserProfile;
}

// -----------------------------------------------------
// EDUCATION (Tabla: education) - CAMBIOS IMPORTANTES
// -----------------------------------------------------
export interface Education {
  id: string;
  user_id: string;
  institution_name: string;

  level: EducationLevel; // Nuevo enum
  degree_name: string | null; // Título específico

  // Relación con catálogo (si aplica)
  career_id?: number | null;
  title_text: string; // Texto de respaldo

  field_of_study?: string | null;
  start_date: string | null;
  end_date: string | null;
  currently_studying: boolean;
  created_at: string;
}

// -----------------------------------------------------
// CAREER CATALOG (Tabla: career_catalog) - NUEVO
// -----------------------------------------------------
export interface CareerCatalog {
  id: number;
  name: string;
  area: string | null;
}

// -----------------------------------------------------
// OTRAS TABLAS (Sin cambios mayores)
// -----------------------------------------------------

export interface JobCategory {
  id: number;
  name: string;
  created_at: string;
}

export interface SavedJob {
  id: string;
  user_id: string;
  job_id: string;
  created_at: string;
  // Opcional join
  company_jobs?: CompanyJob;
}

export interface Experience {
  id: string;
  user_id: string;
  company_name: string | null;
  job_title: string | null;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  currently_working: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string | null;
  message: string | null;
  type: string | null;
  is_read: boolean;
  created_at: string;
}

// TAGS
export interface Tag {
  id: string;
  name: string;
}

export interface UserSettings {
  id: string;
  user_id: string;
  language: string;
  receive_email_notifications: boolean;
  receive_push_notifications: boolean;
  profile_visibility: ProfileVisibility;
  created_at: string;
}

export interface UserActivityLog {
  id: string;
  user_id: string;
  action: string | null;
  metadata: string | null; // En Supabase esto suele ser JSON, en TS string o any
  created_at: string;
}
