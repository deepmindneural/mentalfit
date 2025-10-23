# MentalFit Landing Pages Implementation

## Overview
Comprehensive landing page structure for MentalFit platform with purple branding (#a855f7).

## Components Created (11 reusable components)

### Location: `/src/components/landing/`

1. **HeroSection.tsx** - Main hero section with headline, CTA buttons, and trust indicators
2. **StatsSection.tsx** - Statistics/metrics display with icons and trends
3. **FeatureGrid.tsx** - Feature showcase grid (2-4 columns, multiple variants)
4. **BenefitsTabs.tsx** - Tabbed benefits by audience (Empresas/Empleados/RH)
5. **HowItWorks.tsx** - Step-by-step process explanation (horizontal/vertical)
6. **TestimonialsCarousel.tsx** - Customer testimonials with autoplay
7. **CTASection.tsx** - Call-to-action sections (gradient/split variants)
8. **PricingTable.tsx** - Pricing comparison table with features
9. **TrustBadges.tsx** - Security and certification badges
10. **FAQAccordion.tsx** - Accordion-style FAQ section
11. **LandingLayout.tsx** - Shared layout with navigation and footer

All components are:
- Fully responsive (mobile-first)
- TypeScript typed
- Internationalized with next-intl
- Accessible (ARIA labels, semantic HTML)
- Purple-themed (#a855f7)

## Pages Created (30+ pages)

### Main Landing Page
- **/** - Main landing page with comprehensive sections

### Audience-Specific Pages (4)
- **/para-empresas** - For companies (ROI focus)
- **/para-rrhh** - For HR managers (metrics, compliance)
- **/para-empleados** - For employees (personal wellbeing)
- **/para-profesionales** - For therapists (recruitment)

### Feature Detail Pages (5)
- **/caracteristicas/chat-ia** - AI Chat feature
- **/caracteristicas/terapia-online** - Online therapy
- **/caracteristicas/dashboard-empresarial** - Enterprise dashboard
- **/caracteristicas/recursos-bienestar** - Wellbeing resources
- **/caracteristicas/analisis-datos** - Data analytics

### Solution Pages (4)
- **/soluciones/prevencion-burnout** - Burnout prevention
- **/soluciones/gestion-estres** - Stress management
- **/soluciones/bienestar-equipos** - Team wellbeing
- **/soluciones/salud-mental-empleados** - Employee mental health

### Conversion Pages (3)
- **/precios** - Pricing page with comparison table
- **/prueba-gratis** - Free trial signup with form
- **/contacto** - Contact form with departments

### Industry Pages (1 sample)
- **/industrias/tecnologia** - Technology sector (template for others)

### Additional Pages (3)
- **/webinars** - Webinar listing and registration
- **/carreras** - Careers page with job listings
- **/estado** - System status page

## Translation Keys Structure

All translation keys follow this pattern:

```json
{
  "nav": {
    "forBusinesses": "Para Empresas",
    "forEmployees": "Para Empleados",
    "features": "Características",
    "pricing": "Precios",
    "signIn": "Iniciar Sesión",
    "getStarted": "Comenzar Gratis"
  },
  "landing": {
    "hero": {
      "badge": "Nueva Plataforma",
      "headline": "Tu Bienestar Mental Es Nuestra Prioridad",
      "subheadline": "...",
      "primaryCTA": {
        "text": "Comenzar Prueba Gratis",
        "link": "/prueba-gratis"
      }
    },
    "features": {
      "title": "...",
      "features": [
        {
          "icon": "messageSquare",
          "title": "Chat IA 24/7",
          "description": "..."
        }
      ]
    }
  },
  "paraEmpresas": { "hero": {...}, "features": {...} },
  "pricing": { "hero": {...}, "plans": {...} },
  "contact": { "hero": {...}, "form": {...} }
}
```

## Data Requirements (Database/API)

These elements will need to be dynamically loaded from the database:

1. **Testimonials** - Customer reviews and ratings
2. **Blog Posts** - For blog section
3. **Webinars** - Upcoming and past webinar data
4. **Job Listings** - Open positions
5. **System Status** - Real-time service health
6. **Pricing Plans** - Dynamic pricing configuration
7. **FAQ Items** - Frequently asked questions
8. **Case Studies** - Success stories

## Dependencies

All required dependencies are already in the project:
- next-intl (internationalization)
- react-hook-form (forms)
- zod (validation)
- lucide-react (icons)
- tailwindcss (styling)

## Color Scheme (Purple Theme)

Primary colors configured in tailwind.config.js:
- primary-50: #faf5ff
- primary-100: #f3e8ff
- primary-200: #e9d5ff
- primary-300: #d8b4fe
- primary-400: #c084fc
- **primary-500: #a855f7** (Main purple)
- primary-600: #9333ea
- primary-700: #7e22ce
- primary-800: #6b21a8
- primary-900: #581c87

## Implementation Notes

### Component Reusability
All components accept a `translationKey` prop to specify the i18n namespace, making them highly reusable across different pages.

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)

### Animations
Using Tailwind's custom animations from config:
- animate-aparecer
- animate-deslizar-arriba
- animate-pulso-suave
- animate-escalar-entrada

### Form Validation
All forms use React Hook Form + Zod for:
- Type-safe validation
- Automatic error handling
- Accessible error messages

### SEO Considerations
Each page should add:
- Unique meta title
- Meta description
- OG tags (Open Graph)
- Structured data (JSON-LD)

## Next Steps

1. **Add Complete Translations**
   - Create comprehensive es.json and en.json files
   - Include all translation keys for components
   - Add fallback values

2. **Create Industry Pages**
   - /industrias/retail
   - /industrias/salud
   - /industrias/finanzas
   - /industrias/educacion

3. **Implement Free Tools**
   - /evaluacion-gratuita (Assessment tool with questions)
   - /calculadora-roi (ROI calculator with inputs)
   - /chat-demo (Interactive chatbot demo)

4. **Connect to Backend**
   - API routes for form submissions
   - Database queries for dynamic content
   - Real-time status updates

5. **Add Analytics**
   - Conversion tracking
   - Heatmaps
   - A/B testing setup

## File Structure

```
src/
├── app/
│   ├── page.tsx (Main landing)
│   ├── para-empresas/
│   ├── para-rrhh/
│   ├── para-empleados/
│   ├── para-profesionales/
│   ├── caracteristicas/
│   │   ├── chat-ia/
│   │   ├── terapia-online/
│   │   ├── dashboard-empresarial/
│   │   ├── recursos-bienestar/
│   │   └── analisis-datos/
│   ├── soluciones/
│   │   ├── prevencion-burnout/
│   │   ├── gestion-estres/
│   │   ├── bienestar-equipos/
│   │   └── salud-mental-empleados/
│   ├── industrias/
│   │   └── tecnologia/
│   ├── precios/
│   ├── prueba-gratis/
│   ├── contacto/
│   ├── webinars/
│   ├── carreras/
│   └── estado/
├── components/
│   └── landing/
│       ├── HeroSection.tsx
│       ├── StatsSection.tsx
│       ├── FeatureGrid.tsx
│       ├── BenefitsTabs.tsx
│       ├── HowItWorks.tsx
│       ├── TestimonialsCarousel.tsx
│       ├── CTASection.tsx
│       ├── PricingTable.tsx
│       ├── TrustBadges.tsx
│       ├── FAQAccordion.tsx
│       └── LandingLayout.tsx
└── messages/
    ├── es.json (Spanish translations)
    └── en.json (English translations)
```

## Component Usage Examples

### HeroSection
```tsx
<HeroSection
  translationKey="landing.hero"
  variant="gradient"
  showVideo={true}
/>
```

### FeatureGrid
```tsx
<FeatureGrid
  translationKey="landing.features"
  columns={3}
  variant="cards"
/>
```

### PricingTable
```tsx
<PricingTable
  translationKey="pricing.plans"
  showAnnual={true}
/>
```

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Targets
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90
