-- ==================================================
-- MIGRACIÓN DE SCHEMA: INGLÉS → ESPAÑOL
-- ==================================================
-- Proyecto: MentalFit
-- Fecha: 2025-01-21
-- Descripción: Migración segura del schema en inglés al nuevo schema en español
-- IMPORTANTE: Ejecutar en un ambiente de pruebas PRIMERO
-- ==================================================

-- ============================================
-- FASE 0: PRE-MIGRACIÓN Y VALIDACIONES
-- ============================================

-- Crear schema temporal para backup
CREATE SCHEMA IF NOT EXISTS backup_ingles;

-- Función de logging para la migración
CREATE OR REPLACE FUNCTION log_migracion(p_paso TEXT, p_mensaje TEXT, p_nivel TEXT DEFAULT 'INFO')
RETURNS VOID AS $$
BEGIN
  RAISE NOTICE '[%] % - %', p_nivel, p_paso, p_mensaje;
  -- También insertamos en tabla de logs si existe
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'logs_migracion') THEN
    INSERT INTO logs_migracion (paso, mensaje, nivel, timestamp)
    VALUES (p_paso, p_mensaje, p_nivel, NOW());
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Tabla para registrar el progreso de la migración
CREATE TABLE IF NOT EXISTS logs_migracion (
  id SERIAL PRIMARY KEY,
  paso TEXT NOT NULL,
  mensaje TEXT,
  nivel TEXT DEFAULT 'INFO',
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

PERFORM log_migracion('PRE_MIGRACION', 'Iniciando proceso de migración');

-- Verificar que las tablas antiguas existen
DO $$
DECLARE
  v_tabla TEXT;
  v_tablas_faltantes TEXT[] := ARRAY[]::TEXT[];
BEGIN
  -- Lista de tablas que deben existir
  FOR v_tabla IN
    SELECT unnest(ARRAY[
      'companies', 'profiles', 'professionals', 'sessions',
      'assessments', 'chat_conversations', 'chat_messages',
      'notifications', 'payments', 'availability', 'reviews', 'resources'
    ])
  LOOP
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = v_tabla
    ) THEN
      v_tablas_faltantes := array_append(v_tablas_faltantes, v_tabla);
    END IF;
  END LOOP;

  IF array_length(v_tablas_faltantes, 1) > 0 THEN
    RAISE WARNING 'Tablas faltantes: %', array_to_string(v_tablas_faltantes, ', ');
    PERFORM log_migracion('PRE_MIGRACION',
      'Tablas faltantes: ' || array_to_string(v_tablas_faltantes, ', '),
      'WARNING'
    );
  ELSE
    PERFORM log_migracion('PRE_MIGRACION', 'Todas las tablas antiguas encontradas', 'INFO');
  END IF;
END $$;

-- ============================================
-- FASE 1: BACKUP COMPLETO
-- ============================================

PERFORM log_migracion('BACKUP', 'Iniciando backup de datos existentes');

-- Backup de cada tabla al schema backup_ingles
DO $$
DECLARE
  v_tabla RECORD;
  v_sql TEXT;
  v_count INTEGER;
BEGIN
  FOR v_tabla IN
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
    AND table_name IN (
      'companies', 'profiles', 'professionals', 'sessions',
      'assessments', 'chat_conversations', 'chat_messages',
      'notifications', 'payments', 'availability', 'reviews', 'resources'
    )
  LOOP
    -- Crear tabla de backup
    v_sql := format('CREATE TABLE IF NOT EXISTS backup_ingles.%I AS TABLE public.%I',
                    v_tabla.table_name, v_tabla.table_name);
    EXECUTE v_sql;

    -- Contar registros
    EXECUTE format('SELECT COUNT(*) FROM public.%I', v_tabla.table_name) INTO v_count;

    PERFORM log_migracion('BACKUP',
      format('Backup de %s completado (%s registros)', v_tabla.table_name, v_count),
      'INFO'
    );
  END LOOP;
