import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { clsx } from 'clsx';

interface OpcionRadio {
  valor: string;
  etiqueta: string;
  descripcion?: string;
  deshabilitada?: boolean;
}

interface PropiedadesGrupoRadio extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  opciones: OpcionRadio[];
  etiqueta?: string;
  error?: string;
  obligatorio?: boolean;
  orientacion?: 'vertical' | 'horizontal';
}

const GrupoRadio = forwardRef<HTMLInputElement, PropiedadesGrupoRadio>(
  ({ opciones, etiqueta, error, obligatorio, orientacion = 'vertical', name, value, onChange, ...props }, ref) => {
    const tieneError = Boolean(error);

    return (
      <div className="w-full">
        {/* Etiqueta del grupo */}
        {etiqueta && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {etiqueta}
            {obligatorio && <span className="text-peligro-500 ml-1">*</span>}
          </label>
        )}

        {/* Opciones */}
        <div
          className={clsx(
            'space-y-3',
            orientacion === 'horizontal' && 'flex flex-wrap gap-4 space-y-0'
          )}
        >
          {opciones.map((opcion) => (
            <div key={opcion.valor} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  ref={ref}
                  type="radio"
                  name={name}
                  value={opcion.valor}
                  checked={value === opcion.valor}
                  onChange={onChange}
                  disabled={opcion.deshabilitada}
                  className={clsx(
                    'h-4 w-4 border transition-colors duration-200 cursor-pointer',
                    'text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    tieneError
                      ? 'border-peligro-300 dark:border-peligro-600'
                      : 'border-gray-300 dark:border-gray-600',
                    'dark:bg-gray-800'
                  )}
                  {...props}
                />
              </div>

              <div className="ml-3">
                <label
                  htmlFor={opcion.valor}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  {opcion.etiqueta}
                </label>

                {opcion.descripcion && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {opcion.descripcion}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje de error */}
        {error && (
          <p className="mt-2 text-sm text-peligro-600 dark:text-peligro-400 animate-deslizar-arriba">
            {error}
          </p>
        )}
      </div>
    );
  }
);

GrupoRadio.displayName = 'GrupoRadio';

export default GrupoRadio;
