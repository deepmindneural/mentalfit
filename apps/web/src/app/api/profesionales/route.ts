import { NextResponse } from 'next/server'
import { crearCliente } from '@/lib/supabase/servidor'
import { schemaBuscarProfesionales } from '@/lib/api/schemas-validacion'
import {
  manejarError,
  respuestaExitosa,
  extraerPaginacion,
  crearRespuestaPaginada
} from '@/lib/api/utilidades-respuesta'

// Forzar renderizado dinámico para evitar pre-renderizado estático
export const dynamic = 'force-dynamic'

/**
 * GET /api/profesionales
 * Busca profesionales con filtros opcionales
 * Query params: especialidades[], modalidad, tarifaMax, idioma, busqueda, disponibleHoy, calificacionMin, pagina, limite
 */
export async function GET(request: Request) {
  try {
    const supabase = await crearCliente()

    // Extraer y parsear query params
    const { searchParams } = new URL(request.url)

    const filtros = {
      especialidades: searchParams.getAll('especialidades'),
      modalidad: searchParams.get('modalidad'),
      tarifaMax: searchParams.get('tarifaMax') ? parseFloat(searchParams.get('tarifaMax')!) : undefined,
      idioma: searchParams.get('idioma'),
      busqueda: searchParams.get('busqueda'),
      disponibleHoy: searchParams.get('disponibleHoy') === 'true',
      calificacionMin: searchParams.get('calificacionMin') ? parseFloat(searchParams.get('calificacionMin')!) : undefined
    }

    // Validar filtros
    const datosValidados = schemaBuscarProfesionales.parse(filtros)
    const { pagina, limite, offset } = extraerPaginacion(searchParams)

    // Construir query base
    let query = supabase
      .from('profesionales')
      .select(`
        *,
        usuario:usuarios!profesionales_usuario_id_fkey(
          id,
          nombre,
          apellidos,
          email,
          avatar,
          idioma
        ),
        estadisticas_profesionales(
          total_sesiones,
          sesiones_completadas,
          tasa_asistencia,
          promedio_calificacion
        )
      `, { count: 'exact' })
      .eq('verificado', true)
      .eq('disponible', true)
      .order('calificacion_promedio', { ascending: false })

    // Aplicar filtros
    if (datosValidados.especialidades && datosValidados.especialidades.length > 0) {
      query = query.contains('especialidades', datosValidados.especialidades)
    }

    if (datosValidados.modalidad) {
      query = query.contains('modalidades_atencion', [datosValidados.modalidad])
    }

    if (datosValidados.tarifaMax) {
      query = query.lte('tarifa_hora', datosValidados.tarifaMax)
    }

    if (datosValidados.idioma) {
      query = query.contains('idiomas_atencion', [datosValidados.idioma])
    }

    if (datosValidados.calificacionMin) {
      query = query.gte('calificacion_promedio', datosValidados.calificacionMin)
    }

    if (datosValidados.busqueda) {
      query = query.or(`biografia.ilike.%${datosValidados.busqueda}%,titulacion.ilike.%${datosValidados.busqueda}%`)
    }

    // Aplicar paginación
    query = query.range(offset, offset + limite - 1)

    const { data, error, count } = await query

    if (error) throw error

    // Si se requiere filtrar por disponibilidad hoy, hacer una segunda consulta
    let profesionalesFiltrados = data || []

    if (datosValidados.disponibleHoy && profesionalesFiltrados.length > 0) {
      const hoy = new Date()
      const diaSemana = hoy.getDay()

      const profesionalesIds = profesionalesFiltrados.map(p => p.id)

      const { data: disponibilidadHoy } = await supabase
        .from('disponibilidad_profesionales')
        .select('profesional_id')
        .in('profesional_id', profesionalesIds)
        .eq('dia_semana', diaSemana)
        .eq('activo', true)

      const idsDisponibles = new Set(disponibilidadHoy?.map(d => d.profesional_id) || [])
      profesionalesFiltrados = profesionalesFiltrados.filter(p => idsDisponibles.has(p.id))
    }

    const respuesta = crearRespuestaPaginada(
      profesionalesFiltrados,
      count || 0,
      { pagina, limite, offset }
    )

    return respuestaExitosa(respuesta)
  } catch (error) {
    return manejarError(error)
  }
}
