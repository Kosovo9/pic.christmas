import { useI18n } from '../hooks/useI18n';

interface FooterProps {
    language: any; // Allow passing down or utilizing hook
}

export const Footer: React.FC<FooterProps> = () => {
    const { t } = useI18n();

    return (
        <footer className="bg-[#020408] border-t border-slate-800 py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <span className="text-xl font-bold tracking-wider text-slate-200">
                        NEXORA · pic.christmas
                    </span>
                </div>

                {/* Dynamic Legal Disclaimer & Safety Shield 🛡️ */}
                <div className="max-w-5xl mx-auto mb-8 p-6 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-xl">
                    <div className="flex flex-col md:flex-row items-center gap-6 text-left">
                        <div className="text-4xl text-slate-500">⚖️</div>
                        <div className="flex-1">
                            <h4 className="text-slate-200 font-bold mb-2 uppercase tracking-widest text-xs">
                                {t('footer.legal_title')}
                            </h4>
                            <p className="text-slate-400 text-xs leading-relaxed">
                                {t('footer.disclaimer_full')}
                            </p>
                        </div>
                        {/* Footer CTA Button */}
                        <div>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="whitespace-nowrap px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-white font-bold text-sm transition-all flex items-center gap-2"
                            >
                                <span>🚀</span>
                                <span>{t('footer.start_now')}</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Philanthropy Badge 🐾 */}
                <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 bg-emerald-900/20 border border-emerald-500/30 rounded-full text-emerald-400 hover:bg-emerald-900/30 transition-all cursor-pointer">
                    <span>🐶</span>
                    <span className="text-xs font-bold tracking-wide">{t('footer.picheart_badge')}</span>
                </div>

                <p className="text-slate-500 text-sm mb-2">
                    © {new Date().getFullYear()} Nexora Studio. {t('footer.terms')}
                </p>
                <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs text-gray-400">
                    <span>{t('footer.payments')}:</span>
                    <span className="font-medium text-slate-300">Mercado&nbsp;Pago</span>
                    <span>|</span>
                    <span className="font-medium text-slate-300">PayPal</span>
                    <span>|</span>
                    <span className="font-medium text-slate-300">Stripe</span>
                    <span>|</span>
                    <span className="font-medium text-slate-300">Lemon&nbsp;Squeezy</span>
                </div>
                <div className="mt-2 text-xs text-gray-500 italic">
                    {t('footer.affiliates')}
                </div>
            </div>
        </footer>
    );
};
