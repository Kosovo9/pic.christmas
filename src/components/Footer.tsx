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

                {/* Dynamic Legal Disclaimer */}
                <div className="max-w-4xl mx-auto mb-6 p-4 bg-slate-900/50 rounded-lg border border-slate-800/50">
                    <p className="text-slate-400 text-xs leading-relaxed uppercase tracking-wide">
                        {t('footer.disclaimer')}
                    </p>
                </div>

                <p className="text-slate-500 text-sm mb-2">
                    © {new Date().getFullYear()} Nexora Studio. {t('footer.terms')}
                </p>
                <div className="mt-4 flex flex-wrap justify-center items-center gap-4 text-xs text-gray-400">
                    <span>Pagos:</span>
                    <span className="font-medium text-slate-300">Mercado&nbsp;Pago</span>
                    <span>|</span>
                    <span className="font-medium text-slate-300">PayPal</span>
                    <span>|</span>
                    <span className="font-medium text-slate-300">Stripe</span>
                    <span>|</span>
                    <span className="font-medium text-slate-300">Lemon&nbsp;Squeezy</span>
                </div>
                <div className="mt-2 text-xs text-gray-500 italic">
                    Afiliados: gana 30–35% de comisión por cada venta referida.
                </div>
            </div>
        </footer>
    );
};
