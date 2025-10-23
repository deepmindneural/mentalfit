# Landing Page API Infrastructure - MentalFit

**Creado por:** Agent-Backend
**Fecha:** 2025-10-23
**Versión:** 1.0.0

## Resumen Ejecutivo

Se ha implementado una infraestructura completa de base de datos y API para soportar la landing page de MentalFit. La implementación incluye:

- **9 tablas nuevas** con esquemas optimizados
- **RLS policies completas** para seguridad
- **Seed data** para desarrollo (testimonios, casos de éxito, blog posts, FAQs, webinars)
- **9 API routes** públicas (6 GET, 3 POST)
- **TypeScript types** completos para type-safety
- **Spanish naming convention** en toda la base de datos

---

## Tablas de Base de Datos

### 1. `testimonios`
Almacena testimonios de clientes con soporte bilingüe (ES/EN).

**Campos principales:**
- `nombre_cliente`, `cargo`, `empresa`
- `testimonio_es`, `testimonio_en`
- `calificacion` (1-5)
- `destacado` (boolean - para homepage)
- `categoria` (empresa|empleado|profesional)
- `activo` (boolean)

**RLS:** Lectura pública de testimonios activos, escritura solo admin.

---

### 2. `casos_exito`
Estudios de caso detallados de implementaciones empresariales.

**Campos principales:**
- `empresa_nombre`, `industria`, `logo_url`
- `titulo_es/en`, `descripcion_corta_es/en`, `contenido_completo_es/en`
- `metricas_json` (JSONB - métricas flexibles como {"reduccion_burnout": "50%"})
- `slug` (único, para URLs amigables)
- `publicado` (boolean)

**RLS:** Lectura pública de casos publicados, escritura solo admin.

---

### 3. `blog_posts`
Artículos de blog para contenido educativo.

**Campos principales:**
- `titulo_es/en`, `contenido_es/en`, `extracto_es/en`
- `slug`, `imagen_destacada_url`, `categoria`, `etiquetas[]`
- `autor_id` (FK a usuarios), `autor_nombre`, `autor_foto_url`
- `publicado`, `destacado`, `fecha_publicacion`
- `tiempo_lectura_minutos`, `vistas`

**RLS:** Lectura pública de publicados, autores ven sus drafts, escritura admin/profesionales.

---

### 4. `faqs`
Preguntas frecuentes organizadas por categoría.

**Campos principales:**
- `pregunta_es/en`, `respuesta_es/en`
- `categoria` (general|empresas|empleados|profesionales)
- `orden` (para ordenamiento manual)
- `activo`

**RLS:** Lectura pública de activas, escritura solo admin.

---

### 5. `webinars`
Webinars próximos y grabaciones.

**Campos principales:**
- `titulo_es/en`, `descripcion_es/en`
- `fecha_hora`, `duracion_minutos`
- `instructor_nombre`, `instructor_foto_url`, `instructor_bio_es/en`
- `url_registro` (para próximos), `url_grabacion` (para grabados)
- `tipo` (proximo|grabado)
- `cupos_disponibles`, `cupos_totales`

**RLS:** Lectura pública de activos, escritura solo admin.

---

### 6. `estadisticas_plataforma`
Métricas agregadas para social proof.

**Campos principales:**
- `fecha` (único por día)
- `usuarios_activos`, `sesiones_completadas`
- `empresas_activas`, `profesionales_activos`
- `horas_terapia_totales`, `satisfaccion_promedio`

**RLS:** Lectura pública, escritura solo super_admin.

---

### 7. `solicitudes_demo`
Formulario de solicitud de demostración.

**Campos principales:**
- `nombre`, `email`, `telefono`, `empresa`
- `tamano_empresa` (1-50|51-200|201-500|501-1000|1000+)
- `cargo`, `mensaje`
- `estado` (pendiente|contactado|convertido|descartado)
- `notas_internas`, `ip_address`, `user_agent`

