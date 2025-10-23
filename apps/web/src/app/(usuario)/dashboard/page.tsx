'use client';

import { Heart, Brain, TrendingUp, Calendar, User, MessageSquare, BookOpen } from 'lucide-react';
import Tarjeta from '@/components/ui/Tarjeta';
import ContenedorEstadisticas from '@/components/ui/ContenedorEstadisticas';
import Boton from '@/components/ui/Boton';
import BarraProgreso from '@/components/ui/BarraProgreso';
import Insignia from '@/components/ui/Insignia';
import GraficoLinea from '@/components/ui/GraficoLinea';

const datosProgreso = [
  { nombre: 'Sem 1', bienestar: 65 },
  { nombre: 'Sem 2', bienestar: 68 },
  { nombre: 'Sem 3', bienestar: 72 },
  { nombre: 'Sem 4', bienestar: 75 },
  { nombre: 'Sem 5', bienestar: 78 },
  { nombre: 'Sem 6', bienestar: 82 },
];

export default function PaginaDashboardUsuario() {
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
              <span className="text-5xl font-bold text-primary-600 dark:text-primary-400">82</span>
              <span className="text-xl text-gray-500 dark:text-gray-400">/ 100</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="h-4 w-4 text-exito-600" />
              <span className="text-sm font-medium text-exito-600">+6 puntos vs. mes anterior</span>
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
              <span className="text-sm font-medium">85%</span>
            </div>
            <BarraProgreso valor={85} variante="exito" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Manejo del Estrés</span>
              <span className="text-sm font-medium">78%</span>
            </div>
            <BarraProgreso valor={78} variante="primario" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Calidad del Sueño</span>
              <span className="text-sm font-medium">83%</span>
            </div>
            <BarraProgreso valor={83} variante="secundario" />
          </div>
        </div>
      </Tarjeta>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ContenedorEstadisticas
          titulo="Sesiones Completadas"
          valor="12"
          icono={Calendar}
          color="primario"
          descripcion="Este mes"
        />

        <ContenedorEstadisticas
          titulo="Días de Racha"
          valor="15"
          icono={TrendingUp}
          cambio={{ valor: 5, tipo: 'aumento' }}
          color="exito"
          descripcion="Récord personal"
        />

        <ContenedorEstadisticas
          titulo="Recursos Completados"
          valor="8"
          icono={BookOpen}
          color="informacion"
          descripcion="Artículos y videos"
        />

        <ContenedorEstadisticas
          titulo="Evaluaciones"
          valor="3"
          icono={Brain}
          color="secundario"
          descripcion="Realizadas"
        />
      </div>

      {/* Progreso Semanal */}
      <Tarjeta titulo="Tu Progreso" descripcion="Últimas 6 semanas">
        <GraficoLinea
          datos={datosProgreso}
          lineas={[
            { clave: 'bienestar', nombre: 'Índice de Bienestar', color: '#22c55e' },
          ]}
          alto={250}
        />
      </Tarjeta>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Tarjeta titulo="Próxima Sesión" descripcion="Agendada para mañana">
          <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Dr. María González
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Psicóloga Clínica
                </p>
              </div>
              <Insignia variante="primario">Video</Insignia>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <Calendar className="h-4 w-4" />
              <span>Mañana, 25 Enero - 10:00 AM</span>
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
        </Tarjeta>

        <Tarjeta titulo="Recursos Recomendados" descripcion="Basados en tu perfil">
          <div className="mt-4 space-y-3">
            {[
              {
                titulo: 'Técnicas de Respiración',
                tipo: 'Video',
                duracion: '8 min',
              },
              {
                titulo: 'Mindfulness para Principiantes',
                tipo: 'Artículo',
                duracion: '5 min',
              },
              {
                titulo: 'Gestión del Estrés Laboral',
                tipo: 'Guía',
                duracion: '12 min',
              },
            ].map((recurso, index) => (
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
