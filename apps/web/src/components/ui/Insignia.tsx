import { HTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

interface PropiedadesInsignia extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variante?: 'primario' | 'secundario' | 'exito' | 'advertencia' | 'peligro' | 'informacion' | 'gris';
  tamano?: 'sm' | 'md' | 'lg';
  punto?: boolean;
}

const estilosVariante = {
  primario: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
  secundario: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400',
  exito: 'bg-exito-100 text-exito-700 dark:bg-exito-900/30 dark:text-exito-400',
  advertencia: 'bg-advertencia-100 text-advertencia-700 dark:bg-advertencia-900/30 dark:text-advertencia-400',
  peligro: 'bg-peligro-100 text-peligro-700 dark:bg-peligro-900/30 dark:text-peligro-400',
  informacion: 'bg-informacion-100 text-informacion-700 dark:bg-informacion-900/30 dark:text-informacion-400',
  gris: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
};

const estilosTamano = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

const estilosPunto = {
  primario: 'bg-primary-500',
  secundario: 'bg-secondary-500',
  exito: 'bg-exito-500',
  advertencia: 'bg-advertencia-500',
  peligro: 'bg-peligro-500',
  informacion: 'bg-informacion-500',
  gris: 'bg-gray-500',
};

export default function Insignia({
  children,
  variante = 'gris',
  tamano = 'md',
  punto = false,
  className,
  ...props
}: PropiedadesInsignia) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-medium rounded-full',
        estilosVariante[variante],
        estilosTamano[tamano],
        className
      )}
      {...props}
    >
      {punto && (
        <span className={clsx('h-1.5 w-1.5 rounded-full', estilosPunto[variante])} />
      )}
      {children}
    </span>
  );
}
