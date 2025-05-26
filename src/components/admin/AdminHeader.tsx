import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { sesion, logout } = useAuth();
  const navigate = useNavigate();
  
  // Manejar cierre de sesión
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Ejemplo de notificaciones
  const notifications = [
    { id: 1, title: 'Nuevo aliado registrado', time: 'Hace 5 minutos' },
    { id: 2, title: 'Cupu00f3n PROMO10K utilizado 3 veces', time: 'Hace 30 minutos' },
    { id: 3, title: 'Solicitud de pago pendiente', time: 'Hace 2 horas' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shadow-sm sticky top-0 z-10">
      <div className="flex items-center">
        {/* Botu00f3n de menu00fa para dispositivos mu00f3viles */}
        <button
          className="md:hidden p-2 mr-3 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
          onClick={onMenuClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Panel de Administraciu00f3n</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Botu00f3n de notificaciones */}
        <div className="relative">
          <button 
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primario-600"></span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          
          {/* Dropdown de notificaciones */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-800">Notificaciones</h2>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                    <p className="text-sm font-medium text-gray-800">{notification.title}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-200 text-center">
                <button className="text-sm text-primario-600 hover:text-primario-700 font-medium">
                  Ver todas las notificaciones
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Menu00fa de usuario */}
        <div className="relative">
          <button 
            className="flex items-center space-x-2 focus:outline-none"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <img 
              src={sesion.usuario?.foto || "https://randomuser.me/api/portraits/men/32.jpg"} 
              alt={sesion.usuario?.nombre || "Usuario"} 
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="flex flex-col items-start text-sm">
              <span className="font-medium text-gray-800">{sesion.usuario?.nombre || "Usuario"}</span>
              <span className="text-xs text-gray-500">{sesion.usuario?.rol === 'admin' ? 'Administrador' : 'Usuario'}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Dropdown de usuario */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Mi perfil
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Configuraciu00f3n
              </button>
              <div className="border-t border-gray-200 my-1"></div>
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Cerrar sesiu00f3n
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
