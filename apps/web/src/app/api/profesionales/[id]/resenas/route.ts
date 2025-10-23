import { NextResponse } from 'next/server'
import { crearCliente } from '@/lib/supabase/servidor'
import { schemaCrearResena } from '@/lib/api/schemas-validacion'
import {
  manejarError,
  respuestaExitosa,
  extraerParametro,
  verificarAutenticacion,
  extraerPaginacion,
  crearRespuestaPaginada
} from '@/lib/api/utilidades-respuesta'

/**
 * GET /api/profesionales/[id]/resenas
 * Obtiene las reseñas de un profesional con paginación
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await crearCliente()

    const profesionalId = extraerParametro(params, 'id')
    const { searchParams } = new URL(request.url)
    const { pagina, limite, offset } = extraerPaginacion(searchParams)

    const { data, error, count } = await supabase
      .from('resenas_profesionales')
      .select(`
        *,
        empleado:empleados!resenas_profesionales_empleado_id_fkey(
          id,
          usuarios!empleados_usuario_id_fkey(nombre, apellidos, avatar)
        )
      `, { count: 'exact' })
      .eq('profesional_id', profesionalId)
      .order('fecha_creacion', { ascending: false })
      .range(offset, offset + limite - 1)

    if (error) throw error

    const respuesta = crearRespuestaPaginada(data || [], count || 0, { pagina, limite, offset })

    return respuestaExitosa(respuesta)
  } catch (error) {
    return manejarError(error)
  }
}

/**
 * POST /api/profesionales/[id]/resenas
 * Crea una nueva reseña para el profesional
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

    // Parsear y validar body
    const body = await request.json()
    const datos = schemaCrearResena.parse(body)

    // Verificar que el usuario es un empleado
    const { data: empleado } = await supabase
      .from('empleados')
      .select('id')
      .eq('usuario_id', usuario.id)
      .single()

    if (!empleado) {
      return respuestaExitosa(null, 'Solo empleados pueden dejar reseñas', 403)
    }

    // Si se proporciona sesionId, verificar que fue completada
    if (datos.sesionId) {
      const { data: sesion } = await supabase
        .from('sesiones')
        .select('estado, profesional_id')
        .eq('id', datos.sesionId)
        .single()

      if (!sesion || sesion.estado !== 'completada') {
        return respuestaExitosa(null, 'Solo puedes reseñar sesiones completadas', 400)
      }

      if (sesion.profesional_id !== profesionalId) {
        return respuestaExitosa(null, 'La sesión no corresponde a este profesional', 400)
      }

      // Verificar que no haya reseñado ya esta sesión
      const { data: resenaExistente } = await supabase
        .from('resenas_profesionales')
        .select('id')
        .eq('sesion_id', datos.sesionId)
        .single()

      if (resenaExistente) {
        return respuestaExitosa(null, 'Ya has reseñado esta sesión', 400)
      }
    }

    // Crear reseña
    const { data, error } = await supabase
      .from('resenas_profesionales')
      .insert({
        profesional_id: profesionalId,
        empleado_id: empleado.id,
        sesion_id: datos.sesionId,
        puntuacion: datos.puntuacion,
        titulo: datos.titulo,
        comentario: datos.comentario,
        aspectos_positivos: datos.aspectosPositivos,
        aspectos_mejorar: datos.aspectosMejorar,
        recomendaria: datos.recomendaria
      })
      .select()
      .single()

    if (error) throw error

    // Actualizar calificación promedio del profesional (trigger en BD lo hace automáticamente)

    return respuestaExitosa(data, 'Reseña creada exitosamente', 201)
  } catch (error) {
    return manejarError(error)
  }
}