END $$;

-- ============================================
-- FASE 2: CREAR NUEVO SCHEMA EN ESPAÑOL
-- ============================================
-- NOTA: Este paso ejecuta el schema-completo-es.sql
-- Por ahora, incluimos solo las tablas principales para la migración

PERFORM log_migracion('CREAR_SCHEMA', 'Creando nuevo schema en español');

-- Crear extensiones necesarias si no existen
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- FASE 3: MIGRACIÓN DE DATOS
-- ============================================

PERFORM log_migracion('MIGRACION_DATOS', 'Iniciando migración de datos');

-- ===== 3.1: EMPRESAS (companies → empresas) =====
PERFORM log_migracion('MIGRACION_DATOS', 'Migrando: companies → empresas');

INSERT INTO empresas (
  id,
  nombre,
  plan_activo,
  limite_empleados,
  stripe_customer_id,
  stripe_subscription_id,
  activa,
  fecha_creacion,
  fecha_actualizacion
)
SELECT
  id,
  name,
  plan::TEXT,
  employee_count,
  stripe_customer_id,
  stripe_subscription_id,
  TRUE, -- activa por defecto
  created_at,
  updated_at
FROM companies
ON CONFLICT (id) DO NOTHING;

-- ===== 3.2: USUARIOS (profiles → usuarios) =====
PERFORM log_migracion('MIGRACION_DATOS', 'Migrando: profiles → usuarios');

INSERT INTO usuarios (
  id,
  email,
  nombre_completo,
  rol,
  empresa_id,
  avatar_url,
  telefono,
  activo,
  fecha_creacion,
  fecha_actualizacion
)
SELECT
  id,
  email,
  full_name,
  CASE
    WHEN role = 'admin' THEN 'super_admin'
    WHEN role = 'company_admin' THEN 'admin_empresa'
    WHEN role = 'professional' THEN 'profesional'
    WHEN role = 'user' THEN 'empleado'
    ELSE 'empleado'
  END,
  company_id,
  avatar_url,
  phone,
  TRUE, -- activo por defecto
  created_at,
  updated_at
FROM profiles
ON CONFLICT (id) DO NOTHING;

-- ===== 3.3: PROFESIONALES (professionals → profesionales) =====
PERFORM log_migracion('MIGRACION_DATOS', 'Migrando: professionals → profesionales');

INSERT INTO profesionales (
  id,
  usuario_id,
  numero_licencia,
  biografia,
  anios_experiencia,
  calificacion_promedio,
  total_sesiones,
  tarifa_hora,
  disponible,
  verificado,
  fecha_creacion,
  fecha_actualizacion
)
SELECT
  id,
  user_id,
  license_number,
  bio,
  years_experience,
  rating,
  total_sessions,
  hourly_rate,
  available,
  TRUE, -- verificado por defecto si ya existe
  created_at,
  updated_at
FROM professionals
ON CONFLICT (id) DO NOTHING;

-- Migrar especialización a tabla de relación (si existe tabla especialidades)
-- Esta parte requiere que la tabla especialidades ya tenga datos
-- Por ahora, lo dejamos como comentario para ejecutar después
/*
INSERT INTO profesional_especialidad (profesional_id, especialidad_id)
SELECT
  p.id,
  e.id
FROM professionals p
CROSS JOIN especialidades e
WHERE e.nombre_es = p.specialization
ON CONFLICT DO NOTHING;
*/

-- ===== 3.4: SESIONES TERAPIA (sessions → sesiones_terapia) =====
PERFORM log_migracion('MIGRACION_DATOS', 'Migrando: sessions → sesiones_terapia');

