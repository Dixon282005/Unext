import { motion } from 'framer-motion';
import { Check, Users, Briefcase } from 'lucide-react';
import { CompanyOnboardingData, StepProps } from '@/features/profile/types/onboarding.types';
import { PrimaryButton } from '../../shared/PrimaryButton';
import { variants } from '../../shared/stepVariants';
import { COMPANY_SIZES, HIRING_GOALS } from '@/features/profile/data/onboarding.constants';

export function CStep4Profile({ formData, updateData, onNext }: StepProps<CompanyOnboardingData>) {
  const isValid = formData.companySize !== '' && formData.hiringGoal !== '';

  return (
    <motion.div key="c4" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Perfil de Empresa</h1>
        <p className="text-gray-400">Indique el tamaño y sus objetivos de contratación.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-xs text-gray-500 uppercase tracking-wider font-medium flex items-center gap-2">
            <Users className="w-3.5 h-3.5" /> Tamaño de la Empresa *
          </label>
          <div className="grid grid-cols-1 gap-2">
            {COMPANY_SIZES.map((size) => {
              const isActive = formData.companySize === size;
              return (
                <button key={size} onClick={() => updateData({ companySize: size })} className={`p-3.5 rounded-xl border transition-all text-left flex items-center justify-between ${isActive ? 'bg-white/10 border-purple-500/50 ring-1 ring-purple-500/30' : 'bg-white/2 border-white/8 hover:border-white/15'}`}>
                  <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>{size}</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isActive ? 'border-purple-500 bg-purple-500' : 'border-gray-600'}`}>
                    {isActive && <Check className="w-3 h-3 text-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs text-gray-500 uppercase tracking-wider font-medium flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5" /> Objetivo Principal de Contratación *
          </label>
          <div className="grid gap-2">
            {HIRING_GOALS.map((goal) => {
              const isActive = formData.hiringGoal === goal;
              return (
                <button key={goal} onClick={() => updateData({ hiringGoal: goal })} className={`p-4 rounded-xl border transition-all text-left flex items-center justify-between ${isActive ? 'bg-white/10 border-purple-500/50 ring-1 ring-purple-500/30' : 'bg-white/2 border-white/8 hover:border-white/15'}`}>
                  <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>{goal}</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${isActive ? 'border-purple-500 bg-purple-500' : 'border-gray-600'}`}>
                    {isActive && <Check className="w-3 h-3 text-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <PrimaryButton disabled={!isValid} onClick={onNext} text="Continuar" />
    </motion.div>
  );
}
