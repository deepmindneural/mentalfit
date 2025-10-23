import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

interface PropiedadesCheckbox extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  etiqueta?: ReactNode;
  descripcion?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, PropiedadesCheckbox>(
  ({ etiqueta, descripcion, error, className, ...props }, ref) => {
    const tieneError = Boolean(error);

    return (
      <div className="w-full">
        <div className="flex items-start">
          {/* Checkbox container */}
          <div className="flex items-center h-5">
            <input
              ref={ref}
              type="checkbox"
              className={clsx(
                'h-4 w-4 rounded border transition-colors duration-200 cursor-pointer',
                'text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0',
                'disabled:opacity-50 disabled:cursor-not-allowed',

                tieneError
                  ? 'border-peligro-300 dark:border-peligro-600'
                  : 'border-gray-300 dark:border-gray-600',

                'dark:bg-gray-800',

                className
              )}
              {...props}
            />
          </div>

          {/* Etiqueta y descripción */}
          {(etiqueta || descripcion) && (
            <div className="ml-3">
              {etiqueta && (
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                  {etiqueta}
                </label>
              )}

              {descripcion && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {descripcion}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Mensaje de error */}
        {error && (
          <p className="mt-1.5 text-sm text-peligro-600 dark:text-peligro-400 animate-deslizar-arriba">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
