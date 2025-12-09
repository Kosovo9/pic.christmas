'use client';

import React, { useState } from 'react';
import { BrandHeader } from '@/components/BrandHeader';
import { EarthFooter } from '@/components/EarthFooter';

export default function AffiliatePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [generatedLink, setGeneratedLink] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [customCoupon, setCustomCoupon] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login
        setIsLoggedIn(true);
        setGeneratedLink('https://pic.christmas/?ref=ELON_AFF_101');
    };

    const generateCoupon = () => {
        if (!customCoupon) return;
        setCouponCode(customCoupon.toUpperCase());
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">
            <BrandHeader />

            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-900/10 blur-[100px] rounded-full"></div>
            </div>

            <main className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">

                {!isLoggedIn ? (
                    // HERO / LOGIN SECTION
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-8 animate-slide-up">
                            <div className="inline-flex items-center space-x-2 bg-slate-900/50 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">New Partner Program</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                                Earn <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">35%</span> Recurring Commission.
                            </h1>
                            <p className="text-xl text-slate-400 max-w-2xl">
                                Join the highest paying AI affiliate program. Monetize your audience with hyper-realistic Christmas photos. Real-time tracking, instant payouts.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button onClick={() => setIsLoggedIn(true)} className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transform hover:-translate-y-1">
                                    Start Earning Now
                                </button>
                                <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-all">
                                    View Commission Tiers
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/50">
                                <div>
                                    <h3 className="text-3xl font-black text-white">$450</h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">Avg. Daily Earnings</p>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-white">35%</h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">Commission Rate</p>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-white">24h</h3>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">Payout Time</p>
                                </div>
                            </div>
                        </div>

                        {/* Login Card */}
                        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-700 p-8 rounded-3xl shadow-2xl animate-fade-in delay-200">
                            <h2 className="text-2xl font-bold text-white mb-6">Partner Login</h2>
                            <form className="space-y-4" onSubmit={handleLogin}>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Email Address</label>
                                    <input type="email" placeholder="partner@example.com" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                                </div>
                                <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg">
                                    Access Dashboard
                                </button>
                            </form>
                            <p className="text-center text-xs text-slate-500 mt-6">
                                Not a partner? <a href="#" className="text-emerald-400 hover:underline">Apply for access</a>
                            </p>
                        </div>
                    </div>
                ) : (
                    // DASHBOARD SECTION
                    <div className="space-y-12 animate-fade-in">
                        <div className="flex justify-between items-end border-b border-slate-800 pb-8">
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Partner 🚀</h1>
                                <p className="text-slate-400">Here's what's happening with your links today.</p>
                            </div>
                            <div className="text-right hidden md:block">
                                <div className="inline-flex items-center gap-2 mb-2 bg-emerald-950/30 px-3 py-1 rounded-full border border-emerald-500/20">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Payouts Enabled</span>
                                </div>
                                <p className="text-xs text-slate-500 uppercase mb-1">Next Payout (Friday)</p>
                                <p className="text-xl font-mono text-emerald-400 font-bold">$1,245.50</p>
                                <p className="text-[10px] text-slate-600 font-mono">Auto-transfer in: 2d 14h</p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { label: 'Total Clicks', value: '12,450', change: '+12%', color: 'text-blue-400' },
                                { label: 'Conversions', value: '843', change: '+5.2%', color: 'text-purple-400' },
                                { label: 'Conversion Rate', value: '6.8%', change: '+0.4%', color: 'text-indigo-400' },
                                { label: 'Revenue (35%)', value: '$8,320', change: '+18%', color: 'text-emerald-400' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors">
                                    <p className="text-xs text-slate-500 uppercase font-semibold mb-2">{stat.label}</p>
                                    <h3 className={`text-3xl font-black ${stat.color} mb-1`}>{stat.value}</h3>
                                    <span className="text-xs text-emerald-500 bg-emerald-950/30 px-2 py-0.5 rounded-full">▲ {stat.change}</span>
                                </div>
                            ))}
                        </div>

                        {/* Tools Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Link Generator */}
                            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <span className="bg-blue-500/10 text-blue-400 text-sm p-2 rounded-lg">🔗</span>
                                    Smart Link Generator
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Your Unique Referral Link</label>
                                        <div className="flex gap-2">
                                            <div className="flex-1 bg-black/30 border border-slate-700 rounded-xl px-4 py-3 flex items-center gap-2">
                                                <span className="text-slate-500 text-sm">pic.christmas/?ref=</span>
                                                <span className="text-emerald-400 font-mono font-bold">ELON_AFF_101</span>
                                            </div>
                                            <code className="flex-1 bg-black/30 border border-slate-700 rounded-xl px-4 py-3 font-mono text-emerald-400 overflow-x-auto whitespace-nowrap">
                                                {generatedLink}
                                            </code>
                                            <button
                                                onClick={() => navigator.clipboard.writeText(generatedLink)}
                                                className="px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-all"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        Traffic sent to this link is tracked for 60 days. You earn 35% on all purchases made by referred users.
                                    </p>
                                </div>
                            </div>

                            {/* Coupon Creator */}
                            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <span className="bg-purple-500/10 text-purple-400 text-sm p-2 rounded-lg">🎟️</span>
                                    Custom Coupon Creator
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Discount Code</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. SANTABILL"
                                                value={customCoupon}
                                                onChange={(e) => setCustomCoupon(e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white uppercase focus:outline-none focus:border-purple-500"
                                            />
                                        </div>
                                        <div className="w-1/3">
                                            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Discount</label>
                                            <select className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 appearance-none">
                                                <option>10% Off</option>
                                                <option>15% Off</option>
                                                <option>20% Off (Lower comm.)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button
                                        onClick={generateCoupon}
                                        className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-900/20"
                                    >
                                        Create Coupon
                                    </button>

                                    {couponCode && (
                                        <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl flex items-center justify-between">
                                            <span className="text-green-400 font-mono font-bold">{couponCode}</span>
                                            <span className="text-xs text-green-300">Active</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </main>

            <EarthFooter />
        </div>
    );
}
