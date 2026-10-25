// Google Tag Manager data layer. The GTM container itself is loaded from index.html.
// Events pushed here can be used as triggers in GTM (e.g. to fire the Taboola / Google conversion tags).

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Pushes a custom event to the GTM data layer. Never include personal details (name, phone, email). */
export function pushDataLayerEvent(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
