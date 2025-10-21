'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function SelectorIdioma() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const cambiarIdioma = (nuevoIdioma: string) => {
    startTransition(() => {
      // Remover el locale actual del pathname si existe
      const pathSinLocale = pathname.replace(/^\/(es|en)/, '');

      // Si es español, no agregar prefijo (as-needed)
      const nuevaRuta = nuevoIdioma === 'es'
        ? pathSinLocale || '/'
        : `/${nuevoIdioma}${pathSinLocale || '/'}`;

      router.push(nuevaRuta);
      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => cambiarIdioma('es')}
        disabled={locale === 'es' || isPending}
        className={`
          px-3 py-1.5 rounded-lg text-sm font-medium transition-all
          ${locale === 'es'
            ? 'bg-primary-500 text-white cursor-default'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }
          ${isPending ? 'opacity-50 cursor-wait' : ''}
        `}
        aria-label="Cambiar a español"
      >
        🇪🇸 ES
      </button>

      <button
        onClick={() => cambiarIdioma('en')}
        disabled={locale === 'en' || isPending}
        className={`
          px-3 py-1.5 rounded-lg text-sm font-medium transition-all
          ${locale === 'en'
            ? 'bg-primary-500 text-white cursor-default'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }
          ${isPending ? 'opacity-50 cursor-wait' : ''}
        `}
        aria-label="Switch to English"
      >
        🇺🇸 EN
      </button>
    </div>
  );
}
