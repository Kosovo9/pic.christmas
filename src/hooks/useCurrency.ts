// hooks/useCurrency.ts
import { useState, useEffect } from 'react';
import { useI18n } from './useI18n';

export type CurrencyCode = 'USD' | 'EUR' | 'MXN' | 'BRL' | 'GBP' | 'JPY';

interface CurrencyRate {
    code: CurrencyCode;
    rate: number; // relative to USD
    symbol: string;
    name: string;
}

// Simulated Live Rates (In a real app, fetch from API)
const RATES: Record<CurrencyCode, CurrencyRate> = {
    USD: { code: 'USD', rate: 1, symbol: '$', name: 'US Dollar' },
    EUR: { code: 'EUR', rate: 0.92, symbol: '€', name: 'Euro' },
    MXN: { code: 'MXN', rate: 17.50, symbol: '$', name: 'Mexican Peso' },
    BRL: { code: 'BRL', rate: 4.95, symbol: 'R$', name: 'Brazilian Real' },
    GBP: { code: 'GBP', rate: 0.79, symbol: '£', name: 'British Pound' },
    JPY: { code: 'JPY', rate: 148.0, symbol: '¥', name: 'Japanese Yen' },
};

// Mapping language to default currency preference
const LANG_TO_CURRENCY: Record<string, CurrencyCode> = {
    'en': 'USD',
    'es': 'MXN', // Default to MXN for Spanish, can change logic later
    'fr': 'EUR',
    'de': 'EUR',
    'it': 'EUR',
    'pt': 'BRL',
    'ru': 'USD', // Fallback
    'zh': 'USD', // or CNY if supported
    'ja': 'JPY',
    'ar': 'USD'
};

export const useCurrency = (basePriceUSD: number) => {
    const { language } = useI18n();
    const [currency, setCurrency] = useState<CurrencyCode>('USD');

    // Auto-detect preference based on language
    useEffect(() => {
        const pref = LANG_TO_CURRENCY[language] || 'USD';
        setCurrency(pref);
    }, [language]);

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat(language, {
            style: 'currency',
            currency: currency
        }).format(amount);
    };

    const getBreakdown = () => {
        const rate = RATES[currency].rate;
        const subtotal = basePriceUSD * rate;

        // Processing Fee (e.g., 2.9% + 0.30 equivalent)
        // Hardcoded simplifcation for user clarity as requested
        const processingFee = (subtotal * 0.05); // 5% coverage
        const total = subtotal + processingFee;

        return {
            rate,
            symbol: RATES[currency].symbol,
            currencyCode: currency,
            subtotal: parseFloat(subtotal.toFixed(2)),
            fee: parseFloat(processingFee.toFixed(2)),
            total: parseFloat(total.toFixed(2)),
            displayTotal: formatPrice(total),
            displaySubtotal: formatPrice(subtotal),
            displayFee: formatPrice(processingFee)
        };
    };

    return {
        currency,
        setCurrency,
        availableCurrencies: Object.keys(RATES) as CurrencyCode[],
        breakdown: getBreakdown(),
        rates: RATES
    };
};
