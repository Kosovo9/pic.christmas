import express from 'express';
import PetOrder from '../models/PetOrder';

const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new Pet Order
// @access  Public (MVP)
router.post('/', async (req, res) => {
    try {
        const { petDetails, amount, originalPhoto, referralCode, email } = req.body;

        if (!originalPhoto || !amount) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const order = await PetOrder.create({
            petDetails,
            amount: Number(amount),
            originalPhoto,
            email,
            referralCode: referralCode || undefined,
            status: 'pending'
        });

        res.status(201).json(order);
    } catch (error: any) {
        console.error('Create Order Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/orders/:id
// @desc    Get Order by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const order = await PetOrder.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
