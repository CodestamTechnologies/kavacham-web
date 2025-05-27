// app/api/astrologers/register/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Extract form data
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const dob = formData.get('dob');
    const gender = formData.get('gender');
    const experience = formData.get('experience');
    const specialization = formData.get('specialization');
    const languages = JSON.parse(formData.get('languages'));
    const services = JSON.parse(formData.get('services'));
    const about = formData.get('about');

    // Prepare data for Firebase
    const astrologerData = {
      name,
      email,
      phone,
      dob,
      gender,
      experience,
      specialization,
      languages,
      services,
      about,
      registrationDate: serverTimestamp(),
      status: 'pending', // pending, approved, rejected
      isActive: false
    };

    // Save to Firebase
    const docRef = await addDoc(collection(db, 'astrologers'), astrologerData);
    console.log('✅ Astrologer saved to Firebase with ID:', docRef.id);

    // Create email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #6d28d9;">New Astrologer Registration</h1>
        
        <div style="background: #f5f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #6d28d9; margin-top: 0;">Personal Information</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Date of Birth:</strong> ${dob}</p>
          <p><strong>Gender:</strong> ${gender}</p>
        </div>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #0369a1; margin-top: 0;">Professional Information</h2>
          <p><strong>Years of Experience:</strong> ${experience}</p>
          <p><strong>Specialization:</strong> ${specialization}</p>
          <p><strong>Languages Known:</strong> ${languages.join(', ')}</p>
          <p><strong>Services Offered:</strong> ${services.join(', ')}</p>
          <p><strong>About:</strong> ${about}</p>
        </div>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Firebase Document ID:</strong> ${docRef.id}</p>
          <p style="margin: 5px 0 0 0; font-size: 14px; color: #92400e;">Use this ID to manage the application in the database.</p>
        </div>
      </div>
    `;

    // Send confirmation email to astrologer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === 'true' || false,
      auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

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

    return NextResponse.json({
      success: true,
      message: 'Registration successful! We will review your application and contact you soon.',
      firebaseId: docRef.id
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}