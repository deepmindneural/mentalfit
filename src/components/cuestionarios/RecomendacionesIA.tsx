import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Recomendacion } from '../../tipos';

interface RecomendacionesIAProps {
  recomendaciones: Recomendacion[];
}

const RecomendacionesIA: React.FC<RecomendacionesIAProps> = ({ recomendaciones }) => {
  const { t } = useTranslation();

  if (recomendaciones.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500">{t('sinRecomendaciones')}</p>
      </div>
    );
  }

  // Agrupar recomendaciones por tipo
  const recomendacionesPorTipo = recomendaciones.reduce<Record<string, Recomendacion[]>>(
    (grouped, recomendacion) => {
      const tipo = recomendacion.tipo;
      if (!grouped[tipo]) {
        grouped[tipo] = [];
      }
      grouped[tipo].push(recomendacion);
      return grouped;
    },
    {}
  );

  // Obtener icono por tipo de recomendación
  const getIconoTipo = (tipo: string) => {
    switch (tipo) {
      case 'ejercicio':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'meditacion':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'especialista':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'recurso':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  // Obtener color de fondo por tipo de recomendación
  const getColorTipo = (tipo: string) => {
    switch (tipo) {
      case 'ejercicio':
        return 'bg-green-100 text-green-800';
      case 'meditacion':
        return 'bg-blue-100 text-blue-800';
      case 'especialista':
        return 'bg-purple-100 text-purple-800';
      case 'recurso':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">{t('recomendacionesIA')}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(recomendacionesPorTipo).map(([tipo, recomendaciones]) => (
          <div key={tipo} className="space-y-4">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getColorTipo(tipo)}`}>
              <span className="mr-2">{getIconoTipo(tipo)}</span>
              {t(`tipo${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`)}
            </div>
            
            {recomendaciones.map((recomendacion) => (
              <div 
                key={recomendacion.id} 
                className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <h4 className="font-semibold text-gray-800 mb-2">{recomendacion.titulo}</h4>
                <p className="text-gray-600 text-sm mb-3">{recomendacion.descripcion}</p>
                
                {recomendacion.enlace && (
                  <a 
                    href={recomendacion.enlace} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primario-600 hover:text-primario-700 text-sm font-medium inline-flex items-center"
                  >
                    {t('explorarRecurso')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                
                {recomendacion.especialistaId && (
                  <Link 
                    to={`/especialistas/${recomendacion.especialistaId}`}
                    className="text-primario-600 hover:text-primario-700 text-sm font-medium inline-flex items-center"
                  >
                    {t('verEspecialista')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecomendacionesIA;
