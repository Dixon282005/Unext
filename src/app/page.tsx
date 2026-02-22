"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from './components/landing/Navbar';
import { Hero } from './components/landing/Hero';
import { TrustedBy } from './components/landing/TrustedBy';
import { Features } from './components/landing/Features';
import { Oportunidades } from './components/landing/Oportunidades';
import { Talento } from './components/landing/Talento';
import { PlatformPreview } from './components/landing/PlatformPreview';
import { HowItWorks } from './components/landing/HowItWorks';
import { Testimonials } from './components/landing/Testimonials';
import { FAQ } from './components/landing/FAQ';
import { CTA } from './components/landing/CTA';
import { Footer } from './components/landing/Footer';
import { ParallaxOrbs } from './components/landing/ParallaxOrbs';
import { Login } from './(auth)/login/page';
import { Register } from './(auth)/register/page';
import { Dashboard } from './(dashboard)/dashboard/page';
import { OnboardingFlow, OnboardingData } from '@/features/profile/components/OnboardingFlow';

type Page = 'landing' | 'login' | 'register' | 'onboarding' | 'dashboard';

export default function App() {
  const router = useRouter(); // Dejado pos si se usa luego, pero ahora manejaremos SPA states
  
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'student' | 'company'>('student');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (data: { name: string, email: string }) => {
    setUserName(data.name);
    setUserEmail(data.email);
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('landing');
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    // Al guardar o terminar, el onboarding nos lleva al Dashboard
    console.log("Onboarding Terminado y Recibido en Root:", data);
    setCurrentPage('dashboard');
  };

  // Auth pages (always dark env injected manually per previous requests)
  if (currentPage === 'login') {
    return (
      <Login
        isDark={true}
        onLogin={handleLogin}
        onNavigateToRegister={() => setCurrentPage('register')}
        onNavigateToHome={() => setCurrentPage('landing')}
      />
    );
  }

  if (currentPage === 'register') {
    return (
      <Register
        isDark={true}
        onRegister={(data: { type: 'student' | 'company', name: string, email: string }) => {
          setUserType(data.type);
          setUserName(data.name);
          setUserEmail(data.email);
          setIsAuthenticated(true);
          // OJO: Tras registrarse, NO vamos al dashboard. Vamos al onboarding.
          setCurrentPage('onboarding');
        }}
        onNavigateToLogin={() => setCurrentPage('login')}
        onNavigateToHome={() => setCurrentPage('landing')}
      />
    );
  }

  // == NEW ONBOARDING PAGE INTERCEPTOR ==
  if (currentPage === 'onboarding' && isAuthenticated) {
    return (
      <OnboardingFlow 
        userName={userName}
        onComplete={handleOnboardingComplete}
      />
    );
  }

  if (currentPage === 'dashboard' && isAuthenticated) {
    return (
      <Dashboard
        isDark={true}
        setIsDark={() => {}}
        onLogout={handleLogout}
        userType={userType}
        userName={userName}
        userEmail={userEmail}
      />
    );
  }

  // Landing Page
  return (
    <div className="min-h-screen bg-[#080808] relative overflow-x-hidden">
      {/* Global ambient orbs */}
      <ParallaxOrbs />

      <Navbar
        onNavigateToLogin={() => setCurrentPage('login')}
        onNavigateToRegister={() => setCurrentPage('register')}
      />

      <main>
        <Hero onNavigateToRegister={() => setCurrentPage('register')} />
        <TrustedBy />
        <Features />
        <Oportunidades />
        <Talento />
        <PlatformPreview />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTA onNavigateToRegister={() => setCurrentPage('register')} />
      </main>

      <Footer />
    </div>
  );
}
