import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();
    
    console.log('Email request received:', { name, email, subject });
    console.log('Environment check:', { 
      hasUser: !!process.env.EMAIL_USER, 
      hasPass: !!process.env.EMAIL_PASS 
    });

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail app password
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'a.bhadani0301@gmail.com', // Your email where you want to receive messages
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Portfolio Contact</title>
        </head>
        <body style="margin: 0; padding: 40px 20px; font-family: 'Inter', sans-serif; background-color: #f8fafc; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #1A1B23; border-radius: 16px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); overflow: hidden; border: 1px solid #D4AF37;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #0A0B0F; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                Portfolio Contact
              </h1>
              <p style="color: #0A0B0F; margin: 12px 0 0 0; font-size: 16px; opacity: 0.9; font-weight: 500;">
                New inquiry received through AI Engineer Portfolio
              </p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px 20px;">
              
              <!-- Contact Info Card -->
              <div style="background-color: #1A1B23; border-radius: 12px; padding: 28px; margin-bottom: 32px; border-left: 5px solid #D4AF37; border: 1px solid #D4AF37;">
                <h2 style="color: #E8E9EA; margin: 0 0 20px 0; font-size: 20px; font-weight: 700; letter-spacing: -0.3px;">
                  Contact Information
                </h2>
                <div style="display: grid; gap: 16px;">
                  <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #2A2B3A;">
                    <span style="background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); color: #0A0B0F; padding: 8px 14px; border-radius: 8px; font-size: 11px; font-weight: 700; margin-right: 16px; min-width: 70px; text-align: center; letter-spacing: 0.5px;">
                      NAME
                    </span>
                    <span style="color: #E8E9EA; font-weight: 600; font-size: 16px;">${name}</span>
                  </div>
                  <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #2A2B3A;">
                    <span style="background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); color: #0A0B0F; padding: 8px 14px; border-radius: 8px; font-size: 11px; font-weight: 700; margin-right: 16px; min-width: 70px; text-align: center; letter-spacing: 0.5px;">
                      EMAIL
                    </span>
                    <a href="mailto:${email}" style="color: #D4AF37; text-decoration: none; font-weight: 600; font-size: 16px;">${email}</a>
                  </div>
                  <div style="display: flex; align-items: center; padding: 12px 0;">
                    <span style="background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); color: #0A0B0F; padding: 8px 14px; border-radius: 8px; font-size: 11px; font-weight: 700; margin-right: 16px; min-width: 70px; text-align: center; letter-spacing: 0.5px;">
                      SUBJECT
                    </span>
                    <span style="color: #E8E9EA; font-weight: 600; font-size: 16px;">${subject}</span>
                  </div>
                </div>
              </div>
              
              <!-- Message Card -->
              <div style="background-color: #1A1B23; border: 1px solid #D4AF37; border-radius: 12px; padding: 28px;">
                <h2 style="color: #E8E9EA; margin: 0 0 20px 0; font-size: 20px; font-weight: 700; letter-spacing: -0.3px;">
                  Message
                </h2>
                <div style="background-color: #0A0B0F; padding: 24px; border-radius: 8px; border-left: 4px solid #D4AF37;">
                  <p style="color: #E8E9EA; margin: 0; white-space: pre-wrap; font-size: 16px; line-height: 1.7; font-weight: 400;">
                    ${message.replace(/\n/g, '\n')}
                  </p>
                </div>
              </div>
              
              <!-- Quick Actions -->
              <div style="margin-top: 32px; text-align: center;">
                <a href="mailto:${email}?subject=Re: ${subject}&body=Hi ${name},%0A%0AThank you for reaching out through my portfolio!%0A%0A" 
                   style="background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); color: #0A0B0F; text-decoration: none; padding: 16px 32px; border-radius: 10px; font-weight: 700; display: inline-block; font-size: 16px; letter-spacing: 0.3px; box-shadow: 0 4px 8px rgba(212, 175, 55, 0.2);">
                  Quick Reply
                </a>
              </div>
              
            </div>
            
            <!-- Footer -->
            <div style="background-color: #1A1B23; padding: 20px; text-align: center; border-top: 1px solid #D4AF37;">
              <p style="color: #E8E9EA; margin: 0; font-size: 14px; opacity: 0.8;">
                This email was sent from your AI Engineer Portfolio contact form
              </p>
              <p style="color: #D4AF37; margin: 5px 0 0 0; font-size: 12px;">
                Generated on ${new Date().toLocaleString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
      replyTo: email,
    };

    // Send email to you
    console.log('Attempting to send email to portfolio owner...');
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to owner:', result.messageId);

    // Send acknowledgement email to the user
    const acknowledgementEmail = {
      from: process.env.EMAIL_USER,
      to: email, // Send to the user who submitted the form
      subject: `Thank you for reaching out! - Anshu Bhadani`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You - AI Engineer Portfolio</title>
        </head>
        <body style="margin: 0; padding: 40px 20px; font-family: 'Inter', sans-serif; background-color: #f8fafc; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #1A1B23; border-radius: 16px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); overflow: hidden; border: 1px solid #D4AF37;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #0A0B0F; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
              🚀 Thank You for Reaching Out!
              </h1>
              <p style="color: #0A0B0F; margin: 12px 0 0 0; font-size: 16px; opacity: 0.9; font-weight: 500;">
                Your message has been received successfully
              </p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px 20px;">
              
              <!-- Greeting -->
              <div style="margin-bottom: 32px;">
                <h2 style="color: #E8E9EA; margin: 0 0 20px 0; font-size: 24px; font-weight: 700; letter-spacing: -0.3px;">
                  Hi ${name}! 👋
                </h2>
                <p style="color: #E8E9EA; margin: 0; font-size: 18px; line-height: 1.7; font-weight: 400;">
                  Thank you for taking the time to reach out through my AI Engineer Portfolio. I've received your message about <strong style="color: #D4AF37; font-weight: 600;">"${subject}"</strong> and I'm excited to connect with you!
                </p>
              </div>
              
              <!-- What's Next -->
              <div style="background-color: #1A1B23; border: 1px solid #D4AF37; border-radius: 12px; padding: 28px; margin-bottom: 32px;">
                <h3 style="color: #E8E9EA; margin: 0 0 20px 0; font-size: 20px; font-weight: 700; letter-spacing: -0.3px;">
                  What's Next?
                </h3>
                <ul style="color: #E8E9EA; margin: 0; padding-left: 24px; line-height: 1.8; font-size: 16px;">
                  <li style="margin-bottom: 12px;">You can expect a response within <strong style="color: #D4AF37; font-weight: 600;">24 hours</strong></li>
                  <li style="margin-bottom: 12px;">I'll get back to you at <strong style="color: #D4AF37; font-weight: 600;">${email}</strong></li>
                  <li>Feel free to explore more of my work in the meantime!</li>
                </ul>
              </div>
              
              <!-- Portfolio Links -->
              <div style="background-color: #0A0B0F; border-radius: 12px; padding: 28px; margin-bottom: 32px; border-left: 4px solid #D4AF37;">
                <h3 style="color: #E8E9EA; margin: 0 0 20px 0; font-size: 20px; font-weight: 700; letter-spacing: -0.3px;">
                  Explore My Work
                </h3>
                <div style="display: grid; gap: 16px;">
                  <a href="https://ai-engineer-portfolio.vercel.app/#projects" 
                     style="color: #D4AF37; text-decoration: none; font-weight: 600; display: block; padding: 12px 0; font-size: 16px; border-bottom: 1px solid #2A2B3A;">
                    View My AI Projects
                  </a>
                  <a href="https://ai-engineer-portfolio.vercel.app/#blog" 
                     style="color: #D4AF37; text-decoration: none; font-weight: 600; display: block; padding: 12px 0; font-size: 16px; border-bottom: 1px solid #2A2B3A;">
                    Read My AI Articles
                  </a>
                  <a href="https://ai-engineer-portfolio.vercel.app/#skills" 
                     style="color: #D4AF37; text-decoration: none; font-weight: 600; display: block; padding: 12px 0; font-size: 16px;">
                    Check My Technical Skills
                  </a>
                </div>
              </div>
              
              <!-- Contact Info -->
              <div style="text-align: center; margin-top: 32px;">
                <p style="color: #E8E9EA; margin: 0 0 16px 0; font-size: 16px; font-weight: 500;">
                  Need immediate assistance? Feel free to reach out directly:
                </p>
                <a href="mailto:a.bhadani0301@gmail.com" 
                   style="background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); color: #0A0B0F; text-decoration: none; padding: 16px 32px; border-radius: 10px; font-weight: 700; display: inline-block; font-size: 16px; letter-spacing: 0.3px; box-shadow: 0 4px 8px rgba(212, 175, 55, 0.2);">
                  Email Me Directly
                </a>
              </div>
              
            </div>
            
            <!-- Footer -->
            <div style="background-color: #1A1B23; padding: 20px; text-align: center; border-top: 1px solid #D4AF37;">
              <p style="color: #E8E9EA; margin: 0; font-size: 14px; opacity: 0.8;">
                This is an automated response from AI Engineer Portfolio
              </p>
              <p style="color: #D4AF37; margin: 5px 0 0 0; font-size: 12px;">
                Generated on ${new Date().toLocaleString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
    };

    // Send acknowledgement email
    console.log('Sending acknowledgement email to user...');
    const acknowledgementResult = await transporter.sendMail(acknowledgementEmail);
    console.log('Acknowledgement email sent successfully:', acknowledgementResult.messageId);

    return NextResponse.json({ 
      success: true, 
      messageId: result.messageId,
      acknowledgementId: acknowledgementResult.messageId 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ 
      error: 'Failed to send email', 
      details: error.message 
    }, { status: 500 });
  }
}
