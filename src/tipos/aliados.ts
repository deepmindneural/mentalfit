// Tipos para la implementación de aliados y especialistas

// Tipo para información bancaria de aliados
export interface InfoBancaria {
  id: string;
  aliadoId: string;
  tipoCuenta: 'ahorros' | 'corriente';
  numeroCuenta: string;
  banco: string;
  titular: string;
  documentoTitular: string;
  fechaRegistro: string;
  activa: boolean;
  predeterminada: boolean;
}

// Tipo para servicios agendados
export interface ServicioAgendado {
  id: string;
  especialistaId: string;
  usuarioId: string;
  fechaHora: string;
  duracionMinutos: number;
  tipo: 'presencial' | 'virtual';
  estado: 'agendado' | 'completado' | 'cancelado' | 'reprogramado';
  valorCobrado: number;
  comisionGenerada: number;
  calificacion?: number;
  comentario?: string;
  fechaCreacion: string;
  enlaceVideoconferencia?: string;
  notas?: string;
  usuario: {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono?: string;
  };
}

// Tipo para solicitudes de retiro
export interface SolicitudRetiro {
  id: string;
  aliadoId: string;
  monto: number;
  infoBancariaId: string;
  fechaSolicitud: string;
  estado: 'pendiente' | 'procesando' | 'completada' | 'rechazada';
  fechaProcesamiento?: string;
  notasAdmin?: string;
  comisionProcesamiento?: number;
}

// Tipo para historial de servicios con un usuario
export interface HistorialServicioUsuario {
  usuarioId: string;
  nombreCompleto: string;
  email: string;
  cantidadSesiones: number;
  ultimaSesion: string;
  valorTotalSesiones: number;
  comisionesGeneradas: number;
  calificacionPromedio: number;
  servicios: ServicioAgendado[];
}
