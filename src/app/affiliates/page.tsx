"use client";

import React, { useEffect, useState } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { api } from '../../services/api';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { useI18n } from '../../hooks/useI18n';
import { AssetGenerator } from '../../components/affiliates/AssetGenerator';

export default function AffiliateDashboard() {
    const { user, isLoaded, isSignedIn } = useUser();
    const { language, switchLanguage } = useI18n();
    const [loading, setLoading] = useState(true);
    const [referralData, setReferralData] = useState<any>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchAffiliateData = async () => {
            if (!isLoaded || !isSignedIn || !user) return;

            try {
                const email = user.primaryEmailAddress?.emailAddress;
                if (email) {
                    // "Generate" acts as "Get or Create" based on email
                    const data = await api.generateReferralCode(email);
                    setReferralData(data);
                }
            } catch (err) {
                console.error("Failed to load affiliate data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAffiliateData();
    }, [isLoaded, isSignedIn, user]);

    const copyLink = () => {
        if (!referralData?.code) return;
        const url = `${window.location.origin}?ref=${referralData.code}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isLoaded || !isSignedIn) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-4 text-center">
                <Navbar language={language} onLanguageChange={switchLanguage} />
                <h1 className="text-2xl font-bold mb-4 mt-20">Affiliate Program 💰</h1>
                <p className="mb-6 text-slate-400">Please sign in to view your earnings.</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-purple-500/30">
            <Navbar language={language} onLanguageChange={switchLanguage} />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                        Partner Program
                    </h1>
                    <p className="text-xl text-slate-300">
                        Earn <span className="text-green-400 font-bold">35%</span> commission on every sale you refer.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center p-12">
                        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid gap-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl text-center backdrop-blur-sm relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Total Earnings</p>
                                <p className="text-4xl font-bold text-green-400">
                                    ${(referralData?.earnings || 0).toFixed(2)}
                                </p>
                            </div>

                            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl text-center backdrop-blur-sm">
                                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Sales Referred</p>
                                <p className="text-4xl font-bold text-blue-400">
                                    {referralData?.conversions || 0}
                                </p>
                            </div>

                            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl text-center backdrop-blur-sm">
                                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Conversion Rate</p>
                                <p className="text-4xl font-bold text-purple-400">
                                    {/* Calculated logic if we tracked clicks */}
                                    --%
                                </p>
                                <p className="text-xs text-slate-500 mt-2">from tracked clicks</p>
                            </div>
                        </div>

                        {/* Link Generator */}
                        <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-6 text-center">Your Unique Link</h3>

                                <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                                    <div className="flex-1 bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 font-mono text-slate-300 flex items-center justify-between">
                                        <span className="truncate">
                                            {typeof window !== 'undefined' ? window.location.origin : 'https://pic.christmas'}?ref={referralData?.code}
                                        </span>
                                    </div>
                                    <button
                                        onClick={copyLink}
                                        className={`px-8 py-3 rounded-xl font-bold transition-all transform active:scale-95 ${copied ? 'bg-green-500 text-white' : 'bg-white text-slate-900 hover:bg-slate-200'}`}
                                    >
                                        {copied ? 'Copied! ✅' : 'Copy Link 🔗'}
                                    </button>
                                </div>

                                <div className="mt-8 text-center">
                                    <p className="text-slate-400 text-sm max-w-lg mx-auto">
                                        Share this link on social media, WhatsApp, or email. When someone makes a purchase, you instantly get credited 35% of the sale price.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* AI Asset Generator - New Feature */}
                        <AssetGenerator />

                    </div>
                )}
            </div>

            <Footer language={language} />
        </main>
    );
}
