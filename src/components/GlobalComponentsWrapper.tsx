'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export const GlobalComponentsWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    if (isAdmin) return null;

    return <>{children}</>;
};
