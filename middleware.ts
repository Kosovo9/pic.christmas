import { LRUCache } from 'lru-cache';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimit = new LRUCache({
    max: 10,
    ttl: 1000,
});

export async function middleware(request: NextRequest) {
    const ip = request.headers.get("x-forwarded-for") || '127.0.0.1';

    const remaining = (rateLimit.get(ip) as number) ?? 10;
    if (remaining > 0) {
        rateLimit.set(ip, remaining - 1);
    } else {
        return new NextResponse('Too Many Requests', { status: 429 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/generate',
};
