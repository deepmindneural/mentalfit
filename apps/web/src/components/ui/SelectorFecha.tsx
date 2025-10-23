'use client';

import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { Calendar, X } from 'lucide-react';
import { clsx } from 'clsx';
import Modal from './Modal';
import 'react-day-picker/dist/style.css';

interface PropiedadesSelectorFecha {
  valor?: Date;
  onChange: (fecha: Date | undefined) => void;
  etiqueta?: string;
  error?: string;
  placeholder?: string;
  deshabilitado?: boolean;
  fechaMinima?: Date;
  fechaMaxima?: Date;
  obligatorio?: boolean;
}

export default function SelectorFecha({
  valor,
  onChange,
  etiqueta,
  error,
  placeholder = 'Seleccionar fecha',
  deshabilitado = false,
  fechaMinima,
  fechaMaxima,
  obligatorio = false,
}: PropiedadesSelectorFecha) {
  const [abierto, setAbierto] = useState(false);

  const fechaFormateada = valor ? format(valor, 'PPP', { locale: es }) : '';

  return (
    <div className="w-full">
      {/* Etiqueta */}
      {etiqueta && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {etiqueta}
          {obligatorio && <span className="text-peligro-500 ml-1">*</span>}
        </label>
      )}

      {/* Input disparador */}
      <div className="relative">
        <button
          type="button"
          onClick={() => !deshabilitado && setAbierto(true)}
          disabled={deshabilitado}
          className={clsx(
            'w-full px-3 py-2 pr-10 text-left rounded-lg border transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error
              ? 'border-peligro-300 focus:border-peligro-500 focus:ring-peligro-500'
              : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600',
            'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
          )}
        >
          <span className={clsx(!valor && 'text-gray-400 dark:text-gray-500')}>
            {fechaFormateada || placeholder}
          </span>
        </button>

        {/* Icono calendario */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <Calendar className="h-4 w-4 text-gray-400" />
        </div>

        {/* Botón limpiar */}
        {valor && !deshabilitado && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(undefined);
            }}
            className="absolute inset-y-0 right-8 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Mensaje de error */}
      {error && (
        <p className="mt-1.5 text-sm text-peligro-600 dark:text-peligro-400">
          {error}
        </p>
      )}

      {/* Modal con calendario */}
      <Modal
        abierto={abierto}
        alCerrar={() => setAbierto(false)}
        titulo="Seleccionar fecha"
        tamano="sm"
      >
        <div className="flex justify-center">
          <DayPicker
            mode="single"
            selected={valor}
            onSelect={(fecha) => {
              onChange(fecha);
              setAbierto(false);
            }}
            locale={es}
            disabled={[
              fechaMinima ? { before: fechaMinima } : false,
              fechaMaxima ? { after: fechaMaxima } : false,
            ].filter(Boolean) as any}
            className="rdp-custom"
          />
        </div>
      </Modal>

      <style jsx global>{`
        .rdp-custom {
          --rdp-accent-color: #22c55e;
          --rdp-background-color: #dcfce7;
        }

        .dark .rdp-custom {
          --rdp-accent-color: #16a34a;
          --rdp-background-color: #052e16;
        }
      `}</style>
    </div>
  );
}
