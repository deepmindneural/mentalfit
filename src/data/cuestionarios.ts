import { PreguntaCuestionario } from '../tipos';

// Cuestionario PHQ-9 para evaluar depresiu00f3n
export const phq9Preguntas: PreguntaCuestionario[] = [
  {
    id: 1,
    texto: 'Poco interu00e9s o placer en hacer las cosas',
    opciones: [
      { valor: 0, texto: 'Nunca' },
      { valor: 1, texto: 'Varios du00edas' },
      { valor: 2, texto: 'Mu00e1s de la mitad de los du00edas' },
      { valor: 3, texto: 'Casi todos los du00edas' },
    ],
  },
  {
    id: 2,
    texto: 'Se ha sentido decau00eddo(a), deprimido(a) o sin esperanzas',
    opciones: [
      { valor: 0, texto: 'Nunca' },
      { valor: 1, texto: 'Varios du00edas' },
      { valor: 2, texto: 'Mu00e1s de la mitad de los du00edas' },
      { valor: 3, texto: 'Casi todos los du00edas' },
    ],
  },
  {
    id: 3,
    texto: 'Ha tenido dificultad para quedarse o permanecer dormido(a), o ha dormido demasiado',
    opciones: [
      { valor: 0, texto: 'Nunca' },
      { valor: 1, texto: 'Varios du00edas' },
      { valor: 2, texto: 'Mu00e1s de la mitad de los du00edas' },
      { valor: 3, texto: 'Casi todos los du00edas' },
    ],
  },
  {
    id: 4,
    texto: 'Se ha sentido cansado(a) o con poca energu00eda',
    opciones: [
      { valor: 0, texto: 'Nunca' },
      { valor: 1, texto: 'Varios du00edas' },
      { valor: 2, texto: 'Mu00e1s de la mitad de los du00edas' },
      { valor: 3, texto: 'Casi todos los du00edas' },
    ],
  },
  {
    id: 5,
    texto: 'Sin apetito o ha comido en exceso',
    opciones: [
      { valor: 0, texto: 'Nunca' },
      { valor: 1, texto: 'Varios du00edas' },
      { valor: 2, texto: 'Mu00e1s de la mitad de los du00edas' },
      { valor: 3, texto: 'Casi todos los du00edas' },
    ],
  },
  {
    id: 6,
    texto: 'Se ha sentido mal consigo mismo(a), que es un fracaso o que ha quedado mal con usted mismo(a) o con su familia',
    opciones: [
      { valor: 0, texto: 'Nunca' },
      { valor: 1, texto: 'Varios du00edas' },
      { valor: 2, texto: 'Mu00e1s de la mitad de los du00edas' },
      { valor: 3, texto: 'Casi todos los du00edas' },
    ],
  },
  {
    id: 7,
    texto: 'Ha tenido dificultad para concentrarse en ciertas actividades, tales como leer o ver la televisiu00f3n',
    opciones: [
      { valor: 0, texto: 'Nunca' },
      { valor: 1, texto: 'Varios du00edas' },
      { valor: 2, texto: 'Mu00e1s de la mitad de los du00edas' },
      { valor: 3, texto: 'Casi todos los du00edas' },
    ],
  },
  {
    id: 8,
    texto: 'u00bfSe ha movido o hablado tan lento que otras personas podru00edan haberlo notado? O lo contrario u2013 muy inquieto(a) o agitado(a)',
    opciones: [
      { valor: 0, texto: 'Nunca' },
      { valor: 1, texto: 'Varios du00edas' },
      { valor: 2, texto: 'Mu00e1s de la mitad de los du00edas' },
      { valor: 3, texto: 'Casi todos los du00edas' },
    ],
  },
  {
    id: 9,
    texto: 'Pensamientos de que estaru00eda mejor muerto(a) o de lastimarse de alguna manera',
    opciones: [
      { valor: 0, texto: 'Nunca' },
      { valor: 1, texto: 'Varios du00edas' },
      { valor: 2, texto: 'Mu00e1s de la mitad de los du00edas' },
      { valor: 3, texto: 'Casi todos los du00edas' },
    ],
  },
];

// Interpretaciu00f3n de resultados PHQ-9
export const interpretarPHQ9 = (puntajeTotal: number) => {
  if (puntajeTotal >= 0 && puntajeTotal <= 4) {
    return {
      nivel: 'Mu00ednima o nula',
      descripcion: 'Depresiu00f3n mu00ednima o nula. Los su00edntomas que presenta son normales y pueden ser reacciones a situaciones temporales.',
    };
  } else if (puntajeTotal >= 5 && puntajeTotal <= 9) {
    return {
      nivel: 'Leve',
      descripcion: 'Depresiu00f3n leve. Se recomienda vigilancia y seguimiento. Podrían beneficiarse de tu00e9cnicas de autocuidado y mindfulness.',
    };
  } else if (puntajeTotal >= 10 && puntajeTotal <= 14) {
    return {
      nivel: 'Moderada',
      descripcion: 'Depresiu00f3n moderada. Se recomienda una evaluaciu00f3n por parte de un profesional para determinar la necesidad de tratamiento.',
    };
  } else if (puntajeTotal >= 15 && puntajeTotal <= 19) {
    return {
      nivel: 'Moderadamente severa',
      descripcion: 'Depresiu00f3n moderadamente severa. Se recomienda tratamiento activo con psicoterapia y/o farmacoterapia.',
    };
  } else {
    return {
      nivel: 'Severa',
      descripcion: 'Depresiu00f3n severa. Se recomienda iniciar tratamiento inmediato con farmacoterapia y/o psicoterapia. Considere derivar a especialista en salud mental.',
    };
  }
};

