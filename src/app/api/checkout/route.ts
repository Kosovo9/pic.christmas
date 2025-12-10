import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { price, formatId, formatName, quantity, prompt } = body;

        if (!price || !formatId) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
        }

        // Create Checkout Session with multiple payment methods
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'paypal'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Pic.Christmas - ${formatName} (${formatId})`,
                            description: `AI Generation for: ${prompt.substring(0, 50)}...`,
                            images: ['https://pic.christmas/og-image.jpg'], // Fallback image
                        },
                        unit_amount: Math.round(price * 100 / quantity), // Price per unit in cents
                    },
                    quantity: quantity,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://pic.christmas'}/success?session_id={CHECKOUT_SESSION_ID}&prompt=${encodeURIComponent(prompt)}&format=${formatId}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://pic.christmas'}/generate`,
            metadata: {
                prompt,
                formatId,
                quantity,
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
