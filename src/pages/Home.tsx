import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import EspecialistasGrid from '../components/especialistas/EspecialistasGrid';
import WhatsAppButton from '../components/shared/WhatsAppButton';
import IAChat from '../components/shared/IAChat';
import Testimonios from '../components/shared/Testimonios';
import { obtenerEspecialistasDestacados } from '../data/especialistas';
import { Especialista } from '../tipos';
import HeroSection from '../components/home/HeroSection';
import BenefitsSection from '../components/home/BenefitsSection';
import CTASection from '../components/home/CTASection';
import ReservaRapida from '../components/reservas/ReservaRapida';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [especialistasDestacados, setEspecialistasDestacados] = useState<Especialista[]>([]);

  useEffect(() => {
    // Obtener especialistas destacados
    const destacados = obtenerEspecialistasDestacados();
    setEspecialistasDestacados(destacados);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section Mejorado */}
      <HeroSection />
      
      {/* Sección de Reserva Rápida */}
      <section className="py-16 bg-gradient-to-r from-primario-50 to-secundario-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">{t('Reserva tu cita en minutos')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('Encuentra el especialista perfecto para ti y agenda una consulta presencial o virtual con solo unos clics.')}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <ReservaRapida className="transform hover:shadow-xl transition-all duration-300" />
          </div>
          
          <div className="mt-10 flex flex-wrap justify-center gap-10">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primario-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-gray-700">{t('Proceso rápido y seguro')}</span>
            </div>
            
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primario-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-gray-700">{t('Especialistas certificados')}</span>
            </div>
            
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primario-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <span className="text-gray-700">{t('Pago seguro con créditos')}</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Especialistas Destacados */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('especialistasDestacados')}</h2>
          <EspecialistasGrid especialistas={especialistasDestacados} destacados={true} />
          
          <div className="text-center mt-10">
            <Link to="/especialistas" className="inline-flex items-center text-primario-600 hover:text-primario-700 font-medium">
              {t('verMasEspecialistas')}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Beneficios Mejorados */}
      <BenefitsSection />

      {/* Sección de Estadísticas */}
      <section className="py-16 bg-gradient-to-r from-primario-50 to-secundario-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('nuestroImpacto')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-white rounded-xl shadow-md transform transition duration-500 hover:scale-105">
              <div className="text-5xl font-bold text-primario-600 mb-2">+15K</div>
              <p className="text-lg text-gray-700">Personas beneficiadas</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md transform transition duration-500 hover:scale-105">
              <div className="text-5xl font-bold text-primario-600 mb-2">98%</div>
              <p className="text-lg text-gray-700">Satisfacción</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md transform transition duration-500 hover:scale-105">
              <div className="text-5xl font-bold text-primario-600 mb-2">+120</div>
              <p className="text-lg text-gray-700">Especialistas</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md transform transition duration-500 hover:scale-105">
              <div className="text-5xl font-bold text-primario-600 mb-2">+5K</div>
              <p className="text-lg text-gray-700">Sesiones mensuales</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sección de Servicios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">{t('nuestrosServicios')}</h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Ofrecemos servicios especializados para tu bienestar mental y emocional
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:border-primario-300 transition duration-300">
              <div className="w-14 h-14 bg-primario-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primario-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Terapia Individual</h3>
              <p className="text-gray-600 text-center">Atención personalizada con nuestros especialistas, enfocada en tus necesidades específicas.</p>
              <div className="mt-4 text-center">
                <Link to="/servicios/individual" className="text-primario-600 hover:text-primario-800 font-medium">
                  Saber más →
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:border-primario-300 transition duration-300">
              <div className="w-14 h-14 bg-primario-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primario-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Talleres y Cursos</h3>
              <p className="text-gray-600 text-center">Aprende herramientas prácticas para mejorar tu bienestar emocional y mental con nuestros expertos.</p>
              <div className="mt-4 text-center">
                <Link to="/servicios/talleres" className="text-primario-600 hover:text-primario-800 font-medium">
                  Saber más →
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:border-primario-300 transition duration-300">
              <div className="w-14 h-14 bg-primario-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primario-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Consultoría Empresarial</h3>
              <p className="text-gray-600 text-center">Programas especializados para empresas que buscan mejorar el bienestar de sus colaboradores.</p>
              <div className="mt-4 text-center">
                <Link to="/servicios/empresas" className="text-primario-600 hover:text-primario-800 font-medium">
                  Saber más →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <Testimonios />
      
      {/* Sección de Blog */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">{t('nuestrosBlog')}</h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Contenido actualizado sobre salud mental, bienestar y desarrollo personal
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition duration-300">
              <div className="h-48 bg-gray-200 relative">
                <img src="https://images.unsplash.com/photo-1593526613712-7b4b8e8d8b4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Blog 1" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-primario-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                  Salud Mental
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Estrategias efectivas para manejar la ansiedad</h3>
                <p className="text-gray-600 mb-4">Descubre técnicas prácticas y respaldadas científicamente para gestionar los síntomas de ansiedad.</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">10 May, 2025</span>
                  <Link to="/blog/estrategias-ansiedad" className="text-primario-600 hover:text-primario-800 font-medium">
                    Leer más →
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition duration-300">
              <div className="h-48 bg-gray-200 relative">
                <img src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Blog 2" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-secundario-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                  Mindfulness
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Mindfulness en el trabajo: aumenta tu productividad</h3>
                <p className="text-gray-600 mb-4">Cómo implementar prácticas de mindfulness para mejorar tu enfoque y reducir el estrés laboral.</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">5 May, 2025</span>
                  <Link to="/blog/mindfulness-trabajo" className="text-primario-600 hover:text-primario-800 font-medium">
                    Leer más →
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition duration-300">
              <div className="h-48 bg-gray-200 relative">
                <img src="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Blog 3" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-acento-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                  Relaciones
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Comunicación efectiva en relaciones de pareja</h3>
                <p className="text-gray-600 mb-4">Herramientas para mejorar la comunicación y resolver conflictos de manera constructiva en tu relación.</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">1 May, 2025</span>
                  <Link to="/blog/comunicacion-pareja" className="text-primario-600 hover:text-primario-800 font-medium">
                    Leer más →
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/blog" className="inline-block px-6 py-3 bg-primario-600 hover:bg-primario-700 text-white font-medium rounded-md transition duration-300">
              Ver todos los artículos
            </Link>
          </div>
        </div>
      </section>
      
      {/* Preguntas Frecuentes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">{t('preguntasFrecuentes')}</h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Resolvemos tus dudas sobre nuestros servicios y cómo podemos ayudarte
          </p>
          
          <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-primario-200 transition duration-300">
              <h3 className="text-lg font-semibold mb-2">¿Cómo puedo agendar una cita con un especialista?</h3>
              <p className="text-gray-600">Puedes agendar una cita directamente desde nuestra plataforma. Solo tienes que registrarte, buscar el especialista que más se adapte a tus necesidades y seleccionar la fecha y hora disponible.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 hover:border-primario-200 transition duration-300">
              <h3 className="text-lg font-semibold mb-2">¿Cuánto dura una sesión de terapia?</h3>
              <p className="text-gray-600">Las sesiones de terapia individual suelen durar entre 45 y 60 minutos. La duración puede variar según el tipo de servicio y las necesidades específicas de cada persona.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 hover:border-primario-200 transition duration-300">
              <h3 className="text-lg font-semibold mb-2">¿Las sesiones son confidenciales?</h3>
              <p className="text-gray-600">Sí, todas las sesiones son completamente confidenciales. Nuestros especialistas están obligados a mantener la confidencialidad según los estándares éticos y legales de la profesión.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 hover:border-primario-200 transition duration-300">
              <h3 className="text-lg font-semibold mb-2">¿Cuáles son los métodos de pago aceptados?</h3>
              <p className="text-gray-600">Aceptamos diferentes métodos de pago, incluyendo tarjetas de crédito/débito, transferencias bancarias y otros medios electrónicos disponibles en la plataforma.</p>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/faq" className="inline-flex items-center text-primario-600 hover:text-primario-700 font-medium">
              Ver todas las preguntas
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Aliados Estratégicos */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('nuestrosAliados')}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            <div className="flex justify-center">
              <img src="https://via.placeholder.com/150x80?text=Universidad+Nacional" alt="Universidad Nacional" className="h-12 opacity-70 hover:opacity-100 transition duration-300" />
            </div>
            <div className="flex justify-center">
              <img src="https://via.placeholder.com/150x80?text=Hospital+Santa+Fe" alt="Hospital Santa Fe" className="h-12 opacity-70 hover:opacity-100 transition duration-300" />
            </div>
            <div className="flex justify-center">
              <img src="https://via.placeholder.com/150x80?text=Clínica+del+Country" alt="Clínica del Country" className="h-12 opacity-70 hover:opacity-100 transition duration-300" />
            </div>
            <div className="flex justify-center">
              <img src="https://via.placeholder.com/150x80?text=Fundación+Salud+Mental" alt="Fundación Salud Mental" className="h-12 opacity-70 hover:opacity-100 transition duration-300" />
            </div>
            <div className="flex justify-center">
              <img src="https://via.placeholder.com/150x80?text=Asociación+Psicólogos" alt="Asociación Psicólogos" className="h-12 opacity-70 hover:opacity-100 transition duration-300" />
            </div>
            <div className="flex justify-center">
              <img src="https://via.placeholder.com/150x80?text=Instituto+Bienestar" alt="Instituto Bienestar" className="h-12 opacity-70 hover:opacity-100 transition duration-300" />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Mejorada */}
      <CTASection />
      
      <Footer />
      <WhatsAppButton telefono="573001234567" flotante={true} />
      <IAChat />
    </div>
  );
};

export default Home;
