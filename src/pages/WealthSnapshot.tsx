import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import {
  Menu,
  X,
  Wallet,
  Building2,
  Briefcase,
  CreditCard,
  PlusCircle,
  Trash2,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  PieChart,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Send,
  User,
  Phone,
  Mail,
  Home,
  Car,
  Landmark,
  Coins,
  Building,
  DollarSign,
  BarChart3,
  Target,
  Shield,
  RefreshCw,
  ChevronDown,
  ChevronUp } from
'lucide-react';
import { Logo } from '@/components/Logo';
import { supabase } from '@/integrations/supabase/client';

// Asset categories configuration
const ASSET_CATEGORIES = [
{
  id: 'financial',
  label: 'נכסים פיננסיים',
  icon: Wallet,
  color: 'bg-blue-500',
  subcategories: [
  { id: 'cash', label: "עו\"ש / מזומן" },
  { id: 'deposits', label: 'פיקדונות' },
  { id: 'investments', label: 'תיקי השקעות' },
  { id: 'funds', label: 'קרנות נאמנות / ETF' },
  { id: 'gemel', label: 'קופות גמל' },
  { id: 'hishtalmut', label: 'קרנות השתלמות' },
  { id: 'pension', label: 'פנסיה' },
  { id: 'insurance_savings', label: 'פוליסות חיסכון' },
  { id: 'rsu', label: 'RSU / אופציות מניות' },
  { id: 'crypto', label: 'קריפטו' },
  { id: 'alternative', label: 'השקעות אלטרנטיביות' }]

},
{
  id: 'realestate',
  label: "נדל\"ן",
  icon: Building2,
  color: 'bg-emerald-500',
  subcategories: [
  { id: 'residence', label: 'דירת מגורים' },
  { id: 'investment_apt', label: 'דירות להשקעה' },
  { id: 'commercial', label: 'נכסים מסחריים' },
  { id: 'land', label: 'קרקעות' }]

},
{
  id: 'business',
  label: 'נכסים עסקיים',
  icon: Briefcase,
  color: 'bg-purple-500',
  subcategories: [
  { id: 'company_shares', label: 'אחזקה בחברה' },
  { id: 'business_value', label: 'שווי פעילות עסקית' },
  { id: 'partnerships', label: 'שותפויות' }]

}];


const LIABILITY_CATEGORIES = [
{ id: 'mortgage', label: 'משכנתא', icon: Home },
{ id: 'personal_loan', label: 'הלוואות פרטיות', icon: CreditCard },
{ id: 'business_loan', label: 'הלוואות עסקיות', icon: Briefcase },
{ id: 'credit_line', label: 'מסגרות אשראי', icon: CreditCard },
{ id: 'car_loan', label: 'הלוואת רכב', icon: Car },
{ id: 'other', label: 'אחר', icon: DollarSign }];


interface Asset {
  id: string;
  category: string;
  subcategory: string;
  value: number;
  currency: 'ILS' | 'USD' | 'EUR';
  institution?: string;
  notes?: string;
}

interface Liability {
  id: string;
  type: string;
  balance: number;
  monthlyPayment?: number;
  interestRate?: number;
  endDate?: string;
  currency: 'ILS' | 'USD' | 'EUR';
}

interface PersonalInfo {
  name: string;
  age: string;
  familyStatus: string;
  email: string;
  phone: string;
}

type Step = 1 | 2 | 3 | 4;

