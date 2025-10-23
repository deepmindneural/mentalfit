import { NextResponse } from 'next/server'
import { crearCliente } from '@/lib/supabase/servidor'
import { schemaCancelarCita } from '@/lib/api/schemas-validacion'
import { manejarError, respuestaExitosa, extraerParametro, verificarAutenticacion } from '@/lib/api/utilidades-respuesta'

/**
 * POST /api/citas/[id]/cancelar
 * Cancela una cita con motivo
 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await crearCliente()

    // Verificar autenticación
    const usuario = await verificarAutenticacion(supabase)

    const citaId = extraerParametro(params, 'id')
    const body = await request.json()
    const datos = schemaCancelarCita.parse(body)

    // Verificar que la cita existe
    const { data: cita, error: errorCita } = await supabase
      .from('citas')
      .select('*, profesionales!citas_profesional_id_fkey(usuario_id)')
      .eq('id', citaId)
      .single()

    if (errorCita) throw errorCita
    if (!cita) {
      return respuestaExitosa(null, 'Cita no encontrada', 404)
    }

    // Verificar permisos (solo empleado o profesional pueden cancelar)
    const esEmpleado = cita.empleado_id === usuario.id
    const esProfesional = cita.profesionales.usuario_id === usuario.id

    if (!esEmpleado && !esProfesional) {
      return respuestaExitosa(null, 'No tienes permiso para cancelar esta cita', 403)
    }

    // Actualizar estado de la cita
    const { data, error } = await supabase
      .from('citas')
      .update({
        estado: 'cancelada',
        motivo_cancelacion: datos.motivoCancelacion,
        cancelada_por: datos.canceladoPor,
        fecha_cancelacion: new Date().toISOString(),
        fecha_actualizacion: new Date().toISOString()
      })
      .eq('id', citaId)
      .select()
      .single()

    if (error) throw error

    // Notificar a la otra parte
    const destinatarioId = esEmpleado ? cita.profesionales.usuario_id : cita.empleado_id
    await supabase.from('notificaciones').insert({
      usuario_id: destinatarioId,
      tipo: 'cita_cancelada',
      titulo: 'Cita cancelada',
      mensaje: `Una cita ha sido cancelada. Motivo: ${datos.motivoCancelacion}`,
      datos_adicionales: { cita_id: citaId }
    })

    return respuestaExitosa(data, 'Cita cancelada exitosamente')
  } catch (error) {
    return manejarError(error)
  }
}
