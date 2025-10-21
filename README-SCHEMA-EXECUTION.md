# GUÍA RÁPIDA - EJECUCIÓN DEL SCHEMA MENTALFIT

## PROBLEMA DETECTADO

No se pudo ejecutar automáticamente el schema debido a problemas de conectividad DNS con Supabase.

## SOLUCIÓN

**Ejecución manual en Supabase Dashboard** (5-10 minutos)

---

## PASO A PASO RÁPIDO

### 1️⃣ Accede al SQL Editor
Ve a: https://supabase.com/dashboard/project/lasxxxsouafpqrxpwtzk/sql

### 2️⃣ Ejecuta el Schema (26 tablas)
1. Click en **"+ New query"**
2. Copia todo el contenido de:
   ```
   /apps/web/scripts/schema.sql
   ```
3. Pega en el editor
4. Click en **"Run"** (botón verde)
5. Espera ~1-2 minutos
6. Verifica que diga **"Success"** ✅

### 3️⃣ Ejecuta las Funciones (20 funciones)
1. Click en **"+ New query"** (nueva)
2. Copia todo el contenido de:
   ```
   /apps/web/scripts/funciones-negocio.sql
   ```
3. Pega en el editor
4. Click en **"Run"**
5. Espera ~1-2 minutos
6. Verifica que diga **"Success"** ✅

### 4️⃣ Valida la Instalación
1. Click en **"+ New query"** (nueva)
2. Copia todo el contenido de:
   ```
   /VALIDACION-SCHEMA.sql
   ```
3. Pega y ejecuta
4. Revisa el resumen final:
   - ✅ TABLAS: 26/26
   - ✅ FUNCIONES: 20/20
   - ✅ RLS POLICIES: activo
   - ✅ ÍNDICES: creados
   - ✅ TRIGGERS: creados

---

## ARCHIVOS IMPORTANTES

| Archivo | Descripción |
|---------|-------------|
| **schema.sql** | Schema completo (26 tablas) - EJECUTAR PRIMERO |
| **funciones-negocio.sql** | 20 funciones PL/pgSQL - EJECUTAR SEGUNDO |
| **VALIDACION-SCHEMA.sql** | Script de validación - EJECUTAR TERCERO |
| **INSTRUCCIONES-EJECUTAR-SCHEMA.md** | Guía detallada completa |
| **REPORTE-EJECUCION-SCHEMA.md** | Documentación técnica completa |

---

## QUÉ SE VA A CREAR

### 📊 Base de Datos Completa:
- **26 tablas** en español
- **20 funciones** de lógica de negocio
- **50+ políticas RLS** (seguridad)
- **50+ índices** (optimización)
- **15+ triggers** (automatización)
- **3 vistas materializadas** (analytics)
- **Datos iniciales** (especialidades, permisos, templates)

### 🔒 Seguridad Enterprise:
- Row Level Security en todas las tablas
- Sistema RBAC (4 roles)
- Auditoría automática de cambios
- 2FA configurado
- Sesiones con expiración

### ⚡ Optimización:
- Índices en campos críticos
- Vistas materializadas para reportes
- Triggers para cálculos automáticos
- Constraints para integridad de datos

---

## NOMENCLATURA EN ESPAÑOL

✅ **TODO está en español:**

**Tablas:**
- `usuarios` (no "users")
- `empresas` (no "companies")
- `profesionales` (no "professionals")
- `sesiones_terapia` (no "sessions")

**Campos:**
- `nombre_completo` (no "full_name")
- `fecha_creacion` (no "created_at")
- `activo` (no "active")

**Funciones:**
- `crear_usuario_completo()` (no "create_user()")
- `validar_credenciales()` (no "validate_credentials()")

---

## TIEMPO ESTIMADO

⏱️ **Total: 5-10 minutos**
- Ejecutar schema: 2 min
- Ejecutar funciones: 2 min
- Validar: 1 min

---

## SI ALGO FALLA

### Error: "relation already exists"
**Solución:** Las tablas ya existen. El script las elimina al inicio.

### Error: "permission denied"
**Solución:** Asegúrate de estar usando el proyecto correcto en Supabase Dashboard.

### Error: "syntax error"
**Solución:** Asegúrate de copiar TODO el contenido del archivo, incluyendo la primera y última línea.

---

## DESPUÉS DE EJECUTAR

### ✅ Tu base de datos tendrá:

**Usuarios y Empresas:**
- Sistema multiempresa (B2B)
- Usuarios con roles (admin, company_admin, professional, user)
- Empleados vinculados a empresas
- Departamentos dentro de empresas

**Sesiones y Citas:**
- Sesiones de terapia programadas
- Sistema de agendamiento
- Disponibilidad de profesionales
- Validación de conflictos de horario

**Evaluaciones:**
- Evaluaciones psicológicas (PHQ-9, GAD-7, etc.)
- Resultados con análisis IA
- Alertas automáticas

**Comunicación:**
- Chat entre usuarios y profesionales
- Notificaciones push/email
- Análisis de sentimiento en mensajes

**Contenido:**
- Biblioteca de recursos educativos
- Sistema de favoritos
- Visualizaciones

**Calificación:**
- Reseñas de sesiones
- Calificación de profesionales
- Moderación de comentarios

**Pagos y Suscripciones:**
- Procesamiento de pagos (Stripe)
- Suscripciones empresariales
- Generación de facturas

**Seguridad y Auditoría:**
- Logs de auditoría completos
- 2FA (TOTP, SMS, Email)
- Sesiones activas con expiración
- Gestión de archivos

---

## PRÓXIMOS PASOS

1. ✅ Ejecutar schema y funciones (este documento)
2. 🔄 Configurar Supabase Client en Next.js
3. 🎨 Generar tipos TypeScript automáticos
4. 🧪 Crear datos de prueba
5. 🚀 Comenzar desarrollo frontend

---

## COMANDOS ÚTILES (DESPUÉS DE EJECUTAR)

### Generar tipos TypeScript:
```bash
npx supabase gen types typescript --project-id lasxxxsouafpqrxpwtzk > types/database.types.ts
```

### Crear usuario de prueba:
```sql
SELECT crear_usuario_completo(
  'test@demo.com',
  'password123',
  'Usuario Demo',
  'user',
  NULL,
  '+57 300 123 4567'
);
```

### Crear empresa de prueba:
```sql
SELECT crear_empresa(
  'Empresa Demo',
  'trial',
  'admin@demo.com',
  'Admin Demo',
  'admin123'
);
```

---

## CONTACTO

Si tienes problemas o preguntas:
1. Revisa **INSTRUCCIONES-EJECUTAR-SCHEMA.md** (guía detallada)
2. Revisa **REPORTE-EJECUCION-SCHEMA.md** (documentación técnica)
3. Ejecuta **VALIDACION-SCHEMA.sql** para diagnosticar

---

**¡Listo para comenzar! 🚀**

La base de datos está completamente diseñada y lista para ejecutar.
Sigue los 4 pasos de arriba y tendrás todo funcionando en menos de 10 minutos.
