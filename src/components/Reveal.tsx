import { type ReactNode } from 'react';
import { useInView } from '@/hooks/use-in-view';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Fades + lifts its children in when scrolled into view. */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, inView } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'reveal-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
