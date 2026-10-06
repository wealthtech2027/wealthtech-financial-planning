import { Link } from 'react-router';
import newLogo from '@/assets/uploads/wealthtech-logo-new.png';

interface LogoProps {
  variant?: 'default' | 'light';
  className?: string;
}

export function Logo({ variant = 'default', className = '' }: LogoProps) {
  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <img data-ev-id="ev_6dad75d908"
      src={newLogo}
      alt="WealthTech - One Life. Plan IT Well"
      className="h-12 w-auto object-contain" />

    </Link>);

}