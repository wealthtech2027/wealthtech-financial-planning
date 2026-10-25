import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Menu, X } from 'lucide-react';
import logoTransparent from '@/assets/uploads/wealthtech-logo-transparent.png';

const NAV_ITEMS = [
  { id: 'pr-research', label: 'המחקר' },
  { id: 'pr-checks', label: 'מה בודקים' },
  { id: 'pr-findings', label: 'ממצאים' },
  { id: 'pr-studio', label: 'מהאולפן' },
  { id: 'pr-about', label: 'מי אנחנו' },
  { id: 'pr-faq', label: 'שאלות נפוצות' }
];

interface PensionNavProps {
  onCtaClick: () => void;
}

/** Sticky header for the pension landing page: section links on the right, logo on the left (RTL page). */
export function PensionNav({ onCtaClick }: PensionNavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors ${scrolled || open ? 'bg-navy-dark/90 backdrop-blur border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* First in DOM = right side in RTL */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 -me-2 text-ink"
            aria-label={open ? 'סגירת תפריט' : 'פתיחת תפריט'}
            aria-expanded={open}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <nav className="hidden lg:flex items-center gap-1" aria-label="ניווט בעמוד">
            {NAV_ITEMS.map(({ id, label }) =>
            <button
              key={id}
              type="button"
              onClick={() => goTo(id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active === id ? 'text-gold' : 'text-ink-muted hover:text-white'}`}>
                {label}
              </button>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onCtaClick}
            className="hidden sm:inline-flex bg-gold hover:bg-gold-light text-navy-dark font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
            לתיאום בדיקת תיק פנסיוני
          </button>
          {/* Last in DOM = left side in RTL */}
          <Link to="/" aria-label="לדף הבית" className="shrink-0">
            <img
              src={logoTransparent}
              alt="WealthTech - One Life. Plan IT Well"
              className="h-9 sm:h-11 w-auto" />
          </Link>
        </div>
      </div>

      {open &&
      <nav className="lg:hidden border-t border-white/10 px-4 py-3 flex flex-col" aria-label="ניווט בעמוד">
          {NAV_ITEMS.map(({ id, label }) =>
        <button
          key={id}
          type="button"
          onClick={() => goTo(id)}
          className={`text-right py-3 text-base font-medium border-b border-white/5 ${active === id ? 'text-gold' : 'text-ink'}`}>
              {label}
            </button>
        )}
          <button
          type="button"
          onClick={() => {setOpen(false);onCtaClick();}}
          className="mt-3 bg-gold text-navy-dark font-semibold px-5 py-3 rounded-lg">
            לתיאום בדיקת תיק פנסיוני
          </button>
        </nav>
      }
    </header>);

}
