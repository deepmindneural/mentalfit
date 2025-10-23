'use client';

import LandingLayout from '@/components/landing/LandingLayout';
import { useTranslations } from 'next-intl';
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Users, Zap, Award } from 'lucide-react';

export default function CarrerasPage() {
  const t = useTranslations('careers');

  // This would come from the database
  const openPositions = [
    {
      id: 1,
      title: 'Psicólogo/a Clínico Senior',
      department: 'Salud Mental',
      location: 'Remoto',
      type: 'Tiempo Completo',
      description: 'Buscamos psicólogos clínicos con experiencia en terapia online para unirse a nuestro equipo.'
    },
    {
      id: 2,
      title: 'Desarrollador Full Stack',
      department: 'Ingeniería',
      location: 'Híbrido - CDMX',
      type: 'Tiempo Completo',
      description: 'Únete a nuestro equipo de desarrollo para construir la próxima generación de herramientas de bienestar.'
    },
    {
      id: 3,
      title: 'Especialista en Éxito del Cliente',
      department: 'Experiencia del Cliente',
      location: 'Remoto',
      type: 'Tiempo Completo',
      description: 'Ayuda a nuestros clientes empresariales a maximizar el valor de la plataforma MentalFit.'
    }
  ];

  const benefits = [
    { icon: Heart, title: 'Bienestar Integral', description: 'Acceso completo a la plataforma y sesiones ilimitadas' },
    { icon: Users, title: 'Equipo Diverso', description: 'Cultura inclusiva y colaborativa' },
    { icon: Zap, title: 'Crecimiento', description: 'Oportunidades de desarrollo profesional' },
    { icon: Award, title: 'Compensación', description: 'Salarios competitivos y equity' }
  ];

  return (
    <LandingLayout>
      {/* Hero */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-gray-900">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Values/Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-display text-center text-gray-900 mb-12">
            {t('benefits.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-display text-gray-900 mb-12">
            {t('positions.title')}
          </h2>

          <div className="space-y-6 max-w-4xl mx-auto">
            {openPositions.map(position => (
              <div key={position.id} className="bg-white rounded-xl p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 mb-4 lg:mb-0">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {position.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {position.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4 text-primary-600" />
                        <span>{position.department}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-primary-600" />
                        <span>{position.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-primary-600" />
                        <span>{position.type}</span>
                      </div>
                    </div>
                  </div>

                  <button className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center lg:ml-6">
                    Aplicar
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {openPositions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">
                {t('positions.noOpenings')}
              </p>
              <p className="text-gray-500">
                {t('positions.checkBack')}
              </p>
            </div>
          )}
        </div>
      </section>
    </LandingLayout>
  );
}
