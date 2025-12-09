"use client";

import React from 'react';
import { ToastProvider } from "@/context/ToastProvider";
import { LanguageProvider } from "@/context/LanguageContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <LanguageProvider>
            <ToastProvider>
                {children}
            </ToastProvider>
        </LanguageProvider>
    );
};
