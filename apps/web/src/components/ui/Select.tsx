import { SelectHTMLAttributes, ReactNode, forwardRef } from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

interface OpcionSelect {
  valor: string | number;
  etiqueta: string;
  deshabilitado?: boolean;
}

interface PropiedadesSelect extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  etiqueta?: string;
  error?: string;
  ayuda?: string;
  opciones: OpcionSelect[];
  placeholder?: string;
  obligatorio?: boolean;
}

const Select = forwardRef<HTMLSelectElement, PropiedadesSelect>(
  ({ etiqueta, error, ayuda, opciones, placeholder, obligatorio, className, ...props }, ref) => {
    const tieneError = Boolean(error);

    return (
      <div className="w-full">
        {/* Etiqueta */}
        {etiqueta && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {etiqueta}
            {obligatorio && <span className="text-peligro-500 ml-1">*</span>}
          </label>
        )}

        {/* Contenedor del select */}
        <div className="relative">
          <select
            ref={ref}
            className={clsx(
              // Estilos base
              'block w-full px-3 py-2 pr-10 rounded-lg border transition-colors duration-200',
              'text-gray-900 dark:text-white',
              'bg-white dark:bg-gray-800',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-900',
              'appearance-none cursor-pointer',

              // Estados de error
              tieneError
                ? 'border-peligro-300 focus:border-peligro-500 focus:ring-peligro-500 dark:border-peligro-600'
                : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600',

              // Clases custom
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}

            {opciones.map((opcion) => (
              <option
                key={opcion.valor}
                value={opcion.valor}
                disabled={opcion.deshabilitado}
              >
                {opcion.etiqueta}
              </option>
            ))}
          </select>

          {/* Icono de chevron */}
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <p className="mt-1.5 text-sm text-peligro-600 dark:text-peligro-400 animate-deslizar-arriba">
            {error}
          </p>
        )}

        {/* Texto de ayuda */}
        {ayuda && !error && (
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
            {ayuda}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
