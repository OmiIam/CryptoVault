'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/landing/Navigation';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import PlatformPreview from '@/components/landing/PlatformPreview';
import TrustSection from '@/components/landing/TrustSection';
import Testimonials from '@/components/landing/Testimonials';
import Pricing from '@/components/landing/Pricing';
import Footer from '@/components/landing/Footer';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ErrorBoundary>
        <Navigation />
      </ErrorBoundary>
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <ErrorBoundary>
        <Features />
      </ErrorBoundary>
      <ErrorBoundary>
        <PlatformPreview />
      </ErrorBoundary>
      <ErrorBoundary>
        <TrustSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <Testimonials />
      </ErrorBoundary>
      <ErrorBoundary>
        <Pricing />
      </ErrorBoundary>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </div>
  );
}
