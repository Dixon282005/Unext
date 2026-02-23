import { useRef, useState } from 'react';
import { OTP_DEMO_CODE } from '@/features/profile/data/onboarding.constants';

interface OTPPinInputProps {
  value: string[];
  onChange: (digits: string[]) => void;
}

export function OTPPinInput({ value, onChange }: OTPPinInputProps) {
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const joined = value.join('');

  const handleChange = (i: number, raw: string) => {
    const digit = raw.replace(/\D/g, '').slice(-1);
    const next = [...value];
    next[i] = digit;
    onChange(next);
    if (digit && i < 5) refs[i + 1].current?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) refs[i - 1].current?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text');
    const digits = pasted.replace(/\D/g, '').slice(0, 6).split('');
    if (digits.length > 0) {
      const next = [...value];
      digits.forEach((digit, i) => (next[i] = digit));
      onChange(next);
      const lastIndex = Math.min(5, digits.length -1);
      refs[lastIndex].current?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">
        Código de 6 dígitos
      </label>
      <div className="flex gap-3 justify-center">
        {value.map((digit, i) => (
          <input
            key={i}
            ref={refs[i]}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={i === 0 ? handlePaste : undefined}
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
        {joined.length === 6 && joined !== OTP_DEMO_CODE && (
          <p className="text-red-400 text-sm">Código incorrecto. Vuelva a intentarlo.</p>
        )}
      </div>
    </div>
  );
}
