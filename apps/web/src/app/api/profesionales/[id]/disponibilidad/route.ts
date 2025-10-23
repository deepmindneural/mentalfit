import { NextResponse } from 'next/server'
import { crearCliente } from '@/lib/supabase/servidor'
import { schemaCrearDisponibilidad } from '@/lib/api/schemas-validacion'
import {
  manejarError,
  respuestaExitosa,
  extraerParametro,
  verificarAutenticacion
} from '@/lib/api/utilidades-respuesta'

/**
 * GET /api/profesionales/[id]/disponibilidad
 * Obtiene la disponibilidad del profesional, opcionalmente calculada para rango de fechas
 * Query params: fechaInicio, fechaFin (opcional, usa función de BD)
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await crearCliente()

    const profesionalId = extraerParametro(params, 'id')
    const { searchParams } = new URL(request.url)
    const fechaInicio = searchParams.get('fechaInicio')
    const fechaFin = searchParams.get('fechaFin')

    // Si se proporcionan fechas, usar la función de BD para calcular disponibilidad
    if (fechaInicio && fechaFin) {
      const { data, error } = await supabase.rpc('calcular_disponibilidad_profesional', {
        p_profesional_id: profesionalId,
        p_fecha_inicio: fechaInicio,
        p_fecha_fin: fechaFin
      })

      if (error) throw error

      return respuestaExitosa({
        profesionalId,
        fechaInicio,
        fechaFin,
        disponibilidad: data
      })
    }

    // Si no hay fechas, retornar la disponibilidad recurrente
    const { data, error } = await supabase
      .from('disponibilidad_profesionales')
      .select('*')
      .eq('profesional_id', profesionalId)
      .eq('activo', true)
      .order('dia_semana')
      .order('hora_inicio')

    if (error) throw error

    return respuestaExitosa({
      profesionalId,
      disponibilidadRecurrente: data || []
    })
  } catch (error) {
    return manejarError(error)
  }
}

/**
 * POST /api/profesionales/[id]/disponibilidad
 * Crea un nuevo horario de disponibilidad para el profesional
 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await crearCliente()

    // Verificar autenticación
    const usuario = await verificarAutenticacion(supabase)

    const profesionalId = extraerParametro(params, 'id')

    // Verificar que el profesional pertenece al usuario autenticado
    const { data: profesional } = await supabase
      .from('profesionales')
      .select('usuario_id')
      .eq('id', profesionalId)
      .single()

    if (!profesional || profesional.usuario_id !== usuario.id) {
      return respuestaExitosa(null, 'No tienes permiso para modificar esta disponibilidad', 403)
    }

    // Parsear y validar body
    const body = await request.json()
    const datos = schemaCrearDisponibilidad.parse(body)

    // Validar que hora_fin sea mayor que hora_inicio
    if (datos.horaInicio >= datos.horaFin) {
      return respuestaExitosa(
        null,
        'La hora de fin debe ser mayor que la hora de inicio',
        400
      )
    }

    // Crear disponibilidad
    const { data, error } = await supabase
      .from('disponibilidad_profesionales')
      .insert({
        profesional_id: profesionalId,
        dia_semana: datos.diaSemana,
        hora_inicio: datos.horaInicio,
        hora_fin: datos.horaFin,
        fecha_inicio: datos.fechaInicio,
        fecha_fin: datos.fechaFin,
        es_recurrente: datos.esRecurrente,
        activo: true
      })
      .select()
      .single()

    if (error) throw error

    return respuestaExitosa(data, 'Disponibilidad creada exitosamente', 201)
  } catch (error) {
    return manejarError(error)
  }
}

/**
 * DELETE /api/profesionales/[id]/disponibilidad
 * Elimina un horario de disponibilidad
 */
export async function DELETE(request: Request) {
  try {
    const supabase = await crearCliente()

    // Verificar autenticación
    const usuario = await verificarAutenticacion(supabase)

    const { searchParams } = new URL(request.url)
    const disponibilidadId = searchParams.get('disponibilidadId')

    if (!disponibilidadId) {
      return respuestaExitosa(null, 'ID de disponibilidad requerido', 400)
    }

    // Verificar permisos
    const { data: disponibilidad } = await supabase
      .from('disponibilidad_profesionales')
      .select('profesional_id, profesionales!disponibilidad_profesionales_profesional_id_fkey(usuario_id)')
      .eq('id', disponibilidadId)
      .single()

    const profesional = Array.isArray(disponibilidad?.profesionales)
      ? disponibilidad.profesionales[0]
      : disponibilidad?.profesionales;

    if (!disponibilidad || !profesional || profesional.usuario_id !== usuario.id) {
      return respuestaExitosa(null, 'No tienes permiso para eliminar esta disponibilidad', 403)
    }

    // Desactivar (soft delete)
    const { error } = await supabase
      .from('disponibilidad_profesionales')
      .update({ activo: false })
      .eq('id', disponibilidadId)

    if (error) throw error

    return respuestaExitosa(null, 'Disponibilidad eliminada exitosamente')
  } catch (error) {
    return manejarError(error)
  }
}
