import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { Usuario, CredencialesLogin, ResultadoLogin, SesionUsuario } from '../tipos/auth';
import { loginUsuario, verificarTokenUsuario } from '../data/auth';

interface AuthContextType {
  sesion: SesionUsuario;
  login: (credenciales: CredencialesLogin) => Promise<ResultadoLogin>;
  logout: (redirigir?: boolean) => void;
  cargando: boolean;
  verificarSesion: () => Promise<boolean>;
  actualizarUsuario: (datosUsuario: Partial<Usuario>) => void;
  sesionExpirada: boolean;
}

const defaultSesion: SesionUsuario = {
  isAutenticado: false,
};

const AuthContext = createContext<AuthContextType>({
  sesion: defaultSesion,
  login: async () => ({ success: false }),
  logout: () => {},
  cargando: true,
  verificarSesion: async () => false,
  actualizarUsuario: () => {},
  sesionExpirada: false,
});

export const useAuth = () => useContext(AuthContext);

// Tiempo de expiración de sesión (en milisegundos)
const TIEMPO_EXPIRACION = 3600000; // 1 hora

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sesion, setSesion] = useState<SesionUsuario>(defaultSesion);
  const [cargando, setCargando] = useState(true);
  const [sesionExpirada, setSesionExpirada] = useState(false);
  const [tiempoUltimaActividad, setTiempoUltimaActividad] = useState<number>(Date.now());
  
  // Verificar si hay una sesión guardada al cargar la aplicación
  useEffect(() => {
    const sesionGuardada = localStorage.getItem('mentalfit_sesion');
    const tiempoGuardado = localStorage.getItem('mentalfit_ultima_actividad');
    
    if (sesionGuardada) {
      try {
        const sesionParseada = JSON.parse(sesionGuardada) as SesionUsuario;
        
        // Verificar si la sesión ha expirado por tiempo
        if (tiempoGuardado) {
          const ultimaActividad = parseInt(tiempoGuardado, 10);
          const ahora = Date.now();
          
          if (ahora - ultimaActividad > TIEMPO_EXPIRACION) {
            // La sesión ha expirado
            logout(false);
            setSesionExpirada(true);
          } else {
            setSesion(sesionParseada);
            setTiempoUltimaActividad(ultimaActividad);
          }
        } else {
          setSesion(sesionParseada);
          setTiempoUltimaActividad(Date.now());
        }
      } catch (error) {
        console.error('Error al parsear la sesión guardada:', error);
        logout(false);
      }
    }
    
    setCargando(false);
  }, []);
  
  // Guardar sesión en localStorage cuando cambie
  useEffect(() => {
    if (sesion.isAutenticado) {
      localStorage.setItem('mentalfit_sesion', JSON.stringify(sesion));
      localStorage.setItem('mentalfit_ultima_actividad', tiempoUltimaActividad.toString());
    }
  }, [sesion, tiempoUltimaActividad]);
  
  // Verificar la validez de la sesión periódicamente
  useEffect(() => {
    if (!sesion.isAutenticado) return;
    
    const verificarActividad = () => {
      const ahora = Date.now();
      setTiempoUltimaActividad(ahora);
      localStorage.setItem('mentalfit_ultima_actividad', ahora.toString());
    };
    
    const verificarExpiracion = () => {
      const ahora = Date.now();
      const ultimaActividad = parseInt(localStorage.getItem('mentalfit_ultima_actividad') || '0', 10);
      
      if (ahora - ultimaActividad > TIEMPO_EXPIRACION) {
        // La sesión ha expirado por inactividad
        logout(true);
        setSesionExpirada(true);
      }
    };
    
    // Actualizar tiempo de actividad con interacciones del usuario
    window.addEventListener('click', verificarActividad);
    window.addEventListener('keypress', verificarActividad);
    window.addEventListener('scroll', verificarActividad);
    
    // Verificar expiración cada minuto
    const intervalo = setInterval(verificarExpiracion, 60000);
    
    return () => {
      window.removeEventListener('click', verificarActividad);
      window.removeEventListener('keypress', verificarActividad);
      window.removeEventListener('scroll', verificarActividad);
      clearInterval(intervalo);
    };
  }, [sesion.isAutenticado]);
  
  // Función para realizar login
  const login = async (credenciales: CredencialesLogin): Promise<ResultadoLogin> => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const resultado = loginUsuario(credenciales);
    
    if (resultado.success && resultado.usuario && resultado.token) {
      setSesion({
        usuario: resultado.usuario,
        isAutenticado: true,
        token: resultado.token,
      });
    }
    
    return resultado;
  };
  
  // Verificar sesión con el servidor
  const verificarSesion = useCallback(async (): Promise<boolean> => {
    if (!sesion.isAutenticado || !sesion.token) return false;
    
    try {
      // En un entorno real, esto haría una llamada al API para verificar el token
      const esValido = await verificarTokenUsuario(sesion.token);
      
      if (!esValido) {
        logout(true);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error al verificar sesión:', error);
      logout(false);
      return false;
    }
  }, [sesion.isAutenticado, sesion.token]);
  
  // Actualizar datos del usuario en sesión
  const actualizarUsuario = useCallback((datosUsuario: Partial<Usuario>) => {
    if (!sesion.isAutenticado || !sesion.usuario) return;
    
    setSesion(prevSesion => ({
      ...prevSesion,
      usuario: {
        ...prevSesion.usuario!,
        ...datosUsuario
      }
    }));
  }, [sesion.isAutenticado, sesion.usuario]);

  // Función para cerrar sesión
  const logout = useCallback((redirigir: boolean = true) => {
    // Limpiar estado de sesión
    setSesion(defaultSesion);
    
    // Eliminar datos de localStorage
    localStorage.removeItem('mentalfit_sesion');
    localStorage.removeItem('mentalfit_ultima_actividad');
    localStorage.removeItem('mentalfit_token');
    localStorage.removeItem('mentalfit_user');
    
    // Otros datos que puedan existir
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('mentalfit_')) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    // Redirigir solo si se especifica
    if (redirigir) {
      setTimeout(() => {
        window.location.href = '/login';
      }, 100);
    }
  }, []);
  
  return (
    <AuthContext.Provider value={{ 
      sesion, 
      login, 
      logout, 
      cargando, 
      verificarSesion, 
      actualizarUsuario,
      sesionExpirada 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
