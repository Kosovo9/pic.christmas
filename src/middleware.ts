import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes
const isProtectedRoute = createRouteMatcher([
    '/admin(.*)',
    '/dashboard(.*)',
]);

// Define public routes (home, api Webhooks, etc)
// We allow /api/payments/webhook primarily
const isPublicRoute = createRouteMatcher([
    '/',
    '/success',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/payments/webhook', // Important: Stripe Webhook must be public
    '/api/prompts(.*)', // Allow public access to prompts
    '/api/ai(.*)'      // Allow simple AI access for now or protect later
]);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
