import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Basic health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'pet-match-backend' });
});

// Start server
const PORT = process.env.PORT || 3002;
httpServer.listen(PORT, () => {
    console.log(`🚀 PetMatch Backend running on port ${PORT}`);
});
