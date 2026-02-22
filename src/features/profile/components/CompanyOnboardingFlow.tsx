'use client';
import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, Upload, Link as LinkIcon, Check, Globe, Users, Building2, Briefcase } from 'lucide-react';
import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import countriesData from '@/data/countries-light.json';

export interface CompanyOnboardingData {
  companyName: string;
  legalName: string;
  taxId: string;
  country: string;
  state: string;
  city: string;
  address1: string;
  address2: string;
  phone: string;
  website: string;
  sector: string;
  companySize: string;
  hiringGoal: string;
  talentTypes: string[];
  linkedinPage: string;
  logoFile: File | null;
}

export interface CompanyOnboardingProps {
  onComplete: (data: CompanyOnboardingData) => void;
  companyAdminName: string;
}

const companySizes = [
  '1 – 10 empleados',
  '11 – 50 empleados',
  '51 – 200 empleados',
  '201 – 500 empleados',
  '500+ empleados',
];

const sectors = [
  'Tecnología e Informática',
  'Finanzas y Banca',
  'Salud y Medicina',
  'Educación',
  'Manufactura e Industria',
  'Comercio y Retail',
  'Construcción e Ingeniería',
  'Energía y Petróleo',
  'Medios y Comunicación',
  'Consultoría y Servicios',
  'Logística y Transporte',
  'Turismo y Hospitalidad',
  'Agro y Alimentación',
  'Otro',
];

const hiringGoals = [
  'Contratar talento STEM altamente especializado',
  'Impulsar mi equipo con pasantes y trainee',
  'Reclutar talento remoto para proyectos globales',
  'Consolidar un equipo local de alto rendimiento',
  'Encontrar freelancers para proyectos puntuales',
];

const talentTypeOptions = [
  'Ingeniería de Software',
  'Diseño UX/UI',
  'Marketing Digital',
  'Finanzas y Contabilidad',
  'Recursos Humanos',
  'Operaciones y Logística',
  'Inteligencia Artificial / Data',
  'Administración de Empresas',
  'Educación y Capacitación',
  'Legal y Compliance',
];

