import { useInView } from '@/hooks/use-in-view';

const steps = [
{
  title: 'ממפים',
  text: 'את הנכסים, החסכונות, הביטוחים וההתחייבויות. תמונה אחת מלאה במקום מסמכים מפוזרים.'
},
{
  title: 'מנתחים',
  text: 'את מבנה הפנסיה וההשקעות. מזהים כפילויות, פערים, הזדמנויות וזכויות שלא מומשו.'
},
{
  title: 'בונים תכנית',
  text: 'שמותאמת למידותיכם ומשלבת פנסיה, השקעות, ביטוח, פרישה וניהול סיכונים.'
},
{
  title: 'מלווים לאורך שנים',
  text: 'בצבירת הון, שינויי קריירה, מימוש מניות ואופציות, רכישת נכסים, פרישה והעברת הון לדור הבא.'
}];


export function ApproachTimeline() {
  const { ref, inView } = useInView<HTMLOListElement>(0.25);

  return (
    <ol ref={ref} className="relative flex flex-col gap-8 pr-10">
      <span className="absolute right-[15px] top-2 bottom-2 w-px bg-white/10" />
      <span
        className="absolute right-[15px] top-2 w-px bg-gradient-to-b from-gold to-gold/20 origin-top"
        style={{
          bottom: '0.5rem',
          transform: inView ? 'scaleY(1)' : 'scaleY(0)',
          transition: 'transform 1.8s cubic-bezier(.2,.8,.2,1)'
        }} />
      {steps.map((step, i) =>
      <li
        key={step.title}
        className={`relative reveal ${inView ? 'reveal-in' : ''}`}
        style={{ transitionDelay: `${250 + i * 300}ms` }}>
          <span className="absolute -right-10 top-0 w-8 h-8 rounded-full bg-navy-dark border border-gold/60 flex items-center justify-center font-mono text-xs text-gold shadow-[0_0_20px_-4px_#d4a853]">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h4 className="text-xl font-bold text-ink mb-1">{step.title}</h4>
          <p className="text-ink-muted text-pretty">{step.text}</p>
        </li>
      )}
    </ol>);

}
