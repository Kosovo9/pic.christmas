import React from 'react';
import { useI18n } from '../hooks/useI18n';

export const CharitySection = () => {
    const { t } = useI18n();
    const [modalState, setModalState] = React.useState<'none' | 'grant' | 'report'>('none');
    const [grantForm, setGrantForm] = React.useState({ org: '', email: '', reason: '' });
    const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'submitting' | 'success'>('idle');

    const handleGrantSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setSubmitStatus('success');
            setTimeout(() => {
                setModalState('none');
                setSubmitStatus('idle');
                setGrantForm({ org: '', email: '', reason: '' });
            }, 3000);
        }, 1500);
    };

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden" id="charity-section">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="text-emerald-400 font-bold tracking-widest uppercase mb-4">
                            {t('charity.pretitle')}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            {t('charity.title')}
                        </h2>
                        <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                            {t('charity.desc')}
                        </p>

                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
                            <h3 className="text-white font-bold mb-4">{t('charity.ledger_title')}</h3>
                            <div className="space-y-3 text-sm text-slate-400 font-mono">
                                <div className="flex justify-between">
                                    <span>TX_88a...9x1</span>
                                    <span className="text-emerald-400">+$1,420.00 (Shelter MX)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>TX_b21...4k2</span>
                                    <span className="text-emerald-400">+$850.00 (Dogs Trust UK)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>TX_c99...p00</span>
                                    <span className="text-emerald-400">+$3,200.00 (ASPCA USA)</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setModalState('grant')}
                                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                            >
                                {t('charity.apply_button')}
                            </button>
                            <button
                                onClick={() => setModalState('report')}
                                className="px-8 py-3 border border-slate-700 hover:border-emerald-500 text-slate-300 hover:text-white rounded-full font-bold transition-all active:scale-95"
                            >
                                {t('charity.report_button')}
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500 to-blue-600 rounded-3xl opacity-20 blur-xl" />
                        <img
                            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1000"
                            alt="Happy Dog"
                            className="relative rounded-3xl shadow-2xl border border-slate-700/50"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-xl">
                            <div className="text-2xl font-bold text-white">45,201</div>
                            <div className="text-xs text-slate-400 uppercase tracking-widest">{t('charity.report_meals')}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Modals --- */}

            {/* Grant Application Modal */}
            {modalState === 'grant' && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setModalState('none')}>
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-8 relative shadow-2xl" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setModalState('none')} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>

                        <div className="mb-6">
                            <div className="w-12 h-12 bg-emerald-900/50 rounded-full flex items-center justify-center text-2xl mb-4 border border-emerald-500/30">📝</div>
                            <h3 className="text-2xl font-bold text-white">{t('charity.modal_apply_title')}</h3>
                            <p className="text-slate-400 text-sm mt-1">{t('charity.modal_apply_desc')}</p>
                        </div>

                        {submitStatus === 'success' ? (
                            <div className="text-center py-12 animate-fade-in">
                                <div className="text-5xl mb-4">✅</div>
                                <h4 className="text-xl font-bold text-white mb-2">{t('charity.modal_success_title')}</h4>
                                <p className="text-slate-400">{t('charity.modal_success_desc')}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleGrantSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('charity.form_org')}</label>
                                    <input
                                        required
                                        type="text"
                                        value={grantForm.org}
                                        onChange={e => setGrantForm({ ...grantForm, org: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none"
                                        placeholder="e.g. Happy Paws Shelter"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('charity.form_email')}</label>
                                    <input
                                        required
                                        type="email"
                                        value={grantForm.email}
                                        onChange={e => setGrantForm({ ...grantForm, email: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none"
                                        placeholder="contact@shelter.org"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">{t('charity.form_reason')}</label>
                                    <textarea
                                        required
                                        value={grantForm.reason}
                                        onChange={e => setGrantForm({ ...grantForm, reason: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 outline-none h-24 resize-none"
                                        placeholder="Tell us about your needs..."
                                    />
                                </div>
                                <button
                                    disabled={submitStatus === 'submitting'}
                                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {submitStatus === 'submitting' ? 'Sending...' : t('charity.form_submit')}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {/* Impact Report Modal */}
            {modalState === 'report' && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setModalState('none')}>
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl p-8 relative shadow-2xl" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setModalState('none')} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>

                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-white">{t('charity.report_title')}</h3>
                                <p className="text-emerald-400 text-sm font-mono">HASH: #882...99A</p>
                            </div>
                            <div className="text-right hidden sm:block">
                                <div className="text-3xl font-bold text-white">12,402</div>
                                <div className="text-xs text-slate-400 uppercase">{t('charity.report_animals')}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                                <div className="text-2xl mb-2">🥣</div>
                                <div className="text-xl font-bold text-white">45.2k</div>
                                <div className="text-xs text-slate-500">{t('charity.report_meals')}</div>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                                <div className="text-2xl mb-2">💉</div>
                                <div className="text-xl font-bold text-white">850+</div>
                                <div className="text-xs text-slate-500">{t('charity.report_vaccines')}</div>
                            </div>
                            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                                <div className="text-2xl mb-2">🏠</div>
                                <div className="text-xl font-bold text-white">127</div>
                                <div className="text-xs text-slate-500">{t('charity.report_shelters')}</div>
                            </div>
                        </div>

                        <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 mb-8">
                            <h4 className="text-slate-300 font-bold mb-4 text-sm uppercase tracking-wider">{t('charity.report_allocation')}</h4>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-white">Food & Supplies</span>
                                        <span className="text-white">65%</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[65%]" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-white">Medical Care</span>
                                        <span className="text-white">25%</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[25%]" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-white">Operations</span>
                                        <span className="text-white">10%</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-purple-500 w-[10%]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            className="w-full border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            <span>📄</span> {t('charity.download_report')}
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};
