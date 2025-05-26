import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useChatSentimientos } from '../../context/ChatSentimientosContext';
import BurbujaMensaje from './BurbujaMensaje';
import EntradaMensaje from './EntradaMensaje';

const ChatSentimientos: React.FC = () => {
  const { t } = useTranslation();
  const { mensajes, cargando, enviarMensaje, reiniciarChat } = useChatSentimientos();
  const contenedorMensajesRef = useRef<HTMLDivElement>(null);
  const [textoParaLeer, setTextoParaLeer] = useState<string>('');
  const [modoOscuro, setModoOscuro] = useState<boolean>(false);
  const [mostrarPanelInfo, setMostrarPanelInfo] = useState<boolean>(false);
  
  // Desplazar al último mensaje cuando se añade uno nuevo
  useEffect(() => {
    if (contenedorMensajesRef.current) {
      contenedorMensajesRef.current.scrollTop = contenedorMensajesRef.current.scrollHeight;
    }
  }, [mensajes]);
  
  // Función para reproducir mensajes con voz
  const reproducirMensaje = (texto: string) => {
    setTextoParaLeer(texto);
  };
  
  // Ejemplos de análisis más detallados de emociones (simulados)
  const obtenerAnalisisEmocion = (sentimiento?: string) => {
    if (!sentimiento) return undefined;
    
    type TipoEmocion = 'positivo' | 'negativo' | 'neutro';
    type AnalisisEmocion = {
      nombre: string;
      intensidad: number;
      descripcion: string;
    };
    
    const analisisEmociones: Record<TipoEmocion, AnalisisEmocion> = {
      'positivo': {
        nombre: t('Alegría'),
        intensidad: 75,
        descripcion: t('Estás expresando emociones positivas que indican bienestar emocional')
      },
      'negativo': {
        nombre: t('Tristeza'),
        intensidad: 65,
        descripcion: t('Detectamos señales de malestar emocional en tus palabras')
      },
      'neutro': {
        nombre: t('Neutralidad'),
        intensidad: 50,
        descripcion: t('Tu expresión actual no muestra una carga emocional significativa')
      }
    };
    
    // Verificar si el sentimiento es una clave válida
    if (sentimiento in analisisEmociones) {
      return analisisEmociones[sentimiento as TipoEmocion];
    }
    
    // Valor predeterminado si el sentimiento no es reconocido
    return analisisEmociones.neutro;
  };
  
  return (
    <div className={`flex flex-col h-full rounded-lg shadow-lg transition-colors duration-300 ${modoOscuro ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Cabecera del chat */}
      <div className={`flex justify-between items-center p-4 border-b ${modoOscuro ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-primario-500 to-primario-600 rounded-full h-10 w-10 flex items-center justify-center shadow-lg animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className={`text-lg font-medium ${modoOscuro ? 'text-white' : 'text-gray-800'}`}>
              {t('Chat de Sentimientos')}
            </h3>
            <p className={`text-sm ${modoOscuro ? 'text-gray-400' : 'text-gray-500'}`}>
              {t('Asistente emocional IA avanzado')}
            </p>
          </div>
          
          {/* Indicador de online */}
          <div className="ml-2 flex items-center">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="ml-1 text-xs text-green-500">{t('Online')}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Botón de información */}
          <button
            onClick={() => setMostrarPanelInfo(!mostrarPanelInfo)}
            className={`p-2 rounded-full transition-colors ${modoOscuro ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
            title={t('Información sobre el chat')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          
          {/* Botón de modo oscuro/claro */}
          <button
            onClick={() => setModoOscuro(!modoOscuro)}
            className={`p-2 rounded-full transition-colors ${modoOscuro ? 'text-amber-300 hover:text-amber-200 hover:bg-gray-700' : 'text-gray-600 hover:text-amber-500 hover:bg-gray-100'}`}
            title={modoOscuro ? t('Cambiar a modo claro') : t('Cambiar a modo oscuro')}
          >
            {modoOscuro ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 12a3 3 0 01-3-3V8a3 3 0 116 0v1a3 3 0 01-3 3z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          
          {/* Botón de reiniciar chat */}
          <button 
            onClick={reiniciarChat}
            className={`p-2 rounded-full transition-colors ${modoOscuro ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
            title={t('Reiniciar conversación')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Panel de información */}
      {mostrarPanelInfo && (
        <div className={`p-4 text-sm border-b ${modoOscuro ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-blue-50 border-blue-100 text-blue-700'} animate-fadeIn`}>
          <div className="flex items-start space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="mb-1 font-medium">{t('Sobre este chat')}</p>
              <p className="mb-2">{t('Este asistente IA analiza tus emociones a través de tus mensajes y te proporciona respuestas adaptadas a tu estado emocional.')}</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>{t('Puedes hablar mediante voz usando el botón de micrófono')}</li>
                <li>{t('Puedes escuchar las respuestas del asistente con el botón de audio')}</li>
                <li>{t('Haz clic en los iconos de emoción para ver un análisis detallado')}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* Contenedor de mensajes */}
      <div 
        ref={contenedorMensajesRef}
        className={`flex-1 overflow-y-auto p-4 space-y-4 ${modoOscuro ? 'bg-gray-900' : 'bg-gray-50'}`}
        style={{ scrollBehavior: 'smooth' }}
      >
        {mensajes.map((mensaje) => (
          <BurbujaMensaje 
            key={mensaje.id}
            contenido={mensaje.contenido}
            esUsuario={mensaje.esUsuario}
            timestamp={mensaje.timestamp}
            sentimiento={mensaje.sentimiento}
            onReproducirAudio={!mensaje.esUsuario ? reproducirMensaje : undefined}
            emocionDetectada={mensaje.sentimiento ? obtenerAnalisisEmocion(mensaje.sentimiento) : undefined}
          />
        ))}
        
        {/* Indicador de escribiendo con animación mejorada */}
        {cargando && (
          <div className={`flex items-center space-x-2 mr-auto p-3 rounded-lg ${modoOscuro ? 'bg-gray-800' : 'bg-white'} shadow-md animate-fadeIn`}>
            <div className="flex space-x-1">
              <div className="h-2.5 w-2.5 bg-primario-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="h-2.5 w-2.5 bg-primario-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="h-2.5 w-2.5 bg-primario-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className={`text-sm font-medium ${modoOscuro ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('Analizando tus emociones...')}
            </span>
          </div>
        )}
      </div>
      
      {/* Entrada de mensaje */}
      <div className={`p-4 ${modoOscuro ? 'bg-gray-800' : 'bg-white'}`}>
        <EntradaMensaje 
          enviarMensaje={enviarMensaje}
          cargando={cargando}
          onTextToSpeech={reproducirMensaje}
        />
      </div>
    </div>
  );
};

export default ChatSentimientos;
