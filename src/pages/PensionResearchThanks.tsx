import { useEffect } from 'react';
import { Link } from 'react-router';
import { CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import logoTransparent from '@/assets/uploads/wealthtech-logo-transparent.png';
import { initMetaPixel, trackMetaEvent } from '@/lib/metaPixel';
import { pushDataLayerEvent } from '@/lib/dataLayer';

const META_PIXEL_ID = '1439645368271393'; // "וולת'טק - מחקר פנסיוני"
const LEAD_FLAG = 'pr_lead_submitted';
const WHATSAPP_URL = `https://wa.me/972508210573?text=${encodeURIComponent('שלום, השארתי פרטים בעמוד מחקר הפנסיה')}`;

/**
 * Thank-you page of the pension research campaign. A separate URL so ad platforms (Taboola, Meta, Google)
 * can count a visit here as a conversion. The lead events fire once per submission: the form sets a
 * session flag, so a refresh or a direct visit does not count as another lead.
 */
export default function PensionResearchThanks() {
  useEffect(() => {
    document.title = 'תודה, הפנייה התקבלה | WealthTech';
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex';
    document.head.appendChild(robots);

    initMetaPixel(META_PIXEL_ID);
    if (sessionStorage.getItem(LEAD_FLAG)) {
      sessionStorage.removeItem(LEAD_FLAG);
      trackMetaEvent('Lead');
      pushDataLayerEvent('generate_lead', { form: 'pension_research' });
    }
    return () => robots.remove();
  }, []);

  return (
    <div className="min-h-screen bg-navy-dark font-sans flex flex-col">
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-end">
          <Link to="/" aria-label="לדף הבית">
            <img src={logoTransparent} alt="WealthTech - One Life. Plan IT Well" className="h-9 sm:h-11 w-auto" />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[520px] h-[520px] bg-gold/10 rounded-full blur-3xl" />
          </div>
          <div className="card-tech rounded-2xl p-8 sm:p-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-6" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 text-balance">
              תודה, <span className="text-gold">פנייתכם התקבלה</span>
            </h1>
            <p className="text-lg text-ink mb-3 text-pretty">
              צוות וולת׳טק קיבל את פנייתכם, ויחזור אליכם בהקדם לקביעת שיחה או פגישה.
            </p>
            <p className="text-ink-muted text-pretty mb-8">
              מקווים שנהניתם לצפות במחקר שלנו. עוד נדבר עליו בפגישה.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-dark font-semibold px-6 py-3 rounded-lg transition-colors">
                <MessageCircle className="w-5 h-5" />
                כתבו לנו בוואטסאפ
              </a>
              <a
                href="tel:0508210573"
                className="inline-flex items-center justify-center gap-2 border border-gold/50 text-ink hover:border-gold px-6 py-3 rounded-lg transition-colors">
                <Phone className="w-5 h-5 text-gold" />
                <span dir="ltr">050-8210573</span>
              </a>
            </div>

            <Link to="/" className="inline-block mt-8 text-sm text-ink-muted hover:text-gold transition-colors">
              לאתר וולת׳טק
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-ink-muted/80 leading-relaxed text-pretty">
          <p className="font-semibold text-ink mb-2">מידע משפטי</p>
          <p>וולת׳טק סוכנות לביטוח (2015) בע״מ, ח.פ. 515186971. כתובת: הסדנאות 8, הרצליה.</p>
          <p>
            דוא״ל: <a href="mailto:service@wealthtech.co.il" className="text-gold hover:underline">service@wealthtech.co.il</a>
            {' · '}טלפון: <a href="tel:0508210573" className="text-gold hover:underline" dir="ltr">050-8210573</a>
          </p>
          <p>נציג מורשה: אודי חברוני, מורשה מטעם הרשות לניירות ערך ומשרד האוצר.</p>
          <p className="mt-2">
            <a href="https://wealthtech.co.il/privacy" className="text-gold hover:underline">מדיניות פרטיות</a>
            {' · '}
            <a href="https://wealthtech.co.il/disclosure" className="text-gold hover:underline">גילוי נאות</a>
            {' · '}
            <a href="https://wealthtech.co.il/terms" className="text-gold hover:underline">תקנון האתר</a>
          </p>
        </div>
      </footer>
    </div>);

}
