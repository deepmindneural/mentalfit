import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

interface CerrarSesionProps {
  variant?: 'boton' | 'link';
  className?: string;
  onSuccess?: () => void;
}

const CerrarSesion: React.FC<CerrarSesionProps> = ({
  variant = 'boton',
  className = '',
  onSuccess
}) => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const [confirmando, setConfirmando] = useState(false);
  const [cerrando, setCerrando] = useState(false);
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    setConfirmando(true);
  };

  const confirmarCierreSesion = () => {
    setCerrando(true);
    
    // Permitir que el componente muestre el estado de carga
    setTimeout(() => {
      logout(true);
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/login');
      }
    }, 1000);
  };

  const cancelarCierreSesion = () => {
    setConfirmando(false);
  };

  // Renderizar según la variante
  if (variant === 'link') {
    return (
      <div className={className}>
        {!confirmando ? (
          <button
            onClick={handleCerrarSesion}
            className="text-red-600 hover:text-red-800 font-medium flex items-center transition-colors duration-200"
            disabled={cerrando}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {t('cerrarSesion')}
          </button>
        ) : (
          <div className="flex items-center space-x-3">
            <button
              onClick={confirmarCierreSesion}
              className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200"
              disabled={cerrando}
            >
              {cerrando ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('cerrando')}
                </div>
              ) : (
                t('confirmar')
              )}
            </button>
            <button
              onClick={cancelarCierreSesion}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              disabled={cerrando}
            >
              {t('cancelar')}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Variante de botón por defecto
  return (
    <div className={className}>
      {!confirmando ? (
        <button
          onClick={handleCerrarSesion}
          className="w-full flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors duration-200"
          disabled={cerrando}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {t('cerrarSesion')}
        </button>
      ) : (
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-gray-600 mb-2">{t('u00bfEstu00e1s seguro que deseas cerrar sesiu00f3n?')}</p>
          <div className="flex space-x-2">
            <button
              onClick={confirmarCierreSesion}
              className={`flex-1 flex items-center justify-center px-4 py-2 ${cerrando ? 'bg-red-100' : 'bg-red-600 hover:bg-red-700'} text-white rounded-lg font-medium transition-colors duration-200`}
              disabled={cerrando}
            >
              {cerrando ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('cerrando')}
                </div>
              ) : (
                t('confirmar')
              )}
            </button>
            <button
              onClick={cancelarCierreSesion}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
              disabled={cerrando}
            >
              {t('cancelar')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CerrarSesion;
