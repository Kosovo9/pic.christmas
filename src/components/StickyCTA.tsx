import React, { useState, useEffect } from 'react';
import { useI18n } from '../hooks/useI18n';

interface StickyCTAProps {
    onClick: () => void;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({ onClick }) => {
    const { t } = useI18n();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling down 300px (past hero)
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 md:hidden z-50 animate-slide-up">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent -z-10 h-32 bottom-0" />
            <button
                onClick={onClick}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transform active:scale-95 transition-all"
            >
                <span className="text-xl">✨</span>
                {t('hero.cta')}
            </button>
        </div>
    );
};
