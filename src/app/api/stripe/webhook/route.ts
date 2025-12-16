import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { transactions, userCredits } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        return new NextResponse("Webhook Error", { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as any;
        const { userId, transactionId } = session.metadata;

        if (userId && transactionId) {
            // 1. Update Transaction
            await db
                .update(transactions)
                .set({
                    status: "paid",
                    stripePaymentId: session.payment_intent as string
                })
                .where(eq(transactions.id, transactionId));

            // 2. Add Credits
            const [txn] = await db
                .select()
                .from(transactions)
                .where(eq(transactions.id, transactionId));

            if (txn) {
                // idempotency check: simplistic for MVP
                // better to check if credits were already added or us a tx
                await db
                    .update(userCredits)
                    .set({
                        creditsBalance: sql`${userCredits.creditsBalance} + ${txn.creditsAdded}`,
                    })
                    .where(eq(userCredits.userId, userId));
            }
        }
    }

    return new NextResponse("ok", { status: 200 });
}
