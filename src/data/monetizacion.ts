import { Aliado, Cupon, Plan, Transaccion, EstadisticasMonetizacion, MetodoPago, Beneficio } from '../tipos/monetizacion';

// Datos de aliados
export const aliados: Aliado[] = [
  {
    id: 'al001',
    nombre: 'Bienestar Corporativo SAS',
    logo: 'https://via.placeholder.com/150',
    sitioWeb: 'https://bienestarcorporativo.co',
    descripcion: 'Empresa especializada en programas de bienestar para empleados de grandes compaññías.',
    comisionPorcentaje: 15,
    activo: true,
    fechaCreacion: '2024-01-15',
    codigoAfiliado: 'BIENCO2024',
    ventas: 24,
    comisionesGeneradas: 1250000,
  },
  {
    id: 'al002',
    nombre: 'Universidad Nacional',
    logo: 'https://via.placeholder.com/150',
    sitioWeb: 'https://unal.edu.co',
    descripcion: 'Convenio con la facultad de psicología para ofrecer servicios a estudiantes.',
    comisionPorcentaje: 10,
    activo: true,
    fechaCreacion: '2024-02-20',
    codigoAfiliado: 'UNAL2024',
    ventas: 56,
    comisionesGeneradas: 2100000,
  },
  {
    id: 'al003',
    nombre: 'Clínica del Bienestar',
    logo: 'https://via.placeholder.com/150',
    sitioWeb: 'https://clinicabienestar.co',
    descripcion: 'Red de clínicas especializadas en salud mental con presencia en 5 ciudades.',
    comisionPorcentaje: 20,
    activo: true,
    fechaCreacion: '2023-11-05',
    codigoAfiliado: 'CLINICA2023',
    ventas: 118,
    comisionesGeneradas: 5650000,
  },
  {
    id: 'al004',
    nombre: 'Seguros Protección',
    logo: 'https://via.placeholder.com/150',
    sitioWeb: 'https://segurosproteccion.com',
    descripcion: 'Aseguradora que incluye nuestros servicios en sus pólizas de salud premium.',
    comisionPorcentaje: 12,
    activo: false,
    fechaCreacion: '2023-09-10',
    codigoAfiliado: 'SEGPRO2023',
    ventas: 87,
    comisionesGeneradas: 3200000,
  },
];

