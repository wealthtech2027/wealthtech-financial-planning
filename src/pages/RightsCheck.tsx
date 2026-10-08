import { useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Loader2,
  ScanSearch,
  Stethoscope,
  Umbrella,
  PiggyBank,
  Landmark,
  RotateCcw } from
'lucide-react';
import { Logo } from '@/components/Logo';
import { supabase } from '@/integrations/supabase/client';

type Question = {
  id: string;
  section: string;
  text: string;
  options: string[];
  multi?: boolean;
  /** Option that clears all others in a multi-select question */
  exclusive?: string;
};

const NONE_OF_THESE = 'אף אחד מהם';

const questions: Question[] = [
{
  id: 'employment',
  section: 'רקע כללי',
  text: 'מה המצב התעסוקתי שלך היום?',
  options: ['שכיר/ה', 'עצמאי/ת', 'שכיר/ה ועצמאי/ת', 'פנסיונר/ית', 'לא עובד/ת כרגע']
},
{
  id: 'jobChanges',
  section: 'רקע כללי',
  text: 'האם החלפת מקום עבודה, או עבדת במקביל ביותר ממקום עבודה אחד, בשש השנים האחרונות?',
  options: ['כן', 'לא']
},
{
  id: 'medicalEvent',
  section: 'אירועים רפואיים',
  text: 'האם בשנים האחרונות היה לך או לבן משפחה קרוב אירוע רפואי משמעותי, כמו ניתוח, אשפוז, מחלה ממושכת או תאונה?',
  options: ['כן', 'לא', 'מעדיף/ה לא לציין']
},
{
  id: 'disabilityStatus',
  section: 'אירועים רפואיים',
  text: 'האם קיבלת בעבר אישור על נכות, אובדן כושר עבודה או זכאות מביטוח לאומי?',
  options: ['כן', 'לא', 'בתהליך']
},
{
  id: 'hasPolicies',
  section: 'ביטוח',
  text: 'האם יש לך ביטוחי בריאות, חיים או אובדן כושר עבודה, פרטיים או דרך העבודה?',
  options: ['כן', 'לא', 'לא בטוח/ה']
},
{
  id: 'policyReview',
  section: 'ביטוח',
  text: 'מתי בפעם האחרונה מישהו עבר על כל הפוליסות שלך?',
  options: ['בשנה האחרונה', 'לפני יותר משנתיים', 'אף פעם']
},
{
  id: 'multipleFunds',
  section: 'פנסיה וחיסכון',
  text: 'האם יש לך יותר מקופת פנסיה, קופת גמל או קרן השתלמות אחת?',
  options: ['כן', 'לא', 'לא יודע/ת']
},
{
  id: 'age',
  section: 'פנסיה וחיסכון',
  text: 'באיזה טווח גיל?',
  options: ['עד 40', '40–55', '55–67', 'מעל 67']
},
{
  id: 'taxEvents',
  section: 'מס',
  text: 'האם באחת משש השנים האחרונות היה לך אחד מהמצבים האלה? (אפשר לבחור כמה)',
  options: [
  'עבודה בכמה מקומות',
  'תקופה בלי עבודה',
  'משיכת כספי פנסיה או פיצויים',
  'תרומות',
  'ילד עם צרכים מיוחדים',
  'תואר אקדמי',
  NONE_OF_THESE],

  multi: true,
  exclusive: NONE_OF_THESE
},
{
  id: 'motivation',
  section: 'מה מביא אותך',
  text: 'מה הכי מדויק לגביך עכשיו?',
  options: [
  'משהו השתנה לאחרונה (בריאות, עבודה, משפחה)',
  'כבר קיבלתי זכויות ורוצה לוודא שלא פספסתי',
  'רוצה להיערך מראש',
  'סתם לבדוק שהכל מסודר']

}];


type Answers = Record<string, string[]>;

const has = (answers: Answers, id: string, ...values: string[]) =>
(answers[id] ?? []).some((v) => values.includes(v));

