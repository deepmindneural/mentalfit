import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface RecomendacionDASS21 {
  titulo: string;
  descripcion: string;
  tipo: 'general' | 'depresion' | 'ansiedad' | 'estres';
}

interface RecomendacionesDASS21Props {
  recomendaciones: RecomendacionDASS21[];
}

const RecomendacionesDASS21: React.FC<RecomendacionesDASS21Props> = ({ recomendaciones }) => {
  const { t } = useTranslation();

  if (recomendaciones.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500">{t('sinRecomendaciones')}</p>
      </div>
    );
  }

  // Agrupar recomendaciones por tipo
  const recomendacionesPorTipo = recomendaciones.reduce<Record<string, RecomendacionDASS21[]>>(
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

  // Obtener color por tipo de recomendación
  const getColorTipo = (tipo: string) => {
    switch (tipo) {
      case 'depresion': return 'blue';
      case 'ansiedad': return 'purple';
      case 'estres': return 'teal';
      default: return 'primario';
    }
  };

  // Obtener icono por tipo de recomendación
  const getIconoTipo = (tipo: string) => {
    switch (tipo) {
      case 'depresion':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'ansiedad':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'estres':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
    }
  };

  // Obtener título de sección por tipo
  const getTituloTipo = (tipo: string) => {
    switch (tipo) {
      case 'depresion':
        return t('recomendacionesDepresion');
      case 'ansiedad':
        return t('recomendacionesAnsiedad');
      case 'estres':
        return t('recomendacionesEstres');
      default:
        return t('recomendacionesGenerales');
    }
  };

  // Ordenar tipos para presentar primero generales
  const tiposOrdenados = Object.keys(recomendacionesPorTipo).sort((a, b) => {
    if (a === 'general') return -1;
    if (b === 'general') return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('recomendacionesPersonalizadas')}</h3>
      
      {tiposOrdenados.map((tipo) => (
        <div key={tipo} className="space-y-4">
          <h4 className={`text-${getColorTipo(tipo)}-700 font-medium flex items-center gap-2`}>
            <span className={`bg-${getColorTipo(tipo)}-100 p-1.5 rounded-full text-${getColorTipo(tipo)}-500`}>
              {getIconoTipo(tipo)}
            </span>
            {getTituloTipo(tipo)}
          </h4>
          
          <div className="space-y-3 pl-10">
            {recomendacionesPorTipo[tipo].map((recomendacion, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h5 className="font-medium text-gray-800 mb-1">{recomendacion.titulo}</h5>
                <p className="text-gray-600 text-sm">{recomendacion.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
        <p className="text-sm text-gray-500">{t('masConsejos')}</p>
        <Link
          to="/especialistas"
          className="inline-flex items-center bg-primario-50 hover:bg-primario-100 text-primario-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          {t('encontrarEspecialistas')}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default RecomendacionesDASS21;
