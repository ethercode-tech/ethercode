'use client'
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { sendContactForm } from "../lib/api";
import { motion, useInView } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { trackEvent, GA_EVENTS } from "../lib/ga";
import "react-toastify/dist/ReactToastify.css";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

// Animaciones
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// Sugerencias rápidas para reducir fricción (se agregan al textarea)
const SUGERENCIAS = [
  "Responder WhatsApp en segundos",
  "Calificar leads automáticamente",
  "Agendar turnos/citas",
  "Seguimiento post-venta",
  "Soporte multicanal (Web/IG/WA)",
];

const MAX_DETALLES = 400;

export default function Contact() {
  const router = useRouter();

  const initState = { nombre: "", phone: "", detalles: "" };

  const [values, setValues] = useState(initState);
  const [sending, setSending] = useState(false);
  const [honey, setHoney] = useState(""); // honeypot anti-spam

  // inView para animaciones al entrar
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, threshold: 0.12 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSugerencia = (txt) => {
    setValues((prev) => {
      const sep = prev.detalles && !prev.detalles.endsWith("\n") ? "\n" : "";
      const nuevo = (prev.detalles + sep + `• ${txt}`).slice(0, MAX_DETALLES);
      return { ...prev, detalles: nuevo };
    });
  };

  const validateForm = () => {
    const { nombre, phone, detalles } = values;
    const phoneDigits = (phone || "").replace(/\D/g, "");
    if (!nombre || nombre.trim().length < 2) {
      toast.error("Decinos tu nombre (mínimo 2 caracteres).");
      return false;
    }
    if (!phoneDigits || phoneDigits.length < 6) {
      toast.error("Ingresá un teléfono válido para contactarte.");
      return false;
    }
    if (!detalles || detalles.trim().length < 20) {
      toast.error("Contanos qué tareas querés delegar (mínimo 20 caracteres).");
      return false;
    }
    if (honey) {
      toast.error("Error al enviar el mensaje.");
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    if (!validateForm() || sending) return;
    setSending(true);
    trackEvent(GA_EVENTS.FORM_SUBMIT, { event_category: "Formulario", event_label: "Contact" });

    try {
      const res = await sendContactForm({ ...values, _gotcha: honey });

      if (res?.ok) {
        trackEvent(GA_EVENTS.FORM_SUBMIT_SUCCESS, { event_category: "Formulario", event_label: "Contact" });
        toast.success("¡Mensaje enviado! Te respondemos a la brevedad.");
        setValues(initState);
        setHoney("");

        // Redirect a Gracias
        router.push("/gracias");
        return;
      }

      let msg = "No pudimos enviar tu mensaje. Probá nuevamente.";
      try {
        const data = await res.json();
        if (data?.errors?.length) msg = data.errors[0].message || msg;
      } catch {}
      throw new Error(msg);
    } catch (error) {
      trackEvent(GA_EVENTS.FORM_SUBMIT_ERROR, { event_category: "Formulario", event_label: "Contact" });
      console.error(error);
      toast.error(error?.message || "No pudimos enviar tu mensaje. Probá nuevamente.");
    } finally {
      setSending(false);
    }
  };

  // feedback suave al escribir detalles (nudges)
  useEffect(() => {
    if (!values.detalles) return;
    if (values.detalles.length > MAX_DETALLES - 20) {
      toast.info("Estás por alcanzar el límite de texto.", { toastId: "limite_detalles" });
    }
  }, [values.detalles]);

  return (
    <>
      <section
        ref={ref}
        className="relative py-24 px-4 sm:px-6 lg:px-8"
        style={{
          ["--sec-mask-strength"]: 0.55,
          ["--sec-alpha"]: 0.06,
        }}
      >
        {/* OVERLAY que equilibra el fondo global */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 30%, rgba(10,17,40, var(--sec-alpha)), rgba(10,17,40, calc(var(--sec-alpha) + 0.02)) 60%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,var(--sec-mask-strength)), transparent)",
            maskImage:
              "radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,var(--sec-mask-strength)), transparent)",
          }}
        />

        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {/* brillo/grilla sutil */}
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--tw-gradient-stops))] from-white via-white to-white [mask-image:radial-gradient(60%_60%_at_50%_40%,_black,_transparent)]" />
          {/* blobs cónicos animados en capas (muy suaves) */}
          <div className="absolute -top-1/3 left-1/2 h-[95vmax] w-[95vmax] -translate-x-1/2 rounded-full blur-3xl opacity-35 bg-[conic-gradient(at_top_right,_theme(colors.cyan.400),_theme(colors.fuchsia.500),_theme(colors.indigo.500),_theme(colors.cyan.400))] animate-[pulse_6s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-25vmax] right-[-10vmax] h-[60vmax] w-[60vmax] rounded-full blur-3xl opacity-30 bg-[radial-gradient(circle_at_30%_30%,_rgba(0,245,212,.25),_rgba(199,125,255,.15),_transparent_60%)]" />
          <div className="absolute top-[-10vmax] left-[-10vmax] h-[40vmax] w-[40vmax] rounded-full blur-3xl opacity-25 bg-[radial-gradient(circle_at_70%_30%,_rgba(99,102,241,.25),_rgba(0,245,212,.15),_transparent_60%)]" />

          {/* overlay de equilibrio para lectura */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 60% at 50% 30%, rgba(10,17,40, var(--sec-alpha)), rgba(10,17,40, calc(var(--sec-alpha) + 0.02)) 60%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,var(--sec-mask-strength)), transparent)",
              maskImage:
                "radial-gradient(60% 60% at 50% 40%, rgba(0,0,0,var(--sec-mask-strength)), transparent)",
            }}
          />
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-8 px-4 md:px-10 max-w-7xl mx-auto items-start">
          {/* Columna izquierda: info + accesos rápidos */}
          <motion.div
            className="bg-[#0e0e0e] rounded-2xl p-8 shadow-lg border border-[#1e1e1e] max-w-md w-full"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div className="mb-8" variants={fadeInUp}>
              <h3 className="text-[#00B4D8] text-2xl font-bold mb-2">ÉtherCode</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Sumá tu <span className="text-white font-semibold">empleado digital</span> y liberá horas operativas.
                Responde en segundos, califica leads y escala con control humano.
                <br />
                <span className="text-[#00B4D8]">Dejanos tu contacto</span> y coordinamos tu demo.
              </p>
            </motion.div>

            <motion.div className="space-y-5" variants={staggerContainer}>
              <motion.a
                href="tel:+543884486112"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl border border-[#2e2e2e] bg-[#1a1a1a] hover:bg-[#1e1e1e] transition"
                variants={staggerItem}
              >
                <span className="text-xl text-[#00B4D8]">📞</span>
                <div>
                  <p className="text-sm text-gray-400 mb-0.5">Teléfono</p>
                  <p className="text-white font-medium transition">+54 388 4486112</p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:hello.ethercode@gmail.com"
                className="flex items-start gap-3 p-3 rounded-xl border border-[#2e2e2e] bg-[#1a1a1a] hover:bg-[#1e1e1e] transition"
                variants={staggerItem}
              >
                <span className="text-xl text-[#00B4D8]">📧</span>
                <div className="min-w-0">
                  <p className="text-sm text-gray-400 mb-0.5">Email</p>
                  <p className="text-white font-medium transition break-all md:break-normal">
                    hello.ethercode@gmail.com
                  </p>
                </div>
              </motion.a>

              <motion.a
                href="https://instagram.com/ethercode_tech"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl border border-[#2e2e2e] bg-[#1a1a1a] hover:bg-[#1e1e1e] transition"
                variants={staggerItem}
              >
                <span className="text-xl text-[#00B4D8]">📷</span>
                <div>
                  <p className="text-sm text-gray-400 mb-0.5">Instagram</p>
                  <p className="text-white font-medium transition">@ethercode_tech</p>
                </div>
              </motion.a>

              {/* Sugerencias rápidas */}
              <motion.div variants={staggerItem}>
                <p className="text-xs text-white/70 mb-2">¿Qué querés automatizar? (tocá para agregar)</p>
                <div className="flex flex-wrap gap-2">
                  {SUGERENCIAS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleAddSugerencia(s)}
                      className="text-xs rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80 hover:bg-white/10"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Señales de confianza */}
              <motion.div className="flex flex-wrap items-center gap-2 text-[11px] text-white/70" variants={staggerItem}>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Onboarding guiado</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Logs y auditoría</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Fallback humano</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Columna derecha: Formulario */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="w-full"
          >
            <motion.h2 className="text-4xl font-bold text-white mb-6" variants={fadeInUp}>
              Sumá tu <span className="text-[#00B4D8]">Empleado Digital</span>
            </motion.h2>

            <motion.div className="space-y-6" variants={staggerContainer}>
              <motion.input
                name="nombre"
                type="text"
                value={values.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                aria-label="Tu nombre"
                className="w-full p-3 rounded-md bg-[#1f1f1f] text-white border border-[#333] placeholder-gray-400 transition-all duration-300 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8] focus:outline-none"
                variants={staggerItem}
              />

              <motion.div variants={staggerItem}>
                <PhoneInput
                  country={'ar'}
                  masks={{ ar: '...........' }}
                  value={values.phone}
                  onChange={(phone) => setValues({ ...values, phone })}
                  inputProps={{ name: 'phone', required: true, 'aria-label': 'Teléfono' }}
                  containerStyle={{ width: '100%' }}
                  inputStyle={{
                    width: '100%', height: '48px', backgroundColor: '#1f1f1f',
                    color: 'white', border: '1px solid #00B4D8', paddingLeft: '50px', fontSize: '16px',
                    outline: 'none', boxShadow: '0 0 0 2px transparent'
                  }}
                  buttonStyle={{ backgroundColor: '#1f1f1f', border: 'none' }}
                  dropdownStyle={{ backgroundColor: '#1f1f1f', color: '#fff' }}
                />
              </motion.div>

              <motion.div variants={staggerItem}>
                <textarea
                  name="detalles"
                  value={values.detalles}
                  onChange={handleChange}
                  placeholder="Contanos qué tareas querés delegar a tu nuevo asistente inteligente"
                  rows={4}
                  aria-label="Detalles de automatización"
                  maxLength={MAX_DETALLES}
                  className="w-full p-3 rounded-md bg-[#1f1f1f] text-white border border-[#333] placeholder-gray-400 transition-all duration-300 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8] focus:outline-none"
                />
                <div className="mt-1 text-[11px] text-white/50">
                  {values.detalles.length}/{MAX_DETALLES} caracteres
                </div>
              </motion.div>

              {/* Honeypot (oculto para usuarios reales) */}
              <div style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }} aria-hidden>
                <label>
                  No completar este campo:
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honey}
                    onChange={(e) => setHoney(e.target.value)}
                  />
                </label>
              </div>

              <motion.button
                type="button"
                onClick={onSubmit}
                disabled={sending}
                initial="rest"
                whileHover={!sending ? "hover" : "rest"}
                animate="rest"
                variants={{
                  rest: { width: "190px" },
                  hover: {
                    width: "190px",
                    background: "linear-gradient(to right,rgb(55, 91, 250),rgb(54, 33, 246))",
                    transition: { duration: 0.6, ease: "easeInOut" },
                  },
                }}
                className={`group h-12 flex items-center justify-start px-3 py-2 rounded-full transition-all duration-300 ${
                  sending ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                <motion.div
                  variants={{
                    rest: { x: 0, background: "linear-gradient(to right,#00B4D8,rgb(33, 132, 246))" },
                    hover: { x: 8, background: "transparent", transition: { duration: 0.25 } },
                  }}
                  className="flex items-center justify-center w-8 h-8 rounded-full text-white"
                  style={{ background: "linear-gradient(to right,rgb(55, 91, 250),rgb(54, 33, 246))" }}
                >
                  {sending ? (
                    <svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"></path>
                    </svg>
                  ) : (
                    <motion.span variants={{ rest: { x: 0 }, hover: { x: 3, transition: { duration: 0.25 } } }} className="text-lg">
                      →
                    </motion.span>
                  )}
                </motion.div>
                <motion.span
                  variants={{
                    rest: { opacity: 0, x: -20 },
                    hover: { opacity: 1, x: 0, transition: { delay: 0.06, duration: 0.35 } },
                  }}
                  className="text-white font-semibold ml-2"
                >
                  {sending ? "Enviando..." : "Enviar"}
                </motion.span>
              </motion.button>

              {/* Fallback WhatsApp, obligatorio */}
              <motion.a
                href="https://wa.me/5493884486112?text=Hola%20EtherCode%2C%20quiero%20una%20demo%20del%20empleado%20digital."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-white/80 underline hover:text-white"
                variants={staggerItem}
              >
                Si preferís, escribinos por WhatsApp
              </motion.a>

              <motion.p className="text-[11px] text-white/50" variants={staggerItem}>
                Usamos tus datos solo para contactarte sobre la demo. Podés pedir el borrado cuando quieras.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
}