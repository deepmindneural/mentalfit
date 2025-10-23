'use client';

import { useTranslations } from 'next-intl';
import { TrendingUp, Users, Award, Clock } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface StatsSectionProps {
  translationKey: string;
  variant?: 'default' | 'primary' | 'dark';
}

interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
  trend?: string;
}

export default function StatsSection({ translationKey, variant = 'default' }: StatsSectionProps) {
  const t = useTranslations(translationKey);

  const iconMap: Record<string, LucideIcon> = {
    trendingUp: TrendingUp,
    users: Users,
    award: Award,
    clock: Clock
  };

  // Parse stats from translations
  const stats: StatItem[] = [0, 1, 2, 3].map(index => ({
    icon: iconMap[t(`stats.${index}.icon`)] || Users,
    value: t(`stats.${index}.value`),
    label: t(`stats.${index}.label`),
    trend: t(`stats.${index}.trend`, { defaultValue: '' })
  }));

  const variantClasses = {
    default: 'bg-gray-50',
    primary: 'bg-primary-600',
    dark: 'bg-gray-900'
  };

  const textClasses = {
    default: 'text-gray-900',
    primary: 'text-white',
    dark: 'text-white'
  };

  const subtextClasses = {
    default: 'text-gray-600',
    primary: 'text-primary-100',
    dark: 'text-gray-300'
  };

  const iconClasses = {
    default: 'text-primary-600 bg-primary-100',
    primary: 'text-primary-200 bg-white/10',
    dark: 'text-primary-400 bg-primary-900/30'
  };

  return (
    <section className={`${variantClasses[variant]} py-16 lg:py-24`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-bold font-display ${textClasses[variant]} mb-4`}>
            {t('title')}
          </h2>
          <p className={`text-lg ${subtextClasses[variant]} max-w-3xl mx-auto`}>
            {t('subtitle')}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center space-y-4 animate-deslizar-arriba"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${iconClasses[variant]} rounded-2xl`}>
                  <Icon className="w-8 h-8" />
                </div>

                <div>
                  <div className="flex items-center justify-center space-x-2">
                    <p className={`text-4xl sm:text-5xl font-bold font-display ${textClasses[variant]}`}>
                      {stat.value}
                    </p>
                    {stat.trend && (
                      <span className={`text-sm font-semibold ${variant === 'default' ? 'text-exito-600' : 'text-green-400'}`}>
                        {stat.trend}
                      </span>
                    )}
                  </div>
                  <p className={`text-base mt-2 ${subtextClasses[variant]}`}>
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional CTA */}
        {t('cta.text', { defaultValue: '' }) && (
          <div className="mt-12 text-center">
            <a
              href={t('cta.link')}
              className={`inline-flex items-center ${variant === 'default' ? 'text-primary-600 hover:text-primary-700' : 'text-white hover:text-primary-100'} font-semibold group`}
            >
              {t('cta.text')}
              <TrendingUp className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
