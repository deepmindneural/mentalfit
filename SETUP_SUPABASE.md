# 🚀 Guía Completa de Setup de Supabase para MentalFit

## ✅ Estado Actual

- ✅ Credenciales configuradas en `.env.local`
- ✅ Clientes de Supabase creados (`lib/supabase.ts`, `lib/supabase-server.ts`)
- ✅ Middleware de autenticación configurado
- ✅ Scripts SQL listos para ejecutar

## 📋 Pasos para Completar el Setup

### 1. Acceder al SQL Editor de Supabase

1. Ve a tu proyecto de Supabase: https://app.supabase.com/project/lasxxxsouafpqrxpwtzk
2. En el menú lateral, haz clic en **"SQL Editor"**

### 2. Ejecutar el Script de Creación de Tablas

1. Abre el archivo `apps/web/scripts/supabase-setup.sql`
2. **Copia todo su contenido**
3. Pégalo en el SQL Editor de Supabase
4. Haz clic en **"Run"** (botón verde en la esquina inferior derecha)
5. Espera a que termine (debería tomar ~10-15 segundos)

**¿Qué hace este script?**
- ✅ Crea 12 tablas (companies, profiles, professionals, sessions, etc.)
- ✅ Crea índices para mejor rendimiento
- ✅ Habilita Row Level Security (RLS) en todas las tablas
- ✅ Configura políticas de seguridad
- ✅ Crea triggers automáticos
- ✅ Configura trigger para crear perfil automáticamente al registrarse

### 3. Insertar Datos de Ejemplo (Opcional pero Recomendado)

1. Abre el archivo `apps/web/scripts/seed-data.sql`
2. **Copia todo su contenido**
3. Pégalo en el SQL Editor de Supabase
4. Haz clic en **"Run"**

**¿Qué datos se crean?**
- 3 empresas de ejemplo
- 7 usuarios de prueba (admin, company admin, users, professionals)
- 3 profesionales con sus perfiles completos
- Horarios de disponibilidad
- Sesiones programadas y completadas
- Evaluaciones psicométricas
- Reseñas de profesionales
- Notificaciones
- Recursos educativos
- Conversación de chat de ejemplo

### 4. Verificar que Todo se Creó Correctamente

1. En el menú lateral, ve a **"Table Editor"**
2. Deberías ver todas estas tablas:

   - ✅ companies
   - ✅ profiles
   - ✅ professionals
   - ✅ sessions
   - ✅ assessments
   - ✅ chat_conversations
   - ✅ chat_messages
   - ✅ notifications
   - ✅ payments
   - ✅ availability
   - ✅ reviews
   - ✅ resources

3. Haz clic en cada tabla para ver los datos insertados

### 5. Configurar Autenticación

1. Ve a **Authentication** → **Settings** en el menú lateral
2. Asegúrate de que **Email** esté habilitado
3. Configura las URLs de redirect (opcional):
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/auth/callback`

### 6. (Opcional) Habilitar Proveedores Sociales

Si quieres login con Google, GitHub, etc.:

1. Ve a **Authentication** → **Providers**
2. Habilita los proveedores que desees
3. Configura las credenciales OAuth

### 7. Ejecutar la Aplicación

```bash
# Desde la raíz del proyecto
pnpm dev

# O directamente en la app web
cd apps/web
pnpm dev
```

La aplicación estará disponible en: **http://localhost:3000**

## 🔐 Usuarios de Prueba

**IMPORTANTE**: Los usuarios de ejemplo en `seed-data.sql` son solo perfiles. Necesitas crearlos en Authentication primero:

### Cómo crear usuarios de prueba:

1. Ve a **Authentication** → **Users**
2. Haz clic en **"Add user"** → **"Create new user"**
3. Crea estos usuarios:

| Email | Password | Role |
|-------|----------|------|
| admin@mentalfit.com | Admin123! | admin |
| admin@techcorp.com | Admin123! | company_admin |
| alice@techcorp.com | User123! | user |
| bob@techcorp.com | User123! | user |
| dr.sarah@mentalfit.com | Prof123! | professional |

**Nota**: El trigger automático creará el perfil en la tabla `profiles` cuando crees el usuario.

## 📊 Estructura de la Base de Datos

```
auth.users (Supabase Auth)
    ↓ (trigger automático)
profiles (perfiles extendidos)
    ↓
├── companies (empresas)
├── professionals (profesionales)
│   ├── availability (horarios)
│   └── reviews (reseñas)
├── sessions (sesiones terapéuticas)
├── assessments (evaluaciones)
├── chat_conversations (conversaciones)
│   └── chat_messages (mensajes)
├── notifications (notificaciones)
├── payments (pagos)
└── resources (recursos educativos)
```

## 🔒 Seguridad (RLS)

Todas las tablas tienen Row Level Security habilitado:

- Los usuarios solo pueden ver sus propios datos
- Los profesionales pueden ver sus propias sesiones y conversaciones
- Los admins de empresa pueden ver datos de su empresa
- Los profesionales están visibles para todos (para que puedan ser encontrados)

## 🧪 Probar la Aplicación

### 1. Registro de nuevo usuario

1. Ve a http://localhost:3000/auth/register
2. Completa el formulario
3. Verifica que se cree automáticamente el perfil en `profiles`

### 2. Login

1. Ve a http://localhost:3000/auth/login
2. Usa alguno de los usuarios de prueba
3. Deberías ver el dashboard con datos

### 3. Dashboard

El dashboard mostrará:
- Stats de la empresa/usuario
- Sesiones recientes
- Notificaciones
- Acceso a todas las funcionalidades

## 🐛 Troubleshooting

### Error: "relation does not exist"

Significa que las tablas no se crearon. Ejecuta nuevamente `supabase-setup.sql`.

### Error: "permission denied"

Verifica que RLS esté configurado correctamente. Revisa las políticas en cada tabla.

### No veo datos de prueba

Asegúrate de haber ejecutado `seed-data.sql` después de `supabase-setup.sql`.

### El login no funciona

1. Verifica que el usuario exista en **Authentication** → **Users**
2. Verifica que el perfil se haya creado en la tabla `profiles`
3. Revisa la consola del navegador para ver errores

## 📝 Próximos Pasos

Una vez que todo esté funcionando:

1. **Personalizar los datos**: Modifica los datos de ejemplo en `seed-data.sql`
2. **Agregar más funcionalidades**: Las tablas están listas para todas las features
3. **Configurar Stripe**: Para pagos reales
4. **Deploy**: Desplegar en Vercel + Supabase production

## 🎯 Archivos Importantes

- `apps/web/.env.local` - Credenciales de Supabase ✅
- `apps/web/src/lib/supabase.ts` - Cliente para navegador ✅
- `apps/web/src/lib/supabase-server.ts` - Cliente para servidor ✅
- `apps/web/src/middleware.ts` - Auth middleware ✅
- `apps/web/scripts/supabase-setup.sql` - Setup de DB ✅
- `apps/web/scripts/seed-data.sql` - Datos de ejemplo ✅

## ✨ ¡Listo!

Tu aplicación MentalFit está completamente configurada y lista para desarrollar. El backend está en Supabase y todo el frontend está listo para conectarse.

¿Preguntas? Revisa la documentación de Supabase: https://supabase.com/docs
