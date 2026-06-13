import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Home, Sparkles, Package, ArrowRight } from 'lucide-react';

const sectionFade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.08 * i, ease: [0.25, 0.1, 0.25, 1] }
  })
};

const quickLinks = [
  {
    id: 'groceries',
    name: 'Fresh Groceries',
    description: 'Seasonal produce and quality staples',
    icon: ShoppingBag,
    gradient: 'from-emerald-500 to-green-600',
    bgGradient: 'bg-gradient-to-br from-emerald-100 to-emerald-50',
    darkBgGradient: 'dark:from-emerald-950/40 dark:to-emerald-900/20',
    accentColor: 'text-emerald-600 dark:text-emerald-400'
  },
  {
    id: 'essentials',
    name: 'Home Essentials',
    description: 'Utensils, cleaning supplies & more',
    icon: Home,
    gradient: 'from-amber-500 to-orange-600',
    bgGradient: 'bg-gradient-to-br from-amber-100 to-amber-50',
    darkBgGradient: 'dark:from-amber-950/40 dark:to-amber-900/20',
    accentColor: 'text-amber-600 dark:text-amber-400'
  },
  {
    id: 'new-arrivals',
    name: 'New Arrivals',
    description: 'Latest products just added to stock',
    icon: Sparkles,
    gradient: 'from-rose-500 to-pink-600',
    bgGradient: 'bg-gradient-to-br from-rose-100 to-rose-50',
    darkBgGradient: 'dark:from-rose-950/40 dark:to-rose-900/20',
    accentColor: 'text-rose-600 dark:text-rose-400'
  },
  {
    id: 'bulk-orders',
    name: 'Bulk Orders',
    description: 'Special pricing for businesses & groups',
    icon: Package,
    gradient: 'from-sky-500 to-blue-600',
    bgGradient: 'bg-gradient-to-br from-sky-100 to-sky-50',
    darkBgGradient: 'dark:from-sky-950/40 dark:to-sky-900/20',
    accentColor: 'text-sky-600 dark:text-sky-400'
  }
];

export function FeaturedProductsGrid() {
  return (
    <section className="py-4">
      <div className="mb-8">
        <h2 className="section-heading">Quick Links</h2>
        <p className="section-subtext">
          Everything you need, right at your fingertips.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((link, idx) => (
          <Link
            key={link.id}
            to={`/products${link.id === 'bulk-orders' ? '?bulk=true' : ''}`}
            className="group"
          >
            <motion.div
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionFade}
              className={`card-base card-hover flex h-full flex-col p-5 transition-all duration-300 ${link.bgGradient} ${link.darkBgGradient}`}
            >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${link.gradient} text-white shadow-md`}
              >
                <link.icon className="h-5.5 w-5.5" />
              </div>

              <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
                {link.name}
              </h3>

              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {link.description}
              </p>

              <span className={`mt-auto flex items-center gap-1 pt-4 text-xs font-semibold ${link.accentColor} opacity-0 transition-all duration-300 group-hover:opacity-100`}>
                Explore
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
