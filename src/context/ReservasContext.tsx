import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useCreditos } from './CreditosContext';

interface Reserva {
  id: string;
  especialistaId: string;
  usuarioId: string;
  fecha: string;
  hora: string;
  estado: 'pendiente' | 'confirmada' | 'completada' | 'cancelada';
  precio: number;
  creditos: number;
  createdAt: string;
  motivoConsulta?: string;
  notas?: string;
  modalidad: 'presencial' | 'virtual';
  especialistaNombre: string;
  especialistaApellido: string;
  especialistaEspecialidad: string;
  especialistaFoto: string;
  usuarioNombre: string;
  usuarioApellido: string;
  usuarioEmail: string;
}

interface DisponibilidadHoraria {
  dia: string;
  horasDisponibles: string[];
}

interface PerfilProfesional {
  id: string;
  disponibilidad: DisponibilidadHoraria[];
  precioPorSesion: number;
  creditosPorSesion: number;
  duracionSesion: number;
  modalidades: ('presencial' | 'virtual')[];
  ubicacion?: string;
  direccion?: string;
}

interface ReservasContextType {
  reservasUsuario: Reserva[];
  reservasProfesional: Reserva[];
  cargandoReservas: boolean;
  perfilProfesional: PerfilProfesional | null;
  cargandoPerfil: boolean;
  disponibilidadEspecialista: DisponibilidadHoraria[];
  obtenerDisponibilidad: (especialistaId: string) => Promise<DisponibilidadHoraria[]>;
  crearReserva: (reserva: Omit<Reserva, 'id' | 'createdAt' | 'estado'>) => Promise<Reserva>;
  cancelarReserva: (reservaId: string) => Promise<boolean>;
  confirmarReserva: (reservaId: string) => Promise<boolean>;
  completarReserva: (reservaId: string) => Promise<boolean>;
  actualizarPerfilProfesional: (perfil: Partial<PerfilProfesional>) => Promise<boolean>;
  errorReservas: string | null;
}

const ReservasContext = createContext<ReservasContextType | undefined>(undefined);

// Datos de ejemplo para desarrollo
const RESERVAS_EJEMPLO: Reserva[] = [
  {
    id: '1',
    especialistaId: 'esp1',
    usuarioId: 'usr1',
    fecha: '2025-05-10',
    hora: '10:00',
    estado: 'pendiente',
    precio: 150000,
    creditos: 20,
    createdAt: '2025-05-05T15:30:00',
    motivoConsulta: 'Consulta inicial',
    modalidad: 'virtual',
    especialistaNombre: 'Laura',
    especialistaApellido: 'Gómez',
    especialistaEspecialidad: 'Psicología',
    especialistaFoto: 'https://randomuser.me/api/portraits/women/12.jpg',
    usuarioNombre: 'Carlos',
    usuarioApellido: 'Pérez',
    usuarioEmail: 'carlos@ejemplo.com'
  },
  {
    id: '2',
    especialistaId: 'esp2',
    usuarioId: 'usr1',
    fecha: '2025-05-12',
    hora: '15:00',
    estado: 'confirmada',
    precio: 180000,
    creditos: 25,
    createdAt: '2025-05-05T10:15:00',
    motivoConsulta: 'Seguimiento',
    modalidad: 'presencial',
    especialistaNombre: 'Juan',
    especialistaApellido: 'Díaz',
    especialistaEspecialidad: 'Nutrición',
    especialistaFoto: 'https://randomuser.me/api/portraits/men/22.jpg',
    usuarioNombre: 'Carlos',
    usuarioApellido: 'Pérez',
    usuarioEmail: 'carlos@ejemplo.com'
  }
];

