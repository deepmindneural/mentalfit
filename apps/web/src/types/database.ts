/**
 * TIPOS DE BASE DE DATOS - MENTALFIT
 *
 * IMPORTANTE: Estos tipos están generados manualmente desde el schema SQL en español.
 * NOMENCLATURA: 100% en español (código backend)
 *
 * Una vez que el schema esté desplegado en Supabase, regenerar con:
 * ```bash
 * supabase gen types typescript --project-id [tu-project-id] > src/types/database.ts
 * ```
 *
 * Generado desde: /apps/web/scripts/schema-completo-es.sql
 * Fecha: 2025-01-21
 */

// ============================================
// TIPOS ENUMERADOS
// ============================================

export type RolUsuario =
  | 'super_admin'
  | 'admin_empresa'
  | 'profesional'
  | 'empleado'

export type EstadoSesion =
  | 'programada'
  | 'confirmada'
  | 'en_progreso'
  | 'completada'
  | 'cancelada'
  | 'no_asistio'

export type TipoSesion =
  | 'individual'
  | 'grupal'
  | 'crisis'
  | 'bienestar'
  | 'coaching'

export type TipoEvaluacion =
  | 'phq9'
  | 'gad7'
  | 'estres'
  | 'burnout'
  | 'satisfaccion_laboral'

export type NivelSeveridad =
  | 'minimo'
  | 'leve'
  | 'moderado'
  | 'severo'
  | 'critico'

export type EstadoConversacion =
  | 'activa'
  | 'archivada'
  | 'cerrada'

export type TipoNotificacion =
  | 'sesion'
  | 'mensaje'
  | 'evaluacion'
  | 'sistema'
  | 'recordatorio'
  | 'alerta'

export type EstadoPago =
  | 'pendiente'
  | 'procesando'
  | 'completado'
  | 'fallido'
  | 'reembolsado'
  | 'cancelado'

export type TipoPago =
  | 'suscripcion'
  | 'sesion'
  | 'unico'
  | 'setup'

export type TipoRecurso =
  | 'articulo'
  | 'video'
  | 'audio'
  | 'guia'
  | 'ejercicio'
  | 'podcast'

export type TipoArchivo =
  | 'imagen'
  | 'documento'
  | 'audio'
  | 'video'
  | 'otro'

export type EstadoSuscripcion =
  | 'activa'
  | 'cancelada'
  | 'pausada'
  | 'vencida'
  | 'trial'

export type AccionAuditoria =
  | 'crear'
  | 'actualizar'
  | 'eliminar'
  | 'login'
  | 'logout'
  | 'acceso_denegado'

// ============================================
// TABLAS PRINCIPALES
// ============================================

export interface Empresa {
  id: string
  nombre: string
  descripcion: string | null
  logo_url: string | null
  sitio_web: string | null
  industria: string | null
  tamano: string | null
  pais: string
  ciudad: string | null
  direccion: string | null
  telefono: string | null
  email_contacto: string | null
  plan_activo: string | null
  limite_empleados: number | null
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  activa: boolean
  configuracion: Record<string, any> | null
  fecha_creacion: string
  fecha_actualizacion: string
}

export interface Usuario {
  id: string
  email: string
  nombre_completo: string | null
  avatar_url: string | null
  telefono: string | null
  fecha_nacimiento: string | null
  genero: string | null
  idioma_preferido: string
  zona_horaria: string
  rol: RolUsuario
  empresa_id: string | null
  departamento_id: string | null
  activo: boolean
  email_verificado: boolean
  telefono_verificado: boolean
  doble_factor_habilitado: boolean
  preferencias: Record<string, any> | null
  ultimo_acceso: string | null
  fecha_creacion: string
  fecha_actualizacion: string
}

