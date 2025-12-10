// app/api/astrologers/register/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request) {
  try {
    console.log('🚀 Starting astrologer registration...');

    // Parse JSON data instead of FormData
    const data = await request.json();
    console.log('📝 JSON data received:', data);
    
    // Extract and validate form data
    const {
      name,
      email,
      password,
      phone,
      dob,
      gender,
      experience,
      specialization,
      languages,
      services,
      about,
      address,
      education,
      certifications,
      hourlyRate,
      photoURL,
      displayName,
      workingHours,
      availableForCalls
    } = data;

    // Validate required fields
    if (!name || !email || !password || !phone || !experience) {
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

    // Validate password
    if (password.length < 6) {
      console.error('❌ Password too short');
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // Ensure arrays are properly formatted
    const processedLanguages = Array.isArray(languages) ? languages : [];
    const processedServices = Array.isArray(services) ? services : [];

    // Prepare data for Firebase - matching the collection structure
    const astrologerData = {
      // Basic information
      name: name?.trim() || null,
      fullName: name?.trim() || null,
      displayName: displayName?.trim() || name?.trim() || null,
      email: email?.trim().toLowerCase() || null,
      password: password || null,
      phone: phone?.trim() || null,
      phoneNumber: phone?.trim() || null,
      dob: dob || null,
      dateOfBirth: dob || null,
      gender: gender || null,
      
      // Professional information
      experience: experience?.trim() || null,
      specialization: specialization?.trim() || null,
      languages: processedLanguages,
      services: processedServices,
      about: about?.trim() || null,
      bio: about?.trim() || null,
      
      // Additional fields
      address: address?.trim() || null,
      education: education?.trim() || null,
      certifications: certifications?.trim() || null,
      photoURL: photoURL?.trim() || null,
      workingHours: workingHours?.trim() || null,
      availableForCalls: availableForCalls || false,
      
      // Pricing
      hourlyRate: hourlyRate ? parseFloat(hourlyRate) : null,
      pricing: hourlyRate ? {
        baseCallRate: parseFloat(hourlyRate),
        baseChatRate: hourlyRate ? parseFloat(hourlyRate) * 0.5 : null,
        currency: 'INR',
        services: processedServices,
        updatedAt: serverTimestamp()
      } : null,
      
      // System fields
      status: 'pending',
      approved: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastUpdated: serverTimestamp(),
      registrationDate: serverTimestamp()
    };

    console.log('💾 Saving to Firebase...');
    console.log('📋 Data to save:', JSON.stringify(astrologerData, null, 2));
    
    // Save to Firebase - this is the critical operation
    let docRef;
    try {
      if (!db) {
        throw new Error('Firebase database not initialized');
      }
      
      docRef = await addDoc(collection(db, 'astrologers'), astrologerData);
      console.log('✅ Astrologer saved to Firebase collection "astrologers" with ID:', docRef.id);
    } catch (firebaseError) {
      console.error('❌ Firebase error details:', {
        message: firebaseError.message,
        code: firebaseError.code,
        stack: firebaseError.stack
      });
      return NextResponse.json(
        { 
          success: false, 
          message: 'Database error. Please try again.',
          error: firebaseError.message 
        },
        { status: 500 }
      );
    }

    // Create email transporter (optional - only if email config is available)
    console.log('📧 Setting up email transporter...');
    let transporter = null;
    
    // Check if email configuration is available
    const hasEmailConfig = process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.ADMIN_EMAIL;
    
    if (hasEmailConfig) {
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
    } else {
      console.log('⚠️ Email configuration not available - skipping email functionality');
    }

    // Create email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #6d28d9;">New Astrologer Registration</h1>
        
        <div style="background: #f5f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #6d28d9; margin-top: 0;">Personal Information</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Display Name:</strong> ${displayName || name || 'Not provided'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Date of Birth:</strong> ${dob || 'Not provided'}</p>
          <p><strong>Gender:</strong> ${gender || 'Not provided'}</p>
          <p><strong>Address:</strong> ${address || 'Not provided'}</p>
          <p><strong>Photo URL:</strong> ${photoURL || 'Not provided'}</p>
        </div>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #0369a1; margin-top: 0;">Professional Information</h2>
          <p><strong>Years of Experience:</strong> ${experience}</p>
          <p><strong>Specialization:</strong> ${specialization || 'Not provided'}</p>
          <p><strong>Languages Known:</strong> ${processedLanguages.length > 0 ? processedLanguages.join(', ') : 'Not provided'}</p>
          <p><strong>Services Offered:</strong> ${processedServices.length > 0 ? processedServices.join(', ') : 'Not provided'}</p>
          <p><strong>Education:</strong> ${education || 'Not provided'}</p>
          <p><strong>Certifications:</strong> ${certifications || 'Not provided'}</p>
          <p><strong>Hourly Rate:</strong> ${hourlyRate ? `₹${hourlyRate}` : 'Not provided'}</p>
          <p><strong>Working Hours:</strong> ${workingHours || 'Not provided'}</p>
          <p><strong>Available for Calls:</strong> ${availableForCalls ? 'Yes' : 'No'}</p>
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