// Cuestionario GAD-7 para evaluar ansiedad
export const gad7Preguntas: PreguntaCuestionario[] = [
  {
    id: 1,
    texto: 'Se ha sentido nervioso(a), ansioso(a) o con los nervios de punta',
    opciones: [
      { valor: 0, texto: 'Nunca' },
      { valor: 1, texto: 'Varios du00edas' },
      { valor: 2, texto: 'Mu00e1s de la mitad de los du00edas' },
      { valor: 3, texto: 'Casi todos los du00edas' },
    ],
  },
  {
    id: 2,
    texto: 'No ha sido capaz de parar o controlar su preocupaciu00f3n',
    opciones: [
      { valor: 0, texto: 'Nunca' },
      { valor: 1, texto: 'Varios du00edas' },
      { valor: 2, texto: 'Mu00e1s de la mitad de los du00edas' },
      { valor: 3, texto: 'Casi todos los du00edas' },
    ],
  },
  {
    id: 3,
    texto: 'Se ha preocupado demasiado por motivos diferentes',
    opciones: [
      { valor: 0, texto: 'Nunca' },
      { valor: 1, texto: 'Varios du00edas' },
      { valor: 2, texto: 'Mu00e1s de la mitad de los du00edas' },
      { valor: 3, texto: 'Casi todos los du00edas' },
    ],
  },
  {
    id: 4,
    texto: 'Ha tenido dificultad para relajarse',
    opciones: [
      { valor: 0, texto: 'Nunca' },
      { valor: 1, texto: 'Varios du00edas' },
      { valor: 2, texto: 'Mu00e1s de la mitad de los du00edas' },
      { valor: 3, texto: 'Casi todos los du00edas' },
    ],
  },
  {
    id: 5,
    texto: 'Se ha sentido tan inquieto(a) que no ha podido quedarse quieto(a)',
    opciones: [
      { valor: 0, texto: 'Nunca' },
      { valor: 1, texto: 'Varios du00edas' },
      { valor: 2, texto: 'Mu00e1s de la mitad de los du00edas' },
      { valor: 3, texto: 'Casi todos los du00edas' },
    ],
  },
  {
    id: 6,
    texto: 'Se ha molestado o irritado fu00e1cilmente',
    opciones: [
      { valor: 0, texto: 'Nunca' },
      { valor: 1, texto: 'Varios du00edas' },
      { valor: 2, texto: 'Mu00e1s de la mitad de los du00edas' },
      { valor: 3, texto: 'Casi todos los du00edas' },
    ],
  },
  {
    id: 7,
    texto: 'Ha sentido miedo, como si algo terrible pudiera suceder',
    opciones: [
      { valor: 0, texto: 'Nunca' },
      { valor: 1, texto: 'Varios du00edas' },
      { valor: 2, texto: 'Mu00e1s de la mitad de los du00edas' },
      { valor: 3, texto: 'Casi todos los du00edas' },
    ],
  },
];

// Interpretaciu00f3n de resultados GAD-7
export const interpretarGAD7 = (puntajeTotal: number) => {
  if (puntajeTotal >= 0 && puntajeTotal <= 4) {
    return {
      nivel: 'Mu00ednima o nula',
      descripcion: 'Ansiedad mu00ednima o nula. Los su00edntomas que presenta son normales y pueden ser reacciones a situaciones temporales.',
    };
  } else if (puntajeTotal >= 5 && puntajeTotal <= 9) {
    return {
      nivel: 'Leve',
      descripcion: 'Ansiedad leve. Podrían beneficiarse de tu00e9cnicas de manejo de estru00e9s y ansiedad como ejercicios de respiración, meditaciu00f3n y actividad fu00edsica regular.',
    };
  } else if (puntajeTotal >= 10 && puntajeTotal <= 14) {
    return {
      nivel: 'Moderada',
      descripcion: 'Ansiedad moderada. Se recomienda una evaluaciu00f3n por parte de un profesional. Pueden beneficiarse de psicoterapia y/o tratamiento farmacolu00f3gico.',
    };
  } else {
    return {
      nivel: 'Severa',
      descripcion: 'Ansiedad severa. Requiere atención profesional inmediata. Se recomienda una combinaciu00f3n de psicoterapia y farmacoterapia.',
    };
  }
};