const DISPONIBILIDAD_EJEMPLO: DisponibilidadHoraria[] = [
  {
    dia: '2025-05-10',
    horasDisponibles: ['09:00', '10:00', '11:00', '15:00', '16:00']
  },
  {
    dia: '2025-05-11',
    horasDisponibles: ['10:00', '11:00', '12:00', '17:00']
  },
  {
    dia: '2025-05-12',
    horasDisponibles: ['09:00', '14:00', '15:00', '16:00']
  },
  {
    dia: '2025-05-13',
    horasDisponibles: ['10:00', '11:00', '15:00', '16:00', '17:00']
  },
  {
    dia: '2025-05-14',
    horasDisponibles: ['09:00', '10:00', '11:00', '15:00']
  }
];

const PERFIL_PROFESIONAL_EJEMPLO: PerfilProfesional = {
  id: 'esp1',
  disponibilidad: DISPONIBILIDAD_EJEMPLO,
  precioPorSesion: 150000,
  creditosPorSesion: 20,
  duracionSesion: 60,
  modalidades: ['presencial', 'virtual'],
  ubicacion: 'Bogotá, Colombia',
  direccion: 'Calle 123 #45-67, Consultorio 303'
};

export const ReservasProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { sesion } = useAuth();
  const { descontarCreditos } = useCreditos();
  const [reservasUsuario, setReservasUsuario] = useState<Reserva[]>([]);
  const [reservasProfesional, setReservasProfesional] = useState<Reserva[]>([]);
  const [cargandoReservas, setCargandoReservas] = useState<boolean>(true);
  const [errorReservas, setErrorReservas] = useState<string | null>(null);
  const [perfilProfesional, setPerfilProfesional] = useState<PerfilProfesional | null>(null);
  const [cargandoPerfil, setCargandoPerfil] = useState<boolean>(true);
  const [disponibilidadEspecialista, setDisponibilidadEspecialista] = useState<DisponibilidadHoraria[]>([]);

  // Cargar las reservas del usuario o profesional al iniciar
  useEffect(() => {
    const cargarReservas = async () => {
      if (!sesion.isAutenticado || !sesion.usuario) {
        setCargandoReservas(false);
        return;
      }

      setCargandoReservas(true);
      setErrorReservas(null);

      try {
        // Simulación de carga de datos
        setTimeout(() => {
          if (sesion.usuario?.rol === 'usuario') {
            // Filtrar reservas donde el ID del usuario coincide
            const reservasDelUsuario = RESERVAS_EJEMPLO.filter(
              reserva => reserva.usuarioId === sesion.usuario?.id
            );
            setReservasUsuario(reservasDelUsuario);
          } else if (sesion.usuario?.rol === 'aliado') {
            // Filtrar reservas donde el ID del especialista coincide
            const reservasDelProfesional = RESERVAS_EJEMPLO.filter(
              reserva => reserva.especialistaId === sesion.usuario?.id
            );
            setReservasProfesional(reservasDelProfesional);

            // Cargar perfil profesional
            if (sesion.usuario?.id === PERFIL_PROFESIONAL_EJEMPLO.id) {
              setPerfilProfesional(PERFIL_PROFESIONAL_EJEMPLO);
            }
          }
          setCargandoReservas(false);
        }, 1000);
      } catch (error) {
        console.error('Error al cargar reservas:', error);
        setErrorReservas('No se pudieron cargar las reservas. Intente nuevamente.');
        setCargandoReservas(false);
      }
    };

    cargarReservas();
  }, [sesion.isAutenticado, sesion.usuario]);

  // Función para obtener disponibilidad de un especialista
  const obtenerDisponibilidad = async (especialistaId: string): Promise<DisponibilidadHoraria[]> => {
    // Simulación de carga de datos
    return new Promise((resolve) => {
      setTimeout(() => {
        setDisponibilidadEspecialista(DISPONIBILIDAD_EJEMPLO);
        resolve(DISPONIBILIDAD_EJEMPLO);
      }, 800);
    });
  };

  // Función para crear una nueva reserva
  const crearReserva = async (datosReserva: Omit<Reserva, 'id' | 'createdAt' | 'estado'>): Promise<Reserva> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          // En una implementación real, aquí se enviaría la solicitud al backend
          const nuevaReserva: Reserva = {
            ...datosReserva,
            id: `res-${Date.now()}`,
            estado: 'pendiente',
            createdAt: new Date().toISOString()
          };

          // Descontar créditos del usuario
          if (sesion.usuario?.rol === 'usuario') {
            const descuentoExitoso = await descontarCreditos(datosReserva.creditos, {
              concepto: `Reserva con ${datosReserva.especialistaNombre} ${datosReserva.especialistaApellido}`,
              detalles: `Cita para el ${datosReserva.fecha} a las ${datosReserva.hora}`
            });

            if (!descuentoExitoso) {
              reject(new Error('No tienes suficientes créditos para realizar esta reserva.'));
              return;
            }
          }

          // Actualizar estado local
          setReservasUsuario(prev => [...prev, nuevaReserva]);
          
          resolve(nuevaReserva);
        } catch (error) {
          console.error('Error al crear reserva:', error);
          reject(new Error('No se pudo crear la reserva. Intente nuevamente.'));
        }
      }, 1000);
    });
  };

  // Función para cancelar una reserva
  const cancelarReserva = async (reservaId: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Actualiza el estado localmente
          setReservasUsuario(prev => 
            prev.map(reserva => 
              reserva.id === reservaId 
                ? { ...reserva, estado: 'cancelada' } 
                : reserva
            )
          );
          
          setReservasProfesional(prev => 
            prev.map(reserva => 
              reserva.id === reservaId 
                ? { ...reserva, estado: 'cancelada' } 
                : reserva
            )
          );
          
          resolve(true);
        } catch (error) {
          console.error('Error al cancelar reserva:', error);
          reject(new Error('No se pudo cancelar la reserva. Intente nuevamente.'));
        }
      }, 800);
    });
  };

  // Función para confirmar una reserva (solo especialistas)
  const confirmarReserva = async (reservaId: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Actualiza el estado localmente
          setReservasProfesional(prev => 
            prev.map(reserva => 
              reserva.id === reservaId 
                ? { ...reserva, estado: 'confirmada' } 
                : reserva
            )
          );
          
          resolve(true);
        } catch (error) {
          console.error('Error al confirmar reserva:', error);
          reject(new Error('No se pudo confirmar la reserva. Intente nuevamente.'));
        }
      }, 800);
    });
  };

  // Función para marcar una reserva como completada
  const completarReserva = async (reservaId: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Actualiza el estado localmente
          setReservasProfesional(prev => 
            prev.map(reserva => 
              reserva.id === reservaId 
                ? { ...reserva, estado: 'completada' } 
                : reserva
            )
          );
          
          resolve(true);
        } catch (error) {
          console.error('Error al completar reserva:', error);
          reject(new Error('No se pudo marcar la reserva como completada. Intente nuevamente.'));
        }
      }, 800);
    });
  };

  // Función para actualizar el perfil profesional
  const actualizarPerfilProfesional = async (perfil: Partial<PerfilProfesional>): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          setPerfilProfesional(prevPerfil => {
            if (!prevPerfil) return perfil as PerfilProfesional;
            return { ...prevPerfil, ...perfil };
          });
          
          resolve(true);
        } catch (error) {
          console.error('Error al actualizar perfil profesional:', error);
          reject(new Error('No se pudo actualizar el perfil. Intente nuevamente.'));
        }
      }, 800);
    });
  };

  const contextValue: ReservasContextType = {
    reservasUsuario,
    reservasProfesional,
    cargandoReservas,
    perfilProfesional,
    cargandoPerfil,
    disponibilidadEspecialista,
    obtenerDisponibilidad,
    crearReserva,
    cancelarReserva,
    confirmarReserva,
    completarReserva,
    actualizarPerfilProfesional,
    errorReservas
  };

  return (
    <ReservasContext.Provider value={contextValue}>
      {children}
    </ReservasContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useReservas = () => {
  const context = useContext(ReservasContext);
  if (context === undefined) {
    throw new Error('useReservas debe ser usado dentro de un ReservasProvider');
  }
  return context;
};
