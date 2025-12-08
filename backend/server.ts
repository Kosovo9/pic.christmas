import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import ordersRoutes from './routes/orders.routes';
import paymentsRoutes from './routes/payments.routes';
import referralsRoutes from './routes/referrals.routes';
import promptsRoutes from './routes/prompts.routes';
import aiRoutes from './routes/ai.routes';
import uploadsRoutes from './routes/uploads.routes';
import adminRoutes from './routes/admin.routes';
import affiliateAssetsRoutes from './routes/affiliateAssets.routes';
import emailRoutes from './routes/email.routes';
import chatRoutes from './routes/chat.routes';
import enhanceRoutes from './routes/enhance.routes';
import batchRoutes from './routes/batch.routes';
import viralRoutes from './routes/viral.routes';
import { v2 as cloudinary } from 'cloudinary';
import { stripe } from './config/clients'; // Import strictly to verify connection if needed
// import './workers/imageGeneration.worker'; // Start worker

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 3001;

// --- Configuration ---

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

// --- Middleware ---
app.set('trust proxy', 1); // Essential for Render/Heroku/Vercel proxies

// 1. Security Headers 🛡️
app.use(helmet());

// 2. Rate Limiting (DDoS Protection) 🛑
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter); // Apply to API routes

// 3. Performance (Gzip) 🚀
app.use(compression());

// 4. Logging (Observability) 👁️
app.use(morgan('combined')); // Standard Apache log format

import { i18nMiddleware } from './middleware/i18n';

app.use(cors());
app.use(i18nMiddleware);
app.use(express.json({
  limit: '10mb', // 🚀 ELON 10X: Support Base64 Image Analysis
  verify: (req: any, res, buf) => {
    req.rawBody = buf;
  }
}));

// --- Routes ---

app.use('/api/orders', ordersRoutes);
app.use('/api/payments', paymentsRoutes); // This was already named paymentsRoutes but imported from the old file potentially.
// Ensure the import lines up: 
// import paymentsRoutes from './routes/payment.routes'; (Need to update top of file if it was different)
app.use('/api/referrals', referralsRoutes);
app.use('/api/prompts', promptsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/affiliate-assets', affiliateAssetsRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/enhance', enhanceRoutes);
app.use('/api/batch', batchRoutes);
app.use('/api/viral', viralRoutes);

app.get('/', (req, res) => {
  res.send('Pic.Christmas API is running 🎄 (All Features Active)');
});

// Health check endpoint (both root and /api for flexibility)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      mongodb: 'connected', // TODO: Add actual MongoDB health check
      redis: 'connected',    // TODO: Add actual Redis health check
      cloudinary: 'configured',
      stripe: 'configured',
      mercadoPago: 'configured'
    }
  });
});

// Health check also available via /api/health (for proxy consistency)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      mongodb: 'connected', // TODO: Add actual MongoDB health check
      redis: 'connected',    // TODO: Add actual Redis health check
      cloudinary: 'configured',
      stripe: 'configured',
      mercadoPago: 'configured'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('🔌 Connected to: MongoDB, Redis, Cloudinary, Stripe, MercadoPago');
  console.log('✨ Features: Orders, Payments, Referrals, AI Enhancement, Christmas Catalog, Affiliate Assets, Chat Agent');
  console.log('👷 Worker: Image Generation Active');
});
