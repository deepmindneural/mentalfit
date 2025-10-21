# 📦 INSTALACIÓN MINIMALISTA - MENTALFIT

## 🎯 FILOSOFÍA
Solo instalamos lo **absolutamente necesario**. Sin dependencias innecesarias.

---

## ✅ LO QUE YA TIENES INSTALADO

```json
{
  "next": "14.2.30",                     ✅
  "react": "18.3.1",                     ✅
  "react-dom": "18.3.1",                 ✅
  "typescript": "5.5.4",                 ✅
  "@supabase/supabase-js": "2.75.0",    ✅
  "@supabase/ssr": "0.7.0",             ✅
  "@headlessui/react": "1.7.19",        ✅
  "@heroicons/react": "2.0.18",         ✅
  "framer-motion": "11.3.21",           ✅
  "lucide-react": "0.427.0",            ✅
  "react-hook-form": "7.52.1",          ✅
  "react-hot-toast": "2.4.1",           ✅
  "recharts": "2.12.7",                 ✅
  "date-fns": "3.6.0",                  ✅
  "clsx": "2.1.1",                      ✅
  "axios": "1.7.2",                     ✅
  "js-cookie": "3.0.5"                  ✅
}
```

**Total ya instalado:** 17 paquetes ✅

---

## 📦 LO QUE FALTA INSTALAR

### 🔴 CRÍTICO - Instalar YA (Semana 1)

```bash
# i18n (TODO está en inglés)
pnpm add next-intl

# Estado Global
pnpm add zustand

# Validación de Schemas
pnpm add zod

# Data Fetching y Cache
pnpm add @tanstack/react-query

# UI Components Mínimos
pnpm add @radix-ui/react-dialog
pnpm add @radix-ui/react-dropdown-menu
pnpm add @radix-ui/react-select
pnpm add @radix-ui/react-toast

# Formularios - Resolvers
pnpm add @hookform/resolvers

# Utilidades Básicas
pnpm add lodash
pnpm add uuid
```

**Comando TODO EN UNO:**
```bash
pnpm add next-intl zustand zod @tanstack/react-query @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-toast @hookform/resolvers lodash uuid
```

---

### 🟡 IMPORTANTE - Instalar Semana 3

```bash
# Calendario Propio
pnpm add react-big-calendar
pnpm add dayjs

# Gráficas para Analytics
pnpm add chart.js
pnpm add react-chartjs-2
```

**Comando TODO EN UNO:**
```bash
pnpm add react-big-calendar dayjs chart.js react-chartjs-2
```

---

### 🟢 APIS EXTERNAS - Instalar según necesidad

```bash
# STRIPE (Semana 7)
pnpm add @stripe/stripe-js stripe

# GEMINI AI (Semana 6)
pnpm add @google/generative-ai

# SENDGRID (Semana 8)
pnpm add @sendgrid/mail
```

**Comando TODO EN UNO:**
```bash
pnpm add @stripe/stripe-js stripe @google/generative-ai @sendgrid/mail
```

---

### 🧪 TESTING (Opcional - Semana 12)

```bash
pnpm add -D jest @types/jest
pnpm add -D @testing-library/react
pnpm add -D @testing-library/jest-dom
pnpm add -D @playwright/test
```

---

## 🚀 INSTALACIÓN COMPLETA (TODO DE UNA VEZ)

Si quieres instalar todo de una sola vez:

```bash
# Producción
pnpm add next-intl zustand zod @tanstack/react-query @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-toast @hookform/resolvers lodash uuid react-big-calendar dayjs chart.js react-chartjs-2 @stripe/stripe-js stripe @google/generative-ai @sendgrid/mail

# Dev Dependencies
pnpm add -D @types/lodash @types/uuid jest @types/jest @testing-library/react @testing-library/jest-dom @playwright/test
```

---

## 📊 RESUMEN DE DEPENDENCIAS

### Total de Dependencias:

| Categoría | Ya tienes | Faltan | Total |
|-----------|-----------|--------|-------|
| **Core** | 7 | 0 | 7 |
| **UI/UX** | 6 | 4 | 10 |
| **Estado/Data** | 1 | 3 | 4 |
| **Forms** | 1 | 1 | 2 |
| **Calendario** | 0 | 2 | 2 |
| **Gráficas** | 1 | 2 | 3 |
| **Utilidades** | 2 | 2 | 4 |
| **APIs Externas** | 1 | 3 | 4 |
| **Testing** | 0 | 4 | 4 |
| **TOTAL** | **17** | **21** | **38** |

---

