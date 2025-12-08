
import { redis } from '../config/clients';

export class FreeModeService {
    static async initiateFreeMode(durationHours: number = 6) {
        if (!redis) {
            console.warn('⚠️ Redis not available for Free Mode. Using memory fallback (not persistent).');
            global.FREE_MODE_MEMORY = {
                active: true,
                expiry: Date.now() + durationHours * 60 * 60 * 1000
            };
            return this.checkFreeMode();
        }

        const startTime = Date.now();
        const durationMs = durationHours * 60 * 60 * 1000;
        const expiryTime = startTime + durationMs;

        // Store in Redis
        await redis.set('FREE_MODE_ACTIVE', 'true', 'EX', durationHours * 60 * 60);
        await redis.set('FREE_MODE_EXPIRY', expiryTime.toString());

        return {
            status: 'ACTIVE',
            expiresAt: new Date(expiryTime),
            hoursRemaining: durationHours,
            message: '🎉 FREE LAUNCH - 4-6 HOURS ONLY! Generate unlimited photos!'
        };
    }

    static async checkFreeMode() {
        let isActive: string | null = null;
        let expiry: string | null = null;

        if (redis) {
            isActive = await redis.get('FREE_MODE_ACTIVE');
            expiry = await redis.get('FREE_MODE_EXPIRY');
        } else {
            // Memory fallback
            const mem = (global as any).FREE_MODE_MEMORY;
            if (mem && mem.expiry > Date.now()) {
                isActive = 'true';
                expiry = mem.expiry.toString();
            }
        }

        if (!isActive || !expiry) {
            return {
                active: false,
                message: 'Free mode ended. Premium pricing active.'
            };
        }

        const remainingMs = parseInt(expiry) - Date.now();
        if (remainingMs <= 0) {
            return { active: false, message: 'Free mode ended.' };
        }

        const remainingMinutes = remainingMs / 1000 / 60;

        return {
            active: true,
            expiryTimestamp: parseInt(expiry),
            minutesRemaining: Math.floor(remainingMinutes),
            hoursRemaining: Math.floor(remainingMinutes / 60)
        };
    }
}
