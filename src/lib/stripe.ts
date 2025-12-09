import Stripe from 'stripe';

// Cloudflare Pages build process does not have access to env vars, so we use a fallback to prevent build failure.
// The actual key will be present at runtime.
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_build_placeholder';

export const stripe = new Stripe(stripeKey, {
    apiVersion: '2025-11-17.clover' as any,
    typescript: true,
});
