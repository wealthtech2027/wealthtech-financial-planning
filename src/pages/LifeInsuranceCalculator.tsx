import { useState } from 'react';
import { Link } from 'react-router';
import {
  Menu,
  X,
  Calculator,
  User,
  Users,
  Wallet,
  Home,
  GraduationCap,
  PiggyBank,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Shield,
  AlertTriangle,
  TrendingUp,
  Phone,
  Mail,
  RefreshCw,
  FileText,
  Send } from
'lucide-react';
import { Logo } from '@/components/Logo';

// Types
interface FormData {
  // Step 1: Personal Details
  age: number;
  gender: 'male' | 'female' | '';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | '';
  numberOfChildren: number;
  childrenAges: string;

  // Step 2: Income
  monthlyIncome: number;
  incomeReplacementPercent: number;
  yearsOfProtection: number;

  // Step 3: Liabilities
  mortgageBalance: number;
  otherLoans: number;
  otherLiabilities: number;

  // Step 4: Future Needs
  childrenEducation: number;
  emergencyFund: number;
  otherExpenses: number;

  // Step 5: Existing Assets
  savings: number;
  investments: number;
  existingInsurance: number;
  otherAssets: number;
}

interface CalculationResult {
  recommended: number;
  minimum: number;
  enhanced: number;
  breakdown: {
    mortgageCoverage: number;
    loansCoverage: number;
    incomeReplacement: number;
    childrenEducation: number;
    emergencyFund: number;
    otherNeeds: number;
    totalNeeds: number;
    totalAssets: number;
  };
}

const initialFormData: FormData = {
  age: 35,
  gender: '',
  maritalStatus: '',
  numberOfChildren: 0,
  childrenAges: '',
  monthlyIncome: 20000,
  incomeReplacementPercent: 70,
  yearsOfProtection: 15,
  mortgageBalance: 0,
  otherLoans: 0,
  otherLiabilities: 0,
  childrenEducation: 0,
  emergencyFund: 100000,
  otherExpenses: 0,
  savings: 0,
  investments: 0,
  existingInsurance: 0,
  otherAssets: 0
};

const steps = [
{ id: 1, title: 'פרטים אישיים', icon: User },
{ id: 2, title: 'הכנסות', icon: Wallet },
{ id: 3, title: 'התחייבויות', icon: Home },
{ id: 4, title: 'צרכים עתידיים', icon: GraduationCap },
{ id: 5, title: 'נכסים קיימים', icon: PiggyBank }];


