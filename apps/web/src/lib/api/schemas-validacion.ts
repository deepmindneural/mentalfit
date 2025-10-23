import { z } from 'zod'

/**
 * Schemas de validación Zod para todos los endpoints de la API
 * Todos los nombres en español siguiendo convenciones
 */

// ============================================================================
// VALIDACIONES COMUNES
// ============================================================================

export const schemaUUID = z.string().uuid({ message: 'UUID inválido' })

export const schemaEmail = z.string().email({ message: 'Email inválido' })

export const schemaPassword = z
  .string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
  .regex(/[a-z]/, 'Debe contener al menos una minúscula')
  .regex(/[0-9]/, 'Debe contener al menos un número')

export const schemaFecha = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)')

export const schemaHora = z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, 'Formato de hora inválido (HH:MM o HH:MM:SS)')

export const schemaTelefono = z.string().regex(/^\+?[\d\s-()]+$/, 'Teléfono inválido')

// ============================================================================
// USUARIOS
// ============================================================================

export const schemaCrearUsuario = z.object({
  email: schemaEmail,
  password: schemaPassword,
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  apellidos: z.string().min(2, 'Los apellidos deben tener al menos 2 caracteres'),
  tipoUsuario: z.enum(['empleado', 'empresa', 'profesional'], {
    errorMap: () => ({ message: 'Tipo de usuario inválido' })
  }),
  telefono: schemaTelefono.optional(),
  perfilEspecifico: z.record(z.any()).optional()
})

export const schemaActualizarUsuario = z.object({
  nombre: z.string().min(2).optional(),
  apellidos: z.string().min(2).optional(),
  telefono: schemaTelefono.optional(),
  avatar: z.string().url().optional(),
  idioma: z.enum(['es', 'en', 'ca']).optional(),
  zonaHoraria: z.string().optional()
})

export const schemaActualizarPreferencias = z.object({
  notificacionesEmail: z.boolean().optional(),
  notificacionesPush: z.boolean().optional(),
  notificacionesSMS: z.boolean().optional(),
  recordatoriosCitas: z.boolean().optional(),
  horasAntesCitaRecordatorio: z.number().min(1).max(72).optional(),
  configuracionPrivacidad: z.record(z.any()).optional()
})

export const schemaCambiarPassword = z.object({
  passwordActual: z.string().min(1, 'Password actual requerido'),
  passwordNuevo: schemaPassword,
  passwordConfirmacion: z.string()
}).refine((data) => data.passwordNuevo === data.passwordConfirmacion, {
  message: 'Las contraseñas no coinciden',
  path: ['passwordConfirmacion']
})

// ============================================================================
// EMPRESAS
// ============================================================================

export const schemaCrearEmpresa = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  nif: z.string().regex(/^[A-Z0-9]{9,}$/, 'NIF inválido'),
  sector: z.string().min(2),
  tamano: z.enum(['pequena', 'mediana', 'grande'], {
    errorMap: () => ({ message: 'Tamaño de empresa inválido' })
  }),
  direccion: z.string().min(5),
  ciudad: z.string().min(2),
  codigoPostal: z.string().regex(/^\d{5}$/, 'Código postal inválido'),
  pais: z.string().default('España'),
  telefonoContacto: schemaTelefono,
  emailContacto: schemaEmail,
  nombreContacto: z.string().min(2),
  sitioWeb: z.string().url().optional(),
  logoUrl: z.string().url().optional()
})

export const schemaActualizarEmpresa = schemaCrearEmpresa.partial()

export const schemaImportarEmpleados = z.object({
  empleados: z.array(
    z.object({
      nombre: z.string().min(2),
      apellidos: z.string().min(2),
      email: schemaEmail,
      departamento: z.string().optional(),
      puesto: z.string().optional(),
      fechaIngreso: schemaFecha.optional(),
      telefono: schemaTelefono.optional()
    })
  ).min(1, 'Debe incluir al menos un empleado')
})

// ============================================================================
// PROFESIONALES
// ============================================================================

