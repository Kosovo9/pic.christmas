// src/app/affiliates/auth.tsx
"use client";
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export function AffiliatesAuth({ children }: { children: React.ReactNode }) {
    const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    const isKeyValid = clerkKey && !clerkKey.includes('placeholder');

    if (!isKeyValid) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                <div className="max-w-md p-6 border border-yellow-500/50 bg-yellow-500/10 rounded-xl text-center">
                    <h2 className="text-xl font-bold text-yellow-500 mb-2">Clerk Configuration Required</h2>
                    <p className="text-slate-400 text-sm mb-4">
                        The affiliate system requires a valid Clerk Publishable Key to function.
                        Currently using: <code className="bg-black/30 px-2 py-1 rounded">{clerkKey || 'Missing'}</code>
                    </p>
                    <p className="text-xs text-slate-500">
                        Please add <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> to your environment variables in Netlify.
                    </p>
                    {/* Render children in a hidden way just to ensure no code elimination issues, or just ignore them */}
                </div>
            </div>
        );
    }

    return (
        <ClerkProvider>
            <SignedIn>{children}</SignedIn>
            <SignedOut>
                {/* Redirects to Clerk login if not signed in */}
                <RedirectToSignIn />
            </SignedOut>
        </ClerkProvider>
    );
}
