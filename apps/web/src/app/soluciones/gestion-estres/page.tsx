'use client';

import LandingLayout from '@/components/landing/LandingLayout';
import HeroSection from '@/components/landing/HeroSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import HowItWorks from '@/components/landing/HowItWorks';
import CTASection from '@/components/landing/CTASection';
import FAQAccordion from '@/components/landing/FAQAccordion';

export default function GestionEstresPage() {
  return (
    <LandingLayout>
      <HeroSection translationKey="solutions.gestionEstres.hero" variant="gradient" />
      <FeatureGrid translationKey="solutions.gestionEstres.features" columns={3} variant="cards" />
      <HowItWorks translationKey="solutions.gestionEstres.howItWorks" variant="vertical" />
      <FAQAccordion translationKey="solutions.gestionEstres.faq" />
      <CTASection translationKey="solutions.gestionEstres.cta" variant="gradient" showSecondary={true} />
    </LandingLayout>
  );
}
