import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { S3Client, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import * as schema from "../src/db/schema";
import { lt, and, eq, not } from "drizzle-orm";

console.log("Running Cleanup Cron...");

const conn = postgres(process.env.DATABASE_URL!);
const db = drizzle(conn, { schema });

const r2 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

async function main() {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago

    // Find expired items not yet marked expired
    const expiredItems = await db
        .select()
        .from(schema.transformations)
        .where(
            and(
                lt(schema.transformations.createdAt, cutoff),
                not(eq(schema.transformations.status, "expired"))
            )
        )
        .limit(50); // Batch size

    if (expiredItems.length === 0) {
        console.log("No expired items found.");
        process.exit(0);
    }

    console.log(`Found ${expiredItems.length} expired items.`);

    const keysToDelete: string[] = [];

    for (const item of expiredItems) {
        if (item.originalKey) keysToDelete.push(item.originalKey);
        if (item.resultKeyA) keysToDelete.push(item.resultKeyA);
        if (item.resultKeyB) keysToDelete.push(item.resultKeyB);
    }

    // Delete from R2
    if (keysToDelete.length > 0) {
        // Chunk into 1000s if needed, but we have limit 50 here
        await r2.send(new DeleteObjectsCommand({
            Bucket: process.env.R2_BUCKET,
            Delete: {
                Objects: keysToDelete.map(k => ({ Key: k })),
                Quiet: true,
            }
        }));
        console.log(`Deleted ${keysToDelete.length} files from R2.`);
    }

    // Mark DB status
    for (const item of expiredItems) {
        await db
            .update(schema.transformations)
            .set({ status: "expired" })
            .where(eq(schema.transformations.id, item.id));
    }

    console.log("Cleanup complete.");
    process.exit(0);
}

main().catch(console.error);
