import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

/**
 * GET /api/profesionales/[id]/estadisticas
 * Obtiene las estadísticas de un profesional
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

    const profesionalId = params.id;

    // Verificar que el usuario tiene acceso a estos datos
    const { data: profesional, error: errorProfesional } = await supabase
      .from('profesionales')
      .select('usuario_id')
      .eq('id', profesionalId)
      .single();

    if (errorProfesional || !profesional) {
      return NextResponse.json(
        { error: 'Profesional no encontrado' },
        { status: 404 }
      );
    }

    // Solo el profesional mismo o un admin puede ver sus estadísticas
    const { data: usuario } = await supabase
      .from('usuarios')
      .select('rol')
      .eq('id', session.user.id)
      .single();

    if (
      profesional.usuario_id !== session.user.id &&
      usuario?.rol !== 'super_admin'
    ) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 403 }
      );
    }

    // Obtener fecha de inicio del mes actual
    const fechaInicioMes = new Date();
    fechaInicioMes.setDate(1);
    fechaInicioMes.setHours(0, 0, 0, 0);

    // Contar pacientes activos (pacientes con al menos una sesión)
    const { count: totalPacientes } = await supabase
      .from('sesiones')
      .select('paciente_id', { count: 'exact', head: true })
      .eq('profesional_id', profesionalId);

    // Contar sesiones este mes
    const { count: sesionesEsteMes } = await supabase
      .from('sesiones')
      .select('*', { count: 'exact', head: true })
      .eq('profesional_id', profesionalId)
      .gte('fecha_hora_inicio', fechaInicioMes.toISOString());

    // Calcular ingresos este mes
    const { data: sesionesMes } = await supabase
      .from('sesiones')
      .select('costo')
      .eq('profesional_id', profesionalId)
      .eq('pagado', true)
      .gte('fecha_hora_inicio', fechaInicioMes.toISOString());

    const ingresosEsteMes = sesionesMes?.reduce((total, sesion) => total + (sesion.costo || 0), 0) || 0;

    // Calcular tasa de asistencia (sesiones completadas vs programadas)
    const { count: sesionesCompletadas } = await supabase
      .from('sesiones')
      .select('*', { count: 'exact', head: true })
      .eq('profesional_id', profesionalId)
      .eq('estado', 'completada')
      .gte('fecha_hora_inicio', fechaInicioMes.toISOString());

    const { count: sesionesProgramadas } = await supabase
      .from('sesiones')
      .select('*', { count: 'exact', head: true })
      .eq('profesional_id', profesionalId)
      .in('estado', ['programada', 'confirmada', 'completada', 'no_asistio'])
      .gte('fecha_hora_inicio', fechaInicioMes.toISOString());

    const tasaAsistencia = sesionesProgramadas
      ? Math.round(((sesionesCompletadas || 0) / sesionesProgramadas) * 100)
      : 0;

    return NextResponse.json({
      totalPacientes: totalPacientes || 0,
      sesionesEsteMes: sesionesEsteMes || 0,
      ingresosEsteMes,
      tasaAsistencia,
    });
  } catch (error: any) {
    console.error('Error al obtener estadísticas del profesional:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
