// Tipos específicos para cuestionarios y sus resultados

// Nivel de severidad para cuestionarios
export type NivelSeveridad = 'normal' | 'minimo' | 'leve' | 'moderado' | 'moderadamente-severo' | 'severo' | 'extremadamente-severo';

// Tipo de cuestionario
export type TipoCuestionario = 'PHQ9' | 'GAD7' | 'DASS21';

// Respuesta individual a pregunta de cuestionario
export interface RespuestaCuestionario {
  preguntaId: number;
  respuesta: number;
  categoria?: string;
}

// Recomendación basada en resultados
export type Recomendacion = string;

// Resultado completo de un cuestionario estándar
export interface ResultadoCuestionario {
  id: string;
  tipo: TipoCuestionario;
  fecha: string;
  puntajeTotal: number;
  interpretacion: string;
  recomendaciones: Recomendacion[];
  usuarioId?: string;
}

// Interpretación para DASS-21
export interface InterpretacionDASS21 {
  nivel: string;
  descripcion: string;
}

// Resultados para DASS-21 (que contiene 3 escalas)
export interface ResultadoCuestionarioDASS21 {
  id: string;
  tipo: 'DASS21';
  fecha: string;
  puntajes: {
    depresion: number;
    ansiedad: number;
    estres: number;
  };
  interpretaciones: {
    depresion: InterpretacionDASS21;
    ansiedad: InterpretacionDASS21;
    estres: InterpretacionDASS21;
  };
  recomendaciones: {
    titulo: string;
    descripcion: string;
    tipo: 'general' | 'depresion' | 'ansiedad' | 'estres';
  }[];
  usuarioId?: string;
}

// Configuración para interpretación de resultados
export const CONFIGURACION_CUESTIONARIOS = {
  PHQ9: {
    id: 'PHQ9',
    titulo: 'Cuestionario de Salud del Paciente (PHQ-9)',
    descripcion: 'Evalúa síntomas de depresión en las últimas 2 semanas',
    umbralPuntuacion: {
      minimo: [0, 4],
      leve: [5, 9],
      moderado: [10, 14],
      moderadamenteSevero: [15, 19],
      severo: [20, 27]
    },
    maxPuntuacion: 27
  },
  GAD7: {
    id: 'GAD7',
    titulo: 'Escala de Trastorno de Ansiedad Generalizada (GAD-7)',
    descripcion: 'Evalúa síntomas de ansiedad en las últimas 2 semanas',
    umbralPuntuacion: {
      minimo: [0, 4],
      leve: [5, 9],
      moderado: [10, 14],
      severo: [15, 21]
    },
    maxPuntuacion: 21
  },
  DASS21: {
    id: 'DASS21',
    titulo: 'Escala de Depresión, Ansiedad y Estrés (DASS-21)',
    descripcion: 'Evalúa niveles de depresión, ansiedad y estrés experimentados en la última semana',
    umbralPuntuacion: {
      depresion: {
        normal: [0, 9],
        leve: [10, 13],
        moderado: [14, 20],
        severo: [21, 27],
        extremadamenteSevero: [28, 42]
      },
      ansiedad: {
        normal: [0, 7],
        leve: [8, 9],
        moderado: [10, 14],
        severo: [15, 19],
        extremadamenteSevero: [20, 42]
      },
      estres: {
        normal: [0, 14],
        leve: [15, 18],
        moderado: [19, 25],
        severo: [26, 33],
        extremadamenteSevero: [34, 42]
      }
    },
    maxPuntuacion: {
      depresion: 42,
      ansiedad: 42,
      estres: 42
    }
  }
};