INSERT INTO sesiones_terapia (
  id,
  empleado_id,
  profesional_id,
  fecha_hora,
  duracion_minutos,
  estado,
  tipo_sesion,
  notas_profesional,
  url_videollamada,
  fecha_creacion,
  fecha_actualizacion
)
SELECT
  id,
  user_id,
  professional_id,
  scheduled_at,
  duration,
  CASE
    WHEN status = 'scheduled' THEN 'programada'
    WHEN status = 'completed' THEN 'completada'
    WHEN status = 'cancelled' THEN 'cancelada'
    WHEN status = 'in_progress' THEN 'en_progreso'
    ELSE 'programada'
  END,
  CASE
    WHEN type = 'individual' THEN 'individual'
    WHEN type = 'group' THEN 'grupal'
    WHEN type = 'crisis' THEN 'crisis'
    WHEN type = 'wellness' THEN 'bienestar'
    ELSE 'individual'
  END,
  notes,
  meeting_url,
  created_at,
  updated_at
FROM sessions
ON CONFLICT (id) DO NOTHING;

-- ===== 3.5: EVALUACIONES (assessments → evaluaciones) =====
PERFORM log_migracion('MIGRACION_DATOS', 'Migrando: assessments → evaluaciones');

INSERT INTO evaluaciones (
  id,
  empleado_id,
  tipo_evaluacion,
  puntaje_total,
  respuestas,
  interpretacion,
  nivel_severidad,
  fecha_creacion
)
SELECT
  id,
  user_id,
  CASE
    WHEN type = 'PHQ-9' THEN 'phq9'
    WHEN type = 'GAD-7' THEN 'gad7'
    WHEN type = 'stress' THEN 'estres'
    WHEN type = 'burnout' THEN 'burnout'
    ELSE type
  END,
  score,
  results,
  interpretation,
  CASE
    WHEN severity = 'minimal' THEN 'minimo'
    WHEN severity = 'mild' THEN 'leve'
    WHEN severity = 'moderate' THEN 'moderado'
    WHEN severity = 'severe' THEN 'severo'
    ELSE 'minimo'
  END,
  created_at
FROM assessments
ON CONFLICT (id) DO NOTHING;

-- ===== 3.6: CONVERSACIONES (chat_conversations → conversaciones) =====
PERFORM log_migracion('MIGRACION_DATOS', 'Migrando: chat_conversations → conversaciones');

INSERT INTO conversaciones (
  id,
  empleado_id,
  profesional_id,
  estado,
  ultimo_mensaje_fecha,
  fecha_creacion,
  fecha_actualizacion
)
SELECT
  id,
  user_id,
  professional_id,
  CASE
    WHEN status = 'active' THEN 'activa'
    WHEN status = 'archived' THEN 'archivada'
    WHEN status = 'closed' THEN 'cerrada'
    ELSE 'activa'
  END,
  last_message_at,
  created_at,
  updated_at
FROM chat_conversations
ON CONFLICT (id) DO NOTHING;

-- ===== 3.7: MENSAJES (chat_messages → mensajes) =====
PERFORM log_migracion('MIGRACION_DATOS', 'Migrando: chat_messages → mensajes');

INSERT INTO mensajes (
  id,
  conversacion_id,
  remitente_id,
  contenido,
  analisis_sentimiento,
  leido,
  fecha_creacion
)
SELECT
  id,
  conversation_id,
  sender_id,
  content,
  sentiment,
  read,
  created_at
FROM chat_messages
ON CONFLICT (id) DO NOTHING;

-- ===== 3.8: NOTIFICACIONES (notifications → notificaciones) =====
PERFORM log_migracion('MIGRACION_DATOS', 'Migrando: notifications → notificaciones');

INSERT INTO notificaciones (
  id,
  usuario_id,
  tipo,
  titulo,
  mensaje,
  leida,
  url,
  fecha_creacion
)
SELECT
  id,
  user_id,
  CASE
    WHEN type = 'session' THEN 'sesion'
    WHEN type = 'message' THEN 'mensaje'
    WHEN type = 'assessment' THEN 'evaluacion'
    WHEN type = 'system' THEN 'sistema'
    ELSE 'sistema'
  END,
  title,
  message,
  read,
  link,
  created_at
