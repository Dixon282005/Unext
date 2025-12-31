import { UserPlus, FileSearch, MessageSquare, Briefcase } from 'lucide-react';

interface HowItWorksProps {
  isDark: boolean;
}

export function HowItWorks({ isDark }: HowItWorksProps) {
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
          <h2 className="text-3xl md:text-6xl mb-6">
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

        {/* Steps as horizontal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`opacity-0 animate-[fadeIn_0.8s_ease-in-out_forwards]`}
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <div className={`h-full p-6 rounded-xl transition-all duration-500 group hover:scale-105 ${
                isDark 
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-white/10' 
                  : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl'
              }`}>
                
                {/* Number badge */}
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-4 text-sm ${
                  isDark 
                    ? 'bg-white/10 text-purple-400' 
                    : 'bg-gray-100 text-purple-600'
                }`}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 ${
                  isDark 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-purple-700 text-white'
                }`}>
                  <step.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className={`text-xl mb-3 ${
                  isDark ? 'text-white' : 'text-[#0A0A0A]'
                }`}>
                  {step.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Removed CTA */}
      </div>
    </section>
  );
}