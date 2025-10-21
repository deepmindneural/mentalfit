-- ==================================================
-- SCRIPT DE VALIDACIÓN DEL SCHEMA
-- Ejecuta este script después de aplicar schema.sql y funciones-negocio.sql
-- ==================================================

-- ==================================================
-- 1. VALIDAR TABLAS CREADAS (26 tablas esperadas)
-- ==================================================

SELECT
  '1. VALIDACIÓN DE TABLAS' AS seccion,
  '------------------------' AS separador;

SELECT
  COUNT(*) AS total_tablas,
  CASE
    WHEN COUNT(*) = 26 THEN '✅ CORRECTO: 26 tablas creadas'
    ELSE '❌ ERROR: Se esperaban 26 tablas, se encontraron ' || COUNT(*)
  END AS resultado
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE';

-- Listar todas las tablas
SELECT
  '  → ' || table_name AS tablas_creadas
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- ==================================================
-- 2. VALIDAR FUNCIONES CREADAS (20 funciones esperadas)
-- ==================================================

SELECT
  '2. VALIDACIÓN DE FUNCIONES' AS seccion,
  '----------------------------' AS separador;

SELECT
  COUNT(*) AS total_funciones,
  CASE
    WHEN COUNT(*) >= 20 THEN '✅ CORRECTO: ' || COUNT(*) || ' funciones creadas'
    ELSE '❌ ERROR: Se esperaban al menos 20 funciones, se encontraron ' || COUNT(*)
  END AS resultado
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_type = 'FUNCTION'
  AND routine_name IN (
    'crear_usuario_completo',
    'actualizar_perfil',
    'validar_credenciales',
    'asignar_rol',
    'crear_empresa',
    'agregar_empleado_empresa',
    'crear_sesion_terapia',
    'cancelar_cita',
    'reprogramar_cita',
    'verificar_conflictos_horario',
    'calcular_disponibilidad',
    'procesar_pago',
    'actualizar_suscripcion',
    'generar_factura',
    'calcular_metricas_empresa',
    'calcular_rating_profesional',
    'limpiar_sesiones_expiradas',
    'backup_datos_sensibles',
    'anonimizar_datos_usuario',
    'generar_reporte_uso'
  );

-- Listar funciones de negocio
SELECT
  '  → ' || routine_name AS funciones_creadas
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_type = 'FUNCTION'
  AND routine_name IN (
    'crear_usuario_completo',
    'actualizar_perfil',
    'validar_credenciales',
    'asignar_rol',
    'crear_empresa',
    'agregar_empleado_empresa',
    'crear_sesion_terapia',
    'cancelar_cita',
    'reprogramar_cita',
    'verificar_conflictos_horario',
    'calcular_disponibilidad',
    'procesar_pago',
    'actualizar_suscripcion',
    'generar_factura',
    'calcular_metricas_empresa',
    'calcular_rating_profesional',
    'limpiar_sesiones_expiradas',
    'backup_datos_sensibles',
    'anonimizar_datos_usuario',
    'generar_reporte_uso'
  )
ORDER BY routine_name;

-- ==================================================
-- 3. VALIDAR RLS (Row Level Security)
-- ==================================================

SELECT
  '3. VALIDACIÓN DE RLS' AS seccion,
  '---------------------' AS separador;

SELECT
  COUNT(DISTINCT tablename) AS tablas_con_rls,
  CASE
    WHEN COUNT(DISTINCT tablename) = 26 THEN '✅ CORRECTO: RLS habilitado en 26 tablas'
    ELSE '⚠️  ADVERTENCIA: RLS habilitado solo en ' || COUNT(DISTINCT tablename) || ' tablas'
  END AS resultado
FROM pg_tables
WHERE schemaname = 'public'
  AND rowsecurity = true;

-- Contar políticas RLS
SELECT
  COUNT(*) AS total_politicas_rls,
  '✅ Políticas RLS creadas' AS resultado
FROM pg_policies
WHERE schemaname = 'public';

