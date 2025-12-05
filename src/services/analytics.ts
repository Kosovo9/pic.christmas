type EventName =
    | 'view_landing'
    | 'upload_photo'
    | 'generate_start'
    | 'generate_success'
    | 'generate_error'
    | 'purchase_click';

interface EventProperties {
    [key: string]: any;
}

export const trackEvent = (eventName: EventName, properties?: EventProperties) => {
    // In a real app, you would send this to Google Analytics, Plausible, Mixpanel, etc.
    console.log(`[Analytics] ${eventName}`, properties);

    // Example integration with window.gtag if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, properties);
    }
};