**RLS:** Inserción pública (anónimos pueden enviar), lectura solo admin.

---

### 8. `solicitudes_contacto`
Formulario de contacto general.

**Campos principales:**
- `nombre`, `email`, `telefono`, `empresa`
- `departamento` (ventas|soporte|prensa|otros)
- `asunto`, `mensaje`
- `estado` (pendiente|respondido|cerrado)
- `respuesta_interna`, `respondido_por`, `fecha_respuesta`

**RLS:** Inserción pública, lectura/actualización solo admin.

---

### 9. `evaluaciones_gratuitas`
Evaluaciones de bienestar mental para lead generation.

**Campos principales:**
- `email` (opcional), `nombre` (opcional)
- `respuestas_json` (JSONB - todas las respuestas)
- `puntuacion_total`, `categoria_resultado`
- `recomendaciones_json` (JSONB - recomendaciones generadas)
- `acepta_seguimiento`, `acepta_newsletter`
- `duracion_segundos`

**RLS:** Inserción pública (anónimos pueden hacer evaluación), lectura solo admin (datos sensibles).

---

## API Routes

Todas las rutas están en `/app/api/public/` y NO requieren autenticación.

### GET Endpoints

#### 1. `GET /api/public/testimonios`
Obtiene testimonios activos.

**Query params:**
- `destacado=true` - Solo destacados
- `categoria=empresa|empleado|profesional` - Filtrar por categoría
- `limit=10` - Cantidad de resultados (1-50)

**Response:**
```typescript
{
  testimonios: Testimonio[],
  total: number
}
```

**Ejemplo:**
```bash
GET /api/public/testimonios?destacado=true&limit=6
```

---

#### 2. `GET /api/public/casos-exito`
Obtiene casos de éxito publicados.

**Query params:**
- `slug=techcorp-reduce-burnout` - Caso específico
- `industria=Tecnología` - Filtrar por industria
- `limit=10` - Cantidad (1-50)

**Response:**
```typescript
// Lista
{ casos_exito: CasoExito[], total: number }

// Individual (con slug)
{ caso_exito: CasoExito }
```

**Ejemplo:**
```bash
GET /api/public/casos-exito?limit=3
GET /api/public/casos-exito?slug=techcorp-reduce-burnout
```

---

#### 3. `GET /api/public/blog`
Obtiene posts de blog publicados.

**Query params:**
- `slug=10-senales-burnout` - Post específico (incrementa vistas)
- `categoria=Salud Mental` - Filtrar por categoría
- `destacado=true` - Solo destacados
- `limit=10` - Cantidad (1-50)

**Response:**
```typescript
// Lista
{ posts: BlogPost[], total: number }

// Individual (con slug)
{ post: BlogPost }
```

**Ejemplo:**
```bash
GET /api/public/blog?destacado=true&limit=3
GET /api/public/blog?slug=mindfulness-principiantes-guia-completa
```

---

#### 4. `GET /api/public/faq`
Obtiene FAQs activas.

**Query params:**
- `categoria=general|empresas|empleados|profesionales` - Filtrar
- `limit=50` - Cantidad (1-100)

**Response:**
```typescript
// Sin categoría: agrupadas
{
  faqs_por_categoria: {
    general: FAQ[],
    empresas: FAQ[],
    empleados: FAQ[],
    profesionales: FAQ[]
  },
  total: number
}

// Con categoría: array simple
{
  faqs: FAQ[],
  total: number,
  categoria: string
}
```

**Ejemplo:**
```bash
GET /api/public/faq
GET /api/public/faq?categoria=empresas
```

---

#### 5. `GET /api/public/webinars`
Obtiene webinars activos.

**Query params:**
- `tipo=proximo|grabado` - Filtrar por tipo
- `categoria=Bienestar Laboral` - Filtrar categoría
- `limit=10` - Cantidad (1-50)

