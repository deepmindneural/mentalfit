'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getRandomImage, getPlaceholderImage, PRESET_IMAGES } from '@/lib/unsplash';
import { Skeleton } from './Skeleton';

interface UnsplashImageProps {
  query: string;
  alt: string;
  className?: string;
  preset?: keyof typeof PRESET_IMAGES;
  width?: number;
  height?: number;
  priority?: boolean;
}

export default function UnsplashImage({
  query,
  alt,
  className = '',
  preset,
  width = 800,
  height = 600,
  priority = false,
}: UnsplashImageProps) {
  const [imageUrl, setImageUrl] = useState<string>(
    preset ? PRESET_IMAGES[preset] : getPlaceholderImage(query)
  );
  const [loading, setLoading] = useState(!preset);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (preset) {
      // Si hay preset, usar esa imagen directamente
      setImageUrl(PRESET_IMAGES[preset]);
      setLoading(false);
      return;
    }

    // Obtener imagen de Unsplash
    getRandomImage(query)
      .then((url) => {
        setImageUrl(url);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading Unsplash image:', err);
        setError(true);
        setLoading(false);
        setImageUrl(getPlaceholderImage(query));
      });
  }, [query, preset]);

  if (loading) {
    return <Skeleton className={className} />;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="object-cover w-full h-full"
        onError={() => {
          setError(true);
          setImageUrl(getPlaceholderImage(query));
        }}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
          Image unavailable
        </div>
      )}
    </div>
  );
}
