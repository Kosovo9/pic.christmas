type TurnstileVerifyResponse = {
    success: boolean;
    "error-codes"?: string[];
    challenge_ts?: string;
    hostname?: string;
    action?: string;
    cdata?: string;
};

export async function verifyTurnstileToken(opts: {
    token: string;
    remoteIp?: string;
}): Promise<{ ok: boolean; errors?: string[] }> {
    try {
        const secret = process.env.TURNSTILE_SECRET_KEY;

        if (!secret) return { ok: false, errors: ["TURNSTILE_SECRET_KEY_missing"] };
        if (!opts.token) return { ok: false, errors: ["turnstile_token_missing"] };

        const form = new FormData();
        form.append("secret", secret);
        form.append("response", opts.token);
        if (opts.remoteIp) form.append("remoteip", opts.remoteIp);

        const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            body: form,
        });

        if (!res.ok) return { ok: false, errors: ["turnstile_verify_http_error"] };

        const data = (await res.json()) as TurnstileVerifyResponse;
        return { ok: Boolean(data.success), errors: data["error-codes"] };
    } catch (e) {
        console.error("Turnstile verification error:", e);
        return { ok: false, errors: ["internal_error"] };
    }
}
