import { useState, useEffect } from 'react';
import { Accessibility, Plus, Minus, Eye, EyeOff, Link2, Pause, RotateCcw, X } from 'lucide-react';

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  stopAnimations: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  grayscale: false,
  highlightLinks: false,
  stopAnimations: false
};

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('accessibility-settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);

  useEffect(() => {
    applySettings(settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applySettings = (s: AccessibilitySettings) => {
    const html = document.documentElement;

    // Font size
    html.style.fontSize = `${s.fontSize}%`;

    // High contrast
    if (s.highContrast) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }

    // Grayscale
    if (s.grayscale) {
      html.classList.add('grayscale-mode');
    } else {
      html.classList.remove('grayscale-mode');
    }

    // Highlight links
    if (s.highlightLinks) {
      html.classList.add('highlight-links');
    } else {
      html.classList.remove('highlight-links');
    }

    // Stop animations
    if (s.stopAnimations) {
      html.classList.add('stop-animations');
    } else {
      html.classList.remove('stop-animations');
    }
  };

  const increaseFontSize = () => {
    setSettings((s) => ({ ...s, fontSize: Math.min(s.fontSize + 10, 150) }));
  };

  const decreaseFontSize = () => {
    setSettings((s) => ({ ...s, fontSize: Math.max(s.fontSize - 10, 80) }));
  };

  const toggleHighContrast = () => {
    setSettings((s) => ({ ...s, highContrast: !s.highContrast }));
  };

  const toggleGrayscale = () => {
    setSettings((s) => ({ ...s, grayscale: !s.grayscale }));
  };

  const toggleHighlightLinks = () => {
    setSettings((s) => ({ ...s, highlightLinks: !s.highlightLinks }));
  };

  const toggleStopAnimations = () => {
    setSettings((s) => ({ ...s, stopAnimations: !s.stopAnimations }));
  };

  const resetAll = () => {
    setSettings(defaultSettings);
  };

  return (
    <>
      {/* Floating Button */}
      <button data-ev-id="ev_116e9438ce"
      onClick={() => setIsOpen(!isOpen)}
      className="fixed bottom-24 left-4 w-11 h-11 md:bottom-6 md:left-6 md:w-14 md:h-14 z-40 bg-navy border border-white/10 hover:bg-navy-light text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
      aria-label="תפריט נגישות">

        <Accessibility className="w-5 h-5 md:w-7 md:h-7" />
      </button>

      {/* Accessibility Panel */}
      {isOpen &&
      <div data-ev-id="ev_47a44e4b3f" className="fixed bottom-40 left-4 md:bottom-24 md:left-6 z-50 w-80 max-w-[calc(100vw-2rem)] max-h-[60vh] overflow-y-auto bg-surface rounded-2xl shadow-2xl border border-border overflow-hidden" dir="rtl">
          {/* Header */}
          <div data-ev-id="ev_c75d0a44d6" className="bg-navy text-white px-5 py-4 flex items-center justify-between">
            <div data-ev-id="ev_9acbc5716f" className="flex items-center gap-3">
              <Accessibility className="w-5 h-5" />
              <span data-ev-id="ev_9ff4355ee8" className="font-semibold">הגדרות נגישות</span>
            </div>
            <button data-ev-id="ev_424246eb0e"
          onClick={() => setIsOpen(false)}
          className="hover:bg-white/20 rounded-full p-1 transition-colors"
          aria-label="סגור תפריט נגישות">

              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div data-ev-id="ev_3772d8e3b0" className="p-4 flex flex-col gap-3">
            {/* Font Size */}
            <div data-ev-id="ev_e2e1807574" className="bg-surface-2/50 rounded-xl p-4">
              <div data-ev-id="ev_ebab34c72c" className="text-sm font-medium text-ink mb-3">גודל טקסט ({settings.fontSize}%)</div>
              <div data-ev-id="ev_9f1d6da364" className="flex items-center gap-3">
                <button data-ev-id="ev_1e82b02dde"
              onClick={decreaseFontSize}
              disabled={settings.fontSize <= 80}
              className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center hover:bg-navy hover:text-white hover:border-gold/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="הקטן טקסט">

                  <Minus className="w-5 h-5" />
                </button>
                <div data-ev-id="ev_54d60fd074" className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                  <div data-ev-id="ev_f88e6256f7"
                className="h-full bg-gold rounded-full transition-all"
                style={{ width: `${(settings.fontSize - 80) / 70 * 100}%` }} />

                </div>
                <button data-ev-id="ev_c6847c5fcd"
              onClick={increaseFontSize}
              disabled={settings.fontSize >= 150}
              className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center hover:bg-navy hover:text-white hover:border-gold/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="הגדל טקסט">

                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Toggle Options */}
            <div data-ev-id="ev_d5d51f18c4" className="grid grid-cols-2 gap-3">
              <button data-ev-id="ev_5c46246391"
            onClick={toggleHighContrast}
            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
            settings.highContrast ?
            'border-gold/40 bg-navy text-white' :
            'border-border bg-surface hover:border-gold/50'}`
            }>

                <Eye className="w-6 h-6" />
                <span data-ev-id="ev_29c5a7edad" className="text-sm font-medium">ניגודיות גבוהה</span>
              </button>

              <button data-ev-id="ev_6347e8b439"
            onClick={toggleGrayscale}
            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
            settings.grayscale ?
            'border-gold/40 bg-navy text-white' :
            'border-border bg-surface hover:border-gold/50'}`
            }>

                <EyeOff className="w-6 h-6" />
                <span data-ev-id="ev_5471925fdf" className="text-sm font-medium">גווני אפור</span>
              </button>

              <button data-ev-id="ev_8484b240c7"
            onClick={toggleHighlightLinks}
            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
            settings.highlightLinks ?
            'border-gold/40 bg-navy text-white' :
            'border-border bg-surface hover:border-gold/50'}`
            }>

                <Link2 className="w-6 h-6" />
                <span data-ev-id="ev_6d54bd525e" className="text-sm font-medium">הדגשת קישורים</span>
              </button>

              <button data-ev-id="ev_da5cbaa68a"
            onClick={toggleStopAnimations}
            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
            settings.stopAnimations ?
            'border-gold/40 bg-navy text-white' :
            'border-border bg-surface hover:border-gold/50'}`
            }>

                <Pause className="w-6 h-6" />
                <span data-ev-id="ev_566790362a" className="text-sm font-medium">עצירת אנימציות</span>
              </button>
            </div>

            {/* Reset Button */}
            <button data-ev-id="ev_c9ab184d28"
          onClick={resetAll}
          className="w-full py-3 rounded-xl border-2 border-border hover:border-red-500 hover:bg-red-500/10 hover:text-red-400 flex items-center justify-center gap-2 transition-all">

              <RotateCcw className="w-5 h-5" />
              <span data-ev-id="ev_7211b2a80a" className="font-medium">איפוס הגדרות</span>
            </button>
          </div>

          {/* Footer */}
          <div data-ev-id="ev_67ffe02d9f" className="px-4 py-3 bg-surface-2/30 border-t border-border">
            <p data-ev-id="ev_d401d70e3f" className="text-xs text-ink-muted text-center">אנו מחויבים להנגשת האתר לכלל המשתמשים</p>
          </div>
        </div>
      }
    </>);

}