import { 
  InfoBancaria, 
  ServicioAgendado,
  SolicitudRetiro,
  HistorialServicioUsuario
} from '../tipos/aliados';

// Datos de ejemplo para servicios agendados
export const serviciosAgendados: ServicioAgendado[] = [
  {
    id: 'serv001',
    especialistaId: 'al002',
    usuarioId: 'usr001',
    fechaHora: '2025-05-08T15:00:00',
    duracionMinutos: 60,
    tipo: 'virtual',
    estado: 'agendado',
    valorCobrado: 150000,
    comisionGenerada: 15000,
    fechaCreacion: '2025-05-03T11:22:33',
    enlaceVideoconferencia: 'https://meet.mentalfit.com/sala/adf135',
    usuario: {
      id: 'usr001',
      nombre: 'Carlos',
      apellido: 'Rodríguez',
      email: 'carlos@ejemplo.com',
      telefono: '+573001234567'
    }
  },
  {
    id: 'serv002',
    especialistaId: 'al002',
    usuarioId: 'usr002',
    fechaHora: '2025-05-05T10:00:00',
    duracionMinutos: 45,
    tipo: 'presencial',
    estado: 'completado',
    valorCobrado: 120000,
    comisionGenerada: 12000,
    calificacion: 4.8,
    comentario: 'Excelente atención, muy profesional y amable',
    fechaCreacion: '2025-04-28T09:15:22',
    notas: 'Paciente con ansiedad moderada. Seguimiento en 2 semanas.',
    usuario: {
      id: 'usr002',
      nombre: 'María',
      apellido: 'López',
      email: 'maria@ejemplo.com'
    }
  },
  {
    id: 'serv003',
    especialistaId: 'al002',
    usuarioId: 'usr003',
    fechaHora: '2025-05-10T16:30:00',
    duracionMinutos: 60,
    tipo: 'virtual',
    estado: 'agendado',
    valorCobrado: 150000,
    comisionGenerada: 15000,
    fechaCreacion: '2025-05-02T14:23:45',
    enlaceVideoconferencia: 'https://meet.mentalfit.com/sala/fgh789',
    usuario: {
      id: 'usr003',
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@ejemplo.com',
      telefono: '+573109876543'
    }
  },
  {
    id: 'serv004',
    especialistaId: 'al002',
    usuarioId: 'usr002',
    fechaHora: '2025-04-20T11:00:00',
    duracionMinutos: 45,
    tipo: 'presencial',
    estado: 'completado',
    valorCobrado: 120000,
    comisionGenerada: 12000,
    calificacion: 5.0,
    comentario: 'Muy buena sesión, me ayudó bastante con mi problema',
    fechaCreacion: '2025-04-15T10:10:10',
    notas: 'Primera cita. Evaluación inicial. Diagnóstico: estrés laboral.',
    usuario: {
      id: 'usr002',
      nombre: 'María',
      apellido: 'López',
      email: 'maria@ejemplo.com'
    }
  },
  {
    id: 'serv005',
    especialistaId: 'al002',
    usuarioId: 'usr001',
    fechaHora: '2025-04-25T09:00:00',
    duracionMinutos: 60,
    tipo: 'virtual',
    estado: 'cancelado',
    valorCobrado: 0, // Cancelado, no se cobró
    comisionGenerada: 0,
    fechaCreacion: '2025-04-20T16:45:12',
    usuario: {
      id: 'usr001',
      nombre: 'Carlos',
      apellido: 'Rodríguez',
      email: 'carlos@ejemplo.com'
    }
  }
];

// Datos de ejemplo para cuentas bancarias
export const cuentasBancarias: InfoBancaria[] = [
  {
    id: 'cuenta001',
    aliadoId: 'al002',
    tipoCuenta: 'ahorros',
    numeroCuenta: '123456789',
    banco: 'Banco de Colombia',
    titular: 'Universidad Nacional',
    documentoTitular: '800123456-7',
    fechaRegistro: '2025-01-15T00:00:00',
    activa: true,
    predeterminada: true
  },
  {
    id: 'cuenta002',
    aliadoId: 'al002',
    tipoCuenta: 'corriente',
    numeroCuenta: '987654321',
    banco: 'Banco Internacional',
    titular: 'Universidad Nacional',
    documentoTitular: '800123456-7',
    fechaRegistro: '2025-03-10T00:00:00',
    activa: true,
    predeterminada: false
  }
];

