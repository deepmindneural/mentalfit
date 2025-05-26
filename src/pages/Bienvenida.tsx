import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PromoChat from '../components/chat/PromoChat';

const Bienvenida: React.FC = () => {
  const { sesion } = useAuth();
  const navigate = useNavigate();
  
  // Fecha de hoy formateada
  const hoy = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  // Datos simulados de sistema de créditos
  const creditosInfo = {
    disponibles: 150,
    gastadosEsteMes: 75,
    totalSesiones: 12
  };
  
  // Redireccionar a diferentes secciones según el rol
  const navegarA = (ruta: string) => {
    navigate(ruta);
  };
  
  // Comprobar si el usuario tiene múltiples roles (para este ejemplo, simulamos)
  const tieneMultiplesRoles = sesion.usuario?.rol === 'admin'; // simulado
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Sección de bienvenida */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  ¡Hola, {sesion.usuario?.nombre}!
                </h1>
                <p className="text-gray-600 mt-2">
                  Hoy es {hoy.charAt(0).toUpperCase() + hoy.slice(1)}
                </p>
                
                <div className="mt-6 bg-gradient-to-r from-primario-600 to-primario-800 rounded-lg text-white p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-xl font-bold mb-2">Tu bienestar es nuestra prioridad</h2>
                      <p className="text-primario-100">Continúa con tu plan personalizado para mejorar tu salud mental.</p>
                    </div>
                    <button 
                      onClick={() => navegarA('/dashboard/progreso')} 
                      className="mt-4 md:mt-0 bg-white text-primario-700 px-4 py-2 rounded-md font-medium hover:bg-primario-50"
                    >
                      Ver mi progreso
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Promo Chat de Sentimientos */}
            <div className="mb-6">
              <PromoChat />
            </div>
            
            {/* Sistema de créditos */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">Mis Créditos</h2>
                  <button 
                    onClick={() => navegarA('/dashboard/perfil')}
                    className="text-primario-600 hover:text-primario-800 text-sm font-medium"
                  >
                    Ver todos
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-primario-600 to-primario-700 rounded-xl p-5 text-white shadow-md">
                    <h3 className="text-sm font-medium text-primario-100 mb-1">Créditos disponibles</h3>
                    <div className="text-3xl font-bold">{creditosInfo.disponibles}</div>
                    <button 
                      onClick={() => navegarA('/planes')}
                      className="mt-3 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-white"
                    >
                      Comprar más
                    </button>
                  </div>
                  
                  <div className="bg-gray-100 rounded-xl p-5 text-gray-800 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Utilizados este mes</h3>
                    <div className="text-3xl font-bold">{creditosInfo.gastadosEsteMes}</div>
                    <div className="mt-2 text-xs text-gray-500">
                      {Math.round(creditosInfo.gastadosEsteMes / (creditosInfo.disponibles + creditosInfo.gastadosEsteMes) * 100)}% del total
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 rounded-xl p-5 text-gray-800 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Sesiones completadas</h3>
                    <div className="text-3xl font-bold">{creditosInfo.totalSesiones}</div>
                    <div className="mt-2 text-xs text-gray-500">
                      Última: hace 2 días
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Accesos directos / roles */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Accesos rápidos</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Acceso para usuarios */}
                  <div 
                    onClick={() => navegarA('/dashboard/perfil')}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="bg-primario-100 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primario-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-800">Mi Perfil</h3>
                        <p className="text-sm text-gray-500">Gestiona tu información personal</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Acceso para suscripciones */}
                  <div 
                    onClick={() => navegarA('/dashboard/suscripciones')}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="bg-secundario-100 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secundario-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-800">Mis Suscripciones</h3>
                        <p className="text-sm text-gray-500">Ver mis planes y transacciones</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Acceso para Chat de Sentimientos */}
                  <div 
                    onClick={() => navegarA('/dashboard/chat-sentimientos')}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="bg-cyan-100 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-800">Chat de Sentimientos</h3>
                        <p className="text-sm text-gray-500">Explora y comprende tus emociones</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mostrar el botón de panel de administrador si tiene el rol correspondiente */}
                  {sesion.usuario?.rol === 'admin' && (
                    <div 
                      onClick={() => navegarA('/admin')}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center">
                        <div className="bg-acento-100 p-3 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-acento-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-gray-800">Panel de Administración</h3>
                          <p className="text-sm text-gray-500">Gestionar la plataforma</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Mostrar el botón de panel de aliado si tiene el rol correspondiente */}
                  {sesion.usuario?.rol === 'aliado' && (
                    <div 
                      onClick={() => navegarA('/dashboard/aliado')}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center">
                        <div className="bg-green-100 p-3 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-gray-800">Panel de Aliado</h3>
                          <p className="text-sm text-gray-500">Gestionar comisiones y referidos</p>
                        </div>
                      </div>
                    </div>
                  )}
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

export default Bienvenida;
