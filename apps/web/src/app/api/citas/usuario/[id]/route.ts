import { NextResponse } from 'next/server'
import { crearCliente } from '@/lib/supabase/servidor'
import {
  manejarError,
  respuestaExitosa,
  extraerParametro,
  verificarAutenticacion,
  extraerPaginacion,
  crearRespuestaPaginada
} from '@/lib/api/utilidades-respuesta'

/**
 * GET /api/citas/usuario/[id]
 * Obtiene todas las citas de un usuario con filtros opcionales
 * Query params: estado, fechaInicio, fechaFin, pagina, limite
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

    // Verificar que el usuario solo accede a sus propias citas o es admin
    if (usuario.id !== usuarioId) {
      const { data: usuarioData } = await supabase
        .from('usuarios')
        .select('tipo_usuario')
        .eq('id', usuario.id)
        .single()

      if (usuarioData?.tipo_usuario !== 'admin') {
        return respuestaExitosa(null, 'No tienes permiso para ver estas citas', 403)
      }
    }

    // Extraer query params
    const { searchParams } = new URL(request.url)
    const estado = searchParams.get('estado')
    const fechaInicio = searchParams.get('fechaInicio')
    const fechaFin = searchParams.get('fechaFin')
    const { pagina, limite, offset } = extraerPaginacion(searchParams)

    // Construir query base
    let query = supabase
      .from('citas')
      .select(`
        *,
        empleado:empleados!citas_empleado_id_fkey(
          id,
          usuario_id,
          usuarios!empleados_usuario_id_fkey(nombre, apellidos, email)
        ),
        profesional:profesionales!citas_profesional_id_fkey(
          id,
          usuario_id,
          especialidades,
          usuarios!profesionales_usuario_id_fkey(nombre, apellidos, avatar)
        )
      `, { count: 'exact' })
      .or(`empleado_id.eq.${usuarioId},profesional_id.in.(select id from profesionales where usuario_id='${usuarioId}')`)
      .order('fecha_cita', { ascending: false })
      .order('hora_inicio', { ascending: false })

    // Aplicar filtros opcionales
    if (estado) {
      query = query.eq('estado', estado)
    }
    if (fechaInicio) {
      query = query.gte('fecha_cita', fechaInicio)
    }
    if (fechaFin) {
      query = query.lte('fecha_cita', fechaFin)
    }

    // Aplicar paginación
    query = query.range(offset, offset + limite - 1)

    const { data, error, count } = await query

    if (error) throw error

    const respuesta = crearRespuestaPaginada(data || [], count || 0, { pagina, limite, offset })

    return respuestaExitosa(respuesta)
  } catch (error) {
    return manejarError(error)
  }
}
