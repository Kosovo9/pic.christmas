import React from 'react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface FooterProps {
    language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
    return (
        <footer className="bg-[#000000] border-t border-[#3E0000] py-12 mt-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="flex justify-center items-center gap-2 mb-6">
                     <span className="text-2xl font-serif font-bold tracking-widest text-[#D4AF37]">
                        NEXORA
                    </span>
                </div>
                
                {/* Legal Disclaimer */}
                <div className="max-w-3xl mx-auto mb-8 p-4 border-t border-b border-[#3E0000]">
                    <p className="text-[#666] text-[10px] leading-relaxed uppercase tracking-wide">
                        {TRANSLATIONS[language].footer.disclaimer}
                    </p>
                </div>

                <div className="flex justify-center gap-6 mb-8 text-[#444] text-xs">
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                    <span>Contact</span>
                </div>

                <p className="text-[#444] text-xs">
                    &copy; {new Date().getFullYear()} Nexora Studio. {TRANSLATIONS[language].footer.rights}
                </p>
            </div>
        </footer>
    )
}