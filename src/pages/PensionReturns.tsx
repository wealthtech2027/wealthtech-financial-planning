import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  Filter,
  BarChart3,
  Table,
  Search,
  RefreshCw,
  Info,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
  Gift,
  FileText } from
'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line } from
'recharts';
import { Logo } from '@/components/Logo';
import { fetchAllPensionData, type ProcessedFund } from '@/services/gemelnetApi';
import { PensionOfferPopup } from '@/components/PensionOfferPopup';

// Types - use the ProcessedFund type from API service
type Fund = ProcessedFund;

interface FilterState {
  type: string;
  company: string;
  track: string;
  search: string;
}

// Sample data - used as fallback if API fails
const sampleFunds: Fund[] = [
{
  id: '1',
  fundNumber: 512,
  name: 'אלטשולר שחם גמל להשקעה',
  company: 'אלטשולר שחם',
  type: 'gemel',
  track: 'מניות',
  returns: { ytd: 12.5, oneYear: 15.2, threeYears: 8.7, fiveYears: 9.1 },
  managementFee: 0.74,
  depositFee: 0,
  assetsUnderManagement: 45000,
  lastUpdate: '2024-03'
},
{
  id: '2',
  fundNumber: 629,
  name: 'atinum דש גמל',
  company: 'atinum דש',
  type: 'gemel',
  track: 'כללי',
  returns: { ytd: 8.3, oneYear: 11.4, threeYears: 7.2, fiveYears: 7.8 },
  managementFee: 0.65,
  depositFee: 0,
  assetsUnderManagement: 38000,
  lastUpdate: '2024-03'
},
{
  id: '3',
  fundNumber: 1105,
  name: 'הראל השתלמות',
  company: 'הראל',
  type: 'hishtalmut',
  track: 'כללי',
  returns: { ytd: 9.1, oneYear: 12.8, threeYears: 7.9, fiveYears: 8.4 },
  managementFee: 0.58,
  depositFee: 0,
  assetsUnderManagement: 52000,
  lastUpdate: '2024-03'
},
{
  id: '4',
  fundNumber: 7024,
  name: 'מגדל פנסיה',
  company: 'מגדל',
  type: 'pension',
  track: 'מסלול כללי',
  returns: { ytd: 7.2, oneYear: 9.5, threeYears: 6.8, fiveYears: 7.1 },
  managementFee: 0.52,
  depositFee: 0.25,
  assetsUnderManagement: 120000,
  lastUpdate: '2024-03'
},
{
  id: '5',
  fundNumber: 847,
  name: 'פסגות גמל להשקעה מניות',
  company: 'פסגות',
  type: 'gemel',
  track: 'מניות',
  returns: { ytd: 14.2, oneYear: 17.8, threeYears: 9.5, fiveYears: 10.2 },
  managementFee: 0.78,
  depositFee: 0,
  assetsUnderManagement: 28000,
  lastUpdate: '2024-03'
},
{
  id: '6',
  fundNumber: 1203,
  name: 'כלל השתלמות אג"ח',
  company: 'כלל',
  type: 'hishtalmut',
  track: 'אג"ח',
  returns: { ytd: 3.2, oneYear: 4.5, threeYears: 2.8, fiveYears: 3.1 },
  managementFee: 0.45,
  depositFee: 0,
  assetsUnderManagement: 18000,
  lastUpdate: '2024-03'
},
{
  id: '7',
  fundNumber: 7089,
  name: 'הפניקס פנסיה מקיפה',
  company: 'הפניקס',
  type: 'pension',
  track: 'מסלול כללי',
  returns: { ytd: 7.8, oneYear: 10.2, threeYears: 7.1, fiveYears: 7.5 },
  managementFee: 0.48,
  depositFee: 0.22,
  assetsUnderManagement: 95000,
  lastUpdate: '2024-03'
},
{
  id: '8',
  fundNumber: 935,
  name: 'מור גמל',
  company: 'מור',
  type: 'gemel',
  track: 'כללי',
  returns: { ytd: 9.8, oneYear: 13.2, threeYears: 8.1, fiveYears: 8.6 },
  managementFee: 0.55,
  depositFee: 0,
  assetsUnderManagement: 22000,
  lastUpdate: '2024-03'
},
{
  id: '9',
  fundNumber: 1089,
  name: 'קרן השתלמות למשפטנים',
  company: 'הראל',
  type: 'hishtalmut',
  track: 'כללי',
  returns: { ytd: 8.9, oneYear: 11.7, threeYears: 7.5, fiveYears: 8.0 },
  managementFee: 0.52,
  depositFee: 0,
  assetsUnderManagement: 15000,
  lastUpdate: '2024-03'
},
{
  id: '10',
  fundNumber: 1156,
  name: 'קרן השתלמות לעובדי הוראה',
  company: 'מגדל',
  type: 'hishtalmut',
  track: 'כללי',
  returns: { ytd: 8.5, oneYear: 11.2, threeYears: 7.3, fiveYears: 7.8 },
  managementFee: 0.48,
  depositFee: 0,
  assetsUnderManagement: 32000,
  lastUpdate: '2024-03'
},
{
  id: '11',
  fundNumber: 258,
  name: 'קופה מרכזית לפיצויים - הראל',
  company: 'הראל',
  type: 'pitzuim',
  track: 'כללי',
  returns: { ytd: 6.2, oneYear: 8.5, threeYears: 5.8, fiveYears: 6.2 },
  managementFee: 0.42,
  depositFee: 0,
  assetsUnderManagement: 28000,
  lastUpdate: '2024-03'
},
{
  id: '12',
  fundNumber: 241,
  name: 'כלל פיצויים למעסיק',
  company: 'כלל',
  type: 'pitzuim',
  track: 'כללי',
  returns: { ytd: 5.9, oneYear: 8.1, threeYears: 5.5, fiveYears: 5.9 },
  managementFee: 0.45,
  depositFee: 0,
  assetsUnderManagement: 35000,
  lastUpdate: '2024-03'
}];