export default function WealthSnapshot() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('financial');

  // Personal info
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    age: '',
    familyStatus: '',
    email: '',
    phone: ''
  });

  // Assets
  const [assets, setAssets] = useState<Asset[]>([]);

  // Liabilities
  const [liabilities, setLiabilities] = useState<Liability[]>([]);

  // Lead form
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Currency conversion rates (approximate)
  const currencyRates = { ILS: 1, USD: 3.7, EUR: 4.0 };

  // Generate unique ID
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Add asset
  const addAsset = (category: string, subcategory: string) => {
    setAssets([...assets, {
      id: generateId(),
      category,
      subcategory,
      value: 0,
      currency: 'ILS',
      institution: '',
      notes: ''
    }]);
  };

  // Update asset
  const updateAsset = (id: string, field: keyof Asset, value: string | number) => {
    setAssets(assets.map((a) => a.id === id ? { ...a, [field]: value } : a));
  };

  // Remove asset
  const removeAsset = (id: string) => {
    setAssets(assets.filter((a) => a.id !== id));
  };

  // Add liability
  const addLiability = (type: string) => {
    setLiabilities([...liabilities, {
      id: generateId(),
      type,
      balance: 0,
      currency: 'ILS'
    }]);
  };

  // Update liability
  const updateLiability = (id: string, field: keyof Liability, value: string | number) => {
    setLiabilities(liabilities.map((l) => l.id === id ? { ...l, [field]: value } : l));
  };

  // Remove liability
  const removeLiability = (id: string) => {
    setLiabilities(liabilities.filter((l) => l.id !== id));
  };

  // Convert to ILS
  const toILS = (amount: number, currency: 'ILS' | 'USD' | 'EUR') => {
    return amount * currencyRates[currency];
  };

  // Calculate totals
  const calculations = useMemo(() => {
    // Total assets by category
    const assetsByCategory: Record<string, number> = {};
    let totalAssets = 0;
    let liquidAssets = 0;
    let longTermAssets = 0;

    assets.forEach((asset) => {
      const valueInILS = toILS(asset.value, asset.currency);
      totalAssets += valueInILS;

      // Group by main category
      if (!assetsByCategory[asset.category]) {
        assetsByCategory[asset.category] = 0;
      }
      assetsByCategory[asset.category] += valueInILS;

      // Liquid vs long-term
      const liquidTypes = ['cash', 'deposits', 'investments', 'funds', 'crypto'];
      if (liquidTypes.includes(asset.subcategory)) {
        liquidAssets += valueInILS;
      } else {
        longTermAssets += valueInILS;
      }
    });

    // Total liabilities
    let totalLiabilities = 0;
    let totalMonthlyPayments = 0;

    liabilities.forEach((liability) => {
      totalLiabilities += toILS(liability.balance, liability.currency);
      if (liability.monthlyPayment) {
        totalMonthlyPayments += toILS(liability.monthlyPayment, liability.currency);
      }
    });

    // Net worth
    const netWorth = totalAssets - totalLiabilities;

    // Percentages
    const financialPercent = totalAssets > 0 ? (assetsByCategory['financial'] || 0) / totalAssets * 100 : 0;
    const realestatePercent = totalAssets > 0 ? (assetsByCategory['realestate'] || 0) / totalAssets * 100 : 0;
    const businessPercent = totalAssets > 0 ? (assetsByCategory['business'] || 0) / totalAssets * 100 : 0;
    const liquidityPercent = totalAssets > 0 ? liquidAssets / totalAssets * 100 : 0;
    const debtRatio = totalAssets > 0 ? totalLiabilities / totalAssets * 100 : 0;

    return {
      totalAssets,
      totalLiabilities,
      netWorth,
      liquidAssets,
      longTermAssets,
      assetsByCategory,
      financialPercent,
      realestatePercent,
      businessPercent,
      liquidityPercent,
      debtRatio,
      totalMonthlyPayments
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets, liabilities, currencyRates]);

  // Generate insights
  const insights = useMemo(() => {
    const result: {type: 'warning' | 'info' | 'success';message: string;}[] = [];

    if (calculations.totalAssets === 0) return result;

    // Real estate concentration
    if (calculations.realestatePercent > 60) {
      result.push({
        type: 'warning',
        message: `${calculations.realestatePercent.toFixed(0)}% מההון שלך מרוכז בנדל"ן — כדאי לשקול פיזור לנכסים נזילים`
      });
    }

    // Low liquidity
    if (calculations.liquidityPercent < 15 && calculations.totalAssets > 0) {
      result.push({
        type: 'warning',
        message: `רכיב הנזילות שלך נמוך (${calculations.liquidityPercent.toFixed(0)}%) — מומלץ לשמור על 3-6 חודשי הוצאות נזילים`
      });
    }

    // High debt ratio
    if (calculations.debtRatio > 50) {
      result.push({
        type: 'warning',
        message: `יחס חוב לנכסים גבוה (${calculations.debtRatio.toFixed(0)}%) — כדאי לבחון תוכנית להפחתת חובות`
      });
    } else if (calculations.debtRatio > 30) {
      result.push({
        type: 'info',
        message: `יחס חוב לנכסים: ${calculations.debtRatio.toFixed(0)}% — בטווח סביר, אך כדאי לעקוב`
      });
    }

    // RSU concentration
    const rsuAssets = assets.filter((a) => a.subcategory === 'rsu');
    const rsuTotal = rsuAssets.reduce((sum, a) => sum + toILS(a.value, a.currency), 0);
    if (rsuTotal > calculations.totalAssets * 0.3) {
      result.push({
        type: 'warning',
        message: `תלות גבוהה במעסיק אחד (RSU/אופציות) — מומלץ לשקול אסטרטגיית מימוש`
      });
    }

    // Good diversification
    if (calculations.financialPercent >= 20 && calculations.financialPercent <= 60 &&
    calculations.realestatePercent >= 20 && calculations.realestatePercent <= 60) {
      result.push({
        type: 'success',
        message: 'פיזור טוב בין נכסים פיננסיים לנדל"ן'
      });
    }

    // Good liquidity
    if (calculations.liquidityPercent >= 20 && calculations.liquidityPercent <= 40) {
      result.push({
        type: 'success',
        message: `רמת נזילות טובה (${calculations.liquidityPercent.toFixed(0)}%) — גמישות והזדמנויות`
      });
    }

    // Base recommendation
    if (calculations.netWorth > 0) {
      result.push({
        type: 'info',
        message: 'יש בסיס טוב לתכנון פיננסי — שיחה עם מומחה תעזור לאזן בין צמיחה, נזילות והגנת ההון'
      });
    }

    return result;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculations, assets, currencyRates]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Submit lead
  const handleSubmitLead = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-lead`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source: 'wealth_snapshot',
            name: personalInfo.name,
            email: personalInfo.email,
            phone: personalInfo.phone,
            data: {
              age: personalInfo.age,
              familyStatus: personalInfo.familyStatus,
              totalAssets: calculations.totalAssets,
              totalLiabilities: calculations.totalLiabilities,
              netWorth: calculations.netWorth,
              assetBreakdown: calculations.assetsByCategory,
              liquidityPercent: calculations.liquidityPercent,
              debtRatio: calculations.debtRatio,
              assetsCount: assets.length,
              liabilitiesCount: liabilities.length
            }
          })
        }
      );

      if (response.ok) {
        setLeadSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step validation
  const canProceed = (step: Step): boolean => {
    switch (step) {
      case 1:
        return personalInfo.name.trim() !== '' && personalInfo.phone.trim() !== '';
      case 2:
        return assets.length > 0 && assets.every((a) => a.value > 0);
      case 3:
        return true; // Liabilities are optional
      default:
        return true;
    }
  };

  // Navigation
  const goToStep = (step: Step) => {
    if (step < currentStep || canProceed(currentStep)) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Render step indicator
  const renderStepIndicator = () =>
  <div data-ev-id="ev_1d89d00bcd" className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3, 4].map((step) =>
    <div data-ev-id="ev_47f4e7dafe" key={step} className="flex items-center">
          <button data-ev-id="ev_2698fa6189"
      onClick={() => goToStep(step as Step)}
      disabled={step > currentStep + 1}
      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
      step === currentStep ?
      'bg-gold text-navy scale-110' :
      step < currentStep ?
      'bg-green-500 text-white' :
      'bg-navy/20 text-navy/50'} ${
      step <= currentStep ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'}`}>

            {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
          </button>
          {step < 4 &&
      <div data-ev-id="ev_70f7790a14" className={`w-12 h-1 mx-1 rounded ${
      step < currentStep ? 'bg-green-500' : 'bg-navy/20'}`
      } />
      }
        </div>
    )}
    </div>;


  // Step 1: Personal Info
  const renderStep1 = () =>
  <div data-ev-id="ev_80dc7ccc4a" className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div data-ev-id="ev_1eacc21e18" className="flex items-center gap-3 mb-6">
        <div data-ev-id="ev_76790d3d5a" className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center">
          <User className="w-6 h-6 text-gold" />
        </div>
        <div data-ev-id="ev_9bf1ec0e29">
          <h2 data-ev-id="ev_7f5cb41e27" className="text-2xl font-bold text-navy">פרטים בסיסיים</h2>
          <p data-ev-id="ev_652633071b" className="text-slate">נתחיל בהכרת הפרטים שלך</p>
        </div>
      </div>
      
      <div data-ev-id="ev_5614a405f1" className="grid md:grid-cols-2 gap-6">
        <div data-ev-id="ev_d724a7234c">
          <label data-ev-id="ev_c18dfa9064" className="block text-navy font-medium mb-2">שם מלא *</label>
          <input data-ev-id="ev_9a582ae191"
        type="text"
        value={personalInfo.name}
        onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
        placeholder="הזן את שמך המלא" />

        </div>
        
        <div data-ev-id="ev_669a048203">
          <label data-ev-id="ev_671078e0c5" className="block text-navy font-medium mb-2">גיל</label>
          <input data-ev-id="ev_0c3cbbd071"
        type="number"
        value={personalInfo.age}
        onChange={(e) => setPersonalInfo({ ...personalInfo, age: e.target.value })}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
        placeholder="למשל 45" />

        </div>
        
        <div data-ev-id="ev_ea435ffd02">
          <label data-ev-id="ev_749c21b9f0" className="block text-navy font-medium mb-2">מצב משפחתי</label>
          <select data-ev-id="ev_bd7602dea2"
        value={personalInfo.familyStatus}
        onChange={(e) => setPersonalInfo({ ...personalInfo, familyStatus: e.target.value })}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all">

            <option data-ev-id="ev_9d3763813d" value="">בחר מצב</option>
            <option data-ev-id="ev_84486093ce" value="single">רווק/ה</option>
            <option data-ev-id="ev_dd544f6029" value="married">נשוי/אה</option>
            <option data-ev-id="ev_6266ed666d" value="married_kids">נשוי/אה + ילדים</option>
            <option data-ev-id="ev_9d25e6f5d1" value="divorced">גרוש/ה</option>
            <option data-ev-id="ev_5abc46bd70" value="widowed">אלמן/ה</option>
          </select>
        </div>
        
        <div data-ev-id="ev_d3bc220a71">
          <label data-ev-id="ev_07db1ae53b" className="block text-navy font-medium mb-2">טלפון *</label>
          <input data-ev-id="ev_e8ee1d6cc6"
        type="tel"
        value={personalInfo.phone}
        onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
        placeholder="050-0000000"
        dir="ltr" />

        </div>
        
        <div data-ev-id="ev_03faa13603" className="md:col-span-2">
          <label data-ev-id="ev_7ac2649bd0" className="block text-navy font-medium mb-2">אימייל</label>
          <input data-ev-id="ev_6105c274b2"
        type="email"
        value={personalInfo.email}
        onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
        placeholder="your@email.com"
        dir="ltr" />

        </div>
      </div>
      
      <div data-ev-id="ev_442ea29234" className="mt-8 flex justify-end">
        <button data-ev-id="ev_f6ae61320f"
      onClick={() => goToStep(2)}
      disabled={!canProceed(1)}
      className="flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-bold px-8 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">

          <span data-ev-id="ev_492c0bb452">המשך לנכסים</span>
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
    </div>;


  // Step 2: Assets
  const renderStep2 = () =>
  <div data-ev-id="ev_156bbf9718" className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div data-ev-id="ev_77ed451195" className="flex items-center gap-3 mb-6">
        <div data-ev-id="ev_257a206d21" className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-emerald-600" />
        </div>
        <div data-ev-id="ev_cbf0a47f67">
          <h2 data-ev-id="ev_97e358043f" className="text-2xl font-bold text-navy">הנכסים שלך</h2>
          <p data-ev-id="ev_f674991034" className="text-slate">הוסף את כל הנכסים שברשותך</p>
        </div>
      </div>
      
      {/* Asset Categories */}
      <div data-ev-id="ev_4a23731dcd" className="flex flex-col gap-4">
        {ASSET_CATEGORIES.map((category) => {
        const CategoryIcon = category.icon;
        const categoryAssets = assets.filter((a) => a.category === category.id);
        const isExpanded = expandedCategory === category.id;

        return (
          <div data-ev-id="ev_e5bf19ce4e" key={category.id} className="border border-gray-200 rounded-xl overflow-hidden">
              {/* Category Header */}
              <button data-ev-id="ev_47d8677fa4"
            onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors">

                <div data-ev-id="ev_185bf6cd4d" className="flex items-center gap-3">
                  <div data-ev-id="ev_fb8fa28fbf" className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                    <CategoryIcon className="w-5 h-5 text-white" />
                  </div>
                  <div data-ev-id="ev_ec8b86682f" className="text-right">
                    <h3 data-ev-id="ev_31b6e3075f" className="font-bold text-navy">{category.label}</h3>
                    <p data-ev-id="ev_aafe3a7664" className="text-sm text-slate">
                      {categoryAssets.length > 0 ?
                    `${categoryAssets.length} נכסים · ${formatCurrency(categoryAssets.reduce((sum, a) => sum + toILS(a.value, a.currency), 0))}` :
                    'לחץ להוספה'
                    }
                    </p>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="w-5 h-5 text-slate" /> : <ChevronDown className="w-5 h-5 text-slate" />}
              </button>
              
              {/* Expanded Content */}
              {isExpanded &&
            <div data-ev-id="ev_8a021b1b8a" className="p-4 flex flex-col gap-4 border-t border-gray-200">
                  {/* Subcategory buttons */}
                  <div data-ev-id="ev_2c900285e8" className="flex flex-wrap gap-2">
                    {category.subcategories.map((sub) =>
                <button data-ev-id="ev_e2fed431de"
                key={sub.id}
                onClick={() => addAsset(category.id, sub.id)}
                className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gold/20 text-navy rounded-lg text-sm transition-colors">

                        <PlusCircle className="w-4 h-4" />
                        {sub.label}
                      </button>
                )}
                  </div>
                  
                  {/* Asset items */}
                  {categoryAssets.map((asset) => {
                const subcat = category.subcategories.find((s) => s.id === asset.subcategory);
                return (
                  <div data-ev-id="ev_17ae498fdb" key={asset.id} className="bg-gray-50 rounded-xl p-4">
                        <div data-ev-id="ev_2b524e1cbd" className="flex items-center justify-between mb-3">
                          <span data-ev-id="ev_1c556c17f7" className="font-medium text-navy">{subcat?.label}</span>
                          <button data-ev-id="ev_38a3ad2486"
                      onClick={() => removeAsset(asset.id)}
                      className="text-red-500 hover:text-red-700 p-1">

                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div data-ev-id="ev_376ec17850" className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div data-ev-id="ev_f434bcbb94" className="col-span-2">
                            <label data-ev-id="ev_7fa9186b75" className="text-xs text-slate mb-1 block">שווי</label>
                            <input data-ev-id="ev_857604c5f7"
                        type="number"
                        value={asset.value || ''}
                        onChange={(e) => updateAsset(asset.id, 'value', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-left"
                        placeholder="0"
                        dir="ltr" />

                          </div>
                          
                          <div data-ev-id="ev_966aa6dd38">
                            <label data-ev-id="ev_e2e984c0b3" className="text-xs text-slate mb-1 block">מטבע</label>
                            <select data-ev-id="ev_7631e99ba8"
                        value={asset.currency}
                        onChange={(e) => updateAsset(asset.id, 'currency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg">

                              <option data-ev-id="ev_1371fbc146" value="ILS">₪ ILS</option>
                              <option data-ev-id="ev_863eaaf646" value="USD">$ USD</option>
                              <option data-ev-id="ev_3b9ca7a0f3" value="EUR">€ EUR</option>
                            </select>
                          </div>
                          
                          <div data-ev-id="ev_15e373edbf">
                            <label data-ev-id="ev_1751e784ff" className="text-xs text-slate mb-1 block">גוף מנהל</label>
                            <input data-ev-id="ev_50eba727ae"
                        type="text"
                        value={asset.institution || ''}
                        onChange={(e) => updateAsset(asset.id, 'institution', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                        placeholder="אופציונלי" />

                          </div>
                        </div>
                      </div>);

              })}
                </div>
            }
            </div>);

      })}
      </div>
      
      {/* Summary */}
      {assets.length > 0 &&
    <div data-ev-id="ev_02f5c652e0" className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
          <div data-ev-id="ev_96abb1dbae" className="flex items-center justify-between">
            <span data-ev-id="ev_0cd32fc454" className="font-bold text-emerald-800">סה"כ נכסים:</span>
            <span data-ev-id="ev_f48a1a9ca1" className="text-2xl font-bold text-emerald-700">{formatCurrency(calculations.totalAssets)}</span>
          </div>
        </div>
    }
      
      <div data-ev-id="ev_17e7331d81" className="mt-8 flex justify-between">
        <button data-ev-id="ev_37f30c68e8"
      onClick={() => goToStep(1)}
      className="flex items-center gap-2 text-navy hover:text-gold font-medium px-4 py-3 transition-colors">

          <ArrowRight className="w-5 h-5" />
          <span data-ev-id="ev_c0ce5c1b40">חזרה</span>
        </button>
        <button data-ev-id="ev_b387564ecf"
      onClick={() => goToStep(3)}
      disabled={!canProceed(2)}
      className="flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-bold px-8 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">

          <span data-ev-id="ev_b6a342b75b">המשך להתחייבויות</span>
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
    </div>;


  // Step 3: Liabilities
  const renderStep3 = () =>
  <div data-ev-id="ev_ca2718a9d8" className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div data-ev-id="ev_0bf7f91b4d" className="flex items-center gap-3 mb-6">
        <div data-ev-id="ev_6f7aeff673" className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
          <CreditCard className="w-6 h-6 text-red-600" />
        </div>
        <div data-ev-id="ev_30626349a3">
          <h2 data-ev-id="ev_2307559c51" className="text-2xl font-bold text-navy">התחייבויות</h2>
          <p data-ev-id="ev_986a9deb66" className="text-slate">הוסף הלוואות והתחייבויות (אופציונלי)</p>
        </div>
      </div>
      
      {/* Add liability buttons */}
      <div data-ev-id="ev_6a7362b152" className="flex flex-wrap gap-2 mb-6">
        {LIABILITY_CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        return (
          <button data-ev-id="ev_f34625417d"
          key={cat.id}
          onClick={() => addLiability(cat.id)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-red-50 text-navy rounded-lg transition-colors">

              <Icon className="w-4 h-4" />
              <PlusCircle className="w-4 h-4" />
              {cat.label}
            </button>);

      })}
      </div>
      
      {/* Liability items */}
      <div data-ev-id="ev_a26e305cc7" className="flex flex-col gap-4">
        {liabilities.map((liability) => {
        const cat = LIABILITY_CATEGORIES.find((c) => c.id === liability.type);
        const Icon = cat?.icon || CreditCard;
        return (
          <div data-ev-id="ev_3aa9d6f7ed" key={liability.id} className="bg-gray-50 rounded-xl p-4">
              <div data-ev-id="ev_39d57b5030" className="flex items-center justify-between mb-3">
                <div data-ev-id="ev_6d3b5c1511" className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-red-500" />
                  <span data-ev-id="ev_3277fa20a1" className="font-medium text-navy">{cat?.label}</span>
                </div>
                <button data-ev-id="ev_aa6c96b144"
              onClick={() => removeLiability(liability.id)}
              className="text-red-500 hover:text-red-700 p-1">

                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div data-ev-id="ev_af1e78e7f3" className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div data-ev-id="ev_f99c7565b4">
                  <label data-ev-id="ev_ac024fe084" className="text-xs text-slate mb-1 block">יתרת חוב</label>
                  <input data-ev-id="ev_93071d6431"
                type="number"
                value={liability.balance || ''}
                onChange={(e) => updateLiability(liability.id, 'balance', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-left"
                placeholder="0"
                dir="ltr" />

                </div>
                
                <div data-ev-id="ev_701e7a6a45">
                  <label data-ev-id="ev_93ef98c61c" className="text-xs text-slate mb-1 block">מטבע</label>
                  <select data-ev-id="ev_dbaa2d0ebb"
                value={liability.currency}
                onChange={(e) => updateLiability(liability.id, 'currency', e.target.value as 'ILS' | 'USD' | 'EUR')}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg">

                    <option data-ev-id="ev_6b9575a2cc" value="ILS">₪ ILS</option>
                    <option data-ev-id="ev_a6ace5deb3" value="USD">$ USD</option>
                    <option data-ev-id="ev_5ee8172727" value="EUR">€ EUR</option>
                  </select>
                </div>
                
                <div data-ev-id="ev_6098a519de">
                  <label data-ev-id="ev_57d9a6deea" className="text-xs text-slate mb-1 block">החזר חודשי</label>
                  <input data-ev-id="ev_026f3847e6"
                type="number"
                value={liability.monthlyPayment || ''}
                onChange={(e) => updateLiability(liability.id, 'monthlyPayment', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-left"
                placeholder="0"
                dir="ltr" />

                </div>
                
                <div data-ev-id="ev_255d345bcf">
                  <label data-ev-id="ev_575c6895a8" className="text-xs text-slate mb-1 block">ריבית %</label>
                  <input data-ev-id="ev_2a587b8e01"
                type="number"
                step="0.1"
                value={liability.interestRate || ''}
                onChange={(e) => updateLiability(liability.id, 'interestRate', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-left"
                placeholder="0"
                dir="ltr" />

                </div>
              </div>
            </div>);

      })}
      </div>
      
      {liabilities.length === 0 &&
    <div data-ev-id="ev_197b6b1042" className="text-center py-8 text-slate">
          <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p data-ev-id="ev_144f414f2b">אין התחייבויות? מצוין! אפשר להמשיך.</p>
        </div>
    }
      
      {/* Summary */}
      {liabilities.length > 0 &&
    <div data-ev-id="ev_9e0ce5ce44" className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200">
          <div data-ev-id="ev_2d38ef2e01" className="flex items-center justify-between">
            <span data-ev-id="ev_7a756ed99d" className="font-bold text-red-800">סה"כ התחייבויות:</span>
            <span data-ev-id="ev_3ac52700f9" className="text-2xl font-bold text-red-700">{formatCurrency(calculations.totalLiabilities)}</span>
          </div>
        </div>
    }
      
      <div data-ev-id="ev_db7561d87f" className="mt-8 flex justify-between">
        <button data-ev-id="ev_8473193c98"
      onClick={() => goToStep(2)}
      className="flex items-center gap-2 text-navy hover:text-gold font-medium px-4 py-3 transition-colors">

          <ArrowRight className="w-5 h-5" />
          <span data-ev-id="ev_9a871ec668">חזרה</span>
        </button>
        <button data-ev-id="ev_0047d8dfe6"
      onClick={() => goToStep(4)}
      className="flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-bold px-8 py-3 rounded-xl transition-all">

          <span data-ev-id="ev_8cec2c9876">צפה בתוצאות</span>
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
    </div>;


  // Step 4: Results Dashboard
  const renderStep4 = () =>
  <div data-ev-id="ev_9049c22c7d" className="flex flex-col gap-6">
      {/* Hero Stats */}
      <div data-ev-id="ev_5b61a9855b" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div data-ev-id="ev_1d92e2c515" className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div data-ev-id="ev_874c3a8c06" className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </div>
          <p data-ev-id="ev_7c6e53709d" className="text-slate text-sm mb-1">סה"כ נכסים</p>
          <p data-ev-id="ev_08c4635c2f" className="text-2xl lg:text-3xl font-bold text-emerald-600">{formatCurrency(calculations.totalAssets)}</p>
        </div>
        
        <div data-ev-id="ev_7441547023" className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <div data-ev-id="ev_e242013e6d" className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <CreditCard className="w-6 h-6 text-red-600" />
          </div>
          <p data-ev-id="ev_505c3aee9d" className="text-slate text-sm mb-1">סה"כ התחייבויות</p>
          <p data-ev-id="ev_34bbf9eea2" className="text-2xl lg:text-3xl font-bold text-red-600">{formatCurrency(calculations.totalLiabilities)}</p>
        </div>
        
        <div data-ev-id="ev_3d8075e472" className="bg-gradient-to-br from-navy to-navy-light rounded-2xl shadow-lg p-6 text-center col-span-2">
          <div data-ev-id="ev_9cdcec6614" className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Landmark className="w-6 h-6 text-gold" />
          </div>
          <p data-ev-id="ev_ab0f8db23f" className="text-white/70 text-sm mb-1">הון נקי</p>
          <p data-ev-id="ev_2f2a3d03d2" className="text-3xl lg:text-4xl font-bold text-gold">{formatCurrency(calculations.netWorth)}</p>
        </div>
      </div>
      
      {/* Charts Row */}
      <div data-ev-id="ev_6b842e48b5" className="grid lg:grid-cols-2 gap-6">
        {/* Pie Chart - Asset Distribution */}
        <div data-ev-id="ev_746f13d6c6" className="bg-white rounded-2xl shadow-lg p-6">
          <h3 data-ev-id="ev_6b376d1041" className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-gold" />
            חלוקת נכסים
          </h3>
          
          <div data-ev-id="ev_ee4236e07e" className="flex items-center justify-center gap-8">
            {/* Simple CSS Pie Chart */}
            <div data-ev-id="ev_b993d17d11" className="relative w-48 h-48">
              <svg data-ev-id="ev_bb66c28521" viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {calculations.totalAssets > 0 &&
              <>
                    {/* Financial */}
                    <circle data-ev-id="ev_a4467fcc5e"
                cx="50" cy="50" r="40"
                fill="transparent"
                stroke="#3B82F6"
                strokeWidth="20"
                strokeDasharray={`${calculations.financialPercent * 2.51} 251`}
                strokeDashoffset="0" />

                    {/* Real Estate */}
                    <circle data-ev-id="ev_0fff19f780"
                cx="50" cy="50" r="40"
                fill="transparent"
                stroke="#10B981"
                strokeWidth="20"
                strokeDasharray={`${calculations.realestatePercent * 2.51} 251`}
                strokeDashoffset={`${-calculations.financialPercent * 2.51}`} />

                    {/* Business */}
                    <circle data-ev-id="ev_9ea19bdd3f"
                cx="50" cy="50" r="40"
                fill="transparent"
                stroke="#8B5CF6"
                strokeWidth="20"
                strokeDasharray={`${calculations.businessPercent * 2.51} 251`}
                strokeDashoffset={`${-(calculations.financialPercent + calculations.realestatePercent) * 2.51}`} />

                  </>
              }
              </svg>
            </div>
            
            {/* Legend */}
            <div data-ev-id="ev_1fcf1ced19" className="flex flex-col gap-3">
              <div data-ev-id="ev_53a8339b45" className="flex items-center gap-2">
                <div data-ev-id="ev_3b5bafe12c" className="w-4 h-4 bg-blue-500 rounded" />
                <span data-ev-id="ev_e93af89b73" className="text-sm text-slate">פיננסי: {calculations.financialPercent.toFixed(0)}%</span>
              </div>
              <div data-ev-id="ev_abd4213d22" className="flex items-center gap-2">
                <div data-ev-id="ev_7515d1e0dc" className="w-4 h-4 bg-emerald-500 rounded" />
                <span data-ev-id="ev_aba3e47b22" className="text-sm text-slate">נדל"ן: {calculations.realestatePercent.toFixed(0)}%</span>
              </div>
              <div data-ev-id="ev_9492e121bb" className="flex items-center gap-2">
                <div data-ev-id="ev_27ad6b0cc9" className="w-4 h-4 bg-purple-500 rounded" />
                <span data-ev-id="ev_8ed4a78e2f" className="text-sm text-slate">עסקי: {calculations.businessPercent.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Liquidity & Debt Gauges */}
        <div data-ev-id="ev_816fd83936" className="bg-white rounded-2xl shadow-lg p-6">
          <h3 data-ev-id="ev_c79e1578a1" className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-gold" />
            מדדים מרכזיים
          </h3>
          
          <div data-ev-id="ev_ee7286338a" className="flex flex-col gap-6">
            {/* Liquidity */}
            <div data-ev-id="ev_304d433a12">
              <div data-ev-id="ev_8e9471e428" className="flex justify-between mb-2">
                <span data-ev-id="ev_bf110a848b" className="text-sm font-medium text-navy">נזילות</span>
                <span data-ev-id="ev_15a414c45c" className="text-sm font-bold text-blue-600">{calculations.liquidityPercent.toFixed(0)}%</span>
              </div>
              <div data-ev-id="ev_ebf816b9ed" className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div data-ev-id="ev_8eb161fa8d"
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(calculations.liquidityPercent, 100)}%` }} />

              </div>
              <p data-ev-id="ev_14b33005f6" className="text-xs text-slate mt-1">מומלץ: 20-40% נכסים נזילים</p>
            </div>
            
            {/* Debt Ratio */}
            <div data-ev-id="ev_7da2d50206">
              <div data-ev-id="ev_ece6a8097f" className="flex justify-between mb-2">
                <span data-ev-id="ev_08d43f1fd5" className="text-sm font-medium text-navy">יחס חוב לנכסים</span>
                <span data-ev-id="ev_bfb473ad56" className={`text-sm font-bold ${
              calculations.debtRatio > 50 ? 'text-red-600' :
              calculations.debtRatio > 30 ? 'text-orange-500' : 'text-green-600'}`
              }>{calculations.debtRatio.toFixed(0)}%</span>
              </div>
              <div data-ev-id="ev_7abf040561" className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div data-ev-id="ev_404705e6e3"
              className={`h-full rounded-full transition-all duration-500 ${
              calculations.debtRatio > 50 ? 'bg-gradient-to-r from-red-400 to-red-600' :
              calculations.debtRatio > 30 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
              'bg-gradient-to-r from-green-400 to-green-600'}`
              }
              style={{ width: `${Math.min(calculations.debtRatio, 100)}%` }} />

              </div>
              <p data-ev-id="ev_25e3e47585" className="text-xs text-slate mt-1">מומלץ: מתחת 30%</p>
            </div>
            
            {/* Net Worth Bar */}
            <div data-ev-id="ev_be966e1a0f" className="pt-4 border-t border-gray-200">
              <div data-ev-id="ev_14a2ed0b15" className="flex justify-between mb-2">
                <span data-ev-id="ev_7522ad6df4" className="text-sm font-medium text-navy">נכסים מול התחייבויות</span>
              </div>
              <div data-ev-id="ev_950b8e2049" className="flex gap-1 h-8">
                <div data-ev-id="ev_6edbc54966"
              className="bg-emerald-500 rounded-r-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ width: `${calculations.totalAssets > 0 ? calculations.totalAssets / (calculations.totalAssets + calculations.totalLiabilities || 1) * 100 : 50}%` }}>

                  נכסים
                </div>
                {calculations.totalLiabilities > 0 &&
              <div data-ev-id="ev_5849afdab5"
              className="bg-red-500 rounded-l-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ width: `${calculations.totalLiabilities / (calculations.totalAssets + calculations.totalLiabilities) * 100}%` }}>

                    חוב
                  </div>
              }
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Insights */}
      <div data-ev-id="ev_5a37b3b1f0" className="bg-white rounded-2xl shadow-lg p-6">
        <h3 data-ev-id="ev_ad299e82be" className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-gold" />
          תובנות והמלצות
        </h3>
        
        <div data-ev-id="ev_fbbf2aeaf7" className="flex flex-col gap-3">
          {insights.map((insight, index) =>
        <div data-ev-id="ev_47bed3b56e"
        key={index}
        className={`flex items-start gap-3 p-4 rounded-xl ${
        insight.type === 'warning' ? 'bg-orange-50 border border-orange-200' :
        insight.type === 'success' ? 'bg-green-50 border border-green-200' :
        'bg-blue-50 border border-blue-200'}`
        }>

              {insight.type === 'warning' ?
          <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" /> :
          insight.type === 'success' ?
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" /> :

          <Lightbulb className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          }
              <p data-ev-id="ev_e4f405932c" className={`text-sm ${
          insight.type === 'warning' ? 'text-orange-800' :
          insight.type === 'success' ? 'text-green-800' :
          'text-blue-800'}`
          }>{insight.message}</p>
            </div>
        )}
        </div>
      </div>
      
      {/* CTA */}
      {!leadSubmitted ?
    <div data-ev-id="ev_161484bf70" className="bg-gradient-to-br from-navy to-navy-light rounded-2xl shadow-xl p-8 text-center">
          <h3 data-ev-id="ev_f023493e32" className="text-2xl font-bold text-white mb-3">רוצה ניתוח מעמיק עם מומחה?</h3>
          <p data-ev-id="ev_4d63692ae4" className="text-white/70 mb-6 max-w-xl mx-auto">
            צוות המתכננים הפיננסיים שלנו ינתח את תמונת ההון שלך ויבנה איתך תוכנית מותאמת אישית.
          </p>
          <button data-ev-id="ev_695263b5ac"
      onClick={handleSubmitLead}
      disabled={isSubmitting}
      className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-bold px-8 py-4 rounded-xl transition-all disabled:opacity-50">

            {isSubmitting ?
        <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span data-ev-id="ev_401ee0ef3a">שולח...</span>
              </> :

        <>
                <Send className="w-5 h-5" />
                <span data-ev-id="ev_46c7daaede">שלח ונחזור אליי</span>
              </>
        }
          </button>
        </div> :

    <div data-ev-id="ev_dfd3c0a464" className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 data-ev-id="ev_19e1650c69" className="text-2xl font-bold text-green-800 mb-2">תודה! קיבלנו את הפרטים</h3>
          <p data-ev-id="ev_28dc430fbd" className="text-green-700">נציג עמך בקרוב לתיאום שיחת ייעוץ.</p>
        </div>
    }
      
      {/* Back button */}
      <div data-ev-id="ev_6c9b74be19" className="flex justify-start">
        <button data-ev-id="ev_06a740b366"
      onClick={() => goToStep(3)}
      className="flex items-center gap-2 text-navy hover:text-gold font-medium px-4 py-3 transition-colors">

          <ArrowRight className="w-5 h-5" />
          <span data-ev-id="ev_3b3c291632">חזרה לעריכה</span>
        </button>
      </div>
    </div>;


  return (
    <div data-ev-id="ev_26c1329ace" className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header data-ev-id="ev_7a75aa82f4" className="bg-navy shadow-lg sticky top-0 z-50">
        <div data-ev-id="ev_356005a4e1" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_8d0ae9c781" className="flex justify-between items-center h-16">
            <Logo variant="light" />
            
            {/* Desktop Nav */}
            <nav data-ev-id="ev_05d00f4928" className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-white/80 hover:text-white transition-colors">בית</Link>
              <Link to="/products" className="text-white/80 hover:text-white transition-colors">שירותים</Link>
              <Link to="/#contact" className="bg-gold hover:bg-gold-light text-navy font-semibold px-4 py-2 rounded-lg transition-colors">צור קשר</Link>
            </nav>
            
            {/* Mobile menu button */}
            <button data-ev-id="ev_8974f4e203" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white p-2">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Nav */}
        {mobileMenuOpen &&
        <div data-ev-id="ev_b79bfed238" className="md:hidden bg-navy-light border-t border-white/10">
            <div data-ev-id="ev_8d3d4411b2" className="px-4 py-3 flex flex-col gap-2">
              <Link to="/" className="text-white/80 hover:text-white py-2">בית</Link>
              <Link to="/products" className="text-white/80 hover:text-white py-2">שירותים</Link>
              <Link to="/#contact" className="bg-gold text-navy font-semibold px-4 py-2 rounded-lg text-center">צור קשר</Link>
            </div>
          </div>
        }
      </header>
      
      {/* Hero */}
      <section data-ev-id="ev_b054ffcdab" className="bg-gradient-to-br from-navy via-navy to-navy-light py-16 text-center">
        <div data-ev-id="ev_5e05033533" className="max-w-4xl mx-auto px-4">
          <div data-ev-id="ev_59b8c5637c" className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Target className="w-4 h-4 text-gold" />
            <span data-ev-id="ev_a3751b4a80" className="text-white/90 text-sm">כלי תכנון פיננסי מתקדם</span>
          </div>
          <h1 data-ev-id="ev_eae0a54dfd" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            מפת הנכסים שלי
          </h1>
          <p data-ev-id="ev_18ce6cbcf7" className="text-lg text-white/70 max-w-2xl mx-auto">
            הזן את הנכסים וההתחייבויות שלך וקבל תמונה כוללת, ברורה ומעוצבת של מבנה ההון שלך.
          </p>
        </div>
      </section>
      
      {/* Main Content */}
      <main data-ev-id="ev_26b6698aa9" className="max-w-4xl mx-auto px-4 py-12 -mt-8">
        {renderStepIndicator()}
        
        <div data-ev-id="ev_ecae928fdb" className="text-center mb-6">
          <p data-ev-id="ev_67cb7c2477" className="text-slate">
            {currentStep === 1 && 'שלב 1: פרטים בסיסיים'}
            {currentStep === 2 && 'שלב 2: הנכסים שלך'}
            {currentStep === 3 && 'שלב 3: התחייבויות'}
            {currentStep === 4 && 'שלב 4: תמונת ההון שלך'}
          </p>
        </div>
        
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </main>
      
      {/* Footer */}
      <footer data-ev-id="ev_e78a15f85f" className="bg-navy py-8">
        <div data-ev-id="ev_d0d277478b" className="max-w-7xl mx-auto px-4 text-center">
          <Logo variant="light" />
          <p data-ev-id="ev_2173c8c7f2" className="text-white/50 text-sm mt-4">
            © 2024 WealthTech. כל הזכויות שמורות.
          </p>
          <p data-ev-id="ev_a9f8d82a2a" className="text-white/30 text-xs mt-2 max-w-2xl mx-auto">
            המידע המוצג בכלי זה הינו אינפורמטיבי בלבד ואינו מהווה ייעוץ או המלצה פיננסית.
          </p>
        </div>
      </footer>
    </div>);

}