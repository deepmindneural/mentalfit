-- ============================================
-- SCRIPT DE LIMPIEZA - MENTALFIT
-- ============================================
-- PRECAUCIÓN: Este script ELIMINA todas las tablas existentes
-- Ejecutar SOLO si estás seguro de que no hay datos importantes
-- ============================================

-- Deshabilitar triggers temporalmente
SET session_replication_role = 'replica';

-- Eliminar tablas ANTIGUAS (inglés) si existen
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS resources CASCADE;
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

-- Eliminar tablas NUEVAS (español) si existen
DROP TABLE IF EXISTS resenas CASCADE;
DROP TABLE IF EXISTS favoritos CASCADE;
DROP TABLE IF EXISTS recursos CASCADE;
DROP TABLE IF EXISTS archivos CASCADE;
DROP TABLE IF EXISTS templates_correo CASCADE;
DROP TABLE IF EXISTS configuracion_empresa CASCADE;
DROP TABLE IF EXISTS permisos_rol CASCADE;
DROP TABLE IF EXISTS departamentos_empresa CASCADE;
DROP TABLE IF EXISTS profesional_especialidad CASCADE;
DROP TABLE IF EXISTS especialidades CASCADE;
DROP TABLE IF EXISTS disponibilidad_profesional CASCADE;
DROP TABLE IF EXISTS suscripciones CASCADE;
DROP TABLE IF EXISTS pagos CASCADE;
DROP TABLE IF EXISTS notificaciones CASCADE;
DROP TABLE IF EXISTS mensajes CASCADE;
DROP TABLE IF EXISTS conversaciones CASCADE;
DROP TABLE IF EXISTS resultados_evaluaciones CASCADE;
DROP TABLE IF EXISTS evaluaciones CASCADE;
DROP TABLE IF EXISTS citas CASCADE;
DROP TABLE IF EXISTS sesiones_terapia CASCADE;
DROP TABLE IF EXISTS empleados CASCADE;
DROP TABLE IF EXISTS profesionales CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS empresas CASCADE;

-- Eliminar tablas de auditoría y seguridad
DROP TABLE IF EXISTS sesiones_activas CASCADE;
DROP TABLE IF EXISTS tokens_2fa CASCADE;
DROP TABLE IF EXISTS logs_auditoria CASCADE;

-- Eliminar vistas materializadas si existen
DROP MATERIALIZED VIEW IF EXISTS metricas_empresa CASCADE;
DROP MATERIALIZED VIEW IF EXISTS disponibilidad_tiempo_real CASCADE;
DROP MATERIALIZED VIEW IF EXISTS uso_plataforma CASCADE;

-- Eliminar funciones si existen
DROP FUNCTION IF EXISTS crear_usuario_completo CASCADE;
DROP FUNCTION IF EXISTS actualizar_perfil CASCADE;
DROP FUNCTION IF EXISTS validar_credenciales CASCADE;
DROP FUNCTION IF EXISTS asignar_rol CASCADE;
DROP FUNCTION IF EXISTS crear_empresa CASCADE;
DROP FUNCTION IF EXISTS agregar_empleado_empresa CASCADE;
DROP FUNCTION IF EXISTS crear_sesion_terapia CASCADE;
DROP FUNCTION IF EXISTS cancelar_cita CASCADE;
DROP FUNCTION IF EXISTS reprogramar_cita CASCADE;
DROP FUNCTION IF EXISTS verificar_conflictos_horario CASCADE;
DROP FUNCTION IF EXISTS calcular_disponibilidad CASCADE;
DROP FUNCTION IF EXISTS procesar_pago CASCADE;
DROP FUNCTION IF EXISTS actualizar_suscripcion CASCADE;
DROP FUNCTION IF EXISTS generar_factura CASCADE;
DROP FUNCTION IF EXISTS calcular_metricas_empresa CASCADE;
DROP FUNCTION IF EXISTS calcular_rating_profesional CASCADE;
DROP FUNCTION IF EXISTS limpiar_sesiones_expiradas CASCADE;
DROP FUNCTION IF EXISTS backup_datos_sensibles CASCADE;
DROP FUNCTION IF EXISTS anonimizar_datos_usuario CASCADE;
DROP FUNCTION IF EXISTS generar_reporte_uso CASCADE;

-- Eliminar función de updated_at
DROP FUNCTION IF EXISTS actualizar_fecha_actualizacion CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;

-- Eliminar función de handle_new_user
DROP FUNCTION IF EXISTS public.handle_new_user CASCADE;

-- Habilitar triggers nuevamente
SET session_replication_role = 'origin';

-- Mensaje de confirmación
DO $$
BEGIN
  RAISE NOTICE '✅ Base de datos limpiada completamente';
  RAISE NOTICE '📝 Ahora puedes ejecutar schema.sql';
END $$;
