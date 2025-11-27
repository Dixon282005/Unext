"use client";

import { useState, useEffect } from 'react';
import { LandingHeader } from './components/landing/layout/LandingHeader';
import { LandingHero } from './components/landing/sections/LandingHero';
import { LandingFeatures } from './components/landing/sections/LandingFeatures';
import { LandingTrustedBy } from './components/landing/sections/LandingTrustedBy';
import { LandingHowItWorks } from './components/landing/sections/LandingHowItWorks';
import { LandingStats } from './components/landing/sections/LandingStats';
import { LandingTestimonials } from './components/landing/sections/LandingTestimonials';
import { LandingOpportunities } from './components/landing/sections/LandingOpportunities';
import { LandingCandidates } from './components/landing/sections/LandingCandidates';
import { LandingFooter } from './components/landing/layout/LandingFooter';

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
      <LandingHeader 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isDark={isDark}
        setIsDark={setIsDark}
        scrollY={scrollY}
      />
      
      {activeSection === 'home' && (
        <>
          <LandingHero setActiveSection={setActiveSection} isDark={isDark} />
          <LandingTrustedBy isDark={isDark} />
          <LandingFeatures isDark={isDark} />
          <LandingHowItWorks isDark={isDark} />
          <LandingStats isDark={isDark} />
          <LandingTestimonials isDark={isDark} />
        </>
      )}
      
      {activeSection === 'opportunities' && <LandingOpportunities isDark={isDark} />}
      {activeSection === 'candidates' && <LandingCandidates isDark={isDark} />}
      
      <LandingFooter isDark={isDark} />
    </div>
  );
}