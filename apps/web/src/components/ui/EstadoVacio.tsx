import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { LucideIcon } from 'lucide-react';
import Boton from './Boton';

interface PropiedadesEstadoVacio {
  icono?: LucideIcon;
  titulo: string;
  descripcion?: string;
  accion?: {
    etiqueta: string;
    onClick: () => void;
    icono?: ReactNode;
  };
  ilustracion?: ReactNode;
  className?: string;
}

export default function EstadoVacio({
  icono: Icono,
  titulo,
  descripcion,
  accion,
  ilustracion,
  className,
}: PropiedadesEstadoVacio) {
  return (
    <div className={clsx('flex flex-col items-center justify-center py-12 px-4', className)}>
      {/* Icono o ilustración */}
      {ilustracion ? (
        <div className="mb-4">{ilustracion}</div>
      ) : Icono ? (
        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
          <Icono className="h-8 w-8 text-gray-400 dark:text-gray-500" />
        </div>
      ) : null}

      {/* Contenido */}
      <div className="text-center max-w-md">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {titulo}
        </h3>

        {descripcion && (
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {descripcion}
          </p>
        )}

        {/* Acción */}
        {accion && (
          <Boton
            onClick={accion.onClick}
            variante="primario"
            icono={accion.icono}
          >
            {accion.etiqueta}
          </Boton>
        )}
      </div>
    </div>
  );
}
