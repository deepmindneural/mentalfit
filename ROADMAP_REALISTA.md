# 🚀 ROADMAP REALISTA - MENTALFIT (3 Meses)

## 📊 OVERVIEW
- **Duración Total:** 12 semanas (3 meses)
- **APIs Externas:** Solo 4 (Stripe, Gemini, SendGrid, Supabase)
- **Equipo:** 2-3 desarrolladores full-time
- **Enfoque:** Minimalista, autocontenido, sin dependencias innecesarias

---

## 🔴 FASE 1: MVP - SEMANAS 1-4 (1 mes)

### **SEMANA 1: Setup y Autenticación**

#### Día 1-2: Configuración Inicial
- [ ] Instalar dependencias mínimas
  ```bash
  pnpm add next-intl zustand zod @tanstack/react-query @radix-ui/react-dialog @radix-ui/react-dropdown-menu lodash uuid
  ```
- [ ] Configurar next-intl para español
- [ ] Crear archivos de traducción (es.json, en.json)
- [ ] Configurar Zustand stores básicos
- [ ] Configurar Tanstack Query

#### Día 3-5: Autenticación Real
- [ ] Conectar Supabase Auth
- [ ] Login funcional
- [ ] Registro funcional
- [ ] Recuperación de contraseña
- [ ] Protección de rutas con middleware
- [ ] Verificación de email

**Entregable Semana 1:** Login/registro funcional en español

---

### **SEMANA 2: Gestión de Usuarios**

#### Sistema de Roles
- [ ] Crear tabla `profiles` con roles
- [ ] Middleware de verificación de roles
- [ ] Dashboard diferenciado por rol:
  - Super Admin
  - Admin Empresa
  - Profesional
  - Empleado

#### CRUD Básico
- [ ] **Super Admin:**
  - Listar empresas
  - Crear/editar/eliminar empresas
  - Listar profesionales
  - Aprobar/rechazar profesionales

- [ ] **Admin Empresa:**
  - Listar empleados
  - Invitar empleados (enviar email)
  - Asignar beneficios
  - Ver dashboard básico

- [ ] **Profesional:**
  - Completar perfil profesional
  - Subir foto (Supabase Storage)
  - Definir especialidades

- [ ] **Empleado:**
  - Completar perfil personal
  - Ver profesionales disponibles

**Entregable Semana 2:** CRUD de usuarios por rol funcional

---

### **SEMANA 3: Calendario Propio**

#### Desarrollo del Calendario
- [ ] Instalar react-big-calendar
  ```bash
  pnpm add react-big-calendar dayjs
  ```
- [ ] Componente de calendario mensual
- [ ] Vista semanal y diaria
- [ ] Tabla `availability` en Supabase
- [ ] Tabla `appointments` en Supabase

#### Funcionalidades
- [ ] **Profesional:**
  - Definir disponibilidad horaria
  - Bloquear días/horas
  - Ver citas agendadas
  - Agregar link de videollamada a cita

- [ ] **Empleado:**
  - Ver disponibilidad de profesionales
  - Reservar citas
  - Cancelar/reprogramar (con límite de tiempo)
  - Recibir confirmación por email

#### Zonas Horarias
- [ ] Detectar zona horaria del usuario
- [ ] Convertir horarios automáticamente
- [ ] Mostrar hora local en calendario

**Entregable Semana 3:** Sistema de calendario propio funcional

---

### **SEMANA 4: Chat Interno**

#### Chat con Supabase Realtime
- [ ] Tabla `conversations` en Supabase
- [ ] Tabla `messages` en Supabase
- [ ] Configurar Supabase Realtime
- [ ] Componente de chat UI

#### Funcionalidades
- [ ] Iniciar conversación profesional-paciente
- [ ] Enviar/recibir mensajes en tiempo real
- [ ] Indicador "escribiendo..."
- [ ] Historial de mensajes
- [ ] Adjuntar archivos (Supabase Storage)
- [ ] Notificación de nuevo mensaje (badge)

