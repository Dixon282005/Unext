"use client";

import { useEffect, useState } from 'react';

interface TrustedByProps {
  isDark: boolean;
}

export function LandingTrustedBy({ isDark }: TrustedByProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const universities = [
    { name: 'Universidad Romulo Gallegos', logo: '🎓' },
    { name: 'Instituto Simon Bolivar', logo: '🏛️' },
    { name: 'Universidad Central de Venezuela', logo: '📚' },
    { name: 'Universidad Nacional de las Ciencias', logo: '🎯' },
    { name: 'Universidad Andres Bello', logo: '🏆' },
    { name: 'Universidad de los Andes', logo: '⚡' },
    { name: 'Universidad Javeriana', logo: '🌟' },
    { name: 'Universidad Católica', logo: '💎' },
    { name: 'Universidad Tecnológica', logo: '🚀' },
    { name: 'Instituto Politécnico', logo: '🔬' },
  ];

  const doubledUniversities = [...universities, ...universities];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        isDark ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 opacity-0 animate-[fadeIn_1s_ease-in-out_forwards]">
          <h2 className={`text-3xl mb-4 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
            Confían en <span className={isDark ? 'text-purple-500' : 'text-purple-600'}>Unext</span>
          </h2>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Las mejores instituciones educativas de Latinoamérica
          </p>
        </div>

        {/* Infinite scroll carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex gap-8"
              style={{
                transform: `translateX(-${offset}%)`,
                transition: 'transform 0.05s linear',
              }}
            >
              {doubledUniversities.map((uni, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 px-8 py-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    isDark 
                      ? 'bg-white/5 border border-white/10 hover:bg-white/10' 
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:shadow-lg'
                  }`}
                  style={{ minWidth: '200px' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{uni.logo}</span>
                    <span className={`whitespace-nowrap ${
                      isDark ? 'text-white' : 'text-[#0A0A0A]'
                    }`}>
                      {uni.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient overlays */}
          <div className={`absolute left-0 top-0 bottom-0 w-32 pointer-events-none ${
            isDark 
              ? 'bg-gradient-to-r from-[#0A0A0A] to-transparent' 
              : 'bg-gradient-to-r from-white to-transparent'
          }`}></div>
          <div className={`absolute right-0 top-0 bottom-0 w-32 pointer-events-none ${
            isDark 
              ? 'bg-gradient-to-l from-[#0A0A0A] to-transparent' 
              : 'bg-gradient-to-l from-white to-transparent'
          }`}></div>
        </div>
      </div>
    </section>
  );
}
