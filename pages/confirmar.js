import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { trackEvent, GA_EVENTS } from "../lib/ga";

const Confirmar = () => {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();
  const { email } = router.query;

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Evento de conversion: una sola vez por carga
    trackEvent(GA_EVENTS.VIEW_CONFIRMAR, {
      event_category: "Conversion",
      event_label: "Newsletter confirmado",
    });
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      router.push("https://ethercode.com.ar");
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown, router]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col justify-center items-center">
        <CheckCircleIcon className="w-24 h-24 text-green-500 mb-6" />
        <h1 className="text-3xl font-bold mb-2">¡Gracias por confirmar tu suscripción!</h1>
        {email && <p className="text-lg mb-2">Correo confirmado: {email}</p>}
        <p className="text-lg mt-2">Serás redirigido a la página principal en {countdown} segundos...</p>
      </div>
    </div>
  );
};

export default Confirmar;
