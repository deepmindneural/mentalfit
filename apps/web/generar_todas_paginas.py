#!/usr/bin/env python3
"""
Script para generar todas las páginas faltantes de MentalFit
"""
import os
from pathlib import Path

BASE_DIR = Path("/Volumes/StarkT7/Proyectos/CLIENETS/proyectos/ESCUCHODROMO/Mentalfit 2/mentalfit/apps/web/src/app")

def crear_pagina(ruta: str, titulo: str, descripcion: str, funcionalidades: list[str], nombre_funcion: str = None):
    """Crea una página con el componente EnConstruccion"""
    ruta_completa = BASE_DIR / ruta
    ruta_completa.mkdir(parents=True, exist_ok=True)

    if not nombre_funcion:
        nombre_funcion = titulo.replace(' ', '').replace('-', '').replace('/', '')

    func_array = ",\n        ".join([f"'{f}'" for f in funcionalidades])

    contenido = f"""import EnConstruccion from '@/components/ui/UnderConstruction'
import {{ Metadata }} from 'next'

export const metadata: Metadata = {{
  title: '{titulo} | MentalFit',
  description: '{descripcion}'
}}

export default function Pagina{nombre_funcion}() {{
  return (
    <EnConstruccion
      titulo="{titulo}"
      descripcion="{descripcion}"
      funcionalidadesEsperadas={{[
        {func_array}
      ]}}
    />
  )
}}
"""

    archivo = ruta_completa / "page.tsx"
    with open(archivo, 'w', encoding='utf-8') as f:
        f.write(contenido)
    print(f"✓ Creada: {ruta}/page.tsx")

# ============= 1. PÁGINAS PÚBLICAS =============
print("\n📄 Creando páginas públicas...")

paginas_publicas = [
    ("(publico)/profesionales", "Profesionales", "Encuentra tu terapeuta ideal", [
        "Búsqueda avanzada de profesionales",
        "Filtros por especialidad, idioma y disponibilidad",
        "Perfiles detallados con reseñas",
        "Sistema de favoritos",
        "Comparación de profesionales",
        "Reserva en tiempo real"
    ]),
    ("(publico)/casos-de-exito", "Casos de Éxito", "Historias reales de transformación", [
        "Testimonios verificados de usuarios",
        "Casos de éxito empresariales",
        "Métricas de impacto",
        "Historias por categoría",
        "Videos testimoniales",
        "Estadísticas de satisfacción"
    ]),
    ("(publico)/blog", "Blog", "Artículos sobre salud mental y bienestar", [
        "Lista de artículos recientes",
        "Categorías y tags",
        "Búsqueda de contenido",
        "Artículos destacados",
        "Autores y colaboradores",
        "Newsletter de suscripción"
    ]),
    ("(publico)/blog/[slug]", "Artículo", "Lee nuestros artículos sobre salud mental", [
        "Contenido enriquecido con multimedia",
        "Artículos relacionados",
        "Compartir en redes sociales",
        "Comentarios y discusión",
        "Tiempo de lectura estimado",
        "Autor y fecha de publicación"
    ], "ArticuloBlog"),
    ("(publico)/recursos", "Recursos Gratuitos", "Herramientas y contenido descargable", [
        "Guías descargables en PDF",
        "Videos educativos",
        "Ejercicios de mindfulness",
        "Plantillas de seguimiento",
        "Webinars grabados",
        "Kit de primeros auxilios emocionales"
    ]),
    ("(publico)/prensa", "Sala de Prensa", "Noticias y recursos para medios", [
        "Comunicados de prensa",
        "Kit de prensa descargable",
        "Logos y assets de marca",
        "Contacto para medios",
        "Apariciones en medios",
        "Datos y estadísticas actualizadas"
    ]),
    ("(publico)/trabaja-con-nosotros", "Trabaja con Nosotros", "Únete al equipo de MentalFit", [
        "Vacantes abiertas por área",
        "Cultura y valores empresariales",
        "Beneficios para colaboradores",
        "Proceso de selección",
        "Testimonios del equipo",
        "Formulario de postulación"
    ]),
    ("(publico)/partners", "Partners y Alianzas", "Colaboradores estratégicos", [
        "Red de aliados corporativos",
        "Instituciones académicas",
        "Organizaciones de salud",
        "Programa de afiliados",
        "Casos de colaboración",
        "Formulario para ser partner"
    ]),
    ("(publico)/terminos-y-condiciones", "Términos y Condiciones", "Condiciones de uso de la plataforma", [
        "Términos de uso generales",
        "Derechos y obligaciones",
        "Políticas de uso aceptable",
        "Limitaciones de responsabilidad",
        "Modificaciones de términos",
        "Resolución de disputas"
    ]),
    ("(publico)/politica-privacidad", "Política de Privacidad", "Cómo protegemos tus datos personales", [
        "Recopilación de datos personales",
        "Uso y procesamiento de información",
        "Compartición con terceros",
        "Derechos del usuario",
        "Seguridad de datos",
        "Cumplimiento GDPR y HIPAA"
    ]),
    ("(publico)/politica-cookies", "Política de Cookies", "Uso de cookies en nuestra plataforma", [
        "Tipos de cookies utilizadas",
        "Finalidad de cada cookie",
        "Cookies de terceros",
        "Gestión de preferencias",
        "Cookies esenciales vs opcionales",
        "Desactivación de cookies"
    ]),
    ("(publico)/aviso-legal", "Aviso Legal", "Información legal de MentalFit", [
        "Datos identificativos de la empresa",
        "Información de contacto legal",
        "Registro mercantil",
        "Propiedad intelectual",
        "Jurisdicción aplicable",
        "Regulación sectorial"
    ]),
    ("(publico)/compliance", "Cumplimiento Normativo", "HIPAA, GDPR y certificaciones", [
        "Certificación HIPAA",
        "Cumplimiento GDPR",
        "ISO 27001 y seguridad",
        "Auditorías de terceros",
        "Políticas de compliance",
        "Reportes de transparencia"
    ]),
    ("(publico)/seguridad", "Centro de Seguridad", "Protección de datos y privacidad", [
        "Encriptación end-to-end",
        "Autenticación de dos factores",
        "Políticas de contraseñas",
        "Monitoreo de seguridad 24/7",
        "Gestión de incidentes",
        "Mejores prácticas de seguridad"
    ])
]

for pagina in paginas_publicas:
    crear_pagina(*pagina)

# ============= 2. PÁGINAS AYUDA =============
print("\n🆘 Creando páginas de ayuda...")

paginas_ayuda = [
    ("(publico)/ayuda", "Centro de Ayuda", "Encuentra respuestas a tus preguntas", [
        "Búsqueda de artículos de ayuda",
        "Categorías organizadas",
        "Artículos más visitados",
        "Guías paso a paso",
        "Videos tutoriales",
        "Contacto con soporte"
    ]),
    ("(publico)/ayuda/empleados", "Ayuda para Empleados", "Guías para usuarios", [
        "Primeros pasos en la plataforma",
        "Cómo buscar un terapeuta",
        "Agendar y asistir a sesiones",
        "Uso de evaluaciones",
        "Recursos disponibles",
        "Gestión de perfil"
    ]),
    ("(publico)/ayuda/empresas", "Ayuda para Empresas", "Guías para organizaciones", [
        "Configuración inicial corporativa",
        "Gestión de empleados",
        "Dashboard de métricas",
        "Facturación y pagos",
        "Configuración de beneficios",
        "Reportes personalizados"
    ]),
    ("(publico)/ayuda/profesionales", "Ayuda para Profesionales", "Guías para terapeutas", [
        "Onboarding de profesionales",
        "Gestión de agenda",
        "Sesiones virtuales",
        "Historial de pacientes",
        "Facturación y pagos",
        "Herramientas clínicas"
    ]),
    ("(publico)/faq", "Preguntas Frecuentes", "Respuestas rápidas a dudas comunes", [
        "Preguntas sobre registro",
        "Preguntas sobre sesiones",
        "Preguntas sobre pagos",
        "Preguntas sobre privacidad",
        "Preguntas sobre cancelaciones",
        "Preguntas técnicas"
    ]),
    ("(publico)/soporte", "Soporte Técnico", "Contacta con nuestro equipo de ayuda", [
        "Formulario de contacto",
        "Chat en vivo",
        "Horarios de atención",
        "Email de soporte",
        "Estado del servicio",
        "Reportar un problema"
    ]),
    ("(publico)/guias", "Guías y Tutoriales", "Aprende a usar MentalFit", [
        "Guías interactivas",
        "Videos tutoriales",
        "Mejores prácticas",
        "Casos de uso",
        "Actualizaciones de plataforma",
        "Tips y recomendaciones"
    ]),
    ("(publico)/tutoriales", "Tutoriales", "Aprende paso a paso", [
        "Tutorial de registro",
        "Tutorial de primera sesión",
        "Tutorial de evaluaciones",
        "Tutorial de recursos",
        "Tutorial de configuración",
        "Tutorial de videollamadas"
    ]),
    ("(publico)/ayuda/cuenta", "Ayuda con tu Cuenta", "Gestión de cuenta y perfil", [
        "Recuperar contraseña",
        "Cambiar email",
        "Actualizar datos personales",
        "Configurar notificaciones",
        "Eliminar cuenta",
        "Exportar datos"
    ]),
    ("(publico)/ayuda/pagos", "Ayuda con Pagos", "Facturación y métodos de pago", [
        "Métodos de pago aceptados",
        "Facturación y recibos",
        "Reembolsos y cancelaciones",
        "Planes y suscripciones",
        "Problemas de pago",
        "Cambiar método de pago"
    ]),
    ("(publico)/ayuda/sesiones", "Ayuda con Sesiones", "Todo sobre sesiones terapéuticas", [
        "Agendar una sesión",
        "Unirse a videollamada",
        "Cancelar o reprogramar",
        "Problemas técnicos",
        "Grabar sesiones",
        "Calificar terapeuta"
    ]),
    ("(publico)/ayuda/tecnico", "Soporte Técnico", "Problemas técnicos de la plataforma", [
        "Requisitos del sistema",
        "Problemas de conexión",
        "Navegadores compatibles",
        "Audio y video",
        "Aplicaciones móviles",
        "Solución de problemas comunes"
    ])
]

