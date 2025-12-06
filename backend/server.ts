import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import ordersRoutes from './routes/orders.routes';
import paymentsRoutes from './routes/payments.routes';
import referralsRoutes from './routes/referrals.routes';
import promptsRoutes from './routes/prompts.routes';
import aiRoutes from './routes/ai.routes';
import { v2 as cloudinary } from 'cloudinary';
import Stripe from 'stripe';
import MercadoPagoConfig, { Preference } from 'mercadopago';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

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

// Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia' as any,
  typescript: true,
});

// Mercado Pago
const mpAccessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN || '';
export const mpClient = new MercadoPagoConfig({ accessToken: mpAccessToken });

// Redis & BullMQ
const redisConnection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null
});

export const generationQueue = new Queue('image-generation', { connection: redisConnection });

// --- Middleware ---
app.use(cors());
app.use(express.json({
  verify: (req: any, res, buf) => {
    req.rawBody = buf;
  }
}));

// --- Routes ---
app.use('/api/orders', ordersRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/referrals', referralsRoutes);
app.use('/api/prompts', promptsRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send('Pic.Christmas API is running 🎄 (All Features Active)');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('🔌 Connected to: MongoDB, Redis, Cloudinary, Stripe, MercadoPago');
  console.log('✨ Features: Orders, Payments, Referrals, AI Enhancement, Christmas Catalog');
});
