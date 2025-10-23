'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

export interface Columna<T> {
  clave: string;
  etiqueta: string;
  renderizar?: (item: T) => ReactNode;
  ordenable?: boolean;
  ancho?: string;
  alineacion?: 'izquierda' | 'centro' | 'derecha';
}

interface PropiedadesTablaDatos<T> {
  datos: T[];
  columnas: Columna<T>[];
  claveFila?: keyof T | ((item: T) => string | number);
  cargando?: boolean;
  vacia?: ReactNode;
  ordenPor?: string;
  direccionOrden?: 'asc' | 'desc';
  alOrdenar?: (clave: string) => void;
  alClickFila?: (item: T) => void;
  filasSeleccionables?: boolean;
  filasSeleccionadas?: Set<string | number>;
  alSeleccionar?: (clave: string | number) => void;
}

export default function TablaDatos<T>({
  datos,
  columnas,
  claveFila = 'id' as keyof T,
  cargando = false,
  vacia,
  ordenPor,
  direccionOrden,
  alOrdenar,
  alClickFila,
  filasSeleccionables = false,
  filasSeleccionadas,
  alSeleccionar,
}: PropiedadesTablaDatos<T>) {
  const obtenerClaveFila = (item: T): string | number => {
    if (typeof claveFila === 'function') {
      return claveFila(item);
    }
    return item[claveFila] as string | number;
  };

  const renderizarIconoOrden = (clave: string) => {
    if (ordenPor !== clave) {
      return <ChevronsUpDown className="h-4 w-4 text-gray-400" />;
    }

    return direccionOrden === 'asc' ? (
      <ChevronUp className="h-4 w-4 text-primary-600" />
    ) : (
      <ChevronDown className="h-4 w-4 text-primary-600" />
    );
  };

  if (cargando) {
    return (
      <div className="w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-100 dark:bg-gray-800" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700" />
          ))}
        </div>
      </div>
    );
  }

  if (datos.length === 0) {
    return (
      <div className="w-full rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
        {vacia || (
          <div className="text-gray-500 dark:text-gray-400">
            <p className="text-lg font-medium">No hay datos disponibles</p>
            <p className="text-sm mt-1">Los datos aparecerán aquí cuando estén disponibles</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        {/* Cabecera */}
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {filasSeleccionables && (
              <th scope="col" className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 dark:border-gray-600"
                  onChange={() => {
                    // Lógica para seleccionar todas
                  }}
                />
              </th>
            )}

            {columnas.map((columna) => (
              <th
                key={columna.clave}
                scope="col"
                className={clsx(
                  'px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
                  columna.alineacion === 'centro' && 'text-center',
                  columna.alineacion === 'derecha' && 'text-right',
                  columna.alineacion === 'izquierda' && 'text-left',
                  !columna.alineacion && 'text-left'
                )}
                style={{ width: columna.ancho }}
              >
                {columna.ordenable ? (
                  <button
                    onClick={() => alOrdenar?.(columna.clave)}
                    className="inline-flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  >
                    {columna.etiqueta}
                    {renderizarIconoOrden(columna.clave)}
                  </button>
                ) : (
                  columna.etiqueta
                )}
              </th>
            ))}
          </tr>
        </thead>

        {/* Cuerpo */}
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {datos.map((item) => {
            const clave = obtenerClaveFila(item);
            const estaSeleccionada = filasSeleccionadas?.has(clave);

            return (
              <tr
                key={clave}
                onClick={() => alClickFila?.(item)}
                className={clsx(
                  'transition-colors',
                  alClickFila && 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800',
                  estaSeleccionada && 'bg-primary-50 dark:bg-primary-900/20'
                )}
              >
                {filasSeleccionables && (
                  <td className="w-12 px-4 py-4">
                    <input
                      type="checkbox"
                      checked={estaSeleccionada}
                      onChange={() => alSeleccionar?.(clave)}
                      onClick={(e) => e.stopPropagation()}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                  </td>
                )}

                {columnas.map((columna) => {
                  const valor = columna.renderizar
                    ? columna.renderizar(item)
                    : (item[columna.clave as keyof T] as ReactNode);

                  return (
                    <td
                      key={columna.clave}
                      className={clsx(
                        'px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100',
                        columna.alineacion === 'centro' && 'text-center',
                        columna.alineacion === 'derecha' && 'text-right'
                      )}
                    >
                      {valor}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
