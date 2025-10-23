'use client';

import { Users, TrendingUp, DollarSign, Heart, AlertCircle, CheckCircle } from 'lucide-react';
import Tarjeta from '@/components/ui/Tarjeta';
import ContenedorEstadisticas from '@/components/ui/ContenedorEstadisticas';
import GraficoBarra from '@/components/ui/GraficoBarra';
import GraficoLinea from '@/components/ui/GraficoLinea';
import BarraProgreso from '@/components/ui/BarraProgreso';
import Insignia from '@/components/ui/Insignia';

const datosDepartamentos = [
  { nombre: 'Ventas', bienestar: 78, empleados: 24 },
  { nombre: 'Tecnología', bienestar: 82, empleados: 45 },
  { nombre: 'Marketing', bienestar: 75, empleados: 18 },
  { nombre: 'RRHH', bienestar: 85, empleados: 12 },
  { nombre: 'Finanzas', bienestar: 80, empleados: 15 },
];

const datosUso = [
  { nombre: 'Ene', sesiones: 124, usuarios: 85 },
  { nombre: 'Feb', sesiones: 142, usuarios: 92 },
  { nombre: 'Mar', sesiones: 156, usuarios: 98 },
  { nombre: 'Abr', sesiones: 178, usuarios: 105 },
  { nombre: 'May', sesiones: 195, usuarios: 112 },
];

export default function PaginaDashboardEmpresa() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Empresa
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Visión general del bienestar de tu organización
        </p>
      </div>

      {/* Estadísticas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ContenedorEstadisticas
          titulo="Empleados Totales"
          valor="114"
          icono={Users}
          cambio={{ valor: 8, tipo: 'aumento' }}
          descripcion="vs. mes anterior"
          color="primario"
        />

        <ContenedorEstadisticas
          titulo="Índice Bienestar"
          valor="80%"
          icono={Heart}
          cambio={{ valor: 5, tipo: 'aumento' }}
          descripcion="promedio empresa"
          color="exito"
        />

        <ContenedorEstadisticas
          titulo="Sesiones Este Mes"
          valor="195"
          icono={TrendingUp}
          cambio={{ valor: 12, tipo: 'aumento' }}
          descripcion="vs. mes anterior"
          color="secundario"
        />

        <ContenedorEstadisticas
          titulo="Inversión Mensual"
          valor="$1,710"
          icono={DollarSign}
          color="informacion"
          descripcion="$15/empleado"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Tarjeta titulo="Uso de la Plataforma" descripcion="Últimos 5 meses">
          <GraficoLinea
            datos={datosUso}
            lineas={[
              { clave: 'sesiones', nombre: 'Sesiones', color: '#22c55e' },
              { clave: 'usuarios', nombre: 'Usuarios Activos', color: '#eab308' },
            ]}
            alto={250}
          />
        </Tarjeta>

        <Tarjeta titulo="Bienestar por Departamento" descripcion="Índice promedio">
          <GraficoBarra
            datos={datosDepartamentos}
            barras={[
              { clave: 'bienestar', nombre: 'Bienestar (%)', color: '#22c55e' },
            ]}
            alto={250}
          />
        </Tarjeta>
      </div>

      {/* Detalles por Departamento */}
      <Tarjeta titulo="Estado por Departamento" descripcion="Resumen de bienestar organizacional">
        <div className="space-y-4 mt-4">
          {datosDepartamentos.map((dept) => (
            <div key={dept.nombre} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {dept.nombre}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {dept.empleados} empleados
                  </p>
                </div>

                <Insignia
                  variante={dept.bienestar >= 80 ? 'exito' : dept.bienestar >= 70 ? 'advertencia' : 'peligro'}
                >
                  {dept.bienestar}% Bienestar
                </Insignia>
              </div>

              <BarraProgreso
                valor={dept.bienestar}
                variante={dept.bienestar >= 80 ? 'exito' : dept.bienestar >= 70 ? 'advertencia' : 'peligro'}
              />
            </div>
          ))}
        </div>
      </Tarjeta>

      {/* Alertas y Acciones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Tarjeta titulo="Alertas Recientes" descripcion="Requieren atención">
          <div className="space-y-3 mt-4">
            {[
              {
                tipo: 'advertencia',
                mensaje: '3 empleados con bajo índice de bienestar en Marketing',
                accion: 'Revisar',
              },
              {
                tipo: 'info',
                mensaje: 'Nueva evaluación trimestral disponible',
                accion: 'Programar',
              },
              {
                tipo: 'exito',
                mensaje: 'Departamento de Tecnología alcanzó 85% de participación',
                accion: 'Ver detalle',
              },
            ].map((alerta, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-3 rounded-lg ${
                  alerta.tipo === 'advertencia'
                    ? 'bg-advertencia-50 dark:bg-advertencia-900/20'
                    : alerta.tipo === 'exito'
                    ? 'bg-exito-50 dark:bg-exito-900/20'
                    : 'bg-informacion-50 dark:bg-informacion-900/20'
                }`}
              >
                {alerta.tipo === 'advertencia' ? (
                  <AlertCircle className="h-5 w-5 text-advertencia-600 dark:text-advertencia-400 mt-0.5 flex-shrink-0" />
                ) : alerta.tipo === 'exito' ? (
                  <CheckCircle className="h-5 w-5 text-exito-600 dark:text-exito-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-informacion-600 dark:text-informacion-400 mt-0.5 flex-shrink-0" />
                )}

                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {alerta.mensaje}
                  </p>
                  <button className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline mt-1">
                    {alerta.accion} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Tarjeta>

        <Tarjeta titulo="Acciones Rápidas" descripcion="Gestión de la empresa">
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[
              { titulo: 'Agregar Empleados', icono: Users },
              { titulo: 'Ver Reportes', icono: TrendingUp },
              { titulo: 'Configurar Beneficios', icono: Heart },
              { titulo: 'Gestionar Facturación', icono: DollarSign },
            ].map((accion, index) => {
              const Icono = accion.icono;
              return (
                <button
                  key={index}
                  className="flex flex-col items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg flex items-center justify-center">
                    <Icono className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                    {accion.titulo}
                  </span>
                </button>
              );
            })}
          </div>
        </Tarjeta>
      </div>
    </div>
  );
}