for pagina in paginas_ayuda:
    crear_pagina(*pagina)

# ============= 3. PÁGINAS SUPER ADMIN =============
print("\n⚙️ Creando páginas super admin...")

paginas_admin = [
    ("(admin)/admin/metricas", "Métricas Globales", "Dashboard de métricas del sistema", [
        "KPIs principales del sistema",
        "Usuarios activos y crecimiento",
        "Sesiones completadas",
        "Ingresos totales",
        "Gráficos de tendencias",
        "Exportar reportes"
    ]),
    ("(admin)/admin/analytics", "Analytics Avanzado", "Análisis profundo de datos", [
        "Análisis de comportamiento",
        "Funnel de conversión",
        "Retención de usuarios",
        "Segmentación avanzada",
        "Predicciones y tendencias",
        "Dashboards personalizables"
    ]),
    ("(admin)/admin/reportes", "Reportes", "Generación de reportes personalizados", [
        "Reportes predefinidos",
        "Constructor de reportes custom",
        "Programar reportes automáticos",
        "Exportar en múltiples formatos",
        "Compartir reportes",
        "Historial de reportes"
    ]),
    ("(admin)/admin/actividad", "Log de Actividad", "Registro de acciones del sistema", [
        "Log de auditoría completo",
        "Filtros por usuario y acción",
        "Eventos críticos destacados",
        "Búsqueda avanzada",
        "Exportar logs",
        "Retención de logs"
    ]),
    ("(admin)/admin/empresas", "Gestión de Empresas", "Administrar organizaciones", [
        "Lista de empresas activas",
        "Búsqueda y filtros",
        "Estado de suscripciones",
        "Crear nueva empresa",
        "Métricas por empresa",
        "Acciones masivas"
    ]),
    ("(admin)/admin/empresas/nueva", "Nueva Empresa", "Registrar nueva organización", [
        "Formulario de alta de empresa",
        "Configuración inicial",
        "Asignación de plan",
        "Configurar administrador",
        "Límites y beneficios",
        "Activación inmediata"
    ]),
    ("(admin)/admin/empresas/[id]", "Detalle de Empresa", "Vista completa de organización", [
        "Información general",
        "Empleados activos",
        "Uso de la plataforma",
        "Facturación histórica",
        "Métricas de bienestar",
        "Timeline de eventos"
    ], "DetalleEmpresa"),
    ("(admin)/admin/empresas/[id]/editar", "Editar Empresa", "Modificar datos de organización", [
        "Actualizar información",
        "Cambiar plan",
        "Ajustar límites",
        "Configurar beneficios",
        "Modificar facturación",
        "Historial de cambios"
    ], "EditarEmpresa"),
    ("(admin)/admin/empresas/[id]/empleados", "Empleados", "Gestión de usuarios corporativos", [
        "Lista de empleados",
        "Alta y baja de usuarios",
        "Uso individual",
        "Departamentos",
        "Importación masiva",
        "Exportar datos"
    ], "EmpleadosEmpresa"),
    ("(admin)/admin/empresas/[id]/facturacion", "Facturación Empresa", "Gestión de pagos corporativos", [
        "Historial de facturas",
        "Próximo cobro",
        "Método de pago",
        "Ajustes manuales",
        "Créditos y descuentos",
        "Exportar facturas"
    ], "FacturacionEmpresa"),
    ("(admin)/admin/empresas/[id]/metricas", "Métricas Empresa", "Estadísticas de uso corporativo", [
        "Adopción de la plataforma",
        "Sesiones por departamento",
        "Evaluaciones completadas",
        "Recursos más usados",
        "ROI calculado",
        "Comparativa temporal"
    ], "MetricasEmpresa"),
    ("(admin)/admin/empresas/[id]/suspension", "Suspender Empresa", "Suspensión temporal o permanente", [
        "Motivos de suspensión",
        "Período de suspensión",
        "Notificaciones automáticas",
        "Impacto en empleados",
        "Reactivación",
        "Historial de suspensiones"
    ], "SuspensionEmpresa"),
    ("(admin)/admin/profesionales", "Gestión de Profesionales", "Administrar terapeutas", [
        "Lista de profesionales activos",
        "Búsqueda y filtros",
        "Estado de verificación",
        "Calificaciones y reseñas",
        "Acciones masivas",
        "Exportar datos"
    ]),
    ("(admin)/admin/profesionales/solicitudes", "Solicitudes", "Nuevos profesionales pendientes", [
        "Solicitudes pendientes de revisión",
        "Documentación adjunta",
        "Verificación de credenciales",
        "Aprobar o rechazar",
        "Historial de solicitudes",
        "Estadísticas de aprobación"
    ]),
    ("(admin)/admin/profesionales/[id]", "Detalle Profesional", "Vista completa de terapeuta", [
        "Perfil profesional completo",
        "Documentos y certificaciones",
        "Historial de sesiones",
        "Calificaciones recibidas",
        "Ingresos generados",
        "Timeline de actividad"
    ], "DetalleProfesional"),
    ("(admin)/admin/profesionales/[id]/editar", "Editar Profesional", "Modificar datos de terapeuta", [
        "Actualizar información",
        "Modificar especialidades",
        "Ajustar tarifas",
        "Cambiar disponibilidad",
        "Actualizar certificaciones",
        "Historial de cambios"
    ], "EditarProfesional"),
    ("(admin)/admin/profesionales/[id]/documentos", "Documentos", "Gestión de credenciales", [
        "Documentos subidos",
        "Estado de verificación",
        "Vencimientos",
        "Solicitar documentación",
        "Aprobar o rechazar",
        "Historial documental"
    ], "DocumentosProfesional"),
    ("(admin)/admin/profesionales/[id]/pagos", "Pagos Profesional", "Gestión de pagos a terapeuta", [
        "Historial de pagos",
        "Comisiones acumuladas",
        "Próximo pago",
        "Método de pago",
        "Ajustes manuales",
        "Exportar histórico"
    ], "PagosProfesional"),
    ("(admin)/admin/profesionales/[id]/suspension", "Suspender Profesional", "Suspensión de terapeuta", [
        "Motivos de suspensión",
        "Período de suspensión",
        "Impacto en pacientes activos",
        "Notificaciones",
        "Reactivación",
        "Historial de suspensiones"
    ], "SuspensionProfesional"),
    ("(admin)/admin/profesionales/verificacion", "Verificación", "Proceso de credenciales", [
        "Cola de verificación",
        "Documentos pendientes",
        "Criterios de aprobación",
        "Verificación manual",
        "Estadísticas",
        "Historial de verificaciones"
    ]),
    ("(admin)/admin/usuarios", "Gestión de Usuarios", "Administrar usuarios finales", [
        "Lista de usuarios",
        "Búsqueda y filtros",
        "Usuarios activos vs inactivos",
        "Segmentos de usuarios",
        "Acciones masivas",
        "Exportar datos"
    ]),
    ("(admin)/admin/usuarios/[id]", "Detalle Usuario", "Vista completa de usuario", [
        "Perfil de usuario",
        "Historial de sesiones",
        "Evaluaciones completadas",
        "Uso de recursos",
        "Plan actual",
        "Timeline de actividad"
    ], "DetalleUsuario"),
    ("(admin)/admin/usuarios/[id]/editar", "Editar Usuario", "Modificar datos de usuario", [
        "Actualizar información",
        "Cambiar plan",
        "Ajustar límites",
        "Reset de contraseña",
        "Modificar permisos",
        "Historial de cambios"
    ], "EditarUsuario"),
    ("(admin)/admin/usuarios/[id]/sesiones", "Sesiones Usuario", "Historial de sesiones", [
        "Lista de sesiones",
        "Estado de cada sesión",
        "Profesionales atendidos",
        "Calificaciones dadas",
        "Notas clínicas (limitadas)",
        "Exportar historial"
    ], "SesionesUsuario"),
    ("(admin)/admin/usuarios/[id]/actividad", "Actividad Usuario", "Log de acciones", [
        "Registro de actividad",
        "Logins y accesos",
        "Uso de recursos",
        "Interacciones",
        "Dispositivos utilizados",
        "Timeline completo"
    ], "ActividadUsuario"),
    ("(admin)/admin/usuarios/reportados", "Usuarios Reportados", "Gestión de reportes", [
        "Lista de reportes activos",
        "Motivos de reporte",
        "Investigación de casos",
        "Acciones tomadas",
        "Historial de reportes",
        "Estadísticas"
    ]),
    ("(admin)/admin/usuarios/bloqueados", "Usuarios Bloqueados", "Gestión de bloqueos", [
        "Lista de usuarios bloqueados",
        "Motivos de bloqueo",
        "Duración del bloqueo",
        "Desbloquear usuarios",
        "Historial de bloqueos",
        "Estadísticas"
    ]),
    ("(admin)/admin/finanzas", "Dashboard Financiero", "Vista general de finanzas", [
        "Ingresos totales",
        "Comisiones pendientes",
        "Gráficos de tendencias",
        "Proyecciones",
        "KPIs financieros",
        "Exportar reportes"
    ]),
    ("(admin)/admin/finanzas/ingresos", "Ingresos", "Gestión de ingresos", [
        "Ingresos por fuente",
        "Ingresos mensuales",
        "Comparativas",
        "Segmentación",
        "Proyecciones",
        "Exportar datos"
    ]),
    ("(admin)/admin/finanzas/comisiones", "Comisiones", "Gestión de comisiones", [
        "Comisiones por pagar",
        "Comisiones pagadas",
        "Comisiones por profesional",
        "Tasas de comisión",
        "Ajustes manuales",
        "Exportar reportes"
    ]),
    ("(admin)/admin/finanzas/pagos-pendientes", "Pagos Pendientes", "Pagos a procesar", [
        "Lista de pagos pendientes",
        "Priorización",
        "Procesar pagos",
        "Rechazar pagos",
        "Historial",
        "Estadísticas"
    ]),
    ("(admin)/admin/finanzas/facturas", "Facturas", "Gestión de facturación", [
        "Lista de facturas",
        "Búsqueda y filtros",
        "Estado de facturas",
        "Generar facturas",
        "Exportar",
        "Envío automático"
    ]),
    ("(admin)/admin/finanzas/reportes", "Reportes Financieros", "Análisis financiero", [
        "Reportes predefinidos",
        "Constructor de reportes",
        "Programar envíos",
        "Exportar formatos",
        "Compartir",
        "Historial"
    ]),
    ("(admin)/admin/finanzas/conciliacion", "Conciliación", "Conciliación bancaria", [
        "Conciliación automática",
        "Diferencias encontradas",
        "Resolver discrepancias",
        "Historial de conciliaciones",
        "Exportar",
        "Estadísticas"
    ]),
    ("(admin)/admin/finanzas/impuestos", "Gestión de Impuestos", "Configuración fiscal", [
        "Tasas impositivas",
        "Reportes fiscales",
        "Configuración por región",
        "Retenciones",
        "Exportar para contabilidad",
        "Historial fiscal"
    ]),
    ("(admin)/admin/contenido", "Gestión de Contenido", "Administrar contenido", [
        "Artículos publicados",
        "Recursos disponibles",
        "Evaluaciones activas",
        "Templates",
        "Crear nuevo contenido",
        "Estadísticas de uso"
    ]),
    ("(admin)/admin/contenido/articulos", "Artículos", "Gestión de blog", [
        "Lista de artículos",
        "Borradores",
        "Programar publicación",
        "Categorías y tags",
        "SEO",
        "Estadísticas de lectura"
    ]),
    ("(admin)/admin/contenido/recursos", "Recursos", "Gestión de recursos educativos", [
        "Lista de recursos",
        "Subir nuevo recurso",
        "Categorización",
        "Control de acceso",
        "Estadísticas de descarga",
        "Destacados"
    ]),
    ("(admin)/admin/contenido/evaluaciones", "Evaluaciones", "Gestión de tests y cuestionarios", [
        "Lista de evaluaciones",
        "Crear evaluación",
        "Configurar scoring",
        "Activar/desactivar",
        "Estadísticas de uso",
        "Resultados agregados"
    ]),
    ("(admin)/admin/contenido/templates", "Templates", "Plantillas de contenido", [
        "Templates de email",
        "Templates de notificaciones",
        "Templates de documentos",
        "Variables dinámicas",
        "Preview",
        "Versiones"
    ]),
    ("(admin)/admin/contenido/traducciones", "Traducciones", "Gestión i18n", [
        "Strings por idioma",
        "Strings faltantes",
        "Importar/Exportar",
        "Búsqueda de keys",
        "Edición en línea",
        "Historial de cambios"
    ]),
    ("(admin)/admin/configuracion", "Configuración Global", "Ajustes del sistema", [
        "Configuración general",
        "Parámetros de negocio",
        "Límites y restricciones",
        "Features flags",
        "Mantenimiento",
        "Historial de cambios"
    ]),
    ("(admin)/admin/configuracion/planes", "Planes y Precios", "Gestión de planes", [
        "Lista de planes",
        "Crear/editar plan",
        "Características incluidas",
        "Precios por región",
        "Promociones",
        "Migraciones de plan"
    ]),
    ("(admin)/admin/configuracion/roles", "Roles y Permisos", "Gestión de accesos", [
        "Lista de roles",
        "Crear/editar rol",
        "Matriz de permisos",
        "Asignación de usuarios",
        "Auditoría de accesos",
        "Roles predefinidos"
    ]),
    ("(admin)/admin/configuracion/notificaciones", "Notificaciones", "Configuración de alertas", [
        "Templates de notificaciones",
        "Canales (email, push, SMS)",
        "Triggers y eventos",
        "Preferencias por defecto",
        "Test de envío",
        "Logs de notificaciones"
    ]),
    ("(admin)/admin/configuracion/integraciones", "Integraciones", "APIs y servicios externos", [
        "Integraciones activas",
        "Configurar nueva integración",
        "API keys",
        "Webhooks",
        "Logs de sincronización",
        "Estado de servicios"
    ]),
    ("(admin)/admin/configuracion/seguridad", "Seguridad", "Configuración de seguridad", [
        "Políticas de contraseñas",
        "2FA obligatorio",
        "Sesiones y timeouts",
        "IP whitelist",
        "Logs de seguridad",
        "Incidentes de seguridad"
    ]),
    ("(admin)/admin/configuracion/mantenimiento", "Mantenimiento", "Tareas de mantenimiento", [
        "Programar mantenimiento",
        "Backup de base de datos",
        "Limpieza de datos",
        "Optimización",
        "Historial de mantenimientos",
        "Estado del sistema"
    ]),
    ("(admin)/admin/soporte", "Tickets de Soporte", "Gestión de soporte", [
        "Cola de tickets",
        "Priorización",
        "Asignación",
        "Responder tickets",
        "Base de conocimiento",
        "Estadísticas SLA"
    ]),
    ("(admin)/admin/soporte/[ticket-id]", "Detalle Ticket", "Vista de ticket individual", [
        "Información del ticket",
        "Historial de conversación",
        "Asignación y prioridad",
        "Adjuntos",
        "Acciones rápidas",
        "Cerrar ticket"
    ], "DetalleTicket"),
    ("(admin)/admin/moderacion", "Moderación", "Centro de moderación", [
        "Cola de moderación",
        "Contenido reportado",
        "Reglas de moderación",
        "Acciones automáticas",
        "Historial",
        "Estadísticas"
    ]),
    ("(admin)/admin/moderacion/mensajes", "Mensajes Reportados", "Moderación de chat", [
        "Mensajes flagged",
        "Contexto de conversación",
        "Acciones disponibles",
        "Notificar usuarios",
        "Historial de moderación",
        "Filtros automáticos"
    ]),
    ("(admin)/admin/moderacion/resenas", "Reseñas Reportadas", "Moderación de reviews", [
        "Reseñas reportadas",
        "Validar autenticidad",
        "Aprobar/rechazar",
        "Contactar usuario",
        "Historial",
        "Estadísticas"
    ]),
    ("(admin)/admin/crisis", "Gestión de Crisis", "Protocolo de emergencias", [
        "Alertas activas",
        "Protocolo de intervención",
        "Contactos de emergencia",
        "Escalación de casos",
        "Historial de crisis",
        "Recursos de emergencia"
    ])
]

