import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { TalentOnboardingData, StepProps } from '@/features/profile/types/onboarding.types';
import { PrimaryButton } from '../../shared/PrimaryButton';
import { variants } from '../../shared/stepVariants';
import { PLATFORM_GOALS } from '@/features/profile/data/onboarding.constants';

export function TStep5PlatformGoal({ formData, updateData, onNext }: StepProps<TalentOnboardingData>) {
  const goals = PLATFORM_GOALS[formData.profileType || 'student'] as readonly string[];
  const isValid = !!formData.platformGoal;

  return (
    <motion.div key="t5" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Objetivos Profesionales</h1>
        <p className="text-gray-400">Seleccione su objetivo principal en nuestra plataforma.</p>
      </div>

      <div className="grid gap-3">
        {goals.map((goal) => {
          const isActive = formData.platformGoal === goal;
          return (
            <button
              key={goal}
              onClick={() => updateData({ platformGoal: goal })}
              className={`p-4 rounded-xl border transition-all text-left flex items-center justify-between group ${
                isActive ? 'bg-white/10 border-purple-500/50 ring-1 ring-purple-500/30' : 'bg-white/2 border-white/8 hover:border-white/15 hover:bg-white/4'
              }`}
            >
              <span className={`text-sm md:text-base font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>{goal}</span>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 transition-colors ${isActive ? 'border-purple-500 bg-purple-500' : 'border-gray-600 group-hover:border-gray-500'}`}>
                {isActive && <Check className="w-3 h-3 text-white" />}
              </div>
            </button>
          );
        })}
      </div>

      <PrimaryButton disabled={!isValid} onClick={onNext} text="Continuar" />
    </motion.div>
  );
}
