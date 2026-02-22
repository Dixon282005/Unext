import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, Upload, Link as LinkIcon, Check, Building, User, GraduationCap, X } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import careersData from '@/data/careers.json';
import universitiesData from '@/data/venezuelan-universities.json';
import countriesData from '@/data/countries-light.json'; // Nueva gema ligera

export interface OnboardingData {
  profileType: 'student' | 'professional' | 'company' | null;
  country: string; // ISO2 code
  state: string;
  city: string;
  address1: string;
  address2: string;
  phone: string;
  profession: string;
  skills: string[];
  platformGoal: string | null;
  educationLevel: string;
  institution: string;
  yearsOfExperience: number | '';
  portfolioLink: string;
  file: File | null;
}

export interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
  userName: string;
  userType?: 'student' | 'company';
}

const profileOptions = [
  { id: 'student', title: 'Soy Estudiante', desc: 'Busco aprender y obtener prácticas', icon: GraduationCap },
  { id: 'professional', title: 'Soy Profesional', desc: 'Busco trabajo e impulsar mi carrera', icon: User },
] as const;

const platformGoals = {
  student: [
    'Conectar con reclutadores locales',
    'Prepararme para el entorno laboral',
    'Encontrar oportunidades de aprendizaje'
  ],
  professional: [
    'Acelerar mi crecimiento profesional',
    'Encontrar posiciones senior o clientes',
    'Destacar mi portafolio ante empresas'
  ],
  company: [
    'Publicar vacantes de talento',
    'Filtrar candidatos con alta precisión',
    'Construir marca empleadora'
  ]
};

const educationLevels = [
  'Bachillerato / Secundaria',
  'Técnico / TSU',
  'Universitario en curso',
  'Universitario graduado',
  'Maestría / Posgrado',
  'Autodidacta'
];