#### Restricciones
- [ ] Solo chat entre profesional y sus pacientes
- [ ] No chat grupal (Fase 2)
- [ ] Sin llamadas de voz (link externo)

**Entregable Semana 4:** Chat funcional entre profesional-paciente

---

## 🟡 FASE 2: CORE FEATURES - SEMANAS 5-8 (1 mes)

### **SEMANA 5: Evaluaciones Psicométricas**

#### Desarrollo de Tests
- [ ] Crear componente de formulario dinámico
- [ ] Tabla `assessments` en Supabase
- [ ] Tabla `assessment_results` en Supabase

#### Tests a Implementar
- [ ] **Test GAD-7 (Ansiedad)**
  - 7 preguntas
  - Escala 0-3
  - Cálculo automático de score
  - Interpretación de resultados

- [ ] **Test PHQ-9 (Depresión)**
  - 9 preguntas
  - Escala 0-3
  - Severidad automática

- [ ] **Test de Estrés**
  - 10 preguntas custom
  - Score de estrés

- [ ] **Test de Burnout**
  - 15 preguntas
  - Dimensiones: agotamiento, cinismo, eficacia

- [ ] **Satisfacción Laboral**
  - 8 preguntas
  - Score de satisfacción

#### Funcionalidades
- [ ] Empleado puede tomar evaluaciones
- [ ] Historial de evaluaciones
- [ ] Gráfica de progreso (Chart.js)
- [ ] Alerta automática si score crítico (>70% severidad)
- [ ] Notificar a profesional asignado
- [ ] Exportar PDF de resultados

**Entregable Semana 5:** 5 evaluaciones psicométricas funcionales

---

### **SEMANA 6: Integración Gemini AI**

#### Setup
- [ ] Obtener API key de Gemini
  ```bash
  pnpm add @google/generative-ai
  ```
- [ ] Configurar en Edge Functions de Supabase
- [ ] Crear sistema de prompts

#### Funcionalidades IA
- [ ] **Chat Bot Inicial**
  - Primer contacto con usuario
  - Triaje básico (ansiedad, urgencia)
  - Recomendación de profesional

- [ ] **Análisis de Evaluaciones**
  - Resumen de resultados en lenguaje natural
  - Recomendaciones personalizadas

- [ ] **Resúmenes de Sesiones**
  - Profesional escribe notas
  - IA genera resumen ejecutivo

- [ ] **Detección de Crisis**
  - Análisis de mensajes en chat
  - Alerta si detecta lenguaje de riesgo
  - Protocolo de emergencia

#### Rate Limiting
- [ ] Límite de 100 requests/día por usuario
- [ ] Cache de respuestas comunes

**Entregable Semana 6:** IA funcional con Gemini

---

### **SEMANA 7: Integración Stripe**

#### Setup
- [ ] Crear cuenta Stripe
  ```bash
  pnpm add @stripe/stripe-js stripe
  ```
- [ ] Configurar webhooks
- [ ] Tabla `subscriptions` en Supabase

#### Productos y Precios
- [ ] Crear productos en Stripe:
  - Plan Starter (1-50 empleados)
  - Plan Growth (51-200 empleados)
  - Plan Enterprise (200+ empleados)

- [ ] Multi-moneda (COP y USD)

