# INSTRUCCIONES PARA EJECUTAR SCHEMA EN SUPABASE

## CONTEXTO
No podemos ejecutar directamente desde CLI debido a problemas de DNS/conexión.
Debes ejecutar manualmente en el **Supabase Dashboard SQL Editor**.

---

## PASO 1: Acceder al SQL Editor de Supabase

1. Ve a: https://supabase.com/dashboard/project/lasxxxsouafpqrxpwtzk
2. En el menú lateral izquierdo, haz clic en **"SQL Editor"**
3. Haz clic en **"+ New query"** para crear una nueva consulta

---

## PASO 2: Ejecutar Schema Completo (26 tablas)

1. **Copia todo el contenido** del archivo:
   ```
   /Volumes/StarkT7/Proyectos/CLIENETS/proyectos/ESCUCHODROMO/Mentalfit 2/mentalfit/apps/web/scripts/schema.sql
   ```

2. **Pégalo** en el SQL Editor de Supabase

3. **Haz clic en "Run"** (botón verde) o presiona `Cmd + Enter`

4. **Espera** a que termine la ejecución (puede tardar 1-2 minutos)

5. **Verifica** que no haya errores:
   - ✅ Si dice "Success" en verde → Continúa al Paso 3
   - ❌ Si hay errores rojos → Copia los errores y repórtalos

---

## PASO 3: Ejecutar Funciones de Negocio (20 funciones)

1. **Crea una nueva query** en SQL Editor (botón "+ New query")

2. **Copia todo el contenido** del archivo:
   ```
   /Volumes/StarkT7/Proyectos/CLIENETS/proyectos/ESCUCHODROMO/Mentalfit 2/mentalfit/apps/web/scripts/funciones-negocio.sql
   ```

3. **Pégalo** en el nuevo SQL Editor

4. **Haz clic en "Run"** o presiona `Cmd + Enter`

5. **Espera** a que termine la ejecución (puede tardar 1-2 minutos)

6. **Verifica** que no haya errores:
   - ✅ Si dice "Success" → ¡Perfecto! Continúa al Paso 4
   - ❌ Si hay errores → Copia los errores y repórtalos

---

## PASO 4: Verificar Tablas Creadas

1. **Crea una nueva query** en SQL Editor

2. **Ejecuta esta consulta** para listar todas las tablas:
   ```sql
   SELECT table_name
   FROM information_schema.tables
   WHERE table_schema = 'public'
   AND table_type = 'BASE TABLE'
   ORDER BY table_name;
   ```

3. **Deberías ver 26 tablas en español**:
   - archivos
   - citas
   - configuracion_empresa
   - conversaciones
   - departamentos_empresa
   - disponibilidad_profesional
   - empleados
   - empresas
   - especialidades
   - evaluaciones
   - favoritos
   - logs_auditoria
   - mensajes
   - notificaciones
   - pagos
   - permisos_rol
   - profesionales
   - recursos
   - reseñas
   - resultados_evaluaciones
   - sesiones_activas
   - sesiones_terapia
   - suscripciones
   - templates_correo
   - tokens_2fa
   - usuarios

---

## PASO 5: Verificar Funciones Creadas

1. **Ejecuta esta consulta** para listar todas las funciones:
   ```sql
   SELECT
     routine_name,
     routine_type,
     data_type
   FROM information_schema.routines
   WHERE routine_schema = 'public'
   AND routine_type = 'FUNCTION'
   ORDER BY routine_name;
   ```

2. **Deberías ver 20 funciones de negocio**:
   - actualizar_perfil
   - actualizar_suscripcion
   - agregar_empleado_empresa
   - anonimizar_datos_usuario
   - asignar_rol
   - backup_datos_sensibles
   - calcular_disponibilidad
   - calcular_metricas_empresa
   - calcular_rating_profesional
   - cancelar_cita
   - crear_empresa
   - crear_sesion_terapia
   - crear_usuario_completo
   - generar_factura
   - generar_reporte_uso
   - limpiar_sesiones_expiradas
   - procesar_pago
   - reprogramar_cita
   - validar_credenciales
   - verificar_conflictos_horario

---

## PASO 6: Verificar RLS Policies

1. **Ejecuta esta consulta**:
   ```sql
   SELECT
     schemaname,
     tablename,
     policyname,
     cmd,
     qual
   FROM pg_policies
   WHERE schemaname = 'public'
   ORDER BY tablename, policyname;
   ```

2. **Deberías ver múltiples políticas RLS** para cada tabla

---

## PASO 7: Verificar Índices

1. **Ejecuta esta consulta**:
   ```sql
   SELECT
     schemaname,
     tablename,
     indexname,
     indexdef
   FROM pg_indexes
   WHERE schemaname = 'public'
   ORDER BY tablename, indexname;
   ```

2. **Deberías ver múltiples índices** creados para optimización

---

## PASO 8: Verificar Triggers

1. **Ejecuta esta consulta**:
   ```sql
   SELECT
     trigger_name,
     event_object_table,
     action_statement,
     action_timing,
     event_manipulation
   FROM information_schema.triggers
   WHERE trigger_schema = 'public'
   ORDER BY event_object_table, trigger_name;
   ```

2. **Deberías ver múltiples triggers** para auditoría y actualización automática

---

## REPORTE FINAL

Una vez completados todos los pasos, genera un reporte con:

### ✅ TABLAS CREADAS: __/26
### ✅ FUNCIONES CREADAS: __/20
### ✅ RLS POLICIES: __ políticas
### ✅ ÍNDICES: __ índices
### ✅ TRIGGERS: __ triggers

---

## NOTAS IMPORTANTES

1. **RLS (Row Level Security)** está habilitado en todas las tablas
2. **Todas las tablas están en ESPAÑOL** (nomenclatura requerida)
3. **Las funciones incluyen**:
   - Gestión de usuarios (4)
   - Gestión de empresas (2)
   - Gestión de sesiones/citas (4)
   - Disponibilidad (1)
   - Pagos y suscripciones (3)
   - Métricas y analytics (2)
   - Mantenimiento (3)
   - Reportes (1)

4. **Datos iniciales incluidos**:
   - 10 especialidades por defecto
   - Permisos por rol (admin, company_admin, professional, user)
   - 3 templates de correo básicos

---

## SOLUCIÓN DE PROBLEMAS

### Error: "relation already exists"
- **Solución**: El schema limpia las tablas antiguas. Si persiste, ejecuta:
  ```sql
  DROP SCHEMA public CASCADE;
  CREATE SCHEMA public;
  ```
  ⚠️ **ADVERTENCIA**: Esto eliminará TODAS las tablas

### Error: "permission denied"
- **Solución**: Asegúrate de usar el **Service Role Key** en la conexión

### Error: "function already exists"
- **Solución**: Usa `CREATE OR REPLACE FUNCTION` (ya incluido en el script)

---

## CONTACTO

Si encuentras errores que no puedes resolver:
1. Copia el mensaje de error completo
2. Anota en qué paso ocurrió
3. Reporta al backend specialist

---

✅ **TODO LISTO**: Una vez completado, tu base de datos estará lista para usar con 26 tablas en español, 20 funciones de negocio, RLS completo, índices optimizados y triggers automáticos.
