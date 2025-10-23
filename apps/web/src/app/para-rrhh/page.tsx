'use client';

import LandingLayout from '@/components/landing/LandingLayout';
import HeroSection from '@/components/landing/HeroSection';
import StatsSection from '@/components/landing/StatsSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import HowItWorks from '@/components/landing/HowItWorks';
import CTASection from '@/components/landing/CTASection';
import FAQAccordion from '@/components/landing/FAQAccordion';

export default function ParaRRHHPage() {
  return (
    <LandingLayout>
      <HeroSection translationKey="paraRRHH.hero" variant="gradient" />
      <StatsSection translationKey="paraRRHH.stats" variant="default" />
      <FeatureGrid translationKey="paraRRHH.features" columns={3} variant="minimal" />
      <HowItWorks translationKey="paraRRHH.howItWorks" variant="vertical" />
      <FAQAccordion translationKey="paraRRHH.faq" />
      <CTASection translationKey="paraRRHH.cta" variant="gradient" showSecondary={true} />
    </LandingLayout>
  );
}
