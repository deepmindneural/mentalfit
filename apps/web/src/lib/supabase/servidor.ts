import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

/**
 * Cliente de Supabase para API Routes y Server Components
 * Maneja cookies automáticamente para mantener sesión
 */
export async function crearCliente() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Cookies solo se pueden setear en Server Actions o Route Handlers
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Cookies solo se pueden borrar en Server Actions o Route Handlers
          }
        },
      },
    }
  )
}

/**
 * Cliente admin con service role para operaciones que bypasean RLS
 * SOLO usar cuando sea absolutamente necesario y con extremo cuidado
 */
export function crearClienteAdmin() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL no está definida')
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY no está definida')
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

/**
 * Verifica autenticación y retorna el usuario actual
 * Lanza error si no está autenticado
 */
export async function obtenerUsuarioAutenticado() {
  const supabase = await crearCliente()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    throw new Error('Usuario no autenticado')
  }

  return user
}

/**
 * Verifica si el usuario actual tiene un rol específico
 */
export async function verificarRol(rolesPermitidos: string[]): Promise<boolean> {
  const supabase = await crearCliente()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return false

  // Buscar tipo_usuario en usuarios
  const { data: usuario } = await supabase
    .from('usuarios')
    .select('tipo_usuario')
    .eq('id', user.id)
    .single()

  if (!usuario) return false

  return rolesPermitidos.includes(usuario.tipo_usuario)
}
