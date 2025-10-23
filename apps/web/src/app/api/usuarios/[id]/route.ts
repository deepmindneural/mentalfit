import { NextResponse } from 'next/server'
import { crearCliente } from '@/lib/supabase/servidor'
import { schemaActualizarUsuario } from '@/lib/api/schemas-validacion'
import {
  manejarError,
  respuestaExitosa,
  extraerParametro,
  verificarAutenticacion
} from '@/lib/api/utilidades-respuesta'

/**
 * GET /api/usuarios/[id]
 * Obtiene información de un usuario
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
      const { data: usuarioAuth } = await supabase
        .from('usuarios')
        .select('tipo_usuario')
        .eq('id', usuario.id)
        .single()

      if (usuarioAuth?.tipo_usuario !== 'admin') {
        return respuestaExitosa(null, 'No tienes permiso para ver este usuario', 403)
      }
    }

    // Obtener usuario con sus relaciones
    const { data, error } = await supabase
      .from('usuarios')
      .select(`
        *,
        empleado:empleados(
          id,
          empresa_id,
          departamento,
          puesto,
          fecha_ingreso,
          empresa:empresas(id, nombre)
        ),
        profesional:profesionales(
          id,
          especialidades,
          num_colegiado,
          titulacion,
          anios_experiencia,
          biografia,
          tarifa_hora,
          modalidades_atencion,
          idiomas_atencion,
          verificado,
          calificacion_promedio
        ),
        empresa:empresas(
          id,
          nombre,
          nif,
          sector,
          tamano
        )
      `)
      .eq('id', usuarioId)
      .single()

    if (error) throw error

    if (!data) {
      return respuestaExitosa(null, 'Usuario no encontrado', 404)
    }

    return respuestaExitosa(data)
  } catch (error) {
    return manejarError(error)
  }
}

/**
 * PUT /api/usuarios/[id]
 * Actualiza información de un usuario
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

    // Verificar que el usuario solo actualiza su propio perfil
    if (usuario.id !== usuarioId) {
      return respuestaExitosa(null, 'No tienes permiso para actualizar este usuario', 403)
    }

    // Parsear y validar body
    const body = await request.json()
    const datos = schemaActualizarUsuario.parse(body)

    // Actualizar usuario
    const { data, error } = await supabase
      .from('usuarios')
      .update({
        ...datos,
        fecha_actualizacion: new Date().toISOString()
      })
      .eq('id', usuarioId)
      .select()
      .single()

    if (error) throw error

    return respuestaExitosa(data, 'Usuario actualizado exitosamente')
  } catch (error) {
    return manejarError(error)
  }
}