export const schemaCrearProfesional = z.object({
  especialidades: z.array(z.string()).min(1, 'Debe tener al menos una especialidad'),
  numColegiado: z.string().min(4, 'Número de colegiado requerido'),
  titulacion: z.string().min(2),
  aniosExperiencia: z.number().min(0).max(70),
  biografia: z.string().min(50, 'La biografía debe tener al menos 50 caracteres'),
  metodologia: z.string().optional(),
  tarifaHora: z.number().min(0),
  duracionSesionMin: z.number().min(30).max(120).default(60),
  modalidadesAtencion: z.array(
    z.enum(['video_llamada', 'telefonica', 'chat', 'presencial'])
  ).min(1, 'Debe ofrecer al menos una modalidad'),
  idiomasAtencion: z.array(z.string()).min(1),
  certificaciones: z.array(z.string()).optional(),
  urlCv: z.string().url().optional(),
  urlTitulo: z.string().url().optional(),
  urlColegiado: z.string().url().optional()
})

export const schemaActualizarProfesional = schemaCrearProfesional.partial()

export const schemaCrearDisponibilidad = z.object({
  diaSemana: z.number().min(0).max(6),
  horaInicio: schemaHora,
  horaFin: schemaHora,
  fechaInicio: schemaFecha.optional(),
  fechaFin: schemaFecha.optional(),
  esRecurrente: z.boolean().default(true)
})

export const schemaBuscarProfesionales = z.object({
  especialidades: z.array(z.string()).optional(),
  modalidad: z.enum(['video_llamada', 'telefonica', 'chat', 'presencial']).optional(),
  tarifaMax: z.number().min(0).optional(),
  idioma: z.string().optional(),
  busqueda: z.string().optional(),
  disponibleHoy: z.boolean().optional(),
  calificacionMin: z.number().min(0).max(5).optional()
})

export const schemaVerificarProfesional = z.object({
  verificado: z.boolean(),
  notasVerificacion: z.string().optional()
})

// ============================================================================
// CITAS
// ============================================================================

export const schemaAgendarCita = z.object({
  empleadoId: schemaUUID,
  profesionalId: schemaUUID,
  fechaCita: schemaFecha,
  horaInicio: schemaHora,
  duracionMinutos: z.number().min(30).max(120),
  modalidad: z.enum(['video_llamada', 'telefonica', 'chat', 'presencial']),
  motivoConsulta: z.string().min(10, 'El motivo debe tener al menos 10 caracteres'),
  notasAdicionales: z.string().optional()
})

export const schemaActualizarCita = z.object({
  fechaCita: schemaFecha.optional(),
  horaInicio: schemaHora.optional(),
  duracionMinutos: z.number().min(30).max(120).optional(),
  modalidad: z.enum(['video_llamada', 'telefonica', 'chat', 'presencial']).optional(),
  motivoConsulta: z.string().min(10).optional(),
  notasAdicionales: z.string().optional()
})

export const schemaCancelarCita = z.object({
  motivoCancelacion: z.string().min(10, 'Debe especificar el motivo de cancelación'),
  canceladoPor: z.enum(['empleado', 'profesional', 'sistema'])
})

export const schemaReprogramarCita = z.object({
  nuevaFecha: schemaFecha,
  nuevaHora: schemaHora,
  motivoReprogramacion: z.string().min(10)
})

// ============================================================================
// SESIONES
// ============================================================================

export const schemaIniciarSesion = z.object({
  linkVideoLlamada: z.string().url().optional(),
  notasPreliminares: z.string().optional()
})

export const schemaCompletarSesion = z.object({
  diagnostico: z.string().min(20, 'El diagnóstico debe tener al menos 20 caracteres'),
  notasSesion: z.string().min(50, 'Las notas deben tener al menos 50 caracteres'),
  planTratamiento: z.string().optional(),
  proximaSesionRecomendada: schemaFecha.optional(),
  derivacion: z.string().optional(),
  recursosSugeridos: z.array(schemaUUID).optional()
})

export const schemaGuardarNotas = z.object({
  notasSesion: z.string().min(10),
  confidenciales: z.boolean().default(true)
})

export const schemaCalificarSesion = z.object({
  puntuacion: z.number().min(1).max(5),
  comentario: z.string().min(10).optional(),
  aspectosPositivos: z.array(z.string()).optional(),
  aspectosMejorar: z.array(z.string()).optional()
})

// ============================================================================
// EVALUACIONES
// ============================================================================

export const schemaIniciarEvaluacion = z.object({
  empleadoId: schemaUUID,
  evaluacionId: schemaUUID
})

export const schemaResponderEvaluacion = z.object({
  respuestas: z.array(
    z.object({
      preguntaId: schemaUUID,
      respuesta: z.union([z.string(), z.number(), z.array(z.string())]),
      tiempoRespuestaSegundos: z.number().optional()
    })
  ).min(1, 'Debe responder al menos una pregunta')
})

