"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Building, UserPlus } from 'lucide-react';
import { signupAction } from '@/features/auth/actions';
import { useUser } from '@/providers/UserProvider';

export interface RegisterProps {
  isDark?: boolean;
  onRegister?: (data: { type: 'student' | 'company', name: string, email: string }) => void;
  onNavigateToLogin?: () => void;
  onNavigateToHome?: () => void;
}

export function Register({ isDark: propIsDark, onRegister, onNavigateToLogin, onNavigateToHome }: RegisterProps) {
  const router = useRouter();
  const { isDark: contextIsDark, loginUser } = useUser();
  const isDark = propIsDark !== undefined ? propIsDark : contextIsDark;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student' as 'student' | 'company',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) return 'Las contraseñas no coinciden.';
    if (formData.password.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
    if (!/[A-Z]/.test(formData.password)) return 'La contraseña debe incluir al menos una letra mayúscula.';
    if (!/[0-9]/.test(formData.password)) return 'La contraseña debe incluir al menos un número.';
    if (!/[!@#$%^&*(),.?":{}|<>_]/.test(formData.password)) return 'La contraseña debe incluir al menos un carácter especial (ej: @, #, !).';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setIsLoading(true);
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('confirmPassword', formData.confirmPassword);
    data.append('role', formData.userType);

    try {
      const res = await signupAction(data);
      if (res?.error) {
        setErrorMsg(res.error);
      } else if (res?.success && res.user) {
        if (onRegister) {
          onRegister({ type: formData.userType, name: res.user.name, email: res.user.email });
        } else {
          loginUser(res.user.name, res.user.email, formData.userType);
          router.push('/onboarding');
        }
      }
    } catch (err) {
      setErrorMsg('Ocurrió un error inesperado al registrarse.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const inputClass = `w-full pl-10 pr-4 py-2.5 rounded-lg text-sm transition-all ${
    isDark
      ? 'bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-500 focus:border-purple-500'
      : 'bg-black/[0.02] border border-black/[0.08] text-[#0A0A0A] placeholder-gray-400 focus:border-purple-500'
  } focus:outline-none`;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full blur-[120px] ${
          isDark ? 'bg-purple-900/15' : 'bg-purple-200/30'
        }`} />
        <div className={`absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full blur-[120px] ${
          isDark ? 'bg-violet-900/10' : 'bg-violet-200/20'
        }`} />
      </div>

      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-8">
          <button onClick={() => onNavigateToHome ? onNavigateToHome() : router.push('/')} className="inline-block mb-6 hover:opacity-80 transition-opacity">
            <span className={`text-xl tracking-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
              U<span className="text-purple-500">next</span>
            </span>
          </button>
          <h2 className={`text-2xl tracking-tight mb-1 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
            Crea tu cuenta
          </h2>
          <p className={`text-sm ${isDark ? 'text-[#8A8A8A]' : 'text-gray-500'}`}>
            Unete a la comunidad Unext
          </p>
        </div>

        <div className={`rounded-lg p-6 border ${
          isDark ? 'border-white/[0.06] bg-white/[0.02]' : 'border-black/[0.06] bg-black/[0.01]'
        }`}>
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-500 text-xs text-center">{errorMsg}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User type */}
            <div>
              <label className={`block text-xs mb-2 ${isDark ? 'text-[#8A8A8A]' : 'text-gray-500'}`}>
                Que eres?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleChange('userType', 'student')}
                  className={`p-3 rounded-lg border text-sm transition-all flex items-center justify-center gap-2 ${
                    formData.userType === 'student'
                      ? 'border-purple-500/50 bg-purple-500/5 text-purple-500'
                      : isDark
                        ? 'border-white/[0.08] text-gray-400 hover:border-white/[0.12]'
                        : 'border-black/[0.08] text-gray-500 hover:border-black/[0.12]'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Estudiante
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('userType', 'company')}
                  className={`p-3 rounded-lg border text-sm transition-all flex items-center justify-center gap-2 ${
                    formData.userType === 'company'
                      ? 'border-purple-500/50 bg-purple-500/5 text-purple-500'
                      : isDark
                        ? 'border-white/[0.08] text-gray-400 hover:border-white/[0.12]'
                        : 'border-black/[0.08] text-gray-500 hover:border-black/[0.12]'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  Empresa
                </button>
              </div>
            </div>

            <div>
              <label className={`block text-xs mb-1.5 ${isDark ? 'text-[#8A8A8A]' : 'text-gray-500'}`}>
                {formData.userType === 'student' ? 'Nombre completo' : 'Nombre de la empresa'}
              </label>
              <div className="relative">
                {formData.userType === 'student'
                  ? <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  : <Building className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                }
                <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} required placeholder={formData.userType === 'student' ? 'Juan Perez' : 'Mi Empresa S.A.'} className={inputClass} />
              </div>
            </div>

            <div>
              <label className={`block text-xs mb-1.5 ${isDark ? 'text-[#8A8A8A]' : 'text-gray-500'}`}>
                Correo electronico
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} required placeholder="tu@email.com" className={inputClass} />
              </div>
            </div>

            <div>
              <label className={`block text-xs mb-1.5 ${isDark ? 'text-[#8A8A8A]' : 'text-gray-500'}`}>
                Contrasena
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-white-500' : 'text-white-400'}`} />
                <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => handleChange('password', e.target.value)} required placeholder="********" className={`${inputClass} !pr-10`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'} transition-colors`}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} bg-white/2 p-3 rounded border border-white/4`}>
              <p className="font-medium mb-1 text-white">Tu contraseña debe tener:</p>
              <ul className="list-disc pl-4 space-y-0.5 opacity-80">
                <li>Mínimo 8 caracteres</li>
                <li>1 letra mayúscula y 1 número</li>
                <li>1 carácter especial (!@#$%^&*...)</li>
              </ul>
            </div>
            <div>
              <label className={`block text-xs mb-1.5 ${isDark ? 'text-[#8A8A8A]' : 'text-gray-500'}`}>
                Confirmar contrasena
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)} required placeholder="********" className={`${inputClass} !pr-10`} />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'} transition-colors`}>
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

           

            <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-b from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white py-2.5 rounded-lg text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2">
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Crear cuenta
                </>
              )}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`} />
            </div>
            <div className="relative flex justify-center">
              <span className={`px-3 text-xs ${isDark ? 'bg-[#0B0B0B] text-[#8A8A8A]' : 'bg-[#FAFAFA] text-gray-400'}`}>o</span>
            </div>
          </div>

          <p className={`text-center text-sm ${isDark ? 'text-[#8A8A8A]' : 'text-gray-500'}`}>
            Ya tienes una cuenta?{' '}
            <button onClick={() => onNavigateToLogin ? onNavigateToLogin() : router.push('/login')} className="text-purple-500 hover:text-purple-400 transition-colors">
              Inicia sesion
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
