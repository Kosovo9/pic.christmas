import React from 'react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface FooterProps {
    language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
    return (
        <footer className="bg-[#020408] border-t border-slate-800 py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <span className="text-xl font-bold tracking-wider text-slate-200">
                        NEXORA · pic.christmas
                    </span>
                </div>
                <p className="text-slate-500 text-sm mb-2">
                    © {new Date().getFullYear()} Nexora Studio. {TRANSLATIONS[language].footer.rights}
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
