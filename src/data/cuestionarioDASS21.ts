import { PreguntaDASS21 } from '../tipos';

// Cuestionario DASS-21 para evaluar Depresión, Ansiedad y Estrés
export const dass21Preguntas: PreguntaDASS21[] = [
  // Preguntas sobre depresión (3, 5, 10, 13, 16, 17, 21)
  {
    id: 1,
    texto: 'Me ha costado trabajo relajarme',
    categoria: 'estres',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
  {
    id: 2,
    texto: 'Me di cuenta que tenía la boca seca',
    categoria: 'ansiedad',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
  {
    id: 3,
    texto: 'No podía sentir ningún sentimiento positivo',
    categoria: 'depresion',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
  {
    id: 4,
    texto: 'Se me hizo difícil respirar',
    categoria: 'ansiedad',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
  {
    id: 5,
    texto: 'Se me hizo difícil tomar la iniciativa para hacer cosas',
    categoria: 'depresion',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
  {
    id: 6,
    texto: 'Reaccioné exageradamente en ciertas situaciones',
    categoria: 'estres',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
  {
    id: 7,
    texto: 'Sentí que mis manos temblaban',
    categoria: 'ansiedad',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
  {
    id: 8,
    texto: 'He sentido que estaba gastando una gran cantidad de energía',
    categoria: 'estres',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
  {
    id: 9,
    texto: 'Estaba preocupado por situaciones en las cuales podía tener pánico',
    categoria: 'ansiedad',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
  {
    id: 10,
    texto: 'Sentí que no tenía nada por que vivir',
    categoria: 'depresion',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
  {
    id: 11,
    texto: 'Noté que me agitaba',
    categoria: 'estres',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
  {
    id: 12,
    texto: 'Se me hizo difícil relajarme',
    categoria: 'estres',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
  {
    id: 13,
    texto: 'Me sentí triste y deprimido',
    categoria: 'depresion',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
  {
    id: 14,
    texto: 'No toleré nada que no me permitiera continuar con lo que estaba haciendo',
    categoria: 'estres',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
  {
    id: 15,
    texto: 'Sentí que estaba al punto de pánico',
    categoria: 'ansiedad',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
  {
    id: 16,
    texto: 'No me pude entusiasmar por nada',
    categoria: 'depresion',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
  {
    id: 17,
    texto: 'Sentí que valía muy poco como persona',
    categoria: 'depresion',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
  {
    id: 18,
    texto: 'Sentí que estaba muy irritable',
    categoria: 'estres',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
  {
    id: 19,
    texto: 'Sentí los latidos de mi corazón a pesar de no haber hecho ningún esfuerzo físico',
    categoria: 'ansiedad',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
  {
    id: 20,
    texto: 'Tuve miedo sin razón',
    categoria: 'ansiedad',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
  {
    id: 21,
    texto: 'Sentí que la vida no tenía ningún sentido',
    categoria: 'depresion',
    opciones: [
      { valor: 0, texto: 'No me ha ocurrido' },
      { valor: 1, texto: 'Me ha ocurrido un poco' },
      { valor: 2, texto: 'Me ha ocurrido bastante' },
      { valor: 3, texto: 'Me ha ocurrido mucho' },
    ],
  },
];

// Interpretación de resultados DASS-21
export const interpretarDASS21 = (resultados: { depresion: number, ansiedad: number, estres: number }) => {
  // Multiplicamos por 2 para ajustar a la escala DASS42 original
  const depresion = resultados.depresion * 2;
  const ansiedad = resultados.ansiedad * 2;
  const estres = resultados.estres * 2;
  
  const interpretacion = {
    depresion: interpretarSubescala('depresion', depresion),
    ansiedad: interpretarSubescala('ansiedad', ansiedad),
    estres: interpretarSubescala('estres', estres)
  };
  
  return interpretacion;
};

const interpretarSubescala = (escala: 'depresion' | 'ansiedad' | 'estres', puntaje: number) => {
  const rangos = {
    depresion: [
      { max: 9, nivel: 'Normal', descripcion: 'Niveles normales de depresión' },
      { max: 13, nivel: 'Leve', descripcion: 'Niveles leves de depresión' },
      { max: 20, nivel: 'Moderado', descripcion: 'Niveles moderados de depresión que requieren atención' },
      { max: 27, nivel: 'Severo', descripcion: 'Niveles severos de depresión que requieren atención profesional' },
      { max: Infinity, nivel: 'Extremadamente severo', descripcion: 'Niveles extremadamente severos de depresión que requieren atención inmediata' }
    ],
    ansiedad: [
      { max: 7, nivel: 'Normal', descripcion: 'Niveles normales de ansiedad' },
      { max: 9, nivel: 'Leve', descripcion: 'Niveles leves de ansiedad' },
      { max: 14, nivel: 'Moderado', descripcion: 'Niveles moderados de ansiedad que requieren atención' },
      { max: 19, nivel: 'Severo', descripcion: 'Niveles severos de ansiedad que requieren atención profesional' },
      { max: Infinity, nivel: 'Extremadamente severo', descripcion: 'Niveles extremadamente severos de ansiedad que requieren atención inmediata' }
    ],
    estres: [
      { max: 14, nivel: 'Normal', descripcion: 'Niveles normales de estrés' },
      { max: 18, nivel: 'Leve', descripcion: 'Niveles leves de estrés' },
      { max: 25, nivel: 'Moderado', descripcion: 'Niveles moderados de estrés que requieren atención' },
      { max: 33, nivel: 'Severo', descripcion: 'Niveles severos de estrés que requieren atención profesional' },
      { max: Infinity, nivel: 'Extremadamente severo', descripcion: 'Niveles extremadamente severos de estrés que requieren atención inmediata' }
    ]
  };
  
  for (const rango of rangos[escala]) {
    if (puntaje <= rango.max) {
      return { nivel: rango.nivel, descripcion: rango.descripcion };
    }
  }
  
  return { nivel: 'Error', descripcion: 'Error en la evaluación' };
};

// Generar recomendaciones personalizadas basadas en los resultados
export const generarRecomendacionesDASS21 = (resultados: { depresion: number, ansiedad: number, estres: number }) => {
  const interpretacion = interpretarDASS21(resultados);
  const recomendaciones = [];
  
  // Recomendaciones generales para todos
  recomendaciones.push({
    titulo: 'Consulta con un profesional',
    descripcion: 'Recuerda que esta evaluación es solo orientativa. Si tienes preocupaciones sobre tu salud mental, te recomendamos consultar con un profesional de la salud mental.',
    tipo: 'general'
  });
  
  // Depresión
  if (resultados.depresion * 2 > 9) {
    recomendaciones.push({
      titulo: 'Actividades placenteras',
      descripcion: 'Programa actividades que antes disfrutabas, aunque ahora no tengas muchas ganas. El involucrarte en actividades placenteras puede ayudarte a mejorar tu estado de ánimo.',
      tipo: 'depresion'
    });
    
    if (resultados.depresion * 2 > 13) {
      recomendaciones.push({
        titulo: 'Establecer rutinas',
        descripcion: 'Mantén horarios regulares para dormir, comer y realizar actividades. La estructura ayuda a combatir los sentimientos de depresión.',
        tipo: 'depresion'
      });
    }
  }
  
  // Ansiedad
  if (resultados.ansiedad * 2 > 7) {
    recomendaciones.push({
      titulo: 'Respiración consciente',
      descripcion: 'Practica ejercicios de respiración profunda: inhala contando hasta 4, mantén el aire contando hasta 2, y exhala contando hasta 6. Repite varias veces cuando sientas ansiedad.',
      tipo: 'ansiedad'
    });
    
    if (resultados.ansiedad * 2 > 9) {
      recomendaciones.push({
        titulo: 'Mindfulness',
        descripcion: 'Practica la atención plena, centrándote en el momento presente sin juzgar. Esto puede ayudarte a reducir la ansiedad anticipatoria.',
        tipo: 'ansiedad'
      });
    }
  }
  
  // Estrés
  if (resultados.estres * 2 > 14) {
    recomendaciones.push({
      titulo: 'Manejar el tiempo',
      descripcion: 'Aprende a priorizar tareas y a decir "no" cuando sea necesario. El manejo efectivo del tiempo reduce los niveles de estrés.',
      tipo: 'estres'
    });
    
    if (resultados.estres * 2 > 18) {
      recomendaciones.push({
        titulo: 'Ejercicio físico',
        descripcion: 'Incorpora al menos 30 minutos de actividad física moderada a tu rutina diaria. El ejercicio es un poderoso reductor de estrés.',
        tipo: 'estres'
      });
    }
  }
  
  return recomendaciones;
};
