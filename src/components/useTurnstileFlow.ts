"use client";

import { useRef, useState } from "react";

export function useTurnstileFlow() {
    const tokenRef = useRef<string>("");
    const [verifying, setVerifying] = useState(false);

    const setToken = (t: string) => {
        tokenRef.current = t;
    };

    const run = async (opts: { exec: () => void; reset: () => void }) => {
        // If it was somehow stuck in verifying, reset flag
        setVerifying(true);

        const waitToken = () =>
            new Promise<string>((resolve, reject) => {
                const started = Date.now();
                const t = setInterval(() => {
                    if (tokenRef.current) {
                        clearInterval(t);
                        resolve(tokenRef.current);
                    }
                    if (Date.now() - started > 15000) { // Increased timeout to 15s
                        clearInterval(t);
                        reject(new Error("Turnstile timeout: Took longer than 15s"));
                    }
                }, 100);
            });

        try {
            tokenRef.current = "";
            // Always reset before execute to avoid 'already executing' error from CF
            // This is the critical fix for "Call to execute() on a widget that is already executing"
            try { opts.reset(); } catch (e) { console.warn("Reset failed", e); }

            // Short delay to ensure reset processed by DOM
            await new Promise(r => setTimeout(r, 200));

            opts.exec();

            const token = await waitToken();
            return token;
        } catch (e) {
            console.warn("Turnstile first attempt failed, retrying...", e);
            // Retry logic
            try {
                tokenRef.current = "";
                try { opts.reset(); } catch (e) { }
                await new Promise(r => setTimeout(r, 500));

                opts.exec();
                const token = await waitToken();
                return token;
            } catch (retryError) {
                console.error("Turnstile retry failed", retryError);
                throw retryError;
            } finally {
                setVerifying(false);
            }
        } finally {
            setVerifying(false);
        }
    };

    return { verifying, setToken, run };
}
