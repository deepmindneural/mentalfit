import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PromoChat: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-gradient-to-r from-cyan-700 to-cyan-500 rounded-xl overflow-hidden shadow-lg">
      <div className="px-6 py-8 md:py-10 md:flex items-center">
        <div className="md:w-3/5 mb-6 md:mb-0 md:pr-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t('¡Nuevo!')} {t('Chat de Sentimientos con IA')}
          </h2>
          <p className="text-cyan-100 mb-6">
            {t('Explora tus emociones con nuestro asistente emocional interactivo. Comparte cómo te sientes y recibe orientación personalizada para mejorar tu bienestar.')}
          </p>
          <Link 
            to="/dashboard/chat-sentimientos"
            className="inline-block bg-white text-cyan-700 hover:bg-cyan-50 font-medium px-5 py-3 rounded-lg transition-colors duration-200"
          >
            {t('Probar Ahora')} →
          </Link>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <div className="relative w-64 h-64">
            <div className="absolute top-0 right-0 -mr-4 mt-2 w-48 h-48 bg-cyan-600 rounded-full opacity-20"></div>
            <div className="absolute bottom-0 left-0 -ml-4 mb-2 w-40 h-40 bg-cyan-600 rounded-full opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 w-56 shadow-lg border border-white/20">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-white text-sm font-medium">Asistente IA</div>
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-cyan-200 rounded-full"></div>
                    <div className="h-2 w-2 bg-cyan-200 rounded-full"></div>
                    <div className="h-2 w-2 bg-cyan-200 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 mb-3">
                  <p className="text-white text-sm">¿Cómo te sientes hoy?</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3 ml-4 mb-3">
                  <p className="text-white text-sm">Me siento un poco estresado por el trabajo</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white text-sm">Entiendo que el estrés laboral puede ser difícil. ¿Podemos explorar qué aspectos te generan más presión?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoChat;
