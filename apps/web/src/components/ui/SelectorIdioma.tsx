'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useTransition } from 'react';

interface SelectorIdiomaProps {
  className?: string;
  showLabels?: boolean;
}

export default function SelectorIdioma({ className = '', showLabels = true }: SelectorIdiomaProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const idiomas = [
    { code: 'es', nombre: 'Español', flag: '🇪🇸' },
    { code: 'en', nombre: 'English', flag: '🇬🇧' }
  ];

  const idiomaActual = idiomas.find(i => i.code === locale) || idiomas[0];

  const cambiarIdioma = (nuevoIdioma: string) => {
    if (nuevoIdioma === locale) {
      setIsOpen(false);
      return;
    }

    startTransition(() => {
      const rutaSinIdioma = pathname.replace(/^\/(es|en)/, '') || '/';
      router.replace(`/${nuevoIdioma}${rutaSinIdioma}`);
      setIsOpen(false);
    });
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`
          inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2
          text-sm font-medium text-gray-700 bg-white border border-gray-300
          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          transition-colors duration-200
          ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-xl">{idiomaActual.flag}</span>
        {showLabels && <span>{idiomaActual.nombre}</span>}
        <svg
          className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {idiomas.map((idioma) => (
                <button
                  key={idioma.code}
                  onClick={() => cambiarIdioma(idioma.code)}
                  disabled={isPending}
                  className={`
                    flex w-full items-center gap-3 px-4 py-2 text-sm
                    transition-colors duration-150
                    ${idioma.code === locale
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                    ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                  role="menuitem"
                >
                  <span className="text-xl">{idioma.flag}</span>
                  <span>{idioma.nombre}</span>
                  {idioma.code === locale && (
                    <svg
                      className="ml-auto h-5 w-5 text-primary-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
