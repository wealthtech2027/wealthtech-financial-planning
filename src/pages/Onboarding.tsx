import { useState } from 'react';
import { Link } from 'react-router';
import {
  User,
  Wallet,
  Target,
  Shield,
  BarChart3,
  FileText,
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
  CheckCircle2,
  AlertCircle } from
'lucide-react';
import { Logo } from '@/components/Logo';
import { supabase } from '@/integrations/supabase/client';

type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface FormData {
  // Step 1: Personal Info
  fullName: string;
  phone: string;
  email: string;
  age: string;
  maritalStatus: string;
  children: string;
  occupation: string;
  industry: string;

  // Step 2: Financial Situation
  monthlyIncome: string;
  additionalIncome: string;
  monthlyExpenses: string;
  existingSavings: string;
  realEstate: string;
  loans: string;

  // Step 3: Existing Products
  pensionFunds: string[];
  insurancePolicies: string[];
  investments: string[];
  otherProducts: string;

  // Step 4: Goals
  shortTermGoals: string[];
  longTermGoals: string[];
  retirementAge: string;
  financialFreedom: string;

  // Step 5: Risk Profile
  riskTolerance: string;
  investmentExperience: string;
  marketDropReaction: string;
  investmentHorizon: string;

  // Step 6: Special Needs
  specificServices: string[];
  urgentMatters: string;
  additionalNotes: string;
  preferredContact: string;
  bestTimeToCall: string;
}

