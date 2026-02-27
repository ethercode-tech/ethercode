import React, { useState } from 'react';
import { SparklesIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { trackEvent, GA_EVENTS } from '../lib/ga';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    trackEvent(GA_EVENTS.NEWSLETTER_SUBMIT, { event_category: "Newsletter", event_label: "Home" });
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        trackEvent(GA_EVENTS.NEWSLETTER_SUCCESS, { event_category: "Newsletter", event_label: "Home" });
        setSubmitted(true);
        setEmail('');
        setError('');
      } else {
        const data = await response.json();
        trackEvent(GA_EVENTS.NEWSLETTER_ERROR, { event_category: "Newsletter", event_label: data?.error || "Error" });
        setError(data.error || 'Error al suscribirse.');
      }
    } catch (err) {
      trackEvent(GA_EVENTS.NEWSLETTER_ERROR, { event_category: "Newsletter", event_label: "Network error" });
      setError('Error al enviar la solicitud. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="px-6 py-16 text-white">
      <div className="max-w-4xl mx-auto text-center bg-[rgba(10,15,44,0.6)] backdrop-blur-md rounded-3xl px-6 py-12 shadow-lg">
        <div className="flex justify-center mb-4 animate-pulse">
          <SparklesIcon className="h-8 w-8 text-[#48E0B8]" />
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          ¿Querés estar un paso adelante con IA?
        </h2>

        <p className="text-lg text-[#B0B3C3] mb-8 max-w-xl mx-auto">
          Suscribite y recibí <span className="text-[#00B4D8] font-semibold">tips exclusivos</span>,{" "}
          <span className="text-[#48E0B8] font-semibold">novedades de tecnología</span> y{" "}
          <span className="text-[#FF5E5E] font-semibold">casos de éxito automatizados</span> directo a tu correo.
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row justify-center items-center gap-4"
          >
            <div className="relative w-full md:w-2/3">
              <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00B4D8] w-6 h-6" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico profesional"
                className="w-full pl-12 pr-4 py-3 rounded-lg text-[#0A0F2C] bg-white focus:outline-none focus:ring-2 focus:ring-[#3F8CFF]"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#00B4D8] to-[#00B4E7] hover:from-blue-500 hover:to-blue-700 text-black font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Quiero recibir ideas 🔥
            </button>
          </form>
        ) : (
          <p className="text-[#48E0B8] text-lg mt-6">
            ¡Gracias por suscribirte! 🎉 Pronto recibirás nuestras novedades.
          </p>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Newsletter;
