import { useState } from 'react';
import { Link } from 'react-router';
import {
  Play,
  Mic2,
  Calendar,
  ExternalLink,
  ChevronLeft,
  Menu,
  X,
  Youtube,
  FileText,
  Headphones,
  Newspaper,
  Clock,
  ChevronDown,
  ChevronUp,
  Share2,
  Facebook,
  Linkedin,
  Twitter,
  Link2,
  MessageCircle,
  Check,
  Loader2 } from
'lucide-react';
import { LogoMarquee } from '@/components/LogoMarquee';
import { Logo } from '@/components/Logo';
import { supabase } from '@/integrations/supabase/client';
import articleInvestmentAdvisorImage from '@/assets/uploads/article-investment-advisor.jpg';
import articleQualifiedInvestorImage from '@/assets/generated/article-qualified-investor.jpg.png';
import articleMortgageInsuranceImage from '@/assets/generated/article-mortgage-insurance.png';
import articleHedgeFundsImage from '@/assets/generated/article-hedge-funds-wallst.svg';
import workshopFamilyFinanceImage from '@/assets/uploads/workshop-family-finance.jpg';
import articleFamilyFinanceImage from '@/assets/generated/article-family-finance.svg';

type MediaTab = 'all' | 'videos' | 'podcasts' | 'articles' | 'press';

interface Video {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  thumbnail: string;
  youtubeId: string;
}

interface Podcast {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  spotifyUrl: string;
}

interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  image?: string;
  hasLeadForm?: boolean;
  flyerImage?: string;
}

interface PressArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  date: string;
  author?: string;
}

