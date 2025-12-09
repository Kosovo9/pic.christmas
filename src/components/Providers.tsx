"use client";

import React from 'react';
import { ToastProvider } from "@/context/ToastContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <LanguageProvider>
            <CurrencyProvider>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </CurrencyProvider>
        </LanguageProvider>
    );
};
