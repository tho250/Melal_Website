import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, MapPin, Phone, Sparkles, Store } from 'lucide-react';

const heroLayers = {
  base: 'absolute inset-0',
  grain:
    'absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.14)_0.8px,transparent_0.8px)] [background-size:3px_3px]'
};

export function CinematicHeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative isolate -mx-5 -mt-4 overflow-hidden bg-[#071412] sm:-mx-6 md:-mt-8 lg:-mx-8">
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`${heroLayers.base} bg-[radial-gradient(1250px_circle_at_8%_15%,rgba(70,202,142,0.28),transparent_48%),radial-gradient(980px_circle_at_95%_25%,rgba(245,158,11,0.2),transparent_46%),linear-gradient(120deg,#04110f_0%,#0d1f1a_52%,#1a3f33_100%)]`}
        />
        <div className={`${heroLayers.grain}`} />
      </div>

      <div className="relative section-shell grid min-h-[540px] items-center gap-10 py-16 md:min-h-[600px] md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:py-20">
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* UI Lora cinematic entrance block */}
          <motion.span
            initial={{ opacity: 0, x: reducedMotion ? 0 : -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-200/10 px-4 py-1.5 text-xs font-semibold tracking-[0.1em] text-emerald-100 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Boutique La Difference
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: reducedMotion ? 0 : 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-display"
          >
            Groceries and home essentials,
            <span className="block bg-gradient-to-r from-emerald-200 via-lime-200 to-amber-200 bg-clip-text text-transparent">
              crafted for everyday life in Zindiro.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24, ease: 'easeOut' }}
            className="mt-5 max-w-xl text-base leading-relaxed text-emerald-50/90 md:text-lg"
          >
            A tactile, modern shopping experience from your trusted family-run store.
            Discover quality products, fair prices, and warm service all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: 'easeOut' }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-7 py-3 text-sm font-bold text-[#11211d] transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-100"
            >
              Explore products
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+250794018454"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <Phone className="h-4 w-4" />
              +250 794 018 454
            </a>
          </motion.div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: reducedMotion ? 0 : 26, scale: reducedMotion ? 1 : 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-emerald-100/20 bg-white/10 p-6 shadow-soft-xl backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_5%,rgba(255,255,255,0.22),transparent_34%),radial-gradient(circle_at_80%_95%,rgba(245,158,11,0.25),transparent_30%)]" />
            <div className="relative space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-100/80">Visit us</p>
                  <p className="mt-2 text-lg font-bold text-white">Boutique La Difference</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/20 px-3 py-1 text-[11px] font-semibold text-emerald-100">
                  <Store className="h-3.5 w-3.5" />
                  Family-run
                </span>
              </div>

              <div className="rounded-2xl border border-white/15 bg-[#081713]/65 p-4 text-sm text-emerald-50/95">
                <p className="inline-flex items-center gap-2 font-semibold">
                  <MapPin className="h-4 w-4 text-amber-300" />
                  Zindiro, near the SP station
                </p>
                <p className="mt-2 text-xs text-emerald-100/85">Open daily for groceries, utensils, and essentials.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-white/10 bg-white/10 p-3 text-emerald-50">
                  <p className="font-semibold">Premium quality</p>
                  <p className="mt-1 text-emerald-100/80">Carefully curated stock</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/10 p-3 text-emerald-50">
                  <p className="font-semibold">Fast checkout</p>
                  <p className="mt-1 text-emerald-100/80">Smooth cart experience</p>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