#### Funcionalidades
- [ ] Checkout de suscripción
- [ ] Portal de cliente Stripe (auto-gestión)
- [ ] Webhooks:
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`

- [ ] Control de acceso por estado de suscripción
- [ ] Bloqueo si pago falla
- [ ] Facturas en dashboard

**Entregable Semana 7:** Sistema de pagos funcional

---

### **SEMANA 8: Emails con SendGrid**

#### Setup
- [ ] Crear cuenta SendGrid
  ```bash
  pnpm add @sendgrid/mail
  ```
- [ ] Configurar dominio
- [ ] Verificar DKIM/SPF

#### Templates de Email
- [ ] Bienvenida (registro)
- [ ] Verificación de email
- [ ] Invitación a empleado
- [ ] Confirmación de cita
- [ ] Recordatorio de cita (24h antes)
- [ ] Cancelación de cita
- [ ] Resultados de evaluación
- [ ] Alerta de crisis (a profesional)
- [ ] Pago exitoso
- [ ] Pago fallido

#### Sistema de Notificaciones
- [ ] Tabla `notifications` en Supabase
- [ ] Notificaciones web (browser nativo)
- [ ] Badge de no leídas
- [ ] Marcar como leída
- [ ] Centro de notificaciones en UI

**Entregable Semana 8:** Sistema de notificaciones completo

---

## 🟢 FASE 3: MEJORAS Y ANALYTICS - SEMANAS 9-12 (1 mes)

### **SEMANA 9: Analytics Propios**

#### Setup
- [ ] Instalar Chart.js
  ```bash
  pnpm add chart.js react-chartjs-2
  ```
- [ ] Crear vistas materializadas en PostgreSQL

#### Métricas por Rol

**Super Admin:**
- [ ] Total de empresas activas
- [ ] Total de usuarios (empleados + profesionales)
- [ ] Total de sesiones completadas
- [ ] Ingresos totales
- [ ] Crecimiento mensual
- [ ] Empresas por plan
- [ ] Profesionales más activos

**Admin Empresa:**
- [ ] Empleados registrados vs invitados
- [ ] Empleados activos (último mes)
- [ ] Sesiones realizadas
- [ ] Evaluaciones completadas
- [ ] Score promedio de bienestar
- [ ] Uso por departamento
- [ ] ROI estimado (fórmula básica)

**Profesional:**
- [ ] Total de pacientes
- [ ] Sesiones este mes
- [ ] Ingresos generados
- [ ] Rating promedio
- [ ] Horas trabajadas
- [ ] Próximas citas

**Empleado:**
- [ ] Sesiones completadas
- [ ] Próximas citas
- [ ] Progreso en evaluaciones
- [ ] Recursos consultados

#### Gráficas
- [ ] Línea de tiempo (sesiones/mes)
- [ ] Barras (uso por departamento)
- [ ] Pie (distribución por tipo de sesión)
- [ ] Área (evolución de scores)

#### Exportación
- [ ] CSV de datos
- [ ] PDF de reportes (html2pdf)

**Entregable Semana 9:** Dashboards con analytics propios

---

### **SEMANA 10: Recursos Educativos**

#### Sistema de Contenido
- [ ] Tabla `resources` en Supabase
- [ ] Categorías:
  - Artículos
  - Videos
  - Podcasts
  - Guías PDF
  - Ejercicios

#### CRUD de Recursos (Super Admin)
- [ ] Crear recursos
- [ ] Subir archivos a Supabase Storage
- [ ] Categorizar y etiquetar
- [ ] Publicar/despublicar

#### Consumo (Empleados)
- [ ] Biblioteca de recursos
- [ ] Búsqueda y filtros
- [ ] Favoritos
- [ ] Historial de lectura
- [ ] Recomendaciones básicas (por tags)

#### Tipos de Recursos
- [ ] **Artículos:** Markdown editor
- [ ] **Videos:** URL de YouTube/Vimeo (embed)
- [ ] **PDFs:** Subir a Storage
- [ ] **Ejercicios:** Mindfulness, respiración

**Entregable Semana 10:** Biblioteca de recursos funcional

---

### **SEMANA 11: Multi-idioma Completo**

#### Traducción Total
- [ ] Traducir TODAS las páginas
- [ ] Traducir TODOS los componentes
- [ ] Traducir emails
- [ ] Traducir notificaciones
- [ ] Traducir mensajes de error
- [ ] Traducir validaciones

#### Archivos de Traducción
```
messages/
├── es/
│   ├── common.json
│   ├── auth.json
│   ├── dashboard.json
│   ├── chat.json
│   ├── calendar.json
│   ├── assessments.json
│   ├── resources.json
│   └── emails.json
└── en/
    └── (mismos archivos)
