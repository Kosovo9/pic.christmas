import Link from "next/link";
import { ArrowRight, Sparkles, Clock, ShieldCheck } from "lucide-react";

export default function Home() {
    return (
        <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center bg-[url('https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <div className="relative z-10 p-6 max-w-4xl w-full flex flex-col items-center animate-in fade-in zoom-in duration-1000">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-sm font-medium mb-6">
                    <Sparkles className="w-4 h-4" />
                    <span>Limited Holiday Edition 2024</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent mb-6">
                    Transform your photos into <br />
                    <span className="text-blue-400 drop-shadow-lg">Christmas Magic</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Premium AI transformation. Upload your photo and get studio-quality holiday portraits in seconds. Data deleted in 24h.
                </p>

                <Link
                    href="/wizard"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-200 transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                >
                    Start Transformation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full">
                    <div className="bg-black/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                        <Clock className="w-8 h-8 text-blue-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2">24h Privacy</h3>
                        <p className="text-gray-400">We delete all your uploads and results automatically after 24 hours.</p>
                    </div>
                    <div className="bg-black/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                        <Sparkles className="w-8 h-8 text-amber-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
                        <p className="text-gray-400">Hyper-realistic AI models tuned specifically for holiday aesthetics.</p>
                    </div>
                    <div className="bg-black/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                        <ShieldCheck className="w-8 h-8 text-green-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
                        <p className="text-gray-400">Powered by Stripe. We never store your card details.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
