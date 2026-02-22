import { motion } from 'framer-motion';
import { Check, Link as LinkIcon } from 'lucide-react';
import { CompanyOnboardingData, StepProps } from '@/features/profile/types/onboarding.types';
import { PrimaryButton } from '../../shared/PrimaryButton';
import { variants } from '../../shared/stepVariants';
import { TALENT_TYPE_OPTIONS } from '@/features/profile/data/onboarding.constants';

const inputClass = 'w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600 text-white';

export function CStep5Talent({ formData, updateData, onNext }: StepProps<CompanyOnboardingData>) {
  const isValid = formData.talentTypes.length > 0;

  const toggle = (type: string) => {
    const current = formData.talentTypes;
    if (current.includes(type)) {
      updateData({ talentTypes: current.filter((t) => t !== type) });
    } else if (current.length < 5) {
      updateData({ talentTypes: [...current, type] });
    }
  };

  return (
    <motion.div key="c5" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Tipos de Talento</h1>
        <p className="text-gray-400">Seleccione hasta 5 categorías de talento que busca.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Áreas de Interés *</label>
          <span className="text-xs text-purple-400">{formData.talentTypes.length}/5 seleccionados</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {TALENT_TYPE_OPTIONS.map((type) => {
            const isSelected = formData.talentTypes.includes(type);
            const isDisabled = !isSelected && formData.talentTypes.length >= 5;
            return (
              <button key={type} onClick={() => toggle(type)} disabled={isDisabled}
                className={`p-3.5 rounded-xl border transition-all text-left flex items-center justify-between gap-2 ${
                  isSelected ? 'bg-purple-500/15 border-purple-500/50 ring-1 ring-purple-500/20'
                  : isDisabled ? 'opacity-40 cursor-not-allowed bg-white/2 border-white/5'
                  : 'bg-white/2 border-white/8 hover:border-white/15 hover:bg-white/4'
                }`}
              >
                <span className={`text-sm font-medium ${isSelected ? 'text-purple-200' : 'text-gray-300'}`}>{type}</span>
                <div className={`w-5 h-5 rounded shrink-0 border flex items-center justify-center ${isSelected ? 'bg-purple-500 border-purple-500' : 'border-gray-600'}`}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="space-y-1.5 pt-4 border-t border-white/10">
          <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">LinkedIn Empresarial (Opcional)</label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="url" placeholder="https://linkedin.com/company/..." value={formData.linkedinPage} onChange={(e) => updateData({ linkedinPage: e.target.value })} className={`${inputClass} pl-9`} />
          </div>
        </div>
      </div>

      <PrimaryButton disabled={!isValid} onClick={onNext} text="Continuar" />
    </motion.div>
  );
}
