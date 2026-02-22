import { motion } from 'framer-motion';
import { Link as LinkIcon } from 'lucide-react';
import { TalentOnboardingData, StepProps } from '@/features/profile/types/onboarding.types';
import { PrimaryButton } from '../../shared/PrimaryButton';
import { variants } from '../../shared/stepVariants';
import { EDUCATION_LEVELS, YEARS_OF_EXPERIENCE_OPTIONS } from '@/features/profile/data/onboarding.constants';
import universitiesData from '@/data/venezuelan-universities.json';

const inputClass = 'w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600 text-white';

export function TStep6History({ formData, updateData, onNext }: StepProps<TalentOnboardingData>) {
  const isValid = Boolean(
    formData.educationLevel &&
    formData.institution.trim().length >= 2 &&
    formData.yearsOfExperience
  );
  const isStudent = formData.profileType === 'student';

  return (
    <motion.div key="t6" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Historial Profesional</h1>
        <p className="text-gray-400">Información sobre su trayectoria académica y laboral.</p>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Nivel Educativo</label>
            <select value={formData.educationLevel} onChange={(e) => updateData({ educationLevel: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`} style={{ WebkitAppearance: 'none' }}>
              <option value="" disabled className="text-gray-800">Seleccionar...</option>
              {EDUCATION_LEVELS.map((lvl) => <option key={lvl} value={lvl} className="text-gray-800">{lvl}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Años de carrera / graduado</label>
            <select value={formData.yearsOfExperience} onChange={(e) => updateData({ yearsOfExperience: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`} style={{ WebkitAppearance: 'none' }}>
              <option value="" disabled className="text-gray-800">Seleccionar...</option>
              {YEARS_OF_EXPERIENCE_OPTIONS.map((y) => <option key={y} value={y} className="text-gray-800">{y}</option>)}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Institución / Empresa Actual</label>
          {isStudent ? (
            <select value={formData.institution} onChange={(e) => updateData({ institution: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`} style={{ WebkitAppearance: 'none' }}>
              <option value="" disabled className="text-gray-800">Seleccione su universidad / instituto...</option>
              {(universitiesData as string[]).map((uni) => <option key={uni} value={uni} className="text-gray-800">{uni}</option>)}
            </select>
          ) : (
            <input type="text" placeholder="Nombre de la empresa o institución..." value={formData.institution} onChange={(e) => updateData({ institution: e.target.value })} className={inputClass} />
          )}
        </div>

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