export interface Profesional {
  id: string
  usuario_id: string
  numero_licencia: string | null
  biografia: string | null
  titulo_profesional: string | null
  universidad: string | null
  anios_experiencia: number | null
  calificacion_promedio: number
  total_sesiones: number
  total_resenas: number
  tarifa_hora: number | null
  moneda: string
  disponible: boolean
  verificado: boolean
  certificaciones: string[] | null
  idiomas: string[] | null
  modalidades: string[] | null
  foto_perfil_url: string | null
  video_presentacion_url: string | null
  linkedin_url: string | null
  fecha_creacion: string
  fecha_actualizacion: string
}

export interface Empleado {
  id: string
  usuario_id: string
  empresa_id: string
  numero_empleado: string | null
  cargo: string | null
  departamento_id: string | null
  fecha_ingreso: string | null
  fecha_salida: string | null
  activo: boolean
  profesional_asignado_id: string | null
  sesiones_disponibles: number
  limite_evaluaciones_mes: number
  fecha_creacion: string
  fecha_actualizacion: string
}

export interface SesionTerapia {
  id: string
  empleado_id: string
  profesional_id: string
  fecha_hora: string
  duracion_minutos: number
  estado: EstadoSesion
  tipo_sesion: TipoSesion
  notas_profesional: string | null
  notas_privadas: string | null
  resumen_ia: string | null
  calificacion_empleado: number | null
  url_videollamada: string | null
  grabacion_url: string | null
  costo: number | null
  pagada: boolean
  recordatorio_enviado: boolean
  fecha_creacion: string
  fecha_actualizacion: string
}

export interface Cita {
  id: string
  empleado_id: string
  profesional_id: string
  sesion_id: string | null
  fecha_hora_solicitada: string
  fecha_hora_confirmada: string | null
  duracion_estimada: number
  estado: EstadoSesion
  notas_empleado: string | null
  razon_cancelacion: string | null
  fecha_cancelacion: string | null
  fecha_creacion: string
  fecha_actualizacion: string
}

export interface Evaluacion {
  id: string
  empleado_id: string
  tipo_evaluacion: TipoEvaluacion
  puntaje_total: number | null
  puntajes_detalle: Record<string, any> | null
  respuestas: Record<string, any>
  interpretacion: string | null
  recomendaciones: string[] | null
  nivel_severidad: NivelSeveridad | null
  alerta_generada: boolean
  profesional_notificado_id: string | null
  fecha_creacion: string
}

export interface ResultadoEvaluacion {
  id: string
  evaluacion_id: string
  analisis_ia: string | null
  areas_preocupacion: string[] | null
  fortalezas: string[] | null
  plan_accion: string | null
  seguimiento_sugerido: string | null
  fecha_creacion: string
}

export interface Conversacion {
  id: string
  empleado_id: string | null
  profesional_id: string | null
  titulo: string | null
  estado: EstadoConversacion
  es_grupal: boolean
  participantes: string[] | null
  ultimo_mensaje_id: string | null
  ultimo_mensaje_fecha: string | null
  mensajes_no_leidos: number
  fecha_creacion: string
  fecha_actualizacion: string
}

export interface Mensaje {
  id: string
  conversacion_id: string
  remitente_id: string
  contenido: string
  contenido_encriptado: boolean
  adjuntos: string[] | null
  analisis_sentimiento: Record<string, any> | null
  alerta_crisis: boolean
  es_ia: boolean
  leido: boolean
  fecha_lectura: string | null
  editado: boolean
  fecha_edicion: string | null
  fecha_creacion: string
}

export interface Notificacion {
  id: string
  usuario_id: string
  tipo: TipoNotificacion
  titulo: string
  mensaje: string | null
  datos: Record<string, any> | null
  leida: boolean
  fecha_lectura: string | null
  url: string | null
  prioridad: number
  fecha_expiracion: string | null
  fecha_creacion: string
}

