'use client';

import { ReactNode, useState } from 'react';
import { clsx } from 'clsx';

interface PropiedadesTooltip {
  children: ReactNode;
  contenido: string | ReactNode;
  posicion?: 'arriba' | 'abajo' | 'izquierda' | 'derecha';
  retraso?: number;
}

const estilosPosicion = {
  arriba: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  abajo: 'top-full left-1/2 -translate-x-1/2 mt-2',
  izquierda: 'right-full top-1/2 -translate-y-1/2 mr-2',
  derecha: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const estilosFlechaPosicion = {
  arriba: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900 dark:border-t-gray-700',
  abajo: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 dark:border-b-gray-700',
  izquierda: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900 dark:border-l-gray-700',
  derecha: 'right-full top-1/2 -translate-y-1/2 border-r-gray-900 dark:border-r-gray-700',
};

export default function Tooltip({
  children,
  contenido,
  posicion = 'arriba',
  retraso = 200,
}: PropiedadesTooltip) {
  const [visible, setVisible] = useState(false);
  const [temporizador, setTemporizador] = useState<NodeJS.Timeout | null>(null);

  const mostrar = () => {
    const t = setTimeout(() => setVisible(true), retraso);
    setTemporizador(t);
  };

  const ocultar = () => {
    if (temporizador) {
      clearTimeout(temporizador);
      setTemporizador(null);
    }
    setVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={mostrar}
      onMouseLeave={ocultar}
      onFocus={mostrar}
      onBlur={ocultar}
    >
      {children}

      {/* Tooltip */}
      {visible && (
        <div
          className={clsx(
            'absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 dark:bg-gray-700',
            'rounded-lg shadow-lg whitespace-nowrap',
            'animate-aparecer-rapido',
            estilosPosicion[posicion]
          )}
          role="tooltip"
        >
          {contenido}

          {/* Flecha */}
          <div
            className={clsx(
              'absolute w-0 h-0 border-4 border-transparent',
              estilosFlechaPosicion[posicion]
            )}
          />
        </div>
      )}
    </div>
  );
}
