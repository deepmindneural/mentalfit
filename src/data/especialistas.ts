import { Especialista } from '../tipos';

export const especialistas: Especialista[] = [
  {
    id: '1',
    nombre: 'Ana',
    apellido: 'Martínez',
    especialidad: 'Psicóloga Clínica',
    calificacion: 4.8,
    genero: 'mujer',
    fotoPerfil: 'https://randomuser.me/api/portraits/women/44.jpg',
    ubicacion: {
      lat: 4.6486259,
      lng: -74.0804509,
      direccion: 'Calle 93 #14-20, Consultorio 205',
      ciudad: 'Bogotá',
      pais: 'Colombia'
    },
    descripcion: 'Especialista en terapia cognitivo-conductual con enfoque en trastornos de ansiedad y depresión. Ofrezco un espacio seguro para trabajar en tu bienestar mental.',
    experiencia: 8,
    precio: 180000,
    moneda: 'COP',
    disponibilidad: ['Lunes', 'Miércoles', 'Viernes'],
    resenas: [
      {
        id: '101',
        usuario: 'Carlos R.',
        calificacion: 5,
        comentario: 'Excelente profesional. Me ayudó a superar mi ansiedad social.',
        fecha: '2025-03-15'
      },
      {
        id: '102',
        usuario: 'Luisa M.',
        calificacion: 4.5,
        comentario: 'Muy buena atención y seguimiento constante.',
        fecha: '2025-04-20'
      }
    ],
    certificaciones: ['Universidad Nacional de Colombia', 'Terapia Cognitivo-Conductual Avanzada', 'Mindfulness para profesionales de la salud']
  },
  {
    id: '2',
    nombre: 'Juan',
    apellido: 'Gómez',
    especialidad: 'Psiquiatra',
    calificacion: 4.7,
    genero: 'hombre',
    fotoPerfil: 'https://randomuser.me/api/portraits/men/32.jpg',
    ubicacion: {
      lat: 4.6690605,
      lng: -74.0475517,
      direccion: 'Carrera 7 #117-52, Consultorio 410',
      ciudad: 'Bogotá',
      pais: 'Colombia'
    },
    descripcion: 'Psiquiatra con enfoque holístico. Trabajo en la integración de tratamientos farmacológicos y psicoterapia para abordar trastornos mentales.',
    experiencia: 12,
    precio: 250000,
    moneda: 'COP',
    disponibilidad: ['Martes', 'Jueves', 'Sábado'],
    resenas: [
      {
        id: '201',
        usuario: 'Andrea P.',
        calificacion: 5,
        comentario: 'Muy profesional y humano en su trato. Lo recomiendo ampliamente.',
        fecha: '2025-04-02'
      },
      {
        id: '202',
        usuario: 'Santiago L.',
        calificacion: 4.5,
        comentario: 'Buen diagnóstico y tratamiento efectivo para mi caso.',
        fecha: '2025-03-10'
      }
    ],
    certificaciones: ['Universidad de los Andes', 'Especialidad en Psiquiatría Clínica', 'Neuropsiquiatría']
  },
  {
    id: '3',
    nombre: 'Laura',
    apellido: 'Rodríguez',
    especialidad: 'Psicóloga Infanto-Juvenil',
    calificacion: 4.9,
    genero: 'mujer',
    fotoPerfil: 'https://randomuser.me/api/portraits/women/67.jpg',
    ubicacion: {
      lat: 4.6634096,
      lng: -74.0589139,
      direccion: 'Calle 116 #19-51, Consultorio 305',
      ciudad: 'Bogotá',
      pais: 'Colombia'
    },
    descripcion: 'Especializada en psicología infantil y adolescente. Trabajo con trastornos del desarrollo, problemas de conducta y apoyo familiar.',
    experiencia: 10,
    precio: 190000,
    moneda: 'COP',
    disponibilidad: ['Lunes', 'Martes', 'Jueves'],
    resenas: [
      {
        id: '301',
        usuario: 'Patricia G.',
        calificacion: 5,
        comentario: 'Increíble cómo ha ayudado a mi hijo con sus problemas de atención.',
        fecha: '2025-04-15'
      },
      {
        id: '302',
        usuario: 'Roberto S.',
        calificacion: 4.8,
        comentario: 'Excelente manejo con los adolescentes, mi hija ha mejorado mucho.',
        fecha: '2025-02-28'
      }
    ],
    certificaciones: ['Universidad Javeriana', 'Especialidad en Psicología Infanto-Juvenil', 'Terapia Familiar Sistémica']
  },
  {
    id: '4',
    nombre: 'Miguel',
    apellido: 'Torres',
    especialidad: 'Psicólogo Organizacional',
    calificacion: 4.6,
    genero: 'hombre',
    fotoPerfil: 'https://randomuser.me/api/portraits/men/52.jpg',
    ubicacion: {
      lat: 40.7128,
      lng: -74.0060,
      direccion: '350 5th Ave, Suite 4201',
      ciudad: 'New York',
      pais: 'United States'
    },
    descripcion: 'Especializado en psicología organizacional y coaching ejecutivo. Ayudo a profesionales a desarrollar su potencial y mejorar su bienestar en entornos laborales.',
    experiencia: 15,
    precio: 200,
    moneda: 'USD',
    disponibilidad: ['Lunes', 'Miércoles', 'Viernes'],
    resenas: [
      {
        id: '401',
        usuario: 'John D.',
        calificacion: 4.7,
        comentario: 'Great insights for my team. Helped us create a better work environment.',
        fecha: '2025-03-20'
      },
      {
        id: '402',
        usuario: 'Sarah K.',
        calificacion: 4.5,
        comentario: 'Professional and effective coaching sessions.',
        fecha: '2025-04-05'
      }
    ],
    certificaciones: ['Columbia University', 'Executive Coaching Certification', 'Organizational Psychology PhD']
  },
  {
    id: '5',
    nombre: 'Sofia',
    apellido: 'López',
    especialidad: 'Terapeuta Familiar',
    calificacion: 4.8,
    genero: 'mujer',
    fotoPerfil: 'https://randomuser.me/api/portraits/women/33.jpg',
    ubicacion: {
      lat: 51.5074,
      lng: -0.1278,
      direccion: '123 Oxford Street, Suite 45',
      ciudad: 'London',
      pais: 'United Kingdom'
    },
    descripcion: 'Terapeuta familiar especializada en resolver conflictos y mejorar la comunicación. Trabajo con parejas y familias para fortalecer vínculos y resolver problemas relacionales.',
    experiencia: 11,
    precio: 150,
    moneda: 'GBP',
    disponibilidad: ['Martes', 'Jueves', 'Sábado'],
    resenas: [
      {
        id: '501',
        usuario: 'Emma W.',
        calificacion: 5,
        comentario: 'Completely transformed our family dynamics for the better.',
        fecha: '2025-04-10'
      },
      {
        id: '502',
        usuario: 'James T.',
        calificacion: 4.6,
        comentario: 'Helped us navigate a difficult time with our teenagers.',
        fecha: '2025-03-25'
      }
    ],
    certificaciones: ['University of London', 'Family Therapy Specialization', 'Couple Counseling Certification']
  },
  {
    id: '6',
    nombre: 'Andrés',
    apellido: 'Medina',
    especialidad: 'Psicoterapeuta',
    calificacion: 4.7,
    genero: 'hombre',
    fotoPerfil: 'https://randomuser.me/api/portraits/men/64.jpg',
    ubicacion: {
      lat: 4.7110,
      lng: -74.0721,
      direccion: 'Carrera 11 #82-71, Consultorio 505',
      ciudad: 'Bogotá',
      pais: 'Colombia'
    },
    descripcion: 'Psicoterapeuta con orientación humanística y experiencial. Trabajo en el crecimiento personal y el desarrollo de la autonomía emocional.',
    experiencia: 9,
    precio: 170000,
    moneda: 'COP',
    disponibilidad: ['Lunes', 'Miércoles', 'Viernes'],
    resenas: [
      {
        id: '601',
        usuario: 'Marcela V.',
        calificacion: 4.8,
        comentario: 'Un profesional comprometido que realmente escucha y entiende.',
        fecha: '2025-04-05'
      },
      {
        id: '602',
        usuario: 'Daniel P.',
        calificacion: 4.6,
        comentario: 'Sus sesiones me han ayudado a tener mayor claridad emocional.',
        fecha: '2025-03-18'
      }
    ],
    certificaciones: ['Universidad del Rosario', 'Psicoterapia Humanística', 'Mindfulness y Compasión']
  }
];

