import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, HeartHandshake, BarChart3, Users } from 'lucide-react';

const blockVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.08 * i, ease: 'easeOut' }
  })
};

export function AboutPage() {
  return (
    <div className="space-y-10 pb-8">
      <section className="max-w-3xl">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          About Boutique La Différence
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Boutique La Différence was created to bring a more organised, premium, and trustworthy
          grocery experience to the heart of Zindiro in Kigali. We combine the familiarity of a
          neighborhood shop with the standards of a modern retail store.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          variants={blockVariants}
          className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
        >
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Our story and journey
          </h2>
          <p>
            Starting as a small neighborhood shop, we grew steadily as more families, students, and
            local businesses chose us for their daily essentials. Our focus has always been simple:
            consistency in quality, fair pricing, and a genuinely welcoming atmosphere.
          </p>
          <p>
            Over time, we expanded our shelves beyond groceries to include a practical range of home
            utensils, making Boutique La Différence a one-stop destination for both kitchen and
            household needs.
          </p>
        </motion.div>

        <motion.aside
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
          variants={blockVariants}
          className="glass-panel flex flex-col gap-3 p-5 text-sm"
        >
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
                Location
              </p>
              <p className="text-sm text-slate-900 dark:text-slate-50">
                Zindiro, Kigali, Rwanda
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Strategically located to serve residents, students, and small businesses across the
            Zindiro area with convenient access and reliable opening hours.
          </p>
        </motion.aside>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          variants={blockVariants}
          className="rounded-3xl border border-slate-100 bg-white/70 p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
        >
          <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
            <HeartHandshake className="h-5 w-5 text-emerald-500" />
            Mission
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            To provide a clean, reliable, and welcoming grocery and home utensils experience that
            respects our customers&apos; time, budget, and trust — every single visit.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
          variants={blockVariants}
          className="rounded-3xl border border-slate-100 bg-white/70 p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
        >
          <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
            <BarChart3 className="h-5 w-5 text-emerald-500" />
            Vision
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            To be recognised as the benchmark neighborhood store in Kigali for organised shelves,
            fresh products, and exceptional customer service — while remaining rooted in community
            values.
          </p>
        </motion.div>
      </section>

      <section className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          variants={blockVariants}
          className="space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
        >
          <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
            <Users className="h-5 w-5 text-emerald-500" />
            Community impact
          </h2>
          <p>
            Beyond transactions, Boutique La Différence aims to be a steady part of daily life in
            Zindiro. We support local farmers and suppliers where possible, and we hire from the
            surrounding community to keep value circulating close to home.
          </p>
          <p>
            Our growth — now handling over 20M RWF in monthly sales — is driven by repeat visits and
            word-of-mouth referrals. This is a responsibility we take seriously, and it pushes us to
            continually improve the shopping experience.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
          variants={blockVariants}
          className="glass-panel flex flex-col gap-3 p-5 text-xs"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-500">
            At a glance
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                20M+ RWF / month
              </p>
              <p className="mt-1 text-[11px] text-slate-500">Average monthly sales volume.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                7 days / week
              </p>
              <p className="mt-1 text-[11px] text-slate-500">Consistent opening hours.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Local team</p>
              <p className="mt-1 text-[11px] text-slate-500">
                Staff from the nearby community, trained to offer warm service.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                Growing base
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Mix of families, young professionals, and small businesses.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