**Response:**
```typescript
// Sin tipo: separados
{
  proximos: Webinar[],  // Ordenados por fecha ascendente
  grabados: Webinar[],  // Ordenados por fecha descendente
  total: number
}

// Con tipo: array simple
{
  webinars: Webinar[],
  total: number,
  tipo: string
}
```

**Ejemplo:**
```bash
GET /api/public/webinars
GET /api/public/webinars?tipo=proximo&limit=3
```

---

#### 6. `GET /api/public/stats`
Obtiene estadísticas actuales de la plataforma.

**No requiere params.**

**Response:**
```typescript
{
  estadisticas: {
    usuarios_activos: number,
    sesiones_completadas: number,
    empresas_activas: number,
    profesionales_activos: number,
    horas_terapia_totales: number,
    satisfaccion_promedio: number | null,
    fecha: string
  }
}
```

**Cache:** 10 minutos (s-maxage=600)

**Ejemplo:**
```bash
GET /api/public/stats
```

---

### POST Endpoints

#### 7. `POST /api/public/demo`
Envía solicitud de demostración.

**Body:**
```typescript
{
  nombre: string,              // Requerido, min 2 chars
  email: string,               // Requerido, email válido
  telefono?: string,
  empresa: string,             // Requerido, min 2 chars
  tamano_empresa?: '1-50' | '51-200' | '201-500' | '501-1000' | '1000+',
  cargo?: string,
  mensaje?: string
}
```

**Response:**
```typescript
{
  mensaje: string,
  solicitud_id: string
}
```

**Validaciones:**
- Email válido
- Nombre y empresa mínimo 2 caracteres
- Tamaño empresa debe ser valor válido

**Ejemplo:**
```javascript
const response = await fetch('/api/public/demo', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre: 'María González',
    email: 'maria@techcorp.com',
    empresa: 'TechCorp',
    tamano_empresa: '201-500',
    cargo: 'Directora de RRHH',
    mensaje: 'Queremos implementar MentalFit en toda la organización'
  })
});
```

---

#### 8. `POST /api/public/contacto`
Envía mensaje de contacto general.

**Body:**
```typescript
{
  nombre: string,              // Requerido, min 2 chars
  email: string,               // Requerido, email válido
  telefono?: string,
  empresa?: string,
  departamento: 'ventas' | 'soporte' | 'prensa' | 'otros',  // Requerido
  asunto: string,              // Requerido, min 5 chars
  mensaje: string              // Requerido, min 10 chars
}
```

**Response:**
```typescript
{
  mensaje: string,
  solicitud_id: string
}
```

**Validaciones:**
- Email válido
- Asunto mínimo 5 caracteres
- Mensaje mínimo 10 caracteres
- Departamento debe ser valor válido

**Ejemplo:**
```javascript
const response = await fetch('/api/public/contacto', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre: 'Carlos Ramírez',
    email: 'carlos@example.com',
    departamento: 'soporte',
    asunto: 'Problema con videollamada',
    mensaje: 'No puedo conectarme a mi sesión programada...'
  })
});
```

---

#### 9. `POST /api/public/evaluacion`
Procesa evaluación gratuita de bienestar mental.

**Body:**
```typescript
{
  email?: string,
  nombre?: string,
  respuestas: Array<{          // Requerido, array no vacío
    pregunta_id: number,
    valor: number
  }>,
  acepta_seguimiento?: boolean,  // Default: false
  acepta_newsletter?: boolean,   // Default: false
  timestamp_inicio?: number      // Para calcular duración
}
```

**Response:**
```typescript
{
  puntuacion: number,          // 0-100
  categoria: string,           // "Excelente" | "Bueno" | "Moderado" | "Requiere Atención" | "Crítico"
  recomendaciones: {
    categoria: string,
    puntuacion: number,
    mensaje_principal: string,
    acciones_recomendadas: string[],
    recursos: Array<{
      tipo: string,
      titulo: string,
      url?: string
    }>
  },
  mensaje: string,
  evaluacion_id?: string
}
```

