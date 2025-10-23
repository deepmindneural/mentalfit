'use client';

import LandingLayout from '@/components/landing/LandingLayout';
import HeroSection from '@/components/landing/HeroSection';
import StatsSection from '@/components/landing/StatsSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import BenefitsTabs from '@/components/landing/BenefitsTabs';
import HowItWorks from '@/components/landing/HowItWorks';
import CTASection from '@/components/landing/CTASection';

export default function BienestarEquiposPage() {
  return (
    <LandingLayout>
      <HeroSection translationKey="solutions.bienestarEquipos.hero" variant="gradient" />
      <StatsSection translationKey="solutions.bienestarEquipos.stats" variant="primary" />
      <FeatureGrid translationKey="solutions.bienestarEquipos.features" columns={3} variant="cards" />
      <BenefitsTabs translationKey="solutions.bienestarEquipos.benefits" />
      <HowItWorks translationKey="solutions.bienestarEquipos.howItWorks" variant="horizontal" />
      <CTASection translationKey="solutions.bienestarEquipos.cta" variant="split" showSecondary={true} />
    </LandingLayout>
  );
}
