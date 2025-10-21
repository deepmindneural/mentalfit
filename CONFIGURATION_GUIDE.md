# 🔧 GUÍA DE CONFIGURACIÓN - MENTALFIT

## 📋 ÍNDICE
1. [Internacionalización (i18n)](#internacionalización)
2. [Estado Global (Zustand)](#zustand)
3. [Data Fetching (Tanstack Query)](#tanstack-query)
4. [Validación (Zod)](#zod)
5. [Gemini AI](#gemini-ai)
6. [Stripe Pagos](#stripe)
7. [Email (SendGrid)](#sendgrid)
8. [Video Calls (Daily.co)](#dailyco)
9. [Analytics](#analytics)
10. [Seguridad](#seguridad)

---

## 🌐 INTERNACIONALIZACIÓN (next-intl)

### 1. Instalación
```bash
pnpm add next-intl
```

### 2. Estructura de Archivos
```
apps/web/
├── messages/
│   ├── es.json    # Español
│   └── en.json    # Inglés
├── src/
│   ├── i18n.ts
│   └── middleware.ts (actualizar)
```

### 3. Configuración

#### `apps/web/src/i18n.ts`
```typescript
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => ({
  messages: (await import(`../messages/${locale}.json`)).default
}));
```

#### `apps/web/src/middleware.ts`
```typescript
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es'
});

export const config = {
  matcher: ['/', '/(es|en)/:path*']
};
```

#### `apps/web/messages/es.json`
```json
{
  "common": {
    "welcome": "Bienvenido de nuevo",
    "signIn": "Iniciar Sesión",
    "signOut": "Cerrar Sesión",
    "dashboard": "Panel de Control",
    "loading": "Cargando..."
  },
  "auth": {
    "email": "Correo Electrónico",
    "password": "Contraseña",
    "forgotPassword": "¿Olvidaste tu contraseña?",
    "rememberMe": "Recordarme"
  },
  "navigation": {
    "home": "Inicio",
    "professionals": "Profesionales",
    "sessions": "Sesiones",
    "chat": "Chat",
    "analytics": "Análisis"
  }
}
```

### 4. Uso en Componentes
```typescript
'use client';

import {useTranslations} from 'next-intl';

export default function LoginPage() {
  const t = useTranslations('auth');

  return (
    <div>
      <h1>{t('email')}</h1>
      <button>{t('signIn')}</button>
    </div>
  );
}
```

---

## 🗄️ ZUSTAND (Estado Global)

### 1. Instalación
```bash
pnpm add zustand
```

### 2. Crear Stores

#### `apps/web/src/stores/authStore.ts`
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'company_admin' | 'professional' | 'user';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
```

#### `apps/web/src/stores/chatStore.ts`
```typescript
import { create } from 'zustand';

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
}

interface ChatState {
  conversations: any[];
  messages: Message[];
  addMessage: (message: Message) => void;
  setConversations: (conversations: any[]) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setConversations: (conversations) => set({ conversations }),
}));
```

### 3. Uso en Componentes
```typescript
import { useAuthStore } from '@/stores/authStore';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();

  return (
    <div>
      <p>Hola {user?.email}</p>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
}
```

---

## ⚡ TANSTACK QUERY (Data Fetching)

### 1. Instalación
```bash
pnpm add @tanstack/react-query
```

### 2. Configuración

#### `apps/web/src/app/providers.tsx`
```typescript
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

#### Actualizar `apps/web/src/app/layout.tsx`
```typescript
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

### 3. Crear Queries

#### `apps/web/src/queries/professionals.ts`
```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useProfessionals = () => {
  return useQuery({
    queryKey: ['professionals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('professionals')
        .select('*');

      if (error) throw error;
      return data;
    },
  });
};
```

### 4. Uso en Componentes
```typescript
import { useProfessionals } from '@/queries/professionals';

export default function ProfessionalsPage() {
  const { data, isLoading, error } = useProfessionals();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(pro => <div key={pro.id}>{pro.name}</div>)}
    </div>
  );
}
```

---

## ✅ ZOD (Validación)

### 1. Instalación
```bash
pnpm add zod
```

### 2. Crear Schemas

#### `apps/web/src/schemas/auth.ts`
```typescript
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
});

export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  confirmPassword: z.string(),
  name: z.string().min(2, 'Nombre muy corto'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
```

### 3. Uso con React Hook Form
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '@/schemas/auth';

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}
```

---

## 🤖 GEMINI AI

### 1. Instalación
```bash
pnpm add @google/generative-ai langchain @langchain/google-genai
```

### 2. Variables de Entorno
```env
GOOGLE_AI_API_KEY=your_gemini_api_key
```

### 3. Configuración

#### `apps/web/src/lib/gemini.ts`
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export const geminiPro = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Chat inicial
export async function chatWithGemini(message: string) {
  const chat = geminiPro.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 1000,
      temperature: 0.7,
    },
  });

  const result = await chat.sendMessage(message);
  return result.response.text();
}

// Análisis de sentimientos
export async function analyzeSentiment(text: string) {
  const prompt = `Analiza el siguiente texto y determina el sentimiento emocional.
  Responde con un JSON con: sentiment (positivo/negativo/neutral),
  riskLevel (bajo/medio/alto/crítico), emotions (array de emociones detectadas).

  Texto: ${text}`;

  const result = await geminiPro.generateContent(prompt);
  return JSON.parse(result.response.text());
}

// Detección de crisis
export async function detectCrisis(text: string) {
  const prompt = `Analiza si el siguiente mensaje indica una situación de crisis mental
  que requiere atención inmediata. Responde con un JSON:
  { isCrisis: boolean, severity: 1-10, recommendedAction: string }

  Texto: ${text}`;

  const result = await geminiPro.generateContent(prompt);
  return JSON.parse(result.response.text());
}
```

### 4. API Route Example

#### `apps/web/src/app/api/chat/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { chatWithGemini, detectCrisis } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  // Detectar crisis
  const crisisAnalysis = await detectCrisis(message);

  if (crisisAnalysis.isCrisis && crisisAnalysis.severity > 7) {
    // Enviar alerta a profesionales
    // Redirigir a soporte de emergencia
    return NextResponse.json({
      response: 'He detectado que puedes estar en crisis. Te conectaré con un profesional de inmediato.',
      crisis: true,
    });
  }

  // Chat normal
  const response = await chatWithGemini(message);

  return NextResponse.json({ response, crisis: false });
}
```

---

## 💳 STRIPE

### 1. Instalación
```bash
pnpm add @stripe/stripe-js stripe
```

### 2. Variables de Entorno
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Configuración Cliente

#### `apps/web/src/lib/stripe.ts`
```typescript
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
```

### 4. API Routes

#### `apps/web/src/app/api/stripe/checkout/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  const { priceId, customerId } = await req.json();

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
  });

  return NextResponse.json({ sessionId: session.id });
}
```

#### Webhook Handler
```typescript
// apps/web/src/app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  switch (event.type) {
    case 'customer.subscription.created':
      // Activar suscripción en Supabase
      break;
    case 'customer.subscription.deleted':
      // Desactivar suscripción
      break;
    case 'invoice.payment_succeeded':
      // Registrar pago exitoso
      break;
  }

  return NextResponse.json({ received: true });
}
```

---

## 📧 SENDGRID

### 1. Instalación
```bash
pnpm add @sendgrid/mail react-email @react-email/components
```

### 2. Variables de Entorno
```env
SENDGRID_API_KEY=SG.xxxxx
SENDGRID_FROM_EMAIL=noreply@mentalfit.com
```

### 3. Configuración

#### `apps/web/src/lib/email.ts`
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendEmail(to: string, subject: string, html: string) {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject,
    html,
  };

  await sgMail.send(msg);
}
```

