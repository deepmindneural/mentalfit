import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useCreditos } from '../../context/CreditosContext';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { sesion, logout } = useAuth();
  const { saldoActual, cargando } = useCreditos();
  
  // Manejar cierre de sesión
  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Construir elementos de navegación según autenticación y rol
  const getNavItems = () => {
    // Elementos básicos disponibles para todos (no autenticados)
    if (!sesion.isAutenticado) {
      return [
        { label: t('inicio'), path: '/' },
        { label: t('especialistas'), path: '/especialistas' },
        { label: t('cuestionarios'), path: '/cuestionarios' },
        { label: t('planes'), path: '/planes' },
      ];
    }
    
    // Elementos según rol si está autenticado
    if (sesion.usuario) {
      switch (sesion.usuario.rol) {
        case 'admin':
          return [
            { label: t('inicio'), path: '/' },
            { label: 'Dashboard', path: '/admin' },
            { label: 'Aliados', path: '/admin/aliados' },
            { label: 'Cupones', path: '/admin/cupones' },
            { label: 'Planes', path: '/admin/planes' },
            { label: 'Transacciones', path: '/admin/transacciones' },
          ];
        case 'aliado':
          return [
            { label: t('inicio'), path: '/' },
            { label: t('especialistas'), path: '/especialistas' },
            { label: 'Mi Panel', path: '/dashboard/aliado' },
            { label: 'Mi Perfil', path: '/dashboard/perfil' },
          ];
        case 'usuario':
        default:
          return [
            { label: t('inicio'), path: '/' },
            { label: t('especialistas'), path: '/especialistas' },
            { label: t('cuestionarios'), path: '/cuestionarios' },
            { label: t('planes'), path: '/planes' },
            { label: 'Mi Progreso', path: '/dashboard/progreso' },
            { label: 'Mis Créditos', path: '/dashboard/creditos' },
            { label: 'Mis Suscripciones', path: '/dashboard/suscripciones' },
            { label: 'Chat de Sentimientos', path: '/dashboard/chat-sentimientos' },
          ];
      }
    }
    
    // Predeterminado
    return [
      { label: t('inicio'), path: '/' },
      { label: t('especialistas'), path: '/especialistas' },
      { label: t('cuestionarios'), path: '/cuestionarios' },
      { label: t('planes'), path: '/planes' },
    ];
  };
  
  const navItems = getNavItems();
  
  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className={`text-2xl font-bold font-heading ${scrolled ? 'text-primario-600' : 'text-white'}`}>
            Mental<span className="text-acento-500">Fit</span>
          </span>
        </Link>

        {/* Menú escritorio */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path}
              className={`${scrolled ? 'text-gray-700 hover:text-primario-600' : 'text-white hover:text-primario-200'} transition-colors duration-200 text-base font-medium`}
            >
              {item.label}
            </Link>
          ))}

          {/* Selector de idioma */}
          <div className="flex items-center space-x-2 ml-4">
            <button 
              onClick={() => changeLanguage('es')}
              className={`${i18n.language === 'es' ? 'font-bold' : 'font-normal'} ${scrolled ? 'text-gray-700' : 'text-white'} px-2`}
            >
              ES
            </button>
            <span className={scrolled ? 'text-gray-400' : 'text-gray-300'}>|</span>
            <button 
              onClick={() => changeLanguage('en')}
              className={`${i18n.language === 'en' ? 'font-bold' : 'font-normal'} ${scrolled ? 'text-gray-700' : 'text-white'} px-2`}
            >
              EN
            </button>
          </div>

          {/* Indicador de créditos - visible solo para usuarios autenticados */}
          {sesion.isAutenticado && sesion.usuario?.rol === 'usuario' && (
            <Link 
              to="/dashboard/creditos"
              className={`flex items-center space-x-1 border rounded-full px-3 py-1 mr-2 ${
                scrolled 
                  ? 'bg-primario-50 text-primario-600 border-primario-200 hover:bg-primario-100' 
                  : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                {cargando ? (
                  <span className="w-5 h-3 bg-current opacity-20 rounded animate-pulse"></span>
                ) : (
                  <>{saldoActual} {t('créditos')}</>
                )}
              </span>
            </Link>
          )}

          {/* Botón perfil / inicio de sesión */}
          <div className="ml-1">
            {sesion.isAutenticado ? (
              <div className="relative group">
                <button 
                  className={`flex items-center space-x-2 border rounded-full px-3 py-1 ${
                    scrolled 
                      ? 'text-gray-700 hover:text-primario-600 border-gray-300 hover:border-primario-400 bg-white' 
                      : 'text-white hover:text-primario-200 border-white/30 hover:border-white'
                  }`}
                >
                  {sesion.usuario?.foto && (
                    <img 
                      src={sesion.usuario.foto} 
                      alt={sesion.usuario.nombre} 
                      className="w-6 h-6 rounded-full mr-2"
                    />
                  )}
                  <span className="font-medium">{sesion.usuario?.nombre || "Usuario"}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg overflow-hidden z-20 hidden group-hover:block"
                     style={{border: '1px solid rgba(0,0,0,0.1)'}}
                >
                  <div className="p-3 bg-gray-50 border-b border-gray-200">
                    <p className="font-medium text-gray-800">{sesion.usuario?.nombre} {sesion.usuario?.apellido}</p>
                    <p className="text-xs text-gray-500 truncate">{sesion.usuario?.email}</p>
                  </div>
                  
                  <div className="py-1">
                    <Link 
                      to="/dashboard/perfil"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Mi Perfil
                    </Link>
                    
                    <Link 
                      to="/bienvenida"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Panel Principal
                    </Link>
                    
                    <Link 
                      to="/dashboard/chat-sentimientos"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Chat de Sentimientos
                    </Link>
                  </div>
                  
                  <div className="border-t border-gray-200">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link 
                to="/login"
                className={`${scrolled ? 'bg-primario-600 text-white hover:bg-primario-700' : 'bg-white text-primario-600 hover:bg-primario-50'} px-4 py-2 rounded-lg font-medium transition-colors duration-200`}
              >
                {t('iniciarSesion')}
              </Link>
            )}
          </div>
        </nav>
        
        {/* Botón menú móvil */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-6 w-6 ${scrolled ? 'text-gray-800' : 'text-white'}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-50">
            <div className="container mx-auto px-4 py-3">
              {/* Sección de usuario si está autenticado */}
              {sesion.isAutenticado && sesion.usuario ? (
                <div className="mb-4">
                  <div className="flex items-center mb-3 pb-3 border-b border-gray-200">
                    <div className="h-10 w-10 rounded-full bg-primario-600 flex items-center justify-center text-white font-medium mr-3">
                      {sesion.usuario?.nombre?.charAt(0) ?? 'U'}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{sesion.usuario.nombre} {sesion.usuario.apellido}</div>
                      <div className="text-xs text-gray-500">{sesion.usuario.email}</div>
                    </div>
                  </div>
                  
                  {/* Indicador de créditos en móvil */}
                  {sesion.usuario.rol === 'usuario' && (
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Tus créditos disponibles:</span>
                      <div className="flex items-center bg-primario-50 text-primario-600 px-3 py-1 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {cargando ? (
                          <span className="w-8 h-3 bg-current opacity-20 rounded animate-pulse"></span>
                        ) : (
                          <span className="font-medium">{saldoActual}</span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <Link
                      to="/dashboard/perfil"
                      className="flex items-center justify-center py-2 px-3 bg-gray-100 rounded-md text-sm text-gray-800 hover:bg-gray-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Mi Perfil
                    </Link>
                    
                    <Link
                      to="/bienvenida"
                      className="flex items-center justify-center py-2 px-3 bg-gray-100 rounded-md text-sm text-gray-800 hover:bg-gray-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Panel
                    </Link>
                    
                    <Link
                      to="/dashboard/chat-sentimientos"
                      className="flex items-center justify-center py-2 px-3 bg-gray-100 rounded-md text-sm text-gray-800 hover:bg-gray-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Chat
                    </Link>
                  </div>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="block py-2 mb-3 bg-primario-600 text-white text-center rounded-lg font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('iniciarSesion')}
                </Link>
              )}
              
              {/* Elementos de navegación */}
              <div className="border-t border-gray-200 pt-3">
                {navItems.map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.path}
                    className="block py-2 text-gray-700 hover:text-primario-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Selección de idioma */}
              <div className="flex items-center space-x-4 py-2 mt-2 border-t border-gray-200">
                <button 
                  onClick={() => {
                    changeLanguage('es');
                    setIsMenuOpen(false);
                  }}
                  className={`${i18n.language === 'es' ? 'font-bold' : 'font-normal'} text-gray-700 px-2`}
                >
                  Español
                </button>
                <button 
                  onClick={() => {
                    changeLanguage('en');
                    setIsMenuOpen(false);
                  }}
                  className={`${i18n.language === 'en' ? 'font-bold' : 'font-normal'} text-gray-700 px-2`}
                >
                  English
                </button>
              </div>
              
              {/* Botón de cerrar sesión si está autenticado */}
              {sesion.isAutenticado && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full py-2 px-4 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
