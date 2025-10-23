'use client';

import LandingLayout from '@/components/landing/LandingLayout';
import { useTranslations } from 'next-intl';
import PricingTable from '@/components/landing/PricingTable';
import FAQAccordion from '@/components/landing/FAQAccordion';
import CTASection from '@/components/landing/CTASection';
import { Check } from 'lucide-react';

export default function PreciosPage() {
  const t = useTranslations('pricing');

  return (
    <LandingLayout>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-gray-900">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('hero.subtitle')}
            </p>

            {/* Value Props */}
            <div className="flex flex-wrap justify-center gap-6 pt-6">
              <div className="flex items-center space-x-2 text-gray-700">
                <Check className="w-5 h-5 text-primary-600" />
                <span className="font-medium">{t('hero.benefits.noSetupFee')}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Check className="w-5 h-5 text-primary-600" />
                <span className="font-medium">{t('hero.benefits.freeTrial')}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Check className="w-5 h-5 text-primary-600" />
                <span className="font-medium">{t('hero.benefits.cancelAnytime')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <PricingTable translationKey="pricing.plans" showAnnual={true} />

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-display text-center mb-12">
            {t('comparison.title')}
          </h2>
          <div className="max-w-6xl mx-auto bg-gray-50 rounded-2xl p-8">
            <p className="text-center text-gray-600">
              {t('comparison.description')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion translationKey="pricing.faq" />

      {/* Final CTA */}
      <CTASection translationKey="pricing.cta" variant="gradient" showSecondary={true} />
    </LandingLayout>
  );
}
