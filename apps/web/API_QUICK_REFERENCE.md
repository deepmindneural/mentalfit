# Landing Page API - Quick Reference

## Public GET Endpoints (No Auth Required)

```bash
# Testimonios
GET /api/public/testimonios?destacado=true&limit=6
GET /api/public/testimonios?categoria=empresa

# Casos de Éxito
GET /api/public/casos-exito?limit=3
GET /api/public/casos-exito?slug=techcorp-reduce-burnout
GET /api/public/casos-exito?industria=Tecnología

# Blog
GET /api/public/blog?destacado=true&limit=3
GET /api/public/blog?slug=mindfulness-principiantes-guia-completa
GET /api/public/blog?categoria=Salud%20Mental

# FAQs
GET /api/public/faq
GET /api/public/faq?categoria=empresas

# Webinars
GET /api/public/webinars
GET /api/public/webinars?tipo=proximo&limit=3

# Estadísticas
GET /api/public/stats
```

## Public POST Endpoints (No Auth Required)

```bash
# Solicitud de Demo
POST /api/public/demo
Content-Type: application/json

{
  "nombre": "María González",
  "email": "maria@techcorp.com",
  "empresa": "TechCorp",
  "tamano_empresa": "201-500",
  "cargo": "Directora RRHH",
  "mensaje": "Queremos implementar MentalFit"
}

# Formulario de Contacto
POST /api/public/contacto
Content-Type: application/json

{
  "nombre": "Carlos Ramírez",
  "email": "carlos@example.com",
  "departamento": "soporte",
  "asunto": "Problema técnico",
  "mensaje": "Descripción del problema..."
}

# Evaluación Gratuita
POST /api/public/evaluacion
Content-Type: application/json

{
  "email": "usuario@example.com",
  "nombre": "Laura Pérez",
  "respuestas": [
    { "pregunta_id": 1, "valor": 3 },
    { "pregunta_id": 2, "valor": 4 }
  ],
  "acepta_seguimiento": true
}
```

## TypeScript Import

```typescript
import {
  Testimonio,
  CasoExito,
  BlogPost,
  FAQ,
  Webinar,
  SolicitudDemoInput,
  TestimoniosResponse
} from '@/types/landing-page';
```

## Database Tables

- `testimonios` - Testimonios de clientes
- `casos_exito` - Case studies empresariales
- `blog_posts` - Artículos del blog
- `faqs` - Preguntas frecuentes
- `webinars` - Webinars y grabaciones
- `estadisticas_plataforma` - Social proof metrics
- `solicitudes_demo` - Demo requests
- `solicitudes_contacto` - Contact form
- `evaluaciones_gratuitas` - Free assessments

## MCP Commands Used

```bash
mcp__supabase__list_tables
mcp__supabase__list_migrations
mcp__supabase__apply_migration
mcp__supabase__execute_sql
```

## Files Created

### Database
- Migration: `crear_tablas_landing_page`
- Migration: `crear_rls_policies_landing_page_corregido`
- Migration: `seed_data_landing_page`

### API Routes
- `/app/api/public/testimonios/route.ts`
- `/app/api/public/casos-exito/route.ts`
- `/app/api/public/blog/route.ts`
- `/app/api/public/faq/route.ts`
- `/app/api/public/webinars/route.ts`
- `/app/api/public/stats/route.ts`
- `/app/api/public/demo/route.ts`
- `/app/api/public/contacto/route.ts`
- `/app/api/public/evaluacion/route.ts`

### Types
- `/src/types/landing-page.ts`

### Documentation
- `/LANDING_PAGE_API_DOCS.md` (full documentation)
- `/API_QUICK_REFERENCE.md` (this file)
