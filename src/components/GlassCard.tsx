import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div className={`glass-card p-6 hover:border-white/20 transition-all ${className}`}>
      {children}
    </div>
  );
}