## ⚙️ VARIABLES DE ENTORNO

Crea `.env.local`:

```env
# Supabase (Ya deberías tenerlo)
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Gemini AI (Obtener en: https://aistudio.google.com/app/apikey)
GOOGLE_AI_API_KEY=AIzaSy...

# Stripe (Obtener en: https://dashboard.stripe.com/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# SendGrid (Obtener en: https://app.sendgrid.com/settings/api_keys)
SENDGRID_API_KEY=SG....
SENDGRID_FROM_EMAIL=noreply@mentalfit.com

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Security
JWT_SECRET=tu-secreto-minimo-32-caracteres-aleatorios
ENCRYPTION_KEY=otro-secreto-32-caracteres-aleatorios
```

---

## 🔐 API KEYS A OBTENER

### 1. Supabase (Ya deberías tenerlo)
- URL: https://app.supabase.com
- Ir a Settings → API
- Copiar: Project URL y anon key

### 2. Gemini AI
- URL: https://aistudio.google.com/app/apikey
- Crear cuenta Google (gratis)
- Generar API key
- **Costo:** Pay-as-you-go (~$0.0001 per request)

### 3. Stripe
- URL: https://dashboard.stripe.com/register
- Activar cuenta
- Ir a Developers → API keys
- Obtener: Publishable key y Secret key
- **Costo:** 2.9% + $0.30 por transacción

### 4. SendGrid
- URL: https://signup.sendgrid.com
- Plan Free (100 emails/día)
- Settings → API Keys → Create API Key
- **Costo:** Gratis hasta 100/día, luego $15/mes

---

## ✅ VERIFICACIÓN POST-INSTALACIÓN

```bash
# 1. Verificar que todo se instaló
pnpm list

# 2. Verificar tipos de TypeScript
pnpm type-check

# 3. Linting
pnpm lint

# 4. Build
pnpm build

# 5. Ejecutar dev
pnpm dev
```

Si todo funciona correctamente:
```
✓ Ready in 2.5s
✓ Compiled in 850ms
Local: http://localhost:3000
```

---

## 📝 SIGUIENTE PASO

Después de instalar:

1. Configurar next-intl → Ver `CONFIGURATION_GUIDE.md`
2. Crear archivos de traducción
3. Configurar Zustand stores
4. Conectar Supabase Auth

---

## 🚫 LO QUE NO INSTALAMOS (Y POR QUÉ)

### ❌ NO instalar:

```
❌ Mixpanel          → Analytics propios con PostgreSQL
❌ Google Analytics  → Analytics propios con PostgreSQL
❌ Hotjar            → No necesario en MVP
❌ LogRocket         → No necesario en MVP
❌ Sentry (por ahora)→ Solo en Fase 3
❌ Daily.co          → Video por link externo
❌ Agora             → Video por link externo
❌ Twilio            → No necesitamos SMS
❌ Socket.io         → Supabase Realtime ya lo hace
❌ Pinecone          → Vector DB innecesario
❌ LangChain         → Gemini directo es suficiente
❌ OpenAI            → Usamos Gemini
❌ Vercel Analytics  → PostgreSQL + Chart.js
❌ PostHog           → No necesario
❌ Prisma            → Supabase ya tiene ORM
❌ Drizzle           → Supabase ya tiene ORM
```

**Ahorro:** ~15 dependencias y ~$400/mes

---

## 💡 FILOSOFÍA DE DECISIÓN

### ¿Cuándo instalar algo nuevo?

Pregúntate:

1. ✅ **¿Es absolutamente necesario?**
2. ✅ **¿No lo puedo hacer con lo que ya tengo?**
3. ✅ **¿Vale la pena la complejidad adicional?**
4. ✅ **¿El costo/beneficio es positivo?**

Si las 4 respuestas son SÍ → Instalar
Si alguna es NO → No instalar

---

## 📊 COMPARATIVA

### ANTES (Plan Original):
- **Dependencias:** 60+
- **Costos:** $620/mes
- **Complejidad:** Alta
- **Tiempo:** 5 meses

### AHORA (Plan Minimalista):
- **Dependencias:** 38
- **Costos:** $120/mes
- **Complejidad:** Media
- **Tiempo:** 3 meses

**Mejora:** -37% dependencias, -81% costos, -40% tiempo

---

## 🎯 PRÓXIMO COMANDO

```bash
# Instalar lo CRÍTICO ahora
pnpm add next-intl zustand zod @tanstack/react-query @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-toast @hookform/resolvers lodash uuid

# Verificar
pnpm dev
```

¡Listo para empezar! 🚀
