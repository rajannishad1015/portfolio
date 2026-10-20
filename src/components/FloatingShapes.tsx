import type { CSSProperties } from 'react';

type Shape = {
  className: string;
  style: CSSProperties;
};

const shapes: Shape[] = [
  {
    className: 'size-16 rounded-full bg-pop',
    style: { top: '12%', left: '6%' },
  },
  {
    className: 'h-12 w-12 rotate-12 bg-sun',
    style: { top: '26%', left: '18%' },
  },
  {
    className: 'size-10 rounded-full bg-mint',
    style: { top: '8%', right: '12%' },
  },
  {
    className: 'h-14 w-20 rounded-t-full bg-accent/30',
    style: { top: '34%', right: '5%' },
  },
  {
    className: 'size-8 rotate-45 bg-accent',
    style: { bottom: '22%', left: '10%' },
  },
  {
    className: 'h-10 w-16 rounded-full bg-sun/60',
    style: { bottom: '14%', right: '16%' },
  },
  {
    className: 'size-12 rounded-full bg-accent/20',
    style: { bottom: '30%', left: '42%' },
  },
  {
    className: 'size-7 rotate-45 bg-pop',
    style: { top: '46%', left: '3%' },
  },
  {
    className: 'h-9 w-9 rounded-t-full bg-mint',
    style: { top: '18%', right: '32%' },
  },
  {
    className: 'size-9 rounded-full bg-sun',
    style: { bottom: '8%', left: '30%' },
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
            animationDelay: `${index * 0.9}s`,
            animationDuration: `${9 + (index % 5)}s`,
          }}
        />
      ))}
    </div>
  );
}
