import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import {
  Menu,
  X,
  TrendingUp,
  PiggyBank,
  Calculator,
  CheckCircle,
  Send,
  RefreshCw,
  FileText,
  Info,
  ArrowLeft,
  Sparkles } from
'lucide-react';
import { Logo } from '@/components/Logo';

// Risk level configuration - easily editable
const RISK_LEVELS = [
{ level: 1, annualReturn: 0.03, label: 'סולידי מאוד', color: 'bg-blue-500' },
{ level: 2, annualReturn: 0.04, label: 'סולידי', color: 'bg-teal-500' },
{ level: 3, annualReturn: 0.06, label: 'מאוזן', color: 'bg-green-500' },
{ level: 4, annualReturn: 0.07, label: 'צמיחה', color: 'bg-orange-500' },
{ level: 5, annualReturn: 0.08, label: 'אגרסיבי', color: 'bg-red-500' }];


interface CalculationResult {
  futureValue: number;
  totalDeposits: number;
  estimatedProfit: number;
  selectedRiskLevel: number;
  annualReturn: number;
  allLevelsResults: {level: number;futureValue: number;profit: number;}[];
  yearlyBreakdown: {year: number;deposits: number;value: number;}[];
}

export default function SavingsCalculator() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form state
  const [initialAmount, setInitialAmount] = useState(100000);
  const [monthlyDeposit, setMonthlyDeposit] = useState(2000);
  const [years, setYears] = useState(15);
  const [riskLevel, setRiskLevel] = useState(3);

  // Lead form state
  const [leadData, setLeadData] = useState({ name: '', phone: '', email: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const formatNumber = (num: number): string => {
    return Math.round(num).toLocaleString('he-IL');
  };

  const parseNumber = (value: string): number => {
    return parseInt(value.replace(/,/g, '')) || 0;
  };

  // Calculate future value with compound interest
  const calculateFutureValue = (principal: number, monthly: number, annualRate: number, periodYears: number) => {
    const months = periodYears * 12;

    if (annualRate === 0) {
      return principal + monthly * months;
    }

    // Convert annual rate to monthly rate
    const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;

    // Future value of initial principal
    const fvPrincipal = principal * Math.pow(1 + monthlyRate, months);

    // Future value of monthly deposits (annuity)
    const fvMonthly = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    return fvPrincipal + fvMonthly;
  };

  // Calculate yearly breakdown for chart
  const calculateYearlyBreakdown = (principal: number, monthly: number, annualRate: number, periodYears: number) => {
    const breakdown: {year: number;deposits: number;value: number;}[] = [];
    const monthlyRate = annualRate === 0 ? 0 : Math.pow(1 + annualRate, 1 / 12) - 1;

    for (let year = 0; year <= periodYears; year++) {
      const months = year * 12;
      const deposits = principal + monthly * months;

      let value: number;
      if (annualRate === 0) {
        value = deposits;
      } else {
        const fvPrincipal = principal * Math.pow(1 + monthlyRate, months);
        const fvMonthly = months === 0 ? 0 : monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
        value = fvPrincipal + fvMonthly;
      }

      breakdown.push({ year, deposits, value });
    }

    return breakdown;
  };

  // Memoized calculation results
  const result = useMemo((): CalculationResult => {
    const selectedRisk = RISK_LEVELS.find((r) => r.level === riskLevel) || RISK_LEVELS[2];
    const futureValue = calculateFutureValue(initialAmount, monthlyDeposit, selectedRisk.annualReturn, years);
    const totalDeposits = initialAmount + monthlyDeposit * years * 12;
    const estimatedProfit = futureValue - totalDeposits;

    // Calculate for all risk levels
    const allLevelsResults = RISK_LEVELS.map((risk) => {
      const fv = calculateFutureValue(initialAmount, monthlyDeposit, risk.annualReturn, years);
      const deposits = initialAmount + monthlyDeposit * years * 12;
      return {
        level: risk.level,
        futureValue: fv,
        profit: fv - deposits
      };
    });

    // Yearly breakdown for chart
    const yearlyBreakdown = calculateYearlyBreakdown(initialAmount, monthlyDeposit, selectedRisk.annualReturn, years);

    return {
      futureValue,
      totalDeposits,
      estimatedProfit,
      selectedRiskLevel: riskLevel,
      annualReturn: selectedRisk.annualReturn,
      allLevelsResults,
      yearlyBreakdown
    };
  }, [initialAmount, monthlyDeposit, years, riskLevel]);

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
            source: `מחשבון חיסכון - שווי עתידי: ${formatNumber(result.futureValue)} ₪ | רמת סיכון: ${riskLevel} | תקופה: ${years} שנים${leadData.notes ? ` | הערות: ${leadData.notes}` : ''}`
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

  const handleReset = () => {
    setInitialAmount(100000);
    setMonthlyDeposit(2000);
    setYears(15);
    setRiskLevel(3);
    setLeadSubmitted(false);
    setLeadData({ name: '', phone: '', email: '', notes: '' });
  };

  // Calculate differences for messaging
  const lowestResult = result.allLevelsResults[0].futureValue;
  const highestResult = result.allLevelsResults[4].futureValue;
  const riskDifference = highestResult - lowestResult;

  return (
    <div data-ev-id="ev_2f0d1f526c" className="min-h-screen bg-gradient-to-br from-surface-2 to-surface font-sans">
      {/* Navigation */}
      <nav data-ev-id="ev_d413f515d5" className="fixed top-0 right-0 left-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div data-ev-id="ev_89e2558eff" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_f6ebe403f1" className="flex justify-between items-center h-20">
            <Logo />
            
            <div data-ev-id="ev_ba941fdeb8" className="hidden xl:flex items-center gap-4 2xl:gap-7 text-[15px] 2xl:text-base">
              <Link to="/" className="text-ink-muted hover:text-ink transition-colors font-medium">ראשי</Link>
              <Link to="/products" className="text-ink-muted hover:text-ink transition-colors font-medium">מוצרים</Link>
              <Link to="/pension-returns" className="text-ink-muted hover:text-ink transition-colors font-medium">תשואות פנסיה</Link>
              <Link to="/life-insurance-calculator" className="text-ink-muted hover:text-ink transition-colors font-medium">מחשבון ביטוח חיים</Link>
              <Link to="/savings-calculator" className="text-gold font-medium">מחשבון חיסכון</Link>
              <a data-ev-id="ev_39c2bd8f4e"
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

            <button data-ev-id="ev_2b6c902145"
            className="xl:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>

              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen &&
        <div data-ev-id="ev_81879ad7d0" className="xl:hidden bg-surface border-t border-border">
            <div data-ev-id="ev_bcdbb921dd" className="px-4 py-4 flex flex-col gap-4">
              <Link to="/" className="text-ink-muted hover:text-ink font-medium py-2">ראשי</Link>
              <Link to="/products" className="text-ink-muted hover:text-ink font-medium py-2">מוצרים</Link>
              <Link to="/pension-returns" className="text-ink-muted hover:text-ink font-medium py-2">תשואות פנסיה</Link>
              <Link to="/life-insurance-calculator" className="text-ink-muted hover:text-ink font-medium py-2">מחשבון ביטוח חיים</Link>
              <Link to="/savings-calculator" className="text-gold font-medium py-2">מחשבון חיסכון</Link>
              <a data-ev-id="ev_62640395ba"
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
      <section data-ev-id="ev_b3433e0ab8" className="pt-28 pb-12 hero-tech">
        <div data-ev-id="ev_538d946565" className="max-w-4xl mx-auto px-4 text-center">
          <div data-ev-id="ev_24698d69f1" className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-2xl mb-6">
            <TrendingUp className="w-8 h-8 text-gold" />
          </div>
          <h1 data-ev-id="ev_b88633d423" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            מחשבון חיסכון לפי רמת סיכון
          </h1>
          <p data-ev-id="ev_430c653266" className="text-lg text-white/80 max-w-2xl mx-auto">
            גלה כיצד בחירת רמת הסיכון משפיעה על שווי החיסכון העתידי שלך
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section data-ev-id="ev_5b3776b106" className="py-12">
        <div data-ev-id="ev_083d93eaf3" className="max-w-4xl mx-auto px-4">
          <div data-ev-id="ev_725a85a016" className="grid lg:grid-cols-5 gap-8">
            
            {/* Input Panel */}
            <div data-ev-id="ev_2fe40d0beb" className="lg:col-span-2">
              <div data-ev-id="ev_d4f1a22dc1" className="bg-surface rounded-3xl shadow-xl p-6 sticky top-28">
                <h2 data-ev-id="ev_b77fa95d38" className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-gold" />
                  הזן נתונים
                </h2>
                
                <div data-ev-id="ev_2fc0701860" className="space-y-6">
                  {/* Initial Amount */}
                  <div data-ev-id="ev_834bf3ece6">
                    <label data-ev-id="ev_41ebb8b784" className="block text-sm font-medium text-ink mb-2">סכום התחלתי</label>
                    <div data-ev-id="ev_928431977d" className="relative">
                      <input data-ev-id="ev_57dc76e936"
                      type="text"
                      value={formatNumber(initialAmount)}
                      onChange={(e) => setInitialAmount(parseNumber(e.target.value))}
                      className="w-full px-4 pl-10 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 text-left"
                      dir="ltr" />

                      <span data-ev-id="ev_2ac5266287" className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">₪</span>
                    </div>
                    <input data-ev-id="ev_04ae0dcc87"
                    type="range"
                    min="0"
                    max="1000000"
                    step="10000"
                    value={initialAmount}
                    onChange={(e) => setInitialAmount(parseInt(e.target.value))}
                    className="w-full h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-gold mt-2" />

                  </div>
                  
                  {/* Monthly Deposit */}
                  <div data-ev-id="ev_1e297e393b">
                    <label data-ev-id="ev_93d12cda88" className="block text-sm font-medium text-ink mb-2">הפקדה חודשית</label>
                    <div data-ev-id="ev_d8419572cc" className="relative">
                      <input data-ev-id="ev_89696b9cbc"
                      type="text"
                      value={formatNumber(monthlyDeposit)}
                      onChange={(e) => setMonthlyDeposit(parseNumber(e.target.value))}
                      className="w-full px-4 pl-10 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 text-left"
                      dir="ltr" />

                      <span data-ev-id="ev_3795a2483e" className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">₪</span>
                    </div>
                    <input data-ev-id="ev_627fbf16c1"
                    type="range"
                    min="0"
                    max="20000"
                    step="500"
                    value={monthlyDeposit}
                    onChange={(e) => setMonthlyDeposit(parseInt(e.target.value))}
                    className="w-full h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-gold mt-2" />

                  </div>
                  
                  {/* Years */}
                  <div data-ev-id="ev_c03f9548e7">
                    <label data-ev-id="ev_c2c5f0d66e" className="block text-sm font-medium text-ink mb-2">תקופת חיסכון (שנים)</label>
                    <div data-ev-id="ev_62dc868519" className="flex items-center gap-4">
                      <input data-ev-id="ev_963928785b"
                      type="range"
                      min="1"
                      max="40"
                      value={years}
                      onChange={(e) => setYears(parseInt(e.target.value))}
                      className="flex-1 h-2 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-gold" />

                      <span data-ev-id="ev_5248acc5cb" className="text-2xl font-bold text-ink w-16 text-center">{years}</span>
                    </div>
                  </div>
                  
                  {/* Risk Level */}
                  <div data-ev-id="ev_844bcf6233">
                    <label data-ev-id="ev_ed0cf2a1da" className="block text-sm font-medium text-ink mb-3">רמת סיכון</label>
                    <div data-ev-id="ev_db3d0b28a8" className="grid grid-cols-5 gap-2">
                      {RISK_LEVELS.map((risk) =>
                      <button data-ev-id="ev_95c02d0f6b"
                      key={risk.level}
                      onClick={() => setRiskLevel(risk.level)}
                      className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                      riskLevel === risk.level ?
                      'border-gold bg-gold/10' :
                      'border-border hover:border-gold/50'}`
                      }>

                          <span data-ev-id="ev_54424e76e3" className={`w-4 h-4 rounded-full ${risk.color} mb-1`} />
                          <span data-ev-id="ev_edf7047002" className="text-lg font-bold text-ink">{risk.level}</span>
                          <span data-ev-id="ev_77e2ce5aa4" className="text-[10px] text-ink-muted leading-tight text-center">{risk.label}</span>
                        </button>
                      )}
                    </div>
                    <p data-ev-id="ev_b349fcf0eb" className="text-xs text-ink-muted mt-2 flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      תשואה שנתית משוערת: {(RISK_LEVELS[riskLevel - 1].annualReturn * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results Panel */}
            <div data-ev-id="ev_8d7a70e3d3" className="lg:col-span-3 space-y-6">
              
              {/* Main Result */}
              <div data-ev-id="ev_9d09f94ded" className="bg-surface rounded-3xl shadow-xl overflow-hidden">
                <div data-ev-id="ev_8574bd95a0" className="panel-accent p-6 sm:p-8 text-center">
                  <PiggyBank className="w-16 h-16 text-gold mx-auto mb-4" />
                  <p data-ev-id="ev_021b87c702" className="text-white/80 mb-2">שווי חיסכון עתידי משוער</p>
                  <p data-ev-id="ev_9a75916c90" className="text-4xl sm:text-5xl font-bold text-white">
                    {formatNumber(result.futureValue)} ₪
                  </p>
                  <p data-ev-id="ev_8804f89b82" className="text-white/60 text-sm mt-2">
                    ברמת סיכון {riskLevel} | תשואה שנתית {(result.annualReturn * 100).toFixed(0)}% | {years} שנים
                  </p>
                </div>
                
                {/* Gated Content */}
                {!leadSubmitted ?
                <>
                    {/* Blurred Preview */}
                    <div data-ev-id="ev_5941860c01" className="relative">
                      {/* Blurred summary */}
                      <div data-ev-id="ev_6f31afbd0f" className="p-6 grid grid-cols-2 gap-4 text-center border-b border-border blur-sm select-none">
                        <div data-ev-id="ev_d585cc963c" className="p-4 bg-surface-2 rounded-xl">
                          <p data-ev-id="ev_2744759d79" className="text-sm text-ink-muted">סך הפקדות</p>
                          <p data-ev-id="ev_86a76c2c9b" className="text-xl font-bold text-ink">XXX,XXX ₪</p>
                        </div>
                        <div data-ev-id="ev_5547c99fd1" className="p-4 bg-green-500/10 rounded-xl">
                          <p data-ev-id="ev_785952d12e" className="text-sm text-ink-muted">רווח מצטבר משוער</p>
                          <p data-ev-id="ev_84e88de774" className="text-xl font-bold text-green-400">XXX,XXX ₪</p>
                        </div>
                      </div>
                      
                      {/* Blurred chart */}
                      <div data-ev-id="ev_bcd547a604" className="p-6 blur-sm select-none">
                        <h4 data-ev-id="ev_20e93dd877" className="font-bold text-ink mb-4">השוואת רמות סיכון:</h4>
                        <div data-ev-id="ev_388e4fc24b" className="space-y-3">
                          {RISK_LEVELS.map((risk) =>
                        <div data-ev-id="ev_5816ad8c79" key={risk.level} className="flex items-center gap-3">
                              <span data-ev-id="ev_c453808d5e" className="w-16 text-sm text-ink-muted">רמה {risk.level}</span>
                              <div data-ev-id="ev_534edba033" className="flex-1 h-6 bg-surface-2 rounded-full overflow-hidden">
                                <div data-ev-id="ev_0397e8acd7" className={`h-full ${risk.color}`} style={{ width: `${60 + risk.level * 8}%` }} />
                              </div>
                              <span data-ev-id="ev_34b5eacdb5" className="w-24 text-left font-medium">X,XXX,XXX ₪</span>
                            </div>
                        )}
                        </div>
                      </div>
                      
                      {/* Overlay with CTA */}
                      <div data-ev-id="ev_5eab58dbe1" className="absolute inset-0 bg-surface/80 backdrop-blur-[2px] flex items-center justify-center">
                        <div data-ev-id="ev_487a1408c1" className="text-center p-6">
                          <div data-ev-id="ev_cf98be5be7" className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-gold" />
                          </div>
                          <h3 data-ev-id="ev_a9adf8aa4c" className="text-xl font-bold text-ink mb-2">רוצה לראות את הפירוט המלא?</h3>
                          <p data-ev-id="ev_7d1488d983" className="text-ink-muted mb-4 max-w-sm">
                            השאר פרטים וקבל השוואה מלאה + הצעה לבניית תרחיש חיסכון אישי
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Lead Form */}
                    <div data-ev-id="ev_2706da75f6" className="p-6 bg-surface-2 border-t border-border">
                      <form data-ev-id="ev_ab792f1d50" onSubmit={handleLeadSubmit} className="space-y-4">
                        <div data-ev-id="ev_f8350d7839" className="grid sm:grid-cols-2 gap-4">
                          <div data-ev-id="ev_51bbd546f0">
                            <label data-ev-id="ev_48715d7ae9" className="block text-sm font-medium text-ink mb-1">שם מלא</label>
                            <input data-ev-id="ev_8b91990bd5"
                          type="text"
                          required
                          value={leadData.name}
                          onChange={(e) => setLeadData((prev) => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-surface"
                          placeholder="ישראל ישראלי" />

                          </div>
                          <div data-ev-id="ev_73854f683f">
                            <label data-ev-id="ev_7159500517" className="block text-sm font-medium text-ink mb-1">טלפון</label>
                            <input data-ev-id="ev_2fea405a63"
                          type="tel"
                          required
                          value={leadData.phone}
                          onChange={(e) => setLeadData((prev) => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-surface"
                          dir="ltr"
                          placeholder="050-0000000" />

                          </div>
                        </div>
                        <div data-ev-id="ev_3b59f8d772">
                          <label data-ev-id="ev_afa703f49e" className="block text-sm font-medium text-ink mb-1">אימייל</label>
                          <input data-ev-id="ev_f33295f565"
                        type="email"
                        required
                        value={leadData.email}
                        onChange={(e) => setLeadData((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-gold/50 bg-surface"
                        dir="ltr"
                        placeholder="email@example.com" />

                        </div>
                        <button data-ev-id="ev_6559d498a9"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy-dark font-bold py-4 rounded-xl transition-colors disabled:opacity-70">

                          {isSubmitting ?
                        <div data-ev-id="ev_dcd282e29d" className="w-5 h-5 border-2 border-gold/30 border-t-navy rounded-full animate-spin" /> :

                        <Send className="w-5 h-5" />
                        }
                          {isSubmitting ? 'שולח...' : 'גלה את הפירוט המלא'}
                        </button>
                      </form>
                    </div>
                  </> :

                <>
                    {/* Unlocked Content */}
                    {/* Summary Stats */}
                    <div data-ev-id="ev_071d7fc227" className="p-6 grid grid-cols-2 gap-4 text-center border-b border-border">
                      <div data-ev-id="ev_445ca0acbe" className="p-4 bg-surface-2 rounded-xl">
                        <p data-ev-id="ev_37383a6097" className="text-sm text-ink-muted">סך הפקדות</p>
                        <p data-ev-id="ev_98e790726d" className="text-xl font-bold text-ink">{formatNumber(result.totalDeposits)} ₪</p>
                      </div>
                      <div data-ev-id="ev_b60983cd82" className="p-4 bg-green-500/10 rounded-xl">
                        <p data-ev-id="ev_0ad11549fe" className="text-sm text-ink-muted">רווח מצטבר משוער</p>
                        <p data-ev-id="ev_797cf77d66" className="text-xl font-bold text-green-400">+{formatNumber(result.estimatedProfit)} ₪</p>
                      </div>
                    </div>
                    
                    {/* Risk Level Comparison */}
                    <div data-ev-id="ev_2e96cde688" className="p-6 border-b border-border">
                      <h4 data-ev-id="ev_73f4ba7808" className="font-bold text-ink mb-4">השוואת רמות סיכון:</h4>
                      <div data-ev-id="ev_6dd08586cb" className="space-y-3">
                        {result.allLevelsResults.map((r, index) => {
                        const risk = RISK_LEVELS[index];
                        const maxValue = result.allLevelsResults[4].futureValue;
                        const percentage = r.futureValue / maxValue * 100;
                        const isSelected = r.level === riskLevel;

                        return (
                          <div data-ev-id="ev_f087b2bf5d" key={r.level} className={`flex items-center gap-3 p-2 rounded-lg ${isSelected ? 'bg-gold/10 border border-gold' : ''}`}>
                              <span data-ev-id="ev_f3f63ca03f" className="w-20 text-sm text-ink-muted flex items-center gap-2">
                                <span data-ev-id="ev_66872ce504" className={`w-3 h-3 rounded-full ${risk.color}`} />
                                רמה {r.level}
                              </span>
                              <div data-ev-id="ev_3679b3f7cc" className="flex-1 h-6 bg-surface-2 rounded-full overflow-hidden">
                                <div data-ev-id="ev_e28f7ce4c1"
                              className={`h-full ${risk.color} transition-all duration-500`}
                              style={{ width: `${percentage}%` }} />

                              </div>
                              <span data-ev-id="ev_33014c2e58" className={`w-28 text-left font-medium ${isSelected ? 'text-gold' : ''}`}>
                                {formatNumber(r.futureValue)} ₪
                              </span>
                            </div>);

                      })}
                      </div>
                      
                      {/* Difference message */}
                      <div data-ev-id="ev_b187558d23" className="mt-4 p-4 bg-amber-500/10 rounded-xl text-sm text-amber-400">
                        <p data-ev-id="ev_9f37f08772" className="font-medium">💡 הפער בין רמת סיכון 1 לרמת סיכון 5:</p>
                        <p data-ev-id="ev_0e4d23cf9a" className="text-lg font-bold text-amber-400 mt-1">{formatNumber(riskDifference)} ₪</p>
                      </div>
                    </div>
                    
                    {/* Growth Chart */}
                    <div data-ev-id="ev_68bb6daf60" className="p-6 border-b border-border">
                      <h4 data-ev-id="ev_bca72be646" className="font-bold text-ink mb-4">צמיחת החיסכון לאורך זמן:</h4>
                      <div data-ev-id="ev_94a4b7ad63" className="h-48 flex items-end gap-1">
                        {result.yearlyBreakdown.filter((_, i) => i % Math.ceil(years / 10) === 0 || i === years).map((point, index) => {
                        const maxValue = result.yearlyBreakdown[years].value;
                        const valueHeight = point.value / maxValue * 100;
                        const depositHeight = point.deposits / maxValue * 100;

                        return (
                          <div data-ev-id="ev_cf42b17aaf" key={point.year} className="flex-1 flex flex-col items-center gap-1">
                              <div data-ev-id="ev_c7c99a2ce4" className="w-full flex flex-col justify-end h-40 relative">
                                {/* Value bar */}
                                <div data-ev-id="ev_3010931978"
                              className="w-full bg-gold rounded-t transition-all duration-500 absolute bottom-0"
                              style={{ height: `${valueHeight}%` }} />

                                {/* Deposits bar (overlay) */}
                                <div data-ev-id="ev_ca9f36effc"
                              className="w-full bg-navy/30 rounded-t transition-all duration-500 absolute bottom-0"
                              style={{ height: `${depositHeight}%` }} />

                              </div>
                              <span data-ev-id="ev_ae21f5ccc1" className="text-xs text-ink-muted">{point.year}</span>
                            </div>);

                      })}
                      </div>
                      <div data-ev-id="ev_b4964bb168" className="flex justify-center gap-6 mt-4 text-sm">
                        <div data-ev-id="ev_e9005872fa" className="flex items-center gap-2">
                          <span data-ev-id="ev_28c88e429c" className="w-4 h-4 bg-navy/30 rounded" />
                          <span data-ev-id="ev_b0ceb13ac5" className="text-ink-muted">הפקדות</span>
                        </div>
                        <div data-ev-id="ev_7bc39936dd" className="flex items-center gap-2">
                          <span data-ev-id="ev_0596558e13" className="w-4 h-4 bg-gold rounded" />
                          <span data-ev-id="ev_8626ffb351" className="text-ink-muted">שווי חיסכון</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Insights */}
                    <div data-ev-id="ev_95fcdc06be" className="p-6 bg-surface-2">
                      <h4 data-ev-id="ev_e663974561" className="font-bold text-ink mb-3">תובנות:</h4>
                      <ul data-ev-id="ev_48551e716b" className="space-y-2 text-sm text-ink-muted">
                        <li data-ev-id="ev_59ae31455b" className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          <span data-ev-id="ev_53c2a154a7">ברמת הסיכון שבחרת, ובהנחת תשואה שנתית של {(result.annualReturn * 100).toFixed(0)}%, החיסכון שלך עשוי להגיע לכ־{formatNumber(result.futureValue)} ₪ לאורך {years} שנה.</span>
                        </li>
                        <li data-ev-id="ev_205768b1a6" className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          <span data-ev-id="ev_b8033bc631">ככל שטווח הזמן ארוך יותר, השפעת רמת הסיכון על התוצאה הסופית נעשית משמעותית יותר.</span>
                        </li>
                        <li data-ev-id="ev_ce49a2f76a" className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          <span data-ev-id="ev_d3b7add209">רמת סיכון נמוכה יותר עשויה להתאים למי שמעדיף תנודתיות נמוכה, אך עשויה להניב פוטנציאל צמיחה נמוך יותר.</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Success message */}
                    <div data-ev-id="ev_de86af3209" className="p-6 bg-green-500/10 border-t border-green-500/30">
                      <div data-ev-id="ev_236670ccec" className="flex items-center gap-3">
                        <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                        <div data-ev-id="ev_bc00854952">
                          <p data-ev-id="ev_f7fb562b64" className="font-bold text-ink">תודה רבה {leadData.name}!</p>
                          <p data-ev-id="ev_cb2af2cc60" className="text-ink-muted text-sm">נציג מטעמנו יצור איתך קשר לבניית תרחיש חיסכון אישי.</p>
                        </div>
                      </div>
                    </div>
                  </>
                }
              </div>
              
              {/* Actions */}
              <div data-ev-id="ev_803dc49d3f" className="flex gap-4">
                <button data-ev-id="ev_1a65734f74"
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-border text-ink hover:bg-surface-2 transition-colors bg-surface">

                  <RefreshCw className="w-5 h-5" />
                  חשב מחדש
                </button>
              </div>
              
              {/* Disclaimer */}
              <div data-ev-id="ev_1fff593278" className="bg-amber-500/10 rounded-2xl p-4 text-sm text-amber-400">
                <p data-ev-id="ev_4220c0f3e2" className="font-medium mb-1">גילוי נאות:</p>
                <p data-ev-id="ev_78fd779eb2">
                  המידע במחשבון זה הינו להמחשה בלבד ואינו מהווה ייעוץ השקעות, שיווק השקעות, ייעוץ פנסיוני, שיווק פנסיוני או תחליף לבדיקה אישית על ידי בעל רישיון מתאים. התשואות המוצגות הן הנחות עבודה בלבד, אינן מובטחות, ותוצאות בפועל עשויות להיות שונות, לרבות הפסד.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer data-ev-id="ev_20638207ab" className="bg-navy-dark py-8 border-t border-white/10 mt-12">
        <div data-ev-id="ev_1bef269fa0" className="max-w-7xl mx-auto px-4 text-center">
          {/* Footer Top CTA */}
          <div data-ev-id="ev_79c403af7e" className="flex justify-center mb-6">
            <a data-ev-id="ev_be0b68e39a"
            href="https://surense.com/app/p/9z3sqal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-navy-dark font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">

              <FileText className="w-5 h-5" />
              להוצאת מידע פנסיוני עדכני
            </a>
          </div>
          
          <Logo variant="light" />
          <p data-ev-id="ev_12b76592d5" className="text-white/50 text-sm mt-4">
            © 2024 WealthTech. כל הזכויות שמורות.
          </p>
        </div>
      </footer>
    </div>);

}