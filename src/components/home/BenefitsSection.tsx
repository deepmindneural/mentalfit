import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BenefitsSection: React.FC = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Evaluaciones validadas',
      description: 'Cuestionarios clu00ednicos basados en evidencia para medir tu nivel de ansiedad y depresiu00f3n.',
      delay: '0'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'IA personalizada',
      description: 'Recomendaciones basadas en inteligencia artificial adaptadas a tus necesidades especu00edficas.',
      delay: '300'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Especialistas verificados',
      description: 'Accede a los mejores profesionales de salud mental con credenciales verificadas.',
      delay: '600'
    }
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Elemento decorativo */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primario-100 rounded-full mix-blend-multiply opacity-70 filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secundario-100 rounded-full mix-blend-multiply opacity-70 filter blur-xl animate-blob animation-delay-4000"></div>
        
        <h2 className="text-3xl font-bold text-center mb-16 relative z-10">{t('beneficiosPlataforma')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl-colored transform transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              style={{
                animation: `fadeUp 1s ease-out forwards ${ benefit.delay ? benefit.delay + 'ms' : '0ms'} `,
                opacity: 0
              }}
            >
              <div className="bg-primario-100 text-primario-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">{benefit.title}</h3>
              <p className="text-gray-600 text-center">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16 relative z-10">
          <Link 
            to="/cuestionarios" 
            className="group bg-primario-600 hover:bg-primario-700 text-white font-semibold py-4 px-8 rounded-lg inline-flex items-center transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>{t('verCuestionarios')}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
