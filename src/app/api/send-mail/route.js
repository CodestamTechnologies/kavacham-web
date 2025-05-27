// app/api/contact/route.js
import nodemailer from 'nodemailer';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req) {
  const { to, customerName, message, email, phone } = await req.json();

  // Validate required fields
  if (!to || !customerName || !message || !email) {
    return new Response(
      JSON.stringify({ success: false, error: 'Missing required fields' }),
      { status: 400 }
    );
  }

  try {
    // Save to Firebase
    const docRef = await addDoc(collection(db, 'contacts'), {
      to,
      customerName,
      message,
      email,
      phone: phone || null,
      createdAt: serverTimestamp(),
      status: 'unread'
    });

    console.log('✅ Contact saved to Firebase with ID:', docRef.id);

    // FIXED: createTransport instead of createTransporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === 'true' || false,
      auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

    const userMailOptions = {
      from: `Kavacham Support <${process.env.EMAIL_USER}>`,
      to: to,
      subject: '🙏 Thank You for Contacting Kavacham',
      html: `
        <html>
          <head>
            <style>
              body { font-family: 'Poppins', Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333; }
              .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .header { color: #6d28d9; text-align: center; margin-bottom: 20px; }
              .footer { margin-top: 30px; font-size: 0.8em; color: #666; text-align: center; }
              .gradient-text { background: linear-gradient(45deg, #B38CF9, #F49AC2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1 class="header gradient-text">Kavacham Cosmic Guidance</h1>
              
              <h2>Dear ${customerName},</h2>
              
              <p>Thank you for reaching out to us! We've received your message and our team will get back to you within 24-48 hours.</p>
              
              <p>Here's a summary of your inquiry:</p>
              
              <div style="background: #f5f3ff; padding: 15px; border-radius: 6px; margin: 15px 0;">
                <p><strong>Name:</strong> ${customerName}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                <p><strong>Message:</strong> ${message}</p>
              </div>
              
              <p>In the meantime, you might find answers to common questions in our <a href="https://kavacham.in/faq" style="color: #6d28d9;">FAQ section</a>.</p>
              
              <p>With cosmic regards,</p>
              <p><strong>The Kavacham Team</strong></p>
              
              <div class="footer">
                <p>Kavacham Technologies • New Delhi, India</p>
                <p>© ${new Date().getFullYear()} Kavacham. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
        KAVACHAM COSMIC GUIDANCE

        Dear ${customerName},

        Thank you for reaching out to us! We've received your message and our team will get back to you within 24-48 hours.

        Here's a summary of your inquiry:

        Name: ${customerName}
        Email: ${email}
        ${phone ? `Phone: ${phone}` : ''}
        Message: ${message}

        In the meantime, you might find answers to common questions in our FAQ section: https://kavacham.in/faq

        With cosmic regards,
        The Kavacham Team

        Kavacham 
        © ${new Date().getFullYear()} Kavacham. All rights reserved.
      `,
    };

    const adminMailOptions = {
      from: `Kavacham Website <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `📩 New Contact Form Submission from ${customerName}`,
      html: `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; background-color: #f8fafc; padding: 20px; }
              .card { background: white; max-width: 600px; margin: 0 auto; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
              .highlight { color: #6d28d9; font-weight: 600; }
              .details { background: #f5f3ff; padding: 15px; border-radius: 6px; margin: 15px 0; }
            </style>
          </head>
          <body>
            <div class="card">
              <h2 style="color: #6d28d9;">New Contact Form Submission</h2>
              <p>A visitor has submitted the contact form on Kavacham.in:</p>
              
              <div class="details">
                <p><span class="highlight">Name:</span> ${customerName}</p>
                <p><span class="highlight">Email:</span> ${email}</p>
                ${phone ? `<p><span class="highlight">Phone:</span> ${phone}</p>` : ''}
                <p><span class="highlight">Message:</span></p>
                <p>${message}</p>
                <p><span class="highlight">Firebase ID:</span> ${docRef.id}</p>
              </div>
              
              <p><strong>Action required:</strong> Please respond to this inquiry within 24 hours.</p>
              
              <p>You can reply directly to: <a href="mailto:${email}">${email}</a></p>
              
              <p style="margin-top: 25px; color: #64748b; font-size: 0.9em;">
                This message was automatically generated by the Kavacham website contact form.
              </p>
            </div>
          </body>
        </html>
      `,
      text: `
        NEW CONTACT FORM SUBMISSION

        A visitor has submitted the contact form on Kavacham.in:

        Name: ${customerName}
        Email: ${email}
        ${phone ? `Phone: ${phone}` : ''}
        Message:
        ${message}
        Firebase ID: ${docRef.id}

        Action required: Please respond to this inquiry within 24 hours.

        You can reply directly to: ${email}

        This message was automatically generated by the Kavacham website contact form.
      `,
    };

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);

    console.log("✅ Emails sent successfully");
    return new Response(
      JSON.stringify({ success: true, firebaseId: docRef.id }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}