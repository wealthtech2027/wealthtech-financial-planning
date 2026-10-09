import { useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Menu,
  X,
  UserCheck,
  Users,
  LayoutDashboard,
  HeartPulse,
  FileCheck2,
  CalendarClock,
  ShieldCheck,
  TrendingUp,
  Scale,
  Receipt,
  Calculator,
  Hourglass,
  Stethoscope,
  Umbrella,
  PiggyBank,
  Landmark,
  Loader2,
  ScanSearch } from
'lucide-react';
import { Logo } from '@/components/Logo';
import { Reveal } from '@/components/Reveal';
import { supabase } from '@/integrations/supabase/client';

const pillars = [
{ icon: UserCheck, title: 'מנהל תיק אחד', text: 'איש קשר אחד שמרכז את המידע, המשימות והעדכונים מולכם.' },
{ icon: Users, title: 'צוות בעלי מקצוע', text: 'כל תחום מטופל על ידי בעל מקצוע מורשה או מוסמך בתחומו.' },
{ icon: LayoutDashboard, title: 'תמונת מצב אחת', text: 'מיפוי זכויות והתאמת ביטוח, פנסיה והון לתוצאה שהתקבלה.' }];


const domains = [
{ icon: Stethoscope, title: 'זכויות רפואיות', text: 'מיפוי הזכויות הנובעות מאירוע רפואי ומהכיסויים הקיימים.' },
{ icon: Umbrella, title: 'זכויות ביטוחיות', text: 'בדיקת פוליסות, כיסויים קיימים, כפל ביטוחים ותביעות אפשריות.' },
{ icon: PiggyBank, title: 'זכויות פנסיוניות', text: 'איתור כספים שנשכחו, בדיקת דמי ניהול, קצבאות ומסלולי פרישה.' },
{ icon: Landmark, title: 'זכויות מיסויות', text: 'בדיקת זכאות להחזרי מס, נקודות זיכוי והטבות מול רשות המסים.' }];


const situations = [
{ icon: HeartPulse, title: 'אירוע רפואי חדש', text: 'מיפוי מסודר של הזכויות והכיסויים הרלוונטיים, כדי לדעת מה קיים ומה נדרש לבדוק.' },
{ icon: FileCheck2, title: 'זכויות או אישורים שכבר התקבלו', text: 'בחינה נוספת של התמונה הקיימת והשלכותיה על הביטוח, הפנסיה וההון המשפחתי.' },
{ icon: CalendarClock, title: 'היערכות כלכלית מראש', text: 'בדיקת כיסויים, נזילות, חיסכון ופרישה לקראת שינוי אפשרי, לפני שהוא מתרחש.' }];


const team = [
{ icon: ShieldCheck, title: 'סוכן ביטוח פנסיוני בעל רישיון', text: 'מיפוי כיסויים, זכויות ביטוחיות וחיסכון פנסיוני.' },
{ icon: TrendingUp, title: 'מנהל השקעות בעל רישיון מטעם רשות ניירות ערך', text: 'בחינת תיק ההשקעות והשלכות החלטות ההון, במסגרת השירות וההתקשרות המתאימים.' },
{ icon: Scale, title: 'עורך דין המתמחה במיצוי זכויות', text: 'טיפול משפטי, ייצוג ותביעות לפי הצורך.' },
{ icon: Receipt, title: 'יועץ מס', text: 'בחינת זכויות והליכים מול רשות המסים בתחום סמכותו.' },
{ icon: Calculator, title: 'רואה חשבון', text: 'בדיקה חשבונאית ומיסויית של תמונת ההכנסות והנכסים לפי הצורך.' },
{ icon: Hourglass, title: 'מתכנן פרישה מוסמך', text: 'בחינת קצבאות, חלופות פרישה והחלטות המשפיעות על הכנסה עתידית.' }];


