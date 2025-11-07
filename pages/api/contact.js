import { transporter } from "../../config/nodemailer";
import generateEmailTemplate from "../../templates/contactEmailTemplate";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { nombre, phone, detalles } = req.body;

  if (!nombre || !phone || !detalles) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  const mailOptions = {
    from: `"Formulario Web" <noreply@ethercode.com>`,
    to: "hello.ethercode@gmail.com",
    subject: `Nuevo mensaje de ${nombre}`,
    ...generateEmailTemplate({ nombre, phone, detalles })
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return res.status(500).json({ message: "Error al enviar el correo" });
  }
};

export default handler;
