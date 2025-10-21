# Módulo de Autenticación MentalFit - Documentación

## Resumen de Implementación

Se ha implementado un módulo completo de autenticación para MentalFit con las siguientes características:

### Tecnologías Utilizadas
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Supabase Auth + MFA**
- **React Hook Form**
- **Zod** (validación)
- **next-intl** (internacionalización ES/EN)
- **Framer Motion** (animaciones)

---

## Archivos Creados

### 1. Configuración y Validadores

#### `/src/lib/i18n.ts`
Configuración de internacionalización con next-intl.

#### `/src/lib/validadores/autenticacion.ts`
Schemas de validación Zod para todos los formularios:
- `esquemaLogin`
- `esquemaRegistroPaso1`, `esquemaRegistroPaso2`, `esquemaRegistroPaso3`
- `esquemaOlvideContrasena`
- `esquemaRestablecerContrasena`
- `esquemaCodigo2FA`
- Función `calcularFortalezaContrasena()`

---

### 2. Traducciones (i18n)

#### `/messages/es.json`
Todas las traducciones en español para el módulo de autenticación.

#### `/messages/en.json`
Todas las traducciones en inglés para el módulo de autenticación.

**Claves principales:**
- `auth.login.*`
- `auth.register.*`
- `auth.forgotPassword.*`
- `auth.resetPassword.*`
- `auth.verifyEmail.*`
- `auth.twoFactor.*`
- `auth.passwordStrength.*`
- `auth.errors.*`
- `auth.success.*`

---

### 3. Componentes Reutilizables

#### `/src/components/autenticacion/IndicadorFortalezaContrasena.tsx`
- Muestra barra visual de fortaleza de contraseña
- Colores: rojo (débil), amarillo (media), verde (fuerte)
- Lista de requisitos con checkmarks
- Calcula fortaleza en tiempo real

#### `/src/components/autenticacion/RecordarmeCheckbox.tsx`
- Checkbox estilizado para "Recordarme"
- Completamente accesible
- Textos i18n

#### `/src/components/autenticacion/ModalSesionExpirada.tsx`
- Modal con overlay oscuro
- Animaciones con Framer Motion
- Auto-logout al cerrar
- Bloqueo de scroll cuando está abierto

---

### 4. Formularios Principales

#### `/src/components/autenticacion/FormularioLogin.tsx`
**Características:**
- React Hook Form + Zod
- Campos: email, contraseña, recordarme
- Toggle mostrar/ocultar contraseña
- Validación en tiempo real
- Integración Supabase Auth
- Detección de 2FA activo
- Manejo de errores específicos con toast
- Loading states

#### `/src/components/autenticacion/FormularioRegistro.tsx`
**Wizard de 3 Pasos:**

**Paso 1 - Información Personal:**
- Nombre
- Apellido
- Email

**Paso 2 - Información de Empresa:**
- Nombre de empresa
- Tamaño de empresa (select)
- Cargo
- Rol en plataforma (select)

**Paso 3 - Seguridad:**
- Contraseña
- Confirmar contraseña
- Indicador de fortaleza integrado

**Características:**
- Navegación entre pasos con validación
- Barra de progreso visual
- Animaciones entre pasos
- Acumulación de datos entre pasos
- Integración con Supabase
- Metadata almacenado en user_metadata

#### `/src/components/autenticacion/FormularioOlvideContrasena.tsx`
**Características:**
- Campo email con validación
- Estado de éxito con feedback visual
- Supabase `resetPasswordForEmail()`
- Instrucciones post-envío
- Botón volver al login

#### `/src/components/autenticacion/FormularioRestablecerContrasena.tsx`
**Características:**
- Obtiene token de URL params
- Valida token automáticamente
- Campos: nueva contraseña, confirmar
- Indicador de fortaleza integrado
- Supabase `updateUser()`
- Estados: cargando, inválido, exitoso
- Auto-redirección post-éxito

#### `/src/components/autenticacion/ComponenteVerificarEmail.tsx`
**Características:**
- Mensaje de verificación pendiente
- Botón reenviar email
- Cooldown de 60 segundos
- Contador regresivo
- Supabase `resend()`
- Estado visual de éxito

---

### 5. Autenticación de Dos Factores (2FA)

#### `/src/components/autenticacion/ConfiguracionAutenticacionDosFactor.tsx`
**Características:**
- Genera secret con Supabase MFA
- Muestra QR code (qrcode.react)
- Opción de ingreso manual del secret
- Input de 6 dígitos para verificación
- Supabase `mfa.enroll()`
- Validación del código
- Estados de carga y error

#### `/src/components/autenticacion/VerificacionAutenticacionDosFactor.tsx`
**Características:**
- Input de 6 dígitos optimizado
- Auto-submit al completar
- Validación en tiempo real
- Supabase `mfa.verify()`
- Manejo de códigos inválidos
- Opción de código de respaldo
- Loading states

---

### 6. Hooks Personalizados

