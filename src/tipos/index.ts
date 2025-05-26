// Tipos para la plataforma MentalFit

// Tipo para especialistas
export interface Especialista {
  id: string;
  nombre: string;
  apellido: string;
  especialidad: string;
  genero: 'hombre' | 'mujer' | 'otro';
  fotoPerfil: string;
  calificacion: number;
  ubicacion: {
    lat: number;
    lng: number;
    direccion: string;
    ciudad: string;
    pais: string;
  };
  precio: number;
  experiencia: number;
  descripcion: string;
  destacado?: boolean;
}

// Re-exportar todos los tipos de cuestionarios
export * from './cuestionarios';

// Tipo para las consultas/sesiones
export interface Consulta {
  id: string;
  especialistaId: string;
  usuarioId: string;
  fecha: string;
  hora: string;
  duracion: number; // en minutos
  estado: 'programada' | 'completada' | 'cancelada';
  modalidad: 'presencial' | 'virtual';
  notas?: string;
  costo: {
    moneda: 'COP' | 'USD' | 'GBP';
    valor: number;
  };
}

// Tipo para usuarios
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  genero?: 'masculino' | 'femenino' | 'otro';
  fechaNacimiento?: string;
  resultadosCuestionarios?: string[]; // IDs de los cuestionarios realizados
  consultas?: string[]; // IDs de las consultas programadas
}

// Tipo para preguntas de cuestionarios
export interface PreguntaCuestionario {
  id: number;
  texto: string;
  categoria?: 'depresion' | 'ansiedad' | 'estres' | string;
  opciones: {
    valor: number;
    texto: string;
  }[];
}

// Tipo específico para preguntas del DASS-21 donde la categoría es obligatoria
export interface PreguntaDASS21 extends Omit<PreguntaCuestionario, 'categoria'> {
  categoria: 'depresion' | 'ansiedad' | 'estres';
}

// Configuración de los cuestionarios
export interface ConfiguracionCuestionario {
  id: string;
  titulo: string;
  descripcion: string;
  umbralPuntuacion: {
    minimo: [number, number];
    leve: [number, number];
    moderado: [number, number];
    moderadamenteSevero?: [number, number];
    severo?: [number, number];
  };
  maxPuntuacion: number;
}

export const CONFIGURACION_CUESTIONARIOS: { [key: string]: ConfiguracionCuestionario } = {
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
  }
};
