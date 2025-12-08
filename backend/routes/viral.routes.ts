
import express from 'express';
import { FreeModeService } from '../services/freeMode.service';
import { ReferralService } from '../services/referral.service';

const router = express.Router();

// --- FREE MODE ENDPOINTS ---

// @desc    Check Free Mode Status
// @route   GET /api/viral/free-mode/status
router.get('/free-mode/status', async (req, res) => {
    try {
        const status = await FreeModeService.checkFreeMode();
        res.json(status);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to check status' });
    }
});

// @desc    Activate Free Mode (Admin protected in real app, open for this launch script?)
//          Let's verify a simple secret or keep it open for "Launch Day".
// @route   POST /api/viral/free-mode/activate
router.post('/free-mode/activate', async (req, res) => {
    try {
        const { duration } = req.body;
        const result = await FreeModeService.initiateFreeMode(duration || 6);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to activate' });
    }
});


// --- REFERRAL ENDPOINTS ---

// @desc    Track a share attempt
// @route   POST /api/viral/referral/track
router.post('/referral/track', async (req, res) => {
    try {
        const { userId, platform, tier } = req.body;
        const result = await ReferralService.trackShare(userId, platform, tier);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// @desc    Verify share and grant reward
// @route   POST /api/viral/referral/verify
router.post('/referral/verify', async (req, res) => {
    try {
        const { userId, platform } = req.body;
        const result = await ReferralService.verifyShare(userId, platform);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
