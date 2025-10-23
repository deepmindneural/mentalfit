import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * API Route: POST /api/public/evaluacion
 *
 * Recibe evaluaciones gratuitas de bienestar mental
 * Calcula puntuación y retorna recomendaciones
 * No requiere autenticación - acceso público
 *
 * Body esperado:
 * {
 *   email: string (opcional),
 *   nombre: string (opcional),
 *   respuestas: Array<{pregunta_id: number, valor: number}> (requerido),
 *   acepta_seguimiento: boolean (opcional, default: false),
 *   acepta_newsletter: boolean (opcional, default: false)
 * }
 */

// Categorías de resultado según puntuación
const CATEGORIAS_RESULTADO = {
  excelente: { min: 80, max: 100, label: 'Excelente' },
  bueno: { min: 60, max: 79, label: 'Bueno' },
  moderado: { min: 40, max: 59, label: 'Moderado' },
  atencion: { min: 20, max: 39, label: 'Requiere Atención' },
  critico: { min: 0, max: 19, label: 'Crítico' },
};

function calcularCategoria(puntuacion: number): string {
  for (const [key, rango] of Object.entries(CATEGORIAS_RESULTADO)) {
    if (puntuacion >= rango.min && puntuacion <= rango.max) {
      return rango.label;
    }
  }
  return CATEGORIAS_RESULTADO.moderado.label;
}

function generarRecomendaciones(puntuacion: number, categoria: string) {
  const recomendaciones: any = {
    categoria,
    puntuacion,
    mensaje_principal: '',
    acciones_recomendadas: [],
    recursos: [],
  };

  if (puntuacion >= 80) {
    recomendaciones.mensaje_principal = '¡Felicidades! Tu bienestar mental es excelente. Sigue cuidando tu salud mental.';
    recomendaciones.acciones_recomendadas = [
      'Mantén tus rutinas de autocuidado',
      'Comparte tus estrategias de bienestar con otros',
      'Considera ser mentor de alguien que necesite apoyo',
    ];
    recomendaciones.recursos = [
      { tipo: 'webinar', titulo: 'Mantener el bienestar a largo plazo' },
      { tipo: 'blog', titulo: 'Técnicas avanzadas de mindfulness' },
    ];
  } else if (puntuacion >= 60) {
    recomendaciones.mensaje_principal = 'Tu bienestar mental es bueno, pero hay áreas de mejora.';
    recomendaciones.acciones_recomendadas = [
      'Establece una rutina de autocuidado diaria',
      'Practica técnicas de relajación',
      'Conecta con amigos y familiares regularmente',
    ];
    recomendaciones.recursos = [
      { tipo: 'webinar', titulo: 'Manejo del estrés laboral' },
      { tipo: 'blog', titulo: 'Mindfulness para principiantes' },
    ];
  } else if (puntuacion >= 40) {
    recomendaciones.mensaje_principal = 'Hay señales que indican estrés moderado. Es buen momento para tomar acción.';
    recomendaciones.acciones_recomendadas = [
      'Considera hablar con un profesional de salud mental',
      'Identifica y reduce fuentes de estrés',
      'Prioriza el descanso y sueño de calidad',
      'Establece límites saludables',
    ];
    recomendaciones.recursos = [
      { tipo: 'sesion', titulo: 'Agendar sesión con profesional', url: '/profesionales' },
      { tipo: 'webinar', titulo: 'Construyendo resiliencia' },
    ];
  } else if (puntuacion >= 20) {
    recomendaciones.mensaje_principal = 'Detectamos señales importantes de malestar. Te recomendamos buscar apoyo profesional.';
    recomendaciones.acciones_recomendadas = [
      'Agenda una sesión con un profesional lo antes posible',
      'Habla con alguien de confianza sobre cómo te sientes',
      'Evita tomar decisiones importantes en este momento',
      'Prioriza tu bienestar por encima de todo',
    ];
    recomendaciones.recursos = [
      { tipo: 'urgente', titulo: 'Agendar sesión urgente', url: '/profesionales?urgente=true' },
      { tipo: 'linea_ayuda', titulo: 'Línea de ayuda 24/7: 800-123-4567' },
    ];
  } else {
    recomendaciones.mensaje_principal = 'Tu situación requiere atención profesional inmediata. No estás solo, estamos aquí para ayudarte.';
    recomendaciones.acciones_recomendadas = [
      'Contacta a un profesional de salud mental HOY',
      'Si tienes pensamientos de autolesión, busca ayuda de emergencia',
      'Habla con alguien de confianza inmediatamente',
      'No estás solo: hay profesionales listos para ayudarte',
    ];
    recomendaciones.recursos = [
      { tipo: 'emergencia', titulo: 'Línea de Crisis 24/7: 800-CRISIS-1' },
      { tipo: 'urgente', titulo: 'Agendar sesión de emergencia', url: '/profesionales?emergencia=true' },
      { tipo: 'contacto', titulo: 'Hablar con un consejero ahora', url: '/contacto?urgente=true' },
    ];
  }

  return recomendaciones;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const body = await request.json();
    const {
      email,
      nombre,
      respuestas,
      acepta_seguimiento = false,
      acepta_newsletter = false
    } = body;

    // Validaciones
    if (!respuestas || !Array.isArray(respuestas) || respuestas.length === 0) {
      return NextResponse.json(
        { error: 'Las respuestas son requeridas y deben ser un array no vacío' },
        { status: 400 }
      );
    }

    // Validar email si se proporciona
    if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Calcular puntuación total (simple promedio en este ejemplo)
    // En producción, esto sería un algoritmo más sofisticado
    const valores = respuestas.map((r: any) => r.valor);
    const suma = valores.reduce((acc: number, val: number) => acc + val, 0);
    const puntuacion_total = Math.round((suma / valores.length) * 20); // Escala 0-100

    // Determinar categoría
    const categoria_resultado = calcularCategoria(puntuacion_total);

    // Generar recomendaciones
    const recomendaciones = generarRecomendaciones(puntuacion_total, categoria_resultado);

    // Capturar metadatos
    const ip_address = request.headers.get('x-forwarded-for') ||
                       request.headers.get('x-real-ip') ||
                       'unknown';

    // Calcular duración (si se envía timestamp de inicio)
    const inicio = body.timestamp_inicio;
    const duracion_segundos = inicio ? Math.round((Date.now() - inicio) / 1000) : null;

    // Guardar en base de datos
    const { data, error } = await supabase
      .from('evaluaciones_gratuitas')
      .insert([
        {
          email: email?.toLowerCase().trim() || null,
          nombre: nombre?.trim() || null,
          respuestas_json: respuestas,
          puntuacion_total,
          categoria_resultado,
          recomendaciones_json: recomendaciones,
          acepta_seguimiento,
          acepta_newsletter,
          ip_address,
          duracion_segundos,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error guardando evaluación:', error);
      // No fallar si hay error en DB, aún retornamos resultados al usuario
    }

    // Retornar resultados al usuario
    return NextResponse.json(
      {
        puntuacion: puntuacion_total,
        categoria: categoria_resultado,
        recomendaciones,
        mensaje: 'Evaluación completada exitosamente',
        evaluacion_id: data?.id,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error en API evaluacion:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
