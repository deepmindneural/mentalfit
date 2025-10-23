'use client';

import { useTranslations } from 'next-intl';
import { UserPlus, Calendar, MessageSquare, TrendingUp, LucideIcon } from 'lucide-react';

interface HowItWorksProps {
  translationKey: string;
  variant?: 'vertical' | 'horizontal';
}

export default function HowItWorks({ translationKey, variant = 'horizontal' }: HowItWorksProps) {
  const t = useTranslations(translationKey);

  const iconMap: Record<string, LucideIcon> = {
    userPlus: UserPlus,
    calendar: Calendar,
    messageSquare: MessageSquare,
    trendingUp: TrendingUp
  };

  // Parse steps from translations
  const steps = [0, 1, 2, 3].map(index => {
    try {
      return {
        icon: iconMap[t(`steps.${index}.icon`)] || UserPlus,
        title: t(`steps.${index}.title`),
        description: t(`steps.${index}.description`)
      };
    } catch {
      return null;
    }
  }).filter(Boolean);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        {/* Steps */}
        {variant === 'horizontal' ? (
          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => {
                if (!step) return null;
                const Icon = step.icon;

                return (
                  <div
                    key={index}
                    className="relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 animate-deslizar-arriba"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Step number */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-10">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-xl mb-6">
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {steps.map((step, index) => {
              if (!step) return null;
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-start gap-6 animate-deslizar-arriba"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Step indicator */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 h-24 bg-gradient-to-b from-primary-600 to-primary-200 mt-4" />
                    )}
                  </div>

                  {/* Content card */}
                  <div className="flex-1 bg-gray-50 p-8 rounded-2xl">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        {t('cta.text', { defaultValue: '' }) && (
          <div className="mt-16 text-center">
            <a
              href={t('cta.link')}
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-200 shadow-lg hover:shadow-glow group"
            >
              {t('cta.text')}
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
