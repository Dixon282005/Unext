'use client';
import { TalentOnboarding } from './talent/TalentOnboarding';
import { CompanyOnboarding } from './company/CompanyOnboarding';
import { TalentOnboardingData } from '@/features/profile/types/onboarding.types';
import { CompanyOnboardingData } from '@/features/profile/types/onboarding.types';

interface OnboardingRouterProps {
  userType: 'student' | 'company';
  userName: string;
  onTalentComplete: (data: TalentOnboardingData) => void;
  onCompanyComplete: (data: CompanyOnboardingData) => void;
}

export function OnboardingRouter({ userType, userName, onTalentComplete, onCompanyComplete }: OnboardingRouterProps) {
  if (userType === 'company') {
    return (
      <CompanyOnboarding
        companyAdminName={userName}
        onComplete={onCompanyComplete}
      />
    );
  }

  return (
    <TalentOnboarding
      userName={userName}
      userType={userType}
      onComplete={onTalentComplete}
    />
  );
}
