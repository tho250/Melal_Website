import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, HeartHandshake, BarChart3, Users } from 'lucide-react';

const blockVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.08 * i, ease: [0.25, 0.1, 0.25, 1] }
  })
};

export function AboutPage() {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero header */}
      <section className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          About 
          <span itemScope itemType="https://schema.org/LocalBusiness">
            <span itemProp="name"> Boutique La Différence</span>
          </span>
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          <span itemScope itemType="https://schema.org/LocalBusiness">
            <span itemProp="description">
              Boutique La Différence was created to bring a more organised, premium, and trustworthy
              grocery experience to the heart of Zindiro in Kigali. We combine the familiarity of a
              neighborhood shop with the standards of a modern retail store.
            </span>
          </span>
        </p>
      </section>

      {/* Story + Location */}
      <section className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          variants={blockVariants}
          className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
        >
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
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
          className="card-base flex flex-col gap-3 p-5 text-sm"
        >
          <div className="flex items-center gap-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-brand">
                Location
              </p>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
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

      {/* Mission + Vision */}
      <section className="grid gap-5 md:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          variants={blockVariants}
          className="card-base p-5 text-sm"
        >
          <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <HeartHandshake className="h-4 w-4" />
            </span>
            Mission
          </h2>
          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
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
          className="card-base p-5 text-sm"
        >
          <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <BarChart3 className="h-4 w-4" />
            </span>
            Vision
          </h2>
          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            To be recognised as the benchmark neighborhood store in Kigali for organised shelves,
            fresh products, and exceptional customer service — while remaining rooted in community
            values.
          </p>
        </motion.div>
      </section>

      {/* At a Glance */}
      <section className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          variants={blockVariants}
          className="space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
        >
            
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
          variants={blockVariants}
          className="card-base flex flex-col gap-4 p-5 text-xs"
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-brand">
            At a glance
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-50">
                7 days / week
              </p>
              <p className="mt-1 text-[11px] text-slate-500">Consistent opening hours.</p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-50">Local team</p>
              <p className="mt-1 text-[11px] text-slate-500">
                Staff from the nearby community, trained to offer warm service.
              </p>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-50">
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
