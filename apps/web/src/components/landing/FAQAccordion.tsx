'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQAccordionProps {
  translationKey: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion({ translationKey }: FAQAccordionProps) {
  const t = useTranslations(translationKey);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Parse FAQs from translations
  const faqs: FAQItem[] = [0, 1, 2, 3, 4, 5, 6, 7].map(index => {
    try {
      return {
        question: t(`faqs.${index}.question`),
        answer: t(`faqs.${index}.answer`)
      };
    } catch {
      return null;
    }
  }).filter(Boolean) as FAQItem[];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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

        {/* FAQ items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md animate-deslizar-arriba"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-lg text-gray-900 pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`flex-shrink-0 w-6 h-6 text-primary-600 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        {t('contactCTA.text', { defaultValue: '' }) && (
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              {t('contactCTA.text')}
            </p>
            <a
              href={t('contactCTA.link')}
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold group"
            >
              {t('contactCTA.linkText')}
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
