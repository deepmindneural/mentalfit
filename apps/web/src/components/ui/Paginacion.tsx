import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { clsx } from 'clsx';

interface PropiedadesPaginacion {
  paginaActual: number;
  totalPaginas: number;
  alCambiarPagina: (pagina: number) => void;
  totalElementos?: number;
  elementosPorPagina?: number;
  mostrarInfo?: boolean;
}

export default function Paginacion({
  paginaActual,
  totalPaginas,
  alCambiarPagina,
  totalElementos,
  elementosPorPagina,
  mostrarInfo = true,
}: PropiedadesPaginacion) {
  const generarNumerosPagina = () => {
    const paginas: (number | string)[] = [];
    const rango = 2; // Mostrar 2 páginas a cada lado de la actual

    for (let i = 1; i <= totalPaginas; i++) {
      if (
        i === 1 ||
        i === totalPaginas ||
        (i >= paginaActual - rango && i <= paginaActual + rango)
      ) {
        paginas.push(i);
      } else if (paginas[paginas.length - 1] !== '...') {
        paginas.push('...');
      }
    }

    return paginas;
  };

  const inicio = (paginaActual - 1) * (elementosPorPagina || 0) + 1;
  const fin = Math.min(paginaActual * (elementosPorPagina || 0), totalElementos || 0);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      {/* Información */}
      {mostrarInfo && totalElementos && elementosPorPagina && (
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Mostrando <span className="font-medium">{inicio}</span> a{' '}
          <span className="font-medium">{fin}</span> de{' '}
          <span className="font-medium">{totalElementos}</span> resultados
        </div>
      )}

      {/* Controles de paginación */}
      <div className="flex items-center gap-1">
        {/* Primera página */}
        <button
          onClick={() => alCambiarPagina(1)}
          disabled={paginaActual === 1}
          className={clsx(
            'p-2 rounded-lg border transition-colors',
            'hover:bg-gray-50 dark:hover:bg-gray-700',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'border-gray-300 dark:border-gray-600'
          )}
          aria-label="Primera página"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>

        {/* Página anterior */}
        <button
          onClick={() => alCambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className={clsx(
            'p-2 rounded-lg border transition-colors',
            'hover:bg-gray-50 dark:hover:bg-gray-700',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'border-gray-300 dark:border-gray-600'
          )}
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Números de página */}
        <div className="hidden sm:flex items-center gap-1">
          {generarNumerosPagina().map((numero, index) => {
            if (numero === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-2 text-gray-500 dark:text-gray-400"
                >
                  ...
                </span>
              );
            }

            const esPaginaActual = numero === paginaActual;

            return (
              <button
                key={numero}
                onClick={() => alCambiarPagina(numero as number)}
                className={clsx(
                  'min-w-[2.5rem] px-3 py-2 rounded-lg border transition-colors text-sm font-medium',
                  esPaginaActual
                    ? 'bg-primary-600 text-white border-primary-600 dark:bg-primary-500'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                )}
              >
                {numero}
              </button>
            );
          })}
        </div>

        {/* Indicador móvil */}
        <div className="sm:hidden px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
          {paginaActual} / {totalPaginas}
        </div>

        {/* Página siguiente */}
        <button
          onClick={() => alCambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className={clsx(
            'p-2 rounded-lg border transition-colors',
            'hover:bg-gray-50 dark:hover:bg-gray-700',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'border-gray-300 dark:border-gray-600'
          )}
          aria-label="Página siguiente"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Última página */}
        <button
          onClick={() => alCambiarPagina(totalPaginas)}
          disabled={paginaActual === totalPaginas}
          className={clsx(
            'p-2 rounded-lg border transition-colors',
            'hover:bg-gray-50 dark:hover:bg-gray-700',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'border-gray-300 dark:border-gray-600'
          )}
          aria-label="Última página"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
