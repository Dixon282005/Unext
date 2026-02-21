"use client";

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import { loginAction } from '@/features/auth/actions';

interface LoginProps {
  isDark: boolean;
  onLogin: (data: { name: string, email: string }) => void;
  onNavigateToRegister: () => void;
  onNavigateToHome: () => void;
}

export function Login({ isDark, onLogin, onNavigateToRegister, onNavigateToHome }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const res = await loginAction(formData);
      if (res?.error) {
        setErrorMsg(res.error);
      } else if (res?.success && res.user) {
        onLogin({ email: res.user.email, name: res.user.name });
      }
    } catch (err) {
      setErrorMsg('Ocurrió un error inesperado al iniciar sesión.');
    } finally {
      setIsLoading(false);
    }
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
        <div className={`absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full blur-[120px] ${
          isDark ? 'bg-purple-900/15' : 'bg-purple-200/30'
        }`} />
        <div className={`absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full blur-[120px] ${
          isDark ? 'bg-violet-900/10' : 'bg-violet-200/20'
        }`} />
      </div>

      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-8">
          <button onClick={onNavigateToHome} className="inline-block mb-6 hover:opacity-80 transition-opacity">
            <span className={`text-xl tracking-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
              U<span className="text-purple-500">next</span>
            </span>
          </button>
          <h2 className={`text-2xl tracking-tight mb-1 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
            Bienvenido de nuevo
          </h2>
          <p className={`text-sm ${isDark ? 'text-[#8A8A8A]' : 'text-gray-500'}`}>
            Inicia sesion para continuar
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
            <div>
              <label className={`block text-xs mb-1.5 ${isDark ? 'text-[#8A8A8A]' : 'text-gray-500'}`}>
                Correo electronico
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="tu@email.com" className={inputClass} />
              </div>
            </div>

            <div>
              <label className={`block text-xs mb-1.5 ${isDark ? 'text-[#8A8A8A]' : 'text-gray-500'}`}>
                Contrasena
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="********" className={`${inputClass} !pr-10`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'} transition-colors`}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-xs text-purple-500 hover:text-purple-400 transition-colors">
                Olvidaste tu contrasena?
              </button>
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-b from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white py-2.5 rounded-lg text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Iniciar sesion
                </>
              )}
            </button>
          </form>

          <div className="relative my-5">
            <div className={`absolute inset-0 flex items-center`}>
              <div className={`w-full border-t ${isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'}`} />
            </div>
            <div className="relative flex justify-center">
              <span className={`px-3 text-xs ${isDark ? 'bg-[#0B0B0B] text-[#8A8A8A]' : 'bg-[#FAFAFA] text-gray-400'}`}>o</span>
            </div>
          </div>

          <p className={`text-center text-sm ${isDark ? 'text-[#8A8A8A]' : 'text-gray-500'}`}>
            No tienes una cuenta?{' '}
            <button onClick={onNavigateToRegister} className="text-purple-500 hover:text-purple-400 transition-colors">
              Registrate
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
