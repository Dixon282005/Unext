"use client";

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { TrustedBy } from './components/TrustedBy';
import { HowItWorks } from './components/HowItWorks';
import { Stats } from './components/Stats';
import { Testimonials } from './components/Testimonials';
import { Opportunities } from './components/Opportunities';
import { Candidates } from './components/Candidates';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<'home' | 'opportunities' | 'candidates'>('home');
  const [isDark, setIsDark] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      
      {activeSection === 'home' && (
        <>
          <Hero setActiveSection={setActiveSection} isDark={isDark} />
          <TrustedBy isDark={isDark} />
          <Features isDark={isDark} />
          <HowItWorks isDark={isDark} />
          <Stats isDark={isDark} />
          <Testimonials isDark={isDark} />
        </>
      )}
      
      {activeSection === 'opportunities' && <Opportunities isDark={isDark} />}
      {activeSection === 'candidates' && <Candidates isDark={isDark} />}
      
      <Footer isDark={isDark} />
    </div>
  );
}