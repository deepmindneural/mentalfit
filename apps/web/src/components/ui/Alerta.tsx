import { HTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';

interface PropiedadesAlerta extends HTMLAttributes<HTMLDivElement> {
  variante?: 'exito' | 'advertencia' | 'peligro' | 'informacion';
  titulo?: string;
  children: ReactNode;
  cerrable?: boolean;
  alCerrar?: () => void;
  icono?: ReactNode;
}

const configuracionVariante = {
  exito: {
    contenedor: 'bg-exito-50 border-exito-200 dark:bg-exito-900/20 dark:border-exito-800',
    icono: 'text-exito-600 dark:text-exito-400',
    titulo: 'text-exito-800 dark:text-exito-300',
    texto: 'text-exito-700 dark:text-exito-400',
    IconoPredeterminado: CheckCircle,
  },
  advertencia: {
    contenedor: 'bg-advertencia-50 border-advertencia-200 dark:bg-advertencia-900/20 dark:border-advertencia-800',
    icono: 'text-advertencia-600 dark:text-advertencia-400',
    titulo: 'text-advertencia-800 dark:text-advertencia-300',
    texto: 'text-advertencia-700 dark:text-advertencia-400',
    IconoPredeterminado: AlertTriangle,
  },
  peligro: {
    contenedor: 'bg-peligro-50 border-peligro-200 dark:bg-peligro-900/20 dark:border-peligro-800',
    icono: 'text-peligro-600 dark:text-peligro-400',
    titulo: 'text-peligro-800 dark:text-peligro-300',
    texto: 'text-peligro-700 dark:text-peligro-400',
    IconoPredeterminado: AlertCircle,
  },
  informacion: {
    contenedor: 'bg-informacion-50 border-informacion-200 dark:bg-informacion-900/20 dark:border-informacion-800',
    icono: 'text-informacion-600 dark:text-informacion-400',
    titulo: 'text-informacion-800 dark:text-informacion-300',
    texto: 'text-informacion-700 dark:text-informacion-400',
    IconoPredeterminado: Info,
  },
};

export default function Alerta({
  variante = 'informacion',
  titulo,
  children,
  cerrable = false,
  alCerrar,
  icono,
  className,
  ...props
}: PropiedadesAlerta) {
  const config = configuracionVariante[variante];
  const IconoComponente = icono || <config.IconoPredeterminado className="h-5 w-5" />;

  return (
    <div
      className={clsx(
        'relative p-4 border rounded-lg',
        config.contenedor,
        className
      )}
      {...props}
    >
      <div className="flex items-start">
        {/* Icono */}
        <div className={clsx('flex-shrink-0', config.icono)}>
          {IconoComponente}
        </div>

        {/* Contenido */}
        <div className="ml-3 flex-1">
          {titulo && (
            <h3 className={clsx('text-sm font-medium mb-1', config.titulo)}>
              {titulo}
            </h3>
          )}

          <div className={clsx('text-sm', config.texto)}>
            {children}
          </div>
        </div>

        {/* Botón cerrar */}
        {cerrable && alCerrar && (
          <button
            onClick={alCerrar}
            className={clsx(
              'ml-3 flex-shrink-0 inline-flex rounded-lg p-1.5',
              'hover:bg-black/5 dark:hover:bg-white/5 transition-colors',
              config.icono
            )}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
