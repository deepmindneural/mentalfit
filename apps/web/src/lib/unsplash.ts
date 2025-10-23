import { createApi } from 'unsplash-js';

// Cliente Unsplash (API pública sin autenticación)
// Usar API pública para desarrollo, cambiar a Access Key en producción
const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || 'demo',
});

/**
 * Obtiene una imagen aleatoria de Unsplash por consulta
 * @param consulta - Términos de búsqueda (ej: "terapeuta", "meditación", "oficina")
 * @param orientacion - Orientación de la imagen
 * @returns URL de la imagen
 */
export async function obtenerImagenAleatoria(
  consulta: string,
  orientacion: 'landscape' | 'portrait' | 'squarish' = 'landscape'
): Promise<string> {
  try {
    const resultado = await unsplash.photos.getRandom({
      query: consulta,
      orientation: orientacion,
      count: 1,
    });

    if (resultado.type === 'success' && !Array.isArray(resultado.response)) {
      return resultado.response.urls.regular;
    }

    // Fallback a placeholder si falla
    return obtenerImagenPlaceholder(consulta);
  } catch (error) {
    console.error('Error al obtener imagen de Unsplash:', error);
    return obtenerImagenPlaceholder(consulta);
  }
}

/**
 * Obtiene múltiples imágenes de Unsplash
 * @param consulta - Términos de búsqueda
 * @param cantidad - Cantidad de imágenes
 */
export async function obtenerMultiplesImagenes(
  consulta: string,
  cantidad: number = 10
): Promise<string[]> {
  try {
    const resultado = await unsplash.search.getPhotos({
      query: consulta,
      perPage: cantidad,
      orientation: 'landscape',
    });

    if (resultado.type === 'success') {
      return resultado.response.results.map((foto) => foto.urls.regular);
    }

    return Array(cantidad)
      .fill(0)
      .map(() => obtenerImagenPlaceholder(consulta));
  } catch (error) {
    console.error('Error al obtener múltiples imágenes de Unsplash:', error);
    return Array(cantidad)
      .fill(0)
      .map(() => obtenerImagenPlaceholder(consulta));
  }
}

/**
 * Genera URL de placeholder usando Picsum
 * @param semilla - Semilla para generar imagen consistente
 */
export function obtenerImagenPlaceholder(semilla: string = 'default'): string {
  const hash = semilla.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `https://picsum.photos/seed/${hash}/800/600`;
}

/**
 * URLs predefinidas de alta calidad para diferentes categorías
 */
export const IMAGENES_PREDEFINIDAS = {
  // Profesionales y terapeutas
  terapeuta: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800',
  profesional: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800',
  doctor: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800',
  psicologo: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=800',

  // Salud mental y bienestar
  meditacion: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
  bienestar: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
  yoga: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800',
  naturaleza: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
  relajacion: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800',

  // Oficina y corporativo
  oficina: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  equipo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
  reunion: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
  espacio_trabajo: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
  colaboracion: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800',

  // Tecnología
  laptop: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
  videollamada: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800',
  tecnologia: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',

  // Avatares genéricos
  avatar_hombre: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  avatar_mujer: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  avatar_profesional: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
  avatar_neutral: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
};

/**
 * Hook para usar en componentes client-side
 */
export function usarImagenUnsplash(consulta: string) {
  const [urlImagen, setUrlImagen] = React.useState<string>(obtenerImagenPlaceholder(consulta));
  const [cargando, setCargando] = React.useState(true);

  React.useEffect(() => {
    obtenerImagenAleatoria(consulta).then((url) => {
      setUrlImagen(url);
      setCargando(false);
    });
  }, [consulta]);

  return { urlImagen, cargando };
}

// Evitar error de React en server component
import React from 'react';
