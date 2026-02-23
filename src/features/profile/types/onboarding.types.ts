// ===== TALENT ONBOARDING =====
export interface TalentOnboardingData {
  profileType: 'student' | 'professional' | 'company' | null;
  country: string;
  state: string;
  city: string;
  address1: string;
  address2: string;
  phone: string;
  profession: string;
  skills: string[];
  platformGoal: string | null;
  educationLevel: string;
  institution: string;
  yearsOfExperience: string;
  portfolioLink: string;
  workBudget: string;
  workSchedule: string;
  workModality: string;
  file: File | null;
}

// ===== COMPANY ONBOARDING =====
export interface CompanyOnboardingData {
  companyName: string;
  legalName: string;
  taxId: string;
  country: string;
  state: string;
  city: string;
  address1: string;
  address2: string;
  phone: string;
  website: string;
  sector: string;
  companySize: string;
  hiringGoal: string;
  talentTypes: string[];
  linkedinPage: string;
  workBudget: string;
  workSchedule: string;
  workModality: string;
  logoFile: File | null;
}

// ===== SHARED STEP PROPS =====
export interface StepProps<T> {
  formData: T;
  updateData: (fields: Partial<T>) => void;
  onNext: () => void;
  onBack?: () => void;
}
