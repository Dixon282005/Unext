import { UserPlus, FileSearch, MessageSquare, Briefcase } from 'lucide-react';

interface HowItWorksProps {
  isDark: boolean;
}

export function LandingHowItWorks({ isDark }: HowItWorksProps) {
  const steps = [
    {
      icon: UserPlus,
      number: '01',
      title: 'Crea tu Perfil',
      description: 'Regístrate gratis y construye un perfil que destaque tus habilidades y experiencia.'
    },
    {
      icon: FileSearch,
      number: '02',
      title: 'Explora Oportunidades',
      description: 'Descubre miles de ofertas personalizadas según tu perfil y preferencias.'
    },
    {
      icon: MessageSquare,
      number: '03',
      title: 'Conecta Directamente',
      description: 'Aplica con un click y chatea en tiempo real con reclutadores interesados.'
    },
    {
      icon: Briefcase,
      number: '04',
      title: 'Inicia tu Carrera',
      description: 'Recibe ofertas, agenda entrevistas y consigue el trabajo de tus sueños.'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        isDark ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-violet-900/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-fuchsia-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20 opacity-0 animate-[fadeIn_1s_ease-in-out_forwards]">
          <h2 className="text-5xl md:text-6xl mb-6">
            <span className={isDark ? 'text-white' : 'text-[#0A0A0A]'}>
              ¿Cómo funciona{' '}
            </span>
            <span className={isDark ? 'text-purple-500' : 'text-purple-600'}>
              Unext?
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Conecta con tu próxima oportunidad en 4 simples pasos
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative mb-12 last:mb-0 opacity-0 animate-[fadeIn_0.8s_ease-in-out_forwards]`}
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <div className={`flex flex-col md:flex-row items-center gap-8 p-8 md:p-12 rounded-3xl transition-all duration-500 group hover:scale-[1.02] ${
                isDark 
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-purple-600/50 hover:shadow-2xl hover:shadow-purple-600/20'
              }`}>
                
                {/* Left side - Number and Icon */}
                <div className="flex-shrink-0 flex items-center gap-6">
                  {/* Large Number */}
                  <div className={`text-7xl md:text-8xl transition-colors duration-500 ${
                    isDark 
                      ? 'text-white/10 group-hover:text-purple-500/30' 
                      : 'text-gray-200 group-hover:text-purple-600/30'
                  }`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 ${
                    isDark 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-purple-700 text-white'
                  }`}>
                    <step.icon className="w-10 h-10 md:w-12 md:h-12" />
                  </div>
                </div>

                {/* Right side - Content */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className={`text-3xl md:text-4xl mb-4 ${
                    isDark ? 'text-white' : 'text-[#0A0A0A]'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-lg md:text-xl leading-relaxed ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {step.description}
                  </p>
                </div>

                {/* Decorative corner accent */}
                <div className={`absolute top-6 right-6 w-12 h-12 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100 ${
                  isDark ? 'bg-purple-500/20' : 'bg-purple-600/20'
                } blur-xl`}></div>
              </div>

              {/* Connector line - only show between items */}
              {index < steps.length - 1 && (
                <div className="flex justify-center my-6">
                  <div className={`w-1 h-12 rounded-full ${
                    isDark 
                      ? 'bg-gradient-to-b from-purple-600 to-violet-600' 
                      : 'bg-gradient-to-b from-purple-700 to-violet-700'
                  }`}></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20 opacity-0 animate-[fadeIn_1s_ease-in-out_1s_forwards]">
          <p className={`text-xl mb-6 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            ¿Listo para dar el primer paso?
          </p>
          <button className={`group px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
            isDark 
              ? 'bg-white text-[#0A0A0A] hover:bg-gray-100 shadow-lg shadow-white/10' 
              : 'bg-[#0A0A0A] text-white hover:bg-gray-900 shadow-xl'
          }`}>
            Comenzar ahora gratis
          </button>
        </div>
      </div>
    </section>
  );
}