### 4. Templates con React Email

#### `apps/web/emails/WelcomeEmail.tsx`
```tsx
import { Html, Head, Body, Container, Text, Button } from '@react-email/components';

interface WelcomeEmailProps {
  name: string;
}

export default function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Text>¡Bienvenido a MentalFit, {name}!</Text>
          <Button href="https://mentalfit.com/dashboard">
            Ir al Dashboard
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
```

---

## 📹 DAILY.CO (Video Calls)

### 1. Instalación
```bash
pnpm add @daily-co/daily-js
```

### 2. Variables de Entorno
```env
DAILY_API_KEY=your_daily_api_key
```

### 3. Crear Sala

#### `apps/web/src/app/api/video/create-room/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();

  const response = await fetch('https://api.daily.co/v1/rooms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DAILY_API_KEY}`,
    },
    body: JSON.stringify({
      name: `session-${sessionId}`,
      privacy: 'private',
      properties: {
        enable_recording: 'cloud',
        enable_chat: true,
      },
    }),
  });

  const room = await response.json();
  return NextResponse.json({ url: room.url });
}
```

### 4. Componente de Video

#### `apps/web/src/components/VideoCall.tsx`
```typescript
'use client';

import { useEffect, useRef } from 'react';
import Daily from '@daily-co/daily-js';

