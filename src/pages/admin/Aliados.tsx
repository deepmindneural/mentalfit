import React, { useState } from 'react';
import { Aliado } from '../../tipos/monetizacion';
import { obtenerAliados } from '../../data/monetizacion';

const Aliados: React.FC = () => {
  const [aliados, setAliados] = useState<Aliado[]>(obtenerAliados());
  const [modalAbierto, setModalAbierto] = useState(false);
  const [aliadoActual, setAliadoActual] = useState<Aliado | null>(null);
  const [filtro, setFiltro] = useState('');
  
  // Filtrar aliados por nombre o sitio web
  const aliadosFiltrados = aliados.filter(aliado => 
    aliado.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    aliado.sitioWeb.toLowerCase().includes(filtro.toLowerCase())
  );
  
  const abrirModalCrear = () => {
    setAliadoActual(null);
    setModalAbierto(true);
  };
  
  const abrirModalEditar = (aliado: Aliado) => {
    setAliadoActual(aliado);
    setModalAbierto(true);
  };
  
  const cerrarModal = () => {
    setModalAbierto(false);
    setAliadoActual(null);
  };
  
  const cambiarEstadoAliado = (id: string, activo: boolean) => {
    setAliados(aliados.map(aliado => 
      aliado.id === id ? { ...aliado, activo } : aliado
    ));
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Gestión de Aliados</h1>
        <button 
          onClick={abrirModalCrear}
          className="bg-primario-600 px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white hover:bg-primario-700 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nuevo Aliado
        </button>
      </div>
      
      {/* Filtros y búsqueda */}
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
                placeholder="Buscar por nombre o sitio web..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Estado:</span>
            <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primario-500 focus:border-primario-500 sm:text-sm rounded-md">
              <option value="todos">Todos</option>
              <option value="activos">Activos</option>
              <option value="inactivos">Inactivos</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Tabla de aliados */}
      <div className="bg-white overflow-hidden shadow-sm rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aliado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código Afiliado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comisión
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ventas
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comisiones Generadas
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
              {aliadosFiltrados.map((aliado) => (
                <tr key={aliado.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full object-cover" src={aliado.logo} alt={aliado.nombre} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{aliado.nombre}</div>
                        <div className="text-sm text-gray-500">
                          <a href={aliado.sitioWeb} target="_blank" rel="noopener noreferrer" className="text-primario-600 hover:text-primario-900">
                            {aliado.sitioWeb}
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{aliado.codigoAfiliado}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{aliado.comisionPorcentaje}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {aliado.ventas}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${aliado.comisionesGeneradas.toLocaleString()} COP
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${aliado.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {aliado.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => abrirModalEditar(aliado)}
                        className="text-primario-600 hover:text-primario-900"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => cambiarEstadoAliado(aliado.id, !aliado.activo)}
                        className={aliado.activo ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                      >
                        {aliado.activo ? 'Desactivar' : 'Activar'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Estadísticas y KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-primario-50 p-4 rounded-lg border border-primario-200">
          <h3 className="text-lg font-medium text-primario-800 mb-2">Total Aliados</h3>
          <div className="text-3xl font-bold text-primario-600">{aliados.length}</div>
          <div className="mt-2 text-sm text-primario-500">
            {aliados.filter(a => a.activo).length} activos, {aliados.filter(a => !a.activo).length} inactivos
          </div>
        </div>
        
        <div className="bg-secundario-50 p-4 rounded-lg border border-secundario-200">
          <h3 className="text-lg font-medium text-secundario-800 mb-2">Ventas Totales</h3>
          <div className="text-3xl font-bold text-secundario-600">
            {aliados.reduce((acc, aliado) => acc + aliado.ventas, 0)}
          </div>
          <div className="mt-2 text-sm text-secundario-500">
            A través de programas de afiliados
          </div>
        </div>
        
        <div className="bg-acento-50 p-4 rounded-lg border border-acento-200">
          <h3 className="text-lg font-medium text-acento-800 mb-2">Comisiones Pagadas</h3>
          <div className="text-3xl font-bold text-acento-600">
            ${aliados.reduce((acc, aliado) => acc + aliado.comisionesGeneradas, 0).toLocaleString()} COP
          </div>
          <div className="mt-2 text-sm text-acento-500">
            Total de comisiones generadas
          </div>
        </div>
      </div>
      
      {/* Modal para crear/editar aliado */}
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
                      {aliadoActual ? 'Editar Aliado' : 'Crear Nuevo Aliado'}
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                          type="text"
                          id="nombre"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                          placeholder="Nombre del aliado"
                          defaultValue={aliadoActual?.nombre || ''}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="sitioWeb" className="block text-sm font-medium text-gray-700">Sitio Web</label>
                        <input
                          type="url"
                          id="sitioWeb"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                          placeholder="https://ejemplo.com"
                          defaultValue={aliadoActual?.sitioWeb || ''}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="comision" className="block text-sm font-medium text-gray-700">Comisión (%)</label>
                        <input
                          type="number"
                          id="comision"
                          min="0"
                          max="100"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                          placeholder="10"
                          defaultValue={aliadoActual?.comisionPorcentaje || ''}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea
                          id="descripcion"
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                          placeholder="Descripción del aliado"
                          defaultValue={aliadoActual?.descripcion || ''}
                        />
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="activo"
                          type="checkbox"
                          className="h-4 w-4 text-primario-600 focus:ring-primario-500 border-gray-300 rounded"
                          defaultChecked={aliadoActual ? aliadoActual.activo : true}
                        />
                        <label htmlFor="activo" className="ml-2 block text-sm text-gray-900">
                          Activo
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
                  {aliadoActual ? 'Guardar cambios' : 'Crear'}
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

export default Aliados;
