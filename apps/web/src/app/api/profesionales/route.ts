import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

/**
 * GET /api/profesionales
 * Obtiene la lista de profesionales
 * Query params: usuario_id (para obtener profesional por usuario)
 */
export async function GET(request: NextRequest) {
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

    const searchParams = request.nextUrl.searchParams;
    const usuarioId = searchParams.get('usuario_id');

    // Si se proporciona usuario_id, buscar profesional específico
    if (usuarioId) {
      const { data: profesional, error: errorProfesional } = await supabase
        .from('profesionales')
        .select('*')
        .eq('usuario_id', usuarioId)
        .single();

      if (errorProfesional) {
        return NextResponse.json([]);
      }

      return NextResponse.json([profesional]);
    }

    // Obtener todos los profesionales verificados
    const { data: profesionales, error: errorProfesionales } = await supabase
      .from('profesionales')
      .select(`
        *,
        usuarios (
          nombre_completo,
          email,
          avatar_url
        )
      `)
      .eq('estado_verificacion', 'verificado')
      .order('calificacion_promedio', { ascending: false });

    if (errorProfesionales) {
      throw errorProfesionales;
    }

    return NextResponse.json(profesionales || []);
  } catch (error: any) {
    console.error('Error al obtener profesionales:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
