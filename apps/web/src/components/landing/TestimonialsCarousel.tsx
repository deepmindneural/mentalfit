'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface TestimonialsCarouselProps {
  translationKey: string;
  autoplay?: boolean;
  autoplayDelay?: number;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

export default function TestimonialsCarousel({
  translationKey,
  autoplay = true,
  autoplayDelay = 5000
}: TestimonialsCarouselProps) {
  const t = useTranslations(translationKey);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Parse testimonials from translations
  const testimonials: Testimonial[] = [0, 1, 2, 3, 4].map(index => {
    try {
      return {
        name: t(`testimonials.${index}.name`),
        role: t(`testimonials.${index}.role`),
        company: t(`testimonials.${index}.company`),
        content: t(`testimonials.${index}.content`),
        rating: parseInt(t(`testimonials.${index}.rating`, { defaultValue: '5' })),
        avatar: t(`testimonials.${index}.avatar`, { defaultValue: undefined })
      };
    } catch {
      return null;
    }
  }).filter(Boolean) as Testimonial[];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(nextTestimonial, autoplayDelay);
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, currentIndex]);

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-50 to-white">
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

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main testimonial card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 relative overflow-hidden">
            {/* Quote icon */}
            <Quote className="absolute top-8 right-8 w-16 h-16 text-primary-100" />

            {/* Content */}
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < currentTestimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 animate-aparecer">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Author info */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold text-xl">
                  {currentTestimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-gray-600">
                    {currentTestimonial.role} - {currentTestimonial.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 hover:shadow-xl transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 hover:shadow-xl transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-primary-600'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                } rounded-full`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Secondary testimonials - visible on larger screens */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                "{testimonial.content}"
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
