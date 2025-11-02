import React from "react";
import Container from "./container";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
}

const faqdata = [
  {
    question: "¿Cuál es el costo de nuestros servicios?",
    answer: "Nuestros servicios no tienen un costo directo para ti. En lugar de eso, consideramos los beneficios económicos que traerán a tu proyecto. Creemos en generar valor primero y compartir el éxito contigo."    
  },
  {
    question: "¿Puedo utilizarlos en proyectos comerciales?",
    answer: "¡Absolutamente! Nuestros servicios permiten un flujo de información completo: desde lo que entra hasta lo que sale. Imagina la belleza de tener una plataforma digital que lleva tu negocio a todos lados con un solo clic. Con nosotros, tu emprendimiento alcanza nuevas alturas de eficiencia y alcance."
  },
  {
    question: "¿Cuál es nuestra política de reembolso?",
    answer:
      "Si no quedas satisfecho con nuestros servicios por cualquier motivo, contáctanos en los primeros 90 días y te reembolsaremos el monto completo, sin hacer preguntas.",
  },
  {
    question: "¿Ofrecemos soporte técnico?",
    answer:
      "Sí, ofrecemos soporte técnico. Adquiere un plan de soporte para obtener asistencia durante 6 meses.",
  },
];


export default Faq;