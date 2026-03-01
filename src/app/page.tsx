"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
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

export default function App() {
  const router = useRouter(); 
  const [isInitializing, setIsInitializing] = useState(true);

  // Verificar sesión activa de Supabase al cargar la app
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      // El middleware también hace esto, pero si el usuario navega a '/'
      // la redirección cliente lo manda rápido al dashboard
      if (session?.user) {
        router.push('/dashboard');
      }
      setIsInitializing(false);
    };

    checkSession();
  }, [router]);

  // Si está verificando sesión y ya tiene token, previene un render innecesario
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  // Landing Page
  return (
    <div className="min-h-screen bg-[#080808] relative overflow-x-hidden">
      <ParallaxOrbs />

      <Navbar
        onNavigateToLogin={() => router.push('/login')}
        onNavigateToRegister={() => router.push('/register')}
      />

      <main>
        <Hero onNavigateToRegister={() => router.push('/register')} />
        <TrustedBy />
        <Features />
        <Oportunidades />
        <Talento />
        <PlatformPreview />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTA onNavigateToRegister={() => router.push('/register')} />
      </main>

      <Footer />
    </div>
  );
}
