import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MessageCircle, MapPin, Mail } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const DAILY_HOURS = [
  { day: 'Monday',    hours: '8:00 AM – 10:00 PM' },
  { day: 'Tuesday',   hours: '8:00 AM – 10:00 PM' },
  { day: 'Wednesday', hours: '8:00 AM – 10:00 PM' },
  { day: 'Thursday',  hours: '8:00 AM – 10:00 PM' },
  { day: 'Friday',    hours: '8:00 AM – 10:30 PM' },
  { day: 'Saturday',  hours: '8:00 AM – 10:30 PM' },
  { day: 'Sunday',    hours: '8:00 AM – 10:30 PM' },
];

// getDay() returns 0=Sun…6=Sat; DAILY_HOURS index is 0=Mon…6=Sun
function getDailyHours(dayIndex) {
  const idx = dayIndex === 0 ? 6 : dayIndex - 1;
  return DAILY_HOURS[idx].hours;
}

export function ContactPage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  function handleWhatsApp(e) {
    e.preventDefault();
    const text = encodeURIComponent(`Hello, my name is ${name.trim()}. ${message.trim()}`);
    window.open(`https://wa.me/250794018454?text=${text}`, '_blank', 'noreferrer');
  }

  const todayIndex = new Date().getDay(); // 0=Sun
  const tomorrowIndex = (todayIndex + 1) % 7;
  // Day name for highlighting
  const todayName = DAILY_HOURS[todayIndex === 0 ? 6 : todayIndex - 1].day;

  return (
    <div className="space-y-10 pb-12">
      <section className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Contact Boutique La Différence
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Have a question about stock, pricing, or deliveries? Reach out and we&apos;ll be happy to
          assist. Send us a WhatsApp message or visit the shop in Zindiro, Kigali.
        </p>
      </section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] md:items-start"
      >
        {/* Left column: WhatsApp form + contact info */}
        <div className="space-y-5">
          <div className="card-base p-5">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Send us a message on WhatsApp
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Fill in your name and message and you&apos;ll be taken straight to WhatsApp with it
              pre-filled — works on mobile and desktop.
            </p>
            <form className="mt-4 space-y-3 text-sm" onSubmit={handleWhatsApp}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-slate-600 dark:text-slate-300"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-base mt-1"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium text-slate-600 dark:text-slate-300"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input-base mt-1"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="btn-primary mt-2 inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Open in WhatsApp
              </button>
            </form>
          </div>

          {/* Contact info: address + email */}
          <div className="card-base p-5">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Find us</h2>
            <div className="mt-3 space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>KG 27 Ave, Zindiro, Kigali, Rwanda</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand" />
                <a
                  href="mailto:boutiqueladifference250@gmail.com"
                  className="break-all hover:text-brand"
                >
                  boutiqueladifference250@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Opening hours */}
        <div className="card-base p-5 text-sm">
          <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <Clock className="h-4 w-4 text-brand" />
            Opening Hours
          </h2>

          {/* Full daily schedule */}
          <div className="mt-4 space-y-1">
            {DAILY_HOURS.map(({ day, hours }) => {
              const isToday = day === todayName;
              return (
                <div
                  key={day}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                    isToday
                      ? 'bg-brand/10 font-semibold text-brand dark:bg-brand/20'
                      : 'text-slate-600 odd:bg-slate-50 dark:text-slate-300 dark:odd:bg-slate-800/40'
                  }`}
                >
                  <span>{day}</span>
                  <span className="tabular-nums">{hours}</span>
                </div>
              );
            })}
          </div>

          {/* Today / Tomorrow highlight */}
          <div className="mt-4 rounded-xl border border-brand/20 bg-brand/5 px-4 py-3 text-xs text-slate-600 dark:text-slate-300">
            <p>
              <span className="font-semibold">Today:</span> {getDailyHours(todayIndex)}
            </p>
            <p className="mt-1">
              <span className="font-semibold">Tomorrow:</span> {getDailyHours(tomorrowIndex)}
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
