import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

/**
 * GET /api/usuarios/[id]/dashboard
 * Obtiene los datos del dashboard de un usuario/paciente
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    // Verificar autenticación
    const { data: { session }, error: errorAuth } = await supabase.auth.getSession();

    if (errorAuth || !session) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      );
    }

    const usuarioId = params.id;

    // Verificar que el usuario accede a su propia información o es admin
    const { data: usuario } = await supabase
      .from('usuarios')
      .select('rol')
      .eq('id', session.user.id)
      .single();

    if (session.user.id !== usuarioId && usuario?.rol !== 'super_admin') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 403 }
      );
    }

    // Obtener datos del paciente
    const { data: paciente, error: errorPaciente } = await supabase
      .from('pacientes')
      .select('id')
      .eq('usuario_id', usuarioId)
      .single();

    if (errorPaciente || !paciente) {
      return NextResponse.json(
        { error: 'Paciente no encontrado' },
        { status: 404 }
      );
    }

    const pacienteId = paciente.id;

    // Obtener evaluación más reciente para calcular índice de bienestar
    const { data: evaluacionReciente } = await supabase
      .from('evaluaciones')
      .select('puntuacion_total, resultados')
      .eq('paciente_id', pacienteId)
      .order('fecha_evaluacion', { ascending: false })
      .limit(1)
      .single();

    const indiceBienestar = evaluacionReciente?.puntuacion_total || 0;

    // Calcular componentes del índice (asumiendo que están en resultados)
    const resultados = evaluacionReciente?.resultados as any || {};
    const estadoEmocional = resultados.estado_emocional || 0;
    const manejoEstres = resultados.manejo_estres || 0;
    const calidadSueno = resultados.calidad_sueno || 0;

    // Obtener fecha de inicio del mes actual
    const fechaInicioMes = new Date();
    fechaInicioMes.setDate(1);
    fechaInicioMes.setHours(0, 0, 0, 0);

    // Contar sesiones completadas este mes
    const { count: sesionesEsteMes } = await supabase
      .from('sesiones')
      .select('*', { count: 'exact', head: true })
      .eq('paciente_id', pacienteId)
      .eq('estado', 'completada')
      .gte('fecha_hora_inicio', fechaInicioMes.toISOString());

    // Calcular días de racha (días consecutivos con actividad)
    // Simplificado: contar días con sesiones en los últimos 30 días
    const hace30Dias = new Date();
    hace30Dias.setDate(hace30Dias.getDate() - 30);

    const { data: sesionesRecientes } = await supabase
      .from('sesiones')
      .select('fecha_hora_inicio')
      .eq('paciente_id', pacienteId)
      .eq('estado', 'completada')
      .gte('fecha_hora_inicio', hace30Dias.toISOString())
      .order('fecha_hora_inicio', { ascending: false });

    const diasConActividad = new Set(
      sesionesRecientes?.map((s) => new Date(s.fecha_hora_inicio).toDateString()) || []
    );

    const diasRacha = diasConActividad.size;

    // Contar recursos completados (asumiendo que hay una tabla de progreso o similar)
    // Por ahora usamos un valor simulado
    const recursosCompletados = 8;

    // Contar evaluaciones realizadas
    const { count: totalEvaluaciones } = await supabase
      .from('evaluaciones')
      .select('*', { count: 'exact', head: true })
      .eq('paciente_id', pacienteId);

    // Obtener progreso semanal (últimas 6 semanas)
    const datosProgreso = [];
    for (let i = 5; i >= 0; i--) {
      const fechaSemana = new Date();
      fechaSemana.setDate(fechaSemana.getDate() - (i * 7));
      fechaSemana.setHours(0, 0, 0, 0);

      const fechaFinSemana = new Date(fechaSemana);
      fechaFinSemana.setDate(fechaFinSemana.getDate() + 7);

      // Obtener evaluación de esa semana
      const { data: evaluacionSemana } = await supabase
        .from('evaluaciones')
        .select('puntuacion_total')
        .eq('paciente_id', pacienteId)
        .gte('fecha_evaluacion', fechaSemana.toISOString())
        .lt('fecha_evaluacion', fechaFinSemana.toISOString())
        .order('fecha_evaluacion', { ascending: false })
        .limit(1)
        .single();

      datosProgreso.push({
        nombre: `Sem ${6 - i}`,
        bienestar: evaluacionSemana?.puntuacion_total || (i === 5 ? indiceBienestar : datosProgreso[datosProgreso.length - 1]?.bienestar || 65),
      });
    }

    // Obtener próxima sesión
    const ahora = new Date().toISOString();
    const { data: proximaSesion } = await supabase
      .from('sesiones')
      .select(`
        *,
        profesionales (
          *,
          usuarios (
            nombre_completo
          )
        )
      `)
      .eq('paciente_id', pacienteId)
      .gte('fecha_hora_inicio', ahora)
      .in('estado', ['programada', 'confirmada'])
      .order('fecha_hora_inicio', { ascending: true })
      .limit(1)
      .single();

    // Obtener recursos recomendados (últimos 3 publicados)
    const { data: recursos } = await supabase
      .from('recursos_educativos')
      .select('id, titulo, tipo, duracion_minutos')
      .eq('publicado', true)
      .in('visibilidad', ['publico', 'usuarios'])
      .order('fecha_publicacion', { ascending: false })
      .limit(3);

    return NextResponse.json({
      indiceBienestar: {
        total: indiceBienestar,
        estadoEmocional,
        manejoEstres,
        calidadSueno,
      },
      estadisticas: {
        sesionesCompletadas: sesionesEsteMes || 0,
        diasRacha,
        recursosCompletados,
        totalEvaluaciones: totalEvaluaciones || 0,
      },
      datosProgreso,
      proximaSesion: proximaSesion ? {
        id: proximaSesion.id,
        profesional: (proximaSesion as any).profesionales?.usuarios?.nombre_completo || 'Sin nombre',
        especialidad: (proximaSesion as any).profesionales?.especialidades?.[0] || 'Psicólogo',
        fechaHoraInicio: proximaSesion.fecha_hora_inicio,
        modalidad: proximaSesion.modalidad,
        salaVirtualUrl: proximaSesion.sala_virtual_url,
      } : null,
      recursosRecomendados: recursos?.map((r) => ({
        id: r.id,
        titulo: r.titulo,
        tipo: r.tipo,
        duracion: `${r.duracion_minutos} min`,
      })) || [],
    });
  } catch (error: any) {
    console.error('Error al obtener dashboard de usuario:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
