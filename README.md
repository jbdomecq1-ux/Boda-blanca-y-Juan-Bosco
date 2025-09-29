# Web de boda — Juan Bosco & Blanca

Este proyecto es un **sitio estático** listo para abrir con doble clic en `index.html` o para subir a Vercel/Netlify.

## ¿Qué incluye?
- Portada con efecto acuarela (Tailwind CDN)
- Datos, Horario, Ubicación (mapas embebidos), Regalo (IBAN), RSVP (asistencia, acompañante, alergias, autobús), FAQ
- Respuestas **guardadas en localStorage** y **descarga CSV**

## Editar textos rápidos
Abre `app.jsx` y modifica las constantes al principio:
- `FECHA_LARGA`, `CIUDAD`, `LUGAR_CEREMONIA`, `LUGAR_BANQUETE`, `BUS_DETALLES`, `FECHA_LIMITE_RSVP`, `IBAN`.

## Enviar las respuestas a Google Sheets (opcional)
1. Crea una Google Sheet con pestaña `Respuestas` y columnas:
   `timestamp, nombre, email, telefono, asistencia, acompanante, nombreAcompanante, autobus, alergias, notas`.
2. En **Apps Script** pega este código:
```js
function doPost(e) {
  const ss = SpreadsheetApp.openById('PON_AQUI_EL_ID_DE_TU_SHEET');
  const sh = ss.getSheetByName('Respuestas');
  const data = JSON.parse(e.postData.contents);
  sh.appendRow([
    new Date(),
    data.nombre, data.email, data.telefono,
    data.asistencia, data.acompanante, data.nombreAcompanante,
    data.autobus, data.alergias, data.notas
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```
3. Publica como **aplicación web** (cualquiera con el enlace).
4. Copia la URL y en `app.jsx` cambia:
   - `const SEND_MODE = "endpoint"`
   - `const ENDPOINT_URL = "TU_URL_DE_APPS_SCRIPT"`

## Publicar gratis
- **Vercel** o **Netlify** (arrastrar y soltar la carpeta). También vale **GitHub Pages**.

> Nota: La página usa CDNs (Tailwind/React). Para abrir **sin internet** no cargará estilos/JS. Para uso real (compartir por WhatsApp, QR, etc.) el hosting necesita internet de todos modos.

¡Feliz boda! 💍
