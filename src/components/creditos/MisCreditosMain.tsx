import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCreditos } from '../../context/CreditosContext';
import { useAuth } from '../../context/AuthContext';
import PlanesCreditos from './PlanesCreditos';
import EstadisticasCreditos from './EstadisticasCreditos';
import HistorialServicios from './HistorialServicios';
import BeneficiosPlan from './BeneficiosPlan';

// Importar los componentes desde el archivo MisCreditos.tsx
interface ResumenCreditosProps {
  saldoActual: number;
  creditosGastados: number;
  cargando: boolean;
}

interface HistorialTransaccionesProps {
  transacciones: Array<{
    id: string;
    fechaCreacion: Date;
    concepto: string;
    tipo: 'cargo' | 'abono';
    cantidad: number;
    saldo: number;
    detalles?: string;
    estado: 'completado' | 'pendiente' | 'cancelado';
  }>;
  cargando: boolean;
}

// Componente principal de la página de créditos
const MisCreditosMain: React.FC<{
  ResumenComponent: React.FC<ResumenCreditosProps>;
  HistorialComponent: React.FC<HistorialTransaccionesProps>;
}> = ({ ResumenComponent, HistorialComponent }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sesion } = useAuth();
  const { saldoActual, creditosGastados, transacciones, cargando, obtenerHistorialTransacciones } = useCreditos();
  
  const [tabActiva, setTabActiva] = useState<'resumen' | 'comprar' | 'historial' | 'estadisticas' | 'servicios' | 'beneficios'>('resumen');
  const [historialCompleto, setHistorialCompleto] = useState<any[]>([]);
  const [cargandoHistorial, setCargandoHistorial] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  
  useEffect(() => {
    // Verificar si el usuario está autenticado
    if (!sesion.isAutenticado) {
      navigate('/login');
      return;
    }
    
    // Cargar historial completo cuando se selecciona la pestaña de historial
    if (tabActiva === 'historial' && historialCompleto.length === 0 && !cargandoHistorial) {
      const cargarHistorialCompleto = async () => {
        setCargandoHistorial(true);
        try {
          const historial = await obtenerHistorialTransacciones();
          setHistorialCompleto(historial);
        } catch (error) {
          console.error('Error al cargar historial:', error);
        } finally {
          setCargandoHistorial(false);
        }
      };
      
      cargarHistorialCompleto();
    }
  }, [sesion, navigate, tabActiva, historialCompleto.length, cargandoHistorial, obtenerHistorialTransacciones]);
  
  // Callback cuando se compra un plan
  const handlePlanComprado = () => {
    // Actualizar la clave para refrescar estadísticas
    setRefreshKey(prev => prev + 1);
  };
  
  // Renderizar alerta si no hay saldo disponible
  const renderAlertaSaldo = () => {
    if (saldoActual <= 0 && !cargando && tabActiva === 'resumen') {
      return (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-yellow-700 font-medium">{t('sinSaldoDisponible')}</p>
            <p className="text-yellow-700 text-sm mt-1">{t('adquiereCreditosParaContinuar')}</p>
            <button 
              onClick={() => setTabActiva('comprar')} 
              className="mt-3 px-4 py-2 bg-yellow-100 text-yellow-700 font-medium rounded-lg hover:bg-yellow-200 transition-colors text-sm"
            >
              {t('comprarCreditos')}
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('misCreditos')}</h1>
      <p className="text-gray-600 mb-8">{t('administraTusCreditos')}</p>
      
      {/* Navegación por pestañas */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${tabActiva === 'resumen' ? 'border-primario-600 text-primario-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setTabActiva('resumen')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {t('resumen')}
          </button>
          
          <button
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${tabActiva === 'comprar' ? 'border-primario-600 text-primario-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setTabActiva('comprar')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {t('obtenerCreditos')}
          </button>
          
          <button
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${tabActiva === 'historial' ? 'border-primario-600 text-primario-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setTabActiva('historial')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('historial')}
          </button>
          
          <button
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${tabActiva === 'servicios' ? 'border-primario-600 text-primario-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setTabActiva('servicios')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Servicios
          </button>
          
          <button
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${tabActiva === 'beneficios' ? 'border-primario-600 text-primario-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setTabActiva('beneficios')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Beneficios
          </button>
          
          <button
            className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${tabActiva === 'estadisticas' ? 'border-primario-600 text-primario-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setTabActiva('estadisticas')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            {t('estadisticas')}
          </button>
        </nav>
      </div>
      
      {/* Alerta de saldo bajo si es necesario */}
      {renderAlertaSaldo()}
      
      {/* Contenido según la pestaña seleccionada */}
      <div className="space-y-8">
        {tabActiva === 'resumen' && (
          <>
            <ResumenComponent 
              saldoActual={saldoActual} 
              creditosGastados={creditosGastados} 
              cargando={cargando} 
            />
            
            <HistorialComponent 
              transacciones={transacciones.slice(0, 5)} 
              cargando={cargando} 
            />
            
            {transacciones.length > 5 && (
              <div className="text-center">
                <button 
                  onClick={() => setTabActiva('historial')} 
                  className="text-primario-600 font-medium hover:text-primario-700 transition-colors"
                >
                  {t('verHistorialCompleto')}
                </button>
              </div>
            )}
          </>
        )}
        
        {tabActiva === 'comprar' && (
          <PlanesCreditos onPlanComprado={handlePlanComprado} />
        )}
        
        {tabActiva === 'historial' && (
          <HistorialComponent 
            transacciones={historialCompleto.length > 0 ? historialCompleto : transacciones} 
            cargando={cargandoHistorial || cargando} 
          />
        )}
        
        {tabActiva === 'servicios' && (
          <HistorialServicios usuarioId={sesion.usuario?.id || 'usr001'} />
        )}
        
        {tabActiva === 'beneficios' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Beneficios de tu plan</h2>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-acento-600 text-white mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-9.618 5.04 11.955 11.955 0 019.618 5.04 11.955 11.955 0 019.618-5.04z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Plan Premium</h3>
                      <p className="text-sm text-gray-500">Acceso completo a todos nuestros cuestionarios y soporte personalizado</p>
                    </div>
                  </div>
                </div>
                
                <BeneficiosPlan planId="plan002" />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Beneficios disponibles en otros planes</h2>
                  <button 
                    onClick={() => setTabActiva('comprar')}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primario-600 hover:bg-primario-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primario-500"
                  >
                    Cambiar plan
                  </button>
                </div>
                
                <BeneficiosPlan mostrarTodos={true} />
              </div>
            </div>
          </div>
        )}
        
        {tabActiva === 'estadisticas' && (
          <EstadisticasCreditos refreshKey={refreshKey} />
        )}
      </div>
    </div>
  );
};

export default MisCreditosMain;
