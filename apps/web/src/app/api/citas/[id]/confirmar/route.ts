import { NextResponse } from 'next/server'
import { crearCliente } from '@/lib/supabase/servidor'
import { manejarError, respuestaExitosa, extraerParametro, verificarAutenticacion } from '@/lib/api/utilidades-respuesta'

/**
 * PUT /api/citas/[id]/confirmar
 * Confirma una cita pendiente
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await crearCliente()

    // Verificar autenticación
    const usuario = await verificarAutenticacion(supabase)

    const citaId = extraerParametro(params, 'id')

    // Verificar que la cita existe y pertenece al usuario
    const { data: cita, error: errorCita } = await supabase
      .from('citas')
      .select('*, profesionales!citas_profesional_id_fkey(usuario_id)')
      .eq('id', citaId)
      .single()

    if (errorCita) throw errorCita
    if (!cita) {
      return respuestaExitosa(null, 'Cita no encontrada', 404)
    }

    // Verificar que el usuario es el profesional asignado
    if (cita.profesionales.usuario_id !== usuario.id) {
      return respuestaExitosa(null, 'No tienes permiso para confirmar esta cita', 403)
    }

    // Actualizar estado de la cita
    const { data, error } = await supabase
      .from('citas')
      .update({
        estado: 'confirmada',
        fecha_confirmacion: new Date().toISOString(),
        fecha_actualizacion: new Date().toISOString()
      })
      .eq('id', citaId)
      .select()
      .single()

    if (error) throw error

    // Crear notificación para el empleado
    await supabase.from('notificaciones').insert({
      usuario_id: cita.empleado_id,
      tipo: 'cita_confirmada',
      titulo: 'Cita confirmada',
      mensaje: `Tu cita ha sido confirmada por el profesional`,
      datos_adicionales: { cita_id: citaId }
    })

    return respuestaExitosa(data, 'Cita confirmada exitosamente')
  } catch (error) {
    return manejarError(error)
  }
}
