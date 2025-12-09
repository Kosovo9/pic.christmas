import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // 🛡️ SECURITY HEADERS (Iron Dome)
    const headers = response.headers;

    // 1. Anti-Clickjacking (X-Frame-Options)
    headers.set('X-Frame-Options', 'DENY');

    // 2. Anti-MIME Sniffing
    headers.set('X-Content-Type-Options', 'nosniff');

    // 3. Referrer Policy (Privacy)
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // 4. Strict Transport Security (HSTS) - Force HTTPS
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

    // 5. Content Security Policy (Basic) - Prevent XSS
    // Note: Strict CSP can break scripts if not careful (e.g. inline scripts, analytics). 
    // We add a permissive one for now to block obvious malicious external loads.
    headers.set(
        'Content-Security-Policy',
        "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data: blob:;"
    );

    // 6. Permissions Policy
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    return response;
}

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
}