FROM notifications
ON CONFLICT (id) DO NOTHING;

-- ===== 3.9: PAGOS (payments → pagos) =====
PERFORM log_migracion('MIGRACION_DATOS', 'Migrando: payments → pagos');

INSERT INTO pagos (
  id,
  empresa_id,
  usuario_id,
  monto,
  moneda,
  estado,
  tipo_pago,
  stripe_payment_intent_id,
  url_factura,
  descripcion,
  fecha_creacion
)
SELECT
  id,
  company_id,
  user_id,
  amount,
  'COP', -- asumimos COP por defecto, ajustar según necesidad
  CASE
    WHEN status = 'pending' THEN 'pendiente'
    WHEN status = 'completed' THEN 'completado'
    WHEN status = 'failed' THEN 'fallido'
    WHEN status = 'refunded' THEN 'reembolsado'
    ELSE 'pendiente'
  END,
  CASE
    WHEN type = 'subscription' THEN 'suscripcion'
    WHEN type = 'session' THEN 'sesion'
    WHEN type = 'one_time' THEN 'unico'
    ELSE 'unico'
  END,
  stripe_payment_id,
  invoice_url,
  description,
  created_at
FROM payments
ON CONFLICT (id) DO NOTHING;

-- ===== 3.10: DISPONIBILIDAD (availability → disponibilidad_profesional) =====
PERFORM log_migracion('MIGRACION_DATOS', 'Migrando: availability → disponibilidad_profesional');

INSERT INTO disponibilidad_profesional (
  id,
  profesional_id,
  dia_semana,
  hora_inicio,
  hora_fin,
  fecha_creacion
)
SELECT
  id,
  professional_id,
  day_of_week,
  start_time,
  end_time,
  created_at
FROM availability
ON CONFLICT (id) DO NOTHING;

-- ===== 3.11: RESEÑAS (reviews → resenas) =====
PERFORM log_migracion('MIGRACION_DATOS', 'Migrando: reviews → resenas');

INSERT INTO resenas (
  id,
  sesion_id,
  profesional_id,
  empleado_id,
  calificacion,
  comentario,
  moderada,
  visible,
  fecha_creacion
)
SELECT
  id,
  session_id,
  professional_id,
  user_id,
  rating,
  comment,
  TRUE, -- asumimos que las existentes ya están moderadas
  TRUE, -- visibles por defecto
  created_at
FROM reviews
ON CONFLICT (id) DO NOTHING;

-- ===== 3.12: RECURSOS (resources → recursos) =====
PERFORM log_migracion('MIGRACION_DATOS', 'Migrando: resources → recursos');

INSERT INTO recursos (
  id,
  titulo,
  descripcion,
  contenido,
  tipo,
  etiquetas,
  publicado,
  autor_id,
  fecha_creacion,
  fecha_actualizacion
)
SELECT
  id,
  title,
  description,
  content,
  CASE
    WHEN category = 'article' THEN 'articulo'
    WHEN category = 'video' THEN 'video'
    WHEN category = 'audio' THEN 'audio'
    WHEN category = 'guide' THEN 'guia'
    ELSE 'articulo'
  END,
  tags,
  published,
  author_id,
  created_at,
  updated_at
FROM resources
ON CONFLICT (id) DO NOTHING;

PERFORM log_migracion('MIGRACION_DATOS', 'Migración de datos completada');

-- ============================================
-- FASE 4: VALIDACIÓN POST-MIGRACIÓN
-- ============================================

PERFORM log_migracion('VALIDACION', 'Iniciando validación de datos migrados');

DO $$
DECLARE
  v_count_old INTEGER;
  v_count_new INTEGER;
  v_tabla_old TEXT;
  v_tabla_new TEXT;
  v_diferencia INTEGER;
