import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  TrendingUp,
  BarChart3,
  Tv,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  ArrowLeft,
  Building2,
  Sparkles,
  Target,
  Menu,
  X,
  ChevronDown,
  FileText,
  Loader2,
  CheckCircle2,
  Gift,
  Calculator,
  Wallet,
  ScanSearch,
  Receipt,
  Gem,
  PlayCircle,
  BookOpen,
  Users,
  ExternalLink } from
'lucide-react';
import { LogoMarquee } from '@/components/LogoMarquee';
import { HeroDashboard } from '@/components/HeroDashboard';
import { CountUp } from '@/components/CountUp';
import { Reveal } from '@/components/Reveal';
import { ToolsShowcase } from '@/components/ToolsShowcase';
import { ApproachTimeline } from '@/components/ApproachTimeline';
import { Logo } from '@/components/Logo';
import { PensionOfferPopup } from '@/components/PensionOfferPopup';
import { WorkshopPopup } from '@/components/WorkshopPopup';
import { supabase } from '@/integrations/supabase/client';
import udiHevroniImage from '@/assets/uploads/udi-hevroni.jpg';
import wealthtechLogo from '@/assets/uploads/wealthtech-logo-new.png';

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  const [showWorkshopPopup, setShowWorkshopPopup] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Auto-open pension popup after 30 seconds (only once per session)
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenPensionOffer');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowOfferPopup(true);
        sessionStorage.setItem('hasSeenPensionOffer', 'true');
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: contactForm
      });

      if (error) throw error;

      setSubmitSuccess(true);
      setContactForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Error sending email:', err);
      setSubmitError('אירעה שגיאה בשליחת ההודעה. אנא נסו שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const pillars = [
  {
    icon: Target,
    title: 'תכנון פיננסי',
    description: 'תוכנית אחת שמחברת בין ההון, הפנסיה, ההשקעות והביטוחים, ומותאמת ליעדים שלכם ושל המשפחה.',
    items: ['תכנון פרישה ופנסיה', 'שיווק השקעות ותיקים', 'ביטוח והגנה על המשפחה', 'שירותי Family Office'],
    cta: 'איך נראה תהליך התכנון',
    to: '/process'
  },
  {
    icon: ScanSearch,
    title: 'WealthTech One',
    subtitle: 'מיצוי זכויות',
    description: 'כתובת אחת לבדיקת זכויות רפואיות, ביטוחיות, פנסיוניות ומיסויות, לצד תכנון כלכלי למשפחה. מנהל תיק אחד מלווה אתכם, ובעלי מקצוע מתאימים מטפלים בכל תחום.',
    items: ['זכויות רפואיות וביטוחיות', 'איתור כספי פנסיה וגמל', 'החזרי מס הכנסה', 'מנהל תיק אחד לכל התהליך'],
    cta: 'להכיר את WealthTech One',
    to: '/wealthtech-one'
  }];


  return (
    <div data-ev-id="ev_9cb2434ead" className="min-h-screen bg-surface font-sans">
      {/* Navigation */}
      <nav data-ev-id="ev_e2fa12d344" className="fixed top-0 right-0 left-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div data-ev-id="ev_2087f5917c" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_89d74e3540" className="flex justify-between items-center h-20">
            <Logo />
            
            <div data-ev-id="ev_e5dbf24f4b" className="hidden xl:flex items-center gap-4 2xl:gap-7 text-[15px] 2xl:text-base">
              <a data-ev-id="ev_e2a1487f92" href="#about" className="text-ink-muted hover:text-ink transition-colors font-medium">אודות</a>
              <Link data-ev-id="ev_a34bc6dec1" to="/products" className="text-ink-muted hover:text-ink transition-colors font-medium">מוצרים</Link>
              <a data-ev-id="ev_8409256ff0" href="#services" className="text-ink-muted hover:text-ink transition-colors font-medium">שירותים</a>
              <Link to="/wealthtech-one" className="text-gold hover:text-gold-light transition-colors font-semibold">WealthTech One</Link>
              <Link data-ev-id="ev_6ae73e9478" to="/process" className="text-ink-muted hover:text-ink transition-colors font-medium">תהליך העבודה</Link>
              <Link data-ev-id="ev_9f90114cc3" to="/media" className="text-ink-muted hover:text-ink transition-colors font-medium">מדיה</Link>
              
              {/* Tools Dropdown */}
              <div data-ev-id="ev_76adcace94" className="relative">
                <button data-ev-id="ev_b7c0f1cb0e"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                onBlur={() => setTimeout(() => setToolsDropdownOpen(false), 150)}
                className="flex items-center gap-1 text-gold hover:text-gold-light transition-colors font-medium">

                  כלים פיננסיים
                  <ChevronDown className={`w-4 h-4 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {toolsDropdownOpen &&
                <div data-ev-id="ev_f85bdce407" className="absolute top-full right-0 mt-2 w-64 bg-surface rounded-xl shadow-xl border border-border py-2 z-50">
                    <Link data-ev-id="ev_044d6f8354"
                  to="/life-insurance-calculator"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-surface-2 transition-colors">

                      <div data-ev-id="ev_9989b42bfc" className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center">
                        <Calculator className="w-4 h-4 text-gold" />
                      </div>
                      <div data-ev-id="ev_6d92ec648e">
                        <div data-ev-id="ev_d9ab900dd0" className="font-medium text-ink flex items-center gap-2">
                          מחשבון ביטוח חיים
                          <span data-ev-id="ev_59571bba6d" className="bg-gold text-navy-dark text-[10px] font-bold px-1.5 py-0.5 rounded">חדש!</span>
                        </div>
                        <div data-ev-id="ev_f9a1edcfc2" className="text-xs text-ink-muted">כמה כיסוי אתה צריך?</div>
                      </div>
                    </Link>
                    <Link data-ev-id="ev_4730a1a672"
                  to="/savings-calculator"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-surface-2 transition-colors">

                      <div data-ev-id="ev_e27fedb3da" className="w-8 h-8 bg-green-500/15 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      <div data-ev-id="ev_48bc5e5105">
                        <div data-ev-id="ev_3b1bdf111a" className="font-medium text-ink flex items-center gap-2">
                          מחשבון חיסכון
                          <span data-ev-id="ev_9140ca476d" className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">חדש!</span>
                        </div>
                        <div data-ev-id="ev_88308d1a55" className="text-xs text-ink-muted">צמיחה לפי רמת סיכון</div>
                      </div>
                    </Link>
                    <Link data-ev-id="ev_34acba69b4"
                  to="/wealth-snapshot"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-surface-2 transition-colors">

                      <div data-ev-id="ev_aa6500c31a" className="w-8 h-8 bg-emerald-500/15 rounded-lg flex items-center justify-center">
                        <Wallet className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div data-ev-id="ev_944c2aa778">
                        <div data-ev-id="ev_03bbfbb7f0" className="font-medium text-ink flex items-center gap-2">
                          מפת הנכסים שלי
                          <span data-ev-id="ev_849187f316" className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">חדש!</span>
                        </div>
                        <div data-ev-id="ev_93a8c3db36" className="text-xs text-ink-muted">תמונת הון כוללת</div>
                      </div>
                    </Link>
                    <div data-ev-id="ev_eaf92a1890" className="border-t border-border my-2" />
                    <Link data-ev-id="ev_99d4d705c8"
                  to="/pension-returns"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-surface-2 transition-colors">

                      <div data-ev-id="ev_9d2a869b7d" className="w-8 h-8 bg-navy/10 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-ink" />
                      </div>
                      <div data-ev-id="ev_aa6500c31a">
                        <div data-ev-id="ev_49541dd0b8" className="font-medium text-ink">מנוע השוואת תשואות</div>
                        <div data-ev-id="ev_295a8e9e2e" className="text-xs text-ink-muted">גמל והשתלמות בישראל</div>
                      </div>
                    </Link>
                    <Link data-ev-id="ev_53d3d2cc7a"
                  to="/tax-refund-eligibility"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-surface-2 transition-colors">

                      <div data-ev-id="ev_387238636b" className="w-8 h-8 bg-purple-500/15 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-purple-600" />
                      </div>
                      <div data-ev-id="ev_b5860369e1">
                        <div data-ev-id="ev_bb7e415615" className="font-medium text-ink flex items-center gap-2">
                          בדיקת זכאות החזר מס
                          <span data-ev-id="ev_6c84529b61" className="bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">חדש!</span>
                        </div>
                        <div data-ev-id="ev_afa8d91def" className="text-xs text-ink-muted">שאלון מזורז לבדיקה ראשונית</div>
                      </div>
                    </Link>
                  </div>
                }
              </div>

              <a data-ev-id="ev_f2eb830098"
              href="https://surense.com/app/p/9z3sqal"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2">

                <FileText className="w-4 h-4" />
                להוצאת מידע עדכני
              </a>
              <Link data-ev-id="ev_7d61d96b1e"
              to="/onboarding"
              className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-6 py-2.5 rounded-lg transition-colors">

                התחל תהליך
              </Link>
            </div>


            <button data-ev-id="ev_bd5cf0b3ef"
            className="xl:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>

              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen &&
        <div data-ev-id="ev_35e7bb1c78" className="xl:hidden bg-surface border-t border-border">
            <div data-ev-id="ev_cc2e6bca2f" className="px-4 py-4 flex flex-col gap-4">
              <a data-ev-id="ev_6a4f425685" href="#about" className="text-ink-muted hover:text-ink font-medium py-2">אודות</a>
              <Link data-ev-id="ev_3bc6950ce1" to="/products" className="text-ink-muted hover:text-ink font-medium py-2">מוצרים</Link>
              <a data-ev-id="ev_48c7549341" href="#services" className="text-ink-muted hover:text-ink font-medium py-2">שירותים</a>
              <Link to="/wealthtech-one" className="text-gold hover:text-gold-light font-semibold py-2">WealthTech One</Link>
              <Link to="/family-office" className="text-ink-muted hover:text-ink font-medium py-2">Family Office</Link>
              <Link data-ev-id="ev_4d74daf187" to="/process" className="text-ink-muted hover:text-ink font-medium py-2">תהליך העבודה</Link>
              <Link data-ev-id="ev_c1a033792c" to="/media" className="text-ink-muted hover:text-ink font-medium py-2">מדיה</Link>
              <a href="#finance-market" onClick={() => setMobileMenuOpen(false)} className="text-ink-muted hover:text-ink font-medium py-2">השוק הפיננסי</a>
              
              {/* Mobile Tools Accordion */}
              <div data-ev-id="ev_24bda1743e">
                <button data-ev-id="ev_bb538d9920"
              onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
              className="flex items-center justify-between w-full text-gold font-medium py-2">

                  <span data-ev-id="ev_35883b7c25">כלים פיננסיים</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileToolsOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileToolsOpen &&
              <div data-ev-id="ev_1d9a0119ca" className="pr-4 flex flex-col gap-2 mt-2">
                    <Link data-ev-id="ev_5f485fe854" to="/life-insurance-calculator" className="text-ink-muted hover:text-ink font-medium py-2 flex items-center gap-2">
                      <Calculator className="w-4 h-4" />
                      מחשבון ביטוח חיים
                    </Link>
                    <Link data-ev-id="ev_dfe3099f43" to="/savings-calculator" className="text-ink-muted hover:text-ink font-medium py-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      מחשבון חיסכון
                    </Link>
                    <Link data-ev-id="ev_62a020bcb7" to="/wealth-snapshot" className="text-ink-muted hover:text-ink font-medium py-2 flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      מפת הנכסים שלי
                    </Link>
                    <Link data-ev-id="ev_2fcb524070" to="/pension-returns" className="text-ink-muted hover:text-ink font-medium py-2 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      מנוע השוואת תשואות
                    </Link>
                    <Link data-ev-id="ev_4f9d6a860d" to="/tax-refund-eligibility" className="text-ink-muted hover:text-ink font-medium py-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      בדיקת זכאות החזר מס
                    </Link>
                  </div>
              }
              </div>
              
              <Link data-ev-id="ev_c950b3d423" to="/links" className="text-ink-muted hover:text-ink font-medium py-2">קישורים</Link>

              <a data-ev-id="ev_8d9cb16eaf"
            href="https://surense.com/app/p/9z3sqal"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-dark font-semibold px-6 py-3 rounded-lg">

                <FileText className="w-4 h-4" />
                להוצאת מידע עדכני
              </a>
              <Link data-ev-id="ev_3e10f6dfea"
            to="/onboarding"
            className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-6 py-3 rounded-lg text-center">

                התחל תהליך
              </Link>
            </div>
          </div>
        }
      </nav>

      {/* Hero Section */}
      <section data-ev-id="ev_ba9f580a12" className="relative min-h-screen flex items-center overflow-hidden bg-navy-dark pt-20">
        <div data-ev-id="ev_732df54b84" className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid" />
          <div data-ev-id="ev_7f9cc09e71" className="absolute -top-40 left-1/4 w-[640px] h-[640px] bg-gold/10 rounded-full blur-3xl"></div>
          <div data-ev-id="ev_1137a15102" className="absolute bottom-0 -right-40 w-[520px] h-[520px] bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div data-ev-id="ev_d502e488ff" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div data-ev-id="ev_8eb882f37a" className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
            <div data-ev-id="ev_852c9dcdad">
              <div data-ev-id="ev_0ee476a3a6" className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 mb-8">
                <Sparkles className="w-4 h-4 text-gold" />
                <span data-ev-id="ev_d58e054cc9" className="text-gold text-sm font-medium">תכנון פיננסי · מיצוי זכויות · טכנולוגיה</span>
              </div>

              <h1 data-ev-id="ev_cef9e6d4ae" className="font-extrabold text-white leading-[1.05] mb-6">
                <span data-ev-id="ev_wealthtech_brand" className="block text-ink-muted text-lg sm:text-xl font-medium tracking-normal mb-4">וולת'טק | WealthTech</span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl" dir="ltr">One Life.</span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl text-gradient-gold pb-2" dir="ltr">Plan IT Well.</span>
              </h1>

              <p data-ev-id="ev_b6f3f6cde1" className="text-2xl sm:text-3xl font-bold text-ink mb-5 text-balance">
                ממפים את כל התמונה הפיננסית שלכם, וממצים כל שקל שמגיע לכם.
              </p>

              <p data-ev-id="ev_ecdf672d7c" className="text-lg text-ink-muted mb-10 max-w-xl text-pretty">
                תכנון פיננסי מבוסס דאטה ומיצוי זכויות למנהלים, מייסדים ומשפחות: פנסיה, השקעות, ביטוח, החזרי מס וכספים שנשכחו, תחת קורת גג אחת ובליווי אישי.
              </p>

              <div data-ev-id="ev_176827c442" className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link data-ev-id="ev_e620f76795"
                to="/rights-check"
                className="group inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-dark font-bold px-8 py-4 rounded-xl transition-all shadow-[0_10px_40px_-10px_#d4a853]">

                  <ScanSearch className="w-5 h-5" />
                  <span data-ev-id="ev_99b97201fb">בדיקת זכויות חינם</span>
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                </Link>
                <a data-ev-id="ev_f044ebfbcf"
                href="#contact"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-gold/60 hover:bg-white/5 text-white font-semibold px-8 py-4 rounded-xl transition-colors">

                  <span data-ev-id="ev_dca78f62e0">לתיאום פגישת תכנון</span>
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-lg border-t border-white/10 pt-8">
                <div>
                  <div className="font-mono text-3xl font-bold text-ink"><CountUp to={20} suffix="+" /></div>
                  <div className="text-xs text-ink-muted mt-1">שנות ניסיון בשוק ההון והביטוח</div>
                </div>
                <div>
                  <div className="font-mono text-3xl font-bold text-ink"><CountUp to={360} suffix="°" /></div>
                  <div className="text-xs text-ink-muted mt-1">ראייה הוליסטית: השקעות, ביטוח ופנסיה</div>
                </div>
                <div>
                  <div className="font-mono text-3xl font-bold text-ink"><CountUp to={4} /></div>
                  <div className="text-xs text-ink-muted mt-1">כלים דיגיטליים לבדיקה עצמית</div>
                </div>
              </div>

              <p className="mt-8 text-xs text-ink-muted/80 max-w-xl leading-relaxed">
                החברה פועלת ברישיון מטעם רשות שוק ההון, ביטוח וחיסכון. שירותי ה־Family Office מבוצעים בלעדית באמצעות <a data-ev-id="ev_cd7d5f0d5a" href="https://www.piowealth.com" target="_blank" rel="noopener noreferrer" className="text-gold/90 hover:text-gold underline">Pioneer Wealth Management</a>, המחזיקה ברישיון ניהול השקעות ומפוקחת על ידי הרשות לניירות ערך.
              </p>
            </div>

            <div data-ev-id="ev_0ee474fd3e">
              <HeroDashboard />
            </div>
          </div>
        </div>

        <div data-ev-id="ev_7cbdd30ad4" className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface-2 to-transparent pointer-events-none"></div>
      </section>

      {/* Logo Marquee - Client Companies */}
      <LogoMarquee />

      {/* Services Section */}
      <section data-ev-id="ev_0bd4ef5ac3" id="services" className="relative py-20 lg:py-32 bg-surface-2 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
        <div data-ev-id="ev_e87cdae18f" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl mb-14">
            <div data-ev-id="ev_ec48ab1112" className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-wide mb-4">
              <span className="w-8 h-px bg-gold" />
              <span data-ev-id="ev_1fdc3fd23d">השירותים שלנו</span>
            </div>
            <h2 data-ev-id="ev_27136de4bb" className="text-4xl sm:text-5xl font-extrabold text-ink mb-5 text-balance">
              שני מנועים. <span className="text-gradient-gold">מטרה אחת.</span>
            </h2>
            <p data-ev-id="ev_acec45e3dc" className="text-ink-muted text-lg text-pretty">
              תכנון פיננסי בונה את הדרך קדימה. מיצוי זכויות מחזיר את מה שכבר שלכם. יחד הם יוצרים תמונה פיננסית מלאה, מבוססת נתונים וממוקדת בכם.
            </p>
          </Reveal>

          <div data-ev-id="ev_9c346c8717" className="grid lg:grid-cols-2 gap-6">
            {pillars.map((pillar, index) =>
            <Reveal key={pillar.title} delay={index * 120}>
                <div data-ev-id="ev_fa0ea75c5c" className="card-tech group h-full rounded-3xl p-8 lg:p-10 overflow-hidden">
                  <div className="absolute -top-24 -left-24 w-64 h-64 bg-gold/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-start justify-between mb-8">
                    <div data-ev-id="ev_065d543d5d" className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                      <pillar.icon className="w-7 h-7 text-gold" />
                    </div>
                    <span className="font-mono text-sm text-ink-muted">0{index + 1}</span>
                  </div>
                  {'subtitle' in pillar &&
                  <div className="relative text-gold text-sm font-semibold mb-1">{pillar.subtitle}</div>
                  }
                  <h3 data-ev-id="ev_8bed029513" className="relative text-2xl lg:text-3xl font-bold text-ink mb-3">{pillar.title}</h3>
                  <p data-ev-id="ev_efd62729a2" className="relative text-ink-muted text-pretty mb-8">{pillar.description}</p>
                  <ul className="relative grid sm:grid-cols-2 gap-3 mb-8">
                    {pillar.items.map((item) =>
                    <li key={item} className="flex items-center gap-2 text-sm text-ink">
                        <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                        {item}
                      </li>
                    )}
                  </ul>
                  <Link to={pillar.to} className="relative inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all">
                    {pillar.cta}
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delay={240}>
            <Link
              to="/family-office"
              className="group mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-3xl border border-gold/30 bg-gradient-to-l from-gold/10 to-transparent p-6 lg:p-8 hover:border-gold/60 transition-colors">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <Gem className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <div className="text-gold text-sm font-semibold mb-1">למשקיעים כשירים ומשפחות בעלות הון משמעותי</div>
                  <h3 className="text-2xl font-bold text-ink" dir="ltr">Wealth Management &amp; Family Office</h3>
                  <p className="text-ink-muted text-sm mt-1">ניתן בבלעדיות על ידי פיוניר תכנון פיננסי (Pioneer Wealth Management)</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 text-gold font-semibold group-hover:gap-3 transition-all shrink-0">
                לפרטים על השירות
                <ArrowLeft className="w-4 h-4" />
              </span>
            </Link>
          </Reveal>

        </div>
      </section>

      <ToolsShowcase />

      {/* About WealthTech Section */}
      <section data-ev-id="ev_about_company" id="about" className="relative py-20 lg:py-32 bg-surface-2 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div data-ev-id="ev_38a95d0bf3" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_3bbfd490a6" className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <Reveal className="lg:col-span-5 lg:sticky lg:top-28 self-start">
              <div data-ev-id="ev_0e678318b0" className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-wide mb-4">
                <span className="w-8 h-px bg-gold" />
                <span data-ev-id="ev_36bcf7ae09">אודות WealthTech</span>
              </div>

              <h2 data-ev-id="ev_035ae1d690" className="text-4xl sm:text-5xl font-extrabold text-ink mb-6 text-balance">
                אנחנו מומחים בתכנון פיננסי, פנסיוני וביטוחי.
              </h2>

              <p data-ev-id="ev_85078963ea" className="text-ink-muted text-lg leading-relaxed mb-8 text-pretty">
                סוכנות מקצועית ועדכנית ברוחה, הנשענת על ניסיון של שנים רבות בליווי משפחות, מנהלים ובעלי הון בקבלת החלטות פיננסיות משמעותיות.
              </p>

              <p data-ev-id="ev_0dfb68f624" className="text-2xl font-bold text-ink mb-8">
                אם תרצו, אנחנו סוג של <span className="text-gradient-gold">אדריכלים פיננסיים.</span>
              </p>

              <div data-ev-id="ev_10af094dd6" className="flex flex-wrap gap-2">
                {['מקצועיות', 'עצמאות מחשבתית', 'שקיפות', 'יחס אישי'].map((value) =>
                <span key={value} className="rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-sm text-ink">{value}</span>
                )}
              </div>
            </Reveal>

            <div className="lg:col-span-7 flex flex-col gap-10">
              <Reveal>
                <p data-ev-id="ev_ec8b2a4b72" className="text-ink-muted text-lg leading-relaxed text-pretty">
                  פיננסים, פנסיה וביטוח הם לא אוסף של מוצרים. הם מערכת אחת של החלטות שצריכה לעבוד יחד, בהתאם למשפחה שלכם, לנכסים שצברתם, לרמת החיים שאתם רוצים לשמור עליה ולמטרות שעוד נמצאות בדרך.
                </p>
              </Reveal>

              <div className="card-tech rounded-3xl p-8 lg:p-10">
                <h3 data-ev-id="ev_6b81c64051" className="text-2xl font-bold text-ink mb-8">
                  אנחנו לא מתחילים מהמוצר. <span className="text-gold">אנחנו מתחילים מכם.</span>
                </h3>
                <ApproachTimeline />
              </div>

              <Reveal>
                <div data-ev-id="ev_282c43aad5" className="relative rounded-2xl border border-gold/30 bg-gradient-to-l from-gold/10 to-transparent p-6 lg:p-8">
                  <p data-ev-id="ev_c9a41db690" className="text-xl text-ink font-semibold text-pretty">
                    המטרה שלנו פשוטה: להפוך עולם פיננסי מורכב לתכנית ברורה, ישימה ומדויקת.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <p data-ev-id="ev_33ceaec9f3" className="text-ink-muted text-lg leading-relaxed text-pretty">
                  במשפחות בעלות נכסים משמעותיים, אנו מרחיבים את התמונה גם לתכנון בין־דורי, מבנה החזקת הנכסים, צרכים עתידיים של בני המשפחה ותיאום בין אנשי המקצוע השונים המלווים את המשפחה.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Key Questions */}
          <div data-ev-id="ev_5c23b7c1fb" className="mt-20 lg:mt-28">
            <Reveal>
              <h3 data-ev-id="ev_d2d4626fbf" className="text-2xl sm:text-3xl font-bold text-ink mb-8 text-balance">
                תכנון פיננסי טוב מתחיל <span className="text-gold">בשאלות הנכונות.</span>
              </h3>
            </Reveal>
            <div data-ev-id="ev_bfd7fef9f1" className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
              'כמה כסף באמת תצטרכו בעתיד?',
              'האם מבנה ההשקעות שלכם מתאים לכלל הנכסים שלכם?',
              'האם הפנסיה והביטוחים שלכם בנויים נכון?',
              'אילו סיכונים כדאי להעביר לחברת ביטוח ואילו נכון לשאת בעצמכם?',
              'האם כל המערכת הפיננסית שלכם באמת פועלת כמערכת אחת?'].
              map((question, i) =>
              <Reveal key={question} delay={i * 90}>
                  <div className="card-tech h-full rounded-2xl p-6 flex flex-col gap-4">
                    <span className="font-mono text-xs text-gold">Q.{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-ink font-medium text-pretty">{question}</span>
                  </div>
                </Reveal>
              )}
            </div>
          </div>

          <Reveal className="mt-20 text-center">
            <p data-ev-id="ev_05ed10c9fb" className="text-ink-muted text-lg mb-2">
              כי בסופו של דבר, תכנון פיננסי אינו עוסק רק בכסף. הוא עוסק באפשרות לקבל החלטות טובות יותר לגבי החיים שלכם.
            </p>
            <p data-ev-id="ev_9762209a17" className="text-4xl sm:text-5xl font-extrabold text-gradient-gold mt-6 pb-2" dir="ltr">
              One Life. Plan It Well.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Founder Section */}
      <section data-ev-id="ev_38ed89a569" id="founder" className="py-20 lg:py-32 bg-surface-2">
        <div data-ev-id="ev_029a091d85" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_9fcccaf64d" className="grid lg:grid-cols-2 gap-16 items-center">
            <div data-ev-id="ev_a14f87b6a5">
              <div data-ev-id="ev_665cf35951" className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-wide mb-4">
                <span className="w-8 h-px bg-gold" />
                <span data-ev-id="ev_f27975b1a7">אודות מייסד</span>
              </div>
              
              <h2 data-ev-id="ev_07d0b40bed" className="text-3xl sm:text-4xl font-bold text-ink mb-6 text-balance">
                אודי חברוני - מעל שני עשורים בשוק ההון והפיננסים
              </h2>
              
              <div data-ev-id="ev_19204c6e06" className="flex flex-col gap-4 text-ink-muted text-lg text-pretty">
                <p data-ev-id="ev_e706dc3946">
                  WealthTech הוקמה על ידי אודי חברוני, מבכירי אנשי הפיננסים בישראל, עם ניסיון של למעלה משני עשורים בשוק ההון, הביטוח והפיננסים. במהלך הקריירה שלו כיהן בתפקידי מפתח בגופים מובילים ובהם מיטב דש, כלל ביטוח, מוריץ טocolר, סולומון שוקי הון ו־E*TRADE, ורכש מומחיות עמוקה בניהול השקעות, פיתוח עסקי, אסטרטגיה פיננסית וליווי לקוחות בעלי הון.
                </p>
                <p data-ev-id="ev_c1268af65e">
                  בנוסף, שימש אודי כיועץ חיצוני להנהלת קופת הגמל וקרן ההשתלמות של האקדמאים במח"ר, כחלק מעשייה מקצועית רחבה המשלבת בין הבנה מוסדית, ראייה אסטרטגית ויכולת ללוות מהלכים פיננסיים מורכבים.
                </p>
                <p data-ev-id="ev_818aee8202">
                  מאז 2010 משמש אודי כמנהל הון בכיר ב־<a data-ev-id="ev_b067aafcab" href="https://www.piowealth.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light underline">Pioneer Wealth Management</a>, חברת השקעות גלובלית המעניקה שירותי Family Office ללקוחות אמידים בישראל ובזירה הבינלאומית. לאורך השנים גיבש תפיסת עולם מקצועית המשלבת תכנון פיננסי מדויק, ראייה אסטרטגית ארוכת טווח והבנה עמוקה של צורכי לקוחות מורכבים.
                </p>
                <p data-ev-id="ev_cb38462093" className="text-ink font-medium">
                  על יסודות אלה הוקמה WealthTech — סוכנות שנועדה להעניק ללקוחותיה מעטפת מתקדמת של תכנון פיננסי, השקעות וביטוח, ברמה הגבוהה ביותר.
                </p>
              </div>
              
              <div data-ev-id="ev_224d53f376" className="mt-8 flex flex-wrap gap-4">
                <div data-ev-id="ev_8013466792" className="flex items-center gap-2 border border-gold/30 bg-gold/5 rounded-full px-4 py-2">
                  <Tv className="w-4 h-4 text-gold" />
                  <span data-ev-id="ev_8336111f4d" className="text-sm text-ink font-medium">פאנליסט קבוע בערוץ 10</span>
                </div>
                <div data-ev-id="ev_b9b7242bc1" className="flex items-center gap-2 border border-gold/30 bg-gold/5 rounded-full px-4 py-2">
                  <BarChart3 className="w-4 h-4 text-gold" />
                  <span data-ev-id="ev_f8ad70f07a" className="text-sm text-ink font-medium">מייסד "השוק הפיננסי"</span>
                </div>
              </div>
            </div>
            
            <div data-ev-id="ev_b9e6db64dd" className="relative">
              <div data-ev-id="ev_b4f04afa6a" className="aspect-square panel-accent rounded-3xl overflow-hidden">
                <img data-ev-id="ev_ec300169d8"
                src={udiHevroniImage}
                alt="אודי חברוני - מייסד WealthTech, מומחה לתכנון פיננסי"
                className="w-full h-full object-cover" />

              </div>
              
              <div data-ev-id="ev_3061b87568" className="absolute -bottom-6 -right-6 bg-gold rounded-2xl p-6 shadow-xl">
                <div data-ev-id="ev_fd50f255d4" className="text-navy-dark">
                  <div data-ev-id="ev_afc86482fe" className="text-3xl font-bold">2010</div>
                  <a data-ev-id="ev_6019df4555" href="https://www.piowealth.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">Pioneer Wealth Management</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section data-ev-id="ev_7d1cfacb51" id="media" className="relative py-20 lg:py-32 bg-navy-dark overflow-hidden">
        <div data-ev-id="ev_2b69193d8c" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_1e0ced6e71" className="text-center max-w-3xl mx-auto mb-16">
            <div data-ev-id="ev_486480b968" className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-wide mb-4">
                <span className="w-8 h-px bg-gold" />
                <span data-ev-id="ev_9b12a00dd8">נוכחות תקשורתית</span>
            </div>
            
            <h2 data-ev-id="ev_f2dfffed03" className="text-3xl sm:text-4xl font-bold text-white mb-6 text-balance">
              אודי בתקשורת
            </h2>
            
            <p data-ev-id="ev_31074684de" className="text-white/70 text-lg text-pretty">
              בנוסף לפעילותו בתחום הפיננס, אודי הוא פנים מוכרות בתקשורת הישראלית. 
              הוא פאנליסט קבוע בתוכנית הכלכלית של ערוץ 10 ומייסד ועורך ראשי של 
              "השוק הפיננסי" - פלטפורמת מדיה פיננסית מובילה.
            </p>
          </div>
          
          <div data-ev-id="ev_6c74c5206e" className="grid md:grid-cols-2 gap-8">
            <div data-ev-id="ev_5326e5b1fc" className="card-tech rounded-2xl p-8">
              <div data-ev-id="ev_328e90d86c" className="flex items-center gap-4 mb-6">
                <div data-ev-id="ev_ff5afd90de" className="w-16 h-16 bg-gold rounded-xl flex items-center justify-center">
                  <Tv className="w-8 h-8 text-navy-dark" />
                </div>
                <div data-ev-id="ev_df844a8dd0">
                  <h3 data-ev-id="ev_1bcb6f327a" className="text-xl font-bold text-white">ערוץ 10</h3>
                  <p data-ev-id="ev_0e5f382c58" className="text-white/70">פאנליסט קבוע בתוכנית הכלכלית</p>
                </div>
              </div>
              <p data-ev-id="ev_027cb5957d" className="text-white/80 text-pretty">
                אודי מופיע באופן קבוע בתוכניות הכלכלה המובילות בטלוויזיה הישראלית, 
                מספק ניתוחים מעמיקים על שווקי ההון, מגמות כלכליות והזדמנויות השקעה.
              </p>
            </div>
            
            <div data-ev-id="ev_a6b84c0ac3" className="card-tech rounded-2xl p-8">
              <div data-ev-id="ev_e529c9782b" className="flex items-center gap-4 mb-6">
                <div data-ev-id="ev_fd382547be" className="w-16 h-16 bg-gold rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-navy-dark" />
                </div>
                <div data-ev-id="ev_e4be008735">
                  <h3 data-ev-id="ev_f564ae025d" className="text-xl font-bold text-white">השוק הפיננסי</h3>
                  <p data-ev-id="ev_2d925bdcfd" className="text-white/70">מייסד ועורך ראשי</p>
                </div>
              </div>
              <p data-ev-id="ev_36d45ba7ce" className="text-white/80 text-pretty">
                פלטפורמת מדיה פיננסית מובילה הכוללת ראיונות עם מומחים, 
                מדריכי וידאו חינוכיים ותובנות שוק מעמיקות לקהל הרחב.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Finance Market (financetv.co.il) Section */}
      <section id="finance-market" className="relative py-20 lg:py-28 hero-tech overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-wide mb-4">
                <span className="w-8 h-px bg-gold" />
                <span>חינוך פיננסי לציבור</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-balance">
                השוק הפיננסי
              </h2>
              <p className="text-white/80 text-lg mb-8 text-pretty">
                אודי חברוני ייסד את "השוק הפיננסי" במטרה להנגיש לציבור הרחב מדריכי תוכן מקצועיים
                מצולמים ומאמרים בתחום החינוך הפיננסי.
              </p>
              <a
                href="https://www.financetv.co.il"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark font-semibold px-8 py-4 rounded-lg transition-colors">
                <span>לאתר השוק הפיננסי</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            <div className="grid gap-4">
              {[
                { icon: PlayCircle, title: 'מדריכים מצולמים', text: 'מדריכי וידאו מקצועיים שמסבירים נושאים פיננסיים בשפה פשוטה וברורה.' },
                { icon: BookOpen, title: 'מאמרים מקצועיים', text: 'מאמרים בתחומי חיסכון, פנסיה, השקעות, ביטוח ומיסוי.' },
                { icon: Users, title: 'נגיש לכולם', text: 'תוכן חינוכי פתוח לציבור הרחב, ללא עלות.' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="card-tech rounded-2xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 bg-gold rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-navy-dark" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                    <p className="text-white/70 text-pretty">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-ev-id="ev_6fbaa24d6b" className="cta-glow relative overflow-hidden py-24 bg-navy-dark border-y border-gold/20">
        <div data-ev-id="ev_84a530bc36" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 data-ev-id="ev_ddb6a0e135" className="text-3xl sm:text-4xl font-bold text-ink mb-6 text-balance">
            מוכנים להתחיל את המסע הפיננסי שלכם?
          </h2>
          <p data-ev-id="ev_7b017dac23" className="text-ink-muted text-lg mb-8 max-w-2xl mx-auto text-pretty">
            תכנון פיננסי, מיצוי זכויות וליווי לאורך שנים. קבעו פגישת היכרות ראשונית, ללא עלות וללא התחייבות.
          </p>
          <a data-ev-id="ev_937a76c288"
          href="#contact"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark font-semibold px-8 py-4 rounded-lg transition-colors">

            <span data-ev-id="ev_bf8dc61646">קבע פגישה עכשיו</span>
            <ArrowLeft className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Workshop - small banner */}
      <section className="bg-surface py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                <Users className="w-5 h-5 text-gold" />
              </div>
              <div>
                <div className="font-semibold text-ink">סדנת תכנון פיננסי למשפחה</div>
                <div className="text-sm text-ink-muted">3 מפגשים בזום לעשיית סדר בכסף המשפחתי</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowWorkshopPopup(true)}
              className="inline-flex items-center gap-2 text-sm text-gold font-semibold hover:gap-3 transition-all">
              לפרטים והרשמה
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section data-ev-id="ev_d94c79f839" id="contact" className="py-20 lg:py-32 bg-surface">
        <div data-ev-id="ev_f6a23696a4" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_ac19ad3049" className="grid lg:grid-cols-2 gap-16">
            <div data-ev-id="ev_53e7608940">
              <div data-ev-id="ev_07367bae8d" className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-wide mb-4">
                <span className="w-8 h-px bg-gold" />
                <span data-ev-id="ev_d9f3a4cbc7">צור קשר</span>
              </div>
              
              <h2 data-ev-id="ev_7a9b3ca6aa" className="text-3xl sm:text-4xl font-bold text-ink mb-6 text-balance">
                נשמח לשמוע ממך
              </h2>
              
              <p data-ev-id="ev_d472080884" className="text-ink-muted text-lg mb-8 text-pretty">
                השאירו פרטים ונחזור אליכם בהקדם לתיאום פגישת ייעוץ ראשונית. 
                הפגישה הראשונה ללא עלות וללא התחייבות.
              </p>
              
              <div data-ev-id="ev_be18a08851" className="flex flex-col gap-6">
                <div data-ev-id="ev_41a5fd7f1d" className="flex items-center gap-4">
                  <div data-ev-id="ev_21b2bed7b1" className="w-12 h-12 bg-surface-2 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div data-ev-id="ev_e36d2410ba">
                    <div data-ev-id="ev_c5c2ab041e" className="text-sm text-ink-muted">טלפון</div>
                    <div data-ev-id="ev_3f4e8fd215" className="text-ink font-semibold">09-9611352 | 050-8210573</div>
                  </div>
                </div>
                
                <div data-ev-id="ev_2eaa0c0ede" className="flex items-center gap-4">
                  <div data-ev-id="ev_5bc8f5e9d3" className="w-12 h-12 bg-surface-2 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div data-ev-id="ev_b9cac19135">
                    <div data-ev-id="ev_e10dba2486" className="text-sm text-ink-muted">אימייל</div>
                    <a data-ev-id="ev_437e860112" href="mailto:service@wealthtech.co.il" className="text-ink font-semibold hover:text-gold transition-colors">service@wealthtech.co.il</a>
                  </div>
                </div>
                
                <div data-ev-id="ev_1d2d39b090" className="flex items-center gap-4">
                  <div data-ev-id="ev_f2cd904ac3" className="w-12 h-12 bg-surface-2 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div data-ev-id="ev_25f9dc4c3a">
                    <div data-ev-id="ev_2d71323642" className="text-sm text-ink-muted">כתובת</div>
                    <div data-ev-id="ev_8ef182db79" className="text-ink font-semibold">הסדנאות 8, הרצליה (משרדי פיוניר)</div>
                  </div>
                </div>
                
                <div data-ev-id="ev_fa05885534" className="flex items-center gap-4">
                  <div data-ev-id="ev_a35a35af52" className="w-12 h-12 bg-surface-2 rounded-xl flex items-center justify-center">
                    <Linkedin className="w-5 h-5 text-gold" />
                  </div>
                  <div data-ev-id="ev_589096e51d">
                    <div data-ev-id="ev_f32f07a430" className="text-sm text-ink-muted">לינקדאין</div>
                    <a data-ev-id="ev_be028319ce" href="https://www.linkedin.com/in/udi-hevroni-15764a26/" target="_blank" rel="noopener noreferrer" className="text-ink font-semibold hover:text-gold transition-colors">אודי חברוני</a>
                  </div>
                </div>
                
                <div data-ev-id="ev_fedf77a428" className="flex items-center gap-4">
                  <div data-ev-id="ev_04c14378bd" className="w-12 h-12 bg-surface-2 rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-gold" />
                  </div>
                  <div data-ev-id="ev_2d89375b5b">
                    <div data-ev-id="ev_242f0c6b0b" className="text-sm text-ink-muted">פרטי החברה</div>
                    <div data-ev-id="ev_9f7beaa36a" className="text-ink font-semibold text-sm">וולת'טק סוכנות לביטוח (2015) בע"מ</div>
                    <div data-ev-id="ev_532abdb635" className="text-ink-muted text-sm">ח.פ 515186971</div>
                  </div>
                </div>
                
                <div data-ev-id="ev_9d9e71e6de" className="mt-4 p-4 bg-surface-2/50 rounded-xl border border-border/50">
                  <p data-ev-id="ev_39fcdabe14" className="text-ink-muted text-xs leading-relaxed">
                    החברה מחזיקה ברישיון תאגיד מטעם רשות שוק ההון, ביטוח וחיסכון וכפופה לדרישות משרד האוצר ביחס למחזיקי רישיון פנסיוני בישראל.
                  </p>
                </div>
              </div>
            </div>
            
            <div data-ev-id="ev_cf31a5bb29">
              {submitSuccess ?
              <div data-ev-id="ev_a44435e30d" className="bg-surface-2 rounded-2xl p-8 text-center">
                  <div data-ev-id="ev_12d3fb84c7" className="w-16 h-16 bg-green-500/15 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 data-ev-id="ev_76b39d61be" className="text-xl font-bold text-ink mb-2">תודה על פנייתך!</h3>
                  <p data-ev-id="ev_e69b06d40b" className="text-ink-muted mb-4">קיבלנו את ההודעה שלך ונחזור אליך בהקדם.</p>
                  <button data-ev-id="ev_7f16bff566"
                onClick={() => setSubmitSuccess(false)}
                className="text-gold hover:text-gold-dark font-medium">

                    שלח הודעה נוספת
                  </button>
                </div> :

              <form data-ev-id="ev_a114c76033" onSubmit={handleContactSubmit} className="bg-surface-2 rounded-2xl p-8">
                  <div data-ev-id="ev_eb9ba6b744" className="flex flex-col gap-6">
                    <div data-ev-id="ev_7c5a20dde3">
                      <label data-ev-id="ev_cc9aa6f75a" className="block text-sm font-medium text-ink mb-2">שם מלא *</label>
                      <input data-ev-id="ev_50e2591eef"
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-surface"
                    placeholder="הכנס את שמך" />

                    </div>
                    
                    <div data-ev-id="ev_26ac6c0e98">
                      <label data-ev-id="ev_714c3b05b5" className="block text-sm font-medium text-ink mb-2">טלפון</label>
                      <input data-ev-id="ev_9a739bfbb8"
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-surface"
                    placeholder="050-0000000" />

                    </div>
                    
                    <div data-ev-id="ev_6db2b3eda8">
                      <label data-ev-id="ev_a14fe2168b" className="block text-sm font-medium text-ink mb-2">אימייל *</label>
                      <input data-ev-id="ev_021de04422"
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-surface"
                    placeholder="your@email.com" />

                    </div>
                    
                    <div data-ev-id="ev_539e31ab10">
                      <label data-ev-id="ev_af93a43ab1" className="block text-sm font-medium text-ink mb-2">הודעה *</label>
                      <textarea data-ev-id="ev_e677dfcd05"
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-surface resize-none"
                    placeholder="ספר לנו במה נוכל לעזור..." />

                    </div>

                    {submitError &&
                  <div data-ev-id="ev_d3885e225d" className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                        {submitError}
                      </div>
                  }
                    
                    <button data-ev-id="ev_e081935b97"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold-light text-navy-dark font-semibold px-8 py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">

                      {isSubmitting ?
                    <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span data-ev-id="ev_f30ed6253c">שולח...</span>
                        </> :

                    'שלח פנייה'
                    }
                    </button>
                  </div>
                </form>
              }
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer data-ev-id="ev_585ea311c4" className="bg-navy py-12">
        <div data-ev-id="ev_0655b5feab" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer Top CTA */}
          <div data-ev-id="ev_70e3ab73d9" className="flex justify-center mb-8">
            <a data-ev-id="ev_627ec1c675"
            href="https://surense.com/app/p/9z3sqal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-navy-dark font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">

              <FileText className="w-5 h-5" />
              להוצאת מידע פנסיוני עדכני
            </a>
          </div>
          
          <div data-ev-id="ev_e5634db2dd" className="flex flex-col md:flex-row justify-between items-center gap-6">
            <img data-ev-id="ev_882f16b57e"
            src={wealthtechLogo}
            alt="WealthTech - One Life. Plan IT Well"
            className="h-20 w-auto object-contain" />

            
            <div data-ev-id="ev_df8420040e" className="flex items-center gap-6">
              <a data-ev-id="ev_1f5985c2fd" href="#about" className="text-white/70 hover:text-white transition-colors">אודות</a>
              <a data-ev-id="ev_6c297bd2b9" href="#services" className="text-white/70 hover:text-white transition-colors">שירותים</a>
              <Link to="/wealthtech-one" className="text-white/70 hover:text-white transition-colors">WealthTech One</Link>
              <Link to="/family-office" className="text-white/70 hover:text-white transition-colors">Family Office</Link>
              <a data-ev-id="ev_b36c5eb616" href="#media" className="text-white/70 hover:text-white transition-colors">מדיה</a>
              <a href="#finance-market" className="text-white/70 hover:text-white transition-colors">השוק הפיננסי</a>
              <Link data-ev-id="ev_e236bdf98e" to="/links" className="text-white/70 hover:text-white transition-colors">קישורים</Link>
              <a data-ev-id="ev_21cbb55fbf" href="#contact" className="text-white/70 hover:text-white transition-colors">צור קשר</a>
            </div>
            
            <div data-ev-id="ev_6b534f2f0a" className="flex flex-col items-center md:items-end gap-2">
              <div data-ev-id="ev_f3d2c60a5f" className="text-white/50 text-sm">
                © 2024 WealthTech. כל הזכויות שמורות.
              </div>
              <div data-ev-id="ev_d6af488723" className="flex items-center gap-4">
                <Link data-ev-id="ev_a0d79b6e1a" to="/privacy" className="text-white/50 hover:text-white text-sm transition-colors">
                  מדיניות פרטיות
                </Link>
                <span data-ev-id="ev_c6ab46d684" className="text-white/30">|</span>
                <Link data-ev-id="ev_95a4a33d98" to="/disclosure" className="text-white/50 hover:text-white text-sm transition-colors">
                  גילוי נאות
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Offer Button */}
      <button data-ev-id="ev_2d1f468c14"
      onClick={() => setShowOfferPopup(true)}
      className="fixed bottom-6 left-20 z-50 bg-gold hover:bg-gold-light text-navy-dark font-bold px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3 group">

        <Gift className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span data-ev-id="ev_2975386387" className="hidden sm:inline">מגיע לך הטבה!</span>
      </button>

      {/* Offer Popup */}
      <PensionOfferPopup
        isOpen={showOfferPopup}
        onClose={() => setShowOfferPopup(false)} />
      
      {/* Workshop Popup */}
      <WorkshopPopup
        isOpen={showWorkshopPopup}
        onClose={() => setShowWorkshopPopup(false)} />

    </div>);

}