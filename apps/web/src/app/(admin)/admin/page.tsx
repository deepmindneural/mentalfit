'use client';

import { Building2, Users, UserCog, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import Tarjeta from '@/components/ui/Tarjeta';
import ContenedorEstadisticas from '@/components/ui/ContenedorEstadisticas';
import GraficoLinea from '@/components/ui/GraficoLinea';
import GraficoBarra from '@/components/ui/GraficoBarra';
import Insignia from '@/components/ui/Insignia';
import BarraProgreso from '@/components/ui/BarraProgreso';

const datosIngresos = [
  { nombre: 'Ene', ingresos: 45000, usuarios: 2500 },
  { nombre: 'Feb', ingresos: 52000, usuarios: 2800 },
  { nombre: 'Mar', ingresos: 58000, usuarios: 3100 },
  { nombre: 'Abr', ingresos: 61000, usuarios: 3350 },
  { nombre: 'May', ingresos: 68000, usuarios: 3600 },
  { nombre: 'Jun', ingresos: 75000, usuarios: 3950 },
];

const datosEmpresas = [
  { nombre: '1-50', cantidad: 45 },
  { nombre: '51-200', cantidad: 28 },
  { nombre: '201-500', cantidad: 15 },
  { nombre: '500+', cantidad: 8 },
];

export default function PaginaDashboardAdmin() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard Administrador
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Visión general de la plataforma MentalFit
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-peligro-50 dark:bg-peligro-900/20 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-peligro-600 dark:text-peligro-400" />
          <span className="text-sm font-medium text-peligro-700 dark:text-peligro-300">
            2 alertas críticas
          </span>
        </div>
      </div>

      {/* Estadísticas Globales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ContenedorEstadisticas
          titulo="Empresas Activas"
          valor="96"
          icono={Building2}
          cambio={{ valor: 12, tipo: 'aumento' }}
          descripcion="vs. mes anterior"
          color="primario"
        />

        <ContenedorEstadisticas
          titulo="Usuarios Totales"
          valor="3,950"
          icono={Users}
          cambio={{ valor: 15, tipo: 'aumento' }}
          descripcion="vs. mes anterior"
          color="secundario"
        />

        <ContenedorEstadisticas
          titulo="Profesionales"
          valor="142"
          icono={UserCog}
          cambio={{ valor: 8, tipo: 'aumento' }}
          descripcion="activos"
          color="exito"
        />

        <ContenedorEstadisticas
          titulo="Ingresos MRR"
          valor="$75,000"
          icono={DollarSign}
          cambio={{ valor: 18, tipo: 'aumento' }}
          descripcion="Monthly Recurring Revenue"
          color="informacion"
        />
      </div>

      {/* Gráficos Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Tarjeta titulo="Crecimiento de Ingresos" descripcion="Últimos 6 meses">
          <GraficoLinea
            datos={datosIngresos}
            lineas={[
              { clave: 'ingresos', nombre: 'Ingresos ($)', color: '#22c55e' },
            ]}
            alto={250}
          />
        </Tarjeta>

        <Tarjeta titulo="Distribución de Empresas" descripcion="Por tamaño (empleados)">
          <GraficoBarra
            datos={datosEmpresas}
            barras={[
              { clave: 'cantidad', nombre: 'Empresas', color: '#eab308' },
            ]}
            alto={250}
          />
        </Tarjeta>
      </div>

      {/* Métricas de Rendimiento */}
      <Tarjeta titulo="Indicadores Clave de Rendimiento (KPIs)" descripcion="Métricas de la plataforma">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Tasa de Retención
              </span>
              <span className="text-sm font-bold text-exito-600 dark:text-exito-400">
                94%
              </span>
            </div>
            <BarraProgreso valor={94} variante="exito" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Empresas que renuevan suscripción
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Satisfacción del Usuario
              </span>
              <span className="text-sm font-bold text-exito-600 dark:text-exito-400">
                92%
              </span>
            </div>
            <BarraProgreso valor={92} variante="primario" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Net Promoter Score (NPS)
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Activación de Usuarios
              </span>
              <span className="text-sm font-bold text-advertencia-600 dark:text-advertencia-400">
                78%
              </span>
            </div>
            <BarraProgreso valor={78} variante="advertencia" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Usuarios que completan onboarding
            </p>
          </div>
        </div>
      </Tarjeta>

      {/* Actividad Reciente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Tarjeta titulo="Empresas Recientes" descripcion="Últimos registros">
          <div className="space-y-3 mt-4">
            {[
              { nombre: 'TechCorp SA', plan: 'Empresarial', empleados: 250, fecha: 'Hace 2 horas' },
              { nombre: 'Innovate Labs', plan: 'Profesional', empleados: 85, fecha: 'Hace 5 horas' },
              { nombre: 'Global Solutions', plan: 'Empresarial', empleados: 420, fecha: 'Hace 1 día' },
            ].map((empresa, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {empresa.nombre}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {empresa.empleados} empleados
                  </p>
                </div>

                <div className="text-right">
                  <Insignia variante="primario">{empresa.plan}</Insignia>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {empresa.fecha}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Tarjeta>

        <Tarjeta titulo="Profesionales Pendientes" descripcion="Requieren verificación">
          <div className="space-y-3 mt-4">
            {[
              { nombre: 'Dr. Carlos Méndez', especialidad: 'Psicólogo Clínico', fecha: 'Hace 1 hora' },
              { nombre: 'Dra. Laura Santos', especialidad: 'Psiquiatra', fecha: 'Hace 3 horas' },
              { nombre: 'Dr. Miguel Torres', especialidad: 'Terapeuta', fecha: 'Hace 6 horas' },
            ].map((profesional, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-advertencia-50 dark:bg-advertencia-900/20 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {profesional.nombre}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {profesional.especialidad}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-exito-600 text-white text-sm rounded-lg hover:bg-exito-700">
                    Aprobar
                  </button>
                  <button className="px-3 py-1 bg-peligro-600 text-white text-sm rounded-lg hover:bg-peligro-700">
                    Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Tarjeta>
      </div>
    </div>
  );
}
