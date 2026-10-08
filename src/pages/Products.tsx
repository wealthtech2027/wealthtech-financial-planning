import { useState } from 'react';
import { Link } from 'react-router';
import {
  Menu,
  X,
  PiggyBank,
  Shield,
  Globe,
  Receipt,
  Gem,
  CalendarClock,
  Users,
  ChevronLeft,
  CheckCircle2,
  ArrowLeft,
  Briefcase,
  FileText } from
'lucide-react';
import { LogoMarquee } from '@/components/LogoMarquee';
import { Logo } from '@/components/Logo';

// Helper function to render text with Pioneer Wealth Management links
const renderWithPioneerLink = (text: string) => {
  const pioneerPattern = /Pioneer Wealth Management/g;
  const parts = text.split(pioneerPattern);
  const matches = text.match(pioneerPattern) || [];

  return parts.reduce((acc: React.ReactNode[], part, index) => {
    acc.push(part);
    if (index < matches.length) {
      acc.push(
        <a data-ev-id="ev_e6bc377a6d"
        key={index}
        href="https://www.piowealth.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gold hover:text-gold-light underline">

          Pioneer Wealth Management
        </a>
      );
    }
    return acc;
  }, []);
};

interface Product {
  id: string;
  icon: React.ElementType;
  title: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  forWhom: string[];
  highlights: string[];
}