export function OnboardingFlow({ onComplete, userName, userType = 'student' }: OnboardingProps) {
  // Ajuste: si es company el profileType ya viene predefinido, y nos saltamos el inicio de Estudiante.
  const [currentStep, setCurrentStep] = useState(userType === 'company' ? 2 : 1);
  const totalSteps = 6;

  const [formData, setFormData] = useState<OnboardingData>({
    profileType: userType === 'company' ? 'company' : null,
    country: '',
    state: '',
    city: '',
    address1: '',
    address2: '',
    phone: '',
    profession: '',
    skills: [],
    platformGoal: null,
    educationLevel: '',
    institution: '',
    yearsOfExperience: '',
    portfolioLink: '',
    file: null,
  });

  const [skillInput, setSkillInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Selector dinámico demográfico
  const availableStates = useMemo(() => {
    if (!formData.country) return [];
    const countryObj = countriesData.find(c => c.isoCode === formData.country);
    return countryObj ? countryObj.states : [];
  }, [formData.country]);

  const availableCities = useMemo(() => {
    if (!formData.state) return [];
    const stateObj = availableStates.find(s => s.name === formData.state);
    return stateObj ? stateObj.cities : [];
  }, [formData.state, availableStates]);

  // === HANDLERS ===
  const updateData = (fields: Partial<OnboardingData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(v => v + 1);
  };
  
  const prevStep = () => {
    // Evitar que una empresa vaya al Paso 1 (Solo para Estudiante/Profesional)
    if (userType === 'company' && currentStep === 2) return;
    if (currentStep > 1) setCurrentStep(v => v - 1);
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (newSkill && !formData.skills.includes(newSkill) && formData.skills.length < 3) {
        updateData({ skills: [...formData.skills, newSkill] });
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateData({ skills: formData.skills.filter(s => s !== skillToRemove) });
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      updateData({ file: e.dataTransfer.files[0] });
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateData({ file: e.target.files[0] });
    }
  };

  const handleFinish = () => {
    console.log("=== FINAL ONBOARDING DATA ===", JSON.stringify(formData, null, 2));
    onComplete(formData);
  };

  // === VALIDATIONS ===
  const isStep1Valid = !!formData.profileType;
  const isStep2Valid = formData.country && formData.address1.length > 3 && formData.phone && formData.phone.length > 6;
  const isStep3Valid = formData.profession.trim().length > 0 && formData.skills.length > 0;
  const isStep4Valid = !!formData.platformGoal;

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 })
  };

  const inputClass = "w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600 text-white";

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-900/20 blur-[120px] pointer-events-none rounded-full" />

      {/* Header & Progress */}
      <div className="w-full max-w-2xl mx-auto pt-10 px-6 relative z-10 flex-shrink-0">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={prevStep}
            disabled={currentStep === 1 || (userType === 'company' && currentStep === 2)}
            className={`p-2 rounded-full transition-colors ${(currentStep === 1 || (userType === 'company' && currentStep === 2)) ? 'opacity-0 cursor-default' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-500 mb-2 font-medium">
              <span>Paso {currentStep} de {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% Completado</span>
            </div>
            <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-linear-to-r from-purple-600 to-purple-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center pb-20 px-6 relative z-10">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait" custom={1}>
            
            {/* ====== STEP 1: OBJETIVO DEL TALENTO ====== */}
            {currentStep === 1 && userType === 'student' && (
              <motion.div
                key="step1" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Bienvenido, {userName.split(' ')[0]}</h1>
                  <p className="text-gray-400">Seleccione su objetivo principal para ayudarle a personalizar su perfil.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profileOptions.map((role) => {
                    const Icon = role.icon;
                    const isActive = formData.profileType === role.id;
                    return (
                      <button
                        key={role.id}
                        onClick={() => updateData({ profileType: role.id as any })}
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

                <PrimaryButton disabled={!isStep1Valid} onClick={nextStep} text="Continuar" />
              </motion.div>
            )}

            {/* ====== STEP 2: DEMOGRAFIA Y UBICACION ====== */}
            {currentStep === 2 && (
              <motion.div
                key="step2" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Ubicación y Contacto</h1>
                  <p className="text-gray-400">Estos datos son clave para conectarlo con oportunidades en su zona.</p>
                </div>

                <div className="space-y-6">
                  {/* Coordenadas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5 border border-white/5 rounded-xl p-4 bg-black/20">
                      <label className="text-xs text-gray-400 font-medium">País Residencial *</label>
                      <select 
                        value={formData.country}
                        onChange={(e) => updateData({ country: e.target.value, state: '', city: '' })}
                        className={`${inputClass} appearance-none cursor-pointer w-full`}
                      >
                        <option value="" disabled className="text-gray-800">Seleccione...</option>
                        {countriesData.map(c => (
                          <option key={c.isoCode} value={c.isoCode} className="text-gray-800">{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5 border border-white/5 rounded-xl p-4 bg-black/20">
                      <label className="text-xs text-gray-400 font-medium">Estado / Provincia</label>
                      <select 
                        value={formData.state}
                        onChange={(e) => updateData({ state: e.target.value, city: '' })}
                        disabled={!formData.country || availableStates.length === 0}
                        className={`${inputClass} appearance-none cursor-pointer w-full disabled:opacity-50`}
                      >
                        <option value="" disabled className="text-gray-800">Seleccione...</option>
                        {availableStates.map(s => (
                          <option key={s.name} value={s.name} className="text-gray-800">{s.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5 border border-white/5 rounded-xl p-4 bg-black/20 md:col-span-2">
                      <label className="text-xs text-gray-400 font-medium">Ciudad / Localidad</label>
                      {availableCities.length > 0 ? (
                        <select 
                          value={formData.city}
                          onChange={(e) => updateData({ city: e.target.value })}
                          className={`${inputClass} appearance-none cursor-pointer w-full`}
                        >
                          <option value="" disabled className="text-gray-800">Seleccione una ciudad...</option>
                          {availableCities.map(c => (
                            <option key={c} value={c} className="text-gray-800">{c}</option>
                          ))}
                        </select>
                      ) : (
                        <input 
                          type="text" 
                          placeholder="Ciudad..."
                          value={formData.city}
                          onChange={(e) => updateData({ city: e.target.value })}
                          disabled={!formData.country}
                          className={`${inputClass} disabled:opacity-50`}
                        />
                      )}
                    </div>
                  </div>

                  {/* Direcciones */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Dirección Física 1 *</label>
                      <input 
                        type="text" 
                        placeholder="Ej. Calle 123, Edificio Torre Central..."
                        value={formData.address1}
                        onChange={(e) => updateData({ address1: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Dirección 2 (Opcional)</label>
                      <input 
                        type="text" 
                        placeholder="Piso, apartamento, referencia..."
                        value={formData.address2}
                        onChange={(e) => updateData({ address2: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="space-y-1.5 pt-4 border-t border-white/10">
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Número Telefónico / WhatsApp *</label>
                    <div className={`phone-input-wrapper ${!formData.country ? 'opacity-50 pointer-events-none' : ''}`}>
                      <style dangerouslySetInnerHTML={{__html: `
                        .PhoneInput { display: flex; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 0.5rem; padding: 0.5rem 1rem; transition: border-color 0.2s; height: 50px; }
                        .PhoneInput:focus-within { border-color: #a855f7; }
                        .PhoneInputInput { flex: 1; background: transparent; border: none; outline: none; color: white; font-size: 0.875rem; padding-left: 0.5rem; }
                        .PhoneInputCountry { display: flex; align-items: center; margin-right: 0.5rem; pointer-events: none; }
                        .PhoneInputCountrySelect { pointer-events: none; }
                        .PhoneInputCountrySelectArrow { display: none; }
                      `}} />
                      <PhoneInput
                        international
                        country={formData.country as any}
                        value={formData.phone}
                        onChange={(value) => updateData({ phone: value || '' })}
                        placeholder={formData.country ? "Número de contacto" : "Seleccione su país primero"}
                        disabled={!formData.country}
                      />
                    </div>
                  </div>
                </div>

                <PrimaryButton disabled={!isStep2Valid} onClick={nextStep} text="Continuar a Habilidades" />
              </motion.div>
            )}

            {/* ====== STEP 3: ESPECIALIDAD (Antes 2) ====== */}
            {currentStep === 3 && (
              <motion.div
                key="step3" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Especialidad y Habilidades</h1>
                  <p className="text-gray-400">Defina su área de enfoque principal.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                      {userType === 'company' ? 'Industria o Sector' : 'Carrera o Profesión'}
                    </label>
                    
                    {userType === 'student' ? (
                      <select 
                        value={formData.profession}
                        onChange={(e) => updateData({ profession: e.target.value })}
                        className={`${inputClass} appearance-none cursor-pointer`}
                        style={{ WebkitAppearance: 'none' }}
                      >
                        <option value="" disabled className="text-gray-800">Seleccione una carrera...</option>
                        {careersData.map((career: string) => (
                          <option key={career} value={career} className="text-gray-800">{career}</option>
                        ))}
                      </select>
                    ) : (
                      <input 
                        type="text" 
                        placeholder="Ej. Tecnología, Finanzas, Salud..."
                        value={formData.profession}
                        onChange={(e) => updateData({ profession: e.target.value })}
                        className={inputClass}
                      />
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-medium flex justify-between">
                      {userType === 'company' ? 'Habilidades requeridas (Max 3)' : 'Top 3 Habilidades Clave'}
                      <span className="text-purple-500">{formData.skills.length}/3</span>
                    </label>
                    
                    <div className="flex flex-wrap gap-2 mb-3 min-h-[40px]">
                      {formData.skills.map((skill) => (
                        <span key={skill} className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
                          {skill}
                          <button onClick={() => removeSkill(skill)} className="hover:text-purple-100 transition-colors">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                      {formData.skills.length === 0 && (
                        <span className="text-gray-600 text-sm flex items-center italic">Agregue habilidades separadas por coma o 'Enter'</span>
                      )}
                    </div>

                    <input 
                      type="text" 
                      disabled={formData.skills.length >= 3}
                      placeholder={formData.skills.length >= 3 ? "Límite alcanzado" : "Escriba una habilidad y presione Enter..."}
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleAddSkill}
                      className={`${inputClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                    />
                  </div>
                </div>

                <PrimaryButton disabled={!isStep3Valid} onClick={nextStep} text="Continuar a Objetivos" />
              </motion.div>
            )}

            {/* ====== STEP 4: OBJETIVOS EN PLATAFORMA (Antes 3) ====== */}
            {currentStep === 4 && (
              <motion.div
                key="step4" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Objetivos Profesionales</h1>
                  <p className="text-gray-400">Seleccione su objetivo principal en nuestra plataforma.</p>
                </div>

                <div className="grid gap-3">
                  {(platformGoals[formData.profileType || 'student'] as string[]).map((goal) => {
                    const isActive = formData.platformGoal === goal;
                    return (
                      <button
                        key={goal}
                        onClick={() => updateData({ platformGoal: goal })}
                        className={`p-4 rounded-xl border transition-all text-left flex items-center justify-between group ${
                          isActive 
                            ? 'bg-white/10 border-purple-500/50 ring-1 ring-purple-500/30' 
                            : 'bg-white/2 border-white/8 hover:border-white/15 hover:bg-white/4'
                        }`}
                      >
                        <span className={`text-sm md:text-base font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>{goal}</span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isActive ? 'border-purple-500 bg-purple-500' : 'border-gray-600 group-hover:border-gray-500'}`}>
                          {isActive && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <PrimaryButton disabled={!isStep4Valid} onClick={nextStep} text="Continuar" />
              </motion.div>
            )}

            {/* ====== STEP 5: HISTORIAL (Antes 4) ====== */}
            {currentStep === 5 && (
              <motion.div
                key="step5" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Historial Profesional</h1>
                  <p className="text-gray-400">Proporcione detalles sobre su experiencia (Opcional).</p>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Nivel Educativo</label>
                      <select 
                        value={formData.educationLevel}
                        onChange={(e) => updateData({ educationLevel: e.target.value })}
                        className={`${inputClass} appearance-none cursor-pointer`}
                        style={{ WebkitAppearance: 'none' }}
                      >
                        <option value="" disabled className="text-gray-800">Seleccionar...</option>
                        {educationLevels.map(lvl => (
                          <option key={lvl} value={lvl} className="text-gray-800">{lvl}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Años de Exp.</label>
                      <input 
                        type="number" 
                        min="0"
                        placeholder="Ej. 2"
                        value={formData.yearsOfExperience}
                        onChange={(e) => updateData({ yearsOfExperience: e.target.value ? Number(e.target.value) : '' })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Institución / Empresa Actual</label>
                    {userType === 'student' ? (
                      <select 
                        value={formData.institution}
                        onChange={(e) => updateData({ institution: e.target.value })}
                        className={`${inputClass} appearance-none cursor-pointer`}
                        style={{ WebkitAppearance: 'none' }}
                      >
                        <option value="" disabled className="text-gray-800">Seleccione su universidad / instituto...</option>
                        {universitiesData.map((uni: string) => (
                          <option key={uni} value={uni} className="text-gray-800">{uni}</option>
                        ))}
                      </select>
                    ) : (
                      <input 
                        type="text" 
                        placeholder="Nombre de la institución o empresa..."
                        value={formData.institution}
                        onChange={(e) => updateData({ institution: e.target.value })}
                        className={inputClass}
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Enlace Externo (LinkedIn, Sitio Web)</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        type="url" 
                        placeholder="https://..."
                        value={formData.portfolioLink}
                        onChange={(e) => updateData({ portfolioLink: e.target.value })}
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <PrimaryButton disabled={false} onClick={nextStep} text="Guardar Información" />
                  <button onClick={nextStep} className="text-sm text-gray-500 hover:text-white transition-colors py-2">
                    Omitir este paso
                  </button>
                </div>
              </motion.div>
            )}

            {/* ====== STEP 6: DOCUMENTO (Antes 5) ====== */}
            {currentStep === 6 && (
              <motion.div
                key="step6" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Documento Profesional</h1>
                  <p className="text-gray-400">Adjunte su Currículum Vitae o Portafolio (Opcional).</p>
                </div>

                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all flex flex-col items-center justify-center min-h-[200px] ${
                    isDragging 
                      ? 'border-purple-500 bg-purple-500/10' 
                      : formData.file 
                        ? 'border-green-500/50 bg-green-500/5' 
                        : 'border-white/10 hover:border-white/20 bg-white/2'
                  }`}
                >
                  <input 
                    type="file" 
                    id="file-upload" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx,.png,.jpg"
                    onChange={handleFileSelect}
                  />
                  
                  {formData.file ? (
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-medium text-white">{formData.file.name}</div>
                      <div className="text-xs text-green-400">Archivo adjuntado correctamente</div>
                      <button onClick={() => updateData({ file: null })} className="text-xs text-gray-400 hover:text-white underline mt-2">Eliminar archivo</button>
                    </div>
                  ) : (
                    <label htmlFor="file-upload" className="cursor-pointer space-y-4">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-400">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-purple-400 font-medium hover:text-purple-300">Explorar archivos</span>
                        <span className="text-gray-400"> o arrastrar aquí</span>
                      </div>
                      <p className="text-xs text-gray-600">Archivos soportados: PDF, DOC, PNG o JPG (Máx 5MB)</p>
                    </label>
                  )}
                </div>

                <div className="flex flex-col gap-3 pt-6">
                  <PrimaryButton disabled={false} onClick={handleFinish} text={formData.file ? "Finalizar Configuración" : "Finalizar Perfil"} />
                  {!formData.file && (
                    <button onClick={handleFinish} className="text-sm text-gray-500 hover:text-white transition-colors py-2">
                      Subir más tarde e ir al Dashboard
                    </button>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// === HELPER UI COMPONENTS ===
function PrimaryButton({ disabled, onClick, text }: { disabled: boolean, onClick: () => void, text: string }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-full py-3.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all ${
        disabled
          ? 'bg-white/5 text-gray-500 cursor-not-allowed'
          : 'bg-white text-black hover:bg-gray-200'
      }`}
    >
      {text}
      {!disabled && <ChevronRight className="w-4 h-4" />}
    </button>
  );
}
