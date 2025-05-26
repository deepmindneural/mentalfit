// Tipos de datos para la plataforma MentalFit

// Tipo para especialistas
export interface Especialista {
  id: string;
  nombre: string;
  apellido: string;
  especialidad: string;
  calificacion: number;
  genero: 'hombre' | 'mujer' | 'otro';
  fotoPerfil: string;
  ubicacion: Ubicacion;
  descripcion: string;
  experiencia: number; // Años de experiencia
  precio: number;
  moneda: 'COP' | 'USD' | 'GBP';
  disponibilidad: string[];
  resenas: Resena[];
  certificaciones: string[];
}

// Tipo para ubicación
export interface Ubicacion {
  lat: number;
  lng: number;
  direccion: string;
  ciudad: string;
  pais: string;
}

// Tipo para reseñas
export interface Resena {
  id: string;
  usuario: string;
  calificacion: number;
  comentario: string;
  fecha: string;
}

// Tipo para cuestionarios
export interface PreguntaCuestionario {
  id: number;
  texto: string;
  categoria?: 'depresion' | 'ansiedad' | 'estres' | string;
  opciones: OpcionRespuesta[];
}

// Tipo específico para preguntas del DASS-21 donde la categoría es obligatoria
export interface PreguntaDASS21 extends Omit<PreguntaCuestionario, 'categoria'> {
  categoria: 'depresion' | 'ansiedad' | 'estres';
}

export interface OpcionRespuesta {
  valor: number;
  texto: string;
}

export interface RespuestaCuestionario {
  preguntaId: number;
  respuesta: number;
}

export interface ResultadoCuestionario {
  id: string;
  tipo: 'PHQ9' | 'GAD7';
  puntajeTotal: number;
  interpretacion: string;
  recomendaciones: Recomendacion[];
  fecha: string;
}

// Tipo para recomendaciones de la IA
export interface Recomendacion {
  id: string;
  tipo: 'ejercicio' | 'meditacion' | 'especialista' | 'recurso';
  titulo: string;
  descripcion: string;
  enlace?: string;
  especialistaId?: string;
}

// Tipo para mensajes del chat con IA
export interface MensajeChat {
  id: string;
  texto: string;
  esUsuario: boolean;
  fecha: Date;
}
