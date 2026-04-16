import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Leaf, Truck, ShieldCheck, Quote, Star } from 'lucide-react';

const sectionFade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.08 * i, ease: 'easeOut' }
  })
};

const categories = [
  {
    name: 'Fruits & Vegetables',
    description: 'Seasonal, fresh produce carefully sourced and handled with care.',
    icon: Leaf,
    accent: 'from-emerald-400/10 to-emerald-600/10'
  },
  {
    name: 'Beverages',
    description: 'Juices, soft drinks, water, tea, and everyday essentials.',
    icon: Truck,
    accent: 'from-sky-400/10 to-sky-600/10'
  },
  {
    name: 'Household Items',
    description: 'Cleaning supplies, detergents, and daily household basics.',
    icon: ShieldCheck,
    accent: 'from-amber-400/10 to-amber-600/10'
  },
  {
    name: 'Snacks',
    description: 'Biscuits, crisps, sweets, and treats for every mood.',
    icon: Star,
    accent: 'from-rose-400/10 to-rose-600/10'
  }
];

const reasons = [
  {
    title: 'Affordable Prices',
    description: 'We keep everyday essentials within reach without compromising on quality.'
  },
  {
    title: 'Wide Product Variety',
    description: 'From fresh produce to home utensils, find everything in one trusted place.'
  },
  {
    title: 'Convenient Location',
    description: 'Located in Zindiro, Kigali, with easy access for the surrounding community.'
  },
  {
    title: 'Friendly Service',
    description: 'A warm, family-like shopping experience every time you walk in.'
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

  // Scroll-based parallax layers (subtle so it feels premium, not distracting)
  const bgParallaxY = useTransform(scrollY, [0, 450], [0, reducedMotion ? 0 : -40]);
  const glowParallaxY = useTransform(scrollY, [0, 450], [0, reducedMotion ? 0 : 26]);
  const badgeParallaxY = useTransform(scrollY, [0, 450], [0, reducedMotion ? 0 : -18]);

  return (
    <div className="space-y-16 pb-8">
      {/* Hero with background video */}
      <section className="relative isolate overflow-hidden rounded-3xl bg-slate-950/90 pt-10 text-white shadow-soft md:pt-14">
        <div className="pointer-events-none absolute inset-0">
          <video
            className="h-full w-full object-cover opacity-70"
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
            className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/40"
          />
          <motion.div
            aria-hidden="true"
            style={{ y: glowParallaxY }}
            className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-emerald-500/25 to-transparent"
          />
        </div>

        <div className="relative section-shell grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300 ring-1 ring-emerald-400/30">
              Fresh · Local · Trusted
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              Fresh Groceries,
              <span className="block text-emerald-300">Curated for Zindiro Families.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200 md:text-base"
            >
              Boutique La Différence blends the warmth of a neighborhood shop with the polish of a
              modern grocery brand — giving Zindiro access to reliably fresh, beautifully presented
              essentials every day.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-7 py-2.5 text-sm font-semibold text-slate-950 shadow-soft transition hover:-translate-y-0.5 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                Shop the collection
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-500/80 bg-white/5 px-6 py-2.5 text-sm font-semibold text-slate-50 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                Plan your visit
              </Link>
            </motion.div>

            {/* Floating trust badge (parallax + gentle float) */}
            <motion.div
              aria-hidden="true"
              style={{ y: badgeParallaxY }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25, ease: 'easeOut' }}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-4 py-2 text-[11px] text-slate-200 ring-1 ring-emerald-400/40 backdrop-blur shadow-soft"
            >
              <motion.div
                animate={reducedMotion ? undefined : { rotate: [0, -6, 0] }}
                transition={{ duration: 3.4, repeat: reducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
                className="flex"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
              </motion.div>
              <span>
                Serving Zindiro with{' '}
                <span className="font-semibold text-emerald-200">20M+ RWF</span> monthly sales
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
            className="relative hidden md:block"
          >
            <div className="glass-panel relative overflow-hidden bg-slate-950/60">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.45),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(8,47,73,0.9),_transparent_55%)]" />
              <div className="relative aspect-[4/3] w-full px-6 pb-6 pt-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                      Boutique La Différence
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-50">
                      Zindiro&apos;s premium neighborhood store
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-900/70 px-3 py-2 text-right text-[11px] text-slate-200 ring-1 ring-emerald-400/40">
                    <p className="font-semibold text-emerald-200">Open today</p>
                    <p>7:00am – 9:00pm</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 text-[11px] text-slate-200">
                  <div className="flex items-center justify-between gap-2 rounded-2xl bg-slate-900/60 px-3 py-2 ring-1 ring-slate-700/70">
                    <span>Everyday essentials</span>
                    <span className="text-emerald-300">Curated brands</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 rounded-2xl bg-slate-900/60 px-3 py-2 ring-1 ring-slate-700/70">
                    <span>Home utensils &amp; cleaning</span>
                    <span className="text-emerald-300">One-stop convenience</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Featured categories
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Explore the essentials that keep homes in Zindiro running smoothly.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {categories.map((cat, idx) => (
            <motion.article
              key={cat.name}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionFade}
              className="group flex flex-col rounded-3xl bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm ring-1 ring-slate-100/80 transition hover:-translate-y-1 hover:shadow-soft dark:from-slate-900 dark:to-slate-950 dark:ring-slate-800"
            >
              <div
                className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.accent} text-brand shadow-sm`}
              >
                <cat.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                {cat.name}
              </h3>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{cat.description}</p>
              <span className="mt-3 text-xs font-semibold text-brand/80 opacity-0 transition group-hover:opacity-100">
                View items →
              </span>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Why Choose Us + Monthly Sales */}
      <section className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionFade}
        >
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Why customers choose Boutique La Différence
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            We blend the reliability of a supermarket with the warmth of a neighborhood shop.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {reasons.map((reason, idx) => (
              <motion.div
                key={reason.title}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={sectionFade}
                className="rounded-2xl border border-slate-100 bg-white/70 p-4 text-sm shadow-sm transition hover:border-brand/40 dark:border-slate-800 dark:bg-slate-900/80"
              >
                <p className="font-semibold text-slate-900 dark:text-slate-50">{reason.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
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
          className="glass-panel flex flex-col gap-4 p-5"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
              Community insight
            </p>
            <span className="text-[11px] text-slate-400">Updated monthly</span>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Boutique La Différence serves a growing base of families, students, and small
              businesses in Zindiro.
            </p>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Over <span className="text-emerald-600 dark:text-emerald-300">20M RWF</span>
              <span className="block text-base font-normal text-slate-500">
                in verified monthly sales volume
              </span>
            </p>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs">
            <p className="flex items-center gap-1 text-emerald-600 dark:text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Growing neighborhood trust
            </p>
            <p className="text-slate-400">High repeat visits and referrals</p>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
            <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300" />
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="pb-2">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Customers who shop with us
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Stories from the community that shops with Boutique La Différence.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.figure
              key={t.name}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionFade}
              className="flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white/70 p-4 text-sm shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900/80"
            >
              <Quote className="h-6 w-6 text-emerald-400" />
              <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {t.quote}
              </p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <div>
                  <figcaption className="text-sm font-semibold text-slate-900 dark:text-white">
                    {t.name}
                  </figcaption>
                  <p className="text-[11px] text-slate-500">{t.role}</p>
                </div>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </motion.figure>
          ))}
        </div>
      </section>
    </div>
  );
}

