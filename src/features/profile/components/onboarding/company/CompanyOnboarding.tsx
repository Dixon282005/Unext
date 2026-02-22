'use client';
import { useState } from 'react';
import { CompanyOnboardingData } from '@/features/profile/types/onboarding.types';
import { OnboardingLayout } from '../shared/OnboardingLayout';
import { CStep1Identity } from './steps/CStep1Identity';
import { CStep2Location } from './steps/CStep2Location';
import { CStep3OTP } from './steps/CStep3OTP';
import { CStep4Profile } from './steps/CStep4Profile';
import { CStep5Talent } from './steps/CStep5Talent';
import { CStep6Logo } from './steps/CStep6Logo';

const TOTAL_STEPS = 6;

const INITIAL_DATA: CompanyOnboardingData = {
  companyName: '', legalName: '', taxId: '',
  country: '', state: '', city: '',
  address1: '', address2: '',
  phone: '', website: '',
  sector: '', companySize: '',
  hiringGoal: '', talentTypes: [],
  linkedinPage: '', logoFile: null,
};

interface CompanyOnboardingProps {
  companyAdminName: string;
  onComplete: (data: CompanyOnboardingData) => void;
}

export function CompanyOnboarding({ companyAdminName, onComplete }: CompanyOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CompanyOnboardingData>(INITIAL_DATA);

  const updateData = (fields: Partial<CompanyOnboardingData>) =>
    setFormData((prev) => ({ ...prev, ...fields }));

  const canGoBack = currentStep > 1;
  const prevStep = () => { if (canGoBack) setCurrentStep((v) => v - 1); };
  const nextStep = () => { if (currentStep < TOTAL_STEPS) setCurrentStep((v) => v + 1); };

  const stepProps = { formData, updateData, onNext: nextStep, onBack: prevStep };

  return (
    <OnboardingLayout currentStep={currentStep} totalSteps={TOTAL_STEPS} onBack={prevStep} canGoBack={canGoBack}>
      {currentStep === 1 && <CStep1Identity {...stepProps} />}
      {currentStep === 2 && <CStep2Location {...stepProps} />}
      {currentStep === 3 && <CStep3OTP {...stepProps} />}
      {currentStep === 4 && <CStep4Profile {...stepProps} />}
      {currentStep === 5 && <CStep5Talent {...stepProps} />}
      {currentStep === 6 && <CStep6Logo {...stepProps} onNext={() => onComplete(formData)} />}
    </OnboardingLayout>
  );
}
