import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface VozControlProps {
  onTextFromSpeech: (text: string) => void;
  textoParaLeer?: string;
  cargando: boolean;
}

const VozControl: React.FC<VozControlProps> = ({ 
  onTextFromSpeech, 
  textoParaLeer,
  cargando 
}) => {
  const { t } = useTranslation();
  const [grabando, setGrabando] = useState<boolean>(false);
  const [hablando, setHablando] = useState<boolean>(false);
  const [reconocimientoSoportado, setReconocimientoSoportado] = useState<boolean>(true);
  const [sintesisSoportada, setSintesisSoportada] = useState<boolean>(true);
  
  const reconocimientoRef = useRef<any>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Comprobar si el navegador soporta las APIs de voz
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setReconocimientoSoportado(false);
    }
    
    if (!('speechSynthesis' in window)) {
      setSintesisSoportada(false);
    }
    
    return () => {
      // Limpiar reconocimiento de voz
      if (reconocimientoRef.current) {
        reconocimientoRef.current.stop();
      }
      
      // Limpiar síntesis de voz
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  // Inicializar reconocimiento de voz
  const iniciarReconocimiento = () => {
    if (!reconocimientoSoportado || grabando) return;
    
    try {
      // Crear instancia de SpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'es-ES';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        setGrabando(true);
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onTextFromSpeech(transcript);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Error en reconocimiento de voz:', event.error);
        setGrabando(false);
      };
      
      recognition.onend = () => {
        setGrabando(false);
      };
      
      // Guardar referencia y empezar reconocimiento
      reconocimientoRef.current = recognition;
      recognition.start();
      
    } catch (error) {
      console.error('Error al iniciar reconocimiento de voz:', error);
      setGrabando(false);
      setReconocimientoSoportado(false);
    }
  };
  
  // Detener reconocimiento de voz
  const detenerReconocimiento = () => {
    if (reconocimientoRef.current) {
      reconocimientoRef.current.stop();
      setGrabando(false);
    }
  };
  
  // Reproducir texto mediante síntesis de voz
  useEffect(() => {
    if (!textoParaLeer || !sintesisSoportada || hablando) return;
    
    try {
      // Cancelar síntesis anterior si existe
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      
      // Crear nueva utterance
      const utterance = new SpeechSynthesisUtterance(textoParaLeer);
      utterance.lang = 'es-ES';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      // Asignar voces en español si están disponibles
      const voces = window.speechSynthesis.getVoices();
      const vozEspanol = voces.find(voz => voz.lang.includes('es'));
      if (vozEspanol) {
        utterance.voice = vozEspanol;
      }
      
      utterance.onstart = () => setHablando(true);
      utterance.onend = () => setHablando(false);
      utterance.onerror = () => setHablando(false);
      
      // Guardar referencia y empezar síntesis
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      
    } catch (error) {
      console.error('Error en síntesis de voz:', error);
      setHablando(false);
      setSintesisSoportada(false);
    }
  }, [textoParaLeer, sintesisSoportada, hablando]);
  
  return (
    <div className="flex space-x-2">
      {reconocimientoSoportado && (
        <button 
          onClick={grabando ? detenerReconocimiento : iniciarReconocimiento}
          disabled={cargando}
          className={`p-2 rounded-full transition-all transform hover:scale-105 ${grabando 
            ? 'bg-red-500 text-white animate-pulse' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          title={grabando ? t('Detener grabación') : t('Hablar mensaje')}
          aria-label={grabando ? t('Detener grabación') : t('Hablar mensaje')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>
      )}
      
      {sintesisSoportada && (
        <button 
          onClick={() => {
            if (hablando) {
              window.speechSynthesis.cancel();
              setHablando(false);
            }
          }}
          disabled={!hablando}
          className={`p-2 rounded-full transition-all ${hablando 
            ? 'bg-cyan-500 text-white hover:bg-cyan-600' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          title={hablando ? t('Detener voz') : t('Asistente hablando')}
          aria-label={hablando ? t('Detener voz') : t('Asistente hablando')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.829-9.9a9 9 0 0112.728 0" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default VozControl;

// Extiende Window para tipos
declare global {
  interface Window { 
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
