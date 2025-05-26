import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { obtenerTransaccionesPorAliado } from '../../data/transacciones';
import { Transaccion } from '../../tipos/monetizacion';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import TabsNavegacion from '../../components/aliados/TabsNavegacion';
import CerrarSesion from '../../components/auth/CerrarSesion';
import ServiciosAgendados from '../../components/aliados/ServiciosAgendados';
import HistorialUsuarios from '../../components/aliados/HistorialUsuarios';
import GestionFinanzas from '../../components/aliados/GestionFinanzas';
import { 
  obtenerServiciosAgendados,
  obtenerCuentasBancarias,
  obtenerSolicitudesRetiro,
  obtenerHistorialUsuarios
} from '../../data/serviciosAliados';

// Función para formatear fechas a formato legible
const formatearFecha = (fecha: string | Date): string => {
  const fechaObj = new Date(fecha);
  return fechaObj.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const DashboardAliado: React.FC = () => {
  const { sesion, verificarSesion } = useAuth();
  const [sesionVerificada, setSesionVerificada] = useState<boolean>(false);
  
  // Pestaña actualmente seleccionada
  const [pestañaActiva, setPestañaActiva] = useState<string>('Resumen');
  const pestañas = ['Resumen', 'Servicios Agendados', 'Pacientes', 'Finanzas', 'Seguridad'];
  
  // Estados para transacciones y estadísticas
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [estadisticasMes, setEstadisticasMes] = useState({
    comisionesGeneradas: 0,
    comisionesPagadas: 0,
    pendientePago: 0,
    sesionesReferidas: 0,
    cuponesUtilizados: 0,
  });
  
  // Estados para servicios y usuarios
  const [serviciosAgendados, setServiciosAgendados] = useState<any[]>([]);
  const [historialUsuarios, setHistorialUsuarios] = useState<any[]>([]);
  const [cuentasBancarias, setCuentasBancarias] = useState<any[]>([]);
  const [solicitudesRetiro, setSolicitudesRetiro] = useState<any[]>([]);
  
  // Verificar la validez de la sesión al cargar el componente
  useEffect(() => {
    const verificarValidezSesion = async () => {
      const sesionValida = await verificarSesion();
      setSesionVerificada(sesionValida);
    };
    
    verificarValidezSesion();
  }, [verificarSesion]);

  useEffect(() => {
    if (sesion.usuario?.id && sesionVerificada) {
      // Cargar transacciones del aliado desde la API o datos de ejemplo
      const datosAliado = obtenerTransaccionesPorAliado(sesion.usuario.id);
      setTransacciones(datosAliado);
      
      // Calcular estadísticas
      const comisionesGeneradas = datosAliado
        .filter(t => t.comisionGenerada)
        .reduce((sum, t) => sum + (t.comisionGenerada || 0), 0);
      
      const comisionesPagadas = datosAliado
        .filter(t => t.tipo === 'comision' && t.estado === 'completada')
        .reduce((sum, t) => sum + t.monto, 0);
      
      setEstadisticasMes({
        comisionesGeneradas,
        comisionesPagadas,
        pendientePago: comisionesGeneradas - comisionesPagadas,
        sesionesReferidas: datosAliado.filter(t => t.comisionGenerada).length,
        cuponesUtilizados: datosAliado.filter(t => t.cuponAplicado).length,
      });
      
      // Cargar datos para las demás secciones del dashboard
      const servicios = obtenerServiciosAgendados(sesion.usuario.id);
      setServiciosAgendados(servicios);
      
      const historial = obtenerHistorialUsuarios(sesion.usuario.id);
      setHistorialUsuarios(historial);
      
      const cuentas = obtenerCuentasBancarias(sesion.usuario.id);
      setCuentasBancarias(cuentas);
      
      const solicitudes = obtenerSolicitudesRetiro(sesion.usuario.id);
      setSolicitudesRetiro(solicitudes);
    }
  }, [sesion.usuario?.id]);
  
  // Formatear fecha
  const formatearFecha = (fechaString: string) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard de Aliado</h1>
            <p className="text-gray-600">
              Bienvenido, {sesion.usuario?.nombre} {sesion.usuario?.apellido} - {(sesion.usuario as any)?.nombreEmpresa}
            </p>
          </div>
          
          <TabsNavegacion tabs={pestañas} activeTab={pestañaActiva} onTabChange={setPestañaActiva} />
          
          {/* Contenido según la pestaña seleccionada */}
          {pestañaActiva === 'Resumen' && (
            <>
              {/* Tarjetas de estadísticas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Comisiones del mes</h3>
                  <p className="text-2xl font-bold text-primario-600">${estadisticasMes.comisionesGeneradas.toLocaleString()} COP</p>
                  <div className="mt-2 flex items-center text-xs">
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-800">
                      +{estadisticasMes.sesionesReferidas} referencias
                    </span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Pendiente de pago</h3>
                  <p className="text-2xl font-bold text-secundario-600">${estadisticasMes.pendientePago.toLocaleString()} COP</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    Próximo pago: 15 de mayo
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Sesiones este mes</h3>
                  <p className="text-2xl font-bold text-acento-600">{serviciosAgendados.filter(s => s.fechaHora && new Date(s.fechaHora).getMonth() === new Date().getMonth()).length}</p>
                  <div className="mt-2 flex items-center text-xs">
                    <span className="text-gray-500">{serviciosAgendados.filter(s => s.estado === 'agendado').length} agendadas</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Comisión promedio</h3>
                  <p className="text-2xl font-bold text-gray-800">
                    ${estadisticasMes.sesionesReferidas > 0 ? 
                      Math.round(estadisticasMes.comisionesGeneradas / estadisticasMes.sesionesReferidas).toLocaleString() : 
                      0} COP
                  </p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    Por referido
                  </div>
                </div>
              </div>
              
              {/* Gráfico de comisiones */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Comisiones generadas</h2>
                <div className="h-64 w-full bg-gray-100 rounded flex flex-col items-center justify-center">
                  <div className="w-full h-48 px-4 flex items-end justify-around">
                    {[65, 85, 40, 95, 75, 60, 90].map((value, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-8 bg-primario-500 rounded-t-lg" 
                          style={{ height: `${value}%`, transition: 'height 1s ease-out' }}
                        ></div>
                        <div className="text-xs mt-1 text-gray-500">
                          {['L', 'M', 'X', 'J', 'V', 'S', 'D'][index]}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Últimos 7 días</div>
                </div>
              </div>
              
              {/* Listado de transacciones */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-800">Historial de transacciones</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Usuario
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Concepto
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Comisión
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transacciones.length > 0 ? (
                        transacciones.map((transaccion) => (
                          <tr key={transaccion.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatearFecha(transaccion.fecha)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{transaccion.usuario.nombre}</div>
                              <div className="text-sm text-gray-500">{transaccion.usuario.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{transaccion.concepto}</div>
                              {transaccion.cuponAplicado && (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                                  Cupón: {transaccion.cuponAplicado.codigo}
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {transaccion.comisionGenerada ? (
                                <span className="text-green-600">${transaccion.comisionGenerada.toLocaleString()} COP</span>
                              ) : transaccion.tipo === 'comision' ? (
                                <span className="text-blue-600">${transaccion.monto.toLocaleString()} COP</span>
                              ) : (
                                <span className="text-gray-500">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                transaccion.estado === 'completada' 
                                  ? 'bg-green-100 text-green-800' 
                                  : transaccion.estado === 'pendiente' 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {transaccion.estado.charAt(0).toUpperCase() + transaccion.estado.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                            No hay transacciones disponibles
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
          
          {pestañaActiva === 'Servicios Agendados' && (
            <ServiciosAgendados servicios={serviciosAgendados} />
          )}
          
          {pestañaActiva === 'Pacientes' && (
            <HistorialUsuarios historialUsuarios={historialUsuarios} />
          )}
          
          {pestañaActiva === 'Finanzas' && (
            <GestionFinanzas 
              cuentasBancarias={cuentasBancarias} 
              solicitudesRetiro={solicitudesRetiro} 
              saldoDisponible={estadisticasMes.pendientePago} 
            />
          )}
          
          {pestañaActiva === 'Seguridad' && (
            <div className="space-y-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div>
                <h2 className="text-lg font-medium text-gray-800 mb-4">Seguridad de la cuenta</h2>
                <p className="text-gray-600 mb-6">
                  Gestiona la seguridad de tu cuenta y tus preferencias de sesión. Mantén tus datos seguros 
                  siguiendo las recomendaciones de seguridad.
                </p>
              </div>
              
              {/* Sección de contraseña */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-md font-medium text-gray-700 mb-3">Contraseña</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Se recomienda cambiar tu contraseña regularmente y utilizar contraseñas fuertes con combinaciones 
                  de letras, números y símbolos.
                </p>
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primario-600 hover:bg-primario-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primario-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Cambiar contraseña
                </button>
              </div>
              
              {/* Sección de información de sesión */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-md font-medium text-gray-700 mb-3">Información de sesión</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Estado de la sesión</p>
                      <p className="text-xs text-gray-500 mt-1">Tu sesión actual está activa</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Activa
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Tiempo de inactividad</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Por seguridad, tu sesión se cerrará automáticamente después de 1 hora de inactividad.
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Cerrar sesión</h3>
                    <p className="text-xs text-gray-500 mb-4">
                      Si cierras sesión, tendrás que volver a iniciar sesión con tus credenciales para acceder a tu cuenta.
                    </p>
                    
                    <CerrarSesion />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardAliado;
