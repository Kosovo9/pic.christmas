"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

import { Globe, DollarSign, Users, MousePointer2, Share2, ArrowLeft } from "lucide-react";
import { getAffiliateStats } from "./actions";
import { Snowfall } from "@/components/Snowfall";

export default function AffiliatesPage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isLoaded && isSignedIn && user?.primaryEmailAddress?.emailAddress) {
            getAffiliateStats(user.primaryEmailAddress.emailAddress)
                .then(res => {
                    setStats(res);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Affiliate Load Error:", err);
                    setError("Failed to load your Golden Dashboard. Try again?");
                    setLoading(false);
                });
        } else if (isLoaded && !isSignedIn) {
            setLoading(false);
        }
    }, [isLoaded, isSignedIn, user]);

    if (!isLoaded) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-christmas-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!isSignedIn) return <RedirectToSignIn />;

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-christmas-red relative overflow-hidden font-sans">
            <Snowfall />

            <nav className="border-b border-white/5 px-6 py-4 flex justify-between items-center backdrop-blur-xl sticky top-0 z-50 bg-black/40">
                <Link href="/" className="flex items-center gap-2 text-christmas-gold hover:text-white transition font-bold uppercase tracking-tighter text-xs">
                    <ArrowLeft className="w-4 h-4" /> Back to Studio
                </Link>
                <div className="font-serif text-2xl tracking-tighter text-white">
                    Affiliate <span className="text-christmas-gold">Dashboard</span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Network Live</span>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-20 relative z-10">
                <header className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
                    <Badge variant="primary" size="md" className="mb-6 mx-auto">Golden Partner Program 2024</Badge>
                    <h1 className="text-6xl md:text-8xl font-serif mb-6 tracking-tighter">
                        Earn <span className="text-christmas-gold">20%</span> on every <br className="hidden md:block" /> magical generation
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto font-light leading-relaxed text-lg">
                        You are part of the elite. Payments are processed via Global Payout Engine every 15 days.
                    </p>
                </header>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-16 h-16 border-4 border-christmas-gold border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-christmas-gold font-mono text-xs uppercase tracking-widest animate-pulse">Synchronizing Data...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl text-center">
                        <p className="text-red-400 mb-4">{error}</p>
                        <Button onClick={() => window.location.reload()}>Retry Connection</Button>
                    </div>
                ) : (
                    <div className="space-y-12 animate-in fade-in zoom-in-95 duration-1000">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { label: "Total Clicks", val: stats.clicks, icon: MousePointer2, color: "blue" },
                                { label: "Conversions", val: stats.orders, icon: Users, color: "purple" },
                                { label: "Total Earnings", val: `$${stats.earnings}.00`, icon: DollarSign, color: "gold" }
                            ].map((s, i) => (
                                <Card key={i} variant="gradient" className="p-10 text-center group hover:scale-[1.02] transition-transform cursor-default">
                                    <div className={`w-14 h-14 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-christmas-gold group-hover:text-black transition-colors duration-500`}>
                                        <s.icon className={`w-7 h-7`} />
                                    </div>
                                    <div className="text-5xl font-bold mb-2 tracking-tighter font-serif">{s.val}</div>
                                    <div className="text-[11px] text-gray-500 uppercase tracking-[0.4em] font-black">{s.label}</div>
                                </Card>
                            ))}
                        </div>

                        {/* Referral Link Card */}
                        <Card variant="glass" className="p-12 border-christmas-gold/20 shadow-[0_0_80px_rgba(212,175,55,0.05)]">
                            <h3 className="text-3xl font-serif mb-8 flex items-center gap-4">
                                <Share2 className="text-christmas-gold" /> Your Unique Viral Link
                            </h3>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1 bg-black/60 border border-white/10 px-8 py-6 rounded-3xl text-christmas-gold text-xl font-mono overflow-hidden truncate flex items-center shadow-inner">
                                    {`https://pic.christmas/?ref=${stats.code}`}
                                </div>
                                <Button
                                    size="xl"
                                    onClick={() => {
                                        navigator.clipboard.writeText(`https://pic.christmas/?ref=${stats.code}`);
                                        alert("Golden Link Copied! Spread the magic.");
                                    }}
                                    className="px-12 h-auto py-6"
                                >
                                    Copy Link
                                </Button>
                            </div>
                            <div className="flex items-center justify-center gap-8 mt-10">
                                <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] flex items-center gap-2">
                                    <Globe className="w-3 h-3" /> Real-Time Tracking
                                </p>
                                <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] flex items-center gap-2">
                                    <ShieldCheck className="w-3 h-3" /> Anti-Fraud Secured
                                </p>
                            </div>
                        </Card>

                        {/* Payout Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <Card variant="elevated" className="p-10">
                                <h4 className="font-black mb-6 uppercase text-[11px] tracking-[0.4em] text-christmas-gold">Quantum Payouts</h4>
                                <p className="text-gray-400 leading-relaxed font-light text-sm italic">
                                    Your earnings are settled automatically. We support PayPal, Stripe, and Direct Bank Transfer. Threshold: $50 USD.
                                </p>
                            </Card>
                            <Card variant="elevated" className="p-10">
                                <h4 className="font-black mb-6 uppercase text-[11px] tracking-[0.4em] text-christmas-gold">Viral Assets</h4>
                                <p className="text-gray-400 leading-relaxed font-light text-sm italic">
                                    Join our <span className="text-white font-bold underline decoration-christmas-gold">Telegram Group</span> for daily TikTok/Insta templates that convert at 15%+.
                                </p>
                            </Card>
                        </div>
                    </div>
                )}
            </main>

            <footer className="py-20 text-center border-t border-white/5 mt-20">
                <div className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">
                    Pic.Christmas Partner Engine v4.0.2 © 2024
                </div>
            </footer>
        </div>
    );
}

