-- ==================================================
-- MENTALFIT - ESQUEMA DE BASE DE DATOS COMPLETO
-- Versión: 2.0
-- Idioma: ESPAÑOL
-- Fecha: 2025-01-21
-- Stack: Next.js 14 + Supabase (PostgreSQL)
-- Descripción: Plataforma B2B de salud mental corporativa
-- ==================================================

-- ==================================================
-- SECCIÓN 1: ELIMINACIÓN DE TABLAS ANTIGUAS
-- ==================================================

DROP TABLE IF EXISTS templates_correo CASCADE;
DROP TABLE IF EXISTS configuracion_empresa CASCADE;
DROP TABLE IF EXISTS permisos_rol CASCADE;
DROP TABLE IF EXISTS departamentos_empresa CASCADE;
DROP TABLE IF EXISTS especialidades CASCADE;
DROP TABLE IF EXISTS favoritos CASCADE;
DROP TABLE IF EXISTS archivos CASCADE;
DROP TABLE IF EXISTS sesiones_activas CASCADE;
DROP TABLE IF EXISTS tokens_2fa CASCADE;
DROP TABLE IF EXISTS logs_auditoria CASCADE;
DROP TABLE IF EXISTS suscripciones CASCADE;
DROP TABLE IF EXISTS resultados_evaluaciones CASCADE;
DROP TABLE IF EXISTS citas CASCADE;
DROP TABLE IF EXISTS empleados CASCADE;
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS availability CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS chat_messages CASCADE;
DROP TABLE IF EXISTS chat_conversations CASCADE;
DROP TABLE IF EXISTS assessments CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS professionals CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS companies CASCADE;

-- Eliminación de tablas nuevas en español
DROP TABLE IF EXISTS recursos CASCADE;
DROP TABLE IF EXISTS reseñas CASCADE;
DROP TABLE IF EXISTS disponibilidad_profesional CASCADE;
DROP TABLE IF EXISTS pagos CASCADE;
DROP TABLE IF EXISTS notificaciones CASCADE;
DROP TABLE IF EXISTS mensajes CASCADE;
DROP TABLE IF EXISTS conversaciones CASCADE;
DROP TABLE IF EXISTS evaluaciones CASCADE;
DROP TABLE IF EXISTS sesiones_terapia CASCADE;
DROP TABLE IF EXISTS profesionales CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS empresas CASCADE;

-- Eliminación de vistas materializadas
DROP MATERIALIZED VIEW IF EXISTS metricas_empresa CASCADE;
DROP MATERIALIZED VIEW IF EXISTS disponibilidad_tiempo_real CASCADE;
DROP MATERIALIZED VIEW IF EXISTS uso_plataforma CASCADE;

-- ==================================================
-- SECCIÓN 2: CREACIÓN DE TABLAS (26 tablas)
-- ==================================================

-- ==================================================
-- 1. TABLA: empresas
-- Descripción: Almacena información de empresas clientes B2B
-- ==================================================
CREATE TABLE empresas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  plan_id TEXT NOT NULL DEFAULT 'basico', -- basico, profesional, empresarial
  limite_empleados INTEGER NOT NULL DEFAULT 50,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  activa BOOLEAN NOT NULL DEFAULT TRUE,
  configuracion JSONB DEFAULT '{}'::jsonb,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_plan_valido CHECK (plan_id IN ('basico', 'profesional', 'empresarial', 'trial')),
  CONSTRAINT chk_limite_empleados CHECK (limite_empleados > 0)
);

COMMENT ON TABLE empresas IS 'Empresas clientes de la plataforma B2B';
COMMENT ON COLUMN empresas.configuracion IS 'Configuración personalizada en formato JSON';

-- ==================================================
-- 2. TABLA: usuarios
-- Descripción: Perfiles extendidos de auth.users
-- ==================================================
CREATE TABLE usuarios (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  nombre_completo TEXT,
  rol TEXT NOT NULL DEFAULT 'user',
  empresa_id UUID REFERENCES empresas(id) ON DELETE SET NULL,
  departamento_id UUID,
  avatar_url TEXT,
  telefono TEXT,
  timezone TEXT DEFAULT 'America/Bogota',
  preferencias JSONB DEFAULT '{}'::jsonb,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_rol_valido CHECK (rol IN ('admin', 'company_admin', 'professional', 'user')),
  CONSTRAINT chk_email_formato CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

COMMENT ON TABLE usuarios IS 'Perfiles de usuarios del sistema (extendido desde auth.users)';
COMMENT ON COLUMN usuarios.rol IS 'admin: superadmin | company_admin: admin empresa | professional: terapeuta | user: empleado';
COMMENT ON COLUMN usuarios.preferencias IS 'Idioma, notificaciones, tema, etc.';

-- ==================================================
-- 3. TABLA: profesionales
-- Descripción: Información de terapeutas y profesionales
-- ==================================================
CREATE TABLE profesionales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID UNIQUE NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  especialidades TEXT[] DEFAULT ARRAY[]::TEXT[],
  numero_licencia TEXT UNIQUE,
  bio TEXT,
  calificacion_promedio DECIMAL(3,2) DEFAULT 0.00,
  total_sesiones INTEGER DEFAULT 0,
  tarifa_hora DECIMAL(10,2),
  moneda TEXT DEFAULT 'COP',
  anios_experiencia INTEGER DEFAULT 0,
  idiomas TEXT[] DEFAULT ARRAY['es']::TEXT[],
  disponible BOOLEAN DEFAULT TRUE,
  verificado BOOLEAN DEFAULT FALSE,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_calificacion CHECK (calificacion_promedio >= 0 AND calificacion_promedio <= 5),
  CONSTRAINT chk_tarifa CHECK (tarifa_hora >= 0),
  CONSTRAINT chk_moneda CHECK (moneda IN ('COP', 'USD', 'EUR')),
  CONSTRAINT chk_anios CHECK (anios_experiencia >= 0)
);

COMMENT ON TABLE profesionales IS 'Terapeutas y profesionales de salud mental';
COMMENT ON COLUMN profesionales.especialidades IS 'Array de especialidades: [ansiedad, depresion, estres_laboral, etc.]';

-- ==================================================
-- 4. TABLA: sesiones_terapia
-- Descripción: Sesiones de terapia realizadas o programadas
-- ==================================================
CREATE TABLE sesiones_terapia (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  profesional_id UUID NOT NULL REFERENCES profesionales(id) ON DELETE RESTRICT,
  fecha_programada TIMESTAMP WITH TIME ZONE NOT NULL,
  duracion_minutos INTEGER DEFAULT 50,
  estado TEXT NOT NULL DEFAULT 'programada',
  tipo TEXT NOT NULL DEFAULT 'individual',
  notas_profesional TEXT,
  notas_paciente TEXT,
  url_videollamada TEXT,
  grabacion_url TEXT,
  es_recurrente BOOLEAN DEFAULT FALSE,
  recurrencia_config JSONB,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_estado_sesion CHECK (estado IN ('programada', 'completada', 'cancelada', 'en_progreso', 'no_asistio')),
  CONSTRAINT chk_tipo_sesion CHECK (tipo IN ('individual', 'grupal', 'crisis', 'bienestar', 'seguimiento')),
  CONSTRAINT chk_duracion CHECK (duracion_minutos > 0)
);

COMMENT ON TABLE sesiones_terapia IS 'Sesiones de terapia individuales o grupales';
COMMENT ON COLUMN sesiones_terapia.recurrencia_config IS 'Configuración de recurrencia: {frecuencia: "semanal", dia: 1, hasta: "2025-12-31"}';

-- ==================================================
-- 5. TABLA: evaluaciones
-- Descripción: Evaluaciones psicológicas (PHQ-9, GAD-7, etc.)
-- ==================================================
CREATE TABLE evaluaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  tipo_evaluacion TEXT NOT NULL,
  preguntas JSONB NOT NULL,
  respuestas JSONB NOT NULL,
  puntuacion_total INTEGER,
  interpretacion TEXT,
  severidad TEXT,
  alerta_generada BOOLEAN DEFAULT FALSE,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_tipo_evaluacion CHECK (tipo_evaluacion IN ('PHQ-9', 'GAD-7', 'estres', 'burnout', 'personalizado')),
  CONSTRAINT chk_severidad CHECK (severidad IN ('minima', 'leve', 'moderada', 'severa', 'critica'))
);

