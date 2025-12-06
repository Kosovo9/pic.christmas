import express from 'express';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiter for subscriptions (prevent spam)
const subscriptionLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 requests per IP
    message: { message: "Too many subscription attempts, please try again later." }
});

// Mock DB for MVP (Replace with real Marketing Collection or Klaviyo/Mailchimp integration)
// In a real implementation, you would save to 'Subscribers' collection
const subscribers: string[] = [];

// @desc    Subscribe to Newsletter / Waitlist
// @route   POST /api/email/subscribe
// @access  Public
router.post('/subscribe',
    subscriptionLimiter,
    [
        body('email').isEmail().withMessage('Please provide a valid email address').normalizeEmail()
    ],
    async (req: any, res: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email } = req.body;

        try {
            // Logic to save email
            // await Subscriber.create({ email });
            // For now, just log it as if it worked
            console.log(`[Marketing] New Subscriber: ${email}`);

            // TODO: Trigger "Welcome" email via Resend/SendGrid

            res.status(200).json({
                success: true,
                message: "Successfully subscribed to Pic.Christmas updates!"
            });
        } catch (error) {
            console.error("Subscription Error:", error);
            res.status(500).json({ message: "Server error subscribing user" });
        }
    }
);

export default router;
