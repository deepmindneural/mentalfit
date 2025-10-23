import { NextResponse } from 'next/server'
import { crearClienteAdmin } from '@/lib/supabase/servidor'
import { schemaCrearUsuario } from '@/lib/api/schemas-validacion'
import { manejarError, respuestaExitosa } from '@/lib/api/utilidades-respuesta'

/**
 * POST /api/usuarios/crear
 * Crea un nuevo usuario usando la función de BD que maneja auth + perfil
 */
export async function POST(request: Request) {
  try {
    // Usar cliente admin porque necesitamos crear usuarios en auth
    const supabaseAdmin = crearClienteAdmin()

    // Parsear y validar body
    const body = await request.json()
    const datos = schemaCrearUsuario.parse(body)

    // Llamar a la función de BD que crea usuario completo
    const { data, error } = await supabaseAdmin.rpc('crear_usuario_completo', {
      p_email: datos.email,
      p_password: datos.password,
      p_nombre: datos.nombre,
      p_apellidos: datos.apellidos,
      p_tipo_usuario: datos.tipoUsuario,
      p_telefono: datos.telefono || null,
      p_perfil_especifico: datos.perfilEspecifico || null
    })

    if (error) throw error

    // No devolver el password en la respuesta
    const { password, ...datosRespuesta } = datos

    return respuestaExitosa(
      {
        usuarioId: data.usuario_id,
        email: datos.email,
        nombre: datos.nombre,
        apellidos: datos.apellidos,
        tipoUsuario: datos.tipoUsuario
      },
      'Usuario creado exitosamente',
      201
    )
  } catch (error) {
    return manejarError(error)
  }
}
