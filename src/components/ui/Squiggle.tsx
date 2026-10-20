export function Squiggle({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 12"
      className={className}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M2 8c6-8 12 8 18 0s12 8 18 0 12 8 18 0 12 8 18 0 12 8 18 0 12 8 18 0"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
