import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * API Route: GET /api/public/blog
 *
 * Obtiene posts de blog publicados para landing page
 * No requiere autenticación - acceso público
 *
 * Query params:
 * - categoria: string (opcional)
 * - destacado: boolean (opcional)
 * - slug: string (opcional) - obtiene un post específico
 * - limit: number (opcional, default: 10)
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const searchParams = request.nextUrl.searchParams;
    const categoria = searchParams.get('categoria');
    const destacado = searchParams.get('destacado');
    const slug = searchParams.get('slug');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: 'El parámetro limit debe estar entre 1 y 50' },
        { status: 400 }
      );
    }

    // Si se solicita un post específico por slug
    if (slug) {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('publicado', true)
        .eq('slug', slug)
        .single();

      if (error || !data) {
        return NextResponse.json(
          { error: 'Post no encontrado' },
          { status: 404 }
        );
      }

      // Incrementar contador de vistas
      await supabase
        .from('blog_posts')
        .update({ vistas: (data.vistas || 0) + 1 })
        .eq('id', data.id);

      return NextResponse.json(
        { post: data },
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
      .from('blog_posts')
      .select('*')
      .eq('publicado', true)
      .order('fecha_publicacion', { ascending: false })
      .limit(limit);

    if (categoria) {
      query = query.eq('categoria', categoria);
    }

    if (destacado === 'true') {
      query = query.eq('destacado', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching blog_posts:', error);
      return NextResponse.json(
        { error: 'Error al obtener posts del blog' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        posts: data,
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
    console.error('Error en API blog:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
