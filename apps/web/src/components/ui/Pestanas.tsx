'use client';

import { ReactNode, useState } from 'react';
import { clsx } from 'clsx';

export interface Pestana {
  id: string;
  etiqueta: string;
  icono?: ReactNode;
  contenido: ReactNode;
  deshabilitada?: boolean;
  insignia?: number | string;
}

interface PropiedadesPestanas {
  pestanas: Pestana[];
  pestanaActiva?: string;
  onChange?: (id: string) => void;
  variante?: 'linea' | 'pills';
  ancho?: 'auto' | 'igual';
}

export default function Pestanas({
  pestanas,
  pestanaActiva: pestanaActivaControlada,
  onChange,
  variante = 'linea',
  ancho = 'auto',
}: PropiedadesPestanas) {
  const [pestanaActivaInterna, setPestanaActivaInterna] = useState(pestanas[0]?.id || '');

  const pestanaActiva = pestanaActivaControlada !== undefined ? pestanaActivaControlada : pestanaActivaInterna;

  const manejarCambio = (id: string) => {
    if (pestanaActivaControlada === undefined) {
      setPestanaActivaInterna(id);
    }
    onChange?.(id);
  };

  const pestanaSeleccionada = pestanas.find((p) => p.id === pestanaActiva);

  if (variante === 'pills') {
    return (
      <div>
        {/* Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {pestanas.map((pestana) => {
            const estaActiva = pestana.id === pestanaActiva;

            return (
              <button
                key={pestana.id}
                onClick={() => !pestana.deshabilitada && manejarCambio(pestana.id)}
                disabled={pestana.deshabilitada}
                className={clsx(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  estaActiva
                    ? 'bg-primary-600 text-white dark:bg-primary-500'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                )}
              >
                {pestana.icono}
                {pestana.etiqueta}
                {pestana.insignia && (
                  <span
                    className={clsx(
                      'px-2 py-0.5 rounded-full text-xs font-semibold',
                      estaActiva
                        ? 'bg-white/20 text-white'
                        : 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                    )}
                  >
                    {pestana.insignia}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Contenido */}
        <div>{pestanaSeleccionada?.contenido}</div>
      </div>
    );
  }

  // Variante línea (default)
  return (
    <div>
      {/* Tabs con línea */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex -mb-px gap-1" aria-label="Pestañas">
          {pestanas.map((pestana) => {
            const estaActiva = pestana.id === pestanaActiva;

            return (
              <button
                key={pestana.id}
                onClick={() => !pestana.deshabilitada && manejarCambio(pestana.id)}
                disabled={pestana.deshabilitada}
                className={clsx(
                  'inline-flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  ancho === 'igual' && 'flex-1 justify-center',
                  estaActiva
                    ? 'border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                )}
              >
                {pestana.icono}
                {pestana.etiqueta}
                {pestana.insignia && (
                  <span
                    className={clsx(
                      'px-2 py-0.5 rounded-full text-xs font-semibold',
                      estaActiva
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    )}
                  >
                    {pestana.insignia}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Contenido */}
      <div className="mt-6">{pestanaSeleccionada?.contenido}</div>
    </div>
  );
}
