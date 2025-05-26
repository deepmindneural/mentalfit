import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const { isAutenticado } = useAuth().sesion;
  const { logout } = useAuth();
  
  // Función manejadora para el evento onClick del botón de cerrar sesión
  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    logout(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-cyan-600">MentalFit</Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-cyan-600 transition-colors">Inicio</Link>
            <Link to="/especialistas" className="text-gray-600 hover:text-cyan-600 transition-colors">Especialistas</Link>
            <Link to="/cuestionarios" className="text-gray-600 hover:text-cyan-600 transition-colors">Cuestionarios</Link>
            <Link to="/planes" className="text-gray-600 hover:text-cyan-600 transition-colors">Planes</Link>
            <Link to="/mapa" className="text-gray-600 hover:text-cyan-600 transition-colors">Mapa</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {isAutenticado ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/mi-cuenta" 
                  className="text-gray-600 hover:text-cyan-600 transition-colors"
                >
                  Mi cuenta
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </header>
      
      {/* Contenido principal */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">MentalFit</h3>
              <p className="text-gray-300">Plataforma de bienestar mental y psicológico.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Enlaces rápidos</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors">Inicio</Link></li>
                <li><Link to="/especialistas" className="text-gray-300 hover:text-cyan-400 transition-colors">Especialistas</Link></li>
                <li><Link to="/cuestionarios" className="text-gray-300 hover:text-cyan-400 transition-colors">Evaluaciones</Link></li>
                <li><Link to="/planes" className="text-gray-300 hover:text-cyan-400 transition-colors">Planes</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Contacto</h3>
              <p className="text-gray-300">Email: info@mentalfit.com</p>
              <p className="text-gray-300">Teléfono: +57 1234567890</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} MentalFit. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
