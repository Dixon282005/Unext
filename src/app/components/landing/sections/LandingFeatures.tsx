import { Users, Building2, TrendingUp, Shield, Zap, Award } from 'lucide-react';

interface FeaturesProps {
  isDark: boolean;
}

export function Features({ isDark }: FeaturesProps) {
  const features = [
    {
      icon: Users,
      title: 'Para Talento Emergente',
      description: 'Construye tu perfil profesional, destaca tus proyectos y conecta con empresas innovadoras.'
    },
    {
      icon: Building2,
      title: 'Para Empresas Visionarias',
      description: 'Descubre talento joven, publica oportunidades y construye equipos de alto rendimiento.'
    },
    {
      icon: TrendingUp,
      title: 'Crecimiento Acelerado',
      description: 'Accede a pasantías, mentorías y oportunidades diseñadas para impulsar tu carrera.'
    },
    {
      icon: Award,
      title: 'Perfiles Verificados',
      description: 'Sistema de verificación robusto que garantiza autenticidad y calidad en cada conexión.'
    },
    {
      icon: Shield,
      title: 'Privacidad Garantizada',
      description: 'Tus datos están protegidos con los más altos estándares de seguridad y encriptación.'
    },
    {
      icon: Zap,
      title: 'IA de Matching',
      description: 'Algoritmo inteligente que analiza habilidades, cultura y valores para conexiones perfectas.'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Efecto modo claro */}
        {!isDark && (
          <>
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-300/50 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-300/50 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-purple-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
          </>
        )}
        
        {/* Efecto modo oscuro */}
        {isDark && (
          <>
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-fuchsia-900/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 opacity-0 animate-[fadeIn_1s_ease-in-out_forwards]">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 transition-colors ${
            isDark 
              ? 'bg-white/5 border border-white/10' 
              : 'bg-gray-100 border border-gray-200'
          }`}>
            <Zap className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              Características
            </span>
          </div>
          
          <h2 className="text-5xl mb-6">
            <span className={isDark ? 'text-white' : 'text-[#0A0A0A]'}>
              Por qué elegir{' '}
            </span>
            <span className={isDark ? 'text-purple-500' : 'text-purple-600'}>
              Unext
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Una plataforma integral diseñada para revolucionar la conexión entre talento y oportunidades profesionales
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group relative p-8 rounded-3xl transition-all duration-500 hover:scale-105 opacity-0 animate-[fadeIn_0.6s_ease-in-out_forwards]`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                isDark 
                  ? 'bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-purple-500/30' 
                  : 'bg-gray-50 border border-gray-200 group-hover:bg-gray-100 group-hover:border-purple-600/30 group-hover:shadow-xl'
              }`}></div>
              
              <div className="relative">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-all duration-500 ${
                  isDark 
                    ? 'bg-white text-[#0A0A0A] group-hover:bg-purple-500 group-hover:text-white' 
                    : 'bg-[#0A0A0A] text-white group-hover:bg-purple-600'
                }`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                
                <h3 className={`text-xl mb-3 ${
                  isDark ? 'text-white' : 'text-[#0A0A0A]'
                }`}>
                  {feature.title}
                </h3>
                <p className={`leading-relaxed ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 relative opacity-0 animate-[fadeIn_1s_ease-in-out_0.8s_forwards]">
          {/* Background glow for CTA */}
          <div className={`absolute inset-0 rounded-3xl blur-3xl transition-opacity duration-1000 ${
            isDark ? 'opacity-30 bg-purple-600/20' : 'opacity-0'
          }`}></div>
          
          <div className={`relative backdrop-blur-xl rounded-3xl p-12 text-center transition-all duration-500 ${
            isDark 
              ? 'bg-white/5 border border-white/20' 
              : 'bg-gray-100 border border-gray-200'
          }`}>
            <h3 className={`text-4xl mb-4 ${
              isDark ? 'text-white' : 'text-[#0A0A0A]'
            }`}>
              ¿Listo para comenzar tu próxima aventura?
            </h3>
            <p className={`text-xl mb-8 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Únete a miles de profesionales que ya encontraron su match perfecto
            </p>
            <button className={`px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              isDark 
                ? 'bg-white text-[#0A0A0A] hover:bg-gray-100 shadow-lg shadow-white/10' 
                : 'bg-[#0A0A0A] text-white hover:bg-gray-900 shadow-xl'
            }`}>
              Crear mi perfil ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}