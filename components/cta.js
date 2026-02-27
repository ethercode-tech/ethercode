import Container from "./container";
import { css } from "@emotion/react";
import Link from "next/link";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "400px",
    width: "100%",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const inputStyles = css`
  width: 100%;
  margin-bottom: 15px;
  color: blue;
  padding: 10px;
  border: 10px solid red;
  border-radius: 4px;
  box-sizing: border-box;
`;

const buttonStyles = css`
  background-color: #4caf50;
  color: blue;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Cta = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSendMessage = () => {
    // console.log("Mensaje enviado:", formData);
    handleModalClose();
  };

  return (
    <Container>
      <div className="flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-white bg-[#4888CD] px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-xl">
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-medium lg:text-3xl">
            Descubre las soluciones de <br /> ÉtherCode.
          </h2>
          <br />
          <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
            No te conformes con una landing page generica!
          </p>
        </div>
        <div className="flex-shrink-0 w-full text-center lg:w-auto">
          <Link
            href="/contact"
            className="inline-block py-3 mx-auto text-lg font-medium text-center text-[#4888CD] bg-white rounded-md px-7 lg:px-10 lg:py-5"
          >
            Contáctanos
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Cta;