const steps = [
{ title: 'שיחת היכרות והגדרת צורך', text: 'שיחה קצרה להבנת המצב המשפחתי והשאלות שפתוחות.' },
{ title: 'מיפוי זכויות ותמונה פיננסית', text: 'איסוף וריכוז מידע בהרשאת הלקוח בלבד.' },
{ title: 'תוכנית פעולה וטיפול מקצועי', text: 'כל נושא מועבר לבעל המקצוע המוסמך לטפל בו.' },
{ title: 'יישום, מעקב ועדכון התוכנית', text: 'מעקב אחר בקשות והחלטות ועדכון התוכנית המשפחתית.' }];


const deliverables = [
'מפת זכויות ופעולות מרוכזת למשפחה',
'איש קשר אחד לכל אורך התהליך',
'חלוקת אחריות ברורה בין המומחים',
'מעקב אחר בקשות והחלטות',
'בחינה של ההשלכות על הביטוח והפנסיה',
'בחינה של ההשלכות על הפרישה וההון המשפחתי'];


const topics = [
'אירוע רפואי חדש',
'זכויות או אישורים שכבר התקבלו',
'היערכות כלכלית מראש',
'החזרי מס',
'איתור כספים שנשכחו',
'אחר'];


export default function WealthTechOne() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', topic: '', consent: false });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setSubmitError('לא ניתן לשלוח כרגע. נסו שוב מאוחר יותר או התקשרו אלינו.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const { error } = await supabase.from('leads').insert({
        name: form.name,
        phone: form.phone,
        email: form.email,
        source: 'wealthtech_one',
        notes: `WealthTech One - נושא הפנייה: ${form.topic}`
      });

      if (error) throw error;
      setSubmitted(true);
      setForm({ name: '', phone: '', email: '', topic: '', consent: false });
    } catch (err) {
      console.error('Error submitting WealthTech One form:', err);
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
              <Link to="/wealthtech-one" className="text-gold font-medium" dir="ltr">WealthTech One</Link>
              <Link to="/process" className="text-ink-muted hover:text-ink transition-colors font-medium">תהליך העבודה</Link>
              <Link to="/media" className="text-ink-muted hover:text-ink transition-colors font-medium">מדיה</Link>
              <a
                href="#one-contact"
                className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-6 py-2.5 rounded-lg transition-colors">
                לתיאום שיחת היכרות
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
              <Link to="/wealthtech-one" className="text-gold font-medium py-2">WealthTech One</Link>
              <Link to="/process" className="text-ink-muted hover:text-ink font-medium py-2">תהליך העבודה</Link>
              <Link to="/media" className="text-ink-muted hover:text-ink font-medium py-2">מדיה</Link>
              <a
              href="#one-contact"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-6 py-3 rounded-lg text-center">
                לתיאום שיחת היכרות
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
              <ScanSearch className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium">מיצוי זכויות ותכנון כלכלי למשפחה</span>
            </div>

            <h1 className="font-extrabold text-white leading-[1.05] mb-6">
              <span className="block text-5xl sm:text-6xl lg:text-7xl" dir="ltr">
                WealthTech <span className="text-gradient-gold">One</span>
              </span>
            </h1>

            <p className="text-2xl sm:text-3xl font-bold text-ink mb-5 text-balance">
              כשהמצב משתנה, חשוב שמישהו יראה את כל התמונה.
            </p>

            <p className="text-lg text-ink-muted mb-10 max-w-2xl text-pretty">
              WealthTech One מרכזת עבורכם תהליך משולב לבדיקת זכויות רפואיות, ביטוחיות, פנסיוניות ומיסויות, לצד תכנון כלכלי למשפחה. מנהל תיק אחד מלווה אתכם, ובעלי מקצוע מתאימים מטפלים בכל תחום.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#one-contact"
                className="group inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-dark font-bold px-8 py-4 rounded-xl transition-all shadow-[0_10px_40px_-10px_#d4a853]">
                <span>לתיאום שיחת היכרות</span>
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </a>
              <Link
                to="/rights-check"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-gold/60 hover:bg-white/5 text-white font-semibold px-8 py-4 rounded-xl transition-colors">
                <ScanSearch className="w-5 h-5" />
                שאלון התאמה קצר
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-16">
            {pillars.map(({ icon: Icon, title, text }, i) =>
            <Reveal key={title} delay={i * 100}>
                <div className="card-tech h-full rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink mb-1">{title}</h3>
                    <p className="text-ink-muted text-sm text-pretty">{text}</p>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Rights domains */}
      <section className="relative py-14 sm:py-20 lg:py-28 bg-surface-2 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl mb-8 lg:mb-12">
            <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-wide mb-4">
              <span className="w-8 h-px bg-gold" />
              <span>מה בודקים</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-ink mb-5 text-balance">
              ארבעה עולמות זכויות. <span className="text-gradient-gold">כתובת אחת.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {domains.map(({ icon: Icon, title, text }, i) =>
            <Reveal key={title} delay={i * 100}>
                <div className="card-tech h-full rounded-2xl p-4 sm:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center mb-3 sm:mb-5">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-ink mb-1 sm:mb-2">{title}</h3>
                  <p className="text-sm sm:text-base text-ink-muted text-pretty">{text}</p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* When is it relevant */}
      <section className="relative py-14 sm:py-20 lg:py-28 bg-surface overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl mb-8 lg:mb-12">
            <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-wide mb-4">
              <span className="w-8 h-px bg-gold" />
              <span>מתי זה רלוונטי</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-ink mb-5 text-balance">
              באילו מצבים השירות רלוונטי
            </h2>
            <p className="text-ink-muted text-lg text-pretty">
              שלוש נקודות פתיחה שבהן כדאי לראות את התמונה המלאה.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {situations.map(({ icon: Icon, title, text }, i) =>
            <Reveal key={title} delay={i * 120}>
                <div className="card-tech h-full rounded-3xl p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-gold" />
                    </div>
                    <span className="font-mono text-sm text-ink-muted">0{i + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-ink mb-3">{title}</h3>
                  <p className="text-ink-muted text-pretty">{text}</p>
                </div>
              </Reveal>
            )}
          </div>

          <p className="mt-8 text-sm text-ink-muted/80">
            היקף הבדיקה והמענה נקבעים באופן פרטני, בהתאם לנסיבות ולמסמכים הרלוונטיים.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-14 sm:py-20 lg:py-28 bg-surface-2 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl mb-8 lg:mb-12">
            <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-wide mb-4">
              <span className="w-8 h-px bg-gold" />
              <span>הצוות המקצועי</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-ink mb-5 text-balance">
              מומחים בתחומים שונים. <span className="text-gradient-gold">תוכנית פעולה אחת.</span>
            </h2>
            <p className="text-ink-muted text-lg text-pretty">
              בהתאם לצורכי המשפחה, בתהליך משתתפים בעלי מקצוע מתחומי הביטוח, ההשקעות, המשפט, המס והפרישה. כל אחד פועל בתחום מומחיותו ועל פי הרישיון או ההסמכה הרלוונטיים; מנהל התיק מרכז את המידע, המשימות והעדכונים מולכם.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {team.map(({ icon: Icon, title, text }, i) =>
            <Reveal key={title} delay={(i % 3) * 100}>
                <div className="card-tech h-full rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink mb-1">{title}</h3>
                    <p className="text-ink-muted text-sm text-pretty">{text}</p>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="one-process" className="relative py-14 sm:py-20 lg:py-28 bg-surface overflow-hidden scroll-mt-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl mb-8 lg:mb-12">
            <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-wide mb-4">
              <span className="w-8 h-px bg-gold" />
              <span>איך התהליך עובד</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-ink mb-5 text-balance">
              ארבע תחנות ברורות, <span className="text-gradient-gold">ליווי רציף של מנהל התיק.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {steps.map((step, i) =>
            <Reveal key={step.title} delay={i * 100}>
                <div className="card-tech h-full rounded-2xl p-4 sm:p-6">
                  <div className="font-mono text-gold text-xs sm:text-sm font-semibold mb-2 sm:mb-4">שלב 0{i + 1}</div>
                  <h3 className="text-base sm:text-xl font-bold text-ink mb-1 sm:mb-2">{step.title}</h3>
                  <p className="text-sm sm:text-base text-ink-muted text-pretty">{step.text}</p>
                </div>
              </Reveal>
            )}
          </div>

          <Reveal>
            <div className="mt-8 rounded-2xl border border-gold/30 bg-gradient-to-l from-gold/10 to-transparent p-6 lg:p-8">
              <h3 className="text-xl font-bold text-ink mb-2">רציפות ואחריות לאורך כל הדרך</h3>
              <p className="text-ink-muted text-pretty">
                מעל כל התחנות עובר קו אחד: מנהל התיק שלכם. הוא מרכז את המסמכים, מתאם בין בעלי המקצוע ומעדכן אתכם בכל שלב, כך שאין צורך לנהל מול כל גורם בנפרד.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Deliverables */}
      <section className="relative py-14 sm:py-20 lg:py-28 bg-surface-2 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-wide mb-4">
                <span className="w-8 h-px bg-gold" />
                <span>מה מקבלים</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-ink mb-5 text-balance">
                תמונה מסודרת <span className="text-gradient-gold">במקום עשרות קצוות פתוחים.</span>
              </h2>
              <p className="text-sm text-ink-muted/80 text-pretty">
                השירות מתאר תהליך מקצועי מלווה, ואינו מבטיח אישור תביעה, החזר מס או תשואה.
              </p>
            </Reveal>

            <ul className="grid sm:grid-cols-2 gap-4">
              {deliverables.map((item) =>
              <li key={item} className="card-tech rounded-xl p-5 flex items-start gap-3 text-ink">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="one-contact" className="cta-glow relative py-14 sm:py-20 lg:py-28 bg-navy-dark border-y border-gold/20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-4 text-balance">מתחילים בשיחה אחת</h2>
            <p className="text-ink-muted text-lg text-pretty">
              נשמח להבין את מצבכם ולבחון כיצד ניתן לסייע. השאירו פרטים ונחזור אליכם לתיאום שיחת היכרות ואבחון ראשוני.
            </p>
          </div>

          {submitted ?
          <div className="card-tech rounded-2xl p-6 sm:p-8 text-center">
              <CheckCircle2 className="w-14 h-14 text-gold mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-ink mb-2">הפנייה נקלטה</h3>
              <p className="text-ink-muted">נחזור אליכם לתיאום שיחת היכרות. אין צורך לשלוח מסמכים בשלב זה.</p>
            </div> :

          <form onSubmit={handleSubmit} className="card-tech rounded-2xl p-6 sm:p-8 grid sm:grid-cols-2 gap-4">
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
              <select
              required
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              className="w-full rounded-lg bg-navy border border-white/15 px-4 py-3 text-white focus:border-gold focus:outline-none">
                <option value="" disabled>נושא הפנייה</option>
                {topics.map((t) =>
              <option key={t} value={t}>{t}</option>
              )}
              </select>

              <p className="sm:col-span-2 text-xs text-ink-muted/80">
                אין לצרף בטופס זה פירוט אבחנה רפואית או מסמכים רפואיים. איסוף מידע רגיש ייעשה בהמשך, בתהליך מאובטח ומתאים.
              </p>

              <label className="sm:col-span-2 flex items-start gap-3 text-sm text-ink-muted">
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
            <p className="sm:col-span-2 text-sm text-red-400">{submitError}</p>
            }

              <button
              type="submit"
              disabled={submitting}
              className="sm:col-span-2 inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light disabled:opacity-60 text-navy-dark font-bold px-8 py-4 rounded-xl transition-colors">
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowLeft className="w-5 h-5" />}
                שליחת פרטים לתיאום שיחה
              </button>
            </form>
          }
        </div>
      </section>

      {/* Legal disclaimer */}
      <section className="bg-surface py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-ink-muted/70 leading-relaxed text-pretty">
            המידע בעמוד זה מתאר שירות ליווי מקצועי ואינו מהווה ייעוץ משפטי, ביטוחי, מיסויי, פנסיוני או המלצה לביצוע עסקה בניירות ערך. אין בו הבטחה לזכאות, לאישור תביעה, להחזר מס או לתשואה. כל בדיקה נעשית באופן פרטני על ידי בעל מקצוע בעל רישיון או הסמכה מתאימים, ובמסגרת התקשרות נפרדת עם אותו גורם. העברת מידע בין הגורמים תיעשה בהרשאת הלקוח בלבד.
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
