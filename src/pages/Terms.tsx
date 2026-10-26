import { Link } from 'react-router';
import { ChevronLeft, ScrollText } from 'lucide-react';
import { Logo } from '@/components/Logo';

const sections = [
  {
    title: 'כללי',
    text: 'האתר wealthtech.co.il מופעל על ידי וולת׳טק סוכנות לביטוח (2015) בע"מ, ח.פ. 515186971, כתובת: הסדנאות 8, הרצליה. השימוש באתר כפוף לתקנון זה. כניסה לאתר או שימוש בו מהווים הסכמה לתנאים אלה.'
  },
  {
    title: 'מידע כללי בלבד',
    text: 'התכנים באתר, לרבות מחשבונים, מאמרים, מחקרים וסרטונים, מיועדים למידע כללי בלבד. אין בהם ייעוץ פנסיוני, ייעוץ השקעות, ייעוץ מס או המלצה לפעולה. תשואות העבר אינן מבטיחות תשואות עתידיות. לפני קבלת החלטה פיננסית מומלץ להתייעץ עם גורם מורשה.'
  },
  {
    title: 'שירותים מוסדרים',
    text: 'שירותי תכנון פנסיוני וביטוחי ניתנים על ידי וולת׳טק סוכנות לביטוח, באמצעות גורמים מורשים בעלי רישיון. שירותי ניהול תיקי השקעות ושירותי Family Office ניתנים באמצעות פיוניר תכנון פיננסי, המחזיקה ברישיון ניהול תיקי השקעות. פרטי הרישוי מופיעים בגילוי הנאות.'
  },
  {
    title: 'מסירת פרטים',
    text: 'מילוי טופס באתר אינו מחייב את המשתמש או את החברה בהתקשרות. הפרטים שתמסרו ישמשו ליצירת קשר לתיאום שיחה או פגישה, ויטופלו בהתאם למדיניות הפרטיות.'
  },
  {
    title: 'קניין רוחני',
    text: 'כל התכנים באתר, לרבות טקסטים, עיצוב, לוגואים, גרפיקה, סרטונים ונתונים, הם רכוש וולת׳טק או של צדדים שלישיים שהרשו את השימוש בהם, ומוגנים בזכויות יוצרים וסימני מסחר. אין להעתיק, לשכפל או להפיץ תכנים מהאתר ללא אישור מראש ובכתב.'
  },
  {
    title: 'קישורים לאתרים אחרים',
    text: 'האתר עשוי לכלול קישורים לאתרים של צדדים שלישיים. החברה אינה אחראית לתכניהם, לזמינותם או למדיניות הפרטיות שלהם.'
  },
  {
    title: 'הגבלת אחריות',
    text: 'האתר מוצג "כמות שהוא". החברה לא תישא באחריות לנזק ישיר או עקיף שייגרם משימוש באתר או מהסתמכות על התכנים בו, למעט נזק שנגרם בזדון או ברשלנות חמורה, או כפי שנקבע בדין.'
  },
  {
    title: 'שינויים בתקנון',
    text: 'החברה רשאית לעדכן תקנון זה מעת לעת. הנוסח המעודכן יפורסם בעמוד זה, והשימוש באתר לאחר הפרסום מהווה הסכמה לנוסח החדש.'
  },
  {
    title: 'דין וסמכות שיפוט',
    text: 'על תקנון זה יחול הדין הישראלי. סמכות השיפוט הייחודית לכל עניין הנובע מהשימוש באתר נתונה לבתי המשפט המוסמכים בישראל.'
  },
  {
    title: 'יצירת קשר',
    text: 'לשאלות בנוגע לתקנון ניתן לפנות בדוא"ל service@wealthtech.co.il או בטלפון 050-8210573.'
  }
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-surface font-sans">
      <nav className="fixed top-0 right-0 left-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/">
              <Logo />
            </Link>
            <Link to="/" className="flex items-center gap-2 text-ink hover:text-gold transition-colors">
              <span>חזרה לעמוד הבית</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-24 pb-12 hero-tech">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-2xl mb-6">
            <ScrollText className="w-8 h-8 text-gold" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">תקנון האתר</h1>
          <p className="text-white/80">וולת׳טק סוכנות לביטוח (2015) בע"מ</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {sections.map((s, i) =>
          <div key={s.title}>
              <h2 className="text-xl font-bold text-ink mb-2">{i + 1}. {s.title}</h2>
              <p className="text-ink-muted leading-relaxed text-pretty">{s.text}</p>
            </div>
          )}
          <p className="text-xs text-ink-muted/70 pt-4 border-t border-border">
            עודכן לאחרונה: אוקטובר 2026
          </p>
        </div>
      </section>
    </div>);

}
