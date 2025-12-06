import express from 'express';
import Order from '../models/Order';
import Referral from '../models/Referral';
import { generationQueue } from '../server';
import pricingRules from '../../data/pricing-rules.json';
import referralConfig from '../../data/referral-config.json';

const router = express.Router();

// Calculate dynamic pricing
function calculatePrice(config: { adults: number; children: number; pets: number }) {
    const rules = pricingRules.christmas;

    // Start with base price for 1 adult
    let basePrice = rules.base_price;
    let extraAdults = 0;
    let extraChildren = 0;
    let extraPets = 0;

    // Calculate extras (base includes 1 adult)
    if (config.adults > 1) {
        extraAdults = (config.adults - 1) * rules.extra_adult;
    }

    if (config.children > 0) {
        extraChildren = config.children * rules.extra_child;
    }

    if (config.pets > 0) {
        extraPets = config.pets * rules.extra_pet;
    }

    const subtotal = basePrice + extraAdults + extraChildren + extraPets;

    return {
        basePrice,
        extraAdults,
        extraChildren,
        extraPets,
        subtotal,
        referralDiscount: 0,
        total: subtotal
    };
}

// @desc    Create a new order
// @route   POST /api/orders
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { packageId, config, originalImages, referralCode, useCredit } = req.body;

        // Basic server-side validation
        if (!packageId || !config || !originalImages || originalImages.length === 0) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Calculate dynamic pricing
        const pricingBreakdown = calculatePrice(config);
        let amount = pricingBreakdown.total;
        let usedCredit = false;

        // Handle referral code if provided
        if (referralCode) {
            const referral = await Referral.findOne({
                code: referralCode.toUpperCase()
            });

            if (!referral) {
                return res.status(400).json({ message: 'Invalid referral code' });
            }

            // If user wants to use credit and has credits available
            if (useCredit && referral.credits > 0) {
                // Free order with credit
                pricingBreakdown.referralDiscount = amount;
                amount = 0;
                usedCredit = true;
            }
        }

        const order = await Order.create({
            packageId,
            config,
            originalImages,
            amount,
            referralCode: referralCode?.toUpperCase(),
            pricingBreakdown,
            usedCredit,
            status: usedCredit ? 'paid' : 'pending_payment' // Free orders are immediately paid
        });

        // If free order with credit, deduct the credit and trigger generation
        if (usedCredit && referralCode) {
            const referral = await Referral.findOne({
                code: referralCode.toUpperCase()
            });

            if (referral && referral.credits > 0) {
                referral.credits -= 1;
                await referral.save();

                // Trigger image generation immediately for free order
                await generationQueue.add('generate-images', {
                    orderId: order._id,
                    config: order.config,
                    originalImages: order.originalImages,
                    packageId: order.packageId
                });
            }
        }

        res.status(201).json(order);
    } catch (error: any) {
        console.error('Create Order Error:', error);
        res.status(400).json({ message: error.message });
    }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public (should be protected in prod)
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
