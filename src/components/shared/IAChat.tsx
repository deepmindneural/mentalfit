import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MensajeChat } from '../../tipos';

const IAChat: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mensajes, setMensajes] = useState<MensajeChat[]>([
    {
      id: '1',
      texto: t('mensajeBienvenidaIA'),
      esUsuario: false,
      fecha: new Date()
    }
  ]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);
  const mensajesFinRef = useRef<HTMLDivElement>(null);

  // Respuestas predefinidas para simular la IA
  const respuestasIA = [
    'Entiendo cómo te sientes. ¿Podrías contarme más sobre esa situación?',
    'Es normal sentirse así. Te recomiendo practicar ejercicios de respiración para manejar esos momentos de ansiedad.',
    'Basado en lo que me cuentas, podría ser útil que hables con alguno de nuestros especialistas en ansiedad.',
    'Un ejercicio que podría ayudarte es la meditación mindfulness. ¿Has intentado practicarla?',
    'Recuerda que cuidar tu salud mental es tan importante como cuidar tu salud física.',
    'Para ese tipo de situaciones, te recomendaría establecer límites claros y comunicar tus necesidades de forma asertiva.',
    'Parece que estás experimentando algunos síntomas de estrés. ¿Has tenido cambios importantes en tu vida recientemente?',
    'Basado en tus respuestas al cuestionario PHQ-9, te recomendaría consultar con un especialista en depresión.',
    'Es importante que sepas que no estás solo/a. Muchas personas experimentan sentimientos similares.',
    'Una técnica que podría ayudarte es llevar un diario de gratitud para enfocarte en aspectos positivos cada día.'
  ];

  useEffect(() => {
    if (mensajesFinRef.current) {
      mensajesFinRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mensajes]);

  const enviarMensaje = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoMensaje.trim() || enviando) return;

    // Agregar mensaje del usuario
    const mensajeUsuario: MensajeChat = {
      id: Date.now().toString(),
      texto: nuevoMensaje,
      esUsuario: true,
      fecha: new Date()
    };

    setMensajes(prev => [...prev, mensajeUsuario]);
    setNuevoMensaje('');
    setEnviando(true);

    // Simular respuesta de la IA después de un retraso
    setTimeout(() => {
      const respuestaIA: MensajeChat = {
        id: (Date.now() + 1).toString(),
        texto: respuestasIA[Math.floor(Math.random() * respuestasIA.length)],
        esUsuario: false,
        fecha: new Date()
      };

      setMensajes(prev => [...prev, respuestaIA]);
      setEnviando(false);
    }, 1000 + Math.random() * 1000); // Retraso aleatorio entre 1-2 segundos
  };

  return (
    <>
      {/* Botón flotante para abrir el chat */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 ${isOpen ? 'hidden' : 'flex'} right-6 bg-acento-500 hover:bg-acento-600 text-white rounded-full p-4 shadow-lg z-40 items-center justify-center transition-all duration-300`}
        aria-label="Abrir chat con IA"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Ventana de chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-50 flex flex-col overflow-hidden max-h-[80vh]">
          {/* Header del chat */}
          <div className="bg-acento-500 text-white px-4 py-3 flex justify-between items-center">
            <h3 className="font-medium">{t('chatConIA')}</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-acento-200"
              aria-label="Cerrar chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Cuerpo del chat - mensajes */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50" style={{maxHeight: '60vh'}}>
            {mensajes.map((mensaje) => (
              <div
                key={mensaje.id}
                className={`mb-4 flex ${mensaje.esUsuario ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] break-words ${mensaje.esUsuario ? 'bg-primario-500 text-white' : 'bg-white border border-gray-200 text-gray-800'}`}
                >
                  {mensaje.texto}
                </div>
              </div>
            ))}
            <div ref={mensajesFinRef} />
          </div>

          {/* Formulario para enviar mensajes */}
          <form onSubmit={enviarMensaje} className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-center">
              <input
                type="text"
                value={nuevoMensaje}
                onChange={(e) => setNuevoMensaje(e.target.value)}
                placeholder={t('escribeMensaje')}
                className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-acento-500 focus:border-transparent"
                disabled={enviando}
              />
              <button
                type="submit"
                className={`bg-acento-500 hover:bg-acento-600 text-white rounded-r-lg px-4 py-2 ${enviando ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={enviando}
              >
                {enviando ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default IAChat;
