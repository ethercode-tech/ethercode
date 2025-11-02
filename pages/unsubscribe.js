import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Unsubscribe = () => {
  const router = useRouter();
  const { email } = router.query;
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (email) {
      fetch(`/api/unsubscribe?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setStatus("success");
          } else {
            setStatus("notFound");
          }
        })
        .catch((error) => {
          setStatus("error");
        });
    }
  }, [email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        {status === "loading" && <p>Procesando tu solicitud...</p>}
        {status === "success" && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-red-600">¡Lo sentimos mucho!</h1>
            <p className="text-gray-700 mb-6">
              Has sido eliminado de nuestra lista de suscriptores. Lamentamos verte ir, pero respetamos tu decisión.
            </p>
            <p className="text-gray-700">
              Si alguna vez cambias de opinión, siempre serás bienvenido/a de nuevo. 
              ¡No dudes en suscribirte otra vez para recibir nuestras últimas novedades!
            </p>
            <a href="/" className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg">Volver a la página principal</a>
          </>
        )}
        {status === "notFound" && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-[#00B4D8]">No pudimos completar tu solicitud</h1>
            <p className="text-gray-700 mb-6">
              Parece que tu correo ya no está registrado en nuestra base de datos.
            </p>
            <p className="text-gray-700">
              Si esto es un error o si deseas suscribirte nuevamente, puedes hacerlo en cualquier momento.
            </p>
            <a href="/" className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg">Volver a suscribirme</a>
          </>
        )}
        {status === "error" && (
          <p className="text-red-600">Ocurrió un error al procesar tu solicitud. Por favor, inténtalo nuevamente más tarde.</p>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe;
