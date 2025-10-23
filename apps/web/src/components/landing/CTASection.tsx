'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface CTASectionProps {
  translationKey: string;
  variant?: 'default' | 'gradient' | 'split';
  showSecondary?: boolean;
}

export default function CTASection({
  translationKey,
  variant = 'gradient',
  showSecondary = true
}: CTASectionProps) {
  const t = useTranslations(translationKey);

  if (variant === 'split') {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Primary CTA */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <Sparkles className="w-12 h-12 mb-4 text-primary-200" />
                <h3 className="text-3xl font-bold font-display mb-4">
                  {t('primary.title')}
                </h3>
                <p className="text-lg text-primary-100 mb-6">
                  {t('primary.description')}
                </p>
                <Link
                  href={t('primary.link')}
                  className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors duration-200 group"
                >
                  {t('primary.buttonText')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Secondary CTA */}
            {showSecondary && (
              <div className="bg-gray-900 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500 opacity-10 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                  <div className="w-12 h-12 mb-4 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="text-3xl font-bold font-display mb-4">
                    {t('secondary.title')}
                  </h3>
                  <p className="text-lg text-gray-300 mb-6">
                    {t('secondary.description')}
                  </p>
                  <Link
                    href={t('secondary.link')}
                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200 group"
                  >
                    {t('secondary.buttonText')}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 lg:py-24 ${variant === 'gradient' ? 'bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800' : 'bg-gray-900'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-5xl mx-auto text-center">
          {/* Decorative elements */}
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary-400/20 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10 space-y-8">
            {/* Badge */}
            {t('badge', { defaultValue: '' }) && (
              <div className="inline-flex items-center space-x-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>{t('badge')}</span>
              </div>
            )}

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white">
              {t('title')}
            </h2>

            {/* Description */}
            <p className="text-lg lg:text-xl text-primary-100 max-w-3xl mx-auto">
              {t('description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href={t('primaryButton.link')}
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-2xl group"
              >
                {t('primaryButton.text')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {showSecondary && (
                <Link
                  href={t('secondaryButton.link')}
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  {t('secondaryButton.text')}
                </Link>
              )}
            </div>

            {/* Additional info */}
            {t('note', { defaultValue: '' }) && (
              <p className="text-sm text-primary-200">
                {t('note')}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
