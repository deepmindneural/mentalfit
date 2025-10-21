'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAutenticacion } from './useAutenticacion';

interface OpcionesTiempoExpiracion {
  tiempoInactividad?: number; // En milisegundos
  advertirAntes?: number; // Tiempo antes de expirar para mostrar advertencia (en milisegundos)
  onAdvertencia?: () => void;
  onExpiracion?: () => void;
}

const TIEMPO_INACTIVIDAD_DEFAULT = 15 * 60 * 1000; // 15 minutos
const ADVERTIR_ANTES_DEFAULT = 2 * 60 * 1000; // 2 minutos antes

export function useTiempoExpiracionSesion(opciones: OpcionesTiempoExpiracion = {}) {
  const {
    tiempoInactividad = TIEMPO_INACTIVIDAD_DEFAULT,
    advertirAntes = ADVERTIR_ANTES_DEFAULT,
    onAdvertencia,
    onExpiracion
  } = opciones;

  const { estaAutenticado, cerrarSesion } = useAutenticacion();
  const [sesionExpirada, setSesionExpirada] = useState(false);
  const [mostrandoAdvertencia, setMostrandoAdvertencia] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(tiempoInactividad);

  const timerInactividadRef = useRef<NodeJS.Timeout | null>(null);
  const timerAdvertenciaRef = useRef<NodeJS.Timeout | null>(null);
  const timerActualizacionRef = useRef<NodeJS.Timeout | null>(null);
  const ultimaActividadRef = useRef<number>(Date.now());

  // Limpiar todos los timers
  const limpiarTimers = useCallback(() => {
    if (timerInactividadRef.current) {
      clearTimeout(timerInactividadRef.current);
      timerInactividadRef.current = null;
    }
    if (timerAdvertenciaRef.current) {
      clearTimeout(timerAdvertenciaRef.current);
      timerAdvertenciaRef.current = null;
    }
    if (timerActualizacionRef.current) {
      clearInterval(timerActualizacionRef.current);
      timerActualizacionRef.current = null;
    }
  }, []);

  // Manejar expiración de sesión
  const manejarExpiracion = useCallback(async () => {
    setSesionExpirada(true);
    setMostrandoAdvertencia(false);
    limpiarTimers();

    if (onExpiracion) {
      onExpiracion();
    }

    // Cerrar sesión automáticamente
    await cerrarSesion();
  }, [onExpiracion, cerrarSesion, limpiarTimers]);

  // Mostrar advertencia
  const mostrarAdvertencia = useCallback(() => {
    setMostrandoAdvertencia(true);

    if (onAdvertencia) {
      onAdvertencia();
    }

    // Programar expiración
    timerInactividadRef.current = setTimeout(() => {
      manejarExpiracion();
    }, advertirAntes);

    // Actualizar tiempo restante cada segundo
    timerActualizacionRef.current = setInterval(() => {
      const tiempoTranscurrido = Date.now() - ultimaActividadRef.current;
      const restante = Math.max(0, tiempoInactividad - tiempoTranscurrido);
      setTiempoRestante(restante);

      if (restante === 0) {
        if (timerActualizacionRef.current) {
          clearInterval(timerActualizacionRef.current);
        }
      }
    }, 1000);
  }, [onAdvertencia, advertirAntes, manejarExpiracion, tiempoInactividad]);

  // Resetear timer de inactividad
  const resetearTimer = useCallback(() => {
    if (!estaAutenticado) return;

    ultimaActividadRef.current = Date.now();
    setTiempoRestante(tiempoInactividad);
    setMostrandoAdvertencia(false);
    limpiarTimers();

    // Timer para mostrar advertencia
    timerAdvertenciaRef.current = setTimeout(() => {
      mostrarAdvertencia();
    }, tiempoInactividad - advertirAntes);
  }, [estaAutenticado, tiempoInactividad, advertirAntes, limpiarTimers, mostrarAdvertencia]);

  // Eventos de actividad del usuario
  useEffect(() => {
    if (!estaAutenticado) {
      limpiarTimers();
      return;
    }

    const eventos = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click'
    ];

    // Throttle para evitar demasiadas llamadas
    let ultimoReseteo = Date.now();
    const manejarActividad = () => {
      const ahora = Date.now();
      // Solo resetear si han pasado al menos 5 segundos desde el último reseteo
      if (ahora - ultimoReseteo > 5000) {
        ultimoReseteo = ahora;
        resetearTimer();
      }
    };

    // Agregar event listeners
    eventos.forEach(evento => {
      window.addEventListener(evento, manejarActividad);
    });

    // Iniciar timer
    resetearTimer();

    // Cleanup
    return () => {
      eventos.forEach(evento => {
        window.removeEventListener(evento, manejarActividad);
      });
      limpiarTimers();
    };
  }, [estaAutenticado, resetearTimer, limpiarTimers]);

  // Extender sesión manualmente
  const extenderSesion = useCallback(() => {
    resetearTimer();
    setSesionExpirada(false);
  }, [resetearTimer]);

  // Formatear tiempo restante para mostrar
  const formatearTiempoRestante = useCallback(() => {
    const minutos = Math.floor(tiempoRestante / 60000);
    const segundos = Math.floor((tiempoRestante % 60000) / 1000);
    return `${minutos}:${segundos.toString().padStart(2, '0')}`;
  }, [tiempoRestante]);

  return {
    sesionExpirada,
    mostrandoAdvertencia,
    tiempoRestante,
    tiempoRestanteFormateado: formatearTiempoRestante(),
    extenderSesion,
    resetearTimer
  };
}