// Datos de cupones
export const cupones: Cupon[] = [
  {
    id: 'cup001',
    codigo: 'BIENVENIDO25',
    descuento: 25,
    tipo: 'porcentaje',
    usos: 145,
    usosMaximos: 200,
    fechaInicio: '2024-01-01',
    fechaFin: '2024-12-31',
    activo: true,
    aplicableA: 'todos',
  },
  {
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
  {
    id: 'cup003',
    codigo: 'CLINICA20',
    descuento: 20,
    tipo: 'porcentaje',
    usos: 42,
    usosMaximos: 100,
    fechaInicio: '2023-11-05',
    fechaFin: '2024-06-30',
    aliadoId: 'al003',
    activo: true,
    aplicableA: 'cuestionarios',
  },
  {
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
];

// Datos de planes de suscripción
export const planes: Plan[] = [
  {
    id: 'plan001',
    nombre: 'Básico',
    descripcion: 'Acceso a cuestionarios básicos y recomendaciones generales',
    precio: 29900,
    precioAnual: 299000,
    ahorro: 59800,
    periodoFacturacion: 'mensual',
    caracteristicas: [
      'Acceso a cuestionarios PHQ-9 y GAD-7',
      'Recomendaciones automáticas',
      'Historial de resultados',
      'Chat de IA limitado (5 consultas/mes)'
    ],
    popular: false,
    descuento: 0,
    color: 'bg-primario-600',
    disponible: true,
    incluyeEvaluacion: false,
    garantia: 15, // días de garantía
    nivelSoporte: 'estándar'
  },
  {
    id: 'plan002',
    nombre: 'Premium',
    descripcion: 'Acceso completo a todos nuestros cuestionarios y soporte personalizado',
    precio: 59900,
    precioAnual: 599000,
    ahorro: 119800,
    periodoFacturacion: 'mensual',
    caracteristicas: [
      'Acceso a todos los cuestionarios',
      'Recomendaciones personalizadas',
      'Chat de IA ilimitado',
      'Una sesión gratis al mes con especialista',
      'Descuentos en sesiones adicionales',
      'Dashboard completo de seguimiento'
    ],
    popular: true,
    descuento: 0,
    color: 'bg-acento-600',
    disponible: true,
    incluyeEvaluacion: true,
    garantia: 30, // días de garantía
    nivelSoporte: 'prioritario'
  },
  {
    id: 'plan003',
    nombre: 'Corporativo',
    descripcion: 'Solución para empresas que desean ofrecer bienestar mental a sus empleados',
    precio: 299900,
    precioAnual: 2999000,
    ahorro: 599800,
    periodoFacturacion: 'mensual',
    caracteristicas: [
      'Hasta 20 usuarios',
      'Dashboard de administración',
      'Reportes mensuales de bienestar',
      'Sesiones grupales incluidas',
      'Acceso a todos los cuestionarios',
      'Soporte prioritario'
    ],
    popular: false,
    descuento: 10,
    color: 'bg-secundario-600',
    disponible: true,
    incluyeEvaluacion: true,
    garantia: 45, // días de garantía
    nivelSoporte: 'premium'
  },
  {
    id: 'plan004',
    nombre: 'Familiar',
    descripcion: 'Plan ideal para compartir con toda la familia (hasta 5 miembros)',
    precio: 99900,
    precioAnual: 999000,
    ahorro: 199800,
    periodoFacturacion: 'mensual',
    caracteristicas: [
      'Hasta 5 perfiles de usuario',
      'Acceso a todos los cuestionarios',
      'Dashboard familiar compartido',
      'Recomendaciones personalizadas',
      'Dos sesiones gratis al mes para compartir',
      'Descuentos especiales en terapia familiar'
    ],
    popular: false,
    descuento: 5,
    color: 'bg-acento-400',
    disponible: true,
    incluyeEvaluacion: true,
    garantia: 30, // días de garantía
    nivelSoporte: 'prioritario'
  },
  {
    id: 'plan005',
    nombre: 'Estudiante',
    descripcion: 'Plan especial para estudiantes universitarios con verificación académica',
    precio: 19900,
    precioAnual: 199000,
    ahorro: 39800,
    periodoFacturacion: 'mensual',
    caracteristicas: [
      'Acceso a todos los cuestionarios',
      'Recomendaciones personalizadas',
      'Chat de IA (15 consultas/mes)',
      'Descuento en primera sesión con especialista',
      'Recursos académicos sobre salud mental'
    ],
    popular: false,
    descuento: 0,
    color: 'bg-secundario-400',
    disponible: true,
    incluyeEvaluacion: false,
    garantia: 15, // días de garantía
    nivelSoporte: 'estándar',
    requiereVerificacion: true
  },
  {
    id: 'plan006',
    nombre: 'Empresarial Elite',
    descripcion: 'Solución integral para empresas con más de 100 empleados',
    precio: 1499900,
    precioAnual: 14999000,
    ahorro: 2999800,
    periodoFacturacion: 'mensual',
    caracteristicas: [
      'Hasta 100 usuarios',
      'Dashboard de administración avanzado',
      'Reportes detallados de bienestar organizacional',
      'Sesiones grupales semanales incluidas',
      'Talleres mensuales de bienestar',
      'Asignación de gestor de cuenta exclusivo',
      'API de integración con sistemas internos'
    ],
    popular: false,
    descuento: 15,
    color: 'bg-secundario-700',
    disponible: true,
    incluyeEvaluacion: true,
    garantia: 60, // días de garantía
    nivelSoporte: 'dedicado'
  }
];

// Datos de estadísticas de monetización
export const estadisticasMonetizacion: EstadisticasMonetizacion = {
  ingresosTotales: 48750000,
  ingresosUltimoMes: 12350000,
  comisionesPagadas: 12200000,
  cuponesCanje: 280,
  transaccionesCompletadas: 1250,
  planMasVendido: 'Premium',
  tasaConversion: 3.8,
  crecimientoMensual: 12.5,
};

// Métodos de pago disponibles
export const metodosDePago: MetodoPago[] = [
  {
    id: 'mp001',
    nombre: 'Tarjeta de Crédito/Débito',
    icono: 'credit-card',
    proveedores: ['Visa', 'Mastercard', 'American Express'],
    recargo: 0,
    disponible: true,
    instantaneo: true
  },
  {
    id: 'mp002',
    nombre: 'PSE',
    icono: 'university',
    proveedores: ['Bancolombia', 'Davivienda', 'Banco de Bogotá', 'BBVA'],
    recargo: 0,
    disponible: true,
    instantaneo: false,
    tiempoAprobacion: '1-2 horas hábiles'
  },
  {
    id: 'mp003',
    nombre: 'Efectivo',
    icono: 'money-bill',
    proveedores: ['Efecty', 'Baloto', 'Corresponsales bancarios'],
    recargo: 3000,
    disponible: true,
    instantaneo: false,
    tiempoAprobacion: '24-48 horas hábiles'
  },
  {
    id: 'mp004',
    nombre: 'Transferencia Bancaria',
    icono: 'exchange-alt',
    proveedores: ['Todos los bancos'],
    recargo: 0,
    disponible: true,
    instantaneo: false,
    tiempoAprobacion: '24 horas hábiles'
  },
  {
    id: 'mp005',
    nombre: 'PayPal',
    icono: 'paypal',
    proveedores: ['PayPal'],
    recargo: 0,
    disponible: true,
    instantaneo: true
  },
  {
    id: 'mp006',
    nombre: 'Nequi/Daviplata',
    icono: 'mobile-alt',
    proveedores: ['Nequi', 'Daviplata'],
    recargo: 0,
    disponible: true,
    instantaneo: true
  },
  {
    id: 'mp007',
    nombre: 'Criptomonedas',
    icono: 'coins',
    proveedores: ['Bitcoin', 'Ethereum', 'USDT'],
    recargo: 0,
    disponible: false, // Próximamente
    instantaneo: true,
    etiqueta: 'Próximamente'
  }
];

// Beneficios disponibles para aplicar a planes
export const beneficiosDisponibles: Beneficio[] = [
  {
    id: 'ben001',
    nombre: 'Sesión de evaluación gratuita',
    descripcion: 'Una sesión inicial gratuita con un especialista para evaluar necesidades',
    valor: 150000,
    aplicableA: ['plan002', 'plan003', 'plan004', 'plan006'],
    disponible: true,
    duracion: 45, // minutos
    condiciones: 'Válido solo para nuevos usuarios. Debe agendarse dentro de los primeros 15 días.'
  },
  {
    id: 'ben002',
    nombre: 'Toolkit de meditación',
    descripcion: 'Acceso a nuestra biblioteca premium de audios de meditación guiada',
    aplicableA: ['plan001', 'plan002', 'plan003', 'plan004', 'plan005', 'plan006'],
    disponible: true,
    condiciones: 'Disponible inmediatamente después de la suscripción.'
  },
  {
    id: 'ben003',
    nombre: 'E-book de técnicas de autoayuda',
    descripcion: 'Libro digital con técnicas probadas de manejo del estrés y ansiedad',
    valor: 45000,
    aplicableA: ['plan001', 'plan002', 'plan003', 'plan004', 'plan005', 'plan006'],
    disponible: true,
    formato: 'PDF, EPUB, MOBI',
    condiciones: 'Se envía por correo electrónico 24 horas después de la suscripción.'
  },
  {
    id: 'ben004',
    nombre: 'Descuento en terapia de pareja',
    descripcion: '15% de descuento en sesiones de terapia de pareja',
    porcentaje: 15,
    aplicableA: ['plan002', 'plan003', 'plan004', 'plan006'],
    disponible: true,
    duracion: 60, // minutos
    condiciones: 'Máximo 3 sesiones por mes. Sujeto a disponibilidad del especialista.'
  },
  {
    id: 'ben005',
    nombre: 'Webinars exclusivos',
    descripcion: 'Acceso a webinars mensuales con especialistas de renombre',
    aplicableA: ['plan002', 'plan003', 'plan004', 'plan006'],
    disponible: true,
    frecuencia: 'Mensual',
    condiciones: 'Se envía invitación por correo electrónico 5 días antes del evento.'
  },
  {
    id: 'ben006',
    nombre: 'Asistencia telefónica 24/7',
    descripcion: 'Línea de ayuda disponible las 24 horas para situaciones de crisis',
    aplicableA: ['plan003', 'plan004', 'plan006'],
    disponible: true,
    condiciones: 'Solo para situaciones de emergencia. No reemplaza atención médica de emergencia.'
  },
  {
    id: 'ben007',
    nombre: 'Reporte personalizado detallado',
    descripcion: 'Análisis profundo y personalizado de tu salud mental con recomendaciones específicas',
    valor: 250000,
    aplicableA: ['plan002', 'plan003', 'plan004', 'plan006'],
    disponible: true,
    frecuencia: 'Trimestral',
    condiciones: 'Requiere completar todos los cuestionarios disponibles. Se genera después de 30 días de uso activo.'
  }
];

// Función para obtener todos los aliados
export const obtenerAliados = () => {
  return aliados;
};

// Función para obtener un aliado por ID
export const obtenerAliadoPorId = (id: string) => {
  return aliados.find(aliado => aliado.id === id);
};

// Función para obtener cupones activos
export const obtenerCuponesActivos = () => {
  const hoy = new Date().toISOString().split('T')[0];
  return cupones.filter(cupon => 
    cupon.activo && 
    cupon.fechaInicio <= hoy && 
    cupon.fechaFin >= hoy &&
    cupon.usos < cupon.usosMaximos
  );
};

// Función para validar un cupón
export const validarCupon = (codigo: string, monto: number, tipo?: 'cuestionarios' | 'sesiones' | 'todos') => {
  const hoy = new Date().toISOString().split('T')[0];
  const cupon = cupones.find(c => 
    c.codigo === codigo && 
    c.activo && 
    c.fechaInicio <= hoy && 
    c.fechaFin >= hoy &&
    c.usos < c.usosMaximos &&
    (!c.montoMinimo || monto >= c.montoMinimo) &&
    (!tipo || c.aplicableA === 'todos' || c.aplicableA === tipo)
  );
  
  return cupon;
};

// Función para obtener todos los planes
export const obtenerPlanes = () => {
  return planes;
};

// Función para obtener todos los planes
export const obtenerEstadisticas = () => {
  return estadisticasMonetizacion;
};
