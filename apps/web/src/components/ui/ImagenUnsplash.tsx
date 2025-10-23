'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { obtenerImagenAleatoria, obtenerImagenPlaceholder, IMAGENES_PREDEFINIDAS } from '@/lib/unsplash';
import Esqueleto from './Esqueleto';

interface PropiedadesImagenUnsplash {
  consulta: string;
  alt: string;
  className?: string;
  predefinida?: keyof typeof IMAGENES_PREDEFINIDAS;
  ancho?: number;
  alto?: number;
  prioridad?: boolean;
}

export default function ImagenUnsplash({
  consulta,
  alt,
  className = '',
  predefinida,
  ancho = 800,
  alto = 600,
  prioridad = false,
}: PropiedadesImagenUnsplash) {
  const [urlImagen, setUrlImagen] = useState<string>(
    predefinida ? IMAGENES_PREDEFINIDAS[predefinida] : obtenerImagenPlaceholder(consulta)
  );
  const [cargando, setCargando] = useState(!predefinida);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (predefinida) {
      // Si hay imagen predefinida, usar esa imagen directamente
      setUrlImagen(IMAGENES_PREDEFINIDAS[predefinida]);
      setCargando(false);
      return;
    }

    // Obtener imagen de Unsplash
    obtenerImagenAleatoria(consulta)
      .then((url) => {
        setUrlImagen(url);
        setCargando(false);
      })
      .catch((err) => {
        console.error('Error al cargar imagen de Unsplash:', err);
        setError(true);
        setCargando(false);
        setUrlImagen(obtenerImagenPlaceholder(consulta));
      });
  }, [consulta, predefinida]);

  if (cargando) {
    return <Esqueleto className={className} />;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={urlImagen}
        alt={alt}
        width={ancho}
        height={alto}
        priority={prioridad}
        className="object-cover w-full h-full"
        onError={() => {
          setError(true);
          setUrlImagen(obtenerImagenPlaceholder(consulta));
        }}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
          Imagen no disponible
        </div>
      )}
    </div>
  );
}
