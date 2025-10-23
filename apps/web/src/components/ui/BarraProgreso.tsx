import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface PropiedadesBarraProgreso extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  valor: number;
  max?: number;
  tamano?: 'sm' | 'md' | 'lg';
  variante?: 'primario' | 'secundario' | 'exito' | 'advertencia' | 'peligro';
  mostrarEtiqueta?: boolean;
  etiqueta?: string;
  animado?: boolean;
}

const estilosTamano = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

const estilosVariante = {
  primario: 'bg-primary-600 dark:bg-primary-500',
  secundario: 'bg-secondary-500 dark:bg-secondary-400',
  exito: 'bg-exito-600 dark:bg-exito-500',
  advertencia: 'bg-advertencia-500 dark:bg-advertencia-400',
  peligro: 'bg-peligro-600 dark:bg-peligro-500',
};

export default function BarraProgreso({
  valor,
  max = 100,
  tamano = 'md',
  variante = 'primario',
  mostrarEtiqueta = false,
  etiqueta,
  animado = false,
  className,
  ...props
}: PropiedadesBarraProgreso) {
  const porcentaje = Math.min(Math.max((valor / max) * 100, 0), 100);

  return (
    <div className={clsx('w-full', className)} {...props}>
      {/* Etiqueta superior */}
      {mostrarEtiqueta && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {etiqueta || 'Progreso'}
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {Math.round(porcentaje)}%
          </span>
        </div>
      )}

      {/* Contenedor de la barra */}
      <div
        className={clsx(
          'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
          estilosTamano[tamano]
        )}
      >
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-500 ease-out',
            estilosVariante[variante],
            animado && 'animate-progreso'
          )}
          style={{ width: `${porcentaje}%` }}
        />
      </div>
    </div>
  );
}
