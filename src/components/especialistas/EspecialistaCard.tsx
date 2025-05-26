import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Especialista } from '../../tipos';
import RatingStars from '../shared/RatingStars';

interface EspecialistaCardProps {
  especialista: Especialista;
  destacado?: boolean;
  mostrarDistancia?: boolean;
}

const EspecialistaCard: React.FC<EspecialistaCardProps> = ({ 
  especialista, 
  destacado = false,
  mostrarDistancia = false 
}) => {
  const { t } = useTranslation();
  const { id, nombre, apellido, especialidad, calificacion, fotoPerfil, experiencia, precio, moneda, disponibilidad, descripcion } = especialista;
  
  // Formatear precio segu00fan la moneda
  const formatearPrecio = (precio: number, moneda: 'COP' | 'USD' | 'GBP') => {
    switch (moneda) {
      case 'COP':
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(precio);
      case 'USD':
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(precio);
      case 'GBP':
        return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(precio);
      default:
        return `${precio} ${moneda}`;
    }
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col ${
        destacado 
          ? 'ring-2 ring-primario-500 ring-offset-2' 
          : ''
      }`}
    >
      {/* Banner destacado */}
      {destacado && (
        <div className="bg-gradient-to-r from-primario-500 to-primario-600 text-white py-1.5 px-3 text-center text-sm font-semibold flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {t('especialistaDestacado')}
        </div>
      )}
      
      <div className="p-5 flex-grow flex flex-col">
        {/* Cabecera con foto y datos básicos */}
        <div className="flex items-start gap-4">
          {/* Foto del especialista */}
          <div className="relative">
            <img 
              src={fotoPerfil} 
              alt={`${nombre} ${apellido}`} 
              className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-white"
            />
            {mostrarDistancia && (especialista as any).distancia && (
              <div className="absolute -bottom-2 -right-2 bg-primario-100 text-primario-800 text-xs font-semibold px-2 py-0.5 rounded-full border border-primario-200">
                {(especialista as any).distancia} km
              </div>
            )}
          </div>
          
          {/* Información básica */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{nombre} {apellido}</h3>
                <p className="text-primario-600 font-medium">{especialidad}</p>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-primario-700">
                  {formatearPrecio(precio, moneda)}
                </div>
                <span className="text-xs text-gray-500">{t('porConsulta')}</span>
              </div>
            </div>
            
            {/* Calificación */}
            <div className="mt-2 flex items-center">
              <RatingStars calificacion={calificacion} conTexto={true} />
              <span className="ml-2 text-gray-500 text-xs">({especialista.resenas.length} {t('opiniones')})</span>
            </div>
            
            {/* Etiquetas de datos */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {experiencia} {t('aniosExperiencia')}
              </span>
              
              <span className="inline-flex items-center bg-primario-50 text-primario-700 px-2 py-1 rounded-md text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {especialista.ubicacion.ciudad}
              </span>
              
              <span className="inline-flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {disponibilidad.length > 0 ? disponibilidad[0] : t('disponible')}
              </span>
            </div>
          </div>
        </div>
        
        {/* Descripción breve */}
        <div className="mt-4 text-gray-600 text-sm line-clamp-2 flex-grow">
          {descripcion.substring(0, 120)}...
        </div>
        
        {/* Certificaciones */}
        <div className="mt-3 mb-4">
          <div className="flex flex-wrap gap-1.5">
            {especialista.certificaciones.slice(0, 2).map((certificacion, index) => (
              <span 
                key={index} 
                className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md text-xs font-medium"
              >
                {certificacion.split(' ')[0]}
              </span>
            ))}
            {especialista.certificaciones.length > 2 && (
              <span className="text-blue-600 text-xs font-medium flex items-center">
                +{especialista.certificaciones.length - 2}
              </span>
            )}
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="mt-auto grid grid-cols-2 gap-3">
          <Link 
            to={`/especialistas/${id}`}
            className="bg-white border-2 border-primario-500 text-primario-600 hover:bg-primario-50 py-2 px-4 rounded-lg text-center transition-colors duration-200 text-sm font-bold flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {t('verPerfil')}
          </Link>
          
          <Link 
            to={`/reservar/${id}`}
            className="bg-primario-500 hover:bg-primario-600 text-white py-2 px-4 rounded-lg text-center transition-colors duration-200 text-sm font-bold flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {t('reservarCita')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EspecialistaCard;
