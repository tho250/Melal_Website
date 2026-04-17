import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 240);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-5 right-5 z-40 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-700 shadow-soft ring-1 ring-slate-200/80 transition hover:-translate-y-0.5 hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700"
      aria-label="Scroll back to top"
    >
      <ChevronUp className="h-4 w-4" />
    </button>
  );
}
