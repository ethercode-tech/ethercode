/**
 * GA4 (Google Analytics 4) — helpers centralizados
 * Usa gtag cargado en _app.js (NEXT_PUBLIC_GA_TRACKING_ID).
 * Registrar page views y eventos para máximo contexto.
 */

/**
 * Envía un page_view a GA4 (título y path).
 * @param {string} url - Ruta (path) o URL completa
 * @param {string} [title] - Título de la página
 */
export function trackPageView(url, title) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: url,
    page_title: title || document?.title || "",
  });
}

/**
 * Envía un evento personalizado a GA4.
 * @param {string} name - Nombre del evento (snake_case recomendado)
 * @param {Record<string, string | number | boolean>} [params] - event_category, event_label, value, etc.
 */
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  const gaParams = { ...params };
  // GA4 usa event_category y event_label como convención
  if (params.category && !gaParams.event_category) gaParams.event_category = params.category;
  if (params.label && !gaParams.event_label) gaParams.event_label = params.label;
  window.gtag("event", name, gaParams);
}

// ——— Eventos estándar del sitio (para consistencia) ———

export const GA_EVENTS = {
  // CTAs y engagement
  CTA_CLICK: "cta_click",
  CTA_WHATSAPP_CLICK: "cta_whatsapp_click",
  CTA_WHATSAPP_BUBBLE_TOGGLE: "cta_whatsapp_bubble_toggle",
  CTA_AGENDAR_CLICK: "cta_agendar_click",
  CTA_EMPLEADO_DIGITAL_CLICK: "cta_empleadoDigital_click",
  CTA_KIT_INICIAL_CLICK: "cta_kitInicial_click",
  CLICK_DEMO: "click_demo",

  // Formularios
  FORM_SUBMIT: "form_submit",
  FORM_SUBMIT_SUCCESS: "form_submit_success",
  FORM_SUBMIT_ERROR: "form_submit_error",
  FORM_START: "form_start",
  ENVIAR_CONSULTA: "enviar_consulta",

  // Newsletter
  NEWSLETTER_SUBMIT: "newsletter_submit",
  NEWSLETTER_SUCCESS: "newsletter_success",
  NEWSLETTER_ERROR: "newsletter_error",

  // Navegación y salida
  OUTBOUND_CLICK: "outbound_click",
  SOCIAL_CLICK: "social_click",
  FOOTER_LINK_CLICK: "footer_link_click",
  NAV_LINK_CLICK: "nav_link_click",

  // Páginas clave (eventos de conversión si querés)
  VIEW_GRACIAS: "view_gracias",
  VIEW_CONFIRMAR: "view_confirmar",
};

export default { trackPageView, trackEvent, GA_EVENTS };
