import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import VozControl from './VozControl';

interface EntradaMensajeProps {
  enviarMensaje: (texto: string) => Promise<void>;
  cargando: boolean;
  onTextToSpeech?: (texto: string) => void;
}

const EntradaMensaje: React.FC<EntradaMensajeProps> = ({ enviarMensaje, cargando, onTextToSpeech }) => {
  const { t } = useTranslation();
  const [mensaje, setMensaje] = useState<string>('');
  const [mostrarSugerencias, setMostrarSugerencias] = useState<boolean>(false);
  const [ultimoMensajeVoz, setUltimoMensajeVoz] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Mensajes sugeridos predefinidos
  const sugerenciasMensajes = [
    t('Me siento ansioso hoy'),
    t('Estoy muy feliz por un logro reciente'),
    t('Me siento triste y no sé por qué'),
    t('Tengo dificultades para dormir'),
    t('Estoy experimentando mucho estrés')
  ];

  // Focus en el textarea cuando el componente se monta
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Manejar el envío del mensaje
  const manejarEnvio = async () => {
    if (mensaje.trim() === '' || cargando) return;

    try {
      await enviarMensaje(mensaje);
      setMensaje('');
      setMostrarSugerencias(false);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  // Manejar tecla Enter
  const manejarTeclaEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      manejarEnvio();
    }
  };

  // Manejar entrada por voz
  const manejarEntradaVoz = (texto: string) => {
    setUltimoMensajeVoz(texto);
    setMensaje(mensaje => mensaje + (mensaje ? ' ' : '') + texto);

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Seleccionar sugerencia
  const seleccionarSugerencia = (sugerencia: string) => {
    setMensaje(sugerencia);
    setMostrarSugerencias(false);

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="pt-3">
      {/* Sugerencias de mensajes */}
      {mostrarSugerencias && (
        <div className="mb-3 p-3 bg-gray-50 rounded-lg animate-fadeIn">
          <div className="text-sm font-medium text-gray-700 mb-2">
            {t('Sugerencias para empezar:')}
          </div>
          <div className="flex flex-wrap gap-2">
            {sugerenciasMensajes.map((sugerencia, index) => (
              <button
                key={index}
                onClick={() => seleccionarSugerencia(sugerencia)}
                className="text-sm bg-white px-3 py-1 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-colors"
              >
                {sugerencia}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="relative border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Área de texto */}
        <textarea
          ref={textareaRef}
          className="w-full pl-4 pr-20 py-3 focus:outline-none focus:ring-2 focus:ring-primario-500 focus:border-transparent resize-none bg-white"
          placeholder={t('Escribe cómo te sientes hoy...')}
          rows={2}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyDown={manejarTeclaEnter}
          disabled={cargando}
          onFocus={() => setMostrarSugerencias(mensaje.trim() === '')}
          onBlur={() => setTimeout(() => setMostrarSugerencias(false), 200)}
        />

        {/* Controles */}
        <div className="absolute bottom-2 right-2 flex items-center space-x-1">
          {/* Botones de sugerencias */}
          <button
            className="p-2 text-gray-500 hover:text-primario-600 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setMostrarSugerencias(!mostrarSugerencias)}
            title={t('Ver sugerencias')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>

          {/* Control por voz */}
          <VozControl
            onTextFromSpeech={manejarEntradaVoz}
            textoParaLeer={onTextToSpeech ? ultimoMensajeVoz : undefined}
            cargando={cargando}
          />

          {/* Botón de envío */}
          <button
            className="rounded-full bg-gradient-to-r from-primario-500 to-primario-600 text-white p-2 hover:from-primario-600 hover:to-primario-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
            onClick={manejarEnvio}
            disabled={mensaje.trim() === '' || cargando}
            aria-label="Enviar mensaje"
          >
            {cargando ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Indicador de privacidad */}
      <div className="mt-2 text-xs text-gray-500 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        {t('Tus conversaciones son privadas y confidenciales')}
      </div>
    </div>
  );
};

export default EntradaMensaje;
