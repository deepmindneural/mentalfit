import React, { useState } from 'react';
import { Transaccion } from '../../tipos/monetizacion';
import { obtenerTransacciones } from '../../data/transacciones';

const Transacciones: React.FC = () => {
  const [transaccionesData, setTransaccionesData] = useState<Transaccion[]>(obtenerTransacciones());
  const [filtro, setFiltro] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('todos');
  const [estadoFiltro, setEstadoFiltro] = useState('todos');
  const [modalDetalles, setModalDetalles] = useState(false);
  const [transaccionSeleccionada, setTransaccionSeleccionada] = useState<Transaccion | null>(null);
  
  // Formatear fecha
  const formatearFecha = (fechaString: string) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Filtrar transacciones
  const transaccionesFiltradas = transaccionesData.filter(transaccion => {
    // Filtro por texto (ID, usuario, concepto)
    const filtroTexto = filtro === '' || 
      transaccion.id.toLowerCase().includes(filtro.toLowerCase()) ||
      transaccion.usuario.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      transaccion.concepto.toLowerCase().includes(filtro.toLowerCase());
    
    // Filtro por tipo
    const filtroTipo = tipoFiltro === 'todos' || transaccion.tipo === tipoFiltro;
    
    // Filtro por estado
    const filtroEstado = estadoFiltro === 'todos' || transaccion.estado === estadoFiltro;
    
    return filtroTexto && filtroTipo && filtroEstado;
  });
  
  const verDetallesTransaccion = (transaccion: Transaccion) => {
    setTransaccionSeleccionada(transaccion);
    setModalDetalles(true);
  };
  
  const cerrarModalDetalles = () => {
    setModalDetalles(false);
    setTransaccionSeleccionada(null);
  };
  
  // Calcular estadisticas
  const calcularEstadisticas = () => {
    const ingresos = transaccionesData
      .filter(t => t.tipo === 'ingreso' && t.estado === 'completada')
      .reduce((sum, t) => sum + t.monto, 0);
    
    const reembolsos = transaccionesData
      .filter(t => t.tipo === 'reembolso' && t.estado === 'completada')
      .reduce((sum, t) => sum + t.monto, 0);
    
    const comisiones = transaccionesData
      .filter(t => t.tipo === 'comision' && t.estado === 'completada')
      .reduce((sum, t) => sum + t.monto, 0);
    
    const pendientes = transaccionesData
      .filter(t => t.estado === 'pendiente')
      .reduce((sum, t) => sum + t.monto, 0);
    
    return { ingresos, reembolsos, comisiones, pendientes };
  };
  
  const estadisticas = calcularEstadisticas();

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Transacciones</h1>
        <div className="flex space-x-2">
          <button className="bg-white px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Exportar CSV
          </button>
          <button className="bg-primario-600 px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white hover:bg-primario-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nueva transacciu00f3n
          </button>
        </div>
      </div>
      
      {/* Tarjetas de estadu00edsticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-primario-50 p-4 rounded-lg border border-primario-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-primario-800">Ingresos</h3>
              <p className="text-2xl font-bold text-primario-600">${estadisticas.ingresos.toLocaleString()} COP</p>
            </div>
            <div className="bg-primario-100 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primario-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-red-800">Reembolsos</h3>
              <p className="text-2xl font-bold text-red-600">${estadisticas.reembolsos.toLocaleString()} COP</p>
            </div>
            <div className="bg-red-100 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-secundario-50 p-4 rounded-lg border border-secundario-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-secundario-800">Comisiones</h3>
              <p className="text-2xl font-bold text-secundario-600">${estadisticas.comisiones.toLocaleString()} COP</p>
            </div>
            <div className="bg-secundario-100 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secundario-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-acento-50 p-4 rounded-lg border border-acento-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-acento-800">Pendientes</h3>
              <p className="text-2xl font-bold text-acento-600">${estadisticas.pendientes.toLocaleString()} COP</p>
            </div>
            <div className="bg-acento-100 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-acento-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filtros y bu00fasqueda */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar por ID, usuario o concepto..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div>
              <select 
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primario-500 focus:border-primario-500 sm:text-sm rounded-md"
                value={tipoFiltro}
                onChange={(e) => setTipoFiltro(e.target.value)}
              >
                <option value="todos">Todos los tipos</option>
                <option value="ingreso">Ingresos</option>
                <option value="comision">Comisiones</option>
                <option value="reembolso">Reembolsos</option>
              </select>
            </div>
            <div>
              <select 
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primario-500 focus:border-primario-500 sm:text-sm rounded-md"
                value={estadoFiltro}
                onChange={(e) => setEstadoFiltro(e.target.value)}
              >
                <option value="todos">Todos los estados</option>
                <option value="pendiente">Pendientes</option>
                <option value="completada">Completadas</option>
                <option value="cancelada">Canceladas</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabla de transacciones */}
      <div className="bg-white overflow-hidden shadow-sm rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID / Fecha
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transaccionesFiltradas.map((transaccion) => (
                <tr key={transaccion.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaccion.id}</div>
                    <div className="text-sm text-gray-500">{formatearFecha(transaccion.fecha)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaccion.usuario.nombre}</div>
                    <div className="text-sm text-gray-500">{transaccion.usuario.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaccion.concepto}</div>
                    <div className="text-sm text-gray-500">
                      {transaccion.producto.nombre} ({transaccion.producto.tipo})
                    </div>
                    {transaccion.cuponAplicado && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800 mt-1">
                        Cupu00f3n: {transaccion.cuponAplicado.codigo}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      transaccion.tipo === 'ingreso' 
                        ? 'text-green-700' 
                        : transaccion.tipo === 'reembolso' 
                        ? 'text-red-700' 
                        : 'text-blue-700'
                    }`}>
                      {transaccion.tipo === 'reembolso' ? '-' : ''}
                      ${transaccion.monto.toLocaleString()} COP
                    </div>
                    <div className="text-xs text-gray-500">
                      {transaccion.metodoPago.charAt(0).toUpperCase() + transaccion.metodoPago.slice(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaccion.estado === 'completada' 
                        ? 'bg-green-100 text-green-800' 
                        : transaccion.estado === 'pendiente' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaccion.estado.charAt(0).toUpperCase() + transaccion.estado.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => verDetallesTransaccion(transaccion)}
                        className="text-primario-600 hover:text-primario-900"
                      >
                        Ver detalles
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {transaccionesFiltradas.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No se encontraron transacciones que coincidan con los filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modal de detalles de transacciu00f3n */}
      {modalDetalles && transaccionSeleccionada && (
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
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Detalles de la transacciu00f3n
                      </h3>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaccionSeleccionada.estado === 'completada' 
                          ? 'bg-green-100 text-green-800' 
                          : transaccionSeleccionada.estado === 'pendiente' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaccionSeleccionada.estado.charAt(0).toUpperCase() + transaccionSeleccionada.estado.slice(1)}
                      </span>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">ID:</span>
                        <span className="text-sm font-medium">{transaccionSeleccionada.id}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">Fecha:</span>
                        <span className="text-sm font-medium">{formatearFecha(transaccionSeleccionada.fecha)}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Informaciu00f3n del Usuario</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Nombre:</span>
                          <span className="text-sm font-medium">{transaccionSeleccionada.usuario.nombre}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-500">Email:</span>
                          <span className="text-sm font-medium">{transaccionSeleccionada.usuario.email}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Detalles de la Transacciu00f3n</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Concepto:</span>
                          <span className="text-sm font-medium">{transaccionSeleccionada.concepto}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-500">Producto:</span>
                          <span className="text-sm font-medium">{transaccionSeleccionada.producto.nombre}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-500">Tipo:</span>
                          <span className="text-sm font-medium capitalize">{transaccionSeleccionada.tipo}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-500">Mu00e9todo de pago:</span>
                          <span className="text-sm font-medium capitalize">{transaccionSeleccionada.metodoPago}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm text-gray-500">Monto:</span>
                          <span className={`text-sm font-medium ${
                            transaccionSeleccionada.tipo === 'ingreso' 
                              ? 'text-green-700' 
                              : transaccionSeleccionada.tipo === 'reembolso' 
                              ? 'text-red-700' 
                              : 'text-blue-700'
                          }`}>
                            {transaccionSeleccionada.tipo === 'reembolso' ? '-' : ''}
                            ${transaccionSeleccionada.monto.toLocaleString()} COP
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {transaccionSeleccionada.cuponAplicado && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Cupu00f3n Aplicado</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Cu00f3digo:</span>
                            <span className="text-sm font-medium">{transaccionSeleccionada.cuponAplicado.codigo}</span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-gray-500">Descuento:</span>
                            <span className="text-sm font-medium">
                              {transaccionSeleccionada.cuponAplicado.tipo === 'porcentaje' 
                                ? `${transaccionSeleccionada.cuponAplicado.descuento}%` 
                                : `$${transaccionSeleccionada.cuponAplicado.descuento.toLocaleString()} COP`}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {transaccionSeleccionada.aliadoId && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Informaciu00f3n de Aliado</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">ID de Aliado:</span>
                            <span className="text-sm font-medium">{transaccionSeleccionada.aliadoId}</span>
                          </div>
                          {transaccionSeleccionada.comisionGenerada && (
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm text-gray-500">Comisiu00f3n generada:</span>
                              <span className="text-sm font-medium text-secondary-600">
                                ${transaccionSeleccionada.comisionGenerada.toLocaleString()} COP
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {transaccionSeleccionada.estado === 'pendiente' && (
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primario-600 text-base font-medium text-white hover:bg-primario-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primario-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Completar transacciu00f3n
                  </button>
                )}
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primario-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={cerrarModalDetalles}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transacciones;
