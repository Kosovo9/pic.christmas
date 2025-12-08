
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
// ⚠️ SAFE REDIS INITIALIZATION
// If Redis fails (e.g. local dev without Docker), we export a mock or disconnected queue to prevent crash.

let redisConnection: IORedis | null = null;
let generationQueueExport: Queue | any = null;

try {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    // Create a lazy connection or handle error handlers
    redisConnection = new IORedis(redisUrl, {
        maxRetriesPerRequest: null,
        lazyConnect: true, // Don't crash immediately
        retryStrategy(times) {
            const delay = Math.min(times * 50, 2000);
            if (times > 3) {
                console.warn('[Redis] Connection failed. Processing will be disabled.');
                return null; // Stop retrying
            }
            return delay;
        },
    });

    redisConnection.on('error', (err) => {
        // Suppress unhandled error crashes
        console.warn('[Redis] Client Error (Non-Fatal):', err.message);
    });

    generationQueueExport = new Queue('image-generation', { connection: redisConnection });

} catch (error) {
    console.warn('[Redis] Initialization failed. Queue features disabled.');
    // Mock queue to prevent "undefined" errors in imports
    generationQueueExport = {
        add: async () => { console.log('[MockQueue] Job ignored (No Redis)'); }
    } as any;
}

// Replicate
import Replicate from 'replicate';
export const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN || '',
});

// Cloudinary
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
export { cloudinary };

// Supabase
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || ''; // Service role key ideally for backend
export const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export const redis = redisConnection;
export const generationQueue = generationQueueExport;
