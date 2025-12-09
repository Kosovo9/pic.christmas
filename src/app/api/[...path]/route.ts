// route-100x.ts        // src/app/api/[...path]/route.ts
// ========================================
// REVERSE PROXY 100x - PRODUCTION READY
// ========================================
// Features:
// ✅ Production Backend Fallback
// ✅ Multipart/Form-Data Support (Uploads)
// ✅ Transparent Header Forwarding
// ✅ Retry Logic (idempotent-safe)
// ✅ Timeout Protection
// ========================================

import { NextRequest, NextResponse } from 'next/server';

// Using Node.js runtime for consistency
export const runtime = 'nodejs';

// Configuration
const BACKEND_URL = process.env.BACKEND_URL || 'https://pic-christmas-backend.onrender.com';
const REQUEST_TIMEOUT = 15000; // Increased to 15s for AI/Uploads
const MAX_RETRIES = 2;

// Idempotent-safe HTTP status codes
const RETRYABLE_STATUS = [408, 429, 500, 502, 503, 504];
const RETRYABLE_METHODS = ['GET', 'HEAD', 'OPTIONS'];

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number = REQUEST_TIMEOUT): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

async function fetchWithRetry(url: string, options: RequestInit, method: string, retries: number = MAX_RETRIES): Promise<Response> {
    let lastError: Error | null = null;
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await fetchWithTimeout(url, options);
            if (response.status !== 429 && response.status < 500) return response; // Success or Client Error
            if (!RETRYABLE_METHODS.includes(method)) return response; // Don't retry POST/PUT unless 429? actually safer not to retry uploads

            // If here, it's a server error or 429 on a safe method
            if (attempt === retries) return response;

            // Backoff
            await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
        } catch (error: any) {
            lastError = error;
            if (attempt === retries) throw error;
            await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
        }
    }
    throw lastError;
}

export async function handler(req: NextRequest) {
    const startTime = Date.now();
    const method = req.method;
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/api/').pop() || '';

    // 🚑 FIX: Ensure /api prefix is added for backend request
    const fullUrl = `${BACKEND_URL}/api/${pathSegments}${url.search}`;

    console.log(`[PROXY] ${method} ${pathSegments} -> ${fullUrl}`);

    try {
        // Prepare Headers - COPY EVERYTHING except host
        const headers = new Headers(req.headers);
        headers.delete('host');
        headers.delete('connection');

        // Critical: Do NOT set Content-Type manually if it's multipart (fetch handles boundary)
        // Actually, for a proxy, we typically want to pass the exact Content-Type header from the client including boundary.
        // But NextRequest body might be parsed? 
        // In 'edge' runtime, req.body is a ReadableStream. We can pass it directly.
        // If we pass req.body, request 'duplex' mode might be needed for some fetch implementations, 
        // but standard fetch usually handles streams if body is ReadableStream.

        // However, if we read req.headers, 'Content-Type' has the boundary.
        // We should just pass it along.

        const body = method !== 'GET' && method !== 'HEAD' ? req.body : undefined;

        const response = await fetchWithRetry(fullUrl, {
            method,
            headers,
            body: body as any, // Cast to any to allow ReadableStream in types
            // @ts-ignore - Required for streaming bodies in some environments
            duplex: 'half'
        }, method);

        const duration = Date.now() - startTime;
        console.log(`[PROXY] ${method} ${pathSegments} | ${response.status} | ${duration}ms`);

        // Forward response
        const resHeaders = new Headers(response.headers);

        // CORs might be handled by backend, but we are proxying.
        resHeaders.set('Access-Control-Allow-Origin', '*');

        return new NextResponse(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: resHeaders
        });

    } catch (error: any) {
        console.error(`[PROXY ERROR] ${method} ${pathSegments}:`, error);
        return NextResponse.json(
            { error: 'Proxy Error', details: error.message },
            { status: 502 }
        );
    }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
export const HEAD = handler;
export const OPTIONS = handler;
