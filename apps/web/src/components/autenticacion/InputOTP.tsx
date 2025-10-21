'use client';

import { useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';

interface PropiedadesInputOTP {
  valor: string;
  onChange: (valor: string) => void;
  longitud?: number;
  deshabilitado?: boolean;
  autoFocus?: boolean;
}

export default function InputOTP({
  valor,
  onChange,
  longitud = 6,
  deshabilitado = false,
  autoFocus = false
}: PropiedadesInputOTP) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const manejarCambio = (indice: number, nuevoValor: string) => {
    // Solo permitir números
    const valorNumerico = nuevoValor.replace(/\D/g, '');

    if (valorNumerico.length > 1) {
      // Si se pega múltiples caracteres, distribuirlos
      const digitos = valorNumerico.slice(0, longitud).split('');
      const nuevoCodigoCompleto = valor.split('');

      digitos.forEach((digito, i) => {
        if (indice + i < longitud) {
          nuevoCodigoCompleto[indice + i] = digito;
        }
      });

      onChange(nuevoCodigoCompleto.join('').slice(0, longitud));

      // Mover el foco al último dígito ingresado o al final
      const siguienteIndice = Math.min(indice + digitos.length, longitud - 1);
      inputRefs.current[siguienteIndice]?.focus();
      return;
    }

    const digitos = valor.split('');
    digitos[indice] = valorNumerico;
    const nuevoCodigo = digitos.join('');
    onChange(nuevoCodigo);

    // Mover al siguiente input si se ingresó un dígito
    if (valorNumerico && indice < longitud - 1) {
      inputRefs.current[indice + 1]?.focus();
    }
  };

  const manejarTecla = (indice: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const digitos = valor.split('');

      if (!digitos[indice] && indice > 0) {
        // Si el campo actual está vacío, mover al anterior y borrar
        inputRefs.current[indice - 1]?.focus();
        digitos[indice - 1] = '';
      } else {
        // Borrar el campo actual
        digitos[indice] = '';
      }

      onChange(digitos.join(''));
    } else if (e.key === 'ArrowLeft' && indice > 0) {
      inputRefs.current[indice - 1]?.focus();
    } else if (e.key === 'ArrowRight' && indice < longitud - 1) {
      inputRefs.current[indice + 1]?.focus();
    }
  };

  const manejarPegar = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const textoPegado = e.clipboardData.getData('text');
    const digitos = textoPegado.replace(/\D/g, '').slice(0, longitud);
    onChange(digitos);

    // Mover el foco al último input o al final
    const ultimoIndice = Math.min(digitos.length, longitud - 1);
    inputRefs.current[ultimoIndice]?.focus();
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: longitud }).map((_, indice) => (
        <input
          key={indice}
          ref={(el) => { inputRefs.current[indice] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={valor[indice] || ''}
          onChange={(e) => manejarCambio(indice, e.target.value)}
          onKeyDown={(e) => manejarTecla(indice, e)}
          onPaste={manejarPegar}
          disabled={deshabilitado}
          className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
        />
      ))}
    </div>
  );
}