const initialFormData: FormData = {
  fullName: '',
  phone: '',
  email: '',
  age: '',
  maritalStatus: '',
  children: '',
  occupation: '',
  industry: '',
  monthlyIncome: '',
  additionalIncome: '',
  monthlyExpenses: '',
  existingSavings: '',
  realEstate: '',
  loans: '',
  pensionFunds: [],
  insurancePolicies: [],
  investments: [],
  otherProducts: '',
  shortTermGoals: [],
  longTermGoals: [],
  retirementAge: '',
  financialFreedom: '',
  riskTolerance: '',
  investmentExperience: '',
  marketDropReaction: '',
  investmentHorizon: '',
  specificServices: [],
  urgentMatters: '',
  additionalNotes: '',
  preferredContact: '',
  bestTimeToCall: ''
};

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const steps = [
  { number: 1, title: 'פרטים אישיים', icon: User },
  { number: 2, title: 'מצב פיננסי', icon: Wallet },
  { number: 3, title: 'מוצרים קיימים', icon: FileText },
  { number: 4, title: 'יעדים', icon: Target },
  { number: 5, title: 'פרופיל סיכון', icon: BarChart3 },
  { number: 6, title: 'צרכים מיוחדים', icon: Shield }];


  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[];
    if (currentArray.includes(value)) {
      updateField(field, currentArray.filter((v) => v !== value));
    } else {
      updateField(field, [...currentArray, value]);
    }
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!(formData.fullName && formData.phone && formData.email);
      case 2:
        return !!formData.monthlyIncome;
      case 3:
        return true;
      case 4:
        return true;
      case 5:
        return !!formData.riskTolerance;
      case 6:
        return !!formData.preferredContact;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1 as Step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1 as Step);
    }
  };

  const handleSubmit = async () => {
    if (!supabase) return;
    
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { data, error } = await supabase.functions.invoke('send-onboarding-email', {
        body: formData
      });

      if (error) throw error;

      setIsSubmitted(true);
    } catch (err) {
      console.error('Error sending onboarding data:', err);
      setSubmitError('אירעה שגיאה בשליחת הטופס. אנא נסו שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div data-ev-id="ev_c7137817a5" className="flex flex-col gap-6">
            <h2 data-ev-id="ev_c654e9273a" className="text-2xl font-bold text-navy">פרטים אישיים</h2>
            <p data-ev-id="ev_d6009218f8" className="text-slate">ספרו לנו קצת על עצמכם כדי שנוכל להתאים את השירות בצורה הטובה ביותר.</p>
            
            <div data-ev-id="ev_7f74023773" className="grid md:grid-cols-2 gap-4">
              <div data-ev-id="ev_5e7d71ffc5">
                <label data-ev-id="ev_f4ea808b6e" className="block text-sm font-medium text-navy mb-2">שם מלא *</label>
                <input data-ev-id="ev_5b194ed868"
                type="text"
                value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                placeholder="ישראל ישראלי" />

              </div>
              
              <div data-ev-id="ev_219817eb74">
                <label data-ev-id="ev_6630b29238" className="block text-sm font-medium text-navy mb-2">טלפון *</label>
                <input data-ev-id="ev_437d7c9784"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                placeholder="050-0000000" />

              </div>
              
              <div data-ev-id="ev_01f2046cf5">
                <label data-ev-id="ev_14530a7bc1" className="block text-sm font-medium text-navy mb-2">אימייל *</label>
                <input data-ev-id="ev_7a198cb5d5"
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                placeholder="email@example.com" />

              </div>
              
              <div data-ev-id="ev_b510b3a386">
                <label data-ev-id="ev_3d6d330238" className="block text-sm font-medium text-navy mb-2">גיל</label>
                <input data-ev-id="ev_5463c4a998"
                type="number"
                value={formData.age}
                onChange={(e) => updateField('age', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                placeholder="35" />

              </div>
              
              <div data-ev-id="ev_34734ed03d">
                <label data-ev-id="ev_49b33a77cc" className="block text-sm font-medium text-navy mb-2">מצב משפחתי</label>
                <select data-ev-id="ev_6f79a6c14e"
                value={formData.maritalStatus}
                onChange={(e) => updateField('maritalStatus', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white">

                  <option data-ev-id="ev_d425dd0dd2" value="">בחרו...</option>
                  <option data-ev-id="ev_e572e2c4b5" value="single">רווק/ה</option>
                  <option data-ev-id="ev_6a2d13c4ee" value="married">נשוא/ה</option>
                  <option data-ev-id="ev_866646b48b" value="divorced">גרוש/ה</option>
                  <option data-ev-id="ev_6098951ffc" value="widowed">אלמן/ה</option>
                </select>
              </div>
              
              <div data-ev-id="ev_8024dbdde4">
                <label data-ev-id="ev_0cef4397de" className="block text-sm font-medium text-navy mb-2">מספר ילדים</label>
                <input data-ev-id="ev_cf92c400db"
                type="number"
                value={formData.children}
                onChange={(e) => updateField('children', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                placeholder="0" />

              </div>
              
              <div data-ev-id="ev_3544e29e92">
                <label data-ev-id="ev_66dfa4f542" className="block text-sm font-medium text-navy mb-2">מקצוע / תפקיד</label>
                <input data-ev-id="ev_587eb993db"
                type="text"
                value={formData.occupation}
                onChange={(e) => updateField('occupation', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                placeholder="מהנדס תוכנה" />

              </div>
              
              <div data-ev-id="ev_033537f65b">
                <label data-ev-id="ev_d2b0af64b1" className="block text-sm font-medium text-navy mb-2">תעשייה</label>
                <input data-ev-id="ev_715456038e"
                type="text"
                value={formData.industry}
                onChange={(e) => updateField('industry', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                placeholder="הייטק" />

              </div>
            </div>
          </div>);


      case 2:
        return (
          <div data-ev-id="ev_8c1d547b66" className="flex flex-col gap-6">
            <h2 data-ev-id="ev_5b3add5860" className="text-2xl font-bold text-navy">מצב פיננסי נוכחי</h2>
            <p data-ev-id="ev_e19e4498bb" className="text-slate">מידע זה יעזור לנו להבין את התמונה המלאה ולהתאים את ההמלצות.</p>
            
            <div data-ev-id="ev_fd4952d296" className="grid md:grid-cols-2 gap-4">
              <div data-ev-id="ev_914c5c29ba">
                <label data-ev-id="ev_6e4c0cfd4f" className="block text-sm font-medium text-navy mb-2">הכנסה חודשית נטו (⪨) *</label>
                <select data-ev-id="ev_7687504878"
                value={formData.monthlyIncome}
                onChange={(e) => updateField('monthlyIncome', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white">

                  <option data-ev-id="ev_78b3d9c979" value="">בחרו טווח...</option>
                  <option data-ev-id="ev_631795905a" value="under-15k">עד 15,000 ⪨</option>
                  <option data-ev-id="ev_d2e1e42cc2" value="15k-25k">15,000 - 25,000 ⪨</option>
                  <option data-ev-id="ev_0f65b55662" value="25k-40k">25,000 - 40,000 ⪨</option>
                  <option data-ev-id="ev_fbcd27c5c7" value="40k-60k">40,000 - 60,000 ⪨</option>
                  <option data-ev-id="ev_d18a777fae" value="60k-100k">60,000 - 100,000 ⪨</option>
                  <option data-ev-id="ev_a97e5d92c8" value="over-100k">מעל 100,000 ⪨</option>
                </select>
              </div>
              
              <div data-ev-id="ev_296d98431a">
                <label data-ev-id="ev_1b77aa3202" className="block text-sm font-medium text-navy mb-2">הכנסות נוספות (אופציות, דיבידנדים, שכ"ד)</label>
                <input data-ev-id="ev_8203715451"
                type="text"
                value={formData.additionalIncome}
                onChange={(e) => updateField('additionalIncome', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                placeholder="פרטו אם רלוונטי" />

              </div>
              
              <div data-ev-id="ev_5f44c2489b">
                <label data-ev-id="ev_66c9b94044" className="block text-sm font-medium text-navy mb-2">הוצאות חודשיות ממוצעות</label>
                <select data-ev-id="ev_631cdb3c0d"
                value={formData.monthlyExpenses}
                onChange={(e) => updateField('monthlyExpenses', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white">

                  <option data-ev-id="ev_7a3f3fb933" value="">בחרו טווח...</option>
                  <option data-ev-id="ev_549deab7ce" value="under-10k">עד 10,000 ⪨</option>
                  <option data-ev-id="ev_a43aac98c3" value="10k-20k">10,000 - 20,000 ⪨</option>
                  <option data-ev-id="ev_839d9515ab" value="20k-35k">20,000 - 35,000 ⪨</option>
                  <option data-ev-id="ev_3ac99d8478" value="35k-50k">35,000 - 50,000 ⪨</option>
                  <option data-ev-id="ev_88f6a9f1a6" value="over-50k">מעל 50,000 ⪨</option>
                </select>
              </div>
              
              <div data-ev-id="ev_92ef2a4a95">
                <label data-ev-id="ev_1e313cf222" className="block text-sm font-medium text-navy mb-2">חסכונות נזילים (משוער)</label>
                <select data-ev-id="ev_5aa6561aa4"
                value={formData.existingSavings}
                onChange={(e) => updateField('existingSavings', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white">

                  <option data-ev-id="ev_8bb098140b" value="">בחרו טווח...</option>
                  <option data-ev-id="ev_607c850b13" value="under-100k">עד 100,000 ⪨</option>
                  <option data-ev-id="ev_70174dc1fc" value="100k-500k">100,000 - 500,000 ⪨</option>
                  <option data-ev-id="ev_78c5171f3b" value="500k-1m">500,000 - 1,000,000 ⪨</option>
                  <option data-ev-id="ev_1449221aab" value="1m-3m">1 - 3 מיליון ⪨</option>
                  <option data-ev-id="ev_5e5a2bac6c" value="3m-10m">3 - 10 מיליון ⪨</option>
                  <option data-ev-id="ev_dbf63c5e4e" value="over-10m">מעל 10 מיליון ⪨</option>
                </select>
              </div>
              
              <div data-ev-id="ev_e9b83b708d">
                <label data-ev-id="ev_ddae5099af" className="block text-sm font-medium text-navy mb-2">נדל"ן (שווי משוער)</label>
                <input data-ev-id="ev_136e294f4c"
                type="text"
                value={formData.realEstate}
                onChange={(e) => updateField('realEstate', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                placeholder="לדוגמה: דירה בתל אביב - 3 מיליון" />

              </div>
              
              <div data-ev-id="ev_04cf320177">
                <label data-ev-id="ev_837f15e7e9" className="block text-sm font-medium text-navy mb-2">הלוואות / משכנתאות</label>
                <input data-ev-id="ev_18232e8928"
                type="text"
                value={formData.loans}
                onChange={(e) => updateField('loans', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                placeholder="פרטו אם יש" />

              </div>
            </div>
          </div>);


      case 3:
        return (
          <div data-ev-id="ev_d917b6fc8a" className="flex flex-col gap-6">
            <h2 data-ev-id="ev_546626785a" className="text-2xl font-bold text-navy">מוצרים פיננסיים קיימים</h2>
            <p data-ev-id="ev_941fb19e0f" className="text-slate">סמנו את המוצרים הפיננסיים שיש לכם כיום.</p>
            
            <div data-ev-id="ev_f9ada145cf">
              <label data-ev-id="ev_007ad9d525" className="block text-sm font-medium text-navy mb-3">קרנות פנסיה / גמל</label>
              <div data-ev-id="ev_7433ca36bd" className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['קרן פנסיה', 'קופת גמל', 'ביטוח מנהלים', 'קרן השתלמות', 'לא יודע / לא בטוח'].map((item) =>
                <button data-ev-id="ev_39af7a092f"
                key={item}
                type="button"
                onClick={() => toggleArrayField('pensionFunds', item)}
                className={`px-4 py-3 rounded-lg border transition-colors text-sm ${
                formData.pensionFunds.includes(item) ?
                'bg-gold text-navy border-gold' :
                'bg-white border-border hover:border-gold'}`
                }>

                    {item}
                  </button>
                )}
              </div>
            </div>
            
            <div data-ev-id="ev_14907761d5">
              <label data-ev-id="ev_3efa629788" className="block text-sm font-medium text-navy mb-3">פוליסות ביטוח</label>
              <div data-ev-id="ev_95a52fef25" className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['ביטוח חיים', 'ביטוח בריאות', 'ביטוח סיעודי', 'ביטוח אובדן כושר עבודה', 'לא בטוח'].map((item) =>
                <button data-ev-id="ev_dd8b6097cd"
                key={item}
                type="button"
                onClick={() => toggleArrayField('insurancePolicies', item)}
                className={`px-4 py-3 rounded-lg border transition-colors text-sm ${
                formData.insurancePolicies.includes(item) ?
                'bg-gold text-navy border-gold' :
                'bg-white border-border hover:border-gold'}`
                }>

                    {item}
                  </button>
                )}
              </div>
            </div>
            
            <div data-ev-id="ev_8ebdd38fee">
              <label data-ev-id="ev_291833d3e5" className="block text-sm font-medium text-navy mb-3">השקעות קיימות</label>
              <div data-ev-id="ev_2106504cab" className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['תיק השקעות מנוהל', 'קרנות נאמנות', 'מניות', 'קרן השתלמות', 'אופציות עובדים', 'אין השקעות'].map((item) =>
                <button data-ev-id="ev_0754fcb837"
                key={item}
                type="button"
                onClick={() => toggleArrayField('investments', item)}
                className={`px-4 py-3 rounded-lg border transition-colors text-sm ${
                formData.investments.includes(item) ?
                'bg-gold text-navy border-gold' :
                'bg-white border-border hover:border-gold'}`
                }>

                    {item}
                  </button>
                )}
              </div>
            </div>
            
            <div data-ev-id="ev_248f992408">
              <label data-ev-id="ev_b67bbf6819" className="block text-sm font-medium text-navy mb-2">מוצרים נוספים</label>
              <textarea data-ev-id="ev_0aebf0fba7"
              value={formData.otherProducts}
              onChange={(e) => updateField('otherProducts', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
              rows={3}
              placeholder="פרטו מוצרים נוספים שלא צוינו למעלה..." />

            </div>
          </div>);


      case 4:
        return (
          <div data-ev-id="ev_361c1bef7b" className="flex flex-col gap-6">
            <h2 data-ev-id="ev_54b2747eed" className="text-2xl font-bold text-navy">יעדים פיננסיים</h2>
            <p data-ev-id="ev_c77139c073" className="text-slate">מה אתם רוצים להשיג? בטווח הקרוב ובטווח הארוך.</p>
            
            <div data-ev-id="ev_2e44b7ab3f">
              <label data-ev-id="ev_68429dbf39" className="block text-sm font-medium text-navy mb-3">יעדים לטווח קצר (1-5 שנים)</label>
              <div data-ev-id="ev_db57cc09bb" className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['רכישת דירה', 'רכישת רכב', 'חתונה', 'טיול משפחתי', 'קרן חירום לילדים', 'השקעות להכנסה נוספת'].map((item) =>
                <button data-ev-id="ev_d5df736587"
                key={item}
                type="button"
                onClick={() => toggleArrayField('shortTermGoals', item)}
                className={`px-4 py-3 rounded-lg border transition-colors text-sm ${
                formData.shortTermGoals.includes(item) ?
                'bg-gold text-navy border-gold' :
                'bg-white border-border hover:border-gold'}`
                }>

                    {item}
                  </button>
                )}
              </div>
            </div>
            
            <div data-ev-id="ev_fefdd091a7">
              <label data-ev-id="ev_4967ede516" className="block text-sm font-medium text-navy mb-3">יעדים לטווח ארוך (5+ שנים)</label>
              <div data-ev-id="ev_68b9d6d460" className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['פרישה מוקדמת', 'חופש כלכלי', 'העברת עושר לדור הבא', 'מימון לימודים אקדמיים', 'הגנה על הון'].map((item) =>
                <button data-ev-id="ev_ee63d502b4"
                key={item}
                type="button"
                onClick={() => toggleArrayField('longTermGoals', item)}
                className={`px-4 py-3 rounded-lg border transition-colors text-sm ${
                formData.longTermGoals.includes(item) ?
                'bg-gold text-navy border-gold' :
                'bg-white border-border hover:border-gold'}`
                }>

                    {item}
                  </button>
                )}
              </div>
            </div>
            
            <div data-ev-id="ev_149610bf8e" className="grid md:grid-cols-2 gap-4">
              <div data-ev-id="ev_2fc1e56e28">
                <label data-ev-id="ev_47123e09eb" className="block text-sm font-medium text-navy mb-2">גיל פרישה מתוכנן</label>
                <input data-ev-id="ev_9fafc8e59c"
                type="number"
                value={formData.retirementAge}
                onChange={(e) => updateField('retirementAge', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                placeholder="55" />

              </div>
              
              <div data-ev-id="ev_125b6c2e95">
                <label data-ev-id="ev_a1fdbc286c" className="block text-sm font-medium text-navy mb-2">הכנסה חודשית רצויה בפרישה</label>
                <input data-ev-id="ev_1a030218bb"
                type="text"
                value={formData.financialFreedom}
                onChange={(e) => updateField('financialFreedom', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50"
                placeholder="30,000 ⪨" />

              </div>
            </div>
          </div>);


      case 5:
        return (
          <div data-ev-id="ev_a7187e0858" className="flex flex-col gap-6">
            <h2 data-ev-id="ev_322c5ee7cc" className="text-2xl font-bold text-navy">פרופיל סיכון</h2>
            <p data-ev-id="ev_6f462c19ca" className="text-slate">הבנת פרופיל הסיכון שלכם תעזור לנו להתאים אסטרטגיית השקעה מותאמת.</p>
            
            <div data-ev-id="ev_a7516bc25e">
              <label data-ev-id="ev_9b3ef09964" className="block text-sm font-medium text-navy mb-3">מה רמת הסיכון שלכם? *</label>
              <div data-ev-id="ev_4c2aa47517" className="flex flex-col gap-3">
                {[
                { value: 'conservative', label: 'שמרני - מעדיף שמירה על תשואה גבוהה' },
                { value: 'moderate', label: 'מאוזן - מוכן לתנודות מתונות לטובת תשואה אפשרית' },
                { value: 'aggressive', label: 'אגרסיבי - מוכן לתנודות גבוהות לטובת תשואות גבוהות' }].
                map((option) =>
                <button data-ev-id="ev_e7ec557a1f"
                key={option.value}
                type="button"
                onClick={() => updateField('riskTolerance', option.value)}
                className={`px-4 py-4 rounded-lg border transition-colors text-right ${
                formData.riskTolerance === option.value ?
                'bg-gold text-navy border-gold' :
                'bg-white border-border hover:border-gold'}`
                }>

                    {option.label}
                  </button>
                )}
              </div>
            </div>
            
            <div data-ev-id="ev_322c029f91">
              <label data-ev-id="ev_98896af94e" className="block text-sm font-medium text-navy mb-3">ניסיון בהשקעות</label>
              <div data-ev-id="ev_b05ecc2742" className="flex flex-col gap-3">
                {[
                { value: 'none', label: 'אין ניסיון - חדש בתחום' },
                { value: 'basic', label: 'בסיסי - מכיר מושגים בסיסיים' },
                { value: 'intermediate', label: 'בינוני - משקיע באופן עצמאי' },
                { value: 'advanced', label: 'מתקדם - ניסיון רב בשוקי ההון' }].
                map((option) =>
                <button data-ev-id="ev_eab62f967b"
                key={option.value}
                type="button"
                onClick={() => updateField('investmentExperience', option.value)}
                className={`px-4 py-4 rounded-lg border transition-colors text-right ${
                formData.investmentExperience === option.value ?
                'bg-gold text-navy border-gold' :
                'bg-white border-border hover:border-gold'}`
                }>

                    {option.label}
                  </button>
                )}
              </div>
            </div>
            
            <div data-ev-id="ev_626d02bda6">
              <label data-ev-id="ev_b04d53c5b1" className="block text-sm font-medium text-navy mb-3">איך תגיבו לירידה של 20% בתיק ההשקעות?</label>
              <div data-ev-id="ev_56347a45ba" className="flex flex-col gap-3">
                {[
                { value: 'sell', label: 'אמכור הכל - לא יכול לסבול הפסדים' },
                { value: 'wait', label: 'אחכה להתאוששות - לא אעשה כלום' },
                { value: 'buy', label: 'אנצל את ההזדמנות - אקנה עוד' }].
                map((option) =>
                <button data-ev-id="ev_959aafcd44"
                key={option.value}
                type="button"
                onClick={() => updateField('marketDropReaction', option.value)}
                className={`px-4 py-4 rounded-lg border transition-colors text-right ${
                formData.marketDropReaction === option.value ?
                'bg-gold text-navy border-gold' :
                'bg-white border-border hover:border-gold'}`
                }>

                    {option.label}
                  </button>
                )}
              </div>
            </div>
          </div>);


      case 6:
        return (
          <div data-ev-id="ev_39b15d3a6c" className="flex flex-col gap-6">
            <h2 data-ev-id="ev_c7b8f5bc2d" className="text-2xl font-bold text-navy">צרכים מיוחדים והעדפות</h2>
            <p data-ev-id="ev_d91ecf9a86" className="text-slate">כמעט סיימנו! ספרו לנו אם יש לכם צרכים מיוחדים או העדפות ליצירת קשר.</p>
            
            <div data-ev-id="ev_f0ea33b283">
              <label data-ev-id="ev_eed6e209ed" className="block text-sm font-medium text-navy mb-3">שירותים שמעניינים אתכם</label>
              <div data-ev-id="ev_babd0340bf" className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['תכנון פרישה', 'מיסוי אופציות', 'תיאום מס', 'ניהול תיק השקעות', 'ביטוח ופנסיה', 'השקעות אלטרנטיביות'].map((item) =>
                <button data-ev-id="ev_cb5cbb3412"
                key={item}
                type="button"
                onClick={() => toggleArrayField('specificServices', item)}
                className={`px-4 py-3 rounded-lg border transition-colors text-sm ${
                formData.specificServices.includes(item) ?
                'bg-gold text-navy border-gold' :
                'bg-white border-border hover:border-gold'}`
                }>

                    {item}
                  </button>
                )}
              </div>
            </div>
            
            <div data-ev-id="ev_6459b8e670">
              <label data-ev-id="ev_df828813e9" className="block text-sm font-medium text-navy mb-2">נושאים דחופים לטיפול</label>
              <textarea data-ev-id="ev_1e8b550bed"
              value={formData.urgentMatters}
              onChange={(e) => updateField('urgentMatters', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
              rows={3}
              placeholder="האם יש משהו דחוף שצריך טיפול מיידי?" />

            </div>
            
            <div data-ev-id="ev_22812612fd">
              <label data-ev-id="ev_6aeca35c7e" className="block text-sm font-medium text-navy mb-2">הערות נוספות</label>
              <textarea data-ev-id="ev_a307e067a2"
              value={formData.additionalNotes}
              onChange={(e) => updateField('additionalNotes', e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
              rows={3}
              placeholder="משהו נוסף שתרצו שנדע?" />

            </div>
            
            <div data-ev-id="ev_ebd918b616" className="grid md:grid-cols-2 gap-4">
              <div data-ev-id="ev_42c99bef9c">
                <label data-ev-id="ev_e0918ccc5a" className="block text-sm font-medium text-navy mb-2">אמצעי תקשורת מועדף *</label>
                <select data-ev-id="ev_fbae3b6810"
                value={formData.preferredContact}
                onChange={(e) => updateField('preferredContact', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white">

                  <option data-ev-id="ev_316c7b7009" value="">בחרו...</option>
                  <option data-ev-id="ev_7d96dc2a28" value="phone">טלפון</option>
                  <option data-ev-id="ev_58c5827b87" value="whatsapp">וואטסאפ</option>
                  <option data-ev-id="ev_5f3bd211e2" value="email">אימייל</option>
                  <option data-ev-id="ev_552642a60c" value="zoom">שיחת זום</option>
                </select>
              </div>
              
              <div data-ev-id="ev_e0bd48c932">
                <label data-ev-id="ev_a7056d724b" className="block text-sm font-medium text-navy mb-2">שעות נוחות לשיחה</label>
                <select data-ev-id="ev_2918921f54"
                value={formData.bestTimeToCall}
                onChange={(e) => updateField('bestTimeToCall', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white">

                  <option data-ev-id="ev_a88d5e3c99" value="">בחרו...</option>
                  <option data-ev-id="ev_b81b08bf06" value="morning">בוקר (8:00-12:00)</option>
                  <option data-ev-id="ev_b6470da666" value="afternoon">צהריים (12:00-17:00)</option>
                  <option data-ev-id="ev_706e7db453" value="evening">ערב (17:00-20:00)</option>
                </select>
              </div>
            </div>
          </div>);


      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div data-ev-id="ev_b6e274a51c" className="min-h-screen bg-light font-sans flex items-center justify-center p-4">
        <div data-ev-id="ev_ee04056ed6" className="bg-white rounded-3xl shadow-lg p-8 md:p-12 max-w-lg w-full text-center">
          <div data-ev-id="ev_bc8dad6188" className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 data-ev-id="ev_4df58998cc" className="text-2xl font-bold text-navy mb-4">תודה רבה!</h2>
          <p data-ev-id="ev_7b33cee6f5" className="text-slate mb-6">
            קיבלנו את הפרטים שלך בהצלחה. נציג איתך בקרוב כדי לתאם פגישת היכרות.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-semibold px-6 py-3 rounded-lg transition-colors">

            <span data-ev-id="ev_dc23bb6321">חזרה לאתר</span>
          </Link>
        </div>
      </div>);

  }

  return (
    <div data-ev-id="ev_1c1b276e57" className="min-h-screen bg-light font-sans">
      {/* Header */}
      <header data-ev-id="ev_aa10117d63" className="bg-white border-b border-border">
        <div data-ev-id="ev_746c360b32" className="max-w-4xl mx-auto px-4 py-4">
          <div data-ev-id="ev_2a0c4570da" className="flex items-center justify-between">
            <Logo />
            <span data-ev-id="ev_1c6d1a23b6" className="text-sm text-slate">שאלון היכרות</span>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div data-ev-id="ev_65d97d1341" className="bg-white border-b border-border sticky top-0 z-40">
        <div data-ev-id="ev_98266da4ae" className="max-w-4xl mx-auto px-4 py-4">
          <div data-ev-id="ev_1c72cf7673" className="flex items-center justify-between mb-4">
            {steps.map((step, index) =>
            <div data-ev-id="ev_8ea5e09373" key={step.number} className="flex items-center">
                <div data-ev-id="ev_827bc628fe"
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
              currentStep > step.number ?
              'bg-green-500 text-white' :
              currentStep === step.number ?
              'bg-gold text-navy' :
              'bg-muted text-slate'}`
              }>

                  {currentStep > step.number ?
                <Check className="w-5 h-5" /> :

                <step.icon className="w-5 h-5" />
                }
                </div>
                {index < steps.length - 1 &&
              <div data-ev-id="ev_af7c5190be"
              className={`hidden sm:block w-12 lg:w-24 h-1 mx-2 rounded ${
              currentStep > step.number ? 'bg-green-500' : 'bg-muted'}`
              } />

              }
              </div>
            )}
          </div>
          <div data-ev-id="ev_d619fe2178" className="text-center">
            <span data-ev-id="ev_624aaed1ac" className="text-sm text-slate">שלב {currentStep} מתוך 6</span>
            <h3 data-ev-id="ev_9a6e51a080" className="font-semibold text-navy">{steps[currentStep - 1].title}</h3>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main data-ev-id="ev_d4a5deec7e" className="max-w-4xl mx-auto px-4 py-8">
        <div data-ev-id="ev_025015dcc3" className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-8">
          {renderStepContent()}

          {submitError &&
          <div data-ev-id="ev_97f5a2cc59" className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p data-ev-id="ev_42e066fc08" className="text-red-700">{submitError}</p>
            </div>
          }

          {/* Navigation Buttons */}
          <div data-ev-id="ev_2c0112330b" className="flex justify-between items-center mt-8 pt-6 border-t border-border">
            <button data-ev-id="ev_9ffd46e6ca"
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
            currentStep === 1 ?
            'text-slate/50 cursor-not-allowed' :
            'text-navy hover:bg-muted'}`
            }>

              <ChevronRight className="w-5 h-5" />
              <span data-ev-id="ev_56db46b5d4">הקודם</span>
            </button>

            {currentStep < 6 ?
            <button data-ev-id="ev_5c68c29aaf"
            type="button"
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
            canProceed() ?
            'bg-gold hover:bg-gold-light text-navy' :
            'bg-muted text-slate cursor-not-allowed'}`
            }>

                <span data-ev-id="ev_4fb75f99bf">הבא</span>
                <ChevronLeft className="w-5 h-5" />
              </button> :

            <button data-ev-id="ev_a80d8e4e67"
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed() || isSubmitting}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors ${
            canProceed() && !isSubmitting ?
            'bg-green-600 hover:bg-green-700 text-white' :
            'bg-muted text-slate cursor-not-allowed'}`
            }>

                {isSubmitting ?
              <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span data-ev-id="ev_ae91746926">שולח...</span>
                  </> :

              <>
                    <span data-ev-id="ev_c812cc915a">שלח וסיים</span>
                    <Check className="w-5 h-5" />
                  </>
              }
              </button>
            }
          </div>
        </div>
      </main>
    </div>);

}