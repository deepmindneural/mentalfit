# Guía de Deployment - MentalFit

## Requisitos Previos

1. **Supabase Project** configurado con el schema en español
2. **Coolify** instalado y configurado
3. **GitHub Repository** conectado

## Variables de Entorno Requeridas en Coolify

Configurar en: **Coolify → Proyecto → Environment Variables**

### 🔴 CRÍTICAS (Requeridas)

```bash
# Supabase - Obtener de: https://app.supabase.com/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-publica-aqui
```

### ✅ Configuradas Automáticamente por Nixpacks

```bash
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
```

### 🟡 Opcionales (Para funcionalidades adicionales)

```bash
# Stripe (Pagos)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App URL
NEXT_PUBLIC_APP_URL=https://mentalfitia.com
```

## Pasos para Deployment en Coolify

### 1. Crear Proyecto en Coolify

1. Ir a **Resources → New Resource**
2. Seleccionar **GitHub** y conectar el repositorio `deepmindneural/mentalfit`
3. Branch: `main`
4. Build Pack: **Nixpacks** (auto-detectado)

### 2. Configurar Variables de Entorno

1. Ir a **Environment Variables**
2. Agregar las variables críticas de Supabase (ver arriba)
3. Click en **Save**

### 3. Configurar Base de Datos en Supabase

1. Ir al **SQL Editor** de Supabase
2. Copiar el contenido de `apps/web/scripts/schema.sql`
3. Ejecutar el script completo
4. Verificar que las tablas se crearon en español:
   - `empresas`
   - `usuarios`
   - `profesionales`
   - `sesiones_terapia`
   - etc.

### 4. Deploy

1. Click en **Deploy**
2. Esperar a que termine el build (~2-3 minutos)
3. Verificar logs:
   ```
   ✓ Ready in XXms
   - Local:    http://0.0.0.0:3000
   - Network:  http://[...]
   ```

## Verificar Deployment

### ✅ Checklist Post-Deploy

- [ ] La aplicación carga sin errores 502
- [ ] No aparece error "URL is malformed" en logs
- [ ] Las rutas de autenticación funcionan: `/auth/login`, `/auth/register`
- [ ] El i18n funciona (español por defecto, inglés disponible)
- [ ] Las variables de Supabase están configuradas (revisar logs)

### 🐛 Troubleshooting

#### Error: 502 Bad Gateway
**Causa:** Next.js no está escuchando en `0.0.0.0`
**Solución:** Verificar que `nixpacks.toml` tenga `HOSTNAME=0.0.0.0`

#### Error: URL is malformed ""
**Causa:** Variables de Supabase no configuradas
**Solución:** Agregar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` en Coolify

#### Error: Pre-rendering error
**Causa:** Rutas de autenticación en modo SSG
**Solución:** Ya resuelto - `apps/web/src/app/auth/layout.tsx` tiene `export const dynamic = 'force-dynamic'`

## Estructura del Proyecto

```
mentalfit/
├── apps/
│   └── web/                    # Next.js 14 App
│       ├── src/
│       │   ├── app/           # App Router pages
│       │   ├── components/    # Componentes React
│       │   ├── hooks/         # Custom hooks
│       │   ├── lib/           # Utilidades
│       │   ├── types/         # TypeScript types
│       │   └── middleware.ts  # Middleware i18n + Supabase
│       ├── messages/          # Traducciones ES/EN
│       ├── scripts/           # Scripts SQL
│       └── next.config.js
├── nixpacks.toml             # Configuración Coolify
└── turbo.json                # Monorepo config
```

## Comandos Útiles

```bash
# Build local
pnpm --filter @mentalfit/web build

# Desarrollo
pnpm --filter @mentalfit/web dev

# Ver logs de Coolify
# Desde la interfaz de Coolify → Logs

# Verificar variables en runtime
# Agregar en cualquier API route:
console.log('ENV:', {
  supabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
  node_env: process.env.NODE_ENV,
  port: process.env.PORT
});
```

## Arquitectura

- **Framework:** Next.js 14.2.31 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth + MFA
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Zod
- **i18n:** next-intl (ES/EN)
- **Deployment:** Coolify + Nixpacks
- **Monorepo:** Turborepo + pnpm workspaces

## Contacto y Soporte

Para issues o preguntas:
- GitHub Issues: `deepmindneural/mentalfit`
- Schema SQL: `apps/web/scripts/schema.sql`
