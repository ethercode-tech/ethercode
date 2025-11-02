export function newsletterEmailTemplate() {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Newsletter Semanal de EtherCode</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #4A90E2;
            color: #ffffff;
            text-align: center;
            padding: 20px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 20px;
            line-height: 1.6;
          }
          .content h2 {
            color: #4A90E2;
          }
          .content ul {
            padding: 0;
            list-style-type: none;
          }
          .content ul li {
            margin: 10px 0;
          }
          .content a {
            color: #4A90E2;
            text-decoration: none;
            font-weight: bold;
          }
          .cta {
            text-align: center;
            margin: 20px 0;
          }
          .cta a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4A90E2;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
          }
          .footer {
            background-color: #f4f4f4;
            color: #666;
            text-align: center;
            padding: 10px;
            font-size: 14px;
          }
          .footer a {
            color: #4A90E2;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <h1>🚀 EtherCode</h1>
            <p>Innovación en tus manos</p>
          </div>
  
          <!-- Content -->
          <div class="content">
            <h2>¡Hola innovador!</h2>
            <p>Te traemos lo último en tecnología y desarrollo web. En esta edición:</p>
            <ul>
              <li>🌟 <strong>Nueva herramienta para startups:</strong> <a href="https://ethercode.com/tools">Descubrila aquí</a></li>
              <li>💡 <strong>Caso de éxito:</strong> Cómo ayudamos a una PyME a transformar su negocio. <a href="https://ethercode.com/success">Leer más</a></li>
              <li>📖 <strong>Blog destacado:</strong> <a href="https://ethercode.com/blog">"5 formas de mejorar tu presencia digital"</a></li>
            </ul>
            <div class="cta">
              <a href="https://ethercode.com">Conocé más sobre EtherCode</a>
            </div>
          </div>
  
          <!-- Footer -->
          <div class="footer">
            <p>© 2025 EtherCode. Todos los derechos reservados.</p>
            <p><a href="https://ethercode.com">Visitanos</a> | <a href="mailto:contacto@ethercode.com">Contacto</a></p>
            <p>Si no querés recibir más correos, <a href="https://ethercode.com/unsubscribe">darte de baja</a>.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
  