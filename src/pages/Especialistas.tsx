import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import EspecialistaFilter from '../components/especialistas/EspecialistaFilter';
import EspecialistasGrid from '../components/especialistas/EspecialistasGrid';
import EspecialistaMap from '../components/especialistas/EspecialistaMap';
import { filtrarEspecialistas, especialistas } from '../data/especialistas';
import { Especialista } from '../tipos';
import WhatsAppButton from '../components/shared/WhatsAppButton';
import IAChat from '../components/shared/IAChat';

const Especialistas: React.FC = () => {
  const { t } = useTranslation();
  const [especialistasFiltrados, setEspecialistasFiltrados] = useState<Especialista[]>(especialistas);
  const [vistaActual, setVistaActual] = useState<'lista' | 'mapa'>('lista');
  const [ubicacionUsuario, setUbicacionUsuario] = useState<{ lat: number; lng: number } | null>(null);
  const [cargandoUbicacion, setCargandoUbicacion] = useState(false);

  // Manejar filtros
  const handleFiltrar = (filtros: { 
    especialidad: string; 
    genero: string; 
    calificacionMinima: number; 
    usarUbicacion: boolean;
  }) => {
    // Si el usuario quiere usar su ubicación pero aún no la tenemos, la obtenemos
    if (filtros.usarUbicacion && !ubicacionUsuario) {
      obtenerUbicacionUsuario();
    }

    const generoFiltro = filtros.genero === 'todos' ? undefined : filtros.genero as 'hombre' | 'mujer' | 'otro';
    
    const filtered = filtrarEspecialistas({ 
      especialidad: filtros.especialidad,
      genero: generoFiltro,
      calificacionMinima: filtros.calificacionMinima,
      ubicacionUsuario: filtros.usarUbicacion ? ubicacionUsuario || undefined : undefined
    });
    
    setEspecialistasFiltrados(filtered);
  };

  // Obtener ubicación del usuario
  const obtenerUbicacionUsuario = () => {
    if (!navigator.geolocation) {
      alert(t('navegadorNoSoportaGeolocalizacion'));
      return;
    }

    setCargandoUbicacion(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUbicacionUsuario({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setCargandoUbicacion(false);
      },
      (error) => {
        console.error('Error obteniendo ubicación:', error);
        alert(t('errorObteniendoUbicacion'));
        setCargandoUbicacion(false);
      }
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Banner */}
      <section className="pt-24 pb-10 bg-primario-600 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">{t('especialistas')}</h1>
          <p className="mt-2">{t('encuentraEspecialistasIdeal')}</p>
        </div>
      </section>
      
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Filtros */}
          <EspecialistaFilter onFiltrar={handleFiltrar} />
          
          {/* Controles de vista */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-600">
              {especialistasFiltrados.length} {t('especialistasEncontrados')}
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setVistaActual('lista')} 
                className={`px-4 py-2 rounded-lg flex items-center ${vistaActual === 'lista' ? 'bg-primario-100 text-primario-700' : 'bg-white text-gray-700'}`}
                aria-label="Ver lista"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                {t('mostrarLista')}
              </button>
              <button 
                onClick={() => setVistaActual('mapa')} 
                className={`px-4 py-2 rounded-lg flex items-center ${vistaActual === 'mapa' ? 'bg-primario-100 text-primario-700' : 'bg-white text-gray-700'}`}
                aria-label="Ver mapa"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                {t('mostrarMapa')}
              </button>
            </div>
          </div>
          
          {/* Vista de especialistas */}
          {vistaActual === 'lista' ? (
            <EspecialistasGrid 
              especialistas={especialistasFiltrados} 
              mostrarDistancia={ubicacionUsuario !== null}
            />
          ) : (
            <EspecialistaMap 
              especialistas={especialistasFiltrados}
              center={ubicacionUsuario || undefined}
              height="600px"
            />
          )}
        </div>
      </main>
      
      <Footer />
      
      {/* WhatsApp Botón flotante */}
      <WhatsAppButton telefono="573001234567" flotante={true} />
      
      {/* Chat IA */}
      <IAChat />
    </div>
  );
};

export default Especialistas;
