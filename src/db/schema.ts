import { pgTable, text, timestamp, integer, uuid, pgEnum, json } from "drizzle-orm/pg-core";

export const transformationStatusEnum = pgEnum("transformation_status", [
    "uploaded",
    "processing",
    "completed",
    "failed",
    "expired",
]);

export const transactionStatusEnum = pgEnum("transaction_status", [
    "pending",
    "paid",
    "failed",
    "refunded",
]);

export const userCredits = pgTable("user_credits", {
    userId: text("user_id").primaryKey(),
    creditsBalance: integer("credits_balance").default(0).notNull(),
    creditsUsed: integer("credits_used").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const transformations = pgTable("transformations", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    originalKey: text("original_key").notNull(),
    resultKeyA: text("result_key_a"),
    resultKeyB: text("result_key_b"),
    status: transformationStatusEnum("status").default("uploaded").notNull(),
    creditsUsed: integer("credits_used").default(1).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    expiresAt: timestamp("expires_at").notNull(),
});

export const transactions = pgTable("transactions", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    creditsAdded: integer("credits_added").notNull(),
    amount: integer("amount").notNull(), // in cents
    currency: text("currency").notNull(), // usd or mxn
    stripePaymentId: text("stripe_payment_id"),
    status: transactionStatusEnum("status").default("pending").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const auditLogs = pgTable("audit_logs", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id"),
    action: text("action").notNull(),
    metaJson: json("meta_json"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
