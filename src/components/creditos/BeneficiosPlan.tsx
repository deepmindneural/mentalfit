import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Beneficio, Plan } from '../../tipos/monetizacion';
import { beneficiosDisponibles } from '../../data/monetizacion';

interface Props {
  planId?: string;
  mostrarTodos?: boolean;
  className?: string;
}

const BeneficiosPlan: React.FC<Props> = ({ planId, mostrarTodos = false, className = '' }) => {
  const { t } = useTranslation();
  const [beneficioExpandido, setBeneficioExpandido] = useState<string | null>(null);
  
  // Filtrar beneficios según el plan o mostrar todos
  const beneficios = mostrarTodos 
    ? beneficiosDisponibles
    : planId
      ? beneficiosDisponibles.filter(b => b.aplicableA.includes(planId))
      : [];
  
  // Función para expandir/contraer un beneficio
  const toggleBeneficio = (id: string) => {
    if (beneficioExpandido === id) {
      setBeneficioExpandido(null);
    } else {
      setBeneficioExpandido(id);
    }
  };
  
  if (beneficios.length === 0) {
    return (
      <div className={`p-4 bg-gray-50 rounded-lg text-center text-gray-500 ${className}`}>
        {planId 
          ? 'Este plan no incluye beneficios adicionales.'
          : 'Selecciona un plan para ver sus beneficios.'}
      </div>
    );
  }
  
  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-lg font-medium text-gray-800">Beneficios incluidos</h3>
      <div className="space-y-2">
        {beneficios.map(beneficio => (
          <div 
            key={beneficio.id} 
            className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-200"
          >
            <div 
              className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
              onClick={() => toggleBeneficio(beneficio.id)}
            >
              <div className="flex items-center">
                <div className="mr-3 text-primario-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium">{beneficio.nombre}</span>
              </div>
              <div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 text-gray-400 transition-transform ${beneficioExpandido === beneficio.id ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {beneficioExpandido === beneficio.id && (
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">{beneficio.descripcion}</p>
                
                <div className="space-y-1 text-xs text-gray-500">
                  {beneficio.valor && (
                    <p>Valor: <span className="font-medium text-gray-700">${beneficio.valor.toLocaleString()} COP</span></p>
                  )}
                  
                  {beneficio.porcentaje && (
                    <p>Descuento: <span className="font-medium text-gray-700">{beneficio.porcentaje}%</span></p>
                  )}
                  
                  {beneficio.duracion && (
                    <p>Duración: <span className="font-medium text-gray-700">{beneficio.duracion} minutos</span></p>
                  )}
                  
                  {beneficio.frecuencia && (
                    <p>Frecuencia: <span className="font-medium text-gray-700">{beneficio.frecuencia}</span></p>
                  )}
                  
                  {beneficio.formato && (
                    <p>Formatos disponibles: <span className="font-medium text-gray-700">{beneficio.formato}</span></p>
                  )}
                  
                  <p className="pt-1 font-medium text-primario-600">{beneficio.condiciones}</p>
                </div>
                
                {mostrarTodos && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    <p className="text-xs text-gray-500 mr-1">Incluido en planes:</p>
                    {beneficio.aplicableA.map(planId => (
                      <span 
                        key={planId} 
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primario-100 text-primario-800"
                      >
                        {planId.replace('plan', 'Plan ')}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeneficiosPlan;
