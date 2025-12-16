"use client";

import Link from "next/link";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { trpc } from "@/lib/trpc-client";
import { useEffect } from "react";

export default function Navbar() {
    const { isSignedIn, user } = useUser();

    // Optimistically fetch credits or add initial
    const utils = trpc.useUtils();
    const credits = trpc.credits.getBalance.useQuery(undefined, {
        enabled: !!isSignedIn,
    });
    const addInitial = trpc.credits.addInitialCredits.useMutation({
        onSuccess: () => utils.credits.getBalance.invalidate(),
    });

    useEffect(() => {
        if (isSignedIn) {
            addInitial.mutate();
        }
    }, [isSignedIn]);

    return (
        <nav className="border-b border-border bg-black/50 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between h-16 px-4">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-amber-200 bg-clip-text text-transparent">
                    pic.christmas
                </Link>

                <div className="flex items-center gap-4">
                    <Link href="/gallery" className="text-sm text-gray-400 hover:text-white transition">
                        Gallery
                    </Link>

                    {isSignedIn ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-amber-400">
                                {credits.data ?? 0} Credits
                            </span>
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    ) : (
                        <SignInButton mode="modal">
                            <button className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full transition">
                                Sign In
                            </button>
                        </SignInButton>
                    )}
                </div>
            </div>
        </nav>
    );
}
