'use client';
import { useState } from 'react';
import { TalentOnboardingData } from '@/features/profile/types/onboarding.types';
import { OnboardingLayout } from '../shared/OnboardingLayout';
import { TStep1Goal } from './steps/TStep1Goal';
import { TStep2Demographics } from './steps/TStep2Demographics';
import { TStep3OTP } from './steps/TStep3OTP';
import { TStep4Skills } from './steps/TStep4Skills';
import { TStep5PlatformGoal } from './steps/TStep5PlatformGoal';
import { TStep6History } from './steps/TStep6History';
import { TStep7Document } from './steps/TStep7Document';

const TOTAL_STEPS = 7;

const INITIAL_DATA: TalentOnboardingData = {
  profileType: null,
  country: '', state: '', city: '',
  address1: '', address2: '',
  phone: '', profession: '',
  skills: [], platformGoal: null,
  educationLevel: '', institution: '',
  yearsOfExperience: '', portfolioLink: '',
  file: null,
};

interface TalentOnboardingProps {
  userName: string;
  userType?: 'student' | 'company';
  onComplete: (data: TalentOnboardingData) => void;
}

export function TalentOnboarding({ userName, userType = 'student', onComplete }: TalentOnboardingProps) {
  const startStep = userType === 'company' ? 2 : 1;
  const [currentStep, setCurrentStep] = useState(startStep);
  const [formData, setFormData] = useState<TalentOnboardingData>({
    ...INITIAL_DATA,
    profileType: userType === 'company' ? 'company' : null,
  });

  const updateData = (fields: Partial<TalentOnboardingData>) =>
    setFormData((prev) => ({ ...prev, ...fields }));

  const canGoBack = currentStep > startStep;
  const prevStep = () => { if (canGoBack) setCurrentStep((v) => v - 1); };
  const nextStep = () => { if (currentStep < TOTAL_STEPS) setCurrentStep((v) => v + 1); };

  const stepProps = { formData, updateData, onNext: nextStep, onBack: prevStep };

  return (
    <OnboardingLayout currentStep={currentStep} totalSteps={TOTAL_STEPS} onBack={prevStep} canGoBack={canGoBack}>
      {currentStep === 1 && <TStep1Goal {...stepProps} />}
      {currentStep === 2 && <TStep2Demographics {...stepProps} />}
      {currentStep === 3 && <TStep3OTP {...stepProps} />}
      {currentStep === 4 && <TStep4Skills {...stepProps} />}
      {currentStep === 5 && <TStep5PlatformGoal {...stepProps} />}
      {currentStep === 6 && <TStep6History {...stepProps} />}
      {currentStep === 7 && <TStep7Document {...stepProps} onNext={() => onComplete(formData)} />}
    </OnboardingLayout>
  );
}
