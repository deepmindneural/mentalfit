import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CTASection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-secundario-700 to-secundario-900 z-0"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-white bg-opacity-5 rounded-full"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primario-700 bg-opacity-20 rounded-full"></div>
        
        {/* Patrón de puntos opcional */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-4 h-4 bg-white rounded-full absolute top-10 left-10"></div>
          <div className="w-3 h-3 bg-white rounded-full absolute top-20 left-40"></div>
          <div className="w-2 h-2 bg-white rounded-full absolute top-14 left-80"></div>
          <div className="w-4 h-4 bg-white rounded-full absolute top-40 right-10"></div>
          <div className="w-3 h-3 bg-white rounded-full absolute bottom-40 right-40"></div>
          <div className="w-2 h-2 bg-white rounded-full absolute bottom-14 right-80"></div>
          <div className="w-4 h-4 bg-white rounded-full absolute bottom-10 left-10"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white animate-fadeIn">
            Empieza tu viaje hacia el bienestar mental
          </h2>
          <p className="text-lg md:text-xl mb-10 text-white text-opacity-90 max-w-2xl mx-auto animate-fadeIn animation-delay-300">
            Completa una evaluación gratuita y recibe recomendaciones personalizadas para mejorar tu salud mental.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fadeIn animation-delay-600">
            <Link 
              to="/cuestionarios" 
              className="group relative overflow-hidden bg-white text-secundario-700 hover:text-secundario-800 font-semibold py-4 px-8 rounded-xl inline-block transition duration-300 shadow-xl transform hover:-translate-y-1"
            >
              <span className="relative z-10">Comenzar evaluación</span>
              <div className="absolute inset-0 bg-white transition-transform duration-300 transform origin-left scale-x-100 group-hover:scale-x-0"></div>
              <div className="absolute inset-0 bg-primario-100 transition-transform duration-300 transform origin-right scale-x-0 group-hover:scale-x-100"></div>
            </Link>
            <Link 
              to="/especialistas" 
              className="group relative overflow-hidden bg-acento-600 hover:bg-acento-700 text-white font-semibold py-4 px-8 rounded-xl inline-block transition duration-300 shadow-xl transform hover:-translate-y-1"
            >
              <span className="relative z-10">Buscar especialista</span>
              <div className="absolute top-0 -right-full h-full w-full bg-acento-700 transition-all duration-300 transform group-hover:right-0 z-0"></div>
            </Link>
          </div>
          
          {/* Insignias de confianza */}
          <div className="mt-14 flex flex-wrap justify-center items-center gap-8 opacity-80">
            <div className="text-white text-sm font-semibold">Certificado por:</div>
            <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm py-2 px-4 rounded-lg">
              <span className="text-white text-opacity-90">Asociación Colombiana de Psiquiatría</span>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm py-2 px-4 rounded-lg">
              <span className="text-white text-opacity-90">Ministerio de Salud</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
