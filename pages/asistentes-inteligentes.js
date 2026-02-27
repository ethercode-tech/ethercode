"use client";

import Head from "next/head";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";

import { sendContactForm } from "../lib/api";
import { trackEvent, GA_EVENTS } from "../lib/ga";

// Import liviano, el footer suele ser chico, lo dejamos normal
import Footer from "../components/footer";

// Cargar Toastify SOLO cuando se necesita (reduce JS inicial)
const ToastContainer = dynamic(
  () => import("react-toastify").then((m) => m.ToastContainer),
  { ssr: false }
);
const toast = async () => {
  const mod = await import("react-toastify");
  return mod.toast;
};

// Cargar secciones pesadas en lazy (debajo del fold)
const SectionComoFunciona = dynamic(
  () =>
    import("../components/asistentes-inteligentes/SectionComoFunciona").then(
      (m) => m.SectionComoFunciona
    ),
  { ssr: true, loading: () => null }
);

const SectionAdaptadoRubro = dynamic(
  () =>
    import("../components/asistentes-inteligentes/SectionAdaptadoRubro").then(
      (m) => m.SectionAdaptadoRubro
    ),
  { ssr: true, loading: () => null }
);

const SectionTestimonios = dynamic(
  () =>
    import("../components/asistentes-inteligentes/SectionTestimonios").then(
      (m) => m.SectionTestimonios
    ),
  { ssr: true, loading: () => null }
);

const SectionFAQ = dynamic(
  () => import("../components/asistentes-inteligentes/SectionFAQ").then((m) => m.SectionFAQ),
  { ssr: true, loading: () => null }
);

const SectionCTAFinal = dynamic(
  () => import("../components/asistentes-inteligentes/SectionCTAFinal"),
  { ssr: true, loading: () => null }
);

const initState = {
  values: { nombre: "", email: "", detalles: "" },
  error: "",
};

const CANONICAL_URL = "https://ethercode.com.ar/asistentes-inteligentes";
const OG_IMAGE_ABS = "https://ethercode.com.ar/img-logo/logonombre.png";

