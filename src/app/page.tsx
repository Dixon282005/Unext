"use client";

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

export default function App() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#080808] relative overflow-x-hidden">
      {/* Global ambient orbs */}
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