// Generador de recomendaciones basadas en la IA
export const generarRecomendaciones = (tipoCuestionario: 'PHQ9' | 'GAD7', puntajeTotal: number) => {
  const recomendacionesBase = [
    {
      id: '1',
      tipo: 'ejercicio' as const,
      titulo: 'Actividad fu00edsica regular',
      descripcion: 'Realizar 30 minutos de actividad fu00edsica moderada 5 du00edas a la semana puede reducir significativamente los su00edntomas de depresiu00f3n y ansiedad.',
      enlace: 'https://www.youtube.com/watch?v=example-exercise',
    },
    {
      id: '2',
      tipo: 'meditacion' as const,
      titulo: 'Meditaciu00f3n mindfulness diaria',
      descripcion: 'Practicar mindfulness durante 10-15 minutos al du00eda puede ayudar a reducir el estru00e9s y mejorar el estado de u00e1nimo.',
      enlace: 'https://www.headspace.com',
    },
    {
      id: '3',
      tipo: 'especialista' as const,
      titulo: 'Consulta con psicu00f3logo',
      descripcion: 'La terapia cognitivo-conductual ha demostrado ser efectiva para tratar tanto la depresiu00f3n como la ansiedad.',
      especialistaId: '1',
    },
    {
      id: '4',
      tipo: 'recurso' as const,
      titulo: 'Mejorar la calidad del sueu00f1o',
      descripcion: 'Establecer una rutina regular de sueu00f1o y evitar pantallas antes de dormir puede mejorar significativamente el descanso y el estado de u00e1nimo.',
      enlace: 'https://www.sleepfoundation.org',
    },
    {
      id: '5',
      tipo: 'meditacion' as const,
      titulo: 'Tu00e9cnicas de respiraciu00f3n para momentos de ansiedad',
      descripcion: 'La tu00e9cnica 4-7-8: inhala por 4 segundos, mantén por 7 segundos y exhala por 8 segundos. Repite 5 veces cuando sientas ansiedad.',
      enlace: 'https://www.calm.com',
    },
    {
      id: '6',
      tipo: 'recurso' as const,
      titulo: 'Establecer ru00edtmicamente actividades agradables',
      descripcion: 'Programa al menos una actividad placentera cada du00eda para combatir los su00edntomas depresivos y aumentar la sensaciu00f3n de bienestar.',
    },
    {
      id: '7',
      tipo: 'especialista' as const,
      titulo: 'Evaluaciu00f3n por psiquiatra',
      descripcion: 'Para casos moderados a severos, una evaluaciu00f3n psiquiu00e1trica puede determinar si se beneficiaría de tratamiento farmacolu00f3gico.',
      especialistaId: '2',
    },
    {
      id: '8',
      tipo: 'ejercicio' as const,
      titulo: 'Yoga para reducir ansiedad',
      descripcion: 'El yoga combina actividad fu00edsica con mindfulness, siendo especialmente efectivo para reducir la ansiedad.',
      enlace: 'https://www.yogajournal.com',
    }
  ];

  // Filtrar recomendaciones segu00fan el tipo de cuestionario y puntaje
  let recomendacionesFiltradas = [];

  if (tipoCuestionario === 'PHQ9') { // Depresiu00f3n
    if (puntajeTotal < 5) { // Mu00ednima
      recomendacionesFiltradas = recomendacionesBase.filter(r => r.id === '1' || r.id === '2' || r.id === '6');
    } else if (puntajeTotal < 10) { // Leve
      recomendacionesFiltradas = recomendacionesBase.filter(r => r.id === '1' || r.id === '2' || r.id === '4' || r.id === '6');
    } else if (puntajeTotal < 15) { // Moderada
      recomendacionesFiltradas = recomendacionesBase.filter(r => r.id === '1' || r.id === '3' || r.id === '4' || r.id === '6');
    } else { // Severa
      recomendacionesFiltradas = recomendacionesBase.filter(r => r.id === '3' || r.id === '4' || r.id === '7');
    }
  } else { // GAD7 - Ansiedad
    if (puntajeTotal < 5) { // Mu00ednima
      recomendacionesFiltradas = recomendacionesBase.filter(r => r.id === '2' || r.id === '5' || r.id === '8');
    } else if (puntajeTotal < 10) { // Leve
      recomendacionesFiltradas = recomendacionesBase.filter(r => r.id === '1' || r.id === '2' || r.id === '5' || r.id === '8');
    } else if (puntajeTotal < 15) { // Moderada
      recomendacionesFiltradas = recomendacionesBase.filter(r => r.id === '2' || r.id === '3' || r.id === '5' || r.id === '8');
    } else { // Severa
      recomendacionesFiltradas = recomendacionesBase.filter(r => r.id === '3' || r.id === '5' || r.id === '7');
    }
  }

  return recomendacionesFiltradas;
};
