'use client';

import { useTranslations } from 'next-intl';
import { Check, X, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface PricingTableProps {
  translationKey: string;
  showAnnual?: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  priceAnnual?: string;
  currency: string;
  period: string;
  features: Array<{ text: string; included: boolean }>;
  buttonText: string;
  buttonLink: string;
  highlighted?: boolean;
  badge?: string;
}

export default function PricingTable({ translationKey, showAnnual = true }: PricingTableProps) {
  const t = useTranslations(translationKey);

  // Parse plans from translations
  const plans: PricingPlan[] = [0, 1, 2].map(index => {
    try {
      const features = [0, 1, 2, 3, 4, 5, 6].map(i => {
        try {
          return {
            text: t(`plans.${index}.features.${i}.text`),
            included: t(`plans.${index}.features.${i}.included`) === 'true'
          };
        } catch {
          return null;
        }
      }).filter(Boolean) as Array<{ text: string; included: boolean }>;

      return {
        name: t(`plans.${index}.name`),
        description: t(`plans.${index}.description`),
        price: t(`plans.${index}.price`),
        priceAnnual: t(`plans.${index}.priceAnnual`, { defaultValue: undefined }),
        currency: t(`plans.${index}.currency`, { defaultValue: '$' }),
        period: t(`plans.${index}.period`),
        features,
        buttonText: t(`plans.${index}.buttonText`),
        buttonLink: t(`plans.${index}.buttonLink`),
        highlighted: t(`plans.${index}.highlighted`, { defaultValue: 'false' }) === 'true',
        badge: t(`plans.${index}.badge`, { defaultValue: undefined })
      };
    } catch {
      return null;
    }
  }).filter(Boolean) as PricingPlan[];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
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

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl ${
                plan.highlighted
                  ? 'shadow-2xl ring-2 ring-primary-600 scale-105'
                  : 'shadow-lg'
              } p-8 transition-all duration-300 hover:shadow-xl animate-deslizar-arriba`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center space-x-1 bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    <Sparkles className="w-4 h-4" />
                    <span>{plan.badge}</span>
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-gray-600 text-lg">{plan.currency}</span>
                    <span className="text-5xl font-bold text-gray-900 mx-1">
                      {plan.price}
                    </span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  {plan.priceAnnual && showAnnual && (
                    <p className="text-sm text-gray-500 mt-2">
                      o {plan.currency}{plan.priceAnnual} anualmente
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <Link
                  href={plan.buttonLink}
                  className={`block w-full py-3 px-6 text-center font-semibold rounded-lg transition-all duration-200 ${
                    plan.highlighted
                      ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-glow'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>

              {/* Features list */}
              <div className="space-y-4 border-t border-gray-200 pt-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                      feature.included
                        ? 'bg-exito-100 text-exito-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {feature.included ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <X className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional note */}
        {t('note', { defaultValue: undefined }) && (
          <p className="text-center text-gray-600 mt-12 max-w-2xl mx-auto">
            {t('note')}
          </p>
        )}

        {/* Enterprise CTA */}
        {t('enterprise.title', { defaultValue: undefined }) && (
          <div className="mt-16 text-center max-w-3xl mx-auto bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {t('enterprise.title')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('enterprise.description')}
            </p>
            <Link
              href={t('enterprise.link')}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              {t('enterprise.buttonText')}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
