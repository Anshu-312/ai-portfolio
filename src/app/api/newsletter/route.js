import { NextResponse } from 'next/server';
import { addSubscriber, getAllSubscribers } from '../../../data/subscribers';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Add subscriber to our list
    const result = addSubscriber(email);
    
    if (!result.success) {
      return NextResponse.json({ 
        error: result.message || 'Failed to subscribe',
        alreadySubscribed: true 
      }, { status: 400 });
    }

    // Send notification email to you about new subscriber
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const notificationEmail = {
      from: process.env.EMAIL_USER,
      to: 'a.bhadani0301@gmail.com',
      subject: `📧 New Newsletter Subscriber: ${email}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Newsletter Subscriber</title>
        </head>
        <body style="margin: 0; padding: 40px 20px; font-family: 'Inter', sans-serif; background-color: #f8fafc; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #1A1B23; border-radius: 16px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12); overflow: hidden; border: 1px solid #D4AF37;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #0A0B0F; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                📧 New Newsletter Subscriber
              </h1>
              <p style="color: #0A0B0F; margin: 12px 0 0 0; font-size: 16px; opacity: 0.9; font-weight: 500;">
                Someone subscribed to your AI Engineer Newsletter
              </p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px 20px;">
              
              <!-- Subscriber Info -->
              <div style="background-color: #1A1B23; border-radius: 12px; padding: 28px; margin-bottom: 32px; border-left: 5px solid #D4AF37; border: 1px solid #D4AF37;">
                <h2 style="color: #E8E9EA; margin: 0 0 20px 0; font-size: 20px; font-weight: 700; letter-spacing: -0.3px;">
                  Subscriber Details
                </h2>
                <div style="display: grid; gap: 16px;">
                  <div style="display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #2A2B3A;">
                    <span style="background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); color: #0A0B0F; padding: 8px 14px; border-radius: 8px; font-size: 11px; font-weight: 700; margin-right: 16px; min-width: 70px; text-align: center; letter-spacing: 0.5px;">
                      EMAIL
                    </span>
                    <span style="color: #E8E9EA; font-weight: 600; font-size: 16px;">${email}</span>
                  </div>
                  <div style="display: flex; align-items: center; padding: 12px 0;">
                    <span style="background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%); color: #0A0B0F; padding: 8px 14px; border-radius: 8px; font-size: 11px; font-weight: 700; margin-right: 16px; min-width: 70px; text-align: center; letter-spacing: 0.5px;">
                      DATE
                    </span>
                    <span style="color: #E8E9EA; font-weight: 600; font-size: 16px;">${new Date().toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <!-- Next Steps -->
              <div style="background-color: #0A0B0F; border-radius: 12px; padding: 28px; border-left: 4px solid #D4AF37;">
                <h3 style="color: #E8E9EA; margin: 0 0 15px 0; font-size: 18px; font-weight: 700;">
                  Next Steps
                </h3>
                <ul style="color: #E8E9EA; margin: 0; padding-left: 20px; line-height: 1.8; font-size: 16px;">
                  <li>This subscriber will be notified when you publish new blog posts</li>
                  <li>You can send manual updates to all subscribers</li>
                  <li>Consider using a service like Mailchimp for advanced features</li>
                </ul>
              </div>
              
            </div>
            
            <!-- Footer -->
            <div style="background-color: #1A1B23; padding: 20px; text-align: center; border-top: 1px solid #D4AF37;">
              <p style="color: #E8E9EA; margin: 0; font-size: 14px; opacity: 0.8;">
                Newsletter subscription from AI Engineer Portfolio
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(notificationEmail);

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter',
      subscriber: result.subscriber
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ 
      error: 'Failed to subscribe to newsletter', 
      details: error.message 
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const subscribers = getAllSubscribers();
    return NextResponse.json({ 
      success: true, 
      subscribers,
      count: subscribers.length 
    });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch subscribers', 
      details: error.message 
    }, { status: 500 });
  }
}
