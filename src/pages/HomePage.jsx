import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Leaf, Truck, ShieldCheck, Quote, Star, ArrowRight, Sparkles } from 'lucide-react';

const sectionFade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.06 * i, ease: [0.25, 0.1, 0.25, 1] }
  })
};

const categories = [
  {
    name: 'Fruits & Vegetables',
    description: 'Seasonal, fresh produce carefully sourced and handled with care.',
    icon: Leaf,
    gradient: 'from-emerald-500 to-green-600',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30'
  },
  {
    name: 'Beverages',
    description: 'Juices, soft drinks, water, tea, and everyday essentials.',
    icon: Sparkles,
    gradient: 'from-sky-500 to-blue-600',
    bg: 'bg-sky-50 dark:bg-sky-950/30'
  },
  {
    name: 'Household Items',
    description: 'Cleaning supplies, detergents, and daily household basics.',
    icon: ShieldCheck,
    gradient: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50 dark:bg-amber-950/30'
  },
  {
    name: 'Snacks',
    description: 'Biscuits, crisps, sweets, and treats for every mood.',
    icon: Star,
    gradient: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50 dark:bg-rose-950/30'
  }
];

const reasons = [
  {
    title: 'Affordable Prices',
    description: 'We keep everyday essentials within reach without compromising on quality.',
    num: '01'
  },
  {
    title: 'Wide Product Variety',
    description: 'From fresh produce to home utensils, find everything in one trusted place.',
    num: '02'
  },
  {
    title: 'Convenient Location',
    description: 'Located in Zindiro, Kigali, with easy access for the surrounding community.',
    num: '03'
  },
  {
    title: 'Friendly Service',
    description: 'A warm, family-like shopping experience every time you walk in.',
    num: '04'
  }
];

const testimonials = [
  {
    name: 'Claudine, Zindiro Resident',
    role: 'Regular customer',
    quote:
      'Boutique La Différence is my go-to shop. The team is friendly, and I always find fresh items for my family.',
    rating: 5
  },
  {
    name: 'Eric, Small Restaurant Owner',
    role: 'Business customer',
    quote:
      'Their consistency and reliability help me run my restaurant smoothly. Prices are fair and delivery is always on time.',
    rating: 5
  },
  {
    name: 'Aline, Young Professional',
    role: 'Neighborhood customer',
    quote:
      'I love how organised the shop is. It feels premium and professional, but still very personal and local.',
    rating: 5
  }
];