COMMENT ON TABLE evaluaciones IS 'Evaluaciones psicológicas estandarizadas';
COMMENT ON COLUMN evaluaciones.alerta_generada IS 'TRUE si la puntuación requiere atención urgente';

-- ==================================================
-- 6. TABLA: conversaciones
-- Descripción: Conversaciones de chat entre usuarios y profesionales
-- ==================================================
CREATE TABLE conversaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  profesional_id UUID NOT NULL REFERENCES profesionales(id) ON DELETE CASCADE,
  estado TEXT NOT NULL DEFAULT 'activa',
  ultimo_mensaje_fecha TIMESTAMP WITH TIME ZONE,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_estado_conversacion CHECK (estado IN ('activa', 'archivada', 'cerrada')),
  CONSTRAINT uq_conversacion UNIQUE (usuario_id, profesional_id)
);

COMMENT ON TABLE conversaciones IS 'Hilos de conversación entre usuarios y profesionales';

-- ==================================================
-- 7. TABLA: mensajes
-- Descripción: Mensajes individuales dentro de conversaciones
-- ==================================================
CREATE TABLE mensajes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversacion_id UUID NOT NULL REFERENCES conversaciones(id) ON DELETE CASCADE,
  remitente_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  contenido TEXT NOT NULL,
  tipo TEXT DEFAULT 'texto',
  archivo_url TEXT,
  archivo_metadata JSONB,
  sentimiento JSONB,
  leido BOOLEAN DEFAULT FALSE,
  fecha_lectura TIMESTAMP WITH TIME ZONE,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_tipo_mensaje CHECK (tipo IN ('texto', 'imagen', 'archivo', 'audio', 'video')),
  CONSTRAINT chk_contenido_longitud CHECK (char_length(contenido) <= 5000)
);

COMMENT ON TABLE mensajes IS 'Mensajes de chat con análisis de sentimiento';
COMMENT ON COLUMN mensajes.sentimiento IS 'Análisis de IA: {score: -1 a 1, label: "positivo/neutral/negativo"}';

-- ==================================================
-- 8. TABLA: notificaciones
-- Descripción: Notificaciones push/email para usuarios
-- ==================================================
CREATE TABLE notificaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  titulo TEXT NOT NULL,
  mensaje TEXT,
  leida BOOLEAN DEFAULT FALSE,
  fecha_lectura TIMESTAMP WITH TIME ZONE,
  enlace TEXT,
  metadata JSONB,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_tipo_notificacion CHECK (tipo IN ('sesion', 'mensaje', 'evaluacion', 'sistema', 'recordatorio', 'alerta'))
);

COMMENT ON TABLE notificaciones IS 'Sistema de notificaciones push y email';

-- ==================================================
-- 9. TABLA: pagos
-- Descripción: Transacciones y pagos de empresas/usuarios
-- ==================================================
CREATE TABLE pagos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID REFERENCES empresas(id) ON DELETE SET NULL,
  usuario_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
  monto DECIMAL(10,2) NOT NULL,
  moneda TEXT DEFAULT 'COP',
  estado TEXT NOT NULL DEFAULT 'pendiente',
  tipo TEXT NOT NULL DEFAULT 'suscripcion',
  stripe_payment_id TEXT UNIQUE,
  stripe_invoice_id TEXT,
  factura_url TEXT,
  descripcion TEXT,
  metadata JSONB,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_monto CHECK (monto >= 0),
  CONSTRAINT chk_moneda_pago CHECK (moneda IN ('COP', 'USD', 'EUR')),
  CONSTRAINT chk_estado_pago CHECK (estado IN ('pendiente', 'completado', 'fallido', 'reembolsado', 'cancelado')),
  CONSTRAINT chk_tipo_pago CHECK (tipo IN ('suscripcion', 'sesion', 'unico', 'recarga'))
);

COMMENT ON TABLE pagos IS 'Registro de transacciones y pagos';

-- ==================================================
-- 10. TABLA: disponibilidad_profesional
-- Descripción: Horarios disponibles de profesionales
-- ==================================================
CREATE TABLE disponibilidad_profesional (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profesional_id UUID NOT NULL REFERENCES profesionales(id) ON DELETE CASCADE,
  dia_semana INTEGER NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  bloqueado BOOLEAN DEFAULT FALSE,
  motivo_bloqueo TEXT,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_dia_semana CHECK (dia_semana >= 0 AND dia_semana <= 6),
  CONSTRAINT chk_horario CHECK (hora_fin > hora_inicio)
);

COMMENT ON TABLE disponibilidad_profesional IS 'Disponibilidad semanal de profesionales (0=Domingo, 6=Sábado)';

-- ==================================================
-- 11. TABLA: reseñas
-- Descripción: Calificaciones de usuarios sobre sesiones
-- ==================================================
CREATE TABLE reseñas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sesion_id UUID UNIQUE NOT NULL REFERENCES sesiones_terapia(id) ON DELETE CASCADE,
  profesional_id UUID NOT NULL REFERENCES profesionales(id) ON DELETE CASCADE,
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  calificacion INTEGER NOT NULL,
  comentario TEXT,
  aprobada BOOLEAN DEFAULT TRUE,
  moderada_por UUID REFERENCES usuarios(id),
  fecha_moderacion TIMESTAMP WITH TIME ZONE,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_calificacion_rango CHECK (calificacion >= 1 AND calificacion <= 5)
);

COMMENT ON TABLE reseñas IS 'Calificaciones y comentarios de usuarios sobre sesiones';

-- ==================================================
-- 12. TABLA: recursos
-- Descripción: Biblioteca de contenido educativo
-- ==================================================
CREATE TABLE recursos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  descripcion TEXT,
  contenido TEXT,
  categoria TEXT NOT NULL,
  etiquetas TEXT[] DEFAULT ARRAY[]::TEXT[],
  publicado BOOLEAN DEFAULT FALSE,
  autor_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
  archivo_url TEXT,
  visualizaciones INTEGER DEFAULT 0,
  favoritos_count INTEGER DEFAULT 0,
  idioma TEXT DEFAULT 'es',
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_categoria_recurso CHECK (categoria IN ('articulo', 'video', 'audio', 'guia', 'ejercicio', 'podcast')),
  CONSTRAINT chk_idioma_recurso CHECK (idioma IN ('es', 'en'))
);

COMMENT ON TABLE recursos IS 'Biblioteca de contenido educativo y recursos';

-- ==================================================
-- 13. TABLA: empleados
-- Descripción: Relación usuarios-empresas como empleados
-- ==================================================
CREATE TABLE empleados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  departamento_id UUID,
  codigo_empleado TEXT,
  puesto TEXT,
  fecha_ingreso DATE,
  activo BOOLEAN DEFAULT TRUE,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT uq_empleado_empresa UNIQUE (usuario_id, empresa_id)
);

COMMENT ON TABLE empleados IS 'Relación entre usuarios y empresas';

-- ==================================================
-- 14. TABLA: citas
-- Descripción: Sistema de agendamiento de citas
-- ==================================================
CREATE TABLE citas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  profesional_id UUID NOT NULL REFERENCES profesionales(id) ON DELETE RESTRICT,
  fecha_hora TIMESTAMP WITH TIME ZONE NOT NULL,
  duracion_minutos INTEGER DEFAULT 50,
  estado TEXT NOT NULL DEFAULT 'confirmada',
  tipo TEXT NOT NULL DEFAULT 'primera_vez',
  recurrente BOOLEAN DEFAULT FALSE,
  patron_recurrencia JSONB,
  motivo TEXT,
  notas TEXT,
  url_videollamada TEXT,
  recordatorio_enviado BOOLEAN DEFAULT FALSE,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_cancelacion TIMESTAMP WITH TIME ZONE,

  CONSTRAINT chk_estado_cita CHECK (estado IN ('confirmada', 'cancelada', 'completada', 'reprogramada')),
  CONSTRAINT chk_tipo_cita CHECK (tipo IN ('primera_vez', 'seguimiento', 'urgencia', 'evaluacion'))
);

