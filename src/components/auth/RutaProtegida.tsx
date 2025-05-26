import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface RutaProtegidaProps {
  children: React.ReactNode;
  requiereRol?: 'usuario' | 'aliado' | 'admin' | undefined;
}

const RutaProtegida: React.FC<RutaProtegidaProps> = ({ children, requiereRol }) => {
  const { sesion, cargando } = useAuth();
  const location = useLocation();

  // Si estu00e1 cargando, mostrar un indicador de carga
  if (cargando) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primario-600"></div>
      </div>
    );
  }

  // Si no estu00e1 autenticado, redirigir al login
  if (!sesion.isAutenticado || !sesion.usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si requiere un rol especu00edfico, verificar
  if (requiereRol && sesion.usuario.rol !== requiereRol) {
    // Redirigir segu00fan el rol actual
    switch (sesion.usuario.rol) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'aliado':
        return <Navigate to="/dashboard/aliado" replace />;
      default:
        return <Navigate to="/dashboard/progreso" replace />;
    }
  }

  // Si estu00e1 autenticado y tiene el rol adecuado, mostrar el componente hijo
  return <>{children}</>;
};

export default RutaProtegida;
