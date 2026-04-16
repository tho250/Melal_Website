import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ShoppingBasket, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' }
];

export function Navbar({ darkMode, onToggleDarkMode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const headerBg = scrolled
    ? 'bg-white/75 dark:bg-slate-900/80'
    : 'bg-white/55 dark:bg-slate-900/50';

  const headerShadow = scrolled ? 'shadow-soft' : 'shadow-none';

  return (
    <motion.header
      initial={false}
      animate={{ y: 0 }}
      className={`sticky top-0 z-40 border-b border-slate-200/60 backdrop-blur-md transition-colors ${headerBg} ${headerShadow}`}
    >
      <div className="section-shell flex items-center justify-between py-3">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-full px-3 py-1 transition hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
        >
          <motion.div
            initial={false}
            animate={{ scale: scrolled ? 0.98 : 1 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="flex h-9 w-9 items-center justify-center rounded-2xl bg-brand/10 text-brand shadow-soft"
          >
            <ShoppingBasket className="h-5 w-5" />
          </motion.div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">
              Boutique La Différence
            </span>
            <span className="text-[11px] text-slate-500">
              Zindiro · Kigali, Rwanda
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-brand dark:text-emerald-300'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/70 bg-white/60 text-slate-700 shadow-sm transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/70 bg-white/60 text-slate-700 shadow-sm transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/70 bg-white/60 text-slate-700 shadow-sm transition hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-200"
            aria-label="Toggle navigation menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="border-t border-slate-200/80 bg-white/90 px-4 pb-4 pt-2 shadow-sm dark:border-slate-700 dark:bg-slate-900/95 md:hidden"
        >
          <nav className="section-shell flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-brand/10 text-brand'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
