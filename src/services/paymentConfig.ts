export const PAYMENT_LINKS = {
    single: {
        mercadopago: "https://link.mercadopago.com.mx/studionexora",
        paypal: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YOUR_BUTTON_ID_SINGLE",
        stripe: "https://buy.stripe.com/test_SINGLE_PHOTO",
        lemonsqueezy: "https://store.lemonsqueezy.com/checkout/buy/variant_SINGLE"
    },
    family: {
        mercadopago: "https://link.mercadopago.com.mx/studionexora",
        paypal: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YOUR_BUTTON_ID_FAMILY",
        stripe: "https://buy.stripe.com/test_FAMILY_SESSION",
        lemonsqueezy: "https://store.lemonsqueezy.com/checkout/buy/variant_FAMILY"
    }
};

export type PaymentProvider = 'mercadopago' | 'paypal' | 'stripe' | 'lemonsqueezy';

export const getCheckoutUrl = (packageId: 'single' | 'family', provider: PaymentProvider): string => {
    const links = PAYMENT_LINKS[packageId];
    if (!links) return '#';
    return links[provider] || '#';
};
