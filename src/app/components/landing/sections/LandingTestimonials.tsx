import { Star, Quote } from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface TestimonialsProps {
  isDark: boolean;
}

export function Testimonials({ isDark }: TestimonialsProps) {
  const testimonials = [
    {
      id: 1,
      name: 'Valentina Morales',
      role: 'Desarrolladora Frontend',
      company: 'TechCorp',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      quote: 'Gracias a Unext conseguí mi primera pasantía en desarrollo web. La plataforma me conectó con empresas que realmente valoraban mi potencial.',
      rating: 5
    },
    {
      id: 2,
      name: 'Santiago Ruiz',
      role: 'Diseñador UX',
      company: 'Creative Studio',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      quote: 'La experiencia fue increíble. El proceso de aplicación es súper sencillo y las empresas responden rápido. ¡100% recomendado!',
      rating: 5
    },
    {
      id: 3,
      name: 'Camila Torres',
      role: 'Analista de Datos',
      company: 'DataInsights',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      quote: 'Encontré el trabajo perfecto para comenzar mi carrera. Unext me ayudó a destacar mis habilidades y conectar con reclutadores top.',
      rating: 5
    },
    {
      id: 4,
      name: 'Mateo Fernández',
      role: 'Ingeniero de Software',
      company: 'Innovation Labs',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      quote: 'Como recién egresado, Unext fue clave para dar mis primeros pasos profesionales. La plataforma es intuitiva y efectiva.',
      rating: 5
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Efecto modo claro */}
        {!isDark && (
          <>
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-300/50 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-300/50 rounded-full blur-3xl animate-pulse"></div>
          </>
        )}
        
        {/* Efecto modo oscuro */}
        {isDark && (
          <>
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-900/20 rounded-full blur-3xl animate-pulse"></div>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 opacity-0 animate-[fadeIn_1s_ease-in-out_forwards]">
          <h2 className="text-5xl mb-6">
            <span className={isDark ? 'text-white' : 'text-[#0A0A0A]'}>
              Historias de{' '}
            </span>
            <span className={isDark ? 'text-purple-500' : 'text-purple-600'}>
              éxito
            </span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Estudiantes y egresados que transformaron su carrera con Unext
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`relative p-8 rounded-3xl transition-all duration-500 hover:scale-105 opacity-0 animate-[fadeIn_0.8s_ease-in-out_forwards] ${
                isDark 
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-purple-600/30 hover:shadow-2xl'
              }`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              {/* Quote icon */}
              <div className={`absolute top-6 right-6 opacity-20 ${
                isDark ? 'text-purple-500' : 'text-purple-600'
              }`}>
                <Quote className="w-12 h-12" />
              </div>

              {/* Content */}
              <div className="relative">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                {/* Quote */}
                <p className={`text-lg mb-6 leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-2xl object-cover"
                    />
                  </div>
                  <div>
                    <div className={`mb-1 ${
                      isDark ? 'text-white' : 'text-[#0A0A0A]'
                    }`}>
                      {testimonial.name}
                    </div>
                    <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      {testimonial.role} en {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}