BEGIN
  -- Validar counts de cada tabla

  -- Empresas
  SELECT COUNT(*) INTO v_count_old FROM companies;
  SELECT COUNT(*) INTO v_count_new FROM empresas;
  v_diferencia := v_count_old - v_count_new;
  PERFORM log_migracion('VALIDACION',
    format('companies (%s) → empresas (%s) | Diferencia: %s', v_count_old, v_count_new, v_diferencia),
    CASE WHEN v_diferencia = 0 THEN 'INFO' ELSE 'WARNING' END
  );

  -- Usuarios
  SELECT COUNT(*) INTO v_count_old FROM profiles;
  SELECT COUNT(*) INTO v_count_new FROM usuarios;
  v_diferencia := v_count_old - v_count_new;
  PERFORM log_migracion('VALIDACION',
    format('profiles (%s) → usuarios (%s) | Diferencia: %s', v_count_old, v_count_new, v_diferencia),
    CASE WHEN v_diferencia = 0 THEN 'INFO' ELSE 'WARNING' END
  );

  -- Profesionales
  SELECT COUNT(*) INTO v_count_old FROM professionals;
  SELECT COUNT(*) INTO v_count_new FROM profesionales;
  v_diferencia := v_count_old - v_count_new;
  PERFORM log_migracion('VALIDACION',
    format('professionals (%s) → profesionales (%s) | Diferencia: %s', v_count_old, v_count_new, v_diferencia),
    CASE WHEN v_diferencia = 0 THEN 'INFO' ELSE 'WARNING' END
  );

  -- Sesiones
  SELECT COUNT(*) INTO v_count_old FROM sessions;
  SELECT COUNT(*) INTO v_count_new FROM sesiones_terapia;
  v_diferencia := v_count_old - v_count_new;
  PERFORM log_migracion('VALIDACION',
    format('sessions (%s) → sesiones_terapia (%s) | Diferencia: %s', v_count_old, v_count_new, v_diferencia),
    CASE WHEN v_diferencia = 0 THEN 'INFO' ELSE 'WARNING' END
  );

  -- Evaluaciones
  SELECT COUNT(*) INTO v_count_old FROM assessments;
  SELECT COUNT(*) INTO v_count_new FROM evaluaciones;
  v_diferencia := v_count_old - v_count_new;
  PERFORM log_migracion('VALIDACION',
    format('assessments (%s) → evaluaciones (%s) | Diferencia: %s', v_count_old, v_count_new, v_diferencia),
    CASE WHEN v_diferencia = 0 THEN 'INFO' ELSE 'WARNING' END
  );

  -- Conversaciones
  SELECT COUNT(*) INTO v_count_old FROM chat_conversations;
  SELECT COUNT(*) INTO v_count_new FROM conversaciones;
  v_diferencia := v_count_old - v_count_new;
  PERFORM log_migracion('VALIDACION',
    format('chat_conversations (%s) → conversaciones (%s) | Diferencia: %s', v_count_old, v_count_new, v_diferencia),
    CASE WHEN v_diferencia = 0 THEN 'INFO' ELSE 'WARNING' END
  );

  -- Mensajes
  SELECT COUNT(*) INTO v_count_old FROM chat_messages;
  SELECT COUNT(*) INTO v_count_new FROM mensajes;
  v_diferencia := v_count_old - v_count_new;
  PERFORM log_migracion('VALIDACION',
    format('chat_messages (%s) → mensajes (%s) | Diferencia: %s', v_count_old, v_count_new, v_diferencia),
    CASE WHEN v_diferencia = 0 THEN 'INFO' ELSE 'WARNING' END
  );

  -- Notificaciones
  SELECT COUNT(*) INTO v_count_old FROM notifications;
  SELECT COUNT(*) INTO v_count_new FROM notificaciones;
  v_diferencia := v_count_old - v_count_new;
  PERFORM log_migracion('VALIDACION',
    format('notifications (%s) → notificaciones (%s) | Diferencia: %s', v_count_old, v_count_new, v_diferencia),
    CASE WHEN v_diferencia = 0 THEN 'INFO' ELSE 'WARNING' END
  );

  -- Pagos
  SELECT COUNT(*) INTO v_count_old FROM payments;
  SELECT COUNT(*) INTO v_count_new FROM pagos;
  v_diferencia := v_count_old - v_count_new;
  PERFORM log_migracion('VALIDACION',
    format('payments (%s) → pagos (%s) | Diferencia: %s', v_count_old, v_count_new, v_diferencia),
    CASE WHEN v_diferencia = 0 THEN 'INFO' ELSE 'WARNING' END
  );

  -- Disponibilidad
  SELECT COUNT(*) INTO v_count_old FROM availability;
  SELECT COUNT(*) INTO v_count_new FROM disponibilidad_profesional;
  v_diferencia := v_count_old - v_count_new;
  PERFORM log_migracion('VALIDACION',
    format('availability (%s) → disponibilidad_profesional (%s) | Diferencia: %s', v_count_old, v_count_new, v_diferencia),
    CASE WHEN v_diferencia = 0 THEN 'INFO' ELSE 'WARNING' END
  );

  -- Reseñas
  SELECT COUNT(*) INTO v_count_old FROM reviews;
  SELECT COUNT(*) INTO v_count_new FROM resenas;
  v_diferencia := v_count_old - v_count_new;
  PERFORM log_migracion('VALIDACION',
    format('reviews (%s) → resenas (%s) | Diferencia: %s', v_count_old, v_count_new, v_diferencia),
    CASE WHEN v_diferencia = 0 THEN 'INFO' ELSE 'WARNING' END
  );

  -- Recursos
  SELECT COUNT(*) INTO v_count_old FROM resources;
  SELECT COUNT(*) INTO v_count_new FROM recursos;
  v_diferencia := v_count_old - v_count_new;
  PERFORM log_migracion('VALIDACION',
    format('resources (%s) → recursos (%s) | Diferencia: %s', v_count_old, v_count_new, v_diferencia),
    CASE WHEN v_diferencia = 0 THEN 'INFO' ELSE 'WARNING' END
  );

