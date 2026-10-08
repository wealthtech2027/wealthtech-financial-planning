import { useState } from 'react';
import { Link } from 'react-router';
import {
  Menu,
  X,
  FileText,
  CheckCircle,
  Send,
  RefreshCw,
  AlertCircle,
  Calculator,
  Award,
  ArrowLeft,
  Sparkles,
  ChevronDown } from
'lucide-react';
import { Logo } from '@/components/Logo';

interface Question {
  id: number;
  text: string;
  category?: string;
}

const questions: Question[] = [
{ id: 1, text: 'האם בין השנים 2017-2022 שילמת מס הכנסה?', category: 'בסיס' },
{ id: 2, text: 'האם לא עבדת חודש אחד לפחות (גם מסיבה רפואית)?', category: 'תעסוקה' },
{ id: 3, text: 'האם היית בחופשה ללא תשלום?', category: 'תעסוקה' },
{ id: 4, text: 'האם החלפת מקום עבודה?', category: 'תעסוקה' },
{ id: 5, text: 'האם קיבלת דמי אבטלה / פגיעה / לידה / מילואים?', category: 'תעסוקה' },
{ id: 6, text: 'האם הוצאת תואר אקדמאי או תעודה מקצועית לאחר שנת 2020?', category: 'השכלה' },
{ id: 7, text: 'האם יצאת לפנסיה או קיבלת פיצויי פיטורין?', category: 'תעסוקה' },
{ id: 8, text: 'האם שילמת עבור ביטוח חיים או קופת גמל עבורך/ילדך/בן זוג/הורים (באופן עצמאי)?', category: 'ביטוח וחיסכון' },
{ id: 9, text: 'האם היה לך הורה/בן זוג שסבל מבעיות זכרון, עיוורון, ריתוק, אירוע מוחי וכדומה, או ילד עם ליקוי התפתחות/שמיעה/פיגור?', category: 'מצב משפחתי' },
{ id: 10, text: 'האם היו לך הוצאות להחזקת קרוב משפחה בבית אבות סיעודי או במוסד רפואי?', category: 'מצב משפחתי' },
{ id: 11, text: 'האם הנך או היית משפחה חד הורית?', category: 'מצב משפחתי' },
{ id: 12, text: 'האם שילמת מזונות?', category: 'מצב משפחתי' },
{ id: 13, text: 'האם השתחררת משרת צבאי לאחר שנת 2019?', category: 'צבא' },
{ id: 14, text: 'האם תרמת למוסדות או לעמותות (כולל מוסדות דת)?', category: 'תרומות' },
{ id: 15, text: 'האם הנך מתגורר או התגוררת ביישוב ספר או עיירת פיתוח?', category: 'מיקום' },
{ id: 16, text: 'האם היו לך הכנסות ממספר מקורות במקביל?', category: 'הכנסות' },
{ id: 17, text: 'האם עלית לארץ לאחר שנת 2020?', category: 'עלייה' },
{ id: 18, text: "האם יש (או הייתה) לך פעילות בני״ע או בבורסה?", category: 'השקעות' },
{ id: 19, text: 'האם יש לך משכנתא? האם פדית פוליסות ביטוח חיים/מנהלים?', category: 'ביטוח וחיסכון' }];


