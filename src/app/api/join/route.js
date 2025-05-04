import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Using Gmail as example
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    // Send confirmation to user
    await transporter.sendMail({
      from: `"Cosmic Connection" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'You\'re on the waitlist!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #838CF9; font-size: 24px; margin-bottom: 20px;">✨ Welcome to Cosmic Connection!</h1>
          <p>Thank you for joining our waitlist. We'll notify you when we launch.</p>
          <p>Your email: ${email}</p>
        </div>
      `
    })

    // Send notification to admin
    await transporter.sendMail({
      from: `"Cosmic Connection" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Waitlist Signup',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #838CF9;">New Waitlist Signup</h1>
          <p>Email: ${email}</p>
          <p>Date: ${new Date().toLocaleString()}</p>
        </div>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}