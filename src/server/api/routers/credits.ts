import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { userCredits } from "@/db/schema";
import { eq } from "drizzle-orm";

export const creditsRouter = createTRPCRouter({
    getBalance: protectedProcedure.query(async ({ ctx }) => {
        const [user] = await ctx.db
            .select()
            .from(userCredits)
            .where(eq(userCredits.userId, ctx.session.userId));

        return user ? user.creditsBalance : 0;
    }),

    addInitialCredits: protectedProcedure.mutation(async ({ ctx }) => {
        const existing = await ctx.db
            .select()
            .from(userCredits)
            .where(eq(userCredits.userId, ctx.session.userId));

        if (existing.length === 0) {
            await ctx.db.insert(userCredits).values({
                userId: ctx.session.userId,
                creditsBalance: 3, // P0 Gift
                creditsUsed: 0,
            });
        }
        return { success: true };
    }),
});
