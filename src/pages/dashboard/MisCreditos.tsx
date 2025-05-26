import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MisCreditosMain from '../../components/creditos/MisCreditosMain';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

// Componentes para la página de créditos
const ResumenCreditos: React.FC<{
  saldoActual: number,
  creditosGastados: number,
  cargando: boolean
}> = ({ saldoActual, creditosGastados, cargando }) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-primario-600 to-primario-700 p-6 text-white">
        <h3 className="text-xl font-bold">{t('misCreditos')}</h3>
        <p className="text-primario-100 text-sm">{t('gestionaTusCreditos')}</p>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Saldo disponible */}
        <div className="flex flex-col space-y-2">
          <div className="text-sm text-gray-500">{t('saldoDisponible')}</div>
          {cargando ? (
            <div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-primario-700">{saldoActual}</span>
              <span className="ml-2 text-sm text-gray-500">{t('creditos')}</span>
            </div>
          )}
          <div className="text-xs text-gray-500">
            {t('equivalenteAPesos', { cantidad: (saldoActual * 10000).toLocaleString('es-CO') })}
          </div>
        </div>
        
        {/* Créditos utilizados */}
        <div className="flex flex-col space-y-2">
          <div className="text-sm text-gray-500">{t('creditosUtilizados')}</div>
          {cargando ? (
            <div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-700">{creditosGastados}</span>
              <span className="ml-2 text-sm text-gray-500">{t('creditos')}</span>
            </div>
          )}
          
          {creditosGastados > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-xs text-green-600">{t('excelente')}</span>
              <span className="text-xs text-gray-500">{t('estasInvirtiendo')}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Gráfico de uso o progreso */}
      {!cargando && (
        <div className="px-6 pb-6">
          <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primario-600 transition-all duration-500"
              style={{ 
                width: `${Math.min(creditosGastados / (creditosGastados + saldoActual) * 100, 100)}%`
              }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>{t('creditosUsados')}: {creditosGastados}</span>
            <span>{t('totalCreditos')}: {creditosGastados + saldoActual}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const HistorialTransacciones: React.FC<{
  transacciones: Array<{
    id: string;
    fechaCreacion: Date;
    concepto: string;
    tipo: 'cargo' | 'abono';
    cantidad: number;
    saldo: number;
    detalles?: string;
    estado: 'completado' | 'pendiente' | 'cancelado';
  }>,
  cargando: boolean
}> = ({ transacciones, cargando }) => {
  const { t } = useTranslation();
  
  if (cargando) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4 animate-pulse">
        <div className="h-7 w-60 bg-gray-200 rounded"></div>
        {[1, 2, 3].map(item => (
          <div key={item} className="border-b border-gray-100 pb-4 space-y-2">
            <div className="h-5 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">{t('historialTransacciones')}</h3>
        
        {transacciones.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>{t('sinTransacciones')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transacciones.map(transaccion => (
              <div key={transaccion.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">{transaccion.concepto}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(transaccion.fechaCreacion).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    {transaccion.detalles && (
                      <p className="text-xs text-gray-500 mt-1">{transaccion.detalles}</p>
                    )}
                  </div>
                  
                  <div className={`text-right ${transaccion.tipo === 'abono' ? 'text-green-600' : 'text-red-600'}`}>
                    <span className="font-bold">
                      {transaccion.tipo === 'abono' ? '+' : '-'}{transaccion.cantidad}
                    </span>
                    <p className="text-xs text-gray-500">{t('saldo')}: {transaccion.saldo}</p>
                  </div>
                </div>
                
                <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    transaccion.estado === 'completado' ? 'bg-green-100 text-green-800' :
                    transaccion.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {t(transaccion.estado)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente principal de la página
const MisCreditos: React.FC = () => {
  const { sesion } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  
  // Cerrar el mensaje de bienvenida
  const closeWelcomeMessage = () => {
    setShowWelcomeMessage(false);
    // Podríamos guardar esta preferencia en localStorage
    localStorage.setItem('hideWelcomeMessage', 'true');
  };
  
  // Verificar si debemos mostrar el mensaje de bienvenida al cargar
  useEffect(() => {
    const hideMessage = localStorage.getItem('hideWelcomeMessage');
    if (hideMessage === 'true') {
      setShowWelcomeMessage(false);
    }
  }, []);
  
  // Si el usuario no está autenticado, no mostramos contenido sensible
  if (!sesion?.isAutenticado) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acceso Restringido</h2>
            <p className="text-gray-600 mb-6">Necesitas iniciar sesión para acceder a esta página.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Mensaje de bienvenida personalizado */}
        {showWelcomeMessage && (
          <div className="relative bg-gradient-to-r from-primario-600 to-primario-700 text-white p-4 mb-4">
            <div className="container mx-auto px-4 py-2">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-center mb-3 md:mb-0">
                  <div className="mr-3 bg-white rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primario-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold">¡Bienvenido/a {sesion.usuario?.nombre || 'Carlos'}!</h3>
                    <p className="text-sm text-primario-100">Has completado tu perfil al 85%. ¡Sigue mejorando tu experiencia!</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button 
                    className="mr-4 px-4 py-2 text-sm font-medium bg-white text-primario-700 rounded-md hover:bg-primario-50 transition-colors"
                    onClick={() => navigate('/dashboard/mi-perfil')}
                  >
                    Completar perfil
                  </button>
                  <button 
                    onClick={closeWelcomeMessage}
                    className="text-white hover:text-primario-200 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="container mx-auto px-4 py-6">
          {/* Resumen rápido en tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Tarjeta de créditos disponibles */}
            <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-primario-500">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Créditos disponibles</p>
                  <p className="text-2xl font-bold text-gray-800">35</p>
                </div>
                <div className="bg-primario-100 rounded-full p-2 h-fit">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primario-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs text-gray-500">Equivale a: $350,000 COP</span>
              </div>
            </div>
            
            {/* Tarjeta de servicios contratados */}
            <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-acento-500">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Servicios contratados</p>
                  <p className="text-2xl font-bold text-gray-800">12</p>
                </div>
                <div className="bg-acento-100 rounded-full p-2 h-fit">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-acento-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs text-gray-500">Último: Evaluación psicológica completa</span>
              </div>
            </div>
            
            {/* Tarjeta de plan activo */}
            <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Plan activo</p>
                  <p className="text-2xl font-bold text-gray-800">Premium</p>
                </div>
                <div className="bg-green-100 rounded-full p-2 h-fit">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-9.618 5.04 11.955 11.955 0 019.618 5.04 11.955 11.955 0 019.618-5.04z" />
                  </svg>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs text-gray-500">Renovación: 12/06/2025</span>
              </div>
            </div>
            
            {/* Tarjeta de beneficios disponibles */}
            <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-purple-500">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Beneficios activos</p>
                  <p className="text-2xl font-bold text-gray-800">5</p>
                </div>
                <div className="bg-purple-100 rounded-full p-2 h-fit">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs text-green-600">1 sesión gratuita disponible</span>
              </div>
            </div>
          </div>
        </div>
        
        <MisCreditosMain 
          ResumenComponent={ResumenCreditos} 
          HistorialComponent={HistorialTransacciones} 
        />
      </main>
      <Footer />
    </>
  );
};

export default MisCreditos;