export function CompanyOnboardingFlow({ onComplete, companyAdminName }: CompanyOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  const [formData, setFormData] = useState<CompanyOnboardingData>({
    companyName: '',
    legalName: '',
    taxId: '',
    country: '',
    state: '',
    city: '',
    address1: '',
    address2: '',
    phone: '',
    website: '',
    sector: '',
    companySize: '',
    hiringGoal: '',
    talentTypes: [],
    linkedinPage: '',
    logoFile: null,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const otpInput = otpDigits.join('');

  const updateData = (fields: Partial<CompanyOnboardingData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

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

  const nextStep = () => { if (currentStep < totalSteps) setCurrentStep(v => v + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep(v => v - 1); };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) updateData({ logoFile: e.dataTransfer.files[0] });
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) updateData({ logoFile: e.target.files[0] });
  };

  const handleFinish = () => {
    console.log('=== COMPANY ONBOARDING DATA ===', JSON.stringify(formData, null, 2));
    onComplete(formData);
  };

  const toggleTalentType = (type: string) => {
    const current = formData.talentTypes;
    if (current.includes(type)) {
      updateData({ talentTypes: current.filter(t => t !== type) });
    } else if (current.length < 5) {
      updateData({ talentTypes: [...current, type] });
    }
  };

  // Validations
  const isStep1Valid = formData.companyName.trim().length >= 2 && formData.sector !== '';
  const isStep2Valid = Boolean(
    formData.country &&
    (availableStates.length === 0 || formData.state) &&
    formData.address1.trim().length >= 3 &&
    formData.phone && formData.phone.length > 7
  );
  const isStep3Valid = otpInput === '123456';
  const isStep4Valid = formData.companySize !== '' && formData.hiringGoal !== '';
  const isStep5Valid = formData.talentTypes.length > 0;

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (d: number) => ({ zIndex: 0, x: d < 0 ? 50 : -50, opacity: 0 }),
  };

  const inputClass = 'w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600 text-white';

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-900/20 blur-[120px] pointer-events-none rounded-full" />

      {/* Header & Progress */}
      <div className="w-full max-w-2xl mx-auto pt-10 px-6 relative z-10 shrink-0">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`p-2 rounded-full transition-colors ${currentStep === 1 ? 'opacity-0 cursor-default' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-500 mb-2 font-medium">
              <span>Paso {currentStep} de {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% Completado</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center pb-20 px-6 relative z-10">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait" custom={1}>

            {/* STEP 1: Identidad de la empresa */}
            {currentStep === 1 && (
              <motion.div key="cs1" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-7 h-7 text-purple-400" />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    Bienvenido, {companyAdminName.split(' ')[0]}
                  </h1>
                  <p className="text-gray-400">Configure el perfil de su empresa para comenzar a reclutar talento.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Nombre Comercial *</label>
                    <input
                      type="text"
                      placeholder="Ej. Acme Corporation"
                      value={formData.companyName}
                      onChange={(e) => updateData({ companyName: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Razón Social / Nombre Legal (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Ej. Acme Corporation, C.A."
                      value={formData.legalName}
                      onChange={(e) => updateData({ legalName: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">RIF / NIT / Tax ID (Opcional)</label>
                      <input
                        type="text"
                        placeholder="Ej. J-12345678-9"
                        value={formData.taxId}
                        onChange={(e) => updateData({ taxId: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Sitio Web (Opcional)</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="url"
                          placeholder="https://empresa.com"
                          value={formData.website}
                          onChange={(e) => updateData({ website: e.target.value })}
                          className={`${inputClass} pl-9`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Sector o Industria *</label>
                    <select
                      value={formData.sector}
                      onChange={(e) => updateData({ sector: e.target.value })}
                      className={`${inputClass} appearance-none cursor-pointer`}
                      style={{ WebkitAppearance: 'none' }}
                    >
                      <option value="" disabled className="text-gray-800">Seleccione un sector...</option>
                      {sectors.map(s => <option key={s} value={s} className="text-gray-800">{s}</option>)}
                    </select>
                  </div>
                </div>

                <PrimaryButton disabled={!isStep1Valid} onClick={nextStep} text="Continuar" />
              </motion.div>
            )}

            {/* STEP 2: Ubicación y Teléfono */}
            {currentStep === 2 && (
              <motion.div key="cs2" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
                <div className="text-center space-y-2">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Ubicación y Contacto</h1>
                  <p className="text-gray-400">Información de localización y número de contacto empresarial.</p>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5 border border-white/5 rounded-xl p-4 bg-black/20">
                      <label className="text-xs text-gray-400 font-medium">País *</label>
                      <select
                        value={formData.country}
                        onChange={(e) => {
                          const newCountry = e.target.value;
                          updateData({
                            country: newCountry,
                            state: '',
                            city: '',
                            phone: newCountry ? '+' + getCountryCallingCode(newCountry as any) : ''
                          });
                        }}
                        className={`${inputClass} appearance-none cursor-pointer w-full`}
                      >
                        <option value="" disabled className="text-gray-800">Seleccione...</option>
                        {countriesData.map(c => <option key={c.isoCode} value={c.isoCode} className="text-gray-800">{c.name}</option>)}
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
                        {availableStates.map(s => <option key={s.name} value={s.name} className="text-gray-800">{s.name}</option>)}
                      </select>
                    </div>

                    <div className="space-y-1.5 border border-white/5 rounded-xl p-4 bg-black/20 md:col-span-2">
                      <label className="text-xs text-gray-400 font-medium">Ciudad</label>
                      {availableCities.length > 0 ? (
                        <select
                          value={formData.city}
                          onChange={(e) => updateData({ city: e.target.value })}
                          className={`${inputClass} appearance-none cursor-pointer w-full`}
                        >
                          <option value="" disabled className="text-gray-800">Seleccione una ciudad...</option>
                          {availableCities.map(c => <option key={c} value={c} className="text-gray-800">{c}</option>)}
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

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Dirección Física *</label>
                      <input
                        type="text"
                        placeholder="Ej. Av. Principal, Torre Empresarial, Piso 8..."
                        value={formData.address1}
                        onChange={(e) => updateData({ address1: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Dirección 2 (Opcional)</label>
                      <input
                        type="text"
                        placeholder="Oficina, referencia..."
                        value={formData.address2}
                        onChange={(e) => updateData({ address2: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Teléfono bloqueado */}
                  <div className="space-y-1.5 pt-4 border-t border-white/10">
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Teléfono Empresarial *</label>
                    <div className={`phone-input-wrapper ${!formData.country ? 'opacity-50 pointer-events-none' : ''}`}>
                      <style dangerouslySetInnerHTML={{ __html: `
                        .PhoneInput { display: flex; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 0.5rem; padding: 0.5rem 1rem; transition: border-color 0.2s; height: 50px; }
                        .PhoneInput:focus-within { border-color: #a855f7; }
                        .PhoneInputInput { flex: 1; background: transparent; border: none; outline: none; color: white; font-size: 0.875rem; padding-left: 0.5rem; }
                        .PhoneInputCountry { display: flex; align-items: center; margin-right: 0.5rem; pointer-events: none; }
                        .PhoneInputCountrySelect { pointer-events: none; }
                        .PhoneInputCountrySelectArrow { display: none; }
                      `}} />
                      <PhoneInput
                        international
                        countryCallingCodeEditable={false}
                        country={formData.country as any}
                        value={formData.phone}
                        onChange={(value) => {
                          if (formData.country) {
                            const prefix = '+' + getCountryCallingCode(formData.country as any);
                            if (!value || !value.startsWith(prefix)) {
                              const rawDigits = value ? value.replace(/^\+\d{1,3}/, '') : '';
                              updateData({ phone: prefix + rawDigits });
                              return;
                            }
                          }
                          updateData({ phone: value || '' });
                        }}
                        placeholder={formData.country ? 'Número empresarial' : 'Seleccione su país primero'}
                        disabled={!formData.country}
                      />
                    </div>
                  </div>
                </div>

                <PrimaryButton disabled={!isStep2Valid} onClick={nextStep} text="Verificar Teléfono" />
              </motion.div>
            )}

            {/* STEP 3: OTP Verificación */}
            {currentStep === 3 && (
              <motion.div key="cs3" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
                <div className="text-center space-y-2">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Verificación Telefónica</h1>
                  <p className="text-gray-400">Código SMS enviado al número {formData.phone || 'indicado'}.</p>
                  <p className="text-sm text-purple-400/80">(Simulación: digite 123456)</p>
                </div>

                <div className="flex flex-col items-center justify-center space-y-8 pt-6 pb-4">
                  <label className="text-xs text-gray-500 uppercase tracking-wider font-medium text-center block">Código de 6 dígitos</label>
                  <div className="flex gap-3 justify-center">
                    {otpDigits.map((digit, i) => (
                      <input
                        key={i}
                        ref={otpRefs[i]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          const newDigits = [...otpDigits];
                          newDigits[i] = val.slice(-1);
                          setOtpDigits(newDigits);
                          if (val && i < 5) otpRefs[i + 1].current?.focus();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !otpDigits[i] && i > 0) {
                            otpRefs[i - 1].current?.focus();
                          }
                        }}
                        onFocus={(e) => e.target.select()}
                        className={`w-12 h-14 text-center text-2xl font-bold font-mono rounded-xl border transition-all outline-none ${
                          digit
                            ? 'bg-purple-500/15 border-purple-500 text-white'
                            : 'bg-white/5 border-white/15 text-white focus:border-purple-500'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="h-5 text-center">
                    {otpInput.length === 6 && otpInput !== '123456' && (
                      <p className="text-red-400 text-sm">Código incorrecto. Vuelva a intentarlo.</p>
                    )}
                  </div>
                </div>

                <PrimaryButton disabled={!isStep3Valid} onClick={nextStep} text="Verificar y Continuar" />
              </motion.div>
            )}

            {/* STEP 4: Tamaño y Objetivo de Contratación */}
            {currentStep === 4 && (
              <motion.div key="cs4" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
                <div className="text-center space-y-2">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Perfil de Empresa</h1>
                  <p className="text-gray-400">Cuéntenos sobre su estructura y objetivos de contratación.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-medium flex items-center gap-2">
                      <Users className="w-3.5 h-3.5" /> Tamaño de la Empresa *
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {companySizes.map((size) => {
                        const isActive = formData.companySize === size;
                        return (
                          <button
                            key={size}
                            onClick={() => updateData({ companySize: size })}
                            className={`p-3.5 rounded-xl border transition-all text-left flex items-center justify-between group ${
                              isActive
                                ? 'bg-white/10 border-purple-500/50 ring-1 ring-purple-500/30'
                                : 'bg-white/2 border-white/8 hover:border-white/15 hover:bg-white/4'
                            }`}
                          >
                            <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>{size}</span>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${isActive ? 'border-purple-500 bg-purple-500' : 'border-gray-600'}`}>
                              {isActive && <Check className="w-3 h-3 text-white" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-medium flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5" /> Objetivo de Contratación *
                    </label>
                    <div className="grid gap-2">
                      {hiringGoals.map((goal) => {
                        const isActive = formData.hiringGoal === goal;
                        return (
                          <button
                            key={goal}
                            onClick={() => updateData({ hiringGoal: goal })}
                            className={`p-4 rounded-xl border transition-all text-left flex items-center justify-between ${
                              isActive ? 'bg-white/10 border-purple-500/50 ring-1 ring-purple-500/30' : 'bg-white/2 border-white/8 hover:border-white/15'
                            }`}
                          >
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

                <PrimaryButton disabled={!isStep4Valid} onClick={nextStep} text="Continuar" />
              </motion.div>
            )}

            {/* STEP 5: Tipo de Talento que busca */}
            {currentStep === 5 && (
              <motion.div key="cs5" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
                <div className="text-center space-y-2">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Tipos de Talento</h1>
                  <p className="text-gray-400">Seleccione hasta 5 categorías de talento que su empresa busca.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Áreas de Interés *</label>
                    <span className="text-xs text-purple-400">{formData.talentTypes.length}/5 seleccionados</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {talentTypeOptions.map((type) => {
                      const isSelected = formData.talentTypes.includes(type);
                      const isDisabled = !isSelected && formData.talentTypes.length >= 5;
                      return (
                        <button
                          key={type}
                          onClick={() => toggleTalentType(type)}
                          disabled={isDisabled}
                          className={`p-3.5 rounded-xl border transition-all text-left flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-purple-500/15 border-purple-500/50 ring-1 ring-purple-500/20'
                              : isDisabled
                                ? 'opacity-40 cursor-not-allowed bg-white/2 border-white/5'
                                : 'bg-white/2 border-white/8 hover:border-white/15 hover:bg-white/4'
                          }`}
                        >
                          <span className={`text-sm font-medium ${isSelected ? 'text-purple-200' : 'text-gray-300'}`}>{type}</span>
                          <div className={`w-5 h-5 rounded shrink-0 border flex items-center justify-center transition-colors ${isSelected ? 'bg-purple-500 border-purple-500' : 'border-gray-600'}`}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-1.5 pt-4 border-t border-white/10">
                    <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Página de LinkedIn Empresarial (Opcional)</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="url"
                        placeholder="https://linkedin.com/company/..."
                        value={formData.linkedinPage}
                        onChange={(e) => updateData({ linkedinPage: e.target.value })}
                        className={`${inputClass} pl-9`}
                      />
                    </div>
                  </div>
                </div>

                <PrimaryButton disabled={!isStep5Valid} onClick={nextStep} text="Continuar" />
              </motion.div>
            )}

            {/* STEP 6: Logo y Finalización */}
            {currentStep === 6 && (
              <motion.div key="cs6" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
                <div className="text-center space-y-2">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Logo Empresarial</h1>
                  <p className="text-gray-400">Suba el logotipo de su empresa para completar su perfil público. (Opcional)</p>
                </div>

                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all flex flex-col items-center justify-center min-h-[200px] ${
                    isDragging
                      ? 'border-purple-500 bg-purple-500/10'
                      : formData.logoFile
                        ? 'border-green-500/50 bg-green-500/5'
                        : 'border-white/10 hover:border-white/20 bg-white/2'
                  }`}
                >
                  <input
                    type="file"
                    id="logo-upload"
                    className="hidden"
                    accept=".png,.jpg,.jpeg,.svg,.webp"
                    onChange={handleFileSelect}
                  />
                  {formData.logoFile ? (
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-medium text-white">{formData.logoFile.name}</div>
                      <div className="text-xs text-green-400">Logo adjuntado correctamente</div>
                      <button onClick={() => updateData({ logoFile: null })} className="text-xs text-gray-400 hover:text-white underline mt-2">Cambiar logo</button>
                    </div>
                  ) : (
                    <label htmlFor="logo-upload" className="cursor-pointer space-y-4">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-400">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-purple-400 font-medium hover:text-purple-300">Explorar archivos</span>
                        <span className="text-gray-400"> o arrastrar aquí</span>
                      </div>
                      <p className="text-xs text-gray-600">PNG, JPG, SVG o WEBP (Máx 5MB)</p>
                    </label>
                  )}
                </div>

                <div className="flex flex-col gap-3 pt-6">
                  <PrimaryButton disabled={false} onClick={handleFinish} text="Completar Perfil Empresarial" />
                  {!formData.logoFile && (
                    <button onClick={handleFinish} className="text-sm text-gray-500 hover:text-white transition-colors py-2">
                      Subir logo más tarde e ir al Dashboard
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

function PrimaryButton({ disabled, onClick, text }: { disabled: boolean; onClick: () => void; text: string }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-full py-3.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all ${
        disabled ? 'bg-white/5 text-gray-500 cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200'
      }`}
    >
      {text}
      {!disabled && <ChevronRight className="w-4 h-4" />}
    </button>
  );
}
