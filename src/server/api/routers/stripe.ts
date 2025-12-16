import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { stripe } from "@/lib/stripe";
import { transactions } from "@/db/schema";

const PACKAGES = {
    "10": { usd: 500, mxn: 9900 },   // 99.00 MXN
    "25": { usd: 1000, mxn: 19900 }, // 199.00 MXN
    "100": { usd: 3000, mxn: 49900 } // 499.00 MXN
} as const;

export const stripeRouter = createTRPCRouter({
    createCheckoutSession: protectedProcedure
        .input(z.object({
            currency: z.enum(["usd", "mxn"]),
            packageId: z.enum(["10", "25", "100"]),
        }))
        .mutation(async ({ ctx, input }) => {
            const priceInCents = PACKAGES[input.packageId][input.currency];
            const credits = parseInt(input.packageId);

            // Create a pending transaction record
            const [txn] = await ctx.db.insert(transactions).values({
                userId: ctx.session.userId,
                creditsAdded: credits,
                amount: priceInCents,
                currency: input.currency,
                status: "pending",
            }).returning();

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: input.currency,
                            product_data: {
                                name: `${credits} Christmas Credits`,
                                description: `Unlock ${credits} premium transformations`,
                                images: ["https://www.pic.christmas/logo.png"], // Placeholder
                            },
                            unit_amount: priceInCents,
                        },
                        quantity: 1,
                    },
                ],
                mode: "payment",
                success_url: `${process.env.NEXT_PUBLIC_APP_URL}/wizard?step=results&payment=success`,
                cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/wizard?step=credits`,
                metadata: {
                    userId: ctx.session.userId,
                    transactionId: txn.id,
                },
            });

            return { url: session.url };
        }),
});
