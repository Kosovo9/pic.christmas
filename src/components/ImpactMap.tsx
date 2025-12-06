import React, { useMemo } from 'react';
import { useI18n } from '../hooks/useI18n';

export const ImpactMap: React.FC = () => {
    const { language } = useI18n();

    // Smart Proxy Data: Returns relevant stats based on language
    const localStats = useMemo(() => {
        const map: Record<string, { country: string; raised: string; shelters: number; color: string }> = {
            es: { country: 'España & Latam', raised: '€12,450', shelters: 14, color: 'text-yellow-400' },
            en: { country: 'Global / USA', raised: '$45,200', shelters: 42, color: 'text-blue-400' },
            fr: { country: 'France', raised: '€8,300', shelters: 8, color: 'text-purple-400' },
            de: { country: 'Deutschland', raised: '€15,100', shelters: 11, color: 'text-red-400' },
            it: { country: 'Italia', raised: '€7,200', shelters: 6, color: 'text-green-400' },
            pt: { country: 'Portugal & Brasil', raised: '€6,800', shelters: 9, color: 'text-orange-400' },
            ru: { country: 'Россия', raised: '₽850,000', shelters: 15, color: 'text-indigo-400' },
            zh: { country: 'China', raised: '¥120,000', shelters: 5, color: 'text-red-500' },
            ja: { country: 'Japan', raised: '¥2,500,000', shelters: 7, color: 'text-pink-400' },
            ar: { country: 'MENA', raised: '$14,000', shelters: 8, color: 'text-emerald-400' },
        };
        return map[language as string] || map['en'];
    }, [language]);

    return (
        <div className="mt-16 bg-slate-900/50 border border-slate-700 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Text Side */}
                <div className="flex-1 w-full text-left">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="animate-pulse w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                        <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">Live Impact Map</span>
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-2">
                        Impact in <span className={`${localStats.color}`}>{localStats.country}</span>
                    </h3>
                    <p className="text-slate-400 mb-8">
                        See how your photos are helping shelters near you.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Raised Locally</p>
                            <p className="text-2xl font-bold text-white">{localStats.raised}</p>
                        </div>
                        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Active Shelters</p>
                            <p className="text-2xl font-bold text-white">{localStats.shelters}</p>
                        </div>
                    </div>
                </div>

                {/* Visual Map Side (Abstract Representation) */}
                <div className="flex-1 w-full aspect-video relative bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden flex items-center justify-center">
                    {/* Abstract World Dots */}
                    <div className="absolute inset-0 opacity-30">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute bg-slate-500 rounded-full"
                                style={{
                                    width: Math.random() * 4 + 2 + 'px',
                                    height: Math.random() * 4 + 2 + 'px',
                                    top: Math.random() * 100 + '%',
                                    left: Math.random() * 100 + '%',
                                    opacity: Math.random()
                                }}
                            />
                        ))}
                    </div>

                    {/* Glowing Pulse for Current Region */}
                    <div className="relative z-10 text-center">
                        <div className="relative inline-block">
                            <div className={`absolute inset-0 ${localStats.color.replace('text', 'bg')}/20 blur-xl rounded-full animate-ping-slow`} />
                            <span className={`relative text-6xl shadow-2xl drop-shadow-lg`}>
                                🌍
                            </span>
                        </div>
                        <p className={`mt-4 font-bold ${localStats.color}`}>
                            {localStats.country} Active
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