export interface Pago {
  id: string
  empresa_id: string | null
  usuario_id: string | null
  sesion_id: string | null
  monto: number
  moneda: string
  estado: EstadoPago
  tipo_pago: TipoPago
  stripe_payment_intent_id: string | null
  stripe_charge_id: string | null
  metodo_pago: string | null
  ultimos_4_digitos: string | null
  url_factura: string | null
  numero_factura: string | null
  descripcion: string | null
  metadata: Record<string, any> | null
  fecha_procesamiento: string | null
  fecha_reembolso: string | null
  fecha_creacion: string
}

export interface Suscripcion {
  id: string
  empresa_id: string
  plan_id: string | null
  stripe_subscription_id: string | null
  estado: EstadoSuscripcion
  precio_mensual: number
  moneda: string
  limite_empleados: number
  limite_sesiones_mes: number
  fecha_inicio: string
  fecha_fin: string | null
  fecha_proximo_pago: string | null
  periodo_facturacion: string
  auto_renovacion: boolean
  fecha_cancelacion: string | null
  razon_cancelacion: string | null
  fecha_creacion: string
  fecha_actualizacion: string
}

export interface DisponibilidadProfesional {
  id: string
  profesional_id: string
  dia_semana: number
  hora_inicio: string
  hora_fin: string
  disponible: boolean
  fecha_especifica: string | null
  fecha_creacion: string
}

export interface Resena {
  id: string
  sesion_id: string | null
  profesional_id: string
  empleado_id: string
  calificacion: number
  comentario: string | null
  anonima: boolean
  moderada: boolean
  visible: boolean
  razon_oculta: string | null
  respuesta_profesional: string | null
  fecha_respuesta: string | null
  fecha_creacion: string
}

export interface Recurso {
  id: string
  titulo: string
  descripcion: string | null
  contenido: string | null
  tipo: TipoRecurso
  url_externo: string | null
  archivo_id: string | null
  imagen_portada_url: string | null
  autor_id: string | null
  duracion_minutos: number | null
  etiquetas: string[] | null
  categorias: string[] | null
  audiencia: RolUsuario[] | null
  idioma: string
  publicado: boolean
  destacado: boolean
  vistas: number
  likes: number
  fecha_publicacion: string | null
  fecha_creacion: string
  fecha_actualizacion: string
}

export interface Favorito {
  id: string
  usuario_id: string
  recurso_id: string
  notas_personales: string | null
  fecha_creacion: string
}

export interface Archivo {
  id: string
  nombre_archivo: string
  tipo_archivo: TipoArchivo
  tamano_bytes: number
  mime_type: string | null
  url_publica: string | null
  ruta_storage: string
  usuario_id: string
  entidad_tipo: string | null
  entidad_id: string | null
  descripcion: string | null
  metadata: Record<string, any> | null
  fecha_creacion: string
}

export interface Especialidad {
  id: string
  nombre_es: string
  nombre_en: string | null
  descripcion: string | null
  icono: string | null
  activa: boolean
  fecha_creacion: string
}

export interface ProfesionalEspecialidad {
  profesional_id: string
  especialidad_id: string
  nivel_experiencia: number | null
  certificado: boolean
  fecha_certificacion: string | null
  fecha_creacion: string
}

export interface DepartamentoEmpresa {
  id: string
  empresa_id: string
  nombre: string
  descripcion: string | null
  gerente_id: string | null
  activo: boolean
  fecha_creacion: string
  fecha_actualizacion: string
}

export interface PermisoRol {
  id: string
  rol: RolUsuario
  recurso: string
  accion: string
  permitido: boolean
  condiciones: Record<string, any> | null
  fecha_creacion: string
}

export interface ConfiguracionEmpresa {
  id: string
  empresa_id: string
  clave: string
  valor: Record<string, any>
  tipo_dato: string
  descripcion: string | null
  fecha_creacion: string
  fecha_actualizacion: string
}

