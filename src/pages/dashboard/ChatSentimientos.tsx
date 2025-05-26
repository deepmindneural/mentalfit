import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { ChatSentimientosProvider } from '../../context/ChatSentimientosContext';
import ChatSentimientos from '../../components/chat/ChatSentimientos';
import { useAuth } from '../../context/AuthContext';

const PaginaChatSentimientos: React.FC = () => {
  const { t } = useTranslation();
  const { sesion } = useAuth();
  
  return (
    <>
      <Helmet>
        <title>{t('Chat de Sentimientos')} | MentalFit</title>
        <meta name="description" content={t('Conversa con nuestro asistente emocional inteligente y explora tus sentimientos')} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          {t('Chat de Sentimientos')}
        </h1>
        
        <div className="mb-6">
          <p className="text-gray-600">
            {t('Nuestro asistente emocional inteligente te ayudará a explorar y comprender tus sentimientos. Comparte cómo te sientes hoy y recibe orientación personalizada.')}
          </p>
          <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-500 text-blue-700 rounded">
            <div className="flex items-start">
              <svg className="h-5 w-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd"></path>
              </svg>
              <span>
                {t('Este chat es confidencial y está diseñado para apoyarte en tu bienestar emocional. No reemplaza la atención profesional de un especialista en salud mental.')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
            <h2 className="text-lg font-medium text-gray-800">
              {t('Asistente Emocional')}
            </h2>
          </div>
          
          <div className="h-[600px] md:h-[700px]">
            <ChatSentimientosProvider>
              <ChatSentimientos />
            </ChatSentimientosProvider>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {t('¿Cómo funciona?')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-cyan-100 text-cyan-600 rounded-full p-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">{t('Expresa')}</h3>
              <p className="text-gray-600">{t('Comparte cómo te sientes en este momento, sin filtros ni reservas.')}</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-cyan-100 text-cyan-600 rounded-full p-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">{t('Explora')}</h3>
              <p className="text-gray-600">{t('Nuestro asistente con IA analizará tus emociones y te guiará en su exploración.')}</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-cyan-100 text-cyan-600 rounded-full p-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 12a3 3 0 01-3-3V8a3 3 0 116 0v1a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">{t('Comprende')}</h3>
              <p className="text-gray-600">{t('Obtén insights sobre tus emociones y aprende estrategias para gestionarlas mejor.')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaginaChatSentimientos;