#### `/src/hooks/useAutenticacion.ts`
**Funcionalidad:**
- Estado de usuario actual
- `iniciarSesion(opciones)` - Login con email/password
- `registrarse(opciones)` - Registro de nuevo usuario
- `cerrarSesion()` - Logout y redirección
- `actualizarPerfil(datos)` - Actualizar metadata del usuario
- `verificarSesion()` - Verificar sesión actual
- Listener de cambios de auth state
- Detección de 2FA requerido
- Estados: `usuario`, `cargando`, `error`, `estaAutenticado`

#### `/src/hooks/useTiempoExpiracionSesion.ts`
**Funcionalidad:**
- Detecta inactividad (15 minutos por defecto)
- Muestra advertencia 2 minutos antes
- Auto-logout si no hay interacción
- Reset automático con eventos del usuario
- Throttling para evitar demasiadas llamadas
- `extenderSesion()` - Extender manualmente
- `resetearTimer()` - Resetear inactividad
- Estados: `sesionExpirada`, `mostrandoAdvertencia`, `tiempoRestante`

**Eventos monitoreados:**
- mousedown, mousemove
- keypress, scroll
- touchstart, click

---

### 7. Páginas

#### `/src/app/auth/login/page.tsx`
Página de inicio de sesión con `FormularioLogin`.

#### `/src/app/auth/register/page.tsx`
Página de registro con `FormularioRegistro` (wizard de 3 pasos).

#### `/src/app/auth/forgot-password/page.tsx`
Página de recuperación de contraseña con `FormularioOlvideContrasena`.

#### `/src/app/auth/reset-password/page.tsx`
Página para restablecer contraseña con `FormularioRestablecerContrasena`.

#### `/src/app/auth/verify-email/page.tsx`
Página de verificación de email con `ComponenteVerificarEmail`.

#### `/src/app/auth/2fa-setup/page.tsx`
Página de configuración de 2FA con `ConfiguracionAutenticacionDosFactor`.

#### `/src/app/auth/2fa-verify/page.tsx`
Página de verificación de 2FA con `VerificacionAutenticacionDosFactor`.

---

## Dependencias Instaladas

```bash
pnpm --filter @mentalfit/web add zod next-intl @hookform/resolvers qrcode.react
```

**Dependencias agregadas:**
- `zod` - Validación de schemas
- `next-intl` - Internacionalización
- `@hookform/resolvers` - Integración Zod con React Hook Form
- `qrcode.react` - Generación de códigos QR para 2FA

---

## Configuración Realizada

### `next.config.js`
```javascript
const withNextIntl = require('next-intl/plugin')();
module.exports = withNextIntl(nextConfig);
```

### `src/middleware.ts`
Actualizado para incluir middleware de next-intl con configuración:
- Locales: `['es', 'en']`
- Default locale: `'es'`
- Locale prefix: `'as-needed'`

### `i18n.ts`
Archivo de configuración de next-intl en la raíz del proyecto.

---

## Flujos de Usuario

### 1. Registro de Usuario
1. Usuario visita `/auth/register`
2. Completa paso 1 (info personal)
3. Completa paso 2 (info empresa)
4. Completa paso 3 (contraseña)
5. Se registra en Supabase
6. Redirección a `/auth/verify-email`
7. Usuario verifica email
8. Acceso a dashboard

### 2. Inicio de Sesión
1. Usuario visita `/auth/login`
2. Ingresa email y contraseña
3. Si tiene 2FA: redirige a `/auth/2fa-verify`
4. Si no tiene 2FA: acceso directo a dashboard

### 3. Recuperación de Contraseña
1. Usuario visita `/auth/forgot-password`
2. Ingresa email
3. Recibe correo con link
4. Click en link → `/auth/reset-password?token=...`
5. Ingresa nueva contraseña
6. Redirección a `/auth/login`

### 4. Configuración de 2FA
1. Usuario en dashboard va a configuración
2. Click en "Activar 2FA" → `/auth/2fa-setup`
3. Escanea QR con app de autenticación
4. Ingresa código de verificación
5. 2FA activado
6. Próximo login requerirá código 2FA

### 5. Verificación 2FA en Login
1. Usuario inicia sesión
2. Sistema detecta 2FA activo
3. Redirección a `/auth/2fa-verify`
4. Usuario ingresa código de 6 dígitos
5. Auto-submit al completar
6. Acceso a dashboard

### 6. Expiración de Sesión
1. Usuario inactivo por 15 minutos
2. Sistema muestra advertencia 2 minutos antes
3. Usuario puede extender sesión
4. Si no hay interacción: auto-logout
5. Modal de sesión expirada
6. Redirección a login

---

## Características de Diseño

