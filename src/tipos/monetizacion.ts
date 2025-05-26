// Tipos para la implementaciu00f3n de aliados y monetizaciu00f3n

// Tipo para aliados/afiliados
export interface Aliado {
  id: string;
  nombre: string;
  logo: string;
  sitioWeb: string;
  descripcion: string;
  comisionPorcentaje: number;
  activo: boolean;
  fechaCreacion: string;
  codigoAfiliado: string;
  ventas: number;
  comisionesGeneradas: number;
}

// Tipo para cupones de descuento
export interface Cupon {
  id: string;
  codigo: string;
  descuento: number;       // Porcentaje de descuento
  tipo: 'porcentaje' | 'fijo';
  montoMinimo?: number;    // Monto mu00ednimo para aplicar el cupu00f3n
  usos: number;           // Veces que se ha usado
  usosMaximos: number;    // Lu00edmite de usos
  fechaInicio: string;
  fechaFin: string;
  aliadoId?: string;      // Si el cupu00f3n estu00e1 asociado a un aliado
  activo: boolean;
  aplicableA: 'cuestionarios' | 'sesiones' | 'todos';
}

// Tipo para transacciones
export interface Transaccion {
  id: string;
  fecha: string;
  monto: number;
  tipo: 'ingreso' | 'comision' | 'reembolso';
  concepto: string;
  usuario: {
    id: string;
    nombre: string;
    email: string;
  };
  producto: {
    id: string;
    nombre: string;
    tipo: 'cuestionario' | 'sesion' | 'suscripcion';
  };
  cuponAplicado?: Cupon;
  aliadoId?: string;
  comisionGenerada?: number;
  estado: 'completada' | 'pendiente' | 'cancelada' | 'reembolsada';
  metodoPago: string; // ID del método de pago o nombre directo
}

// Tipo para planes de suscripción
export interface Plan {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  precioAnual?: number;
  ahorro?: number;
  periodoFacturacion: 'mensual' | 'trimestral' | 'anual';
  caracteristicas: string[];
  popular: boolean;
  descuento: number; // Porcentaje de descuento si lo hubiera
  color: string; // Color para destacar el plan en el UI
  disponible?: boolean;
  incluyeEvaluacion?: boolean;
  garantia?: number; // Días de garantía
  nivelSoporte?: 'estándar' | 'prioritario' | 'premium' | 'dedicado';
  requiereVerificacion?: boolean;
  beneficios?: Beneficio[];
}

// Tipo para métodos de pago
export interface MetodoPago {
  id: string;
  nombre: string;
  icono: string;
  proveedores: string[];
  recargo: number;
  disponible: boolean;
  instantaneo: boolean;
  tiempoAprobacion?: string;
  etiqueta?: string;
}

// Tipo para beneficios de planes
export interface Beneficio {
  id: string;
  nombre: string;
  descripcion: string;
  valor?: number;
  porcentaje?: number;
  aplicableA: string[];
  disponible: boolean;
  duracion?: number; // minutos
  frecuencia?: string;
  formato?: string;
  condiciones: string;
}

// Tipo para estadísticas de monetización
export interface EstadisticasMonetizacion {
  ingresosTotales: number;
  ingresosUltimoMes: number;
  comisionesPagadas: number;
  cuponesCanje: number;
  transaccionesCompletadas: number;
  planMasVendido: string;
  tasaConversion: number; // Porcentaje
  crecimientoMensual: number; // Porcentaje
}
