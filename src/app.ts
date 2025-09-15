import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from './middleware/cors';
import { errorHandler } from './middleware/errorHandler';
import { setRoutes } from './routes/api';
import { ENVIRONMENT } from './config/environment';

const app = express();

// Middleware
app.use(cors);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: ENVIRONMENT.NODE_ENV 
  });
});

// Routes
app.use('/api', setRoutes());

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = ENVIRONMENT.PORT;

// For serverless (Vercel), export the app without listening
// For regular hosting, start the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${ENVIRONMENT.NODE_ENV}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
  });
}

export default app;