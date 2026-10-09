import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ScanSearch, MessageCircle } from 'lucide-react';

const WHATSAPP_URL = `https://wa.me/972508210573?text=${encodeURIComponent('שלום, אשמח לקבל פרטים נוספים על השירותים שלכם')}`;

// Pages that already are the conversion step - no need for the bar there
const HIDDEN_ON = ['/rights-check', '/onboarding'];

// Show the bar only once the visitor scrolled past the hero (which has its own CTAs)
const SHOW_AFTER_PX = 560;

/**
 * Sticky bottom bar for mobile: one primary action + WhatsApp.
 * Replaces the scattered floating buttons on small screens.
 */
export function MobileActionBar() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <>
      {/* Spacer so the bar never covers the end of the page */}
      <div className="md:hidden h-20" aria-hidden="true" />

      <div
        className={`md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-gold/20 bg-navy-dark/95 backdrop-blur-md px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'}`
        }
        aria-hidden={!visible}>
        <div className="flex items-center gap-3">
          <Link
            to="/rights-check"
            tabIndex={visible ? 0 : -1}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-gold active:bg-gold-light text-navy-dark font-bold py-3 rounded-xl">
            <ScanSearch className="w-5 h-5" />
            בדיקת זכויות חינם
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={visible ? 0 : -1}
            aria-label="דברו איתנו בוואטסאפ"
            className="w-12 h-12 shrink-0 rounded-xl bg-[#25D366] text-white flex items-center justify-center">
            <MessageCircle className="w-6 h-6 fill-white" />
          </a>
        </div>
      </div>
    </>);

}
