import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface CTAProps {
  onNavigateToRegister?: () => void;
}

export function CTA({ onNavigateToRegister }: CTAProps) {
  return (
    <section className="py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-purple-900/[0.08] via-transparent to-transparent" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/[0.06] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative rounded-2xl border border-white/[0.08] overflow-hidden"
        >
          {/* Inner glow effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.04] via-transparent to-violet-500/[0.04] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

          <div className="relative p-10 md:p-16 text-center">
            {/* Abstract decoration */}
            <div className="absolute top-6 right-6 opacity-20">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="30" stroke="rgba(139,92,246,0.3)" strokeWidth="0.5" />
                <circle cx="32" cy="32" r="20" stroke="rgba(139,92,246,0.2)" strokeWidth="0.5" />
                <circle cx="32" cy="32" r="10" stroke="rgba(139,92,246,0.15)" strokeWidth="0.5" />
              </svg>
            </div>

            <h2 className="text-4xl md:text-5xl tracking-tight text-white mb-4">
              Comienza tu camino hoy
            </h2>
            <p className="text-lg text-[#8a8a8a] max-w-xl mx-auto mb-8">
              Únete a miles de estudiantes y empresas que ya están construyendo conexiones significativas en Unext. Tu próxima oportunidad está a un paso.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onNavigateToRegister}
                className="group relative px-8 py-3.5 rounded-lg text-sm text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500 to-purple-600" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-purple-400 to-purple-500" />
                <span className="relative flex items-center justify-center gap-2">
                  Únete a Unext
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('how-it-works');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-lg text-sm border border-white/[0.08] text-[#8a8a8a] hover:text-white hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-200"
              >
                Saber más
              </button>
            </div>

            {/* Trust signals */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#5a5a5a]">
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 3L4.5 8.5 2 6" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Gratis para comenzar
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 3L4.5 8.5 2 6" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Sin tarjeta de crédito
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M10 3L4.5 8.5 2 6" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Configuración en 2 minutos
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
