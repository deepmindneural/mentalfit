import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Transaccion, Plan } from '../../tipos/monetizacion';
import { obtenerTransaccionesPorUsuario } from '../../data/transacciones';
import { planes } from '../../data/monetizacion';

const MisSuscripciones: React.FC = () => {
  const { t } = useTranslation();
  const [planActivo, setPlanActivo] = useState<Plan | null>(planes.find(plan => plan.id === 'plan002') || null);
  const [historialTransacciones, setHistorialTransacciones] = useState<Transaccion[]>(obtenerTransaccionesPorUsuario('usr001'));
  const [modalCancelar, setModalCancelar] = useState(false);
  
  // Filtrar transacciones relacionadas con suscripciones
  const transaccionesSuscripciones = historialTransacciones.filter(t => 
    t.producto.tipo === 'suscripcion' && t.estado === 'completada'
  );
  
  // Formatear fecha
  const formatearFecha = (fechaString: string) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
  
  // Calcular fecha de próximo cobro
  const calcularProximoCobro = () => {
    if (!planActivo) return null;
    
    const ultimaTransaccion = transaccionesSuscripciones
      .filter(t => t.producto.id === planActivo.id)
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())[0];
    
    if (!ultimaTransaccion) return null;
    
    const fechaInicio = new Date(ultimaTransaccion.fecha);
    const fechaProximoCobro = new Date(fechaInicio);
    
    switch (planActivo.periodoFacturacion) {
      case 'mensual':
        fechaProximoCobro.setMonth(fechaProximoCobro.getMonth() + 1);
        break;
      case 'trimestral':
        fechaProximoCobro.setMonth(fechaProximoCobro.getMonth() + 3);
        break;
      case 'anual':
        fechaProximoCobro.setFullYear(fechaProximoCobro.getFullYear() + 1);
        break;
      default:
        return null;
    }
    
    return fechaProximoCobro;
  };
  
  const fechaProximoCobro = calcularProximoCobro();
  
  // Calcular fecha de inicio de suscripción
  const fechaInicioSuscripcion = transaccionesSuscripciones.length > 0 
    ? new Date(transaccionesSuscripciones[transaccionesSuscripciones.length - 1].fecha) 
    : null;
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mis Suscripciones</h1>
          <p className="text-gray-600">Gestiona tus planes de suscripción actuales</p>
        </div>
        <Link 
          to="/planes" 
          className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primario-600 hover:bg-primario-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primario-500"
        >
          Ver planes disponibles
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plan actual */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Plan actual</h2>
              
              {planActivo ? (
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${planActivo.color} text-white mr-4`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-9.618 5.04 11.955 11.955 0 019.618 5.04 11.955 11.955 0 019.618-5.04z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{planActivo.nombre}</h3>
                        <p className="text-gray-500">{planActivo.descripcion}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Activo</span>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <span className="block text-sm text-gray-500">Precio</span>
                        <span className="block text-lg font-medium">${planActivo.precio.toLocaleString()} COP</span>
                        <span className="block text-xs text-gray-500">por {planActivo.periodoFacturacion}</span>
                      </div>
                      
                      <div>
                        <span className="block text-sm text-gray-500">Fecha de inicio</span>
                        <span className="block text-lg font-medium">
                          {fechaInicioSuscripcion ? formatearFecha(fechaInicioSuscripcion.toISOString()) : '-'}
                        </span>
                      </div>
                      
                      <div>
                        <span className="block text-sm text-gray-500">Próximo cobro</span>
                        <span className="block text-lg font-medium">
                          {fechaProximoCobro ? formatearFecha(fechaProximoCobro.toISOString()) : '-'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                    <button 
                      className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primario-500"
                    >
                      Cambiar plan
                    </button>
                    
                    <button 
                      onClick={() => setModalCancelar(true)}
                      className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Cancelar suscripción
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-9.618 5.04 11.955 11.955 0 019.618 5.04 11.955 11.955 0 019.618-5.04z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No tienes un plan activo</h3>
                  <p className="mt-1 text-gray-500">Elige un plan para disfrutar de todos los beneficios premium.</p>
                  <div className="mt-6">
                    <Link
                      to="/planes"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primario-600 hover:bg-primario-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primario-500"
                    >
                      Ver planes disponibles
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Historial de pagos */}
          <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Historial de pagos</h2>
              
              {transaccionesSuscripciones.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Concepto
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Monto
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transaccionesSuscripciones.map((transaccion) => (
                        <tr key={transaccion.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatearFecha(transaccion.fecha)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{transaccion.concepto}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">${transaccion.monto.toLocaleString()} COP</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Completado
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No hay historial de pagos disponible.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Beneficios y estadísticas */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Beneficios de tu plan</h2>
              
              {planActivo ? (
                <div>
                  <ul className="space-y-3">
                    {planActivo.caracteristicas.map((caracteristica, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{caracteristica}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">Suscríbete a un plan para ver los beneficios.</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Estadísticas de uso</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Cuestionarios completados</span>
                    <span className="text-sm font-medium text-gray-700">5/10</span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primario-600" style={{ width: '50%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Sesiones reservadas</span>
                    <span className="text-sm font-medium text-gray-700">3/5</span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-secundario-600" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Recursos descargados</span>
                    <span className="text-sm font-medium text-gray-700">8/20</span>
                  </div>
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-acento-600" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Recomendaciones</h3>
                <p className="text-sm text-gray-600">Completa más cuestionarios para obtener un plan de bienestar personalizado.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de cancelación */}
      {modalCancelar && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setModalCancelar(false)}></div>
            
            <div className="relative z-10 inline-block w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Cancelar suscripción
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      ¿Estás seguro de que deseas cancelar tu suscripción a {planActivo?.nombre}? Perderás acceso a todos los beneficios premium al final del período de facturación actual.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar suscripción
                </button>
                <button
                  type="button"
                  onClick={() => setModalCancelar(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primario-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MisSuscripciones;