export interface TemplateCorreo {
  id: string
  nombre: string
  descripcion: string | null
  asunto_es: string
  cuerpo_es: string
  asunto_en: string | null
  cuerpo_en: string | null
  variables: string[] | null
  tipo: string
  activo: boolean
  fecha_creacion: string
  fecha_actualizacion: string
}

export interface LogAuditoria {
  id: string
  usuario_id: string | null
  accion: AccionAuditoria
  entidad_tipo: string | null
  entidad_id: string | null
  datos_anteriores: Record<string, any> | null
  datos_nuevos: Record<string, any> | null
  ip_address: string | null
  user_agent: string | null
  metadata: Record<string, any> | null
  fecha_creacion: string
}

export interface Token2FA {
  id: string
  usuario_id: string
  secreto_encriptado: string
  backup_codes: string[] | null
  verificado: boolean
  fecha_verificacion: string | null
  fecha_creacion: string
  fecha_actualizacion: string
}

export interface SesionActiva {
  id: string
  usuario_id: string
  token: string
  ip_address: string | null
  user_agent: string | null
  ultimo_uso: string
  fecha_expiracion: string
  fecha_creacion: string
}

// ============================================
// VISTAS MATERIALIZADAS
// ============================================

export interface VistaMetricasEmpresa {
  empresa_id: string
  total_empleados: number
  empleados_activos: number
  total_sesiones: number
  sesiones_completadas: number
  promedio_satisfaccion: number
  total_evaluaciones: number
  empleados_riesgo_alto: number
  fecha_calculo: string
}

export interface VistaRatingProfesional {
  profesional_id: string
  total_sesiones: number
  sesiones_completadas: number
  promedio_calificacion: number
  total_resenas: number
  tasa_cancelacion: number
  fecha_calculo: string
}

export interface VistaUsoPorDepartamento {
  empresa_id: string
  departamento_id: string
  total_empleados: number
  total_sesiones: number
  promedio_evaluaciones: number
  fecha_calculo: string
}

// ============================================
// TIPOS DE RESPUESTA DE FUNCIONES
// ============================================

export interface ResultadoMetricasEmpresa {
  total_empleados: number
  empleados_activos: number
  sesiones_mes_actual: number
  sesiones_completadas: number
  tasa_asistencia: number
  empleados_con_riesgo: number
  promedio_bienestar: number
}

export interface SlotDisponibilidad {
  fecha: string
  hora_inicio: string
  hora_fin: string
  disponible: boolean
  profesional_id: string
}

export interface ResultadoReporteUso {
  periodo: string
  total_sesiones: number
  sesiones_por_tipo: Record<string, number>
  evaluaciones_completadas: number
  empleados_activos: number
  horas_terapia_total: number
}

export interface ResultadoValidacionCredenciales {
  usuario_id: string
  rol: RolUsuario
  empresa_id: string | null
}

// ============================================
// TIPOS AUXILIARES
// ============================================

export interface ErrorBaseDatos {
  mensaje: string
  codigo: string
  detalles: string | null
  sugerencia: string | null
}

export interface RespuestaPaginada<T> {
  datos: T[]
  total: number
  pagina: number
  tamanoPagina: number
  totalPaginas: number
}

export interface OpcionesFiltro {
  pagina?: number
  tamanoPagina?: number
  ordenarPor?: string
  ordenDireccion?: 'asc' | 'desc'
  busqueda?: string
}

// ============================================
// TIPOS PARA INSERTAR/ACTUALIZAR
// ============================================

export type DatosNuevaEmpresa = Omit<Empresa, 'id' | 'fecha_creacion' | 'fecha_actualizacion'>
export type DatosActualizarEmpresa = Partial<DatosNuevaEmpresa>

export type DatosNuevoUsuario = Omit<Usuario, 'id' | 'fecha_creacion' | 'fecha_actualizacion'>
export type DatosActualizarUsuario = Partial<DatosNuevoUsuario>

