'use client'
import React, { useState, useRef } from "react";
import { sendContactForm } from "../lib/api";
import { motion, useInView } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Contact = () => {
  const initState = {
    nombre: '',
    phone: '',
    detalles: ''
  };

  const [values, setValues] = useState(initState);
  const [sending, setSending] = useState(false);


  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const { nombre, phone, detalles } = values;
    if (!nombre || !phone || !detalles) {
      toast.error("Todos los campos son obligatorios.");
      return false;
    }
    return true;
  };

const onSubmit = async () => {
  if (!validateForm() || sending) return;
  setSending(true);
  try {
    const res = await sendContactForm(values);
    if (res?.ok || res?.status === 200) {
      toast.success("Mensaje enviado con éxito!");
      setValues(initState);
    } else {
      throw new Error("No se pudo enviar el mensaje.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error al enviar el mensaje. Por favor, inténtalo nuevamente.");
  } finally {
    setSending(false);
  }
};


  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <div
        className="py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col-reverse md:flex-row gap-8 px-4 md:px-10 max-w-7xl mx-auto items-start">
          <motion.div
            className="bg-[#0e0e0e] rounded-2xl p-8 shadow-lg border border-[#1e1e1e] max-w-md w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="mb-8" variants={fadeInUp}>
              <h3 className="text-[#00B4D8] text-2xl font-bold mb-2">EtherCode</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Estamos revolucionando la forma en que las empresas operan con empleados digitales impulsados por inteligencia artificial que trabajan día y noche.<br />
                <span className="text-[#00B4D8] cursor-pointer">Contactanos</span> y sumá tu primer empleado digital.
              </p>
            </motion.div>
            <motion.div className="space-y-5" variants={staggerContainer}>
              <motion.a href="tel:+543884136752" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl border border-[#2e2e2e] bg-[#1a1a1a] hover:bg-[#1e1e1e] transition" variants={staggerItem}>
                <span className="text-xl text-[#00B4D8]">📞</span>
                <div>
                  <p className="text-sm text-gray-400 mb-0.5">Teléfono</p>
                  <p className="text-white font-medium transition">+54 388 4486112</p>
                </div>
              </motion.a>
              <motion.a
                href="mailto:ethercode@gmail.com"
                className="flex items-start gap-3 p-3 rounded-xl border border-[#2e2e2e] bg-[#1a1a1a] hover:bg-[#1e1e1e] transition"
                variants={staggerItem}
              >
                <span className="text-xl text-[#00B4D8]">📧</span>
                <div className="min-w-0">
                  <p className="text-sm text-gray-400 mb-0.5">Email</p>
                  <p className="text-white font-medium transition break-all md:break-normal">
                    ethercode@gmail.com
                  </p>
                </div>
              </motion.a>
              <motion.a href="https://instagram.com/ethercode_software" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-3 rounded-xl border border-[#2e2e2e] bg-[#1a1a1a] hover:bg-[#1e1e1e] transition" variants={staggerItem}>
                <span className="text-xl text-[#00B4D8]">📷</span>
                <div>
                  <p className="text-sm text-gray-400 mb-0.5">Instagram</p>
                  <p className="text-white font-medium transition">@ethercode_software</p>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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
                className="w-full p-3 rounded-md bg-[#1f1f1f] text-white border border-[#333] placeholder-gray-400 transition-all duration-300 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8] focus:outline-none"
                variants={staggerItem}
              />
              <motion.div variants={staggerItem}>
                <PhoneInput
                  country={'ar'}
                  masks={{ ar: '...........' }}
                  value={values.phone}
                  onChange={(phone) => setValues({ ...values, phone })}
                  inputProps={{ name: 'phone', required: true }}
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
              <motion.textarea
                name="detalles"
                value={values.detalles}
                onChange={handleChange}
                placeholder="Contanos qué tareas querés delegar a tu nuevo asistente inteligente"
                rows={4}
                className="w-full p-3 rounded-md bg-[#1f1f1f] text-white border border-[#333] placeholder-gray-400 transition-all duration-300 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8] focus:outline-none"
                variants={staggerItem}
              />
              <motion.button
                type="button"
                onClick={onSubmit}
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={{
                  rest: { width: "160px" },
                  hover: {
                    width: "160px",
                    background: "linear-gradient(to right,rgb(250, 247, 55),rgb(246, 210, 33))",
                    transition: { duration: 0.8, ease: "easeInOut" },
                  },
                }}
                className="group h-12 flex items-center justify-start px-3 py-2 rounded-full transition-all duration-300"
              >
                <motion.div
                  variants={{
                    rest: { x: 0, background: "linear-gradient(to right,rgb(250, 247, 55),rgb(246, 210, 33))" },
                    hover: { x: 8, background: "transparent", transition: { duration: 0.3 } },
                  }}
                  className="flex items-center justify-center w-8 h-8 rounded-full text-white"
                  style={{ background: "linear-gradient(to right,rgb(250, 247, 55),rgb(246, 210, 33))" }}
                >
                  <motion.span variants={{ rest: { x: 0 }, hover: { x: 3, transition: { duration: 0.3 } } }} className="text-lg">
                    →
                  </motion.span>
                </motion.div>
                <motion.span
                  variants={{
                    rest: { opacity: 0, x: -20 },
                    hover: { opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.4 } },
                  }}
                  className="text-white font-semibold ml-2"
                >
                  Enviar
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
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

export default Contact;