```

#### Selector de Idioma
- [ ] Dropdown en header
- [ ] Persistir en localStorage
- [ ] Cambio dinámico sin reload

#### Formateo Regional
- [ ] Fechas (es-ES vs en-US)
- [ ] Moneda ($COP vs $USD)
- [ ] Números (1.000,00 vs 1,000.00)

**Entregable Semana 11:** Plataforma 100% bilingüe

---

### **SEMANA 12: Optimización y Deploy**

#### Optimización Web
- [ ] Next.js Image Optimization
- [ ] Lazy loading de componentes
- [ ] Code splitting
- [ ] Optimización de queries
- [ ] Índices en PostgreSQL
- [ ] Cache de Tanstack Query optimizado

#### Responsive Mobile
- [ ] Revisar TODAS las páginas en mobile
- [ ] Menú hamburguesa
- [ ] Chat mobile-friendly
- [ ] Calendario mobile
- [ ] Forms mobile

#### Testing
- [ ] Unit tests críticos
- [ ] E2E tests de flujos principales:
  - Registro → Login → Dashboard
  - Reservar cita
  - Completar evaluación
  - Enviar mensaje chat
  - Realizar pago

#### Deploy
- [ ] **Opción 1: Coolify + VPS**
  - Configurar Docker
  - Deploy en VPS
  - SSL con Let's Encrypt
  - Nginx como reverse proxy

- [ ] **Opción 2: Vercel**
  - Deploy automático desde GitHub
  - Variables de entorno
  - Preview deployments

#### Monitoring Básico
- [ ] Uptime Robot (gratis)
- [ ] Sentry básico (errores)
- [ ] Logs de Supabase

**Entregable Semana 12:** Plataforma en producción

---

## 📊 MÉTRICAS DE ÉXITO

### Al finalizar 3 meses:

| Métrica | Target |
|---------|--------|
| **Funcionalidades Core** | 100% |
| **Cobertura de Tests** | >60% |
| **Performance (Lighthouse)** | >90 |
| **Responsive** | 100% |
| **Traducción** | 100% |
| **APIs Integradas** | 4/4 |
| **Bugs Críticos** | 0 |

---

## 💰 COSTOS MENSUALES

| Servicio | Costo |
|----------|-------|
| Supabase Pro | $25 |
| Stripe | 2.9% + $0.30 |
| Gemini API | ~$30-50 |
| SendGrid | $15 |
| VPS/Vercel | $20 |
| **TOTAL** | **~$120/mes** |

---

## 🎯 HITOS CLAVE

- ✅ **Semana 4:** MVP con login, calendario, chat
- ✅ **Semana 8:** Core completo (evaluaciones, IA, pagos)
- ✅ **Semana 12:** Producto final listo para producción

---

## ⚠️ RIESGOS Y MITIGACIONES

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Retrasos en Stripe | Media | Alto | Empezar Semana 5 |
| API de Gemini lenta | Media | Medio | Cache agresivo |
| Problemas de Realtime | Baja | Alto | Polling fallback |
| Traducción incompleta | Alta | Medio | Revisar Semana 10 |
| Bugs en calendario | Media | Alto | Testing exhaustivo |

---

## 👥 EQUIPO RECOMENDADO

- **Dev 1 (Fullstack):** Auth, CRUD, Calendar
- **Dev 2 (Frontend):** UI/UX, i18n, Components
- **Dev 3 (Backend):** Supabase, APIs, IA

O bien: **2 Fullstack** trabajando en paralelo

---

## 📝 PRÓXIMOS PASOS INMEDIATOS

### Esta Semana:
1. Instalar dependencias mínimas
2. Configurar next-intl
3. Crear archivos de traducción base
4. Conectar Supabase Auth
5. Implementar login funcional

### Comando de inicio:
```bash
pnpm add next-intl zustand zod @tanstack/react-query @radix-ui/react-dialog @radix-ui/react-dropdown-menu react-big-calendar dayjs chart.js react-chartjs-2 @hookform/resolvers lodash uuid @stripe/stripe-js stripe @google/generative-ai @sendgrid/mail
```
