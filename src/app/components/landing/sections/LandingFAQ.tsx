"use client";

import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQProps {
  isDark: boolean;
}

export function FAQ({ isDark }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Cómo funciona Unext?",
      answer: "Unext conecta estudiantes y empresas mediante un algoritmo inteligente que analiza habilidades y requisitos para crear el match perfecto."
    },
    {
      question: "¿Es gratuito para estudiantes?",
      answer: "Sí, Unext es completamente gratuito para estudiantes y recién egresados que buscan oportunidades profesionales."
    },
    {
      question: "¿Cómo verifican a las empresas?",
      answer: "Realizamos un proceso de validación riguroso para asegurar que todas las empresas sean legítimas y ofrezcan oportunidades de calidad."
    },
    {
      question: "¿Qué tipo de oportunidades puedo encontrar?",
      answer: "Encontrarás desde pasantías y prácticas profesionales hasta trabajos de tiempo completo para perfiles junior y trainee."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 transition-colors ${
            isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-100 border border-gray-200'
          }`}>
            <HelpCircle className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
              Preguntas Frecuentes
            </span>
          </div>
          
          <h2 className={`text-4xl mb-4 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
            Resolvemos tus <span className={isDark ? 'text-purple-500' : 'text-purple-600'}>dudas</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`rounded-2xl transition-all duration-300 ${
                isDark 
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10' 
                  : 'bg-white border border-gray-200 hover:shadow-lg'
              }`}
            >
              <button
                className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`text-lg font-medium pr-8 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                ) : (
                  <Plus className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                )}
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className={`px-8 pb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
