'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase';

interface EstadoAutenticacion {
  usuario: User | null;
  cargando: boolean;
  error: string | null;
}

interface OpcionesInicioSesion {
  email: string;
  contrasena: string;
  recordarme?: boolean;
}

interface OpcionesRegistro {
  email: string;
  contrasena: string;
  metadatos?: Record<string, any>;
}

export function useAutenticacion() {
  const router = useRouter();
  const supabase = createClient();

  const [estado, setEstado] = useState<EstadoAutenticacion>({
    usuario: null,
    cargando: true,
    error: null
  });

  // Verificar sesión actual al montar
  useEffect(() => {
    verificarSesion();

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (evento, sesion) => {
        if (evento === 'SIGNED_IN' && sesion) {
          setEstado({
            usuario: sesion.user,
            cargando: false,
            error: null
          });
        } else if (evento === 'SIGNED_OUT') {
          setEstado({
            usuario: null,
            cargando: false,
            error: null
          });
        } else if (evento === 'TOKEN_REFRESHED' && sesion) {
          setEstado({
            usuario: sesion.user,
            cargando: false,
            error: null
          });
        } else if (evento === 'USER_UPDATED' && sesion) {
          setEstado({
            usuario: sesion.user,
            cargando: false,
            error: null
          });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const verificarSesion = async () => {
    try {
      setEstado(prev => ({ ...prev, cargando: true }));

      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        setEstado({
          usuario: null,
          cargando: false,
          error: error.message
        });
        return;
      }

      setEstado({
        usuario: user,
        cargando: false,
        error: null
      });
    } catch (error) {
      console.error('Error al verificar sesión:', error);
      setEstado({
        usuario: null,
        cargando: false,
        error: 'Error al verificar sesión'
      });
    }
  };

  const iniciarSesion = async (opciones: OpcionesInicioSesion): Promise<{
    exito: boolean;
    error?: string;
    requiere2FA?: boolean;
  }> => {
    try {
      setEstado(prev => ({ ...prev, cargando: true, error: null }));

      const { data, error } = await supabase.auth.signInWithPassword({
        email: opciones.email,
        password: opciones.contrasena
      });

      if (error) {
        setEstado(prev => ({
          ...prev,
          cargando: false,
          error: error.message
        }));
        return { exito: false, error: error.message };
      }

      // Verificar si tiene 2FA activado
      const tiene2FA = data.user?.user_metadata?.mfa_enabled === true;

      if (tiene2FA) {
        return { exito: true, requiere2FA: true };
      }

      setEstado({
        usuario: data.user,
        cargando: false,
        error: null
      });

      return { exito: true };
    } catch (error) {
      const mensajeError = error instanceof Error ? error.message : 'Error desconocido';
      setEstado(prev => ({
        ...prev,
        cargando: false,
        error: mensajeError
      }));
      return { exito: false, error: mensajeError };
    }
  };

  const registrarse = async (opciones: OpcionesRegistro): Promise<{
    exito: boolean;
    error?: string;
  }> => {
    try {
      setEstado(prev => ({ ...prev, cargando: true, error: null }));

      const { data, error } = await supabase.auth.signUp({
        email: opciones.email,
        password: opciones.contrasena,
        options: {
          data: opciones.metadatos || {}
        }
      });

      if (error) {
        setEstado(prev => ({
          ...prev,
          cargando: false,
          error: error.message
        }));
        return { exito: false, error: error.message };
      }

      // El usuario necesita verificar su email
      setEstado({
        usuario: data.user,
        cargando: false,
        error: null
      });

      return { exito: true };
    } catch (error) {
      const mensajeError = error instanceof Error ? error.message : 'Error desconocido';
      setEstado(prev => ({
        ...prev,
        cargando: false,
        error: mensajeError
      }));
      return { exito: false, error: mensajeError };
    }
  };

  const cerrarSesion = async (): Promise<{
    exito: boolean;
    error?: string;
  }> => {
    try {
      setEstado(prev => ({ ...prev, cargando: true }));

      const { error } = await supabase.auth.signOut();

      if (error) {
        setEstado(prev => ({
          ...prev,
          cargando: false,
          error: error.message
        }));
        return { exito: false, error: error.message };
      }

      setEstado({
        usuario: null,
        cargando: false,
        error: null
      });

      // Redirigir al login
      router.push('/auth/login');

      return { exito: true };
    } catch (error) {
      const mensajeError = error instanceof Error ? error.message : 'Error desconocido';
      setEstado(prev => ({
        ...prev,
        cargando: false,
        error: mensajeError
      }));
      return { exito: false, error: mensajeError };
    }
  };

  const actualizarPerfil = async (datos: Partial<User['user_metadata']>): Promise<{
    exito: boolean;
    error?: string;
  }> => {
    try {
      setEstado(prev => ({ ...prev, cargando: true }));

      const { data, error } = await supabase.auth.updateUser({
        data: datos
      });

      if (error) {
        setEstado(prev => ({
          ...prev,
          cargando: false,
          error: error.message
        }));
        return { exito: false, error: error.message };
      }

      setEstado({
        usuario: data.user,
        cargando: false,
        error: null
      });

      return { exito: true };
    } catch (error) {
      const mensajeError = error instanceof Error ? error.message : 'Error desconocido';
      setEstado(prev => ({
        ...prev,
        cargando: false,
        error: mensajeError
      }));
      return { exito: false, error: mensajeError };
    }
  };

  return {
    usuario: estado.usuario,
    cargando: estado.cargando,
    error: estado.error,
    estaAutenticado: !!estado.usuario,
    iniciarSesion,
    registrarse,
    cerrarSesion,
    actualizarPerfil,
    verificarSesion
  };
}