export const schemaCompletarEvaluacion = z.object({
  observaciones: z.string().optional()
})

// ============================================================================
// MENSAJES Y CHAT
// ============================================================================

export const schemaEnviarMensaje = z.object({
  conversacionId: schemaUUID,
  contenido: z.string().min(1, 'El mensaje no puede estar vacío').max(5000),
  archivoAdjunto: z.string().url().optional(),
  tipoArchivo: z.enum(['imagen', 'documento', 'audio', 'video']).optional()
})

export const schemaCrearConversacion = z.object({
  participantes: z.array(schemaUUID).min(2, 'Debe haber al menos 2 participantes'),
  asunto: z.string().min(3).optional(),
  tipo: z.enum(['individual', 'grupo']).default('individual')
})

// ============================================================================
// NOTIFICACIONES
// ============================================================================

export const schemaCrearNotificacion = z.object({
  usuarioId: schemaUUID,
  tipo: z.enum([
    'cita_recordatorio',
    'cita_confirmada',
    'cita_cancelada',
    'mensaje_nuevo',
    'evaluacion_pendiente',
    'pago_procesado',
    'sesion_proxima',
    'sistema'
  ]),
  titulo: z.string().min(3),
  mensaje: z.string().min(5),
  datosAdicionales: z.record(z.any()).optional(),
  linkAccion: z.string().url().optional()
})

// ============================================================================
// PAGOS
// ============================================================================

export const schemaProcesarPagoSesion = z.object({
  sesionId: schemaUUID,
  metodoPago: z.enum(['tarjeta', 'transferencia', 'paypal', 'stripe']),
  referenciaPago: z.string().optional(),
  datosFacturacion: z.object({
    nombre: z.string(),
    nif: z.string(),
    direccion: z.string(),
    ciudad: z.string(),
    codigoPostal: z.string()
  }).optional()
})

export const schemaCrearIntencionPago = z.object({
  monto: z.number().min(0.5),
  moneda: z.string().default('EUR'),
  descripcion: z.string(),
  metadatos: z.record(z.any()).optional()
})

export const schemaGenerarFactura = z.object({
  empresaId: schemaUUID,
  mes: z.number().min(1).max(12),
  anio: z.number().min(2024).max(2100),
  conceptos: z.array(
    z.object({
      descripcion: z.string(),
      cantidad: z.number().min(1),
      precioUnitario: z.number().min(0)
    })
  )
})

// ============================================================================
// RECURSOS
// ============================================================================

export const schemaFiltrosRecursos = z.object({
  tipo: z.enum(['articulo', 'video', 'audio', 'infografia', 'ejercicio']).optional(),
  categoria: z.string().optional(),
  busqueda: z.string().optional(),
  idioma: z.string().optional(),
  dificultad: z.enum(['basico', 'intermedio', 'avanzado']).optional()
})

export const schemaRegistrarVista = z.object({
  tiempoVisualizacion: z.number().min(0).optional(),
  completado: z.boolean().default(false)
})

// ============================================================================
// RESEÑAS
// ============================================================================

export const schemaCrearResena = z.object({
  profesionalId: schemaUUID,
  sesionId: schemaUUID.optional(),
  puntuacion: z.number().min(1).max(5),
  titulo: z.string().min(5).max(100),
  comentario: z.string().min(20).max(1000),
  aspectosPositivos: z.array(z.string()).optional(),
  aspectosMejorar: z.array(z.string()).optional(),
  recomendaria: z.boolean()
})

export const schemaReportarResena = z.object({
  motivo: z.enum([
    'spam',
    'lenguaje_ofensivo',
    'informacion_falsa',
    'contenido_inapropiado',
    'otro'
  ]),
  descripcion: z.string().min(10)
})

export const schemaResponderResena = z.object({
  respuesta: z.string().min(10).max(500)
})

// ============================================================================
// ADMIN
// ============================================================================

export const schemaSuspenderUsuario = z.object({
  motivo: z.string().min(10),
  duracionDias: z.number().min(1).optional(),
  permanente: z.boolean().default(false)
})

export const schemaFiltrosLogs = z.object({
  usuarioId: schemaUUID.optional(),
  tipoAccion: z.string().optional(),
  fechaInicio: schemaFecha.optional(),
  fechaFin: schemaFecha.optional()
})
