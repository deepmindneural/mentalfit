import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      bienvenido: '¡Bienvenido a MentalFit!',
      descripcionPlataforma: 'MentalFit es tu ecosistema integral para el bienestar mental y físico. Monitorea tu salud y recibe recomendaciones personalizadas.',
      tituloHero: 'Tu salud mental merece atención profesional',
      descripcionHero: 'Evalúa tu bienestar emocional con cuestionarios validados y conecta con especialistas calificados.',
      empezarEvaluacion: 'Comenzar evaluación',
      buscarEspecialistas: 'Buscar especialistas',
      especialistasDestacados: 'Especialistas destacados',
      verMasEspecialistas: 'Ver más especialistas',
      beneficiosPlataforma: 'Beneficios de nuestra plataforma',
      verCuestionarios: 'Ver cuestionarios disponibles',
      iniciarSesion: 'Iniciar sesión',
      miProgreso: 'Mi progreso',
      contacto: 'Contacto',
      sobreNosotros: 'Sobre nosotros',
      inicio: 'Inicio',
      especialistas: 'Especialistas',
      cuestionarios: 'Cuestionarios',
      testimoniosClientes: 'Lo que dicen nuestros usuarios',
      
      // Cuestionarios - General
      evaluacionesSaludMental: 'Evaluaciones de salud mental',
      seleccionaCuestionario: 'Selecciona un cuestionario para comenzar tu evaluación',
      evaluacionesDisponibles: 'Evaluaciones disponibles',
      evaluacionesExplicacion: 'Estas evaluaciones están diseñadas para brindarte una idea inicial sobre tu bienestar emocional. No son herramientas de diagnóstico, pero pueden ayudarte a identificar áreas que merecen atención profesional.',
      comenzar: 'Comenzar',
      asistenciaPersonalizada: '¿Necesitas asistencia personalizada?',
      chatIAExplicacion: 'Nuestro asistente virtual puede guiarte a encontrar la evaluación más adecuada para ti y resolver tus dudas iniciales.',
      antesDeEmpezar: 'Antes de empezar',
      instruccionesCuestionarioGeneral: 'Responde con sinceridad a todas las preguntas. Recuerda que esta evaluación es confidencial y te ayudará a obtener recomendaciones más precisas.',
      noSustituye: 'Esta evaluación no sustituye el diagnóstico o tratamiento de un profesional de la salud mental. Si presentas malestar significativo, te recomendamos buscar ayuda profesional.',
      procesando: 'Procesando...',
      enviarRespuestas: 'Enviar respuestas',
      
      // Cuestionario PHQ-9
      cuestionarioDepresion: 'Cuestionario de Depresión (PHQ-9)',
      descripcionPHQ9: 'Evaluación breve para identificar síntomas depresivos en las últimas dos semanas',
      
      // Cuestionario GAD-7
      cuestionarioAnsiedad: 'Escala de Ansiedad (GAD-7)',
      descripcionGAD7: 'Evaluación breve para identificar síntomas de ansiedad en las últimas dos semanas',
      
      // Cuestionario DASS-21 - Nuevas traducciones
      cuestionarioDASS21: 'Escala de Depresión, Ansiedad y Estrés (DASS-21)',
      descripcionDASS21: 'Evaluación integral que mide niveles de depresión, ansiedad y estrés experimentados en la última semana',
      descripcionDASS21Long: 'Este cuestionario ayuda a identificar y diferenciar síntomas de depresión, ansiedad y estrés. Consta de 21 preguntas sobre tu experiencia durante la última semana.',
      instruccionesDASS21: 'Para cada afirmación, selecciona la opción que mejor describa tu experiencia durante la última semana. No hay respuestas correctas o incorrectas.'
    },
  },
  en: {
    translation: {
      bienvenido: 'Welcome to MentalFit!',
      descripcionPlataforma: 'MentalFit is your comprehensive ecosystem for mental and physical wellness. Track your health and receive personalized recommendations.',
      tituloHero: 'Your mental health deserves professional attention',
      descripcionHero: 'Evaluate your emotional well-being with validated questionnaires and connect with qualified specialists.',
      empezarEvaluacion: 'Start assessment',
      buscarEspecialistas: 'Find specialists',
      especialistasDestacados: 'Featured specialists',
      verMasEspecialistas: 'See more specialists',
      beneficiosPlataforma: 'Benefits of our platform',
      verCuestionarios: 'See available questionnaires',
      iniciarSesion: 'Log in',
      miProgreso: 'My progress',
      contacto: 'Contact',
      sobreNosotros: 'About us',
      inicio: 'Home',
      especialistas: 'Specialists',
      cuestionarios: 'Questionnaires',
      testimoniosClientes: 'What our users say',
      
      // Cuestionarios - General
      evaluacionesSaludMental: 'Mental Health Assessments',
      seleccionaCuestionario: 'Select a questionnaire to start your assessment',
      evaluacionesDisponibles: 'Available assessments',
      evaluacionesExplicacion: 'These assessments are designed to give you an initial insight into your emotional well-being. They are not diagnostic tools, but they can help you identify areas that deserve professional attention.',
      comenzar: 'Start',
      asistenciaPersonalizada: 'Need personalized assistance?',
      chatIAExplicacion: 'Our virtual assistant can guide you to find the most suitable assessment for you and solve your initial questions.',
      antesDeEmpezar: 'Before you start',
      instruccionesCuestionarioGeneral: 'Answer all questions honestly. Remember that this assessment is confidential and will help you get more accurate recommendations.',
      noSustituye: 'This assessment does not substitute the diagnosis or treatment of a mental health professional. If you experience significant distress, we recommend seeking professional help.',
      procesando: 'Processing...',
      enviarRespuestas: 'Submit answers',
      
      // Cuestionario PHQ-9
      cuestionarioDepresion: 'Depression Questionnaire (PHQ-9)',
      descripcionPHQ9: 'Brief assessment to identify depressive symptoms in the last two weeks',
      
      // Cuestionario GAD-7
      cuestionarioAnsiedad: 'Anxiety Scale (GAD-7)',
      descripcionGAD7: 'Brief assessment to identify anxiety symptoms in the last two weeks',
      
      // Cuestionario DASS-21
      cuestionarioDASS21: 'Depression, Anxiety and Stress Scale (DASS-21)',
      descripcionDASS21: 'Comprehensive assessment that measures levels of depression, anxiety and stress experienced in the last week',
      descripcionDASS21Long: 'This questionnaire helps identify and differentiate symptoms of depression, anxiety, and stress. It consists of 21 questions about your experience during the last week.',
      instruccionesDASS21: 'For each statement, select the option that best describes your experience during the last week. There are no right or wrong answers.'
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
