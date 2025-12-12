import {
  Zap,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Linkedin,
  Instagram,
  Github,
} from "lucide-react";

interface FooterProps {
  isDark: boolean;
}

export function LandingFooter({ isDark }: FooterProps) {
  return (
    <footer
      className={`relative transition-colors duration-500 ${
        isDark ? "border-t border-white/10" : "border-t border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  isDark ? "bg-white text-[#0A0A0A]" : "bg-[#0A0A0A] text-white"
                }`}
              >
                <Zap className="w-6 h-6" fill="currentColor" />
              </div>
              <span
                className={`text-2xl ${
                  isDark ? "text-white" : "text-[#0A0A0A]"
                }`}
              >
                Unext
              </span>
            </div>
            <p
              className={`mb-6 leading-relaxed ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              La plataforma que revoluciona la conexión entre talento joven y
              empresas toda Venezuela.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isDark
                    ? "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                    : "bg-gray-100 border border-gray-200 text-gray-600 hover:text-[#0A0A0A] hover:bg-gray-200"
                }`}
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isDark
                    ? "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                    : "bg-gray-100 border border-gray-200 text-gray-600 hover:text-[#0A0A0A] hover:bg-gray-200"
                }`}
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isDark
                    ? "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                    : "bg-gray-100 border border-gray-200 text-gray-600 hover:text-[#0A0A0A] hover:bg-gray-200"
                }`}
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isDark
                    ? "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                    : "bg-gray-100 border border-gray-200 text-gray-600 hover:text-[#0A0A0A] hover:bg-gray-200"
                }`}
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className={`mb-4 ${isDark ? "text-white" : "text-[#0A0A0A]"}`}>
              Para Talento
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className={`transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  Crear Perfil
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  Explorar Ofertas
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  Recursos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`mb-4 ${isDark ? "text-white" : "text-[#0A0A0A]"}`}>
              Para Empresas
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className={`transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  Publicar Oferta
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  Buscar Talento
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  Planes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-purple-400"
                      : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  Casos de Éxito
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`mb-4 ${isDark ? "text-white" : "text-[#0A0A0A]"}`}>
              Contacto
            </h3>
            <ul className="space-y-3">
              <li
                className={`flex items-center gap-2 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Mail
                  className={`w-5 h-5 ${
                    isDark ? "text-purple-500" : "text-purple-700"
                  }`}
                />
                <span>unext@hotmail.com</span>
              </li>
              <li
                className={`flex items-center gap-2 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Phone
                  className={`w-5 h-5 ${
                    isDark ? "text-purple-500" : "text-purple-700"
                  }`}
                />
                <span>+58 424 567 890</span>
              </li>
              <li
                className={`flex items-center gap-2 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <MapPin
                  className={`w-5 h-5 ${
                    isDark ? "text-purple-500" : "text-purple-700"
                  }`}
                />
                <span>Caracas, Venezuela</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors duration-500 ${
            isDark ? "border-white/10" : "border-gray-200"
          }`}
        >
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            © 2025 Unext. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className={`transition-colors ${
                isDark
                  ? "text-gray-400 hover:text-purple-400"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Términos
            </a>
            <a
              href="#"
              className={`transition-colors ${
                isDark
                  ? "text-gray-400 hover:text-purple-400"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Privacidad
            </a>
            <a
              href="#"
              className={`transition-colors ${
                isDark
                  ? "text-gray-400 hover:text-purple-400"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
