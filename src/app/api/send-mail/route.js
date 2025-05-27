// app/api/contact/route.js
import nodemailer from 'nodemailer';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req) {
  try {
    console.log('🚀 Starting contact form submission...');

    // Check environment variables
    const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASS', 'ADMIN_EMAIL'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error('❌ Missing environment variables:', missingVars);
      return new Response(
        JSON.stringify({ success: false, error: 'Server configuration error. Please contact support.' }),
        { status: 500 }
      );
    }

    const body = await req.json();
    console.log('📝 Request body received');
    
    const { to, customerName, message, email, phone } = body;

    // Validate required fields
    if (!to || !customerName || !message || !email) {
      console.error('❌ Missing required fields');
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields: to, customerName, message, and email are required' }),
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !emailRegex.test(to)) {
      console.error('❌ Invalid email format');
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email format' }),
        { status: 400 }
      );
    }

    console.log('💾 Saving to Firebase...');
    
    // Save to Firebase
    let docRef;
    try {
      docRef = await addDoc(collection(db, 'contacts'), {
        to,
        customerName,
        message,
        email,
        phone: phone || null,
        createdAt: serverTimestamp(),
        status: 'unread'
      });
      console.log('✅ Contact saved to Firebase with ID:', docRef.id);
    } catch (firebaseError) {
      console.error('❌ Firebase error:', firebaseError);
      return new Response(
        JSON.stringify({ success: false, error: 'Database error. Please try again.' }),
        { status: 500 }
      );
    }

    // Create email transporter
    console.log('📧 Setting up email transporter...');
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT) || 587,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Verify transporter
      await transporter.verify();
      console.log('✅ Email transporter verified');
    } catch (transporterError) {
      console.error('❌ Email transporter error:', transporterError);
      // Continue execution - we've saved to database, just email failed
    }

    // Send emails if transporter is available
    if (transporter) {
      try {
        console.log('📧 Sending emails...');

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
      } catch (emailError) {
        console.error('❌ Email sending error:', emailError);
        // Don't fail the request - contact was saved successfully
      }
    }

    return new Response(
      JSON.stringify({ success: true, firebaseId: docRef.id }),
      { status: 200 }
    );
    
  } catch (error) {
    console.error("❌ Contact form error:", error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error. Please try again.' }),
      { status: 500 }
    );
  }
}