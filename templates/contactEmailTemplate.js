const contactEmailTemplate = ({ nombre, phone, detalles }) => {
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Nuevo mensaje de contacto - EtherCode</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f2f2f2;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          overflow: hidden;
          border: 1px solid #e0e0e0;
        }
        .header {
          background-color: #222533;
          color: white;
          padding: 24px;
          text-align: center;
          font-size: 24px;
          letter-spacing: 1px;
        }
        .content {
          padding: 24px;
        }
        .content h2 {
          color: #6a5af9;
          font-size: 20px;
          margin-bottom: 12px;
        }
        .content p {
          font-size: 16px;
          color: #444;
          line-height: 1.6;
          margin: 8px 0;
        }
        .label {
          font-weight: bold;
          color: #333;
        }
        .message-box {
          background-color: #f7f7f7;
          border-left: 4px solid #6a5af9;
          padding: 16px;
          margin-top: 16px;
          border-radius: 6px;
          white-space: pre-wrap;
        }
        .footer {
          background-color: #fafafa;
          text-align: center;
          padding: 20px;
          font-size: 13px;
          color: #999;
        }
        .footer strong {
          color: #6a5af9;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          🚀 Nuevo mensaje desde el formulario web
        </div>
        <div class="content">
          <h2>📩 Detalles del contacto</h2>
          <p><span class="label">Nombre:</span> ${nombre}</p>
          <p><span class="label">Teléfono:</span> ${phone}</p>
          <p><span class="label">Mensaje:</span></p>
          <div class="message-box">${detalles}</div>
        </div>
        <div class="footer">
          © 2025 <strong>EtherCode</strong> · Automatización & IA para empresas visionarias
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Nuevo mensaje desde el formulario web

📩 Detalles del contacto:
- Nombre: ${nombre}
- Teléfono: ${phone}
- Mensaje:
${detalles}

© 2025 EtherCode · Automatización & IA para empresas visionarias
  `;

  return { html, text };
};

export default contactEmailTemplate;
