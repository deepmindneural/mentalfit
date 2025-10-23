import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface PropiedadesEsqueleto extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Esqueleto({ className, ...props }: PropiedadesEsqueleto) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700',
        className
      )}
      {...props}
    />
  );
}
