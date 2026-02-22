import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { TalentOnboardingData, StepProps } from '@/features/profile/types/onboarding.types';
import { PrimaryButton } from '../../shared/PrimaryButton';
import { variants } from '../../shared/stepVariants';
import { COMMON_SKILLS } from '@/features/profile/data/onboarding.constants';
import careersData from '@/data/careers.json';

const inputClass = 'w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600 text-white';

export function TStep4Skills({ formData, updateData, onNext }: StepProps<TalentOnboardingData>) {
  const [skillInput, setSkillInput] = useState('');
  const isValid = formData.profession.trim().length > 0 && formData.skills.length > 0;

  const addSkill = (skill: string) => {
    const s = skill.trim();
    if (s && !formData.skills.includes(s) && formData.skills.length < 3) {
      updateData({ skills: [...formData.skills, s] });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => updateData({ skills: formData.skills.filter((s) => s !== skill) });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addSkill(skillInput); }
  };

  const isStudent = formData.profileType === 'student';

  return (
    <motion.div key="t4" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Especialidad y Habilidades</h1>
        <p className="text-gray-400">Defina su área de enfoque principal.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">
            {isStudent ? 'Carrera o Profesión' : 'Área Profesional'}
          </label>
          {isStudent ? (
            <select value={formData.profession} onChange={(e) => updateData({ profession: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`} style={{ WebkitAppearance: 'none' }}>
              <option value="" disabled className="text-gray-800">Seleccione una carrera...</option>
              {careersData.map((c: string) => <option key={c} value={c} className="text-gray-800">{c}</option>)}
            </select>
          ) : (
            <input type="text" placeholder="Ej. Tecnología, Finanzas, Salud..." value={formData.profession} onChange={(e) => updateData({ profession: e.target.value })} className={inputClass} />
          )}
        </div>

        <div className="space-y-3">
          <label className="text-xs text-gray-500 uppercase tracking-wider font-medium flex justify-between">
            Top 3 Habilidades Clave
            <span className="text-purple-500">{formData.skills.length}/3</span>
          </label>
          <div className="flex flex-wrap gap-2 mb-3 min-h-[40px]">
            {formData.skills.map((skill) => (
              <span key={skill} className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
                {skill}
                <button onClick={() => removeSkill(skill)}><X className="w-3.5 h-3.5" /></button>
              </span>
            ))}
            {formData.skills.length === 0 && <span className="text-gray-600 text-sm italic">Agregue hasta 3 habilidades</span>}
          </div>
          <div className="relative">
            <input
              type="text"
              disabled={formData.skills.length >= 3}
              placeholder={formData.skills.length >= 3 ? 'Límite alcanzado' : 'Escriba y presione Enter...'}
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            {skillInput.length > 0 && formData.skills.length < 3 && (
              <div className="absolute z-50 w-full mt-1 bg-[#111] border border-white/10 rounded-lg shadow-xl overflow-hidden max-h-40 overflow-y-auto">
                {COMMON_SKILLS.filter((s) => s.toLowerCase().includes(skillInput.toLowerCase()) && !formData.skills.includes(s)).map((skill) => (
                  <button key={skill} onClick={() => addSkill(skill)} className="w-full text-left px-4 py-2 hover:bg-white/5 text-sm text-gray-300 transition-colors">{skill}</button>
                ))}
                {!COMMON_SKILLS.some((s) => s.toLowerCase() === skillInput.toLowerCase()) && (
                  <button onClick={() => addSkill(skillInput)} className="w-full text-left px-4 py-2 hover:bg-white/5 text-sm text-purple-400 font-medium transition-colors border-t border-white/5">
                    Añadir "{skillInput.trim()}"
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <PrimaryButton disabled={!isValid} onClick={onNext} text="Continuar a Objetivos" />
    </motion.div>
  );
}
