/**
 * GA4 (Google Analytics 4) — helpers centralizados
 * Usa gtag cargado en _app.js (NEXT_PUBLIC_GA_TRACKING_ID).
 * Garantiza pageviews/UTMs en SPA y evita perder eventos tempranos.
 */

const CAMPAIGN_STORAGE_KEY = "ethercode_ga_campaign_ctx_v1";
const GA_READY_FLUSH_WINDOW_MS = 15000;
const pendingHits = [];
let flushLoopStarted = false;

function isBrowser() {
  return typeof window !== "undefined";
}

function isGtagReady() {
  return isBrowser() && typeof window.gtag === "function";
}

function normalizeLocation(urlLike) {
  if (!isBrowser()) {
    return { page_path: "", page_location: "", page_referrer: "" };
  }

  const fallback = window.location.href;
  const url = new URL(urlLike || fallback, window.location.origin);
  return {
    page_path: `${url.pathname}${url.search}${url.hash}`,
    page_location: url.href,
    page_referrer: document.referrer || "",
  };
}

function extractCampaignFromCurrentUrl() {
  if (!isBrowser()) return {};

  const params = new URLSearchParams(window.location.search);
  const campaign = {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
    gclid: params.get("gclid") || "",
    wbraid: params.get("wbraid") || "",
    gbraid: params.get("gbraid") || "",
  };

  return Object.fromEntries(Object.entries(campaign).filter(([, value]) => Boolean(value)));
}

function readStoredCampaign() {
  if (!isBrowser()) return {};

  try {
    const raw = window.sessionStorage.getItem(CAMPAIGN_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch {
    return {};
  }
}

function writeStoredCampaign(campaign) {
  if (!isBrowser()) return;

  try {
    window.sessionStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(campaign));
  } catch {
    // noop: si storage no está disponible, seguimos sin persistencia
  }
}

function getCampaignContext() {
  const current = extractCampaignFromCurrentUrl();
  if (Object.keys(current).length > 0) {
    const merged = { ...readStoredCampaign(), ...current };
    writeStoredCampaign(merged);
    return merged;
  }

  return readStoredCampaign();
}

function flushPendingHits() {
  if (!isGtagReady() || pendingHits.length === 0) return;

  while (pendingHits.length > 0) {
    const [cmd, eventName, params] = pendingHits.shift();
    window.gtag(cmd, eventName, params);
  }
}

function ensureFlushLoop() {
  if (!isBrowser() || flushLoopStarted) return;

  flushLoopStarted = true;
  const startedAt = Date.now();
  const timer = window.setInterval(() => {
    if (isGtagReady()) {
      flushPendingHits();
      window.clearInterval(timer);
      flushLoopStarted = false;
      return;
    }

    if (Date.now() - startedAt > GA_READY_FLUSH_WINDOW_MS) {
      window.clearInterval(timer);
      flushLoopStarted = false;
    }
  }, 250);
}

function sendGtag(cmd, eventName, params) {
  if (isGtagReady()) {
    flushPendingHits();
    window.gtag(cmd, eventName, params);
    return;
  }

  pendingHits.push([cmd, eventName, params]);
  ensureFlushLoop();
}

export function initAnalyticsSession() {
  if (!isBrowser()) return;
  getCampaignContext();
  ensureFlushLoop();
}

/**
 * Envía un page_view a GA4 (título + ruta + URL completa + referrer + campaña).
 * @param {string} [url] - Ruta o URL completa (si no se pasa, usa window.location.href)
 * @param {string} [title] - Título de la página
 * @param {Record<string, string | number | boolean>} [extra] - parámetros extra opcionales
 */
export function trackPageView(url, title, extra = {}) {
  if (!isBrowser()) return;

  const location = normalizeLocation(url);
  const campaign = getCampaignContext();

  sendGtag("event", "page_view", {
    ...location,
    ...campaign,
    page_title: title || document?.title || "",
    ...extra,
  });
}

/**
 * Envía un evento personalizado a GA4 con contexto de página/campaña.
 * @param {string} name - Nombre del evento (snake_case recomendado)
 * @param {Record<string, string | number | boolean>} [params] - event params
 */
export function trackEvent(name, params = {}) {
  if (!isBrowser()) return;

  const location = normalizeLocation(window.location.href);
  const campaign = getCampaignContext();
  const gaParams = { ...params };

  // GA4 usa event_category y event_label como convención extendida
  if (params.category && !gaParams.event_category) gaParams.event_category = params.category;
  if (params.label && !gaParams.event_label) gaParams.event_label = params.label;

  sendGtag("event", name, {
    ...location,
    ...campaign,
    page_title: document?.title || "",
    ...gaParams,
  });
}

/**
 * Trackea automáticamente clicks outbound (links externos).
 */
export function bindAutoOutboundTracking() {
  if (!isBrowser()) return () => {};

  const onClick = (event) => {
    const anchor = event.target?.closest?.("a[href]");
    if (!anchor) return;

    const rawHref = anchor.getAttribute("href") || "";
    if (!rawHref || rawHref.startsWith("#")) return;

    let targetUrl;
    try {
      targetUrl = new URL(rawHref, window.location.origin);
    } catch {
      return;
    }

    const isHttp = targetUrl.protocol === "http:" || targetUrl.protocol === "https:";
    const isSameOrigin = targetUrl.origin === window.location.origin;
    if (!isHttp || isSameOrigin) return;

    trackEvent(GA_EVENTS.OUTBOUND_CLICK, {
      event_category: "Navigation",
      event_label: targetUrl.href,
      outbound_url: targetUrl.href,
      link_text: (anchor.textContent || "").trim().slice(0, 120),
      link_target: anchor.getAttribute("target") || "",
    });
  };

  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
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
