
import express from 'express';
import { FaceRestorationService } from '../services/faceRestoration.service';

const router = express.Router();

// @desc    Restore/Enhance Faces in an Image
// @route   POST /api/enhance/face-restoration
router.post('/face-restoration', async (req, res) => {
    try {
        const { imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ message: 'imageUrl is required' });
        }

        const enhancedUrl = await FaceRestorationService.restoreFace(imageUrl);

        res.json({
            success: true,
            originalUrl: imageUrl,
            enhancedUrl: enhancedUrl
        });

    } catch (error: any) {
        res.status(500).json({ message: 'Face restoration failed', error: error.message });
    }
});

import { UpscalingService } from '../services/upscaling.service';

// @desc    Upscale Image to 4K
// @route   POST /api/enhance/upscale
router.post('/upscale', async (req, res) => {
    try {
        const { imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ message: 'imageUrl is required' });
        }

        const upscaledUrl = await UpscalingService.upscaleImage(imageUrl);

        res.json({
            success: true,
            originalUrl: imageUrl,
            upscaledUrl: upscaledUrl
        });

    } catch (error: any) {
        res.status(500).json({ message: 'Upscaling failed', error: error.message });
    }
});

import { BackgroundMagicService } from '../services/backgroundMagic.service';

// @desc    Remove/Replace Background
// @route   POST /api/enhance/background-magic
router.post('/background-magic', async (req, res) => {
    try {
        const { imageUrl, prompt } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ message: 'imageUrl is required' });
        }

        const result = await BackgroundMagicService.processBackground(imageUrl, prompt);

        res.json({
            success: true,
            originalUrl: imageUrl,
            ...result
        });

    } catch (error: any) {
        res.status(500).json({ message: 'Background magic failed', error: error.message });
    }
});

import { PortraitOptimizationService } from '../services/portraitOptimization.service';

// @desc    Optimize Portrait (Skin, Eyes, etc)
// @route   POST /api/enhance/portrait-optimize
router.post('/portrait-optimize', async (req, res) => {
    try {
        const { imageUrl, intensity } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ message: 'imageUrl is required' });
        }

        const optimizedUrl = await PortraitOptimizationService.optimizePortrait(imageUrl, intensity || 50);

        res.json({
            success: true,
            originalUrl: imageUrl,
            optimizedUrl: optimizedUrl
        });

    } catch (error: any) {
        res.status(500).json({ message: 'Portrait optimization failed', error: error.message });
    }
});

export default router;
