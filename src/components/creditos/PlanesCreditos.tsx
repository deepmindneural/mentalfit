import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreditos } from '../../context/CreditosContext';

interface Plan {
  id: string;
  nombre: string;
  creditos: number;
  precio: number;
  moneda: 'COP' | 'USD';
  vigenciaDias: number;
  descripcion: string;
  popular?: boolean;
  color?: string;
}

interface PlanesCreditosProps {
  onPlanComprado?: () => void;
}

const PlanesCreditos: React.FC<PlanesCreditosProps> = ({ onPlanComprado }) => {
  const { t } = useTranslation();
  const { planesDisponibles, comprarPlan, cargando } = useCreditos();
  const [planSeleccionado, setPlanSeleccionado] = useState<string | null>(null);
  const [procesando, setProcesando] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatearPrecio = (precio: number, moneda: string) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: moneda === 'USD' ? 'USD' : 'COP',
      maximumFractionDigits: moneda === 'COP' ? 0 : 2
    }).format(precio);
  };

  const handleComprarPlan = async () => {
    if (!planSeleccionado) return;
    
    setProcesando(true);
    setError(null);
    
    try {
      const resultado = await comprarPlan(planSeleccionado);
      
      if (resultado) {
        setExito(true);
        setPlanSeleccionado(null);
        if (onPlanComprado) onPlanComprado();
        
        // Resetear mensaje de éxito después de 5 segundos
        setTimeout(() => {
          setExito(false);
        }, 5000);
      } else {
        setError(t('errorComprarPlan'));
      }
    } catch (err) {
      setError(t('errorProcesarPago'));
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">{t('obtenerMasCreditos')}</h3>
        
        {exito && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-green-700">{t('planCompradoExito')}</span>
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-red-700">{error}</span>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cargando ? (
            // Placeholders para planes durante la carga
            [...Array(4)].map((_, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 animate-pulse">
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
                <div className="h-20 w-full bg-gray-200 rounded mb-4"></div>
                <div className="h-8 w-full bg-gray-200 rounded"></div>
              </div>
            ))
          ) : (
            // Planes disponibles
            planesDisponibles.map((plan: Plan) => (
              <div 
                key={plan.id} 
                className={`border rounded-lg overflow-hidden transition-all duration-300 ${planSeleccionado === plan.id ? 'ring-2 ring-primario-500 ring-offset-2' : 'hover:shadow-md'}`}
                onClick={() => setPlanSeleccionado(plan.id)}
              >
                <div className={`p-4 ${plan.color || 'bg-primario-600'} text-white`}>
                  <h4 className="font-bold text-lg">{plan.nombre}</h4>
                  <p className="text-sm opacity-90">{t('vigencia')}: {plan.vigenciaDias} {t('dias')}</p>
                </div>
                
                <div className="p-4">
                  <div className="mb-4">
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-gray-800">{plan.creditos}</span>
                      <span className="ml-1 text-gray-600 text-sm">{t('creditos')}</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">{formatearPrecio(plan.precio, plan.moneda)}</div>
                  </div>
                  
                  <div className="text-sm text-gray-700 mb-4">{plan.descripcion}</div>
                  
                  {plan.popular && (
                    <div className="mb-4">
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {t('popular')}
                      </span>
                    </div>
                  )}
                  
                  <button
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${planSeleccionado === plan.id ? 'bg-primario-600 text-white' : 'bg-gray-100 text-gray-700'} hover:bg-primario-600 hover:text-white`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPlanSeleccionado(plan.id);
                      handleComprarPlan();
                    }}
                    disabled={procesando}
                  >
                    {procesando && planSeleccionado === plan.id ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('procesando')}
                      </div>
                    ) : t('comprar')}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primario-600 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-medium">{t('informacionPago')}</p>
              <p className="mt-1">{t('creditosNoCaducan')}</p>
              <p className="mt-1">{t('pagosSegurosPoweredBy')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanesCreditos;