export const obtenerEspecialistasDestacados = (): Especialista[] => {
  return especialistas
    .sort((a, b) => b.calificacion - a.calificacion)
    .slice(0, 3);
};

export const filtrarEspecialistas = ({
  especialidad,
  genero,
  calificacionMinima,
  ubicacionUsuario
}: {
  especialidad?: string;
  genero?: 'hombre' | 'mujer' | 'otro';
  calificacionMinima?: number;
  ubicacionUsuario?: { lat: number; lng: number };
}): Especialista[] => {
  let filtrados = [...especialistas];
  
  if (especialidad) {
    filtrados = filtrados.filter(esp => 
      esp.especialidad.toLowerCase().includes(especialidad.toLowerCase())
    );
  }
  
  if (genero) {
    filtrados = filtrados.filter(esp => esp.genero === genero);
  }
  
  if (calificacionMinima) {
    filtrados = filtrados.filter(esp => esp.calificacion >= calificacionMinima);
  }
  
  if (ubicacionUsuario) {
    // Añadir distancia a cada especialista
    filtrados = filtrados.map(esp => ({
      ...esp,
      distancia: calcularDistancia(
        ubicacionUsuario.lat, 
        ubicacionUsuario.lng, 
        esp.ubicacion.lat, 
        esp.ubicacion.lng
      )
    })).sort((a, b) => (a as any).distancia - (b as any).distancia);
  }
  
  return filtrados;
};

// Función para calcular distancia usando la fórmula de Haversine
const calcularDistancia = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;
  return Math.round(d * 10) / 10; // Redondear a 1 decimal
};

export function toRad(value: number): number {
  return value * Math.PI / 180;
};

// Obtener un especialista por su ID
export function obtenerEspecialistaPorId(id: string): Especialista | undefined {
  return especialistas.find(especialista => especialista.id === id);
}
