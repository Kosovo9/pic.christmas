"use client";

import React, { useEffect, useState } from "react";
import { useUser, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { Globe, DollarSign, Users, MousePointer2, Share2, ArrowLeft } from "lucide-react";
import { getAffiliateStats } from "./actions";
import { Snowfall } from "@/components/Snowfall";

export default function AffiliatesPage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
            getAffiliateStats(user.primaryEmailAddress.emailAddress).then(res => {
                setStats(res);
                setLoading(false);
            });
        }
    }, [isSignedIn, user]);

    if (!isLoaded) return null;
    if (!isSignedIn) return <RedirectToSignIn />;

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-christmas-red relative overflow-hidden">
            <Snowfall />

            <nav className="border-b border-white/5 px-6 py-4 flex justify-between items-center backdrop-blur-xl sticky top-0 z-50 bg-black/40">
                <a href="/" className="flex items-center gap-2 text-christmas-gold hover:text-white transition font-bold uppercase tracking-tighter">
                    <ArrowLeft className="w-4 h-4" /> Back to Studio
                </a>
                <div className="font-serif text-2xl tracking-tighter text-white">
                    Affiliate <span className="text-christmas-gold">Center</span>
                </div>
                <div className="w-24"></div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-20 relative z-10">
                <header className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-serif mb-4">Earn with <span className="text-christmas-gold">Pic.Christmas</span></h1>
                    <p className="text-gray-500 max-w-xl mx-auto font-light leading-relaxed italic">
                        Transform your influence into a 20% commission loop. Payments processed every 30 days.
                    </p>
                </header>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-christmas-gold border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: "Clicks", val: stats.clicks, icon: MousePointer2, color: "blue" },
                                { label: "Orders", val: stats.orders, icon: Users, color: "purple" },
                                { label: "Earnings", val: `$${stats.earnings}`, icon: DollarSign, color: "gold" }
                            ].map((s, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] text-center group hover:border-white/20 transition">
                                    <div className={`w-12 h-12 mx-auto rounded-2xl bg-${s.color}-500/10 flex items-center justify-center mb-4`}>
                                        <s.icon className={`w-6 h-6 text-christmas-gold`} />
                                    </div>
                                    <div className="text-4xl font-bold mb-1 tracking-tighter">{s.val}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Referral Link Card */}
                        <div className="bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-10 rounded-[3rem] shadow-2xl">
                            <h3 className="text-2xl font-serif mb-6 flex items-center gap-3">
                                <Share2 className="text-christmas-gold" /> Your Exclusive Golden Link
                            </h3>
                            <div className="flex flex-col md:flex-row gap-4">
                                <code className="flex-1 bg-black/60 border border-white/10 px-6 py-4 rounded-2xl text-christmas-gold text-lg overflow-hidden truncate">
                                    {`https://pic.christmas/?ref=${stats.code}`}
                                </code>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(`https://pic.christmas/?ref=${stats.code}`);
                                        alert("Link Copied! Go Viral.");
                                    }}
                                    className="bg-white text-black font-bold px-10 py-4 rounded-2xl hover:bg-christmas-gold transition transform active:scale-95"
                                >
                                    Copy Link
                                </button>
                            </div>
                            <p className="text-[10px] text-white/30 mt-6 uppercase tracking-[0.2em] text-center">
                                All traffic is verified by our AI Anti-Fraud Engine
                            </p>
                        </div>

                        {/* Info Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                                <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-christmas-gold">Payouts</h4>
                                <p className="text-gray-500 leading-relaxed font-light">
                                    Earnings are credited to your PayPal after 30 days of retention. Minimum payout: $50 USD. High-volume partners can request weekly payouts.
                                </p>
                            </div>
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
                                <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-christmas-gold">Assets</h4>
                                <p className="text-gray-500 leading-relaxed font-light">
                                    Need banners or videos for TikTok? Contact <strong>partners@pic.christmas</strong> to receive our 2024 Viral Content Pack.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <footer className="py-20 text-center border-t border-white/5 opacity-50">
                <div className="text-[10px] text-gray-700 font-sans tracking-widest uppercase">
                    Pic.Christmas Affiliate Partner © 2024
                </div>
            </footer>
        </div>
    );
}
