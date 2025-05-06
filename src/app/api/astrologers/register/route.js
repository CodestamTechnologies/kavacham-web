// app/api/astrologers/register/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // Create email content
    const emailContent = `
      <h1>New Astrologer Registration</h1>
      <h2>Personal Information</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Date of Birth:</strong> ${dob}</p>
      <p><strong>Gender:</strong> ${gender}</p>
      
      <h2>Professional Information</h2>
      <p><strong>Years of Experience:</strong> ${experience}</p>
      <p><strong>Specialization:</strong> ${specialization}</p>
      <p><strong>Languages Known:</strong> ${languages.join(', ')}</p>
      <p><strong>Services Offered:</strong> ${services.join(', ')}</p>
      <p><strong>About:</strong> ${about}</p>
    `;

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Astrologer Registration',
      html: emailContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Registration successful! We will review your application and contact you soon.'
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}