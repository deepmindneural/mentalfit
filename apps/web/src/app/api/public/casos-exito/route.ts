import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * API Route: GET /api/public/casos-exito
 *
 * Obtiene casos de éxito publicados para landing page
 * No requiere autenticación - acceso público
 *
 * Query params:
 * - industria: string (opcional) - filtra por industria
 * - slug: string (opcional) - obtiene un caso específico
 * - limit: number (opcional, default: 10)
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const searchParams = request.nextUrl.searchParams;
    const industria = searchParams.get('industria');
    const slug = searchParams.get('slug');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: 'El parámetro limit debe estar entre 1 y 50' },
        { status: 400 }
      );
    }

    // Si se solicita un caso específico por slug
    if (slug) {
      const { data, error } = await supabase
        .from('casos_exito')
        .select('*')
        .eq('publicado', true)
        .eq('slug', slug)
        .single();

      if (error || !data) {
        return NextResponse.json(
          { error: 'Caso de éxito no encontrado' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { caso_exito: data },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
          },
        }
      );
    }

    // Consulta general con filtros
    let query = supabase
      .from('casos_exito')
      .select('*')
      .eq('publicado', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (industria) {
      query = query.eq('industria', industria);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching casos_exito:', error);
      return NextResponse.json(
        { error: 'Error al obtener casos de éxito' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        casos_exito: data,
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
    console.error('Error en API casos-exito:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
