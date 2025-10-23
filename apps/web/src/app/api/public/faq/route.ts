import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * API Route: GET /api/public/faq
 *
 * Obtiene FAQs activas organizadas por categoría
 * No requiere autenticación - acceso público
 *
 * Query params:
 * - categoria: string (opcional) - general|empresas|empleados|profesionales
 * - limit: number (opcional, default: 50)
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const searchParams = request.nextUrl.searchParams;
    const categoria = searchParams.get('categoria');
    const limit = parseInt(searchParams.get('limit') || '50');

    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'El parámetro limit debe estar entre 1 y 100' },
        { status: 400 }
      );
    }

    // Validar categoría si se proporciona
    const categoriasValidas = ['general', 'empresas', 'empleados', 'profesionales'];
    if (categoria && !categoriasValidas.includes(categoria)) {
      return NextResponse.json(
        {
          error: 'Categoría inválida',
          categorias_validas: categoriasValidas
        },
        { status: 400 }
      );
    }

    let query = supabase
      .from('faqs')
      .select('*')
      .eq('activo', true)
      .order('orden', { ascending: true })
      .order('created_at', { ascending: true })
      .limit(limit);

    if (categoria) {
      query = query.eq('categoria', categoria);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching FAQs:', error);
      return NextResponse.json(
        { error: 'Error al obtener FAQs' },
        { status: 500 }
      );
    }

    // Agrupar por categoría si no se especificó una
    if (!categoria) {
      const faqsPorCategoria = data.reduce((acc, faq) => {
        if (!acc[faq.categoria]) {
          acc[faq.categoria] = [];
        }
        acc[faq.categoria].push(faq);
        return acc;
      }, {} as Record<string, typeof data>);

      return NextResponse.json(
        {
          faqs_por_categoria: faqsPorCategoria,
          total: data.length,
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
        faqs: data,
        total: data.length,
        categoria,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
        },
      }
    );

  } catch (error) {
    console.error('Error en API FAQ:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
