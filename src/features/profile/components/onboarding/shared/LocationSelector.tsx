import PhoneInput, { getCountryCallingCode } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import countriesData from '@/data/countries-light.json';

const phoneCSS = `
  .PhoneInput { display: flex; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 0.5rem; padding: 0.5rem 1rem; transition: border-color 0.2s; height: 50px; }
  .PhoneInput:focus-within { border-color: #a855f7; }
  .PhoneInputInput { flex: 1; background: transparent; border: none; outline: none; color: white; font-size: 0.875rem; padding-left: 0.5rem; }
  .PhoneInputCountry { display: flex; align-items: center; margin-right: 0.5rem; pointer-events: none; }
  .PhoneInputCountrySelect { pointer-events: none; }
  .PhoneInputCountrySelectArrow { display: none; }
`;

interface LocationSelectorProps {
  country: string;
  state: string;
  city: string;
  phone: string;
  availableStates: { name: string; cities: string[] }[];
  availableCities: string[];
  onCountryChange: (country: string) => void;
  onStateChange: (state: string) => void;
  onCityChange: (city: string) => void;
  onPhoneChange: (phone: string) => void;
  inputClass: string;
}

export function LocationSelector({
  country, state, city, phone,
  availableStates, availableCities,
  onCountryChange, onStateChange, onCityChange, onPhoneChange,
  inputClass,
}: LocationSelectorProps) {
  const handlePhoneChange = (value: string | undefined) => {
    if (country) {
      const prefix = '+' + getCountryCallingCode(country as any);
      if (!value || !value.startsWith(prefix)) {
        const rawDigits = value ? value.replace(/^\+\d{1,3}/, '') : '';
        onPhoneChange(prefix + rawDigits);
        return;
      }
    }
    onPhoneChange(value || '');
  };

  return (
    <div className="space-y-5">
      {/* Country / State / City */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5 border border-white/5 rounded-xl p-4 bg-black/20">
          <label className="text-xs text-gray-400 font-medium">País *</label>
          <select
            value={country}
            onChange={(e) => onCountryChange(e.target.value)}
            className={`${inputClass} appearance-none cursor-pointer w-full`}
          >
            <option value="" disabled className="text-gray-800">Seleccione...</option>
            {countriesData.map((c) => (
              <option key={c.isoCode} value={c.isoCode} className="text-gray-800">{c.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5 border border-white/5 rounded-xl p-4 bg-black/20">
          <label className="text-xs text-gray-400 font-medium">Estado / Provincia</label>
          <select
            value={state}
            onChange={(e) => onStateChange(e.target.value)}
            disabled={!country || availableStates.length === 0}
            className={`${inputClass} appearance-none cursor-pointer w-full disabled:opacity-50`}
          >
            <option value="" disabled className="text-gray-800">Seleccione...</option>
            {availableStates.map((s) => (
              <option key={s.name} value={s.name} className="text-gray-800">{s.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5 border border-white/5 rounded-xl p-4 bg-black/20 md:col-span-2">
          <label className="text-xs text-gray-400 font-medium">Ciudad</label>
          {availableCities.length > 0 ? (
            <select
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
              className={`${inputClass} appearance-none cursor-pointer w-full`}
            >
              <option value="" disabled className="text-gray-800">Seleccione...</option>
              {availableCities.map((c) => (
                <option key={c} value={c} className="text-gray-800">{c}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              placeholder="Ciudad..."
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
              disabled={!country}
              className={`${inputClass} disabled:opacity-50`}
            />
          )}
        </div>
      </div>

      {/* Phone — locked to country */}
      <div className={`space-y-1.5 pt-4 border-t border-white/10`}>
        <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">Teléfono *</label>
        <div className={!country ? 'opacity-50 pointer-events-none' : ''}>
          <style dangerouslySetInnerHTML={{ __html: phoneCSS }} />
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            country={country as any}
            value={phone}
            onChange={handlePhoneChange}
            placeholder={country ? 'Número de contacto' : 'Seleccione su país primero'}
            disabled={!country}
          />
        </div>
      </div>
    </div>
  );
}
