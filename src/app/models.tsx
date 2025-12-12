// -----------------------------------------------------
// ENUMS
// -----------------------------------------------------
export type UserRole = "admin" | "company" | "user";
export type JobStatus = "active" | "closed" | "draft";
export type ApplicationStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "interview";
export type JobType =
  | "full_time"
  | "part_time"
  | "contract"
  | "internship"
  | "freelance"
  | "volunteering";
export type JobModality = "onsite" | "remote" | "hybrid";
export type ProfileVisibility = "public" | "private" | "connections_only";

// Nuevos Enums
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
// CATALOGS (Tablas auxiliares locales)
// -----------------------------------------------------

export interface State {
  id: number;
  name: string; // "Aragua", "Carabobo"
}

export interface City {
  id: number;
  state_id: number;
  name: string; // "Maracay", "Valencia"
  // Opcional para Joins
  states?: State;
}

export interface CareerCatalog {
  id: number;
  name: string; // "Ingeniería de Sistemas"
  area: string | null;
}

export interface JobCategory {
  id: number;
  name: string;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
}

// -----------------------------------------------------
// PUBLIC PROFILE (Tabla: profiles)
// -----------------------------------------------------
export interface UserProfile {
  id: string;
  role: UserRole;
  full_name: string | null;
  bio: string | null;

  // UBICACIÓN LOCAL (Relación con tus tablas)
  city_id: number | null;
  // Mantenemos city_text por si el usuario no encontró su ciudad en la lista
  city_text: string | null;
  country: string | null; // "Venezuela" por defecto

  phone: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  avatar_url: string | null;

  is_active: boolean;
  is_blocked: boolean;
  created_at: string;
  updated_at: string;

  // Para mostrar el nombre de la ciudad bonita en el frontend
  cities?: City;
}

// -----------------------------------------------------
// COMPANY PROFILE (Tabla: company_profiles)
// -----------------------------------------------------
export interface CompanyProfile {
  id: string;
  user_id: string;
  company_name: string | null;
  description: string | null;
  industry: string | null;
  website: string | null;
  logo_url: string | null;
  verified: boolean;

  // Ubicación Empresa
  city_id: number | null;
  country: string | null;
  phone: string | null;

  created_at: string;
  updated_at: string;

  // Join
  cities?: City;
}

// -----------------------------------------------------
// JOBS (Tabla: company_jobs)
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

  // UBICACIÓN LOCAL
  city_id: number | null;

  // PAGOS Y MONEDA
  currency: CurrencyType;
  salary_min: number | null;
  salary_max: number | null;
  payment_period: PaymentPeriod;
  is_unpaid: boolean;
  is_salary_visible: boolean;

  status: JobStatus;
  is_active: boolean;
  created_at: string;
  updated_at: string;

  // Joins comunes
  company_profiles?: CompanyProfile;
  job_categories?: JobCategory;
  cities?: City; // Para mostrar "Maracay" en vez del ID 45
}

// -----------------------------------------------------
// JOB APPLICATIONS (Tabla: job_applications)
// -----------------------------------------------------
export interface JobApplication {
  id: string;
  job_id: string;
  user_id: string;
  status: ApplicationStatus;

  resume_url: string | null;
  cover_letter: string | null;

  created_at: string;

  // Joins
  company_jobs?: CompanyJob;
  profiles?: UserProfile;
}

// -----------------------------------------------------
// EDUCATION (Tabla: education)
// -----------------------------------------------------
export interface Education {
  id: string;
  user_id: string;
  institution_name: string;

  level: EducationLevel;
  degree_name: string | null;

  // RELACIÓN CON TU CATÁLOGO
  career_id?: number | null;
  title_text: string; // Lo que escribió si no usó el catálogo

  field_of_study?: string | null;
  start_date: string | null;
  end_date: string | null;
  currently_studying: boolean;
  created_at: string;

  // Join para mostrar el nombre oficial
  career_catalog?: CareerCatalog;
}

// -----------------------------------------------------
// OTRAS (Sin cambios mayores)
// -----------------------------------------------------

export interface SavedJob {
  id: string;
  user_id: string;
  job_id: string;
  created_at: string;
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

export interface UserSettings {
  id: string;
  user_id: string;
  language: string;
  receive_email_notifications: boolean;
  receive_push_notifications: boolean;
  profile_visibility: ProfileVisibility;
  created_at: string;
}
