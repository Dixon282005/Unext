"use client";

import { Zap, Mail, MapPin, Phone, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

/**
 * @file components/layout/AppFooter.tsx
 * Generic application footer — usable on landing page, marketing pages, or any public page.
 *
 * Includes:
 *  - Brand logo + description + social links
 *  - Navigation columns (Talento, Empresas, Contacto)
 *  - Legal bottom bar (copyright, terms, privacy, cookies)
 */

interface AppFooterProps {
  isDark: boolean;
}

const socialLinks = [
  { Icon: Twitter,   href: "#" },
  { Icon: Linkedin,  href: "#" },
  { Icon: Instagram, href: "#" },
  { Icon: Github,    href: "#" },
];

export function AppFooter({ isDark }: AppFooterProps) {
  const link = isDark
    ? "text-gray-400 hover:text-purple-400"
    : "text-gray-600 hover:text-purple-600";

  const socialBtn = isDark
    ? "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
    : "bg-gray-100 border border-gray-200 text-gray-600 hover:text-[#0A0A0A] hover:bg-gray-200";

  return (
    <footer className={`relative transition-colors duration-500 ${isDark ? 'border-t border-white/10' : 'border-t border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 mb-12">

          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isDark ? 'bg-white text-[#0A0A0A]' : 'bg-[#0A0A0A] text-white'}`}>
                <Zap className="w-6 h-6" fill="currentColor" />
              </div>
              <span className={`text-2xl ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Unext</span>
            </div>
            <p className={`mb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              La plataforma que revoluciona la conexión entre talento joven y empresas innovadoras en toda Latinoamérica.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href }, i) => (
                <a key={i} href={href} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${socialBtn}`}>
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Talento */}
          <div>
            <h3 className={`mb-4 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Para Talento</h3>
            <ul className="space-y-3">
              {['Crear Perfil', 'Explorar Ofertas', 'Recursos', 'Blog'].map((item) => (
                <li key={item}><a href="#" className={`transition-colors ${link}`}>{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Empresas */}
          <div>
            <h3 className={`mb-4 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Para Empresas</h3>
            <ul className="space-y-3">
              {['Publicar Oferta', 'Buscar Talento', 'Planes', 'Casos de Éxito'].map((item) => (
                <li key={item}><a href="#" className={`transition-colors ${link}`}>{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className={`mb-4 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Contacto</h3>
            <ul className="space-y-3">
              {[
                { Icon: Mail,    text: 'hola@unext.com' },
                { Icon: Phone,   text: '+1 (555) 123-4567' },
                { Icon: MapPin,  text: 'Venezuela' },
              ].map(({ Icon, text }) => (
                <li key={text} className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Icon className={`w-5 h-5 ${isDark ? 'text-purple-500' : 'text-purple-700'}`} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors duration-500 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>© 2025 Unext. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            {['Términos', 'Privacidad', 'Cookies'].map((label) => (
              <a key={label} href="#" className={`transition-colors ${link}`}>{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
