import { motion } from 'framer-motion';
import { Link as LinkIcon, Wifi, Building, MapPin } from 'lucide-react';
import { TalentOnboardingData, StepProps } from '@/features/profile/types/onboarding.types';
import { PrimaryButton } from '../../shared/PrimaryButton';
import { variants } from '../../shared/stepVariants';
import {
  EDUCATION_LEVELS, YEARS_OF_EXPERIENCE_OPTIONS,
  WORK_MODALITY, WORK_SCHEDULE, WORK_BUDGET_OPTIONS,
} from '@/features/profile/data/onboarding.constants';
import universitiesData from '@/data/venezuelan-universities.json';

const inputClass = 'w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600 text-white';
const MODALITY_ICONS = { remote: Wifi, hybrid: Building, onsite: MapPin };

export function TStep6History({ formData, updateData, onNext }: StepProps<TalentOnboardingData>) {
  const isBachiller = formData.educationLevel === 'Bachillerato / Secundaria';
  const isValid = Boolean(
    formData.educationLevel &&
    (formData.institution && formData.institution.trim().length >= 2) &&
    (isBachiller || formData.yearsOfExperience) &&
    formData.workModality &&
    formData.workSchedule
  );
  const isStudent = formData.profileType === 'student';

  const handleEducationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newEducationLevel = e.target.value;
    if (newEducationLevel === 'Bachillerato / Secundaria') {
      updateData({
        educationLevel: newEducationLevel,
        yearsOfExperience: '',
      });
    } else {
      updateData({ educationLevel: newEducationLevel });
    }
  };

  return (
    <motion.div key="t6" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Historial y Preferencias</h1>
        <p className="text-gray-400">Trayectoria académica, laboral y condiciones ideales de trabajo.</p>
      </div>

      <div className="space-y-5">
        {/* Educación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Nivel Educativo *</label>
            <select value={formData.educationLevel} onChange={handleEducationChange} className={`${inputClass} appearance-none cursor-pointer`} style={{ WebkitAppearance: 'none' }}>
              <option value="" disabled className="text-gray-800">Seleccionar...</option>
              {EDUCATION_LEVELS.map((lvl) => <option key={lvl} value={lvl} className="text-gray-800">{lvl}</option>)}
            </select>
          </div>
          {!isBachiller && (
            <div className="space-y-2">
              <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Años de carrera *</label>
              <select value={formData.yearsOfExperience} onChange={(e) => updateData({ yearsOfExperience: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`} style={{ WebkitAppearance: 'none' }}>
                <option value="" disabled className="text-gray-800">Seleccionar...</option>
                {YEARS_OF_EXPERIENCE_OPTIONS.map((y) => <option key={y} value={y} className="text-gray-800">{y}</option>)}
              </select>
            </div>
          )}
        </div>

        {/* Institución */}
        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Institución / Empresa Actual *</label>
          {isStudent ? (
            <select value={formData.institution} onChange={(e) => updateData({ institution: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`} style={{ WebkitAppearance: 'none' }}>
              <option value="" disabled className="text-gray-800">Seleccione su universidad...</option>
              {(universitiesData as string[]).map((uni) => <option key={uni} value={uni} className="text-gray-800">{uni}</option>)}
            </select>
          ) : (
            <input type="text" placeholder="Nombre de la empresa..." value={formData.institution} onChange={(e) => updateData({ institution: e.target.value })} className={inputClass} />
          )}
        </div>

        {/* Modalidad */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Modalidad Preferida *</label>
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
            <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Horario Preferido *</label>
            <select value={formData.workSchedule} onChange={(e) => updateData({ workSchedule: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`} style={{ WebkitAppearance: 'none' }}>
              <option value="" disabled className="text-gray-800">Seleccionar...</option>
              {WORK_SCHEDULE.map((s) => <option key={s} value={s} className="text-gray-800">{s}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Expectativa Salarial (Opcional)</label>
            <select value={formData.workBudget} onChange={(e) => updateData({ workBudget: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`} style={{ WebkitAppearance: 'none' }}>
              <option value="" disabled className="text-gray-800">Seleccionar...</option>
              {WORK_BUDGET_OPTIONS.map((b) => <option key={b} value={b} className="text-gray-800">{b}</option>)}
            </select>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">LinkedIn / Sitio Web (Opcional)</label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="url" placeholder="https://..." value={formData.portfolioLink} onChange={(e) => updateData({ portfolioLink: e.target.value })} className={`${inputClass} pl-9`} />
          </div>
        </div>
      </div>

      <PrimaryButton disabled={!isValid} onClick={onNext} text="Guardar Información" />
    </motion.div>
  );
}
