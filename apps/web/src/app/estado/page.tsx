'use client';

import LandingLayout from '@/components/landing/LandingLayout';
import { useTranslations } from 'next-intl';
import { CheckCircle, AlertCircle, Clock, Activity } from 'lucide-react';

export default function EstadoPage() {
  const t = useTranslations('status');

  // This would come from a real-time API
  const services = [
    { name: 'Plataforma Web', status: 'operational', uptime: '99.99%' },
    { name: 'API', status: 'operational', uptime: '99.98%' },
    { name: 'Chat IA', status: 'operational', uptime: '99.95%' },
    { name: 'Videoconferencias', status: 'operational', uptime: '99.97%' },
    { name: 'Dashboard Empresarial', status: 'operational', uptime: '99.99%' },
    { name: 'Sistema de Notificaciones', status: 'operational', uptime: '99.96%' }
  ];

  const recentIncidents = [
    {
      id: 1,
      date: '2025-10-15',
      title: 'Latencia elevada en videollamadas',
      status: 'resolved',
      description: 'Algunos usuarios experimentaron latencia durante 15 minutos. Resuelto.'
    }
  ];

  const statusConfig = {
    operational: {
      icon: CheckCircle,
      text: 'Operacional',
      color: 'text-exito-600',
      bg: 'bg-exito-100'
    },
    degraded: {
      icon: AlertCircle,
      text: 'Degradado',
      color: 'text-advertencia-600',
      bg: 'bg-advertencia-100'
    },
    outage: {
      icon: AlertCircle,
      text: 'Caído',
      color: 'text-peligro-600',
      bg: 'bg-peligro-100'
    }
  };

  return (
    <LandingLayout>
      <section className="py-20 bg-gradient-to-br from-primary-50 to-white min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold font-display text-gray-900 mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Overall Status */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-exito-100 text-exito-600 rounded-full mb-4">
                <Activity className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Todos los Sistemas Operacionales
              </h2>
              <p className="text-gray-600">
                Última actualización: {new Date().toLocaleString('es-ES')}
              </p>
            </div>
          </div>

          {/* Services Status */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Estado de los Servicios
            </h3>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {services.map((service, index) => {
                const config = statusConfig[service.status as keyof typeof statusConfig];
                const Icon = config.icon;

                return (
                  <div
                    key={index}
                    className={`p-6 flex items-center justify-between ${
                      index !== services.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 ${config.bg} ${config.color} rounded-full flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {service.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Uptime: {service.uptime}
                        </p>
                      </div>
                    </div>

                    <div className={`flex items-center space-x-2 ${config.color} font-semibold`}>
                      <span>{config.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Incidents */}
          {recentIncidents.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Incidentes Recientes
              </h3>

              <div className="space-y-4">
                {recentIncidents.map(incident => (
                  <div key={incident.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {incident.title}
                      </h4>
                      <span className="px-3 py-1 bg-exito-100 text-exito-700 rounded-full text-sm font-medium">
                        Resuelto
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      {incident.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {incident.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subscribe to Updates */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-primary-50 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Suscríbete a Actualizaciones
              </h3>
              <p className="text-gray-600 mb-6">
                Recibe notificaciones sobre el estado del sistema
              </p>
              <div className="flex max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-4 py-3 rounded-l-lg border-2 border-primary-200 focus:border-primary-500 focus:outline-none"
                />
                <button className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-r-lg hover:bg-primary-700 transition-colors">
                  Suscribirse
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