for pagina in paginas_admin:
    crear_pagina(*pagina)

print(f"\n✅ TOTAL PÁGINAS ADMIN CREADAS: {len(paginas_admin)}")

# Continuará con empresas, profesionales, usuarios, etc.
print("\n🏢 Continuando con páginas de empresa...")

# ============= 4. PÁGINAS EMPRESA =============
paginas_empresa = [
    ("(empresa)/empresa/metricas", "Métricas Corporativas", "Dashboard de bienestar organizacional", [
        "Métricas de uso de la plataforma",
        "Indicadores de bienestar",
        "Sesiones por departamento",
        "Tendencias temporales",
        "Comparativas con benchmarks",
        "Exportar reportes"
    ]),
    ("(empresa)/empresa/reportes", "Reportes Empresariales", "Generación de reportes", [
        "Reportes predefinidos",
        "Constructor personalizado",
        "Programar envíos",
        "Compartir con stakeholders",
        "Exportar múltiples formatos",
        "Historial de reportes"
    ]),
    ("(empresa)/empresa/analytics", "Analytics Corporativo", "Análisis profundo de datos", [
        "Análisis de adopción",
        "Segmentación por equipos",
        "Predicciones de tendencias",
        "Análisis de impacto",
        "Correlaciones",
        "Insights automáticos"
    ]),
    ("(empresa)/empresa/roi", "ROI y Valor", "Retorno de inversión", [
        "Cálculo de ROI",
        "Reducción de ausentismo",
        "Mejora en productividad",
        "Ahorro en costos de salud",
        "Comparativas temporales",
        "Proyecciones futuras"
    ]),
    ("(empresa)/empresa/empleados", "Gestión de Empleados", "Administrar usuarios corporativos", [
        "Lista de empleados activos",
        "Búsqueda y filtros",
        "Uso individual",
        "Invitaciones pendientes",
        "Alta y baja masiva",
        "Exportar datos"
    ]),
    ("(empresa)/empresa/empleados/agregar", "Agregar Empleados", "Alta de nuevos usuarios", [
        "Alta individual",
        "Enviar invitación",
        "Asignar departamento",
        "Configurar límites",
        "Activación inmediata",
        "Confirmación"
    ]),
    ("(empresa)/empresa/empleados/importar", "Importación Masiva", "Cargar múltiples empleados", [
        "Descargar template CSV",
        "Subir archivo",
        "Validar datos",
        "Preview de importación",
        "Confirmar y procesar",
        "Reporte de resultados"
    ]),
    ("(empresa)/empresa/empleados/[id]", "Detalle Empleado", "Vista individual de usuario", [
        "Perfil del empleado",
        "Uso de la plataforma",
        "Sesiones asistidas",
        "Evaluaciones completadas",
        "Departamento y equipo",
        "Timeline de actividad"
    ], "DetalleEmpleado"),
    ("(empresa)/empresa/empleados/[id]/editar", "Editar Empleado", "Modificar datos de usuario", [
        "Actualizar información",
        "Cambiar departamento",
        "Ajustar límites individuales",
        "Reset de contraseña",
        "Suspender acceso",
        "Historial de cambios"
    ], "EditarEmpleado"),
    ("(empresa)/empresa/empleados/[id]/sesiones", "Sesiones Empleado", "Historial de sesiones", [
        "Lista de sesiones",
        "Estado de sesiones",
        "Uso de beneficios",
        "Próximas sesiones",
        "Estadísticas agregadas",
        "Privacidad protegida (no se muestran detalles clínicos)"
    ], "SesionesEmpleado"),
    ("(empresa)/empresa/empleados/[id]/evaluaciones", "Evaluaciones Empleado", "Tests completados (agregados)", [
        "Evaluaciones completadas",
        "Tendencias de bienestar",
        "Datos anonimizados",
        "Comparativas con promedios",
        "Recomendaciones",
        "Privacidad protegida"
    ], "EvaluacionesEmpleado"),
    ("(empresa)/empresa/empleados/invitaciones", "Invitaciones", "Gestión de invitaciones pendientes", [
        "Invitaciones enviadas",
        "Estado de cada invitación",
        "Reenviar invitaciones",
        "Cancelar invitaciones",
        "Estadísticas de conversión",
        "Invitaciones expiradas"
    ]),
    ("(empresa)/empresa/departamentos", "Departamentos", "Gestión de áreas organizacionales", [
        "Lista de departamentos",
        "Crear departamento",
        "Empleados por área",
        "Métricas por departamento",
        "Reorganizar",
        "Eliminar departamento"
    ]),
    ("(empresa)/empresa/departamentos/[id]", "Detalle Departamento", "Vista de área específica", [
        "Información del departamento",
        "Empleados asignados",
        "Métricas de uso",
        "Tendencias de bienestar",
        "Comparativas",
        "Exportar datos"
    ], "DetalleDepartamento"),
    ("(empresa)/empresa/departamentos/[id]/metricas", "Métricas Departamento", "Análisis por área", [
        "KPIs del departamento",
        "Adopción de la plataforma",
        "Indicadores de bienestar",
        "Comparativas interdepartamentales",
        "Tendencias temporales",
        "Recomendaciones"
    ], "MetricasDepartamento"),
    ("(empresa)/empresa/equipos", "Equipos", "Gestión de equipos de trabajo", [
        "Lista de equipos",
        "Crear equipo",
        "Asignar miembros",
        "Métricas por equipo",
        "Reorganizar",
        "Eliminar equipo"
    ]),
    ("(empresa)/empresa/equipos/[id]", "Detalle Equipo", "Vista de equipo específico", [
        "Información del equipo",
        "Miembros del equipo",
        "Métricas colectivas",
        "Dinámicas de equipo",
        "Comparativas",
        "Exportar datos"
    ], "DetalleEquipo"),
    ("(empresa)/empresa/configuracion", "Configuración Corporativa", "Ajustes de la organización", [
        "Configuración general",
        "Preferencias de uso",
        "Políticas internas",
        "Personalización",
        "Integraciones",
        "Historial de cambios"
    ]),
    ("(empresa)/empresa/configuracion/perfil", "Perfil Corporativo", "Datos de la organización", [
        "Información de la empresa",
        "Logo y branding",
        "Datos de contacto",
        "Dominio corporativo",
        "Información fiscal",
        "Actualizar datos"
    ]),
    ("(empresa)/empresa/configuracion/beneficios", "Configurar Beneficios", "Límites y accesos", [
        "Sesiones incluidas por empleado",
        "Tipos de terapia cubiertos",
        "Recursos disponibles",
        "Restricciones",
        "Políticas de uso",
        "Guardar cambios"
    ]),
    ("(empresa)/empresa/configuracion/limites", "Límites de Uso", "Configuración de restricciones", [
        "Sesiones mensuales",
        "Duración de sesiones",
        "Tipos de terapia",
        "Excepciones",
        "Aprobaciones requeridas",
        "Aplicar cambios"
    ]),
    ("(empresa)/empresa/configuracion/notificaciones", "Notificaciones", "Configurar alertas corporativas", [
        "Notificaciones a administradores",
        "Reportes automáticos",
        "Alertas de uso",
        "Frecuencia de envíos",
        "Destinatarios",
        "Preferencias de canal"
    ]),
    ("(empresa)/empresa/configuracion/integraciones", "Integraciones", "Conectar con otros sistemas", [
        "SSO (Single Sign-On)",
        "HRIS (Workday, BambooHR)",
        "Slack, Teams",
        "Calendario corporativo",
        "API keys",
        "Webhooks"
    ]),
    ("(empresa)/empresa/facturacion", "Facturación", "Gestión de pagos corporativos", [
        "Plan actual",
        "Próximo pago",
        "Historial de facturas",
        "Método de pago",
        "Información fiscal",
        "Contacto facturación"
    ]),
    ("(empresa)/empresa/facturacion/suscripcion", "Suscripción", "Gestión del plan", [
        "Plan contratado",
        "Características incluidas",
        "Empleados activos",
        "Uso actual",
        "Cambiar plan",
        "Cancelar suscripción"
    ]),
    ("(empresa)/empresa/facturacion/facturas", "Facturas", "Historial de pagos", [
        "Lista de facturas",
        "Descargar facturas",
        "Estado de pagos",
        "Búsqueda por fecha",
        "Exportar",
        "Configurar envío automático"
    ]),
    ("(empresa)/empresa/facturacion/metodo-pago", "Método de Pago", "Configuración de pagos", [
        "Método actual",
        "Agregar tarjeta",
        "Transferencia bancaria",
        "Facturación automática",
        "Actualizar datos",
        "Historial de cambios"
    ]),
    ("(empresa)/empresa/facturacion/upgrade", "Actualizar Plan", "Cambio de suscripción", [
        "Planes disponibles",
        "Comparativa de características",
        "Calculadora de costos",
        "Preview de cambio",
        "Confirmar upgrade",
        "Prorrateo de pago"
    ]),
    ("(empresa)/empresa/recursos", "Recursos Corporativos", "Contenido para la organización", [
        "Guías de implementación",
        "Mejores prácticas",
        "Casos de éxito",
        "Webinars",
        "Materiales de comunicación",
        "Kit de lanzamiento"
    ]),
    ("(empresa)/empresa/recursos/guias", "Guías", "Documentación para empresa", [
        "Guía de onboarding",
        "Guía para RRHH",
        "Guía de comunicación interna",
        "Guía de adopción",
        "Guía de métricas",
        "Descargar todas"
    ]),
    ("(empresa)/empresa/recursos/webinars", "Webinars", "Formación online", [
        "Próximos webinars",
        "Grabaciones disponibles",
        "Registrarse",
        "Materiales complementarios",
        "Certificados",
        "Calendario de formación"
    ]),
    ("(empresa)/empresa/comunicacion", "Centro de Comunicación", "Anuncios y comunicados", [
        "Crear anuncio interno",
        "Plantillas de comunicación",
        "Historial de comunicados",
        "Alcance y engagement",
        "Programar envíos",
        "Estadísticas"
    ]),
    ("(empresa)/empresa/calendario", "Calendario Corporativo", "Eventos y planificación", [
        "Calendario de eventos",
        "Sesiones grupales",
        "Webinars",
        "Mantenimientos programados",
        "Sincronizar con calendario",
        "Recordatorios"
    ])
]

