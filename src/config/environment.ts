export const ENVIRONMENT = {
  PORT: process.env.PORT || 3000,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'gmail',
  EMAIL_USER: process.env.EMAIL_USERNAME || process.env.SMTP_USER || 'your_email@example.com',
  EMAIL_PASS: process.env.EMAIL_PASSWORD || process.env.SMTP_PASS || 'your_email_password',
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // SMTP Configuration
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587'),
  SMTP_USER: process.env.SMTP_USER || 'your_email@example.com',
  SMTP_PASS: process.env.SMTP_PASS || 'your_email_password',
  SMTP_FROM: process.env.SMTP_FROM || process.env.SMTP_USER || 'your_email@example.com',
  CONTACT_EMAIL: process.env.CONTACT_EMAIL || 'contact@example.com',
} as const;