COMMENT ON TABLE citas IS 'Sistema de agendamiento separado de sesiones completadas';

-- ==================================================
-- 15. TABLA: resultados_evaluaciones
-- Descripción: Análisis detallado de evaluaciones
-- ==================================================
CREATE TABLE resultados_evaluaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluacion_id UUID UNIQUE NOT NULL REFERENCES evaluaciones(id) ON DELETE CASCADE,
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  dimensiones JSONB NOT NULL,
  interpretacion_ia TEXT,
  recomendaciones JSONB,
  requiere_atencion BOOLEAN DEFAULT FALSE,
  profesional_asignado_id UUID REFERENCES profesionales(id),
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE resultados_evaluaciones IS 'Resultados detallados con análisis de IA';
COMMENT ON COLUMN resultados_evaluaciones.dimensiones IS 'Puntuaciones por dimensión específica del test';

-- ==================================================
-- 16. TABLA: suscripciones
-- Descripción: Suscripciones activas de empresas
-- ==================================================
CREATE TABLE suscripciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL,
  stripe_subscription_id TEXT UNIQUE,
  estado TEXT NOT NULL DEFAULT 'activa',
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE,
  fecha_trial_fin DATE,
  precio_mensual DECIMAL(10,2) NOT NULL,
  moneda TEXT DEFAULT 'COP',
  limite_empleados INTEGER NOT NULL,
  empleados_actuales INTEGER DEFAULT 0,
  auto_renovacion BOOLEAN DEFAULT TRUE,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_estado_suscripcion CHECK (estado IN ('activa', 'cancelada', 'pausada', 'trial', 'vencida')),
  CONSTRAINT chk_empleados_limite CHECK (empleados_actuales <= limite_empleados)
);

COMMENT ON TABLE suscripciones IS 'Gestión de suscripciones empresariales';

-- ==================================================
-- 17. TABLA: logs_auditoria
-- Descripción: Auditoría de cambios en el sistema
-- ==================================================
CREATE TABLE logs_auditoria (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
  empresa_id UUID REFERENCES empresas(id) ON DELETE SET NULL,
  accion TEXT NOT NULL,
  entidad_tipo TEXT NOT NULL,
  entidad_id UUID,
  cambios_anteriores JSONB,
  cambios_nuevos JSONB,
  ip_address INET,
  user_agent TEXT,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE logs_auditoria IS 'Registro de auditoría para compliance y seguridad';
CREATE INDEX idx_logs_fecha ON logs_auditoria(fecha_creacion DESC);

-- ==================================================
-- 18. TABLA: tokens_2fa
-- Descripción: Tokens para autenticación de dos factores
-- ==================================================
CREATE TABLE tokens_2fa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID UNIQUE NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  codigo_secreto TEXT NOT NULL,
  codigo_backup TEXT[] DEFAULT ARRAY[]::TEXT[],
  habilitado BOOLEAN DEFAULT FALSE,
  metodo TEXT DEFAULT 'totp',
  fecha_activacion TIMESTAMP WITH TIME ZONE,
  fecha_ultimo_uso TIMESTAMP WITH TIME ZONE,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_metodo_2fa CHECK (metodo IN ('totp', 'sms', 'email'))
);

COMMENT ON TABLE tokens_2fa IS 'Autenticación de dos factores';

-- ==================================================
-- 19. TABLA: sesiones_activas
-- Descripción: Sesiones de usuario activas
-- ==================================================
CREATE TABLE sesiones_activas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  token_sesion TEXT NOT NULL UNIQUE,
  ip_address INET,
  user_agent TEXT,
  dispositivo TEXT,
  fecha_login TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_ultima_actividad TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_expiracion TIMESTAMP WITH TIME ZONE NOT NULL
);

COMMENT ON TABLE sesiones_activas IS 'Gestión de sesiones activas de usuarios';
CREATE INDEX idx_sesiones_activas_usuario ON sesiones_activas(usuario_id);
CREATE INDEX idx_sesiones_activas_expiracion ON sesiones_activas(fecha_expiracion);

-- ==================================================
-- 20. TABLA: archivos
-- Descripción: Gestión de archivos subidos
-- ==================================================
CREATE TABLE archivos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  entidad_tipo TEXT NOT NULL,
  entidad_id UUID,
  nombre_archivo TEXT NOT NULL,
  ruta_storage TEXT NOT NULL,
  tipo_mime TEXT NOT NULL,
  tamano_bytes BIGINT NOT NULL,
  metadata JSONB,
  publico BOOLEAN DEFAULT FALSE,
  url_publica TEXT,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_tamano CHECK (tamano_bytes > 0),
  CONSTRAINT chk_entidad_tipo CHECK (entidad_tipo IN ('perfil', 'mensaje', 'recurso', 'sesion', 'evaluacion'))
);

COMMENT ON TABLE archivos IS 'Gestión centralizada de archivos en storage';

-- ==================================================
-- 21. TABLA: favoritos
-- Descripción: Recursos marcados como favoritos
-- ==================================================
CREATE TABLE favoritos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  recurso_id UUID NOT NULL REFERENCES recursos(id) ON DELETE CASCADE,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT uq_favorito UNIQUE (usuario_id, recurso_id)
);

COMMENT ON TABLE favoritos IS 'Recursos favoritos de usuarios';

-- ==================================================
-- 22. TABLA: especialidades
-- Descripción: Catálogo de especialidades profesionales
-- ==================================================
CREATE TABLE especialidades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT UNIQUE NOT NULL,
  descripcion TEXT,
  categoria TEXT,
  icono TEXT,
  activa BOOLEAN DEFAULT TRUE,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE especialidades IS 'Catálogo de especialidades terapéuticas';

-- ==================================================
-- 23. TABLA: departamentos_empresa
-- Descripción: Departamentos dentro de empresas
-- ==================================================
CREATE TABLE departamentos_empresa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  limite_empleados INTEGER,
  activo BOOLEAN DEFAULT TRUE,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT uq_departamento_empresa UNIQUE (empresa_id, nombre)
);

COMMENT ON TABLE departamentos_empresa IS 'Estructura organizacional de empresas';

-- Agregar foreign key a usuarios y empleados
ALTER TABLE usuarios ADD CONSTRAINT fk_departamento
  FOREIGN KEY (departamento_id) REFERENCES departamentos_empresa(id) ON DELETE SET NULL;
ALTER TABLE empleados ADD CONSTRAINT fk_empleado_departamento
  FOREIGN KEY (departamento_id) REFERENCES departamentos_empresa(id) ON DELETE SET NULL;

-- ==================================================
-- 24. TABLA: permisos_rol
-- Descripción: Sistema de permisos basado en roles
-- ==================================================
CREATE TABLE permisos_rol (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rol TEXT NOT NULL,
  recurso TEXT NOT NULL,
  accion TEXT NOT NULL,
  permitido BOOLEAN DEFAULT TRUE,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_rol_permiso CHECK (rol IN ('admin', 'company_admin', 'professional', 'user')),
  CONSTRAINT chk_accion_permiso CHECK (accion IN ('crear', 'leer', 'actualizar', 'eliminar', 'ejecutar')),
  CONSTRAINT uq_permiso UNIQUE (rol, recurso, accion)
);

COMMENT ON TABLE permisos_rol IS 'Control de acceso basado en roles (RBAC)';

-- ==================================================
-- 25. TABLA: configuracion_empresa
-- Descripción: Configuración personalizada por empresa
-- ==================================================
CREATE TABLE configuracion_empresa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  clave TEXT NOT NULL,
  valor JSONB NOT NULL,
  tipo_dato TEXT NOT NULL,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_tipo_dato CHECK (tipo_dato IN ('string', 'number', 'boolean', 'json', 'array')),
  CONSTRAINT uq_config_empresa UNIQUE (empresa_id, clave)
);

COMMENT ON TABLE configuracion_empresa IS 'Configuración flexible por empresa (key-value store)';

