import { Link } from 'react-router';
import newLogo from '@/assets/uploads/wealthtech-logo-new.png';

interface LogoProps {
  variant?: 'default' | 'light';
  className?: string;
}

export function Logo({ variant = 'default', className = '' }: LogoProps) {
  return (
    <Link to="/" className={`flex items-center shrink-0 ${className}`}>
      {/* Source PNG has wide navy padding — crop to the wordmark */}
      <img data-ev-id="ev_6dad75d908"
      src={newLogo}
      alt="WealthTech - One Life. Plan IT Well"
      className="h-14 w-[180px] object-cover object-center rounded-md" />

    </Link>);

}
