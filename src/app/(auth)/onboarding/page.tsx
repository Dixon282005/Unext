"use client";

import { useRouter } from 'next/navigation';
import { useUser } from '@/providers/UserProvider';
import { ParallaxOrbs } from '@/app/components/landing/ParallaxOrbs';
import { OnboardingRouter } from '@/features/profile/components/onboarding/OnboardingRouter';
import type { TalentOnboardingData } from '@/features/profile/types/onboarding.types';
import type { CompanyOnboardingData } from '@/features/profile/types/onboarding.types';

export default function OnboardingPage() {
  const router = useRouter();
  const { userName, userType } = useUser();

  const handleTalentComplete = (data: TalentOnboardingData) => {
    console.log('Onboarding Talento:', data);
    router.push('/dashboard');
  };

  const handleCompanyComplete = (data: CompanyOnboardingData) => {
    console.log('Onboarding Empresa:', data);
    router.push('/dashboard');
  };

  return (
    <>
      <ParallaxOrbs />
      <OnboardingRouter
        userType={userType}
        userName={userName || 'Usuario'}
        onTalentComplete={handleTalentComplete}
        onCompanyComplete={handleCompanyComplete}
      />
    </>
  );
}
