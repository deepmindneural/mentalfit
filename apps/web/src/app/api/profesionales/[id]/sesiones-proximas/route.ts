import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

/**
 * GET /api/profesionales/[id]/sesiones-proximas
 * Obtiene las próximas sesiones del profesional
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
    const ahora = new Date().toISOString();

    // Obtener próximas sesiones con información del paciente
    const { data: sesiones, error: errorSesiones } = await supabase
      .from('sesiones')
      .select(`
        *,
        pacientes (
          *,
          usuarios (
            nombre_completo,
            email,
            telefono,
            avatar_url
          )
        )
      `)
      .eq('profesional_id', profesionalId)
      .gte('fecha_hora_inicio', ahora)
      .in('estado', ['programada', 'confirmada'])
      .order('fecha_hora_inicio', { ascending: true })
      .limit(10);

    if (errorSesiones) {
      throw errorSesiones;
    }

    // Formatear datos para el frontend
    const sesionesFormateadas = sesiones?.map((sesion: any) => ({
      id: sesion.id,
      paciente: sesion.pacientes?.usuarios?.nombre_completo || 'Sin nombre',
      pacienteEmail: sesion.pacientes?.usuarios?.email,
      pacienteTelefono: sesion.pacientes?.usuarios?.telefono,
      pacienteAvatar: sesion.pacientes?.usuarios?.avatar_url,
      fechaHoraInicio: sesion.fecha_hora_inicio,
      fechaHoraFin: sesion.fecha_hora_fin,
      duracion: sesion.duracion_minutos,
      tipo: sesion.tipo_sesion,
      modalidad: sesion.modalidad,
      estado: sesion.estado,
      salaVirtualUrl: sesion.sala_virtual_url,
      costo: sesion.costo,
    })) || [];

    return NextResponse.json(sesionesFormateadas);
  } catch (error: any) {
    console.error('Error al obtener sesiones próximas:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
