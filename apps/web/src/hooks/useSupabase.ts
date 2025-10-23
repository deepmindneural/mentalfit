import { useEffect, useState } from 'react';
import { crearClienteSupabase } from '@/lib/supabase/cliente';
import type { Database } from '@/types/supabase';

type Tablas = Database['public']['Tables'];

/**
 * Hook genérico para obtener datos de una tabla de Supabase
 */
export function useDatosSupabase<T extends keyof Tablas>(
  tabla: T,
  opciones?: {
    filtros?: Record<string, any>;
    ordenar?: { columna: string; ascendente?: boolean };
    limite?: number;
  }
) {
  const [datos, setDatos] = useState<Tablas[T]['Row'][] | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function obtenerDatos() {
      try {
        setCargando(true);
        const supabase = crearClienteSupabase();

        let consulta = supabase.from(tabla).select('*');

        // Aplicar filtros
        if (opciones?.filtros) {
          Object.entries(opciones.filtros).forEach(([columna, valor]) => {
            consulta = consulta.eq(columna, valor);
          });
        }

        // Aplicar ordenamiento
        if (opciones?.ordenar) {
          consulta = consulta.order(opciones.ordenar.columna, {
            ascending: opciones.ordenar.ascendente ?? true,
          });
        }

        // Aplicar límite
        if (opciones?.limite) {
          consulta = consulta.limit(opciones.limite);
        }

        const { data, error } = await consulta;

        if (error) throw error;

        setDatos(data as Tablas[T]['Row'][]);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setDatos(null);
      } finally {
        setCargando(false);
      }
    }

    obtenerDatos();
  }, [tabla, JSON.stringify(opciones)]);

  return { datos, cargando, error };
}

/**
 * Hook para obtener el usuario actual autenticado
 */
export function useUsuarioActual() {
  const [usuario, setUsuario] = useState<Tablas['usuarios']['Row'] | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function obtenerUsuario() {
      try {
        setCargando(true);
        const supabase = crearClienteSupabase();

        // Obtener sesión actual
        const { data: { session }, error: errorSesion } = await supabase.auth.getSession();

        if (errorSesion) throw errorSesion;

        if (!session) {
          setUsuario(null);
          setCargando(false);
          return;
        }

        // Obtener datos del usuario
        const { data, error: errorUsuario } = await supabase
          .from('usuarios')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (errorUsuario) throw errorUsuario;

        setUsuario(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setUsuario(null);
      } finally {
        setCargando(false);
      }
    }

    obtenerUsuario();

    // Suscribirse a cambios de autenticación
    const supabase = crearClienteSupabase();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      obtenerUsuario();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { usuario, cargando, error };
}

/**
 * Hook para obtener estadísticas del profesional
 */
export function useEstadisticasProfesional(profesionalId: string) {
  const [estadisticas, setEstadisticas] = useState<{
    totalPacientes: number;
    sesionesEsteMes: number;
    ingresosEsteMes: number;
    tasaAsistencia: number;
  } | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function obtenerEstadisticas() {
      try {
        setCargando(true);
        const response = await fetch(`/api/profesionales/${profesionalId}/estadisticas`);

        if (!response.ok) throw new Error('Error al obtener estadísticas');

        const data = await response.json();
        setEstadisticas(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setEstadisticas(null);
      } finally {
        setCargando(false);
      }
    }

    if (profesionalId) {
      obtenerEstadisticas();
    }
  }, [profesionalId]);

  return { estadisticas, cargando, error };
}

/**
 * Hook para obtener sesiones del profesional
 */
export function useSesionesProfesional(profesionalId: string, opciones?: {
  estado?: string;
  fecha?: string;
  limite?: number;
}) {
  const { datos, cargando, error } = useDatosSupabase('sesiones', {
    filtros: {
      profesional_id: profesionalId,
      ...(opciones?.estado && { estado: opciones.estado }),
    },
    ordenar: { columna: 'fecha_hora_inicio', ascendente: true },
    limite: opciones?.limite,
  });

  return { sesiones: datos, cargando, error };
}

/**
 * Hook para obtener pacientes del profesional
 */
export function usePacientesProfesional(profesionalId: string) {
  const [pacientes, setPacientes] = useState<any[] | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function obtenerPacientes() {
      try {
        setCargando(true);
        const supabase = crearClienteSupabase();

        // Obtener pacientes que tienen sesiones con este profesional
        const { data, error: errorConsulta } = await supabase
          .from('sesiones')
          .select(`
            paciente_id,
            pacientes (
              *,
              usuarios (
                nombre_completo,
                email,
                telefono,
                avatar_url
              )
            )
          `)
          .eq('profesional_id', profesionalId);

        if (errorConsulta) throw errorConsulta;

        // Eliminar duplicados por paciente_id
        const pacientesUnicos = data?.reduce((acc: any[], item: any) => {
          if (!acc.find(p => p.id === item.paciente_id)) {
            acc.push({
              id: item.paciente_id,
              ...item.pacientes,
            });
          }
          return acc;
        }, []);

        setPacientes(pacientesUnicos || []);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setPacientes(null);
      } finally {
        setCargando(false);
      }
    }

    if (profesionalId) {
      obtenerPacientes();
    }
  }, [profesionalId]);

  return { pacientes, cargando, error };
}

/**
 * Hook para obtener datos del dashboard de empresa
 */
export function useDashboardEmpresa(empresaId: string) {
  const [datos, setDatos] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function obtenerDatos() {
      try {
        setCargando(true);
        const response = await fetch(`/api/empresas/${empresaId}/dashboard`);

        if (!response.ok) throw new Error('Error al obtener datos del dashboard');

        const data = await response.json();
        setDatos(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setDatos(null);
      } finally {
        setCargando(false);
      }
    }

    if (empresaId) {
      obtenerDatos();
    }
  }, [empresaId]);

  return { datos, cargando, error };
}
