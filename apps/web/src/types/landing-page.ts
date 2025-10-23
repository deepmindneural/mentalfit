/**
 * TypeScript Types para Landing Page
 * Generado por: Agent-Backend
 * Fecha: 2025-10-23
 *
 * Tipos correspondientes a las tablas de la base de datos
 * para la funcionalidad de landing page de MentalFit
 */

// =====================================================
// TESTIMONIOS
// =====================================================

export interface Testimonio {
  id: string;
  created_at: string;
  updated_at: string;
  nombre_cliente: string;
  cargo: string | null;
  empresa: string | null;
  foto_url: string | null;
  testimonio_es: string;
  testimonio_en: string;
  calificacion: 1 | 2 | 3 | 4 | 5;
  destacado: boolean;
  categoria: 'empresa' | 'empleado' | 'profesional';
  activo: boolean;
}

export interface TestimonioInput {
  nombre_cliente: string;
  cargo?: string;
  empresa?: string;
  foto_url?: string;
  testimonio_es: string;
  testimonio_en: string;
  calificacion: 1 | 2 | 3 | 4 | 5;
  destacado?: boolean;
  categoria: 'empresa' | 'empleado' | 'profesional';
  activo?: boolean;
}

// =====================================================
// CASOS DE ÉXITO
// =====================================================

export interface MetricasCasoExito {
  [key: string]: string | number;
  // Ejemplos:
  // reduccion_burnout?: string;
  // roi?: string;
  // satisfaccion_empleados?: string;
}

export interface CasoExito {
  id: string;
  created_at: string;
  updated_at: string;
  empresa_nombre: string;
  industria: string;
  logo_url: string | null;
  imagen_principal_url: string | null;
  titulo_es: string;
  titulo_en: string;
  descripcion_corta_es: string;
  descripcion_corta_en: string;
  contenido_completo_es: string;
  contenido_completo_en: string;
  metricas_json: MetricasCasoExito;
  slug: string;
  publicado: boolean;
}

export interface CasoExitoInput {
  empresa_nombre: string;
  industria: string;
  logo_url?: string;
  imagen_principal_url?: string;
  titulo_es: string;
  titulo_en: string;
  descripcion_corta_es: string;
  descripcion_corta_en: string;
  contenido_completo_es: string;
  contenido_completo_en: string;
  metricas_json?: MetricasCasoExito;
  slug: string;
  publicado?: boolean;
}

// =====================================================
// BLOG POSTS
// =====================================================

export interface BlogPost {
  id: string;
  created_at: string;
  updated_at: string;
  fecha_publicacion: string | null;
  titulo_es: string;
  titulo_en: string;
  contenido_es: string;
  contenido_en: string;
  extracto_es: string | null;
  extracto_en: string | null;
  slug: string;
  imagen_destacada_url: string | null;
  categoria: string;
  etiquetas: string[];
  autor_id: string | null;
  autor_nombre: string | null;
  autor_foto_url: string | null;
  publicado: boolean;
  destacado: boolean;
  tiempo_lectura_minutos: number | null;
  vistas: number;
}

export interface BlogPostInput {
  titulo_es: string;
  titulo_en: string;
  contenido_es: string;
  contenido_en: string;
  extracto_es?: string;
  extracto_en?: string;
  slug: string;
  imagen_destacada_url?: string;
  categoria: string;
  etiquetas?: string[];
  autor_id?: string;
  autor_nombre?: string;
  autor_foto_url?: string;
  publicado?: boolean;
  destacado?: boolean;
  fecha_publicacion?: string;
  tiempo_lectura_minutos?: number;
}

// =====================================================
// FAQs
// =====================================================

export type CategoriaFAQ = 'general' | 'empresas' | 'empleados' | 'profesionales';

export interface FAQ {
  id: string;
  created_at: string;
  pregunta_es: string;
  pregunta_en: string;
  respuesta_es: string;
  respuesta_en: string;
  categoria: CategoriaFAQ;
  orden: number;
  activo: boolean;
}

export interface FAQInput {
  pregunta_es: string;
  pregunta_en: string;
  respuesta_es: string;
  respuesta_en: string;
  categoria: CategoriaFAQ;
  orden?: number;
  activo?: boolean;
}

export interface FAQsPorCategoria {
  general?: FAQ[];
  empresas?: FAQ[];
  empleados?: FAQ[];
  profesionales?: FAQ[];
}

// =====================================================
// WEBINARS
// =====================================================

export type TipoWebinar = 'proximo' | 'grabado';

export interface Webinar {
  id: string;
  created_at: string;
  updated_at: string;
  titulo_es: string;
  titulo_en: string;
  descripcion_es: string;
  descripcion_en: string;
  fecha_hora: string | null;
  duracion_minutos: number;
  instructor_nombre: string;
  instructor_foto_url: string | null;
  instructor_bio_es: string | null;
  instructor_bio_en: string | null;
  url_registro: string | null;
  url_grabacion: string | null;
  tipo: TipoWebinar;
  categoria: string | null;
  cupos_disponibles: number | null;
  cupos_totales: number | null;
  activo: boolean;
}

export interface WebinarInput {
  titulo_es: string;
  titulo_en: string;
  descripcion_es: string;
  descripcion_en: string;
  fecha_hora?: string;
  duracion_minutos: number;
  instructor_nombre: string;
  instructor_foto_url?: string;
  instructor_bio_es?: string;
  instructor_bio_en?: string;
  url_registro?: string;
  url_grabacion?: string;
  tipo: TipoWebinar;
  categoria?: string;
  cupos_disponibles?: number;
  cupos_totales?: number;
  activo?: boolean;
}

