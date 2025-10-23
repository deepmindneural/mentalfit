import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import Image from 'next/image';
import { User } from 'lucide-react';

interface PropiedadesAvatar extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  src?: string | null;
  alt?: string;
  tamano?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  forma?: 'circular' | 'cuadrado';
  iniciales?: string;
  enLinea?: boolean;
  anillo?: boolean;
}

const estilosTamano = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl',
  '2xl': 'h-20 w-20 text-2xl',
};

const tamanosPx = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
  '2xl': 80,
};

export default function Avatar({
  src,
  alt = 'Avatar',
  tamano = 'md',
  forma = 'circular',
  iniciales,
  enLinea = false,
  anillo = false,
  className,
  ...props
}: PropiedadesAvatar) {
  const mostrarImagen = src && src.trim() !== '';

  return (
    <div className={clsx('relative inline-block', className)} {...props}>
      <div
        className={clsx(
          'flex items-center justify-center overflow-hidden bg-primary-100 dark:bg-primary-900/30',
          estilosTamano[tamano],
          forma === 'circular' ? 'rounded-full' : 'rounded-lg',
          anillo && 'ring-2 ring-white dark:ring-gray-800 ring-offset-2'
        )}
      >
        {mostrarImagen ? (
          <Image
            src={src}
            alt={alt}
            width={tamanosPx[tamano]}
            height={tamanosPx[tamano]}
            className="object-cover w-full h-full"
          />
        ) : iniciales ? (
          <span className="font-medium text-primary-700 dark:text-primary-400">
            {iniciales.slice(0, 2).toUpperCase()}
          </span>
        ) : (
          <User className="text-primary-600 dark:text-primary-400" />
        )}
      </div>

      {/* Indicador en línea */}
      {enLinea && (
        <span
          className={clsx(
            'absolute bottom-0 right-0 block rounded-full bg-exito-500 ring-2 ring-white dark:ring-gray-800',
            tamano === 'xs' && 'h-1.5 w-1.5',
            tamano === 'sm' && 'h-2 w-2',
            (tamano === 'md' || tamano === 'lg') && 'h-2.5 w-2.5',
            (tamano === 'xl' || tamano === '2xl') && 'h-3 w-3'
          )}
        />
      )}
    </div>
  );
}
