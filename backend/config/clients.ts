
import dotenv from 'dotenv';
import Stripe from 'stripe';
import MercadoPagoConfig from 'mercadopago';
import IORedis from 'ioredis';
import { Queue } from 'bullmq';

dotenv.config();

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
