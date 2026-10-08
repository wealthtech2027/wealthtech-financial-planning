import { Building2 } from 'lucide-react';

const companies = [
{ name: 'NVIDIA', color: '#76B900' },
{ name: 'Microsoft', color: '#00A4EF' },
{ name: 'Amazon', color: '#FF9900' },
{ name: 'Broadcom', color: '#CC092F' },
{ name: 'Google', color: '#4285F4' },
{ name: 'Amdocs', color: '#0072C6' },
{ name: 'PassportCard', color: '#1E3A5F' },
{ name: 'CyberArk', color: '#0066B3' },
{ name: 'Ness', color: '#E31937' },
{ name: 'Elbit', color: '#003366' },
{ name: 'Rafael', color: '#00529B' },
{ name: 'IAI', color: '#0033A0' }];


interface LogoMarqueeProps {
  variant?: 'light' | 'dark';
  title?: string;
}

export function LogoMarquee({ variant = 'light', title = 'מטפלים בלקוחות מהחברות המובילות' }: LogoMarqueeProps) {
  const bgClass = variant === 'dark' ?
  'bg-navy-light/50' :
  'bg-surface-2/50';
  const textClass = variant === 'dark' ?
  'text-white/60' :
  'text-ink-muted';
  const logoTextClass = variant === 'dark' ?
  'text-white/80 hover:text-white' :
  'text-ink/70 hover:text-ink';
  const borderClass = variant === 'dark' ?
  'border-white/10' :
  'border-border';

  return (
    <section data-ev-id="ev_fae9ee7aa7" className={`py-8 ${bgClass} border-y ${borderClass} overflow-hidden`}>
      <div data-ev-id="ev_107cc377ae" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div data-ev-id="ev_c4d3e8c2f0" className="flex items-center justify-center gap-3">
          <Building2 className={`w-5 h-5 ${textClass}`} />
          <p data-ev-id="ev_75e3d8a912" className={`text-sm font-medium ${textClass}`}>{title}</p>
        </div>
      </div>
      
      <div data-ev-id="ev_9ca5c2c1b9" className="relative">
        {/* Gradient overlays */}
        <div data-ev-id="ev_431f6c0b51" className={`absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${
        variant === 'dark' ?
        'bg-gradient-to-r from-navy-light/50 to-transparent' :
        'bg-gradient-to-r from-surface-2/50 to-transparent'}`
        } />
        <div data-ev-id="ev_f3b536de29" className={`absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none ${
        variant === 'dark' ?
        'bg-gradient-to-l from-navy-light/50 to-transparent' :
        'bg-gradient-to-l from-surface-2/50 to-transparent'}`
        } />
        
        {/* Scrolling container */}
        <div data-ev-id="ev_e7028e821d" className="flex animate-marquee">
          {/* First set */}
          <div data-ev-id="ev_33e367d4ab" className="flex shrink-0 gap-12 px-6">
            {companies.map((company, index) =>
            <div data-ev-id="ev_ae069d4989"
            key={`first-${index}`}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 cursor-default group`}>

                <div data-ev-id="ev_1ba9ad2d7c"
              className="w-3 h-3 rounded-full transition-transform group-hover:scale-125"
              style={{ backgroundColor: company.color }} />

                <span data-ev-id="ev_8b9d3b170b" className={`text-lg font-semibold whitespace-nowrap transition-colors ${logoTextClass}`}>
                  {company.name}
                </span>
              </div>
            )}
          </div>
          
          {/* Duplicate set for seamless loop */}
          <div data-ev-id="ev_6e3f975aea" className="flex shrink-0 gap-12 px-6">
            {companies.map((company, index) =>
            <div data-ev-id="ev_a713b199da"
            key={`second-${index}`}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 cursor-default group`}>

                <div data-ev-id="ev_c51256623d"
              className="w-3 h-3 rounded-full transition-transform group-hover:scale-125"
              style={{ backgroundColor: company.color }} />

                <span data-ev-id="ev_3cb4c0fd8c" className={`text-lg font-semibold whitespace-nowrap transition-colors ${logoTextClass}`}>
                  {company.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}