END $$;

PERFORM log_migracion('VALIDACION', 'Validación completada');

-- ============================================
-- FASE 5: RENOMBRAR TABLAS ANTIGUAS (OPCIONAL)
-- ============================================
-- PRECAUCIÓN: Esta fase renombra las tablas antiguas para evitar conflictos
-- Solo ejecutar después de validar que la migración fue exitosa

/*
PERFORM log_migracion('RENOMBRAR', 'Renombrando tablas antiguas (agregando sufijo _old)');

ALTER TABLE companies RENAME TO companies_old;
ALTER TABLE profiles RENAME TO profiles_old;
ALTER TABLE professionals RENAME TO professionals_old;
ALTER TABLE sessions RENAME TO sessions_old;
ALTER TABLE assessments RENAME TO assessments_old;
ALTER TABLE chat_conversations RENAME TO chat_conversations_old;
ALTER TABLE chat_messages RENAME TO chat_messages_old;
ALTER TABLE notifications RENAME TO notifications_old;
ALTER TABLE payments RENAME TO payments_old;
ALTER TABLE availability RENAME TO availability_old;
ALTER TABLE reviews RENAME TO reviews_old;
ALTER TABLE resources RENAME TO resources_old;

PERFORM log_migracion('RENOMBRAR', 'Tablas antiguas renombradas con sufijo _old');
*/

-- ============================================
-- FASE 6: ELIMINAR TABLAS ANTIGUAS (MUY PELIGROSO)
-- ============================================
-- PRECAUCIÓN EXTREMA: Solo ejecutar después de semanas de validación
-- Recomendación: Mantener las tablas _old por al menos 30 días

