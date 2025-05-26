import { Transaccion } from '../tipos/monetizacion';

// Datos de ejemplo para transacciones
export const transacciones: Transaccion[] = [
  {
    id: 'tr001',
    fecha: '2024-05-01T10:15:30',
    monto: 59900,
    tipo: 'ingreso',
    concepto: 'Suscripción a plan Premium',
    usuario: {
      id: 'usr001',
      nombre: 'Carlos Rodríguez',
      email: 'carlos@ejemplo.com',
    },
    producto: {
      id: 'plan002',
      nombre: 'Premium',
      tipo: 'suscripcion',
    },
    estado: 'completada',
    metodoPago: 'tarjeta',
  },
  {
    id: 'tr002',
    fecha: '2024-05-02T14:22:45',
    monto: 150000,
    tipo: 'ingreso',
    concepto: 'Sesión con especialista',
    usuario: {
      id: 'usr002',
      nombre: 'María López',
      email: 'maria@ejemplo.com',
    },
    producto: {
      id: 'ses001',
      nombre: 'Sesión Psicología',
      tipo: 'sesion',
    },
    cuponAplicado: {
      id: 'cup002',
      codigo: 'UNAL30',
      descuento: 30,
      tipo: 'porcentaje',
      montoMinimo: 50000,
      usos: 78,
      usosMaximos: 150,
      fechaInicio: '2024-02-20',
      fechaFin: '2024-12-31',
      aliadoId: 'al002',
      activo: true,
      aplicableA: 'sesiones',
    },
    aliadoId: 'al002',
    comisionGenerada: 15000,
    estado: 'completada',
    metodoPago: 'transferencia',
  },
  {
    id: 'tr003',
    fecha: '2024-05-03T09:10:15',
    monto: 29900,
    tipo: 'ingreso',
    concepto: 'Suscripción a plan Básico',
    usuario: {
      id: 'usr003',
      nombre: 'Juan Pérez',
      email: 'juan@ejemplo.com',
    },
    producto: {
      id: 'plan001',
      nombre: 'Básico',
      tipo: 'suscripcion',
    },
    estado: 'completada',
    metodoPago: 'paypal',
  },
  {
    id: 'tr004',
    fecha: '2024-05-03T16:45:22',
    monto: 15000,
    tipo: 'comision',
    concepto: 'Pago comisión a Universidad Nacional',
    usuario: {
      id: 'al002',
      nombre: 'Universidad Nacional',
      email: 'convenios@unal.edu.co',
    },
    producto: {
      id: 'tr002',
      nombre: 'Comisión por sesión',
      tipo: 'sesion',
    },
    aliadoId: 'al002',
    estado: 'completada',
    metodoPago: 'transferencia',
  },
  {
    id: 'tr005',
    fecha: '2024-05-04T11:30:00',
    monto: 59900,
    tipo: 'reembolso',
    concepto: 'Reembolso de suscripción Premium',
    usuario: {
      id: 'usr004',
      nombre: 'Ana Martínez',
      email: 'ana@ejemplo.com',
    },
    producto: {
      id: 'plan002',
      nombre: 'Premium',
      tipo: 'suscripcion',
    },
    estado: 'completada',
    metodoPago: 'tarjeta',
  },
  {
    id: 'tr006',
    fecha: '2024-05-05T08:15:40',
    monto: 299900,
    tipo: 'ingreso',
    concepto: 'Suscripción a plan Corporativo',
    usuario: {
      id: 'usr005',
      nombre: 'Empresa ABC',
      email: 'rrhh@empresaabc.com',
    },
    producto: {
      id: 'plan003',
      nombre: 'Corporativo',
      tipo: 'suscripcion',
    },
    cuponAplicado: {
      id: 'cup004',
      codigo: 'PROMO10K',
      descuento: 10000,
      tipo: 'fijo',
      montoMinimo: 100000,
      usos: 15,
      usosMaximos: 50,
      fechaInicio: '2024-04-01',
      fechaFin: '2024-05-15',
      activo: true,
      aplicableA: 'todos',
    },
    estado: 'pendiente',
    metodoPago: 'transferencia',
  },
  // Nuevas transacciones
  {
    id: 'tr007',
    fecha: '2024-05-06T09:30:00',
    monto: 120000,
    tipo: 'ingreso',
    concepto: 'Sesión de terapia familiar',
    usuario: {
      id: 'usr001',
      nombre: 'Carlos Rodríguez',
      email: 'carlos@ejemplo.com',
    },
    producto: {
      id: 'ses002',
      nombre: 'Terapia Familiar',
      tipo: 'sesion',
    },
    estado: 'completada',
    metodoPago: 'tarjeta',
  },
  {
    id: 'tr008',
    fecha: '2024-05-07T14:15:20',
    monto: 99900,
    tipo: 'ingreso',
    concepto: 'Suscripción a plan Familiar',
    usuario: {
      id: 'usr006',
      nombre: 'Laura Gómez',
      email: 'laura@ejemplo.com',
    },
    producto: {
      id: 'plan004',
      nombre: 'Familiar',
      tipo: 'suscripcion',
    },
    estado: 'completada',
    metodoPago: 'nequi',
  },
  {
    id: 'tr009',
    fecha: '2024-05-08T11:45:30',
    monto: 19900,
    tipo: 'ingreso',
    concepto: 'Suscripción a plan Estudiante',
    usuario: {
      id: 'usr007',
      nombre: 'Diego Sánchez',
      email: 'diego@universidad.edu.co',
    },
    producto: {
      id: 'plan005',
      nombre: 'Estudiante',
      tipo: 'suscripcion',
    },
    estado: 'completada',
    metodoPago: 'daviplata',
  },
  {
    id: 'tr010',
    fecha: '2024-05-09T10:20:15',
    monto: 45000,
    tipo: 'ingreso',
    concepto: 'Paquete de 3 cuestionarios premium',
    usuario: {
      id: 'usr001',
      nombre: 'Carlos Rodríguez',
      email: 'carlos@ejemplo.com',
    },
    producto: {
      id: 'cues001',
      nombre: 'Paquete Cuestionarios Premium',
      tipo: 'cuestionario',
    },
    estado: 'completada',
    metodoPago: 'tarjeta',
  },
  {
    id: 'tr011',
    fecha: '2024-05-10T16:30:00',
    monto: 85000,
    tipo: 'ingreso',
    concepto: 'Evaluación psicológica completa',
    usuario: {
      id: 'usr001',
      nombre: 'Carlos Rodríguez',
      email: 'carlos@ejemplo.com',
    },
    producto: {
      id: 'eval001',
      nombre: 'Evaluación Completa',
      tipo: 'cuestionario',
    },
    estado: 'completada',
    metodoPago: 'pse',
  },
  {
    id: 'tr012',
    fecha: '2024-05-11T08:45:30',
    monto: 150000,
    tipo: 'ingreso',
    concepto: 'Sesión de terapia individual',
    usuario: {
      id: 'usr001',
      nombre: 'Carlos Rodríguez',
      email: 'carlos@ejemplo.com',
    },
    producto: {
      id: 'ses003',
      nombre: 'Terapia Individual',
      tipo: 'sesion',
    },
    estado: 'pendiente',
    metodoPago: 'efectivo',
  },
  {
    id: 'tr013',
    fecha: '2024-05-12T13:00:00',
    monto: 59900,
    tipo: 'ingreso',
    concepto: 'Renovación plan Premium',
    usuario: {
      id: 'usr001',
      nombre: 'Carlos Rodríguez',
      email: 'carlos@ejemplo.com',
    },
    producto: {
      id: 'plan002',
      nombre: 'Premium',
      tipo: 'suscripcion',
    },
    estado: 'completada',
    metodoPago: 'tarjeta',
  },
  {
    id: 'tr014',
    fecha: '2024-05-13T10:15:45',
    monto: 25000,
    tipo: 'ingreso',
    concepto: 'Taller manejo de ansiedad',
    usuario: {
      id: 'usr001',
      nombre: 'Carlos Rodríguez',
      email: 'carlos@ejemplo.com',
    },
    producto: {
      id: 'tal001',
      nombre: 'Taller Ansiedad',
      tipo: 'sesion',
    },
    estado: 'completada',
    metodoPago: 'tarjeta',
  },
  {
    id: 'tr015',
    fecha: '2024-05-14T09:00:00',
    monto: 30000,
    tipo: 'ingreso',
    concepto: 'E-book técnicas de autoayuda',
    usuario: {
      id: 'usr001',
      nombre: 'Carlos Rodríguez',
      email: 'carlos@ejemplo.com',
    },
    producto: {
      id: 'ebook001',
      nombre: 'E-book Autoayuda',
      tipo: 'cuestionario',
    },
    estado: 'completada',
    metodoPago: 'paypal',
  },
  {
    id: 'tr016',
    fecha: '2024-05-15T14:30:00',
    monto: 120000,
    tipo: 'reembolso',
    concepto: 'Reembolso por cancelación de sesión',
    usuario: {
      id: 'usr001',
      nombre: 'Carlos Rodríguez',
      email: 'carlos@ejemplo.com',
    },
    producto: {
      id: 'ses002',
      nombre: 'Terapia Familiar',
      tipo: 'sesion',
    },
    estado: 'completada',
    metodoPago: 'tarjeta',
  }
];

