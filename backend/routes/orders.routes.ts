import express from 'express';
import Order from '../models/Order';
import { generationQueue } from '../server';

const router = express.Router();

// @desc    Create a new order
// @route   POST /api/orders
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { packageId, config, originalImages } = req.body;

        // Basic server-side validation
        if (!packageId || !config || !originalImages || originalImages.length === 0) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Calculate amount based on package
        let amount = 9.99;
        if (packageId === 'couple') amount = 19.99;
        if (packageId === 'family') amount = 29.99;

        const order = await Order.create({
            packageId,
            config,
            originalImages,
            amount,
            status: 'pending_payment' // Initial status
        });

        // NOTE: In a real flow, we trigger generation AFTER payment webhook confirmation.
        // For now, we just create the order. The webhook will update status to 'paid' and add to queue.

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
