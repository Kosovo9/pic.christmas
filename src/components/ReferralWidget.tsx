
import React, { useState } from 'react';

interface ReferralWidgetProps {
    referralCode?: string; // If user has one
}

export const ReferralWidget: React.FC<ReferralWidgetProps> = ({ referralCode = "SANTA25" }) => {
    const [copied, setCopied] = useState(false);
    const referralLink = `https://pic.christmas/?ref=${referralCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = (platform: 'whatsapp' | 'twitter' | 'email') => {
        const text = `🎄 Create magical AI Christmas photos with Pic.Christmas! Use my code ${referralCode} for a discount.`;
        let url = '';

        switch (platform) {
            case 'whatsapp':
                url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + referralLink)}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralLink)}`;
                break;
            case 'email':
                url = `mailto:?subject=Look at this Christmas Magic!&body=${encodeURIComponent(text + '\n\n' + referralLink)}`;
                break;
        }
        window.open(url, '_blank');
    };

    return (
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-8 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 text-9xl opacity-10 pointer-events-none">🎁</div>

            <div className="relative z-10 text-center">
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                    Viral Growth 🚀
                </span>

                <h3 className="text-2xl font-bold text-white mb-2">Give Magic, Get Magic</h3>
                <p className="text-slate-300 mb-6">
                    Refer a friend! They get <span className="text-white font-bold">1 free generation</span>, and YOU get <span className="text-white font-bold">10 credits</span>.
                </p>

                {/* Link Box */}
                <div className="flex items-center gap-2 bg-slate-950/50 p-2 rounded-xl border border-indigo-500/30 mb-6">
                    <code className="flex-1 text-indigo-300 font-mono text-sm pl-2 truncate">
                        {referralLink}
                    </code>
                    <button
                        onClick={handleCopy}
                        className={`px-4 py-2 rounded-lg font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>

                {/* Social Share Buttons */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => handleShare('whatsapp')}
                        className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center text-white text-xl transition-transform hover:scale-110 shadow-lg"
                        title="Share on WhatsApp"
                    >
                        💬
                    </button>
                    <button
                        onClick={() => handleShare('twitter')}
                        className="w-12 h-12 rounded-full bg-[#1DA1F2] hover:bg-[#1a91da] flex items-center justify-center text-white text-xl transition-transform hover:scale-110 shadow-lg"
                        title="Share on Twitter"
                    >
                        🐦
                    </button>
                    <button
                        onClick={() => handleShare('email')}
                        className="w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-white text-xl transition-transform hover:scale-110 shadow-lg"
                        title="Share via Email"
                    >
                        ✉️
                    </button>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 flex justify-between text-sm text-slate-400">
                    <div className="text-center w-1/2 border-r border-white/10">
                        <div className="text-2xl font-bold text-white">0</div>
                        <div>Friends Referred</div>
                    </div>
                    <div className="text-center w-1/2">
                        <div className="text-2xl font-bold text-emerald-400">$0.00</div>
                        <div>Credits Earned</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
