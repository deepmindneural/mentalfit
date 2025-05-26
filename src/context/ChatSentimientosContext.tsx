import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Mensaje {
  id: string;
  contenido: string;
  esUsuario: boolean;
  timestamp: Date;
  sentimiento?: string; // Puede incluir análisis de sentimiento: 'positivo', 'negativo', 'neutro'
}

interface ChatSentimientosContextProps {
  mensajes: Mensaje[];
  cargando: boolean;
  enviarMensaje: (texto: string) => Promise<void>;
  reiniciarChat: () => void;
}

const ChatSentimientosContext = createContext<ChatSentimientosContextProps | undefined>(undefined);

interface ChatSentimientosProviderProps {
  children: ReactNode;
}

// Analizador simple de sentimientos basado en palabras clave
const analizarSentimiento = (texto: string): string => {
  const palabrasPositivas = ['feliz', 'contento', 'alegre', 'satisfecho', 'agradecido', 'optimista', 'emocionado', 'esperanzado', 'afortunado', 'motivado'];
  const palabrasNegativas = ['triste', 'deprimido', 'ansioso', 'preocupado', 'estresado', 'frustrado', 'enojado', 'desesperado', 'cansado', 'angustiado'];
  
  const textoLower = texto.toLowerCase();
  
  let conteoPositivo = 0;
  let conteoNegativo = 0;
  
  palabrasPositivas.forEach(palabra => {
    if (textoLower.includes(palabra)) conteoPositivo++;
  });
  
  palabrasNegativas.forEach(palabra => {
    if (textoLower.includes(palabra)) conteoNegativo++;
  });
  
  if (conteoPositivo > conteoNegativo) return 'positivo';
  if (conteoNegativo > conteoPositivo) return 'negativo';
  return 'neutro';
};

// Función para generar respuestas basadas en IA según el sentimiento detectado
const generarRespuestaIA = async (mensaje: string, sentimiento: string): Promise<string> => {
  // Simular tiempo de respuesta de una API
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Respuestas predefinidas según el sentimiento
  const respuestasPositivas = [
    "Me alegra mucho saber que te sientes así. ¿Qué ha contribuido a ese estado de ánimo?",
    "Es maravilloso escuchar eso. Compartir sentimientos positivos fortalece nuestro bienestar.",
    "Qué bueno que tengas esas emociones. ¿Te gustaría contarme más sobre lo que te hace sentir así?",
    "Tu energía positiva es contagiosa. ¿Cómo podemos mantener ese sentimiento?"
  ];
  
  const respuestasNegativas = [
    "Entiendo que estés pasando por un momento difícil. ¿Hay algo específico que te preocupe?",
    "Lamento que te sientas así. Recuerda que expresar tus sentimientos es el primer paso para procesarlos.",
    "Es normal sentirse así a veces. ¿Hay algo que te haya ayudado en situaciones similares anteriormente?",
    "Gracias por compartir cómo te sientes. ¿Qué crees que te ayudaría a sentirte mejor ahora?"
  ];
  
  const respuestasNeutras = [
    "Cuéntame más sobre cómo te sientes hoy.",
    "¿Hay algún sentimiento específico que te gustaría explorar?",
    "¿Qué ha estado en tu mente ultimamente?",
    "Estoy aquí para escucharte. ¿Sobre qué te gustaría hablar hoy?"
  ];
  
  let respuestas;
  switch(sentimiento) {
    case 'positivo':
      respuestas = respuestasPositivas;
      break;
    case 'negativo':
      respuestas = respuestasNegativas;
      break;
    default:
      respuestas = respuestasNeutras;
  }
  
  // Seleccionar una respuesta aleatoria del array correspondiente
  const indiceAleatorio = Math.floor(Math.random() * respuestas.length);
  return respuestas[indiceAleatorio];
};

export const ChatSentimientosProvider: React.FC<ChatSentimientosProviderProps> = ({ children }) => {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  
  // Mensaje de bienvenida cuando se inicia la sesión
  useEffect(() => {
    setMensajes([
      {
        id: Date.now().toString(),
        contenido: "Hola, soy tu asistente emocional. ¿Cómo te sientes hoy?",
        esUsuario: false,
        timestamp: new Date()
      }
    ]);
  }, []);
  
  const enviarMensaje = async (texto: string) => {
    if (texto.trim() === '') return;
    
    // Añadir mensaje del usuario
    const mensajeUsuario: Mensaje = {
      id: Date.now().toString(),
      contenido: texto,
      esUsuario: true,
      timestamp: new Date(),
      sentimiento: analizarSentimiento(texto)
    };
    
    setMensajes(prevMensajes => [...prevMensajes, mensajeUsuario]);
    setCargando(true);
    
    try {
      // Simular respuesta de IA basada en el sentimiento
      const sentimientoDetectado = analizarSentimiento(texto);
      const respuestaIA = await generarRespuestaIA(texto, sentimientoDetectado);
      
      // Añadir respuesta del asistente
      const mensajeAsistente: Mensaje = {
        id: (Date.now() + 1).toString(),
        contenido: respuestaIA,
        esUsuario: false,
        timestamp: new Date()
      };
      
      setMensajes(prevMensajes => [...prevMensajes, mensajeAsistente]);
    } catch (error) {
      console.error('Error al generar respuesta:', error);
      
      // Mensaje de error en caso de fallo
      const mensajeError: Mensaje = {
        id: (Date.now() + 1).toString(),
        contenido: "Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, intenta nuevamente.",
        esUsuario: false,
        timestamp: new Date()
      };
      
      setMensajes(prevMensajes => [...prevMensajes, mensajeError]);
    } finally {
      setCargando(false);
    }
  };
  
  const reiniciarChat = () => {
    setMensajes([
      {
        id: Date.now().toString(),
        contenido: "Hola, soy tu asistente emocional. ¿Cómo te sientes hoy?",
        esUsuario: false,
        timestamp: new Date()
      }
    ]);
  };
  
  return (
    <ChatSentimientosContext.Provider value={{ mensajes, cargando, enviarMensaje, reiniciarChat }}>
      {children}
    </ChatSentimientosContext.Provider>
  );
};

export const useChatSentimientos = (): ChatSentimientosContextProps => {
  const context = useContext(ChatSentimientosContext);
  if (context === undefined) {
    throw new Error('useChatSentimientos debe usarse dentro de un ChatSentimientosProvider');
  }
  return context;
};