export default function Media() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<MediaTab>('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState<string | null>(null);
  const [workshopForm, setWorkshopForm] = useState({ name: '', phone: '', email: '' });
  const [workshopSubmitted, setWorkshopSubmitted] = useState(false);
  const [workshopSubmitting, setWorkshopSubmitting] = useState(false);

  // Share functions
  const getShareUrl = (title: string, articleId?: string) => {
    const baseUrl = window.location.origin;
    return articleId ? `${baseUrl}/media?article=${articleId}` : `${baseUrl}/media`;
  };

  const shareToFacebook = (title: string, articleId?: string) => {
    const url = getShareUrl(title, articleId);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = (title: string, articleId?: string) => {
    const url = getShareUrl(title, articleId);
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
  };

  const shareToLinkedIn = (title: string, articleId?: string) => {
    const url = getShareUrl(title, articleId);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
  };

  const shareToWhatsApp = (title: string, articleId?: string) => {
    const url = getShareUrl(title, articleId);
    window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
  };

  const copyLink = (title: string, articleId?: string) => {
    const url = getShareUrl(title, articleId);
    const textarea = document.createElement('textarea');
    textarea.value = url;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    setCopiedLink(articleId || 'page');
    setTimeout(() => setCopiedLink(null), 2000);
  };

  // Share buttons component
  const ShareButtons = ({ title, articleId, variant = 'default' }: {title: string;articleId?: string;variant?: 'default' | 'compact';}) => {
    const isOpen = showShareMenu === (articleId || 'page');

    if (variant === 'compact') {
      return (
        <div data-ev-id="ev_7b52e840bb" className="relative">
          <button data-ev-id="ev_cdb9441655"
          onClick={(e) => {
            e.stopPropagation();
            setShowShareMenu(isOpen ? null : articleId || 'page');
          }}
          className="flex items-center gap-1 text-ink-muted hover:text-gold transition-colors p-2 rounded-lg hover:bg-surface-3">

            <Share2 className="w-4 h-4" />
            <span data-ev-id="ev_9f0f45d9e0" className="text-sm">שתף</span>
          </button>
          
          {isOpen &&
          <div data-ev-id="ev_a36920054b" className="absolute left-0 top-full mt-2 bg-surface rounded-xl shadow-xl border border-border p-3 z-50 min-w-[200px]">
              <div data-ev-id="ev_6d3ba747eb" className="flex flex-col gap-2">
                <button data-ev-id="ev_98cceac37a"
              onClick={(e) => {e.stopPropagation();shareToFacebook(title, articleId);}}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-500/10 text-ink-muted hover:text-blue-400 transition-colors">

                  <Facebook className="w-5 h-5" />
                  <span data-ev-id="ev_777f381a2f" className="text-sm">Facebook</span>
                </button>
                <button data-ev-id="ev_7298b19f64"
              onClick={(e) => {e.stopPropagation();shareToTwitter(title, articleId);}}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sky-500/10 text-ink-muted hover:text-sky-500 transition-colors">

                  <Twitter className="w-5 h-5" />
                  <span data-ev-id="ev_e65268ac3e" className="text-sm">X (Twitter)</span>
                </button>
                <button data-ev-id="ev_3fcfefe5b9"
              onClick={(e) => {e.stopPropagation();shareToLinkedIn(title, articleId);}}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-500/10 text-ink-muted hover:text-blue-400 transition-colors">

                  <Linkedin className="w-5 h-5" />
                  <span data-ev-id="ev_a95df35e1c" className="text-sm">LinkedIn</span>
                </button>
                <button data-ev-id="ev_ce03e3a636"
              onClick={(e) => {e.stopPropagation();shareToWhatsApp(title, articleId);}}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-500/10 text-ink-muted hover:text-green-400 transition-colors">

                  <MessageCircle className="w-5 h-5" />
                  <span data-ev-id="ev_5883089742" className="text-sm">WhatsApp</span>
                </button>
                <div data-ev-id="ev_17b69ff7f4" className="border-t border-border my-1" />
                <button data-ev-id="ev_84de74f39e"
              onClick={(e) => {e.stopPropagation();copyLink(title, articleId);}}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-3 text-ink-muted transition-colors">

                  {copiedLink === (articleId || 'page') ?
                <>
                      <Check className="w-5 h-5 text-green-500" />
                      <span data-ev-id="ev_029f797ca4" className="text-sm text-green-500">הקישור הועתק!</span>
                    </> :

                <>
                      <Link2 className="w-5 h-5" />
                      <span data-ev-id="ev_08fe6a567c" className="text-sm">העתק קישור</span>
                    </>
                }
                </button>
              </div>
            </div>
          }
        </div>);

    }

    return (
      <div data-ev-id="ev_f5629fa044" className="flex items-center gap-2">
        <span data-ev-id="ev_a1fb9949aa" className="text-sm text-ink-muted ml-2">שתף:</span>
        <button data-ev-id="ev_29a11092d2"
        onClick={() => shareToFacebook(title, articleId)}
        className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
        title="שתף בפייסבוק">

          <Facebook className="w-4 h-4" />
        </button>
        <button data-ev-id="ev_4b5a2533e1"
        onClick={() => shareToTwitter(title, articleId)}
        className="w-9 h-9 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-colors"
        title="שתף בטוויטר">

          <Twitter className="w-4 h-4" />
        </button>
        <button data-ev-id="ev_d5a7217728"
        onClick={() => shareToLinkedIn(title, articleId)}
        className="w-9 h-9 rounded-full bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center transition-colors"
        title="שתף בלינקדאין">

          <Linkedin className="w-4 h-4" />
        </button>
        <button data-ev-id="ev_387a6b7bf7"
        onClick={() => shareToWhatsApp(title, articleId)}
        className="w-9 h-9 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors"
        title="שתף בוואטסאפ">

          <MessageCircle className="w-4 h-4" />
        </button>
        <button data-ev-id="ev_dc67d2e559"
        onClick={() => copyLink(title, articleId)}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
        copiedLink === (articleId || 'page') ?
        'bg-green-500 text-white' :
        'bg-surface-3 hover:bg-surface-3 text-ink-muted'}`
        }
        title="העתק קישור">

          {copiedLink === (articleId || 'page') ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
        </button>
      </div>);

  };

  const tabs: {id: MediaTab;label: string;icon: React.ElementType;}[] = [
  { id: 'all', label: 'הכל', icon: FileText },
  { id: 'articles', label: 'כתבות ומאמרים', icon: Newspaper },
  { id: 'press', label: 'כתבות כלכליות', icon: Newspaper },
  { id: 'videos', label: 'וידאו', icon: Youtube },
  { id: 'podcasts', label: 'פודקאסטים', icon: Mic2 }];


  const videos: Video[] = [
  {
    id: '2',
    title: 'אודי חברוני מסביר: איך לתכנן את העתיד הפיננסי שלך',
    description: 'ראיון עם אודי חברוני על תכנון פיננסי, ניהול השקעות וטיפים לבניית עתיד כלכלי יציב.',
    date: '',
    duration: '',
    thumbnail: `https://img.youtube.com/vi/OV0lPWTJdZQ/maxresdefault.jpg`,
    youtubeId: 'OV0lPWTJdZQ'
  },
  {
    id: '3',
    title: '"האם מודל 60/40 עדיין עובד?" פרק מיוחד מתוך ערוץ הכלכלה עם אודי חברוני',
    description: '',
    date: '',
    duration: '',
    thumbnail: `https://img.youtube.com/vi/AnXZJSDEyyk/maxresdefault.jpg`,
    youtubeId: 'AnXZJSDEyyk'
  },
  {
    id: '4',
    title: 'תכנון פרישה לבעלי שליטה - פרק מיוחד עם אודי חברוני ומתכנן הפרישה יגאל הררי',
    description: '',
    date: '',
    duration: '',
    thumbnail: `https://img.youtube.com/vi/O-0l2b7DMF8/maxresdefault.jpg`,
    youtubeId: 'O-0l2b7DMF8'
  },
  {
    id: '5',
    title: 'מלכודת המס בפרישה - פרק מיוחד לבכירים במשק הישראלי',
    description: '',
    date: '',
    duration: '',
    thumbnail: `https://img.youtube.com/vi/4Im3XKy4Kxk/maxresdefault.jpg`,
    youtubeId: '4Im3XKy4Kxk'
  },
  {
    id: '6',
    title: 'פרק מיוחד על הפוליסה הפיננסית בישראל',
    description: '',
    date: '',
    duration: '',
    thumbnail: `https://img.youtube.com/vi/4wPpGzQsy00/maxresdefault.jpg`,
    youtubeId: '4wPpGzQsy00'
  },
  {
    id: '7',
    title: 'על השינויים בקופת גמל IRA',
    description: '',
    date: '',
    duration: '',
    thumbnail: `https://img.youtube.com/vi/LDcn-F8voSg/maxresdefault.jpg`,
    youtubeId: 'LDcn-F8voSg'
  },
  {
    id: '8',
    title: 'פרק מיוחד על ביטוח אחריות מקצועית',
    description: '',
    date: '',
    duration: '',
    thumbnail: `https://img.youtube.com/vi/vIjoG83f0gY/maxresdefault.jpg`,
    youtubeId: 'vIjoG83f0gY'
  },
  {
    id: '9',
    title: 'פרק מיוחד על השקעות לא סחירות בקופות הגמל וקרנות ההשתלמות',
    description: '',
    date: '',
    duration: '',
    thumbnail: `https://img.youtube.com/vi/1qHfTaE6g4c/maxresdefault.jpg`,
    youtubeId: '1qHfTaE6g4c'
  },
  {
    id: '10',
    title: 'הדיון המלא על השקעות אלטרנטיביות - פאנל מומחים בערוץ הכלכלה בהשתתפות אודי חברוני',
    description: '',
    date: '',
    duration: '',
    thumbnail: `https://img.youtube.com/vi/rQzxR7g6ARU/maxresdefault.jpg`,
    youtubeId: 'rQzxR7g6ARU'
  },
  {
    id: '11',
    title: 'ארבעה צעדים בתהליך תביעת ביטוח',
    description: '',
    date: '',
    duration: '',
    thumbnail: `https://img.youtube.com/vi/lhw0zZMmuPw/maxresdefault.jpg`,
    youtubeId: 'lhw0zZMmuPw'
  },
  {
    id: '12',
    title: 'התרומה המכרעת של אפיק המניות בחיסכון הפנסיוני',
    description: '',
    date: '',
    duration: '',
    thumbnail: `https://img.youtube.com/vi/O-lovjisLmA/maxresdefault.jpg`,
    youtubeId: 'O-lovjisLmA'
  },
  {
    id: '13',
    title: 'מיצוי זכויות בקרן פנסיה',
    description: '',
    date: '',
    duration: '',
    thumbnail: `https://img.youtube.com/vi/BGzsiuPkv9o/maxresdefault.jpg`,
    youtubeId: 'BGzsiuPkv9o'
  },
  {
    id: '14',
    title: 'פאסיבי או אקטיבי - על מסלולי ההשקעות בקופות הגמל וקרנות ההשתלמות',
    description: '',
    date: '',
    duration: '',
    thumbnail: `https://img.youtube.com/vi/o14T8imOmaY/maxresdefault.jpg`,
    youtubeId: 'o14T8imOmaY'
  },
  {
    id: '15',
    title: 'קצבת השארים בקרן פנסיה - מדריך חדש',
    description: '',
    date: '',
    duration: '',
    thumbnail: `https://img.youtube.com/vi/i1Z5dP7aACk/maxresdefault.jpg`,
    youtubeId: 'i1Z5dP7aACk'
  }];


  const podcasts: Podcast[] = [];

  const articles: Article[] = [
  {
    id: '1',
    title: 'בין יועץ ההשקעות בבנק למנהל תיקים פרטי: כך נראה הקרב על הכסף של הלקוח הישראלי',
    summary: 'הלקוח הישראלי שמביט היום על תיק ההשקעות שלו ניצב מול דילמה מוכרת: האם להישאר בבנק או להעביר את ניהול הכסף למנהל תיקים חיצוני? זו אינה רק שאלה של מחיר — זו שאלה של שליטה, אחריות וזמינות.',
    content: `הלקוח הישראלי שמביט היום על תיק ההשקעות שלו ניצב מול דילמה מוכרת, אבל הרבה יותר מהותית מכפי שהיא נראית במבט ראשון: האם להישאר בבנק, לקבל ייעוץ השקעה תחת מעטפת בנקאית מוכרת, ולבצע את ההחלטות בעצמו — או להעביר את ניהול הכסף למנהל תיקים חיצוני, לשלם דמי ניהול שוטפים, ולקבל שירות דיסקרציוני שבו מישהו אחר מקבל את ההחלטות עבורו.

זו אינה רק שאלה של מחיר. זו שאלה של שליטה, אחריות, זמינות, עומק מקצועי ומבנה השירות. בדין הישראלי ההבדל ברור: ייעוץ השקעה הוא מתן המלצה ללקוח בנוגע לכדאיות השקעה, החזקה, קנייה או מכירה של ניירות ערך או נכסים פיננסיים; ניהול תיקי השקעה, לעומת זאת, הוא ביצוע עסקאות לפי שיקול דעת עבור חשבונו של הלקוח, בדרך כלל באמצעות ייפוי כוח ובהתאם למדיניות השקעה שסוכמה מראש. כלומר, בבנק הלקוח מקבל המלצה ונשאר עם האצבע על ההדק; אצל מנהל התיקים, הוא מעביר את ההדק עצמו.

ההבחנה הזו משפיעה על כל חוויית השירות. במודל הבנקאי, הלקוח נהנה ממסגרת מוכרת, קירבה לחשבון העו"ש, ולעיתים גם מתחושה ביטחון שמגיעה עם המותג הבנקאי. מנגד, הייעוץ הבנקאי נוטה להיות תהליך מובנה יותר, ולעיתים גם שמרני יותר, משום שבסוף מי שמאשר את הפעולה הוא הלקוח עצמו. מנהל תיקים, לעומת זאת, אמור לספק שכבת שירות אחרת: לא רק להמליץ, אלא ליישם, לעדכן, להגיב לשוק בזמן אמת ולתחזק את התיק השוטף תחת מנדט השקעה מוגדר.

אבל כאן מתחילה השאלה הכלכלית האמיתית: כמה עולה כל אחד מהמסלולים. בתודעה הציבורית, רבים מניחים כי ייעוץ בבנק הוא כמעט "חינם", או לפחות זול יותר מניהול תיק חיצוני. בפועל, התמונה מורכבת יותר. עלויות ההחזקה והמסחר בחשבון ניירות ערך בנקאי נוטות להיות גבוהות משמעותית לעומת בתי ההשקעה. לפי בדיקה שפורסמה בגלובס על בסיס נתוני אתר הבורסה, דמי הניהול או דמי המשמרת בחשבונות מסחר בבתי השקעה עמדו סביב 0.011%–0.013%, בעוד שבנקים הגדולים הנתונים שצוטטו הגיעו לכ-0.3% בלאומי ועד 0.466% בבינלאומי. במונחי מיליון שקל, המשמעות היא כ-100–200 שקל בשנה בבית השקעה לעומת כ-3,000–4,700 שקל בבנק, עוד לפני עמלות קנייה, מכירה והמרת מט"ח. גם בעמלות המסחר הפער נותר ניכר, אף כי קטן יותר.

מן העבר השני, שירות ניהול תיקים אינו מסתתר מאחורי מבנה עמלות עקיף. הוא גובה מחיר גלוי: דמי הניהול. לפי סקירה שפורסמה על בסיס הדוח השנתי של רשות ניירות ערך לשנת 2024, שיעור דמי הניהול הישירים הממוצע המשוקלל בענף ניהול התיקים עמד על כ-0.5% מהנכסים המנוהלים. באותה סקירה צוין כי בישראל פעלו בסוף 2024 כ-130 חברות בעלות רישיון לניהול תיקים, שניהלו יחד כ-416 מיליארד שקל עבור כ-89 אלף לקוחות, כאשר עשר החברות הגדולות ריכזו כ-73% מהנכסים המנוהלים בענף.

המספרים הללו מספרים סיפור כפול. מצד אחד, ניהול תיקים הוא כבר לא שירות נישתי לעשירים בלבד. כ-68.5% מהתיקים המנוהלים בישראל הם בהיקף של עד 1.5 מיליון שקל, וכ-30% מהתיקים אף נמוכים מחצי מיליון שקל. מצד שני, זו עדיין תעשייה מרוכזת יחסית, עם יתרון לגופים הגדולים ועם דגש חזק על לקוחות פרטיים וחברות, שמחזיקים יחד כ-54% מהנכסים המנוהלים.

גם במערכת הבנקאית ניכרת מגמה מעניינת: הייעוץ קיים, אך הוא הופך יותר ויותר לשירות המיועד ללקוחות עם תיק משמעותי יותר. דוח הבינה המלאכותית של הרגולטורים הפיננסיים בישראל מציין כי מספר החשבונות המיועצים בבנקים ירד מכ-453 אלף בשנת 2018 לכ-323 אלף בסוף 2023, בעוד שממוצע שווי החשבון המיועץ עלה מכ-656 אלף שקל ליותר ממיליון שקל. במקביל, מספר היועצים הפעילים בבנקים נותר סביב 1,200. המשמעות ברורה: הייעוץ הבנקאי לא נעלם, אבל הוא נוטה להתרכז בלקוחות גדולים יותר, בעוד חלקים רחבים יותר של הציבור נשארים עם управление עצמי, קרנות נאמנות או פתרונות דיגיטליים.

כאן בדיוק נכנסת השאלה למי מתאים כל מודל. הייעוץ הבנקאי מתאים בעיקר ללקוח שרוצה לשמור את הכסף "בתוך הבית", מעדיף מעורבות גבוהה, ומוכן לקבל המלצה אך לא לוותר על ההחלטה הסופית. זה מודל שמתאים ללקוחות מסודרים, סבלניים, כאלה שאינם מצפים לתגובה טקטית מיידית לכל שינוי בשוק. מנהל תיקים, לעומת זאת, מתאים יותר ללקוח שמבין כי המשאב החסר שלו הוא לא בהכרח ידע — אלא זמן, משמעת, ויכולת תפעול שוטפת. עבורו, דמי הניהול הם במידה רבה תשלום עבור outsourcing של קבלת ההחלטות.

ויש עוד נקודה אחת שהלקוח הישראלי נוטה לפספס: השוואה אמיתית אינה בין "בנק חינם" לבין "מנהל תיקים יקר", אלא בין עלות כוללת לעלות כוללת. אם לקוח משלם בבנק דמי משמרת גבוהים, עמלות קנייה ומכירה, מרווחי מט"ח, ובפועל גם לא מבצע שינויים בזמן או לא מקבל שירות צמוד, ייתכן שהמחיר האפקטיבי של המודל הבנקאי אינו נמוך כפי שנדמה. מנגד, אם הוא משלם 0.5% למנהל תיקים אך נהנה מניהול אקטיבי, משמעת השקעתית, התאמה שוטפת ושירות אישי, העלות עשויה להיות יקרה יותר נומינלית — אך ברורה יותר פונקציונלית.

התמונה הרחבה חשובה לא פחות. הציבור הישראלי מחזיק כיום תיק נכסים פיננסיים בהיקף עצום: כ-6.9 טריליון שקל נכון לרבעון השלישי של 2025, כאשר כ-2.32 טריליון שקל מוחזקים במזומן ופיקדונות, וכ-1.32 טריליון שקל בהשקעות בחו"ל. מתוך כלל הנכסים, כ-3.2 טריליון שקל מנוהלים בידי גופים מוסדיים. במילים אחרות, הישראלים מחזיקים יותר כסף, יותר נכסים, ויותר מורכבות פיננסית מאי פעם. דווקא במציאות הזו, ההחלטה אם להישאר בייעוץ בנקאי או לעבור לניהול תיק חיצוני הופכת להחלטת מבנה — לא רק להחלטת מחיר.

**השורה התחתונה פשוטה:**

מי שרוצה שליטה מלאה, נוחות בנקאית ומעורבות אישית גבוהה, ימצא לא פעם שהייעוץ הבנקאי עדיין מספק לו מסגרת סבירה — במיוחד אם הצליח לשפר את התעריפון. מי שמחפש управление שוטף, תגובה מקצועית רציפה, ומוכן לשלם עבור האצלת סמכות אמיתית, עשוי לגלות שמנהל תיקים הוא לא מותרות, אלא שירות יעיל.

בשוק שבו הבנקים ממשיכים להציג רווחיות גבוהה במיוחד גם על רקע ביקורת ציבורית על מבנה העמלות והתמחור, הלקוח הישראלי כבר לא יכול להרשות לעצמו להישאר אדיש. הבחירה בין ייעוץ בבנק לבין ניהול תיק חיצוני אינה שאלה של יוקרה. היא שאלה של מודל עבודה פיננסי — ושל מי באמת מנהל את הכסף שלך.`,
    date: 'מאי 2026',
    readTime: '8 דקות קריאה',
    author: 'אודי חברוני',
    image: articleInvestmentAdvisorImage
  },
  {
    id: '2',
    title: 'הגדרת לקוח כשיר: משקיע כשיר בישראל — גישה לעולם השקעות רחב, מדויק ומתוחכם יותר',
    summary: 'בעולם ההון המודרני, לא כל הזדמנות השקעה פתוחה בפני כלל הציבור. מיהו משקיע כשיר, מה התנאים לעמידה בהגדרה, ומה זה אומר בפועל עבור ניהול ההון שלך?',
    content: `בעולם ההון המודרני, לא כל הזדמנות השקעה פתוחה בפני כלל הציבור. לצד השוק הסחיר והמוכר, קיים רובד נוסף של אפשרויות השקעה — פרטי יותר, סלקטיבית יותר ולעיתים גם מורכב יותר — אשר מיועד, בהתאם לדין בישראל, למשקיעים העומדים בהגדרה של "משקיע כשיר" או "לקוח כשיר".

עבור רבים, המונח "משקיע כשיר" אינו רק סיווג טכני. זהו שער לעולם השקעות שבו נבחנות לעיתים הנפקות פרטיות, עסקאות מחוץ לשוק הציבורי, קרנות אלטרנטיביות ומבני השקעה מתקדמים יותר.

**מיהו משקיע כשיר?**

נכון לעדכונים החלים משנת 2025, יחיד עשוי להיחשב משקיע כשיר אם הוא עומד באחד משלושה מסלולים:

• נכסים נזילים בשווי העולה על 9,411,809 ₪
• הכנסה שנתית בכל אחת משתי השנים האחרונות העולה על 1,411,772 ₪ ליחיד, או 2,117,657 ₪ לתא משפחתי
• שילוב של נכסים נזילים בשווי העולה על 5,882,380 ₪ יחד עם הכנסה שנתית של לפחות 705,885 ₪ ליחיד

**מה מאפשר המעמד הזה בפועל?**

המעמד של משקיע כשיר עשוי לאפשר בחינה של אפיקי השקעה שאינם מוצעים בדרך כלל לציבור הרחב, לרבות השקעות פרטיות, קרנות אלטרנטיביות, עסקאות לא סחירות והשתתפות בתחוםות גיוס הון מסוימות.

**הגישה של WealthTech**

ב-WealthTech אנו רואים במשקיע הכשיר לא "קטגוריה", אלא אדם או משפחה שנמצאים בשלב מתקדם יותר של ניהול ההון. לכן, השאלה איננה רק האם הלקוח עומד בתנאים, אלא האם נכון עבורו לפעול במסגרת הזו.

בסופו של דבר, יוקרה פיננסית אמיתית אינה נמדדת רק בגישה לעסקאות שאחרים אינם רואים. היא נמדדת ביכולת לבחור נכון, לשלב נכון, ולהחזיק אסטרטגיה שמשרתת את ההון.

**חשוב לדעת:** האmor לעיל נועד למידע כללי בלבד ואינו מהווה ייעוץ השקעה.`,
    date: 'מאי 2026',
    readTime: '6 דקות קריאה',
    author: 'אודי חברוני',
    image: articleQualifiedInvestorImage
  },
  {
    id: '3',
    title: 'למה אסור להשאיר את ביטוח המשכנתא על אוטומט',
    summary: 'רוב הישראלים משקיעים שעות בהשוואת ריביות משכנתא, אבל מזניחים את ביטוח המשכנתא. זו טעות שעלולה לעלות לא מעט כסף לאורך שנים.',
    content: `רוב הישראלים מתייחסים לfra כאל המהלך הפיננסי הגדול של חייהם. הם משווים ריביות, בודקים מסלולים, מתמקחים עם הבנק, ולעיתים אפילו ממחזרים את ההלוואה בהמשך הדרך. אבל דווקא באחד המרכיבים הכי בסיסיים בעסקה כולה — ביטוח המשכנתא — רבים נוטים להתנהג אחרת לגמרי: לחתום, לאשר, ולעבור הלאה.

מבחינתם, זה עוד סעיף בדרך לקבלת המפתח.

בפועל, זו טעות שעשויה לעלות לא מעט כסף.

ביטוח משכנתא, שכולל בדרך כלל ביטוח חיים וביטוח מבנה, נתפס אצל לווים רבים כמוצר טכני, כמעט אוטומטי, כזה ש"עושים דרך הבנק וזהו". אלא שבניגוד למה שרבים חושבים, לא מדובר במוצר קבוע, לא במחיר קבוע, ולא במבנה שמתאים בהכרח לכל אורך חיי ההלוואה. מדובר במוצר ביטוחי לכל דבר — כזה שהמחיר שלו משתנה בין חברות, שהתנאים שלו מושפעים מנתוני הלקוח, ושלעיתים מצדיק בדיקה מחודשת ממש כמו שבודקים ריבית על משכנתא או עלויות ניהול השקעה.

**לא רק דרישה של הבנק — אלא הגנה על המשפחה**

כדי להבין למה אסור להשאיר את הביטוח על טייס אוטומטי, צריך להתחיל מהבסיס. ביטוח משכנתא מורכב בדרך כלל משני חלקים מרכזיים: ביטוח חיים לfra וביטוח מבנה.

ביטוח החיים נועד להבטיח שבמקרה של פטירתfra, יתרת החוב לבנק תיפרע על ידי חברת הביטוח. המשמעות ברורה: המשפחה אינה נותרת גם עם אובדן אישי וגם עם התחייבות כבדה שעלולה לערער את היציבות הכלכלית שלה. ביטוח המבנה, מנגד, נועד להגן על הנכס עצמו מפני נזקים מהותיים כמו שריפה או רעידת אדמה. מבחינת הבנק, זו הגנה על הבטוחה. מבחינת המשפחה, זו הגנה על הבית.

במילים אחרות, ביטוח המשכנתא לא נועד רק לשרת את הגוף המממן. הוא אמור להוות שכבת הגנה קריטית על התא המשפחתי בדיוק ברגעים שבהם היציבות הפיננסית עלולה להיסדק.

**הבעיה מתחילה ברגע החתימה**

הכשל המרכזי הוא שהרבה לווים רוכשים את הביטוח בדיוק ברגע שבו יש להם הכי מעט פנאי להעמיק בו: ביום שבו הם רצים בין מסמכים, חתימות, אישורים ותיאומים מול הבנק, עורך הדין והמוכר. בתוך כל הלחץ הזה, ההצעה לביטוח שמגיעה "כחלק מהתהליך" נראית נוחה, לגיטימית, ולעיתים גם מספיקה.

אבל הנוחות הזו עלולה להיות יקרה.

הצרכן הישראלי אינו חייב לרכוש את ביטוח המשכנתא דרך הבנק. הוא רשאי לבחור כל חברת ביטוח רלוונטית, כל עוד הפוליסה עומדת בדרישות הבנק. רשות שוק ההון אף מפעילה מחשבונים ייעודיים להשוואת תעריפי ביטוח חיים וביטוח דירה, מה שמעיד עד כמה ההנחה שהביטוח הוא "מוצר סגור" פשוט אינה נכונה.

המשמעות פשוטה: מי שלא משווה, עלול לשלם יותר. לא בגלל שהוא קיבל מוצר טוב יותר, אלא פשוט כי הוא לא בדק.

**fra משתנה. גם הביטוח צריך להשתנות**

אחת הבעיות הפחות מדוברות היא שלוםים נוטים להתייחס לביטוח המשכנתא כאילו הוא חלק קבוע מההלוואה, בזמן שבפועל המשכנתא עצמה משתנה לא מעט לאורך השנים. יתרת החוב יורדת, מסלולים מתחלפים, זוגות מתחתנים, מביאים ילדים, מחליפים עבודה, משפרים הכנסה, ולעיתים גם ממחזרים את המשכנתא לחלוטין.

והנה הנתון שממחיש עד כמה זה כבר לא מקרה חריג: לפי בנק ישראל, בשנת 2025 מוחזרו בישראל כ-69 אלף משכנתאות, בהיקף מצטבר של כ-43.6 מיליארד ש"ח — כ-7% מתיק המשכנתאות של המערכת הבנקאית.

כלומר, שוק המשכנתאות בישראל רחוק מלהיות סטטי. אם ההלוואה משתנה, אין שום היגיון כלכלי להשאיר את הביטוח כאילו הזמן עצר מלכת.

במקרים רבים, לווים ממשיכים לשלם פרמיה שנקבעה בתנאים שהיו רלוונטיים בתחילת הדרך, גם כאשר בפועל יתרת החוב כבר נמוכה משמעותית, או כאשר קיימות בשוק חלופות תחרותיות וזולות יותר. לעיתים מדובר בפער חודשי לא דרמטי, אבל לאורך 15, 20 או 25 שנה — פער כזה מצטבר לסכומים מהותיים.

**הבדיקה עצמה פשוטה יותר ממה שחושבים**

בנקודה הזו חשוב לנפץ עוד מיתוס: בדיקה מחודשת של ביטוח המשכנתא אינה מהלך מורכב במיוחד. דווקא משום שמדובר במוצר סטנדרטי יחסית, ניתן לבצע השוואה מסודרת, לבחון אם סכום הביטוח עדיין מתאים ליתרת ההלוואה, לבדוק אם התנאים עדיין תחרותיים, ולוודא שהפוליסה הקיימת אכן משרתת את מטרתה.

זה נכון במיוחד בכמה נקודות זמן ברורות: בעת מחזור משכנתא, לאחר פירעון חלקי משמעותי, אחת לכמה שנים, או בכל שינוי משפחתי וכלכלי מהותי.

לווים רבים משקיעים שעות ארוכות בהתמקחת על עשיריות אחוז בריבית — ובצדק. אבל לעיתים הם מזניחים מוצר נלווה שיכול לייצר חיסכון מצטבר מהותי לא פחות.

**הפיתוי הוא לדחות. המחיר הוא לשלם סתם**

כמו הרבה מוצרים פיננסיים, גם ביטוח משכנתא סובל מבעיה קלאסית של אדישות צרכנית. הוא יורד בהוראת קבע, לא מורגש במיוחד, ואינו מייצר "אירוע" שמכריח את הלקוח להתעורר. דווקא לכן קל כל כך להזניח אותו.

אבל בעולם שבו יוקר המחיה לוחץ, הריביות משתנות, וההוצאה החודשית של משקי הבית נמצאת תחת לחץ מתמשך, אין סיבה אמיתית לשלם במשך שנים על מוצר שלא נבדק מחדש.

יתרת החוב של משקי הבית בישראל המשיכה לעלות גם בשנת 2025, והגיעה לכ-903 מיליארד ש"ח ברבעון הרביעי, נתון שממחיש עד כמה האשראי לדיור נותר רכיב כבד ומרכزي במאזן המשפחתי. במציאות כזו, כל רכיב נלווה לfra — ובוודאי רכיב ביטוחי — ראוי לבחינה מחודשת ולא להתנהלות אוטומטית.

**השורה התחתונה**

ביטוח משכנתא הוא לא סעיף טכני. הוא לא "עוד משהו שצריך בשביל הבנק". והוא בהחלט לא מוצר שכדאי לשכוח ממנו לעשרים שנה.

זהו מנגנון הגנה מהותי, אבל גם הוצאה מתמשכת. וכמו כל הוצאה מתמשכת בעולם הפיננסי, גם אותה צריך לנהל — לא רק לשלם.

מי שבודק, משווה ומעדכן, עשוי לחסוך כסף ולשפר את ההתאמה של הביטוח לצרכיו בפועל. מי שלא בודק, מסתכן בכך שהוא פשוט ממשיך לשלם — כי התרגל.

---

**הבהרה / גילוי נאות**
המידע המופיע בכתבה זו נועד לצורכי מידע כללי בלבד, ואין לראות בו ייעוץ ביטוחי, ייעוץ פנסיוני, שיווק ביטוח, ייעוץ מס או תחליף לייעוץ מקצועי המתחשב בנתונים ובצרכים הייחודיים של כל אדם. כל החלטה לגבי ביטוח משכנתא, שינוי פוליסה, החלפת חברה או התאמת כיסוי צריכה להיעשות לאחר בחינה פרטנית והתייעצות עם בעל רישיון מתאים. הכותב ו/או המערכת אינם נושאים באחריות לכל נזק או הפסד שייגרם כתוצאה מהסתמכות על האמור.`,
    date: 'מאי 2026',
    readTime: '10 דקות קריאה',
    author: 'אודי חברוני',
    image: articleMortgageInsuranceImage
  },
  {
    id: '4',
    title: 'עושים סדר בכסף המשפחתי: למה יותר ויותר משפחות עוצרות — ומתחילות לנהל נכון',
    summary: 'בעולם שבו משפחות מנהלות במקביל פנסיה, ביטוחים, חסכונות והשקעות — התחושה הרווחת היא לא בהכרח חוסר, אלא בלבול. יש כסף. יש מוצרים. אבל אין תמיד תמונה אחת ברורה.',
    content: `בעולם שבו משפחות מנהלות במקביל פנסיה, ביטוחים, חסכונות והשקעות — התחושה הרווחת היא לא בהכרח חוסר, אלא בלבול.

יש כסף. יש מוצרים. יש החלטות שנעשו לאורך השנים.
אבל אין תמיד תמונה אחת ברורה שמחברת את הכל.

לדברי אודי חברוני, מנכ"ל וולת'טק ומומחה לניהול הון משפחתי, זו בדיוק הנקודה שבה מתחילה הבעיה:

"רוב המשפחות לא באמת יודעות איך הכסף שלהן בנוי. יש פיזור רחב — אבל אין שליטה. וברגע שאין שליטה, קשה מאוד לקבל החלטות נכונות."

**לא רק כמה מרוויחים — אלא איך מנהלים**

במיוחד בקרב שכירים ובכירים, הפער בין רמת ההכנסה לבין רמת הניהול בפועל הולך וגדל.

"אני פוגש אנשים עם הכנסות גבוהות מאוד, אבל עם מבנה פיננסי לא יעיל," מסביר חברוני.
"זה מתבטא בכפילויות ביטוח, רמת סיכון לא מותאמת, ולעיתים גם בהחמצת הזדמנויות השקעה."

לדבריו, אחת הטעויות המרכזיות היא התנהלות "על אוטומט":

"פותחים מוצר פיננסי — ומשאירים אותו שנים. אבל החיים משתנים, והניהול צריך להשתנות יחד איתם."

**תהליך קצר שמייצר שינוי אמיתי**

מתוך ההבנה הזו נבנתה סדנה ממוקדת לתכנון פיננסי למשפחה, שמטרתה לייצר סדר, בהירות ושליטה — בתוך פרק זמן קצר.

הסדנה בנויה משלושה מפגשים בלבד, כאשר כל מפגש מתמקד באחד המרכיבים המרכזיים של ניהול פיננסי נכון.

**מעבר לידע — שינוי בגישה**

הסדנה אינה מתמקדת רק בהסברים טכניים, אלא בעיקר בגישה רחבה יותר לניהול פיננסי.

"המטרה היא לא רק לתת מידע, אלא לשנות את האופן שבו אנשים חושבים על כסף," אומר חברוני.
"כשיש הבנה אמיתית של התמונה הכוללת — קבלת ההחלטות הופכת להרבה יותר מדויקת."

הפורמט הקבוצתי מאפשר למשתתפים להיחשף לשאלות אמיתיות, תרחישים שונים ותובנות רחבות יותר, מעבר למקרה הפרטי שלהם.

**למי זה מתאים?**

הסדנה מיועדת למשפחות, שכירים ובכירים, וכן לעצמאים — בעיקר כאלה שמרגישים שההתנהלות הפיננסית שלהם אינה ממוצה.

"זה לא משנה אם יש לכם הרבה כסף או פחות — אם אין סדר, אין שליטה," מדגיש חברוני.
"והשליטה היא הבסיס לכל תכנון נכון."

**השקעה קטנה, השפעה ארוכת טווח**

בעלות של 1,500 ₪ בלבד לשלושת המפגשים, הסדנה מציעה כניסה לעולם של תכנון פיננסי מקצועי — בצורה נגישה וישימה.

"זו לא הוצאה — זו החלטה," מסכם חברוני.
"ברגע שמתחילים להבין את המערכת, כל ההתנהלות משתנה."`,
    date: 'מאי 2026',
    readTime: '5 דקות קריאה',
    author: 'אודי חברוני',
    image: articleFamilyFinanceImage,
    hasLeadForm: true,
    flyerImage: workshopFamilyFinanceImage
  },
  {
    id: '5',
    title: 'לא רק גדר חיה: המסע אל מאחורי הקלעים של קרנות הגידור',
    summary: 'מדריך למתחילים: מהן קרנות גידור, איך הן עובדות, ולמה הן הפכו לנגישות יותר גם למשקיע הישראלי.',
    content: `תארו לעצמכם שאתם מטפחים גינה מרהיבה. השקעתם בה זמן, מחשבה ולא מעט משאבים, אבל אז מגיעה סערה בלתי צפויה – גשם שוטף או שמש יוקדת – ומאיימת להרוס הכל. כדי להגן על העבודה הקשה שלכם, אתם מקימים גדר חיה (Hedge) שתספוג את המכות ותשמור על הצמחים שלכם מוגנים.

בעולם הפיננסים, ה"גינה" היא הכסף שלכם, והגדר הזו היא בדיוק מה שמעניק לקרנות הגידור את שמן. הן לא כאן רק כדי "לשחק" בשוק ההון; הן כאן כדי לבנות אסטרטגיה חכמה שמאפשרת להן להמשיך לצמוח גם כשהשוק סוער.

**המוח שמאחורי המגן: הגננים הפיננסיים**

בבסיסה, קרן גידור היא מאגר כספים שמנוהל על ידי מנהלי השקעות מיומנים. בניגוד לניהול השקעות מסורתי, המנהלים הללו הם לא רק פסיביים; הם הנהגים של רכב שטח עוצמתי שיודע לנסוע גם בדרכים עקלקלות.

הם לא מסתפקים בלקנות מניות של חברות גדולות ולחכות עשור. הם מחפשים עיוותים בשוק, מזהים חברות שנמצאות בצרות כדי להרוויח מהירידה שלהן, או משקיעים באירועים מיוחדים כמו מיזוגים ורכישות. התפקיד שלהם הוא להשתמש ביצירתיות כדי לייצר תשואה עודפת, גם כשהשוק הכללי דורך במקום.

**ארגז הכלים: להרוויח מכל הכיוונים**

הקסם האמיתי של קרן הגידור טמון ביכולת שלה "לגדר" את עצמה. בעוד שמשקיע רגיל לרוב קונה מניה ומקווה שהיא תעלה (אסטרטגיית "Long"), קרנות הגידור משתמשות בטכניקות כמו:

• **שורט (Short):** הימור על ירידת ערך של נכס. כך, אם השוק קורס, הקרן יכולה למעשה להרוויח מהירידות ולאזן את ההפסדים משאר התיק.

• **מינוף:** שימוש בכסף שלווו מהבנק כדי להגדיל את עוצמת ההשקעה (ובכך גם את פוטנציאל הרווח, אך גם את הסיכון).

• **ארביטראז':** ניצול פערי מחירים קטנים בין שווקים שונים בעולם.

**המהפכה הישראלית: הנגשת ה"קודש פנימה"**

בעבר, עולם קרנות הגידור היה שמור רק למי שיכול היה להרפרד מסכומי עתק של מיליוני שקלים ו"לנעול" אותם לתקופות ארוכות. זו הייתה טריטוריה למשקיעים כשירים בלבד. אבל כאן בישראל, השוק עבר אבולוציה משמעותית.

כיום קיימים מוצרים מתוחכמים כמו **קרן גידור בנאמנות**. זהו פתרון היברידי: מצד אחד, מקבלים את ה"שכל" והאסטרטגיה של קרן גידור קלאסית. מצד שני, המבנה הוא של קרן נאמנות, מה שמביא איתו בשורה ענקית: **סחירות חודשית**. בניגוד לקרנות מסורתיות שבהן הכסף עשוי להיות סגור לשנים, כאן ניתן להיכנס ולצאת מההשקעה אחת לחודש. זה הופך את הגידור לנגיש יותר, שקוף יותר וגמיש עבור תיק ההשקעות המודרני.

**שותפות גורל: מודל ה-2/20**

מה שמפריד את מנהלי קרנות הגידור משאר עולם ההשקעות הוא מודל התגמול הייחודי, הידוע כ-"2 ו-20".

• **2% דמי ניהול:** נועדו לתפעול השוטף, למחקר ולמערכות טכנולוגיות מתקדמות.

• **20% דמי הצלחה:** כאן טמון הלב של המודל. המנהל מקבל נתח מהרווחים רק אם הוא אכן ייצר רווח מעל רף מסוים (לעיתים עם מנגנון "High Water Mark" שמוודא שהוא לא מקבל עמלה על רווח שרק מפצה על הפסדי עבר).

המשמעות פשוטה: המנהל יושב באותה סירה איתכם. אם אתם מרוויחים, הוא מרוויח. אם לא – הוא לא.

**פחות רגולציה, יותר חופש (וסיכון)**

חשוב להבין שחופש הפעולה של קרנות הגידור נובע מכך שהן פועלות תחת פחות מגבלות רגולטוריות בהשוואה לקרנות פנסיה או קרנות נאמנות רגילות. זה מאפשר להן להיות מהירות, חדות ונועזות, אך זה גם אומר שהן יכולות לשאת סיכונים גבוהים יותר. הן אינן מתאימות למי שמחפש "נמל מבטחים" שקט וסטטי, אלא למי שמבין את הדינמיקה של השוק ומחפש מנהל שיודע לנווט בתוך הסערה.

**האם זה מתאים לגינה שלכם?**

בשורה התחתונה, קרן גידור היא לא עוד מוצר השקעה גנרי. היא כלי להגדלת העושר דרך אסטרטגיות ייחודיות וניהול סיכונים אקטיבי. עם הכניסה של מוצרים נזילים יותר לשוק הישראלי, האפשרות לגוון את התיק ולהוסיף לו "שכבת הגנה" מתוחכמת הפכה לזמינה מאי פעם.

לפני שנכנסים, כדאי לזכור: המפתח הוא לא רק לרדוף אחרי התשואה, אלא להבין איך הקרן הזו מתחברת לשאר הגינה שלכם. האם היא הגדר שתגן עליכם בסערה הבאה?

---

**גילוי נאות**
האמור אינו תחליף לייעוץ השקעות אישי המתחשב בצורכי הלקוח, נתוניו, צרכיו, מצבו הכספי, נסיבות ומטרות השקעתו המיוחדות.`,
    date: 'מאי 2026',
    readTime: '8 דקות קריאה',
    author: 'אודי חברוני',
    image: articleHedgeFundsImage
  }];

  const handleWorkshopSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    setWorkshopSubmitting(true);
    try {
      const { error } = await supabase.from('leads').insert({
        name: workshopForm.name,
        phone: workshopForm.phone,
        email: workshopForm.email,
        source: 'workshop_family_finance',
        notes: 'הרשמה לסדנת תכנון פיננסי למשפחה'
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

  const pressArticles: PressArticle[] = [
  {
    id: 'press-1',
    title: 'הטבת הפנסיה על הכוונת',
    summary: 'כתבה על המלצות הוועדה לשוק החיסכון הפנסיוני.',
    source: 'Ynet',
    sourceUrl: 'https://www.ynet.co.il/economy/article/yokra14816785',
    date: 'יוני 2026',
    author: 'גד ליאור'
  }];


  const filteredVideos = activeTab === 'all' || activeTab === 'videos' ? videos : [];
  const showPodcasts = activeTab === 'all' || activeTab === 'podcasts';
  const filteredArticles = activeTab === 'all' || activeTab === 'articles' ? articles : [];
  const showPress = activeTab === 'all' || activeTab === 'press';
  const filteredPress = showPress ? pressArticles : [];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div data-ev-id="ev_f29efa199e" className="min-h-screen bg-surface font-sans">
      {/* Navigation */}
      <nav data-ev-id="ev_20d9cec14b" className="fixed top-0 right-0 left-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div data-ev-id="ev_5d320fe5dc" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_4fa92178ec" className="flex justify-between items-center h-20">
            <Logo />
            
            <div data-ev-id="ev_977fe5f0c5" className="hidden xl:flex items-center gap-4 2xl:gap-7 text-[15px] 2xl:text-base">
              <Link to="/" className="text-ink-muted hover:text-ink transition-colors font-medium">ראשי</Link>
              <Link to="/#about" className="text-ink-muted hover:text-ink transition-colors font-medium">אודות</Link>
              <Link to="/products" className="text-ink-muted hover:text-ink transition-colors font-medium">מוצרים</Link>
              <Link to="/media" className="text-gold font-medium">מדיה</Link>
              <Link to="/links" className="text-ink-muted hover:text-ink transition-colors font-medium">קישורים</Link>
              <a data-ev-id="ev_76f1c08566"
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

            <button data-ev-id="ev_4e2749cdcf"
            className="xl:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen &&
        <div data-ev-id="ev_e80475717e" className="xl:hidden bg-surface border-t border-border">
            <div data-ev-id="ev_b1196b7ba7" className="px-4 py-4 flex flex-col gap-4">
              <Link to="/" className="text-ink-muted hover:text-ink font-medium py-2">ראשי</Link>
              <Link to="/products" className="text-ink-muted hover:text-ink font-medium py-2">מוצרים</Link>
              <Link to="/media" className="text-gold font-medium py-2">מדיה</Link>
              <Link to="/links" className="text-ink-muted hover:text-ink font-medium py-2">קישורים</Link>
              <a data-ev-id="ev_e7fcd50984"
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
      <section data-ev-id="ev_f6ceb18e8c" className="relative pt-32 pb-20 hero-tech overflow-hidden">
        <div data-ev-id="ev_86ccad35e1" className="absolute inset-0">
          <div data-ev-id="ev_9ec9552ae2" className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl"></div>
          <div data-ev-id="ev_806b9e10b3" className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl"></div>
        </div>
        
        <div data-ev-id="ev_22104d4494" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div data-ev-id="ev_988c2eb93d" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Play className="w-4 h-4 text-gold" />
            <span data-ev-id="ev_ce868be801" className="text-white/90 text-sm">תוכן מקצועי ועדכני</span>
          </div>
          
          <h1 data-ev-id="ev_a2be7599be" className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance">
            מרכז המדיה
            <span data-ev-id="ev_b063687f5c" className="block text-gold">של WealthTech</span>
          </h1>
          
          <p data-ev-id="ev_6c9ca6d6f8" className="text-lg text-white/80 max-w-2xl mx-auto text-pretty">
            ראיונות, פודקאסטים וסרטוני וידאו על עולם הפיננסים, השקעות ותכנון כלכלי. 
            תוכן מקצועי ועדכני מאודי חברוני וצוות המומחים של WealthTech.
          </p>
        </div>
        
        <div data-ev-id="ev_f184582057" className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-2 to-transparent"></div>
      </section>

      {/* Logo Marquee */}
      <LogoMarquee />

      {/* Tabs */}
      <section data-ev-id="ev_67fbe05c80" className="sticky top-20 z-40 bg-surface-2 border-b border-border">
        <div data-ev-id="ev_4fb7a02f56" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_d15c4ded40" className="flex gap-2 py-4 overflow-x-auto">
            {tabs.map((tab) =>
            <button data-ev-id="ev_7b7c2acb4d"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all whitespace-nowrap ${
            activeTab === tab.id ?
            'bg-navy text-white' :
            'bg-surface text-ink-muted hover:bg-surface/80 border border-border'}`
            }>
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section data-ev-id="ev_8d5b216ae3" className="py-12 bg-surface-2">
        <div data-ev-id="ev_d5eb45602f" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Videos Section */}
          {filteredVideos.length > 0 &&
          <div data-ev-id="ev_10ec1ad23d" className="mb-10 lg:mb-16">
              <div data-ev-id="ev_e97f1d0eb4" className="flex items-center gap-3 mb-8">
                <div data-ev-id="ev_e71f4948d9" className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center">
                  <Youtube className="w-5 h-5 text-gold" />
                </div>
                <h2 data-ev-id="ev_6187d4bfa4" className="text-2xl font-bold text-ink">סרטוני וידאו</h2>
              </div>
              
              <div data-ev-id="ev_9678434a8d" className="grid md:grid-cols-2 gap-6">
                {filteredVideos.map((video) =>
              <div data-ev-id="ev_5b9dfded28"
              key={video.id}
              className="bg-surface rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow group">
                    <div data-ev-id="ev_71a28784c8"
                className="relative h-56 overflow-hidden cursor-pointer"
                onClick={() => setSelectedVideo(video)}>

                      <img data-ev-id="ev_c21bdc6b67"
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div data-ev-id="ev_cd251d576a" className="absolute inset-0 bg-navy/30 flex items-center justify-center group-hover:bg-navy/40 transition-colors">
                        <div data-ev-id="ev_bd85ace4e8" className="w-16 h-16 bg-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-7 h-7 text-ink mr-[-2px]" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    
                    <div data-ev-id="ev_75d88494ec" className="p-6">
                      <h3 data-ev-id="ev_5197df3d2d"
                  className="text-lg font-bold text-ink mb-2 group-hover:text-gold transition-colors cursor-pointer"
                  onClick={() => setSelectedVideo(video)}>

                        {video.title}
                      </h3>
                      <p data-ev-id="ev_b379ee1549" className="text-ink-muted text-sm mb-4">{video.description}</p>
                      
                      <div data-ev-id="ev_1962528914" className="flex items-center justify-between">
                        <div data-ev-id="ev_7e3a4320ce" className="flex items-center gap-2 text-xs text-ink-muted">
                          <Calendar className="w-3.5 h-3.5" />
                          <span data-ev-id="ev_d3617ddd77">{video.date}</span>
                        </div>
                        <ShareButtons title={video.title} articleId={`video-${video.id}`} variant="compact" />
                      </div>
                    </div>
                  </div>
              )}
              </div>
            </div>
          }

          {/* Articles Section */}
          {filteredArticles.length > 0 &&
          <div data-ev-id="ev_e5e40d5481" className="mb-10 lg:mb-16">
              <div data-ev-id="ev_c0e654db9f" className="flex items-center gap-3 mb-8">
                <div data-ev-id="ev_332e02986c" className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center">
                  <Newspaper className="w-5 h-5 text-gold" />
                </div>
                <h2 data-ev-id="ev_5e1b7e4079" className="text-2xl font-bold text-ink">כתבות ומאמרים</h2>
              </div>
              
              <div data-ev-id="ev_30e686bb73" className="flex flex-col gap-6">
                {filteredArticles.map((article) => {
                const isExpanded = expandedArticle === article.id;
                return (
                  <div data-ev-id="ev_a25b962a4e"
                  key={article.id}
                  className="bg-surface rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow">

                      {article.image &&
                    <div data-ev-id="ev_adbbc620ad" className="relative h-64 md:h-80 overflow-hidden">
                          <img data-ev-id="ev_24fb270dce"
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover" />

                        </div>
                    }

                      <div data-ev-id="ev_d6700242b2" className="p-6 md:p-8">
                        <div data-ev-id="ev_59968b8b86" className="flex items-start justify-between gap-4 mb-4">
                          <div data-ev-id="ev_01d95b3c65" className="flex-1">
                            <h3 data-ev-id="ev_64591f488e" className="text-xl md:text-2xl font-bold text-ink mb-2 leading-tight">
                              {article.title}
                            </h3>
                            <div data-ev-id="ev_3d52255653" className="flex flex-wrap items-center gap-4 text-sm text-ink-muted">
                              <span data-ev-id="ev_28cf6a1abd" className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {article.date}
                              </span>
                              <span data-ev-id="ev_e53d44301f" className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {article.readTime}
                              </span>
                              <span data-ev-id="ev_da57f62f92" className="text-gold font-medium">{article.author}</span>
                            </div>
                          </div>
                          <ShareButtons title={article.title} articleId={article.id} variant="compact" />
                        </div>
                        
                        <p data-ev-id="ev_24e96e79dc" className="text-ink-muted text-lg leading-relaxed mb-4">
                          {article.summary}
                        </p>
                        
                        {isExpanded &&
                      <div data-ev-id="ev_8f854f65e3" className="border-t border-border pt-6 mt-4">
                              <div data-ev-id="ev_5dd9529eae" className="prose prose-lg max-w-none text-ink-muted leading-relaxed whitespace-pre-line">
                                {article.content}
                              </div>
                              
                              {article.hasLeadForm &&
                        <div data-ev-id="ev_fccd0ed22e" className="mt-10 panel-accent rounded-2xl p-6 sm:p-8 text-white">
                                  <div data-ev-id="ev_addb6d25c3" className="grid md:grid-cols-2 gap-8 items-center">
                                    {article.flyerImage &&
                            <div data-ev-id="ev_33a5d6853c" className="rounded-xl overflow-hidden shadow-2xl">
                                        <img data-ev-id="ev_9b2af80839" src={article.flyerImage} alt="סדנת תכנון פיננסי למשפחה" className="w-full h-auto" />
                                      </div>
                            }
                                    <div data-ev-id="ev_16a699d645">
                                      <h4 data-ev-id="ev_c3a1a66f40" className="text-2xl font-bold text-gold mb-4">מעוניינים להשתתף? השאירו פרטים</h4>
                                      <p data-ev-id="ev_96173db726" className="text-white/80 mb-6">מלאו את הפרטים ונחזור אליכם עם כל המידע על הסדנה</p>
                                      {workshopSubmitted ?
                              <div data-ev-id="ev_18d971f589" className="bg-green-500/20 border border-green-400 rounded-xl p-6 text-center">
                                          <div data-ev-id="ev_c8970411a6" className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-white" /></div>
                                          <h5 data-ev-id="ev_ca8e247ca8" className="text-xl font-bold text-white mb-2">תודה! קיבלנו את הפרטים</h5>
                                          <p data-ev-id="ev_1c7eae4165" className="text-white/80">נחזור אליכם בהקדם</p>
                                        </div> :

                              <form data-ev-id="ev_467c09d933" onSubmit={handleWorkshopSubmit} className="flex flex-col gap-4">
                                          <input data-ev-id="ev_6aeed00a68" type="text" placeholder="שם מלא" value={workshopForm.name} onChange={(e) => setWorkshopForm((prev) => ({ ...prev, name: e.target.value }))} required className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-gold" />
                                          <input data-ev-id="ev_15957d3acd" type="tel" placeholder="טלפון" value={workshopForm.phone} onChange={(e) => setWorkshopForm((prev) => ({ ...prev, phone: e.target.value }))} required className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-gold" />
                                          <input data-ev-id="ev_c3a7dc497b" type="email" placeholder="אימייל" value={workshopForm.email} onChange={(e) => setWorkshopForm((prev) => ({ ...prev, email: e.target.value }))} required className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-gold" />
                                          <button data-ev-id="ev_17f28d2825" type="submit" disabled={workshopSubmitting} className="w-full bg-gold hover:bg-gold-light text-navy-dark font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                                            {workshopSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" />שולח...</> : 'שלחו לי פרטים'}
                                          </button>
                                        </form>
                              }
                                    </div>
                                  </div>
                                </div>
                        }
                              
                              <div data-ev-id="ev_f6b08dd94b" className="mt-8 pt-6 border-t border-border">
                                <ShareButtons title={article.title} articleId={article.id} />
                              </div>
                            </div>
                      }
                        
                        <button data-ev-id="ev_698edef94d"
                      onClick={() => setExpandedArticle(isExpanded ? null : article.id)}
                      className="flex items-center gap-2 text-gold hover:text-gold-light font-medium mt-4 transition-colors">
                          {isExpanded ?
                        <>
                              <span data-ev-id="ev_9edcf03628">סגור</span>
                              <ChevronUp className="w-5 h-5" />
                            </> :
                        <>
                              <span data-ev-id="ev_b7e230ff60">קרא את המאמר המלא</span>
                              <ChevronDown className="w-5 h-5" />
                            </>
                        }
                        </button>
                      </div>
                    </div>);
              })}
              </div>
            </div>
          }

          {/* Press Coverage Section */}
          {filteredPress.length > 0 &&
          <div data-ev-id="ev_5109ffd2ff" className="mb-10 lg:mb-16">
              <div data-ev-id="ev_740481dfa7" className="flex items-center gap-3 mb-8">
                <div data-ev-id="ev_5ea986c9fc" className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center">
                  <Newspaper className="w-5 h-5 text-gold" />
                </div>
                <h2 data-ev-id="ev_6400ba91db" className="text-2xl font-bold text-ink">כתבות כלכליות חשובות בתחום החיסכון המשפחתי</h2>
              </div>
              
              <div data-ev-id="ev_baed9551c1" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPress.map((article) =>
              <a data-ev-id="ev_77bd29ee91"
              key={article.id}
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-surface rounded-2xl border border-border hover:shadow-lg transition-all overflow-hidden">

                    <div data-ev-id="ev_3e74ba795d" className="p-6">
                      <div data-ev-id="ev_f95a5faa0e" className="flex items-center flex-wrap gap-2 mb-3">
                        <span data-ev-id="ev_ca7f446736" className="px-3 py-1 bg-red-500/15 text-red-400 text-xs font-medium rounded-full">
                          {article.source}
                        </span>
                        <span data-ev-id="ev_5bf7f422a6" className="text-ink-muted text-xs">{article.date}</span>
                        {article.author &&
                    <span data-ev-id="ev_f8061b8d92" className="text-ink-muted text-xs">| {article.author}</span>
                    }
                      </div>
                      <h3 data-ev-id="ev_b78665f8bf" className="text-lg font-bold text-ink mb-3 group-hover:text-gold transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p data-ev-id="ev_291b0bf509" className="text-ink-muted text-sm mb-4 line-clamp-3">
                        {article.summary}
                      </p>
                      <div data-ev-id="ev_cb8c565e53" className="flex items-center gap-2 text-gold font-medium text-sm">
                        <span data-ev-id="ev_b8df6c605a">קראו את הכתבה המלאה</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </a>
              )}
              </div>
            </div>
          }

          {/* Podcasts Section */}
          {showPodcasts &&
          <div data-ev-id="ev_43e96a5b22" className="mb-10 lg:mb-16">
              <div data-ev-id="ev_8fc9923029" className="flex items-center gap-3 mb-8">
                <div data-ev-id="ev_6383d6cbf5" className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center">
                  <Mic2 className="w-5 h-5 text-gold" />
                </div>
                <h2 data-ev-id="ev_861dc3221b" className="text-2xl font-bold text-ink">הפודקאסטים שלנו</h2>
              </div>
              
              <div data-ev-id="ev_83c470597e" className="grid md:grid-cols-2 gap-8">
                {/* Podcast 1 - השוק הפיננסי */}
                <div data-ev-id="ev_cb9be097e7" className="panel-accent rounded-3xl p-6">
                  <div data-ev-id="ev_9f90c1dfa9" className="bg-white/10 backdrop-blur-sm rounded-2xl p-5">
                    <div data-ev-id="ev_e11e606779" className="text-center mb-4">
                      <h3 data-ev-id="ev_d41f8073ab" className="text-xl font-bold text-white mb-2">השוק הפיננסי</h3>
                      <p data-ev-id="ev_b4bd042fc1" className="text-white/70 text-sm mb-3">
                        הפודקאסט המוביל בישראל לנושאי פיננסים, השקעות ותכנון כלכלי.
                      </p>
                      <a data-ev-id="ev_3dc4f02ccb"
                    href="https://open.spotify.com/show/6m09j6yOBIF2cjpp3yCYeF"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-medium text-sm">
                        <span data-ev-id="ev_7daf14d5f7">עקבו בספוטיפיי</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <iframe data-ev-id="ev_f66f821708"
                  style={{ borderRadius: '12px' }}
                  src="https://open.spotify.com/embed/show/6m09j6yOBIF2cjpp3yCYeF?utm_source=generator&theme=0"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy" />
                  </div>
                </div>

                {/* Podcast 2 - פודקאסט נוסף */}
                <div data-ev-id="ev_a038ecb6c5" className="panel-accent rounded-3xl p-6">
                  <div data-ev-id="ev_b456854cb5" className="bg-white/10 backdrop-blur-sm rounded-2xl p-5">
                    <div data-ev-id="ev_77625e7693" className="text-center mb-4">
                      <h3 data-ev-id="ev_579642a830" className="text-xl font-bold text-white mb-2">פודקאסט ההשקעות של Pioneer Wealth Management</h3>
                      <p data-ev-id="ev_c1a9da1f80" className="text-white/70 text-sm mb-3">
                        סקירה שבועית על מצב השווקים המקומיים והגלובליים.
                      </p>
                      <a data-ev-id="ev_470c0f7f95"
                    href="https://open.spotify.com/show/5mV35KeXzMp6KOm4K4cbRb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-medium text-sm">
                        <span data-ev-id="ev_573f4c8837">עקבו בספוטיפיי</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <iframe data-ev-id="ev_a2db300b61"
                  style={{ borderRadius: '12px' }}
                  src="https://open.spotify.com/embed/show/5mV35KeXzMp6KOm4K4cbRb?utm_source=generator&theme=0"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          }

          {/* Newsletter */}
          <div data-ev-id="ev_f7100318fb" className="bg-surface rounded-3xl p-6 sm:p-8 md:p-12 border border-border">
            <div data-ev-id="ev_53cab07cde" className="max-w-2xl mx-auto text-center">
              <h2 data-ev-id="ev_123a783873" className="text-2xl md:text-3xl font-bold text-ink mb-4">
                הישארו מעודכנים
              </h2>
              <p data-ev-id="ev_b0d1ee182d" className="text-ink-muted mb-8">
                הירשמו לניוזלטר שלנו וקבלו עדכונים על תוכן חדש, תובנות שוק ומידע בלעדי.
              </p>
              
              {subscribed ?
              <div data-ev-id="ev_262c9b217e" className="flex items-center justify-center gap-2 text-green-400">
                  <Check className="w-5 h-5" />
                  <span data-ev-id="ev_162395c431">תודה! נרשמת בהצלחה</span>
                </div> :

              <form data-ev-id="ev_3f52adcd2a" onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center">
                  <input data-ev-id="ev_d8afb67c87"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="הזן את האימייל שלך"
                className="px-6 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-right"
                required
                dir="ltr" />

                  <button data-ev-id="ev_894c911298"
                type="submit"
                className="bg-gold hover:bg-gold-light text-navy-dark font-semibold px-8 py-3 rounded-lg transition-colors">

                    הרשמה
                  </button>
                </form>
              }
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer data-ev-id="ev_b82e3cb1ec" className="bg-navy py-12">
        <div data-ev-id="ev_8d14f23e79" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer Top CTA */}
          <div data-ev-id="ev_8f56d2dcef" className="flex justify-center mb-8">
            <a data-ev-id="ev_93ad7104d4"
            href="https://surense.com/app/p/9z3sqal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-navy-dark font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">

              <FileText className="w-5 h-5" />
              להוצאת מידע פנסיוני עדכני
            </a>
          </div>
          
          <div data-ev-id="ev_e1f944a20a" className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Logo variant="light" />
            <div data-ev-id="ev_be8605925d" className="flex flex-col items-center md:items-end gap-2">
              <p data-ev-id="ev_5e6bbb982d" className="text-white/40 text-sm">
                © 2024 WealthTech. כל הזכויות שמורות.
              </p>
              <div data-ev-id="ev_5077d5a855" className="flex items-center gap-4">
                <Link to="/privacy" className="text-white/40 hover:text-white/60 text-sm">מדיניות פרטיות</Link>
                <Link to="/disclosure" className="text-white/40 hover:text-white/60 text-sm">גילוי נאות</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {selectedVideo &&
      <div data-ev-id="ev_7f729a6a3f"
      className="fixed inset-0 z-50 bg-navy/90 flex items-center justify-center p-4"
      onClick={() => setSelectedVideo(null)}>
          <div data-ev-id="ev_276524b46d"
        className="bg-surface rounded-2xl overflow-hidden max-w-4xl w-full relative"
        onClick={(e) => e.stopPropagation()}>
            <div data-ev-id="ev_9c0fcf86c8" className="relative pb-[56.25%]">
              <iframe data-ev-id="ev_99f244c823"
            src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
            title={selectedVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full" />
            </div>
            <div data-ev-id="ev_d2e7915319" className="p-6">
              <div data-ev-id="ev_0bc3f5a3ab" className="flex items-start justify-between gap-4">
                <div data-ev-id="ev_ccfc4dedff" className="flex-1">
                  <h3 data-ev-id="ev_ef81ed898d" className="text-xl font-bold text-ink mb-2">{selectedVideo.title}</h3>
                  <p data-ev-id="ev_2566c249c2" className="text-ink-muted">{selectedVideo.description}</p>
                </div>
              </div>
              <div data-ev-id="ev_7d5bc19d46" className="mt-4 pt-4 border-t border-border">
                <ShareButtons title={selectedVideo.title} articleId={`video-${selectedVideo.id}`} />
              </div>
            </div>
            <button data-ev-id="ev_07205f8882"
          onClick={() => setSelectedVideo(null)}
          className="absolute top-4 left-4 w-10 h-10 bg-surface rounded-full flex items-center justify-center shadow-lg hover:bg-surface-2 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      }
    </div>);

}