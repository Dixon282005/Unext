"use client";

import { useEffect, useRef } from 'react';

interface TrustedByProps {
  isDark: boolean;
}

export function TrustedBy({ isDark }: TrustedByProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Velocidad del scroll

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset cuando llega al final
      if (scrollPosition >= scrollElement.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollElement.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pausar en hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    scrollElement.addEventListener('mouseenter', handleMouseEnter);
    scrollElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollElement.removeEventListener('mouseenter', handleMouseEnter);
      scrollElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const universities = [
    { name: 'UCV', logo: '🎓', color: 'from-blue-500 to-blue-600' },
    { name: 'USB', logo: '🏛️', color: 'from-purple-500 to-purple-600' },
    { name: 'UCAB', logo: '📚', color: 'from-cyan-500 to-cyan-600' },
    { name: 'UNIMET', logo: '🎯', color: 'from-violet-500 to-violet-600' },
    { name: 'UNERG', logo: '🏆', color: 'from-amber-500 to-amber-600' },
    { name: 'LUZ', logo: '⚡', color: 'from-emerald-500 to-emerald-600' },
    { name: 'UNEXPO', logo: '🌟', color: 'from-yellow-500 to-yellow-600' },
    { name: 'UC', logo: '💎', color: 'from-pink-500 to-pink-600' },
    { name: 'UCLA', logo: '🚀', color: 'from-red-500 to-red-600' },
    { name: 'ULA', logo: '🔬', color: 'from-indigo-500 to-indigo-600' },
  ];

  // Duplicamos para el efecto infinito
  const doubledUniversities = [...universities, ...universities];

  return (
    <section className="pt-24 pb-12 relative overflow-hidden">
      {/* Background effects */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        isDark ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-violet-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Título mejorado */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl mb-4 transition-colors duration-500 ${
            isDark ? 'text-white' : 'text-[#0A0A0A]'
          }`}>
            Confían en{' '}
            <span className={`${isDark ? 'text-purple-500' : 'text-purple-600'}`}>
              Unext
            </span>
          </h2>
          <p className={`text-lg md:text-xl transition-colors duration-500 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Las mejores instituciones educativas de Latinoamérica nos respaldan
          </p>
        </div>

        {/* Carrusel infinito mejorado */}
        <div className="relative">
          {/* Contenedor del scroll */}
          <div 
            ref={scrollRef}
            className="overflow-hidden"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="flex gap-6" style={{ width: 'max-content' }}>
              {doubledUniversities.map((uni, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 transition-all duration-300 hover:scale-110 cursor-pointer group ${
                    isDark 
                      ? 'hover:brightness-125' 
                      : 'hover:shadow-2xl'
                  }`}
                  style={{ width: '280px' }}
                >
                  {/* Tarjeta con gradiente */}
                  <div className={`relative h-full p-8 rounded-2xl border-2 transition-all duration-300 ${
                    isDark 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/50' 
                      : 'bg-white border-gray-200 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-200/50'
                  }`}>
                    {/* Efecto de brillo en hover */}
                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isDark 
                        ? 'bg-gradient-to-br from-purple-500/10 to-transparent' 
                        : 'bg-gradient-to-br from-purple-100/50 to-transparent'
                    }`}></div>
                    
                    {/* Contenido */}
                    <div className="relative flex flex-col items-center text-center gap-4">
                      {/* Logo con gradiente de fondo */}
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl transition-transform duration-300 group-hover:scale-110 bg-gradient-to-br ${uni.color}`}>
                        <span className="drop-shadow-lg">{uni.logo}</span>
                      </div>
                      
                      {/* Nombre */}
                      <h3 className={`text-lg transition-colors duration-300 ${
                        isDark 
                          ? 'text-white group-hover:text-purple-400' 
                          : 'text-[#0A0A0A] group-hover:text-purple-600'
                      }`}>
                        {uni.name}
                      </h3>
                      
                      {/* Badge de verificación */}
                      <div className={`px-3 py-1 rounded-full text-xs ${
                        isDark 
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                          : 'bg-purple-100 text-purple-600 border border-purple-300'
                      }`}>
                        ✓ Verificado
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradientes de fade mejorados */}
          <div className={`absolute left-0 top-0 bottom-0 w-40 pointer-events-none z-10 ${
            isDark 
              ? 'bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent' 
              : 'bg-gradient-to-r from-white via-white/80 to-transparent'
          }`}></div>
          <div className={`absolute right-0 top-0 bottom-0 w-40 pointer-events-none z-10 ${
            isDark 
              ? 'bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent' 
              : 'bg-gradient-to-l from-white via-white/80 to-transparent'
          }`}></div>
        </div>

        {/* Call to action con badges */}
        <div className="mt-24 max-w-4xl mx-auto">
          {/* Removed */}
        </div>
      </div>

      <style>{`
        div[style*="scrollbarWidth"] {
          -webkit-overflow-scrolling: touch;
        }
        div[style*="scrollbarWidth"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}