import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { clsx } from 'clsx';

interface PropiedadesInput extends InputHTMLAttributes<HTMLInputElement> {
  etiqueta?: string;
  error?: string;
  ayuda?: string;
  icono?: ReactNode;
  iconoDerecha?: ReactNode;
  obligatorio?: boolean;
}

const Input = forwardRef<HTMLInputElement, PropiedadesInput>(
  ({ etiqueta, error, ayuda, icono, iconoDerecha, obligatorio, className, ...props }, ref) => {
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

        {/* Contenedor del input */}
        <div className="relative">
          {/* Icono izquierdo */}
          {icono && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="text-gray-400">{icono}</div>
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            className={clsx(
              // Estilos base
              'block w-full px-3 py-2 rounded-lg border transition-colors duration-200',
              'text-gray-900 dark:text-white',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-900',

              // Con icono izquierdo
              icono && 'pl-10',

              // Con icono derecho
              iconoDerecha && 'pr-10',

              // Estados de error
              tieneError
                ? 'border-peligro-300 focus:border-peligro-500 focus:ring-peligro-500 dark:border-peligro-600'
                : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600',

              // Modo oscuro
              'dark:bg-gray-800',

              // Clases custom
              className
            )}
            {...props}
          />

          {/* Icono derecho */}
          {iconoDerecha && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <div className="text-gray-400">{iconoDerecha}</div>
            </div>
          )}
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

Input.displayName = 'Input';

export default Input;
