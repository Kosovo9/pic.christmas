
// services/CurrencyService.ts

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'MXN' | 'BRL' | 'CAD' | 'AUD' | 'JPY' | 'CNY' | 'INR' | 'RUB' | 'KRW' | 'CHF' | 'SEK' | 'SAR' | 'AED' | 'ARS' | 'COP' | 'CLP' | 'PEN';

interface CurrencyInfo {
    code: CurrencyCode;
    symbol: string;
    rate: number; // Exchange rate relative to USD
    locale: string;
}

// ⚠️ Exchange rates simulated for "Real-Time" feel. 
// In a real production app with high volume, we would fetch this from an API (e.g. OpenExchangeRates) every hour.
export const EXCHANGE_RATES: Record<CurrencyCode, CurrencyInfo> = {
    USD: { code: 'USD', symbol: '$', rate: 1.0, locale: 'en-US' },
    EUR: { code: 'EUR', symbol: '€', rate: 0.92, locale: 'de-DE' },
    GBP: { code: 'GBP', symbol: '£', rate: 0.79, locale: 'en-GB' },
    MXN: { code: 'MXN', symbol: '$', rate: 17.50, locale: 'es-MX' },
    BRL: { code: 'BRL', symbol: 'R$', rate: 5.10, locale: 'pt-BR' },
    CAD: { code: 'CAD', symbol: 'C$', rate: 1.36, locale: 'en-CA' },
    AUD: { code: 'AUD', symbol: 'A$', rate: 1.52, locale: 'en-AU' },
    JPY: { code: 'JPY', symbol: '¥', rate: 145.00, locale: 'ja-JP' },
    CNY: { code: 'CNY', symbol: '¥', rate: 7.20, locale: 'zh-CN' },
    INR: { code: 'INR', symbol: '₹', rate: 83.00, locale: 'en-IN' },
    RUB: { code: 'RUB', symbol: '₽', rate: 90.00, locale: 'ru-RU' },
    KRW: { code: 'KRW', symbol: '₩', rate: 1300.00, locale: 'ko-KR' },
    CHF: { code: 'CHF', symbol: 'Fr', rate: 0.88, locale: 'de-CH' },
    SEK: { code: 'SEK', symbol: 'kr', rate: 10.50, locale: 'sv-SE' },
    SAR: { code: 'SAR', symbol: '﷼', rate: 3.75, locale: 'ar-SA' },
    AED: { code: 'AED', symbol: 'د.إ', rate: 3.67, locale: 'ar-AE' },
    ARS: { code: 'ARS', symbol: '$', rate: 850.00, locale: 'es-AR' },
    COP: { code: 'COP', symbol: '$', rate: 3900.00, locale: 'es-CO' },
    CLP: { code: 'CLP', symbol: '$', rate: 940.00, locale: 'es-CL' },
    PEN: { code: 'PEN', symbol: 'S/', rate: 3.70, locale: 'es-PE' },
};

export const convertPrice = (priceInUSD: number, targetCurrency: CurrencyCode): string => {
    const currency = EXCHANGE_RATES[targetCurrency];
    const converted = priceInUSD * currency.rate;

    // Formatting nuances
    return new Intl.NumberFormat(currency.locale, {
        style: 'currency',
        currency: currency.code,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(converted);
};

export const getCurrencyForLanguage = (language: string): CurrencyCode => {
    const map: Record<string, CurrencyCode> = {
        'en': 'USD',
        'es': 'MXN', // Default Spanish to MXN for this specific user/region primarily, or generic EUR for Spain? 
        // Given the user context (Mexico/LatAm focus often with USD), let's default 'es' to MXN or make it smarter.
        // Actually, usually 'es' -> EUR (Spain) and 'es-MX' -> MXN. 
        // Let's adhere to standard usually, but since the user provided MXN examples before...
        'es-MX': 'MXN',
        'es-ES': 'EUR',
        'pt': 'BRL',
        'fr': 'EUR',
        'de': 'EUR',
        'it': 'EUR',
        'ja': 'JPY',
        'zh': 'CNY',
        'ru': 'RUB',
        'ar': 'SAR',
    };

    // return map[language] || 'USD';
    // Logic: checking prefixes
    if (language.startsWith('es-MX')) return 'MXN';
    if (language.startsWith('pt')) return 'BRL';
    if (language.startsWith('ja')) return 'JPY';
    if (language.startsWith('zh')) return 'CNY';
    if (language.startsWith('ru')) return 'RUB';
    if (language.startsWith('ar')) return 'SAR';
    if (['es', 'fr', 'de', 'it'].some(l => language.startsWith(l))) return 'EUR';

    return 'USD';
};
