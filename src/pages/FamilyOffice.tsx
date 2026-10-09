import { useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  FileText,
  Menu,
  X,
  Loader2,
  Gem,
  Briefcase,
  Building2,
  TrendingUp,
  Leaf,
  Handshake,
  Globe,
  Users,
  Search,
  UserCheck,
  ShieldCheck } from
'lucide-react';
import { Logo } from '@/components/Logo';
import { Reveal } from '@/components/Reveal';
import { sendLead } from '@/lib/sendLead';

const PIONEER_URL = 'https://www.piowealth.com';

const stats = [
{ value: '₪12B', label: 'כ־12 מיליארד ש״ח בניהול' },
{ value: '1986', label: 'שנת הייסוד של Pioneer' },
{ value: '3', label: 'מדינות עם רישיון: ישראל, דרום אפריקה וארה״ב' },
{ value: '0', label: 'ניגודי עניינים: דמי הניהול משולמים רק על ידי הלקוח' }];


const services = [
{
  icon: Briefcase,
  title: 'ניהול תיקי השקעות',
  text: 'תיק מנוהל בשקלים או במט״ח, המותאם אישית לצרכים ולפרופיל הסיכון, ומשלב ניירות ערך ישירים עם קרנות ומחקי מדדים של בתי השקעות מובילים בארץ ובעולם.'
},
{
  icon: Building2,
  title: 'שירותי Family Office',
  text: 'ניהול כולל של ההון המשפחתי: מדיניות השקעה, ריכוז כל הנכסים, דיווח הוליסטי ועבודה משותפת עם מומחים בתחומים משיקים.'
},
{
  icon: TrendingUp,
  title: 'השקעות אלטרנטיביות',
  text: 'גישה להשקעות שאינן מתואמות לשוקי המניות והאג״ח: קרנות הון סיכון, Private Equity, נדל״ן בארץ ובעולם, מוצרים מובנים, קרנות גידור ואשראי.'
},
{
  icon: Leaf,
  title: 'השקעות אחראיות (ESG & Impact)',
  text: 'תיקים מנוהלים לפי עקרונות ESG ו־Impact, לשימור ולהגדלת ההון לצד השפעה חברתית וסביבתית חיובית.'
},
{
  icon: Handshake,
  title: 'רשת אנשי מקצוע',
  text: 'שיתופי פעולה עם מומחי מס ומשפט, רואי חשבון וחברות נאמנות. Pioneer אינה מקבלת תגמול מנותני השירות האלה.'
},
{
  icon: Globe,
  title: 'פריסה בינלאומית',
  text: 'ללקוחות בצפון ובדרום אמריקה השירות ניתן דרך Pioneer Family Office LLC, יועץ השקעות רשום (RIA) במיאמי, פלורידה.'
}];


const familyOfficeScope = [
'תכנון וקביעה של מדיניות השקעה',
'ניהול תיק ההשקעות: ניתוח המצב הקיים, ניהול סיכונים, פיקוח ובקרה על השקעות, תשואות ועלויות',
'הפחתת עמלות ועלויות של בתי השקעות ובנקים',
'גישה להשקעות אלטרנטיביות נבחרות',
'דיווח הוליסטי ומפורט על כל ההשקעות והנכסים',
'תכנון משכנתאות',
'עבודה משותפת עם מומחים בתכנון מס, העברה בין־דורית, צוואות וירושות, נאמנויות, תכנון משפטי, פרישה וביטוח'];


const approach = [
{
  icon: Users,
  title: 'ועדת השקעות',
  text: 'חברים פנימיים ויועצים חיצוניים קובעים את הקצאת הנכסים הכוללת, וממנים או מחליפים מנהלי השקעות ומוסדות פיננסיים.'
},
{
  icon: Search,
  title: 'צוות מחקר השקעות',
  text: 'בונה את התיק המותאם לכל לקוח לפי מנדט הקצאת נכסים, ובוחן כל אפיק השקעה חדש לפני שהוא מוצע ללקוחות.'
},
{
  icon: UserCheck,
  title: 'מנהל עושר בכיר',
  text: 'איש קשר אישי אחד, שדואג שהצרכים של המשפחה ייענו לאורך זמן.'
}];


const audience = [
'משקיעים כשירים',
'משפחות בעלות הון משמעותי',
'בעלי חברות ויזמים',
'משפחות עם נכסים ביותר ממדינה אחת',
'משפחות שמתכננות העברה בין־דורית של ההון'];


