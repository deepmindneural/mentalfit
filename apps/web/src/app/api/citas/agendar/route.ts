import { NextResponse } from 'next/server'
import { crearCliente } from '@/lib/supabase/servidor'
import { schemaAgendarCita } from '@/lib/api/schemas-validacion'
import { manejarError, respuestaExitosa, verificarAutenticacion } from '@/lib/api/utilidades-respuesta'

/**
 * POST /api/citas/agendar
 * Agenda una nueva cita usando la función validada de la BD
 */
export async function POST(request: Request) {
  try {
    const supabase = await crearCliente()

    // Verificar autenticación
    const usuario = await verificarAutenticacion(supabase)

    // Parsear y validar body
    const body = await request.json()
    const datos = schemaAgendarCita.parse(body)

    // Llamar a la función de BD que valida disponibilidad y agenda
    const { data, error } = await supabase.rpc('agendar_cita_validada', {
      p_empleado_id: datos.empleadoId,
      p_profesional_id: datos.profesionalId,
      p_fecha_cita: datos.fechaCita,
      p_hora_inicio: datos.horaInicio,
      p_duracion_minutos: datos.duracionMinutos,
      p_modalidad: datos.modalidad,
      p_motivo_consulta: datos.motivoConsulta,
      p_notas_adicionales: datos.notasAdicionales || null
    })

    if (error) throw error

    // Crear notificación para el profesional
    await supabase.from('notificaciones').insert({
      usuario_id: datos.profesionalId,
      tipo: 'cita_confirmada',
      titulo: 'Nueva cita agendada',
      mensaje: `Tienes una nueva cita el ${datos.fechaCita} a las ${datos.horaInicio}`,
      datos_adicionales: {
        cita_id: data.cita_id,
        empleado_id: datos.empleadoId
      }
    })

    return respuestaExitosa(
      {
        citaId: data.cita_id,
        estadoCita: data.estado_cita,
        fechaCita: datos.fechaCita,
        horaInicio: datos.horaInicio
      },
      'Cita agendada exitosamente',
      201
    )
  } catch (error) {
    return manejarError(error)
  }
}
