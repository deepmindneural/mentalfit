import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/shared/WhatsAppButton';
import IAChat from '../components/shared/IAChat';

const Cuestionarios: React.FC = () => {
  const { t } = useTranslation();

  const cuestionarios = [
    {
      id: 'phq9',
      nombre: t('cuestionarioDepresion'),
      descripcion: t('descripcionPHQ9'),
      duracion: '5-10 min',
      color: 'bg-blue-500',
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'gad7',
      nombre: t('cuestionarioAnsiedad'),
      descripcion: t('descripcionGAD7'),
      duracion: '3-5 min',
      color: 'bg-purple-500',
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      ),
    },
    {
      id: 'dass21',
      nombre: t('cuestionarioDASS21'),
      descripcion: t('descripcionDASS21'),
      duracion: '10-15 min',
      color: 'bg-teal-500',
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Banner */}
      <section className="pt-24 pb-10 bg-primario-600 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">{t('evaluacionesSaludMental')}</h1>
          <p className="mt-2">{t('seleccionaCuestionario')}</p>
        </div>
      </section>
      
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('evaluacionesDisponibles')}</h2>
            <p className="text-gray-600 mb-6">
              {t('evaluacionesExplicacion')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cuestionarios.map((cuestionario) => (
                <div 
                  key={cuestionario.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <div className={`${cuestionario.color} text-white p-4 flex items-center justify-between`}>
                    <h3 className="text-xl font-semibold">{cuestionario.nombre}</h3>
                    <div>
                      {cuestionario.icono}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{cuestionario.descripcion}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {cuestionario.duracion}
                      </span>
                      
                      <Link 
                        to={`/cuestionarios/${cuestionario.id}`}
                        className="bg-primario-500 hover:bg-primario-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                      >
                        {t('comenzar')}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-acento-50 border border-acento-200 rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-8/12 mb-6 md:mb-0 md:pr-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('asistenciaPersonalizada')}</h3>
                <p className="text-gray-600">
                  {t('chatIAExplicacion')}
                </p>
              </div>
              
              <div className="md:w-4/12">
                <button 
                  onClick={() => {
                    // Buscar la instancia del chat y abrirla
                    document.querySelector('[aria-label="Abrir chat con IA"]')?.dispatchEvent(
                      new MouseEvent('click', { bubbles: true })
                    );
                  }}
                  className="w-full bg-acento-500 hover:bg-acento-600 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  {t('chatConIA')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* WhatsApp Botón flotante */}
      <WhatsAppButton telefono="573001234567" flotante={true} />
      
      {/* Chat IA */}
      <IAChat />
    </div>
  );
};

export default Cuestionarios;