export type DatosNuevoProfesional = Omit<Profesional, 'id' | 'fecha_creacion' | 'fecha_actualizacion' | 'calificacion_promedio' | 'total_sesiones' | 'total_resenas'>
export type DatosActualizarProfesional = Partial<DatosNuevoProfesional>

export type DatosNuevoEmpleado = Omit<Empleado, 'id' | 'fecha_creacion' | 'fecha_actualizacion'>
export type DatosActualizarEmpleado = Partial<DatosNuevoEmpleado>

export type DatosNuevaSesion = Omit<SesionTerapia, 'id' | 'fecha_creacion' | 'fecha_actualizacion'>
export type DatosActualizarSesion = Partial<DatosNuevaSesion>

export type DatosNuevaCita = Omit<Cita, 'id' | 'fecha_creacion' | 'fecha_actualizacion'>
export type DatosActualizarCita = Partial<DatosNuevaCita>

export type DatosNuevaEvaluacion = Omit<Evaluacion, 'id' | 'fecha_creacion'>
export type DatosActualizarEvaluacion = Partial<DatosNuevaEvaluacion>

export type DatosNuevoMensaje = Omit<Mensaje, 'id' | 'fecha_creacion'>
export type DatosActualizarMensaje = Partial<DatosNuevoMensaje>

export type DatosNuevaNotificacion = Omit<Notificacion, 'id' | 'fecha_creacion'>
export type DatosActualizarNotificacion = Partial<DatosNuevaNotificacion>

export type DatosNuevoPago = Omit<Pago, 'id' | 'fecha_creacion'>
export type DatosActualizarPago = Partial<DatosNuevoPago>

export type DatosNuevoRecurso = Omit<Recurso, 'id' | 'fecha_creacion' | 'fecha_actualizacion' | 'vistas' | 'likes'>
export type DatosActualizarRecurso = Partial<DatosNuevoRecurso>

// ============================================
// TIPOS CON RELACIONES (Joins comunes)
// ============================================

export interface SesionConRelaciones extends SesionTerapia {
  empleado: Pick<Usuario, 'id' | 'nombre_completo' | 'email' | 'avatar_url'>
  profesional: Pick<Profesional, 'id' | 'usuario_id' | 'titulo_profesional' | 'foto_perfil_url'> & {
    usuario: Pick<Usuario, 'nombre_completo' | 'email'>
  }
}

export interface EvaluacionConEmpleado extends Evaluacion {
  empleado: Pick<Usuario, 'id' | 'nombre_completo' | 'email'>
}

export interface MensajeConRemitente extends Mensaje {
  remitente: Pick<Usuario, 'id' | 'nombre_completo' | 'avatar_url'>
}

export interface ProfesionalConDetalles extends Profesional {
  usuario: Usuario
  especialidades: Especialidad[]
  disponibilidad: DisponibilidadProfesional[]
}

export interface EmpleadoConDetalles extends Empleado {
  usuario: Usuario
  empresa: Pick<Empresa, 'id' | 'nombre' | 'logo_url'>
  departamento: Pick<DepartamentoEmpresa, 'id' | 'nombre'> | null
  profesional_asignado: Pick<Profesional, 'id' | 'usuario_id'> | null
}

export interface RecursoConAutor extends Recurso {
  autor: Pick<Usuario, 'id' | 'nombre_completo' | 'avatar_url'> | null
}

export interface ConversacionConUltimoMensaje extends Conversacion {
  ultimo_mensaje: Mensaje | null
  participantes_datos: Pick<Usuario, 'id' | 'nombre_completo' | 'avatar_url'>[]
}

// ============================================
// TIPO DE BASE DE DATOS (para Supabase)
// ============================================

