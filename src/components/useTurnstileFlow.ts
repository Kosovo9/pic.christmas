"use client";

import { useRef, useState } from "react";

export function useTurnstileFlow() {
    const tokenRef = useRef<string>("");
    const [verifying, setVerifying] = useState(false);

    const setToken = (t: string) => {
        tokenRef.current = t;
    };

    // Ejecuta Turnstile y espera token (con retry 1 vez)
    const run = async (opts: { exec: () => void; reset: () => void }) => {
        setVerifying(true);

        const waitToken = () =>
            new Promise<string>((resolve, reject) => {
                const started = Date.now();
                const t = setInterval(() => {
                    if (tokenRef.current) {
                        clearInterval(t);
                        resolve(tokenRef.current);
                    }
                    if (Date.now() - started > 8000) {
                        clearInterval(t);
                        reject(new Error("Turnstile timeout"));
                    }
                }, 50);
            });

        try {
            tokenRef.current = "";
            opts.exec();
            const token = await waitToken();
            return token;
        } catch {
            // retry una vez
            try {
                console.warn("Turnstile timeout, retrying...");
                tokenRef.current = "";
                opts.reset();
                opts.exec();
                const token = await waitToken();
                return token;
            } finally {
                setVerifying(false);
            }
        } finally {
            setVerifying(false);
        }
    };

    return { verifying, setToken, run };
}
