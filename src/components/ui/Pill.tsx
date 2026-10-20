import type { ReactNode } from 'react';

export function Pill({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border-2 border-ink bg-sun/30 px-3 py-1 text-sm font-medium text-ink ${className}`}
    >
      {children}
    </span>
  );
}
