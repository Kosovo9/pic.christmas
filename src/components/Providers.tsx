"use client";

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { ToastProvider } from "@/context/ToastContext";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

// Import Clerk Localizations
import { esES, enUS, frFR, deDE, itIT, ptPT, ruRU, zhCN, jaJP, arSA } from '@clerk/localizations';

const clerkLocales: Record<string, any> = {
    es: esES,
    en: enUS,
    fr: frFR,
    de: deDE,
    it: itIT,
    pt: ptPT,
    ru: ruRU,
    zh: zhCN,
    ja: jaJP,
    ar: arSA
};

const InnerProviders = ({ children }: { children: React.ReactNode }) => {
    const { language } = useLanguage();

    return (
        <ClerkProvider localization={clerkLocales[language] || esES}>
            <ToastProvider>
                {children}
            </ToastProvider>
        </ClerkProvider>
    );
};

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <LanguageProvider>
            <InnerProviders>
                {children}
            </InnerProviders>
        </LanguageProvider>
    );
};
