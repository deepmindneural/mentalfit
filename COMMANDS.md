# 🚀 MentalFit - Comandos de Ejecución

## 📋 Prerequisitos
- Node.js 18+
- pnpm 8.15.1+ instalado (`npm install -g pnpm@8.15.1`)
- Cuenta de Supabase (https://supabase.com)

## 🔧 Setup Inicial (Solo primera vez)

### 1. Instalar dependencias
```bash
pnpm install
```

### 2. Configurar Supabase
```bash
# Copiar variables de entorno
cp apps/web/.env.example apps/web/.env.local

# Editar apps/web/.env.local con tus credenciales de Supabase
# NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
# NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

### 3. Configurar base de datos en Supabase
- Ir a tu proyecto de Supabase
- Crear las tablas necesarias (ver README.md para la lista completa)
- Configurar políticas de seguridad (RLS)

## 🎯 Comandos de Desarrollo

### Ejecutar en modo desarrollo
```bash
# Desde la raíz del proyecto
pnpm dev

# O directamente en la app web
cd apps/web
pnpm dev
```

La aplicación estará disponible en: **http://localhost:3000**

## 🏗️ Comandos de Build

### Build de producción
```bash
# Desde la raíz
pnpm build

# O directamente en la app web
cd apps/web
pnpm build
```

### Ejecutar build de producción
```bash
cd apps/web
pnpm start
```

## 🐳 Docker

### Build y ejecutar con Docker
```bash
# Build de la imagen
docker build -t mentalfit-web apps/web

# Ejecutar el contenedor
docker run -p 3000:3000 --env-file apps/web/.env.local mentalfit-web
```

### Docker Compose
```bash
# Ejecutar con docker-compose
docker-compose up -d

# Ver logs
docker-compose logs -f web

# Detener
docker-compose down
```

## 🧪 Comandos de Testing

### Linting
```bash
# Verificar linting
pnpm lint

# Arreglar linting automáticamente
pnpm lint:fix
```

### Type Checking
```bash
# Verificar tipos TypeScript
pnpm type-check
```

### Formateo de código
```bash
# Formatear código con Prettier
pnpm format

# Verificar formato
pnpm format:check
```

## 🌐 URLs de Acceso

Una vez ejecutando:
- **Web App**: http://localhost:3000
- **Supabase Dashboard**: https://app.supabase.com

## 🎨 Páginas Disponibles

### Páginas Públicas
- `/` - Landing page
- `/about` - Acerca de
- `/pricing` - Planes y precios
- `/contact` - Contacto
- `/demo` - Demo de la plataforma
- `/terms` - Términos y condiciones
- `/privacy` - Política de privacidad
- `/professionals` - Landing para profesionales

### Autenticación
- `/auth/login` - Iniciar sesión
- `/auth/register` - Registro
- `/auth/forgot-password` - Recuperar contraseña

### Dashboard (Requiere autenticación)
- `/dashboard` - Dashboard principal
- `/dashboard/analytics` - Análisis y métricas
- `/dashboard/sessions` - Sesiones
- `/dashboard/professionals` - Profesionales
- `/dashboard/chat` - Chat
- `/dashboard/billing` - Facturación
- `/dashboard/profile` - Perfil
- `/dashboard/team` - Equipo
- `/dashboard/settings` - Configuraciones
- `/dashboard/resources` - Recursos

## 🔧 Variables de Entorno

### Requeridas
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Opcionales
```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## 🐛 Troubleshooting

### Error: Port 3000 already in use
```bash
# Encontrar proceso usando el puerto
lsof -i :3000

# Matar proceso
kill -9 <PID>

# O usar otro puerto
cd apps/web
pnpm dev -- --port 3001
```

### Error: Dependencies not installed
```bash
# Limpiar e instalar de nuevo
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Error: Missing Supabase credentials
```bash
# Verificar que el archivo .env.local existe
cat apps/web/.env.local

# Si no existe, copiarlo
cp apps/web/.env.example apps/web/.env.local
```

### Error: Build fails
```bash
# Limpiar cache de Next.js
rm -rf apps/web/.next

# Limpiar cache de Turbo
rm -rf apps/web/.turbo

# Build de nuevo
pnpm build
```

## 📦 Comandos Útiles

### Limpiar proyecto
```bash
# Limpiar node_modules
rm -rf node_modules apps/web/node_modules

# Limpiar builds
rm -rf apps/web/.next apps/web/.turbo

# Reinstalar
pnpm install
```

### Ver tamaño del bundle
```bash
cd apps/web
pnpm build

# Analizar con next-bundle-analyzer (si está configurado)
ANALYZE=true pnpm build
```

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conectar repositorio con Vercel
2. Configurar root directory: `apps/web`
3. Agregar variables de entorno
4. Desplegar

### Otras plataformas
- Docker: Usar el Dockerfile en `apps/web/`
- AWS: Usar EC2 + Docker o Amplify
- Google Cloud: Cloud Run con Docker

## 📝 Notas

- La aplicación usa Next.js 14 con App Router
- Todas las páginas del dashboard usan datos mock actualmente
- La integración con Supabase está configurada y lista para usar
- Los estilos se manejan con Tailwind CSS
- Los componentes usan Lucide React para iconos
