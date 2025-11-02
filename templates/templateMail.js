export const confirmationEmailTemplate = (email) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmar Suscripción - EtherCode</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          overflow: hidden;
        }
        .header {
          background-color: #222533;
          color: white;
          padding: 20px;
          text-align: center;
          font-size: 24px;
        }
        .content {
          padding: 20px;
          text-align: center;
        }
        .content h2 {
          color: #333;
          font-size: 20px;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          padding: 15px 30px;
          font-size: 18px;
          color: white;
          background-color: #007BFF;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
        }
        .unsubscribe {
          color: #555;
          font-size: 12px;
          text-decoration: none;
          margin-top: 20px;
          display: block;
        }
        .footer {
          background-color: #f4f4f4;
          padding: 10px;
          text-align: center;
          font-size: 12px;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          ¡Bienvenido a EtherCode!
        </div>
        <div class="content">
          <h2>Confirma tu suscripción</h2>
          <p>Gracias por suscribirte a nuestro newsletter. Haz clic en el botón de abajo para confirmar tu correo y recibir todas nuestras novedades.</p>
          <a href="https://ethercode.com.ar/confirmar?email=${email}" class="button">Confirmar correo</a>
          <p>Si cambiaste de opinión y no deseas recibir más información, puedes <a href="https://ethercode.com.ar/unsubscribe?email=${email}" class="unsubscribe">anular tu suscripción</a>.</p>
        </div>
        <div class="footer">
          © 2024 EtherCode | Todos los derechos reservados.
        </div>
      </div>
    </body>
    </html>
  `;
};

export default confirmationEmailTemplate;