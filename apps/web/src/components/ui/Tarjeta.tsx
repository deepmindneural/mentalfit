import { HTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

interface PropiedadesTarjeta extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  titulo?: string;
  descripcion?: string;
  pie?: ReactNode;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const estilosPadding = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Tarjeta({
  children,
  titulo,
  descripcion,
  pie,
  hover = false,
  padding = 'md',
  className,
  ...props
}: PropiedadesTarjeta) {
  return (
    <div
      className={clsx(
        'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700',
        'shadow-sm transition-all duration-200',
        hover && 'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600',
        estilosPadding[padding],
        className
      )}
      {...props}
    >
      {/* Cabecera */}
      {(titulo || descripcion) && (
        <div className={clsx(padding !== 'none' && 'mb-4')}>
          {titulo && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {titulo}
            </h3>
          )}

          {descripcion && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {descripcion}
            </p>
          )}
        </div>
      )}

      {/* Contenido */}
      <div>{children}</div>

      {/* Pie */}
      {pie && (
        <div className={clsx('mt-4 pt-4 border-t border-gray-200 dark:border-gray-700')}>
          {pie}
        </div>
      )}
    </div>
  );
}
