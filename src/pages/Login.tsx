import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, sesion, cargando } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('usuario');
  const [errorMensaje, setErrorMensaje] = useState('');
  const [procesando, setProcesando] = useState(false);
  
  // Si ya está autenticado, redirigir según el rol
  if (!cargando && sesion.isAutenticado && sesion.usuario) {
    switch (sesion.usuario.rol) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'aliado':
        return <Navigate to="/dashboard/aliado" replace />;
      default:
        return <Navigate to="/dashboard/progreso" replace />;
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMensaje('Por favor complete todos los campos');
      return;
    }
    
    setProcesando(true);
    setErrorMensaje('');
    
    try {
      const resultado = await login({ email, password });
      
      if (!resultado.success) {
        setErrorMensaje(resultado.mensaje || 'Error al iniciar sesión');
        return;
      }
      
      // La redirección se maneja automáticamente por el efecto en el componente
    } catch (error) {
      setErrorMensaje('Ocurrió un error al procesar su solicitud');
      console.error(error);
    } finally {
      setProcesando(false);
    }
  };
  
  // Sugerencias de email para facilitar pruebas
  const emailSugerido = () => {
    switch (tipoUsuario) {
      case 'usuario':
        return 'usuario@mentalfit.co';
      case 'aliado':
        return 'aliado@mentalfit.co';
      case 'admin':
        return 'admin@mentalfit.co';
      default:
        return '';
    }
  };
  
  // Sugerencias de password para facilitar pruebas
  const passwordSugerido = () => {
    switch (tipoUsuario) {
      case 'usuario':
        return 'usuario123';
      case 'aliado':
        return 'aliado123';
      case 'admin':
        return 'admin123';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/3 bg-gradient-to-br from-primario-600 to-primario-800 text-white p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">Bienvenido a MentalFit</h2>
              <p className="text-primario-100">Inicia sesión para acceder a nuestros servicios personalizados de bienestar mental.</p>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">Tipo de Usuario</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="tipoUsuario"
                      value="usuario"
                      checked={tipoUsuario === 'usuario'}
                      onChange={() => setTipoUsuario('usuario')}
                      className="h-4 w-4 text-primario-600 focus:ring-primario-500 border-gray-300"
                    />
                    <span className="ml-2">Usuario</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="tipoUsuario"
                      value="aliado"
                      checked={tipoUsuario === 'aliado'}
                      onChange={() => setTipoUsuario('aliado')}
                      className="h-4 w-4 text-primario-600 focus:ring-primario-500 border-gray-300"
                    />
                    <span className="ml-2">Aliado</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="tipoUsuario"
                      value="admin"
                      checked={tipoUsuario === 'admin'}
                      onChange={() => setTipoUsuario('admin')}
                      className="h-4 w-4 text-primario-600 focus:ring-primario-500 border-gray-300"
                    />
                    <span className="ml-2">Administrador</span>
                  </label>
                </div>
                
                <div className="mt-6 text-xs">
                  <p className="text-primario-100">Selecciona el tipo de usuario para iniciar sesión</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 md:p-12 md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Iniciar Sesión</h2>
              
              {errorMensaje && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                  <p>{errorMensaje}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primario-500 focus:border-primario-500"
                    placeholder={emailSugerido()}
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primario-500 focus:border-primario-500"
                    placeholder={passwordSugerido()}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primario-600 focus:ring-primario-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Recordarme
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <a href="#" className="font-medium text-primario-600 hover:text-primario-500">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={procesando}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primario-600 hover:bg-primario-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primario-500"
                  >
                    {procesando ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Procesando...
                      </>
                    ) : (
                      'Iniciar sesión'
                    )}
                  </button>
                </div>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  ¿No tienes una cuenta?
                  <Link to="/registro" className="ml-1 font-medium text-primario-600 hover:text-primario-500">
                    Regístrate
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
