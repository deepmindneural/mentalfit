import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface PropiedadesEsqueleto extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  alto?: string;
  ancho?: string;
}

export default function Esqueleto({ className, alto, ancho, ...props }: PropiedadesEsqueleto) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700',
        className
      )}
      style={{
        height: alto,
        width: ancho,
        ...props.style,
      }}
      {...props}
    />
  );
}
