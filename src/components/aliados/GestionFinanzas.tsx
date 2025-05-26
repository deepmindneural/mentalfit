import React, { useState } from 'react';
import { InfoBancaria, SolicitudRetiro } from '../../tipos/aliados';

interface GestionFinanzasProps {
  cuentasBancarias: InfoBancaria[];
  solicitudesRetiro: SolicitudRetiro[];
  saldoDisponible: number;
}

const GestionFinanzas: React.FC<GestionFinanzasProps> = ({ 
  cuentasBancarias, 
  solicitudesRetiro, 
  saldoDisponible 
}) => {
  const [mostrarFormularioCuenta, setMostrarFormularioCuenta] = useState(false);
  const [mostrarFormularioRetiro, setMostrarFormularioRetiro] = useState(false);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState<string>('');
  const [montoRetiro, setMontoRetiro] = useState<number>(0);
  
  // Formatear moneda
  const formatearPrecio = (precio: number) => {
    return `$${precio.toLocaleString()} COP`;
  };
  
  // Formatear fecha
  const formatearFecha = (fechaString: string) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
  
  // Manejar solicitud de retiro
  const handleSolicitarRetiro = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Solicitud de retiro por ${formatearPrecio(montoRetiro)} procesada. En un entorno real, esto se enviaría a la API.`);
    setMostrarFormularioRetiro(false);
    setMontoRetiro(0);
  };
  
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Resumen Financiero</h2>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Saldo Disponible</h3>
              <p className="text-2xl font-bold text-primario-600">{formatearPrecio(saldoDisponible)}</p>
              <button 
                onClick={() => setMostrarFormularioRetiro(true)}
                className="mt-3 text-sm bg-primario-600 hover:bg-primario-700 text-white px-3 py-1 rounded"
                disabled={saldoDisponible <= 0}
              >
                Solicitar Retiro
              </button>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Retiros Pendientes</h3>
              <p className="text-2xl font-bold text-secundario-600">
                {formatearPrecio(solicitudesRetiro
                  .filter(s => s.estado === 'pendiente' || s.estado === 'procesando')
                  .reduce((sum, s) => sum + s.monto, 0))}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {solicitudesRetiro.filter(s => s.estado === 'pendiente' || s.estado === 'procesando').length} solicitudes en proceso
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Cuentas Bancarias</h3>
              <p className="text-2xl font-bold text-gray-800">{cuentasBancarias.length}</p>
              <button 
                onClick={() => setMostrarFormularioCuenta(true)}
                className="mt-3 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
              >
                Añadir Cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800">Cuentas Bancarias</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Banco
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Número de Cuenta
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Registro
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
                {cuentasBancarias.length > 0 ? (
                  cuentasBancarias.map((cuenta) => (
                    <tr key={cuenta.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{cuenta.banco}</div>
                        <div className="text-sm text-gray-500">{cuenta.titular}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        •••• {cuenta.numeroCuenta.slice(-4)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cuenta.tipoCuenta.charAt(0).toUpperCase() + cuenta.tipoCuenta.slice(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatearFecha(cuenta.fechaRegistro)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {cuenta.activa ? (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Activa
                            </span>
                          ) : (
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Inactiva
                            </span>
                          )}
                          {cuenta.predeterminada && (
                            <span className="ml-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Predeterminada
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primario-600 hover:text-primario-900 mr-3">
                          Editar
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          {cuenta.activa ? 'Desactivar' : 'Activar'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No hay cuentas bancarias registradas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800">Historial de Retiros</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Solicitud
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cuenta
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Procesamiento
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {solicitudesRetiro.length > 0 ? (
                  solicitudesRetiro.map((solicitud) => {
                    const cuenta = cuentasBancarias.find(c => c.id === solicitud.infoBancariaId);
                    return (
                      <tr key={solicitud.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatearFecha(solicitud.fechaSolicitud)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatearPrecio(solicitud.monto)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {cuenta ? `${cuenta.banco} (•••• ${cuenta.numeroCuenta.slice(-4)})` : 'Cuenta no disponible'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${solicitud.estado === 'completada' ? 'bg-green-100 text-green-800' : solicitud.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' : solicitud.estado === 'procesando' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                            {solicitud.estado.charAt(0).toUpperCase() + solicitud.estado.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {solicitud.fechaProcesamiento ? formatearFecha(solicitud.fechaProcesamiento) : '-'}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No hay solicitudes de retiro
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Modal para solicitar retiro */}
      {mostrarFormularioRetiro && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
            <div className="px-6 py-4 bg-primario-600 text-white flex justify-between items-center">
              <h3 className="text-lg font-medium">Solicitar Retiro</h3>
              <button onClick={() => setMostrarFormularioRetiro(false)} className="text-white hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSolicitarRetiro} className="p-6">
              <div className="mb-4">
                <label htmlFor="monto" className="block text-sm font-medium text-gray-700 mb-1">Monto a retirar</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="monto"
                    id="monto"
                    value={montoRetiro}
                    onChange={(e) => setMontoRetiro(Number(e.target.value))}
                    min={50000}
                    max={saldoDisponible}
                    className="focus:ring-primario-500 focus:border-primario-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                    placeholder="0.00"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">COP</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">Monto mínimo: $50,000 COP. Disponible: {formatearPrecio(saldoDisponible)}</p>
              </div>
              
              <div className="mb-6">
                <label htmlFor="cuenta" className="block text-sm font-medium text-gray-700 mb-1">Cuenta bancaria</label>
                <select
                  id="cuenta"
                  name="cuenta"
                  value={cuentaSeleccionada}
                  onChange={(e) => setCuentaSeleccionada(e.target.value)}
                  className="focus:ring-primario-500 focus:border-primario-500 block w-full sm:text-sm border-gray-300 rounded-md py-2"
                  required
                >
                  <option value="">Selecciona una cuenta</option>
                  {cuentasBancarias
                    .filter(c => c.activa)
                    .map(cuenta => (
                      <option key={cuenta.id} value={cuenta.id}>
                        {cuenta.banco} - •••• {cuenta.numeroCuenta.slice(-4)} {cuenta.predeterminada ? '(Predeterminada)' : ''}
                      </option>
                    ))
                  }
                </select>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => setMostrarFormularioRetiro(false)}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mr-3"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={montoRetiro < 50000 || montoRetiro > saldoDisponible || !cuentaSeleccionada}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primario-600 hover:bg-primario-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Solicitar Retiro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Modal para añadir cuenta bancaria */}
      {mostrarFormularioCuenta && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
            <div className="px-6 py-4 bg-primario-600 text-white flex justify-between items-center">
              <h3 className="text-lg font-medium">Añadir Cuenta Bancaria</h3>
              <button onClick={() => setMostrarFormularioCuenta(false)} className="text-white hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form className="p-6">
              <div className="mb-4">
                <label htmlFor="banco" className="block text-sm font-medium text-gray-700 mb-1">Banco</label>
                <input
                  type="text"
                  name="banco"
                  id="banco"
                  className="focus:ring-primario-500 focus:border-primario-500 block w-full sm:text-sm border-gray-300 rounded-md py-2"
                  placeholder="Nombre del banco"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="tipoCuenta" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Cuenta</label>
                <select
                  id="tipoCuenta"
                  name="tipoCuenta"
                  className="focus:ring-primario-500 focus:border-primario-500 block w-full sm:text-sm border-gray-300 rounded-md py-2"
                  required
                >
                  <option value="">Selecciona el tipo</option>
                  <option value="ahorros">Ahorros</option>
                  <option value="corriente">Corriente</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="numeroCuenta" className="block text-sm font-medium text-gray-700 mb-1">Número de Cuenta</label>
                <input
                  type="text"
                  name="numeroCuenta"
                  id="numeroCuenta"
                  className="focus:ring-primario-500 focus:border-primario-500 block w-full sm:text-sm border-gray-300 rounded-md py-2"
                  placeholder="Número de cuenta bancaria"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="titular" className="block text-sm font-medium text-gray-700 mb-1">Titular de la Cuenta</label>
                <input
                  type="text"
                  name="titular"
                  id="titular"
                  className="focus:ring-primario-500 focus:border-primario-500 block w-full sm:text-sm border-gray-300 rounded-md py-2"
                  placeholder="Nombre del titular"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="documento" className="block text-sm font-medium text-gray-700 mb-1">Documento del Titular</label>
                <input
                  type="text"
                  name="documento"
                  id="documento"
                  className="focus:ring-primario-500 focus:border-primario-500 block w-full sm:text-sm border-gray-300 rounded-md py-2"
                  placeholder="NIT o documento de identidad"
                  required
                />
              </div>
              
              <div className="mb-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="predeterminada"
                      name="predeterminada"
                      type="checkbox"
                      className="focus:ring-primario-500 h-4 w-4 text-primario-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="predeterminada" className="font-medium text-gray-700">Establecer como cuenta predeterminada</label>
                    <p className="text-gray-500">Esta será la cuenta utilizada por defecto para los retiros</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => setMostrarFormularioCuenta(false)}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mr-3"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert('Cuenta bancaria registrada con éxito');
                    setMostrarFormularioCuenta(false);
                  }}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primario-600 hover:bg-primario-700"
                >
                  Guardar Cuenta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionFinanzas;
