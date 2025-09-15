import nodemailer from 'nodemailer';
import { ENVIRONMENT } from '../config/environment';

export class EmailService {
  private transporter: any;

  constructor() {
    // Initialize the email transporter using Nodemailer
    this.transporter = this.createTransporter();
  }

  private createTransporter() {
    // Configure the email service credentials and settings
    return nodemailer.createTransport({
      host: ENVIRONMENT.SMTP_HOST,
      port: ENVIRONMENT.SMTP_PORT,
      secure: ENVIRONMENT.SMTP_PORT === 465, // true for 465, false for other ports
      auth: {
        user: ENVIRONMENT.SMTP_USER,
        pass: ENVIRONMENT.SMTP_PASS,
      },
    });
  }

  public async sendEmail(to: string, subject: string, text: string, html?: string): Promise<void> {
    try {
      // Verify connection configuration
      await this.transporter.verify();
    } catch (error: any) {
      throw new Error('SMTP configuration error: ' + (error?.message || 'Unknown error'));
    }

    const mailOptions = {
      from: ENVIRONMENT.SMTP_FROM,
      to,
      subject,
      text,
      html: html || text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error: any) {
      throw new Error('Failed to send email: ' + (error?.message || 'Unknown error'));
    }
  }

  public async sendContactFormEmail(formData: {
    name: string;
    email: string;
    message: string;
    phone?: string;
    company?: string;
    subject?: string;
    productInterest?: string;
  }): Promise<void> {
    const emailContent = {
      from: ENVIRONMENT.SMTP_FROM,
      to: ENVIRONMENT.CONTACT_EMAIL,
      subject: `New Contact Form Submission from ${formData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1B365D; border-bottom: 2px solid #E67E22; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #1B365D; width: 120px;">Name:</td>
                <td style="padding: 10px;">${formData.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #1B365D;">Email:</td>
                <td style="padding: 10px;"><a href="mailto:${formData.email}" style="color: #E67E22;">${formData.email}</a></td>
              </tr>
              ${formData.phone ? `
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #1B365D;">Phone:</td>
                <td style="padding: 10px;">${formData.phone}</td>
              </tr>
              ` : ''}
              ${formData.company ? `
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #1B365D;">Company:</td>
                <td style="padding: 10px;">${formData.company}</td>
              </tr>
              ` : ''}
              ${formData.subject ? `
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #1B365D;">Subject:</td>
                <td style="padding: 10px;">${formData.subject}</td>
              </tr>
              ` : ''}
              ${formData.productInterest ? `
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; color: #1B365D;">Product Interest:</td>
                <td style="padding: 10px;">${formData.productInterest}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #1B365D; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #E67E22; border-radius: 4px;">
              ${formData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #1B365D; color: white; border-radius: 8px; text-align: center;">
            <p style="margin: 0; font-size: 14px;">
              This message was sent from the contact form on 
              <strong>Textiles S.A</strong> website
            </p>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.8;">
              Sent at: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission from Textiles S.A

Name: ${formData.name}
Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}` : ''}
${formData.company ? `Company: ${formData.company}` : ''}
${formData.subject ? `Subject: ${formData.subject}` : ''}
${formData.productInterest ? `Product Interest: ${formData.productInterest}` : ''}

Message:
${formData.message}

Sent at: ${new Date().toLocaleString()}
      `.trim()
    };

    try {
      // Verify connection configuration
      await this.transporter.verify();
      
      // Send email
      await this.transporter.sendMail(emailContent);
    } catch (error: any) {
      throw new Error('Failed to send contact form email: ' + (error?.message || 'Unknown error'));
    }
  }
}