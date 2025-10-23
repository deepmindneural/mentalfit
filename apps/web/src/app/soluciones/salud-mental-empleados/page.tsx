'use client';

import LandingLayout from '@/components/landing/LandingLayout';
import HeroSection from '@/components/landing/HeroSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import HowItWorks from '@/components/landing/HowItWorks';
import TestimonialsCarousel from '@/components/landing/TestimonialsCarousel';
import CTASection from '@/components/landing/CTASection';
import TrustBadges from '@/components/landing/TrustBadges';

export default function SaludMentalEmpleadosPage() {
  return (
    <LandingLayout>
      <HeroSection translationKey="solutions.saludMentalEmpleados.hero" variant="gradient" />
      <TrustBadges translationKey="solutions.saludMentalEmpleados.trustBadges" variant="compact" />
      <FeatureGrid translationKey="solutions.saludMentalEmpleados.features" columns={3} variant="cards" />
      <HowItWorks translationKey="solutions.saludMentalEmpleados.howItWorks" variant="horizontal" />
      <TestimonialsCarousel translationKey="solutions.saludMentalEmpleados.testimonials" autoplay={true} />
      <CTASection translationKey="solutions.saludMentalEmpleados.cta" variant="gradient" showSecondary={true} />
    </LandingLayout>
  );
}
