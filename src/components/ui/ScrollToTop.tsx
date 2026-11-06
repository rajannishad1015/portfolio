import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 450);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-40 grid size-11 sm:size-12 place-items-center rounded-full border-2 border-ink bg-sun text-ink shadow-pop transition-all duration-300 ease-bounce hover:-translate-y-1 hover:shadow-pop-hover active:translate-y-0.5 cursor-pointer animate-enter-up"
    >
      <ArrowUp size={20} strokeWidth={2.75} />
    </button>
  );
}
