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
      {/* Efectos de fondo morados mejorados */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Efecto modo claro - más visible y vibrante */}
        {!isDark && (
          <>
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-purple-300/60 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 -left-40 w-[450px] h-[450px] bg-purple-400/50 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-violet-300/60 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/3 left-1/2 w-[350px] h-[350px] bg-purple-200/50 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </>
        )}
        
        {/* Efecto modo oscuro */}
        {isDark && (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-purple-800/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 transition-all duration-700 transform hover:scale-105 $${
            isDark 
              ? 'bg-white/5 border border-white/10 backdrop-blur-sm' 
              : 'bg-white/80 border border-purple-200/50 backdrop-blur-sm shadow-lg shadow-purple-100'
          }`}>
            <Sparkles className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              Plataforma #1 en Latinoamérica
            </span>
          </div>
          
          {/* Main Title */}
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
          
          {/* CTA Buttons con efectos mejorados */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 justify-center">
            {/* Botón principal con efectos morados */}
            <button 
              onClick={() => setActiveSection('opportunities')}
              className="group relative px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              {/* Efecto de fondo morado animado */}
              <div className={`absolute inset-0 ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-600 to-purple-500' 
                  : 'bg-gradient-to-r from-purple-600 to-purple-500'
              }`}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Efecto de brillo */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-shine"></div>
              </div>
              
              <span className="relative flex items-center justify-center gap-2 text-white">
                Explorar Oportunidades
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            {/* Botón secundario con borde morado */}
            <button 
              onClick={() => setActiveSection('candidates')}
              className={`group relative px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 overflow-hidden ${
                isDark 
                  ? 'bg-white/5 border-2 border-purple-500/30 hover:border-purple-500/50 hover:bg-white/10' 
                  : 'bg-white border-2 border-purple-300/50 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-200/50'
              }`}
            >
              {/* Efecto de fondo sutil en hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-500/10 to-violet-500/10' 
                  : 'bg-gradient-to-r from-purple-50 to-violet-50'
              }`}></div>
              
              <span className={`relative flex items-center justify-center gap-2 ${
                isDark ? 'text-white' : 'text-[#0A0A0A]'
              }`}>
                Ver Talento
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </span>
            </button>
          </div>
          
          {/* Animated Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className={`group cursor-pointer p-8 rounded-2xl transition-all duration-500 transform hover:scale-105 ${
              isDark 
                ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30' 
                : 'bg-white/60 backdrop-blur-sm border border-purple-200/50 hover:bg-white hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-200/30'
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
                : 'bg-white/60 backdrop-blur-sm border border-purple-200/50 hover:bg-white hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-200/30'
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
                : 'bg-white/60 backdrop-blur-sm border border-purple-200/50 hover:bg-white hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-200/30'
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

      <style>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        .animate-shine {
          animation: shine 3s infinite;
        }
      `}</style>
    </section>
  );
}