export default function TaxRefundEligibility() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [answers, setAnswers] = useState<{[key: number]: {self: boolean;spouse: boolean;};}>({});
  const [showResults, setShowResults] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', phone: '', email: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const toggleAnswer = (questionId: number, type: 'self' | 'spouse') => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        self: type === 'self' ? !prev[questionId]?.self : prev[questionId]?.self || false,
        spouse: type === 'spouse' ? !prev[questionId]?.spouse : prev[questionId]?.spouse || false
      }
    }));
  };

  const countPositiveAnswers = () => {
    let selfCount = 0;
    let spouseCount = 0;
    Object.values(answers).forEach((answer) => {
      if (answer.self) selfCount++;
      if (answer.spouse) spouseCount++;
    });
    return { selfCount, spouseCount, total: selfCount + spouseCount };
  };

  const getEligibilityLevel = () => {
    const { total } = countPositiveAnswers();
    // Must have answered question 1 (paid income tax) to be eligible
    const paidTax = answers[1]?.self || answers[1]?.spouse;

    if (!paidTax) return 'none';
    if (total >= 5) return 'high';
    if (total >= 3) return 'medium';
    if (total >= 1) return 'low';
    return 'none';
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setLeadSubmitted(false);
    setLeadData({ name: '', phone: '', email: '', notes: '' });
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
      const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const { selfCount, spouseCount, total } = countPositiveAnswers();
      const eligibility = getEligibilityLevel();

      if (SUPABASE_URL && SUPABASE_ANON_KEY) {
        await fetch(`${SUPABASE_URL}/functions/v1/send-lead`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            name: leadData.name,
            phone: leadData.phone,
            email: leadData.email,
            source: `שאלון זכאות החזרי מס | רמת זכאות: ${eligibility} | תשובות חיוביות: ${total} (עצמי: ${selfCount}, בן/ת זוג: ${spouseCount})${leadData.notes ? ` | הערות: ${leadData.notes}` : ''}`
          })
        });
      }

      setLeadSubmitted(true);
    } catch (error) {
      console.error('Error submitting lead:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const { selfCount, spouseCount, total } = countPositiveAnswers();
  const eligibility = getEligibilityLevel();

  const eligibilityConfig = {
    none: {
      color: 'bg-surface-3',
      textColor: 'text-ink-muted',
      icon: AlertCircle,
      title: 'לא נמצאו סימנים ברורים לזכאות',
      description: 'לא נמצאו סימני זכאות ברורים לפי התשובות. ייתכן שלא שולם מס הכנסה בתקופה, או שאין נסיבות המזכות להחזר.'
    },
    low: {
      color: 'bg-amber-500/15',
      textColor: 'text-amber-400',
      icon: AlertCircle,
      title: 'ייתכן ויש זכאות',
      description: 'נמצאו מספר סימנים שעשויים להצביע על זכאות להחזר מס. מומלץ לבצע בדיקה מקצועית.'
    },
    medium: {
      color: 'bg-blue-500/15',
      textColor: 'text-blue-400',
      icon: CheckCircle,
      title: 'סיכוי טוב לזכאות',
      description: 'נמצאו מספר סימנים שמצביעים על זכאות להחזר מס. כדאי לבדוק את הזכאות בצורה מקצועית.'
    },
    high: {
      color: 'bg-green-500/15',
      textColor: 'text-green-400',
      icon: Award,
      title: 'סיכוי גבוה לזכאות!',
      description: 'נמצאו מספר סימנים משמעותי לזכאות להחזר מס. מומלץ מאוד לפנות לבדיקה מקצועית!'
    }
  };

  const config = eligibilityConfig[eligibility];
  const EligibilityIcon = config.icon;

  return (
    <div data-ev-id="ev_fdbcfaf283" className="min-h-screen bg-gradient-to-br from-surface-2 to-surface font-sans">
      {/* Navigation */}
      <nav data-ev-id="ev_eaceac1203" className="fixed top-0 right-0 left-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div data-ev-id="ev_33c40c12eb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_8e905a8607" className="flex justify-between items-center h-20">
            <Logo />
            
            <div data-ev-id="ev_333c80aca6" className="hidden xl:flex items-center gap-4 2xl:gap-7 text-[15px] 2xl:text-base">
              <Link to="/" className="text-ink-muted hover:text-ink transition-colors font-medium">ראשי</Link>
              <Link to="/products" className="text-ink-muted hover:text-ink transition-colors font-medium">מוצרים</Link>
              <Link to="/tax-refund-eligibility" className="text-gold font-medium">בדיקת זכאות להחזר מס</Link>
              <a data-ev-id="ev_0553e93db3"
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

            <button data-ev-id="ev_9949456883"
            className="xl:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>

              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen &&
        <div data-ev-id="ev_030a0b9d77" className="xl:hidden bg-surface border-t border-border">
            <div data-ev-id="ev_9cdf89f936" className="px-4 py-4 flex flex-col gap-4">
              <Link to="/" className="text-ink-muted hover:text-ink font-medium py-2">ראשי</Link>
              <Link to="/products" className="text-ink-muted hover:text-ink font-medium py-2">מוצרים</Link>
              <Link to="/tax-refund-eligibility" className="text-gold font-medium py-2">בדיקת זכאות להחזר מס</Link>
              <a data-ev-id="ev_5a115f96bb"
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

      {/* Hero */}
      <section data-ev-id="ev_36818a3e24" className="pt-28 pb-12 hero-tech">
        <div data-ev-id="ev_14d8178a61" className="max-w-4xl mx-auto px-4 text-center">
          <div data-ev-id="ev_13d27eaf03" className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-2xl mb-6">
            <FileText className="w-8 h-8 text-gold" />
          </div>
          <h1 data-ev-id="ev_45a88346b7" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            בדיקת זכאות להחזרי מס
          </h1>
          <p data-ev-id="ev_a04bc75ec4" className="text-lg text-white/80 max-w-2xl mx-auto">
            שאלון מזורז לבדיקה ראשונית • כל השאלות מתייחסות לשנים 2019-2025
          </p>
        </div>
      </section>

      {/* Questionnaire */}
      <section data-ev-id="ev_d9074b23d9" className="py-12">
        <div data-ev-id="ev_1db33f4f25" className="max-w-4xl mx-auto px-4">
          
          {!showResults ?
          <>
              {/* Instructions */}
              <div data-ev-id="ev_b6e1ba1176" className="bg-amber-500/10 rounded-2xl p-4 mb-8 text-amber-400">
                <p data-ev-id="ev_48d1b4b73d" className="font-medium flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  הוראות:
                </p>
                <p data-ev-id="ev_7ca95d84e8" className="text-sm mt-1">
                  יש לסמן את התשובות החיוביות בלבד. ניתן לסמן עבורך וגם עבור בן/בת הזוג.
                </p>
              </div>

              {/* Questions Card */}
              <div data-ev-id="ev_b70e444ebd" className="bg-surface rounded-3xl shadow-xl overflow-hidden">
                {/* Header */}
                <div data-ev-id="ev_09e8b383df" className="bg-navy p-4 text-white">
                  <div data-ev-id="ev_b0b1c4d402" className="grid grid-cols-12 gap-2 items-center text-sm font-medium">
                    <div data-ev-id="ev_6719a90fc8" className="col-span-1 text-center">#</div>
                    <div data-ev-id="ev_ed0d017b5c" className="col-span-7 sm:col-span-8">השאלה</div>
                    <div data-ev-id="ev_9ff6fcd4ae" className="col-span-2 sm:col-span-1.5 text-center">את/ה</div>
                    <div data-ev-id="ev_d287feeed2" className="col-span-2 sm:col-span-1.5 text-center">בן/בת זוג</div>
                  </div>
                </div>
                
                {/* Questions */}
                <div data-ev-id="ev_f90cd32eda" className="divide-y divide-border">
                  {questions.map((q, index) =>
                <div data-ev-id="ev_f3d6549bcf"
                key={q.id}
                className={`grid grid-cols-12 gap-2 items-center p-4 hover:bg-surface-2 transition-colors ${
                answers[q.id]?.self || answers[q.id]?.spouse ? 'bg-green-500/10' : ''}`
                }>

                      <div data-ev-id="ev_c350d139eb" className="col-span-1 text-center text-ink-muted font-medium">{q.id}</div>
                      <div data-ev-id="ev_c5f25cee05" className="col-span-7 sm:col-span-8">
                        <p data-ev-id="ev_338e319e52" className="text-ink text-sm sm:text-base">{q.text}</p>
                        {q.category &&
                    <span data-ev-id="ev_8b8681c74b" className="text-xs text-ink-muted bg-surface-2 px-2 py-0.5 rounded mt-1 inline-block">
                            {q.category}
                          </span>
                    }
                      </div>
                      <div data-ev-id="ev_3339d240e0" className="col-span-2 sm:col-span-1.5 flex justify-center">
                        <button data-ev-id="ev_2cfa8dc8fc"
                    onClick={() => toggleAnswer(q.id, 'self')}
                    className={`w-8 h-8 rounded-lg border-2 transition-all flex items-center justify-center ${
                    answers[q.id]?.self ?
                    'bg-green-500 border-green-500 text-white' :
                    'border-border hover:border-green-500/30'}`
                    }>

                          {answers[q.id]?.self && <CheckCircle className="w-5 h-5" />}
                        </button>
                      </div>
                      <div data-ev-id="ev_fd1b56fbb8" className="col-span-2 sm:col-span-1.5 flex justify-center">
                        <button data-ev-id="ev_19b65a687d"
                    onClick={() => toggleAnswer(q.id, 'spouse')}
                    className={`w-8 h-8 rounded-lg border-2 transition-all flex items-center justify-center ${
                    answers[q.id]?.spouse ?
                    'bg-green-500 border-green-500 text-white' :
                    'border-border hover:border-green-500/30'}`
                    }>

                          {answers[q.id]?.spouse && <CheckCircle className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                )}
                </div>
                
                {/* Summary & Submit */}
                <div data-ev-id="ev_4666980bd0" className="bg-surface-2 p-6 border-t border-border">
                  <div data-ev-id="ev_db60fa005a" className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div data-ev-id="ev_4f8a20395d" className="text-center sm:text-right">
                      <p data-ev-id="ev_d77076f00a" className="text-ink-muted text-sm">תשובות חיוביות:</p>
                      <p data-ev-id="ev_0c58d725f1" className="text-2xl font-bold text-ink">
                        {total} <span data-ev-id="ev_d9e180e04e" className="text-base font-normal text-ink-muted">(עצמי: {selfCount}, בן/ת זוג: {spouseCount})</span>
                      </p>
                    </div>
                    <button data-ev-id="ev_1c7d142a43"
                  onClick={handleSubmit}
                  className="flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark font-bold px-8 py-4 rounded-xl transition-colors">

                      <Calculator className="w-5 h-5" />
                      בדוק זכאות
                    </button>
                  </div>
                </div>
              </div>
            </> : (

          /* Results */
          <div data-ev-id="ev_7285a0686b" className="space-y-6">
              {/* Main Result Card */}
              <div data-ev-id="ev_b7088333e6" className="bg-surface rounded-3xl shadow-xl overflow-hidden">
                <div data-ev-id="ev_7c3ad0b465" className={`${config.color} p-8 text-center`}>
                  <EligibilityIcon className={`w-16 h-16 ${config.textColor} mx-auto mb-4`} />
                  <h2 data-ev-id="ev_992fa90fb3" className={`text-2xl sm:text-3xl font-bold ${config.textColor} mb-2`}>
                    {config.title}
                  </h2>
                  <p data-ev-id="ev_c3d1d568c3" className={`${config.textColor} opacity-80`}>
                    {config.description}
                  </p>
                </div>
                
                {/* Stats */}
                <div data-ev-id="ev_2e9f9267ef" className="p-6 grid grid-cols-3 gap-4 text-center border-b border-border">
                  <div data-ev-id="ev_8819bab435">
                    <p data-ev-id="ev_58499c4895" className="text-sm text-ink-muted">סה"כ תשובות חיוביות</p>
                    <p data-ev-id="ev_f2d365de44" className="text-3xl font-bold text-ink">{total}</p>
                  </div>
                  <div data-ev-id="ev_df964f6425" className="border-x border-border">
                    <p data-ev-id="ev_fc0a9de274" className="text-sm text-ink-muted">עצמי</p>
                    <p data-ev-id="ev_eca512e286" className="text-3xl font-bold text-ink">{selfCount}</p>
                  </div>
                  <div data-ev-id="ev_b2cfefd5fe">
                    <p data-ev-id="ev_61b95f0ee6" className="text-sm text-ink-muted">בן/בת זוג</p>
                    <p data-ev-id="ev_b2e54567af" className="text-3xl font-bold text-ink">{spouseCount}</p>
                  </div>
                </div>
                
                {/* Gated Content */}
                {!leadSubmitted ?
              <>
                    {/* Blurred Preview */}
                    <div data-ev-id="ev_5cf1e1b51f" className="relative">
                      <div data-ev-id="ev_7446d06d17" className="p-6 blur-sm select-none">
                        <h4 data-ev-id="ev_692a5c483b" className="font-bold text-ink mb-4">פירוט סימני הזכאות:</h4>
                        <div data-ev-id="ev_76fd22f4f2" className="space-y-2">
                          <div data-ev-id="ev_0db4f49ec1" className="flex items-center gap-2 text-ink-muted">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span data-ev-id="ev_d2ca435ec0">סימן זכאות א</span>
                          </div>
                          <div data-ev-id="ev_95490e9526" className="flex items-center gap-2 text-ink-muted">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span data-ev-id="ev_db9cd201e8">סימן זכאות ב</span>
                          </div>
                          <div data-ev-id="ev_7cdc866000" className="flex items-center gap-2 text-ink-muted">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span data-ev-id="ev_0a64560781">סימן זכאות ג</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Overlay with CTA */}
                      <div data-ev-id="ev_9f6143218a" className="absolute inset-0 bg-surface/80 backdrop-blur-[2px] flex items-center justify-center">
                        <div data-ev-id="ev_98e1fd9494" className="text-center p-6">
                          <div data-ev-id="ev_dc583a18c5" className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-gold" />
                          </div>
                          <h3 data-ev-id="ev_d7d1e2437b" className="text-xl font-bold text-ink mb-2">רוצה לדעת לכמה אתה זכאי?</h3>
                          <p data-ev-id="ev_db212f0e74" className="text-ink-muted mb-4 max-w-sm">
                            השאר פרטים לקבלת בדיקה מקצועית והערכת סכום ההחזר הצפוי
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Lead Form */}
                    <div data-ev-id="ev_f3fd15950a" className="p-6 bg-surface-2 border-t border-border">
                      <form data-ev-id="ev_f1b2f94236" onSubmit={handleLeadSubmit} className="space-y-4">
                        <div data-ev-id="ev_cc9f1507fc" className="grid sm:grid-cols-2 gap-4">
                          <div data-ev-id="ev_923bd19ff7">
                            <label data-ev-id="ev_4bbe524376" className="block text-sm font-medium text-ink mb-1">שם מלא</label>
                            <input data-ev-id="ev_d14e1624da"
                        type="text"
                        required
                        value={leadData.name}
                        onChange={(e) => setLeadData((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-surface"
                        placeholder="ישראל ישראלי" />

                          </div>
                          <div data-ev-id="ev_fda3557b9c">
                            <label data-ev-id="ev_b21a716199" className="block text-sm font-medium text-ink mb-1">טלפון</label>
                            <input data-ev-id="ev_dafe949794"
                        type="tel"
                        required
                        value={leadData.phone}
                        onChange={(e) => setLeadData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-surface"
                        dir="ltr"
                        placeholder="050-0000000" />

                          </div>
                        </div>
                        <div data-ev-id="ev_691d3d50ec">
                          <label data-ev-id="ev_cd182210d4" className="block text-sm font-medium text-ink mb-1">אימייל</label>
                          <input data-ev-id="ev_7c1c0bdeeb"
                      type="email"
                      required
                      value={leadData.email}
                      onChange={(e) => setLeadData((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-surface"
                      dir="ltr"
                      placeholder="email@example.com" />

                        </div>
                        <button data-ev-id="ev_30b49ee4fe"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-dark font-bold py-4 rounded-xl transition-colors disabled:opacity-70">

                          {isSubmitting ?
                      <div data-ev-id="ev_73044e3fd4" className="w-5 h-5 border-2 border-gold/30 border-t-navy rounded-full animate-spin" /> :

                      <Send className="w-5 h-5" />
                      }
                          {isSubmitting ? 'שולח...' : 'קבל בדיקה מקצועית חינם'}
                        </button>
                      </form>
                    </div>
                  </> :

              <>
                    {/* Unlocked Content */}
                    <div data-ev-id="ev_f2cd21fae1" className="p-6">
                      <h4 data-ev-id="ev_b9144910d6" className="font-bold text-ink mb-4">הסימנים שנמצאו:</h4>
                      <div data-ev-id="ev_33d5a83fb4" className="space-y-2">
                        {questions.filter((q) => answers[q.id]?.self || answers[q.id]?.spouse).map((q) =>
                    <div data-ev-id="ev_ff141da301" key={q.id} className="flex items-start gap-2 text-ink-muted bg-green-500/10 p-3 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <div data-ev-id="ev_fb5ab78970">
                              <span data-ev-id="ev_bd14095ddc" className="text-ink">{q.text}</span>
                              <div data-ev-id="ev_44ba898c27" className="text-xs text-ink-muted mt-1">
                                {answers[q.id]?.self && <span data-ev-id="ev_2beb3d26a5" className="bg-navy/10 px-2 py-0.5 rounded ml-1">עצמי</span>}
                                {answers[q.id]?.spouse && <span data-ev-id="ev_9237ce4dcf" className="bg-navy/10 px-2 py-0.5 rounded ml-1">בן/בת זוג</span>}
                              </div>
                            </div>
                          </div>
                    )}
                      </div>
                    </div>
                    
                    {/* Success message */}
                    <div data-ev-id="ev_3514a1b8c5" className="p-6 bg-green-500/10 border-t border-green-500/30">
                      <div data-ev-id="ev_a548a741aa" className="flex items-center gap-3">
                        <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                        <div data-ev-id="ev_306b3b29db">
                          <p data-ev-id="ev_05613cf1e7" className="font-bold text-ink">תודה רבה {leadData.name}!</p>
                          <p data-ev-id="ev_7459213275" className="text-ink-muted text-sm">נציג מטעמנו יצור איתך קשר לבדיקה מקצועית והערכת סכום ההחזר.</p>
                        </div>
                      </div>
                    </div>
                  </>
              }
              </div>

              {/* Actions */}
              <div data-ev-id="ev_3ee69bc0bd" className="flex gap-4">
                <button data-ev-id="ev_c9d3f4183e"
              onClick={handleReset}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-border text-ink hover:bg-surface-2 transition-colors bg-surface">

                  <RefreshCw className="w-5 h-5" />
                  מלא שאלון מחדש
                </button>
              </div>

              {/* Disclaimer */}
              <div data-ev-id="ev_3180db1ffb" className="bg-amber-500/10 rounded-2xl p-4 text-sm text-amber-400">
                <p data-ev-id="ev_a01e0d151b" className="font-medium mb-1">גילוי נאות:</p>
                <p data-ev-id="ev_5e36585e4e">
                  השאלון מהווה בדיקה ראשונית בלבד ואינו מהווה ייעוץ מס או תחליף לייעוץ מקצועי. הזכאות להחזר מס תלויה בבדיקה מקצועית של הנתונים הפיננסיים המלאים.
                </p>
              </div>
            </div>)
          }
        </div>
      </section>

      {/* Footer */}
      <footer data-ev-id="ev_5606daafe9" className="bg-navy-dark py-8 border-t border-white/10 mt-12">
        <div data-ev-id="ev_cca02d0441" className="max-w-7xl mx-auto px-4 text-center">
          {/* Footer Top CTA */}
          <div data-ev-id="ev_b644e6f800" className="flex justify-center mb-6">
            <a data-ev-id="ev_41e137c38c"
            href="https://surense.com/app/p/9z3sqal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-navy-dark font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">

              <FileText className="w-5 h-5" />
              להוצאת מידע פנסיוני עדכני
            </a>
          </div>
          
          <Logo variant="light" />
          <p data-ev-id="ev_ea2488a230" className="text-white/50 text-sm mt-4">
            © 2024 WealthTech. כל הזכויות שמורות.
          </p>
        </div>
      </footer>
    </div>);

}