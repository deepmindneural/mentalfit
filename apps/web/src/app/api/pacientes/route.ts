import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

/**
 * GET /api/pacientes
 * Obtiene la lista de pacientes del profesional autenticado
 * Query params: profesional_id, estado, busqueda
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

    // Obtener parámetros de búsqueda
    const searchParams = request.nextUrl.searchParams;
    const profesionalId = searchParams.get('profesional_id');
    const estadoFiltro = searchParams.get('estado');
    const busqueda = searchParams.get('busqueda');

    if (!profesionalId) {
      return NextResponse.json(
        { error: 'Falta profesional_id' },
        { status: 400 }
      );
    }

    // Obtener IDs únicos de pacientes que tienen sesiones con este profesional
    const { data: sesiones, error: errorSesiones } = await supabase
      .from('sesiones')
      .select('paciente_id')
      .eq('profesional_id', profesionalId);

    if (errorSesiones) {
      throw errorSesiones;
    }

    // Extraer IDs únicos
    const pacienteIds = [...new Set(sesiones?.map(s => s.paciente_id) || [])];

    if (pacienteIds.length === 0) {
      return NextResponse.json([]);
    }

    // Construir consulta de pacientes
    let consulta = supabase
      .from('pacientes')
      .select(`
        *,
        usuarios (
          nombre_completo,
          email,
          telefono,
          avatar_url
        )
      `)
      .in('id', pacienteIds);

    // Aplicar filtro de estado si existe
    if (estadoFiltro) {
      consulta = consulta.eq('estado', estadoFiltro);
    }

    const { data: pacientes, error: errorPacientes } = await consulta;

    if (errorPacientes) {
      throw errorPacientes;
    }

    // Para cada paciente, obtener información adicional de sesiones
    const pacientesConDatos = await Promise.all(
      (pacientes || []).map(async (paciente: any) => {
        // Contar sesiones totales
        const { count: totalSesiones } = await supabase
          .from('sesiones')
          .select('*', { count: 'exact', head: true })
          .eq('paciente_id', paciente.id)
          .eq('profesional_id', profesionalId);

        // Obtener última sesión
        const { data: ultimaSesion } = await supabase
          .from('sesiones')
          .select('fecha_hora_inicio')
          .eq('paciente_id', paciente.id)
          .eq('profesional_id', profesionalId)
          .order('fecha_hora_inicio', { ascending: false })
          .limit(1)
          .single();

        // Obtener próxima sesión
        const ahora = new Date().toISOString();
        const { data: proximaSesion } = await supabase
          .from('sesiones')
          .select('fecha_hora_inicio')
          .eq('paciente_id', paciente.id)
          .eq('profesional_id', profesionalId)
          .gte('fecha_hora_inicio', ahora)
          .in('estado', ['programada', 'confirmada'])
          .order('fecha_hora_inicio', { ascending: true })
          .limit(1)
          .single();

        return {
          id: paciente.id,
          nombre: paciente.usuarios?.nombre_completo || 'Sin nombre',
          email: paciente.usuarios?.email || '',
          telefono: paciente.usuarios?.telefono || '',
          avatar: paciente.usuarios?.avatar_url,
          estado: paciente.estado,
          totalSesiones: totalSesiones || 0,
          ultimaSesion: ultimaSesion?.fecha_hora_inicio || null,
          proximaSesion: proximaSesion?.fecha_hora_inicio || null,
          fechaNacimiento: paciente.fecha_nacimiento,
          genero: paciente.genero,
          ocupacion: paciente.ocupacion,
          motivoConsulta: paciente.motivo_consulta,
        };
      })
    );

    // Aplicar búsqueda en memoria (búsqueda por nombre o email)
    let pacientesFiltrados = pacientesConDatos;
    if (busqueda) {
      const busquedaLower = busqueda.toLowerCase();
      pacientesFiltrados = pacientesConDatos.filter(
        (p) =>
          p.nombre.toLowerCase().includes(busquedaLower) ||
          p.email.toLowerCase().includes(busquedaLower)
      );
    }

    return NextResponse.json(pacientesFiltrados);
  } catch (error: any) {
    console.error('Error al obtener pacientes:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/pacientes
 * Crea un nuevo paciente (solo para profesionales o administradores)
 */
export async function POST(request: NextRequest) {
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

    // Verificar que el usuario es profesional o admin
    const { data: usuario } = await supabase
      .from('usuarios')
      .select('rol')
      .eq('id', session.user.id)
      .single();

    if (!usuario || !['profesional', 'super_admin'].includes(usuario.rol)) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Crear paciente
    const { data: paciente, error: errorPaciente } = await supabase
      .from('pacientes')
      .insert({
        usuario_id: body.usuario_id,
        empresa_id: body.empresa_id || null,
        fecha_nacimiento: body.fecha_nacimiento,
        genero: body.genero,
        ocupacion: body.ocupacion,
        motivo_consulta: body.motivo_consulta,
        historial_medico: body.historial_medico || {},
        contacto_emergencia: body.contacto_emergencia || {},
        consentimiento_tratamiento: body.consentimiento_tratamiento || false,
        consentimiento_datos: body.consentimiento_datos || false,
        estado: 'pendiente',
      })
      .select()
      .single();

    if (errorPaciente) {
      throw errorPaciente;
    }

    return NextResponse.json(paciente, { status: 201 });
  } catch (error: any) {
    console.error('Error al crear paciente:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
