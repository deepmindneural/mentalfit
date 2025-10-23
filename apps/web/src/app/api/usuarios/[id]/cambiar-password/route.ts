import { NextResponse } from 'next/server'
import { crearCliente } from '@/lib/supabase/servidor'
import { schemaCambiarPassword } from '@/lib/api/schemas-validacion'
import {
  manejarError,
  respuestaExitosa,
  extraerParametro,
  verificarAutenticacion
} from '@/lib/api/utilidades-respuesta'

/**
 * POST /api/usuarios/[id]/cambiar-password
 * Cambia la contraseña del usuario
 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await crearCliente()

    // Verificar autenticación
    const usuario = await verificarAutenticacion(supabase)

    const usuarioId = extraerParametro(params, 'id')

    // Verificar que el usuario solo cambia su propia contraseña
    if (usuario.id !== usuarioId) {
      return respuestaExitosa(null, 'No tienes permiso para cambiar esta contraseña', 403)
    }

    // Parsear y validar body
    const body = await request.json()
    const datos = schemaCambiarPassword.parse(body)

    // Verificar contraseña actual
    const { error: errorVerificar } = await supabase.auth.signInWithPassword({
      email: usuario.email || '',
      password: datos.passwordActual
    })

    if (errorVerificar) {
      return respuestaExitosa(
        null,
        'La contraseña actual es incorrecta',
        400
      )
    }

    // Actualizar contraseña
    const { error: errorActualizar } = await supabase.auth.updateUser({
      password: datos.passwordNuevo
    })

    if (errorActualizar) throw errorActualizar

    // Registrar cambio en logs
    await supabase.from('logs_auditoria').insert({
      usuario_id: usuarioId,
      accion: 'cambio_password',
      tabla_afectada: 'auth.users',
      detalles: {
        cambio_exitoso: true,
        fecha: new Date().toISOString()
      }
    })

    return respuestaExitosa(
      { mensaje: 'Contraseña actualizada correctamente' },
      'Contraseña cambiada exitosamente'
    )
  } catch (error) {
    return manejarError(error)
  }
}
