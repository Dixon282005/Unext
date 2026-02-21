import { motion } from 'motion/react';

const universities = [
  'Universidad Nacional',
  'ITESM',
  'Universidad de Buenos Aires',
  'Universidad de Chile',
  'UNAM',
  'Universidad de los Andes',
  'Pontificia Javeriana',
  'UC Chile',
  'Universidad del Pacífico',
  'Instituto Politécnico',
  'ESPOL',
  'Universidad Simón Bolívar',
];

export function TrustedBy() {
  const doubled = [...universities, ...universities];

  return (
    <section className="py-16 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-center text-sm text-[#5a5a5a] mb-8 tracking-wide uppercase" style={{ letterSpacing: '0.1em' }}>
          Respaldados por instituciones líderes en Latinoamérica
        </p>

        <div className="relative">
          {/* Marquee track */}
          <div className="overflow-hidden">
            <div className="flex gap-6 items-center animate-marquee" style={{ width: 'max-content' }}>
              {doubled.map((name, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-5 py-2 rounded-lg border border-white/[0.06] text-sm text-[#5a5a5a] hover:text-[#8a8a8a] hover:border-white/[0.1] transition-all duration-300 cursor-default"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none z-10" />
        </div>
      </motion.div>
    </section>
  );
}
