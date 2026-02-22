"use client";

import { useRouter } from 'next/navigation';
import { OnboardingFlow, OnboardingData } from '@/features/profile/components/OnboardingFlow';
import { useUser } from '@/providers/UserProvider';
import { ParallaxOrbs } from '@/app/components/landing/ParallaxOrbs';

export default function OnboardingPage() {
  const router = useRouter();
  const { userName } = useUser();

  const handleComplete = (data: OnboardingData) => {
    // Aquí iría la lógica para enviar al backend (Supabase)
    console.log("Onboarding Terminado vía App Router:", data);
    
    // Al finalizar el onboarding exitosamente, lo mandamos al dashboard real
    router.push('/dashboard');
  };

  return (
    <>
      <ParallaxOrbs />
      <OnboardingFlow 
        userName={userName || 'Usuario'} 
        onComplete={handleComplete} 
      />
    </>
  );
}
