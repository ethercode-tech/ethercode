// src/lib/leadDraft.js

const emailRe = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

// Normaliza y valida teléfono (mínimo 10 dígitos)
function digitsPhone(s) {
  const d = (s || "").replace(/\D/g, "");
  return d.length >= 10 ? d : "";
}

// Heurística de nombre de persona (Argentina)
function extractPersonName(text) {
  const t = (text || "").trim();

  // "me llamo Juan", "soy Juan", "mi nombre es Juan"
  const m =
    t.match(/(?:me llamo|mi nombre es|soy)\s+([a-záéíóúñ]+(?:\s+[a-záéíóúñ]+){0,2})/i);

  if (!m) return "";

  let name = (m[1] || "").trim();
  // Evitar falsos positivos tipo "soy de jujuy"
  if (/^(de|del|la|el|una|un)\b/i.test(name)) return "";
  if (name.length < 2) return "";
  if (name.length > 40) name = name.slice(0, 40).trim();
  return name;
}

// Nombre del negocio si lo dicen explícito
function extractBusinessName(text) {
  const t = (text || "").trim();

  // "mi negocio se llama X", "mi empresa se llama X", "la marca X"
  const m =
    t.match(/mi (?:negocio|empresa|local|marca)\s+se llama\s+(.+)/i) ||
    t.match(/(?:negocio|empresa|local|marca)\s*:\s*(.+)/i) ||
    t.match(/(?:se llama|nos llamamos)\s+(.+)/i);

  if (!m) return "";

  let candidate = (m[1] || "").trim();
  candidate = candidate.replace(/[.?!].*$/, "").trim();

  // Si parece descripción genérica, no lo tomes como nombre
  if (/tienda de|local de|emprendimiento de|venta de/i.test(candidate)) return "";
  if (candidate.length < 2) return "";
  if (candidate.length > 60) candidate = candidate.slice(0, 60).trim();

  return candidate;
}

// Rubro/tipo del negocio (si no hay nombre comercial)
function extractBusinessType(text) {
  const t = (text || "").trim();

  // "tengo una tienda de X", "soy una peluquería", "mi rubro es X"
  const m =
    t.match(/tengo\s+(?:una|un)\s+(.+)/i) ||
    t.match(/soy\s+(?:una|un)\s+(.+)/i) ||
    t.match(/mi rubro es\s+(.+)/i) ||
    t.match(/vendo\s+(.+)/i);

  if (!m) return "";

  let candidate = (m[1] || "").trim();
  candidate = candidate.replace(/[.?!].*$/, "").trim();

  // recorte
  if (candidate.length > 50) candidate = candidate.slice(0, 50).trim();
  if (candidate.length < 3) return "";

  return candidate;
}

// Extrae email, phone, nombre, negocio, rubro
export function extractLeadFieldsFromText(text) {
  const t = text || "";

  const email = t.match(emailRe)?.[0] || "";
  const phone = digitsPhone(t);

  const personName = extractPersonName(t);
  const businessName = extractBusinessName(t);
  const businessType = extractBusinessType(t);

  return { email, phone, personName, businessName, businessType };
}

// Merge “first non-empty wins”, para que no cambie en cada mensaje
export function mergeLeadDraft(prev, next) {
  return {
    personName: prev.personName || next.personName || "",
    businessName: prev.businessName || next.businessName || "",
    businessType: prev.businessType || next.businessType || "",
    email: prev.email || next.email || "",
    phone: prev.phone || next.phone || "",
    sent: prev.sent || false,
  };
}

// Condición: negocio (nombre o rubro) + contacto (email o tel)
export function isLeadReady(draft) {
  const hasContact = !!(draft.email || draft.phone);
  const hasBusiness = !!(draft.businessName || draft.businessType);
  return hasContact && hasBusiness;
}