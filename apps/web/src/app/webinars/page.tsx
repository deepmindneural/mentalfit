'use client';

import LandingLayout from '@/components/landing/LandingLayout';
import { useTranslations } from 'next-intl';
import { Calendar, Clock, Users, Video, ArrowRight } from 'lucide-react';

export default function WebinarsPage() {
  const t = useTranslations('webinars');

  // This would come from the database
  const upcomingWebinars = [
    {
      id: 1,
      title: 'Prevención del Burnout en Equipos Remotos',
      description: 'Estrategias prácticas para identificar y prevenir el agotamiento en equipos distribuidos.',
      date: '2025-11-15',
      time: '10:00 AM PST',
      duration: '60 minutos',
      speaker: 'Dr. María González',
      attendees: 127,
      image: '/images/webinars/burnout.jpg'
    },
    {
      id: 2,
      title: 'Mindfulness y Productividad',
      description: 'Cómo integrar prácticas de mindfulness para mejorar el rendimiento laboral.',
      date: '2025-11-22',
      time: '2:00 PM PST',
      duration: '45 minutos',
      speaker: 'Lic. Carlos Medina',
      attendees: 89,
      image: '/images/webinars/mindfulness.jpg'
    }
  ];

  const pastWebinars = [
    {
      id: 3,
      title: 'Gestión del Estrés en Tiempos de Cambio',
      date: '2025-10-18',
      views: 342,
      recordingUrl: '/webinars/recording/3'
    },
    {
      id: 4,
      title: 'Cultura de Bienestar Organizacional',
      date: '2025-10-05',
      views: 278,
      recordingUrl: '/webinars/recording/4'
    }
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

      {/* Upcoming Webinars */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-display text-gray-900 mb-12">
            {t('upcoming.title')}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingWebinars.map(webinar => (
              <div key={webinar.id} className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600" />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {webinar.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {webinar.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Calendar className="w-5 h-5 text-primary-600" />
                      <span>{webinar.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Clock className="w-5 h-5 text-primary-600" />
                      <span>{webinar.time} • {webinar.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Users className="w-5 h-5 text-primary-600" />
                      <span>{webinar.attendees} registrados</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Con {webinar.speaker}</span>
                    <button className="px-6 py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors flex items-center">
                      Registrarse
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Webinars */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-display text-gray-900 mb-12">
            {t('past.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pastWebinars.map(webinar => (
              <div key={webinar.id} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {webinar.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {webinar.date} • {webinar.views} vistas
                </p>
                <a
                  href={webinar.recordingUrl}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center"
                >
                  Ver grabación
                  <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
