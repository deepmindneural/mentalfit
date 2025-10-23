'use client';

import LandingLayout from '@/components/landing/LandingLayout';
import HeroSection from '@/components/landing/HeroSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import HowItWorks from '@/components/landing/HowItWorks';
import TestimonialsCarousel from '@/components/landing/TestimonialsCarousel';
import CTASection from '@/components/landing/CTASection';
import FAQAccordion from '@/components/landing/FAQAccordion';

export default function ChatIAPage() {
  return (
    <LandingLayout>
      <HeroSection translationKey="features.chatIA.hero" variant="gradient" showVideo={true} />
      <FeatureGrid translationKey="features.chatIA.features" columns={3} variant="cards" />
      <HowItWorks translationKey="features.chatIA.howItWorks" variant="horizontal" />
      <TestimonialsCarousel translationKey="features.chatIA.testimonials" autoplay={true} />
      <FAQAccordion translationKey="features.chatIA.faq" />
      <CTASection translationKey="features.chatIA.cta" variant="gradient" showSecondary={true} />
    </LandingLayout>
  );
}
