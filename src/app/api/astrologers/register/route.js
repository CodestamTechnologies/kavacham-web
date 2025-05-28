// app/api/astrologers/register/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request) {
  try {
    console.log('🚀 Starting astrologer registration...');
    
    // Check environment variables
    const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASS', 'ADMIN_EMAIL'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error('❌ Missing environment variables:', missingVars);
      return NextResponse.json(
        { success: false, message: 'Server configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    // Parse JSON data instead of FormData
    const data = await request.json();
    console.log('📝 JSON data received:', data);
    
    // Extract and validate form data
    const {
      name,
      email,
      phone,
      dob,
      gender,
      experience,
      specialization,
      languages,
      services,
      about
    } = data;

    // Validate required fields
    if (!name || !email || !phone || !experience) {
      console.error('❌ Missing required fields');
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      console.error('❌ Invalid email format');
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Ensure arrays are properly formatted
    const processedLanguages = Array.isArray(languages) ? languages : [];
    const processedServices = Array.isArray(services) ? services : [];

    // Prepare data for Firebase
    const astrologerData = {
      name: name?.trim(),
      email: email?.trim().toLowerCase(),
      phone: phone?.trim(),
      dob: dob || null,
      gender: gender || null,
      experience: experience?.trim(),
      specialization: specialization || null,
      languages: processedLanguages,
      services: processedServices,
      about: about?.trim() || null,
      registrationDate: serverTimestamp(),
      status: 'pending',
      isActive: false
    };

    console.log('💾 Saving to Firebase...');
    
    // Save to Firebase
    let docRef;
    try {
      docRef = await addDoc(collection(db, 'astrologers'), astrologerData);
      console.log('✅ Astrologer saved to Firebase with ID:', docRef.id);
    } catch (firebaseError) {
      console.error('❌ Firebase error:', firebaseError);
      return NextResponse.json(
        { success: false, message: 'Database error. Please try again.' },
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
        tls: {
          rejectUnauthorized: false
        }
      });

      // Verify transporter (silently)
      await transporter.verify();
      console.log('✅ Email transporter verified');
    } catch (transporterError) {
      console.error('❌ Email transporter error:', transporterError);
      // Continue execution - we've saved to database, just email failed
      transporter = null;
    }

    // Create email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #6d28d9;">New Astrologer Registration</h1>
        
        <div style="background: #f5f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #6d28d9; margin-top: 0;">Personal Information</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Date of Birth:</strong> ${dob || 'Not provided'}</p>
          <p><strong>Gender:</strong> ${gender || 'Not provided'}</p>
        </div>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #0369a1; margin-top: 0;">Professional Information</h2>
          <p><strong>Years of Experience:</strong> ${experience}</p>
          <p><strong>Specialization:</strong> ${specialization || 'Not provided'}</p>
          <p><strong>Languages Known:</strong> ${processedLanguages.length > 0 ? processedLanguages.join(', ') : 'Not provided'}</p>
          <p><strong>Services Offered:</strong> ${processedServices.length > 0 ? processedServices.join(', ') : 'Not provided'}</p>
          <p><strong>About:</strong> ${about || 'Not provided'}</p>
        </div>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Firebase Document ID:</strong> ${docRef.id}</p>
          <p style="margin: 5px 0 0 0; font-size: 14px; color: #92400e;">Use this ID to manage the application in the database.</p>
        </div>
      </div>
    `;

    // Send emails if transporter is available
    if (transporter) {
      try {
        console.log('📧 Sending emails...');
        
        // Email to astrologer
        await transporter.sendMail({
          from: `Kavacham Team <${process.env.EMAIL_USER}>`,
          to: email,
          subject: '🌟 Registration Received - Kavacham Astrologer Network',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #6d28d9;">Welcome to Kavacham!</h1>
              <p>Dear ${name},</p>
              <p>Thank you for your interest in joining our astrologer network. We have received your registration and our team will review your application within 2-3 business days.</p>
              
              <div style="background: #f5f3ff; padding: 15px; border-radius: 6px; margin: 15px 0;">
                <p><strong>What happens next?</strong></p>
                <ul>
                  <li>Our team will review your application</li>
                  <li>We may contact you for additional information or an interview</li>
                  <li>You'll receive an email notification about your application status</li>
                </ul>
              </div>
              
              <p>If you have any questions, please don't hesitate to reach out to us.</p>
              <p>With cosmic regards,<br><strong>The Kavacham Team</strong></p>
            </div>
          `
        });

        // Email to admin
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL,
          subject: `🌟 New Astrologer Registration - ${name}`,
          html: emailContent,
        });

        console.log('✅ Emails sent successfully');
      } catch (emailError) {
        console.error('❌ Email sending error:', emailError);
        // Don't fail the request - registration was successful
      }
    } else {
      console.log('⚠️ Skipping email sending due to transporter setup failure');
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful! We will review your application and contact you soon.',
      firebaseId: docRef.id,
      emailSent: transporter !== null
    });
    
  } catch (error) {
    console.error('❌ Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}