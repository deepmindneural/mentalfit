# ⚠️ REGISTRO DE CONFLICTOS - MENTALFIT

Este archivo registra conflictos entre agentes, decisiones arquitectónicas, y puntos de coordinación necesarios.

---

## 🎯 CÓMO USAR ESTE ARCHIVO

1. **Detectaste un conflicto?** → Regístralo aquí inmediatamente
2. **Resolviste un conflicto?** → Actualiza el estado
3. **Necesitas decisión humana?** → Márcalo como BLOQUEANTE

---

## 📋 CONFLICTOS ACTIVOS

*No hay conflictos activos actualmente* ✅

---

## ✅ CONFLICTOS RESUELTOS

### #001 - Nomenclatura de Base de Datos (RESUELTO)
**Fecha:** 2025-01-21
**Reportado por:** backend-database-specialist
**Tipo:** Decisión Arquitectónica

**Problema:**
- Schema existente en inglés (`companies`, `profiles`, `sessions`)
- Especificación requiere 100% español en backend

**Opciones Evaluadas:**
1. Mantener inglés (más común en la industria)
2. Migrar a español (especificación del proyecto)
3. Bilingüe (complejidad innecesaria)

**Decisión Tomada:**
- ✅ **OPCIÓN 2:** Migrar completamente a español
- Justificación:
  - Especificación explícita del cliente
  - Equipo de desarrollo hispanohablante
  - Facilita lectura de código para stakeholders
  - Consistencia con nombres de dominio

**Acción:**
- Crear schema nuevo en español: `schema-completo-es.sql`
- Mantener schema antiguo como referencia
- Crear migration script cuando sea necesario

**Impacto:**
- Tipos TypeScript deberán generarse del nuevo schema
- Queries en código deberán usar nombres en español
- Documentación actualizada

**Estado:** ✅ RESUELTO
**Resuelto por:** project-coordinator
**Fecha resolución:** 2025-01-21

---

## 🚧 DECISIONES PENDIENTES

*No hay decisiones pendientes que requieran aprobación*

---

## 📝 PUNTOS DE COORDINACIÓN

### 1. Schema SQL vs Frontend Existente
**Estado:** ⚠️ REQUIERE ATENCIÓN
**Descripción:**
- Frontend tiene mock data en inglés
- Schema nuevo está en español
- Cuando se conecte, habrá incompatibilidad

**Plan de Acción:**
1. Ejecutar schema español en Supabase
2. Actualizar tipos TypeScript
3. Refactorizar queries del frontend
4. Probar exhaustivamente

**Agentes Involucrados:**
- backend-database-specialist (schema)
- general-purpose (refactor frontend)

**Prioridad:** 🔴 ALTA
**Bloqueante:** No, pero urgente antes de conectar backend

---

### 2. i18n y Contenido Estático
**Estado:** ⚠️ REQUIERE ATENCIÓN
**Descripción:**
- UI completa en inglés
- Necesita traducirse a español
- next-intl no está configurado

**Plan de Acción:**
1. Instalar next-intl
2. Crear estructura de traducción
3. Extraer todos los textos estáticos
4. Traducir ~500 strings

**Agentes Involucrados:**
- general-purpose (configuración i18n)
- project-coordinator (coordinación traducción)

**Prioridad:** 🔴 CRÍTICA
**Bloqueante:** Sí, para lanzamiento

---

### 3. Tipos TypeScript desde Schema SQL
**Estado:** ⏳ PENDIENTE
**Descripción:**
- Schema SQL listo pero sin tipos TypeScript
- Frontend necesita tipos para type safety
- Dos opciones: Manual vs Automático

**Opciones:**
1. **Manual:** Crear tipos TypeScript a mano
   - Pros: Control total, customizable
   - Contras: Tedioso, propenso a errores, desincronización

2. **Automático:** `supabase gen types typescript`
   - Pros: Rápido, siempre sincronizado, sin errores
   - Contras: Menos control, nombres generados

**Recomendación:** OPCIÓN 2 (Automático)

**Plan de Acción:**
1. Ejecutar schema en Supabase
2. Correr `supabase gen types typescript`
3. Guardar en `/src/types/database.ts`
4. Importar en el código

**Agentes Involucrados:**
- backend-database-specialist

**Prioridad:** 🟡 MEDIA
**Bloqueante:** No, pero necesario antes de crear queries

---

## 🔍 PATRONES DE CONFLICTOS COMUNES

### Tipo 1: Nomenclatura
- **Problema:** Inconsistencia inglés/español
- **Solución:** Seguir regla estricta: Backend español, Frontend puede tener inglés interno
- **Ejemplo:** Tabla `usuarios` en BD, componente `UserProfile.tsx` OK

### Tipo 2: Estructura de Archivos
- **Problema:** Agentes crean archivos en diferentes ubicaciones
- **Solución:** Seguir estructura definida en `mental-fit-status.md`
- **Ejemplo:** Tipos siempre en `/src/types`, no en `/lib`

### Tipo 3: Dependencias
- **Problema:** Agentes instalan dependencias duplicadas
- **Solución:** Verificar `package.json` antes de instalar
- **Ejemplo:** Si ya hay `date-fns`, no instalar `dayjs` sin justificación

---

## 📊 ESTADÍSTICAS DE CONFLICTOS

| Métrica | Valor |
|---------|-------|
| **Total reportados** | 1 |
| **Activos** | 0 |
| **Resueltos** | 1 |
| **Bloqueantes** | 0 |
| **Tiempo promedio resolución** | <1 día |

---

## 📞 ESCALACIÓN

Si un conflicto no puede resolverse entre agentes:

1. **Marcar como BLOQUEANTE** en este archivo
2. **Notificar a project-coordinator**
3. **Incluir:**
   - Descripción del conflicto
   - Opciones evaluadas
   - Impacto en el proyecto
   - Recomendación técnica
4. **Esperar decisión humana**

---

## 📝 PLANTILLA DE REPORTE

```markdown
### #XXX - [Título del Conflicto]
**Fecha:** YYYY-MM-DD
**Reportado por:** [agente]
**Tipo:** [Técnico/Arquitectónico/Coordinación]

**Problema:**
[Descripción clara del conflicto]

**Opciones Evaluadas:**
1. [Opción 1] - Pros/Contras
2. [Opción 2] - Pros/Contras

**Decisión Tomada:**
- ✅/❌ [Opción seleccionada]
- Justificación: [razón]

**Acción:**
- [Pasos a seguir]

**Impacto:**
- [Qué afecta esta decisión]

**Estado:** [🚧 PENDIENTE / ✅ RESUELTO / 🔴 BLOQUEANTE]
```

---

**Última actualización:** 2025-01-21 12:00 por project-coordinator
