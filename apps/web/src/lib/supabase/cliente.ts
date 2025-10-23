import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

/**
 * Cliente de Supabase para componentes del cliente
 * Usa cookies para mantener la sesión del usuario
 */
export function crearClienteSupabase() {
  return createClientComponentClient<Database>();
}

/**
 * Cliente de Supabase con service role para operaciones administrativas
 * SOLO usar en rutas API del servidor, NUNCA en componentes cliente
 */
export function crearClienteSupabaseAdmin() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('Falta NEXT_PUBLIC_SUPABASE_URL');
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Falta SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

/**
 * Maneja errores de Supabase y retorna mensajes legibles
 */
export function manejarErrorSupabase(error: any): string {
  if (error?.message) {
    // Traduce mensajes comunes de error
    const mensajesError: Record<string, string> = {
      'Invalid login credentials': 'Credenciales de inicio de sesión inválidas',
      'Email not confirmed': 'Email no confirmado',
      'User already registered': 'Usuario ya registrado',
      'Invalid email': 'Email inválido',
      'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres',
      'Network request failed': 'Error de conexión. Verifica tu internet.',
    };

    return mensajesError[error.message] || error.message;
  }

  return 'Error desconocido. Intenta nuevamente.';
}
