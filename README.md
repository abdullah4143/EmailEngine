# Email API Service

A production-ready Express.js API service for sending emails using Nodemailer with SMTP support. This service provides endpoints for both basic email sending and contact form submissions with beautifully formatted HTML templates.

## Features

- 🚀 **Production Ready**: Built with TypeScript, proper error handling, and environment configuration
- 📧 **SMTP Support**: Works with Gmail, Outlook, and other SMTP providers
- 🎨 **HTML Templates**: Beautiful email templates for contact forms
- 🛡️ **Validation**: Input validation and error handling middleware
- 📊 **Health Check**: Built-in health check endpoint
- 🌐 **CORS Enabled**: Cross-origin resource sharing support
- 🔧 **Configurable**: Environment-based configuration
- 📦 **Vercel Ready**: Pre-configured for Vercel deployment

## API Endpoints

### Health Check
```
GET /health
```
Returns service status and environment information.

### Basic Email Sending
```
POST /api/send-email
```
Send a basic email with the following payload:
```json
{
  "to": "recipient@example.com",
  "subject": "Your Subject",
  "message": "Your message content",
  "html": "<h1>Optional HTML content</h1>"
}
```

### Contact Form Submission
```
POST /api/contact
```
Send a formatted contact form email with the following payload:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'm interested in your services.",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "subject": "Business Inquiry",
  "productInterest": "Web Development"
}
```

## Setup Instructions

### 1. Clone and Install Dependencies
```bash
cd email-api-service
npm install
```

### 2. Environment Configuration
Create a `.env` file based on `.env.example`:

```bash
# Basic Configuration
PORT=3000
NODE_ENV=production

# SMTP Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=your_email@gmail.com
CONTACT_EMAIL=contact@yourcompany.com
```

#### Gmail Setup:
1. Enable 2-Factor Authentication in your Google Account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in `SMTP_PASS`

### 3. Build and Run

#### Development:
```bash
npm run dev
```

#### Production:
```bash
npm run build
npm start
```

### 4. Test the API

#### Health Check:
```bash
curl http://localhost:3000/health
```

#### Send Contact Form Email:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

## Deployment

### Vercel Deployment

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Set Environment Variables in Vercel:**
```bash
vercel env add SMTP_HOST
vercel env add SMTP_PORT
vercel env add SMTP_USER
vercel env add SMTP_PASS
vercel env add SMTP_FROM
vercel env add CONTACT_EMAIL
```

3. **Deploy:**
```bash
vercel --prod
```

### Environment Variables for Production

Set these environment variables in your deployment platform:

| Variable | Description | Example |
|----------|-------------|---------|
| `SMTP_HOST` | SMTP server hostname | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | `587` |
| `SMTP_USER` | SMTP username | `your_email@gmail.com` |
| `SMTP_PASS` | SMTP password | `your_app_password` |
| `SMTP_FROM` | From email address | `your_email@gmail.com` |
| `CONTACT_EMAIL` | Contact form recipient | `contact@yourcompany.com` |
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port | `3000` |

## Project Structure

```
email-api-service
├── src
│   ├── app.ts                  # Entry point of the application
│   ├── config
│   │   └── environment.ts      # Configuration settings and environment variables
│   ├── controllers
│   │   └── emailController.ts   # Controller for handling email-related requests
│   ├── middleware
│   │   ├── cors.ts             # CORS middleware
│   │   ├── errorHandler.ts      # Error handling middleware
│   │   └── validation.ts        # Request validation middleware
│   ├── routes
│   │   └── api.ts              # API routes setup
│   ├── services
│   │   └── emailService.ts      # Service for sending emails
│   ├── types
│   │   └── index.ts            # Type definitions for request and response
│   └── utils
│       └── logger.ts           # Logging utility
├── package.json                 # NPM configuration file
├── tsconfig.json                # TypeScript configuration file
├── .env.example                 # Example environment variables
├── .gitignore                   # Git ignore file
├── vercel.json                  # Vercel deployment configuration
└── README.md                    # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd email-api-service
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values, especially for email service credentials.

4. **Run the application:**
   ```bash
   npm start
   ```

5. **Access the API:**
   - The email sending endpoint can be accessed at `http://localhost:3000/api/send-email`.

## Usage Example

To send an email, make a POST request to the `/api/send-email` endpoint with the following JSON body:

```json
{
  "to": "recipient@example.com",
  "subject": "Hello from Email API",
  "message": "This is a test email."
}
```

## Deployment

This application can be deployed on Vercel. Ensure that your environment variables are set in the Vercel dashboard for proper functionality.

## License

This project is licensed under the MIT License.