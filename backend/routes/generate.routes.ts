
import express from 'express';
import { GenerationPipeline } from '../services/generationPipeline.service';
import { redis } from '../config/clients';

const router = express.Router();

// @route   POST /api/generate/face-locked
// @desc    Generate photo with "Nuclear" face-lock protocol
router.post('/face-locked', async (req, res) => {
    try {
        const { seedImageUrl, style, context, userId } = req.body;

        if (!seedImageUrl || !style) {
            return res.status(400).json({ success: false, message: 'Missing seedImageUrl or style' });
        }

        // Limit check using Redis (Rate Limit)
        if (redis && userId) {
            const count = await redis.incr(`generations:${userId}`);
            if (count === 1) await redis.expire(`generations:${userId}`, 3600); // 1 hour window
            // If Free Mode is active, maybe relaxed limits?
        }

        const result = await GenerationPipeline.generateRealisticPhoto(
            seedImageUrl,
            style,
            context || 'Christmas setting'
        );

        res.json(result);

    } catch (error: any) {
        console.error('Generation Error:', error);
        res.status(500).json({ success: false, error: 'Generation failed' });
    }
});

export default router;