const fundTypeLabels: Record<string, string> = {
  gemel: 'קופת גמל',
  hishtalmut: 'קרן השתלמות',
  pension: 'קרן פנסיה',
  pitzuim: 'קופה מרכזית לפיצויים'
};

const companies = ['אלטשולר שחם', 'יטבול דש', 'הראל', 'מגדל', 'פסגות', 'כלל', 'הפניקס', 'מור'];
const tracks = ['כללי', 'מניות', 'אג"ח', 'מסלול כללי', 'שקלי', 'חו"ל'];

export default function PensionReturns() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [funds, setFunds] = useState<Fund[]>(sampleFunds);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'api' | 'sample'>('sample');
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');
  const [selectedFunds, setSelectedFunds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<string>('returns.oneYear');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filters, setFilters] = useState<FilterState>({
    type: '',
    company: '',
    track: '',
    search: ''
  });
  const [showOfferPopup, setShowOfferPopup] = useState(false);

  // Auto-open popup after 15 seconds (only once per session)
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenPensionOffer');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowOfferPopup(true);
        sessionStorage.setItem('hasSeenPensionOffer', 'true');
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Fetch data from API on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('Starting to load pension data...');
      const apiData = await fetchAllPensionData();
      console.log('API returned:', apiData.length, 'funds');

      if (apiData && apiData.length > 0) {
        setFunds(apiData);
        setDataSource('api');
        console.log('Using API data');
      } else {
        // Fallback to sample data if API returns empty
        setFunds(sampleFunds);
        setDataSource('sample');
        setError('ה-API החזיר 0 רשומות. מציג נתונים לדוגמה. בדוק את הקונסול לפרטים נוספים.');
        console.log('Using sample data - API returned empty');
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setFunds(sampleFunds);
      setDataSource('sample');
      setError(`שגיאה בטעינה: ${err instanceof Error ? err.message : 'Unknown error'}. מציג נתונים לדוגמה.`);
    } finally {
      setLoading(false);
    }
  };

  // Filter funds
  const filteredFunds = funds.filter((fund) => {
    if (filters.type && fund.type !== filters.type) return false;
    if (filters.company && fund.company !== filters.company) return false;
    if (filters.track && fund.track !== filters.track) return false;
    if (filters.search && !fund.name.includes(filters.search) && !fund.company.includes(filters.search)) return false;
    return true;
  });

  // Sort funds
  const sortedFunds = [...filteredFunds].sort((a, b) => {
    let aVal: number, bVal: number;

    switch (sortField) {
      case 'returns.ytd':
        aVal = a.returns.ytd;
        bVal = b.returns.ytd;
        break;
      case 'returns.oneYear':
        aVal = a.returns.oneYear;
        bVal = b.returns.oneYear;
        break;
      case 'returns.threeYears':
        aVal = a.returns.threeYears;
        bVal = b.returns.threeYears;
        break;
      case 'returns.fiveYears':
        aVal = a.returns.fiveYears;
        bVal = b.returns.fiveYears;
        break;
      case 'managementFee':
        aVal = a.managementFee;
        bVal = b.managementFee;
        break;
      case 'assetsUnderManagement':
        aVal = a.assetsUnderManagement;
        bVal = b.assetsUnderManagement;
        break;
      default:
        aVal = a.returns.oneYear;
        bVal = b.returns.oneYear;
    }

    return sortDirection === 'desc' ? bVal - aVal : aVal - bVal;
  });

  // Chart data
  const chartData = sortedFunds.slice(0, 10).map((fund) => ({
    name: fund.name.length > 20 ? fund.name.substring(0, 20) + '...' : fund.name,
    'שנה': Number(fund.returns.oneYear.toFixed(2)),
    '3 שנים': Number(fund.returns.threeYears.toFixed(2)),
    '5 שנים': Number(fund.returns.fiveYears.toFixed(2))
  }));

  const comparisonData = selectedFunds.length > 0 ?
  funds.filter((f) => selectedFunds.includes(f.id)).map((fund) => ({
    name: fund.name.length > 15 ? fund.name.substring(0, 15) + '...' : fund.name,
    'מתחילת השנה': Number(fund.returns.ytd.toFixed(2)),
    'שנה': Number(fund.returns.oneYear.toFixed(2)),
    '3 שנים': Number(fund.returns.threeYears.toFixed(2)),
    '5 שנים': Number(fund.returns.fiveYears.toFixed(2))
  })) :
  [];

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const toggleFundSelection = (fundId: string) => {
    setSelectedFunds((prev) =>
    prev.includes(fundId) ?
    prev.filter((id) => id !== fundId) :
    prev.length < 5 ? [...prev, fundId] : prev
    );
  };

  const SortIcon = ({ field }: {field: string;}) => {
    if (sortField !== field) return null;
    return sortDirection === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />;
  };

  return (
    <div data-ev-id="ev_3617417a63" className="min-h-screen bg-surface font-sans">
      {/* Navigation */}
      <nav data-ev-id="ev_b75f94aaf5" className="fixed top-0 right-0 left-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
        <div data-ev-id="ev_167b2521d1" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_82c650a323" className="flex justify-between items-center h-20">
            <Logo />
            
            <div data-ev-id="ev_834fe8265a" className="hidden xl:flex items-center gap-4 2xl:gap-7 text-[15px] 2xl:text-base">
              <Link to="/" className="text-ink-muted hover:text-ink transition-colors font-medium">ראשי</Link>
              <Link to="/#about" className="text-ink-muted hover:text-ink transition-colors font-medium">אודות</Link>
              <Link to="/products" className="text-ink-muted hover:text-ink transition-colors font-medium">מוצרים</Link>
              <Link to="/#services" className="text-ink-muted hover:text-ink transition-colors font-medium">שירותים</Link>
              <Link to="/pension-returns" className="text-gold font-medium">תשואות פנסיה</Link>
              <Link to="/links" className="text-ink-muted hover:text-ink transition-colors font-medium">קישורים שימושיים</Link>
              <a data-ev-id="ev_ecec70bbb4"
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

            <button data-ev-id="ev_9b80e90ba0"
            className="xl:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen &&
        <div data-ev-id="ev_569a514bf5" className="xl:hidden bg-surface border-t border-border">
            <div data-ev-id="ev_9b1599f60d" className="px-4 py-4 flex flex-col gap-4">
              <Link to="/" className="text-ink-muted hover:text-ink font-medium py-2">ראשי</Link>
              <Link to="/#about" className="text-ink-muted hover:text-ink font-medium py-2">אודות</Link>
              <Link to="/products" className="text-ink-muted hover:text-ink font-medium py-2">מוצרים</Link>
              <Link to="/#services" className="text-ink-muted hover:text-ink font-medium py-2">שירותים</Link>
              <Link to="/pension-returns" className="text-gold font-medium py-2">תשואות פנסיה</Link>
              <Link to="/links" className="text-ink-muted hover:text-ink font-medium py-2">קישורים שימושיים</Link>
              <a data-ev-id="ev_63251dee5f"
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
      <section data-ev-id="ev_f8588f16ad" className="pt-28 pb-12 hero-tech">
        <div data-ev-id="ev_b69b843645" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_758d1f5bf9" className="text-center">
            <div data-ev-id="ev_3625dc4f5f" className="inline-flex items-center justify-center w-16 h-16 bg-gold/20 rounded-2xl mb-6">
              <BarChart3 className="w-8 h-8 text-gold" />
            </div>
            <h1 data-ev-id="ev_f85ebee53d" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              השוואת תשואות חיסכון פנסיוני
            </h1>
            <p data-ev-id="ev_fa4abeb957" className="text-lg text-white/80 max-w-2xl mx-auto mb-6">
              כלי השוואה מקיף לקופות גמל, קרנות השתלמות וקרנות פנסיה בישראל.
              הנתונים מבוססים על מידע ציבורי מגמל-נט.
            </p>
            <a data-ev-id="ev_ade0dfe9ab"
            href="https://gemelnet.cma.gov.il"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors">

              <ExternalLink className="w-4 h-4" />
              <span data-ev-id="ev_604bb4e86f">מקור הנתונים: גמל-נט</span>
            </a>
            
            {/* Data Source Info */}
            <div data-ev-id="ev_ace9d870d2" className="mt-6 text-right max-w-2xl mx-auto">
              <h3 data-ev-id="ev_7987982723" className="text-gold font-semibold mb-2">מקורות המידע והנחות מערכת</h3>
              <p data-ev-id="ev_85626c727c" className="text-white/70 text-sm leading-relaxed">
                המערכת מתבססת על נתוני תשואות של קופות הגמל המדווחות מידי חודש לאגף שוק ההון.
              </p>
              <p data-ev-id="ev_cb38fb99ec" className="text-white/70 text-sm leading-relaxed mt-2">
                <span data-ev-id="ev_b4c271888a" className="text-gold/90 font-medium">תשואה נומינלית ברוטו</span> – המערכת משתמשת בנתוני תשואות נומינליות ללא ניכוי דמי ניהול.
              </p>
              <p data-ev-id="ev_c8adbad9c5" className="text-white/70 text-sm leading-relaxed mt-4">
                תהליך ניוד של חיסכון פנסיוני הוא מהלך בעל השלכות מקצועיות, מיסויות וביטוחיות, ולכן מומלץ לבצעו רק לאחר התייעצות עם בעל רישיון פנסיוני מתאים ובתוקף מטעם רשות שוק ההון, ביטוח וחיסכון.
              </p>
              <p data-ev-id="ev_a5dc6f7039" className="text-white/70 text-sm leading-relaxed mt-2">
                <span data-ev-id="ev_08312eb338" className="text-gold/90 font-medium">וולת'טק סוכנות לביטוח</span> עוסקת בשיווק פנסיוני ומתמחה בתחום זה למעלה מ־20 שנה.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section data-ev-id="ev_6be8fc24a6" className="py-8 bg-surface-2 border-b border-border">
        <div data-ev-id="ev_a71db49e5d" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-ev-id="ev_2d71cbfac3" className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div data-ev-id="ev_8cdb360e77" className="flex flex-wrap gap-4 items-center">
              <div data-ev-id="ev_9a3bea47ad" className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-ink-muted" />
                <span data-ev-id="ev_899206bcaf" className="font-medium text-ink">סינון:</span>
              </div>
              
              <select data-ev-id="ev_892b76aa54"
              value={filters.type}
              onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
              className="px-4 py-2 rounded-lg border border-border bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-gold/50">

                <option data-ev-id="ev_324449dab8" value="">כל סוגי הקופות</option>
                <option data-ev-id="ev_c6a6b36586" value="gemel">קופות גמל</option>
                <option data-ev-id="ev_44cd721f36" value="hishtalmut">קרנות השתלמות</option>
                <option data-ev-id="ev_1ffdbce170" value="pension">קרנות פנסיה</option>
                <option data-ev-id="ev_80846f76b5" value="pitzuim">קופות מרכזיות לפיצויים</option>
              </select>

              <select data-ev-id="ev_808f7a3f90"
              value={filters.company}
              onChange={(e) => setFilters((prev) => ({ ...prev, company: e.target.value }))}
              className="px-4 py-2 rounded-lg border border-border bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-gold/50">

                <option data-ev-id="ev_d587cb61e6" value="">כל החברות</option>
                {companies.map((company) =>
                <option data-ev-id="ev_f1d1df793a" key={company} value={company}>{company}</option>
                )}
              </select>

              <select data-ev-id="ev_7819607001"
              value={filters.track}
              onChange={(e) => setFilters((prev) => ({ ...prev, track: e.target.value }))}
              className="px-4 py-2 rounded-lg border border-border bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-gold/50">

                <option data-ev-id="ev_4a4331f9f4" value="">כל המסלולים</option>
                {tracks.map((track) =>
                <option data-ev-id="ev_1c3a23c5ad" key={track} value={track}>{track}</option>
                )}
              </select>

              <div data-ev-id="ev_bcd0a41275" className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
                <input data-ev-id="ev_5c45da7e07"
                type="text"
                placeholder="חיפוש קופה..."
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                className="pr-10 pl-4 py-2 rounded-lg border border-border bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-gold/50 w-48" />

              </div>
            </div>

            <div data-ev-id="ev_2ba1b96323" className="flex items-center gap-4">
              <div data-ev-id="ev_c64c875ceb" className="flex items-center bg-surface rounded-lg border border-border overflow-hidden">
                <button data-ev-id="ev_192ac02742"
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 flex items-center gap-2 transition-colors ${
                viewMode === 'table' ? 'bg-navy text-white' : 'text-ink hover:bg-surface-2'}`
                }>

                  <Table className="w-4 h-4" />
                  <span data-ev-id="ev_c36ff8c341" className="hidden sm:inline">טבלה</span>
                </button>
                <button data-ev-id="ev_50423818bd"
                onClick={() => setViewMode('chart')}
                className={`px-4 py-2 flex items-center gap-2 transition-colors ${
                viewMode === 'chart' ? 'bg-navy text-white' : 'text-ink hover:bg-surface-2'}`
                }>

                  <BarChart3 className="w-4 h-4" />
                  <span data-ev-id="ev_aa74ddea9b" className="hidden sm:inline">גרף</span>
                </button>
              </div>

              <button data-ev-id="ev_61e5e5e487"
              onClick={() => loadData()}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-gold-light text-navy-dark font-medium rounded-lg transition-colors disabled:opacity-50">

                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span data-ev-id="ev_018618a769" className="hidden sm:inline">עדכן נתונים</span>
              </button>
            </div>
          </div>
          
          {/* Data source indicator */}
          {(error || dataSource === 'sample') &&
          <div data-ev-id="ev_74a3c3e0e2" className="mt-4 flex items-center gap-2 text-amber-400 bg-amber-500/10 px-4 py-2 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span data-ev-id="ev_0eb6ac8073" className="text-sm">
                {error || 'מציג נתונים לדוגמה. לחץ על "עדכן נתונים" לטעינת נתונים עדכניים.'}
              </span>
            </div>
          }
          
          {dataSource === 'api' && !error &&
          <div data-ev-id="ev_b73ca9f4f6" className="mt-4 flex items-center gap-2 text-green-400 bg-green-500/10 px-4 py-2 rounded-lg">
              <Info className="w-5 h-5" />
              <span data-ev-id="ev_32d0cb86e2" className="text-sm">
                נתונים עדכניים מ-data.gov.il • {funds.length} קופות נטענו
              </span>
            </div>
          }
        </div>
      </section>

      {/* Main Content */}
      <section data-ev-id="ev_e608064f2d" className="py-8">
        <div data-ev-id="ev_619ced07a1" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading state */}
          {loading &&
          <div data-ev-id="ev_d9fb37eccc" className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-gold animate-spin mb-4" />
              <p data-ev-id="ev_2d3b4cda27" className="text-ink font-medium">טוען נתונים מ-data.gov.il...</p>
              <p data-ev-id="ev_5b7de0d148" className="text-ink-muted text-sm mt-2">זה עשוי לקחת מספר שניות</p>
            </div>
          }

          {/* Results count */}
          {!loading &&
          <>

              <div data-ev-id="ev_77f2279ffb" className="mb-6 flex items-center justify-between">
                <p data-ev-id="ev_9033ed1eaa" className="text-ink-muted">
                  מציג <span data-ev-id="ev_b6bc216462" className="font-semibold text-ink">{sortedFunds.length}</span> קופות
                </p>
                {selectedFunds.length > 0 &&
              <div data-ev-id="ev_d7839b3f63" className="flex items-center gap-2">
                    <span data-ev-id="ev_553cbcce21" className="text-sm text-ink-muted">נבחרו {selectedFunds.length} להשוואה</span>
                    <button data-ev-id="ev_798cce614f"
                onClick={() => setSelectedFunds([])}
                className="text-sm text-red-500 hover:text-red-400">

                      נקה בחירה
                    </button>
                  </div>
              }
              </div>

              {/* Comparison Chart */}
              {selectedFunds.length >= 2 &&
            <div data-ev-id="ev_6e8bec704d" className="mb-8 bg-surface rounded-2xl border border-border p-6 shadow-sm">
                  <h3 data-ev-id="ev_51454f87fd" className="text-lg font-bold text-ink mb-4">השוואת קופות נבחרות</h3>
                  <div data-ev-id="ev_4dca5b2b04" className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={comparisonData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" unit="%" />
                        <YAxis type="category" dataKey="name" width={120} />
                        <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                        <Legend />
                        <Bar dataKey="מתחילת השנה" fill="#d4a853" />
                        <Bar dataKey="שנה" fill="#e8e2d4" />
                        <Bar dataKey="3 שנים" fill="#7c8db0" />
                        <Bar dataKey="5 שנים" fill="#4a5a7c" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
            }

              {viewMode === 'table' ? (
            /* Table View */
            <div data-ev-id="ev_8907c1e6a7" className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
                  <div data-ev-id="ev_1cdb288228" className="overflow-x-auto">
                    <table data-ev-id="ev_9ed40a5c75" className="w-full">
                      <thead data-ev-id="ev_8b364dea05" className="bg-surface-2">
                        <tr data-ev-id="ev_a759ca6f8d">
                          <th data-ev-id="ev_bc00488d2e" className="px-4 py-3 text-right text-sm font-semibold text-ink">
                            <input data-ev-id="ev_d2b810927f"
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFunds(sortedFunds.slice(0, 5).map((f) => f.id));
                          } else {
                            setSelectedFunds([]);
                          }
                        }}
                        className="rounded" />

                          </th>
                          <th data-ev-id="ev_0fc87c08b0" className="px-4 py-3 text-right text-sm font-semibold text-ink">מס׳ קופה</th>
                          <th data-ev-id="ev_578d7d9fcc" className="px-4 py-3 text-right text-sm font-semibold text-ink">שם הקופה</th>
                          <th data-ev-id="ev_0be3d5c254" className="px-4 py-3 text-right text-sm font-semibold text-ink">סוג</th>
                          <th data-ev-id="ev_8aaad67994" className="px-4 py-3 text-right text-sm font-semibold text-ink">מסלול</th>
                          <th data-ev-id="ev_85c93bcc69"
                      className="px-4 py-3 text-right text-sm font-semibold text-ink cursor-pointer hover:text-gold"
                      onClick={() => handleSort('returns.ytd')}>

                            <div data-ev-id="ev_c509a336b7" className="flex items-center gap-1">
                              מתחילת השנה
                              <SortIcon field="returns.ytd" />
                            </div>
                          </th>
                          <th data-ev-id="ev_406c13a31b"
                      className="px-4 py-3 text-right text-sm font-semibold text-ink cursor-pointer hover:text-gold"
                      onClick={() => handleSort('returns.oneYear')}>

                            <div data-ev-id="ev_1e1660546c" className="flex items-center gap-1">
                              שנה
                              <SortIcon field="returns.oneYear" />
                            </div>
                          </th>
                          <th data-ev-id="ev_9eb46e69a3"
                      className="px-4 py-3 text-right text-sm font-semibold text-ink cursor-pointer hover:text-gold"
                      onClick={() => handleSort('returns.threeYears')}>

                            <div data-ev-id="ev_c5ab9fed93" className="flex items-center gap-1">
                              3 שנים
                              <SortIcon field="returns.threeYears" />
                            </div>
                          </th>
                          <th data-ev-id="ev_b26adde8af"
                      className="px-4 py-3 text-right text-sm font-semibold text-ink cursor-pointer hover:text-gold"
                      onClick={() => handleSort('returns.fiveYears')}>

                            <div data-ev-id="ev_2637b0bf18" className="flex items-center gap-1">
                              5 שנים
                              <SortIcon field="returns.fiveYears" />
                            </div>
                          </th>
                          <th data-ev-id="ev_bd9729bb94"
                      className="px-4 py-3 text-right text-sm font-semibold text-ink cursor-pointer hover:text-gold"
                      onClick={() => handleSort('managementFee')}>

                            <div data-ev-id="ev_90bbf51ff1" className="flex items-center gap-1">
                              דמי ניהול
                              <SortIcon field="managementFee" />
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody data-ev-id="ev_eb59895790" className="divide-y divide-border">
                        {sortedFunds.map((fund, index) =>
                    <tr data-ev-id="ev_4f58bff4b4"
                    key={fund.id}
                    className={`hover:bg-surface-2/50 transition-colors ${
                    selectedFunds.includes(fund.id) ? 'bg-gold/10' : ''}`
                    }>

                            <td data-ev-id="ev_4c3e1b71fd" className="px-4 py-4">
                              <input data-ev-id="ev_70ee874500"
                        type="checkbox"
                        checked={selectedFunds.includes(fund.id)}
                        onChange={() => toggleFundSelection(fund.id)}
                        className="rounded" />

                            </td>
                            <td data-ev-id="ev_45871a6722" className="px-4 py-4 text-center">
                              <span data-ev-id="ev_1577b01eef" className="font-mono text-sm text-ink">
                                {fund.fundNumber || '—'}
                              </span>
                            </td>
                            <td data-ev-id="ev_e3832becdd" className="px-4 py-4">
                              <div data-ev-id="ev_2ed9c41354" className="font-medium text-ink">{fund.name}</div>
                              <div data-ev-id="ev_1b0e60a896" className="text-sm text-ink-muted">{fund.company}</div>
                            </td>
                            <td data-ev-id="ev_e1c52dc480" className="px-4 py-4">
                              <span data-ev-id="ev_43dd3bf355" className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        fund.type === 'gemel' ? 'bg-blue-500/15 text-blue-400' :
                        fund.type === 'hishtalmut' ? 'bg-green-500/15 text-green-400' :
                        fund.type === 'pitzuim' ? 'bg-orange-500/15 text-orange-400' :
                        'bg-purple-500/15 text-purple-400'}`
                        }>
                                {fundTypeLabels[fund.type]}
                              </span>
                            </td>
                            <td data-ev-id="ev_5c08308e06" className="px-4 py-4 text-ink-muted">{fund.track}</td>
                            <td data-ev-id="ev_defa98656a" className="px-4 py-4">
                              <span data-ev-id="ev_bcdda9359b" className={`font-semibold ${
                        fund.returns.ytd >= 0 ? 'text-green-400' : 'text-red-400'}`
                        }>
                                {fund.returns.ytd >= 0 ? '+' : ''}{fund.returns.ytd.toFixed(2)}%
                              </span>
                            </td>
                            <td data-ev-id="ev_65cd5b8f43" className="px-4 py-4">
                              <span data-ev-id="ev_e11d8b7634" className={`font-semibold ${
                        fund.returns.oneYear >= 0 ? 'text-green-400' : 'text-red-400'}`
                        }>
                                {fund.returns.oneYear >= 0 ? '+' : ''}{fund.returns.oneYear.toFixed(2)}%
                              </span>
                            </td>
                            <td data-ev-id="ev_0cbe9f6954" className="px-4 py-4">
                              <span data-ev-id="ev_fe4ef2dbd0" className={`font-semibold ${
                        fund.returns.threeYears >= 0 ? 'text-green-400' : 'text-red-400'}`
                        }>
                                {fund.returns.threeYears >= 0 ? '+' : ''}{fund.returns.threeYears.toFixed(2)}%
                              </span>
                            </td>
                            <td data-ev-id="ev_8249616aaa" className="px-4 py-4">
                              <span data-ev-id="ev_1e57d89101" className={`font-semibold ${
                        fund.returns.fiveYears >= 0 ? 'text-green-400' : 'text-red-400'}`
                        }>
                                {fund.returns.fiveYears >= 0 ? '+' : ''}{fund.returns.fiveYears.toFixed(2)}%
                              </span>
                            </td>
                            <td data-ev-id="ev_56b4731f1c" className="px-4 py-4 text-ink-muted">{fund.managementFee.toFixed(2)}%</td>
                          </tr>
                    )}
                      </tbody>
                    </table>
                  </div>
                </div>) : (

            /* Chart View */
            <div data-ev-id="ev_85b2fa470a" className="bg-surface rounded-2xl border border-border p-6 shadow-sm">
                  <h3 data-ev-id="ev_df0f7ba175" className="text-lg font-bold text-ink mb-6">השוואת תשואות - 10 הקופות המובילות</h3>
                  <div data-ev-id="ev_7ecdc79c1a" className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} fontSize={12} />
                        <YAxis unit="%" />
                        <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                        <Legend />
                        <Bar dataKey="שנה" fill="#e8e2d4" />
                        <Bar dataKey="3 שנים" fill="#d4a853" />
                        <Bar dataKey="5 שנים" fill="#4a5a7c" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>)
            }

              {/* Info Box */}
              <div data-ev-id="ev_52fd09eadb" className="mt-8 bg-blue-500/10 rounded-2xl p-6 border border-blue-500/30">
                <div data-ev-id="ev_4f19a2e3fc" className="flex items-start gap-4">
                  <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div data-ev-id="ev_801df18434">
                    <h4 data-ev-id="ev_2cc095aca8" className="font-semibold text-blue-400 mb-2">על הנתונים</h4>
                    <p data-ev-id="ev_cc2b8f51ac" className="text-blue-400 text-sm leading-relaxed">
                      הנתונים המוצגים מבוססים על מידע ציבורי מאתר גמל-נט של רשות שוק ההון. 
                      התשואות הן תשואות ברוטו (ללא ניכוי דמי ניהול) ומחושבות על בסיס שנתי ממוצע. 
                      נתונים אלו אינם מהווים המלצה להשקעה. ביצועי עבר אינם מעידים על ביצועים עתידיים.
                    </p>
                    <a data-ev-id="ev_49ab125dbb"
                  href="https://gemelnet.cma.gov.il"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-400 text-sm mt-2">

                      <span data-ev-id="ev_96990a564f">לנתונים המלאים באתר גמל-נט</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </>
          }
        </div>
      </section>

      {/* CTA Section */}
      <section data-ev-id="ev_e152190e94" className="py-16 bg-navy">
        <div data-ev-id="ev_fcf87080ff" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 data-ev-id="ev_d6670b54a6" className="text-2xl sm:text-3xl font-bold text-white mb-4">
            רוצה לדעת איזו קופה מתאימה לך?
          </h2>
          <p data-ev-id="ev_96b065eb96" className="text-white/80 mb-8">
            המומחים שלנו יעזרו לך לבחור את מסלול החיסכון האופטימלי עבורך
          </p>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark font-semibold px-8 py-4 rounded-lg transition-colors">

            <span data-ev-id="ev_dc94b92e41">קבע פגישת ייעוץ חינם</span>
          </Link>
        </div>
      </section>

      {/* Floating Offer Button */}
      <button data-ev-id="ev_b659b01171"
      onClick={() => setShowOfferPopup(true)}
      className="hidden md:flex fixed bottom-6 left-20 z-50 bg-gold hover:bg-gold-light text-navy-dark font-bold px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all items-center gap-3 group">

        <Gift className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span data-ev-id="ev_79c71eac44" className="hidden sm:inline">מגיע לך הטבה!</span>
      </button>

      {/* Offer Popup */}
      <PensionOfferPopup
        isOpen={showOfferPopup}
        onClose={() => setShowOfferPopup(false)} />


      {/* Footer */}
      <footer data-ev-id="ev_44fcf89a7a" className="bg-navy-dark py-8 border-t border-white/10">
        <div data-ev-id="ev_30eb0a1711" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Footer Top CTA */}
          <div data-ev-id="ev_8676f6415b" className="flex justify-center mb-6">
            <a data-ev-id="ev_8d197c0fc3"
            href="https://surense.com/app/p/9z3sqal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-navy-dark font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">

              <FileText className="w-5 h-5" />
              להוצאת מידע פנסיוני עדכני
            </a>
          </div>
          
          <div data-ev-id="ev_8166ff53bd" className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Logo variant="light" />
            <div data-ev-id="ev_ba190b57a7" className="text-white/50 text-sm">
              © 2024 WealthTech. כל הזכויות שמורות.
            </div>
          </div>
        </div>
      </footer>
    </div>);

}