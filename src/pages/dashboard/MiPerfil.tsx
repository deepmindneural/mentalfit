import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import CerrarSesion from '../../components/auth/CerrarSesion';
import { actualizarDatosUsuario } from '../../data/auth';

const MiPerfil: React.FC = () => {
  const { sesion, actualizarUsuario, verificarSesion } = useAuth();
  const [editando, setEditando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [cambioPassword, setCambioPassword] = useState({
    passwordActual: '',
    passwordNuevo: '',
    confirmarPassword: '',
  });
  
  // Estado para los datos de perfil editables
  const [formData, setFormData] = useState({
    nombre: sesion.usuario?.nombre || '',
    apellido: sesion.usuario?.apellido || '',
    email: sesion.usuario?.email || '',
    telefono: (sesion.usuario as any)?.telefono || '',
  });
  
  // Función para manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Verificar sesión al cargar
  useEffect(() => {
    const checkSesion = async () => {
      await verificarSesion();
    };
    
    checkSesion();
  }, [verificarSesion]);

  // Función para guardar cambios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mostrar indicador de guardado
    setGuardando(true);
    
    try {
      // Llamada a la API para actualizar el perfil
      if (sesion.usuario) {
        const usuarioActualizado = await actualizarDatosUsuario(
          sesion.usuario.id,
          {
            nombre: formData.nombre,
            apellido: formData.apellido,
            // No enviamos el email ya que no se puede modificar
          }
        );
        
        if (usuarioActualizado) {
          // Actualizar datos en el contexto
          actualizarUsuario({
            nombre: formData.nombre,
            apellido: formData.apellido,
          });
          
          setMensajeExito('¡Perfil actualizado correctamente!');
          setEditando(false);
        }
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      setMensajeError('Ocurrió un error al actualizar el perfil. Inténtalo de nuevo.');
    } finally {
      setGuardando(false);
      
      // Mostrar mensaje de éxito por 3 segundos
      setTimeout(() => {
        setMensajeExito('');
        setMensajeError('');
      }, 3000);
    }
  };
  
  // Datos simulados de créditos/suscripción del usuario
  const creditosInfo = {
    creditosDisponibles: 150,
    creditosGastados: 75,
    ultimaRecarga: '2025-04-15',
    historialUso: [
      { fecha: '2025-05-01', descripcion: 'Sesión de terapia', cantidad: 25 },
      { fecha: '2025-04-20', descripcion: 'Test de ansiedad', cantidad: 15 },
      { fecha: '2025-04-10', descripcion: 'Curso de meditación', cantidad: 35 },
    ]
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Mi Perfil</h1>
            
            {/* Mensajes de notificación */}
            {mensajeExito && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 text-green-700" role="alert">
                <p>{mensajeExito}</p>
              </div>
            )}
            
            {mensajeError && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-red-700" role="alert">
                <p>{mensajeError}</p>
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-800">Información Personal</h2>
                  <button
                    onClick={() => setEditando(!editando)}
                    className="text-primario-600 hover:text-primario-800 font-medium flex items-center"
                  >
                    {editando ? (
                      <>Cancelar</>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Editar
                      </>
                    )}
                  </button>
                </div>
                
                {editando ? (
                  <form onSubmit={handleSubmit} className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                          type="text"
                          name="nombre"
                          id="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primario-500 focus:border-primario-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
                        <input
                          type="text"
                          name="apellido"
                          id="apellido"
                          value={formData.apellido}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primario-500 focus:border-primario-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primario-500 focus:border-primario-500"
                          disabled
                        />
                        <p className="mt-1 text-xs text-gray-500">El correo electrónico no se puede modificar</p>
                      </div>
                      <div>
                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                        <input
                          type="tel"
                          name="telefono"
                          id="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primario-500 focus:border-primario-500"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primario-600 hover:bg-primario-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primario-500 disabled:bg-primario-400 disabled:cursor-not-allowed"
                        disabled={guardando}
                      >
                        {guardando ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Guardando...
                          </>
                        ) : (
                          'Guardar cambios'
                        )}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setEditando(false)}
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primario-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={guardando}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Nombre</h3>
                      <p className="mt-1 text-sm text-gray-900">{sesion.usuario?.nombre}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Apellido</h3>
                      <p className="mt-1 text-sm text-gray-900">{sesion.usuario?.apellido}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Correo electrónico</h3>
                      <p className="mt-1 text-sm text-gray-900">{sesion.usuario?.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Fecha de registro</h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(sesion.usuario?.fechaRegistro || '').toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Sección de créditos/suscripción */}
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Mis Créditos</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-primario-600 to-primario-700 rounded-xl p-5 text-white shadow-md">
                    <h3 className="text-sm font-medium text-primario-100 mb-1">Créditos disponibles</h3>
                    <div className="text-3xl font-bold">{creditosInfo.creditosDisponibles}</div>
                    <div className="text-xs mt-2 text-primario-100">
                      Última recarga: {new Date(creditosInfo.ultimaRecarga).toLocaleDateString('es-ES')}
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 rounded-xl p-5 text-gray-800 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Créditos utilizados</h3>
                    <div className="text-3xl font-bold">{creditosInfo.creditosGastados}</div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primario-600 h-2.5 rounded-full" 
                        style={{ width: `${(creditosInfo.creditosGastados / (creditosInfo.creditosDisponibles + creditosInfo.creditosGastados) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 rounded-xl p-5 text-gray-800 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Estado actual</h3>
                    <div className="text-lg font-medium">Plan Premium</div>
                    <div className="mt-2 text-xs text-gray-500">
                      Renovación automática: <span className="font-medium">15/06/2025</span>
                    </div>
                    <button className="mt-3 text-primario-600 text-xs font-medium">Cambiar plan</button>
                  </div>
                </div>
                
                {/* Historial de uso de créditos */}
                <h3 className="text-md font-medium text-gray-700 mb-3">Historial de uso</h3>
                <div className="overflow-hidden border border-gray-200 rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Descripción
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Créditos
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {creditosInfo.historialUso.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(item.fecha).toLocaleDateString('es-ES')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.descripcion}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-red-600">
                            -{item.cantidad}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 text-center">
                  <button className="inline-flex items-center px-4 py-2 border border-primario-600 text-sm font-medium rounded-md text-primario-600 bg-white hover:bg-primario-50">
                    Comprar más créditos
                  </button>
                </div>
              </div>
              
              {/* Sección de seguridad de la cuenta */}
              <div className="p-6 border-t border-gray-200">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Seguridad de la cuenta</h2>
                
                <div className="space-y-6">
                  {/* Cambio de contraseña */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base font-medium text-gray-700">Cambiar contraseña</h3>
                      <button
                        onClick={() => setShowPasswordSection(!showPasswordSection)}
                        className="text-primario-600 hover:text-primario-800 font-medium flex items-center"
                      >
                        {showPasswordSection ? 'Cancelar' : 'Cambiar'}
                      </button>
                    </div>
                    
                    {showPasswordSection && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="passwordActual" className="block text-sm font-medium text-gray-700">Contraseña actual</label>
                            <input
                              type="password"
                              id="passwordActual"
                              name="passwordActual"
                              value={cambioPassword.passwordActual}
                              onChange={(e) => setCambioPassword({...cambioPassword, passwordActual: e.target.value})}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primario-500 focus:border-primario-500"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="passwordNuevo" className="block text-sm font-medium text-gray-700">Nueva contraseña</label>
                            <input
                              type="password"
                              id="passwordNuevo"
                              name="passwordNuevo"
                              value={cambioPassword.passwordNuevo}
                              onChange={(e) => setCambioPassword({...cambioPassword, passwordNuevo: e.target.value})}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primario-500 focus:border-primario-500"
                            />
                            <p className="mt-1 text-xs text-gray-500">La contraseña debe tener al menos 8 caracteres y contener letras, números y caracteres especiales.</p>
                          </div>
                          
                          <div>
                            <label htmlFor="confirmarPassword" className="block text-sm font-medium text-gray-700">Confirmar nueva contraseña</label>
                            <input
                              type="password"
                              id="confirmarPassword"
                              name="confirmarPassword"
                              value={cambioPassword.confirmarPassword}
                              onChange={(e) => setCambioPassword({...cambioPassword, confirmarPassword: e.target.value})}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primario-500 focus:border-primario-500"
                            />
                          </div>
                          
                          <div className="pt-3">
                            <button
                              type="button"
                              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primario-600 hover:bg-primario-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primario-500"
                            >
                              Actualizar contraseña
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Sección de sesiones activas */}
                  <div>
                    <h3 className="text-base font-medium text-gray-700 mb-3">Información de sesión</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-700">Tu sesión actual expirará por inactividad después de 1 hora.</p>
                          <p className="text-xs text-gray-500 mt-1">Por seguridad, tu sesión se cerrará automáticamente si no hay actividad.</p>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Activa
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sección de cerrar sesión */}
                  <div>
                    <h3 className="text-base font-medium text-gray-700 mb-3">Cerrar sesión</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-4">Si cierras sesión, tendrás que volver a iniciar sesión con tus credenciales para acceder a tu cuenta.</p>
                      
                      <CerrarSesion />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MiPerfil;