-- ==================================================
-- 26. TABLA: templates_correo
-- Descripción: Plantillas de correos electrónicos
-- ==================================================
CREATE TABLE templates_correo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  codigo_unico TEXT UNIQUE NOT NULL,
  asunto TEXT NOT NULL,
  cuerpo_html TEXT NOT NULL,
  cuerpo_texto TEXT NOT NULL,
  variables TEXT[] DEFAULT ARRAY[]::TEXT[],
  idioma TEXT DEFAULT 'es',
  activo BOOLEAN DEFAULT TRUE,
  fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT chk_idioma_template CHECK (idioma IN ('es', 'en'))
);

COMMENT ON TABLE templates_correo IS 'Plantillas de correo para notificaciones';

-- ==================================================
-- SECCIÓN 3: ÍNDICES PARA OPTIMIZACIÓN
-- ==================================================

-- Índices para usuarios
CREATE INDEX idx_usuarios_empresa ON usuarios(empresa_id) WHERE activo = TRUE;
CREATE INDEX idx_usuarios_rol ON usuarios(rol);
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_departamento ON usuarios(departamento_id);

-- Índices para profesionales
CREATE INDEX idx_profesionales_usuario ON profesionales(usuario_id);
CREATE INDEX idx_profesionales_disponible ON profesionales(disponible, verificado);
CREATE INDEX idx_profesionales_especialidades ON profesionales USING GIN(especialidades);
CREATE INDEX idx_profesionales_calificacion ON profesionales(calificacion_promedio DESC);

-- Índices para sesiones_terapia
CREATE INDEX idx_sesiones_terapia_usuario ON sesiones_terapia(usuario_id);
CREATE INDEX idx_sesiones_terapia_profesional ON sesiones_terapia(profesional_id);
CREATE INDEX idx_sesiones_terapia_fecha ON sesiones_terapia(fecha_programada DESC);
CREATE INDEX idx_sesiones_estado ON sesiones_terapia(estado);
CREATE INDEX idx_sesiones_tipo ON sesiones_terapia(tipo);

-- Índices para evaluaciones
CREATE INDEX idx_evaluaciones_usuario ON evaluaciones(usuario_id);
CREATE INDEX idx_evaluaciones_tipo ON evaluaciones(tipo_evaluacion);
CREATE INDEX idx_evaluaciones_fecha ON evaluaciones(fecha_creacion DESC);
CREATE INDEX idx_evaluaciones_severidad ON evaluaciones(severidad) WHERE alerta_generada = TRUE;

-- Índices para conversaciones
CREATE INDEX idx_conversaciones_usuario ON conversaciones(usuario_id);
CREATE INDEX idx_conversaciones_profesional ON conversaciones(profesional_id);
CREATE INDEX idx_conversaciones_estado ON conversaciones(estado);

-- Índices para mensajes
CREATE INDEX idx_mensajes_conversacion ON mensajes(conversacion_id);
CREATE INDEX idx_mensajes_remitente ON mensajes(remitente_id);
CREATE INDEX idx_mensajes_fecha ON mensajes(fecha_creacion DESC);
CREATE INDEX idx_mensajes_no_leidos ON mensajes(conversacion_id) WHERE leido = FALSE;

-- Índices para notificaciones
CREATE INDEX idx_notificaciones_usuario ON notificaciones(usuario_id);
CREATE INDEX idx_notificaciones_leida ON notificaciones(leida);
CREATE INDEX idx_notificaciones_tipo ON notificaciones(tipo);
CREATE INDEX idx_notificaciones_fecha ON notificaciones(fecha_creacion DESC);

-- Índices para pagos
CREATE INDEX idx_pagos_empresa ON pagos(empresa_id);
CREATE INDEX idx_pagos_usuario ON pagos(usuario_id);
CREATE INDEX idx_pagos_estado ON pagos(estado);
CREATE INDEX idx_pagos_fecha ON pagos(fecha_creacion DESC);
CREATE INDEX idx_pagos_stripe ON pagos(stripe_payment_id) WHERE stripe_payment_id IS NOT NULL;

-- Índices para disponibilidad_profesional
CREATE INDEX idx_disponibilidad_profesional ON disponibilidad_profesional(profesional_id);
CREATE INDEX idx_disponibilidad_dia ON disponibilidad_profesional(dia_semana);

-- Índices para reseñas
CREATE INDEX idx_reseñas_profesional ON reseñas(profesional_id);
CREATE INDEX idx_reseñas_usuario ON reseñas(usuario_id);
CREATE INDEX idx_reseñas_calificacion ON reseñas(calificacion);
CREATE INDEX idx_reseñas_aprobadas ON reseñas(aprobada) WHERE aprobada = TRUE;

-- Índices para recursos
CREATE INDEX idx_recursos_categoria ON recursos(categoria);
CREATE INDEX idx_recursos_publicado ON recursos(publicado) WHERE publicado = TRUE;
CREATE INDEX idx_recursos_etiquetas ON recursos USING GIN(etiquetas);
CREATE INDEX idx_recursos_idioma ON recursos(idioma);
CREATE INDEX idx_recursos_visualizaciones ON recursos(visualizaciones DESC);

-- Índices para empleados
CREATE INDEX idx_empleados_usuario ON empleados(usuario_id);
CREATE INDEX idx_empleados_empresa ON empleados(empresa_id);
CREATE INDEX idx_empleados_departamento ON empleados(departamento_id);
CREATE INDEX idx_empleados_activo ON empleados(activo);

-- Índices para citas
CREATE INDEX idx_citas_usuario ON citas(usuario_id);
CREATE INDEX idx_citas_profesional ON citas(profesional_id);
CREATE INDEX idx_citas_fecha ON citas(fecha_hora DESC);
CREATE INDEX idx_citas_estado ON citas(estado);

-- Índices para suscripciones
CREATE INDEX idx_suscripciones_empresa ON suscripciones(empresa_id);
CREATE INDEX idx_suscripciones_estado ON suscripciones(estado);
CREATE INDEX idx_suscripciones_stripe ON suscripciones(stripe_subscription_id);

-- Índices para logs_auditoria
CREATE INDEX idx_auditoria_usuario ON logs_auditoria(usuario_id);
CREATE INDEX idx_auditoria_empresa ON logs_auditoria(empresa_id);
CREATE INDEX idx_auditoria_entidad ON logs_auditoria(entidad_tipo, entidad_id);

-- Índices para archivos
CREATE INDEX idx_archivos_usuario ON archivos(usuario_id);
CREATE INDEX idx_archivos_entidad ON archivos(entidad_tipo, entidad_id);

-- Índices para favoritos
CREATE INDEX idx_favoritos_usuario ON favoritos(usuario_id);
CREATE INDEX idx_favoritos_recurso ON favoritos(recurso_id);

-- Índices para departamentos_empresa
CREATE INDEX idx_departamentos_empresa ON departamentos_empresa(empresa_id);

-- Índice de búsqueda de texto completo para recursos
CREATE INDEX idx_recursos_busqueda ON recursos USING GIN(
  to_tsvector('spanish', coalesce(titulo, '') || ' ' || coalesce(descripcion, ''))
);

-- ==================================================
-- SECCIÓN 4: HABILITAR ROW LEVEL SECURITY
-- ==================================================

ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE profesionales ENABLE ROW LEVEL SECURITY;
ALTER TABLE sesiones_terapia ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensajes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notificaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagos ENABLE ROW LEVEL SECURITY;
ALTER TABLE disponibilidad_profesional ENABLE ROW LEVEL SECURITY;
ALTER TABLE reseñas ENABLE ROW LEVEL SECURITY;
ALTER TABLE recursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE empleados ENABLE ROW LEVEL SECURITY;
ALTER TABLE citas ENABLE ROW LEVEL SECURITY;
ALTER TABLE resultados_evaluaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE suscripciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs_auditoria ENABLE ROW LEVEL SECURITY;
ALTER TABLE tokens_2fa ENABLE ROW LEVEL SECURITY;
ALTER TABLE sesiones_activas ENABLE ROW LEVEL SECURITY;
ALTER TABLE archivos ENABLE ROW LEVEL SECURITY;
ALTER TABLE favoritos ENABLE ROW LEVEL SECURITY;
ALTER TABLE especialidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE departamentos_empresa ENABLE ROW LEVEL SECURITY;
ALTER TABLE permisos_rol ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracion_empresa ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates_correo ENABLE ROW LEVEL SECURITY;

