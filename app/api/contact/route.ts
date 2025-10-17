import { NextResponse } from 'next/server';

// ============================================
// CONFIGURACIÓN DE EMAIL
// ============================================
const EMAIL_CONFIG = {
  // Correo donde RECIBIRÁS los formularios
  recipientEmail: 'natalia@egt.ec',
  
  // Nombre de tu empresa (aparecerá en los emails)
  companyName: 'Responsible Travel',
  
  // Correo del remitente (debe ser verificado en tu servicio de email)
  fromEmail: 'noreply@egt.ec',
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, packageType, type } = body;

    // Validar campos requeridos
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    // Determinar el tipo de formulario y preparar el contenido del email
    let emailSubject = '';
    let emailContent = '';

    if (type === 'contact_form') {
      // Formulario de contacto general
      emailSubject = `Nuevo contacto de ${name}`;
      emailContent = `
        <h2>Nuevo Mensaje de Contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message || 'No proporcionado'}</p>
      `;
    } else if (type === 'download_itinerary') {
      // Formulario de descarga de itinerario
      const packageName = packageType === '4d3n' ? '4 Días - 3 Noches' : '3 Días - 2 Noches';
      emailSubject = `Solicitud de Itinerario - ${packageName} de ${name}`;
      emailContent = `
        <h2>Solicitud de Descarga de Itinerario</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
        <p><strong>Paquete Solicitado:</strong> ${packageName}</p>
        <hr>
        <p><em>El cliente está interesado en recibir el itinerario completo.</em></p>
      `;
    }

    // ============================================
    // AQUÍ INTEGRAS TU SERVICIO DE EMAIL
    // ============================================
    
    // Opción 1: Usando Resend (Recomendado)
    // Necesitas instalar: npm install resend
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: EMAIL_CONFIG.fromEmail,
    //   to: EMAIL_CONFIG.recipientEmail,
    //   subject: emailSubject,
    //   html: emailContent,
    // });

    // Opción 2: Usando SendGrid
    // Necesitas instalar: npm install @sendgrid/mail
    // import sgMail from '@sendgrid/mail';
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    // await sgMail.send({
    //   to: EMAIL_CONFIG.recipientEmail,
    //   from: EMAIL_CONFIG.fromEmail,
    //   subject: emailSubject,
    //   html: emailContent,
    // });

    // Opción 3: Usando Nodemailer (SMTP)
    // Necesitas instalar: npm install nodemailer
    // import nodemailer from 'nodemailer';
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: parseInt(process.env.SMTP_PORT || '587'),
    //   secure: false,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASSWORD,
    //   },
    // });
    // await transporter.sendMail({
    //   from: EMAIL_CONFIG.fromEmail,
    //   to: EMAIL_CONFIG.recipientEmail,
    //   subject: emailSubject,
    //   html: emailContent,
    // });

    // Por ahora, solo logueamos en consola (para desarrollo)
    console.log('=== NUEVO FORMULARIO RECIBIDO ===');
    console.log('Destinatario:', EMAIL_CONFIG.recipientEmail);
    console.log('Tipo:', type);
    console.log('Asunto:', emailSubject);
    console.log('Contenido:', emailContent);
    console.log('Datos:', { name, email, phone, message, packageType });
    console.log('================================');

    // Respuesta exitosa
    return NextResponse.json({
      success: true,
      message: 'Formulario recibido correctamente',
    });

  } catch (error) {
    console.error('Error procesando formulario:', error);
    return NextResponse.json(
      { error: 'Error al procesar el formulario' },
      { status: 500 }
    );
  }
}