/*
PERFORM log_migracion('ELIMINAR', 'ADVERTENCIA: Eliminando tablas antiguas - IRREVERSIBLE');

DROP TABLE IF EXISTS companies_old CASCADE;
DROP TABLE IF EXISTS profiles_old CASCADE;
DROP TABLE IF EXISTS professionals_old CASCADE;
DROP TABLE IF EXISTS sessions_old CASCADE;
DROP TABLE IF EXISTS assessments_old CASCADE;
DROP TABLE IF EXISTS chat_conversations_old CASCADE;
DROP TABLE IF EXISTS chat_messages_old CASCADE;
DROP TABLE IF EXISTS notifications_old CASCADE;
DROP TABLE IF EXISTS payments_old CASCADE;
DROP TABLE IF EXISTS availability_old CASCADE;
DROP TABLE IF EXISTS reviews_old CASCADE;
DROP TABLE IF EXISTS resources_old CASCADE;

PERFORM log_migracion('ELIMINAR', 'Tablas antiguas eliminadas - Backup en schema backup_ingles');
*/

-- ============================================
-- FASE 7: REPORTE FINAL
-- ============================================

PERFORM log_migracion('REPORTE_FINAL', '=== MIGRACIÓN COMPLETADA ===');

-- Mostrar todos los logs de la migración
SELECT * FROM logs_migracion ORDER BY timestamp;

-- Estadísticas finales
SELECT
  '=== ESTADÍSTICAS DE MIGRACIÓN ===' AS reporte,
  (SELECT COUNT(*) FROM logs_migracion WHERE nivel = 'ERROR') AS errores,
  (SELECT COUNT(*) FROM logs_migracion WHERE nivel = 'WARNING') AS advertencias,
  (SELECT COUNT(*) FROM logs_migracion WHERE nivel = 'INFO') AS info,
  (SELECT COUNT(*) FROM empresas) AS total_empresas,
  (SELECT COUNT(*) FROM usuarios) AS total_usuarios,
  (SELECT COUNT(*) FROM profesionales) AS total_profesionales,
  (SELECT COUNT(*) FROM sesiones_terapia) AS total_sesiones;

-- ============================================
-- INSTRUCCIONES POST-MIGRACIÓN
-- ============================================

/*
  PASOS SIGUIENTES:

  1. VALIDACIÓN EXHAUSTIVA (1-2 semanas):
     - Verificar que todos los datos migraron correctamente
     - Revisar integridad referencial
     - Probar todos los flujos de la aplicación
     - Comparar counts entre tablas antiguas y nuevas

  2. ACTUALIZACIÓN DEL CÓDIGO:
     - Generar tipos TypeScript: supabase gen types typescript
     - Actualizar todas las queries del frontend
     - Actualizar todas las llamadas a API
     - Actualizar componentes que usan datos de BD

  3. TESTING:
     - Ejecutar suite completa de tests
     - Testing manual de todas las funcionalidades
     - Testing de roles y permisos
     - Testing de RLS policies

  4. DEPLOYMENT GRADUAL:
     - Deploy en ambiente de staging
     - Testing con usuarios reales (beta)
     - Monitoreo de logs y errores
     - Deploy a producción

  5. LIMPIEZA (después de 30 días):
     - Descomentar FASE 5 para renombrar tablas antiguas
     - Después de 60 días, descomentar FASE 6 para eliminar (con precaución)

  6. DOCUMENTACIÓN:
     - Actualizar README con nueva estructura de BD
     - Documentar cambios en API
     - Actualizar diagramas ER
     - Documentar decisiones de migración

  ROLLBACK EN CASO DE EMERGENCIA:

  Si algo sale mal, puedes restaurar desde el backup:

  -- Restaurar empresas
  TRUNCATE empresas CASCADE;
  INSERT INTO empresas SELECT * FROM backup_ingles.companies;

  -- Repetir para cada tabla...

  O directamente renombrar:

  DROP TABLE empresas CASCADE;
  ALTER TABLE companies_old RENAME TO empresas;
*/

-- FIN DEL SCRIPT DE MIGRACIÓN