### Colores
- **Primary:** green-500 (#22c55e)
- **Secondary:** yellow-500 (#eab308)
- **Gradiente de fondo:** `from-primary-50 via-white to-secondary-50`

### Componentes de UI
- Cards con `rounded-xl` y `shadow-lg`
- Inputs con `rounded-lg` y focus ring primary-500
- Botones con clases `.btn-primary` y `.btn-secondary`
- Animaciones suaves con Framer Motion

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl, 2xl
- Layouts flexibles con Flexbox y Grid

### Accesibilidad
- ARIA labels en todos los inputs
- Focus states visibles
- Keyboard navigation completa
- Semantic HTML
- Screen reader friendly

---

## Integración con Supabase

### Métodos utilizados:

**Auth:**
- `supabase.auth.signInWithPassword()`
- `supabase.auth.signUp()`
- `supabase.auth.signOut()`
- `supabase.auth.getUser()`
- `supabase.auth.getSession()`
- `supabase.auth.resetPasswordForEmail()`
- `supabase.auth.updateUser()`
- `supabase.auth.resend()`

**MFA:**
- `supabase.auth.mfa.enroll()`
- `supabase.auth.mfa.challenge()`
- `supabase.auth.mfa.verify()`

**Auth State Listener:**
```typescript
supabase.auth.onAuthStateChange((evento, sesion) => {
  // Eventos: SIGNED_IN, SIGNED_OUT, TOKEN_REFRESHED, USER_UPDATED
});
```

---

## Manejo de Errores

### Errores Específicos Manejados:
- `Invalid login credentials` → Credenciales inválidas
- `Email not confirmed` → Email no verificado
- `Too many requests` → Demasiados intentos
- `Email already registered` → Email ya registrado
- `Invalid or expired token` → Token inválido
- `Invalid 2FA code` → Código 2FA inválido

### Toast Notifications:
- Éxito: verde
- Error: rojo
- Info: azul
- Advertencia: amarillo

---

## Testing Manual

### Test de Login:
1. Ir a `/auth/login`
2. Ingresar credenciales válidas
3. Verificar redirección a dashboard
4. Probar toggle de mostrar/ocultar contraseña
5. Probar checkbox "Recordarme"
6. Probar errores de validación

### Test de Registro:
1. Ir a `/auth/register`
2. Completar paso 1 con datos válidos
3. Click "Siguiente"
4. Completar paso 2
5. Click "Siguiente"
6. Ingresar contraseña y verificar indicador de fortaleza
7. Verificar que contraseñas coincidan
8. Crear cuenta
9. Verificar redirección a verify-email

### Test de Recuperación de Contraseña:
1. Ir a `/auth/forgot-password`
2. Ingresar email
3. Verificar mensaje de éxito
4. (Simular) Click en link de email
5. Ir a `/auth/reset-password?token=xxx`
6. Ingresar nueva contraseña
7. Verificar indicador de fortaleza
8. Restablecer contraseña
9. Verificar redirección a login

### Test de 2FA:
1. Configurar 2FA en `/auth/2fa-setup`
2. Escanear QR
3. Ingresar código
4. Verificar activación
5. Cerrar sesión
6. Iniciar sesión nuevamente
7. Verificar redirección a `/auth/2fa-verify`
8. Ingresar código 2FA
9. Verificar acceso a dashboard

### Test de Expiración de Sesión:
1. Iniciar sesión
2. Esperar 13 minutos (o modificar tiempo en hook)
3. Verificar advertencia de expiración
4. Opción 1: Extender sesión
5. Opción 2: Dejar expirar
6. Verificar modal de sesión expirada
7. Verificar auto-logout

---

## Posibles Mejoras Futuras

1. **Autenticación Social:**
   - Google OAuth
   - GitHub OAuth
   - LinkedIn OAuth

2. **Seguridad Avanzada:**
   - Códigos de respaldo para 2FA
   - Historial de dispositivos
   - Notificaciones de inicio de sesión
   - Detección de ubicación sospechosa

3. **UX Mejorado:**
   - Recordar último email usado
   - Sugerencias de contraseña segura
   - Validación de email en tiempo real
   - Prevención de bots con CAPTCHA

4. **Analytics:**
   - Tracking de eventos de auth
   - Métricas de conversión
   - Puntos de abandono en registro

5. **Testing:**
   - Tests unitarios con Jest
   - Tests de integración con Playwright
   - Tests de accesibilidad
   - Tests E2E del flujo completo

---

## Notas Importantes

1. **Todo el código está en español** (nombres de archivos, componentes, variables, funciones, comentarios)
2. **La UI es bilingüe** (ES/EN) mediante next-intl
3. **Solo se usa Tailwind CSS** (no CSS modules, no styled-components)
4. **TypeScript estricto** en todos los archivos
5. **Validación robusta** con Zod en todos los formularios
6. **Diseño responsive** mobile-first
7. **Accesibilidad** como prioridad (ARIA, keyboard nav, semantic HTML)
8. **Manejo de errores** completo con mensajes específicos
9. **Loading states** en todas las operaciones async
10. **Integración completa** con Supabase Auth + MFA

---

## Contacto y Soporte

Para preguntas o problemas con el módulo de autenticación, contactar al equipo de desarrollo.

**Última actualización:** 2025-10-21
