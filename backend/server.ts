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
import { v2 as cloudinary } from 'cloudinary';
import { stripe } from './config/clients'; // Import strictly to verify connection if needed
import './workers/imageGeneration.worker'; // Start worker

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

// ... other imports ...

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

app.use(cors());
app.use(express.json({
  limit: '10mb', // 🚀 ELON 10X: Support Base64 Image Analysis
  verify: (req: any, res, buf) => {
    req.rawBody = buf;
  }
}));

// --- Routes ---


// ... 

app.use('/api/orders', ordersRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/referrals', referralsRoutes);
app.use('/api/prompts', promptsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/affiliate-assets', affiliateAssetsRoutes);
app.use('/api/email', emailRoutes);

app.get('/', (req, res) => {
  res.send('Pic.Christmas API is running 🎄 (All Features Active)');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('🔌 Connected to: MongoDB, Redis, Cloudinary, Stripe, MercadoPago');
  console.log('✨ Features: Orders, Payments, Referrals, AI Enhancement, Christmas Catalog, Affiliate Assets');
  console.log('👷 Worker: Image Generation Active');
});
