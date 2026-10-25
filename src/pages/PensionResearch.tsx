import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Play,
  TrendingUp,
  Percent,
  ShieldCheck,
  Tv,
  Users,
  Layers,
  BadgeCheck } from
'lucide-react';
import { PensionNav } from '@/components/PensionNav';
import { LogoMarquee } from '@/components/LogoMarquee';
import { YouTubeFacade } from '@/components/YouTubeFacade';
import { sendLead } from '@/lib/sendLead';
import { initMetaPixel, trackMetaEvent } from '@/lib/metaPixel';
import { pushDataLayerEvent } from '@/lib/dataLayer';

const META_PIXEL_ID = '1439645368271393'; // "וולת'טק - מחקר פנסיוני"

const VIDEO_ID = 'XIXy_MuYlcQ';
const CHANNEL = 'ערוץ 10 - ערוץ הכלכלה של ישראל';

const checks = [
{ icon: TrendingUp, title: 'ביצועים', text: 'איך הקרן שלכם ביצעה לעומת המובילות בשוק לאורך זמן.' },
{ icon: Percent, title: 'דמי ניהול', text: 'כמה אתם משלמים בפועל, ומה המשמעות על הצבירה לפרישה.' },
{ icon: ShieldCheck, title: 'כיסויים ביטוחיים', text: 'האם הכיסוי לנכות ולשארים מתאים למשפחה ולשכר שלכם.' }];


const trust = [
{ icon: Users, title: 'בכירים מהחברות המובילות', text: 'מלווים מנהלים, מייסדים ומשפחות בעלות הון בקבלת החלטות פיננסיות משמעותיות.' },
{ icon: Layers, title: 'תמונה אחת, תוכנית אחת', text: 'פנסיה, השקעות, ביטוח ומיצוי זכויות, מחוברים לתוכנית אחת ולא כאוסף של מוצרים.' },
{ icon: BadgeCheck, title: 'מורשים ומפוקחים', text: 'פועלים ברישיון משרד האוצר. שירותי ניהול ההון ניתנים באמצעות קבוצת פיוניר, בפיקוח הרשות לניירות ערך.' }];


// Figures from the WealthTech pension research desk (Pensia-Net data through Aug 2026, under-50 track)
const findings = [
{ value: '₪2.39M', label: 'מיליון ש״ח שהושקעו לפני 10 שנים, בממוצע הגופים' },
{ value: '13%-17%', label: 'טווח התשואות בשנה האחרונה בין הגופים הגדולים (לפי פנסיה-נט, רשות שוק ההון)' },
{ value: '~58%', label: 'חשיפה ממוצעת למניות בכספי הפנסיה' },
{ value: '₪200,000+', label: 'הפער ב-10 שנים בין הקרן המובילה לחלשה, על השקעה של מיליון ש״ח' }];


const slides = [
{
  src: '/campaign/pension-million-10y',
  alt: 'גרף: מה קרה למיליון שקל בקרנות הפנסיה ב-10 שנים, עד 2,390,903 ש"ח',
  caption: 'חישוב היפותטי: סכום חד-פעמי באוגוסט 2016, ללא הפקדות ומשיכות, נומינלי, לפני מס ואינפלציה.'
}];


