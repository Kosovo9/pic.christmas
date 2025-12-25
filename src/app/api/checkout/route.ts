import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-01-27-preview" as any,
});

export async function POST(req: Request) {
    try {
        const { packageId, email } = await req.json();

        let amount = 990; // Default $9.90
        let name = "Standard One-Shot";

        if (packageId === "gold") {
            amount = 2490;
            name = "Gold Collection";
        } else if (packageId === "diamond") {
            amount = 4999;
            name = "Diamond Premium";
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: name,
                            description: "AI Christmas Portrait Masterpiece",
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/cancel`,
            customer_email: email,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Checkout Error:", error);
        return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
    }
}