// Funciones para manejar transacciones
export const obtenerTransacciones = () => {
  return transacciones;
};

export const obtenerTransaccionPorId = (id: string) => {
  return transacciones.find(transaccion => transaccion.id === id);
};

export const obtenerTransaccionesPorUsuario = (usuarioId: string) => {
  return transacciones.filter(transaccion => transaccion.usuario.id === usuarioId);
};

export const obtenerTransaccionesPorAliado = (aliadoId: string) => {
  return transacciones.filter(transaccion => transaccion.aliadoId === aliadoId);
};

export const obtenerIngresosTotales = () => {
  return transacciones
    .filter(t => t.tipo === 'ingreso' && t.estado === 'completada')
    .reduce((sum, t) => sum + t.monto, 0);
};

export const obtenerComisionesPagadas = () => {
  return transacciones
    .filter(t => t.tipo === 'comision' && t.estado === 'completada')
    .reduce((sum, t) => sum + t.monto, 0);
};

export const obtenerReembolsosTotales = () => {
  return transacciones
    .filter(t => t.tipo === 'reembolso' && t.estado === 'completada')
    .reduce((sum, t) => sum + t.monto, 0);
};

// Obtener datos para gráficos (por día)
export const obtenerDatosGraficoIngresos = (ultimosDias: number = 30) => {
  const fechaInicio = new Date();
  fechaInicio.setDate(fechaInicio.getDate() - ultimosDias);
  
  // Usar Record<string, number> para tipar correctamente el objeto
  const datosPorDia: Record<string, number> = {};
  
  // Inicializar todas las fechas en el rango
  for (let i = 0; i < ultimosDias; i++) {
    const fecha = new Date(fechaInicio);
    fecha.setDate(fecha.getDate() + i);
    const fechaKey = fecha.toISOString().split('T')[0];
    datosPorDia[fechaKey] = 0;
  }
  
  // Sumar ingresos por día
  transacciones
    .filter(t => t.tipo === 'ingreso' && t.estado === 'completada' && new Date(t.fecha) >= fechaInicio)
    .forEach(t => {
      const fechaKey = t.fecha.split('T')[0];
      if (datosPorDia[fechaKey] !== undefined) {
        datosPorDia[fechaKey] += t.monto;
      }
    });
  
  // Convertir a array para facilitar su uso en gráficos
  return Object.entries(datosPorDia).map(([fecha, monto]) => ({
    fecha,
    monto,
  }));
};
