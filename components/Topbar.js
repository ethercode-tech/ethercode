// components/Topbar.js
const Topbar = () => {
  return (
    <div className="bg-blue-600 text-white py-1 top-0 w-full overflow-hidden  z-20">
      <div className="marquee whitespace-nowrap">
        <span className="mx-4">
          ¡30% de descuento en todos nuestros planes este mes!
        </span>
        <span className="mx-4">
          ¡Contrata hoy y obtén 3 meses gratis de mantenimiento!
        </span>
        <span className="mx-4">¡Descuento especial para nuevos clientes!</span>
      </div>
    </div>
  );
};

export default Topbar;
