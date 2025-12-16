import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getPresignedPutUrl, getPresignedGetUrl } from "@/lib/r2";
import { v4 as uuidv4 } from "uuid";

export const r2Router = createTRPCRouter({
    createUploadUrl: protectedProcedure
        .input(z.object({ contentType: z.string(), fileSize: z.number() }))
        .mutation(async ({ ctx, input }) => {
            // Validate mime type and size (max 10MB)
            const allowedMimes = ["image/jpeg", "image/png", "image/webp"];
            if (!allowedMimes.includes(input.contentType)) {
                throw new Error("Invalid file type");
            }
            if (input.fileSize > 10 * 1024 * 1024) {
                throw new Error("File too large");
            }

            const fileId = uuidv4();
            const ext = input.contentType.split("/")[1];
            const key = `users/${ctx.session.userId}/original/${fileId}.${ext}`;

            const url = await getPresignedPutUrl(key, input.contentType);
            return { url, key, fileId };
        }),
});
