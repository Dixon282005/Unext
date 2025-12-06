// -----------------------------------------------------
// ENUMS
// -----------------------------------------------------
export type UserRole = "admin" | "company" | "user";
export type JobStatus = "active" | "closed" | "draft";
export type ApplicationStatus = "pending" | "accepted" | "rejected";
export type JobType =
  | "full_time"
  | "part_time"
  | "contract"
  | "internship"
  | "freelance";
export type JobModality = "onsite" | "remote" | "hybrid";
export type ProfileVisibility = "public" | "private" | "connections_only";

// -----------------------------------------------------
// USERS
// -----------------------------------------------------
export interface User {
  id: string;
  email: string;
  password_hash: string;
  role: UserRole;
  is_blocked: boolean;
  is_active: boolean;
  last_seen: string | null;
  created_at: string;
  updated_at: string;
}

// -----------------------------------------------------
// USER PROFILE
// -----------------------------------------------------
export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  bio: string | null;
  city: string | null;
  country: string | null;
  phone: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  profile_photo_url: string | null;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

// -----------------------------------------------------
// COMPANY PROFILE
// -----------------------------------------------------
export interface CompanyProfile {
  id: string;
  user_id: string;
  company_name: string | null;
  description: string | null;
  industry: string | null;
  website: string | null;
  phone: string | null;
  city: string | null;
  country: string | null;
  logo_url: string | null;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

// -----------------------------------------------------
// JOB CATEGORY
// -----------------------------------------------------
export interface JobCategory {
  id: number;
  name: string;
  created_at: string;
}

// -----------------------------------------------------
// COMPANY JOBS
// -----------------------------------------------------
export interface CompanyJob {
  id: string;
  company_id: string;
  title: string | null;
  description: string | null;
  requirements_text: string | null;
  type: JobType | null;
  modality: JobModality | null;
  location: string | null;
  salary_range: string | null;
  category_id: number | null;
  status: JobStatus;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// -----------------------------------------------------
// JOB APPLICATIONS
// -----------------------------------------------------
export interface JobApplication {
  id: string;
  job_id: string;
  user_id: string;
  status: ApplicationStatus;
  created_at: string;
}

// -----------------------------------------------------
// SAVED JOBS
// -----------------------------------------------------
export interface SavedJob {
  id: string;
  user_id: string;
  job_id: string;
  created_at: string;
}

// -----------------------------------------------------
// EDUCATION
// -----------------------------------------------------
export interface Education {
  id: string;
  user_id: string;
  institution_name: string | null;
  degree: string | null;
  field_of_study: string | null;
  start_date: string | null;
  end_date: string | null;
  currently_studying: boolean;
  created_at: string;
}

// -----------------------------------------------------
// EXPERIENCE
// -----------------------------------------------------
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

// -----------------------------------------------------
// NOTIFICATIONS
// -----------------------------------------------------
export interface Notification {
  id: string;
  user_id: string;
  title: string | null;
  message: string | null;
  type: string | null;
  is_read: boolean;
  created_at: string;
}

// -----------------------------------------------------
// TAGS
// -----------------------------------------------------
export interface Tag {
  id: string;
  name: string;
}

// USER ↔ TAG
export interface UserTag {
  id: string;
  user_id: string;
  tag_id: string;
}

// JOB ↔ TAG
export interface JobTag {
  id: string;
  job_id: string;
  tag_id: string;
}

// -----------------------------------------------------
// USER SETTINGS
// -----------------------------------------------------
export interface UserSettings {
  id: string;
  user_id: string;
  language: string;
  receive_email_notifications: boolean;
  receive_push_notifications: boolean;
  profile_visibility: ProfileVisibility;
  created_at: string;
}

// -----------------------------------------------------
// USER ACTIVITY LOGS
// -----------------------------------------------------
export interface UserActivityLog {
  id: string;
  user_id: string;
  action: string | null;
  metadata: string | null;
  created_at: string;
}