export default function FamilyOffice() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        source: 'Wealth Management & Family Office'
      });
      setSubmitted(true);
      setForm({ name: '', phone: '', email: '', consent: false });
    } catch (err) {
      console.error('Error submitting Family Office form:', err);
      setSubmitError('אירעה שגיאה בשליחה. נסו שוב או התקשרו אלינו.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 right-0 left-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Logo />

            <div className="hidden xl:flex items-center gap-4 2xl:gap-7 text-[15px] 2xl:text-base">
              <Link to="/" className="text-ink-muted hover:text-ink transition-colors font-medium">ראשי</Link>
              <Link to="/#about" className="text-ink-muted hover:text-ink transition-colors font-medium">אודות</Link>
              <Link to="/#services" className="text-ink-muted hover:text-ink transition-colors font-medium">שירותים</Link>
              <Link to="/wealthtech-one" className="text-gold hover:text-gold-light transition-colors font-semibold">WealthTech One</Link>
              <Link to="/family-office" className="text-gold font-medium">Family Office</Link>
              <Link to="/media" className="text-ink-muted hover:text-ink transition-colors font-medium">מדיה</Link>
              <a
                href="#fo-contact"
                className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-6 py-2.5 rounded-lg transition-colors">
                לתיאום פגישה
              </a>
            </div>

            <button
              className="xl:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen &&
        <div className="xl:hidden bg-surface border-t border-border">
            <div className="px-4 py-4 flex flex-col gap-4">
              <Link to="/" className="text-ink-muted hover:text-ink font-medium py-2">ראשי</Link>
              <Link to="/#about" className="text-ink-muted hover:text-ink font-medium py-2">אודות</Link>
              <Link to="/#services" className="text-ink-muted hover:text-ink font-medium py-2">שירותים</Link>
              <Link to="/wealthtech-one" className="text-gold hover:text-gold-light font-semibold py-2">WealthTech One</Link>
              <Link to="/family-office" className="text-gold font-medium py-2">Family Office</Link>
              <Link to="/media" className="text-ink-muted hover:text-ink font-medium py-2">מדיה</Link>
              <a
              href="#fo-contact"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-6 py-3 rounded-lg text-center">
                לתיאום פגישה
              </a>
            </div>
          </div>
        }
      </nav>

      {/* Hero */}
      <section className="relative pt-36 pb-20 lg:pb-28 hero-tech overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute -top-40 left-1/4 w-[640px] h-[640px] bg-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 mb-8">
              <Gem className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium">למשקיעים כשירים ומשפחות בעלות הון משמעותי</span>
            </div>

            <h1 className="font-extrabold text-white leading-[1.05] mb-6" dir="ltr">
              <span className="block text-right text-4xl sm:text-6xl lg:text-7xl">Wealth Management</span>
              <span className="block text-right text-4xl sm:text-6xl lg:text-7xl text-gradient-gold pb-2">&amp; Family Office</span>
            </h1>

            <p className="text-2xl sm:text-3xl font-bold text-ink mb-5 text-balance">
              שימור, צמיחה והעברה בין־דורית של ההון המשפחתי.
            </p>

            <p className="text-lg text-ink-muted mb-10 max-w-2xl text-pretty">
              השירות ניתן בבלעדיות על ידי <span className="text-ink font-semibold">פיוניר תכנון פיננסי</span>, חלק מקבוצת Pioneer Wealth Management: חברה פרטית ועצמאית שנוסדה ב־1986, ומלווה לקוחות אמידים ומשפחות בעלות הון גבוה ברחבי העולם בתכנון פיננסי הוליסטי, בניהול עושר ובשירותי Family Office.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#fo-contact"
                className="group inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-dark font-bold px-8 py-4 rounded-xl transition-all shadow-[0_10px_40px_-10px_#d4a853]">
                <span>לתיאום פגישת היכרות</span>
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </a>
              <a
                href={PIONEER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-gold/60 hover:bg-white/5 text-white font-semibold px-8 py-4 rounded-xl transition-colors">
                לאתר Pioneer
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-16">
            {stats.map((s) =>
            <div key={s.label} className="card-tech rounded-2xl p-4 sm:p-6">
                <div className="font-mono text-3xl sm:text-4xl font-bold text-gradient-gold mb-2">{s.value}</div>
                <div className="text-xs sm:text-sm text-ink-muted">{s.label}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative py-14 sm:py-20 lg:py-28 bg-surface-2 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl mb-8 lg:mb-12">
            <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-wide mb-4">
              <span className="w-8 h-px bg-gold" />
              <span>השירותים של Pioneer</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-ink mb-5 text-balance">
              ניהול עושר <span className="text-gradient-gold">ללא ניגוד עניינים.</span>
            </h2>
            <p className="text-ink-muted text-lg text-pretty">
              דמי הניהול משולמים על ידי הלקוח בלבד, ולכן השירות אובייקטיבי. הניסיון והקשרים ארוכי השנים עם מוסדות פיננסיים ובנקים בישראל ובעולם מאפשרים להוזיל עלויות ולפתוח גישה למגוון רחב של פתרונות השקעה.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, title, text }, i) =>
            <Reveal key={title} delay={(i % 3) * 100}>
                <div className="card-tech h-full rounded-2xl p-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-2">{title}</h3>
                  <p className="text-ink-muted text-pretty">{text}</p>
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delay={200}>
            <div className="mt-8 rounded-3xl border border-gold/30 bg-gradient-to-l from-gold/10 to-transparent p-6 lg:p-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-ink mb-3">ניהול רב־ערוצי, מתודולוגיה אחת</h3>
                <p className="text-ink-muted text-pretty">
                  שירותי ניהול ההון של Pioneer נעשים במתודולוגיה מקצועית מהסטנדרטים הגבוהים ביותר, ומאפשרים ניהול רב־ערוצי מול חשבונות בנק בישראל, בארה״ב, בלונדון ובשוויץ.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                { code: 'IL', name: 'ישראל' },
                { code: 'US', name: 'ארה״ב' },
                { code: 'UK', name: 'לונדון' },
                { code: 'CH', name: 'שוויץ' }].
                map((c) =>
                <div key={c.name} className="card-tech rounded-xl px-5 py-4 flex items-center gap-3">
                    <span className="w-10 h-10 shrink-0 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center font-mono text-sm font-bold text-gold" aria-hidden="true">{c.code}</span>
                    <span className="font-semibold text-ink">{c.name}</span>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Family Office scope + audience */}
      <section className="relative py-14 sm:py-20 lg:py-28 bg-surface overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <Reveal className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-wide mb-4">
                <span className="w-8 h-px bg-gold" />
                <span>Family Office</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-ink mb-5 text-balance">
                דואגים למה שחשוב לכם.
              </h2>
              <p className="text-ink-muted text-lg mb-8 text-pretty">
                שימור והגדלה של ההון המשפחתי והעברתו לדור הבא הם לא רק עניין של ניהול השקעות. שירותי ה־Family Office מחברים את המשפחה למומחים מובילים, מרכזים את כל הנכסים ובונים שירות שמותאם לצורכי המשפחה.
              </p>
              <ul className="flex flex-col gap-3">
                {familyOfficeScope.map((item) =>
                <li key={item} className="flex items-start gap-3 text-ink">
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <span className="text-pretty">{item}</span>
                  </li>
                )}
              </ul>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={120}>
              <div className="card-tech rounded-3xl p-6 sm:p-8 lg:sticky lg:top-28">
                <h3 className="text-2xl font-bold text-ink mb-6">למי השירות מתאים</h3>
                <ul className="flex flex-col gap-3 mb-8">
                  {audience.map((item) =>
                  <li key={item} className="flex items-center gap-3 text-ink">
                      <Gem className="w-4 h-4 text-gold shrink-0" />
                      {item}
                    </li>
                  )}
                </ul>
                <p className="text-xs text-ink-muted/80 text-pretty">
                  חלק מההשקעות האלטרנטיביות מיועדות למשקיעים כשירים בלבד, כהגדרתם בחוק. הן כרוכות בדרך כלל בנזילות מוגבלת, בסכומי מינימום גבוהים ובסיכון שונה מזה של השקעות מסורתיות, ואינן מתאימות לכל משקיע.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Structured approach */}
      <section className="relative py-14 sm:py-20 lg:py-28 bg-surface-2 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl mb-8 lg:mb-12">
            <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-wide mb-4">
              <span className="w-8 h-px bg-gold" />
              <span>הגישה המובנית</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-ink mb-5 text-balance">
              פיזור והקצאת נכסים <span className="text-gradient-gold">כבסיס לכל החלטה.</span>
            </h2>
            <p className="text-ink-muted text-lg text-pretty">
              הקצאת נכסים נכונה ופיזור זהיר הם הדרך שהוכחה לאורך זמן כיעילה ביותר לשמירה על תיק ההשקעות ולבנייתו. שלוש שכבות פיקוח מבטיחות שכל החלטה נבחנת.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {approach.map(({ icon: Icon, title, text }, i) =>
            <Reveal key={title} delay={i * 120}>
                <div className="card-tech h-full rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <span className="font-mono text-sm text-ink-muted">0{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-2">{title}</h3>
                  <p className="text-ink-muted text-pretty">{text}</p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* WealthTech x Pioneer */}
      <section className="relative py-16 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl border border-gold/30 bg-gradient-to-l from-gold/10 to-transparent p-6 lg:p-10 flex flex-col md:flex-row gap-6 md:items-center">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-gold flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-navy-dark" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-ink mb-2">WealthTech ו־Pioneer</h3>
                <p className="text-ink-muted text-pretty">
                  אודי חברוני, המייסד של וולת'טק, מכהן כמנהל הון בכיר בקבוצת Pioneer משנת 2010 ועד היום. כל שירותי ניהול העושר וה־Family Office מבוצעים אך ורק באמצעות פיוניר תכנון פיננסי, המחזיקה ברישיון ניהול תיקי השקעות ומפוקחת על ידי הרשות לניירות ערך.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="fo-contact" className="cta-glow relative py-14 sm:py-20 lg:py-28 bg-navy-dark border-y border-gold/20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-4 text-balance">פגישת היכרות דיסקרטית</h2>
            <p className="text-ink-muted text-lg text-pretty">
              השאירו פרטים ונחזור אליכם לתיאום פגישה ראשונית, ללא עלות וללא התחייבות.
            </p>
          </div>

          {submitted ?
          <div className="card-tech rounded-2xl p-6 sm:p-8 text-center">
              <CheckCircle2 className="w-14 h-14 text-gold mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-ink mb-2">הפנייה נקלטה</h3>
              <p className="text-ink-muted">נחזור אליכם בהקדם לתיאום פגישה.</p>
            </div> :

          <form onSubmit={handleSubmit} className="card-tech rounded-2xl p-6 sm:p-8 grid sm:grid-cols-3 gap-4">
              <input
              required
              type="text"
              placeholder="שם מלא"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 focus:border-gold focus:outline-none" />
              <input
              required
              type="tel"
              placeholder="טלפון"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 focus:border-gold focus:outline-none" />
              <input
              required
              type="email"
              placeholder="דוא״ל"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 focus:border-gold focus:outline-none" />

              <label className="sm:col-span-3 flex items-start gap-3 text-sm text-ink-muted">
                <input
                required
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                className="mt-1 accent-[#d4a853]" />
                <span>
                  אני מאשר/ת באופן מפורש יצירת קשר בעקבות פנייה זו, ומאשר/ת את{' '}
                  <Link to="/privacy" className="text-gold underline">מדיניות הפרטיות</Link>.
                </span>
              </label>

              {submitError &&
            <p className="sm:col-span-3 text-sm text-red-400">{submitError}</p>
            }

              <button
              type="submit"
              disabled={submitting}
              className="sm:col-span-3 inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light disabled:opacity-60 text-navy-dark font-bold px-8 py-4 rounded-xl transition-colors">
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowLeft className="w-5 h-5" />}
                שליחת פרטים לתיאום פגישה
              </button>
            </form>
          }
        </div>
      </section>

      {/* Legal disclaimer */}
      <section className="bg-surface py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-ink-muted/70 leading-relaxed text-pretty">
            שירותי ניהול העושר, ניהול תיקי ההשקעות וה־Family Office ניתנים בבלעדיות על ידי פיוניר תכנון פיננסי (Pioneer Wealth Management), המחזיקה ברישיון ניהול תיקי השקעות ומפוקחת על ידי הרשות לניירות ערך. המידע בעמוד זה הוא כללי בלבד, ואינו מהווה ייעוץ השקעות, שיווק השקעות או המלצה לביצוע עסקה בניירות ערך, ואינו תחליף לייעוץ המתחשב בנתונים ובצרכים של כל אדם. השקעה כרוכה בסיכון, ותשואות עבר אינן מבטיחות תשואות בעתיד.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8">
            <a
              href="https://surense.com/app/p/9z3sqal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-navy-dark font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <FileText className="w-5 h-5" />
              להוצאת מידע פנסיוני עדכני
            </a>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Logo variant="light" />

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <Link to="/" className="text-white/70 hover:text-white transition-colors">ראשי</Link>
              <Link to="/#services" className="text-white/70 hover:text-white transition-colors">שירותים</Link>
              <Link to="/process" className="text-white/70 hover:text-white transition-colors">תהליך העבודה</Link>
              <Link to="/#contact" className="text-white/70 hover:text-white transition-colors">צור קשר</Link>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="text-white/50 text-sm">
                © 2024 WealthTech. כל הזכויות שמורות.
              </div>
              <div className="flex items-center gap-4">
                <Link to="/privacy" className="text-white/50 hover:text-white text-sm transition-colors">
                  מדיניות פרטיות
                </Link>
                <span className="text-white/30">|</span>
                <Link to="/disclosure" className="text-white/50 hover:text-white text-sm transition-colors">
                  גילוי נאות
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>);

}
