import { Request, Response } from 'express';
import { EmailService } from '../services/emailService';

export class EmailController {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  async sendEmail(req: Request, res: Response) {
    const { to, subject, message, html } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({ 
        success: false,
        error: 'To, subject, and message fields are required' 
      });
    }

    try {
      await this.emailService.sendEmail(to, subject, message, html);
      return res.status(200).json({ 
        success: true,
        message: 'Email sent successfully' 
      });
    } catch (error: any) {
      console.error('Email sending error:', error);
      return res.status(500).json({ 
        success: false,
        error: 'Failed to send email: ' + (error?.message || 'Unknown error')
      });
    }
  }

  async sendContactForm(req: Request, res: Response) {
    const { name, email, message, phone, company, subject, productInterest } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    try {
      await this.emailService.sendContactFormEmail({
        name,
        email,
        message,
        phone,
        company,
        subject,
        productInterest
      });

      // Log successful submission (for debugging)
      console.log('Contact form email sent successfully:', {
        from: email,
        name: name,
        timestamp: new Date().toISOString()
      });

      return res.status(200).json({
        success: true,
        message: 'Your message has been sent successfully! We will get back to you within 24 hours.'
      });

    } catch (error: any) {
      console.error('Contact form email sending error:', error);

      return res.status(500).json({
        success: false,
        message: 'There was an error sending your message. Please try again or contact us directly.'
      });
    }
  }
}

export default EmailController;