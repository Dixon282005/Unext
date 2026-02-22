import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onNavigateToLogin?: () => void;
  onNavigateToRegister?: () => void;
}

export function Navbar({ onNavigateToLogin, onNavigateToRegister }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Inicio', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'Oportunidades', action: () => scrollToSection('oportunidades') },
    { label: 'Talento', action: () => scrollToSection('talento') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080808]/80 backdrop-blur-xl '
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-14' : 'h-16'
        }`}>
          {/* Logo - old style */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center group"
          >
            <span
              className={`tracking-tight text-white transition-all duration-300 ${
                scrolled ? 'text-lg' : 'text-xl'
              }`}
              style={{ letterSpacing: '-0.03em' }}
            >
              U<span className="text-purple-500">next</span>
            </span>
          </button>

          {/* Desktop Nav - right side */}
          <div className="hidden md:flex items-center gap-1">
            <nav className="flex items-center gap-1 mr-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="px-3 py-1.5 rounded-md text-sm text-[#8a8a8a] hover:text-white hover:bg-white/[0.04] transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={onNavigateToLogin}
                className="px-3 py-1.5 text-sm text-[#8a8a8a] hover:text-white transition-colors"
              >
                Ingresar
              </button>
              <button
                onClick={onNavigateToRegister}
                className="px-4 py-2 rounded-lg text-sm bg-white/[0.08] border border-white/[0.08] text-white hover:bg-white/[0.12] hover:border-white/[0.12] transition-all duration-200"
              >
                Comenzar
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[#8a8a8a] hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#080808]/95 backdrop-blur-xl border-t border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    link.action();
                    setMobileOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-md text-sm text-[#8a8a8a] hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 border-t border-white/[0.06] mt-3 space-y-1">
                <button
                  onClick={onNavigateToLogin}
                  className="w-full text-left px-3 py-2.5 rounded-md text-sm text-[#8a8a8a] hover:text-white hover:bg-white/[0.04] transition-colors"
                >
                  Ingresar
                </button>
                <button
                  onClick={onNavigateToRegister}
                  className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/[0.08] border border-white/[0.08] text-white hover:bg-white/[0.12] transition-all"
                >
                  Comenzar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}