export default function Products() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const products: Product[] = [
  {
    id: 'provident-funds',
    icon: PiggyBank,
    title: 'ניהול קופות גמל וקרנות השתלמות',
    shortDescription: 'ניהול מקצועי ואופטימיזציה של החיסכון הפנסיוני והקרנות שלכם להשגת תשואות מיטביות.',
    fullDescription: `קופות גמל וקרנות השתלמות הן מכשירי חיסכון פופולריים בישראל המעניקים הטבות מס משמעותיות. ניהול נכון של מכשירים אלו יכול להשפיע באופן דרמטי על העושר שלכם לטווח הארוך.

אנו ב-WealthTech מתמחים בניתוח מעמיק של הקופות והקרנות הקיימות שלכם, זיהוי דמי ניהול עודפים, והתאמת מסלולי ההשקעה לפרופיל הסיכון ולמטרות הפיננסיות שלכם. הצוות שלנו עוקב באופן שוטף אחר ביצועי הקופות ומבצע התאמות בהתאם לתנאי השוק המשתנים.`,
    benefits: [
    'הפחתת דמי ניהול - חיסכון של אלפי שקלים בשנה',
    'התאמת מסלולי השקעה לגיל ולפרופיל הסיכון',
    'מעקב רציף אחר ביצועים ואיזון תיק',
    'ייעוץ למשיכת כספים בתנאים אופטימליים',
    'תכנון מס לקראת משיכה'],

    forWhom: [
    'שכירים עם הפרשות לקופות גמל',
    'עצמאים המנהלים חיסכון עצמאי',
    'בעלי קרנות השתלמות לקראת פדיון',
    'מי שמעוניין לאחד קופות ישנות'],

    highlights: [
    'ניתוח דמי ניהול חינם',
    'בדיקת קופות רדומות',
    'המלצות מסלולים מותאמות אישית']

  },
  {
    id: 'savings-policies',
    icon: Shield,
    title: 'פוליסות חיסכון פיננסיות',
    shortDescription: 'פתרונות חיסכון גמישים המשלבים רכיבי השקעה עם הטבות מס ייחודיות.',
    fullDescription: `פוליסות חיסכון פיננסיות מהוות אלטרנטיבה אטרקטיבית לחיסכון בנקאי מסורתי, ומציעות פוטנציאל תשואה גבוה יותר יחד עם גמישות בניהול ההשקעות.

אנו מציעים מגוון רחב של פוליסות חיסכון מבתי השקעות מובילים, עם אפשרויות התאמה אישית לצרכים שלכם. הפוליסות מאפשרות גישה למגוון מסלולי השקעה - החל ממסלולים סולידיים ועד למסלולים אגרסיביים יותר, עם אפשרות למעבר בין מסלולים ללא אירוע מס.

היתרון המרכזי בפוליסות אלו הוא דחיית המס - הרווחים אינם ממוסים כל עוד הכסף נשאר בפוליסה, מה שמאפשר צמיחה מואצת של ההשקעה לאורך זמן.`,
    benefits: [
    'דחיית מס על רווחי הון',
    'גמישות במעבר בין מסלולי השקעה',
    'אפשרות למשיכה חלקית ללא סגירת הפוליסה',
    'הגנה מפני נושים במקרים מסוימים',
    'אפשרות להוריש ללא צו ירושה'],

    forWhom: [
    'משקיעים המחפשים חיסכון לטווח בינוני-ארוך',
    'בעלי חיסכון בנקאי המעוניינים בתשואה גבוהה יותר',
    'מי שמעוניין בגמישות בניהול ההשקעות',
    'משקיעים המחפשים יעילות מיסויית'],

    highlights: [
    'ללא עמלות כניסה',
    'דמי ניהול תחרותיים',
    'מגוון מסלולי השקעה']

  },
  {
    id: 'investment-portfolio',
    icon: Globe,
    title: 'ניהול תיקי השקעות בארץ ובחו"ל',
    shortDescription: 'שירות ניהול תיקים מקצועי הניתן באמצעות Pioneer Wealth Management, בעלת רישיון ניהול השקעות ומודל עבודה ללא ניגוד עניינים.',
    fullDescription: `ניהול תיקי השקעות
שירות ניהול תיקי ההשקעות ללקוחות WealthTech ניתן באופן בלעדי באמצעות Pioneer Wealth Management, המעניקה שירותי ניהול הון ופמילי אופיס ללקוחות אמידים בישראל ובעולם. השירות כולל ניהול תיקי השקעות בשקלים או במט"ח, תוך התאמה אישית לצורכי הלקוח, ליעדיו ולפרופיל הסיכון שלו.

תיקי ההשקעות נבנים ומנוהלים בגישה מקצועית, מבוססת מחקר, פיזור סיכונים ובחינה שוטפת של הזדמנויות השקעה בשוק המקומי והגלובלי. לצד זאת, נהנים הלקוחות מגישה למגוון פתרונות השקעה, שקיפות מלאה, וניהול אובייקטיבי ללא ניגודי עניינים.

העבודה מול Pioneer מאפשרת ללקוחות WealthTech ליהנות מניסיון רב שנים, קשרים עם גופים פיננסיים ובנקים מובילים, וראייה אסטרטגית רחבה בניהול ההון האישי והמשפחתי.`,
    benefits: [
    'ניהול השקעות בבנקים בישראל, ארה"ב, לונדון ושוויץ',
    'מתאים גם ללקוחות עם אזרחות אמריקאית או זרה',
    'פיזור סיכונים מקצועי',
    'ניהול אקטיבי ומעקב שוטף',
    'שקיפות מלאה וללא ניגודי עניינים'],

    forWhom: [
    'משקיעים בעלי הון פנוי להשקעה',
    'מי שמעוניין בניהול מקצועי',
    'משקיעים המחפשים חשיפה בינלאומית',
    'לקוחות עם אזרחות אמריקאית או זרה'],

    highlights: [
    'סף כניסה: 1,000,000 ₪',
    'דוחות רבעוניים מפורטים',
    'פגישות עדכון קבועות']

  },
  {
    id: 'tax-coordination',
    icon: Receipt,
    title: 'תיאום והחזרי מס לשכירים ובעלי שליטה',
    shortDescription: 'מיצוי מלא של זכויות המס שלכם וקבלת החזרים המגיעים לכם על פי חוק.',
    fullDescription: `רבים מהשכירים ובעלי השליטה בישראל משלמים מס ביתר מבלי לדעת. תיאום מס נכון והגשת בקשות להחזר מס יכולים להחזיר לכיסכם אלפי שקלים בשנה.

יועצי המס ומשרדי רו"ח החיצוניים העובדים עם החברה מתמחים באיתור הטבות מס שלא נוצלו, הכרה בהוצאות מוכרות, וניצול מלא של נקודות זיכוי. אנו בודקים את כל מקורות ההכנסה שלכם ומוודאים שאתם לא משלמים יותר מדי.

עבור בעלי שליטה, אנו מציעים תכנון מס אסטרטגי הכולל התייחסות למשכורת מול דיבידנד, אופטימיזציה של הוצאות מוכרות, ותכנון מבנה ההכנסות בצורה יעילה מבחינת מס.`,
    benefits: [
    'החזרי מס רטרואקטיביים עד 6 שנים אחורה',
    'תיאום מס בין מספר מעסיקים',
    'הכרה בהוצאות רפואיות ותרומות',
    'ניצול נקודות זיכוי (ילדים, תואר, יישובי פיתוח)',
    'תכנון מס אסטרטגי לבעלי שליטה'],

    forWhom: [
    'שכירים עם הכנסה ממספר מקורות',
    'עובדים שעברו מעסיק במהלך השנה',
    'בעלי שליטה בחברות',
    'מי ששילם על הוצאות רפואיות משמעותיות'],

    highlights: [
    'בדיקת זכאות חינם',
    'תשלום רק בהצלחה',
    'טיפול מול רשות המסים']

  },
  {
    id: 'alternative-investments',
    icon: Gem,
    title: 'השקעות אלטרנטיביות',
    shortDescription: 'גישה להשקעות מתוחכמות מחוץ לשוק ההון המסורתי - נדל"ן, קרנות גידור, הון סיכון ועוד.',
    fullDescription: `שירות זה ניתן באופן בלעדי ב-Pioneer Wealth Management כחלק משירותי ניהול ההון והפמילי אופיס הניתנים על ידי החברה.

השקעות אלטרנטיביות מציעות הזדמנות לפיזור התיק מעבר לנכסים המסורתיים ופוטנציאל לתשואות גבוהות יותר. מדובר בהשקעות שבדרך כלל אינן נגיש למשקיע הפרטי הממוצע.

אנו מספקים גישה להשקעות בנדל"ן מניב בארץ ובחו"ל, קרנות Private Equity, קרנות גידור, השקעות בהון סיכון (Venture Capital), ופרויקטים של יזמות נדל"ן.

חשוב להבין שהשקעות אלטרנטיביות כרוכות לרוב בסיכון גבוה יותר ובנזילות נמוכה יותר. לכן, אנו ממליצים להקצות להן רק חלק מהתיק הכולל, ומוודאים שהשקעות מתאימות לפרופיל הסיכון ולמטרות שלכם.`,
    benefits: [
    'פיזור מעבר לשוק ההון המסורתי',
    'פוטנציאל לתשואות עודפות',
    'חשיפה לנכסים לא סחירים',
    'גישה להשקעות בלעדיות',
    'גידור מפני תנודתיות השוק'],

    forWhom: [
    'משקיעים כשירים (לפי הגדרת הרשות לני"ע)',
    'בעלי הון פנוי להשקעה לטווח ארוך',
    'מי שמחפש פיזור מעבר להשקעות מסורתיות',
    'משקיעים מנוסים'],

    highlights: [
    'סף כניסה: עמידה בתנאי לקוח מסווג / כשיר ע"פ חוק השירותים הפיננסיים',
    'בדיקת נאותות מקיפה',
    'ליווי לאורך חיי ההשקעה']

  },
  {
    id: 'retirement-planning',
    icon: CalendarClock,
    title: 'תכנון פרישה מתקדם וקיבוע זכויות',
    shortDescription: 'תכנון מקיף לפרישה, מיצוי זכויות פנסיוניות וקבלת החלטות מושכלות לגבי העתיד.',
    fullDescription: `הפרישה לגמלאות היא אחד האירועים הפיננסיים המשמעותיים ביותר בחיים. החלטות שמתקבלות בתקופה זו משפיעות על רמת החיים שלכם לעשרות שנים קדימה.

אנו מתמחים בתכנון פרישה מקיף הכולל ניתוח כל הזכויות הפנסיוניות שצברתם, השוואה בין אפשרויות משיכה (קצבה מול הון), תכנון מס אופטימלי, והתאמת תיק ההשקעות לשלב הפרישה.

קיבוע זכויות הוא תהליך קריטי שמגן על הזכויות שצברתם לאורך השנים. אנו מוודאים שכל הזכויות מתועדות כראוי, עורכים בדיקות מול קרנות הפנסיה וקופות הגמל, ומטפלים באיתור כספים אבודים.`,
    benefits: [
    'ניתוח מקיף של כל הזכויות הפנסיוניות',
    'השוואת תרחישי משיכה (קצבה/הון/משולב)',
    'תכנון מס אופטימלי לפרישה',
    'איתור כספים וזכויות אבודים',
    'ליווי מול הגופים המוסדיים'],

    forWhom: [
    'עובדים בגילאי 55+ המתכננים פרישה',
    'פורשים לפנסיה מוקדמת',
    'מי שקיבל הצעת פרישה מהמעסיק',
    'אנשים המעוניינים לבדוק זכויותיהם'],

    highlights: [
    'דו"ח זכויות מקיף',
    'סימולציית תרחישים',
    'ליווי אישי בתהליך']

  },
  {
    id: 'stock-options',
    icon: Users,
    title: 'תוכניות אופציות לעובדים',
    shortDescription: 'ניהול וייעוץ בנושא אופציות, RSU ומניות חברה - ממענק ועד מימוש.',
    fullDescription: `שירות זה ניתן על ידי רו"ח ישראלי בכיר חיצוני המתמחה בתחום זה ו_PROVID שירות מקצועי וליווי מלא ופרטני ללקוחות החברה.

תוכניות תגמול מבוססות הון הפכו לחלק משמעותי מחבילת השכר בחברות הייטק וחברות ציבוריות. ניהול נכון של אופציות, RSU ומניות חברה יכול להשפיע משמעותית על העושר שלכם.

אנו מספקים ייעוץ מקיף בכל שלבי חיי האופציות: הבנת תנאי התוכנית, תכנון אסטרטגיית מימוש, אופטימיזציה מיסויית, וניהול הסיכון הכרוך בריכוז גבוה במניית החברה.

רו"ח המתמחה מכיר לעומק את תוכניות 102 ו-3(ט), ומסייע בקבלת החלטות מושכלות לגבי עיתוי המימוש, מכירת המניות, ופיזור ההשקעות. כמו כן, מסייע בהתמודדות עם אירועי נזילות כגון הנפקה או רכישה.`,
    benefits: [
    'ניתוח תוכנית האופציות האישית',
    'תכנון אסטרטגיית מימוש מיטבית',
    'אופטימיזציה מיסויית (סעיף 102/3(ט))',
    'ניהול סיכון ריכוזיות',
    'ליווי באירועי נזילות (IPO/M&A)'],

    forWhom: [
    'עובדי הייטק עם אופציות או RSU',
    'מייסדים ובעלי מניות בסטארטאפים',
    'עובדים בחברות לקראת הנפקה',
    'מי שמימש אופציות ומחפש ייעוץ'],

    highlights: [
    'ניתוח תוכנית חינם',
    'סימולציית מימוש',
    'תכנון מס מקדים']

  }];


  return (
    <div data-ev-id="ev_f8cdf02dda" className="min-h-screen bg-surface font-sans">
      {/* Navigation */}
      <nav data-ev-id="ev_600055a738" className="fixed top-0 right-0 left-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div data-ev-id="ev_6ba182f557" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_be4b41a41d" className="flex justify-between items-center h-20">
            <Logo />
            
            <div data-ev-id="ev_dbce5ef140" className="hidden xl:flex items-center gap-4 2xl:gap-7 text-[15px] 2xl:text-base">
              <Link to="/" className="text-ink-muted hover:text-ink transition-colors font-medium">ראשי</Link>
              <Link to="/#about" className="text-ink-muted hover:text-ink transition-colors font-medium">אודות</Link>
              <Link to="/products" className="text-gold font-medium">מוצרים</Link>
              <Link to="/#services" className="text-ink-muted hover:text-ink transition-colors font-medium">שירותים</Link>
              <Link to="/process" className="text-ink-muted hover:text-ink transition-colors font-medium">תהליך העבודה</Link>
              <Link to="/media" className="text-ink-muted hover:text-ink transition-colors font-medium">מדיה</Link>
              <Link to="/pension-returns" className="text-ink-muted hover:text-ink transition-colors font-medium">תשואות פנסיה</Link>
              <Link to="/links" className="text-ink-muted hover:text-ink transition-colors font-medium">קישורים שימושיים</Link>
              <a data-ev-id="ev_149bfbbd8e"
              href="https://surense.com/app/p/9z3sqal"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2">

                <FileText className="w-4 h-4" />
                להוצאת מידע עדכני
              </a>
              <Link
                to="/onboarding"
                className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-6 py-2.5 rounded-lg transition-colors">
                התחל תהליך
              </Link>
            </div>

            <button data-ev-id="ev_942caaa8c0"
            className="xl:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>

              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen &&
        <div data-ev-id="ev_a04b33d94b" className="xl:hidden bg-surface border-t border-border">
            <div data-ev-id="ev_d565622f26" className="px-4 py-4 flex flex-col gap-4">
              <Link to="/" className="text-ink-muted hover:text-ink font-medium py-2">ראשי</Link>
              <Link to="/#about" className="text-ink-muted hover:text-ink font-medium py-2">אודות</Link>
              <Link to="/products" className="text-gold font-medium py-2">מוצרים</Link>
              <Link to="/#services" className="text-ink-muted hover:text-ink font-medium py-2">שירותים</Link>
              <Link to="/process" className="text-ink-muted hover:text-ink font-medium py-2">תהליך העבודה</Link>
              <Link to="/media" className="text-ink-muted hover:text-ink font-medium py-2">מדיה</Link>
              <Link to="/pension-returns" className="text-ink-muted hover:text-ink font-medium py-2">תשואות פנסיה</Link>
              <Link to="/links" className="text-ink-muted hover:text-ink font-medium py-2">קישורים שימושיים</Link>
              <a data-ev-id="ev_b47f54c4b0"
            href="https://surense.com/app/p/9z3sqal"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-dark font-semibold px-6 py-3 rounded-lg">

                <FileText className="w-4 h-4" />
                להוצאת מידע עדכני
              </a>
              <Link
              to="/onboarding"
              className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-6 py-3 rounded-lg text-center">
                התחל תהליך
              </Link>
            </div>
          </div>
        }
      </nav>

      {/* Hero Section */}
      <section data-ev-id="ev_aeaf191e38" className="relative pt-32 pb-20 hero-tech">
        <div data-ev-id="ev_fd38e6002d" className="absolute inset-0 overflow-hidden">
          <div data-ev-id="ev_e638119b49" className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
          <div data-ev-id="ev_b7dadad64d" className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl"></div>
        </div>
        
        <div data-ev-id="ev_780bedeeed" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_d8ee418773" className="max-w-3xl">
            <div data-ev-id="ev_603bc00118" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Briefcase className="w-4 h-4 text-gold" />
              <span data-ev-id="ev_4b0a6b3591" className="text-white/90 text-sm">פתרונות פיננסיים מקיפים</span>
            </div>
            
            <h1 data-ev-id="ev_de09a6cafe" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance">
              המוצרים והשירותים
              <span data-ev-id="ev_f6a9d80073" className="block text-gold">הפיננסיים שלנו</span>
            </h1>
            
            <p data-ev-id="ev_729acc9755" className="text-lg text-white/80 max-w-2xl text-pretty">
              מגוון רחב של פתרונות פיננסיים מותאמים אישית - מניהול חסכונות ותיקי השקעות, 
              דרך תכנון מס ופרישה, ועד להשקעות אלטרנטיביות וניהול אופציות. 
              כל הכלים שאתם צריכים לבניית עתיד כלכלי יציב.
            </p>
          </div>
        </div>
        
        <div data-ev-id="ev_852b1e80bf" className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-2 to-transparent"></div>
      </section>

      {/* Logo Marquee - Client Companies */}
      <LogoMarquee />

      {/* Quick Navigation */}
      <section data-ev-id="ev_036dd436bc" className="py-8 bg-surface-2 border-b border-border">
        <div data-ev-id="ev_7dddf263cc" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_7bf219485e" className="flex flex-wrap gap-3 justify-center">
            {products.map((product) =>
            <a data-ev-id="ev_d3fea75ac8"
            key={product.id}
            href={`#${product.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-surface rounded-lg border border-border hover:border-gold hover:shadow-sm transition-all text-sm font-medium text-ink">

                <product.icon className="w-4 h-4 text-gold" />
                <span data-ev-id="ev_16576795d5" className="hidden sm:inline">{product.title.split(' ').slice(0, 2).join(' ')}</span>
                <span data-ev-id="ev_6cb7f6edf7" className="sm:hidden">{product.title.split(' ')[0]}</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Products List */}
      <section data-ev-id="ev_1486adecf0" className="py-16 bg-surface-2">
        <div data-ev-id="ev_2c292003d9" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_aa7ca4578a" className="flex flex-col gap-8">
            {products.map((product, index) =>
            <div data-ev-id="ev_8579e40436"
            key={product.id}
            id={product.id}
            className="bg-surface rounded-3xl shadow-sm border border-border overflow-hidden scroll-mt-32">

                <div data-ev-id="ev_63a27ff4ce" className="p-8 lg:p-10">
                  <div data-ev-id="ev_d964b252e0" className="flex flex-col lg:flex-row gap-8">
                    {/* Icon and Title */}
                    <div data-ev-id="ev_09560763cf" className="lg:w-1/3">
                      <div data-ev-id="ev_a54b41f344" className="flex items-start gap-4 mb-4">
                        <div data-ev-id="ev_2bc3e2c547" className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <product.icon className="w-8 h-8 text-gold" />
                        </div>
                        <div data-ev-id="ev_b0a3fe4832">
                          <span data-ev-id="ev_ba7da122b5" className="text-gold text-sm font-semibold">0{index + 1}</span>
                          <h2 data-ev-id="ev_d3355d4580" className="text-2xl font-bold text-ink">{product.title}</h2>
                        </div>
                      </div>
                      
                      <p data-ev-id="ev_82e56247f5" className="text-ink-muted text-lg mb-6">{renderWithPioneerLink(product.shortDescription)}</p>
                      
                      {/* Highlights */}
                      <div data-ev-id="ev_abf9ad8f9c" className="flex flex-wrap gap-2 mb-6">
                        {product.highlights.map((highlight, i) =>
                      <span data-ev-id="ev_f9bdb82af3"
                      key={i}
                      className="bg-gold/10 text-gold text-sm font-medium px-3 py-1 rounded-full">

                            {highlight}
                          </span>
                      )}
                      </div>
                      
                      <button data-ev-id="ev_8ee727e48b"
                    onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                    className="flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all">

                        <span data-ev-id="ev_0c472fe7d3">{expandedProduct === product.id ? 'הסתר פרטים' : 'קרא עוד'}</span>
                        <ChevronLeft className={`w-5 h-5 transition-transform ${expandedProduct === product.id ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                    
                    {/* Benefits and For Whom */}
                    <div data-ev-id="ev_a59889556e" className="lg:w-2/3 grid md:grid-cols-2 gap-6">
                      {/* Benefits */}
                      <div data-ev-id="ev_9d9222e3bb" className="bg-surface-2 rounded-2xl p-6">
                        <h3 data-ev-id="ev_2655818f55" className="font-bold text-ink mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-gold" />
                          יתרונות עיקריים
                        </h3>
                        <ul data-ev-id="ev_3a5b4b9ae7" className="flex flex-col gap-2">
                          {product.benefits.map((benefit, i) =>
                        <li data-ev-id="ev_73dfeef5c9" key={i} className="flex items-start gap-2 text-ink-muted text-sm">
                              <span data-ev-id="ev_038268cdbd" className="text-gold mt-1">•</span>
                              {benefit}
                            </li>
                        )}
                        </ul>
                      </div>
                      
                      {/* For Whom */}
                      <div data-ev-id="ev_c98abb3042" className="bg-navy/5 rounded-2xl p-6">
                        <h3 data-ev-id="ev_90698904ef" className="font-bold text-ink mb-4 flex items-center gap-2">
                          <Users className="w-5 h-5 text-gold" />
                          מתאים עבור
                        </h3>
                        <ul data-ev-id="ev_7b5dc1ee56" className="flex flex-col gap-2">
                          {product.forWhom.map((item, i) =>
                        <li data-ev-id="ev_fc4a62fe6c" key={i} className="flex items-start gap-2 text-ink-muted text-sm">
                              <span data-ev-id="ev_cb04db3b84" className="text-gold mt-1">•</span>
                              {item}
                            </li>
                        )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Content */}
                  {expandedProduct === product.id &&
                <div data-ev-id="ev_8ac8b13bb8" className="mt-8 pt-8 border-t border-border">
                      <div data-ev-id="ev_e65699d36d" className="prose prose-lg max-w-none">
                        <h3 data-ev-id="ev_1d6dc3d0e5" className="text-xl font-bold text-ink mb-4">מידע נוסף</h3>
                        <div data-ev-id="ev_b6edc8d409" className="text-ink-muted whitespace-pre-line text-pretty">
                          {renderWithPioneerLink(product.fullDescription)}
                        </div>
                      </div>
                      
                      <div data-ev-id="ev_0d8c1d7133" className="mt-8 flex flex-col sm:flex-row gap-4">
                        <Link
                      to="/#contact"
                      className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-dark font-semibold px-6 py-3 rounded-lg transition-colors">

                          <span data-ev-id="ev_ff1f46370e">קבע פגישת ייעוץ</span>
                          <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <a data-ev-id="ev_2eb070dd5a"
                    href="tel:03-1234567"
                    className="inline-flex items-center justify-center gap-2 border-2 border-gold/40 text-ink font-semibold px-6 py-3 rounded-lg hover:bg-navy hover:text-white transition-colors">

                          <span data-ev-id="ev_892cde2bf9">שוחח עם יועץ</span>
                        </a>
                      </div>
                    </div>
                }
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-ev-id="ev_be029b8715" className="cta-glow relative overflow-hidden py-24 bg-navy-dark border-y border-gold/20">
        <div data-ev-id="ev_9c16265d44" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 data-ev-id="ev_484e4afccd" className="text-3xl sm:text-4xl font-bold text-ink mb-6 text-balance">
            לא בטוח איזה מוצר מתאים לך?
          </h2>
          <p data-ev-id="ev_ddb25d521f" className="text-ink-muted text-lg mb-8 max-w-2xl mx-auto text-pretty">
            צוות היועצים שלנו ישמח לבצע ניתוח מקיף של המצב הפיננסי שלך ולהמליץ על 
            השילוב האופטימלי של מוצרים ושירותים שיתאימו בדיוק לצרכים שלך.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark font-semibold px-8 py-4 rounded-lg transition-colors">

            <span data-ev-id="ev_ae5be61990">קבע פגישת ייעוץ חינם</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer data-ev-id="ev_c7d4b0a817" className="bg-navy py-12">
        <div data-ev-id="ev_102741ae53" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer Top CTA */}
          <div data-ev-id="ev_5dafe50f2c" className="flex justify-center mb-8">
            <a data-ev-id="ev_f51fd20568"
            href="https://surense.com/app/p/9z3sqal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-navy-dark font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">

              <FileText className="w-5 h-5" />
              להוצאת מידע פנסיוני עדכני
            </a>
          </div>
          
          <div data-ev-id="ev_83c5da1c1d" className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Logo variant="light" />
            
            <div data-ev-id="ev_e92aaba34f" className="flex items-center gap-6">
              <Link to="/" className="text-white/70 hover:text-white transition-colors">ראשי</Link>
              <Link to="/products" className="text-white/70 hover:text-white transition-colors">מוצרים</Link>
              <Link to="/process" className="text-white/70 hover:text-white transition-colors">תהליך העבודה</Link>
              <Link to="/media" className="text-white/70 hover:text-white transition-colors">מדיה</Link>
              <Link to="/#contact" className="text-white/70 hover:text-white transition-colors">צור קשר</Link>
            </div>
            
            <div data-ev-id="ev_d060dcbde8" className="flex flex-col items-center md:items-end gap-2">
              <div data-ev-id="ev_ca751cedef" className="text-white/50 text-sm">
                © 2024 WealthTech. כל הזכויות שמורות.
              </div>
              <div data-ev-id="ev_359cd2261c" className="flex items-center gap-4">
                <Link to="/privacy" className="text-white/50 hover:text-white text-sm transition-colors">
                  מדיניות פרטיות
                </Link>
                <span data-ev-id="ev_54238d1152" className="text-white/30">|</span>
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