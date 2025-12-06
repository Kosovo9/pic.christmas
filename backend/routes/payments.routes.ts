import express from 'express';
import Order from '../models/Order';
import { stripe, mpClient, generationQueue } from '../server';
import { Preference } from 'mercadopago';

const router = express.Router();

// @desc    Create Checkout Session (Stripe)
// @route   POST /api/payments/create-intent
router.post('/create-intent', async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Pic.Christmas - ${order.packageId.toUpperCase()} Package`,
                            description: 'Professional AI Christmas Photos',
                            images: ['https://pic.christmas/og-image.jpg'], // Optional: Add real image
                        },
                        unit_amount: Math.round(order.amount * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success?orderId=${order._id}`,
            cancel_url: `${process.env.FRONTEND_URL}/?canceled=true`,
            metadata: {
                orderId: order._id.toString()
            },
        });

        res.json({
            url: session.url,
            provider: 'stripe'
        });
    } catch (error: any) {
        console.error('Stripe Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create Preference (MercadoPago)
// @route   POST /api/payments/create-preference
router.post('/create-preference', async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        const preference = new Preference(mpClient);

        const result = await preference.create({
            body: {
                items: [
                    {
                        id: order.packageId,
                        title: `Pic.Christmas - ${order.packageId.toUpperCase()}`,
                        quantity: 1,
                        unit_price: order.amount
                    }
                ],
                external_reference: order._id.toString(),
                back_urls: {
                    success: `${process.env.FRONTEND_URL}/success`,
                    failure: `${process.env.FRONTEND_URL}/failure`,
                    pending: `${process.env.FRONTEND_URL}/pending`
                },
                auto_return: 'approved',
            }
        });

        res.json({
            preferenceId: result.id,
            initPoint: result.init_point, // or sandbox_init_point for testing
            provider: 'mercadopago'
        });
    } catch (error: any) {
        console.error('MercadoPago Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// @desc    Stripe Webhook
// @route   POST /api/payments/webhook
router.post('/webhook', async (req: any, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        if (!endpointSecret) throw new Error('Missing Stripe Webhook Secret');
        event = stripe.webhooks.constructEvent(req.rawBody, sig as string, endpointSecret);
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const orderId = session.metadata.orderId;

            console.log(`Checkout Session for order ${orderId} was successful!`);

            try {
                const order = await Order.findById(orderId);
                if (order) {
                    // ...
                    console.log(`Checkout Session for order ${orderId} was successful!`);

                    try {
                        const order = await Order.findById(orderId);
                        if (order) {
                            order.status = 'paid';
                            order.paymentId = session.payment_intent as string;
                            order.paymentProvider = 'stripe';
                            // Capture email from Stripe Customer Details
                            if (session.customer_details?.email) {
                                order.email = session.customer_details.email;
                            }
                            await order.save();
                            // Credit Affiliate Integration 💰 (35% Commission)
                            if (order.referralCode) {
                                try {
                                    const Referral = require('../models/Referral').default;
                                    const referrer = await Referral.findOne({ code: order.referralCode });
                                    if (referrer) {
                                        const commission = order.amount * 0.35;
                                        referrer.earnings = (referrer.earnings || 0) + commission;
                                        referrer.usageCount = (referrer.usageCount || 0) + 1;
                                        await referrer.save();
                                        console.log(`💰 Affiliate Commission credited: $${commission} to code ${order.referralCode}`);
                                    }
                                } catch (refError) {
                                    console.error('Failed to credit affiliate:', refError);
                                }
                            }

                            // Trigger Image Generation Job
                            const job = await generationQueue.add('generate-images', {
                                orderId: order._id,
                                config: order.config,
                                originalImages: order.originalImages,
                                packageId: order.packageId
                            });

                            console.log(`Job added to queue: ${job.id}`);
                        }
                    } catch (err) {
                        console.error('Error updating order/queue:', err);
                    }
                    break;

        case 'payment_intent.succeeded':
            // Legacy support or if we use Elements elsewhere
            const paymentIntent = event.data.object;
            if (!paymentIntent.metadata.orderId) break;

            const oldOrderId = paymentIntent.metadata.orderId;
            // ... (Existing logic can stay or be redundant, safer to keep for robust handling)
            // For brevity and clarity in this specific migration, we focus on the checkout session
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.send();
});

export default router;
