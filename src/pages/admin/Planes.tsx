import React, { useState } from 'react';
import { Plan } from '../../tipos/monetizacion';
import { planes } from '../../data/monetizacion';

const Planes: React.FC = () => {
  const [planesData, setPlanesData] = useState<Plan[]>(planes);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [planActual, setPlanActual] = useState<Plan | null>(null);
  
  const abrirModalCrear = () => {
    setPlanActual(null);
    setModalAbierto(true);
  };
  
  const abrirModalEditar = (plan: Plan) => {
    setPlanActual(plan);
    setModalAbierto(true);
  };
  
  const cerrarModal = () => {
    setModalAbierto(false);
    setPlanActual(null);
  };
  
  const togglePlanPrincipal = (id: string) => {
    setPlanesData(planesData.map(plan => {
      if (plan.id === id) {
        return { ...plan, popular: true };
      } else if (plan.popular) {
        return { ...plan, popular: false };
      }
      return plan;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Gestiu00f3n de Planes</h1>
        <button 
          onClick={abrirModalCrear}
          className="bg-primario-600 px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white hover:bg-primario-700 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nuevo Plan
        </button>
      </div>
      
      {/* Vista previa de planes */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Previsualizaciu00f3n de Planes</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {planesData.map((plan) => (
            <div 
              key={plan.id} 
              className={`relative bg-white rounded-xl overflow-hidden shadow-md border flex-1 max-w-sm ${plan.popular ? `border-${plan.color}` : 'border-gray-200'}`}
            >
              {plan.popular && (
                <div className={`absolute top-0 right-0 px-4 py-1 ${plan.color} text-white font-semibold text-sm`}>
                  Popular
                </div>
              )}
              <div className={`p-4 ${plan.color} text-white`}>
                <h3 className="text-xl font-bold">{plan.nombre}</h3>
                <p className="mt-1 text-sm opacity-90">{plan.descripcion}</p>
              </div>
              <div className="p-6">
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-3xl font-bold">${plan.precio.toLocaleString()}</span>
                  <span className="text-gray-500 mb-1">/ {plan.periodoFacturacion}</span>
                </div>
                {plan.descuento > 0 && (
                  <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded mb-4">
                    Descuento del {plan.descuento}%
                  </div>
                )}
                <ul className="space-y-3 mb-6">
                  {plan.caracteristicas.map((caracteristica, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{caracteristica}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-2">
                  <button 
                    onClick={() => abrirModalEditar(plan)}
                    className="w-full py-2 px-4 border border-primario-600 text-primario-600 rounded-lg hover:bg-primario-50 transition"
                  >
                    Editar
                  </button>
                  {!plan.popular && (
                    <button 
                      onClick={() => togglePlanPrincipal(plan.id)}
                      className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      Marcar como popular
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Tabla de planes */}
      <div className="bg-white overflow-hidden shadow-sm rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Periodo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descuento
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {planesData.map((plan) => (
                <tr key={plan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${plan.color} mr-3`}></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{plan.nombre}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{plan.descripcion}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${plan.precio.toLocaleString()} COP</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {plan.periodoFacturacion.charAt(0).toUpperCase() + plan.periodoFacturacion.slice(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {plan.descuento > 0 ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {plan.descuento}%
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {plan.popular ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primario-100 text-primario-800">
                        Popular
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Estu00e1ndar
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => abrirModalEditar(plan)}
                        className="text-primario-600 hover:text-primario-900"
                      >
                        Editar
                      </button>
                      {!plan.popular && (
                        <button 
                          onClick={() => togglePlanPrincipal(plan.id)}
                          className="text-amber-600 hover:text-amber-900"
                        >
                          Destacar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modal para crear/editar plan */}
      {modalAbierto && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {planActual ? 'Editar Plan' : 'Crear Nuevo Plan'}
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                          type="text"
                          id="nombre"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                          placeholder="Premium"
                          defaultValue={planActual?.nombre || ''}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripciu00f3n</label>
                        <textarea
                          id="descripcion"
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                          placeholder="Descripciu00f3n del plan"
                          defaultValue={planActual?.descripcion || ''}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="precio" className="block text-sm font-medium text-gray-700">Precio (COP)</label>
                          <input
                            type="number"
                            id="precio"
                            min="0"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                            placeholder="59900"
                            defaultValue={planActual?.precio || ''}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="periodoFacturacion" className="block text-sm font-medium text-gray-700">Periodo de facturaciu00f3n</label>
                          <select
                            id="periodoFacturacion"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                            defaultValue={planActual?.periodoFacturacion || 'mensual'}
                          >
                            <option value="mensual">Mensual</option>
                            <option value="trimestral">Trimestral</option>
                            <option value="anual">Anual</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="descuento" className="block text-sm font-medium text-gray-700">Descuento (%)</label>
                          <input
                            type="number"
                            id="descuento"
                            min="0"
                            max="100"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                            placeholder="0"
                            defaultValue={planActual?.descuento || 0}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
                          <select
                            id="color"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                            defaultValue={planActual?.color || 'bg-primario-600'}
                          >
                            <option value="bg-primario-600">Principal</option>
                            <option value="bg-secundario-600">Secundario</option>
                            <option value="bg-acento-600">Acento</option>
                            <option value="bg-purple-600">Morado</option>
                            <option value="bg-pink-600">Rosa</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Caracteru00edsticas</label>
                        <div className="space-y-2">
                          {(planActual?.caracteristicas || ['', '', '']).map((caracteristica, idx) => (
                            <div key={idx} className="flex">
                              <input
                                type="text"
                                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                                placeholder={`Caracteru00edstica ${idx + 1}`}
                                defaultValue={caracteristica}
                              />
                            </div>
                          ))}
                          <button 
                            type="button"
                            className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-primario-700 bg-primario-100 hover:bg-primario-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primario-500"
                          >
                            + Au00f1adir caracteru00edstica
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="popular"
                          type="checkbox"
                          className="h-4 w-4 text-primario-600 focus:ring-primario-500 border-gray-300 rounded"
                          defaultChecked={planActual ? planActual.popular : false}
                        />
                        <label htmlFor="popular" className="ml-2 block text-sm text-gray-900">
                          Popular (destacado)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primario-600 text-base font-medium text-white hover:bg-primario-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primario-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {planActual ? 'Guardar cambios' : 'Crear'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primario-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Planes;
