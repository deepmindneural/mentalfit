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
  // Usar idioma por defecto si no se proporciona
  const idiomaActual = locale || idiomaDefault;

  // Validar que el idioma sea soportado
  if (!esIdiomaValido(idiomaActual)) {
    notFound();
  }

  return {
    locale: idiomaActual,
    messages: (await import(`../../messages/${idiomaActual}.json`)).default
  };
});
