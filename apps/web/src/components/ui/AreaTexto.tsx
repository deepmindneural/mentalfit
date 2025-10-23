import { TextareaHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface PropiedadesAreaTexto extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  etiqueta?: string;
  error?: string;
  ayuda?: string;
  obligatorio?: boolean;
  contadorCaracteres?: boolean;
  maxLength?: number;
}

const AreaTexto = forwardRef<HTMLTextAreaElement, PropiedadesAreaTexto>(
  ({ etiqueta, error, ayuda, obligatorio, contadorCaracteres, maxLength, className, value, ...props }, ref) => {
    const tieneError = Boolean(error);
    const longitudActual = value ? String(value).length : 0;

    return (
      <div className="w-full">
        {/* Etiqueta */}
        <div className="flex items-center justify-between mb-1.5">
          {etiqueta && (
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {etiqueta}
              {obligatorio && <span className="text-peligro-500 ml-1">*</span>}
            </label>
          )}

          {contadorCaracteres && maxLength && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {longitudActual} / {maxLength}
            </span>
          )}
        </div>

        {/* Textarea */}
        <textarea
          ref={ref}
          maxLength={maxLength}
          value={value}
          className={clsx(
            // Estilos base
            'block w-full px-3 py-2 rounded-lg border transition-colors duration-200',
            'text-gray-900 dark:text-white',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-900',
            'resize-y min-h-[100px]',

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

AreaTexto.displayName = 'AreaTexto';

export default AreaTexto;
