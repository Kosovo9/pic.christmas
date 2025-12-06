import express from 'express';
import { geminiAssetsService } from '../services/geminiAssets.service';

const router = express.Router();

// @desc    Generate single affiliate asset/banner
// @route   POST /api/affiliate-assets/generate
router.post('/generate', async (req, res) => {
    const { productName, ctaText, style } = req.body;

    // Validation
    if (!productName || !ctaText) {
        return res.status(400).json({
            success: false,
            error: 'Missing required fields: productName, ctaText'
        });
    }

    try {
        const result = await geminiAssetsService.generateAsset(
            productName,
            ctaText,
            style
        );

        if (!result.success) {
            return res.status(500).json(result);
        }

        res.json(result);
    } catch (error: any) {
        console.error('[Affiliate Assets] Generation failed:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to generate asset'
        });
    }
});

// @desc    Generate multiple asset variations
// @route   POST /api/affiliate-assets/variations
router.post('/variations', async (req, res) => {
    const { productName, ctaText, count } = req.body;

    if (!productName || !ctaText) {
        return res.status(400).json({
            success: false,
            error: 'Missing required fields: productName, ctaText'
        });
    }

    try {
        const result = await geminiAssetsService.generateVariations(
            productName,
            ctaText,
            count || 3
        );

        if (!result.success) {
            return res.status(500).json(result);
        }

        res.json(result);
    } catch (error: any) {
        console.error('[Affiliate Assets] Variations failed:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to generate variations'
        });
    }
});

export default router;
