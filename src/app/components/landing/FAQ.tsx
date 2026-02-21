import { useState } from 'react';
import { motion } from 'motion/react';

const faqs = [
  {
    question: '¿Cómo funciona Unext?',
    answer: 'Unext conecta estudiantes, egresados y pasantes con empresas que buscan talento joven. Crea tu perfil, explora oportunidades personalizadas y postúlate con un solo clic. Las empresas pueden descubrir tu perfil y contactarte directamente.',
  },
  {
    question: '¿La plataforma es gratuita?',
    answer: 'Sí, el registro y uso básico de Unext es completamente gratuito para estudiantes y candidatos. Las empresas cuentan con planes de suscripción para publicar posiciones y acceder a nuestro pool de talento con filtros avanzados.',
  },
  {
    question: '¿Qué tipos de oportunidades puedo encontrar?',
    answer: 'Unext ofrece pasantías, prácticas profesionales, roles de medio tiempo, proyectos freelance y posiciones de tiempo completo para recién egresados. Nuestra IA también muestra oportunidades basadas en retos donde puedes demostrar tus habilidades.',
  },
  {
    question: '¿Cómo funciona el matching con IA?',
    answer: 'Nuestro algoritmo analiza tus habilidades, formación académica, portafolio de proyectos y preferencias de carrera. Luego calcula la compatibilidad con las posiciones abiertas considerando ajuste técnico, afinidad cultural y potencial de crecimiento. Los matches mejoran con el tiempo a medida que interactúas con la plataforma.',
  },
  {
    question: '¿Cuánto tiempo toma conseguir una oportunidad?',
    answer: 'Los candidatos activos típicamente reciben sus primeras respuestas en 24-48 horas. Completar retos de habilidades y mantener tu perfil actualizado aumenta significativamente tu visibilidad ante los reclutadores.',
  },
  {
    question: '¿Puedo aplicar desde cualquier país?',
    answer: 'Sí, Unext está disponible en toda Latinoamérica. Muchas empresas ofrecen oportunidades remotas, y puedes filtrar por ubicación, modalidad de trabajo y compatibilidad de zona horaria.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl tracking-tight text-white mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-lg text-[#8a8a8a] max-w-xl mx-auto">
            Todo lo que necesitas saber para comenzar
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    isOpen
                      ? 'border-purple-500/20 bg-white/[0.03]'
                      : 'border-white/[0.06] hover:border-white/[0.1] hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm text-white">{faq.question}</h3>
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 ${
                      isOpen
                        ? 'border-purple-500/30 bg-purple-500/10 rotate-45'
                        : 'border-white/[0.12]'
                    }`}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 2v6M2 5h6" stroke={isOpen ? '#8b5cf6' : '#5a5a5a'} strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm text-[#8a8a8a] leading-relaxed pr-8">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 text-center p-6 rounded-xl border border-white/[0.06]"
        >
          <p className="text-sm text-[#8a8a8a]">
            ¿Aún tienes preguntas?{' '}
            <a href="mailto:support@unext.com" className="text-purple-400 hover:text-purple-300 transition-colors">
              Contacta a nuestro equipo
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
