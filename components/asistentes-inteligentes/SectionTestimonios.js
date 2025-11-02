"use client";
import Container from "../container";
import Slider from "react-slick";
import { MessageCircle } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonios = [
  {
    nombre: "Micaela",
    empresa: "Tienda de Cosmética Natural",
    mensaje:
      "Con el asistente de EtherCode aumentamos la cantidad de consultas sin agregar personal. ¡Responde incluso los domingos!",
  },
  {
    nombre: "Javier",
    empresa: "Inmobiliaria Norte",
    mensaje:
      "El bot para nuestra inmobiliaria nos filtra interesados y agenda visitas solo. Es como tener otro vendedor trabajando día y noche.",
  },
  {
    nombre: "Laura",
    empresa: "Estudio Jurídico Andina",
    mensaje:
      "Mi asistente responde dudas legales comunes y coordina entrevistas. Me ahorra horas todos los días.",
  },
  {
    nombre: "Alejandro",
    empresa: "World Club",
    mensaje:
      "Nos ayudaron a automatizar las consultas del gimnasio. Ahora vendemos planes sin atender manualmente.",
  },
  {
    nombre: "Sofía",
    empresa: "Pet Boutique",
    mensaje:
      "El asistente responde consultas sobre productos, stock y entrega. Desde que lo usamos, aumentamos ventas sin contratar más personal.",
  },
];

const settings = {
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  pauseOnHover: true,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024, // tablets
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768, // mobile
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export function SectionTestimonios() {
  return (
    <section className="bg-[#0A0F2C] py-20 px-4 md:px-6">
      <Container>
        <div className="text-center relative overflow-visible">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
            Lo que dicen quienes ya automatizaron su negocio
          </h2>

          <Slider {...settings}>
            {testimonios.map((t, i) => (
              <div key={i} className="px-3">
                <div className="bg-[#121933] border border-[#3F8CFF] rounded-xl p-6 h-full shadow-lg mx-auto max-w-md hover:shadow-blue-500/50 transform transition-transform duration-300 hover:-translate-y-2">
                  <MessageCircle className="h-6 w-6 text-primary mb-4 mx-auto" />
                  <p className="text-gray-300 text-sm italic mb-4">
                    “{t.mensaje}”
                  </p>
                  <p className="text-white font-semibold">{t.nombre}</p>
                  <p className="text-gray-400 text-xs">{t.empresa}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </section>
  );
}
