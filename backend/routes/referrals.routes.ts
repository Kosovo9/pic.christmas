import express from 'express';
import Referral from '../models/Referral';
import referralConfig from '../../data/referral-config.json';

const router = express.Router();

// Generate unique referral code
function generateCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude confusing chars
    const length = referralConfig.code_length;
    let code = referralConfig.code_prefix;

    for (let i = 0; i < length - referralConfig.code_prefix.length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return code;
}

// @desc    Create a new referral code
// @route   POST /api/referrals/generate
// @access  Public
router.post('/generate', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user already has a code
        if (email) {
            const existing = await Referral.findOne({ email });
            if (existing) {
                return res.json({ code: existing.code, existing: true });
            }
        }

        // Generate unique code
        let code = generateCode();
        let exists = await Referral.findOne({ code });

        // Keep generating until we get a unique one
        while (exists) {
            code = generateCode();
            exists = await Referral.findOne({ code });
        }

        // Create referral
        const referral = await Referral.create({
            code,
            email: email || undefined,
            conversions: [],
            credits: 0
        });

        res.status(201).json({
            code: referral.code,
            credits: referral.credits,
            conversions: referral.conversions.length
        });
    } catch (error: any) {
        console.error('Generate Referral Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get referral stats by code
// @route   GET /api/referrals/:code
// @access  Public
router.get('/:code', async (req, res) => {
    try {
        const referral = await Referral.findOne({
            code: req.params.code.toUpperCase()
        });

        if (!referral) {
            return res.status(404).json({ message: 'Referral code not found' });
        }

        const conversions = referral.conversions.length;
        const progress = conversions % referralConfig.conversions_required;
        const creditsEarned = referral.credits;
        const earnings = referral.earnings || 0;

        res.json({
            code: referral.code,
            conversions,
            progress,
            creditsEarned,
            earnings,
            nextRewardAt: referralConfig.conversions_required - progress,
            config: {
                conversionsRequired: referralConfig.conversions_required,
                rewardCredits: referralConfig.reward_credits
            }
        });
    } catch (error: any) {
        console.error('Get Referral Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Validate referral code
// @route   POST /api/referrals/validate
// @access  Public
router.post('/validate', async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ message: 'Code required', valid: false });
        }

        const referral = await Referral.findOne({
            code: code.toUpperCase()
        });

        if (!referral) {
            return res.json({ valid: false, message: 'Invalid referral code' });
        }

        res.json({
            valid: true,
            code: referral.code,
            creditsAvailable: referral.credits
        });
    } catch (error: any) {
        console.error('Validate Referral Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Record conversion for referral code (called internally after payment)
// @route   POST /api/referrals/record-conversion
// @access  Internal (should be protected in production)
router.post('/record-conversion', async (req, res) => {
    try {
        const { code, orderId } = req.body;

        if (!code || !orderId) {
            return res.status(400).json({ message: 'Code and orderId required' });
        }

        const referral = await Referral.findOne({ code: code.toUpperCase() });

        if (!referral) {
            return res.status(404).json({ message: 'Referral not found' });
        }

        // Add conversion
        referral.conversions.push(orderId);

        // Check if earned a new credit
        if (referral.conversions.length % referralConfig.conversions_required === 0) {
            referral.credits += referralConfig.reward_credits;
        }

        await referral.save();

        res.json({
            code: referral.code,
            conversions: referral.conversions.length,
            credits: referral.credits,
            creditEarned: referral.conversions.length % referralConfig.conversions_required === 0
        });
    } catch (error: any) {
        console.error('Record Conversion Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Use a referral credit
// @route   POST /api/referrals/use-credit
// @access  Public
router.post('/use-credit', async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ message: 'Code required' });
        }

        const referral = await Referral.findOne({ code: code.toUpperCase() });

        if (!referral) {
            return res.status(404).json({ message: 'Referral not found' });
        }

        if (referral.credits < 1) {
            return res.status(400).json({
                message: 'No credits available',
                credits: referral.credits
            });
        }

        // Deduct credit
        referral.credits -= 1;
        await referral.save();

        res.json({
            success: true,
            creditsRemaining: referral.credits,
            message: 'Credit applied successfully'
        });
    } catch (error: any) {
        console.error('Use Credit Error:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
