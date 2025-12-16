import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { preference } from "@/lib/mercadopago";
import { transactions } from "@/db/schema";

const PACKAGES = {
    "10": { price: 99, credits: 10 },
    "25": { price: 199, credits: 25 },
    "100": { price: 499, credits: 100 }
} as const;

export const mercadopagoRouter = createTRPCRouter({
    createPreference: protectedProcedure
        .input(z.object({
            packageId: z.enum(["10", "25", "100"]),
        }))
        .mutation(async ({ ctx, input }) => {
            const pkg = PACKAGES[input.packageId];

            // Create pending transaction
            const [txn] = await ctx.db.insert(transactions).values({
                userId: ctx.session.userId,
                creditsAdded: pkg.credits,
                amount: pkg.price * 100, // stored in cents
                currency: "mxn", // Mercado Pago defaults to MXN/Latam
                status: "pending",
            }).returning();

            const result = await preference.create({
                body: {
                    items: [
                        {
                            id: input.packageId,
                            title: `${pkg.credits} Christmas Credits`,
                            quantity: 1,
                            unit_price: pkg.price,
                            currency_id: "MXN",
                        },
                    ],
                    back_urls: {
                        success: `${process.env.NEXT_PUBLIC_APP_URL}/wizard?step=results&payment=success`,
                        failure: `${process.env.NEXT_PUBLIC_APP_URL}/wizard?step=credits`,
                        pending: `${process.env.NEXT_PUBLIC_APP_URL}/wizard?step=credits`,
                    },
                    auto_return: "approved",
                    external_reference: txn.id, // We use Transaction ID here
                    metadata: {
                        user_id: ctx.session.userId
                    }
                },
            });

            return { initPoint: result.init_point }; // The checkout URL
        }),
});
