import React from 'react';
import { useTranslation } from 'react-i18next';

interface MapaUbicacionProps {
  latitud?: number;
  longitud?: number;
  zoom?: number;
  altura?: string | number;
  marcadores?: Array<{
    id: string;
    latitud: number;
    longitud: number;
    titulo?: string;
    descripcion?: string;
  }>;
  tipo?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
}

const MapaUbicacion: React.FC<MapaUbicacionProps> = ({
  latitud = 4.7110, // Bogotá por defecto
  longitud = -74.0721,
  zoom = 12,
  altura = '400px',
  marcadores = [],
  tipo = 'roadmap'
}) => {
  const { t } = useTranslation();
  
  // Construir la URL de Google Maps con los marcadores
  const generarURLGoogleMaps = () => {
    let url = `https://www.google.com/maps/embed/v1/view?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&center=${latitud},${longitud}&zoom=${zoom}&maptype=${tipo}`;
    
    // Si hay marcadores, añadirlos a la URL
    if (marcadores.length > 0) {
      // Cambiamos a modo 'place' si hay un marcador
      url = url.replace('view', 'place');
      
      // Usamos el primer marcador como punto principal
      url += `&q=${marcadores[0].latitud},${marcadores[0].longitud}`;
      
      // Si hay un título para el primer marcador, usar como etiqueta q
      if (marcadores[0].titulo) {
        url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=${encodeURIComponent(marcadores[0].titulo)}&center=${latitud},${longitud}&zoom=${zoom}`;
      }
    }
    
    return url;
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-md" style={{ height: altura, width: '100%' }}>
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={generarURLGoogleMaps()}
      ></iframe>
      
      {/* Si hay marcadores múltiples, mostramos una lista debajo del mapa */}
      {marcadores.length > 1 && (
        <div className="bg-white p-2 border-t border-gray-200">
          <h3 className="font-medium text-gray-800 text-sm mb-2">{t('Ubicaciones')}</h3>
          <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
            {marcadores.map((marcador) => (
              <div key={marcador.id} className="text-xs p-2 bg-gray-50 rounded">
                <p className="font-medium">{marcador.titulo || `Marcador ${marcador.id}`}</p>
                {marcador.descripcion && <p className="text-gray-600 mt-1">{marcador.descripcion}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapaUbicacion;
