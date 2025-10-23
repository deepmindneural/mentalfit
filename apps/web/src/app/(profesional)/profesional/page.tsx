'use client';

import { useEffect, useState } from 'react';
import { Users, Calendar, DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import Tarjeta from '@/components/ui/Tarjeta';
import ContenedorEstadisticas from '@/components/ui/ContenedorEstadisticas';
import GraficoLinea from '@/components/ui/GraficoLinea';
import GraficoBarra from '@/components/ui/GraficoBarra';
import Insignia from '@/components/ui/Insignia';
import Avatar from '@/components/ui/Avatar';
import Esqueleto from '@/components/ui/Esqueleto';
import { useUsuarioActual } from '@/hooks/useSupabase';

interface EstadisticasProfesional {
  totalPacientes: number;
  sesionesEsteMes: number;
  ingresosEsteMes: number;
  tasaAsistencia: number;
}

interface DatosSemana {
  nombre: string;
  sesiones: number;
  ingresos: number;
}

interface SesionProxima {
  id: string;
  paciente: string;
  fechaHoraInicio: string;
  tipo: string;
  modalidad: string;
}

export default function PaginaDashboardProfesional() {
  const { usuario, cargando: cargandoUsuario } = useUsuarioActual();
  const [estadisticas, setEstadisticas] = useState<EstadisticasProfesional | null>(null);
  const [datosSemana, setDatosSemana] = useState<DatosSemana[]>([]);
  const [proximasSesiones, setProximasSesiones] = useState<SesionProxima[]>([]);
  const [cargando, setCargando] = useState(true);
  const [profesionalId, setProfesionalId] = useState<string | null>(null);

  // Obtener el ID del profesional del usuario actual
  useEffect(() => {
    async function obtenerProfesionalId() {
      if (!usuario) return;

      try {
        const response = await fetch(`/api/profesionales?usuario_id=${usuario.id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setProfesionalId(data[0].id);
          }
        }
      } catch (error) {
        console.error('Error al obtener profesional:', error);
      }
    }

    if (usuario) {
      obtenerProfesionalId();
    }
  }, [usuario]);

  // Cargar datos del dashboard
  useEffect(() => {
    async function cargarDatos() {
      if (!profesionalId) return;

      try {
        setCargando(true);

        // Cargar estadísticas
        const resEstadisticas = await fetch(`/api/profesionales/${profesionalId}/estadisticas`);
        if (resEstadisticas.ok) {
          const data = await resEstadisticas.json();
          setEstadisticas(data);
        }

        // Cargar datos semanales
        const resDatosSemana = await fetch(`/api/profesionales/${profesionalId}/datos-semanales`);
        if (resDatosSemana.ok) {
          const data = await resDatosSemana.json();
          setDatosSemana(data);
        }

        // Cargar próximas sesiones
        const resSesiones = await fetch(`/api/profesionales/${profesionalId}/sesiones-proximas`);
        if (resSesiones.ok) {
          const data = await resSesiones.json();
          setProximasSesiones(data.slice(0, 3)); // Solo las primeras 3
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, [profesionalId]);

  if (cargandoUsuario || cargando) {
    return (
      <div className="space-y-6">
        <Esqueleto alto="60px" />
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
          Bienvenido, {usuario?.nombre_completo || 'Profesional'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Aquí está el resumen de tu actividad profesional
        </p>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ContenedorEstadisticas
          titulo="Pacientes Activos"
          valor={estadisticas?.totalPacientes.toString() || '0'}
          icono={Users}
          descripcion="total de pacientes"
          color="primario"
        />

        <ContenedorEstadisticas
          titulo="Sesiones Este Mes"
          valor={estadisticas?.sesionesEsteMes.toString() || '0'}
          icono={Calendar}
          descripcion="sesiones programadas"
          color="secundario"
        />

        <ContenedorEstadisticas
          titulo="Ingresos del Mes"
          valor={`$${estadisticas?.ingresosEsteMes.toLocaleString() || '0'}`}
          icono={DollarSign}
          descripcion="ingresos confirmados"
          color="exito"
        />

        <ContenedorEstadisticas
          titulo="Tasa de Asistencia"
          valor={`${estadisticas?.tasaAsistencia || 0}%`}
          icono={TrendingUp}
          descripcion="sesiones completadas"
          color="informacion"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Tarjeta titulo="Sesiones por Día" descripcion="Últimos 7 días">
          <GraficoBarra
            datos={datosSemana}
            barras={[
              { clave: 'sesiones', nombre: 'Sesiones', color: '#22c55e' },
            ]}
            alto={250}
          />
        </Tarjeta>

        <Tarjeta titulo="Ingresos Semanales" descripcion="Últimos 7 días">
          <GraficoLinea
            datos={datosSemana}
            lineas={[
              { clave: 'ingresos', nombre: 'Ingresos ($)', color: '#eab308' },
            ]}
            alto={250}
          />
        </Tarjeta>
      </div>

      {/* Próximas Sesiones */}
      <Tarjeta titulo="Próximas Sesiones Hoy" descripcion={`${proximasSesiones.length} sesiones programadas`}>
        <div className="space-y-4 mt-4">
          {proximasSesiones.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              No hay sesiones programadas para hoy
            </p>
          ) : (
            proximasSesiones.map((sesion) => {
              const fecha = new Date(sesion.fechaHoraInicio);
              const hora = fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

              return (
                <div
                  key={sesion.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar iniciales={sesion.paciente.split(' ').map(n => n[0]).join('')} tamano="md" />

                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {sesion.paciente}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {hora}
                        </span>
                        <Insignia variante="primario" tamano="sm">
                          {sesion.tipo}
                        </Insignia>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Insignia variante="informacion">{sesion.modalidad}</Insignia>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
                      Iniciar Sesión
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Tarjeta>

      {/* Tareas Pendientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Tarjeta titulo="Tareas Pendientes" descripcion="5 tareas por completar">
          <div className="space-y-3 mt-4">
            {[
              'Completar notas de sesión - María González',
              'Revisar plan de tratamiento - Carlos Rodríguez',
              'Enviar resumen mensual - Ana Martínez',
              'Actualizar disponibilidad - Próxima semana',
              'Responder mensaje - Juan Pérez',
            ].map((tarea, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{tarea}</span>
              </div>
            ))}
          </div>
        </Tarjeta>

        <Tarjeta titulo="Logros Recientes" descripcion="Hitos alcanzados">
          <div className="space-y-3 mt-4">
            {[
              { texto: '50 sesiones completadas este mes', fecha: 'Hace 2 días' },
              { texto: 'Calificación promedio 4.9/5', fecha: 'Hace 1 semana' },
              { texto: '10 nuevos pacientes', fecha: 'Hace 2 semanas' },
            ].map((logro, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-exito-50 dark:bg-exito-900/20 rounded-lg"
              >
                <CheckCircle className="h-5 w-5 text-exito-600 dark:text-exito-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {logro.texto}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {logro.fecha}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Tarjeta>
      </div>
    </div>
  );
}
