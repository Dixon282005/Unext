"use client";

import { ArrowRight, Sparkles, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeroProps {
  setActiveSection: (section: 'opportunities' | 'candidates') => void;
  isDark: boolean;
}

function AnimatedNumber({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export function Hero({ setActiveSection, isDark }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated background gradient */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        isDark ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 transition-all duration-700 transform hover:scale-105 ${
            isDark 
              ? 'bg-white/5 border border-white/10' 
              : 'bg-gray-100 border border-gray-200'
          }`}>
            <Sparkles className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              Plataforma #1 en Latinoamérica
            </span>
          </div>
          
          {/* Main Title - Centered */}
          <h1 className={`text-6xl md:text-8xl mb-8 transition-all duration-700 ${
            isDark ? 'text-white' : 'text-[#0A0A0A]'
          }`}>
            El futuro del
            <br />
            talento{' '}
            <span className={`${
              isDark 
                ? 'text-purple-500' 
                : 'text-purple-600'
            }`}>
              conectado
            </span>
          </h1>
          
          {/* Description */}
          <p className={`text-xl md:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto transition-all duration-700 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Unext revoluciona la forma en que estudiantes, egresados y empresas se conectan. 
            Descubre oportunidades únicas y construye el futuro profesional que mereces.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center">
            <button 
              onClick={() => setActiveSection('opportunities')}
              className={`group px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                isDark 
                  ? 'bg-white text-[#0A0A0A] hover:bg-gray-100 shadow-lg shadow-white/10' 
                  : 'bg-[#0A0A0A] text-white hover:bg-gray-900 shadow-xl'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                Explorar Oportunidades
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button 
              onClick={() => setActiveSection('candidates')}
              className={`group px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                isDark 
                  ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' 
                  : 'bg-gray-100 border border-gray-200 text-[#0A0A0A] hover:bg-gray-200'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                Ver Talento
                <Users className="w-5 h-5" />
              </span>
            </button>
          </div>
          
          {/* Animated Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className={`group cursor-pointer p-8 rounded-2xl transition-all duration-500 transform hover:scale-105 ${
              isDark 
                ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30' 
                : 'bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-purple-600/30'
            }`}>
              <div className={`text-5xl md:text-6xl mb-2 transition-colors duration-500 ${
                isDark ? 'text-white group-hover:text-purple-400' : 'text-[#0A0A0A] group-hover:text-purple-600'
              }`}>
                <AnimatedNumber target={12} />K+
              </div>
              <div className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Estudiantes Activos
              </div>
            </div>
            
            <div className={`group cursor-pointer p-8 rounded-2xl transition-all duration-500 transform hover:scale-105 ${
              isDark 
                ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30' 
                : 'bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-purple-600/30'
            }`}>
              <div className={`text-5xl md:text-6xl mb-2 transition-colors duration-500 ${
                isDark ? 'text-white group-hover:text-purple-400' : 'text-[#0A0A0A] group-hover:text-purple-600'
              }`}>
                <AnimatedNumber target={2500} duration={2500} />+
              </div>
              <div className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Empresas
              </div>
            </div>
            
            <div className={`group cursor-pointer p-8 rounded-2xl transition-all duration-500 transform hover:scale-105 ${
              isDark 
                ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30' 
                : 'bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-purple-600/30'
            }`}>
              <div className={`text-5xl md:text-6xl mb-2 transition-colors duration-500 ${
                isDark ? 'text-white group-hover:text-purple-400' : 'text-[#0A0A0A] group-hover:text-purple-600'
              }`}>
                <AnimatedNumber target={8} />K+
              </div>
              <div className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Contrataciones
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
