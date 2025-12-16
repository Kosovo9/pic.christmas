"use client";

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";

declare global {
    interface Window {
        turnstile?: {
            render: (el: HTMLElement, opts: any) => string;
            execute: (widgetId: string, opts?: any) => void;
            reset: (widgetId: string) => void;
            remove: (widgetId: string) => void;
        };
        __turnstileOnload?: () => void;
    }
}

type Props = {
    siteKey: string;
    action?: string; // opcional, para analytics
    className?: string;
    onToken: (token: string) => void;
    onError?: (msg: string) => void;
};

export type TurnstileRef = {
    execute: () => void;
    reset: () => void;
};

// Turnstile Invisible/Managed gate
export const TurnstileGate = forwardRef<TurnstileRef, Props>(({
    siteKey,
    action = "default",
    className,
    onToken,
    onError,
}, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const widgetIdRef = useRef<string | null>(null);
    const [ready, setReady] = useState(false);

    useImperativeHandle(ref, () => ({
        execute: () => {
            if (!ready || !widgetIdRef.current || !window.turnstile) {
                onError?.("Turnstile aún no está listo");
                return;
            }
            window.turnstile.execute(widgetIdRef.current);
        },
        reset: () => {
            if (!widgetIdRef.current || !window.turnstile) return;
            window.turnstile.reset(widgetIdRef.current);
        }
    }));

    useEffect(() => {
        if (!siteKey) {
            onError?.("Falta NEXT_PUBLIC_TURNSTILE_SITE_KEY");
            return;
        }

        const ensureScript = () =>
            new Promise<void>((resolve, reject) => {
                if (window.turnstile) return resolve();

                // si ya se está cargando
                const existing = document.querySelector<HTMLScriptElement>(
                    'script[data-turnstile="true"]'
                );
                if (existing) {
                    const t = setInterval(() => {
                        if (window.turnstile) {
                            clearInterval(t);
                            resolve();
                        }
                    }, 50);
                    setTimeout(() => {
                        clearInterval(t);
                        reject(new Error("Turnstile script timeout"));
                    }, 10000);
                    return;
                }

                window.__turnstileOnload = () => resolve();

                const s = document.createElement("script");
                s.src =
                    "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
                s.async = true;
                s.defer = true;
                s.dataset.turnstile = "true";
                s.onload = () => {
                    // algunas veces onload dispara antes de window.turnstile
                    const t = setInterval(() => {
                        if (window.turnstile) {
                            clearInterval(t);
                            resolve();
                        }
                    }, 50);
                    setTimeout(() => {
                        clearInterval(t);
                        reject(new Error("Turnstile init timeout"));
                    }, 5000);
                };
                s.onerror = () => reject(new Error("No se pudo cargar Turnstile"));
                document.head.appendChild(s);
            });

        let alive = true;

        (async () => {
            try {
                await ensureScript();
                if (!alive) return;

                if (!containerRef.current) return;
                // Render una sola vez
                if (!widgetIdRef.current) {
                    widgetIdRef.current = window.turnstile!.render(containerRef.current, {
                        sitekey: siteKey,
                        // “managed” por defecto; para hacerlo realmente invisible, el dashboard puede estar en “Invisible”
                        // y aquí seguimos renderizando en un div oculto.
                        callback: (token: string) => onToken(token),
                        "error-callback": () => onError?.("Turnstile error"),
                        "expired-callback": () => onError?.("Turnstile expiró, reintenta"),
                        action,
                    });
                }
                setReady(true);
            } catch (e: any) {
                onError?.(e?.message ?? "Turnstile no disponible");
            }
        })();

        return () => {
            alive = false;
            // limpieza opcional: si navegas mucho, puedes remover
            // if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current);
        };
    }, [siteKey, action, onToken, onError]);

    return (
        <div className={className}>
            {/* contenedor oculto, cero fricción */}
            <div ref={containerRef} style={{ display: "none" }} />
        </div>
    );
});

TurnstileGate.displayName = "TurnstileGate";
