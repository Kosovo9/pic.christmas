// lib/analytics.ts
'use client';

/**
 * Unified Analytics Tracking
 * Supports: Google Analytics 4, Facebook Pixel, TikTok Pixel
 */

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        fbq?: (...args: any[]) => void;
        ttq?: {
            track: (event: string, params?: Record<string, any>) => void;
            page: () => void;
        };
    }
}

// Google Analytics 4
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, params);
    }
    console.log('[Analytics] GA4 Event:', eventName, params);
};

// Facebook Pixel
export const trackFBEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', eventName, params);
    }
    console.log('[Analytics] FB Event:', eventName, params);
};

// TikTok Pixel
export const trackTikTokEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.ttq) {
        window.ttq.track(eventName, params);
    }
    console.log('[Analytics] TikTok Event:', eventName, params);
};

// Unified tracking across all platforms
export const trackUnified = (eventName: string, params?: Record<string, any>) => {
    trackEvent(eventName, params);

    // Map to Facebook standard events
    const fbEventMap: Record<string, string> = {
        'upload_started': 'ViewContent',
        'begin_checkout': 'InitiateCheckout',
        'purchase': 'Purchase',
        'affiliate_signup': 'Lead'
    };

    if (fbEventMap[eventName]) {
        trackFBEvent(fbEventMap[eventName], params);
    }

    // Map to TikTok standard events
    const ttEventMap: Record<string, string> = {
        'upload_started': 'ViewContent',
        'begin_checkout': 'InitiateCheckout',
        'purchase': 'CompletePayment'
    };

    if (ttEventMap[eventName]) {
        trackTikTokEvent(ttEventMap[eventName], params);
    }
};

// Page view tracking
export const trackPageView = (url: string) => {
    if (typeof window !== 'undefined') {
        if (window.gtag) {
            window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
                page_path: url,
            });
        }
        if (window.fbq) {
            window.fbq('track', 'PageView');
        }
        if (window.ttq) {
            window.ttq.page();
        }
    }
    console.log('[Analytics] Page View:', url);
};
