import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  TrendingUp,
  Shield,
  Users,
  BarChart3,
  Play,
  Tv,
  Award,
  ChevronLeft,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  ArrowLeft,
  Building2,
  Sparkles,
  Target,
  Briefcase,
  Menu,
  X,
  ChevronDown,
  PiggyBank,
  FileText,
  Building,
  Loader2,
  CheckCircle2,
  Gift,
  Calculator,
  ExternalLink,
  Landmark,
  Globe,
  Wallet } from
'lucide-react';
import { LogoMarquee } from '@/components/LogoMarquee';
import { Logo } from '@/components/Logo';
import { PensionOfferPopup } from '@/components/PensionOfferPopup';
import { WorkshopPopup } from '@/components/WorkshopPopup';
import { supabase } from '@/integrations/supabase/client';
import udiHevroniImage from '@/assets/uploads/udi-hevroni.jpg';
import wealthtechLogo from '@/assets/uploads/wealthtech-logo-new.png';
import wealthtechBrandHero from '@/assets/uploads/wealthtech-brand-hero.jpg';
import workshopFamilyFinanceImage from '@/assets/uploads/workshop-family-finance.jpg';

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
  const [workshopForm, setWorkshopForm] = useState({ name: '', phone: '', email: '' });
  const [workshopSubmitting, setWorkshopSubmitting] = useState(false);
  const [workshopSubmitted, setWorkshopSubmitted] = useState(false);

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

  // Auto-open workshop popup after 45 seconds (only once per session)
  useEffect(() => {
    const hasSeenWorkshop = sessionStorage.getItem('hasSeenWorkshopOffer');
    if (!hasSeenWorkshop) {
      const timer = setTimeout(() => {
        setShowWorkshopPopup(true);
        sessionStorage.setItem('hasSeenWorkshopOffer', 'true');
      }, 45000);
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

  const handleWorkshopSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    setWorkshopSubmitting(true);
    try {
      const { error } = await supabase.from('leads').insert({
        name: workshopForm.name,
        phone: workshopForm.phone,
        email: workshopForm.email,
        source: 'workshop_homepage_banner',
        notes: 'הרשמה לסדנת תכנון פיננסי למשפחה - באנר דף הבית'
      });

      if (error) throw error;
      setWorkshopSubmitted(true);
      setWorkshopForm({ name: '', phone: '', email: '' });
    } catch (err) {
      console.error('Error submitting workshop form:', err);
    } finally {
      setWorkshopSubmitting(false);
    }
  };

  const services = [
  {
    icon: TrendingUp,
    title: 'שיווק השקעות',
    description: 'אסטרטגיות השקעה מותאמות אישית לצמיחה ההון שלך'
  },
  {
    icon: Shield,
    title: 'פתרונות ביטוח',
    description: 'הגנה מקיפה על הנכסים והעתיד הפיננסי שלך'
  },
  {
    icon: Target,
    title: 'תכנון פיננסי',
    description: 'תוכניות מקיפות להשגת יעדים פיננסיים לטווח ארוך'
  },
  {
    icon: Building2,
    title: 'שירותי Family Office',
    description: 'ניהול הון משפחתי מקיף ללקוחות אמידים'
  },
  {
    icon: Sparkles,
    title: 'טכנולוגיה מתקדמת',
    description: 'כלים דיגיטליים ובינה מלאכותית לניהול יעיל'
  },
  {
    icon: Briefcase,
    title: 'תשתית לסוכנים',
    description: 'מערכות, מיתוג ותמיכה ליועצים עצמאיים'
  }];


  const stats = [
  { value: '20+', label: 'שנות ניסיון ניהולי מצטבר בחברות ביטוח ובתי השקעות בישראל' },
  { value: 'ראייה הוליסטית מתקדמת', label: 'השקעות, ביטוח ותכנון פיננסי' },
  { value: 'ליווי פרימיום', label: 'למנהלים, מייסדים ובכירים בישראל' }];


  return (
    <div data-ev-id="ev_9cb2434ead" className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav data-ev-id="ev_e2fa12d344" className="fixed top-0 right-0 left-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div data-ev-id="ev_2087f5917c" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_89d74e3540" className="flex justify-between items-center h-20">
            <Logo />
            
            <div data-ev-id="ev_e5dbf24f4b" className="hidden md:flex items-center gap-8">
              <a data-ev-id="ev_e2a1487f92" href="#about" className="text-slate hover:text-navy transition-colors font-medium">אודות</a>
              <Link data-ev-id="ev_a34bc6dec1" to="/products" className="text-slate hover:text-navy transition-colors font-medium">מוצרים</Link>
              <a data-ev-id="ev_8409256ff0" href="#services" className="text-slate hover:text-navy transition-colors font-medium">שירותים</a>
              <Link data-ev-id="ev_6ae73e9478" to="/process" className="text-slate hover:text-navy transition-colors font-medium">תהליך העבודה</Link>
              <Link data-ev-id="ev_9f90114cc3" to="/media" className="text-slate hover:text-navy transition-colors font-medium">מדיה</Link>
              
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
                <div data-ev-id="ev_f85bdce407" className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-border py-2 z-50">
                    <Link data-ev-id="ev_044d6f8354"
                  to="/life-insurance-calculator"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-light transition-colors">

                      <div data-ev-id="ev_9989b42bfc" className="w-8 h-8 bg-gold/20 rounded-lg flex items-center justify-center">
                        <Calculator className="w-4 h-4 text-gold" />
                      </div>
                      <div data-ev-id="ev_6d92ec648e">
                        <div data-ev-id="ev_d9ab900dd0" className="font-medium text-navy flex items-center gap-2">
                          מחשבון ביטוח חיים
                          <span data-ev-id="ev_59571bba6d" className="bg-gold text-navy text-[10px] font-bold px-1.5 py-0.5 rounded">חדש!</span>
                        </div>
                        <div data-ev-id="ev_f9a1edcfc2" className="text-xs text-slate">כמה כיסוי אתה צריך?</div>
                      </div>
                    </Link>
                    <Link data-ev-id="ev_4730a1a672"
                  to="/savings-calculator"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-light transition-colors">

                      <div data-ev-id="ev_e27fedb3da" className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                      <div data-ev-id="ev_48bc5e5105">
                        <div data-ev-id="ev_3b1bdf111a" className="font-medium text-navy flex items-center gap-2">
                          מחשבון חיסכון
                          <span data-ev-id="ev_9140ca476d" className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">חדש!</span>
                        </div>
                        <div data-ev-id="ev_88308d1a55" className="text-xs text-slate">צמיחה לפי רמת סיכון</div>
                      </div>
                    </Link>
                    <Link data-ev-id="ev_34acba69b4"
                  to="/wealth-snapshot"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-light transition-colors">

                      <div data-ev-id="ev_aa6500c31a" className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Wallet className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div data-ev-id="ev_944c2aa778">
                        <div data-ev-id="ev_03bbfbb7f0" className="font-medium text-navy flex items-center gap-2">
                          מפת הנכסים שלי
                          <span data-ev-id="ev_849187f316" className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">חדש!</span>
                        </div>
                        <div data-ev-id="ev_93a8c3db36" className="text-xs text-slate">תמונת הון כוללת</div>
                      </div>
                    </Link>
                    <div data-ev-id="ev_eaf92a1890" className="border-t border-border my-2" />
                    <Link data-ev-id="ev_99d4d705c8"
                  to="/pension-returns"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-light transition-colors">

                      <div data-ev-id="ev_9d2a869b7d" className="w-8 h-8 bg-navy/10 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-navy" />
                      </div>
                      <div data-ev-id="ev_aa6500c31a">
                        <div data-ev-id="ev_49541dd0b8" className="font-medium text-navy">מנוע השוואת תשואות</div>
                        <div data-ev-id="ev_295a8e9e2e" className="text-xs text-slate">גמל והשתלמות בישראל</div>
                      </div>
                    </Link>
                    <Link data-ev-id="ev_53d3d2cc7a"
                  to="/tax-refund-eligibility"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-light transition-colors">

                      <div data-ev-id="ev_387238636b" className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-purple-600" />
                      </div>
                      <div data-ev-id="ev_b5860369e1">
                        <div data-ev-id="ev_bb7e415615" className="font-medium text-navy flex items-center gap-2">
                          בדיקת זכאות החזר מס
                          <span data-ev-id="ev_6c84529b61" className="bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">חדש!</span>
                        </div>
                        <div data-ev-id="ev_afa8d91def" className="text-xs text-slate">שאלון מזורז לבדיקה ראשונית</div>
                      </div>
                    </Link>
                  </div>
                }
              </div>
              
              <Link data-ev-id="ev_dd93cc5926" to="/links" className="text-slate hover:text-navy transition-colors font-medium">קישורים</Link>

              <a data-ev-id="ev_f2eb830098"
              href="https://surense.com/app/p/9z3sqal"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-navy hover:bg-navy-light text-white font-semibold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2">

                <FileText className="w-4 h-4" />
                להוצאת מידע עדכני
              </a>
              <Link data-ev-id="ev_7d61d96b1e"
              to="/onboarding"
              className="bg-gold hover:bg-gold-light text-navy font-semibold px-6 py-2.5 rounded-lg transition-colors">

                התחל תהליך
              </Link>
            </div>


            <button data-ev-id="ev_bd5cf0b3ef"
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>

              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen &&
        <div data-ev-id="ev_35e7bb1c78" className="md:hidden bg-white border-t border-border">
            <div data-ev-id="ev_cc2e6bca2f" className="px-4 py-4 flex flex-col gap-4">
              <a data-ev-id="ev_6a4f425685" href="#about" className="text-slate hover:text-navy font-medium py-2">אודות</a>
              <Link data-ev-id="ev_3bc6950ce1" to="/products" className="text-slate hover:text-navy font-medium py-2">מוצרים</Link>
              <a data-ev-id="ev_48c7549341" href="#services" className="text-slate hover:text-navy font-medium py-2">שירותים</a>
              <Link data-ev-id="ev_4d74daf187" to="/process" className="text-slate hover:text-navy font-medium py-2">תהליך העבודה</Link>
              <Link data-ev-id="ev_c1a033792c" to="/media" className="text-slate hover:text-navy font-medium py-2">מדיה</Link>
              
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
                    <Link data-ev-id="ev_5f485fe854" to="/life-insurance-calculator" className="text-slate hover:text-navy font-medium py-2 flex items-center gap-2">
                      <Calculator className="w-4 h-4" />
                      מחשבון ביטוח חיים
                    </Link>
                    <Link data-ev-id="ev_dfe3099f43" to="/savings-calculator" className="text-slate hover:text-navy font-medium py-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      מחשבון חיסכון
                    </Link>
                    <Link data-ev-id="ev_62a020bcb7" to="/wealth-snapshot" className="text-slate hover:text-navy font-medium py-2 flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      מפת הנכסים שלי
                    </Link>
                    <Link data-ev-id="ev_2fcb524070" to="/pension-returns" className="text-slate hover:text-navy font-medium py-2 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      מנוע השוואת תשואות
                    </Link>
                    <Link data-ev-id="ev_4f9d6a860d" to="/tax-refund-eligibility" className="text-slate hover:text-navy font-medium py-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      בדיקת זכאות החזר מס
                    </Link>
                  </div>
              }
              </div>
              
              <Link data-ev-id="ev_c950b3d423" to="/links" className="text-slate hover:text-navy font-medium py-2">קישורים</Link>

              <a data-ev-id="ev_8d9cb16eaf"
            href="https://surense.com/app/p/9z3sqal"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-6 py-3 rounded-lg">

                <FileText className="w-4 h-4" />
                להוצאת מידע עדכני
              </a>
              <Link data-ev-id="ev_3e10f6dfea"
            to="/onboarding"
            className="bg-gold hover:bg-gold-light text-navy font-semibold px-6 py-3 rounded-lg text-center">

                התחל תהליך
              </Link>
            </div>
          </div>
        }
      </nav>

      {/* Hero Section */}
      <section data-ev-id="ev_ba9f580a12" className="relative min-h-screen flex items-center bg-gradient-to-br from-navy via-navy-light to-navy pt-20">
        <div data-ev-id="ev_732df54b84" className="absolute inset-0 overflow-hidden">
          <div data-ev-id="ev_7f9cc09e71" className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
          <div data-ev-id="ev_1137a15102" className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl"></div>
        </div>
        
        <div data-ev-id="ev_d502e488ff" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div data-ev-id="ev_8eb882f37a" className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-ev-id="ev_852c9dcdad">
              <div data-ev-id="ev_0ee476a3a6" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Award className="w-4 h-4 text-gold" />
                <span data-ev-id="ev_d58e054cc9" className="text-white/90 text-sm">מעל 20 שנות מצוינות פיננסית</span>
              </div>
              
              <h1 data-ev-id="ev_cef9e6d4ae" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance">
                <span data-ev-id="ev_wealthtech_brand" className="block text-gold text-xl sm:text-2xl mb-2">וולת'טק | WealthTech</span>
                One Life. Plan IT Well
                <span data-ev-id="ev_b6f3f6cde1" className="block text-white/90 text-2xl sm:text-3xl lg:text-4xl mt-4">תכנון פיננסי פרימיום למנהלים, מייסדים ובכירים בישראל</span>
              </h1>
              
              <p data-ev-id="ev_ecdf672d7c" className="text-lg text-white/80 mb-8 max-w-xl text-pretty">וולת'טק נבנתה עבור מי שמצפים ליותר משירות פיננסי רגיל,  אלא למעטפת אסטרטגית שלמה לניהול ההון, הנכסים והעתיד המשפחתי.