**Algoritmo de puntuación:**
- 80-100: Excelente
- 60-79: Bueno
- 40-59: Moderado
- 20-39: Requiere Atención
- 0-19: Crítico

**Ejemplo:**
```javascript
const response = await fetch('/api/public/evaluacion', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'usuario@example.com',
    nombre: 'Laura Pérez',
    respuestas: [
      { pregunta_id: 1, valor: 3 },
      { pregunta_id: 2, valor: 4 },
      { pregunta_id: 3, valor: 2 },
      // ... más respuestas
    ],
    acepta_seguimiento: true,
    acepta_newsletter: true,
    timestamp_inicio: Date.now() - 120000  // Inicio hace 2 minutos
  })
});
```

---

## TypeScript Types

Importar desde: `/src/types/landing-page.ts`

```typescript
import {
  Testimonio,
  CasoExito,
  BlogPost,
  FAQ,
  Webinar,
  EstadisticasPlataforma,
  SolicitudDemo,
  SolicitudContacto,
  EvaluacionGratuita,
  // ... y todas las variantes Input/Response
} from '@/types/landing-page';
```

**Tipos disponibles:**
- Interfaces de entidades (Testimonio, CasoExito, etc.)
- Tipos Input para formularios
- Tipos Response para API calls
- Enums (CategoriaFAQ, TipoWebinar, etc.)

---

## Seed Data Incluido

### Testimonios: 6
- 3 destacados (aparecen en homepage)
- Distribuidos: 2 empresa, 2 empleado, 2 profesional
- Todos con fotos de Unsplash

### Casos de Éxito: 3
- TechCorp (Tecnología) - Reducción burnout 50%
- Retail Innovations (Retail) - Mejora NPS 28%
- FinanzasPlus (Servicios Financieros) - Transformación cultural

### Blog Posts: 5
- 2 destacados
- Categorías: Salud Mental, Bienestar, Empresas, Terapia
- Autores ficticios con fotos

### FAQs: 12
- 4 General
- 3 Empresas
- 2 Empleados
- 3 Profesionales

### Webinars: 4
- 2 próximos (con URL de registro)
- 2 grabados (con URL de grabación)

### Estadísticas: 1
- Datos actuales del día

---

## Seguridad

### Row Level Security (RLS)

Todas las tablas tienen RLS habilitado con políticas estrictas:

1. **Lectura Pública:** Solo contenido activo/publicado
2. **Escritura Restringida:** Solo super_admin o admin_empresa
3. **Formularios Públicos:** Usuarios anónimos pueden insertar en solicitudes_demo, solicitudes_contacto, evaluaciones_gratuitas
4. **Datos Sensibles:** evaluaciones_gratuitas solo lectura admin

### Validaciones

- **Email:** Regex validation en constraints de DB
- **Inputs:** Sanitización y validación en API routes
- **Rate Limiting:** Considerar implementar (no incluido)

### Privacidad

- **IPs y User-Agent** capturados para análisis, no expuestos en API
- **Evaluaciones:** Datos de salud mental solo accesibles a admins
- **Anonimidad:** Empleados pueden usar sin que empresa vea datos individuales

---

## Performance y Cache

### Cache Headers

Todas las rutas GET incluyen cache headers optimizados:

```
Cache-Control: public, s-maxage=300, stale-while-revalidate=600
```

**Variaciones:**
- Stats, FAQs, Casos de Éxito: 600s (10 min)
- Testimonios, Blog, Webinars: 300s (5 min)

### Índices de Base de Datos

Índices creados para optimizar queries comunes:

- `idx_testimonios_destacado_activo` - Homepage testimonials
- `idx_blog_posts_publicado` - Published posts
- `idx_casos_exito_slug` - Individual case studies
- `idx_faqs_categoria_orden` - FAQ listing
- `idx_webinars_tipo_fecha` - Upcoming webinars
- Y más...

