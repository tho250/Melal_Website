import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' }
  }
};

export function ContactPage() {
  return (
    <div className="space-y-8 pb-10">
      <section className="max-w-3xl">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Contact Boutique La Différence
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Have a question about stock, pricing, or deliveries? Reach out and we&apos;ll be happy to
          assist. You can send a message, call us, or visit the shop in Zindiro, Kigali.
        </p>
      </section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] md:items-start"
      >
        <div className="glass-panel p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
            Send us a message
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Fill in your details and we&apos;ll get back as soon as possible. For urgent requests,
            please call or WhatsApp directly.
          </p>
          <form
            className="mt-4 space-y-3 text-sm"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Form submitted (demo only). In production, connect this to your backend or email service.');
            }}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-slate-600 dark:text-slate-300"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-brand focus:ring-2 focus:ring-brand/40 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-slate-600 dark:text-slate-300"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-brand focus:ring-2 focus:ring-brand/40 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium text-slate-600 dark:text-slate-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-brand focus:ring-2 focus:ring-brand/40 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark"
            >
              Send message
            </button>
            <p className="text-[11px] text-slate-400">
              This form is for demo only. Connect it to your preferred email or CRM solution for
              production use.
            </p>
          </form>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-100 bg-white/80 p-5 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Visit or call</h2>
            <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-brand" />
                <span>
                  Zindiro, Kigali, Rwanda
                  <br />
                  Ask for <span className="font-medium">Boutique La Différence</span>.
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand" />
                <a href="tel:+250783350228" className="hover:text-brand">
                  +250 783 350 228
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand" />
                <a href="mailto:info@boutiqueladifference.rw" className="hover:text-brand">
                  info@boutiqueladifference.rw
                </a>
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href="https://wa.me/250783350228"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-600"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-100 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <iframe
              title="Boutique La Différence Location - Zindiro, Kigali"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63812.01868747985!2d30.067!3d-1.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca7f8a1a0f2c7%3A0x4c5c177b9c3a3c8d!2sZindiro!5e0!3m2!1sen!2srw!4v1700000000000"
              width="100%"
              height="260"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
}

