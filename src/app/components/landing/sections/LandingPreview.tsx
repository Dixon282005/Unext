import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { Sparkles } from 'lucide-react';

interface PlatformPreviewProps {
  isDark: boolean;
}

export function PlatformPreview({ isDark }: PlatformPreviewProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {!isDark && (
          <>
            <div className="absolute -top-20 left-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl"></div>
          </>
        )}
        {isDark && (
          <>
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-violet-900/10 rounded-full blur-3xl"></div>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Texto introductorio */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
            isDark 
              ? 'bg-white/5 border border-white/10 backdrop-blur-sm' 
              : 'bg-white/80 border border-purple-200/50 backdrop-blur-sm shadow-lg shadow-purple-100'
          }`}>
           
            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Plataforma intuitiva y moderna
            </span>
          </div>
          
          <h2 className={`text-4xl md:text-5xl mb-4 ${
            isDark ? 'text-white' : 'text-[#0A0A0A]'
          }`}>
            Conecta con tu{' '}
            <span className={isDark ? 'text-purple-500' : 'text-purple-600'}>
              futuro profesional
            </span>
          </h2>
          
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Una experiencia diseñada para estudiantes y empresas. Simple, efectiva y poderosa.
          </p>
        </div>

        {/* Imagen con efectos */}
        <div className="relative">
          {/* Contenedor de la imagen */}
          <div className={`relative rounded-2xl overflow-hidden border-2 ${
            isDark 
              ? 'border-gray-800 shadow-2xl' 
              : 'border-gray-200 shadow-2xl'
          }`}>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1752170080635-db168448f85d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjB0ZWFtJTIwd29ya2luZ3xlbnwxfHx8fDE3NjY4ODM0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Profesionales usando Unext"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: '16/9' }}
            />
            
            {/* Overlay con gradiente sutil */}
            <div className={`absolute inset-0 pointer-events-none ${
              isDark 
                ? 'bg-gradient-to-t from-[#0A0A0A]/20 to-transparent' 
                : 'bg-gradient-to-t from-white/10 to-transparent'
            }`}></div>
          </div>

          {/* Elementos decorativos flotantes */}
          <div className={`absolute -top-6 -left-6 w-12 h-12 rounded-full ${
            isDark 
              ? 'bg-purple-500/20 border border-purple-500/30' 
              : 'bg-purple-200/50 border border-purple-300/50'
          } backdrop-blur-sm animate-pulse`}></div>
          
          <div className={`absolute -bottom-6 -right-6 w-16 h-16 rounded-full ${
            isDark 
              ? 'bg-violet-500/20 border border-violet-500/30' 
              : 'bg-violet-200/50 border border-violet-300/50'
          } backdrop-blur-sm animate-pulse`} style={{ animationDelay: '1s' }}></div>

          <div className={`absolute top-1/4 -right-8 w-10 h-10 rounded-full ${
            isDark 
              ? 'bg-purple-600/20 border border-purple-600/30' 
              : 'bg-purple-300/50 border border-purple-400/50'
          } backdrop-blur-sm animate-pulse`} style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Features rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className={`p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
            isDark 
              ? 'bg-white/5 border border-white/10 hover:bg-white/10' 
              : 'bg-white/60 backdrop-blur-sm border border-purple-200/50 hover:border-purple-500/30 hover:shadow-lg'
          }`}>
            <div className="text-4xl mb-3">🎯</div>
            <h3 className={`mb-2 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
              Match Inteligente
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Algoritmo que conecta el talento perfecto
            </p>
          </div>

          <div className={`p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
            isDark 
              ? 'bg-white/5 border border-white/10 hover:bg-white/10' 
              : 'bg-white/60 backdrop-blur-sm border border-purple-200/50 hover:border-purple-500/30 hover:shadow-lg'
          }`}>
            <div className="text-4xl mb-3">⚡</div>
            <h3 className={`mb-2 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
              Proceso Rápido
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Aplicaciones y respuestas en tiempo real
            </p>
          </div>

          <div className={`p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
            isDark 
              ? 'bg-white/5 border border-white/10 hover:bg-white/10' 
              : 'bg-white/60 backdrop-blur-sm border border-purple-200/50 hover:border-purple-500/30 hover:shadow-lg'
          }`}>
            <div className="text-4xl mb-3">🚀</div>
            <h3 className={`mb-2 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
              Crece Profesionalmente
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Oportunidades que impulsan tu carrera
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}