// =====================================================
// ESTADÍSTICAS PLATAFORMA
// =====================================================

export interface EstadisticasPlataforma {
  id: string;
  fecha: string;
  usuarios_activos: number;
  sesiones_completadas: number;
  empresas_activas: number;
  profesionales_activos: number;
  horas_terapia_totales: number;
  satisfaccion_promedio: number | null;
  created_at: string;
}

export interface EstadisticasPlataformaInput {
  fecha?: string;
  usuarios_activos?: number;
  sesiones_completadas?: number;
  empresas_activas?: number;
  profesionales_activos?: number;
  horas_terapia_totales?: number;
  satisfaccion_promedio?: number | null;
}

// =====================================================
// SOLICITUDES DEMO
// =====================================================

export type TamanoEmpresa = '1-50' | '51-200' | '201-500' | '501-1000' | '1000+';
export type EstadoSolicitudDemo = 'pendiente' | 'contactado' | 'convertido' | 'descartado';

export interface SolicitudDemo {
  id: string;
  created_at: string;
  nombre: string;
  email: string;
  telefono: string | null;
  empresa: string;
  tamano_empresa: TamanoEmpresa | null;
  cargo: string | null;
  mensaje: string | null;
  estado: EstadoSolicitudDemo;
  notas_internas: string | null;
  ip_address: string | null;
  user_agent: string | null;
}

export interface SolicitudDemoInput {
  nombre: string;
  email: string;
  telefono?: string;
  empresa: string;
  tamano_empresa?: TamanoEmpresa;
  cargo?: string;
  mensaje?: string;
}

// =====================================================
// SOLICITUDES CONTACTO
// =====================================================

export type DepartamentoContacto = 'ventas' | 'soporte' | 'prensa' | 'otros';
export type EstadoSolicitudContacto = 'pendiente' | 'respondido' | 'cerrado';

export interface SolicitudContacto {
  id: string;
  created_at: string;
  nombre: string;
  email: string;
  telefono: string | null;
  empresa: string | null;
  departamento: DepartamentoContacto;
  asunto: string;
  mensaje: string;
  estado: EstadoSolicitudContacto;
  respuesta_interna: string | null;
  respondido_por: string | null;
  fecha_respuesta: string | null;
  ip_address: string | null;
  user_agent: string | null;
}

export interface SolicitudContactoInput {
  nombre: string;
  email: string;
  telefono?: string;
  empresa?: string;
  departamento: DepartamentoContacto;
  asunto: string;
  mensaje: string;
}

// =====================================================
// EVALUACIONES GRATUITAS
// =====================================================

export interface RespuestaEvaluacion {
  pregunta_id: number;
  valor: number;
  [key: string]: any;
}

export interface RecomendacionesEvaluacion {
  categoria: string;
  puntuacion: number;
  mensaje_principal: string;
  acciones_recomendadas: string[];
  recursos: Array<{
    tipo: string;
    titulo: string;
    url?: string;
  }>;
}

export interface EvaluacionGratuita {
  id: string;
  created_at: string;
  email: string | null;
  nombre: string | null;
  respuestas_json: RespuestaEvaluacion[];
  puntuacion_total: number;
  categoria_resultado: string;
  recomendaciones_json: RecomendacionesEvaluacion;
  acepta_seguimiento: boolean;
  acepta_newsletter: boolean;
  ip_address: string | null;
  duracion_segundos: number | null;
}

export interface EvaluacionGratuitaInput {
  email?: string;
  nombre?: string;
  respuestas: RespuestaEvaluacion[];
  acepta_seguimiento?: boolean;
  acepta_newsletter?: boolean;
  timestamp_inicio?: number;
}

// =====================================================
// API RESPONSES
// =====================================================

export interface APIResponse<T> {
  data?: T;
  error?: string;
  mensaje?: string;
}

export interface TestimoniosResponse {
  testimonios: Testimonio[];
  total: number;
}

export interface CasosExitoResponse {
  casos_exito: CasoExito[];
  total: number;
}

export interface CasoExitoResponse {
  caso_exito: CasoExito;
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  total: number;
}

export interface BlogPostResponse {
  post: BlogPost;
}

export interface FAQsResponse {
  faqs?: FAQ[];
  faqs_por_categoria?: FAQsPorCategoria;
  total: number;
  categoria?: CategoriaFAQ;
}

export interface WebinarsResponse {
  webinars?: Webinar[];
  proximos?: Webinar[];
  grabados?: Webinar[];
  total: number;
  tipo?: TipoWebinar;
}

export interface EstadisticasResponse {
  estadisticas: {
    usuarios_activos: number;
    sesiones_completadas: number;
    empresas_activas: number;
    profesionales_activos: number;
    horas_terapia_totales: number;
    satisfaccion_promedio: number | null;
    fecha: string;
  };
}

export interface SolicitudDemoResponse {
  mensaje: string;
  solicitud_id: string;
}

export interface SolicitudContactoResponse {
  mensaje: string;
  solicitud_id: string;
}

export interface EvaluacionResponse {
  puntuacion: number;
  categoria: string;
  recomendaciones: RecomendacionesEvaluacion;
  mensaje: string;
  evaluacion_id?: string;
}