export interface BaseDatos {
  public: {
    Tables: {
      empresas: {
        Row: Empresa
        Insert: DatosNuevaEmpresa
        Update: DatosActualizarEmpresa
      }
      usuarios: {
        Row: Usuario
        Insert: DatosNuevoUsuario
        Update: DatosActualizarUsuario
      }
      profesionales: {
        Row: Profesional
        Insert: DatosNuevoProfesional
        Update: DatosActualizarProfesional
      }
      empleados: {
        Row: Empleado
        Insert: DatosNuevoEmpleado
        Update: DatosActualizarEmpleado
      }
      sesiones_terapia: {
        Row: SesionTerapia
        Insert: DatosNuevaSesion
        Update: DatosActualizarSesion
      }
      citas: {
        Row: Cita
        Insert: DatosNuevaCita
        Update: DatosActualizarCita
      }
      evaluaciones: {
        Row: Evaluacion
        Insert: DatosNuevaEvaluacion
        Update: DatosActualizarEvaluacion
      }
      resultados_evaluaciones: {
        Row: ResultadoEvaluacion
      }
      conversaciones: {
        Row: Conversacion
      }
      mensajes: {
        Row: Mensaje
        Insert: DatosNuevoMensaje
        Update: DatosActualizarMensaje
      }
      notificaciones: {
        Row: Notificacion
        Insert: DatosNuevaNotificacion
        Update: DatosActualizarNotificacion
      }
      pagos: {
        Row: Pago
        Insert: DatosNuevoPago
        Update: DatosActualizarPago
      }
      suscripciones: {
        Row: Suscripcion
      }
      disponibilidad_profesional: {
        Row: DisponibilidadProfesional
      }
      resenas: {
        Row: Resena
      }
      recursos: {
        Row: Recurso
        Insert: DatosNuevoRecurso
        Update: DatosActualizarRecurso
      }
      favoritos: {
        Row: Favorito
      }
      archivos: {
        Row: Archivo
      }
      especialidades: {
        Row: Especialidad
      }
      profesional_especialidad: {
        Row: ProfesionalEspecialidad
      }
      departamentos_empresa: {
        Row: DepartamentoEmpresa
      }
      permisos_rol: {
        Row: PermisoRol
      }
      configuracion_empresa: {
        Row: ConfiguracionEmpresa
      }
      templates_correo: {
        Row: TemplateCorreo
      }
      logs_auditoria: {
        Row: LogAuditoria
      }
      tokens_2fa: {
        Row: Token2FA
      }
      sesiones_activas: {
        Row: SesionActiva
      }
    }
    Views: {
      vista_metricas_empresa: {
        Row: VistaMetricasEmpresa
      }
      vista_rating_profesional: {
        Row: VistaRatingProfesional
      }
      vista_uso_por_departamento: {
        Row: VistaUsoPorDepartamento
      }
    }
    Functions: {
      crear_usuario_completo: {
        Args: {
          p_email: string
          p_password: string
          p_nombre_completo: string
          p_rol: RolUsuario
          p_empresa_id?: string
        }
        Returns: string
      }
      actualizar_perfil: {
        Args: {
          p_usuario_id: string
          p_datos: Record<string, any>
        }
        Returns: boolean
      }
      validar_credenciales: {
        Args: {
          p_email: string
          p_password: string
        }
        Returns: ResultadoValidacionCredenciales | null
      }
      calcular_disponibilidad: {
        Args: {
          p_profesional_id: string
          p_fecha_inicio: string
          p_fecha_fin: string
        }
        Returns: SlotDisponibilidad[]
      }
      calcular_metricas_empresa: {
        Args: {
          p_empresa_id: string
        }
        Returns: ResultadoMetricasEmpresa
      }
      generar_reporte_uso: {
        Args: {
          p_empresa_id: string
          p_fecha_inicio: string
          p_fecha_fin: string
        }
        Returns: ResultadoReporteUso
      }
    }
  }
}

// Exportar tipo para uso con cliente de Supabase
export type ClienteSupabase = any // Reemplazar con tipo real de @supabase/supabase-js
