import { Link } from 'react-router';
import { ArrowLeft, Calculator, CheckCircle2, Receipt, ShieldCheck, TrendingUp, Wallet } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { useInView } from '@/hooks/use-in-view';

const riskBars = [
{ level: 1, height: 34 },
{ level: 2, height: 46 },
{ level: 3, height: 62 },
{ level: 4, height: 78 },
{ level: 5, height: 96 }];

function CoverageGauge() {
  const { ref, inView } = useInView<SVGSVGElement>(0.4);
  const circumference = 2 * Math.PI * 52;
  return (
    <svg ref={ref} viewBox="0 0 120 120" className="w-36 h-36 -rotate-90">
      <circle cx="60" cy="60" r="52" fill="none" stroke="#ffffff14" strokeWidth="10" />
      <circle
        cx="60" cy="60" r="52" fill="none" stroke="#d4a853" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={inView ? circumference * 0.22 : circumference}
        style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(.2,.8,.2,1)' }} />
    </svg>);

}

function RiskBars() {
  const { ref, inView } = useInView(0.4);
  return (
    <div ref={ref} className="flex items-end gap-2 h-28">
      {riskBars.map((bar, i) =>
      <div key={bar.level} className="flex flex-col items-center gap-1.5">
          <div
          className="w-7 rounded-t-md bg-gradient-to-t from-gold-dark to-gold-light"
          style={{
            height: inView ? `${bar.height}px` : '4px',
            opacity: 0.45 + i * 0.13,
            transition: `height 1s ${i * 120}ms cubic-bezier(.2,.8,.2,1)`
          }} />
          <span className="font-mono text-[10px] text-ink-muted">{bar.level}</span>
        </div>
      )}
    </div>);

}

const minorTools = [
{ icon: Wallet, title: 'תמונת הון', description: 'מאזן נכסים והתחייבויות במבט אחד', to: '/wealth-snapshot' },
{ icon: Receipt, title: 'בדיקת החזר מס', description: 'בודקים בכמה דקות אם מגיע לכם כסף ממס הכנסה', to: '/tax-refund-eligibility' }];


export function ToolsShowcase() {
  return (
    <section id="tools" className="relative py-20 lg:py-28 bg-surface overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gold/5 blur-3xl rounded-full pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-wide mb-4">
              <span className="w-8 h-px bg-gold" />
              כלים דיגיטליים
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-ink text-balance">
              בודקים לבד. <span className="text-gradient-gold">מחליטים חכם.</span>
            </h2>
          </div>
          <p className="text-ink-muted text-lg max-w-md text-pretty">
            מחשבונים שפיתחנו כדי שתוכלו לקבל תמונת מצב ראשונית תוך דקות, בחינם, עוד לפני הפגישה הראשונה.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Life insurance */}
          <Reveal>
            <div className="card-tech group h-full rounded-3xl p-8 lg:p-10 flex flex-col sm:flex-row gap-8 items-center">
              <div className="relative shrink-0 flex items-center justify-center">
                <CoverageGauge />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-gold mb-1" />
                  <span className="font-mono text-xl font-bold text-ink">78%</span>
                  <span className="text-[10px] text-ink-muted">כיסוי</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-ink mb-2">מחשבון ביטוח חיים</h3>
                <p className="text-ink-muted mb-5 text-pretty">כמה כיסוי המשפחה שלכם באמת צריכה, לפי הכנסות, משכנתה, ילדים וחסכונות קיימים.</p>
                <ul className="flex flex-col gap-2 mb-6 text-sm text-ink">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold shrink-0" />חישוב מותאם אישית תוך 2 דקות</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold shrink-0" />אפשרות לבדיקה מקצועית ללא עלות</li>
                </ul>
                <Link to="/life-insurance-calculator" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy-dark font-bold px-6 py-3 rounded-xl transition-colors">
                  <Calculator className="w-4 h-4" />
                  לחישוב עכשיו
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Savings */}
          <Reveal delay={120}>
            <div className="card-tech group h-full rounded-3xl p-8 lg:p-10 flex flex-col sm:flex-row gap-8 items-center">
              <div className="shrink-0 rounded-2xl bg-white/[0.03] border border-white/10 p-5">
                <RiskBars />
                <div className="text-[10px] text-ink-muted text-center mt-2">רמת סיכון</div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-ink mb-2">מחשבון חיסכון לפי רמת סיכון</h3>
                <p className="text-ink-muted mb-5 text-pretty">איך רמת הסיכון שתבחרו משפיעה על שווי החיסכון העתידי שלכם, בהשוואה בין 5 רמות.</p>
                <ul className="flex flex-col gap-2 mb-6 text-sm text-ink">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold shrink-0" />חישוב ריבית דריבית אוטומטי</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold shrink-0" />גרף צמיחה אינטראקטיבי</li>
                </ul>
                <Link to="/savings-calculator" className="inline-flex items-center gap-2 border border-gold/50 hover:bg-gold/10 text-gold font-bold px-6 py-3 rounded-xl transition-colors">
                  <TrendingUp className="w-4 h-4" />
                  לחישוב עכשיו
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {minorTools.map((tool, index) =>
          <Reveal key={tool.title} delay={index * 100}>
              <Link to={tool.to} className="card-tech group flex items-center gap-5 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                  <tool.icon className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-ink">{tool.title}</div>
                  <div className="text-sm text-ink-muted">{tool.description}</div>
                </div>
                <ArrowLeft className="w-5 h-5 text-gold transition-transform group-hover:-translate-x-1" />
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}
