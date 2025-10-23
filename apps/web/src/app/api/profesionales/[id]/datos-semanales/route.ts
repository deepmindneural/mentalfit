import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

/**
 * GET /api/profesionales/[id]/datos-semanales
 * Obtiene los datos semanales de sesiones e ingresos del profesional
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

    // Obtener sesiones de los últimos 7 días
    const hace7Dias = new Date();
    hace7Dias.setDate(hace7Dias.getDate() - 7);
    hace7Dias.setHours(0, 0, 0, 0);

    const { data: sesiones, error: errorSesiones } = await supabase
      .from('sesiones')
      .select('fecha_hora_inicio, costo, estado')
      .eq('profesional_id', profesionalId)
      .gte('fecha_hora_inicio', hace7Dias.toISOString())
      .order('fecha_hora_inicio', { ascending: true });

    if (errorSesiones) {
      throw errorSesiones;
    }

    // Agrupar por día de la semana
    const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const datosAgrupados: Record<string, { sesiones: number; ingresos: number }> = {};

    // Inicializar últimos 7 días
    for (let i = 6; i >= 0; i--) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() - i);
      const nombreDia = diasSemana[fecha.getDay()];
      datosAgrupados[nombreDia] = { sesiones: 0, ingresos: 0 };
    }

    // Contar sesiones e ingresos por día
    sesiones?.forEach((sesion) => {
      const fecha = new Date(sesion.fecha_hora_inicio);
      const nombreDia = diasSemana[fecha.getDay()];

      if (datosAgrupados[nombreDia]) {
        datosAgrupados[nombreDia].sesiones += 1;
        if (sesion.estado === 'completada') {
          datosAgrupados[nombreDia].ingresos += sesion.costo || 0;
        }
      }
    });

    // Convertir a array para el gráfico
    const datosFormateados = Object.entries(datosAgrupados).map(([nombre, datos]) => ({
      nombre,
      sesiones: datos.sesiones,
      ingresos: datos.ingresos,
    }));

    return NextResponse.json(datosFormateados);
  } catch (error: any) {
    console.error('Error al obtener datos semanales:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