-- ==================================================
-- SECCIÓN 5: POLÍTICAS RLS
-- ==================================================

-- ==================== EMPRESAS ====================
CREATE POLICY "usuarios_ven_su_empresa" ON empresas
  FOR SELECT USING (
    id IN (SELECT empresa_id FROM usuarios WHERE id = auth.uid())
  );

CREATE POLICY "admins_gestionan_empresas" ON empresas
  FOR ALL USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 'admin')
  );

-- ==================== USUARIOS ====================
CREATE POLICY "usuarios_ven_su_perfil" ON usuarios
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "usuarios_actualizan_su_perfil" ON usuarios
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "usuarios_insertan_su_perfil" ON usuarios
  FOR INSERT WITH CHECK (id = auth.uid());

CREATE POLICY "company_admins_ven_empleados" ON usuarios
  FOR SELECT USING (
    empresa_id IN (
      SELECT empresa_id FROM usuarios
      WHERE id = auth.uid() AND rol IN ('company_admin', 'admin')
    )
  );

-- ==================== PROFESIONALES ====================
CREATE POLICY "todos_ven_profesionales_disponibles" ON profesionales
  FOR SELECT USING (disponible = TRUE AND verificado = TRUE);

CREATE POLICY "profesionales_ven_su_perfil" ON profesionales
  FOR SELECT USING (usuario_id = auth.uid());

CREATE POLICY "profesionales_actualizan_su_perfil" ON profesionales
  FOR UPDATE USING (usuario_id = auth.uid());

CREATE POLICY "admins_gestionan_profesionales" ON profesionales
  FOR ALL USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 'admin')
  );

-- ==================== SESIONES TERAPIA ====================
CREATE POLICY "usuarios_ven_sus_sesiones" ON sesiones_terapia
  FOR SELECT USING (
    usuario_id = auth.uid() OR
    profesional_id IN (SELECT id FROM profesionales WHERE usuario_id = auth.uid())
  );

CREATE POLICY "usuarios_crean_sesiones" ON sesiones_terapia
  FOR INSERT WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "participantes_actualizan_sesiones" ON sesiones_terapia
  FOR UPDATE USING (
    usuario_id = auth.uid() OR
    profesional_id IN (SELECT id FROM profesionales WHERE usuario_id = auth.uid())
  );

-- ==================== EVALUACIONES ====================
CREATE POLICY "usuarios_ven_sus_evaluaciones" ON evaluaciones
  FOR SELECT USING (usuario_id = auth.uid());

CREATE POLICY "usuarios_crean_evaluaciones" ON evaluaciones
  FOR INSERT WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "profesionales_ven_evaluaciones_pacientes" ON evaluaciones
  FOR SELECT USING (
    usuario_id IN (
      SELECT usuario_id FROM sesiones_terapia
      WHERE profesional_id IN (SELECT id FROM profesionales WHERE usuario_id = auth.uid())
    )
  );

-- ==================== CONVERSACIONES ====================
CREATE POLICY "participantes_ven_conversaciones" ON conversaciones
  FOR SELECT USING (
    usuario_id = auth.uid() OR
    profesional_id IN (SELECT id FROM profesionales WHERE usuario_id = auth.uid())
  );

CREATE POLICY "usuarios_crean_conversaciones" ON conversaciones
  FOR INSERT WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "participantes_actualizan_conversaciones" ON conversaciones
  FOR UPDATE USING (
    usuario_id = auth.uid() OR
    profesional_id IN (SELECT id FROM profesionales WHERE usuario_id = auth.uid())
  );

-- ==================== MENSAJES ====================
CREATE POLICY "participantes_ven_mensajes" ON mensajes
  FOR SELECT USING (
    conversacion_id IN (
      SELECT id FROM conversaciones
      WHERE usuario_id = auth.uid() OR
      profesional_id IN (SELECT id FROM profesionales WHERE usuario_id = auth.uid())
    )
  );

CREATE POLICY "participantes_envian_mensajes" ON mensajes
  FOR INSERT WITH CHECK (
    remitente_id = auth.uid() AND
    conversacion_id IN (
      SELECT id FROM conversaciones
      WHERE usuario_id = auth.uid() OR
      profesional_id IN (SELECT id FROM profesionales WHERE usuario_id = auth.uid())
    )
  );

CREATE POLICY "remitentes_actualizan_mensajes" ON mensajes
  FOR UPDATE USING (remitente_id = auth.uid());

-- ==================== NOTIFICACIONES ====================
CREATE POLICY "usuarios_ven_sus_notificaciones" ON notificaciones
  FOR SELECT USING (usuario_id = auth.uid());

CREATE POLICY "usuarios_actualizan_notificaciones" ON notificaciones
  FOR UPDATE USING (usuario_id = auth.uid());

CREATE POLICY "sistema_crea_notificaciones" ON notificaciones
  FOR INSERT WITH CHECK (TRUE);

-- ==================== PAGOS ====================
CREATE POLICY "usuarios_ven_sus_pagos" ON pagos
  FOR SELECT USING (
    usuario_id = auth.uid() OR
    empresa_id IN (SELECT empresa_id FROM usuarios WHERE id = auth.uid())
  );

CREATE POLICY "company_admins_ven_pagos_empresa" ON pagos
  FOR SELECT USING (
    empresa_id IN (
      SELECT empresa_id FROM usuarios
      WHERE id = auth.uid() AND rol IN ('company_admin', 'admin')
    )
  );

-- ==================== DISPONIBILIDAD ====================
CREATE POLICY "todos_ven_disponibilidad" ON disponibilidad_profesional
  FOR SELECT USING (TRUE);

CREATE POLICY "profesionales_gestionan_disponibilidad" ON disponibilidad_profesional
  FOR ALL USING (
    profesional_id IN (SELECT id FROM profesionales WHERE usuario_id = auth.uid())
  );

-- ==================== RESEÑAS ====================
CREATE POLICY "todos_ven_reseñas_aprobadas" ON reseñas
  FOR SELECT USING (aprobada = TRUE);

CREATE POLICY "usuarios_crean_reseñas" ON reseñas
  FOR INSERT WITH CHECK (
    usuario_id = auth.uid() AND
    sesion_id IN (SELECT id FROM sesiones_terapia WHERE usuario_id = auth.uid() AND estado = 'completada')
  );

CREATE POLICY "usuarios_ven_sus_reseñas" ON reseñas
  FOR SELECT USING (usuario_id = auth.uid());

-- ==================== RECURSOS ====================
CREATE POLICY "todos_ven_recursos_publicados" ON recursos
  FOR SELECT USING (publicado = TRUE);

CREATE POLICY "autores_ven_sus_recursos" ON recursos
  FOR SELECT USING (autor_id = auth.uid());

CREATE POLICY "profesionales_crean_recursos" ON recursos
  FOR INSERT WITH CHECK (
    autor_id = auth.uid() AND
    EXISTS (SELECT 1 FROM profesionales WHERE usuario_id = auth.uid())
  );

CREATE POLICY "autores_actualizan_recursos" ON recursos
  FOR UPDATE USING (autor_id = auth.uid());

-- ==================== EMPLEADOS ====================
CREATE POLICY "empleados_ven_su_registro" ON empleados
  FOR SELECT USING (usuario_id = auth.uid());

CREATE POLICY "company_admins_gestionan_empleados" ON empleados
  FOR ALL USING (
    empresa_id IN (
      SELECT empresa_id FROM usuarios
      WHERE id = auth.uid() AND rol IN ('company_admin', 'admin')
    )
  );

-- ==================== CITAS ====================
CREATE POLICY "usuarios_ven_sus_citas" ON citas
  FOR SELECT USING (
    usuario_id = auth.uid() OR
    profesional_id IN (SELECT id FROM profesionales WHERE usuario_id = auth.uid())
  );

CREATE POLICY "usuarios_crean_citas" ON citas
  FOR INSERT WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "participantes_actualizan_citas" ON citas
  FOR UPDATE USING (
    usuario_id = auth.uid() OR
    profesional_id IN (SELECT id FROM profesionales WHERE usuario_id = auth.uid())
  );

