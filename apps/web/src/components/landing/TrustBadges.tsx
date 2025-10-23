'use client';

import { useTranslations } from 'next-intl';
import { Shield, Lock, Award, CheckCircle } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface TrustBadgesProps {
  translationKey: string;
  variant?: 'default' | 'compact';
}

export default function TrustBadges({ translationKey, variant = 'default' }: TrustBadgesProps) {
  const t = useTranslations(translationKey);

  const iconMap: Record<string, LucideIcon> = {
    shield: Shield,
    lock: Lock,
    award: Award,
    checkCircle: CheckCircle
  };

  // Parse badges from translations
  const badges = [0, 1, 2, 3].map(index => {
    try {
      return {
        icon: iconMap[t(`badges.${index}.icon`)] || Shield,
        title: t(`badges.${index}.title`),
        description: t(`badges.${index}.description`, { defaultValue: '' })
      };
    } catch {
      return null;
    }
  }).filter(Boolean);

  if (variant === 'compact') {
    return (
      <div className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {badges.map((badge, index) => {
              if (!badge) return null;
              const Icon = badge.icon;
              return (
                <div key={index} className="flex items-center space-x-2 text-gray-600">
                  <Icon className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-sm">{badge.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-white border-y border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {badges.map((badge, index) => {
            if (!badge) return null;
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-2 animate-aparecer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  {badge.title}
                </h4>
                {badge.description && (
                  <p className="text-xs text-gray-600">
                    {badge.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
