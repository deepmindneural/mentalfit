'use client';

import LandingLayout from '@/components/landing/LandingLayout';
import HeroSection from '@/components/landing/HeroSection';
import StatsSection from '@/components/landing/StatsSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import BenefitsTabs from '@/components/landing/BenefitsTabs';
import HowItWorks from '@/components/landing/HowItWorks';
import CTASection from '@/components/landing/CTASection';
import FAQAccordion from '@/components/landing/FAQAccordion';

export default function ParaProfesionalesPage() {
  return (
    <LandingLayout>
      <HeroSection translationKey="paraProfesionales.hero" variant="gradient" />
      <StatsSection translationKey="paraProfesionales.stats" variant="primary" />
      <FeatureGrid translationKey="paraProfesionales.features" columns={3} variant="cards" />
      <BenefitsTabs translationKey="paraProfesionales.benefits" />
      <HowItWorks translationKey="paraProfesionales.howItWorks" variant="horizontal" />
      <FAQAccordion translationKey="paraProfesionales.faq" />
      <CTASection translationKey="paraProfesionales.cta" variant="split" showSecondary={true} />
    </LandingLayout>
  );
}
