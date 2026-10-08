import { CheckCircle2, Radar, TrendingUp } from 'lucide-react';
import { CountUp } from '@/components/CountUp';

const rights = [
{ label: 'החזר מס הכנסה', amount: '₪12,400', period: '' },
{ label: 'כספי פנסיה לא פעילים', amount: '₪18,900', period: '' },
{ label: 'דמי ניהול עודפים', amount: '₪4,300', period: 'לשנה' },
{ label: 'כפל ביטוחים', amount: '₪2,800', period: 'לשנה' }];

// Illustrative projection curves (viewBox 0 0 400 160)
const basePath = 'M0,140 C60,134 120,126 180,116 C240,106 300,96 400,84';
const planPath = 'M0,140 C60,128 120,108 180,88 C240,66 300,42 400,18';

export function HeroDashboard() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-gold/10 blur-3xl rounded-full" />

      <div className="relative glass-panel rounded-3xl p-6 flex flex-col gap-5">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-ink">
            <Radar className="w-4 h-4 text-gold" />
            <span className="font-semibold">WealthTech Engine</span>
            <span className="text-ink-muted">· ניתוח פיננסי</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            סורק
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
            <div className="text-xs text-ink-muted mb-1">צבירה חזויה לפרישה</div>
            <div className="font-mono text-lg sm:text-2xl font-bold text-ink">
              <CountUp to={4820000} prefix="₪" />
            </div>
            <div className="mt-1 inline-flex items-center gap-1 text-xs text-emerald-400">
              <TrendingUp className="w-3 h-3" /> +27% אחרי תכנון
            </div>
          </div>
          <div className="rounded-2xl bg-gold/10 border border-gold/30 p-4">
            <div className="text-xs text-ink-muted mb-1">זכויות שאותרו</div>
            <div className="font-mono text-lg sm:text-2xl font-bold text-gold">
              <CountUp to={38400} prefix="₪" duration={2200} />
            </div>
            <div className="mt-1 text-xs text-ink-muted">4 ממצאים</div>
          </div>
        </div>

        {/* Projection chart */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-ink-muted">תחזית הון · 25 שנה</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-ink-muted"><span className="w-3 h-0.5 bg-ink-muted/60" />מצב קיים</span>
              <span className="flex items-center gap-1 text-gold"><span className="w-3 h-0.5 bg-gold" />עם תכנון</span>
            </div>
          </div>
          <svg viewBox="0 0 400 160" className="w-full h-32" preserveAspectRatio="none">
            <defs>
              <linearGradient id="planFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d4a853" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#d4a853" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[40, 80, 120].map((y) =>
            <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#ffffff10" />
            )}
            <path d={`${planPath} L400,160 L0,160 Z`} fill="url(#planFill)" className="chart-fill" />
            <path d={basePath} fill="none" stroke="#9aa6bf" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="5 5" />
            <path d={planPath} fill="none" stroke="#d4a853" strokeWidth="3" strokeLinecap="round" pathLength={1} className="chart-draw" />
            <circle cx="400" cy="18" r="5" fill="#d4a853" className="chart-dot" />
          </svg>
        </div>

        {/* Rights scan */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-ink-muted">
            <span>סריקת מיצוי זכויות</span>
            <span className="font-mono">100%</span>
          </div>
          <div className="h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-l from-gold to-gold-light scan-bar" />
          </div>
          <ul className="flex flex-col gap-1.5 mt-1">
            {rights.map((r, i) =>
            <li
              key={r.label}
              className="scan-item flex items-center justify-between text-sm rounded-lg bg-white/[0.03] px-3 py-2"
              style={{ animationDelay: `${900 + i * 450}ms` }}>
                <span className="flex items-center gap-2 text-ink">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  {r.label}
                </span>
                <span className="text-gold"><span className="font-mono">{r.amount}</span>{r.period && <span className="text-xs text-ink-muted ms-1">{r.period}</span>}</span>
              </li>
            )}
          </ul>
        </div>

        <div className="text-[11px] text-ink-muted/70">* הנתונים להמחשה בלבד</div>
      </div>
    </div>);

}
