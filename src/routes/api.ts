import { Router } from 'express';
import EmailController from '../controllers/emailController';

const router = Router();
const emailController = new EmailController();

export const setRoutes = () => {
  // Basic email sending endpoint
  router.post('/send-email', emailController.sendEmail.bind(emailController));
  
  // Contact form endpoint (same format as Next.js version)
  router.post('/contact', emailController.sendContactForm.bind(emailController));
  
  return router;
};