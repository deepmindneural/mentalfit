import React, { useState } from 'react';
import { ServicioAgendado } from '../../tipos/aliados';

interface ServiciosAgendadosProps {
  servicios: ServicioAgendado[];
}

const ServiciosAgendados: React.FC<ServiciosAgendadosProps> = ({ servicios }) => {
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [servicioSeleccionado, setServicioSeleccionado] = useState<ServicioAgendado | null>(null);
  
  // Filtrar servicios por estado
  const serviciosFiltrados = filtroEstado === 'todos' 
    ? servicios 
    : servicios.filter(s => s.estado === filtroEstado);
    
  // Formatear fecha y hora
  const formatearFechaHora = (fechaString: string) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Formatear precio
  const formatearPrecio = (precio: number) => {
    return `$${precio.toLocaleString()} COP`;
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-800">Servicios Agendados</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setFiltroEstado('todos')} 
            className={`px-3 py-1 text-sm rounded-full ${filtroEstado === 'todos' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}
          >
            Todos
          </button>
          <button 
            onClick={() => setFiltroEstado('agendado')} 
            className={`px-3 py-1 text-sm rounded-full ${filtroEstado === 'agendado' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'}`}
          >
            Agendados
          </button>
          <button 
            onClick={() => setFiltroEstado('completado')} 
            className={`px-3 py-1 text-sm rounded-full ${filtroEstado === 'completado' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-800'}`}
          >
            Completados
          </button>
          <button 
            onClick={() => setFiltroEstado('cancelado')} 
            className={`px-3 py-1 text-sm rounded-full ${filtroEstado === 'cancelado' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-800'}`}
          >
            Cancelados
          </button>
        </div>
      </div>
      
      {/* Listado de servicios */}
      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha y Hora
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {serviciosFiltrados.length > 0 ? (
                serviciosFiltrados.map((servicio) => (
                  <tr key={servicio.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatearFechaHora(servicio.fechaHora)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{servicio.usuario.nombre} {servicio.usuario.apellido}</div>
                      <div className="text-sm text-gray-500">{servicio.usuario.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${servicio.tipo === 'virtual' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                        {servicio.tipo === 'virtual' ? 'Virtual' : 'Presencial'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatearPrecio(servicio.valorCobrado)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${servicio.estado === 'agendado' ? 'bg-blue-100 text-blue-800' : servicio.estado === 'completado' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {servicio.estado.charAt(0).toUpperCase() + servicio.estado.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => setServicioSeleccionado(servicio)}
                        className="text-primario-600 hover:text-primario-900"
                      >
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No hay servicios {filtroEstado !== 'todos' ? `con estado "${filtroEstado}"` : ''} disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modal de detalles */}
      {servicioSeleccionado && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 overflow-hidden">
            <div className="px-6 py-4 bg-primario-600 text-white flex justify-between items-center">
              <h3 className="text-lg font-medium">Detalles del Servicio</h3>
              <button onClick={() => setServicioSeleccionado(null)} className="text-white hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Fecha y Hora</h4>
                  <p className="text-sm">{formatearFechaHora(servicioSeleccionado.fechaHora)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Duración</h4>
                  <p className="text-sm">{servicioSeleccionado.duracionMinutos} minutos</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Paciente</h4>
                  <p className="text-sm">{servicioSeleccionado.usuario.nombre} {servicioSeleccionado.usuario.apellido}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Contacto</h4>
                  <p className="text-sm">{servicioSeleccionado.usuario.email}</p>
                  {servicioSeleccionado.usuario.telefono && (
                    <p className="text-sm">{servicioSeleccionado.usuario.telefono}</p>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Tipo de Sesión</h4>
                  <p className="text-sm">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${servicioSeleccionado.tipo === 'virtual' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                      {servicioSeleccionado.tipo === 'virtual' ? 'Virtual' : 'Presencial'}
                    </span>
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Estado</h4>
                  <p className="text-sm">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${servicioSeleccionado.estado === 'agendado' ? 'bg-blue-100 text-blue-800' : servicioSeleccionado.estado === 'completado' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {servicioSeleccionado.estado.charAt(0).toUpperCase() + servicioSeleccionado.estado.slice(1)}
                    </span>
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Valor Cobrado</h4>
                  <p className="text-sm font-semibold">{formatearPrecio(servicioSeleccionado.valorCobrado)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Comisión</h4>
                  <p className="text-sm font-semibold text-green-600">{formatearPrecio(servicioSeleccionado.comisionGenerada)}</p>
                </div>
              </div>

              {servicioSeleccionado.tipo === 'virtual' && servicioSeleccionado.enlaceVideoconferencia && (
                <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="text-sm font-medium text-blue-600 mb-1">Enlace de videoconferencia</h4>
                  <a href={servicioSeleccionado.enlaceVideoconferencia} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                    {servicioSeleccionado.enlaceVideoconferencia}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
              
              {servicioSeleccionado.notas && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Notas</h4>
                  <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg border border-gray-200">{servicioSeleccionado.notas}</p>
                </div>
              )}
              
              <div className="flex justify-end space-x-3">
                {servicioSeleccionado.estado === 'agendado' && (
                  <>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Marcar como completado
                    </button>
                    <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                      Cancelar sesión
                    </button>
                  </>
                )}
                <button 
                  onClick={() => setServicioSeleccionado(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
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

export default ServiciosAgendados;
