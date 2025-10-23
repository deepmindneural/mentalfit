import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

/**
 * GET /api/pacientes/[id]
 * Obtiene los detalles de un paciente específico
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

    const pacienteId = params.id;

    // Obtener datos del paciente
    const { data: paciente, error: errorPaciente } = await supabase
      .from('pacientes')
      .select(`
        *,
        usuarios (
          nombre_completo,
          email,
          telefono,
          avatar_url,
          fecha_creacion
        ),
        empresas (
          nombre
        )
      `)
      .eq('id', pacienteId)
      .single();

    if (errorPaciente || !paciente) {
      return NextResponse.json(
        { error: 'Paciente no encontrado' },
        { status: 404 }
      );
    }

    // Verificar autorización (el paciente mismo, su profesional, o admin)
    const { data: usuario } = await supabase
      .from('usuarios')
      .select('rol')
      .eq('id', session.user.id)
      .single();

    const esPaciente = (paciente as any).usuario_id === session.user.id;
    const esAdmin = usuario?.rol === 'super_admin';

    // Verificar si es el profesional del paciente
    const { count: tieneSesiones } = await supabase
      .from('sesiones')
      .select('*', { count: 'exact', head: true })
      .eq('paciente_id', pacienteId)
      .eq('profesional_id', session.user.id);

    const esProfesional = (tieneSesiones || 0) > 0;

    if (!esPaciente && !esProfesional && !esAdmin) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 403 }
      );
    }

    // Obtener historial de sesiones
    const { data: sesiones, error: errorSesiones } = await supabase
      .from('sesiones')
      .select(`
        *,
        profesionales (
          *,
          usuarios (
            nombre_completo
          )
        )
      `)
      .eq('paciente_id', pacienteId)
      .order('fecha_hora_inicio', { ascending: false });

    if (errorSesiones) {
      throw errorSesiones;
    }

    // Obtener evaluaciones
    const { data: evaluaciones, error: errorEvaluaciones } = await supabase
      .from('evaluaciones')
      .select('*')
      .eq('paciente_id', pacienteId)
      .order('fecha_evaluacion', { ascending: false });

    if (errorEvaluaciones) {
      throw errorEvaluaciones;
    }

    // Formatear respuesta
    const respuesta = {
      id: paciente.id,
      nombre: (paciente as any).usuarios?.nombre_completo || 'Sin nombre',
      email: (paciente as any).usuarios?.email || '',
      telefono: (paciente as any).usuarios?.telefono || '',
      avatar: (paciente as any).usuarios?.avatar_url,
      fechaNacimiento: paciente.fecha_nacimiento,
      genero: paciente.genero,
      ocupacion: paciente.ocupacion,
      motivoConsulta: paciente.motivo_consulta,
      historialMedico: paciente.historial_medico,
      contactoEmergencia: paciente.contacto_emergencia,
      estado: paciente.estado,
      empresa: (paciente as any).empresas?.nombre || null,
      fechaRegistro: (paciente as any).usuarios?.fecha_creacion,
      sesiones: sesiones?.map((s: any) => ({
        id: s.id,
        fechaHoraInicio: s.fecha_hora_inicio,
        fechaHoraFin: s.fecha_hora_fin,
        duracion: s.duracion_minutos,
        tipo: s.tipo_sesion,
        modalidad: s.modalidad,
        estado: s.estado,
        profesional: s.profesionales?.usuarios?.nombre_completo || 'Sin nombre',
        notas: s.notas_sesion,
      })) || [],
      evaluaciones: evaluaciones?.map((e) => ({
        id: e.id,
        tipo: e.tipo_evaluacion,
        fecha: e.fecha_evaluacion,
        puntuacion: e.puntuacion_total,
        interpretacion: e.interpretacion,
      })) || [],
      estadisticas: {
        totalSesiones: sesiones?.length || 0,
        sesionesCompletadas: sesiones?.filter((s: any) => s.estado === 'completada').length || 0,
        totalEvaluaciones: evaluaciones?.length || 0,
      },
    };

    return NextResponse.json(respuesta);
  } catch (error: any) {
    console.error('Error al obtener detalles del paciente:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/pacientes/[id]
 * Actualiza los datos de un paciente
 */
export async function PUT(
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

    const pacienteId = params.id;
    const body = await request.json();

    // Verificar que el usuario es el paciente, su profesional, o admin
    const { data: paciente } = await supabase
      .from('pacientes')
      .select('usuario_id')
      .eq('id', pacienteId)
      .single();

    if (!paciente) {
      return NextResponse.json(
        { error: 'Paciente no encontrado' },
        { status: 404 }
      );
    }

    const { data: usuario } = await supabase
      .from('usuarios')
      .select('rol')
      .eq('id', session.user.id)
      .single();

    const esPaciente = paciente.usuario_id === session.user.id;
    const esAdmin = usuario?.rol === 'super_admin';

    if (!esPaciente && !esAdmin) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 403 }
      );
    }

    // Actualizar paciente
    const { data: pacienteActualizado, error: errorActualizacion } = await supabase
      .from('pacientes')
      .update({
        fecha_nacimiento: body.fecha_nacimiento,
        genero: body.genero,
        ocupacion: body.ocupacion,
        motivo_consulta: body.motivo_consulta,
        historial_medico: body.historial_medico,
        contacto_emergencia: body.contacto_emergencia,
        estado: body.estado,
      })
      .eq('id', pacienteId)
      .select()
      .single();

    if (errorActualizacion) {
      throw errorActualizacion;
    }

    return NextResponse.json(pacienteActualizado);
  } catch (error: any) {
    console.error('Error al actualizar paciente:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
