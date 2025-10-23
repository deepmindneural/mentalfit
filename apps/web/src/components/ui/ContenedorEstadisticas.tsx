import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface PropiedadesContenedorEstadisticas {
  titulo: string;
  valor: string | number;
  icono?: LucideIcon;
  cambio?: {
    valor: number;
    tipo: 'aumento' | 'disminucion';
  };
  descripcion?: string;
  color?: 'primario' | 'secundario' | 'exito' | 'advertencia' | 'peligro' | 'informacion';
}

const colores = {
  primario: {
    fondo: 'bg-primary-50 dark:bg-primary-900/20',
    icono: 'text-primary-600 dark:text-primary-400',
    texto: 'text-primary-700 dark:text-primary-300',
  },
  secundario: {
    fondo: 'bg-secondary-50 dark:bg-secondary-900/20',
    icono: 'text-secondary-600 dark:text-secondary-400',
    texto: 'text-secondary-700 dark:text-secondary-300',
  },
  exito: {
    fondo: 'bg-exito-50 dark:bg-exito-900/20',
    icono: 'text-exito-600 dark:text-exito-400',
    texto: 'text-exito-700 dark:text-exito-300',
  },
  advertencia: {
    fondo: 'bg-advertencia-50 dark:bg-advertencia-900/20',
    icono: 'text-advertencia-600 dark:text-advertencia-400',
    texto: 'text-advertencia-700 dark:text-advertencia-300',
  },
  peligro: {
    fondo: 'bg-peligro-50 dark:bg-peligro-900/20',
    icono: 'text-peligro-600 dark:text-peligro-400',
    texto: 'text-peligro-700 dark:text-peligro-300',
  },
  informacion: {
    fondo: 'bg-informacion-50 dark:bg-informacion-900/20',
    icono: 'text-informacion-600 dark:text-informacion-400',
    texto: 'text-informacion-700 dark:text-informacion-300',
  },
};

export default function ContenedorEstadisticas({
  titulo,
  valor,
  icono: Icono,
  cambio,
  descripcion,
  color = 'primario',
}: PropiedadesContenedorEstadisticas) {
  const estilosColor = colores[color];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {titulo}
          </p>

          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {valor}
          </p>

          {cambio && (
            <div className="flex items-center gap-1">
              {cambio.tipo === 'aumento' ? (
                <>
                  <TrendingUp className="h-4 w-4 text-exito-600 dark:text-exito-400" />
                  <span className="text-sm font-medium text-exito-600 dark:text-exito-400">
                    +{cambio.valor}%
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-peligro-600 dark:text-peligro-400" />
                  <span className="text-sm font-medium text-peligro-600 dark:text-peligro-400">
                    -{cambio.valor}%
                  </span>
                </>
              )}

              {descripcion && (
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                  {descripcion}
                </span>
              )}
            </div>
          )}

          {!cambio && descripcion && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {descripcion}
            </p>
          )}
        </div>

        {Icono && (
          <div className={clsx('w-12 h-12 rounded-lg flex items-center justify-center', estilosColor.fondo)}>
            <Icono className={clsx('h-6 w-6', estilosColor.icono)} />
          </div>
        )}
      </div>
    </div>
  );
}