export default function PageAsistentesIA() {
  const [state, setState] = useState(initState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { values } = state;

  const handleChange = useCallback(({ target }) => {
    const { name, value } = target;
    setState((prev) => ({
      ...prev,
      values: { ...prev.values, [name]: value },
    }));
  }, []);

  const validateForm = useCallback(async () => {
    const { nombre, email, detalles } = values;
    if (!nombre || !email || !detalles) {
      (await toast()).error("Todos los campos son obligatorios.");
      return false;
    }
    return true;
  }, [values]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!(await validateForm())) return;

      setIsSubmitting(true);

      trackEvent(GA_EVENTS.ENVIAR_CONSULTA, {
        event_category: "Formulario",
        event_label: "Formulario Contacto IA",
      });

      try {
        await sendContactForm(values);
        (await toast()).success("Mensaje enviado con éxito!");
        setState(initState);
      } catch (error) {
        (await toast()).error("Error al enviar el mensaje. Por favor, intentá nuevamente.");
        setState((prev) => ({ ...prev, error: error?.message ?? "Error" }));
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateForm, values]
  );

  // JSON-LD liviano (no afecta TBT casi nada, pero suma SEO)
  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Asistentes de IA para Empresas",
      provider: {
        "@type": "Organization",
        name: "ÉtherCode",
        url: "https://ethercode.com.ar",
        logo: OG_IMAGE_ABS,
      },
      areaServed: "AR",
      url: CANONICAL_URL,
      description:
        "Asistentes de inteligencia artificial personalizados para automatizar atención y ventas, integrables a WhatsApp, web y herramientas de gestión.",
    }),
    []
  );

  return (
    <>
      <Head>
        <title>Asistentes de IA para Empresas | ÉtherCode</title>
        <meta
          name="description"
          content="Asistentes de inteligencia artificial personalizados para tu empresa. Automatizá atención y procesos, integrá WhatsApp y aumentá ventas con IA."
        />
        <meta name="robots" content="index, follow" />

        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:title" content="Asistentes de IA para Empresas | ÉtherCode" />
        <meta
          property="og:description"
          content="Automatizá tareas repetitivas, mejorá la atención al cliente y potenciá tu productividad con tecnología de vanguardia."
        />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content={OG_IMAGE_ABS} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG_IMAGE_ABS} />

        <link rel="icon" href="/img-logo/ethercode-isotipo-turquoise-hd.ico" />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div
        style={{
          backgroundColor: "#0A0F2C",
          fontFamily: "Poppins, sans-serif",
          color: "#FFFFFF",
        }}
      >
        {/* HERO (sin animaciones infinitas, reduce TBT) */}
        <section
          style={{
            background: "linear-gradient(135deg, #0A0F2C, #3F8CFF)",
            padding: "4rem 1.25rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "3rem", fontWeight: 800, margin: 0 }}>
            Tu negocio no duerme. Tu asistente de IA tampoco.
          </h1>
          <p style={{ fontSize: "1.15rem", marginTop: "1rem", color: "#B0B3C3" }}>
            Automatizá tareas repetitivas y hacé crecer tu empresa sin esfuerzo.
          </p>

          {/* Link rastreable (SEO) */}
          <a
            href="#contacto"
            onClick={() =>
              trackEvent(GA_EVENTS.CLICK_DEMO, {
                event_category: "Botón",
                event_label: "Quiero mi asistente ahora",
              })
            }
            style={{
              marginTop: "2rem",
              display: "inline-block",
              backgroundColor: "#FF5E5E",
              padding: "14px 30px",
              color: "#fff",
              fontSize: "1.05rem",
              fontWeight: 800,
              borderRadius: "10px",
              textDecoration: "none",
            }}
          >
            Quiero mi asistente ahora
          </a>
        </section>

        {/* INFO DE SERVICIO (simple, sin hover transform JS) */}
        <section style={{ padding: "3rem 1.25rem", backgroundColor: "#121933" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.25rem",
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            {[
              { icon: "🧠", title: "Atención día y noche", desc: "Responde sin pausas, incluso mientras dormís." },
              { icon: "🚀", title: "Más ventas", desc: "Respondé antes y convertí más consultas en ventas." },
              { icon: "🔗", title: "Integración total", desc: "WhatsApp, web, CRM y herramientas internas." },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#0A0F2C",
                  padding: "1.25rem",
                  borderRadius: "12px",
                  border: "1px solid #3F8CFF",
                }}
              >
                <div style={{ fontSize: "2rem" }}>{item.icon}</div>
                <h3 style={{ margin: "0.9rem 0 0.4rem", fontWeight: 800 }}>{item.title}</h3>
                <p style={{ color: "#B0B3C3", margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Secciones lazy */}
        <SectionComoFunciona />
        <SectionAdaptadoRubro />

        {/* FORMULARIO */}
        <section
          id="contacto"
          aria-label="Formulario de contacto"
          style={{ padding: "3rem 1.25rem", backgroundColor: "#121938" }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: 800, textAlign: "center", margin: 0 }}>
            Solicitá tu asesoramiento gratuito
          </h2>
          <p
            style={{
              color: "#B0B3C3",
              maxWidth: "700px",
              margin: "1rem auto 2rem",
              textAlign: "center",
            }}
          >
            Estás a un paso de liberar tiempo y escalar tu negocio con inteligencia artificial.
          </p>

          <form onSubmit={onSubmit} style={{ maxWidth: "520px", margin: "0 auto" }}>
            <label htmlFor="nombre">Nombre y apellido</label>
            <input
              id="nombre"
              name="nombre"
              value={values.nombre}
              onChange={handleChange}
              type="text"
              placeholder="Nombre y apellido"
              required
              style={{
                width: "100%",
                background: "#121933",
                color: "#fff",
                padding: "12px",
                marginBottom: "1rem",
                border: "1px solid #3F8CFF",
                borderRadius: "8px",
              }}
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              required
              style={{
                width: "100%",
                background: "#121933",
                color: "#fff",
                padding: "12px",
                marginBottom: "1rem",
                border: "1px solid #3F8CFF",
                borderRadius: "8px",
              }}
            />

            <label htmlFor="detalles">Contanos sobre tu necesidad</label>
            <textarea
              id="detalles"
              name="detalles"
              value={values.detalles}
              onChange={handleChange}
              placeholder="Contanos sobre tu negocio o necesidad..."
              required
              style={{
                width: "100%",
                background: "#121933",
                color: "#fff",
                padding: "12px",
                height: "120px",
                border: "1px solid #3F8CFF",
                borderRadius: "8px",
              }}
            />

            <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: "12px 18px",
                  borderRadius: "10px",
                  fontWeight: 800,
                  border: "none",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  backgroundColor: isSubmitting ? "#7CA9FF" : "#3F8CFF",
                  color: "white",
                  minWidth: "170px",
                }}
              >
                {isSubmitting ? "Enviando..." : "Enviar consulta"}
              </button>

              <a
                href="https://wa.me/5493884486112?text=Hola!%20Quiero%20un%20asistente%20de%20IA%20para%20mi%20negocio"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent(GA_EVENTS.CTA_EMPLEADO_DIGITAL_CLICK ?? "cta_whatsapp_click", {
                    event_category: "CTA",
                    event_label: "WhatsApp - Asistentes IA",
                  })
                }
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 18px",
                  borderRadius: "10px",
                  border: "1px solid #3F8CFF",
                  color: "#00B4D8",
                  textDecoration: "none",
                  minWidth: "170px",
                  justifyContent: "center",
                }}
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </form>
        </section>

        <SectionTestimonios />
        <SectionFAQ />
        <SectionCTAFinal />

        <Footer />
      </div>

      {/* Toast container solo si lo usamos */}
      <ToastContainer
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}