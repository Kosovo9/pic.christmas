
export type PaymentProvider = 'stripe' | 'paypal' | 'mercadopago' | 'lemonsqueezy';

/**
 * PAYMENT LINKS REGISTRY
 * 
 * INSTRUCTIONS:
 * 1. Go to your Payment Provider Dashboard (Stripe, Lemon Squeezy, etc.).
 * 2. Create a "Product" or "Payment Link" for each package (Single, Pack 3, Family, Group).
 * 3. Copy the generated URL (e.g., https://buy.stripe.com/...) and paste it below.
 */

export const PAYMENT_LINKS: Record<string, Record<PaymentProvider, string>> = {
  // Package ID: 'single' ($2)
  single: {
    stripe: 'https://buy.stripe.com/test_single_photo_link', // Replace with real Stripe Payment Link
    paypal: 'https://www.paypal.com/ncp/payment/SINGLE_ID',   // Replace with PayPal Button Link
    mercadopago: 'https://mpago.la/1a2b3c',                   // Replace with Mercado Pago Link
    lemonsqueezy: 'https://nexora.lemonsqueezy.com/buy/single-photo-variant' // Replace with Lemon Squeezy checkout link
  },
  
  // Package ID: 'pack3' ($5)
  pack3: {
    stripe: 'https://buy.stripe.com/test_pack_3_link',
    paypal: 'https://www.paypal.com/ncp/payment/PACK3_ID',
    mercadopago: 'https://mpago.la/4d5e6f',
    lemonsqueezy: 'https://nexora.lemonsqueezy.com/buy/pack-3-variant'
  },

  // Package ID: 'family' ($7)
  family: {
    stripe: 'https://buy.stripe.com/test_family_session_link',
    paypal: 'https://www.paypal.com/ncp/payment/FAMILY_ID',
    mercadopago: 'https://mpago.la/7g8h9i',
    lemonsqueezy: 'https://nexora.lemonsqueezy.com/buy/family-session-variant'
  },

  // Package ID: 'group' ($10)
  group: {
    stripe: 'https://buy.stripe.com/test_group_session_link',
    paypal: 'https://www.paypal.com/ncp/payment/GROUP_ID',
    mercadopago: 'https://mpago.la/0j1k2l',
    lemonsqueezy: 'https://nexora.lemonsqueezy.com/buy/group-session-variant'
  }
};

export const getPaymentUrl = (packageId: string, provider: PaymentProvider): string => {
  const packageLinks = PAYMENT_LINKS[packageId];
  if (!packageLinks) {
    console.error(`No payment links found for package: ${packageId}`);
    return '#';
  }
  return packageLinks[provider] || '#';
};
