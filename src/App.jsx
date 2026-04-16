import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/layout/Navbar.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { ScrollToTopButton } from './components/ui/ScrollToTopButton.jsx';
import { WhatsAppChatButton } from './components/ui/WhatsAppChatButton.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { ProductsPage } from './pages/ProductsPage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';

function ScrollToTopOnRouteChange() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return null;
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 }
};

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const stored = window.localStorage.getItem('bld-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored === 'dark' || (!stored && prefersDark);
    setDarkMode(initial);
    document.documentElement.classList.toggle('dark', initial);
  }, []);

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      window.localStorage.setItem('bld-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 text-slate-900 transition-colors dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-50">
      <Navbar darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />
      <ScrollToTopOnRouteChange />

      <main className="pb-16 pt-4 md:pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="section-shell"
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route
                path="*"
                element={
                  <div className="py-20 text-center">
                    <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
                      Page not found
                    </h1>
                    <p className="mt-2 text-slate-500">
                      The page you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <Link
                      to="/"
                      className="mt-6 inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark"
                    >
                      Back to home
                    </Link>
                  </div>
                }
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <ScrollToTopButton />
      <WhatsAppChatButton />
    </div>
  );
}