-- Listar tablas con RLS
SELECT
  '  → ' || tablename AS tablas_con_rls
FROM pg_tables
WHERE schemaname = 'public'
  AND rowsecurity = true
ORDER BY tablename;

-- ==================================================
-- 4. VALIDAR ÍNDICES
-- ==================================================

SELECT
  '4. VALIDACIÓN DE ÍNDICES' AS seccion,
  '-------------------------' AS separador;

SELECT
  COUNT(*) AS total_indices,
  '✅ Índices creados (optimización)' AS resultado
FROM pg_indexes
WHERE schemaname = 'public'
  AND indexname NOT LIKE '%_pkey'; -- Excluir índices de primary key

-- Top 10 índices creados
SELECT
  '  → ' || tablename || '.' || indexname AS indices_principales
FROM pg_indexes
WHERE schemaname = 'public'
  AND indexname NOT LIKE '%_pkey'
ORDER BY tablename, indexname
LIMIT 10;

-- ==================================================
-- 5. VALIDAR TRIGGERS
-- ==================================================

SELECT
  '5. VALIDACIÓN DE TRIGGERS' AS seccion,
  '--------------------------' AS separador;

SELECT
  COUNT(*) AS total_triggers,
  '✅ Triggers creados' AS resultado
FROM information_schema.triggers
WHERE trigger_schema = 'public';

-- Listar triggers principales
SELECT
  '  → ' || event_object_table || '.' || trigger_name AS triggers_creados
FROM information_schema.triggers
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name
LIMIT 15;

-- ==================================================
-- 6. VALIDAR DATOS INICIALES
-- ==================================================

SELECT
  '6. VALIDACIÓN DE DATOS INICIALES' AS seccion,
  '----------------------------------' AS separador;

-- Especialidades
SELECT
  COUNT(*) AS total_especialidades,
  CASE
    WHEN COUNT(*) >= 10 THEN '✅ CORRECTO: ' || COUNT(*) || ' especialidades insertadas'
    ELSE '⚠️  ADVERTENCIA: Solo ' || COUNT(*) || ' especialidades (se esperaban 10)'
  END AS resultado
FROM especialidades;

-- Permisos por rol
SELECT
  COUNT(*) AS total_permisos,
  '✅ Permisos por rol configurados' AS resultado
FROM permisos_rol;

-- Templates de correo
SELECT
  COUNT(*) AS total_templates,
  CASE
    WHEN COUNT(*) >= 3 THEN '✅ CORRECTO: ' || COUNT(*) || ' templates de correo'
    ELSE '⚠️  ADVERTENCIA: Solo ' || COUNT(*) || ' templates (se esperaban 3)'
  END AS resultado
FROM templates_correo;

-- ==================================================
-- 7. VALIDAR VISTAS MATERIALIZADAS
-- ==================================================

SELECT
  '7. VALIDACIÓN DE VISTAS MATERIALIZADAS' AS seccion,
  '----------------------------------------' AS separador;

SELECT
  COUNT(*) AS total_vistas,
  CASE
    WHEN COUNT(*) >= 3 THEN '✅ CORRECTO: ' || COUNT(*) || ' vistas materializadas'
    ELSE '⚠️  ADVERTENCIA: Solo ' || COUNT(*) || ' vistas (se esperaban 3)'
  END AS resultado
FROM pg_matviews
WHERE schemaname = 'public';

-- Listar vistas materializadas
SELECT
  '  → ' || matviewname AS vistas_materializadas
FROM pg_matviews
WHERE schemaname = 'public'
ORDER BY matviewname;

-- ==================================================
-- 8. RESUMEN FINAL
-- ==================================================

SELECT
  '8. RESUMEN FINAL' AS seccion,
  '----------------' AS separador;

