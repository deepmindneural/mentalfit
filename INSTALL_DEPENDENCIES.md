# 📦 Instalación de Dependencias MentalFit

## 🚀 FASE 1: MVP CRÍTICO (Instalar AHORA)

### Internacionalización (URGENTE - Todo está en inglés)
```bash
pnpm add next-intl @formatjs/intl
```

### Estado y Data Fetching
```bash
pnpm add zustand @tanstack/react-query zod
```

### UI Components Básicos
```bash
pnpm add @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-toast
```

### Calendario y Fechas
```bash
pnpm add dayjs react-big-calendar
```

---

## 🤖 FASE 2: IA Y CORE FEATURES

### Google Gemini AI
```bash
pnpm add @google/generative-ai langchain @langchain/google-genai
```

### Vector Database
```bash
pnpm add @pinecone-database/pinecone
```

### Utilidades
```bash
pnpm add lodash uuid slugify yup
```

---

## 💳 FASE 3: MONETIZACIÓN

### Stripe
```bash
pnpm add @stripe/stripe-js stripe
```

### Email
```bash
pnpm add @sendgrid/mail react-email @react-email/components
```

---

## 📞 FASE 4: COMUNICACIONES

### Video Calls
```bash
pnpm add @daily-co/daily-js
# Alternativa: pnpm add agora-rtc-sdk-ng
```

### WebSockets (opcional)
```bash
pnpm add socket.io-client
```

---

## 📊 FASE 5: ANALYTICS Y MONITORING

### Analytics
```bash
pnpm add mixpanel-browser @hotjar/browser
```

### Error Tracking
```bash
pnpm add @sentry/nextjs
```

### Session Replay
```bash
pnpm add logrocket logrocket-react
```

### Gráficas
```bash
pnpm add chart.js react-chartjs-2 @tremor/react
```

---

## 🔐 FASE 6: SEGURIDAD

### Security
```bash
pnpm add helmet bcryptjs jsonwebtoken
```

### 2FA
```bash
pnpm add otpauth qrcode
```

### Rate Limiting
```bash
pnpm add express-rate-limit
```

---

## 🧪 FASE 7: TESTING

### Unit Tests
```bash
pnpm add -D jest @types/jest @testing-library/react @testing-library/jest-dom
```

### E2E Tests
```bash
pnpm add -D @playwright/test
```

---

## 🎨 FASE 8: UI AVANZADO

### Radix UI Completo
```bash
pnpm add @radix-ui/react-tooltip @radix-ui/react-popover @radix-ui/react-tabs @radix-ui/react-switch @radix-ui/react-slider @radix-ui/react-progress
```

### Formularios
```bash
pnpm add react-select react-dropzone
```

---

## 📦 COMANDOS RÁPIDOS POR FASE

### TODO EN UNO - FASE 1 (MVP)
```bash
pnpm add next-intl @formatjs/intl zustand @tanstack/react-query zod @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-toast dayjs react-big-calendar lodash uuid slugify yup
```

### TODO EN UNO - FASE 2 (IA)
```bash
pnpm add @google/generative-ai langchain @langchain/google-genai @pinecone-database/pinecone
```

### TODO EN UNO - FASE 3 (Pagos)
```bash
pnpm add @stripe/stripe-js stripe @sendgrid/mail react-email @react-email/components
```

### TODO EN UNO - FASE 4 (Comunicaciones)
```bash
pnpm add @daily-co/daily-js
```

### TODO EN UNO - FASE 5 (Analytics)
```bash
pnpm add mixpanel-browser @hotjar/browser @sentry/nextjs logrocket logrocket-react chart.js react-chartjs-2 @tremor/react
```

### TODO EN UNO - FASE 6 (Seguridad)
```bash
pnpm add helmet bcryptjs jsonwebtoken otpauth qrcode express-rate-limit
```

### TODO EN UNO - FASE 7 (Testing)
```bash
pnpm add -D jest @types/jest @testing-library/react @testing-library/jest-dom @playwright/test
```

---

## 🎯 INSTALACIÓN COMPLETA (TODAS LAS FASES)

```bash
# Producción
pnpm add next-intl @formatjs/intl zustand @tanstack/react-query zod @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-toast dayjs react-big-calendar lodash uuid slugify yup @google/generative-ai langchain @langchain/google-genai @pinecone-database/pinecone @stripe/stripe-js stripe @sendgrid/mail react-email @react-email/components @daily-co/daily-js mixpanel-browser @hotjar/browser @sentry/nextjs logrocket logrocket-react chart.js react-chartjs-2 @tremor/react helmet bcryptjs jsonwebtoken otpauth qrcode express-rate-limit @radix-ui/react-tooltip @radix-ui/react-popover @radix-ui/react-tabs @radix-ui/react-switch react-select react-dropzone

# Desarrollo
pnpm add -D jest @types/jest @testing-library/react @testing-library/jest-dom @playwright/test
```

---

## ⚠️ VARIABLES DE ENTORNO REQUERIDAS

Crea un archivo `.env.local` con:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Gemini AI
GOOGLE_AI_API_KEY=your_gemini_api_key
VERTEX_AI_PROJECT_ID=your_project_id
VERTEX_AI_LOCATION=us-central1

# Pinecone
PINECONE_API_KEY=your_pinecone_key
PINECONE_ENVIRONMENT=your_environment

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# SendGrid
SENDGRID_API_KEY=your_sendgrid_key
SENDGRID_FROM_EMAIL=noreply@mentalfit.com

# Daily.co
DAILY_API_KEY=your_daily_api_key

# Analytics
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_token
NEXT_PUBLIC_HOTJAR_ID=your_hotjar_id
SENTRY_DSN=your_sentry_dsn
LOGROCKET_APP_ID=your_logrocket_id

# Security
JWT_SECRET=your_jwt_secret_min_32_chars
ENCRYPTION_KEY=your_encryption_key_32_chars

# URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## 📝 NOTAS

- **pnpm**: Asegúrate de usar pnpm 8.15.1+
- **Node.js**: Versión 18+
- **Turbo**: El monorepo ya está configurado
- **Docker**: Opcional para desarrollo local

---

## 🔍 VERIFICACIÓN POST-INSTALACIÓN

```bash
# Verificar dependencias
pnpm list

# Verificar tipos
pnpm type-check

# Construir proyecto
pnpm build

# Ejecutar dev
pnpm dev
```