const faqs = [
{
  q: 'מי זה וולת׳טק?',
  a: 'וולת׳טק היא סוכנות לביטוח שמלווה משפחות ובכירים בתכנון פיננסי, פנסיוני וביטוחי. אנחנו ממפים את כל התמונה הפיננסית, ובונים תוכנית אחת שמחברת בין פנסיה, השקעות, ביטוחים ומיצוי זכויות. שירותי ניהול ההון וה-Family Office ניתנים באמצעות פיוניר תכנון פיננסי, המחזיקה ברישיון ניהול תיקי השקעות ומפוקחת על ידי הרשות לניירות ערך.'
},
{
  q: 'מי זה אודי חברוני?',
  a: 'אודי חברוני הוא מייסד וולת׳טק ומנכ״ל הסוכנות. הוא מכהן כמנהל הון בכיר בקבוצת פיוניר מאז 2010, והיה לשעבר יועץ חיצוני לקופת הגמל וקרן ההשתלמות של האקדמאים. יש לו ניסיון של למעלה מ-20 שנה בשוק ההון והביטוח, והוא מתמחה בתכנון פיננסי למשפחות ולבכירים. הוא פאנליסט קבוע בתוכנית הכלכלית של ערוץ 10, ומייסד הפלטפורמה "השוק הפיננסי". מורשה מטעם הרשות לניירות ערך ומשרד האוצר.'
},
{
  q: 'האם זה ייעוץ השקעות?',
  a: 'לא. השירות הוא תכנון פנסיוני: ניתוח מקיף של המסלקה הפנסיונית שלכם. בשיחה המקצועית נבחן יחד את המצב, ונבין אם נוכל לשרת אתכם באופן מלא ברמה הפנסיונית.'
},
{
  q: 'מה כולל הניתוח, וכמה זה עולה?',
  a: 'יתרות, מסלולי השקעה, דמי ניהול, כיסויים ביטוחיים קיימים, מוטבים, טיב ביצוע של המנהלים והפקדות שוטפות לשכר. השירות ללא עלות, לכם ולבן או בת הזוג.'
},
{
  q: 'איך מתבצעת השיחה?',
  a: 'השיחה הראשונה היא טלפונית, ואחריה מתואמת פגישה בווידאו או פרונטלית. אנחנו מאמינים שחשוב שתכירו אותנו, ושנכיר אתכם.'
},
{
  q: 'האם צריך להביא מסמכים?',
  a: 'לא. לאחר הפנייה נוציא עבורכם, ללא עלות, את התיק הפנסיוני מתוך המסלקה הפנסיונית, ונערוך אותו לחוברת מקצועית שתשמש בסיס לפגישה. זה נעשה בהרשאתכם בלבד.'
},
{
  q: 'מה קורה לפרטים שלי?',
  a: 'הפרטים משמשים ליצירת קשר בלבד. הפרטים המלאים מופיעים במדיניות הפרטיות שלנו.'
}];


/** Gold emphasis for the free-service promise wherever it appears in copy */
function highlightFree(text: string) {
  return text.split(/(ללא עלות)/).map((part, i) =>
    part === 'ללא עלות' ? <span key={i} className="text-gold font-semibold">{part}</span> : part
  );
}

/** Campaign attribution: keep utm_* params from the ad link so every lead says where it came from */
function campaignTag() {
  const params = new URLSearchParams(window.location.search);
  const parts = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].
  map((k) => params.get(k)).
  filter(Boolean);
  return parts.length ? ` · ${parts.join(' / ')}` : '';
}

