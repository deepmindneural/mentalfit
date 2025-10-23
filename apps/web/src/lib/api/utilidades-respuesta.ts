import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { PostgrestError } from '@supabase/supabase-js'

/**
 * Tipos de respuesta estandarizados
 */
export interface RespuestaExitosa<T = any> {
  datos: T
  mensaje?: string
}

export interface RespuestaError {
  error: string
  detalles?: any
  codigo?: string
}

/**
 * Respuesta exitosa estandarizada
 */
export function respuestaExitosa<T>(
  datos: T,
  mensaje?: string,
  status: number = 200
): NextResponse<RespuestaExitosa<T>> {
  return NextResponse.json(
    {
      datos,
      ...(mensaje && { mensaje })
    },
    { status }
  )
}

/**
 * Respuesta de error estandarizada
 */
export function respuestaError(
  error: string,
  status: number = 400,
  detalles?: any,
  codigo?: string
): NextResponse<RespuestaError> {
  return NextResponse.json(
    {
      error,
      ...(detalles && { detalles }),
      ...(codigo && { codigo })
    },
    { status }
  )
}

/**
 * Maneja errores de Zod y retorna respuesta formateada
 */
export function manejarErrorZod(error: ZodError): NextResponse<RespuestaError> {
  const erroresFormateados = error.errors.map(err => ({
    campo: err.path.join('.'),
    mensaje: err.message
  }))

  return respuestaError(
    'Datos de entrada inválidos',
    422,
    erroresFormateados,
    'VALIDACION_ERROR'
  )
}

/**
 * Maneja errores de Supabase/PostgreSQL y retorna respuesta formateada
 */
export function manejarErrorSupabase(error: PostgrestError): NextResponse<RespuestaError> {
  // Mapeo de códigos de error de PostgreSQL
  const mapaErrores: Record<string, { mensaje: string; status: number }> = {
    '23505': { mensaje: 'El registro ya existe', status: 409 },
    '23503': { mensaje: 'Referencia inválida a registro relacionado', status: 400 },
    '23502': { mensaje: 'Campo requerido faltante', status: 400 },
    '42501': { mensaje: 'Permiso denegado', status: 403 },
    '42P01': { mensaje: 'Tabla no encontrada', status: 500 },
    'PGRST116': { mensaje: 'Recurso no encontrado', status: 404 }
  }

  const errorInfo = mapaErrores[error.code] || {
    mensaje: 'Error en la base de datos',
    status: 500
  }

  return respuestaError(
    errorInfo.mensaje,
    errorInfo.status,
    process.env.NODE_ENV === 'development' ? error.message : undefined,
    error.code
  )
}

/**
 * Maneja errores genéricos y retorna respuesta apropiada
 */
export function manejarError(error: unknown): NextResponse<RespuestaError> {
  console.error('Error en API:', error)

  if (error instanceof ZodError) {
    return manejarErrorZod(error)
  }

  if (error && typeof error === 'object' && 'code' in error) {
    return manejarErrorSupabase(error as PostgrestError)
  }

  if (error instanceof Error) {
    return respuestaError(
      process.env.NODE_ENV === 'development'
        ? error.message
        : 'Error interno del servidor',
      500,
      process.env.NODE_ENV === 'development' ? error.stack : undefined
    )
  }

  return respuestaError('Error desconocido', 500)
}

/**
 * Verifica autenticación del usuario desde el cliente Supabase
 */
export async function verificarAutenticacion(supabase: any) {
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    throw new Error('No autenticado')
  }

  return user
}

/**
 * Extrae parámetros de la URL de manera segura
 */
export function extraerParametro(params: any, nombre: string): string {
  const valor = params[nombre]

  if (!valor || typeof valor !== 'string') {
    throw new Error(`Parámetro ${nombre} es requerido`)
  }

  return valor
}

/**
 * Valida UUID
 */
export function esUUIDValido(uuid: string): boolean {
  const regexUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return regexUUID.test(uuid)
}

/**
 * Valida y parsea query params de paginación
 */
export interface ParametrosPaginacion {
  pagina: number
  limite: number
  offset: number
}

export function extraerPaginacion(searchParams: URLSearchParams): ParametrosPaginacion {
  const pagina = Math.max(1, parseInt(searchParams.get('pagina') || '1'))
  const limite = Math.min(100, Math.max(1, parseInt(searchParams.get('limite') || '10')))
  const offset = (pagina - 1) * limite

  return { pagina, limite, offset }
}

/**
 * Formatea respuesta paginada
 */
export interface RespuestaPaginada<T> {
  datos: T[]
  paginacion: {
    pagina: number
    limite: number
    total: number
    totalPaginas: number
  }
}

export function crearRespuestaPaginada<T>(
  datos: T[],
  total: number,
  params: ParametrosPaginacion
): RespuestaPaginada<T> {
  return {
    datos,
    paginacion: {
      pagina: params.pagina,
      limite: params.limite,
      total,
      totalPaginas: Math.ceil(total / params.limite)
    }
  }
}