for pagina in paginas_empresa:
    crear_pagina(*pagina)

print(f"✅ TOTAL PÁGINAS EMPRESA CREADAS: {len(paginas_empresa)}")

# ============= 5. PÁGINAS PROFESIONAL =============
print("\n👨‍⚕️ Creando páginas profesional...")

paginas_profesional = [
    ("(profesional)/profesional/agenda", "Mi Agenda", "Calendario de sesiones profesionales", [
        "Vista de calendario",
        "Sesiones próximas",
        "Disponibilidad configurada",
        "Bloqueos de tiempo",
        "Sincronizar con Google Calendar",
        "Vista diaria, semanal, mensual"
    ]),
    ("(profesional)/profesional/estadisticas", "Estadísticas", "Métricas de desempeño profesional", [
        "Sesiones completadas",
        "Horas facturadas",
        "Calificación promedio",
        "Pacientes activos",
        "Tendencias mensuales",
        "Comparativas con promedios"
    ]),
    ("(profesional)/profesional/ingresos", "Mis Ingresos", "Dashboard financiero", [
        "Ingresos totales",
        "Ingresos del mes",
        "Comisiones de plataforma",
        "Ingresos netos",
        "Gráficos de tendencias",
        "Proyecciones"
    ]),
    ("(profesional)/profesional/pacientes/[id]", "Ficha de Paciente", "Información completa del paciente", [
        "Perfil del paciente",
        "Motivo de consulta",
        "Historial clínico",
        "Plan de tratamiento",
        "Notas de sesiones",
        "Archivos adjuntos"
    ], "FichaPaciente"),
    ("(profesional)/profesional/pacientes/[id]/historial", "Historial Clínico", "Registro completo de sesiones", [
        "Cronología de sesiones",
        "Evolución del caso",
        "Notas clínicas",
        "Evaluaciones aplicadas",
        "Objetivos y progreso",
        "Exportar historial"
    ], "HistorialPaciente"),
    ("(profesional)/profesional/pacientes/[id]/notas", "Notas Clínicas", "Gestión de notas de sesión", [
        "Notas por sesión",
        "Plantillas de notas",
        "Búsqueda de notas",
        "Editar notas",
        "Privacidad y encriptación",
        "Exportar"
    ], "NotasPaciente"),
    ("(profesional)/profesional/pacientes/[id]/evaluaciones", "Evaluaciones", "Tests aplicados al paciente", [
        "Evaluaciones completadas",
        "Resultados y scoring",
        "Interpretación clínica",
        "Comparativas temporales",
        "Aplicar nueva evaluación",
        "Exportar resultados"
    ], "EvaluacionesPaciente"),
    ("(profesional)/profesional/pacientes/[id]/plan", "Plan de Tratamiento", "Objetivos y seguimiento", [
        "Objetivos terapéuticos",
        "Estrategias de intervención",
        "Progreso del paciente",
        "Ajustes al plan",
        "Hitos alcanzados",
        "Compartir con paciente"
    ], "PlanTratamiento"),
    ("(profesional)/profesional/pacientes/[id]/archivos", "Archivos", "Documentos del paciente", [
        "Archivos subidos",
        "Consentimientos",
        "Evaluaciones en PDF",
        "Recursos compartidos",
        "Subir nuevo archivo",
        "Gestión de privacidad"
    ], "ArchivosPaciente"),
    ("(profesional)/profesional/sesiones", "Gestión de Sesiones", "Vista general de sesiones", [
        "Próximas sesiones",
        "Sesiones pasadas",
        "Sesiones canceladas",
        "Búsqueda de sesiones",
        "Filtros avanzados",
        "Exportar lista"
    ]),
    ("(profesional)/profesional/sesiones/proximas", "Sesiones Próximas", "Calendario inmediato", [
        "Sesiones de hoy",
        "Sesiones de la semana",
        "Preparación pre-sesión",
        "Unirse a videollamada",
        "Reprogramar",
        "Cancelar sesión"
    ]),
    ("(profesional)/profesional/sesiones/historial", "Historial de Sesiones", "Registro completo", [
        "Todas las sesiones pasadas",
        "Búsqueda y filtros",
        "Estado de sesiones",
        "Notas tomadas",
        "Calificaciones recibidas",
        "Exportar historial"
    ]),
    ("(profesional)/profesional/sesiones/[id]", "Detalle de Sesión", "Vista individual de sesión", [
        "Información de la sesión",
        "Paciente asignado",
        "Hora y duración",
        "Notas de la sesión",
        "Unirse a videollamada",
        "Marcar como completada"
    ], "DetalleSesion"),
    ("(profesional)/profesional/sesiones/[id]/notas", "Notas de Sesión", "Registro clínico detallado", [
        "Plantilla SOAP",
        "Notas de evolución",
        "Observaciones clínicas",
        "Plan de seguimiento",
        "Guardar borrador",
        "Finalizar notas"
    ], "NotasSesion"),
    ("(profesional)/profesional/sesiones/[id]/video", "Sala de Videollamada", "Sesión en vivo", [
        "Iniciar videollamada",
        "Controles de audio/video",
        "Chat en sesión",
        "Compartir pantalla",
        "Grabación (con consentimiento)",
        "Finalizar sesión"
    ], "VideoSesion"),
    ("(profesional)/profesional/sesiones/canceladas", "Sesiones Canceladas", "Gestión de cancelaciones", [
        "Lista de cancelaciones",
        "Motivo de cancelación",
        "Política de cancelación",
        "Reprogramar",
        "Estadísticas",
        "Filtros"
    ]),
    ("(profesional)/profesional/disponibilidad", "Configurar Disponibilidad", "Gestión de horarios", [
        "Horarios semanales",
        "Días laborables",
        "Horarios específicos",
        "Duración de sesiones",
        "Buffer entre sesiones",
        "Aplicar cambios"
    ]),
    ("(profesional)/profesional/disponibilidad/horarios", "Horarios", "Configuración de agenda", [
        "Lunes a Domingo",
        "Horarios por día",
        "Excepciones",
        "Aplicar a todas las semanas",
        "Guardar configuración",
        "Preview de disponibilidad"
    ]),
    ("(profesional)/profesional/disponibilidad/vacaciones", "Vacaciones y Ausencias", "Bloquear períodos", [
        "Programar vacaciones",
        "Días festivos",
        "Ausencias programadas",
        "Notificación a pacientes",
        "Historial de ausencias",
        "Confirmar bloqueos"
    ]),
    ("(profesional)/profesional/disponibilidad/bloqueos", "Bloqueos de Tiempo", "Eventos especiales", [
        "Bloqueos puntuales",
        "Reuniones externas",
        "Formación continua",
        "Supervisión",
        "Crear bloqueo",
        "Eliminar bloqueo"
    ]),
    ("(profesional)/profesional/perfil", "Mi Perfil Profesional", "Información pública", [
        "Foto y datos personales",
        "Biografía profesional",
        "Especialidades",
        "Idiomas",
        "Certificaciones",
        "Preview de perfil público"
    ]),
    ("(profesional)/profesional/perfil/editar", "Editar Perfil", "Actualizar información", [
        "Actualizar datos",
        "Cambiar foto",
        "Modificar biografía",
        "Agregar especialidades",
        "Actualizar idiomas",
        "Guardar cambios"
    ]),
    ("(profesional)/profesional/perfil/especialidades", "Especialidades", "Áreas de práctica", [
        "Especialidades actuales",
        "Agregar especialidad",
        "Nivel de experiencia",
        "Certificaciones asociadas",
        "Eliminar especialidad",
        "Guardar"
    ]),
    ("(profesional)/profesional/perfil/certificaciones", "Certificaciones", "Credenciales profesionales", [
        "Certificaciones activas",
        "Subir certificado",
        "Fecha de vencimiento",
        "Institución emisora",
        "Verificación",
        "Renovaciones"
    ]),
    ("(profesional)/profesional/perfil/experiencia", "Experiencia", "Trayectoria profesional", [
        "Años de experiencia",
        "Instituciones previas",
        "Áreas de especialización",
        "Poblaciones atendidas",
        "Enfoques terapéuticos",
        "Actualizar"
    ]),
    ("(profesional)/profesional/perfil/tarifas", "Tarifas", "Configuración de precios", [
        "Tarifa por sesión",
        "Tarifas por tipo de terapia",
        "Descuentos",
        "Paquetes de sesiones",
        "Política de cancelación",
        "Guardar tarifas"
    ]),
    ("(profesional)/profesional/finanzas/comisiones", "Comisiones", "Desglose de comisiones", [
        "Comisión de plataforma",
        "Cálculo de comisiones",
        "Historial mensual",
        "Detalle por sesión",
        "Políticas de comisión",
        "Exportar"
    ]),
    ("(profesional)/profesional/finanzas/facturas", "Mis Facturas", "Facturación emitida", [
        "Facturas generadas",
        "Descargar facturas",
        "Estado de pagos",
        "Búsqueda por fecha",
        "Exportar",
        "Configuración fiscal"
    ]),
    ("(profesional)/profesional/finanzas/retiros", "Retiros", "Solicitar pagos", [
        "Saldo disponible",
        "Solicitar retiro",
        "Historial de retiros",
        "Método de pago configurado",
        "Tiempos de procesamiento",
        "Estado de solicitudes"
    ]),
    ("(profesional)/profesional/finanzas/fiscal", "Información Fiscal", "Datos para impuestos", [
        "Datos fiscales",
        "RFC/NIF",
        "Régimen fiscal",
        "Constancia fiscal",
        "Reportes anuales",
        "Actualizar información"
    ]),
    ("(profesional)/profesional/herramientas", "Herramientas Clínicas", "Recursos para práctica", [
        "Evaluaciones disponibles",
        "Protocolos de intervención",
        "Plantillas de notas",
        "Recursos educativos",
        "Técnicas terapéuticas",
        "Biblioteca clínica"
    ]),
    ("(profesional)/profesional/herramientas/evaluaciones", "Evaluaciones", "Tests y cuestionarios", [
        "Catálogo de evaluaciones",
        "Aplicar evaluación",
        "Interpretación de resultados",
        "Normativas",
        "Favoritos",
        "Búsqueda"
    ]),
    ("(profesional)/profesional/herramientas/protocolos", "Protocolos", "Guías de intervención", [
        "Protocolos por diagnóstico",
        "Evidencia científica",
        "Pasos de aplicación",
        "Recursos complementarios",
        "Favoritos",
        "Búsqueda"
    ]),
    ("(profesional)/profesional/recursos", "Recursos Profesionales", "Formación y materiales", [
        "Artículos científicos",
        "Guías clínicas",
        "Casos clínicos",
        "Webinars",
        "Actualizaciones",
        "Biblioteca"
    ]),
    ("(profesional)/profesional/formacion", "Formación Continua", "Desarrollo profesional", [
        "Cursos disponibles",
        "Webinars próximos",
        "Certificaciones",
        "Créditos de formación",
        "Mis cursos completados",
        "Inscripciones"
    ]),
    ("(profesional)/profesional/supervision", "Supervisión", "Asesoría profesional", [
        "Solicitar supervisión",
        "Sesiones de supervisión",
        "Casos para discutir",
        "Supervisores disponibles",
        "Historial de supervisión",
        "Certificados"
    ]),
    ("(profesional)/profesional/mensajes", "Mensajes", "Comunicación con pacientes", [
        "Bandeja de entrada",
        "Conversaciones activas",
        "Nuevo mensaje",
        "Búsqueda de conversaciones",
        "Archivar",
        "Configuración de mensajería"
    ]),
    ("(profesional)/profesional/mensajes/[id]", "Conversación", "Chat con paciente específico", [
        "Historial de mensajes",
        "Enviar mensaje",
        "Adjuntar archivo",
        "Contexto del paciente",
        "Marcar como leído",
        "Archivar conversación"
    ], "ConversacionMensaje"),
    ("(profesional)/profesional/notificaciones", "Notificaciones", "Alertas y recordatorios", [
        "Notificaciones recientes",
        "Marcar como leídas",
        "Filtros por tipo",
        "Configurar preferencias",
        "Historial",
        "Eliminar todas"
    ]),
    ("(profesional)/profesional/anuncios", "Anuncios", "Comunicados de la plataforma", [
        "Anuncios recientes",
        "Actualizaciones de plataforma",
        "Nuevas funcionalidades",
        "Mantenimientos programados",
        "Cambios en políticas",
        "Archivar anuncios"
    ])
]

