import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import PetOrder from '../models/PetOrder';
import { generationQueue } from '../server';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-11-20.acacia' });

// @route   POST /api/payments/create-session
// @desc    Create Stripe Checkout Session
router.post('/create-session', async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await PetOrder.findById(orderId);

        if (!order) return res.status(404).json({ message: 'Order not found' });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `PetMatch Portrait (${order.petDetails.theme})`,
                        description: `AI Generation for ${order.petDetails.name} the ${order.petDetails.breed}`,
                        images: ['https://pic.christmas/pet-match-logo.png'], // TODO: Real logo
                    },
                    unit_amount: Math.round(order.amount * 100),
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success?orderId=${order._id}`,
            cancel_url: `${process.env.FRONTEND_URL}/?canceled=true`,
            metadata: {
                orderId: order._id.toString(),
                type: 'pet_match'
            }
        });

        res.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe Session Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/payments/webhook
// @desc    Stripe Webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig as string, process.env.STRIPE_WEBHOOK_SECRET || '');
    } catch (err: any) {
        console.error(`Webhook Signature Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;
        const orderId = session.metadata?.orderId;
        const type = session.metadata?.type;

        if (orderId && type === 'pet_match') {
            console.log(`✅ PetMatch Payment Success: ${orderId}`);

            const order = await PetOrder.findById(orderId);
            if (order) {
                order.status = 'paid';
                order.paymentId = session.payment_intent;
                if (session.customer_details?.email) {
                    order.email = session.customer_details.email;
                }
                await order.save();

                // 🚀 Trigger AI Worker
                await generationQueue.add('generate-pet', {
                    orderId: order._id,
                    petDetails: order.petDetails,
                    originalPhoto: order.originalPhoto
                });
                console.log(`🎨 Added to Queue: ${order._id}`);
            }
        }
    }

    res.json({ received: true });
});

export default router;
