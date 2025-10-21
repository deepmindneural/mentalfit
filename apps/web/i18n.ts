import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Idiomas soportados
export const idiomas = ['es', 'en'] as const;
export type Idioma = (typeof idiomas)[number];

// Idioma por defecto
export const idiomaDefault: Idioma = 'es';

// Verificar si un idioma es válido
export function esIdiomaValido(idioma: string): idioma is Idioma {
  return idiomas.includes(idioma as Idioma);
}

export default getRequestConfig(async ({ locale }) => {
  // Validar que el idioma sea soportado
  if (!esIdiomaValido(locale)) {
    notFound();
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
