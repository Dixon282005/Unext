"use client";

import { useState, useEffect } from 'react';

import { Header } from './components/landing/layout/LandingHeader';
import { Hero } from './components/landing/sections/LandingHero';
import { Features } from './components/landing/sections/LandingFeatures';
import { TrustedBy } from './components/landing/sections/LandingTrustedBy';
import { HowItWorks } from './components/landing/sections/LandingHowItWorks';
import { FAQ } from './components/landing/sections/LandingFAQ';
import { Testimonials } from './components/landing/sections/LandingTestimonials';
import { Opportunities } from './components/landing/sections/LandingOpportunities';
import { Candidates } from './components/landing/sections/LandingCandidates';
import { Footer } from './components/landing/layout/LandingFooter';
import { PlatformPreview } from './components/landing/sections/LandingPreview';

import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [activeSection, setActiveSection] = useState<'home' | 'opportunities' | 'candidates'>('home');
  const [isDark, setIsDark] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll suave hacia arriba cuando cambia la sección
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  // Variantes de animación para las secciones
  const sectionVariants = {
    initial: { 
      opacity: 0,
      x: 100
    },
    animate: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    },
    exit: { 
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark 
        ? 'bg-[#0A0A0A]' 
        : 'bg-white'
    }`}>
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isDark={isDark}
        setIsDark={setIsDark}
        scrollY={scrollY}
      />
      
      <AnimatePresence>
        {activeSection === 'home' && (
          <motion.div
            key="home"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Hero setActiveSection={setActiveSection} isDark={isDark} />
            <PlatformPreview isDark={isDark} />
            <TrustedBy isDark={isDark} />
            <Features isDark={isDark} />
            <HowItWorks isDark={isDark} />
            <FAQ isDark={isDark} />
            <Testimonials isDark={isDark} />
          </motion.div>
        )}
        
        {activeSection === 'opportunities' && (
          <motion.div
            key="opportunities"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Opportunities isDark={isDark} />
          </motion.div>
        )}
        {activeSection === 'candidates' && (
          <motion.div
            key="candidates"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Candidates isDark={isDark} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer isDark={isDark} />
    </div>
  );
}