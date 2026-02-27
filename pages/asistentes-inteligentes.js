"use client";

import Head from "next/head";
import { useState } from "react";
import { sendContactForm } from "../lib/api";
import { trackEvent, GA_EVENTS } from "../lib/ga";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SectionComoFunciona } from "../components/asistentes-inteligentes/SectionComoFunciona";
import { SectionAdaptadoRubro } from "../components/asistentes-inteligentes/SectionAdaptadoRubro";
import { SectionTestimonios } from "../components/asistentes-inteligentes/SectionTestimonios";
import { SectionFAQ } from "../components/asistentes-inteligentes/SectionFAQ";
import SectionCTAFinal from "../components/asistentes-inteligentes/SectionCTAFinal";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Footer from "../components/footer";

const initState = {
  values: {
    nombre: "",
    email: "",
    detalles: "",
  },
  error: "",
};

const PageAsistentesIA = () => {
  const [state, setState] = useState(initState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { values } = state;

  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const validateForm = () => {
    const { nombre, email, detalles } = values;
    if (!nombre || !email || !detalles) {
      toast.error("Todos los campos son obligatorios.");
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    trackEvent(GA_EVENTS.ENVIAR_CONSULTA, {
      event_category: "Formulario",
      event_label: "Formulario Contacto IA",
    });
    try {
      await sendContactForm(values);
      toast.success("Mensaje enviado con éxito!");
      setState(initState);
    } catch (error) {
      toast.error(
        "Error al enviar el mensaje. Por favor, inténtalo nuevamente."
      );
      setState((prev) => ({
        ...prev,
        error: error.message,
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Asistentes de IA para Empresas | ÉtherCode</title>
        <meta
          name="description"
          content="Asistentes de inteligencia artificial personalizados para tu empresa. ÉtherCode te ayuda a automatizar procesos, mejorar atención al cliente y aumentar tus ventas con IA."
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Asistentes de IA para Empresas | ÉtherCode"
        />
        <meta
          property="og:description"
          content="Automatizá tareas repetitivas, mejorá la atención al cliente y potenciá tu productividad con tecnología de vanguardia."
        />
        <meta property="og:image" content="/img-logo/logonombre.png" />
        <meta
          property="og:url"
          content="https://www.ethercode.com.ar/asistentes-inteligentes"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/img-logo/logonombre.png" />
        <link rel="icon" href="/img-logo/ethercode-isotipo-turquoise-hd.ico" />
        <link
          rel="canonical"
          href="https://www.ethercode.com.ar/asistentes-inteligentes"
        />
      </Head>
      <div
        style={{
          backgroundColor: "#0A0F2C",
          fontFamily: "Poppins, sans-serif",
          color: "#FFFFFF",
        }}
      >
        {/* HERO  */}
        <section
          style={{
            background: "linear-gradient(135deg, #0A0F2C, #3F8CFF)",
            padding: "4rem 2rem",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
            Tu negocio no duerme. Tu asistente de IA tampoco.
          </h1>
          <p
            style={{ fontSize: "1.25rem", marginTop: "1rem", color: "#B0B3C3" }}
          >
            Automatizá tareas repetitivas y hacé crecer tu empresa sin esfuerzo.
          </p>
          <a
            href="#contacto"
            onClick={() =>
              trackEvent(GA_EVENTS.CLICK_DEMO, {
                event_category: "Botón",
                event_label: "Solicitá tu Demo",
              })
            }
            style={{
              marginTop: "2rem",
              display: "inline-block",
              backgroundColor: "#FF5E5E",
              padding: "14px 30px",
              color: "#fff",
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: "10px",
              textDecoration: "none",
              transition: "background 0.3s ease",
            }}
          >
            Quiero mi asistente ahora
          </a>
        </section>
        {/* INFO DE SERVICIO  */}
        <section style={{ padding: "3rem 2rem", backgroundColor: "#121933" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
              maxWidth: "1200px",
              margin: "auto",
            }}
          >
            {[
              {
                icon: "🧠",
                title: "Atención día y noche",
                desc: "Tu IA responde sin pausas, incluso mientras dormís.",
              },
              {
                icon: "🚀",
                title: "Más ventas",
                desc: "Respondé antes que tu competencia y convertí más.",
              },
              {
                icon: "🔗",
                title: "Integración total",
                desc: "Conectado con WhatsApp, Web, CRM y más.",
              },
            ].map((item, i) => (
              <div
                className=" hover:shadow-blue-500/50 transform transition-transform duration-300 hover:-translate-y-2"
                key={i}
                style={{
                  backgroundColor: "#0A0F2C",
                  padding: "1.5rem",
                  borderRadius: "10px",
                  border: "1px solid #3F8CFF",
                }}
              >
                <div style={{ fontSize: "2rem" }}>{item.icon}</div>
                <h3
                  style={{
                    color: "#fff",
                    margin: "1rem 0 0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: "#B0B3C3" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
        {/* COMO FUNCIONA  */}
        <SectionComoFunciona />
        {/* SEGUN TU RUBRO  */}
        <SectionAdaptadoRubro />
        {/* FORMULARIO  */}
        <section
          style={{ padding: "3rem 1rem", backgroundColor: "#121938" }}
          id="contacto"
          aria-label="Formulario de contacto"
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
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
            Estás a un paso de liberar tiempo y escalar tu negocio con
            inteligencia artificial.
          </p>
          <form
            onSubmit={onSubmit}
            style={{ maxWidth: "500px", margin: "0 auto" }}
          >
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
                borderRadius: "6px",
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
                borderRadius: "6px",
              }}
            />

            <label htmlFor="detalles">Contanos sobre tu necesidad</label>
            <textarea
              id="detalles"
              name="detalles"
              value={values.detalles}
              onChange={handleChange}
              placeholder="Contanos sobre tu negocio o necesidad..."
              style={{
                width: "100%",
                background: "#121933",
                color: "#fff",
                padding: "12px",
                height: "120px",
                border: "1px solid #3F8CFF",
                borderRadius: "6px",
              }}
            />

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Botón principal sutil con animación */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 16px #3F8CFF40",
                }}
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  isSubmitting
                    ? "bg-[#7CA9FF] text-white cursor-not-allowed"
                    : "bg-[#3F8CFF] text-white hover:bg-[#579EFF]"
                }`}
              >
                {isSubmitting ? "Enviando..." : "Enviar consulta"}
              </motion.button>

              {/* Botón de WhatsApp */}
              <a
                href="https://wa.me/5493884486112?text=Hola!%20Quiero%20un%20asistente%20de%20IA%20para%20mi%20negocio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-[#3F8CFF] text-[#00B4D8] hover:bg-[#3F8CFF] hover:text-white transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar por WhatsApp
              </a>
            </div>
          </form>
        </section>
        {/* TESTIMONIOS  */}
        <SectionTestimonios />
        {/* PREGUNTAS FRECUENTES  */}
        <SectionFAQ />
        {/* CTA  */}
        <SectionCTAFinal />
        {/* FOOTER  */}

        <Footer />
      </div>
      <ToastContainer
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default PageAsistentesIA;