for pagina in paginas_profesional:
    crear_pagina(*pagina)

print(f"✅ TOTAL PÁGINAS PROFESIONAL CREADAS: {len(paginas_profesional)}")

print(f"\n🎉 SCRIPT COMPLETADO")
print(f"Total de páginas creadas hasta ahora: {len(paginas_publicas) + len(paginas_ayuda) + len(paginas_admin) + len(paginas_empresa) + len(paginas_profesional)}")

# ============= 6. PÁGINAS USUARIO =============
print("\n👤 Creando páginas usuario...")

paginas_usuario = [
    ("(usuario)/dashboard/bienestar", "Mi Bienestar", "Dashboard de salud mental personal", [
        "Indicadores de bienestar actuales",
        "Tendencias y evolución",
        "Recomendaciones personalizadas",
        "Recursos sugeridos",
        "Próximas sesiones",
        "Objetivos de bienestar"
    ]),
    ("(usuario)/dashboard/progreso", "Mi Progreso", "Seguimiento de evolución personal", [
        "Gráficos de progreso",
        "Evaluaciones completadas",
        "Objetivos alcanzados",
        "Horas de terapia",
        "Recursos utilizados",
        "Timeline de hitos"
    ]),
    ("(usuario)/dashboard/recomendaciones", "Recomendaciones", "Contenido personalizado", [
        "Profesionales recomendados",
        "Recursos sugeridos",
        "Artículos relevantes",
        "Ejercicios personalizados",
        "Evaluaciones pendientes",
        "Próximos pasos"
    ]),
    ("(usuario)/profesionales", "Buscar Profesionales", "Encuentra tu terapeuta ideal", [
        "Búsqueda avanzada",
        "Filtros por especialidad",
        "Filtros por idioma",
        "Filtros por disponibilidad",
        "Ordenar por calificación",
        "Ver perfiles detallados"
    ]),
    ("(usuario)/profesionales/[id]", "Perfil de Profesional", "Detalles del terapeuta", [
        "Información profesional",
        "Especialidades y enfoque",
        "Experiencia y formación",
        "Calificaciones y reseñas",
        "Disponibilidad",
        "Reservar sesión"
    ], "PerfilProfesional"),
    ("(usuario)/profesionales/[id]/reservar", "Reservar Sesión", "Agendar cita con terapeuta", [
        "Calendario de disponibilidad",
        "Seleccionar fecha y hora",
        "Tipo de sesión",
        "Motivo de consulta",
        "Confirmar reserva",
        "Recibir confirmación"
    ], "ReservarSesion"),
    ("(usuario)/profesionales/favoritos", "Profesionales Favoritos", "Tus terapeutas guardados", [
        "Lista de favoritos",
        "Acceso rápido",
        "Reservar con favoritos",
        "Eliminar de favoritos",
        "Compartir perfil",
        "Notificaciones de disponibilidad"
    ]),
    ("(usuario)/reservar", "Nueva Reserva", "Agendar sesión terapéutica", [
        "Seleccionar profesional",
        "Elegir fecha y hora",
        "Tipo de sesión",
        "Motivo de consulta",
        "Método de pago",
        "Confirmar reserva"
    ]),
    ("(usuario)/reservar/confirmacion/[id]", "Confirmación de Reserva", "Detalles de cita agendada", [
        "Información de la sesión",
        "Profesional asignado",
        "Fecha y hora confirmada",
        "Agregar a calendario",
        "Instrucciones previas",
        "Opciones de modificación"
    ], "ConfirmacionReserva"),
    ("(usuario)/sesiones", "Mis Sesiones", "Gestión de sesiones terapéuticas", [
        "Próximas sesiones",
        "Sesiones pasadas",
        "Sesiones canceladas",
        "Buscar sesiones",
        "Filtros",
        "Exportar historial"
    ]),
    ("(usuario)/sesiones/proximas", "Próximas Sesiones", "Calendario de citas", [
        "Sesiones programadas",
        "Detalles de cada sesión",
        "Unirse a videollamada",
        "Reprogramar",
        "Cancelar",
        "Preparación para sesión"
    ]),
    ("(usuario)/sesiones/pasadas", "Sesiones Pasadas", "Historial de sesiones", [
        "Lista de sesiones completadas",
        "Profesional atendido",
        "Fecha y duración",
        "Notas compartidas",
        "Calificar sesión",
        "Reservar nuevamente"
    ]),
    ("(usuario)/sesiones/[id]", "Detalle de Sesión", "Información completa de sesión", [
        "Datos de la sesión",
        "Profesional",
        "Fecha y hora",
        "Estado",
        "Unirse a videollamada",
        "Opciones de gestión"
    ], "DetalleSesionUsuario"),
    ("(usuario)/sesiones/[id]/cancelar", "Cancelar Sesión", "Cancelación de cita", [
        "Motivo de cancelación",
        "Política de cancelación",
        "Reembolso aplicable",
        "Confirmar cancelación",
        "Reprogramar alternativa",
        "Notificación al terapeuta"
    ], "CancelarSesion"),
    ("(usuario)/sesiones/[id]/reprogramar", "Reprogramar Sesión", "Cambiar fecha/hora", [
        "Nueva fecha y hora",
        "Disponibilidad del terapeuta",
        "Política de reprogramación",
        "Confirmar cambio",
        "Notificaciones",
        "Confirmación"
    ], "ReprogramarSesion"),
    ("(usuario)/sesiones/[id]/unirse", "Sala de Videollamada", "Sesión en vivo", [
        "Acceder a videollamada",
        "Verificar audio/video",
        "Sala de espera",
        "Chat con terapeuta",
        "Finalizar sesión",
        "Soporte técnico"
    ], "UnirseSesion"),
    ("(usuario)/sesiones/[id]/calificar", "Calificar Sesión", "Valorar experiencia", [
        "Calificación de estrellas",
        "Comentarios opcionales",
        "Aspectos destacados",
        "Áreas de mejora",
        "Recomendar terapeuta",
        "Enviar calificación"
    ], "CalificarSesion"),
    ("(usuario)/evaluaciones", "Mis Evaluaciones", "Tests de bienestar mental", [
        "Evaluaciones disponibles",
        "Evaluaciones completadas",
        "Resultados históricos",
        "Recomendaciones",
        "Iniciar evaluación",
        "Compartir con terapeuta"
    ]),
    ("(usuario)/evaluaciones/[tipo]/iniciar", "Iniciar Evaluación", "Comenzar test de bienestar", [
        "Información del test",
        "Duración estimada",
        "Instrucciones",
        "Privacidad de datos",
        "Comenzar evaluación",
        "Guardar para después"
    ], "IniciarEvaluacion"),
    ("(usuario)/evaluaciones/[tipo]/preguntas", "Cuestionario", "Responder evaluación", [
        "Preguntas del test",
        "Barra de progreso",
        "Navegación entre preguntas",
        "Guardar borrador",
        "Finalizar evaluación",
        "Validación de respuestas"
    ], "PreguntasEvaluacion"),
    ("(usuario)/evaluaciones/resultados", "Resultados de Evaluaciones", "Tus resultados", [
        "Resultados recientes",
        "Interpretación",
        "Nivel de bienestar",
        "Recomendaciones",
        "Compartir con terapeuta",
        "Comparar con anteriores"
    ]),
    ("(usuario)/evaluaciones/resultados/[id]", "Detalle de Resultado", "Análisis de evaluación", [
        "Resultado completo",
        "Interpretación detallada",
        "Gráficos y métricas",
        "Áreas de atención",
        "Recursos recomendados",
        "Exportar PDF"
    ], "DetalleResultado"),
    ("(usuario)/evaluaciones/historial", "Historial de Evaluaciones", "Seguimiento temporal", [
        "Todas las evaluaciones",
        "Evolución temporal",
        "Comparativas",
        "Tendencias",
        "Gráficos históricos",
        "Exportar historial"
    ]),
    ("(usuario)/evaluaciones/comparar", "Comparar Evaluaciones", "Análisis comparativo", [
        "Seleccionar evaluaciones",
        "Comparativa lado a lado",
        "Cambios significativos",
        "Progreso identificado",
        "Gráficos comparativos",
        "Exportar comparativa"
    ]),
    ("(usuario)/chat", "Mensajes", "Centro de comunicación", [
        "Conversaciones activas",
        "Mensajes no leídos",
        "Buscar conversaciones",
        "Nuevo mensaje",
        "Archivar",
        "Configuración"
    ]),
    ("(usuario)/chat/[conversacion-id]", "Conversación", "Chat con profesional", [
        "Historial de mensajes",
        "Enviar mensaje",
        "Adjuntar archivo",
        "Información del terapeuta",
        "Marcar como leído",
        "Archivar chat"
    ], "ConversacionChat"),
    ("(usuario)/chat/crisis", "Chat de Crisis", "Apoyo inmediato", [
        "Línea de crisis 24/7",
        "Protocolo de emergencia",
        "Contacto inmediato",
        "Recursos de emergencia",
        "Teléfonos de ayuda",
        "Escalación a servicios de emergencia"
    ]),
    ("(usuario)/chat/bot", "Asistente Virtual", "Chatbot de soporte", [
        "Chat con IA",
        "Preguntas frecuentes",
        "Guías rápidas",
        "Recursos automáticos",
        "Derivar a humano",
        "Historial de conversación"
    ]),
    ("(usuario)/chat/grupo/[id]", "Grupo de Apoyo", "Chat grupal", [
        "Mensajes del grupo",
        "Participantes",
        "Reglas del grupo",
        "Moderación",
        "Participar",
        "Salir del grupo"
    ], "GrupoApoyo"),
    ("(usuario)/recursos/articulos", "Artículos", "Contenido educativo", [
        "Lista de artículos",
        "Categorías",
        "Buscar artículos",
        "Artículos destacados",
        "Guardar favoritos",
        "Compartir"
    ]),
    ("(usuario)/recursos/articulos/[id]", "Artículo", "Leer contenido", [
        "Contenido del artículo",
        "Autor y fecha",
        "Tiempo de lectura",
        "Artículos relacionados",
        "Guardar favorito",
        "Compartir"
    ], "ArticuloRecurso"),
    ("(usuario)/recursos/videos", "Videos", "Contenido multimedia", [
        "Biblioteca de videos",
        "Categorías",
        "Buscar videos",
        "Videos destacados",
        "Guardar favoritos",
        "Playlist personalizada"
    ]),
    ("(usuario)/recursos/videos/[id]", "Video", "Reproducir contenido", [
        "Reproductor de video",
        "Descripción",
        "Transcripción",
        "Videos relacionados",
        "Guardar favorito",
        "Compartir"
    ], "VideoRecurso"),
    ("(usuario)/recursos/ejercicios", "Ejercicios", "Actividades prácticas", [
        "Lista de ejercicios",
        "Categorías (respiración, mindfulness, etc.)",
        "Buscar ejercicios",
        "Ejercicios guiados",
        "Guardar favoritos",
        "Seguimiento de práctica"
    ]),
    ("(usuario)/recursos/ejercicios/[id]", "Ejercicio", "Práctica guiada", [
        "Instrucciones del ejercicio",
        "Audio/video guiado",
        "Duración",
        "Beneficios",
        "Marcar como completado",
        "Programar recordatorios"
    ], "EjercicioRecurso"),
    ("(usuario)/recursos/favoritos", "Recursos Favoritos", "Contenido guardado", [
        "Todos los favoritos",
        "Filtrar por tipo",
        "Acceso rápido",
        "Eliminar favoritos",
        "Compartir colección",
        "Exportar lista"
    ]),
    ("(usuario)/recursos/historial", "Historial de Recursos", "Contenido consumido", [
        "Recursos visitados",
        "Fecha de acceso",
        "Tiempo invertido",
        "Filtros",
        "Continuar donde lo dejaste",
        "Limpiar historial"
    ]),
    ("(usuario)/perfil", "Mi Perfil", "Información personal", [
        "Datos personales",
        "Foto de perfil",
        "Información de contacto",
        "Preferencias",
        "Editar perfil",
        "Verificación de cuenta"
    ]),
    ("(usuario)/perfil/editar", "Editar Perfil", "Actualizar información", [
        "Modificar datos",
        "Cambiar foto",
        "Actualizar contacto",
        "Preferencias personales",
        "Guardar cambios",
        "Cancelar edición"
    ]),
    ("(usuario)/perfil/preferencias", "Preferencias", "Configuración personal", [
        "Idioma preferido",
        "Zona horaria",
        "Tipo de terapia preferida",
        "Género de terapeuta",
        "Especialidades de interés",
        "Guardar preferencias"
    ]),
    ("(usuario)/perfil/privacidad", "Privacidad", "Control de datos personales", [
        "Configuración de privacidad",
        "Visibilidad de perfil",
        "Compartición de datos",
        "Consentimientos",
        "Eliminar datos",
        "Exportar datos"
    ]),
    ("(usuario)/perfil/notificaciones", "Notificaciones", "Preferencias de alertas", [
        "Notificaciones por email",
        "Notificaciones push",
        "Notificaciones SMS",
        "Tipos de notificaciones",
        "Frecuencia",
        "Guardar configuración"
    ]),
    ("(usuario)/perfil/seguridad", "Seguridad", "Configuración de seguridad", [
        "Cambiar contraseña",
        "Autenticación de dos factores",
        "Sesiones activas",
        "Dispositivos conectados",
        "Historial de accesos",
        "Alertas de seguridad"
    ]),
    ("(usuario)/perfil/2fa", "Autenticación 2FA", "Configurar verificación en dos pasos", [
        "Activar 2FA",
        "Métodos disponibles (app, SMS)",
        "Códigos de backup",
        "Escanear QR",
        "Verificar configuración",
        "Desactivar 2FA"
    ]),
    ("(usuario)/perfil/dispositivos", "Dispositivos Conectados", "Gestión de accesos", [
        "Lista de dispositivos",
        "Última actividad",
        "Ubicación aproximada",
        "Cerrar sesión remota",
        "Dispositivo actual",
        "Historial de conexiones"
    ]),
    ("(usuario)/perfil/historial-acceso", "Historial de Accesos", "Log de actividad", [
        "Registros de login",
        "Fecha y hora",
        "Dispositivo y ubicación",
        "IP address",
        "Eventos de seguridad",
        "Exportar historial"
    ]),
    ("(usuario)/mi-plan", "Mi Plan", "Suscripción y beneficios", [
        "Plan actual",
        "Beneficios incluidos",
        "Límites de uso",
        "Próximo pago",
        "Cambiar plan",
        "Historial de suscripción"
    ]),
    ("(usuario)/mi-plan/beneficios", "Beneficios", "Detalles de tu plan", [
        "Sesiones incluidas",
        "Recursos disponibles",
        "Evaluaciones incluidas",
        "Servicios adicionales",
        "Términos y condiciones",
        "Contacto con soporte"
    ]),
    ("(usuario)/mi-plan/uso", "Uso del Plan", "Seguimiento de consumo", [
        "Sesiones utilizadas",
        "Sesiones disponibles",
        "Recursos consumidos",
        "Gráficos de uso",
        "Proyección de consumo",
        "Historial mensual"
    ]),
    ("(usuario)/mi-plan/limites", "Límites del Plan", "Restricciones actuales", [
        "Límite de sesiones mensuales",
        "Sesiones restantes",
        "Tipos de terapia incluidos",
        "Restricciones",
        "Solicitar aumento",
        "Upgrade de plan"
    ]),
    ("(usuario)/configuracion", "Configuración", "Ajustes de la cuenta", [
        "Configuración general",
        "Perfil",
        "Privacidad",
        "Notificaciones",
        "Seguridad",
        "Preferencias"
    ]),
    ("(usuario)/configuracion/perfil", "Configuración de Perfil", "Ajustes personales", [
        "Editar datos",
        "Foto de perfil",
        "Información de contacto",
        "Verificación",
        "Eliminar cuenta",
        "Guardar cambios"
    ]),
    ("(usuario)/configuracion/password", "Cambiar Contraseña", "Actualizar contraseña", [
        "Contraseña actual",
        "Nueva contraseña",
        "Confirmar contraseña",
        "Requisitos de seguridad",
        "Cerrar otras sesiones",
        "Actualizar contraseña"
    ]),
    ("(usuario)/configuracion/notificaciones", "Configuración de Notificaciones", "Preferencias de alertas", [
        "Email",
        "Push",
        "SMS",
        "Tipos de notificaciones",
        "Frecuencia",
        "Horarios de envío"
    ]),
    ("(usuario)/configuracion/idioma", "Idioma", "Configuración de idioma", [
        "Idioma de la interfaz",
        "Idioma de contenido",
        "Idioma preferido para terapia",
        "Formato de fecha",
        "Formato de hora",
        "Aplicar cambios"
    ]),
    ("(usuario)/configuracion/privacidad", "Configuración de Privacidad", "Control de datos", [
        "Visibilidad de perfil",
        "Compartición de datos",
        "Cookies",
        "Análisis de uso",
        "Consentimientos",
        "Descargar datos"
    ]),
    ("(usuario)/configuracion/tema", "Tema Visual", "Personalización de interfaz", [
        "Modo claro",
        "Modo oscuro",
        "Automático (según sistema)",
        "Tamaño de fuente",
        "Contraste",
        "Aplicar tema"
    ]),
    ("(usuario)/configuracion/accesibilidad", "Accesibilidad", "Ajustes de accesibilidad", [
        "Tamaño de texto",
        "Contraste alto",
        "Lector de pantalla",
        "Navegación por teclado",
        "Subtítulos",
        "Animaciones reducidas"
    ]),
    ("(usuario)/configuracion/exportar-datos", "Exportar Datos", "Descarga de información personal", [
        "Solicitar exportación",
        "Tipos de datos incluidos",
        "Formato de descarga",
        "Privacidad y seguridad",
        "Confirmar solicitud",
        "Recibir enlace de descarga"
    ]),
    ("(usuario)/configuracion/eliminar-cuenta", "Eliminar Cuenta", "Borrado de cuenta", [
        "Consecuencias del borrado",
        "Período de gracia",
        "Datos que se eliminarán",
        "Confirmar identidad",
        "Motivo de eliminación",
        "Confirmar eliminación"
    ]),
    ("(usuario)/notificaciones", "Centro de Notificaciones", "Todas tus notificaciones", [
        "Notificaciones recientes",
        "No leídas",
        "Leídas",
        "Filtros",
        "Marcar todas como leídas",
        "Configurar"
    ]),
    ("(usuario)/notificaciones/todas", "Todas las Notificaciones", "Historial completo", [
        "Lista completa",
        "Filtrar por tipo",
        "Filtrar por fecha",
        "Buscar",
        "Eliminar",
        "Exportar"
    ]),
    ("(usuario)/notificaciones/no-leidas", "No Leídas", "Notificaciones pendientes", [
        "Notificaciones sin leer",
        "Marcar como leída",
        "Acción rápida",
        "Eliminar",
        "Archivar",
        "Filtros"
    ]),
    ("(usuario)/notificaciones/configuracion", "Configuración de Notificaciones", "Preferencias", [
        "Tipos de notificaciones",
        "Canales (email, push, SMS)",
        "Frecuencia",
        "Horarios",
        "No molestar",
        "Guardar preferencias"
    ]),
    ("(usuario)/mensajes", "Mensajes", "Bandeja de mensajes", [
        "Conversaciones recientes",
        "Mensajes no leídos",
        "Buscar",
        "Nuevo mensaje",
        "Archivar",
        "Configuración"
    ]),
    ("(usuario)/mensajes/enviados", "Mensajes Enviados", "Mensajes que has enviado", [
        "Lista de enviados",
        "Buscar",
        "Filtrar",
        "Ver conversación",
        "Eliminar",
        "Exportar"
    ]),
    ("(usuario)/mensajes/archivados", "Mensajes Archivados", "Conversaciones archivadas", [
        "Lista de archivados",
        "Buscar",
        "Restaurar",
        "Eliminar permanentemente",
        "Filtros",
        "Exportar"
    ])
]

