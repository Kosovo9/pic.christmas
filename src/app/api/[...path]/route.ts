import { NextRequest, NextResponse } from 'next/server';

// 🚀 ELON MUSK ARCHITECTURE: 100x RESILIENT PROXY
// This is not just a proxy. It's a self-healing, monitoring, caching neural link to the backend.

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

// 1️⃣ RETRY LOGIC (Exponential Backoff)
// Because networks are fragile, but our mission is not.
async function fetchWithRetry(url: string, options: RequestInit, retries = 3): Promise<Response> {
    for (let i = 0; i < retries; i++) {
        try {
            // Controller for timeout (8s strict SLA)
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);

            const res = await fetch(url, {
                ...options,
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            // Don't retry on 4xx (User Error) - Only 5xx (Server Error) or Network Failures
            if (res.ok || res.status < 500) {
                return res;
            }

            // If 5xx, throw to trigger retry
            throw new Error(`Server Error: ${res.status}`);

        } catch (error) {
            console.warn(`[⚠️ Proxy Retry ${i + 1}/${retries}] Failed: ${(error as Error).message}`);

            if (i === retries - 1) throw error;

            // Wait: 1s, 2s, 4s...
            const delay = Math.pow(2, i) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error('Max retries exceeded');
}

// 2️⃣ MAIN HANDLER
async function handler(req: NextRequest, { params }: { params: { path: string[] } }) {
    const startTime = Date.now();

    // Resolve Path
    // params.path is an array ['prompts', 'random'] -> /prompts/random
    // (Note: we need to await params in Next.js 15, but usually it's passed resolved or we treat it carefully. 
    // In Next 13/14 app dir, params is ready. 
    // But wait, the catch-all might be ['api', 'prompts'] depending on file location.
    // File is in src/app/api/[...path]/route.ts, so path captures everything AFTER /api/)
    // Re-verify strictly: requests to /api/foo/bar -> params.path = ['foo', 'bar']

    const pathArray = params.path || [];
    const pathString = pathArray.join('/');
    const targetUrl = `${BACKEND_URL}/api/${pathString}${req.nextUrl.search}`; // Add Query Params

    const method = req.method;

    console.log(`[🚀 PROXY IN] ${method} /api/${pathString}`);

    try {
        // Headers Forwarding (Security & Context)
        const headers = new Headers(req.headers);
        headers.delete('host'); // Let fetch set the host
        headers.set('host', new URL(BACKEND_URL).host); // Set backend host manualy if needed, or omit

        // Prepare Body (if not GET/HEAD)
        const body = (method === 'GET' || method === 'HEAD') ? undefined : await req.blob();

        // ⚡ EXECUTE REQUEST
        const backendRes = await fetchWithRetry(targetUrl, {
            method,
            headers,
            body: body,
            // @ts-ignore - Duplex needed for some body streaming cases in node
            duplex: 'half'
        });

        // 3️⃣ CACHING STRATEGY (Smart Cache)
        const responseHeaders = new Headers(backendRes.headers);

        // Cache GET requests for 60s (SWR 120s) to reduce load
        if (method === 'GET') {
            responseHeaders.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
        } else {
            responseHeaders.set('Cache-Control', 'no-store');
        }

        // Metrics
        const duration = Date.now() - startTime;
        console.log(`[✅ PROXY OUT] ${backendRes.status} | ${duration}ms`);

        // Return Response
        return new NextResponse(backendRes.body, {
            status: backendRes.status,
            statusText: backendRes.statusText,
            headers: responseHeaders
        });

    } catch (error) {
        console.error(`[❌ PROXY FATAL] ${(error as Error).message}`);
        return NextResponse.json(
            { error: 'Backend Unavailable', message: 'The Elon-Class Server is momentarily napping. Please retry.' },
            { status: 502 }
        );
    }
}

// Export for all methods
export { handler as GET, handler as POST, handler as PUT, handler as DELETE, handler as PATCH };
