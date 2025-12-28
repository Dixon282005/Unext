import { Zap, Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

interface HeaderProps {
  activeSection: 'home' | 'opportunities' | 'candidates';
  setActiveSection: (section: 'home' | 'opportunities' | 'candidates') => void;
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  scrollY: number;
  onNavigateToLogin?: () => void;
  onNavigateToRegister?: () => void;
}

export function Header({ activeSection, setActiveSection, isDark, setIsDark, scrollY, onNavigateToLogin, onNavigateToRegister }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrolled = scrollY > 20;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isDark 
        ? `${isScrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-xl shadow-2xl shadow-purple-900/20 border-b border-white/10' : 'bg-transparent'}` 
        : `${isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-2xl shadow-gray-300/50 border-b border-gray-200' : 'bg-transparent'}`
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-500 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}>
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveSection('home')}
          >
            <div className={`rounded-xl flex items-center justify-center transition-all duration-500 ${
              isScrolled ? 'w-9 h-9' : 'w-11 h-11'
            } ${
              isDark 
                ? 'bg-white text-[#0A0A0A] group-hover:bg-gray-100' 
                : 'bg-[#0A0A0A] text-white group-hover:bg-gray-900'
            }`}>
              <Zap className={`transition-all duration-500 ${isScrolled ? 'w-5 h-5' : 'w-6 h-6'}`} fill="currentColor" />
            </div>
            <span className={`transition-all duration-500 ${
              isScrolled ? 'text-xl' : 'text-2xl'
            } ${
              isDark ? 'text-white' : 'text-[#0A0A0A]'
            }`}>
              Unext
            </span>
          </div>
          
          <nav className={`hidden md:flex items-center gap-2 rounded-full p-1.5 transition-colors relative ${
            isDark 
              ? 'bg-white/5 border border-white/10' 
              : 'bg-gray-100 border border-gray-200'
          }`}>
            {/* Indicador deslizante animado */}
            <motion.div
              className={`absolute rounded-full shadow-lg ${
                isDark ? 'bg-white' : 'bg-[#0A0A0A]'
              }`}
              initial={false}
              animate={{
                x: activeSection === 'home' ? 6 : activeSection === 'opportunities' ? 92 : 266,
                width: activeSection === 'home' ? 78 : activeSection === 'opportunities' ? 162 : 90
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 35
              }}
              style={{
                height: '42px',
                top: '6px'
              }}
            />
            
            <button
              onClick={() => setActiveSection('home')}
              className={`relative z-10 px-6 py-2.5 rounded-full transition-colors duration-300 ${
                activeSection === 'home' 
                  ? isDark
                    ? 'text-[#0A0A0A]' 
                    : 'text-white'
                  : isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-[#0A0A0A]'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => setActiveSection('opportunities')}
              className={`relative z-10 px-6 py-2.5 rounded-full transition-colors duration-300 ${
                activeSection === 'opportunities' 
                  ? isDark
                    ? 'text-[#0A0A0A]' 
                    : 'text-white'
                  : isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-[#0A0A0A]'
              }`}
            >
              Oportunidades
            </button>
            <button
              onClick={() => setActiveSection('candidates')}
              className={`relative z-10 px-6 py-2.5 rounded-full transition-colors duration-300 ${
                activeSection === 'candidates' 
                  ? isDark
                    ? 'text-[#0A0A0A]' 
                    : 'text-white'
                  : isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-[#0A0A0A]'
              }`}
            >
              Talento
            </button>
          </nav>
          
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isDark 
                  ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' 
                  : 'bg-gray-100 border border-gray-200 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className={`px-5 py-2.5 transition-colors ${
              isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-[#0A0A0A]'
            }`} onClick={onNavigateToLogin}>
              Ingresar
            </button>
            <button className={`relative px-5 py-2.5 rounded-full transition-all ${
              isDark 
                ? 'bg-white text-[#0A0A0A] hover:bg-gray-100' 
                : 'bg-[#0A0A0A] text-white hover:bg-gray-900'
            }`} onClick={onNavigateToRegister}>
              Comenzar
            </button>
          </div>

          <button 
            className={`md:hidden transition-colors ${
              isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-[#0A0A0A]'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden backdrop-blur-xl transition-colors ${
          isDark 
            ? 'bg-[#0A0A0A]/95 border-t border-white/10' 
            : 'bg-white/95 border-t border-gray-200'
        }`}>
          <div className="px-4 py-6 space-y-3">
            <button
              onClick={() => { setActiveSection('home'); setMobileMenuOpen(false); }}
              className={`w-full px-6 py-3 rounded-xl text-left transition-all ${
                activeSection === 'home' 
                  ? isDark 
                    ? 'bg-white text-[#0A0A0A]' 
                    : 'bg-[#0A0A0A] text-white'
                  : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/5'
                    : 'text-gray-600 hover:text-[#0A0A0A] hover:bg-gray-100'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => { setActiveSection('opportunities'); setMobileMenuOpen(false); }}
              className={`w-full px-6 py-3 rounded-xl text-left transition-all ${
                activeSection === 'opportunities' 
                  ? isDark 
                    ? 'bg-white text-[#0A0A0A]' 
                    : 'bg-[#0A0A0A] text-white'
                  : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/5'
                    : 'text-gray-600 hover:text-[#0A0A0A] hover:bg-gray-100'
              }`}
            >
              Oportunidades
            </button>
            <button
              onClick={() => { setActiveSection('candidates'); setMobileMenuOpen(false); }}
              className={`w-full px-6 py-3 rounded-xl text-left transition-all ${
                activeSection === 'candidates' 
                  ? isDark 
                    ? 'bg-white text-[#0A0A0A]' 
                    : 'bg-[#0A0A0A] text-white'
                  : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-white/5'
                    : 'text-gray-600 hover:text-[#0A0A0A] hover:bg-gray-100'
              }`}
            >
              Talento
            </button>
            <div className="pt-4 space-y-2">
              <button 
                onClick={() => setIsDark(!isDark)}
                className={`w-full px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 ${
                  isDark 
                    ? 'text-gray-300 hover:text-white hover:bg-white/5' 
                    : 'text-gray-700 hover:text-[#0A0A0A] hover:bg-gray-100'
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                {isDark ? 'Modo Claro' : 'Modo Oscuro'}
              </button>
              <button className={`w-full px-6 py-3 transition-colors rounded-xl ${
                isDark 
                  ? 'text-gray-300 hover:text-white hover:bg-white/5' 
                  : 'text-gray-700 hover:text-[#0A0A0A] hover:bg-gray-100'
              }`} onClick={onNavigateToLogin}>
                Ingresar
              </button>
              <button className={`w-full px-6 py-3 rounded-xl transition-all ${
                isDark 
                  ? 'bg-white text-[#0A0A0A] hover:bg-gray-100' 
                  : 'bg-[#0A0A0A] text-white hover:bg-gray-900'
              }`} onClick={onNavigateToRegister}>
                Comenzar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}