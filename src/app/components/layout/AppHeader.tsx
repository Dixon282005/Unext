"use client";

import { Zap, Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * @file components/layout/AppHeader.tsx
 * Generic application header — usable in landing page, marketing pages, or any page
 * that needs a top nav with dark mode toggle and auth links.
 *
 * Includes:
 *  - Logo (Zap icon + "Unext")
 *  - Animated sliding nav indicator (framer-motion)
 *  - Dark mode toggle button
 *  - Login / Register links
 *  - Full mobile menu with hamburger
 */

interface AppHeaderProps {
  activeSection: 'home' | 'opportunities' | 'candidates';
  setActiveSection: (section: 'home' | 'opportunities' | 'candidates') => void;
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  scrollY: number;
}

export function AppHeader({ activeSection, setActiveSection, isDark, setIsDark, scrollY }: AppHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrolled = scrollY > 20;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isDark
        ? `${isScrolled || mobileMenuOpen ? 'bg-[#0A0A0A]/95 backdrop-blur-xl shadow-2xl shadow-purple-900/20 border-b border-white/10' : 'bg-transparent'}`
        : `${isScrolled || mobileMenuOpen ? 'bg-white/95 backdrop-blur-xl shadow-2xl shadow-gray-300/50 border-gray-200' : 'bg-transparent'}`
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-500 ${isScrolled ? 'h-16' : 'h-20'}`}>

          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveSection('home')}>
            <div className={`rounded-xl flex items-center justify-center transition-all duration-500 ${
              isScrolled ? 'w-9 h-9' : 'w-11 h-11'
            } ${isDark ? 'bg-white text-[#0A0A0A] group-hover:bg-gray-100' : 'bg-[#0A0A0A] text-white group-hover:bg-gray-900'}`}>
              <Zap className={`transition-all duration-500 ${isScrolled ? 'w-5 h-5' : 'w-6 h-6'}`} fill="currentColor" />
            </div>
            <span className={`transition-all duration-500 ${isScrolled ? 'text-xl' : 'text-2xl'} ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
              Unext
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className={`hidden md:flex items-center gap-2 rounded-full p-1.5 transition-colors relative ${
            isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-100 border border-gray-200'
          }`}>
            <motion.div
              className={`absolute rounded-full shadow-lg ${isDark ? 'bg-white' : 'bg-[#0A0A0A]'}`}
              initial={false}
              animate={{
                x: activeSection === 'home' ? 6 : activeSection === 'opportunities' ? 92 : 266,
                width: activeSection === 'home' ? 78 : activeSection === 'opportunities' ? 162 : 90,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              style={{ height: '42px', top: '6px' }}
            />
            {(['home', 'opportunities', 'candidates'] as const).map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`relative z-10 px-6 py-2.5 rounded-full transition-colors duration-300 ${
                  activeSection === section
                    ? isDark ? 'text-[#0A0A0A]' : 'text-white'
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-[#0A0A0A]'
                }`}
              >
                {section === 'home' ? 'Inicio' : section === 'opportunities' ? 'Oportunidades' : 'Talento'}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isDark ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-gray-100 border border-gray-200 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link href="/login" className={`px-5 py-2.5 transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-[#0A0A0A]'}`}>
              Ingresar
            </Link>
            <Link href="/register" className={`relative px-5 py-2.5 rounded-full transition-all ${isDark ? 'bg-white text-[#0A0A0A] hover:bg-gray-100' : 'bg-[#0A0A0A] text-white hover:bg-gray-900'}`}>
              Comenzar
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-700 hover:text-[#0A0A0A] hover:bg-gray-100'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 w-full h-screen pb-20 overflow-y-auto backdrop-blur-xl transition-colors border-t ${
          isDark ? 'bg-[#0A0A0A]/95 border-white/10' : 'bg-white/95 border-gray-200'
        }`}>
          <div className="px-4 py-6 space-y-3">
            {(['home', 'opportunities', 'candidates'] as const).map((section) => (
              <button
                key={section}
                onClick={() => { setActiveSection(section); setMobileMenuOpen(false); }}
                className={`w-full px-6 py-4 rounded-xl text-left text-lg font-medium transition-all ${
                  activeSection === section
                    ? isDark ? 'bg-white text-[#0A0A0A]' : 'bg-[#0A0A0A] text-white'
                    : isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-[#0A0A0A] hover:bg-gray-100'
                }`}
              >
                {section === 'home' ? 'Inicio' : section === 'opportunities' ? 'Oportunidades' : 'Talento'}
              </button>
            ))}
            <div className="pt-4 space-y-3 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`w-full px-6 py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg font-medium ${
                  isDark ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-700 hover:text-[#0A0A0A] hover:bg-gray-100'
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                {isDark ? 'Modo Claro' : 'Modo Oscuro'}
              </button>
              <Link href="/login" className={`block text-center w-full px-6 py-4 text-lg font-medium transition-colors rounded-xl ${isDark ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-700 hover:text-[#0A0A0A] hover:bg-gray-100'}`}>
                Ingresar
              </Link>
              <Link href="/register" className={`block text-center w-full px-6 py-4 text-lg font-medium rounded-xl transition-all ${isDark ? 'bg-white text-[#0A0A0A] hover:bg-gray-100' : 'bg-[#0A0A0A] text-white hover:bg-gray-900'}`}>
                Comenzar
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
