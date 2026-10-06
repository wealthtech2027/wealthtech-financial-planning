import { Link } from 'react-router';
import { ChevronLeft, FileText } from 'lucide-react';
import { Logo } from '@/components/Logo';

export default function Disclosure() {
  return (
    <div data-ev-id="ev_ade0fe24c6" className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav data-ev-id="ev_ca1078acc8" className="fixed top-0 right-0 left-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div data-ev-id="ev_5a9b8d9058" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_0699bacecc" className="flex justify-between items-center h-16">
            <Link to="/">
              <Logo />
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-navy hover:text-gold transition-colors">

              <span data-ev-id="ev_104b9bcb2a">חזרה לעמוד הבית</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section data-ev-id="ev_a1eb95e959" className="pt-24 pb-12 bg-gradient-to-br from-navy via-navy to-navy-light">
        <div data-ev-id="ev_b74c021f30" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div data-ev-id="ev_61ef4dc2dd" className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-2xl mb-6">
            <FileText className="w-8 h-8 text-gold" />
          </div>
          <h1 data-ev-id="ev_6ea61dee43" className="text-3xl sm:text-4xl font-bold text-white mb-4">
            גילוי נאות
          </h1>
          <p data-ev-id="ev_6069f0ac7d" className="text-white/80">
            וולת'טק סוכנות לביטוח (2015) בע"מ
          </p>
        </div>
      </section>

      {/* Content */}
      <section data-ev-id="ev_f3808fdfde" className="py-12 bg-light">
        <div data-ev-id="ev_27ceff7737" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_fd6784c20b" className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-border">
            
            <div data-ev-id="ev_7bf0f34fc7" className="prose prose-lg max-w-none text-slate leading-relaxed">
              
              {/* License Info */}
              <div data-ev-id="ev_eb47641989" className="p-6 bg-navy/5 rounded-xl mb-8 border-r-4 border-gold">
                <p data-ev-id="ev_d875afc921" className="text-navy font-semibold mb-2">
                  החברה בעלת רישיון סוכן ביטוח פנסיוני מטעם הממונה על רשות שוק ההון, ביטוח וחיסכון במשרד האוצר בישראל.
                </p>
                <p data-ev-id="ev_8404b01233" className="text-navy font-semibold">
                  הסוכנות מעניקה שירותי שיווק פנסיוני ולא ייעוץ פנסיוני.
                </p>
              </div>

              {/* Affiliation */}
              <h2 data-ev-id="ev_ec8224b596" className="text-xl font-bold text-navy mt-8 mb-4">זיקה למוצרים פנסיוניים</h2>
              <p data-ev-id="ev_c5b4b6fe34">
                לוולת'טק סוכנות לביטוח קיימת זיקה למוצרים פנסיוניים, לרבות קופות גמל, קרנות השתלמות, קופות גמל להשקעה ופוליסות חיסכון, המיוצרים על ידי הגופים המוסדיים הבאים:
              </p>
              <div data-ev-id="ev_14c810fa41" className="flex flex-wrap gap-2 my-4">
                {['אלטשולר שחם', 'אנליסט', 'מיטב דש', 'הכשרה חברה לביטוח', 'קבוצת הפניקס (לרבות אקסלנס)', 'הראל', 'ילין לפידות', 'כלל', 'מור גמל'].map((company) =>
                <span data-ev-id="ev_a7e0fc5afe" key={company} className="bg-light text-navy px-3 py-1 rounded-full text-sm font-medium border border-border">
                    {company}
                  </span>
                )}
              </div>
              <p data-ev-id="ev_d7aadc79d5">
                לעניין זה, "זיקה" משמעה קבלת תגמול כספי, במישרין או בעקיפין, מהגופים האמורים ביחס לנכסים הפנסיוניים המנוהלים על ידם. מהות הזיקה הינה זכאותה של וולת'טק לקבלת תגמול מתמשך בשיעור של עד 50% מסך דמי הניהול המשולמים על ידי הלקוח לגוף הפנסיוני, וכן לקבלת תגמולים חד-פעמיים מהגופים הפנסיוניים.
              </p>
              <p data-ev-id="ev_1de69c44ed" className="bg-gold/10 p-4 rounded-lg border border-gold/20 text-navy">
                נוכח קיומה של זיקה כאמור, וולת'טק עשויה להעדיף מוצרים פנסיוניים של הגופים האמורים על פני מוצרים פנסיוניים אחרים, הדומים מבחינת התאמתם ללקוח, המנוהלים ו/או זמינים באמצעות גופים שלווולת'טק אין זיקה אליהם.
              </p>

              {/* AI Warning */}
              <h2 data-ev-id="ev_d8112074b3" className="text-xl font-bold text-navy mt-10 mb-4">לתשומת לבך – טכנולוגיות בינה מלאכותית (AI)</h2>
              <div data-ev-id="ev_f58691bc3c" className="bg-red-50 p-6 rounded-xl border border-red-200">
                <p data-ev-id="ev_e3bc955a31" className="text-slate mb-4">
                  השימוש בטכנולוגיות בינה מלאכותית מגביר את הסיכון לתקשורת כוזבת, התחזות ומסמכים מזויפים העלולים להיראות כאילו מקורם בוולת'טק סוכנות לביטוח (2015) בע"מ ו/או בנציגיה.
                </p>
                <p data-ev-id="ev_6f17f747ab" className="text-slate mb-4">
                  לפיכך, חשוב לנהוג בערנות ולוודא את זהות הפונה בעת קבלת פניות בנושאים פיננסיים, וכן בטרם מסירת מידע אישי או פיננסי. לקוחות וולת'טק נדרשים לאמת את אמיתותה של כל הוראה, תקשורת או בקשה למידע או להעברת כספים.
                </p>
                <p data-ev-id="ev_e72e6bd501" className="text-navy font-semibold">
                  וולת'טק לא תישא באחריות לכל אובדן, נזק או תביעה שייגרמו כתוצאה מהסתמכות על חומרים מזויפים, מניפולטיביים או כאלה שנוצרו באמצעות AI. הלקוחות נושאים באחריות לנהוג בזהירות ובשקידה סבירה במקרים אלה.
                </p>
              </div>

              {/* Disclaimer */}
              <h2 data-ev-id="ev_b40b224985" className="text-xl font-bold text-navy mt-10 mb-4">הבהרה חשובה</h2>
              <p data-ev-id="ev_8b0628061f">
                לתשומת לבך, התוכן המוצג באתר זה הינו למטרות מידע בלבד, ואין לראות בו בשום אופן הצעה, ייעוץ, עצה או המלצה ביחס להצטרפות, רכישה, החזקה, שינוי או ביצוע פעולה כלשהי במוצר פנסיוני ו/או ביטוחי. התוכן אינו מהווה תחליף להליך שיווק פנסיוני אישי, המתחשב בצרכיו, מטרותיו ונתוניו של כל לקוח.
              </p>
              <p data-ev-id="ev_f22603f82d">
                על אף שנעשו מאמצים סבירים להסתמך על מקורות הנחשבים אמינים, אין באמור כדי להוות התחייבות מצדנו לשלמותו, דיוקו או עדכניותו של המידע המופיע באתר, ולא נישא באחריות לכל נזק ו/או הפסד העלולים להיגרם כתוצאה מהסתמכות על מידע זה.
              </p>
              <p data-ev-id="ev_5ca55f5593">
                הדעות וההשקפות המובעות באתר נכונות למועד פרסומן בלבד, והן עשויות להשתנות בכל עת וללא הודעה מוקדמת. כל שימוש במידע המופיע באתר נעשה על דעת המשתמש ועל אחריותו הבלעדית.
              </p>
              <p data-ev-id="ev_2f9299353c">
                כמו כן, המידע באתר אינו מהווה ייעוץ מס, ייעוץ משפטי או תחליף לייעוץ מקצועי מתאים בתחומים אלה, לפי הצורך.
              </p>

              {/* Date */}
              <div data-ev-id="ev_83972d727c" className="mt-10 pt-6 border-t border-border text-center">
                <p data-ev-id="ev_82fcbaf667" className="text-slate text-sm">
                  (נכון לאפריל 2026)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer data-ev-id="ev_6afd8be37d" className="bg-navy py-8">
        <div data-ev-id="ev_829d73e68a" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p data-ev-id="ev_5df549577f" className="text-white/60 text-sm">
            © {new Date().getFullYear()} WealthTech. כל הזכויות שמורות.
          </p>
        </div>
      </footer>
    </div>);

}