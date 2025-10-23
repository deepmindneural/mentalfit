import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * API Route: GET /api/public/webinars
 *
 * Obtiene webinars activos (próximos y grabados)
 * No requiere autenticación - acceso público
 *
 * Query params:
 * - tipo: string (opcional) - proximo|grabado
 * - categoria: string (opcional)
 * - limit: number (opcional, default: 10)
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const searchParams = request.nextUrl.searchParams;
    const tipo = searchParams.get('tipo');
    const categoria = searchParams.get('categoria');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: 'El parámetro limit debe estar entre 1 y 50' },
        { status: 400 }
      );
    }

    // Validar tipo si se proporciona
    if (tipo && !['proximo', 'grabado'].includes(tipo)) {
      return NextResponse.json(
        {
          error: 'Tipo inválido',
          tipos_validos: ['proximo', 'grabado']
        },
        { status: 400 }
      );
    }

    let query = supabase
      .from('webinars')
      .select('*')
      .eq('activo', true)
      .limit(limit);

    if (tipo) {
      query = query.eq('tipo', tipo);

      // Ordenar según el tipo
      if (tipo === 'proximo') {
        // Próximos: del más cercano al más lejano
        query = query
          .gte('fecha_hora', new Date().toISOString())
          .order('fecha_hora', { ascending: true });
      } else {
        // Grabados: del más reciente al más antiguo
        query = query.order('fecha_hora', { ascending: false });
      }
    } else {
      // Sin filtro de tipo: ordenar por fecha
      query = query.order('fecha_hora', { ascending: false });
    }

    if (categoria) {
      query = query.eq('categoria', categoria);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching webinars:', error);
      return NextResponse.json(
        { error: 'Error al obtener webinars' },
        { status: 500 }
      );
    }

    // Separar próximos y grabados si no se especificó tipo
    if (!tipo) {
      const ahora = new Date();
      const proximos = data.filter(w => w.fecha_hora && new Date(w.fecha_hora) > ahora);
      const grabados = data.filter(w => w.tipo === 'grabado' || (w.fecha_hora && new Date(w.fecha_hora) <= ahora));

      return NextResponse.json(
        {
          proximos: proximos.sort((a, b) =>
            new Date(a.fecha_hora!).getTime() - new Date(b.fecha_hora!).getTime()
          ),
          grabados: grabados.sort((a, b) =>
            new Date(b.fecha_hora!).getTime() - new Date(a.fecha_hora!).getTime()
          ),
          total: data.length,
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          },
        }
      );
    }

    return NextResponse.json(
      {
        webinars: data,
        total: data.length,
        tipo,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );

  } catch (error) {
    console.error('Error en API webinars:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
