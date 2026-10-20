import type { CSSProperties } from 'react';

type Shape = {
  className: string;
  style: CSSProperties;
};

const shapes: Shape[] = [
  {
    className: 'size-14 rounded-full bg-pop',
    style: { top: '3%', left: '66%' },
  },
  {
    className: 'h-10 w-10 rotate-12 bg-sun',
    style: { top: '6%', left: '84%' },
  },
  {
    className: 'size-9 rounded-full bg-mint',
    style: { top: '12%', right: '1%' },
  },
  {
    className: 'h-12 w-16 rounded-t-full bg-accent/30',
    style: { top: '26%', right: '0%' },
  },
  {
    className: 'size-7 rotate-45 bg-accent',
    style: { top: '42%', right: '2%' },
  },
  {
    className: 'size-10 rounded-full bg-accent/20',
    style: { top: '58%', right: '0%' },
  },
  {
    className: 'h-8 w-14 rounded-full bg-sun/60',
    style: { top: '70%', right: '4%' },
  },
  {
    className: 'size-9 rounded-full bg-sun',
    style: { bottom: '16%', left: '80%' },
  },
  {
    className: 'size-7 rotate-45 bg-pop',
    style: { bottom: '21%', left: '70%' },
  },
  {
    className: 'h-9 w-9 rounded-t-full bg-mint',
    style: { bottom: '26%', left: '60%' },
  },
];

export function FloatingShapes() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden md:block"
    >
      {shapes.map((shape, index) => (
        <span
          key={index}
          className={`absolute animate-confetti ${shape.className}`}
          style={{
            ...shape.style,
            animationDelay: `${index * 1.3}s`,
            animationDuration: `${16 + (index % 5) * 2}s`,
          }}
        />
      ))}
    </div>
  );
}
