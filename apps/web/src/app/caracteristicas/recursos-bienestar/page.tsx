'use client';

import LandingLayout from '@/components/landing/LandingLayout';
import HeroSection from '@/components/landing/HeroSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import BenefitsTabs from '@/components/landing/BenefitsTabs';
import CTASection from '@/components/landing/CTASection';

export default function RecursosBienestarPage() {
  return (
    <LandingLayout>
      <HeroSection translationKey="features.recursosBienestar.hero" variant="gradient" />
      <FeatureGrid translationKey="features.recursosBienestar.features" columns={4} variant="minimal" />
      <BenefitsTabs translationKey="features.recursosBienestar.benefits" />
      <CTASection translationKey="features.recursosBienestar.cta" variant="split" showSecondary={true} />
    </LandingLayout>
  );
}