function evaluate(answers: Answers) {
  const medical =
  has(answers, 'medicalEvent', 'כן') ||
  has(answers, 'disabilityStatus', 'כן', 'בתהליך');

  const insurance =
  medical ||
  has(answers, 'hasPolicies', 'כן', 'לא בטוח/ה') &&
  has(answers, 'policyReview', 'לפני יותר משנתיים', 'אף פעם');

  const pension =
  has(answers, 'multipleFunds', 'כן', 'לא יודע/ת') ||
  has(answers, 'jobChanges', 'כן') ||
  has(answers, 'age', '55–67', 'מעל 67');

  const tax =
  (answers.taxEvents ?? []).some((v) => v !== NONE_OF_THESE) ||
  has(answers, 'jobChanges', 'כן') ||
  has(answers, 'employment', 'עצמאי/ת', 'שכיר/ה ועצמאי/ת', 'פנסיונר/ית');

  return [
  { key: 'medical', icon: Stethoscope, title: 'זכויות רפואיות', relevant: medical },
  { key: 'insurance', icon: Umbrella, title: 'זכויות ביטוחיות', relevant: insurance },
  { key: 'pension', icon: PiggyBank, title: 'זכויות פנסיוניות', relevant: pension },
  { key: 'tax', icon: Landmark, title: 'זכויות מיסויות', relevant: tax }];

}

