import React, { useState } from 'react';
import { HistorialServicioUsuario, ServicioAgendado } from '../../tipos/aliados';

interface HistorialUsuariosProps {
  historialUsuarios: HistorialServicioUsuario[];
}

const HistorialUsuarios: React.FC<HistorialUsuariosProps> = ({ historialUsuarios }) => {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<HistorialServicioUsuario | null>(null);
  const [servicioDetalle, setServicioDetalle] = useState<ServicioAgendado | null>(null);
  
  const formatearFecha = (fechaString: string) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
  
  const formatearPrecio = (precio: number) => {
    return `$${precio.toLocaleString()} COP`;
  };
  
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-800 mb-6">Historial de Pacientes</h2>
      
      {!usuarioSeleccionado ? (
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paciente
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Sesiones
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Última Sesión
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ingresos Generados
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Calificación
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {historialUsuarios.map((usuario) => (
                  <tr key={usuario.usuarioId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{usuario.nombreCompleto}</div>
                      <div className="text-sm text-gray-500">{usuario.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {usuario.cantidadSesiones}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatearFecha(usuario.ultimaSesion)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatearPrecio(usuario.valorTotalSesiones)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {usuario.calificacionPromedio > 0 ? (
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2">{usuario.calificacionPromedio.toFixed(1)}</span>
                          <div className="text-yellow-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Sin calificar</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => setUsuarioSeleccionado(usuario)}
                        className="text-primario-600 hover:text-primario-900"
                      >
                        Ver historial
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button 
                onClick={() => setUsuarioSeleccionado(null)}
                className="mr-2 text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-lg font-medium text-gray-800">Historial de {usuarioSeleccionado.nombreCompleto}</h3>
            </div>
            <div className="bg-primario-50 text-primario-700 px-3 py-1 rounded-md text-sm font-medium">
              {usuarioSeleccionado.cantidadSesiones} sesiones en total
            </div>
          </div>
          
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Total Facturado</h4>
              <p className="text-xl font-bold text-gray-900">{formatearPrecio(usuarioSeleccionado.valorTotalSesiones)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Comisiones Generadas</h4>
              <p className="text-xl font-bold text-green-600">{formatearPrecio(usuarioSeleccionado.comisionesGeneradas)}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Calificación Promedio</h4>
              <div className="flex items-center">
                <p className="text-xl font-bold text-gray-900 mr-2">
                  {usuarioSeleccionado.calificacionPromedio > 0 ? usuarioSeleccionado.calificacionPromedio.toFixed(1) : 'N/A'}
                </p>
                {usuarioSeleccionado.calificacionPromedio > 0 && (
                  <div className="text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200 mb-6">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-medium text-gray-800">Historial de Servicios</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha y Hora
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
                  {usuarioSeleccionado.servicios.map((servicio) => (
                    <tr key={servicio.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(servicio.fechaHora).toLocaleString('es-ES', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
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
                          onClick={() => setServicioDetalle(servicio)}
                          className="text-primario-600 hover:text-primario-900"
                        >
                          Ver detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={() => setUsuarioSeleccionado(null)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Volver al listado
            </button>
          </div>
        </div>
      )}
      
      {/* Modal de detalles del servicio */}
      {servicioDetalle && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 overflow-hidden">
            <div className="px-6 py-4 bg-primario-600 text-white flex justify-between items-center">
              <h3 className="text-lg font-medium">Detalles del Servicio</h3>
              <button onClick={() => setServicioDetalle(null)} className="text-white hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Fecha y Hora</h4>
                  <p className="text-sm">{new Date(servicioDetalle.fechaHora).toLocaleString('es-ES', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Duración</h4>
                  <p className="text-sm">{servicioDetalle.duracionMinutos} minutos</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Valor Cobrado</h4>
                  <p className="text-sm font-semibold">{formatearPrecio(servicioDetalle.valorCobrado)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Comisión</h4>
                  <p className="text-sm font-semibold text-green-600">{formatearPrecio(servicioDetalle.comisionGenerada)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Tipo de Sesión</h4>
                  <p className="text-sm">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${servicioDetalle.tipo === 'virtual' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                      {servicioDetalle.tipo === 'virtual' ? 'Virtual' : 'Presencial'}
                    </span>
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Estado</h4>
                  <p className="text-sm">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${servicioDetalle.estado === 'agendado' ? 'bg-blue-100 text-blue-800' : servicioDetalle.estado === 'completado' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {servicioDetalle.estado.charAt(0).toUpperCase() + servicioDetalle.estado.slice(1)}
                    </span>
                  </p>
                </div>
              </div>
              
              {servicioDetalle.calificacion && (
                <div className="mb-6 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center mb-2">
                    <h4 className="text-sm font-medium text-gray-700 mr-2">Calificación:</h4>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-1">{servicioDetalle.calificacion.toFixed(1)}</span>
                      <div className="text-yellow-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {servicioDetalle.comentario && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Comentario:</h4>
                      <p className="text-sm text-gray-600 italic">
                        {servicioDetalle.comentario}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {servicioDetalle.notas && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Notas</h4>
                  <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg border border-gray-200">{servicioDetalle.notas}</p>
                </div>
              )}
              
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setServicioDetalle(null)}
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

export default HistorialUsuarios;
