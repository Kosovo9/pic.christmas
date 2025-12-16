import { TRPCError } from "@trpc/server";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstileToken(token: string, ip?: string): Promise<void> {
    const secret = process.env.TURNSTILE_SECRET_KEY;

    if (!secret) {
        console.warn("⚠️ TURNSTILE_SECRET_KEY is missing. Skipping validation (DEV only).");
        if (process.env.NODE_ENV === "production") {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Server misconfiguration: CAPTCHA secret missing",
            });
        }
        return;
    }

    try {
        const formData = new URLSearchParams();
        formData.append("secret", secret);
        formData.append("response", token);
        if (ip) formData.append("remoteip", ip);

        const res = await fetch(TURNSTILE_VERIFY_URL, {
            method: "POST",
            body: formData,
        });

        const data = await res.json() as { success: boolean; "error-codes"?: string[] };

        if (!data.success) {
            console.error("Turnstile validation failed:", data["error-codes"]);
            throw new TRPCError({
                code: "FORBIDDEN",
                message: "Security check failed. Please refresh and try again.",
            });
        }
    } catch (error) {
        if (error instanceof TRPCError) throw error;

        console.error("Turnstile connection error:", error);
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Unable to verify security token",
        });
    }
}