אנו משלבים טכנולוגיה מתקדמת, מומחיות פיננסית רב־תחומית וחשיבה אישית מדויקת, כדי להעניק פתרונות תכנון פיננסי, השקעות וביטוח ברמה הגבוהה ביותר.

וולת'טק פועלת מתוך מחויבות למצוינות, דיסקרטיות וראייה ארוכת טווח — עבור לקוחות שמבינים כי ניהול הון אמיתי דורש הרבה מעבר למענה פיננסית נקודתי.

החברה פועלת ברישיון מטעם רשות שוק ההון, ביטוח וחיסכון, ושירותי ה־Family Office מבוצעים בלעדית באמצעות <a data-ev-id="ev_cd7d5f0d5a" href="https://www.piowealth.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light underline">Pioneer Wealth Management</a>, המחזיקה ברישיון ניהול השקעות ומפוקחת על ידי הרשות לניירות ערך.
              </p>
              
              <div data-ev-id="ev_176827c442" className="flex flex-col sm:flex-row gap-4">
                <a data-ev-id="ev_e620f76795"
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy font-semibold px-8 py-4 rounded-lg transition-all hover:translate-x-1">

                  <span data-ev-id="ev_99b97201fb">התחל עכשיו</span>
                  <ArrowLeft className="w-5 h-5" />
                </a>
                <a data-ev-id="ev_f044ebfbcf"
                href="#about"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-lg transition-colors">

                  <span data-ev-id="ev_dca78f62e0">למד עוד</span>
                </a>
              </div>
            </div>
            
            <div data-ev-id="ev_0ee474fd3e" className="hidden lg:block">
              <div data-ev-id="ev_3054594734" className="relative">
                <div data-ev-id="ev_a998078856" className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-3xl transform rotate-3"></div>
                <div data-ev-id="ev_fd258a5c5d" className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <div data-ev-id="ev_64246d84d5" className="flex flex-col gap-6">
                    {/* Main stat - centered */}
                    <div data-ev-id="ev_66fa171b32" className="text-center p-4">
                      <div data-ev-id="ev_cddb2e7854" className="text-5xl font-bold text-gold mb-2">{stats[0].value}</div>
                      <div data-ev-id="ev_c02c7af197" className="text-white/70 text-sm">{stats[0].label}</div>
                    </div>
                    {/* Secondary stats - row */}
                    <div data-ev-id="ev_0d90c90746" className="grid grid-cols-2 gap-4">
                      {stats.slice(1).map((stat, index) =>
                      <div data-ev-id="ev_d2d2a135ba" key={index} className="text-center p-3 bg-white/5 rounded-xl">
                          <div data-ev-id="ev_cb3ac55a4f" className="text-xl font-bold text-gold mb-1">{stat.value}</div>
                          <div data-ev-id="ev_c1dcbd6040" className="text-white/70 text-xs">{stat.label}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div data-ev-id="ev_7cbdd30ad4" className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Mobile */}
      <section data-ev-id="ev_8c31af5d62" className="lg:hidden bg-light py-12">
        <div data-ev-id="ev_2872a09f2d" className="max-w-7xl mx-auto px-4">
          <div data-ev-id="ev_a2ecc2e6c3" className="flex flex-col gap-6">
            {/* Main stat - centered */}
            <div data-ev-id="ev_ab1346f44f" className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div data-ev-id="ev_b3dee149af" className="text-4xl font-bold text-gold mb-2">{stats[0].value}</div>
              <div data-ev-id="ev_e5c81e3b07" className="text-slate text-sm">{stats[0].label}</div>
            </div>
            {/* Secondary stats - row */}
            <div data-ev-id="ev_60e7aa0f16" className="grid grid-cols-2 gap-4">
              {stats.slice(1).map((stat, index) =>
              <div data-ev-id="ev_2cd62d7bc7" key={index} className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <div data-ev-id="ev_afc86482fe" className="text-lg font-bold text-gold mb-1">{stat.value}</div>
                  <div data-ev-id="ev_ea025ac8a5" className="text-slate text-xs">{stat.label}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Logo Marquee - Client Companies */}
      <LogoMarquee />

      {/* Life Insurance Calculator Promo Section */}
      <section data-ev-id="ev_35113e02c0" className="py-16 bg-white">
        <div data-ev-id="ev_ca3707dc57" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_3ec0dab0b4" className="bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl border border-green-100 p-8 md:p-12">
            <div data-ev-id="ev_df98935ce8" className="grid md:grid-cols-2 gap-8 items-center">
              {/* Visual */}
              <div data-ev-id="ev_d1265954c1" className="hidden md:flex justify-center order-2 md:order-1">
                <div data-ev-id="ev_3c53be6f2b" className="relative">
                  <div data-ev-id="ev_1372869e5f" className="w-64 h-64 bg-green-500/20 rounded-3xl flex items-center justify-center">
                    <TrendingUp className="w-32 h-32 text-green-600" />
                  </div>
                  {/* Floating stats */}
                  <div data-ev-id="ev_e3a5645d6c" className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-xl">
                    <div data-ev-id="ev_cfd091ed8f" className="text-2xl font-bold text-green-600">+156%</div>
                    <div data-ev-id="ev_15fbc403a4" className="text-sm text-slate">צמיחה ב-20 שנה</div>
                  </div>
                  <div data-ev-id="ev_359cbff8df" className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl">
                    <div data-ev-id="ev_430ddd69cf" className="text-2xl font-bold text-navy">5</div>
                    <div data-ev-id="ev_5ecbcf3810" className="text-sm text-slate">רמות סיכון</div>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div data-ev-id="ev_7f6ef8599f" className="order-1 md:order-2">
                <div data-ev-id="ev_e5e3cf3e38" className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                  <Sparkles className="w-4 h-4" />
                  חדש!
                </div>
                
                <h2 data-ev-id="ev_a2f4422d08" className="text-3xl sm:text-4xl font-bold text-navy mb-4 text-balance">
                  מחשבון ביטוח החיים המתקדם בישראל
                </h2>
                
                <p data-ev-id="ev_3f4623029d" className="text-slate text-lg mb-6 text-pretty">
                  גלה בדיוק כמה כיסוי ביטוחי אתה צריך כדי להגן על המשפחה שלך. 
                  מחשבון חכם שלוקח בחשבון הכנסות, התחייבויות, צרכים עתידיים ונכסים קיימים.
                </p>
                
                <ul data-ev-id="ev_7e859da6e8" className="flex flex-col gap-3 mb-8 text-slate">
                  <li data-ev-id="ev_676e28431d" className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span data-ev-id="ev_0dd110b7c9">חישוב מותאם אישית ב-2 דקות</span>
                  </li>
                  <li data-ev-id="ev_b6a41c7dca" className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span data-ev-id="ev_665f0076a3">פירוט מלא: משכנתה, הכנסה, ילדים, חסכונות</span>
                  </li>
                  <li data-ev-id="ev_f11869d2a2" className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span data-ev-id="ev_e61b7f7c75">אפשרות לבדיקה מקצועית ללא עלות</span>
                  </li>
                </ul>
                
                <Link data-ev-id="ev_5b6052dac9"
                to="/life-insurance-calculator"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-bold px-8 py-4 rounded-xl transition-all hover:translate-x-1 shadow-lg">

                  <Calculator className="w-5 h-5" />
                  <span data-ev-id="ev_f9fdc4932a">לחישוב עכשיו</span>
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Calculator Promo Section */}
      <section data-ev-id="ev_703f4275c8" className="py-16 bg-white">
        <div data-ev-id="ev_9b9377b534" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_22f4b65c1b" className="bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl border border-green-100 p-8 md:p-12">
            <div data-ev-id="ev_ac0f6a62d5" className="grid md:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div data-ev-id="ev_aa939c1ffc" className="order-1 md:order-2">
                <div data-ev-id="ev_90cc4c8e4c" className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                  <Sparkles className="w-4 h-4" />
                  חדש!
                </div>
                
                <h2 data-ev-id="ev_9c8ff9a1bc" className="text-3xl sm:text-4xl font-bold text-navy mb-4 text-balance">
                  מחשבון חיסכון לפי רמת סיכון
                </h2>
                
                <p data-ev-id="ev_0be67ced92" className="text-slate text-lg mb-6 text-pretty">
                  גלה כיצד בחירת רמת הסיכון משפיעה על שווי החיסכון העתידי שלך. 
                  השוואה מיידית בין 5 רמות סיכון עם גרפים וויזואליזציה ברורה.
                </p>
                
                <ul data-ev-id="ev_97c3b17f97" className="flex flex-col gap-3 mb-8 text-slate">
                  <li data-ev-id="ev_87e6aea34e" className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span data-ev-id="ev_f086c6b4cc">חישוב ריבית דריבית אוטומטי</span>
                  </li>
                  <li data-ev-id="ev_5bf45e44b9" className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span data-ev-id="ev_80b3c42ce0">השוואת 5 רמות סיכון במקביל</span>
                  </li>
                  <li data-ev-id="ev_98a2218e3b" className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span data-ev-id="ev_78e9dddca6">גרף צמיחה אינטראקטיבי</span>
                  </li>
                </ul>
                
                <Link data-ev-id="ev_e6f64ec4b5"
                to="/savings-calculator"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl transition-all hover:translate-x-1 shadow-lg">

                  <TrendingUp className="w-5 h-5" />
                  <span data-ev-id="ev_011bd043ca">לחישוב עכשיו</span>
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </div>
              
              {/* Visual */}
              <div data-ev-id="ev_2df13bbaf8" className="hidden md:flex justify-center order-2 md:order-1">
                <div data-ev-id="ev_171c719180" className="relative">
                  <div data-ev-id="ev_875e1314cd" className="w-64 h-64 bg-green-500/20 rounded-3xl flex items-center justify-center">
                    <TrendingUp className="w-32 h-32 text-green-600" />
                  </div>
                  {/* Floating stats */}
                  <div data-ev-id="ev_25f9dc4c3a" className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-xl">
                    <div data-ev-id="ev_2d71323642" className="text-2xl font-bold text-green-600">+156%</div>
                    <div data-ev-id="ev_8ef182db79" className="text-sm text-slate">צמיחה ב-20 שנה</div>
                  </div>
                  <div data-ev-id="ev_7f140fa8a8" className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl">
                    <div data-ev-id="ev_58cbf2a94e" className="text-2xl font-bold text-navy">5</div>
                    <div data-ev-id="ev_47e13c611f" className="text-sm text-slate">רמות סיכון</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About WealthTech Section */}
      <section data-ev-id="ev_about_company" id="about" className="py-20 lg:py-32 bg-white">
        <div data-ev-id="ev_38a95d0bf3" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_3bbfd490a6" className="max-w-4xl mx-auto">
            <div data-ev-id="ev_0e678318b0" className="inline-flex items-center gap-2 text-gold font-semibold mb-4">
              <Users className="w-5 h-5" />
              <span data-ev-id="ev_36bcf7ae09">אודות WealthTech</span>
            </div>
            
            <h2 data-ev-id="ev_035ae1d690" className="text-3xl sm:text-4xl font-bold text-navy mb-8 text-balance">
              אנחנו מומחים בתכנון פיננסי, פנסיוני וביטוחי.
            </h2>
            
            <div data-ev-id="ev_f86caabb36" className="flex flex-col gap-6 text-slate text-lg leading-relaxed">
              <p data-ev-id="ev_85078963ea">
                סוכנות מקצועית ועדכנית ברוחה, הנשענת על ניסיון של שנים רבות בליווי משפחות, מנהלים ובעלי הון בקבלת החלטות פיננסיות משמעותיות.
              </p>
              
              <p data-ev-id="ev_ec8b2a4b72">
                פיננסים, פנסיה וביטוח הם לא אוסף של מוצרים. הם מערכת אחת של החלטות שצריכה לעבוד יחד — בהתאם למשפחה שלכם, לנכסים שצברתם, לרמת החיים שאתם רוצים לשמור עליה ולמטרות שעוד נמצאות בדרך.
              </p>
              
              <p data-ev-id="ev_0dfb68f624" className="text-navy font-semibold text-xl">
                אם תרצו, אנחנו סוג של אדריכלים פיננסיים.
              </p>
              
              <p data-ev-id="ev_6b81c64051">
                אנחנו לא מתחילים מהמוצר. אנחנו מתחילים מכם.
              </p>
              
              <p data-ev-id="ev_d32b35326f">
                ממפים את הנכסים, החסכונות, הביטוחים וההתחייבויות, בוחנים את מבנה הפנסיה וההשקעות, מזהים כפילויות, פערים והזדמנויות, ורק לאחר מכן בונים עבורכם תכנית המתאימה למידותיכם.
              </p>
              
              <div data-ev-id="ev_282c43aad5" className="bg-light rounded-2xl p-6 border-r-4 border-gold">
                <p data-ev-id="ev_c9a41db690" className="text-navy font-medium">
                  המטרה שלנו היא פשוטה: להפוך עולם פיננסי מורכב לתכנית ברורה, ישימה ומדויקת.
                </p>
              </div>
              
              <p data-ev-id="ev_4c3d7913a9">
                תכנית שמחברת בין מה שיש לכם היום לבין המקום שאליו אתם רוצים להגיע.
              </p>
              
              <p data-ev-id="ev_527528d482">
                לאורך הדרך אנו משלבים תכנון פנסיוני, ניהול השקעות, תכנון ביטוחי, תכנון פרישה, ניהול סיכונים ותכנון פיננסי למשפחה — מתוך הסתכלות כוללת ולא מתוך ראייה של מוצר בודד.
              </p>
              
              <p data-ev-id="ev_33ceaec9f3">
                במשפחות בעלות נכסים משמעותיים, אנו מרחיבים את התמונה גם לתכנון בין־דורי, מבנה החזקת הנכסים, צרכים עתידיים של בני המשפחה ותיאום בין אנשי המקצוע השונים המלווים את המשפחה.
              </p>
            </div>
            
            {/* Key Questions */}
            <div data-ev-id="ev_5c23b7c1fb" className="mt-12 bg-navy rounded-2xl p-8">
              <h3 data-ev-id="ev_d2d4626fbf" className="text-xl font-bold text-white mb-6">אנחנו מאמינים שתכנון פיננסי טוב מתחיל בשאלות הנכונות.</h3>
              <ul data-ev-id="ev_bfd7fef9f1" className="flex flex-col gap-3 text-white/80">
                <li data-ev-id="ev_431a3f442d" className="flex items-start gap-3">
                  <span data-ev-id="ev_0e8a4942f1" className="text-gold mt-1">•</span>
                  <span data-ev-id="ev_608cfcf58a">כמה כסף באמת תצטרכו בעתיד?</span>
                </li>
                <li data-ev-id="ev_efcad03339" className="flex items-start gap-3">
                  <span data-ev-id="ev_13fa90bc0f" className="text-gold mt-1">•</span>
                  <span data-ev-id="ev_eb946c1f5e">האם מבנה ההשקעות שלכם מתאים לכלל הנכסים שלכם?</span>
                </li>
                <li data-ev-id="ev_3d735c3997" className="flex items-start gap-3">
                  <span data-ev-id="ev_70fdecd45d" className="text-gold mt-1">•</span>
                  <span data-ev-id="ev_cee10d8a8b">האם הפנסיה והביטוחים שלכם בנויים נכון?</span>
                </li>
                <li data-ev-id="ev_31050a4476" className="flex items-start gap-3">
                  <span data-ev-id="ev_609dc4fb27" className="text-gold mt-1">•</span>
                  <span data-ev-id="ev_0fbed5c409">אילו סיכונים כדאי להעביר לחברת ביטוח ואילו נכון לשאת בעצמכם?</span>
                </li>
                <li data-ev-id="ev_1545451433" className="flex items-start gap-3">
                  <span data-ev-id="ev_020de0f98f" className="text-gold mt-1">•</span>
                  <span data-ev-id="ev_405211e3c5">והאם כל המערכת הפיננסית שלכם באמת פועלת כמערכת אחת?</span>
                </li>
              </ul>
            </div>
            
            <div data-ev-id="ev_55027680af" className="mt-8 flex flex-col gap-6 text-slate text-lg leading-relaxed">
              <p data-ev-id="ev_81d7dadba8">
                הניסיון שלנו בעולם ההשקעות, הביטוח והפנסיה מאפשר לנו להסתכל על התמונה הרחבה, אך גם לרדת לפרטים הקטנים שבהם נמצאות לעיתים ההחלטות החשובות ביותר.
              </p>
              
              <p data-ev-id="ev_56c3aa7cb1">
                אנחנו מלווים את לקוחותינו לאורך שנים — בתקופות של צבירת הון, שינויי קריירה, מימוש מניות ואופציות, רכישת נכסים, פרישה, העברת הון לדור הבא ושינויים משמעותיים בחיי המשפחה.
              </p>
              
              <p data-ev-id="ev_c5b7e2eb84">
                בכל שלב אנחנו שם כדי לעשות סדר, לבחון מחדש את התמונה ולהתאים את התכנית למציאות המשתנה.
              </p>
              
              <div data-ev-id="ev_10af094dd6" className="bg-light rounded-2xl p-6 border-r-4 border-navy">
                <p data-ev-id="ev_98ac51d9c6" className="text-navy font-medium">
                  העקרונות שעליהם בנינו את הפעילות שלנו הם מקצועיות, עצמאות מחשבתית, שקיפות ויחס אישי.
                </p>
              </div>
              
              <p data-ev-id="ev_05ed10c9fb">
                כי בסופו של דבר, תכנון פיננסי אינו עוסק רק בכסף.
              </p>
              
              <p data-ev-id="ev_7bbb19ad18">
                הוא עוסק באפשרות לקבל החלטות טובות יותר לגבי החיים שלכם.
              </p>
              
              <p data-ev-id="ev_9762209a17" className="text-2xl font-bold text-navy text-center mt-8">
                One Life. Plan It Well.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section data-ev-id="ev_38ed89a569" id="founder" className="py-20 lg:py-32 bg-light">
        <div data-ev-id="ev_029a091d85" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_9fcccaf64d" className="grid lg:grid-cols-2 gap-16 items-center">
            <div data-ev-id="ev_a14f87b6a5">
              <div data-ev-id="ev_665cf35951" className="inline-flex items-center gap-2 text-gold font-semibold mb-4">
                <Users className="w-5 h-5" />
                <span data-ev-id="ev_f27975b1a7">אודות מייסד</span>
              </div>
              
              <h2 data-ev-id="ev_07d0b40bed" className="text-3xl sm:text-4xl font-bold text-navy mb-6 text-balance">
                אודי חברוני - מעל שני עשורים בשוק ההון והפיננסים
              </h2>
              
              <div data-ev-id="ev_19204c6e06" className="flex flex-col gap-4 text-slate text-lg text-pretty">
                <p data-ev-id="ev_e706dc3946">
                  WealthTech הוקמה על ידי אודי חברוני, מבכירי אנשי הפיננסים בישראל, עם ניסיון של למעלה משני עשורים בשוק ההון, הביטוח והפיננסים. במהלך הקריירה שלו כיהן בתפקידי מפתח בגופים מובילים ובהם מיטב דש, כלל ביטוח, מוריץ טocolר, סולומון שוקי הון ו־E*TRADE, ורכש מומחיות עמוקה בניהול השקעות, פיתוח עסקי, אסטרטגיה פיננסית וליווי לקוחות בעלי הון.
                </p>
                <p data-ev-id="ev_c1268af65e">
                  בנוסף, שימש אודי כיועץ חיצוני להנהלת קופת הגמל וקרן ההשתלמות של האקדמאים במח"ר, כחלק מעשייה מקצועית רחבה המשלבת בין הבנה מוסדית, ראייה אסטרטגית ויכולת ללוות מהלכים פיננסיים מורכבים.
                </p>
                <p data-ev-id="ev_818aee8202">
                  מאז 2009 משמש אודי כמנהל הון בכיר ב־<a data-ev-id="ev_b067aafcab" href="https://www.piowealth.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light underline">Pioneer Wealth Management</a>, חברת השקעות גלובלית המעניקה שירותי Family Office ללקוחות אמידים בישראל ובזירה הבינלאומית. לאורך השנים גיבש תפיסת עולם מקצועית המשלבת תכנון פיננסי מדויק, ראייה אסטרטגית ארוכת טווח והבנה עמוקה של צורכי לקוחות מורכבים.
                </p>
                <p data-ev-id="ev_cb38462093" className="text-navy font-medium">
                  על יסודות אלה הוקמה WealthTech — סוכנות שנועדה להעניק ללקוחותיה מעטפת מתקדמת של תכנון פיננסי, השקעות וביטוח, ברמה הגבוהה ביותר.
                </p>
              </div>
              
              <div data-ev-id="ev_224d53f376" className="mt-8 flex flex-wrap gap-4">
                <div data-ev-id="ev_8013466792" className="flex items-center gap-2 bg-light rounded-full px-4 py-2">
                  <Tv className="w-4 h-4 text-gold" />
                  <span data-ev-id="ev_8336111f4d" className="text-sm text-navy font-medium">פאנליסט קבוע בערוץ 10</span>
                </div>
                <div data-ev-id="ev_b9b7242bc1" className="flex items-center gap-2 bg-light rounded-full px-4 py-2">
                  <BarChart3 className="w-4 h-4 text-gold" />
                  <span data-ev-id="ev_f8ad70f07a" className="text-sm text-navy font-medium">מייסד "השוק הפיננסי"</span>
                </div>
              </div>
            </div>
            
            <div data-ev-id="ev_b9e6db64dd" className="relative">
              <div data-ev-id="ev_b4f04afa6a" className="aspect-square bg-gradient-to-br from-navy to-navy-light rounded-3xl overflow-hidden">
                <img data-ev-id="ev_ec300169d8"
                src={udiHevroniImage}
                alt="אודי חברוני - מייסד WealthTech, מומחה לתכנון פיננסי"
                className="w-full h-full object-cover" />

              </div>
              
              <div data-ev-id="ev_3061b87568" className="absolute -bottom-6 -right-6 bg-gold rounded-2xl p-6 shadow-xl">
                <div data-ev-id="ev_fd50f255d4" className="text-navy">
                  <div data-ev-id="ev_afc86482fe" className="text-3xl font-bold">2009</div>
                  <a data-ev-id="ev_6019df4555" href="https://www.piowealth.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">Pioneer Wealth Management</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Vision Banner */}
      <section data-ev-id="ev_10babd13d0" className="relative overflow-hidden">
        <div data-ev-id="ev_f66896c3d2" className="max-w-7xl mx-auto">
          <div data-ev-id="ev_6c56fab9d8" className="relative rounded-none lg:rounded-3xl lg:mx-8 overflow-hidden shadow-2xl">
            <img data-ev-id="ev_d9f3092832"
            src={wealthtechBrandHero}
            alt="WealthTech - One Life Plan IT Well - תכנון פיננסי פרימיום למנהלים, מייסדים ובכירים בישראל"
            className="w-full h-auto object-cover" />

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section data-ev-id="ev_0bd4ef5ac3" id="services" className="py-20 lg:py-32 bg-light">
        <div data-ev-id="ev_e87cdae18f" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_f7fa76eded" className="text-center max-w-3xl mx-auto mb-16">
            <div data-ev-id="ev_ec48ab1112" className="inline-flex items-center gap-2 text-gold font-semibold mb-4">
              <Briefcase className="w-5 h-5" />
              <span data-ev-id="ev_1fdc3fd23d">השירותים שלנו</span>
            </div>
            
            <h2 data-ev-id="ev_27136de4bb" className="text-3xl sm:text-4xl font-bold text-navy mb-6 text-balance">
              פתרונות פיננסיים מקיפים
            </h2>
            
            <p data-ev-id="ev_acec45e3dc" className="text-slate text-lg text-pretty">
              WealthTech פועלת במודל היברידי המשלב תובנה אנושית עם כלים דיגיטליים מתקדמים. 
              אנו מציעים קליטה מונעת בינה מלאכותית, מערכות ניהול לקוחות אוטומטיות 
              וחטיבת שיווק ייעודית לתמיכה ביועצים פיננסיים.
            </p>
          </div>
          
          <div data-ev-id="ev_9c346c8717" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) =>
            <div data-ev-id="ev_fa0ea75c5c"
            key={index}
            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-border group">

                <div data-ev-id="ev_065d543d5d" className="w-14 h-14 bg-gradient-to-br from-navy to-navy-light rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-gold" />
                </div>
                
                <h3 data-ev-id="ev_8bed029513" className="text-xl font-bold text-navy mb-3">{service.title}</h3>
                <p data-ev-id="ev_efd62729a2" className="text-slate text-pretty">{service.description}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section data-ev-id="ev_7d1cfacb51" id="media" className="py-20 lg:py-32 bg-navy">
        <div data-ev-id="ev_2b69193d8c" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_1e0ced6e71" className="text-center max-w-3xl mx-auto mb-16">
            <div data-ev-id="ev_486480b968" className="inline-flex items-center gap-2 text-gold font-semibold mb-4">
              <Play className="w-5 h-5" />
              <span data-ev-id="ev_9b12a00dd8">נוכחות תקשורתית</span>
            </div>
            
            <h2 data-ev-id="ev_f2dfffed03" className="text-3xl sm:text-4xl font-bold text-white mb-6 text-balance">
              השוק הפיננסי
            </h2>
            
            <p data-ev-id="ev_31074684de" className="text-white/70 text-lg text-pretty">
              בנוסף לפעילותו בתחום הפיננס, אודי הוא פנים מוכרות בתקשורת הישראלית. 
              הוא פאנליסט קבוע בתוכנית הכלכלית של ערוץ 10 ומייסד ועורך ראשי של 
              "השוק הפיננסי" - פלטפורמת מדיה פיננסית מובילה.
            </p>
          </div>
          
          <div data-ev-id="ev_6c74c5206e" className="grid md:grid-cols-2 gap-8">
            <div data-ev-id="ev_5326e5b1fc" className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div data-ev-id="ev_328e90d86c" className="flex items-center gap-4 mb-6">
                <div data-ev-id="ev_ff5afd90de" className="w-16 h-16 bg-gold rounded-xl flex items-center justify-center">
                  <Tv className="w-8 h-8 text-navy" />
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
            
            <div data-ev-id="ev_a6b84c0ac3" className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div data-ev-id="ev_e529c9782b" className="flex items-center gap-4 mb-6">
                <div data-ev-id="ev_fd382547be" className="w-16 h-16 bg-gold rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-navy" />
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

      {/* CTA Section */}
      <section data-ev-id="ev_6fbaa24d6b" className="py-20 bg-gradient-to-br from-gold to-gold-light">
        <div data-ev-id="ev_84a530bc36" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 data-ev-id="ev_ddb6a0e135" className="text-3xl sm:text-4xl font-bold text-navy mb-6 text-balance">
            מוכנים להתחיל את המסע הפיננסי שלכם?
          </h2>
          <p data-ev-id="ev_7b017dac23" className="text-navy/80 text-lg mb-8 max-w-2xl mx-auto text-pretty">
            הצטרפו למאות לקוחות מרוצים שבחרו ב-WealthTech לניהול העושר שלהם. 
            קבעו פגישת ייעוץ ראשונית ללא התחייבות.
          </p>
          <a data-ev-id="ev_937a76c288"
          href="#contact"
          className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-8 py-4 rounded-lg transition-colors">

            <span data-ev-id="ev_bf8dc61646">קבע פגישה עכשיו</span>
            <ArrowLeft className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Workshop Banner Section */}
      <section data-ev-id="ev_ef74313120" className="py-16 lg:py-24 bg-gradient-to-br from-navy via-navy-light to-navy">
        <div data-ev-id="ev_905490f613" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_568f2d5b73" className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Flyer Image */}
            <div data-ev-id="ev_02e6b1cd08" className="order-2 lg:order-1">
              <div data-ev-id="ev_997fe96218" className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <img data-ev-id="ev_adba6740e0"
                src={workshopFamilyFinanceImage}
                alt="סדנת תכנון פיננסי למשפחה - וולת'טק"
                className="w-full h-auto" />

              </div>
            </div>
            
            {/* Form Section */}
            <div data-ev-id="ev_3d38a92ab3" className="order-1 lg:order-2">
              <span data-ev-id="ev_a2906622bf" className="inline-block bg-gold/20 text-gold px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                🎯 סדנה חדשה - 3 מפגשים בלבד!
              </span>
              <h2 data-ev-id="ev_92d0183c6f" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                עושים סדר בכסף המשפחתי
              </h2>
              <p data-ev-id="ev_adf0bd8118" className="text-white/80 text-lg mb-8">
                סדנת תכנון פיננסי ממוקדת למשפחות, שכירים ובכירים. 
                3 מפגשים בזום שישנו את הדרך שבה אתם מנהלים את הכסף.
              </p>
              
              {workshopSubmitted ?
              <div data-ev-id="ev_517e55b935" className="bg-green-500/20 border border-green-400 rounded-2xl p-8 text-center">
                  <div data-ev-id="ev_4f5e9c7e72" className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 data-ev-id="ev_ffdd875723" className="text-2xl font-bold text-white mb-2">תודה! קיבלנו את הפרטים</h3>
                  <p data-ev-id="ev_65c86ed2ce" className="text-white/80">נחזור אליכם בהקדם עם כל המידע על הסדנה</p>
                </div> :

              <form data-ev-id="ev_4ae6ddceb9" onSubmit={handleWorkshopSubmit} className="flex flex-col gap-4">
                  <div data-ev-id="ev_969a018c17" className="grid sm:grid-cols-2 gap-4">
                    <input data-ev-id="ev_0847c2c09f"
                  type="text"
                  placeholder="שם מלא"
                  value={workshopForm.name}
                  onChange={(e) => setWorkshopForm((prev) => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-gold focus:bg-white/15 transition-colors" />

                    <input data-ev-id="ev_199debc14a"
                  type="tel"
                  placeholder="טלפון"
                  value={workshopForm.phone}
                  onChange={(e) => setWorkshopForm((prev) => ({ ...prev, phone: e.target.value }))}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-gold focus:bg-white/15 transition-colors" />

                  </div>
                  <input data-ev-id="ev_dbae1901ab"
                type="email"
                placeholder="אימייל"
                value={workshopForm.email}
                onChange={(e) => setWorkshopForm((prev) => ({ ...prev, email: e.target.value }))}
                required
                className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-gold focus:bg-white/15 transition-colors" />

                  <button data-ev-id="ev_87906ec499"
                type="submit"
                disabled={workshopSubmitting}
                className="w-full bg-gold hover:bg-gold-light text-navy font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-lg">

                    {workshopSubmitting ?
                  <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        שולח...
                      </> :

                  <>
                        שלחו לי פרטים
                        <ArrowLeft className="w-5 h-5" />
                      </>
                  }
                  </button>
                  <p data-ev-id="ev_6ef652dced" className="text-white/50 text-sm text-center">
                    ללא התחייבות • 1,500 ₪ לכל 3 המפגשים
                  </p>
                </form>
              }
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section data-ev-id="ev_d94c79f839" id="contact" className="py-20 lg:py-32 bg-white">
        <div data-ev-id="ev_f6a23696a4" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_ac19ad3049" className="grid lg:grid-cols-2 gap-16">
            <div data-ev-id="ev_53e7608940">
              <div data-ev-id="ev_07367bae8d" className="inline-flex items-center gap-2 text-gold font-semibold mb-4">
                <Mail className="w-5 h-5" />
                <span data-ev-id="ev_d9f3a4cbc7">צור קשר</span>
              </div>
              
              <h2 data-ev-id="ev_7a9b3ca6aa" className="text-3xl sm:text-4xl font-bold text-navy mb-6 text-balance">
                נשמח לשמוע ממך
              </h2>
              
              <p data-ev-id="ev_d472080884" className="text-slate text-lg mb-8 text-pretty">
                השאירו פרטים ונחזור אליכם בהקדם לתיאום פגישת ייעוץ ראשונית. 
                הפגישה הראשונה ללא עלות וללא התחייבות.
              </p>
              
              <div data-ev-id="ev_be18a08851" className="flex flex-col gap-6">
                <div data-ev-id="ev_41a5fd7f1d" className="flex items-center gap-4">
                  <div data-ev-id="ev_21b2bed7b1" className="w-12 h-12 bg-light rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div data-ev-id="ev_e36d2410ba">
                    <div data-ev-id="ev_c5c2ab041e" className="text-sm text-slate">טלפון</div>
                    <div data-ev-id="ev_3f4e8fd215" className="text-navy font-semibold">09-9611352 | 050-8210573</div>
                  </div>
                </div>
                
                <div data-ev-id="ev_2eaa0c0ede" className="flex items-center gap-4">
                  <div data-ev-id="ev_5bc8f5e9d3" className="w-12 h-12 bg-light rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div data-ev-id="ev_b9cac19135">
                    <div data-ev-id="ev_e10dba2486" className="text-sm text-slate">אימייל</div>
                    <a data-ev-id="ev_437e860112" href="mailto:service@wealthtech.co.il" className="text-navy font-semibold hover:text-gold transition-colors">service@wealthtech.co.il</a>
                  </div>
                </div>
                
                <div data-ev-id="ev_1d2d39b090" className="flex items-center gap-4">
                  <div data-ev-id="ev_f2cd904ac3" className="w-12 h-12 bg-light rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div data-ev-id="ev_25f9dc4c3a">
                    <div data-ev-id="ev_2d71323642" className="text-sm text-slate">כתובת</div>
                    <div data-ev-id="ev_8ef182db79" className="text-navy font-semibold">הסדנאות 8, הרצליה (משרדי פיוניר)</div>
                  </div>
                </div>
                
                <div data-ev-id="ev_fa05885534" className="flex items-center gap-4">
                  <div data-ev-id="ev_a35a35af52" className="w-12 h-12 bg-light rounded-xl flex items-center justify-center">
                    <Linkedin className="w-5 h-5 text-gold" />
                  </div>
                  <div data-ev-id="ev_589096e51d">
                    <div data-ev-id="ev_f32f07a430" className="text-sm text-slate">לינקדאין</div>
                    <a data-ev-id="ev_be028319ce" href="https://www.linkedin.com/in/udi-hevroni-15764a26/" target="_blank" rel="noopener noreferrer" className="text-navy font-semibold hover:text-gold transition-colors">אודי חברוני</a>
                  </div>
                </div>
                
                <div data-ev-id="ev_fedf77a428" className="flex items-center gap-4">
                  <div data-ev-id="ev_04c14378bd" className="w-12 h-12 bg-light rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-gold" />
                  </div>
                  <div data-ev-id="ev_2d89375b5b">
                    <div data-ev-id="ev_242f0c6b0b" className="text-sm text-slate">פרטי החברה</div>
                    <div data-ev-id="ev_9f7beaa36a" className="text-navy font-semibold text-sm">וולת'טק סוכנות לביטוח (2015) בע"מ</div>
                    <div data-ev-id="ev_532abdb635" className="text-slate text-sm">ח.פ 515186971</div>
                  </div>
                </div>
                
                <div data-ev-id="ev_9d9e71e6de" className="mt-4 p-4 bg-light/50 rounded-xl border border-border/50">
                  <p data-ev-id="ev_39fcdabe14" className="text-slate text-xs leading-relaxed">
                    החברה מחזיקה ברישיון תאגיד מטעם רשות שוק ההון, ביטוח וחיסכון וכפופה לדרישות משרד האוצר ביחס למחזיקי רישיון פנסיוני בישראל.
                  </p>
                </div>
              </div>
            </div>
            
            <div data-ev-id="ev_cf31a5bb29">
              {submitSuccess ?
              <div data-ev-id="ev_a44435e30d" className="bg-light rounded-2xl p-8 text-center">
                  <div data-ev-id="ev_12d3fb84c7" className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 data-ev-id="ev_76b39d61be" className="text-xl font-bold text-navy mb-2">תודה על פנייתך!</h3>
                  <p data-ev-id="ev_e69b06d40b" className="text-slate mb-4">קיבלנו את ההודעה שלך ונחזור אליך בהקדם.</p>
                  <button data-ev-id="ev_7f16bff566"
                onClick={() => setSubmitSuccess(false)}
                className="text-gold hover:text-gold-dark font-medium">

                    שלח הודעה נוספת
                  </button>
                </div> :

              <form data-ev-id="ev_a114c76033" onSubmit={handleContactSubmit} className="bg-light rounded-2xl p-8">
                  <div data-ev-id="ev_eb9ba6b744" className="flex flex-col gap-6">
                    <div data-ev-id="ev_7c5a20dde3">
                      <label data-ev-id="ev_cc9aa6f75a" className="block text-sm font-medium text-navy mb-2">שם מלא *</label>
                      <input data-ev-id="ev_50e2591eef"
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white"
                    placeholder="הכנס את שמך" />

                    </div>
                    
                    <div data-ev-id="ev_26ac6c0e98">
                      <label data-ev-id="ev_714c3b05b5" className="block text-sm font-medium text-navy mb-2">טלפון</label>
                      <input data-ev-id="ev_9a739bfbb8"
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white"
                    placeholder="050-0000000" />

                    </div>
                    
                    <div data-ev-id="ev_6db2b3eda8">
                      <label data-ev-id="ev_a14fe2168b" className="block text-sm font-medium text-navy mb-2">אימייל *</label>
                      <input data-ev-id="ev_021de04422"
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white"
                    placeholder="your@email.com" />

                    </div>
                    
                    <div data-ev-id="ev_539e31ab10">
                      <label data-ev-id="ev_af93a43ab1" className="block text-sm font-medium text-navy mb-2">הודעה *</label>
                      <textarea data-ev-id="ev_e677dfcd05"
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white resize-none"
                    placeholder="ספר לנו במה נוכל לעזור..." />

                    </div>

                    {submitError &&
                  <div data-ev-id="ev_d3885e225d" className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {submitError}
                      </div>
                  }
                    
                    <button data-ev-id="ev_e081935b97"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold-light text-navy font-semibold px-8 py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">

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
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-navy font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">

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
              <a data-ev-id="ev_b36c5eb616" href="#media" className="text-white/70 hover:text-white transition-colors">מדיה</a>
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
      className="fixed bottom-6 left-20 z-50 bg-gold hover:bg-gold-light text-navy font-bold px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3 group">

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