-- ==================== RESULTADOS EVALUACIONES ====================
CREATE POLICY "usuarios_ven_resultados" ON resultados_evaluaciones
  FOR SELECT USING (usuario_id = auth.uid());

CREATE POLICY "profesionales_ven_resultados_pacientes" ON resultados_evaluaciones
  FOR SELECT USING (
    profesional_asignado_id IN (SELECT id FROM profesionales WHERE usuario_id = auth.uid())
  );

-- ==================== SUSCRIPCIONES ====================
CREATE POLICY "company_admins_ven_suscripciones" ON suscripciones
  FOR SELECT USING (
    empresa_id IN (
      SELECT empresa_id FROM usuarios
      WHERE id = auth.uid() AND rol IN ('company_admin', 'admin')
    )
  );

-- ==================== LOGS AUDITORIA ====================
CREATE POLICY "admins_ven_logs" ON logs_auditoria
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 'admin')
  );

-- ==================== TOKENS 2FA ====================
CREATE POLICY "usuarios_gestionan_su_2fa" ON tokens_2fa
  FOR ALL USING (usuario_id = auth.uid());

-- ==================== SESIONES ACTIVAS ====================
CREATE POLICY "usuarios_ven_sus_sesiones_activas" ON sesiones_activas
  FOR SELECT USING (usuario_id = auth.uid());

CREATE POLICY "usuarios_gestionan_sesiones" ON sesiones_activas
  FOR ALL USING (usuario_id = auth.uid());

-- ==================== ARCHIVOS ====================
CREATE POLICY "usuarios_ven_archivos_publicos" ON archivos
  FOR SELECT USING (publico = TRUE);

CREATE POLICY "usuarios_ven_sus_archivos" ON archivos
  FOR SELECT USING (usuario_id = auth.uid());

CREATE POLICY "usuarios_suben_archivos" ON archivos
  FOR INSERT WITH CHECK (usuario_id = auth.uid());

CREATE POLICY "usuarios_gestionan_archivos" ON archivos
  FOR ALL USING (usuario_id = auth.uid());

-- ==================== FAVORITOS ====================
CREATE POLICY "usuarios_ven_favoritos" ON favoritos
  FOR SELECT USING (usuario_id = auth.uid());

CREATE POLICY "usuarios_gestionan_favoritos" ON favoritos
  FOR ALL USING (usuario_id = auth.uid());

-- ==================== ESPECIALIDADES ====================
CREATE POLICY "todos_ven_especialidades_activas" ON especialidades
  FOR SELECT USING (activa = TRUE);

CREATE POLICY "admins_gestionan_especialidades" ON especialidades
  FOR ALL USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 'admin')
  );

-- ==================== DEPARTAMENTOS EMPRESA ====================
CREATE POLICY "empleados_ven_departamentos_empresa" ON departamentos_empresa
  FOR SELECT USING (
    empresa_id IN (SELECT empresa_id FROM usuarios WHERE id = auth.uid())
  );

CREATE POLICY "company_admins_gestionan_departamentos" ON departamentos_empresa
  FOR ALL USING (
    empresa_id IN (
      SELECT empresa_id FROM usuarios
      WHERE id = auth.uid() AND rol IN ('company_admin', 'admin')
    )
  );

-- ==================== PERMISOS ROL ====================
CREATE POLICY "todos_leen_permisos" ON permisos_rol
  FOR SELECT USING (TRUE);

CREATE POLICY "admins_gestionan_permisos" ON permisos_rol
  FOR ALL USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 'admin')
  );

-- ==================== CONFIGURACION EMPRESA ====================
CREATE POLICY "company_admins_ven_configuracion" ON configuracion_empresa
  FOR SELECT USING (
    empresa_id IN (
      SELECT empresa_id FROM usuarios
      WHERE id = auth.uid() AND rol IN ('company_admin', 'admin')
    )
  );

CREATE POLICY "company_admins_gestionan_configuracion" ON configuracion_empresa
  FOR ALL USING (
    empresa_id IN (
      SELECT empresa_id FROM usuarios
      WHERE id = auth.uid() AND rol IN ('company_admin', 'admin')
    )
  );

-- ==================== TEMPLATES CORREO ====================
CREATE POLICY "todos_leen_templates_activos" ON templates_correo
  FOR SELECT USING (activo = TRUE);

CREATE POLICY "admins_gestionan_templates" ON templates_correo
  FOR ALL USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND rol = 'admin')
  );

-- ==================================================
-- SECCIÓN 6: FUNCIONES
-- ==================================================

-- Función: Actualizar campo updated_at automáticamente
CREATE OR REPLACE FUNCTION actualizar_fecha_actualizacion()
RETURNS TRIGGER AS $$
BEGIN
  NEW.fecha_actualizacion = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION actualizar_fecha_actualizacion() IS 'Actualiza automáticamente el campo fecha_actualizacion';

-- Función: Registrar auditoría automáticamente
CREATE OR REPLACE FUNCTION registrar_auditoria()
RETURNS TRIGGER AS $$
DECLARE
  usuario_actual UUID;
  empresa_actual UUID;
BEGIN
  usuario_actual := auth.uid();

  -- Obtener empresa del usuario
  SELECT empresa_id INTO empresa_actual FROM usuarios WHERE id = usuario_actual;

  IF (TG_OP = 'DELETE') THEN
    INSERT INTO logs_auditoria (
      usuario_id, empresa_id, accion, entidad_tipo, entidad_id, cambios_anteriores
    ) VALUES (
      usuario_actual, empresa_actual, 'DELETE', TG_TABLE_NAME, OLD.id, row_to_json(OLD)
    );
    RETURN OLD;
  ELSIF (TG_OP = 'UPDATE') THEN
    INSERT INTO logs_auditoria (
      usuario_id, empresa_id, accion, entidad_tipo, entidad_id,
      cambios_anteriores, cambios_nuevos
    ) VALUES (
      usuario_actual, empresa_actual, 'UPDATE', TG_TABLE_NAME, NEW.id,
      row_to_json(OLD), row_to_json(NEW)
    );
    RETURN NEW;
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO logs_auditoria (
      usuario_id, empresa_id, accion, entidad_tipo, entidad_id, cambios_nuevos
    ) VALUES (
      usuario_actual, empresa_actual, 'INSERT', TG_TABLE_NAME, NEW.id, row_to_json(NEW)
    );
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION registrar_auditoria() IS 'Registra cambios en logs_auditoria automáticamente';

-- Función: Validar límite de empleados
CREATE OR REPLACE FUNCTION validar_limite_empleados()
RETURNS TRIGGER AS $$
DECLARE
  limite INTEGER;
  actuales INTEGER;
BEGIN
  -- Obtener límite de la empresa
  SELECT limite_empleados INTO limite
  FROM empresas
  WHERE id = NEW.empresa_id;

  -- Contar empleados actuales activos
  SELECT COUNT(*) INTO actuales
  FROM empleados
  WHERE empresa_id = NEW.empresa_id AND activo = TRUE;

  -- Validar si se excede el límite
  IF actuales >= limite THEN
    RAISE EXCEPTION 'Se ha alcanzado el límite de empleados (%) para esta empresa', limite;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION validar_limite_empleados() IS 'Valida que no se exceda el límite de empleados por empresa';

-- Función: Actualizar estadísticas de profesional
CREATE OR REPLACE FUNCTION actualizar_estadisticas_profesional()
RETURNS TRIGGER AS $$
DECLARE
  prof_id UUID;
  promedio DECIMAL(3,2);
  total INT;
BEGIN
  -- Obtener profesional_id según la operación
  IF (TG_OP = 'DELETE') THEN
    prof_id := OLD.profesional_id;
  ELSE
    prof_id := NEW.profesional_id;
  END IF;

  -- Calcular promedio de calificaciones aprobadas
  SELECT
    COALESCE(AVG(calificacion), 0),
    COUNT(*)
  INTO promedio, total
  FROM reseñas
  WHERE profesional_id = prof_id AND aprobada = TRUE;

  -- Actualizar profesional
  UPDATE profesionales
  SET
    calificacion_promedio = promedio,
    total_sesiones = (
      SELECT COUNT(*) FROM sesiones_terapia
      WHERE profesional_id = prof_id AND estado = 'completada'
    )
  WHERE id = prof_id;

  IF (TG_OP = 'DELETE') THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION actualizar_estadisticas_profesional() IS 'Actualiza calificación y total de sesiones del profesional';