export default function RightsCheck() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [form, setForm] = useState({ name: '', phone: '', email: '', consent: false });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const finished = step >= questions.length;
  const question = questions[Math.min(step, questions.length - 1)];
  const selected = answers[question.id] ?? [];
  const results = evaluate(answers);

  const choose = (option: string) => {
    if (!question.multi) {
      setAnswers({ ...answers, [question.id]: [option] });
      setStep(step + 1);
      return;
    }

    let next: string[];
    if (option === question.exclusive) {
      next = selected.includes(option) ? [] : [option];
    } else {
      next = selected.includes(option) ?
      selected.filter((v) => v !== option) :
      [...selected.filter((v) => v !== question.exclusive), option];
    }
    setAnswers({ ...answers, [question.id]: next });
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setSubmitError('לא ניתן לשלוח כרגע. נסו שוב מאוחר יותר או התקשרו אלינו.');
      return;
    }

    const summary = [
    'בדיקת זכויות - שאלון התאמה',
    `תחומים לבדיקה: ${results.filter((r) => r.relevant).map((r) => r.title).join(', ') || 'לא סומנו'}`,
    ...questions.map((q) => `${q.text} → ${(answers[q.id] ?? []).join(', ')}`)].
    join('\n');

    setSubmitting(true);
    setSubmitError(null);
    try {
      const { error } = await supabase.from('leads').insert({
        name: form.name,
        phone: form.phone,
        email: form.email,
        source: 'rights_check',
        notes: summary
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting rights check form:', err);
      setSubmitError('אירעה שגיאה בשליחה. נסו שוב או התקשרו אלינו.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface font-sans flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 right-0 left-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Logo />
            <div className="flex items-center gap-4 sm:gap-6 text-[15px]">
              <Link to="/" className="text-ink-muted hover:text-ink transition-colors font-medium">ראשי</Link>
              <Link to="/wealthtech-one" className="text-ink-muted hover:text-ink transition-colors font-medium">WealthTech One</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative flex-1 pt-32 pb-20 hero-tech overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute -top-40 left-1/4 w-[640px] h-[640px] bg-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 mb-6">
              <ScanSearch className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium">WealthTech One · בדיקת זכויות</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 text-balance">
              שאלון התאמה <span className="text-gradient-gold">למיצוי זכויות</span>
            </h1>
            <p className="text-ink-muted text-lg text-pretty">
              10 שאלות קצרות, כדקה וחצי. בסוף תקבלו מפה של התחומים שכדאי לבדוק.
            </p>
          </div>

          {!finished ?
          <div className="card-tech rounded-3xl p-6 sm:p-10">
              {/* Progress */}
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-gold font-semibold">{question.section}</span>
                <span className="font-mono text-ink-muted" dir="ltr">{step + 1} / {questions.length}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 mb-8 overflow-hidden">
                <div
                className="h-full bg-gold rounded-full transition-all duration-300"
                style={{ width: `${step / questions.length * 100}%` }} />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-8 text-balance">{question.text}</h2>

              <div className="grid gap-3">
                {question.options.map((option) => {
                const isSelected = selected.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => choose(option)}
                    className={`flex items-center gap-3 w-full text-right rounded-xl border px-5 py-4 transition-colors ${
                    isSelected ?
                    'border-gold bg-gold/15 text-white' :
                    'border-white/15 bg-white/5 text-ink hover:border-gold/60 hover:bg-white/10'}`
                    }>
                      {isSelected ?
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0" /> :
                    <Circle className="w-5 h-5 text-white/30 shrink-0" />
                    }
                      <span className="font-medium">{option}</span>
                    </button>);

              })}
              </div>

              <div className="flex items-center justify-between mt-8">
                <button
                type="button"
                onClick={() => setStep(step - 1)}
                disabled={step === 0}
                className="inline-flex items-center gap-2 text-ink-muted hover:text-ink disabled:opacity-0 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                  הקודם
                </button>

                {question.multi &&
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={selected.length === 0}
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light disabled:opacity-40 text-navy-dark font-bold px-6 py-3 rounded-xl transition-colors">
                    המשך
                    <ArrowLeft className="w-4 h-4" />
                  </button>
              }
              </div>
            </div> :

          <div className="flex flex-col gap-8">
              {/* Results map */}
              <div className="card-tech rounded-3xl p-6 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-2">מפת ההתאמה שלך</h2>
                <p className="text-ink-muted mb-8">לפי התשובות, אלה התחומים שכדאי לבדוק:</p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {results.map(({ key, icon: Icon, title, relevant }) =>
                <div
                  key={key}
                  className={`rounded-2xl border p-5 flex items-center gap-4 ${
                  relevant ? 'border-gold/60 bg-gold/10' : 'border-white/10 bg-white/5'}`
                  }>
                      <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${
                  relevant ? 'bg-gold' : 'bg-white/10'}`
                  }>
                        <Icon className={`w-6 h-6 ${relevant ? 'text-navy-dark' : 'text-white/40'}`} />
                      </div>
                      <div>
                        <div className={`font-bold ${relevant ? 'text-ink' : 'text-ink-muted'}`}>{title}</div>
                        <div className={`text-sm ${relevant ? 'text-gold' : 'text-ink-muted/70'}`}>
                          {relevant ? 'כדאי לבדוק' : 'פחות רלוונטי כרגע'}
                        </div>
                      </div>
                    </div>
                )}
                </div>

                <p className="mt-6 text-xs text-ink-muted/80 text-pretty">
                  זו אינה קביעת זכאות. הבדיקה בפועל נעשית באופן פרטני על ידי בעל מקצוע מוסמך.
                </p>

                <button
                type="button"
                onClick={restart}
                className="mt-4 inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors">
                  <RotateCcw className="w-4 h-4" />
                  למילוי השאלון מחדש
                </button>
              </div>

              {/* Contact */}
              <div className="card-tech rounded-3xl p-6 sm:p-10">
                {submitted ?
              <div className="text-center">
                    <CheckCircle2 className="w-14 h-14 text-gold mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-ink mb-2">הפנייה נקלטה</h3>
                    <p className="text-ink-muted">
                      מנהל התיק יחזור אליכם לתיאום שיחת היכרות, עם התשובות שלכם כבר מולו. אין צורך לשלוח מסמכים בשלב זה.
                    </p>
                  </div> :

              <>
                    <h3 className="text-2xl font-bold text-ink mb-2">לתיאום שיחת היכרות</h3>
                    <p className="text-ink-muted mb-6 text-pretty">
                      השאירו פרטים, והתשובות לשאלון יצורפו לפנייה כדי שמנהל התיק יגיע לשיחה מוכן.
                    </p>

                    <form onSubmit={handleSubmit} className="grid sm:grid-cols-3 gap-4">
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

                      <p className="sm:col-span-3 text-xs text-ink-muted/80">
                        אין לצרף בטופס זה פירוט אבחנה רפואית או מסמכים רפואיים. איסוף מידע רגיש ייעשה בהמשך, בתהליך מאובטח ומתאים.
                      </p>

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
                        שליחת פרטים לתיאום שיחה
                      </button>
                    </form>
                  </>
              }
              </div>
            </div>
          }

          <p className="mt-10 text-xs text-ink-muted/60 leading-relaxed text-pretty text-center">
            המידע בשאלון זה אינו מהווה ייעוץ משפטי, ביטוחי, מיסויי או פנסיוני, ואין בו הבטחה לזכאות, לאישור תביעה או להחזר מס.
          </p>
        </div>
      </main>
    </div>);

}
