'use client';

import LandingLayout from '@/components/landing/LandingLayout';
import HeroSection from '@/components/landing/HeroSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import HowItWorks from '@/components/landing/HowItWorks';
import TestimonialsCarousel from '@/components/landing/TestimonialsCarousel';
import CTASection from '@/components/landing/CTASection';
import FAQAccordion from '@/components/landing/FAQAccordion';
import TrustBadges from '@/components/landing/TrustBadges';

export default function ParaEmpleadosPage() {
  return (
    <LandingLayout>
      <HeroSection translationKey="paraEmpleados.hero" variant="gradient" showVideo={true} />
      <TrustBadges translationKey="paraEmpleados.trustBadges" variant="compact" />
      <FeatureGrid translationKey="paraEmpleados.features" columns={3} variant="cards" />
      <HowItWorks translationKey="paraEmpleados.howItWorks" variant="horizontal" />
      <TestimonialsCarousel translationKey="paraEmpleados.testimonials" autoplay={true} />
      <FAQAccordion translationKey="paraEmpleados.faq" />
      <CTASection translationKey="paraEmpleados.cta" variant="gradient" showSecondary={false} />
    </LandingLayout>
  );
}
