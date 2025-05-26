import React from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Especialista } from '../../tipos';

interface EspecialistaMapProps {
  especialistas: Especialista[];
  height?: string;
  center?: { lat: number; lng: number };
}

const EspecialistaMap: React.FC<EspecialistaMapProps> = ({
  especialistas,
  height = '500px',
  center = { lat: 4.6097, lng: -74.0817 } // Bogotá por defecto
}) => {
  const { t } = useTranslation();
  const [selectedEspecialista, setSelectedEspecialista] = React.useState<Especialista | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'TU_API_KEY' // Reemplazar con tu API key de Google Maps
  });

  const mapContainerStyle = {
    width: '100%',
    height
  };

  const options = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
  };

  // Determinar centro y zoom basado en la lista de especialistas
  const determinarCentroYZoom = () => {
    if (especialistas.length === 0) return { center, zoom: 12 };
    
    if (especialistas.length === 1) {
      return {
        center: {
          lat: especialistas[0].ubicacion.lat,
          lng: especialistas[0].ubicacion.lng
        },
        zoom: 15
      };
    }
    
    // Para múltiples especialistas, podríamos calcular bounds pero
    // por ahora usaremos el centro predefinido con zoom medio
    return { center, zoom: 12 };
  };

  const { center: mapCenter, zoom } = determinarCentroYZoom();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {!isLoaded ? (
        <div className="flex items-center justify-center" style={{ height }}>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primario-500"></div>
        </div>
      ) : (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={zoom}
          options={options}
        >
          {especialistas.map(especialista => (
            <Marker
              key={especialista.id}
              position={{
                lat: especialista.ubicacion.lat,
                lng: especialista.ubicacion.lng
              }}
              onClick={() => setSelectedEspecialista(especialista)}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: new window.google.maps.Size(40, 40)
              }}
            />
          ))}

          {selectedEspecialista && (
            <InfoWindow
              position={{
                lat: selectedEspecialista.ubicacion.lat,
                lng: selectedEspecialista.ubicacion.lng
              }}
              onCloseClick={() => setSelectedEspecialista(null)}
            >
              <div className="p-2 max-w-xs">
                <h3 className="font-semibold text-gray-800">
                  {selectedEspecialista.nombre} {selectedEspecialista.apellido}
                </h3>
                <p className="text-sm text-primario-600">{selectedEspecialista.especialidad}</p>
                <p className="text-xs text-gray-600 mt-1">{selectedEspecialista.ubicacion.direccion}</p>
                <button
                  onClick={() => window.open(`/especialistas/${selectedEspecialista.id}`, '_blank')}
                  className="mt-2 text-sm bg-primario-500 hover:bg-primario-600 text-white px-3 py-1 rounded transition-colors duration-200"
                >
                  {t('verPerfil')}
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default EspecialistaMap;
