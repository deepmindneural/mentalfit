import { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

interface PropiedadesBoton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: 'primario' | 'secundario' | 'peligro' | 'fantasma' | 'enlace';
  tamano?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  cargando?: boolean;
  ancho?: 'ajustado' | 'completo';
  icono?: ReactNode;
  iconoDerecha?: ReactNode;
  children: ReactNode;
}

const estilosVariante = {
  primario: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600',
  secundario: 'bg-secondary-500 text-gray-900 hover:bg-secondary-600 focus:ring-secondary-400',
  peligro: 'bg-peligro-600 text-white hover:bg-peligro-700 focus:ring-peligro-500',
  fantasma: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
  enlace: 'bg-transparent text-primary-600 hover:text-primary-700 hover:underline focus:ring-0 dark:text-primary-400',
};

const estilosTamano = {
  xs: 'px-2 py-1 text-xs rounded',
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-lg',
  xl: 'px-8 py-4 text-lg rounded-xl',
};

export default function Boton({
  variante = 'primario',
  tamano = 'md',
  cargando = false,
  ancho = 'ajustado',
  icono,
  iconoDerecha,
  children,
  className,
  disabled,
  ...props
}: PropiedadesBoton) {
  const clasesFinal = clsx(
    // Estilos base
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',

    // Variante
    estilosVariante[variante],

    // Tamaño
    estilosTamano[tamano],

    // Ancho
    ancho === 'completo' && 'w-full',

    // Clase custom
    className
  );

  return (
    <button
      className={clasesFinal}
      disabled={disabled || cargando}
      {...props}
    >
      {cargando && (
        <Loader2 className="h-4 w-4 animate-girar" />
      )}
      {!cargando && icono && icono}
      {children}
      {!cargando && iconoDerecha && iconoDerecha}
    </button>
  );
}
