'use client';

import { useEffect, useState } from 'react';
import { Heart, Brain, TrendingUp, Calendar, User, MessageSquare, BookOpen } from 'lucide-react';
import Tarjeta from '@/components/ui/Tarjeta';
import ContenedorEstadisticas from '@/components/ui/ContenedorEstadisticas';
import Boton from '@/components/ui/Boton';
import BarraProgreso from '@/components/ui/BarraProgreso';
import Insignia from '@/components/ui/Insignia';
import GraficoLinea from '@/components/ui/GraficoLinea';
import Esqueleto from '@/components/ui/Esqueleto';
import { useUsuarioActual } from '@/hooks/useSupabase';

interface DatosDashboard {
  indiceBienestar: {
    total: number;
    estadoEmocional: number;
    manejoEstres: number;
    calidadSueno: number;
  };
  estadisticas: {
    sesionesCompletadas: number;
    diasRacha: number;
    recursosCompletados: number;
    totalEvaluaciones: number;
  };
  datosProgreso: Array<{ nombre: string; bienestar: number }>;
  proximaSesion: {
    id: string;
    profesional: string;
    especialidad: string;
    fechaHoraInicio: string;
    modalidad: string;
    salaVirtualUrl: string | null;
  } | null;
  recursosRecomendados: Array<{
    id: string;
    titulo: string;
    tipo: string;
    duracion: string;
  }>;
}

export default function PaginaDashboardUsuario() {
  const { usuario, cargando: cargandoUsuario } = useUsuarioActual();
  const [datos, setDatos] = useState<DatosDashboard | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarDatos() {
      if (!usuario) return;

      try {
        setCargando(true);
        const response = await fetch(`/api/usuarios/${usuario.id}/dashboard`);
        if (response.ok) {
          const data = await response.json();
          setDatos(data);
        }
      } catch (error) {
        console.error('Error al cargar datos del dashboard:', error);
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, [usuario]);

  if (cargandoUsuario || cargando || !datos) {
    return (
      <div className="space-y-6">
        <Esqueleto alto="60px" />
        <Esqueleto alto="200px" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Esqueleto key={i} alto="120px" />
          ))}
        </div>
        <Esqueleto alto="300px" />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Bienvenido a tu Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Tu camino hacia un mejor bienestar mental
        </p>
      </div>

      {/* Índice de Bienestar */}
      <Tarjeta titulo="Tu Índice de Bienestar" descripcion="Basado en tus últimas evaluaciones">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-primary-600 dark:text-primary-400">
                {datos.indiceBienestar.total}
              </span>
              <span className="text-xl text-gray-500 dark:text-gray-400">/ 100</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="h-4 w-4 text-exito-600" />
              <span className="text-sm font-medium text-exito-600">Tu progreso continúa</span>
            </div>
          </div>

          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-exito-500 flex items-center justify-center">
            <Heart className="h-16 w-16 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Estado Emocional</span>
              <span className="text-sm font-medium">{datos.indiceBienestar.estadoEmocional}%</span>
            </div>
            <BarraProgreso valor={datos.indiceBienestar.estadoEmocional} variante="exito" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Manejo del Estrés</span>
              <span className="text-sm font-medium">{datos.indiceBienestar.manejoEstres}%</span>
            </div>
            <BarraProgreso valor={datos.indiceBienestar.manejoEstres} variante="primario" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Calidad del Sueño</span>
              <span className="text-sm font-medium">{datos.indiceBienestar.calidadSueno}%</span>
            </div>
            <BarraProgreso valor={datos.indiceBienestar.calidadSueno} variante="secundario" />
          </div>
        </div>
      </Tarjeta>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ContenedorEstadisticas
          titulo="Sesiones Completadas"
          valor={datos.estadisticas.sesionesCompletadas.toString()}
          icono={Calendar}
          color="primario"
          descripcion="Este mes"
        />

        <ContenedorEstadisticas
          titulo="Días de Racha"
          valor={datos.estadisticas.diasRacha.toString()}
          icono={TrendingUp}
          color="exito"
          descripcion="Días con actividad"
        />

        <ContenedorEstadisticas
          titulo="Recursos Completados"
          valor={datos.estadisticas.recursosCompletados.toString()}
          icono={BookOpen}
          color="informacion"
          descripcion="Artículos y videos"
        />

        <ContenedorEstadisticas
          titulo="Evaluaciones"
          valor={datos.estadisticas.totalEvaluaciones.toString()}
          icono={Brain}
          color="secundario"
          descripcion="Realizadas"
        />
      </div>

      {/* Progreso Semanal */}
      <Tarjeta titulo="Tu Progreso" descripcion="Últimas 6 semanas">
        <GraficoLinea
          datos={datos.datosProgreso}
          lineas={[
            { clave: 'bienestar', nombre: 'Índice de Bienestar', color: '#22c55e' },
          ]}
          alto={250}
        />
      </Tarjeta>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Tarjeta
          titulo="Próxima Sesión"
          descripcion={datos.proximaSesion ? `Agendada` : 'No hay sesiones programadas'}
        >
          {datos.proximaSesion ? (
            <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {datos.proximaSesion.profesional}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {datos.proximaSesion.especialidad}
                  </p>
                </div>
                <Insignia variante="primario">{datos.proximaSesion.modalidad}</Insignia>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(datos.proximaSesion.fechaHoraInicio).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>

              <div className="flex gap-3">
                <Boton variante="primario" ancho="completo">
                  Unirse a la Sesión
                </Boton>
                <Boton variante="fantasma">
                  Reprogramar
                </Boton>
              </div>
            </div>
          ) : (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
              <p className="text-gray-600 dark:text-gray-400">
                No tienes sesiones programadas. Agenda una cita con tu profesional.
              </p>
              <Boton variante="primario" className="mt-4">
                Agendar Sesión
              </Boton>
            </div>
          )}
        </Tarjeta>

        <Tarjeta titulo="Recursos Recomendados" descripcion="Basados en tu perfil">
          <div className="mt-4 space-y-3">
            {datos.recursosRecomendados.map((recurso, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {recurso.titulo}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Insignia variante="gris" tamano="sm">{recurso.tipo}</Insignia>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {recurso.duracion}
                      </span>
                    </div>
                  </div>
                </div>

                <Boton variante="fantasma" tamano="sm">
                  Ver
                </Boton>
              </div>
            ))}
          </div>
        </Tarjeta>
      </div>
    </div>
  );
}
