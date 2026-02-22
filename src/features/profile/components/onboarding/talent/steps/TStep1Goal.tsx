import { motion } from 'framer-motion';
import { GraduationCap, User, Check } from 'lucide-react';
import { TalentOnboardingData, StepProps } from '@/features/profile/types/onboarding.types';
import { PrimaryButton } from '../../shared/PrimaryButton';
import { variants } from '../../shared/stepVariants';

const profileOptions = [
  { id: 'student', title: 'Soy Estudiante', desc: 'Busco aprender y obtener prácticas', icon: GraduationCap },
  { id: 'professional', title: 'Soy Profesional', desc: 'Busco trabajo e impulsar mi carrera', icon: User },
] as const;

export function TStep1Goal({ formData, updateData, onNext }: StepProps<TalentOnboardingData>) {
  const isValid = !!formData.profileType;
  return (
    <motion.div key="t1" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">¿Cuál es tu objetivo?</h1>
        <p className="text-gray-400">Seleccione su perfil para personalizar la experiencia.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profileOptions.map((role) => {
          const Icon = role.icon;
          const isActive = formData.profileType === role.id;
          return (
            <button
              key={role.id}
              onClick={() => updateData({ profileType: role.id })}
              className={`flex flex-col items-center justify-center text-center p-8 rounded-2xl border transition-all aspect-square relative group ${
                isActive
                  ? 'bg-purple-500/10 border-purple-500 ring-2 ring-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]'
                  : 'bg-white/[0.02] border-white/8 hover:border-white/15 hover:bg-white/4'
              }`}
            >
              <div className={`p-4 rounded-xl mb-4 transition-colors ${isActive ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-gray-300'}`}>
                <Icon className="w-8 h-8" />
              </div>
              <h3 className={`font-semibold text-lg mb-2 ${isActive ? 'text-white' : 'text-gray-200'}`}>{role.title}</h3>
              <p className={`text-sm max-w-[160px] ${isActive ? 'text-purple-300' : 'text-gray-500'}`}>{role.desc}</p>
              {isActive && (
                <div className="absolute top-4 right-4 bg-purple-500 rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <PrimaryButton disabled={!isValid} onClick={onNext} text="Continuar" />
    </motion.div>
  );
}
