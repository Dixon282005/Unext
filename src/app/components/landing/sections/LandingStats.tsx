import { TrendingUp, Users, Building2, Zap } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

interface StatsProps {
  isDark: boolean;
}

function AnimatedStat({ 
  value, 
  suffix = '', 
  duration = 2000 
}: { 
  value: number; 
  suffix?: string; 
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutCubic * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, value, duration]);

  return (
    <div ref={elementRef}>
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export function Stats({ isDark }: StatsProps) {
  const stats = [
    {
      icon: Users,
      value: 12000,
      suffix: '+',
      label: 'Estudiantes Activos',
      description: 'Talento joven buscando oportunidades'
    },
    {
      icon: Building2,
      value: 2500,
      suffix: '+',
      label: 'Empresas',
      description: 'Compañías innovadoras contratando'
    },
    {
      icon: TrendingUp,
      value: 8000,
      suffix: '+',
      label: 'Contrataciones',
      description: 'Conexiones exitosas realizadas'
    },
    {
      icon: Zap,
      value: 95,
      suffix: '%',
      label: 'Tasa de Éxito',
      description: 'Candidatos satisfechos con su match'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        isDark ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-violet-900/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20 opacity-0 animate-[fadeIn_1s_ease-in-out_forwards]">
          <h2 className="text-5xl md:text-6xl mb-6">
            <span className={isDark ? 'text-white' : 'text-[#0A0A0A]'}>
              Impacto{' '}
            </span>
            <span className={isDark ? 'text-purple-500' : 'text-purple-600'}>
              real
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Números que demuestran nuestro compromiso con conectar talento
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`relative group opacity-0 animate-[fadeIn_0.8s_ease-in-out_forwards]`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${
                isDark ? 'bg-purple-600' : 'bg-purple-700'
              }`}></div>

              <div className={`relative p-10 rounded-3xl transition-all duration-500 hover:scale-105 ${
                isDark 
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-purple-600/50 hover:shadow-2xl hover:shadow-purple-600/20'
              }`}>
                {/* Icon */}
                <div className="flex justify-center mb-8">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 ${
                    isDark 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-purple-700 text-white'
                  }`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                </div>

                {/* Animated Number */}
                <div className={`text-5xl md:text-6xl mb-4 text-center transition-colors duration-500 ${
                  isDark 
                    ? 'text-white' 
                    : 'text-[#0A0A0A]'
                }`}>
                  <AnimatedStat value={stat.value} suffix={stat.suffix} duration={2000} />
                </div>

                {/* Label */}
                <div className={`text-xl mb-3 text-center ${
                  isDark ? 'text-gray-300' : 'text-[#0A0A0A]'
                }`}>
                  {stat.label}
                </div>

                {/* Description */}
                <div className={`text-center leading-relaxed ${
                  isDark ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-20 text-center opacity-0 animate-[fadeIn_1s_ease-in-out_1s_forwards]">
          <div className={`inline-block px-6 py-3 rounded-full ${
            isDark 
              ? 'bg-white/5 border border-white/10' 
              : 'bg-gray-100 border border-gray-200'
          }`}>
            <span className={`flex items-center gap-2 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <TrendingUp className="w-5 h-5 text-green-500" />
              Creciendo un 40% cada trimestre
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}