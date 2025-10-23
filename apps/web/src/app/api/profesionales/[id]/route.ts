import { NextResponse } from 'next/server'
import { crearCliente } from '@/lib/supabase/servidor'
import { schemaActualizarProfesional } from '@/lib/api/schemas-validacion'
import {
  manejarError,
  respuestaExitosa,
  extraerParametro,
  verificarAutenticacion
} from '@/lib/api/utilidades-respuesta'

/**
 * GET /api/profesionales/[id]
 * Obtiene el perfil completo de un profesional
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await crearCliente()

    const profesionalId = extraerParametro(params, 'id')

    // Obtener perfil completo del profesional
    const { data, error } = await supabase
      .from('profesionales')
      .select(`
        *,
        usuario:usuarios!profesionales_usuario_id_fkey(
          id,
          nombre,
          apellidos,
          email,
          avatar,
          telefono,
          idioma,
          zona_horaria
        ),
        estadisticas:estadisticas_profesionales(
          total_sesiones,
          sesiones_completadas,
          sesiones_canceladas,
          tasa_asistencia,
          promedio_calificacion,
          total_resenas,
          ingresos_totales
        ),
        resenas:resenas_profesionales(
          id,
          puntuacion,
          titulo,
          comentario,
          fecha_creacion,
          empleado:empleados!resenas_profesionales_empleado_id_fkey(
            usuarios!empleados_usuario_id_fkey(nombre, apellidos, avatar)
          )
        )
      `)
      .eq('id', profesionalId)
      .single()

    if (error) throw error

    if (!data) {
      return respuestaExitosa(null, 'Profesional no encontrado', 404)
    }

    // Obtener disponibilidad del profesional
    const { data: disponibilidad } = await supabase
      .from('disponibilidad_profesionales')
      .select('*')
      .eq('profesional_id', profesionalId)
      .eq('activo', true)
      .order('dia_semana')

    // Agregar disponibilidad al perfil
    const perfilCompleto = {
      ...data,
      disponibilidad: disponibilidad || []
    }

    return respuestaExitosa(perfilCompleto)
  } catch (error) {
    return manejarError(error)
  }
}

/**
 * PUT /api/profesionales/[id]
 * Actualiza el perfil de un profesional
 */
export async function PUT(
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
      return respuestaExitosa(null, 'No tienes permiso para actualizar este perfil', 403)
    }

    // Parsear y validar body
    const body = await request.json()
    const datos = schemaActualizarProfesional.parse(body)

    // Actualizar perfil
    const { data, error } = await supabase
      .from('profesionales')
      .update({
        ...datos,
        fecha_actualizacion: new Date().toISOString()
      })
      .eq('id', profesionalId)
      .select()
      .single()

    if (error) throw error

    return respuestaExitosa(data, 'Perfil actualizado exitosamente')
  } catch (error) {
    return manejarError(error)
  }
}
