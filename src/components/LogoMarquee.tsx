import { Building2 } from 'lucide-react';
import nvidiaLogo from '@/assets/logos/nvidia.svg';
import microsoftLogo from '@/assets/logos/microsoft.svg';
import amazonLogo from '@/assets/logos/amazon.svg';
import broadcomLogo from '@/assets/logos/broadcom.svg';
import googleLogo from '@/assets/logos/google.svg';
import amdocsLogo from '@/assets/logos/amdocs.svg';
import passportcardLogo from '@/assets/logos/passportcard.svg';
import cyberarkLogo from '@/assets/logos/cyberark.svg';
import nessLogo from '@/assets/logos/ness.svg';
import elbitLogo from '@/assets/logos/elbit.png';
import rafaelLogo from '@/assets/logos/rafael.svg';
import iaiLogo from '@/assets/logos/iai.svg';
import ibmLogo from '@/assets/logos/ibm.svg';
import paloAltoLogo from '@/assets/logos/paloalto.svg';

// `tall` = emblem-style logos that need more height to read at the same visual weight as wordmarks
const companies = [
{ name: 'NVIDIA', logo: nvidiaLogo },
{ name: 'Microsoft', logo: microsoftLogo },
{ name: 'Amazon', logo: amazonLogo },
{ name: 'Broadcom', logo: broadcomLogo },
{ name: 'Google', logo: googleLogo },
{ name: 'IBM', logo: ibmLogo },
{ name: 'Amdocs', logo: amdocsLogo },
{ name: 'PassportCard', logo: passportcardLogo, tall: true },
{ name: 'CyberArk', logo: cyberarkLogo },
{ name: 'Palo Alto Networks', logo: paloAltoLogo },
{ name: 'Ness', logo: nessLogo, tall: true },
{ name: 'Elbit Systems', logo: elbitLogo, tall: true },
{ name: 'Rafael', logo: rafaelLogo, tall: true },
{ name: 'IAI', logo: iaiLogo, tall: true }];


interface LogoMarqueeProps {
  variant?: 'light' | 'dark';
  title?: string;
}

export function LogoMarquee({ variant = 'light', title = 'מטפלים בלקוחות בכירים מהחברות המובילות' }: LogoMarqueeProps) {
  const bgClass = variant === 'dark' ?
  'bg-navy-light/50' :
  'bg-surface-2/50';
  const textClass = variant === 'dark' ?
  'text-white/60' :
  'text-ink-muted';
  const borderClass = variant === 'dark' ?
  'border-white/10' :
  'border-border';

  const renderSet = (setKey: string) =>
  <div className="flex shrink-0 items-center gap-12 lg:gap-16 px-6 lg:px-8" aria-hidden={setKey === 'second'}>
      {companies.map((company) =>
    <img
      key={`${setKey}-${company.name}`}
      src={company.logo}
      alt={setKey === 'first' ? company.name : ''}
      loading="lazy"
      className={`${company.tall ? 'h-9 sm:h-10' : 'h-6 sm:h-7'} w-auto max-w-[150px] object-contain brightness-0 invert opacity-55 hover:opacity-100 transition-opacity duration-300`} />

    )}
    </div>;


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
        <div data-ev-id="ev_431f6c0b51" className={`absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none ${
        variant === 'dark' ?
        'bg-gradient-to-r from-navy-light/50 to-transparent' :
        'bg-gradient-to-r from-surface-2/50 to-transparent'}`
        } />
        <div data-ev-id="ev_f3b536de29" className={`absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none ${
        variant === 'dark' ?
        'bg-gradient-to-l from-navy-light/50 to-transparent' :
        'bg-gradient-to-l from-surface-2/50 to-transparent'}`
        } />

        {/* Scrolling container: two identical sets for a seamless loop */}
        <div data-ev-id="ev_e7028e821d" className="flex items-center animate-marquee">
          {renderSet('first')}
          {renderSet('second')}
        </div>
      </div>
    </section>);

}
