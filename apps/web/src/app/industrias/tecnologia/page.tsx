'use client';

import LandingLayout from '@/components/landing/LandingLayout';
import HeroSection from '@/components/landing/HeroSection';
import StatsSection from '@/components/landing/StatsSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import TestimonialsCarousel from '@/components/landing/TestimonialsCarousel';
import CTASection from '@/components/landing/CTASection';

export default function IndustriaTecnologiaPage() {
  return (
    <LandingLayout>
      <HeroSection translationKey="industries.tecnologia.hero" variant="gradient" />
      <StatsSection translationKey="industries.tecnologia.stats" variant="primary" />
      <FeatureGrid translationKey="industries.tecnologia.features" columns={3} variant="cards" />
      <TestimonialsCarousel translationKey="industries.tecnologia.testimonials" autoplay={true} />
      <CTASection translationKey="industries.tecnologia.cta" variant="gradient" showSecondary={true} />
    </LandingLayout>
  );
}
