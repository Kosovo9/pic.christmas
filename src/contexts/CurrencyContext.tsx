'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode, getCurrencyForLanguage } from '../services/CurrencyService';
import { useI18n } from '../hooks/useI18n';

interface CurrencyContextType {
    currency: CurrencyCode;
    setCurrency: (code: CurrencyCode) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const { language } = useI18n();
    const [currency, setCurrency] = useState<CurrencyCode>('USD');
    const [hasUserSelected, setHasUserSelected] = useState(false);

    // Initial sync with language or hydrate from localStorage
    useEffect(() => {
        // Try to recover from localStorage first (User Preference > Language Default)
        const savedCurrency = localStorage.getItem('pic_currency') as CurrencyCode;
        if (savedCurrency) {
            setCurrency(savedCurrency);
            setHasUserSelected(true);
        } else if (!hasUserSelected) {
            // Fallback to language-based default
            const recommended = getCurrencyForLanguage(language);
            setCurrency(recommended);
        }
    }, [language, hasUserSelected]);

    const handleSetCurrency = (code: CurrencyCode) => {
        setCurrency(code);
        setHasUserSelected(true);
        localStorage.setItem('pic_currency', code); // Persist
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}
