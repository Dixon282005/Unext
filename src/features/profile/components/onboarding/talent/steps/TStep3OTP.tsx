import { useState } from 'react';
import { motion } from 'framer-motion';
import { TalentOnboardingData, StepProps } from '@/features/profile/types/onboarding.types';
import { OTPPinInput } from '../../shared/OTPPinInput';
import { PrimaryButton } from '../../shared/PrimaryButton';
import { stepVariants as variants } from '../../shared/stepVariants';
import { OTP_DEMO_CODE } from '@/features/profile/data/onboarding.constants';

export function TStep3OTP({ formData, onNext }: StepProps<TalentOnboardingData>) {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const isValid = digits.join('') === OTP_DEMO_CODE;

  return (
    <motion.div key="t3" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Verificación Telefónica</h1>
        <p className="text-gray-400">Código SMS enviado al número {formData.phone || 'indicado'}.</p>
        <p className="text-sm text-purple-400/80">(Simulación: digite {OTP_DEMO_CODE})</p>
      </div>

      <div className="pt-4">
        <OTPPinInput value={digits} onChange={setDigits} />
      </div>

      <PrimaryButton disabled={!isValid} onClick={onNext} text="Verificar y Continuar" />
    </motion.div>
  );
}
