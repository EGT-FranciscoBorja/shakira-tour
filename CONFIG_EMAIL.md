# Configuración de Emails para Formularios

## 📧 Correo de Destino

Los formularios enviarán los datos al correo configurado en:
- **Archivo**: `app/api/contact/route.ts`
- **Línea 7**: `recipientEmail: 'natalia@egt.ec'`

Para cambiar el correo de destino, edita esta línea.

---

## 📝 Mensajes de Agradecimiento

Los mensajes de agradecimiento están configurados en cada componente:

### 1. Formulario de Contacto (`components/Form.tsx`)
- **Línea 67**: Mensaje de éxito
```typescript
"¡Gracias! Hemos recibido tu consulta. Nos pondremos en contacto contigo pronto."
```

### 2. Formulario de Descarga (`components/DownloadItinerary.tsx`)
- **Línea 70**: Mensaje de éxito
```typescript
"¡Gracias! El itinerario ha sido enviado a tu correo electrónico."
```

---

## 🔧 Integrar Servicio de Email

Actualmente los formularios **solo registran en consola**. Para enviar emails reales, debes:

### Opción 1: Resend (Recomendado - Más fácil)

1. **Regístrate** en [resend.com](https://resend.com)
2. **Instala** el paquete:
   ```bash
   npm install resend
   ```
3. **Crea** archivo `.env.local`:
   ```
   RESEND_API_KEY=re_tu_api_key_aqui
   ```
4. **Descomenta** las líneas 68-73 en `app/api/contact/route.ts`

### Opción 2: SendGrid

1. **Regístrate** en [sendgrid.com](https://sendgrid.com)
2. **Instala** el paquete:
   ```bash
   npm install @sendgrid/mail
   ```
3. **Crea** archivo `.env.local`:
   ```
   SENDGRID_API_KEY=SG.tu_api_key_aqui
   ```
4. **Descomenta** las líneas 75-82 en `app/api/contact/route.ts`

### Opción 3: Nodemailer (SMTP - Gmail, Outlook, etc.)

1. **Instala** el paquete:
   ```bash
   npm install nodemailer
   ```
2. **Crea** archivo `.env.local`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=tu-email@gmail.com
   SMTP_PASSWORD=tu-contraseña-de-aplicacion
   ```
   
   **Nota para Gmail**: Necesitas crear una "Contraseña de aplicación" en tu cuenta de Google:
   - Ve a: https://myaccount.google.com/security
   - Activa la verificación en 2 pasos
   - Genera una contraseña de aplicación

3. **Descomenta** las líneas 84-98 en `app/api/contact/route.ts`

---

## 🧪 Probar en Desarrollo

Para ver los datos que se reciben sin enviar emails reales:

1. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Llena un formulario en el sitio

3. Revisa la **consola del terminal** donde está corriendo Next.js. Verás:
   ```
   === NUEVO FORMULARIO RECIBIDO ===
   Tipo: contact_form
   Asunto: Nuevo contacto de Juan Pérez
   Datos: { name: 'Juan Pérez', email: 'juan@ejemplo.com', ... }
   ================================
   ```

---

## 📄 Adjuntar PDFs al Email

Si quieres que el PDF se envíe automáticamente al usuario (para el formulario de descarga):

### Con Resend:
```typescript
await resend.emails.send({
  from: EMAIL_CONFIG.fromEmail,
  to: email, // Email del usuario
  subject: `Tu Itinerario - ${packageName}`,
  html: emailContent,
  attachments: [{
    filename: `Itinerario_${packageType}.pdf`,
    path: `./public/shakira/Quito_al_Ritmo_de_Shakira_${packageType === '4d3n' ? '4D3N' : '3D2N'}.pdf`
  }]
});
```

---

## 🎨 Personalizar Emails HTML

Para crear emails más bonitos, puedes usar plantillas HTML en el `emailContent`.

Ejemplo:
```typescript
emailContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; }
      .header { background: #FF6B35; color: white; padding: 20px; }
      .content { padding: 20px; }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Quito al Ritmo de Shakira</h1>
    </div>
    <div class="content">
      <p>Hola ${name},</p>
      <p>¡Gracias por tu interés!</p>
      <!-- Más contenido aquí -->
    </div>
  </body>
  </html>
`;
```

---

## ❓ Preguntas Frecuentes

**P: ¿Por qué no recibo emails?**
R: Verifica que hayas configurado correctamente tu servicio de email y las variables de entorno.

**P: ¿Puedo usar mi email de Gmail directamente?**
R: Sí, usando la opción Nodemailer con SMTP. Necesitas una contraseña de aplicación.

**P: ¿Cuál servicio es mejor?**
R: **Resend** es el más fácil de configurar y tiene un plan gratuito generoso (3,000 emails/mes).

**P: ¿Los formularios funcionan sin configurar email?**
R: Sí, pero solo se registran en consola. Para producción necesitas configurar un servicio de email.

