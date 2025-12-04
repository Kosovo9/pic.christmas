
export type AnalyticsEvent = 
  | 'view_landing' 
  | 'upload_photo' 
  | 'select_scenario'
  | 'generate_portrait_start' 
  | 'generate_portrait_success' 
  | 'generate_portrait_error' 
  | 'purchase_package_click';

export const trackEvent = (eventName: AnalyticsEvent, properties?: Record<string, any>) => {
  // Stub for future Analytics integration (e.g., Google Analytics, Plausible, Mixpanel)
  // In production, you would replace this console.log with the actual tracking call.
  
  const timestamp = new Date().toISOString();
  
  console.groupCollapsed(`%c[Analytics] ${eventName}`, 'color: #3b82f6; font-weight: bold;');
  console.log('Timestamp:', timestamp);
  if (properties) {
    console.log('Properties:', properties);
  }
  console.groupEnd();

  // Example integration structure:
  /*
  if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, properties);
  }
  */
};
