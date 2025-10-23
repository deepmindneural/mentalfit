'use client';

import { useTranslations } from 'next-intl';
import {
  MessageSquare,
  Users,
  BarChart3,
  Shield,
  Clock,
  Heart,
  Brain,
  Sparkles,
  Award,
  Lock,
  Zap,
  Target,
  LucideIcon
} from 'lucide-react';

interface FeatureGridProps {
  translationKey: string;
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'cards' | 'minimal';
}

export default function FeatureGrid({
  translationKey,
  columns = 3,
  variant = 'default'
}: FeatureGridProps) {
  const t = useTranslations(translationKey);

  const iconMap: Record<string, LucideIcon> = {
    messageSquare: MessageSquare,
    users: Users,
    barChart3: BarChart3,
    shield: Shield,
    clock: Clock,
    heart: Heart,
    brain: Brain,
    sparkles: Sparkles,
    award: Award,
    lock: Lock,
    zap: Zap,
    target: Target
  };

  // Determine number of features based on translation keys
  const features = [];
  let index = 0;
  while (true) {
    try {
      const title = t(`features.${index}.title`);
      if (!title) break;

      features.push({
        icon: iconMap[t(`features.${index}.icon`)] || Sparkles,
        title,
        description: t(`features.${index}.description`),
        link: t(`features.${index}.link`, { defaultValue: '' })
      });
      index++;
    } catch {
      break;
    }
  }

  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

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

        {/* Features grid */}
        <div className={`grid ${columnClasses[columns]} gap-8 lg:gap-12`}>
          {features.map((feature, index) => {
            const Icon = feature.icon;

            if (variant === 'minimal') {
              return (
                <div
                  key={index}
                  className="space-y-4 animate-deslizar-arriba"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Icon className="w-10 h-10 text-primary-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                  {feature.link && (
                    <a
                      href={feature.link}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group"
                    >
                      Learn more
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              );
            }

            return (
              <div
                key={index}
                className={`${variant === 'cards' ? 'bg-gray-50 p-8 rounded-2xl hover:shadow-xl' : 'p-6'} group transition-all duration-300 animate-deslizar-arriba hover:scale-105`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 text-primary-600 rounded-xl group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Optional link */}
                  {feature.link && (
                    <a
                      href={feature.link}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm group/link"
                    >
                      Saber más
                      <svg className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
