import { NextResponse } from "next/server";
// Stripe removed as per user request

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

        // Stripe checkout is disabled. Use PayPal or Mercado Pago.
        return NextResponse.json({ error: "Stripe is disabled. Please use PayPal or Mercado Pago." }, { status: 400 });
    } catch (error) {
        console.error("Checkout Error:", error);
        return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
    }
}
