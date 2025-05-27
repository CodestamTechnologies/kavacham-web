// app/api/waitlist/route.js
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore'

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Email is required',
          type: 'validation_error' 
        },
        { status: 400 }
      )
    }

    // Check if email already exists in waitlist
    const q = query(
      collection(db, 'waitlist'), 
      where('email', '==', email)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Return success response for already existing email
      return NextResponse.json({
        success: true,
        message: 'You are already on the waitlist! We\'ll notify you as soon as we launch.',
        alreadyExists: true
      }, { status: 200 })
    }

    // Save to Firebase
    const docRef = await addDoc(collection(db, 'waitlist'), {
      email,
      joinedAt: serverTimestamp(),
      status: 'active',
      notified: false
    });

    console.log('✅ Email saved to waitlist with ID:', docRef.id);

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    // Send confirmation to user
    await transporter.sendMail({
      from: `"Kavacham Cosmic Connection" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to the Cosmic Journey! ✨',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <h1 style="color: #6d28d9; font-size: 28px; margin-bottom: 20px; text-align: center;">
              ✨ Welcome to Cosmic Connection!
            </h1>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Dear Cosmic Seeker,
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Thank you for joining our exclusive waitlist! You're now part of a special community that will be the first to experience our transformative cosmic services.
            </p>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
              <p style="color: white; font-size: 18px; margin: 0; font-weight: bold;">
                🌟 You're in! We'll notify you as soon as we launch 🌟
              </p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              <strong>What to expect:</strong>
            </p>
            <ul style="color: #555; line-height: 1.8;">
              <li>🔮 Personalized astrological insights</li>
              <li>🌙 Exclusive early access to our platform</li>
              <li>✨ Special launch offers and bonuses</li>
              <li>🎯 Priority booking with top astrologers</li>
            </ul>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 25px;">
              Your email: <strong style="color: #6d28d9;">${email}</strong>
            </p>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px;">
                With cosmic blessings,<br>
                <strong>The Kavacham Team</strong>
              </p>
            </div>
          </div>
        </div>
      `
    })

    // Send notification to admin (only for new signups)
    await transporter.sendMail({
      from: `"Kavacham Waitlist" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: '🌟 New Cosmic Connection Waitlist Signup',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h1 style="color: #6d28d9; margin-bottom: 20px;">🌟 New Waitlist Signup</h1>
            
            <div style="background: #f5f3ff; padding: 15px; border-radius: 6px; margin: 15px 0;">
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              <p style="margin: 5px 0;"><strong>Firebase ID:</strong> ${docRef.id}</p>
            </div>
            
            <p style="margin-top: 20px; color: #666; font-size: 14px;">
              This notification was automatically generated by the Kavacham waitlist system.
            </p>
          </div>
        </div>
      `
    })

    console.log('✅ Emails sent successfully');

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully joined the waitlist! Check your email for confirmation.',
      firebaseId: docRef.id,
      alreadyExists: false
    })
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to process request',
        type: 'server_error'
      },
      { status: 500 }
    )
  }
}