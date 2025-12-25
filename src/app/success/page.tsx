"use client";

import Link from "next/link";
import { CheckCircle, Download, Mail, Heart } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams ? searchParams.get("session_id") : null;

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md w-full bg-white/5 border border-christmas-gold/30 p-12 rounded-[3rem] shadow-[0_0_100px_rgba(212,175,55,0.1)]">
                <div className="flex justify-center mb-8">
                    <div className="bg-christmas-gold text-black rounded-full p-6 shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                        <CheckCircle className="w-16 h-16" />
                    </div>
                </div>

                <h1 className="text-4xl font-serif text-christmas-gold mb-6 tracking-tighter">Payment Secured!</h1>
                <p className="text-gray-400 mb-10 leading-relaxed font-light">
                    Your reservation for the 8K AI Masterpiece is confirmed.
                    Check your email for the magic link and your high-resolution private hash.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/"
                        className="block w-full bg-christmas-gold text-black py-4 rounded-2xl font-bold text-lg hover:scale-105 transition"
                    >
                        Return to Studio
                    </Link>
                    <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-8">
                        <Mail className="w-4 h-4" /> Check your inbox/spam
                    </div>
                </div>

                <div className="mt-12 pt-12 border-t border-white/10 flex flex-col items-center">
                    <Heart className="text-christmas-red w-6 h-6 mb-4 animate-pulse" />
                    <p className="text-xs uppercase tracking-widest text-gray-600 font-bold">Merry Artificial Christmas</p>
                </div>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
