'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  translationKey: string;
  showVideo?: boolean;
  backgroundImage?: string;
  variant?: 'default' | 'gradient' | 'image';
}

export default function HeroSection({
  translationKey,
  showVideo = true,
  backgroundImage,
  variant = 'gradient'
}: HeroSectionProps) {
  const t = useTranslations(translationKey);

  const backgroundClasses = {
    default: 'bg-white',
    gradient: 'bg-gradient-to-br from-primary-50 via-white to-primary-100',
    image: 'bg-cover bg-center relative'
  };

  return (
    <section className={`relative overflow-hidden ${backgroundClasses[variant]} py-20 lg:py-32`}>
      {variant === 'image' && backgroundImage && (
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70" />
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`space-y-8 ${variant === 'image' ? 'text-white' : ''}`}>
            {/* Badge/Tag */}
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulso-suave" />
              <span>{t('badge')}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight">
              {t('headline')}
            </h1>

            {/* Subheadline */}
            <p className={`text-lg sm:text-xl ${variant === 'image' ? 'text-gray-100' : 'text-gray-600'} max-w-2xl`}>
              {t('subheadline')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={t('primaryCTA.link')}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-200 shadow-lg hover:shadow-glow group"
              >
                {t('primaryCTA.text')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {showVideo && (
                <button
                  className={`inline-flex items-center justify-center px-8 py-4 ${variant === 'image' ? 'bg-white/10 text-white border-2 border-white/30 hover:bg-white/20' : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-primary-300'} font-semibold rounded-lg transition-all duration-200 group`}
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  {t('secondaryCTA.text')}
                </button>
              )}
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-primary-200 border-2 border-white flex items-center justify-center text-xs font-semibold text-primary-700"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className={`text-sm font-semibold ${variant === 'image' ? 'text-white' : 'text-gray-900'}`}>
                    {t('trustIndicator.users')}
                  </p>
                  <p className={`text-xs ${variant === 'image' ? 'text-gray-200' : 'text-gray-500'}`}>
                    {t('trustIndicator.subtitle')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="relative lg:h-[600px] h-[400px] hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-secondary-500/20 rounded-3xl blur-3xl" />
            <div className="relative h-full flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-50 rounded-3xl shadow-2xl p-8 flex items-center justify-center">
                {/* Placeholder for illustration/screenshot */}
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-primary-200 rounded-full mx-auto animate-pulso-suave flex items-center justify-center">
                    <div className="w-24 h-24 bg-primary-300 rounded-full" />
                  </div>
                  <p className="text-primary-600 font-medium">{t('imageAlt')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary-200 rounded-full blur-3xl opacity-20" />
    </section>
  );
}
