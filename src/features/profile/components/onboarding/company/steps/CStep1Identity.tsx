import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { CompanyOnboardingData, StepProps } from '@/features/profile/types/onboarding.types';
import { LocationSelector } from '../../shared/LocationSelector';
import { PrimaryButton } from '../../shared/PrimaryButton';
import { variants } from '../../shared/stepVariants';
import { getCountryCallingCode } from 'react-phone-number-input';
import { SECTORS } from '@/features/profile/data/onboarding.constants';
import countriesData from '@/data/countries-light.json';

const inputClass = 'w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600 text-white';

export function CStep1Identity({ formData, updateData, onNext }: StepProps<CompanyOnboardingData>) {
  const isValid = formData.companyName.trim().length >= 2 && formData.sector !== '';
  return (
    <motion.div key="c1" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Identidad de la Empresa</h1>
        <p className="text-gray-400">Configure el perfil público de su organización.</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Nombre Comercial *</label>
          <input type="text" placeholder="Ej. Acme Corporation" value={formData.companyName} onChange={(e) => updateData({ companyName: e.target.value })} className={inputClass} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Razón Social / Nombre Legal (Opcional)</label>
          <input type="text" placeholder="Ej. Acme Corporation, C.A." value={formData.legalName} onChange={(e) => updateData({ legalName: e.target.value })} className={inputClass} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">RIF / NIT / Tax ID (Opcional)</label>
            <input type="text" placeholder="Ej. J-12345678-9" value={formData.taxId} onChange={(e) => updateData({ taxId: e.target.value })} className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Sitio Web (Opcional)</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="url" placeholder="https://empresa.com" value={formData.website} onChange={(e) => updateData({ website: e.target.value })} className={`${inputClass} pl-9`} />
            </div>
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Sector o Industria *</label>
          <select value={formData.sector} onChange={(e) => updateData({ sector: e.target.value })} className={`${inputClass} appearance-none cursor-pointer`} style={{ WebkitAppearance: 'none' }}>
            <option value="" disabled className="text-gray-800">Seleccione un sector...</option>
            {SECTORS.map((s) => <option key={s} value={s} className="text-gray-800">{s}</option>)}
          </select>
        </div>
      </div>
      <PrimaryButton disabled={!isValid} onClick={onNext} text="Continuar" />
    </motion.div>
  );
}
