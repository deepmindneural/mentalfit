import React from 'react';

interface RatingStarsProps {
  calificacion: number;
  tamano?: 'sm' | 'md' | 'lg';
  colorActivo?: string;
  colorInactivo?: string;
  conTexto?: boolean;
  className?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  calificacion,
  tamano = 'md',
  colorActivo = 'text-yellow-400',
  colorInactivo = 'text-gray-300',
  conTexto = false,
  className = '',
}) => {
  // Redondear a 0.5 mu00e1s cercano
  const calificacionRedondeada = Math.round(calificacion * 2) / 2;
  
  // Determinar el tamau00f1o de las estrellas
  const obtenerTamano = () => {
    switch (tamano) {
      case 'sm': return 'w-3 h-3';
      case 'lg': return 'w-6 h-6';
      case 'md':
      default: return 'w-5 h-5';
    }
  };

  const tamanoEstrellas = obtenerTamano();

  return (
    <div className={`flex items-center ${className}`}>
      {[1, 2, 3, 4, 5].map((estrella) => {
        // Llena
        if (estrella <= Math.floor(calificacionRedondeada)) {
          return (
            <svg 
              key={estrella}
              className={`${tamanoEstrellas} ${colorActivo}`}
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        }
        // Media
        else if (estrella === Math.ceil(calificacionRedondeada) && calificacionRedondeada % 1 !== 0) {
          return (
            <div key={estrella} className="relative">
              {/* Estrella vacu00eda como fondo */}
              <svg 
                className={`${tamanoEstrellas} ${colorInactivo}`}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {/* Media estrella superpuesta */}
              <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                <svg 
                  className={`${tamanoEstrellas} ${colorActivo}`}
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          );
        }
        // Vacu00eda
        else {
          return (
            <svg 
              key={estrella}
              className={`${tamanoEstrellas} ${colorInactivo}`}
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        }
      })}
      
      {conTexto && (
        <span className="ml-2 text-gray-700">
          {calificacion.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
