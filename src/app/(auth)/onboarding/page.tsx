"use client";

import { useRouter } from 'next/navigation';
import { OnboardingFlow, OnboardingData } from '@/features/profile/components/OnboardingFlow';
import { CompanyOnboardingFlow, CompanyOnboardingData } from '@/features/profile/components/CompanyOnboardingFlow';
import { useUser } from '@/providers/UserProvider';
import { ParallaxOrbs } from '@/app/components/landing/ParallaxOrbs';

export default function OnboardingPage() {
  const router = useRouter();
  const { userName, userType } = useUser();

  const handleTalentComplete = (data: OnboardingData) => {
    console.log("Onboarding Talento Terminado:", data);
    router.push('/dashboard');
  };

  const handleCompanyComplete = (data: CompanyOnboardingData) => {
    console.log("Onboarding Empresa Terminado:", data);
    router.push('/dashboard');
  };

  return (
    <>
      <ParallaxOrbs />
      {userType === 'company' ? (
        <CompanyOnboardingFlow
          companyAdminName={userName || 'Administrador'}
          onComplete={handleCompanyComplete}
        />
      ) : (
        <OnboardingFlow
          userName={userName || 'Usuario'}
          userType={userType}
          onComplete={handleTalentComplete}
        />
      )}
    </>
  );
}
