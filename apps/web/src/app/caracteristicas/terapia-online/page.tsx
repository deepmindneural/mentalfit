'use client';

import LandingLayout from '@/components/landing/LandingLayout';
import HeroSection from '@/components/landing/HeroSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import HowItWorks from '@/components/landing/HowItWorks';
import TestimonialsCarousel from '@/components/landing/TestimonialsCarousel';
import CTASection from '@/components/landing/CTASection';
import FAQAccordion from '@/components/landing/FAQAccordion';
import TrustBadges from '@/components/landing/TrustBadges';

export default function TerapiaOnlinePage() {
  return (
    <LandingLayout>
      <HeroSection translationKey="features.terapiaOnline.hero" variant="gradient" />
      <TrustBadges translationKey="features.terapiaOnline.trustBadges" variant="default" />
      <FeatureGrid translationKey="features.terapiaOnline.features" columns={3} variant="cards" />
      <HowItWorks translationKey="features.terapiaOnline.howItWorks" variant="vertical" />
      <TestimonialsCarousel translationKey="features.terapiaOnline.testimonials" autoplay={true} />
      <FAQAccordion translationKey="features.terapiaOnline.faq" />
      <CTASection translationKey="features.terapiaOnline.cta" variant="gradient" showSecondary={true} />
    </LandingLayout>
  );
}
