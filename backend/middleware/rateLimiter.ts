
import { rateLimit } from 'express-rate-limit';

/**
 * Strict Rate Limiter for AI Generation (Cost Control)
 * - Limits based on IP address
 * - Max 5 attempts per hour (enough for legitimate testing but blocks abuse)
 * - Custom error message
 */
export const generationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 create requests per hour
    message: {
        status: 429,
        error: "Too many generation attempts. Please wait an hour or upgrade to Premium for unlimited access."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * Global API Limiter (Standard DDoS Protection)
 * - Max 100 requests per 15 minutes
 */
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
