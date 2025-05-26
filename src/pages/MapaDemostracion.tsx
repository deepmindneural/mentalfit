import React, { useState } from 'react';
import MapaUbicacion from '../components/mapa/MapaUbicacion';
import { useTranslation } from 'react-i18next';
import MainLayout from '../layouts/MainLayout';

const MapaDemostracion: React.FC = () => {
  const { t } = useTranslation();
  const [marcadores, setMarcadores] = useState([
    {
      id: '1',
      latitud: 4.710989,
      longitud: -74.072092,
      titulo: 'Centro de Bogotá',
      descripcion: 'Ubicación central de la ciudad'
    },
    {
      id: '2',
      latitud: 4.698486,
      longitud: -74.051969,
      titulo: 'Centro Clínico MentalFit',
      descripcion: 'Nuestra sede principal'
    },
    {
      id: '3',
      latitud: 4.725252,
      longitud: -74.045148,
      titulo: 'Centro de Bienestar Norte',
      descripcion: 'Especialistas en terapias de ansiedad'
    }
  ]);

  const [tipoMapa, setTipoMapa] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('roadmap');

  const agregarMarcadorPredefinido = (info: { titulo: string, latitud: number, longitud: number, descripcion: string }) => {
    const nuevoMarcador = {
      id: Date.now().toString(),
      latitud: info.latitud,
      longitud: info.longitud,
      titulo: info.titulo,
      descripcion: info.descripcion
    };
    setMarcadores([...marcadores, nuevoMarcador]);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mapa de Ubicaciones</h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Tipo de mapa</h2>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setTipoMapa('roadmap')}
                className={`px-3 py-1 rounded ${tipoMapa === 'roadmap' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Calles
              </button>
              <button 
                onClick={() => setTipoMapa('satellite')}
                className={`px-3 py-1 rounded ${tipoMapa === 'satellite' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Satélite
              </button>
              <button 
                onClick={() => setTipoMapa('hybrid')}
                className={`px-3 py-1 rounded ${tipoMapa === 'hybrid' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Híbrido
              </button>
              <button 
                onClick={() => setTipoMapa('terrain')}
                className={`px-3 py-1 rounded ${tipoMapa === 'terrain' ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Terreno
              </button>
            </div>
          </div>
          <MapaUbicacion 
            latitud={4.710989} 
            longitud={-74.072092} 
            zoom={12}
            altura="500px"
            marcadores={marcadores}
            tipo={tipoMapa}
          />
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 flex-grow max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Información</h2>
            <p className="text-gray-600 mb-3">
              Este mapa muestra las diferentes ubicaciones de los centros de atención de MentalFit en Bogotá.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Cambia el tipo de mapa con los botones superiores</li>
              <li>Encuentra información detallada debajo del mapa</li>
              <li>Usa los controles del mapa para acercar o alejar la vista</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 flex-grow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Agregar ubicación</h2>
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => agregarMarcadorPredefinido({
                  titulo: 'Centro de Atención Sur',
                  latitud: 4.628138, 
                  longitud: -74.064901,
                  descripcion: 'Especialistas en terapia familiar'
                })}
                className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
              >
                Agregar Centro Sur
              </button>
              <button 
                onClick={() => agregarMarcadorPredefinido({
                  titulo: 'Centro de Atención Occidente',
                  latitud: 4.683834, 
                  longitud: -74.120401,
                  descripcion: 'Especialistas en desarrollo personal'
                })}
                className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
              >
                Agregar Centro Occidente
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Centros de atención ({marcadores.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marcadores.map(marcador => (
              <div key={marcador.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow bg-white">
                <h3 className="font-medium text-cyan-700">{marcador.titulo}</h3>
                <p className="text-sm text-gray-600 mt-1">{marcador.descripcion}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Lat: {marcador.latitud.toFixed(6)}, Lng: {marcador.longitud.toFixed(6)}
                </p>
                <button 
                  onClick={() => {
                    const nuevaLista = marcadores.filter(m => m.id !== marcador.id);
                    setMarcadores(nuevaLista);
                  }}
                  className="mt-3 px-2 py-1 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MapaDemostracion;
