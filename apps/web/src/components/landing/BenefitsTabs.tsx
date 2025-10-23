'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Building2, Users as UsersIcon, UserCog, Check } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface BenefitsTabsProps {
  translationKey: string;
}

interface Tab {
  id: string;
  icon: LucideIcon;
  label: string;
  benefits: string[];
}

export default function BenefitsTabs({ translationKey }: BenefitsTabsProps) {
  const t = useTranslations(translationKey);
  const [activeTab, setActiveTab] = useState(0);

  const iconMap: Record<string, LucideIcon> = {
    building2: Building2,
    users: UsersIcon,
    userCog: UserCog
  };

  // Parse tabs from translations
  const tabs: Tab[] = [0, 1, 2].map(index => ({
    id: t(`tabs.${index}.id`),
    icon: iconMap[t(`tabs.${index}.icon`)] || Building2,
    label: t(`tabs.${index}.label`),
    benefits: [0, 1, 2, 3, 4].map(i => {
      try {
        return t(`tabs.${index}.benefits.${i}`);
      } catch {
        return '';
      }
    }).filter(Boolean)
  }));

  const currentTab = tabs[activeTab];
  const Icon = currentTab?.icon;

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          {tabs.map((tab, index) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center justify-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === index
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                <TabIcon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Benefits list */}
            <div className="space-y-6 animate-aparecer">
              {currentTab?.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 animate-deslizar-izquierda"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

            {/* Visual element */}
            <div className="relative h-[400px] lg:h-[500px] animate-aparecer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center">
                {Icon && (
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-32 h-32 bg-primary-200 rounded-full">
                      <Icon className="w-16 h-16 text-primary-600" />
                    </div>
                    <p className="text-primary-700 font-semibold text-xl">
                      {currentTab.label}
                    </p>
                  </div>
                )}
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-300 rounded-full blur-2xl opacity-50 animate-pulso-suave" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary-300 rounded-full blur-2xl opacity-40 animate-pulso-suave" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
