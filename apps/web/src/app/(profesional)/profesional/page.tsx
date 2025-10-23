'use client';

import { Users, Calendar, DollarSign, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import Tarjeta from '@/components/ui/Tarjeta';
import ContenedorEstadisticas from '@/components/ui/ContenedorEstadisticas';
import GraficoLinea from '@/components/ui/GraficoLinea';
import GraficoBarra from '@/components/ui/GraficoBarra';
import Insignia from '@/components/ui/Insignia';
import Avatar from '@/components/ui/Avatar';

// Datos de ejemplo
const datosSemana = [
  { nombre: 'Lun', sesiones: 4, ingresos: 480 },
  { nombre: 'Mar', sesiones: 6, ingresos: 720 },
  { nombre: 'Mié', sesiones: 5, ingresos: 600 },
  { nombre: 'Jue', sesiones: 7, ingresos: 840 },
  { nombre: 'Vie', sesiones: 6, ingresos: 720 },
  { nombre: 'Sáb', sesiones: 3, ingresos: 360 },
  { nombre: 'Dom', sesiones: 2, ingresos: 240 },
];

const proximasSesiones = [
  {
    id: 1,
    paciente: 'María González',
    hora: '10:00 AM',
    tipo: 'Individual',
    modalidad: 'Video',
  },
  {
    id: 2,
    paciente: 'Carlos Rodríguez',
    hora: '11:30 AM',
    tipo: 'Seguimiento',
    modalidad: 'Video',
  },
  {
    id: 3,
    paciente: 'Ana Martínez',
    hora: '02:00 PM',
    tipo: 'Primera sesión',
    modalidad: 'Video',
  },
];

export default function PaginaDashboardProfesional() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Bienvenido, Dr. Profesional
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Aquí está el resumen de tu actividad profesional
        </p>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ContenedorEstadisticas
          titulo="Pacientes Activos"
          valor="42"
          icono={Users}
          cambio={{ valor: 12, tipo: 'aumento' }}
          descripcion="vs. mes anterior"
          color="primario"
        />

        <ContenedorEstadisticas
          titulo="Sesiones Este Mes"
          valor="89"
          icono={Calendar}
          cambio={{ valor: 8, tipo: 'aumento' }}
          descripcion="vs. mes anterior"
          color="secundario"
        />

        <ContenedorEstadisticas
          titulo="Ingresos del Mes"
          valor="$10,680"
          icono={DollarSign}
          cambio={{ valor: 15, tipo: 'aumento' }}
          descripcion="vs. mes anterior"
          color="exito"
        />

        <ContenedorEstadisticas
          titulo="Tasa de Asistencia"
          valor="94%"
          icono={TrendingUp}
          cambio={{ valor: 3, tipo: 'aumento' }}
          descripcion="vs. mes anterior"
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
      <Tarjeta titulo="Próximas Sesiones Hoy" descripcion="3 sesiones programadas">
        <div className="space-y-4 mt-4">
          {proximasSesiones.map((sesion) => (
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
                      {sesion.hora}
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
          ))}
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