// Datos de ejemplo para solicitudes de retiro
export const solicitudesRetiro: SolicitudRetiro[] = [
  {
    id: 'ret001',
    aliadoId: 'al002',
    monto: 250000,
    infoBancariaId: 'cuenta001',
    fechaSolicitud: '2025-04-30T14:22:10',
    estado: 'completada',
    fechaProcesamiento: '2025-05-02T11:15:30',
    comisionProcesamiento: 0
  },
  {
    id: 'ret002',
    aliadoId: 'al002',
    monto: 180000,
    infoBancariaId: 'cuenta001',
    fechaSolicitud: '2025-05-06T09:33:45',
    estado: 'pendiente'
  }
];

// Historial de usuarios que han tenido sesiones con el especialista
export const historialUsuarios: HistorialServicioUsuario[] = [
  {
    usuarioId: 'usr001',
    nombreCompleto: 'Carlos Rodríguez',
    email: 'carlos@ejemplo.com',
    cantidadSesiones: 2,
    ultimaSesion: '2025-05-08T15:00:00',
    valorTotalSesiones: 150000,
    comisionesGeneradas: 15000,
    calificacionPromedio: 0, // Aún no ha calificado
    servicios: serviciosAgendados.filter(s => s.usuarioId === 'usr001')
  },
  {
    usuarioId: 'usr002',
    nombreCompleto: 'María López',
    email: 'maria@ejemplo.com',
    cantidadSesiones: 2,
    ultimaSesion: '2025-05-05T10:00:00',
    valorTotalSesiones: 240000,
    comisionesGeneradas: 24000,
    calificacionPromedio: 4.9,
    servicios: serviciosAgendados.filter(s => s.usuarioId === 'usr002')
  },
  {
    usuarioId: 'usr003',
    nombreCompleto: 'Juan Pérez',
    email: 'juan@ejemplo.com',
    cantidadSesiones: 1,
    ultimaSesion: '2025-05-10T16:30:00',
    valorTotalSesiones: 150000,
    comisionesGeneradas: 15000,
    calificacionPromedio: 0, // Aún no ha calificado
    servicios: serviciosAgendados.filter(s => s.usuarioId === 'usr003')
  }
];

// Funciones para obtener datos de un aliado específico
export const obtenerServiciosAgendados = (aliadoId: string): ServicioAgendado[] => {
  // En caso de que el ID no coincida exactamente, devolvemos todos los datos de ejemplo para propósitos de demostración
  const serviciosFiltrados = serviciosAgendados.filter(servicio => servicio.especialistaId === aliadoId);
  
  if (serviciosFiltrados.length === 0) {
    console.log('Usando datos de demostración para servicios agendados');
    return serviciosAgendados;
  }
  
  return serviciosFiltrados;
};

export const obtenerCuentasBancarias = (aliadoId: string): InfoBancaria[] => {
  const cuentasFiltradas = cuentasBancarias.filter(cuenta => cuenta.aliadoId === aliadoId);
  
  if (cuentasFiltradas.length === 0) {
    console.log('Usando datos de demostración para cuentas bancarias');
    return cuentasBancarias;
  }
  
  return cuentasFiltradas;
};

export const obtenerSolicitudesRetiro = (aliadoId: string): SolicitudRetiro[] => {
  const solicitudesFiltradas = solicitudesRetiro.filter(solicitud => solicitud.aliadoId === aliadoId);
  
  if (solicitudesFiltradas.length === 0) {
    console.log('Usando datos de demostración para solicitudes de retiro');
    return solicitudesRetiro;
  }
  
  return solicitudesFiltradas;
};

export const obtenerHistorialUsuarios = (aliadoId: string): HistorialServicioUsuario[] => {
  // Siempre devolver todos los datos de ejemplo para propísitos de demostraciín
  return historialUsuarios;
};
