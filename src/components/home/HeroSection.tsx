import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Efecto parallax básico al hacer scroll
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPos = window.scrollY;
        const opacity = Math.max(1 - scrollPos / 700, 0.7);
        const scale = 1 + scrollPos * 0.0001;
        heroRef.current.style.opacity = opacity.toString();
        heroRef.current.style.transform = `scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden pt-20 pb-16">
      {/* Fondo con efecto parallax */}
      <div ref={heroRef} className="absolute inset-0 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-primario-700 to-primario-500"></div>
        
        {/* Elementos decorativos */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primario-300 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-8 right-10 w-80 h-80 bg-secundario-300 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-acento-300 rounded-full filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Contenido del hero */}
      <div className="container relative mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white animate-fadeIn">
            {t('tituloHero')}
          </h1>
          
          <p className="text-xl mb-8 text-white opacity-90 animate-fadeIn animation-delay-300">
            {t('descripcionHero')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn animation-delay-600">
            <Link to="/cuestionarios" className="group bg-acento-600 hover:bg-acento-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              <span className="flex items-center">
                {t('empezarEvaluacion')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link to="/especialistas" className="bg-white text-primario-700 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              {t('buscarEspecialistas')}
            </Link>
          </div>
          
          {/* Métricas destacadas */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeUp">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg p-4 transform transition hover:scale-105 text-white shadow-lg">
              <div className="text-3xl font-bold mb-1">+5,000</div>
              <div className="text-sm opacity-80">Usuarios activos</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg p-4 transform transition hover:scale-105 text-white shadow-lg">
              <div className="text-3xl font-bold mb-1">+120</div>
              <div className="text-sm opacity-80">Especialistas verificados</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg p-4 transform transition hover:scale-105 text-white shadow-lg">
              <div className="text-3xl font-bold mb-1">95%</div>
              <div className="text-sm opacity-80">Tasa de satisfacción</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
