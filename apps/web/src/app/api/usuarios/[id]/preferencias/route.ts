import { NextResponse } from 'next/server'
import { crearCliente } from '@/lib/supabase/servidor'
import { schemaActualizarPreferencias } from '@/lib/api/schemas-validacion'
import {
  manejarError,
  respuestaExitosa,
  extraerParametro,
  verificarAutenticacion
} from '@/lib/api/utilidades-respuesta'

/**
 * GET /api/usuarios/[id]/preferencias
 * Obtiene las preferencias de notificaciones del usuario
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await crearCliente()

    // Verificar autenticación
    const usuario = await verificarAutenticacion(supabase)

    const usuarioId = extraerParametro(params, 'id')

    // Verificar permisos
    if (usuario.id !== usuarioId) {
      return respuestaExitosa(null, 'No tienes permiso para ver estas preferencias', 403)
    }

    const { data, error } = await supabase
      .from('usuarios')
      .select('notificaciones_email, notificaciones_push, notificaciones_sms, recordatorios_citas, horas_antes_cita_recordatorio, configuracion_privacidad')
      .eq('id', usuarioId)
      .single()

    if (error) throw error

    return respuestaExitosa(data)
  } catch (error) {
    return manejarError(error)
  }
}

/**
 * PUT /api/usuarios/[id]/preferencias
 * Actualiza las preferencias de notificaciones del usuario
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await crearCliente()

    // Verificar autenticación
    const usuario = await verificarAutenticacion(supabase)

    const usuarioId = extraerParametro(params, 'id')

    // Verificar permisos
    if (usuario.id !== usuarioId) {
      return respuestaExitosa(null, 'No tienes permiso para modificar estas preferencias', 403)
    }

    // Parsear y validar body
    const body = await request.json()
    const datos = schemaActualizarPreferencias.parse(body)

    // Actualizar preferencias
    const { data, error } = await supabase
      .from('usuarios')
      .update({
        ...datos,
        fecha_actualizacion: new Date().toISOString()
      })
      .eq('id', usuarioId)
      .select('notificaciones_email, notificaciones_push, notificaciones_sms, recordatorios_citas, horas_antes_cita_recordatorio, configuracion_privacidad')
      .single()

    if (error) throw error

    return respuestaExitosa(data, 'Preferencias actualizadas exitosamente')
  } catch (error) {
    return manejarError(error)
  }
}
