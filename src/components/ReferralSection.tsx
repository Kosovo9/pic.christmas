import React, { useState, useEffect } from 'react';

interface ReferralSectionProps {
    email?: string;
}

export const ReferralSection: React.FC<ReferralSectionProps> = ({ email }) => {
    const [referralCode, setReferralCode] = useState<string>('');
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Check localStorage for existing code
        const saved = localStorage.getItem('referralCode');
        if (saved) {
            setReferralCode(saved);
            fetchStats(saved);
        }
    }, []);

    const generateCode = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3001/api/referrals/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            setReferralCode(data.code);
            localStorage.setItem('referralCode', data.code);
            fetchStats(data.code);
        } catch (error) {
            console.error('Error generating code:', error);
        }
        setLoading(false);
    };

    const fetchStats = async (code: string) => {
        try {
            const res = await fetch(`http://localhost:3001/api/referrals/${code}`);
            const data = await res.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const copyToClipboard = () => {
        const url = `${window.location.origin}?ref=${referralCode}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareOnTwitter = () => {
        const text = `Get your magical Christmas photos with AI! Use my code ${referralCode} 🎄✨`;
        const url = `${window.location.origin}?ref=${referralCode}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    const shareOnFacebook = () => {
        const url = `${window.location.origin}?ref=${referralCode}`;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    };

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        🎁 Refer Friends, Earn Free Photos!
                    </h2>
                    <p className="text-slate-400 text-xl">
                        Share the magic and get rewarded for every 5 friends who create their Christmas photos
                    </p>
                </div>

                {/* Main Card */}
                <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-32 -mb-32" />

                    {!referralCode ? (
                        /* Generate Code */
                        <div className="text-center relative z-10">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/20">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Get Your Referral Code</h3>
                            <p className="text-slate-400 mb-8">Start earning free photos by sharing with friends & family</p>
                            <button
                                onClick={generateCode}
                                disabled={loading}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all transform hover:scale-105 disabled:opacity-50"
                            >
                                {loading ? 'Generating...' : 'Generate My Code'}
                            </button>
                        </div>
                    ) : (
                        /* Show Code & Stats */
                        <div className="relative z-10">
                            {/* Code Display */}
                            <div className="bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-700">
                                <p className="text-slate-400 text-sm mb-2">Your Referral Code</p>
                                <div className="flex items-center justify-between gap-4">
                                    <code className="text-3xl font-mono font-bold text-blue-400">{referralCode}</code>
                                    <button
                                        onClick={copyToClipboard}
                                        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all flex items-center gap-2"
                                    >
                                        {copied ? (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                                Copy Link
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Stats */}
                            {stats && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
                                        <div className="text-3xl font-bold text-white mb-1">{stats.conversions}</div>
                                        <div className="text-slate-400 text-sm">Total Referrals</div>
                                    </div>
                                    <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
                                        <div className="text-3xl font-bold text-blue-400 mb-1">{stats.creditsEarned}</div>
                                        <div className="text-slate-400 text-sm">Free Credits</div>
                                    </div>
                                    <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
                                        <div className="text-3xl font-bold text-purple-400 mb-1">{stats.nextRewardAt}</div>
                                        <div className="text-slate-400 text-sm">Until Next Credit</div>
                                    </div>
                                </div>
                            )}

                            {/* Progress Bar */}
                            {stats && (
                                <div className="mb-8">
                                    <div className="flex justify-between text-sm text-slate-400 mb-2">
                                        <span>Progress to next reward</span>
                                        <span>{stats.progress} / {stats.config.conversionsRequired}</span>
                                    </div>
                                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                                            style={{ width: `${(stats.progress / stats.config.conversionsRequired) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Share Buttons */}
                            <div>
                                <p className="text-slate-400 text-sm mb-4">Share with friends:</p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={shareOnTwitter}
                                        className="flex-1 px-6 py-3 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                        </svg>
                                        Twitter
                                    </button>
                                    <button
                                        onClick={shareOnFacebook}
                                        className="flex-1 px-6 py-3 bg-[#4267B2] hover:bg-[#365899] text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                        </svg>
                                        Facebook
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* How it Works */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div>
                        <div className="text-4xl mb-3">🔗</div>
                        <h4 className="text-white font-bold mb-2">1. Share Your Link</h4>
                        <p className="text-slate-400 text-sm">Send your unique referral link to friends</p>
                    </div>
                    <div>
                        <div className="text-4xl mb-3">🎄</div>
                        <h4 className="text-white font-bold mb-2">2. They Create Photos</h4>
                        <p className="text-slate-400 text-sm">When they make their Christmas photos</p>
                    </div>
                    <div>
                        <div className="text-4xl mb-3">🎁</div>
                        <h4 className="text-white font-bold mb-2">3. You Earn Credits</h4>
                        <p className="text-slate-400 text-sm">Get 1 free photo pack every 5 referrals</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
