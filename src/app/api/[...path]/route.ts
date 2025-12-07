// route-100x.ts        // src/app/api/[...path]/route.ts
// ========================================
// REVERSE PROXY 100x - PRODUCTION READY
// ========================================
// Features:
// ✅ Retry Logic (idempotent-safe)
// ✅ Timeout Protection (8s hardcoded)
// ✅ Granular Caching (by endpoint)
// ✅ Specific Error Handling
// ✅ Observable Logging (with duration)
// ========================================

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // ⚡ Cloudflare Workers Optimization

// Configuration
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';
const REQUEST_TIMEOUT = 8000; // 8 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY_BASE = 1000; // 1 second

// Idempotent-safe HTTP status codes
const RETRYABLE_STATUS = [408, 429, 500, 502, 503, 504];

// Methods that are safe to retry (idempotent)
const RETRYABLE_METHODS = ['GET', 'HEAD', 'OPTIONS'];

// Cache configuration by endpoint pattern
const CACHE_CONFIG: Record<string, string> = {
    '/prompts': 'public, s-maxage=300, stale-while-revalidate=600', // 5 min cache
    '/styles': 'public, s-maxage=300, stale-while-revalidate=600',  // 5 min cache
    '/catalog': 'public, s-maxage=60, stale-while-revalidate=120',  // 1 min cache
    'default-get': 'public, s-maxage=60, stale-while-revalidate=120', // 1 min default
};

// ========================================
// UTILITY: Create fetch with timeout
// ========================================
async function fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeoutMs: number = REQUEST_TIMEOUT
): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

// ========================================
// UTILITY: Retry logic (idempotent-safe)
// ========================================
async function fetchWithRetry(
    url: string,
    options: RequestInit,
    method: string,
    retries: number = MAX_RETRIES
): Promise<Response> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await fetchWithTimeout(url, options);

            // Don't retry client errors (4xx, except 429)
            if (response.status >= 400 && response.status < 500 && response.status !== 429) {
                return response; // Return as-is
            }

            // Success or retryable error
            if (response.ok || RETRYABLE_STATUS.includes(response.status)) {
                return response;
            }

            // Non-retryable server error
            return response;
        } catch (error) {
            lastError = error as Error;

            // Check if this is a retryable error
            const isRetryable =
                (error instanceof TypeError && error.message.includes('fetch')) ||
                (error instanceof Error && error.name === 'AbortError');

            // Only retry if method is idempotent
            if (!RETRYABLE_METHODS.includes(method.toUpperCase())) {
                throw error; // POST, PUT, DELETE don't retry
            }

            // Last attempt?
            if (attempt === retries - 1) {
                throw error;
            }

            // Exponential backoff: 1s, 2s, 4s
            const delay = RETRY_DELAY_BASE * Math.pow(2, attempt);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }

    throw lastError || new Error('Max retries exceeded');
}

// ========================================
// UTILITY: Get cache header for endpoint
// ========================================
function getCacheHeader(path: string, method: string): string | null {
    if (method !== 'GET') {
        return 'no-store, must-revalidate'; // Never cache mutations
    }

    // Check endpoint patterns
    for (const [pattern, cacheHeader] of Object.entries(CACHE_CONFIG)) {
        if (pattern !== 'default-get' && path.includes(pattern)) {
            return cacheHeader;
        }
    }

    // Default GET cache
    return CACHE_CONFIG['default-get'];
}

// ========================================
// UTILITY: Safe error response
// ========================================
function createErrorResponse(
    error: unknown,
    duration: number
): { status: number; body: Record<string, any> } {
    if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error(`[PROXY] Network error after ${duration}ms:`, error.message);
        return {
            status: 502,
            body: {
                error: 'Network error',
                message: 'Failed to connect to backend',
            },
        };
    }

    if (error instanceof Error && error.name === 'AbortError') {
        console.error(`[PROXY] Timeout after ${duration}ms`);
        return {
            status: 504,
            body: {
                error: 'Gateway timeout',
                message: `Request exceeded ${REQUEST_TIMEOUT}ms limit`,
            },
        };
    }

    if (error instanceof Error) {
        console.error(`[PROXY] Unexpected error after ${duration}ms:`, error.message);
        return {
            status: 500,
            body: {
                error: 'Internal server error',
                message: process.env.NODE_ENV === 'development' ? error.message : 'Unknown error',
            },
        };
    }

    console.error(`[PROXY] Unknown error after ${duration}ms:`, error);
    return {
        status: 500,
        body: { error: 'Internal server error' },
    };
}

// ========================================
// MAIN HANDLER
body = await req.text();
            } catch (e) {
    console.warn('[PROXY] Could not read request body');
}
        }

// Prepare headers
const headers = new Headers();
headers.set('Content-Type', 'application/json');

// Forward auth if present
if (req.headers.get('authorization')) {
    headers.set('authorization', req.headers.get('authorization')!);
}

// Forward user-agent
if (req.headers.get('user-agent')) {
    headers.set('user-agent', req.headers.get('user-agent')!);
}

// Execute fetch with retry
const response = await fetchWithRetry(
    fullUrl,
    {
        method,
        headers,
        body,
    },
    method
);

const duration = Date.now() - startTime;

// Logging: Success
console.log(
    `[PROXY] ${method.padEnd(6)} ${backendPath.slice(0, 60).padEnd(60)} | ${response.status} | ${duration}ms ✅`
);

// Apply cache headers
const cacheHeader = getCacheHeader(backendPath, method);
const responseData = await response.json().catch(() => ({}));

// Create response
const finalResponse = NextResponse.json(responseData, {
    status: response.status,
});

if (cacheHeader) {
    finalResponse.headers.set('Cache-Control', cacheHeader);
}

return finalResponse;
    } catch (error) {
    const duration = Date.now() - startTime;
    const { status, body } = createErrorResponse(error, duration);

    // Logging: Error
    console.error(
        `[PROXY] ${method.padEnd(6)} ${backendPath.slice(0, 60).padEnd(60)} | ERROR | ${duration}ms ❌`
    );

    return NextResponse.json(body, { status });
}
}

// Export for both GET and POST (all methods)
export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
export const HEAD = handler;
export const OPTIONS = handler;
