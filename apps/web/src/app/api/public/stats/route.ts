import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * API Route: GET /api/public/stats
 *
 * Obtiene estadísticas de la plataforma para mostrar social proof
 * No requiere autenticación - acceso público
 *
 * Retorna las estadísticas más recientes disponibles
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Obtener las estadísticas más recientes
    const { data, error } = await supabase
      .from('estadisticas_plataforma')
      .select('*')
      .order('fecha', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching stats:', error);
      return NextResponse.json(
        { error: 'Error al obtener estadísticas' },
        { status: 500 }
      );
    }

    if (!data) {
      // Si no hay estadísticas, retornar valores por defecto
      return NextResponse.json(
        {
          estadisticas: {
            usuarios_activos: 0,
            sesiones_completadas: 0,
            empresas_activas: 0,
            profesionales_activos: 0,
            horas_terapia_totales: 0,
            satisfaccion_promedio: null,
            fecha: new Date().toISOString().split('T')[0],
          },
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
          },
        }
      );
    }

    return NextResponse.json(
      {
        estadisticas: {
          usuarios_activos: data.usuarios_activos,
          sesiones_completadas: data.sesiones_completadas,
          empresas_activas: data.empresas_activas,
          profesionales_activos: data.profesionales_activos,
          horas_terapia_totales: data.horas_terapia_totales,
          satisfaccion_promedio: data.satisfaccion_promedio,
          fecha: data.fecha,
        },
      },
      {
        status: 200,
        headers: {
          // Cache más largo para estadísticas
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
        },
      }
    );

  } catch (error) {
    console.error('Error en API stats:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