export default function PensionResearch() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    initMetaPixel(META_PIXEL_ID);
  }, []);
  const [form, setForm] = useState({ name: '', phone: '', email: '', consent: false });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      await sendLead({
        name: form.name,
        phone: form.phone,
        email: form.email,
        source: `קמפיין מחקר הפנסיה (ערוץ 10) · בדיקת תיק פנסיוני${campaignTag()}`
      });
      setSubmitted(true);
      trackMetaEvent('Lead');
      pushDataLayerEvent('generate_lead', { form: 'pension_research' });
    } catch (err) {
      console.error('Error submitting pension research lead:', err);
      setSubmitError('אירעה שגיאה בשליחה. נסו שוב או התקשרו אלינו: 050-8210573');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => document.getElementById('pr-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="min-h-screen bg-navy-dark font-sans">
      <PensionNav onCtaClick={scrollToForm} />

      {/* Hero - mirrors the campaign banner */}
      <section id="pr-research" className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid opacity-60" />
          <div className="absolute -top-40 left-1/4 w-[640px] h-[640px] bg-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gold/40 pt-8 sm:pt-10">
            <div className="flex items-center justify-start sm:justify-between gap-4 mb-8 text-sm">
              <span className="hidden sm:inline text-ink font-semibold">הדסק הפנסיוני</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-4 py-1.5 text-ink">
                <Tv className="w-4 h-4 text-gold" />
                המחקר שלנו ב{CHANNEL}
              </span>
            </div>

            <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
              <div>
                <h1 className="font-extrabold text-white leading-[0.95] tracking-tight mb-8 text-6xl sm:text-7xl lg:text-8xl">
                  מהמחקר שלנו
                  <br />
                  לפנסיה
                  <br />
                  <span className="text-gold">שלכם.</span>
                </h1>
                <p className="text-xl sm:text-2xl font-semibold text-ink mb-2">
                  עשור של נתונים. מבט אישי על הפנסיה שלכם.
                </p>
                <p className="text-ink-muted text-lg text-pretty">
                  <span className="text-ink font-semibold">אודי חברוני</span>, מנכ״ל וולת׳טק סוכנות לביטוח ומנהל הון בכיר בקבוצת פיוניר.
                </p>
                <p className="text-ink-muted/80 text-sm mt-1">מורשה מטעם הרשות לניירות ערך ומשרד האוצר.</p>
                <p className="text-ink-muted/80 text-sm mt-1 text-pretty">
                  מומחה לניהול הון משפחתי, לשעבר יועץ חיצוני לקופת הגמל וקרן ההשתלמות של האקדמאים.
                </p>
              </div>

              {/* Video: thumbnail first, loads the player only on click (fast page, no tracking until play) */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-video bg-black">
                {playing ?
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                  title="זינק ל-2.4 מיליון שקל: אלו קרנות הפנסיה שהובילו בתשואות"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen /> :


                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 w-full h-full"
                  aria-label="צפו בראיון בערוץ 10">
                    <img
                    src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                    alt="אודי חברוני מציג את מחקר קרנות הפנסיה בערוץ 10"
                    className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-20 h-20 rounded-full bg-gold text-navy-dark flex items-center justify-center shadow-[0_10px_40px_-5px_#d4a853] group-hover:scale-110 transition-transform">
                        <Play className="w-9 h-9 fill-navy-dark ms-1" />
                      </span>
                    </span>
                    <span className="absolute bottom-0 inset-x-0 p-4 text-right text-white font-semibold text-sm sm:text-base">
                      זינק ל-2.4 מיליון שקל: אלו קרנות הפנסיה שהובילו בתשואות
                    </span>
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you get - the three checks, moved above the form */}
      <section id="pr-checks" className="pt-14 sm:pt-20 scroll-mt-16 sm:scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 text-balance">צפו במחקר. בדקו את התיק שלכם.</h2>
            <p className="text-ink-muted text-lg">ביצועים • דמי ניהול • כיסויים ביטוחיים</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
            {checks.map(({ icon: Icon, title, text }) =>
            <div key={title} className="card-tech rounded-2xl p-4 sm:p-6 flex sm:block items-start gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center sm:mb-4">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ink mb-1">{title}</h3>
                  <p className="text-ink-muted text-sm text-pretty">{text}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section id="pr-form" className="relative py-14 sm:py-20 scroll-mt-16 sm:scroll-mt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-balance">בדיקת תיק פנסיוני אישית</h2>
            <p className="text-ink-muted text-lg text-pretty">
              השאירו פרטים, ונחזור אליכם תוך 24 שעות לתיאום שיחה קצרה. נבדוק יחד את הביצועים, דמי הניהול והכיסויים בתיק שלכם. הבדיקה הראשונית <span className="text-gold font-semibold">ללא עלות</span>.
            </p>
            <p className="text-ink-muted/80 text-sm mt-3 text-pretty">
              השיחה תתבצע עם גורם מורשה בעל רישיון ביטוח פנסיוני, ולא עם נציג טלפוני.
            </p>
          </div>

          {submitted ?
          <div className="card-tech rounded-2xl p-8 text-center">
              <CheckCircle2 className="w-14 h-14 text-gold mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-ink mb-2">תודה, הפרטים התקבלו</h3>
              <p className="text-ink-muted">נחזור אליכם תוך 24 שעות לתיאום שיחת הבדיקה.</p>
            </div> :

          <form onSubmit={handleSubmit} className="card-tech rounded-2xl p-6 sm:p-8 flex flex-col gap-4">
              <input
              required
              type="text"
              autoComplete="name"
              placeholder="שם מלא"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-gold focus:outline-none" />
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                required
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="טלפון"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-gold focus:outline-none" />
                <input
                required
                type="email"
                autoComplete="email"
                placeholder="דוא״ל"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-gold focus:outline-none" />
              </div>

              <label className="flex items-start gap-3 text-sm text-ink-muted">
                <input
                required
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                className="mt-1 accent-[#d4a853]" />
                <span>
                  אני מאשר/ת יצירת קשר בעקבות פנייה זו, ומאשר/ת את{' '}
                  <Link to="/privacy" className="text-gold underline">מדיניות הפרטיות</Link>.
                </span>
              </label>

              {submitError && <p className="text-sm text-red-400">{submitError}</p>}

              <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light disabled:opacity-60 text-navy-dark font-bold text-lg py-4 rounded-xl transition-colors">
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowLeft className="w-5 h-5" />}
                לתיאום בדיקת תיק פנסיוני
              </button>
            </form>
          }
        </div>
      </section>

      {/* Key findings - from the slides aired on Channel 10 */}
      <section id="pr-findings" className="relative py-12 sm:py-16 border-t border-white/5 scroll-mt-16 sm:scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gold text-sm font-semibold tracking-wide mb-3">
            <span className="w-8 h-px bg-gold" />
            <span>ממצאי המחקר</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 text-balance">מה קרה לפנסיה ב-10 השנים האחרונות?</h2>
          <p className="text-ink-muted mb-8 text-pretty">
            8 הגופים הגדולים, מסלול לבני 50 ומטה, נתוני פנסיה-נט של רשות שוק ההון עד אוגוסט 2026. חישוב: דסק מחקר פנסיוני WealthTech.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {findings.map((f) =>
            <div key={f.label} className="card-tech rounded-2xl p-4 sm:p-5">
                <div className="font-mono text-2xl sm:text-3xl font-bold text-gold mb-1 text-right" dir="ltr">{f.value}</div>
                <div className="text-xs sm:text-sm text-ink-muted text-pretty">{f.label}</div>
              </div>
            )}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {slides.map((s, i) =>
            <figure key={s.src} className={i === 0 ? 'lg:col-span-2' : ''}>
                <img src={`${s.src}.webp`} alt={s.alt} width={1600} height={900} loading="lazy" className="w-full h-auto rounded-2xl border border-white/10 shadow-xl" />
                <figcaption className="text-xs text-ink-muted/70 mt-2">{s.caption}</figcaption>
              </figure>
            )}
          </div>
        </div>
      </section>

      {/* Second Channel 10 appearance - keren hishtalmut */}
      <section id="pr-studio" className="pt-14 sm:pt-20 scroll-mt-16 sm:scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gold text-sm font-semibold tracking-wide mb-3">
            <span className="w-8 h-px bg-gold" />
            <span>עוד מהאולפן</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 text-balance">קרן השתלמות: כך תגדילו את החיסכון שלכם</h2>
          <p className="text-ink-muted mb-6 text-pretty">אודי חברוני בערוץ 10, ערוץ הכלכלה של ישראל.</p>
          <YouTubeFacade
            videoId="IeILvuol0jw"
            start={265}
            title="קרן השתלמות: כך תגדילו את החיסכון שלכם" />
        </div>
      </section>

      {/* Who we are - short trust block, after the form */}
      <section id="pr-about" className="pt-14 sm:pt-20 scroll-mt-16 sm:scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gold text-sm font-semibold tracking-wide mb-3">
            <span className="w-8 h-px bg-gold" />
            <span>מי אנחנו</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 text-balance">
            וולת׳טק: <span className="text-gold">תכנון פיננסי, פנסיה וביטוח</span> לבכירים ולמשפחות.
          </h2>
          <p className="text-ink-muted text-lg mb-8 max-w-3xl text-pretty">
            אנחנו ממפים את כל התמונה הפיננסית: פנסיה, השקעות, ביטוחים ומיצוי זכויות, ובונים תוכנית אחת שעובדת יחד, בליווי אישי לאורך השנים.
          </p>

          <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
            {trust.map(({ icon: Icon, title, text }) =>
            <div key={title} className="card-tech rounded-2xl p-4 sm:p-6 flex sm:block items-start gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center sm:mb-4">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ink mb-1">{title}</h3>
                  <p className="text-ink-muted text-sm text-pretty">{text}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <LogoMarquee />
        </div>
      </section>

      {/* FAQ - answers the questions a first-time visitor has before leaving details */}
      <section id="pr-faq" className="pt-14 sm:pt-20 scroll-mt-16 sm:scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gold text-sm font-semibold tracking-wide mb-3">
            <span className="w-8 h-px bg-gold" />
            <span>שאלות נפוצות</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8 text-balance">מה כדאי לדעת לפני השיחה</h2>

          <div className="flex flex-col gap-4">
            {faqs.map((item) =>
            <div key={item.q} className="card-tech rounded-2xl p-5 sm:p-6">
                <h3 className="text-lg font-bold text-ink mb-2">{item.q}</h3>
                <p className="text-ink-muted text-pretty">{highlightFree(item.a)}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer + disclaimers */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <a href="https://wealthtech.co.il" className="text-ink font-semibold" dir="ltr">wealthtech.co.il</a>
          <p className="text-ink-muted/70 text-xs text-center sm:text-left leading-relaxed max-w-2xl">
            תשואות עבר אינן מבטיחות תשואות עתידיות. המידע בעמוד זה הוא כללי ואינו מהווה ייעוץ או שיווק פנסיוני המותאם לצרכיו של כל אדם.{' '}
            <span className="text-gold font-semibold">וולת׳טק סוכנות לביטוח (2015) בע״מ</span>, ח.פ 515186971.
          </p>
        </div>
      </footer>

      {/* Mobile sticky CTA (replaces the site-wide action bar on this page) */}
      <div className="sm:hidden h-20" aria-hidden="true" />
      {!submitted &&
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 border-t border-gold/20 bg-navy-dark/95 backdrop-blur-md px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button
          type="button"
          onClick={scrollToForm}
          className="w-full bg-gold text-navy-dark font-bold py-3.5 rounded-xl">
            לתיאום בדיקת תיק פנסיוני
          </button>
        </div>
      }
    </div>);

}
