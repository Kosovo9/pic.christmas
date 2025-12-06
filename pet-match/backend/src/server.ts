import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002; // Port 3002 for PetMatch

// Middleware
app.set('trust proxy', 1);
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use('/api/', limiter);

// Redis & Queue Setup
const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: null
});

export const generationQueue = new Queue('pet-generation-queue', { connection });

// Database Connection
mongoose.connect(process.env.MONGODB_URI || '')
    .then(() => console.log('🐶 PetMatch DB Connected'))
    .catch(err => console.error('MongoDB Error:', err));

// Routes
import ordersRoutes from './routes/orders.routes';
import paymentsRoutes from './routes/payments.routes';
import './workers/petGenerator.worker'; // Start Worker

app.use('/api/orders', ordersRoutes);
app.use('/api/payments', paymentsRoutes);

app.get('/', (req, res) => res.send('PetMatch API 🐶 is running!'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
