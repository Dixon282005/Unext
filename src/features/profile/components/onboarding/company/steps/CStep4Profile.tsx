import { motion } from 'framer-motion';
import { Check, Users, Briefcase, Wifi, Building, MapPin } from 'lucide-react';
import { CompanyOnboardingData, StepProps } from '@/features/profile/types/onboarding.types';
import { PrimaryButton } from '../../shared/PrimaryButton';
import { variants } from '../../shared/stepVariants';
import {
  COMPANY_SIZES, HIRING_GOALS,
  WORK_MODALITY, WORK_SCHEDULE, WORK_BUDGET_OPTIONS,
} from '@/features/profile/data/onboarding.constants';

const inputClass = 'w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600 text-white';
const MODALITY_ICONS = { remote: Wifi, hybrid: Building, onsite: MapPin };

export function CStep4Profile({ formData, updateData, onNext }: StepProps<CompanyOnboardingData>) {
  const isValid = formData.companySize !== '' && formData.hiringGoal !== '' && formData.workModality !== '' && formData.workSchedule !== '';

  return (
    <motion.div key="c4" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Perfil de Empresa</h1>
        <p className="text-gray-400">Tamaño, objetivos y condiciones laborales que ofrece su empresa.</p>
      </div>

      <div className="space-y-6">
        {/* Tamaño */}
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

        {/* Objetivo de contratación */}
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

        {/* Modalidad */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Modalidad de Trabajo Ofrecida *</label>
          <div className="grid grid-cols-3 gap-3">
            {WORK_MODALITY.map(({ id, label, desc }) => {
              const Icon = MODALITY_ICONS[id as keyof typeof MODALITY_ICONS];
              const isActive = formData.workModality === id;
              return (
                <button key={id} onClick={() => updateData({ workModality: id })}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all text-center ${isActive ? 'bg-purple-500/15 border-purple-500 ring-1 ring-purple-500/30' : 'bg-white/2 border-white/8 hover:border-white/15 hover:bg-white/4'}`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'text-gray-400'}`} />
                  <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>{label}</span>
                  <span className={`text-xs leading-tight ${isActive ? 'text-purple-300' : 'text-gray-600'}`}>{desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Horario y Presupuesto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Horario Laboral Ofrecido *</label>
            <select value={formData.workSchedule} onChange={(e) => updateData({ workSchedule: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`} style={{ WebkitAppearance: 'none' }}>
              <option value="" disabled className="text-gray-800">Seleccionar...</option>
              {WORK_SCHEDULE.map((s) => <option key={s} value={s} className="text-gray-800">{s}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Presupuesto de Contratación (Opcional)</label>
            <select value={formData.workBudget} onChange={(e) => updateData({ workBudget: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`} style={{ WebkitAppearance: 'none' }}>
              <option value="" disabled className="text-gray-800">Seleccionar...</option>
              {WORK_BUDGET_OPTIONS.map((b) => <option key={b} value={b} className="text-gray-800">{b}</option>)}
            </select>
          </div>
        </div>
      </div>

      <PrimaryButton disabled={!isValid} onClick={onNext} text="Continuar" />
    </motion.div>
  );
}
