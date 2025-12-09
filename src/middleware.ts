
import { type NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const searchParams = req.nextUrl.searchParams;
    const ref = searchParams.get('ref');

    // 🚀 REFERRAL TRACKING LOGIC
    // If ?ref=X is present, we store it in a cookie for 30 days
    // This ensures the "Money Machine" works even if they leave and buy later.
    if (ref) {
        // Safe check for valid ref format (alphanumeric + underscore)
        if (/^[a-zA-Z0-9_-]+$/.test(ref)) {
            res.cookies.set('aff_ref', ref, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production'
            });
            console.log(`[Referral] Captured ref: ${ref}`);
        }
    }

    return res;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - assets (public folder)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
    ],
};