export default function VideoCall({ roomUrl }: { roomUrl: string }) {
  const callFrameRef = useRef<any>(null);

  useEffect(() => {
    const callFrame = Daily.createFrame({
      iframeStyle: {
        width: '100%',
        height: '100%',
        border: 'none',
      },
    });

    callFrame.join({ url: roomUrl });
    callFrameRef.current = callFrame;

    return () => {
      callFrame.destroy();
    };
  }, [roomUrl]);

  return <div style={{ width: '100%', height: '600px' }} />;
}
```

---

## 📊 ANALYTICS

### 1. Instalación
```bash
pnpm add mixpanel-browser @sentry/nextjs
```

### 2. Configuración Mixpanel

#### `apps/web/src/lib/analytics.ts`
```typescript
import mixpanel from 'mixpanel-browser';

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN!);

export const analytics = {
  track: (event: string, properties?: any) => {
    mixpanel.track(event, properties);
  },
  identify: (userId: string) => {
    mixpanel.identify(userId);
  },
  setUser: (properties: any) => {
    mixpanel.people.set(properties);
  },
};
```

### 3. Configuración Sentry

```bash
npx @sentry/wizard@latest -i nextjs
```

---

## 🔐 SEGURIDAD

### 1. Headers de Seguridad

#### `apps/web/src/middleware.ts`
```typescript
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const response = NextResponse.next();

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'"
  );

  return response;
}
```

### 2. Rate Limiting

#### `apps/web/src/app/api/auth/login/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';

const loginAttempts = new Map<string, number>();

export async function POST(req: NextRequest) {
  const ip = req.ip || 'unknown';
  const attempts = loginAttempts.get(ip) || 0;

  if (attempts > 5) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Intenta en 15 minutos.' },
      { status: 429 }
    );
  }

  // Login logic...

  loginAttempts.set(ip, attempts + 1);
  setTimeout(() => loginAttempts.delete(ip), 15 * 60 * 1000);

  return NextResponse.json({ success: true });
}
```

---

## ✅ CHECKLIST DE CONFIGURACIÓN

- [ ] Instalar dependencias de Fase 1
- [ ] Configurar next-intl
- [ ] Crear archivos de traducción (es.json, en.json)
- [ ] Configurar Zustand stores
- [ ] Configurar Tanstack Query
- [ ] Crear schemas con Zod
- [ ] Obtener API key de Gemini
- [ ] Configurar Gemini AI
- [ ] Crear cuenta Stripe
- [ ] Configurar webhooks de Stripe
- [ ] Configurar SendGrid
- [ ] Crear templates de email
- [ ] Crear cuenta Daily.co
- [ ] Configurar video rooms
- [ ] Configurar Mixpanel
- [ ] Instalar Sentry
- [ ] Configurar security headers
- [ ] Implementar rate limiting

---

## 🚀 SIGUIENTE PASO

Una vez completada la configuración, ejecuta:

```bash
pnpm dev
```

Y verifica que todo funcione correctamente.
