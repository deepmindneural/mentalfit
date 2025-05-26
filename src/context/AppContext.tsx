import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Especialista } from '../tipos';
import { ResultadoCuestionario } from '../tipos/cuestionarios';

interface AppContextProps {
  // Datos del usuario
  usuario: {
    id?: string;
    nombre?: string;
    estaLogueado: boolean;
  };
  
  // Historial de cuestionarios
  historialCuestionarios: ResultadoCuestionario[];
  
  // Especialistas destacados
  especialistasDestacados: Especialista[];
  
  // Acciones del contexto
  agregarResultadoCuestionario: (resultado: ResultadoCuestionario) => void;
  obtenerResultadoCuestionario: (id: string) => ResultadoCuestionario | undefined;
  establecerUsuario: (datosUsuario: any) => void;
  cerrarSesion: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de un AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [usuario, setUsuarioState] = useState({
    estaLogueado: false
  });
  
  const [historialCuestionarios, setHistorialCuestionarios] = useState<ResultadoCuestionario[]>([]);
  const [especialistasDestacados, setEspecialistasDestacados] = useState<Especialista[]>([]);
  
  // Cargar datos desde localStorage al inicio
  useEffect(() => {
    // Cargar historial de cuestionarios
    try {
      const historialGuardado = localStorage.getItem('resultadosCuestionarios');
      if (historialGuardado) {
        setHistorialCuestionarios(JSON.parse(historialGuardado));
      }
      
      // Cargar información de usuario
      const usuarioGuardado = localStorage.getItem('mentalfitUsuario');
      if (usuarioGuardado) {
        setUsuarioState(JSON.parse(usuarioGuardado));
      }
      
      // Cargar especialistas destacados
      import('../data/especialistas').then(module => {
        const { obtenerEspecialistasDestacados } = module;
        const destacados = obtenerEspecialistasDestacados();
        setEspecialistasDestacados(destacados);
      }).catch(error => {
        console.error('Error al cargar especialistas destacados:', error);
      });
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }, []);
  
  // Guardar historiales en localStorage cuando cambien
  useEffect(() => {
    if (historialCuestionarios.length > 0) {
      localStorage.setItem('resultadosCuestionarios', JSON.stringify(historialCuestionarios));
    }
  }, [historialCuestionarios]);
  
  // Agregar nuevo resultado de cuestionario
  const agregarResultadoCuestionario = (resultado: ResultadoCuestionario) => {
    setHistorialCuestionarios(prevHistorial => {
      // Verificar si ya existe un resultado con el mismo ID
      const existeResultado = prevHistorial.some(r => r.id === resultado.id);
      if (existeResultado) {
        return prevHistorial.map(r => r.id === resultado.id ? resultado : r);
      } else {
        return [...prevHistorial, resultado];
      }
    });
  };
  
  // Obtener un resultado específico por ID
  const obtenerResultadoCuestionario = (id: string): ResultadoCuestionario | undefined => {
    return historialCuestionarios.find(r => r.id === id);
  };
  
  // Actualizar datos del usuario
  const establecerUsuario = (datosUsuario: any) => {
    const nuevoUsuario = { ...datosUsuario, estaLogueado: true };
    setUsuarioState(nuevoUsuario);
    localStorage.setItem('mentalfitUsuario', JSON.stringify(nuevoUsuario));
  };
  
  // Cerrar sesión
  const cerrarSesion = () => {
    setUsuarioState({ estaLogueado: false });
    localStorage.removeItem('mentalfitUsuario');
  };
  
  const value = {
    usuario,
    historialCuestionarios,
    especialistasDestacados,
    agregarResultadoCuestionario,
    obtenerResultadoCuestionario,
    establecerUsuario,
    cerrarSesion
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