export function HomePage() {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const bgParallaxY = useTransform(scrollY, [0, 450], [0, reducedMotion ? 0 : -40]);
  const glowParallaxY = useTransform(scrollY, [0, 450], [0, reducedMotion ? 0 : 26]);
  const badgeParallaxY = useTransform(scrollY, [0, 450], [0, reducedMotion ? 0 : -18]);

  return (
    <div className="space-y-20 pb-12 md:space-y-28">
      {/* ───── Hero Section ───── */}
      <section className="relative isolate -mx-5 -mt-4 overflow-hidden bg-slate-950 sm:-mx-6 md:-mt-8 lg:-mx-8">
        {/* Background layers */}
        <div className="pointer-events-none absolute inset-0">
          <video
            className="h-full w-full object-cover opacity-50"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="https://videos.pexels.com/video-files/5836495/5836495-sd_640_360_25fps.mp4"
              type="video/mp4"
            />
          </video>
          <motion.div
            aria-hidden="true"
            style={{ y: bgParallaxY }}
            className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60"
          />
          <motion.div
            aria-hidden="true"
            style={{ y: glowParallaxY }}
            className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-emerald-500/20 to-transparent"
          />
          {/* Decorative grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div className="relative section-shell grid min-h-[520px] items-center gap-10 py-16 md:min-h-[580px] md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-300 backdrop-blur-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Fresh · Local · Trusted
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-display"
            >
              Fresh Groceries,
              <span className="block bg-gradient-to-r from-emerald-300 to-green-400 bg-clip-text text-transparent">
                Curated for Zindiro.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="mt-5 max-w-lg text-base leading-relaxed text-slate-300 md:text-lg"
            >
              The warmth of a neighborhood shop with the polish of a modern grocery brand —
              giving Zindiro access to reliably fresh essentials every day.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-[0_0_50px_-8px_rgba(22,163,74,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
              >
                Shop the collection
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-500/50 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                Plan your visit
              </Link>
            </motion.div>

            <motion.div
              aria-hidden="true"
              style={{ y: badgeParallaxY }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25, ease: 'easeOut' }}
              className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-slate-700/60 bg-slate-900/80 px-4 py-2 text-xs text-slate-300 backdrop-blur-sm"
            >
              <motion.div
                animate={reducedMotion ? undefined : { rotate: [0, -6, 0] }}
                transition={{ duration: 3.4, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
                className="flex"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              </motion.div>
              <span>
                Serving Zindiro with{' '}
                <span className="font-semibold text-emerald-300">fair prices</span> every day
              </span>
            </motion.div>
          </motion.div>

          {/* Hero right card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            className="relative hidden md:block"
          >
            <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/60 shadow-soft-xl backdrop-blur-sm">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(22,163,74,0.25),_transparent_60%)]" />
              <div className="relative aspect-[4/3] w-full px-6 pb-6 pt-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                      Boutique La Différence
                    </p>
                    <p className="mt-1.5 text-sm font-semibold text-slate-50">
                      Zindiro&apos;s premium neighborhood store
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-700/60 bg-slate-900/80 px-3 py-2 text-right text-[11px] text-slate-300">
                    <p className="font-semibold text-emerald-300">Open today</p>
                    <p>8:00am – 10:30pm</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 text-xs text-slate-300">
                  <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-700/40 bg-slate-800/40 px-4 py-3">
                    <span>Everyday essentials</span>
                    <span className="font-medium text-emerald-400">Curated brands</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-700/40 bg-slate-800/40 px-4 py-3">
                    <span>Home utensils &amp; cleaning</span>
                    <span className="font-medium text-emerald-400">One-stop convenience</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── Featured Categories ───── */}
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="section-heading">Featured Categories</h2>
            <p className="section-subtext">
              Explore the essentials that keep homes in Zindiro running smoothly.
            </p>
          </div>
          <Link
            to="/products"
            className="hidden items-center gap-1.5 text-sm font-semibold text-brand transition hover:text-brand-dark md:inline-flex"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, idx) => (
            <motion.article
              key={cat.name}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionFade}
              className="group card-base card-hover flex flex-col p-5"
            >
              <div
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} text-white shadow-sm`}
              >
                <cat.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
                {cat.name}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {cat.description}
              </p>
              <span className="mt-auto flex items-center gap-1 pt-4 text-xs font-semibold text-brand opacity-0 transition-all duration-300 group-hover:opacity-100">
                View items
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ───── Why Choose Us ───── */}
      <section className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] md:items-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionFade}
        >
          <h2 className="section-heading">
            Why customers choose La Différence
          </h2>
          <p className="section-subtext">
            We blend the reliability of a supermarket with the warmth of a neighborhood shop.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {reasons.map((reason, idx) => (
              <motion.div
                key={reason.title}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={sectionFade}
                className="group rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:border-brand/30 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand/30"
              >
                <span className="text-xs font-bold text-brand/40">{reason.num}</span>
                <p className="mt-2 text-sm font-bold text-slate-900 dark:text-slate-50">
                  {reason.title}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={sectionFade}
          className="card-base p-6"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-wider text-brand">
              Community insight
            </p>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              Updated monthly
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Boutique La Différence serves a growing base of families, students, and small
            businesses in Zindiro.
          </p>
          <div className="mt-4 flex items-center justify-between text-xs">
            <p className="flex items-center gap-1.5 font-medium text-brand">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Growing neighborhood trust
            </p>
            <p className="text-slate-400">High repeat visits</p>
          </div>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-brand to-emerald-400" />
          </div>
        </motion.div>
      </section>

      {/* ───── Testimonials ───── */}
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="section-heading">What Our Customers Say</h2>
            <p className="section-subtext">
              Stories from the community that shops with Boutique La Différence.
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.figure
              key={t.name}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionFade}
              className="card-base card-hover flex h-full flex-col justify-between p-5"
            >
              <div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>
              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <figcaption className="text-sm font-semibold text-slate-900 dark:text-white">
                    {t.name}
                  </figcaption>
                  <p className="text-[11px] text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.figure>
          ))}
        </div>
      </section>
    </div>
  );
}