for pagina in paginas_usuario:
    crear_pagina(*pagina)

print(f"✅ TOTAL PÁGINAS USUARIO CREADAS: {len(paginas_usuario)}")

# ============= 7. PÁGINAS ERROR Y UTILIDAD =============
print("\n⚠️ Creando páginas de error y utilidad...")

paginas_error = [
    ("404", "Página No Encontrada", "La página que buscas no existe", [
        "Mensaje de error 404",
        "Sugerencias de navegación",
        "Búsqueda de contenido",
        "Enlaces rápidos",
        "Contactar soporte",
        "Volver al inicio"
    ]),
    ("500", "Error del Servidor", "Algo salió mal en nuestro servidor", [
        "Mensaje de error 500",
        "Información para el usuario",
        "Reintento automático",
        "Contactar soporte técnico",
        "Estado del servicio",
        "Volver al inicio"
    ]),
    ("503", "Servicio No Disponible", "El servicio está temporalmente fuera de línea", [
        "Mensaje de mantenimiento",
        "Tiempo estimado de resolución",
        "Actualizaciones de estado",
        "Contacto de emergencia",
        "Suscribirse a actualizaciones",
        "Servicios alternativos"
    ]),
    ("mantenimiento", "Mantenimiento Programado", "Estamos mejorando la plataforma", [
        "Información de mantenimiento",
        "Duración estimada",
        "Mejoras incluidas",
        "Hora de regreso",
        "Suscribirse a notificaciones",
        "Contacto de urgencias"
    ]),
    ("sin-conexion", "Sin Conexión", "No hay conexión a Internet", [
        "Verificar conexión",
        "Modo offline disponible",
        "Funcionalidades limitadas",
        "Reintentar conexión",
        "Soporte técnico",
        "Datos guardados localmente"
    ]),
    ("sesion-expirada", "Sesión Expirada", "Tu sesión ha caducado", [
        "Mensaje de sesión expirada",
        "Iniciar sesión nuevamente",
        "Recordar dispositivo",
        "Recuperar trabajo no guardado",
        "Configurar tiempo de sesión",
        "Contactar soporte"
    ]),
    ("acceso-denegado", "Acceso Denegado", "No tienes permisos para acceder", [
        "Mensaje de acceso denegado",
        "Motivo de restricción",
        "Solicitar acceso",
        "Contactar administrador",
        "Cambiar de cuenta",
        "Volver al inicio"
    ]),
    ("cuenta-suspendida", "Cuenta Suspendida", "Tu cuenta ha sido suspendida", [
        "Motivo de suspensión",
        "Pasos para reactivación",
        "Contactar soporte",
        "Revisar términos de servicio",
        "Apelar decisión",
        "Información de contacto"
    ]),
    ("pago-requerido", "Pago Requerido", "Se requiere actualizar método de pago", [
        "Mensaje de pago pendiente",
        "Actualizar tarjeta",
        "Ver facturas pendientes",
        "Métodos de pago aceptados",
        "Contactar facturación",
        "Downgrade de plan"
    ]),
    ("limite-excedido", "Límite Excedido", "Has alcanzado el límite de tu plan", [
        "Tipo de límite alcanzado",
        "Uso actual vs límite",
        "Upgrade de plan",
        "Esperar renovación",
        "Comprar sesiones adicionales",
        "Contactar soporte"
    ]),
    ("bienvenido", "Bienvenido a MentalFit", "Tu cuenta ha sido creada exitosamente", [
        "Mensaje de bienvenida",
        "Próximos pasos",
        "Completar perfil",
        "Tour guiado",
        "Buscar terapeuta",
        "Explorar recursos"
    ]),
    ("email-verificado", "Email Verificado", "Tu correo ha sido confirmado", [
        "Confirmación de verificación",
        "Acceder a la plataforma",
        "Completar perfil",
        "Comenzar a usar MentalFit",
        "Buscar terapeuta",
        "Recursos disponibles"
    ]),
    ("password-cambiado", "Contraseña Actualizada", "Tu contraseña ha sido cambiada", [
        "Confirmación de cambio",
        "Iniciar sesión",
        "Configurar 2FA",
        "Revisar sesiones activas",
        "Consejos de seguridad",
        "Volver al perfil"
    ]),
    ("pago-exitoso", "Pago Exitoso", "Tu pago ha sido procesado", [
        "Confirmación de pago",
        "Detalles de la transacción",
        "Recibo",
        "Descargar factura",
        "Ver plan actualizado",
        "Comenzar a usar beneficios"
    ]),
    ("suscripcion-actualizada", "Suscripción Actualizada", "Tu plan ha sido modificado", [
        "Confirmación de cambio",
        "Detalles del nuevo plan",
        "Beneficios incluidos",
        "Próximo pago",
        "Ver factura",
        "Acceder al dashboard"
    ]),
    ("cita-confirmada", "Cita Confirmada", "Tu sesión ha sido agendada", [
        "Confirmación de reserva",
        "Detalles de la sesión",
        "Profesional asignado",
        "Agregar a calendario",
        "Preparación para sesión",
        "Modificar cita"
    ]),
    ("cuenta-eliminada", "Cuenta Eliminada", "Tu cuenta ha sido eliminada", [
        "Confirmación de eliminación",
        "Período de recuperación",
        "Recuperar cuenta",
        "Datos eliminados",
        "Exportación de datos",
        "Feedback de salida"
    ])
]

