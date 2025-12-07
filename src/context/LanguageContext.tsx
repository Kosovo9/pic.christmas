import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'ar';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('es');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load preference from localStorage
        const saved = localStorage.getItem('language') as Language;
        if (saved) {
            setLanguage(saved);
        }
        setIsLoaded(true);
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
