'use client';

import LandingLayout from '@/components/landing/LandingLayout';
import HeroSection from '@/components/landing/HeroSection';
import StatsSection from '@/components/landing/StatsSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import HowItWorks from '@/components/landing/HowItWorks';
import TestimonialsCarousel from '@/components/landing/TestimonialsCarousel';
import CTASection from '@/components/landing/CTASection';

export default function PrevencionBurnoutPage() {
  return (
    <LandingLayout>
      <HeroSection translationKey="solutions.prevencionBurnout.hero" variant="gradient" />
      <StatsSection translationKey="solutions.prevencionBurnout.stats" variant="default" />
      <FeatureGrid translationKey="solutions.prevencionBurnout.features" columns={3} variant="cards" />
      <HowItWorks translationKey="solutions.prevencionBurnout.howItWorks" variant="horizontal" />
      <TestimonialsCarousel translationKey="solutions.prevencionBurnout.testimonials" autoplay={true} />
      <CTASection translationKey="solutions.prevencionBurnout.cta" variant="gradient" showSecondary={true} />
    </LandingLayout>
  );
}