---

## Migraciones Aplicadas

```
✅ 20251023XXXXXX_crear_tablas_landing_page
✅ 20251023XXXXXX_crear_rls_policies_landing_page_corregido
✅ 20251023XXXXXX_seed_data_landing_page
```

Para verificar:
```bash
# Via MCP
mcp__supabase__list_migrations
```

---

## Uso en Frontend

### Ejemplo: Cargar Testimonios

```typescript
import { TestimoniosResponse } from '@/types/landing-page';

async function cargarTestimonios() {
  const response = await fetch('/api/public/testimonios?destacado=true&limit=6');
  const data: TestimoniosResponse = await response.json();

  return data.testimonios;
}
```

### Ejemplo: Enviar Solicitud de Demo

```typescript
import { SolicitudDemoInput, SolicitudDemoResponse } from '@/types/landing-page';

async function enviarSolicitudDemo(datos: SolicitudDemoInput) {
  const response = await fetch('/api/public/demo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  const result: SolicitudDemoResponse = await response.json();
  return result;
}
```

### Ejemplo: Mostrar Estadísticas

```typescript
'use client';

import { useEffect, useState } from 'react';
import { EstadisticasResponse } from '@/types/landing-page';

export default function StatsSection() {
  const [stats, setStats] = useState<EstadisticasResponse['estadisticas'] | null>(null);

  useEffect(() => {
    fetch('/api/public/stats')
      .then(res => res.json())
      .then(data => setStats(data.estadisticas));
  }, []);

  if (!stats) return <div>Cargando...</div>;

  return (
    <div className="grid grid-cols-4 gap-4">
      <Stat label="Usuarios Activos" value={stats.usuarios_activos.toLocaleString()} />
      <Stat label="Sesiones Completadas" value={stats.sesiones_completadas.toLocaleString()} />
      <Stat label="Empresas Activas" value={stats.empresas_activas} />
      <Stat label="Profesionales" value={stats.profesionales_activos} />
    </div>
  );
}
```

---

## Próximos Pasos Recomendados

### Backend
1. ✅ Implementar notificaciones por email para solicitudes
2. ✅ Agregar rate limiting a endpoints públicos
3. ✅ Crear job scheduled para actualizar estadísticas diariamente
4. ✅ Implementar análisis de IPs para prevenir spam

### Frontend
1. ✅ Crear componentes React para cada sección
2. ✅ Implementar formularios con validación
3. ✅ Agregar loading states y error handling
4. ✅ Implementar internacionalización (i18n) para ES/EN

### Analytics
1. ✅ Trackear conversiones de formularios
2. ✅ Medir engagement con contenido (blog views, webinar registrations)
3. ✅ A/B testing en testimonios destacados

---

## Troubleshooting

### Error: "Column usuarios.rol does not exist"
**Solución:** Ya corregido. La columna correcta es `tipo_usuario`, no `rol`.

### Error: "Permission denied"
**Verificar:** RLS policies están habilitadas. Usar cliente anónimo para endpoints públicos.

### Error: "Invalid email"
**Verificar:** Email debe cumplir formato RFC. Constraint en DB valida con regex.

### Stats retornan 0
**Verificar:** Ejecutar seed data migration o insertar estadísticas manualmente.

---

## Contacto y Soporte

**Desarrollado por:** Agent-Backend
**Stack:** Next.js 14 + Supabase PostgreSQL
**Convención:** Spanish naming (usuarios, empresas, etc.)
**Seguridad:** RLS enabled en todas las tablas

Para preguntas sobre implementación, consultar este documento o revisar el código en:
- `/app/api/public/` - API routes
- `/src/types/landing-page.ts` - TypeScript types
- Supabase migrations (via MCP tools)

---

**Última actualización:** 2025-10-23
**Versión API:** 1.0.0