export default function LifeInsuranceCalculator() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [leadData, setLeadData] = useState({ name: '', phone: '', email: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const formatNumber = (num: number): string => {
    return num.toLocaleString('he-IL');
  };

  const parseNumber = (value: string): number => {
    return parseInt(value.replace(/,/g, '')) || 0;
  };

  const roundToNearest = (num: number, nearest: number): number => {
    return Math.ceil(num / nearest) * nearest;
  };

  const calculateInsurance = (): CalculationResult => {
    // Income replacement calculation
    const monthlyNeeded = formData.monthlyIncome * (formData.incomeReplacementPercent / 100);
    const incomeReplacement = monthlyNeeded * 12 * formData.yearsOfProtection;

    // Total needs
    const mortgageCoverage = formData.mortgageBalance;
    const loansCoverage = formData.otherLoans + formData.otherLiabilities;
    const childrenEducation = formData.childrenEducation;
    const emergencyFund = formData.emergencyFund;
    const otherNeeds = formData.otherExpenses;

    const totalNeeds = mortgageCoverage + loansCoverage + incomeReplacement + childrenEducation + emergencyFund + otherNeeds;

    // Total assets to deduct
    const totalAssets = formData.savings + formData.investments + formData.existingInsurance + formData.otherAssets;

    // Calculate recommended amount
    let recommended = totalNeeds - totalAssets;

    // Ensure non-negative
    if (recommended < 0) recommended = 0;

    // Round to nearest 50,000
    recommended = roundToNearest(recommended, 50000);

    // Calculate ranges
    const minimum = roundToNearest(recommended * 0.85, 50000);
    const enhanced = roundToNearest(recommended * 1.15, 50000);

    return {
      recommended,
      minimum,
      enhanced,
      breakdown: {
        mortgageCoverage,
        loansCoverage,
        incomeReplacement,
        childrenEducation,
        emergencyFund,
        otherNeeds,
        totalNeeds,
        totalAssets
      }
    };
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate and show results
      const calculationResult = calculateInsurance();
      setResult(calculationResult);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setResult(null);
    setLeadSubmitted(false);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
      const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
            source: `מחשבון ביטוח חיים - סכום מומלץ: ${formatNumber(result?.recommended || 0)} ₪${leadData.notes ? ` | הערות: ${leadData.notes}` : ''}`
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

  const updateField = (field: keyof FormData, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div data-ev-id="ev_54430422c6" className="space-y-6">
            <h3 data-ev-id="ev_c6523d28ff" className="text-xl font-bold text-ink mb-4">פרטים אישיים</h3>
            
            {/* Age */}
            <div data-ev-id="ev_b7471d2579">
              <label data-ev-id="ev_159467b14b" className="block text-sm font-medium text-ink mb-2">גיל</label>
              <input data-ev-id="ev_d60d2d7a39"
              type="range"
              min="18"
              max="70"
              value={formData.age}
              onChange={(e) => updateField('age', parseInt(e.target.value))}
              className="w-full h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-gold" />

              <div data-ev-id="ev_2927466fac" className="flex justify-between text-sm text-ink-muted mt-1">
                <span data-ev-id="ev_5eaed833ca">18</span>
                <span data-ev-id="ev_d3c9f6487d" className="font-bold text-ink text-lg">{formData.age}</span>
                <span data-ev-id="ev_6170009ab5">70</span>
              </div>
            </div>
            
            {/* Gender */}
            <div data-ev-id="ev_dd813d9756">
              <label data-ev-id="ev_8d776c0735" className="block text-sm font-medium text-ink mb-2">מין</label>
              <div data-ev-id="ev_d68110c567" className="flex gap-4">
                <button data-ev-id="ev_dcf7e4d03a"
                type="button"
                onClick={() => updateField('gender', 'male')}
                className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                formData.gender === 'male' ?
                'border-gold bg-gold/10 text-ink' :
                'border-border bg-surface text-ink-muted hover:border-gold/50'}`
                }>

                  זכר
                </button>
                <button data-ev-id="ev_4e4fff3e6a"
                type="button"
                onClick={() => updateField('gender', 'female')}
                className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                formData.gender === 'female' ?
                'border-gold bg-gold/10 text-ink' :
                'border-border bg-surface text-ink-muted hover:border-gold/50'}`
                }>

                  נקבה
                </button>
              </div>
            </div>
            
            {/* Marital Status */}
            <div data-ev-id="ev_09e842fd04">
              <label data-ev-id="ev_5192348ce2" className="block text-sm font-medium text-ink mb-2">מצב משפחתי</label>
              <div data-ev-id="ev_a14cec7555" className="grid grid-cols-2 gap-3">
                {[
                { value: 'single', label: 'רווק/ה' },
                { value: 'married', label: 'נשוי/אה' },
                { value: 'divorced', label: 'גרוש/ה' },
                { value: 'widowed', label: 'אלמן/ה' }].
                map((option) =>
                <button data-ev-id="ev_9a0b16e16b"
                key={option.value}
                type="button"
                onClick={() => updateField('maritalStatus', option.value)}
                className={`py-3 px-4 rounded-xl border-2 transition-all ${
                formData.maritalStatus === option.value ?
                'border-gold bg-gold/10 text-ink' :
                'border-border bg-surface text-ink-muted hover:border-gold/50'}`
                }>

                    {option.label}
                  </button>
                )}
              </div>
            </div>
            
            {/* Number of Children */}
            <div data-ev-id="ev_1e6d1a397b">
              <label data-ev-id="ev_c2ada7207a" className="block text-sm font-medium text-ink mb-2">מספר ילדים</label>
              <div data-ev-id="ev_d7ee73e42f" className="flex gap-2">
                {[0, 1, 2, 3, 4, 5].map((num) =>
                <button data-ev-id="ev_dea90b3d2f"
                key={num}
                type="button"
                onClick={() => updateField('numberOfChildren', num)}
                className={`w-12 h-12 rounded-xl border-2 transition-all font-bold ${
                formData.numberOfChildren === num ?
                'border-gold bg-gold text-navy-dark' :
                'border-border bg-surface text-ink-muted hover:border-gold/50'}`
                }>

                    {num === 5 ? '5+' : num}
                  </button>
                )}
              </div>
            </div>
            
            {/* Children Ages */}
            {formData.numberOfChildren > 0 &&
            <div data-ev-id="ev_fbbae7c25a">
                <label data-ev-id="ev_09ea091732" className="block text-sm font-medium text-ink mb-2">גילאי הילדים (מופרדים בפסיק)</label>
                <input data-ev-id="ev_d526751ee4"
              type="text"
              value={formData.childrenAges}
              onChange={(e) => updateField('childrenAges', e.target.value)}
              placeholder="לדוגמה: 5, 8, 12"
              className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50" />

              </div>
            }
          </div>);


      case 2:
        return (
          <div data-ev-id="ev_f0438d81c2" className="space-y-6">
            <h3 data-ev-id="ev_ffd5b0c86d" className="text-xl font-bold text-ink mb-4">הכנסות</h3>
            
            {/* Monthly Income */}
            <div data-ev-id="ev_efa2f314f6">
              <label data-ev-id="ev_61d7032c32" className="block text-sm font-medium text-ink mb-2">הכנסה חודשית נטו של משק הבית</label>
              <div data-ev-id="ev_d2267778be" className="relative">
                <input data-ev-id="ev_1fbc421ad2"
                type="text"
                value={formatNumber(formData.monthlyIncome)}
                onChange={(e) => updateField('monthlyIncome', parseNumber(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 text-left"
                dir="ltr" />

                <span data-ev-id="ev_9e1e6c3317" className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">₪</span>
              </div>
              <input data-ev-id="ev_068a30fe70"
              type="range"
              min="5000"
              max="100000"
              step="1000"
              value={formData.monthlyIncome}
              onChange={(e) => updateField('monthlyIncome', parseInt(e.target.value))}
              className="w-full h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-gold mt-2" />

            </div>
            
            {/* Income Replacement Percent */}
            <div data-ev-id="ev_87ec132059">
              <label data-ev-id="ev_3c4fba65da" className="block text-sm font-medium text-ink mb-2">
                אחוז מההכנסה שצריך להחליף במקרה פטירה
              </label>
              <div data-ev-id="ev_50f9f284e4" className="flex items-center gap-4">
                <input data-ev-id="ev_4f785ec05b"
                type="range"
                min="50"
                max="100"
                value={formData.incomeReplacementPercent}
                onChange={(e) => updateField('incomeReplacementPercent', parseInt(e.target.value))}
                className="flex-1 h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-gold" />

                <span data-ev-id="ev_c64538e73e" className="text-2xl font-bold text-ink w-16 text-center">{formData.incomeReplacementPercent}%</span>
              </div>
              <p data-ev-id="ev_5bd902acd2" className="text-sm text-ink-muted mt-1">
                סכום חודשי נדרש: {formatNumber(formData.monthlyIncome * formData.incomeReplacementPercent / 100)} ₪
              </p>
            </div>
            
            {/* Years of Protection */}
            <div data-ev-id="ev_69c56b2369">
              <label data-ev-id="ev_9036b9fb3a" className="block text-sm font-medium text-ink mb-2">
                מספר שנים שהמשפחה תזדקק להכנסה חלופית
              </label>
              <div data-ev-id="ev_b54d219b2b" className="flex items-center gap-4">
                <input data-ev-id="ev_f1f115a42e"
                type="range"
                min="5"
                max="30"
                value={formData.yearsOfProtection}
                onChange={(e) => updateField('yearsOfProtection', parseInt(e.target.value))}
                className="flex-1 h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-gold" />

                <span data-ev-id="ev_d0c5b4458b" className="text-2xl font-bold text-ink w-20 text-center">{formData.yearsOfProtection} שנים</span>
              </div>
            </div>
          </div>);


      case 3:
        return (
          <div data-ev-id="ev_69e4c5401a" className="space-y-6">
            <h3 data-ev-id="ev_d0f06dbdfd" className="text-xl font-bold text-ink mb-4">התחייבויות</h3>
            
            {/* Mortgage */}
            <div data-ev-id="ev_3764ffc9ed">
              <label data-ev-id="ev_3694dfc5ab" className="block text-sm font-medium text-ink mb-2">יתרת משכנתה</label>
              <div data-ev-id="ev_4d2616e323" className="relative">
                <Home className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted" />
                <input data-ev-id="ev_87ac7de9cc"
                type="text"
                value={formatNumber(formData.mortgageBalance)}
                onChange={(e) => updateField('mortgageBalance', parseNumber(e.target.value))}
                className="w-full pr-12 pl-10 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 text-left"
                dir="ltr" />

                <span data-ev-id="ev_a162ca28c6" className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">₪</span>
              </div>
            </div>
            
            {/* Other Loans */}
            <div data-ev-id="ev_0d0726ec46">
              <label data-ev-id="ev_9a564be3be" className="block text-sm font-medium text-ink mb-2">הלוואות נוספות</label>
              <div data-ev-id="ev_cc9f3b2bc5" className="relative">
                <input data-ev-id="ev_b03d400931"
                type="text"
                value={formatNumber(formData.otherLoans)}
                onChange={(e) => updateField('otherLoans', parseNumber(e.target.value))}
                className="w-full px-4 pl-10 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 text-left"
                dir="ltr" />

                <span data-ev-id="ev_a24a3aea19" className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">₪</span>
              </div>
            </div>
            
            {/* Other Liabilities */}
            <div data-ev-id="ev_9121e99e5b">
              <label data-ev-id="ev_73b321724b" className="block text-sm font-medium text-ink mb-2">התחייבויות נוספות</label>
              <div data-ev-id="ev_ea1ab5233a" className="relative">
                <input data-ev-id="ev_ecc2eceb92"
                type="text"
                value={formatNumber(formData.otherLiabilities)}
                onChange={(e) => updateField('otherLiabilities', parseNumber(e.target.value))}
                className="w-full px-4 pl-10 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 text-left"
                dir="ltr" />

                <span data-ev-id="ev_0e629ab6f5" className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">₪</span>
              </div>
            </div>
          </div>);


      case 4:
        return (
          <div data-ev-id="ev_f54cf23cc5" className="space-y-6">
            <h3 data-ev-id="ev_cacac333ba" className="text-xl font-bold text-ink mb-4">צרכים עתידיים</h3>
            
            {/* Children Education */}
            <div data-ev-id="ev_732c72fa6c">
              <label data-ev-id="ev_45da4b9bb8" className="block text-sm font-medium text-ink mb-2">
                <GraduationCap className="inline w-4 h-4 ml-1" />
                סכום נדרש לחינוך הילדים
              </label>
              <div data-ev-id="ev_2d4b896a7e" className="relative">
                <input data-ev-id="ev_cb6c9e299c"
                type="text"
                value={formatNumber(formData.childrenEducation)}
                onChange={(e) => updateField('childrenEducation', parseNumber(e.target.value))}
                className="w-full px-4 pl-10 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 text-left"
                dir="ltr" />

                <span data-ev-id="ev_6205eb252f" className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">₪</span>
              </div>
              <p data-ev-id="ev_e7652585a4" className="text-xs text-ink-muted mt-1">תואר אקדמי עולה בממוצע 100,000-150,000 ₪</p>
            </div>
            
            {/* Emergency Fund */}
            <div data-ev-id="ev_ae4dacf381">
              <label data-ev-id="ev_d1bed7a3cd" className="block text-sm font-medium text-ink mb-2">
                <AlertTriangle className="inline w-4 h-4 ml-1" />
                קרן חירום למשפחה
              </label>
              <div data-ev-id="ev_f9098f3212" className="relative">
                <input data-ev-id="ev_fe83559863"
                type="text"
                value={formatNumber(formData.emergencyFund)}
                onChange={(e) => updateField('emergencyFund', parseNumber(e.target.value))}
                className="w-full px-4 pl-10 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 text-left"
                dir="ltr" />

                <span data-ev-id="ev_b864547b56" className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">₪</span>
              </div>
            </div>
            
            {/* Other Expenses */}
            <div data-ev-id="ev_830a526d9f">
              <label data-ev-id="ev_98afb14a8d" className="block text-sm font-medium text-ink mb-2">הוצאות חד-פעמיות צפויות</label>
              <div data-ev-id="ev_6402be0531" className="relative">
                <input data-ev-id="ev_dc102edb91"
                type="text"
                value={formatNumber(formData.otherExpenses)}
                onChange={(e) => updateField('otherExpenses', parseNumber(e.target.value))}
                className="w-full px-4 pl-10 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 text-left"
                dir="ltr" />

                <span data-ev-id="ev_355e86c7c9" className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">₪</span>
              </div>
            </div>
          </div>);


      case 5:
        return (
          <div data-ev-id="ev_a68b9e24fc" className="space-y-6">
            <h3 data-ev-id="ev_f2d9cfc484" className="text-xl font-bold text-ink mb-4">נכסים קיימים לקיזוז</h3>
            
            {/* Savings */}
            <div data-ev-id="ev_d9194e52af">
              <label data-ev-id="ev_e655b9bd8d" className="block text-sm font-medium text-ink mb-2">
                <PiggyBank className="inline w-4 h-4 ml-1" />
                חסכונות נזילים
              </label>
              <div data-ev-id="ev_f540a92fd3" className="relative">
                <input data-ev-id="ev_a467252d37"
                type="text"
                value={formatNumber(formData.savings)}
                onChange={(e) => updateField('savings', parseNumber(e.target.value))}
                className="w-full px-4 pl-10 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 text-left"
                dir="ltr" />

                <span data-ev-id="ev_6bd8447ef9" className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">₪</span>
              </div>
            </div>
            
            {/* Investments */}
            <div data-ev-id="ev_84787af176">
              <label data-ev-id="ev_ca20299611" className="block text-sm font-medium text-ink mb-2">
                <TrendingUp className="inline w-4 h-4 ml-1" />
                תיקי השקעות
              </label>
              <div data-ev-id="ev_e0f7829a8a" className="relative">
                <input data-ev-id="ev_b53e9e2bae"
                type="text"
                value={formatNumber(formData.investments)}
                onChange={(e) => updateField('investments', parseNumber(e.target.value))}
                className="w-full px-4 pl-10 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 text-left"
                dir="ltr" />

                <span data-ev-id="ev_5a64652d57" className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">₪</span>
              </div>
            </div>
            
            {/* Existing Insurance */}
            <div data-ev-id="ev_30299d22c0">
              <label data-ev-id="ev_d00fbbf25e" className="block text-sm font-medium text-ink mb-2">
                <Shield className="inline w-4 h-4 ml-1" />
                ביטוחי חיים קיימים (סכום כיסוי)
              </label>
              <div data-ev-id="ev_5356fe2f55" className="relative">
                <input data-ev-id="ev_501b147119"
                type="text"
                value={formatNumber(formData.existingInsurance)}
                onChange={(e) => updateField('existingInsurance', parseNumber(e.target.value))}
                className="w-full px-4 pl-10 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 text-left"
                dir="ltr" />

                <span data-ev-id="ev_185103b1ab" className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">₪</span>
              </div>
            </div>
            
            {/* Other Assets */}
            <div data-ev-id="ev_77a0854eef">
              <label data-ev-id="ev_e86a296417" className="block text-sm font-medium text-ink mb-2">כספים נוספים זמינים למשפחה</label>
              <div data-ev-id="ev_f1d33c7266" className="relative">
                <input data-ev-id="ev_f4d73087c7"
                type="text"
                value={formatNumber(formData.otherAssets)}
                onChange={(e) => updateField('otherAssets', parseNumber(e.target.value))}
                className="w-full px-4 pl-10 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 text-left"
                dir="ltr" />

                <span data-ev-id="ev_011632515b" className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">₪</span>
              </div>
            </div>
          </div>);


      default:
        return null;
    }
  };

  return (
    <div data-ev-id="ev_6db66e7005" className="min-h-screen bg-gradient-to-br from-surface-2 to-surface font-sans">
      {/* Navigation */}
      <nav data-ev-id="ev_08890b0aae" className="fixed top-0 right-0 left-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div data-ev-id="ev_8be074f171" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_c683e3d62f" className="flex justify-between items-center h-20">
            <Logo />
            
            <div data-ev-id="ev_ae4de36e18" className="hidden xl:flex items-center gap-4 2xl:gap-7 text-[15px] 2xl:text-base">
              <Link to="/" className="text-ink-muted hover:text-ink transition-colors font-medium">ראשי</Link>
              <Link to="/products" className="text-ink-muted hover:text-ink transition-colors font-medium">מוצרים</Link>
              <Link to="/pension-returns" className="text-ink-muted hover:text-ink transition-colors font-medium">תשואות פנסיה</Link>
              <Link to="/life-insurance-calculator" className="text-gold font-medium">מחשבון ביטוח חיים</Link>
              <a data-ev-id="ev_9938b804bb"
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

            <button data-ev-id="ev_665333a07a"
            className="xl:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen &&
        <div data-ev-id="ev_6c536aa22a" className="xl:hidden bg-surface border-t border-border">
            <div data-ev-id="ev_65732b5a63" className="px-4 py-4 flex flex-col gap-4">
              <Link to="/" className="text-ink-muted hover:text-ink font-medium py-2">ראשי</Link>
              <Link to="/products" className="text-ink-muted hover:text-ink font-medium py-2">מוצרים</Link>
              <Link to="/pension-returns" className="text-ink-muted hover:text-ink font-medium py-2">תשואות פנסיה</Link>
              <Link to="/life-insurance-calculator" className="text-gold font-medium py-2">מחשבון ביטוח חיים</Link>
              <a data-ev-id="ev_eab78eb29e"
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
      <section data-ev-id="ev_0c0a9958ed" className="pt-28 pb-12 hero-tech">
        <div data-ev-id="ev_666a12cb6b" className="max-w-4xl mx-auto px-4 text-center">
          <div data-ev-id="ev_76b48c8ffa" className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-2xl mb-6">
            <Calculator className="w-8 h-8 text-gold" />
          </div>
          <h1 data-ev-id="ev_87bd9560ff" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            מחשבון ביטוח חיים
          </h1>
          <p data-ev-id="ev_acca587198" className="text-lg text-white/80 max-w-2xl mx-auto">
            גלה בכמה כיסוי ביטוחי אתה צריך כדי להגן על המשפחה שלך
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section data-ev-id="ev_6b2ed6618c" className="py-12">
        <div data-ev-id="ev_0a406f4a37" className="max-w-2xl mx-auto px-4">
          
          {!result ?
          <>
              {/* Progress Bar */}
              <div data-ev-id="ev_57c496ba1a" className="mb-8">
                <div data-ev-id="ev_8e5b463a76" className="flex justify-between mb-2">
                  {steps.map((step) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isComplete = currentStep > step.id;

                  return (
                    <div data-ev-id="ev_e5af6b897a"
                    key={step.id}
                    className={`flex flex-col items-center ${
                    isActive ? 'text-gold' : isComplete ? 'text-green-500' : 'text-ink-muted/50'}`
                    }>

                        <div data-ev-id="ev_b57ffb76f3" className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                      isActive ? 'bg-gold text-navy-dark' : isComplete ? 'bg-green-500 text-white' : 'bg-surface-2'}`
                      }>
                          {isComplete ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                        </div>
                        <span data-ev-id="ev_cbc88203dd" className="text-xs hidden sm:block">{step.title}</span>
                      </div>);

                })}
                </div>
                <div data-ev-id="ev_33fbd057ba" className="h-2 bg-surface-2 rounded-full overflow-hidden">
                  <div data-ev-id="ev_246fd27c29"
                className="h-full bg-gold transition-all duration-300"
                style={{ width: `${currentStep / 5 * 100}%` }} />

                </div>
              </div>

              {/* Form Card */}
              <div data-ev-id="ev_39bbcb91b1" className="bg-surface rounded-3xl shadow-xl p-6 sm:p-8">
                {renderStepContent()}
                
                {/* Navigation Buttons */}
                <div data-ev-id="ev_537463ade0" className="flex justify-between mt-8 pt-6 border-t border-border">
                  <button data-ev-id="ev_cde5a53784"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-colors ${
                currentStep === 1 ?
                'text-ink-muted/50 cursor-not-allowed' :
                'text-ink hover:bg-surface-2'}`
                }>

                    <ArrowRight className="w-5 h-5" />
                    הקודם
                  </button>
                  
                  <button data-ev-id="ev_d3c9c533e2"
                onClick={handleNext}
                className="flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark font-bold px-8 py-3 rounded-xl transition-colors">

                    {currentStep === 5 ? 'חשב תוצאה' : 'הבא'}
                    {currentStep < 5 && <ArrowLeft className="w-5 h-5" />}
                    {currentStep === 5 && <Calculator className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </> : (

          /* Results */
          /* Results */
          <div data-ev-id="ev_68b36b0561" className="space-y-6">
              {/* Main Result Card */}
              <div data-ev-id="ev_7a1f1a413c" className="bg-surface rounded-3xl shadow-xl overflow-hidden">
                <div data-ev-id="ev_2f16ec0068" className="panel-accent p-8 text-center">
                  <Shield className="w-16 h-16 text-gold mx-auto mb-4" />
                  <p data-ev-id="ev_1ade970561" className="text-white/80 mb-2">סכום ביטוח חיים מומלץ</p>
                  <p data-ev-id="ev_6963697e6a" className="text-4xl sm:text-5xl font-bold text-white">
                    {formatNumber(result.recommended)} ₪
                  </p>
                </div>
                
                {/* Gated Content - Show blur if not unlocked */}
                {!leadSubmitted ?
              <>
                    {/* Blurred Preview */}
                    <div data-ev-id="ev_94be71ff54" className="relative">
                      {/* Blurred ranges */}
                      <div data-ev-id="ev_63dc7c5109" className="p-6 grid grid-cols-3 gap-4 text-center border-b border-border blur-sm select-none">
                        <div data-ev-id="ev_71fc5472a5">
                          <p data-ev-id="ev_8fd3da5996" className="text-sm text-ink-muted">כיסוי בסיסי</p>
                          <p data-ev-id="ev_d4a1673410" className="text-xl font-bold text-ink">X,XXX,XXX ₪</p>
                        </div>
                        <div data-ev-id="ev_91d52ac9c2" className="border-x border-border">
                          <p data-ev-id="ev_7ee6de1725" className="text-sm text-gold font-medium">מומלץ</p>
                          <p data-ev-id="ev_23cd2eeba9" className="text-xl font-bold text-gold">X,XXX,XXX ₪</p>
                        </div>
                        <div data-ev-id="ev_2603d8d375">
                          <p data-ev-id="ev_bc818cc3f1" className="text-sm text-ink-muted">כיסוי מוגבר</p>
                          <p data-ev-id="ev_09957c7b97" className="text-xl font-bold text-ink">X,XXX,XXX ₪</p>
                        </div>
                      </div>
                      
                      {/* Blurred breakdown */}
                      <div data-ev-id="ev_4a9cf9a8cf" className="p-6 blur-sm select-none">
                        <h4 data-ev-id="ev_afdf5a84ac" className="font-bold text-ink mb-4">פירוט החישוב:</h4>
                        <div data-ev-id="ev_d9605d45ec" className="space-y-3">
                          <div data-ev-id="ev_10c8bdad9c" className="flex justify-between">
                            <span data-ev-id="ev_6b83762526" className="text-ink-muted">כיסוי משכנתה</span>
                            <span data-ev-id="ev_d0cbd24705" className="font-medium">XXX,XXX ₪</span>
                          </div>
                          <div data-ev-id="ev_388000e8ef" className="flex justify-between">
                            <span data-ev-id="ev_065bcc8e1d" className="text-ink-muted">הגנה על הכנסת המשפחה</span>
                            <span data-ev-id="ev_bf07c36aa5" className="font-medium">X,XXX,XXX ₪</span>
                          </div>
                          <div data-ev-id="ev_6aefaf6039" className="flex justify-between">
                            <span data-ev-id="ev_9ef54c5bb0" className="text-ink-muted">חינוך ילדים</span>
                            <span data-ev-id="ev_77a4ecd6b5" className="font-medium">XXX,XXX ₪</span>
                          </div>
                          <div data-ev-id="ev_1f24df34e5" className="border-t border-border pt-3 flex justify-between font-bold">
                            <span data-ev-id="ev_deba6bb849">סה"כ צרכים</span>
                            <span data-ev-id="ev_44c46f6449">X,XXX,XXX ₪</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Overlay with CTA */}
                      <div data-ev-id="ev_f004aa9ec8" className="absolute inset-0 bg-surface/80 backdrop-blur-[2px] flex items-center justify-center">
                        <div data-ev-id="ev_6b693a2c34" className="text-center p-6">
                          <div data-ev-id="ev_7392f57cde" className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-gold" />
                          </div>
                          <h3 data-ev-id="ev_87bbeed09e" className="text-xl font-bold text-ink mb-2">רוצה לראות את הפירוט המלא?</h3>
                          <p data-ev-id="ev_02c5c76423" className="text-ink-muted mb-4 max-w-sm">
                            השאר פרטים וקבל את החישוב המפורט + הצעה לבדיקה מקצועית חינם
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Lead Form */}
                    <div data-ev-id="ev_c63e0a2a16" className="p-6 bg-surface-2 border-t border-border">
                      <form data-ev-id="ev_1f90165644" onSubmit={handleLeadSubmit} className="space-y-4">
                        <div data-ev-id="ev_118e47103d" className="grid sm:grid-cols-2 gap-4">
                          <div data-ev-id="ev_242ac01e80">
                            <label data-ev-id="ev_83e41084c5" className="block text-sm font-medium text-ink mb-1">שם מלא</label>
                            <input data-ev-id="ev_0b151e9d6a"
                        type="text"
                        required
                        value={leadData.name}
                        onChange={(e) => setLeadData((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-surface"
                        placeholder="ישראל ישראלי" />

                          </div>
                          <div data-ev-id="ev_4cd812ae42">
                            <label data-ev-id="ev_f50fb7c48b" className="block text-sm font-medium text-ink mb-1">טלפון</label>
                            <input data-ev-id="ev_fbe2691dc3"
                        type="tel"
                        required
                        value={leadData.phone}
                        onChange={(e) => setLeadData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-surface"
                        dir="ltr"
                        placeholder="050-0000000" />

                          </div>
                        </div>
                        <div data-ev-id="ev_909f8bedbc">
                          <label data-ev-id="ev_78ce6d83a4" className="block text-sm font-medium text-ink mb-1">אימייל</label>
                          <input data-ev-id="ev_315bf98cac"
                      type="email"
                      required
                      value={leadData.email}
                      onChange={(e) => setLeadData((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-surface"
                      dir="ltr"
                      placeholder="email@example.com" />

                        </div>
                        <button data-ev-id="ev_b6c2ef1108"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-dark font-bold py-4 rounded-xl transition-colors disabled:opacity-70">

                          {isSubmitting ?
                      <div data-ev-id="ev_add2c1705c" className="w-5 h-5 border-2 border-gold/30 border-t-navy rounded-full animate-spin" /> :

                      <Send className="w-5 h-5" />
                      }
                          {isSubmitting ? 'שולח...' : 'גלה את הפירוט המלא'}
                        </button>
                      </form>
                    </div>
                  </> :

              <>
                    {/* Unlocked Content */}
                    {/* Ranges */}
                    <div data-ev-id="ev_565d3b6cee" className="p-6 grid grid-cols-3 gap-4 text-center border-b border-border">
                      <div data-ev-id="ev_ac1265a0f4">
                        <p data-ev-id="ev_c10b451a89" className="text-sm text-ink-muted">כיסוי בסיסי</p>
                        <p data-ev-id="ev_b8e1653647" className="text-xl font-bold text-ink">{formatNumber(result.minimum)} ₪</p>
                      </div>
                      <div data-ev-id="ev_4c5169db67" className="border-x border-border">
                        <p data-ev-id="ev_d5f217dbb1" className="text-sm text-gold font-medium">מומלץ</p>
                        <p data-ev-id="ev_7c74c3adb9" className="text-xl font-bold text-gold">{formatNumber(result.recommended)} ₪</p>
                      </div>
                      <div data-ev-id="ev_9f41ca1432">
                        <p data-ev-id="ev_2602b9756d" className="text-sm text-ink-muted">כיסוי מוגבר</p>
                        <p data-ev-id="ev_88a81d7205" className="text-xl font-bold text-ink">{formatNumber(result.enhanced)} ₪</p>
                      </div>
                    </div>
                    
                    {/* Breakdown */}
                    <div data-ev-id="ev_f80d5d81c8" className="p-6">
                      <h4 data-ev-id="ev_d3e173864f" className="font-bold text-ink mb-4">פירוט החישוב:</h4>
                      <div data-ev-id="ev_70edda3f8d" className="space-y-3">
                        {result.breakdown.mortgageCoverage > 0 &&
                    <div data-ev-id="ev_31e7eaf484" className="flex justify-between">
                            <span data-ev-id="ev_c60b6512ce" className="text-ink-muted">כיסוי משכנתה</span>
                            <span data-ev-id="ev_7ec550f6db" className="font-medium">{formatNumber(result.breakdown.mortgageCoverage)} ₪</span>
                          </div>
                    }
                        {result.breakdown.loansCoverage > 0 &&
                    <div data-ev-id="ev_9eb8961b6e" className="flex justify-between">
                            <span data-ev-id="ev_b0066d6e89" className="text-ink-muted">כיסוי הלוואות</span>
                            <span data-ev-id="ev_7906f17803" className="font-medium">{formatNumber(result.breakdown.loansCoverage)} ₪</span>
                          </div>
                    }
                        <div data-ev-id="ev_8513397181" className="flex justify-between">
                          <span data-ev-id="ev_907ef372b3" className="text-ink-muted">הגנה על הכנסת המשפחה</span>
                          <span data-ev-id="ev_55774360c8" className="font-medium">{formatNumber(result.breakdown.incomeReplacement)} ₪</span>
                        </div>
                        {result.breakdown.childrenEducation > 0 &&
                    <div data-ev-id="ev_dd1d635638" className="flex justify-between">
                            <span data-ev-id="ev_7116f2541e" className="text-ink-muted">חינוך ילדים</span>
                            <span data-ev-id="ev_afc850776a" className="font-medium">{formatNumber(result.breakdown.childrenEducation)} ₪</span>
                          </div>
                    }
                        {result.breakdown.emergencyFund > 0 &&
                    <div data-ev-id="ev_a8785d0a70" className="flex justify-between">
                            <span data-ev-id="ev_b3e42c6e1e" className="text-ink-muted">קרן חירום</span>
                            <span data-ev-id="ev_837da49650" className="font-medium">{formatNumber(result.breakdown.emergencyFund)} ₪</span>
                          </div>
                    }
                        <div data-ev-id="ev_859e0e8563" className="border-t border-border pt-3 flex justify-between font-bold">
                          <span data-ev-id="ev_815e20e9a4">סה"כ צרכים</span>
                          <span data-ev-id="ev_194094a06e">{formatNumber(result.breakdown.totalNeeds)} ₪</span>
                        </div>
                        <div data-ev-id="ev_7b894dab38" className="flex justify-between text-green-400">
                          <span data-ev-id="ev_bb88a7fafb">פחות: נכסים קיימים</span>
                          <span data-ev-id="ev_46e6d1c6dd">-{formatNumber(result.breakdown.totalAssets)} ₪</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Success message */}
                    <div data-ev-id="ev_db62c59f4b" className="p-6 bg-green-500/10 border-t border-green-500/30">
                      <div data-ev-id="ev_323a39961a" className="flex items-center gap-3">
                        <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                        <div data-ev-id="ev_916a29f452">
                          <p data-ev-id="ev_2e60ab9c6e" className="font-bold text-ink">תודה רבה {leadData.name}!</p>
                          <p data-ev-id="ev_28f9c6b5bd" className="text-ink-muted text-sm">נציג מטעמנו יצור איתך קשר בהקדם לבדיקה מקצועית.</p>
                        </div>
                      </div>
                    </div>
                  </>
              }
              </div>

              {/* Actions */}
              <div data-ev-id="ev_ed56527a40" className="flex flex-col sm:flex-row gap-4">
                <button data-ev-id="ev_4e0706eaea"
              onClick={handleReset}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-border text-ink hover:bg-surface-2 transition-colors">

                  <RefreshCw className="w-5 h-5" />
                  חשב מחדש
                </button>
              </div>

              {/* Disclaimer */}
              <div data-ev-id="ev_074abd2386" className="bg-amber-500/10 rounded-2xl p-4 text-sm text-amber-400">
                <p data-ev-id="ev_57c196cdbf" className="font-medium mb-1">גילוי נאות:</p>
                <p data-ev-id="ev_9bd8c05f10">
                  המידע במחשבון זה הינו להמחשה בלבד ואינו מהווה ייעוץ ביטוחי, שיווק ביטוחי, ייעוץ פנסיוני, שיווק פנסיוני, ייעוץ השקעות או תחליף לבדיקה אישית על ידי בעל רישיון מתאים. התאמת כיסוי ביטוח החיים תלויה בנתוניו האישיים של כל אדם ובתנאי הפוליסה והחיתום.
                </p>
              </div>
            </div>)

          }
        </div>
      </section>

      {/* Footer */}
      <footer data-ev-id="ev_15fd4b18ea" className="bg-navy-dark py-8 border-t border-white/10 mt-12">
        <div data-ev-id="ev_3e97d4f3d3" className="max-w-7xl mx-auto px-4 text-center">
          {/* Footer Top CTA */}
          <div data-ev-id="ev_017b5ac4d0" className="flex justify-center mb-6">
            <a data-ev-id="ev_e69779b90c"
            href="https://surense.com/app/p/9z3sqal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-navy-dark font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">

              <FileText className="w-5 h-5" />
              להוצאת מידע פנסיוני עדכני
            </a>
          </div>
          
          <Logo variant="light" />
          <p data-ev-id="ev_3df078155b" className="text-white/50 text-sm mt-4">
            © 2024 WealthTech. כל הזכויות שמורות.
          </p>
        </div>
      </footer>
    </div>);

}