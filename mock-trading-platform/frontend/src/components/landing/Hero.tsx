'use client';

import HeroSection from './HeroSection';
import SimpleHero from './SimpleHero';
import AnimationErrorBoundary from '@/components/ui/AnimationErrorBoundary';

export default function Hero() {
  return (
    <AnimationErrorBoundary fallback={<SimpleHero />}>
      <HeroSection />
    </AnimationErrorBoundary>
  );
}