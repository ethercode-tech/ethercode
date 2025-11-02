export const contactEmailTemplate = (data) => {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuevo Contacto - EtherCode</title>
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
          }
          .content h2 {
            color: #333;
            font-size: 20px;
            margin-bottom: 20px;
            text-align: center;
          }
          .details {
            color: #555;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
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
            Nuevo Contacto de EtherCode
          </div>
          <div class="content">
            <h2>Información del Contacto</h2>
            <div class="details">
              <p><strong>Nombre:</strong> ${data.nombre}</p>
              <p><strong>Correo Electrónico:</strong> ${data.email}</p>
              <p><strong>Mensaje:</strong></p>
              <p>${data.mensaje || 'No se especificó un mensaje adicional.'}</p>
            </div>
          </div>
          <div class="footer">
            © 2024 EtherCode | Todos los derechos reservados.
          </div>
        </div>
      </body>
      </html>
    `;
  };
  
  export default contactEmailTemplate;
  