SELECT
  'TABLAS' AS componente,
  (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE') AS total,
  '26' AS esperado,
  CASE
    WHEN (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE') = 26
    THEN '✅ OK'
    ELSE '❌ FALTA'
  END AS estado

UNION ALL

SELECT
  'FUNCIONES' AS componente,
  (SELECT COUNT(*) FROM information_schema.routines WHERE routine_schema = 'public' AND routine_type = 'FUNCTION' AND routine_name IN (
    'crear_usuario_completo', 'actualizar_perfil', 'validar_credenciales', 'asignar_rol',
    'crear_empresa', 'agregar_empleado_empresa', 'crear_sesion_terapia', 'cancelar_cita',
    'reprogramar_cita', 'verificar_conflictos_horario', 'calcular_disponibilidad',
    'procesar_pago', 'actualizar_suscripcion', 'generar_factura', 'calcular_metricas_empresa',
    'calcular_rating_profesional', 'limpiar_sesiones_expiradas', 'backup_datos_sensibles',
    'anonimizar_datos_usuario', 'generar_reporte_uso'
  )) AS total,
  '20' AS esperado,
  CASE
    WHEN (SELECT COUNT(*) FROM information_schema.routines WHERE routine_schema = 'public' AND routine_type = 'FUNCTION' AND routine_name IN (
      'crear_usuario_completo', 'actualizar_perfil', 'validar_credenciales', 'asignar_rol',
      'crear_empresa', 'agregar_empleado_empresa', 'crear_sesion_terapia', 'cancelar_cita',
      'reprogramar_cita', 'verificar_conflictos_horario', 'calcular_disponibilidad',
      'procesar_pago', 'actualizar_suscripcion', 'generar_factura', 'calcular_metricas_empresa',
      'calcular_rating_profesional', 'limpiar_sesiones_expiradas', 'backup_datos_sensibles',
      'anonimizar_datos_usuario', 'generar_reporte_uso'
    )) >= 20
    THEN '✅ OK'
    ELSE '❌ FALTA'
  END AS estado

UNION ALL

SELECT
  'RLS POLICIES' AS componente,
  (SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public') AS total,
  '>' AS esperado,
  CASE
    WHEN (SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public') > 0
    THEN '✅ OK'
    ELSE '❌ FALTA'
  END AS estado

UNION ALL

SELECT
  'ÍNDICES' AS componente,
  (SELECT COUNT(*) FROM pg_indexes WHERE schemaname = 'public' AND indexname NOT LIKE '%_pkey') AS total,
  '>' AS esperado,
  CASE
    WHEN (SELECT COUNT(*) FROM pg_indexes WHERE schemaname = 'public' AND indexname NOT LIKE '%_pkey') > 0
    THEN '✅ OK'
    ELSE '❌ FALTA'
  END AS estado

UNION ALL

SELECT
  'TRIGGERS' AS componente,
  (SELECT COUNT(*) FROM information_schema.triggers WHERE trigger_schema = 'public') AS total,
  '>' AS esperado,
  CASE
    WHEN (SELECT COUNT(*) FROM information_schema.triggers WHERE trigger_schema = 'public') > 0
    THEN '✅ OK'
    ELSE '❌ FALTA'
  END AS estado

UNION ALL

SELECT
  'ESPECIALIDADES' AS componente,
  (SELECT COUNT(*) FROM especialidades) AS total,
  '10' AS esperado,
  CASE
    WHEN (SELECT COUNT(*) FROM especialidades) >= 10
    THEN '✅ OK'
    ELSE '❌ FALTA'
  END AS estado

UNION ALL

SELECT
  'VISTAS MAT.' AS componente,
  (SELECT COUNT(*) FROM pg_matviews WHERE schemaname = 'public') AS total,
  '3' AS esperado,
  CASE
    WHEN (SELECT COUNT(*) FROM pg_matviews WHERE schemaname = 'public') >= 3
    THEN '✅ OK'
    ELSE '❌ FALTA'
  END AS estado;

-- ==================================================
-- FIN DE LA VALIDACIÓN
-- ==================================================

SELECT
  '========================================' AS mensaje
UNION ALL
SELECT '✅ VALIDACIÓN COMPLETADA'
UNION ALL
SELECT '========================================';
