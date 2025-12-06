import React, { useState } from 'react';
import { useI18n } from '../hooks/useI18n';

export const MissionSection: React.FC = () => {
    const { t } = useI18n();
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [nominatedShelter, setNominatedShelter] = useState({ name: '', location: '', contact: '', reason: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would typically send to API
        console.log("Nomination:", nominatedShelter);
        setSubmitted(true);
        setTimeout(() => {
            setShowRegisterForm(false);
            setSubmitted(false);
            setNominatedShelter({ name: '', location: '', contact: '', reason: '' });
            alert("Thank you! We will verify this shelter.");
        }, 2000);
    };

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Aesthetics */}
            <div className="absolute inset-0 bg-slate-900/80 -z-10" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold tracking-wider mb-4 uppercase">
                        {t('mission.pledge')}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        {t('mission.title')}
                    </h2>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        {t('mission.desc')}
                    </p>
                </div>

                {/* Pillars of Giving Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {/* Section A */}
                    <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-blue-500/50 transition-colors group">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                            🤝
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{t('mission.section_a_title')}</h3>
                        <p className="text-slate-400 leading-relaxed">{t('mission.section_a_desc')}</p>
                    </div>

                    {/* Section B */}
                    <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-purple-500/50 transition-colors group">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                            💝
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{t('mission.section_b_title')}</h3>
                        <p className="text-slate-400 leading-relaxed">{t('mission.section_b_desc')}</p>
                    </div>

                    {/* Section C */}
                    <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition-colors group relative overflow-hidden">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-400 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                            🦸
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{t('mission.section_c_title')}</h3>
                        <p className="text-slate-400 leading-relaxed mb-6">{t('mission.section_c_desc')}</p>

                        <button
                            onClick={() => setShowRegisterForm(true)}
                            className="w-full py-3 rounded-xl bg-slate-700 hover:bg-emerald-600 hover:text-white text-slate-200 font-semibold transition-all flex items-center justify-center gap-2"
                        >
                            {t('shelter.cta')} ➜
                        </button>
                    </div>
                </div>

                {/* Transparency Hub Mockup */}
                <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32" />

                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                            <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                                🔍 {t('mission.transparency')}
                            </h3>
                            <p className="text-slate-400 mb-8 text-lg">
                                Real photos, real impact. See where every dollar (and bag of food) goes.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">✓</div>
                                    <div>
                                        <p className="text-white font-medium">Verified Donation #8921</p>
                                        <p className="text-sm text-slate-500">200kg Dog Food ➜ "Refugio Esperanza"</p>
                                    </div>
                                    <span className="ml-auto text-slate-600 text-sm">2h ago</span>
                                </div>
                                <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">✓</div>
                                    <div>
                                        <p className="text-white font-medium">Verified Donation #8920</p>
                                        <p className="text-sm text-slate-500">$500 Vet Bill Paid ➜ "Paws Chicago"</p>
                                    </div>
                                    <span className="ml-auto text-slate-600 text-sm">5h ago</span>
                                </div>
                            </div>
                        </div>

                        {/* Image Grid Mockup */}
                        <div className="flex-1 grid grid-cols-2 gap-4 opacity-80 hover:opacity-100 transition-opacity">
                            {/* Placeholder gradients for now, replace with real shelter images later */}
                            <div className="aspect-square bg-slate-700 rounded-2xl overflow-hidden relative">
                                <div className="absolute inset-0 flex items-center justify-center text-4xl">🐕</div>
                                <div className="absolute bottom-0 inset-x-0 bg-black/60 p-2 text-xs text-center text-white">Food Drive Dec 2024</div>
                            </div>
                            <div className="aspect-square bg-slate-700 rounded-2xl overflow-hidden relative mt-8">
                                <div className="absolute inset-0 flex items-center justify-center text-4xl">🐱</div>
                                <div className="absolute bottom-0 inset-x-0 bg-black/60 p-2 text-xs text-center text-white">New Shelter Roof</div>
                            </div>
                            <div className="aspect-square bg-slate-700 rounded-2xl overflow-hidden relative -mt-8">
                                <div className="absolute inset-0 flex items-center justify-center text-4xl">⚕️</div>
                                <div className="absolute bottom-0 inset-x-0 bg-black/60 p-2 text-xs text-center text-white">Vet Surgeries</div>
                            </div>
                            <div className="aspect-square bg-slate-700 rounded-2xl overflow-hidden relative">
                                <div className="absolute inset-0 flex items-center justify-center text-4xl">🏠</div>
                                <div className="absolute bottom-0 inset-x-0 bg-black/60 p-2 text-xs text-center text-white">Winter Bedding</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seasons Teaser */}
                <div className="mt-24 text-center border-t border-slate-800 pt-16">
                    <p className="text-purple-400 font-bold tracking-widest uppercase text-sm mb-4">Coming Soon</p>
                    <h2 className="text-4xl font-bold text-white mb-4">{t('seasons.title')}</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-8">{t('seasons.desc')}</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {['🌸 Spring', '☀️ Summer', '👰 Weddings', '🎂 Anniversaries', '🎃 Halloween'].map(s => (
                            <span key={s} className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-sm">{s}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Shelter Registration Modal */}
            {showRegisterForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setShowRegisterForm(false)}>
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-8 relative" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setShowRegisterForm(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>

                        {!submitted ? (
                            <>
                                <h3 className="text-2xl font-bold text-white mb-2">{t('shelter.cta')}</h3>
                                <p className="text-slate-400 mb-6">Help us find the heroes. We will verify and support them.</p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Shelter Name</label>
                                        <input
                                            required
                                            value={nominatedShelter.name}
                                            onChange={e => setNominatedShelter({ ...nominatedShelter, name: e.target.value })}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Location (City/Country)</label>
                                        <input
                                            required
                                            value={nominatedShelter.location}
                                            onChange={e => setNominatedShelter({ ...nominatedShelter, location: e.target.value })}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Contact Info (Web/Email/Phone)</label>
                                        <input
                                            required
                                            value={nominatedShelter.contact}
                                            onChange={e => setNominatedShelter({ ...nominatedShelter, contact: e.target.value })}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Why them?</label>
                                        <textarea
                                            value={nominatedShelter.reason}
                                            onChange={e => setNominatedShelter({ ...nominatedShelter, reason: e.target.value })}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                                        />
                                    </div>
                                    <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl mt-4">
                                        Submit Nomination
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-5xl mb-4">✅</div>
                                <h3 className="text-2xl font-bold text-white mb-2">Received!</h3>
                                <p className="text-slate-400">Our team will investigate. Thank you for being a hero.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};
