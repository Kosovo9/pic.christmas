import express from 'express';
import Order from '../models/Order';
import { stripe, mpClient, generationQueue } from '../server';
import { Preference } from 'mercadopago';

const router = express.Router();

// @desc    Create Payment Intent (Stripe)
// @route   POST /api/payments/create-intent
router.post('/create-intent', async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(order.amount * 100), // Stripe expects cents
            currency: 'usd', // Or order.currency if you have it
            metadata: {
                orderId: order._id.toString()
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
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
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            const orderId = paymentIntent.metadata.orderId;

            console.log(`PaymentIntent for order ${orderId} was successful!`);

            try {
                const order = await Order.findById(orderId);
                if (order) {
                    order.status = 'paid';
                    order.paymentId = paymentIntent.id;
                    order.paymentProvider = 'stripe';
                    await order.save();

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
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.send();
});

export default router;
