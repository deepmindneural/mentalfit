'use client';

import LandingLayout from '@/components/landing/LandingLayout';
import HeroSection from '@/components/landing/HeroSection';
import StatsSection from '@/components/landing/StatsSection';
import FeatureGrid from '@/components/landing/FeatureGrid';
import HowItWorks from '@/components/landing/HowItWorks';
import CTASection from '@/components/landing/CTASection';
import FAQAccordion from '@/components/landing/FAQAccordion';

export default function DashboardEmpresarialPage() {
  return (
    <LandingLayout>
      <HeroSection translationKey="features.dashboardEmpresarial.hero" variant="gradient" />
      <StatsSection translationKey="features.dashboardEmpresarial.stats" variant="primary" />
      <FeatureGrid translationKey="features.dashboardEmpresarial.features" columns={3} variant="cards" />
      <HowItWorks translationKey="features.dashboardEmpresarial.howItWorks" variant="horizontal" />
      <FAQAccordion translationKey="features.dashboardEmpresarial.faq" />
      <CTASection translationKey="features.dashboardEmpresarial.cta" variant="gradient" showSecondary={true} />
    </LandingLayout>
  );
}
