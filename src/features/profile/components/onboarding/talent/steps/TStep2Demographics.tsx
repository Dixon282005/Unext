import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { getCountryCallingCode } from 'react-phone-number-input';
import { TalentOnboardingData, StepProps } from '@/features/profile/types/onboarding.types';
import { LocationSelector } from '../../shared/LocationSelector';
import { PrimaryButton } from '../../shared/PrimaryButton';
import { stepVariants as variants } from '../../shared/stepVariants';
import countriesData from '@/data/countries-light.json';

const inputClass = 'w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600 text-white';

export function TStep2Demographics({ formData, updateData, onNext }: StepProps<TalentOnboardingData>) {
  const availableStates = useMemo(() => {
    const c = countriesData.find((c) => c.isoCode === formData.country);
    return c ? c.states : [];
  }, [formData.country]);

  const availableCities = useMemo(() => {
    const s = availableStates.find((s) => s.name === formData.state);
    return s ? s.cities : [];
  }, [formData.state, availableStates]);

  const isValid = Boolean(
    formData.country &&
    (availableStates.length === 0 || formData.state) &&
    (availableCities.length === 0 || formData.city) &&
    formData.address1?.trim().length >= 3 &&
    formData.phone && formData.phone.length > 7
  );

  const handleCountryChange = (newCountry: string) => {
    updateData({
      country: newCountry,
      state: '',
      city: '',
      phone: newCountry ? '+' + getCountryCallingCode(newCountry as any) : '',
    });
  };

  return (
    <motion.div key="t2" custom={1} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Ubicación y Contacto</h1>
        <p className="text-gray-400">Datos clave para conectarlo con oportunidades en su zona.</p>
      </div>

      <LocationSelector
        country={formData.country}
        state={formData.state}
        city={formData.city}
        phone={formData.phone}
        availableStates={availableStates}
        availableCities={availableCities}
        onCountryChange={handleCountryChange}
        onStateChange={(state) => updateData({ state, city: '' })}
        onCityChange={(city) => updateData({ city })}
        onPhoneChange={(phone) => updateData({ phone })}
        inputClass={inputClass}
      />

      {/* Addresses */}
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

      <PrimaryButton disabled={!isValid} onClick={onNext} text="Verificar Teléfono" />
    </motion.div>
  );
}