-- Función: Crear usuario automáticamente en registro
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.usuarios (id, email, nombre_completo)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nombre_completo', NEW.raw_user_meta_data->>'full_name')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION handle_new_user() IS 'Crea perfil de usuario automáticamente al registrarse';

-- Función: Incrementar contador de favoritos
CREATE OR REPLACE FUNCTION actualizar_contador_favoritos()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    UPDATE recursos
    SET favoritos_count = favoritos_count + 1
    WHERE id = NEW.recurso_id;
    RETURN NEW;
  ELSIF (TG_OP = 'DELETE') THEN
    UPDATE recursos
    SET favoritos_count = GREATEST(favoritos_count - 1, 0)
    WHERE id = OLD.recurso_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION actualizar_contador_favoritos() IS 'Mantiene sincronizado el contador de favoritos';

-- Función: Actualizar último mensaje de conversación
CREATE OR REPLACE FUNCTION actualizar_ultimo_mensaje()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversaciones
  SET ultimo_mensaje_fecha = NEW.fecha_creacion
  WHERE id = NEW.conversacion_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION actualizar_ultimo_mensaje() IS 'Actualiza la fecha del último mensaje en conversaciones';

-- Función: Limpiar sesiones expiradas
CREATE OR REPLACE FUNCTION limpiar_sesiones_expiradas()
RETURNS INTEGER AS $$
DECLARE
  eliminadas INTEGER;
BEGIN
  DELETE FROM sesiones_activas
  WHERE fecha_expiracion < NOW();

  GET DIAGNOSTICS eliminadas = ROW_COUNT;
  RETURN eliminadas;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION limpiar_sesiones_expiradas() IS 'Elimina sesiones activas expiradas';

-- Función: Validar disponibilidad profesional
CREATE OR REPLACE FUNCTION validar_disponibilidad_profesional(
  prof_id UUID,
  fecha_hora_cita TIMESTAMP WITH TIME ZONE,
  duracion INT
)
RETURNS BOOLEAN AS $$
DECLARE
  conflictos INTEGER;
BEGIN
  -- Verificar si hay conflictos de horario
  SELECT COUNT(*) INTO conflictos
  FROM citas
  WHERE profesional_id = prof_id
    AND estado IN ('confirmada', 'en_progreso')
    AND (
      (fecha_hora >= fecha_hora_cita AND fecha_hora < fecha_hora_cita + (duracion || ' minutes')::INTERVAL) OR
      (fecha_hora + (duracion_minutos || ' minutes')::INTERVAL > fecha_hora_cita
       AND fecha_hora < fecha_hora_cita)
    );

  RETURN conflictos = 0;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION validar_disponibilidad_profesional IS 'Valida que el profesional esté disponible en el horario solicitado';

-- ==================================================
-- SECCIÓN 7: TRIGGERS
-- ==================================================

-- Triggers para fecha_actualizacion
CREATE TRIGGER trigger_empresas_actualizacion
  BEFORE UPDATE ON empresas
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_fecha_actualizacion();

CREATE TRIGGER trigger_usuarios_actualizacion
  BEFORE UPDATE ON usuarios
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_fecha_actualizacion();

CREATE TRIGGER trigger_profesionales_actualizacion
  BEFORE UPDATE ON profesionales
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_fecha_actualizacion();

CREATE TRIGGER trigger_sesiones_actualizacion
  BEFORE UPDATE ON sesiones_terapia
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_fecha_actualizacion();

CREATE TRIGGER trigger_conversaciones_actualizacion
  BEFORE UPDATE ON conversaciones
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_fecha_actualizacion();

CREATE TRIGGER trigger_recursos_actualizacion
  BEFORE UPDATE ON recursos
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_fecha_actualizacion();

CREATE TRIGGER trigger_empleados_actualizacion
  BEFORE UPDATE ON empleados
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_fecha_actualizacion();

CREATE TRIGGER trigger_citas_actualizacion
  BEFORE UPDATE ON citas
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_fecha_actualizacion();

CREATE TRIGGER trigger_suscripciones_actualizacion
  BEFORE UPDATE ON suscripciones
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_fecha_actualizacion();

CREATE TRIGGER trigger_configuracion_actualizacion
  BEFORE UPDATE ON configuracion_empresa
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_fecha_actualizacion();

CREATE TRIGGER trigger_templates_actualizacion
  BEFORE UPDATE ON templates_correo
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_fecha_actualizacion();

-- Trigger para crear usuario automáticamente
CREATE TRIGGER trigger_crear_usuario_auth
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Trigger para actualizar estadísticas de profesional
CREATE TRIGGER trigger_actualizar_stats_profesional_insert
  AFTER INSERT ON reseñas
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_estadisticas_profesional();

CREATE TRIGGER trigger_actualizar_stats_profesional_update
  AFTER UPDATE ON reseñas
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_estadisticas_profesional();

CREATE TRIGGER trigger_actualizar_stats_profesional_delete
  AFTER DELETE ON reseñas
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_estadisticas_profesional();

-- Trigger para validar límite de empleados
CREATE TRIGGER trigger_validar_limite_empleados
  BEFORE INSERT ON empleados
  FOR EACH ROW
  EXECUTE FUNCTION validar_limite_empleados();

-- Trigger para contador de favoritos
CREATE TRIGGER trigger_favoritos_insert
  AFTER INSERT ON favoritos
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_contador_favoritos();

CREATE TRIGGER trigger_favoritos_delete
  AFTER DELETE ON favoritos
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_contador_favoritos();

-- Trigger para actualizar último mensaje
CREATE TRIGGER trigger_ultimo_mensaje
  AFTER INSERT ON mensajes
  FOR EACH ROW
  EXECUTE FUNCTION actualizar_ultimo_mensaje();

-- Triggers de auditoría (solo para tablas críticas)
CREATE TRIGGER trigger_auditoria_empresas
  AFTER INSERT OR UPDATE OR DELETE ON empresas
  FOR EACH ROW
  EXECUTE FUNCTION registrar_auditoria();

CREATE TRIGGER trigger_auditoria_usuarios
  AFTER UPDATE OR DELETE ON usuarios
  FOR EACH ROW
  EXECUTE FUNCTION registrar_auditoria();

CREATE TRIGGER trigger_auditoria_suscripciones
  AFTER INSERT OR UPDATE OR DELETE ON suscripciones
  FOR EACH ROW
  EXECUTE FUNCTION registrar_auditoria();

-- ==================================================
-- SECCIÓN 8: VISTAS MATERIALIZADAS
-- ==================================================

-- Vista: Métricas por empresa
CREATE MATERIALIZED VIEW metricas_empresa AS
SELECT
  e.id AS empresa_id,
  e.nombre AS empresa_nombre,
  COUNT(DISTINCT em.id) AS total_empleados,
  COUNT(DISTINCT em.id) FILTER (WHERE em.activo = TRUE) AS empleados_activos,
  COUNT(DISTINCT s.id) AS total_sesiones,
  COUNT(DISTINCT s.id) FILTER (WHERE s.estado = 'completada') AS sesiones_completadas,
  COUNT(DISTINCT ev.id) AS total_evaluaciones,
  COALESCE(AVG(r.calificacion), 0) AS calificacion_promedio_servicios,
  e.fecha_creacion
FROM empresas e
LEFT JOIN empleados em ON e.id = em.empresa_id
LEFT JOIN usuarios u ON em.usuario_id = u.id
LEFT JOIN sesiones_terapia s ON u.id = s.usuario_id
LEFT JOIN evaluaciones ev ON u.id = ev.usuario_id
LEFT JOIN reseñas r ON s.id = r.sesion_id
WHERE e.activa = TRUE
GROUP BY e.id, e.nombre, e.fecha_creacion;

