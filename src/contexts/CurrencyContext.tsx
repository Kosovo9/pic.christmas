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

    // Initial sync with language, only if user hasn't manually overridden
    useEffect(() => {
        if (!hasUserSelected) {
            const recommended = getCurrencyForLanguage(language);
            setCurrency(recommended);
        }
    }, [language, hasUserSelected]);

    const handleSetCurrency = (code: CurrencyCode) => {
        setCurrency(code);
        setHasUserSelected(true);
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
