import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface EmocionDetectada {
  nombre: string;
  intensidad: number;
  descripcion: string;
}

interface BurbujaMensajeProps {
  contenido: string;
  esUsuario: boolean;
  timestamp: Date;
  sentimiento?: string; // 'positivo', 'negativo', 'neutro'
  onReproducirAudio?: (texto: string) => void;
  emocionDetectada?: EmocionDetectada;
}

const BurbujaMensaje: React.FC<BurbujaMensajeProps> = ({ 
  contenido, 
  esUsuario, 
  timestamp, 
  sentimiento,
  onReproducirAudio,
  emocionDetectada
}) => {
  const { t } = useTranslation();
  const [expandido, setExpandido] = useState<boolean>(false);
  const [reproduciendoAudio, setReproduciendoAudio] = useState<boolean>(false);
  
  // Formatear la hora (HH:MM)
  const formatearHora = (fecha: Date) => {
    return fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Función para reproducir el audio del mensaje
  const reproducirAudio = () => {
    if (onReproducirAudio && !reproduciendoAudio) {
      setReproduciendoAudio(true);
      onReproducirAudio(contenido);
      // Simular la duración de la reproducción basada en la longitud del texto
      setTimeout(() => setReproduciendoAudio(false), contenido.length * 50);
    }
  };
  
  // Determinar el estilo de la burbuja y los iconos basados en el sentimiento
  const obtenerEstilosBurbuja = () => {
    if (esUsuario) {
      return 'ml-auto bg-gradient-to-br from-primario-500 to-primario-600 text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl shadow-lg';
    } else {
      // Para mensajes del asistente
      if (sentimiento === 'positivo') {
        return 'mr-auto bg-gradient-to-r from-green-100 to-green-50 text-gray-800 rounded-tl-xl rounded-tr-xl rounded-br-xl shadow-md';
      } else if (sentimiento === 'negativo') {
        return 'mr-auto bg-gradient-to-r from-red-100 to-red-50 text-gray-800 rounded-tl-xl rounded-tr-xl rounded-br-xl shadow-md';
      } else if (sentimiento === 'neutro') {
        return 'mr-auto bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 rounded-tl-xl rounded-tr-xl rounded-br-xl shadow-md';
      }
      return 'mr-auto bg-white border border-gray-200 text-gray-800 rounded-tl-xl rounded-tr-xl rounded-br-xl shadow-md';
    }
  };
  
  // Generar el icono para el sentimiento
  const obtenerIconoSentimiento = () => {
    if (!sentimiento) return null;
    
    let icono = null;
    let estilo = '';
    let texto = '';
    
    switch(sentimiento) {
      case 'positivo':
        icono = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />;
        estilo = 'bg-green-100 text-green-800';
        texto = t('Positivo');
        break;
      case 'negativo':
        icono = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />;
        estilo = 'bg-red-100 text-red-800';
        texto = t('Negativo');
        break;
      case 'neutro':
      default:
        icono = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />;
        estilo = 'bg-gray-100 text-gray-700';
        texto = t('Neutro');
    }
    
    return (
      <button 
        className={`text-xs px-1.5 py-0.5 rounded-full flex items-center ${estilo} hover:opacity-90 transition-opacity`}
        onClick={() => setExpandido(!expandido)}
        title={t('Ver análisis de emociones')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icono}
        </svg>
        <span className="ml-1 capitalize">{texto}</span>
      </button>
    );
  };
  
  // Renderizar el panel de análisis de emociones
  const renderizarAnalisisEmociones = () => {
    if (!expandido || !emocionDetectada) return null;
    
    // Calcular un color basado en la intensidad (0-100%)
    const intensidadColor = emocionDetectada.intensidad > 75 ? 'bg-red-100' : 
                          emocionDetectada.intensidad > 50 ? 'bg-yellow-100' : 
                          emocionDetectada.intensidad > 25 ? 'bg-blue-100' : 'bg-green-100';
    
    return (
      <div className="mt-3 p-3 rounded-lg bg-gray-50 text-xs animate-fadeIn">
        <h4 className="font-semibold mb-2">{t('Análisis de emociones')}</h4>
        <div className="mb-2">
          <span className="font-medium">{t('Emoción detectada')}:</span> {emocionDetectada.nombre}
        </div>
        <div className="mb-2">
          <span className="font-medium">{t('Intensidad')}:</span>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
            <div 
              className={`h-full ${intensidadColor} rounded-full`} 
              style={{ width: `${emocionDetectada.intensidad}%`, transition: 'width 1s ease-in-out' }}
            ></div>
          </div>
        </div>
        {emocionDetectada.descripcion && (
          <div className="text-gray-600 italic">
            "{emocionDetectada.descripcion}"
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className={`flex ${esUsuario ? 'justify-end' : 'justify-start'} mb-3`}>
      {/* Avatar para mensajes del asistente */}
      {!esUsuario && (
        <div className="flex-shrink-0 mr-2">
          <div className="w-8 h-8 bg-primario-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primario-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
      )}
      
      <div className="flex flex-col">
        {/* Burbuja principal */}
        <div className={`max-w-[280px] md:max-w-md rounded-lg px-4 py-3 shadow-sm ${obtenerEstilosBurbuja()}`}>
          <div className="text-sm whitespace-pre-wrap">{contenido}</div>
          
          {/* Panel de análisis de emociones */}
          {renderizarAnalisisEmociones()}
          
          <div className="flex justify-between items-center mt-2 space-x-2">
            <div className="text-xs opacity-70">{formatearHora(timestamp)}</div>
            
            <div className="flex items-center space-x-1">
              {/* Botón de reproducción de audio (solo para mensajes del asistente) */}
              {onReproducirAudio && !esUsuario && (
                <button 
                  onClick={reproducirAudio} 
                  disabled={reproduciendoAudio}
                  className={`p-1 rounded-full transition-colors ${
                    reproduciendoAudio 
                      ? 'text-primario-300 cursor-not-allowed' 
                      : 'text-primario-500 hover:text-primario-700'
                  }`}
                  title={reproduciendoAudio ? t('Reproduciendo...') : t('Escuchar mensaje')}
                >
                  {reproduciendoAudio ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>
              )}
              
              {/* Indicador de sentimiento */}
              {obtenerIconoSentimiento()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Avatar para mensajes del usuario */}
      {esUsuario && (
        <div className="flex-shrink-0 ml-2">
          <div className="w-8 h-8 bg-primario-500 rounded-full flex items-center justify-center text-white font-medium">
            {t('Tú').charAt(0).toUpperCase()}
          </div>
        </div>
      )}
    </div>
  );
};

export default BurbujaMensaje;
