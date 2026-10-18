// Meta (Facebook) Pixel - loaded only on pages that call `initMetaPixel`.
// Measures campaign visits and leads for the ad account. Nothing is loaded on the rest of the site.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

let initialized = false;

/** Loads the pixel script once and records a PageView. */
export function initMetaPixel(pixelId: string): void {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      const q = fbq as unknown as {callMethod?: (...a: unknown[]) => void;queue: unknown[][];};
      if (q.callMethod) q.callMethod(...args);else q.queue.push(args);
    } as unknown as {callMethod?: unknown;queue: unknown[][];push: unknown;loaded: boolean;version: string;};
    const q = fbq as unknown as {queue: unknown[][];push: unknown;loaded: boolean;version: string;};
    q.queue = [];
    q.push = fbq;
    q.loaded = true;
    q.version = '2.0';
    window.fbq = fbq as unknown as Window['fbq'];
    window._fbq = fbq;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
  }

  window.fbq?.('init', pixelId);
  window.fbq?.('track', 'PageView');
}

/** Standard Meta event, e.g. 'Lead' when a form is submitted. */
export function trackMetaEvent(name: string): void {
  window.fbq?.('track', name);
}
