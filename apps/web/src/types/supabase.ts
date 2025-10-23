/**
 * Tipos generados automáticamente de la base de datos Supabase
 * Basados en el schema.sql del proyecto
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      usuarios: {
        Row: {
          id: string
          email: string
          nombre_completo: string | null
          telefono: string | null
          avatar_url: string | null
          rol: 'user' | 'profesional' | 'admin_empresa' | 'super_admin'
          idioma_preferido: string
          zona_horaria: string
          fecha_creacion: string
          fecha_actualizacion: string
          ultima_conexion: string | null
          activo: boolean
        }
        Insert: Omit<Database['public']['Tables']['usuarios']['Row'], 'id' | 'fecha_creacion' | 'fecha_actualizacion'>
        Update: Partial<Database['public']['Tables']['usuarios']['Insert']>
      }
      profesionales: {
        Row: {
          id: string
          usuario_id: string
          numero_licencia: string
          especialidades: string[]
          anos_experiencia: number
          tarifa_por_hora: number
          biografia: string | null
          formacion_academica: Json
          certificaciones: Json
          idiomas: string[]
          modalidad_atencion: string[]
          calificacion_promedio: number
          total_sesiones: number
          estado_verificacion: 'pendiente' | 'verificado' | 'rechazado'
          disponibilidad: Json
          fecha_creacion: string
          fecha_actualizacion: string
        }
        Insert: Omit<Database['public']['Tables']['profesionales']['Row'], 'id' | 'fecha_creacion' | 'fecha_actualizacion'>
        Update: Partial<Database['public']['Tables']['profesionales']['Insert']>
      }
      empresas: {
        Row: {
          id: string
          nombre: string
          rfc: string
          industria: string
          tamano_empresa: string
          numero_empleados: number
          direccion: Json
          telefono_contacto: string
          email_contacto: string
          logo_url: string | null
          sitio_web: string | null
          plan_suscripcion: string
          fecha_inicio_suscripcion: string
          fecha_fin_suscripcion: string | null
          estado_suscripcion: 'activa' | 'suspendida' | 'cancelada'
          limite_empleados: number
          configuracion: Json
          fecha_creacion: string
          fecha_actualizacion: string
        }
        Insert: Omit<Database['public']['Tables']['empresas']['Row'], 'id' | 'fecha_creacion' | 'fecha_actualizacion'>
        Update: Partial<Database['public']['Tables']['empresas']['Insert']>
      }
      pacientes: {
        Row: {
          id: string
          usuario_id: string
          empresa_id: string | null
          fecha_nacimiento: string
          genero: string | null
          ocupacion: string | null
          motivo_consulta: string | null
          historial_medico: Json
          contacto_emergencia: Json
          consentimiento_tratamiento: boolean
          consentimiento_datos: boolean
          estado: 'activo' | 'inactivo' | 'pendiente'
          fecha_creacion: string
          fecha_actualizacion: string
        }
        Insert: Omit<Database['public']['Tables']['pacientes']['Row'], 'id' | 'fecha_creacion' | 'fecha_actualizacion'>
        Update: Partial<Database['public']['Tables']['pacientes']['Insert']>
      }
      sesiones: {
        Row: {
          id: string
          paciente_id: string
          profesional_id: string
          fecha_hora_inicio: string
          fecha_hora_fin: string
          duracion_minutos: number
          tipo_sesion: string
          modalidad: 'presencial' | 'video' | 'telefono' | 'chat'
          estado: 'programada' | 'confirmada' | 'en_curso' | 'completada' | 'cancelada' | 'no_asistio'
          notas_sesion: string | null
          diagnostico: string | null
          plan_tratamiento: string | null
          tareas_paciente: Json
          sala_virtual_url: string | null
          grabacion_url: string | null
          costo: number
          pagado: boolean
          calificacion_paciente: number | null
          comentario_paciente: string | null
          fecha_creacion: string
          fecha_actualizacion: string
        }
        Insert: Omit<Database['public']['Tables']['sesiones']['Row'], 'id' | 'fecha_creacion' | 'fecha_actualizacion'>
        Update: Partial<Database['public']['Tables']['sesiones']['Insert']>
      }
      evaluaciones: {
        Row: {
          id: string
          paciente_id: string
          profesional_id: string | null
          tipo_evaluacion: string
          resultados: Json
          puntuacion_total: number | null
          interpretacion: string | null
          recomendaciones: string | null
          fecha_evaluacion: string
          fecha_creacion: string
        }
        Insert: Omit<Database['public']['Tables']['evaluaciones']['Row'], 'id' | 'fecha_creacion'>
        Update: Partial<Database['public']['Tables']['evaluaciones']['Insert']>
      }
      mensajes: {
        Row: {
          id: string
          conversacion_id: string
          remitente_id: string
          contenido: string
          tipo_contenido: 'texto' | 'imagen' | 'archivo' | 'audio'
          archivo_url: string | null
          leido: boolean
          fecha_lectura: string | null
          fecha_creacion: string
        }
        Insert: Omit<Database['public']['Tables']['mensajes']['Row'], 'id' | 'fecha_creacion'>
        Update: Partial<Database['public']['Tables']['mensajes']['Insert']>
      }
      conversaciones: {
        Row: {
          id: string
          participantes: string[]
          tipo: 'individual' | 'grupal'
          titulo: string | null
          ultimo_mensaje: string | null
          fecha_ultimo_mensaje: string | null
          fecha_creacion: string
        }
        Insert: Omit<Database['public']['Tables']['conversaciones']['Row'], 'id' | 'fecha_creacion'>
        Update: Partial<Database['public']['Tables']['conversaciones']['Insert']>
      }
      pagos: {
        Row: {
          id: string
          usuario_id: string
          empresa_id: string | null
          sesion_id: string | null
          monto: number
          moneda: string
          metodo_pago: string
          estado: 'pendiente' | 'completado' | 'fallido' | 'reembolsado'
          stripe_payment_id: string | null
          stripe_invoice_id: string | null
          descripcion: string | null
          fecha_pago: string | null
          fecha_creacion: string
        }
        Insert: Omit<Database['public']['Tables']['pagos']['Row'], 'id' | 'fecha_creacion'>
        Update: Partial<Database['public']['Tables']['pagos']['Insert']>
      }
      recursos_educativos: {
        Row: {
          id: string
          titulo: string
          descripcion: string
          tipo: 'articulo' | 'video' | 'audio' | 'pdf' | 'guia'
          contenido: string | null
          url: string | null
          archivo_url: string | null
          imagen_portada: string | null
          categorias: string[]
          tags: string[]
          duracion_minutos: number | null
          nivel: 'principiante' | 'intermedio' | 'avanzado'
          idioma: string
          autor_id: string | null
          visibilidad: 'publico' | 'usuarios' | 'profesionales'
          publicado: boolean
          visualizaciones: number
          valoracion_promedio: number
          fecha_publicacion: string | null
          fecha_creacion: string
          fecha_actualizacion: string
        }
        Insert: Omit<Database['public']['Tables']['recursos_educativos']['Row'], 'id' | 'fecha_creacion' | 'fecha_actualizacion'>
        Update: Partial<Database['public']['Tables']['recursos_educativos']['Insert']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
