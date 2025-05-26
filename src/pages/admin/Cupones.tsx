import React, { useState } from 'react';
import { Cupon, Aliado } from '../../tipos/monetizacion';
import { cupones } from '../../data/monetizacion';
import { obtenerAliados } from '../../data/monetizacion';

const Cupones: React.FC = () => {
  const [cuponesData, setCuponesData] = useState<Cupon[]>(cupones);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [cuponActual, setCuponActual] = useState<Cupon | null>(null);
  const [aliados] = useState<Aliado[]>(obtenerAliados());
  const [filtro, setFiltro] = useState('');
  
  // Obtener la fecha actual en formato YYYY-MM-DD para inputs de tipo date
  const obtenerFechaActual = () => {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  };
  
  // Filtrar cupones por código o tipo de aplicación
  const cuponesFiltrados = cuponesData.filter(cupon => 
    cupon.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
    cupon.aplicableA.toLowerCase().includes(filtro.toLowerCase())
  );
  
  const abrirModalCrear = () => {
    setCuponActual(null);
    setModalAbierto(true);
  };
  
  const abrirModalEditar = (cupon: Cupon) => {
    setCuponActual(cupon);
    setModalAbierto(true);
  };
  
  const cerrarModal = () => {
    setModalAbierto(false);
    setCuponActual(null);
  };
  
  const cambiarEstadoCupon = (id: string, activo: boolean) => {
    setCuponesData(cuponesData.map(cupon => 
      cupon.id === id ? { ...cupon, activo } : cupon
    ));
  };
  
  // Formatear fecha de YYYY-MM-DD a formato legible
  const formatearFecha = (fechaString: string) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };
  
  // Obtener nombre del aliado por ID
  const obtenerNombreAliado = (aliadoId?: string) => {
    if (!aliadoId) return 'N/A';
    const aliado = aliados.find(a => a.id === aliadoId);
    return aliado ? aliado.nombre : 'N/A';
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Gestión de Cupones</h1>
        <button 
          onClick={abrirModalCrear}
          className="bg-primario-600 px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white hover:bg-primario-700 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nuevo Cupón
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
                placeholder="Buscar por código o tipo..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <div>
              <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primario-500 focus:border-primario-500 sm:text-sm rounded-md">
                <option value="todos">Todos los estados</option>
                <option value="activos">Activos</option>
                <option value="inactivos">Inactivos</option>
              </select>
            </div>
            <div>
              <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primario-500 focus:border-primario-500 sm:text-sm rounded-md">
                <option value="todos">Todos los tipos</option>
                <option value="porcentaje">Porcentaje</option>
                <option value="fijo">Valor fijo</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabla de cupones */}
      <div className="bg-white overflow-hidden shadow-sm rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descuento
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usos
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aplicable a
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aliado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vigencia
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
              {cuponesFiltrados.map((cupon) => (
                <tr key={cupon.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{cupon.codigo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {cupon.tipo === 'porcentaje' 
                        ? `${cupon.descuento}%` 
                        : `$${cupon.descuento.toLocaleString()} COP`}
                    </div>
                    {cupon.montoMinimo && (
                      <div className="text-xs text-gray-500">
                        Mínimo: ${cupon.montoMinimo.toLocaleString()} COP
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{cupon.usos} / {cupon.usosMaximos}</div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-primario-600 h-1.5 rounded-full" 
                        style={{ width: `${(cupon.usos / cupon.usosMaximos) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={
                      `px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        cupon.aplicableA === 'todos' 
                          ? 'bg-purple-100 text-purple-800' 
                          : cupon.aplicableA === 'cuestionarios' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                      }`
                    }>
                      {cupon.aplicableA === 'todos' 
                        ? 'Todos los productos' 
                        : cupon.aplicableA === 'cuestionarios' 
                          ? 'Cuestionarios' 
                          : 'Sesiones'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {obtenerNombreAliado(cupon.aliadoId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatearFecha(cupon.fechaInicio)} a {formatearFecha(cupon.fechaFin)}
                    </div>
                    {
                      new Date(cupon.fechaFin) < new Date() && (
                        <span className="text-xs text-red-500">Expirado</span>
                      )
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${cupon.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {cupon.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => abrirModalEditar(cupon)}
                        className="text-primario-600 hover:text-primario-900"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => cambiarEstadoCupon(cupon.id, !cupon.activo)}
                        className={cupon.activo ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                      >
                        {cupon.activo ? 'Desactivar' : 'Activar'}
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
          <h3 className="text-lg font-medium text-primario-800 mb-2">Total Cupones</h3>
          <div className="text-3xl font-bold text-primario-600">{cuponesData.length}</div>
          <div className="mt-2 text-sm text-primario-500">
            {cuponesData.filter(c => c.activo).length} activos, {cuponesData.filter(c => !c.activo).length} inactivos
          </div>
        </div>
        
        <div className="bg-secundario-50 p-4 rounded-lg border border-secundario-200">
          <h3 className="text-lg font-medium text-secundario-800 mb-2">Usos Totales</h3>
          <div className="text-3xl font-bold text-secundario-600">
            {cuponesData.reduce((acc, cupon) => acc + cupon.usos, 0)}
          </div>
          <div className="mt-2 text-sm text-secundario-500">
            De {cuponesData.reduce((acc, cupon) => acc + cupon.usosMaximos, 0)} disponibles
          </div>
        </div>
        
        <div className="bg-acento-50 p-4 rounded-lg border border-acento-200">
          <h3 className="text-lg font-medium text-acento-800 mb-2">Cupones por Expirar</h3>
          <div className="text-3xl font-bold text-acento-600">
            {cuponesData.filter(cupon => {
              const fechaFin = new Date(cupon.fechaFin);
              const hoy = new Date();
              const enUnMes = new Date();
              enUnMes.setMonth(hoy.getMonth() + 1);
              return cupon.activo && fechaFin > hoy && fechaFin <= enUnMes;
            }).length}
          </div>
          <div className="mt-2 text-sm text-acento-500">
            Expiran en los próximos 30 días
          </div>
        </div>
      </div>
      
      {/* Modal para crear/editar cupón */}
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
                      {cuponActual ? 'Editar Cupón' : 'Crear Nuevo Cupón'}
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">Código</label>
                        <input
                          type="text"
                          id="codigo"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                          placeholder="Ej: BIENVENIDO25"
                          defaultValue={cuponActual?.codigo || ''}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="tipoCupon" className="block text-sm font-medium text-gray-700">Tipo de descuento</label>
                          <select
                            id="tipoCupon"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                            defaultValue={cuponActual?.tipo || 'porcentaje'}
                          >
                            <option value="porcentaje">Porcentaje</option>
                            <option value="fijo">Valor fijo</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="descuento" className="block text-sm font-medium text-gray-700">Descuento</label>
                          <input
                            type="number"
                            id="descuento"
                            min="0"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                            placeholder="25"
                            defaultValue={cuponActual?.descuento || ''}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="aplicableA" className="block text-sm font-medium text-gray-700">Aplicable a</label>
                        <select
                          id="aplicableA"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                          defaultValue={cuponActual?.aplicableA || 'todos'}
                        >
                          <option value="todos">Todos los productos</option>
                          <option value="cuestionarios">Solo cuestionarios</option>
                          <option value="sesiones">Solo sesiones</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="aliado" className="block text-sm font-medium text-gray-700">Aliado (opcional)</label>
                        <select
                          id="aliado"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                          defaultValue={cuponActual?.aliadoId || ''}
                        >
                          <option value="">Sin aliado asignado</option>
                          {aliados.map(aliado => (
                            <option key={aliado.id} value={aliado.id}>{aliado.nombre}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700">Fecha de inicio</label>
                          <input
                            type="date"
                            id="fechaInicio"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                            defaultValue={cuponActual?.fechaInicio || obtenerFechaActual()}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700">Fecha de vencimiento</label>
                          <input
                            type="date"
                            id="fechaFin"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                            defaultValue={cuponActual?.fechaFin || ''}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="montoMinimo" className="block text-sm font-medium text-gray-700">Monto mínimo (opcional)</label>
                          <input
                            type="number"
                            id="montoMinimo"
                            min="0"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                            placeholder="50000"
                            defaultValue={cuponActual?.montoMinimo || ''}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="usosMaximos" className="block text-sm font-medium text-gray-700">Usos máximos</label>
                          <input
                            type="number"
                            id="usosMaximos"
                            min="1"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primario-500 focus:border-primario-500 sm:text-sm"
                            placeholder="100"
                            defaultValue={cuponActual?.usosMaximos || 100}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="activo"
                          type="checkbox"
                          className="h-4 w-4 text-primario-600 focus:ring-primario-500 border-gray-300 rounded"
                          defaultChecked={cuponActual ? cuponActual.activo : true}
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
                  {cuponActual ? 'Guardar cambios' : 'Crear'}
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

export default Cupones;
