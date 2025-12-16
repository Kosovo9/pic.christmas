import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { transformations, userCredits } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { getPresignedGetUrl } from "@/lib/r2";

// Mock Provider Logic inside Router for MVP Simplicity
async function mockProcess(originalKey: string): Promise<{ a: string; b: string }> {
    // Simulate AI delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // For P0, we just return the original key as the result 
    // In real life, we would call an external API and upload to R2
    // We'll pretend we generated A and B. 
    // Since we aren't actually generating new files in R2 here, 
    // we will reuse the originalKey for the signed URL generation to demonstrate flow
    // OR ideally, we'd copy the object in R2 to 'A' and 'B' paths.

    // Let's just return the originalKey for now to avoid R2 copy complexity in this file 
    // unless we want to use the AWS SDK copyObject.
    return { a: originalKey, b: originalKey };
}

import { verifyTurnstileToken } from "@/lib/turnstile";

export const transformationsRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({ originalKey: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 24);

            const [record] = await ctx.db.insert(transformations).values({
                userId: ctx.session.userId,
                originalKey: input.originalKey,
                status: "uploaded",
                expiresAt,
            }).returning();

            return record;
        }),

    start: protectedProcedure
        .input(z.object({
            id: z.string(),
            turnstileToken: z.string() // P0: Anti-bot
        }))
        .mutation(async ({ ctx, input }) => {
            // P0: Verify human
            await verifyTurnstileToken(
                input.turnstileToken,
                ctx.headers.get("x-forwarded-for") ?? undefined
            );

            const { id } = input;

            // Check credits
            const [user] = await ctx.db.select().from(userCredits).where(eq(userCredits.userId, ctx.session.userId));
            if (!user || user.creditsBalance < 1) {
                throw new Error("Insufficient credits");
            }

            // Deduct credit
            await ctx.db.update(userCredits)
                .set({
                    creditsBalance: user.creditsBalance - 1,
                    creditsUsed: user.creditsUsed + 1
                })
                .where(eq(userCredits.userId, ctx.session.userId));

            // mock process
            // Retrieve the record to get the originalKey
            const [tf] = await ctx.db.select().from(transformations).where(eq(transformations.id, id));
            if (!tf) throw new Error("Transformation not found");

            await ctx.db.update(transformations).set({ status: "processing" }).where(eq(transformations.id, id));

            const { a, b } = await mockProcess(tf.originalKey);

            // Validate: In real world, we'd generate new paths like users/ID/results/UUID/A.jpg
            // For MVP Mock, we are reusing the uploaded key to show image.
            const resultKeyA = a;
            const resultKeyB = b;

            await ctx.db.update(transformations).set({
                status: "completed",
                resultKeyA,
                resultKeyB
            }).where(eq(transformations.id, id));

            return { success: true };
        }),

    list: protectedProcedure.query(async ({ ctx }) => {
        const items = await ctx.db.select()
            .from(transformations)
            .where(eq(transformations.userId, ctx.session.userId))
            .orderBy(desc(transformations.createdAt));

        // Generate signed URLs for viewing
        return Promise.all(items.map(async (item) => {
            return {
                ...item,
                originalUrl: await getPresignedGetUrl(item.originalKey),
                resultAUrl: item.resultKeyA ? await getPresignedGetUrl(item.resultKeyA) : null,
                resultBUrl: item.resultKeyB ? await getPresignedGetUrl(item.resultKeyB) : null,
            };
        }));
    }),
});