CREATE UNIQUE INDEX idx_metricas_empresa_id ON metricas_empresa(empresa_id);
COMMENT ON MATERIALIZED VIEW metricas_empresa IS 'Métricas agregadas por empresa';

-- Vista: Disponibilidad en tiempo real de profesionales
CREATE MATERIALIZED VIEW disponibilidad_tiempo_real AS
SELECT
  p.id AS profesional_id,
  u.nombre_completo,
  p.especialidades,
  p.calificacion_promedio,
  p.tarifa_hora,
  p.disponible,
  p.verificado,
  COALESCE(
    json_agg(
      json_build_object(
        'dia', dp.dia_semana,
        'inicio', dp.hora_inicio,
        'fin', dp.hora_fin,
        'bloqueado', dp.bloqueado
      ) ORDER BY dp.dia_semana, dp.hora_inicio
    ) FILTER (WHERE dp.id IS NOT NULL),
    '[]'::json
  ) AS horarios_disponibles,
  COUNT(DISTINCT c.id) FILTER (
    WHERE c.estado = 'confirmada' AND c.fecha_hora >= NOW()
  ) AS citas_proximas
FROM profesionales p
INNER JOIN usuarios u ON p.usuario_id = u.id
LEFT JOIN disponibilidad_profesional dp ON p.id = dp.profesional_id
LEFT JOIN citas c ON p.id = c.profesional_id
WHERE p.disponible = TRUE AND p.verificado = TRUE
GROUP BY p.id, u.nombre_completo, p.especialidades, p.calificacion_promedio,
         p.tarifa_hora, p.disponible, p.verificado;

CREATE UNIQUE INDEX idx_disponibilidad_profesional_id ON disponibilidad_tiempo_real(profesional_id);
COMMENT ON MATERIALIZED VIEW disponibilidad_tiempo_real IS 'Disponibilidad actual de profesionales';

-- Vista: Uso de la plataforma
CREATE MATERIALIZED VIEW uso_plataforma AS
SELECT
  DATE(fecha_creacion) AS fecha,
  COUNT(DISTINCT id) FILTER (WHERE tabla = 'usuarios') AS nuevos_usuarios,
  COUNT(DISTINCT id) FILTER (WHERE tabla = 'sesiones_terapia') AS sesiones_dia,
  COUNT(DISTINCT id) FILTER (WHERE tabla = 'evaluaciones') AS evaluaciones_dia,
  COUNT(DISTINCT id) FILTER (WHERE tabla = 'mensajes') AS mensajes_dia
FROM (
  SELECT id, fecha_creacion, 'usuarios' AS tabla FROM usuarios
  UNION ALL
  SELECT id, fecha_creacion, 'sesiones_terapia' FROM sesiones_terapia
  UNION ALL
  SELECT id, fecha_creacion, 'evaluaciones' FROM evaluaciones
  UNION ALL
  SELECT id, fecha_creacion, 'mensajes' FROM mensajes
) actividad
WHERE fecha_creacion >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY DATE(fecha_creacion)
ORDER BY fecha DESC;

CREATE UNIQUE INDEX idx_uso_plataforma_fecha ON uso_plataforma(fecha);
COMMENT ON MATERIALIZED VIEW uso_plataforma IS 'Estadísticas de uso diario de la plataforma (últimos 90 días)';

-- ==================================================
-- SECCIÓN 9: DATOS INICIALES
-- ==================================================

-- Insertar especialidades por defecto
INSERT INTO especialidades (nombre, descripcion, categoria, icono, activa) VALUES
  ('Ansiedad', 'Tratamiento de trastornos de ansiedad generalizada', 'clinica', 'brain', TRUE),
  ('Depresión', 'Tratamiento de trastornos depresivos', 'clinica', 'heart-pulse', TRUE),
  ('Estrés Laboral', 'Manejo del estrés relacionado con el trabajo', 'laboral', 'briefcase', TRUE),
  ('Burnout', 'Síndrome de desgaste profesional', 'laboral', 'flame', TRUE),
  ('Terapia de Pareja', 'Terapia para relaciones de pareja', 'relaciones', 'users', TRUE),
  ('Terapia Familiar', 'Terapia sistémica familiar', 'relaciones', 'home', TRUE),
  ('Adicciones', 'Tratamiento de conductas adictivas', 'clinica', 'shield-alert', TRUE),
  ('Trauma', 'Tratamiento de trastorno de estrés postraumático', 'clinica', 'shield', TRUE),
  ('Autoestima', 'Desarrollo de autoestima y autoconcepto', 'desarrollo', 'star', TRUE),
  ('Mindfulness', 'Atención plena y meditación', 'bienestar', 'lotus', TRUE)
ON CONFLICT (nombre) DO NOTHING;

-- Insertar permisos por rol
INSERT INTO permisos_rol (rol, recurso, accion, permitido) VALUES
  -- Admin - acceso total
  ('admin', '*', 'crear', TRUE),
  ('admin', '*', 'leer', TRUE),
  ('admin', '*', 'actualizar', TRUE),
  ('admin', '*', 'eliminar', TRUE),
  ('admin', '*', 'ejecutar', TRUE),

  -- Company Admin
  ('company_admin', 'empleados', 'crear', TRUE),
  ('company_admin', 'empleados', 'leer', TRUE),
  ('company_admin', 'empleados', 'actualizar', TRUE),
  ('company_admin', 'departamentos', 'crear', TRUE),
  ('company_admin', 'departamentos', 'leer', TRUE),
  ('company_admin', 'reportes', 'leer', TRUE),
  ('company_admin', 'suscripciones', 'leer', TRUE),

  -- Professional
  ('professional', 'sesiones', 'leer', TRUE),
  ('professional', 'sesiones', 'actualizar', TRUE),
  ('professional', 'disponibilidad', 'crear', TRUE),
  ('professional', 'disponibilidad', 'actualizar', TRUE),
  ('professional', 'evaluaciones', 'leer', TRUE),
  ('professional', 'recursos', 'crear', TRUE),

  -- User
  ('user', 'sesiones', 'crear', TRUE),
  ('user', 'sesiones', 'leer', TRUE),
  ('user', 'evaluaciones', 'crear', TRUE),
  ('user', 'evaluaciones', 'leer', TRUE),
  ('user', 'recursos', 'leer', TRUE),
  ('user', 'citas', 'crear', TRUE)
ON CONFLICT (rol, recurso, accion) DO NOTHING;

-- Insertar templates de correo básicos
INSERT INTO templates_correo (nombre, codigo_unico, asunto, cuerpo_html, cuerpo_texto, variables, idioma) VALUES
  (
    'Bienvenida Usuario',
    'bienvenida_usuario',
    'Bienvenido a MentalFit, {{nombre}}',
    '<h1>Hola {{nombre}}</h1><p>Te damos la bienvenida a MentalFit...</p>',
    'Hola {{nombre}}, Te damos la bienvenida a MentalFit...',
    ARRAY['nombre', 'empresa'],
    'es'
  ),
  (
    'Recordatorio Cita',
    'recordatorio_cita',
    'Recordatorio: Sesión programada para {{fecha}}',
    '<h1>Recordatorio de Sesión</h1><p>Tu sesión con {{profesional}} está programada para {{fecha}}...</p>',
    'Recordatorio: Tu sesión con {{profesional}} está programada para {{fecha}}...',
    ARRAY['nombre', 'profesional', 'fecha', 'hora', 'url'],
    'es'
  ),
  (
    'Confirmación Pago',
    'confirmacion_pago',
    'Confirmación de Pago - MentalFit',
    '<h1>Pago Confirmado</h1><p>Hemos recibido tu pago de {{monto}} {{moneda}}...</p>',
    'Pago Confirmado: Hemos recibido tu pago de {{monto}} {{moneda}}...',
    ARRAY['nombre', 'monto', 'moneda', 'factura_url'],
    'es'
  )
ON CONFLICT (codigo_unico) DO NOTHING;

-- ==================================================
-- FIN DEL ESQUEMA
-- ✅ SCHEMA COMPLETO EN ESPAÑOL - 26 TABLAS
-- ==================================================
