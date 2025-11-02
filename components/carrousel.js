// // Importa los módulos necesarios
// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const ServiceCarousel = () => {
//   const services = [
//     {
//       title: 'Desarrollo de Software a Medida',
//       image: '/devs-teams.jpg',
//       description: [
//         'Creación de aplicaciones personalizadas.',
//         'Desarrollo desde cero o modificación de sistemas existentes.',
//       ],
//     },
//     {
//       title: 'Diseño de Experiencia de Usuario (UX/UI)',
//       image: '/ux-s-user.jpg',
//       description: [
//         'Diseño centrado en el usuario para mejorar la experiencia.',
//         'Creación de interfaces intuitivas y atractivas.',
//       ],
//     },
//     {
//       title: 'Mantenimiento y Soporte de Aplicaciones',
//       image: '/escritorio.jpg',
//       description: [
//         'Servicios continuos de mantenimiento y seguridad.',
//         'Soporte técnico para resolver problemas y realizar actualizaciones.',
//       ],
//     },
//     {
//       title: 'Consultoría Tecnológica',
//       image: '/planing.jpg',
//       description: [
//         'Asesoramiento especializado en tecnologías emergentes.',
//         'Estrategias para la adopción de nuevas tecnologías y optimización de procesos.',
//       ],
//     },
//   ];

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <div className="w-full">
//       <Slider {...settings} className="h-full">
//         {services.map((service, index) => (
//           <div key={index} className="px-4 h-full flex flex-col items-center justify-center">
//             {/* Ajusta los estilos del contenedor de la imagen para crear un marco grueso */}
//             <div className="w-full h-2/3 overflow-hidden rounded-lg border-4 border-blue-500">
//               <img
//                 src={service.image}
//                 alt={service.title}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="mt-4 text-center">
//               <h2 className="text-xl font-bold">{service.title}</h2>
//               <ul className="list-disc list-inside">
//                 {service.description.map((item, i) => (
//                   <li key={i} className="text-gray-600">
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         ))}
//       </Slider>
//       <br/>
//       <br/>
//     </div>
//   );
// };

// export default ServiceCarousel;