for pagina in paginas_error:
    crear_pagina(*pagina)

print(f"✅ TOTAL PÁGINAS ERROR Y UTILIDAD CREADAS: {len(paginas_error)}")

# ============= RESUMEN FINAL =============
total_paginas = (
    len(paginas_publicas) + 
    len(paginas_ayuda) + 
    len(paginas_admin) + 
    len(paginas_empresa) + 
    len(paginas_profesional) + 
    len(paginas_usuario) + 
    len(paginas_error)
)

print(f"\n{'='*60}")
print(f"✅ GENERACIÓN COMPLETADA EXITOSAMENTE")
print(f"{'='*60}")
print(f"\n📊 RESUMEN POR CATEGORÍA:")
print(f"   📄 Páginas Públicas:        {len(paginas_publicas):>3}")
print(f"   🆘 Páginas de Ayuda:        {len(paginas_ayuda):>3}")
print(f"   ⚙️  Páginas Super Admin:     {len(paginas_admin):>3}")
print(f"   🏢 Páginas Empresa:         {len(paginas_empresa):>3}")
print(f"   👨‍⚕️  Páginas Profesional:     {len(paginas_profesional):>3}")
print(f"   👤 Páginas Usuario:         {len(paginas_usuario):>3}")
print(f"   ⚠️  Páginas Error/Utilidad:  {len(paginas_error):>3}")
print(f"\n   🎯 TOTAL PÁGINAS GENERADAS: {total_paginas:>3}")
print(f"{'='*60}\n")
