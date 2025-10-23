'use client';

import LandingLayout from '@/components/landing/LandingLayout';
import HeroSection from '@/components/landing/HeroSection';
import StatsSection from '@/components/landing/StatsSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import HowItWorks from '@/components/landing/HowItWorks';
import TestimonialsCarousel from '@/components/landing/TestimonialsCarousel';
import CTASection from '@/components/landing/CTASection';
import PricingTable from '@/components/landing/PricingTable';

export default function ParaEmpresasPage() {
  return (
    <LandingLayout>
      <HeroSection translationKey="paraEmpresas.hero" variant="gradient" />
      <StatsSection translationKey="paraEmpresas.stats" variant="primary" />
      <FeatureGrid translationKey="paraEmpresas.features" columns={3} variant="cards" />
      <HowItWorks translationKey="paraEmpresas.howItWorks" variant="horizontal" />
      <TestimonialsCarousel translationKey="paraEmpresas.testimonials" autoplay={true} />
      <PricingTable translationKey="paraEmpresas.pricing" showAnnual={true} />
      <CTASection translationKey="paraEmpresas.cta" variant="gradient" showSecondary={true} />
    </LandingLayout>
  );
}
