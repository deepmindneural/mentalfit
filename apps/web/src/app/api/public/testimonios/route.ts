import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * API Route: GET /api/public/testimonios
 *
 * Obtiene testimonios activos para mostrar en landing page
 * No requiere autenticación - acceso público
 *
 * Query params:
 * - destacado: boolean (opcional) - filtra solo destacados
 * - categoria: string (opcional) - empresa|empleado|profesional
 * - limit: number (opcional, default: 10) - cantidad de resultados
 */
export async function GET(request: NextRequest) {
  try {
    // Crear cliente Supabase anónimo (sin autenticación requerida)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Extraer parámetros de consulta
    const searchParams = request.nextUrl.searchParams;
    const destacado = searchParams.get('destacado');
    const categoria = searchParams.get('categoria');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Validar límite
    if (limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: 'El parámetro limit debe estar entre 1 y 50' },
        { status: 400 }
      );
    }

    // Construir consulta con RLS (solo retornará testimonios activos)
    let query = supabase
      .from('testimonios')
      .select('*')
      .eq('activo', true)
      .order('calificacion', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    // Aplicar filtros opcionales
    if (destacado === 'true') {
      query = query.eq('destacado', true);
    }

    if (categoria && ['empresa', 'empleado', 'profesional'].includes(categoria)) {
      query = query.eq('categoria', categoria);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching testimonios:', error);
      return NextResponse.json(
        { error: 'Error al obtener testimonios' },
        { status: 500 }
      );
    }

    // Retornar con cache headers para optimización
    return NextResponse.json(
      {
        testimonios: data,
        total: data.length,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );

  } catch (error) {
    console.error('Error en API testimonios:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
