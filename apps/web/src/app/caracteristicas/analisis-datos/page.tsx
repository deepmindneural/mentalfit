'use client';

import LandingLayout from '@/components/landing/LandingLayout';
import HeroSection from '@/components/landing/HeroSection';
import StatsSection from '@/components/landing/StatsSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import HowItWorks from '@/components/landing/HowItWorks';
import CTASection from '@/components/landing/CTASection';

export default function AnalisisDatosPage() {
  return (
    <LandingLayout>
      <HeroSection translationKey="features.analisisDatos.hero" variant="gradient" />
      <StatsSection translationKey="features.analisisDatos.stats" variant="default" />
      <FeatureGrid translationKey="features.analisisDatos.features" columns={3} variant="cards" />
      <HowItWorks translationKey="features.analisisDatos.howItWorks" variant="horizontal" />
      <CTASection translationKey="features.analisisDatos.cta" variant="gradient" showSecondary={true} />
    </LandingLayout>
  );
}
