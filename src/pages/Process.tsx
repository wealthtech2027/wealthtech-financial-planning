import {
  ClipboardList,
  Target,
  BarChart3,
  FileText,
  Rocket,
  RefreshCw,
  Shield,
  PiggyBank,
  FileCheck,
  ArrowLeft,
  CheckCircle2,
  Users,
  Lightbulb,
  Menu,
  X } from
'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { LogoMarquee } from '@/components/LogoMarquee';
import { Logo } from '@/components/Logo';

export default function Process() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const steps = [
  {
    number: '01',
    icon: Users,
    title: 'פגישה עם מתכנן פיננסי',
    description: 'עבודה עם מתכנן פיננסי מוסמך יכולה לעזור לך להבין טוב יותר את המצב הפיננסי שלך ואת הצעדים שעליך לנקוט כדי להשיג את היעדים שלך.',
    details: [
    'התאמה אישית של התוכנית לחיים ולהעדפות שלך',
    'שיחות אישיות המותאמות לרקע, קריירה וחיי משפחה',
    'סביבה פתוחה וכנה לדיון בחששות פיננסיים'],

    documents: [
    'מידע אישי: גיל, מצב משפחתי, הכנסה',
    'נכסים: בעלות על בית או רכב',
    'תיק השקעות ותוכניות פנסיה',
    'תוכנית החזר חובות',
    'צוואה ותוכנית עיזבון',
    'פוליסות ביטוח אישיות']

  },
  {
    number: '02',
    icon: Target,
    title: 'הגדרת יעדים פיננסיים',
    description: 'לאחר שהמתכנן הפיננסי מכיר אותך, הוא יכול לדון איתך ביעדים שלך. דיון ביעדים מראש עוזר לעצב תוכנית שממקסמת את הרווחה הפיננסית שלך.',
    details: [
    'שימור והגדלת ההון המשפחתי',
    'יצירת תזרים הכנסה יציב מההון',
    'תכנון פרישה ברמה גבוהה',
    'העברה בין־דורית וניהול עיזבון',
    'אופטימיזציה מיסויית בישראל ובחו"ל',
    'פיזור סיכונים ובניית יציבות כוללת'],

    tip: 'היה שקוף ככל האפשר עם היעדים הפיננסיים שלך - כנים אך ריאליסטיים'
  },
  {
    number: '03',
    icon: BarChart3,
    title: 'הערכת המצב הפיננסי',
    description: 'המתכנן הפיננסי ינתח את אורח החיים הנוכחי שלך וכיצד הוא יכול להתאים ליעדים הפיננסיים שלך.',
    details: [
    'ניתוח תזרים מזומנים',
    'הערכת הוצאות שוטפות',
    'בדיקת יחס חובות להכנסה',
    'זיהוי הזדמנויות חיסכון',
    'הבנת דפוסי הוצאה'],

    example: 'אם יש לך חובות ומתכנן לפתוח עסק, המתכנן עשוי להמליץ על תוכנית שבה החוב נפרע תחילה'
  },
  {
    number: '04',
    icon: FileText,
    title: 'פיתוח התוכנית',
    description: 'באמצעות המידע שסיפקת, היעדים שזיהית והנתונים על המצב הפיננסי הנוכחי, המתכנן יעבוד איתך לעצב תוכנית.',
    details: [
    'תוכנית ריאליסטית המתחשבת בספקות ובחששות',
    'פתרונות לשמירה והגדלת העושר',
    'אסטרטגיית השקעות לטווח ארוך',
    'תכנון פרישה מוקדם',
    'ניהול סיכונים וביטוחים']

  },
  {
    number: '05',
    icon: Rocket,
    title: 'יישום התוכנית',
    description: 'עכשיו עליך להוציא לפועל את התוכנית שאתה והמתכנן הפיננסי עבדתם עליה. תוכל לראות אילו חלקים מניבים תוצאות.',
    details: [
    'הפעלת אסטרטגיית ההשקעות',
    'פתיחת חשבונות חיסכון ייעודיים',
    'התחלת תוכנית פירעון חובות',
    'עדכון פוליסות ביטוח',
    'מעקב שוטף אחר התקדמות'],

    tip: 'גם אם לא תראה תוצאות מיד, שמור על קשר עם היועץ אם יש לך ספקות או חששות'
  },
  {
    number: '06',
    icon: RefreshCw,
    title: 'מעקב והתאמה מתמדת',
    description: 'לאחר שהתוכנית הפיננסית מיושמת, חשוב לעקוב אחר ההתקדמות ולבדוק כמה קרוב הגעת להשגת היעדים.',
    details: [
    'מעקב אחר תזרים המזומנים החודשי',
    'בדיקה האם להפנות יותר כסף לחיסכון או להחזר חובות',
    'התאמת התוכנית לשינויים בחיים',
    'עדכון יעדים לפי הצורך',
    'פגישות תקופתיות עם היועץ'],

    tip: 'כוונון עדין של התוכנית הוא טבעי ויכול להיות חלק בלתי נפרד מהתהליך'
  }];


  const additionalTips = [
  {
    icon: PiggyBank,
    title: 'קרן חירום',
    description: 'מומלץ לחסוך לפחות 3-6 חודשי הוצאות מחיה למקרה חירום. וודא שהסכום מתאים לעלויות המחיה העדכניות.'
  },
  {
    icon: Shield,
    title: 'עדכון פוליסות ביטוח',
    description: 'ביטוח מגן על היציבות הפיננסית שלך. וודא שביטוחי החיים, הרכב והבית מתאימים ליעדים הפיננסיים שלך.'
  }];


  const benefits = [
  'התמודדות פרואקטיבית עם אינפלציה',
  'הכנה לפרישה מוקדמת',
  'התמודדות עם משברים רפואיים',
  'השגת יעדי חיים משמעותיים',
  'מקסום הנכסים שלך',
  'ניהול עושר חכם'];


  return (
    <div data-ev-id="ev_1ed27a9d68" className="min-h-screen bg-surface font-sans">
      {/* Navigation */}
      <nav data-ev-id="ev_df636ceabd" className="fixed top-0 right-0 left-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div data-ev-id="ev_5751a95d6a" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_baf74b2846" className="flex justify-between items-center h-20">
            <Logo />
            
            <div data-ev-id="ev_af7dd7d986" className="hidden xl:flex items-center gap-4 2xl:gap-7 text-[15px] 2xl:text-base">
              <Link to="/" className="text-ink-muted hover:text-ink transition-colors font-medium">ראשי</Link>
              <Link to="/#about" className="text-ink-muted hover:text-ink transition-colors font-medium">אודות</Link>
              <Link to="/products" className="text-ink-muted hover:text-ink transition-colors font-medium">מוצרים</Link>
              <Link to="/#services" className="text-ink-muted hover:text-ink transition-colors font-medium">שירותים</Link>
              <Link to="/process" className="text-gold font-medium">תהליך העבודה</Link>
              <Link to="/media" className="text-ink-muted hover:text-ink transition-colors font-medium">מדיה</Link>
              <Link to="/pension-returns" className="text-ink-muted hover:text-ink transition-colors font-medium">תשואות פנסיה</Link>
              <Link to="/links" className="text-ink-muted hover:text-ink transition-colors font-medium">קישורים שימושיים</Link>
              <a data-ev-id="ev_9bb65ef495"
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

            <button data-ev-id="ev_d994893bd4"
            className="xl:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>

              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen &&
        <div data-ev-id="ev_8f73b1003e" className="xl:hidden bg-surface border-t border-border">
            <div data-ev-id="ev_4fd26827fb" className="px-4 py-4 flex flex-col gap-4">
              <Link to="/" className="text-ink-muted hover:text-ink font-medium py-2">ראשי</Link>
              <Link to="/#about" className="text-ink-muted hover:text-ink font-medium py-2">אודות</Link>
              <Link to="/products" className="text-ink-muted hover:text-ink font-medium py-2">מוצרים</Link>
              <Link to="/#services" className="text-ink-muted hover:text-ink font-medium py-2">שירותים</Link>
              <Link to="/process" className="text-gold font-medium py-2">תהליך העבודה</Link>
              <Link to="/media" className="text-ink-muted hover:text-ink font-medium py-2">מדיה</Link>
              <Link to="/pension-returns" className="text-ink-muted hover:text-ink font-medium py-2">תשואות פנסיה</Link>
              <Link to="/links" className="text-ink-muted hover:text-ink font-medium py-2">קישורים שימושיים</Link>
              <a data-ev-id="ev_8c2f445fca"
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
      <section data-ev-id="ev_22f4978c09" className="relative pt-32 pb-20 hero-tech">
        <div data-ev-id="ev_26aba530ad" className="absolute inset-0 overflow-hidden">
          <div data-ev-id="ev_fe3aa35385" className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
          <div data-ev-id="ev_945d00319f" className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl"></div>
        </div>
        
        <div data-ev-id="ev_bd6b60d9ab" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_58a7e4e6f5" className="max-w-3xl">
            <div data-ev-id="ev_c79fc86cfc" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <ClipboardList className="w-4 h-4 text-gold" />
              <span data-ev-id="ev_b7f4dd373f" className="text-white/90 text-sm">6 שלבים לתכנון פיננסי מוצלח</span>
            </div>
            
            <h1 data-ev-id="ev_01a3d07a5c" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance">
              תהליך התכנון
              <span data-ev-id="ev_e7b598d863" className="block text-gold">הפיננסי שלנו</span>
            </h1>
            
            <p data-ev-id="ev_91469468bc" className="text-lg text-white/80 mb-8 max-w-2xl text-pretty">
              תכנון פיננסי נותן לך מרחב לפעול באופן יזום, כך שלא תצטרך להתרוצץ 
              כאשר מופיעות בעיות כמו עלויות אינפלציה, פרישה מוקדמת ומשברים רפואיים.
            </p>

            <div data-ev-id="ev_05ba92ddfd" className="flex flex-wrap gap-3">
              {benefits.slice(0, 3).map((benefit, index) =>
              <div data-ev-id="ev_003dffb694" key={index} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <CheckCircle2 className="w-4 h-4 text-gold" />
                  <span data-ev-id="ev_f1b1da4822" className="text-white/90 text-sm">{benefit}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div data-ev-id="ev_86d313c150" className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent"></div>
      </section>

      {/* Logo Marquee - Client Companies */}
      <LogoMarquee />

      {/* Why Planning Section */}
      <section data-ev-id="ev_5ce308a546" className="py-20 bg-surface">
        <div data-ev-id="ev_7f1720fb49" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_cd2d722678" className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div data-ev-id="ev_f7fcfcf118">
              <div data-ev-id="ev_a37cbd9e2d" className="inline-flex items-center gap-2 text-gold font-semibold mb-4">
                <Lightbulb className="w-5 h-5" />
                <span data-ev-id="ev_18a90bf4e5">למה תכנון פיננסי חשוב?</span>
              </div>
              
              <h2 data-ev-id="ev_37a1308353" className="text-3xl sm:text-4xl font-bold text-ink mb-6 text-balance">
                רק 30% מהאנשים מחזיקים בתוכנית פיננסית
              </h2>
              
              <p data-ev-id="ev_6d6e7c3020" className="text-ink-muted text-lg mb-6 text-pretty">
                תכנון פיננסי מתייחס לניהול הכספים שלך. כחלק מתהליך התכנון הפיננסי, 
                תוכל להעריך את המצב הפיננסי הנוכחי שלך, לזהות את היעדים שלך, 
                ולנקוט צעדים מעשיים לתקצוב, השקעה וחיסכון.
              </p>
              
              <p data-ev-id="ev_0a0225667e" className="text-ink-muted text-lg mb-8 text-pretty">
                תכנון פיננסי הוא הוליסטי ורב-פנים. במקום להתמקד בהיבט יחיד של הכספים שלך, 
                תוכנית פיננסית טובה לוקחת בחשבון את היעדים והאחריות שלך. כתוצאה מכך, 
                תוכל ליצור תמונה ריאליסטית של העתיד שלך.
              </p>

              <div data-ev-id="ev_5270959555" className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) =>
                <div data-ev-id="ev_cfc8605f38" key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                    <span data-ev-id="ev_c253c9d983" className="text-ink text-sm">{benefit}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div data-ev-id="ev_4e6913c003" className="relative">
              <div data-ev-id="ev_d830509a47" className="bg-gradient-to-br from-surface-2 to-surface rounded-3xl p-6 sm:p-8 border border-border">
                <div data-ev-id="ev_8b27c2e6bf" className="text-center mb-8">
                  <div data-ev-id="ev_dce6241762" className="text-6xl font-bold text-gold mb-2">30%</div>
                  <div data-ev-id="ev_1792165037" className="text-ink-muted">מהאנשים מחזיקים בתוכנית פיננסית</div>
                </div>
                <div data-ev-id="ev_4f36bb5dca" className="h-4 bg-surface-2 rounded-full overflow-hidden">
                  <div data-ev-id="ev_ad47811e75" className="h-full w-[30%] bg-gradient-to-r from-gold to-gold-light rounded-full"></div>
                </div>
                <p data-ev-id="ev_ecab17abb1" className="text-center text-sm text-ink-muted mt-4">
                  היה חלק מה-30% שמתכננים את העתיד שלהם
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Steps Section */}
      <section data-ev-id="ev_6f3d2cde5c" className="py-14 sm:py-20 lg:py-32 bg-surface-2">
        <div data-ev-id="ev_71258c5b01" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_4b3a9922c2" className="text-center max-w-3xl mx-auto mb-10 lg:mb-16">
            <div data-ev-id="ev_380069046c" className="inline-flex items-center gap-2 text-gold font-semibold mb-4">
              <ClipboardList className="w-5 h-5" />
              <span data-ev-id="ev_4c985c19ea">התהליך שלנו</span>
            </div>
            
            <h2 data-ev-id="ev_5b11ecddea" className="text-3xl sm:text-4xl font-bold text-ink mb-6 text-balance">
              6 השלבים בתהליך התכנון הפיננסי
            </h2>
            
            <p data-ev-id="ev_143f23972a" className="text-ink-muted text-lg text-pretty">
              תהליך תכנון פיננסי מוצק כולל שישה שלבים. שלבים אלה יכולים לעזור לך 
              לנתח את תזרים המזומנים האישי שלך ולהתוות צעדים מוחשיים לקראת היעדים הפיננסיים שלך.
            </p>
          </div>
          
          <div data-ev-id="ev_e255f21366" className="flex flex-col gap-8">
            {steps.map((step, index) =>
            <div data-ev-id="ev_39486e4fd5"
            key={index}
            className="bg-surface rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-border hover:shadow-lg transition-shadow">

                <div data-ev-id="ev_306ca4457d" className="flex flex-col lg:flex-row gap-8">
                  <div data-ev-id="ev_e4fa96054f" className="flex-shrink-0">
                    <div data-ev-id="ev_09f6e40d46" className="w-20 h-20 bg-gold/10 border border-gold/30 rounded-2xl flex items-center justify-center">
                      <span data-ev-id="ev_fdda27749c" className="text-3xl font-bold text-gold">{step.number}</span>
                    </div>
                  </div>
                  
                  <div data-ev-id="ev_b178a26318" className="flex-grow">
                    <div data-ev-id="ev_f428ade3d4" className="flex items-center gap-3 mb-4">
                      <step.icon className="w-6 h-6 text-gold" />
                      <h3 data-ev-id="ev_ebbc5cec6c" className="text-2xl font-bold text-ink">{step.title}</h3>
                    </div>
                    
                    <p data-ev-id="ev_579841df30" className="text-ink-muted text-lg mb-6 text-pretty">{step.description}</p>
                    
                    <div data-ev-id="ev_3a5753c92d" className="grid md:grid-cols-2 gap-6">
                      <div data-ev-id="ev_8d28c14960">
                        <h4 data-ev-id="ev_a129257275" className="font-semibold text-ink mb-3">נקודות עיקריות:</h4>
                        <ul data-ev-id="ev_65d7f40a0e" className="flex flex-col gap-2">
                          {step.details.map((detail, i) =>
                        <li data-ev-id="ev_6b76ebde6b" key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                              <span data-ev-id="ev_bddf6f9088" className="text-ink-muted">{detail}</span>
                            </li>
                        )}
                        </ul>
                      </div>
                      
                      {step.documents &&
                    <div data-ev-id="ev_5bf5b7d9cf" className="bg-surface-2 rounded-xl p-4">
                          <h4 data-ev-id="ev_cc80db528b" className="font-semibold text-ink mb-3 flex items-center gap-2">
                            <FileCheck className="w-5 h-5 text-gold" />
                            מסמכים להכנה:
                          </h4>
                          <ul data-ev-id="ev_6ada50179a" className="flex flex-col gap-1.5 text-sm text-ink-muted">
                            {step.documents.map((doc, i) =>
                        <li data-ev-id="ev_ac7076f582" key={i}>• {doc}</li>
                        )}
                          </ul>
                        </div>
                    }
                      
                      {step.tip &&
                    <div data-ev-id="ev_c2a18b94d1" className="bg-gold/10 rounded-xl p-4 md:col-span-2">
                          <p data-ev-id="ev_1319dd82e5" className="text-ink">
                            <span data-ev-id="ev_a5a359503c" className="font-semibold">💡 טיפ: </span>
                            {step.tip}
                          </p>
                        </div>
                    }
                      
                      {step.example &&
                    <div data-ev-id="ev_78523ae0b4" className="bg-navy/5 rounded-xl p-4 md:col-span-2">
                          <p data-ev-id="ev_543f2ff602" className="text-ink">
                            <span data-ev-id="ev_b3acacb9bf" className="font-semibold">📌 דוגמה: </span>
                            {step.example}
                          </p>
                        </div>
                    }
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Additional Tips Section */}
      <section data-ev-id="ev_62590f8164" className="py-20 bg-surface">
        <div data-ev-id="ev_849be04d57" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_e1708a0aa7" className="text-center max-w-3xl mx-auto mb-10 lg:mb-16">
            <h2 data-ev-id="ev_e95c42c80c" className="text-3xl sm:text-4xl font-bold text-ink mb-6 text-balance">
              טיפים נוספים לשיפור התכנון הפיננסי
            </h2>
            <p data-ev-id="ev_2ee1741f6c" className="text-ink-muted text-lg text-pretty">
              בנוסף לששת השלבים, תרצה לקבל החלטות פיננסיות חכמות נוספות כדי להבטיח שהכספים שלך מוגנים.
            </p>
          </div>
          
          <div data-ev-id="ev_afd5712503" className="grid md:grid-cols-3 gap-8">
            {additionalTips.map((tip, index) =>
            <div data-ev-id="ev_d76dad68f7" key={index} className="bg-surface-2 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-shadow">
                <div data-ev-id="ev_9f7d11dba9" className="w-14 h-14 bg-gold/10 border border-gold/30 rounded-xl flex items-center justify-center mb-6">
                  <tip.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 data-ev-id="ev_dcf5401f04" className="text-xl font-bold text-ink mb-3">{tip.title}</h3>
                <p data-ev-id="ev_344b93cfc3" className="text-ink-muted text-pretty">{tip.description}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-ev-id="ev_2039d366d3" className="cta-glow relative overflow-hidden py-16 sm:py-24 bg-navy-dark border-y border-gold/20">
        <div data-ev-id="ev_bd9af8b5be" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 data-ev-id="ev_1cb517bed2" className="text-3xl sm:text-4xl font-bold text-ink mb-6 text-balance">
            מוכנים להתחיל בתהליך התכנון הפיננסי?
          </h2>
          <p data-ev-id="ev_99f8ce5123" className="text-ink-muted text-lg mb-8 max-w-2xl mx-auto text-pretty">
            התהליך לא חייב להיות מלחיץ. צוות המתכננים הפיננסיים המוסמכים שלנו ב-WealthTech 
            יכירו אותך ואת הנסיבות הפיננסיות הנוכחיות שלך, היעדים, סובלנות הסיכון והערכים האישיים 
            כדי לעזור לך לפתח תוכנית שעובדת בשבילך.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark font-semibold px-8 py-4 rounded-lg transition-colors">

            <span data-ev-id="ev_59990391df">קבע פגישת ייעוץ חינמית</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer data-ev-id="ev_d763605436" className="bg-navy py-12">
        <div data-ev-id="ev_bfaa2c7e13" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer Top CTA */}
          <div data-ev-id="ev_14ef399f06" className="flex justify-center mb-8">
            <a data-ev-id="ev_2a167b091f"
            href="https://surense.com/app/p/9z3sqal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-navy-dark font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">

              <FileText className="w-5 h-5" />
              להוצאת מידע פנסיוני עדכני
            </a>
          </div>
          
          <div data-ev-id="ev_b94eccf9c2" className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Logo variant="light" />
            
            <div data-ev-id="ev_88c5c5f814" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <Link to="/" className="text-white/70 hover:text-white transition-colors">ראשי</Link>
              <Link to="/#services" className="text-white/70 hover:text-white transition-colors">שירותים</Link>
              <Link to="/process" className="text-white/70 hover:text-white transition-colors">תהליך העבודה</Link>
              <Link to="/#contact" className="text-white/70 hover:text-white transition-colors">צור קשר</Link>
            </div>
            
            <div data-ev-id="ev_d1036b615f" className="flex flex-col items-center md:items-end gap-2">
              <div data-ev-id="ev_5c03c0b869" className="text-white/50 text-sm">
                © 2024 WealthTech. כל הזכויות שמורות.
              </div>
              <div data-ev-id="ev_c79f8cf209" className="flex items-center gap-4">
                <Link to="/privacy" className="text-white/50 hover:text-white text-sm transition-colors">
                  מדיניות פרטיות
                </Link>
                <span data-ev-id="ev_1ee0214dc6" className="text-white/30">|</span>
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