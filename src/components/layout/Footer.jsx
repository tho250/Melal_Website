import React from 'react';
import { MapPin, Phone, Instagram, Facebook, Clock, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mon(1)–Thu(4): 8:00 AM – 10:00 PM  |  Fri(5)–Sun(0): 8:00 AM – 10:30 PM
function getHoursForDay(dayIndex) {
  return dayIndex >= 1 && dayIndex <= 4
    ? '8:00 AM – 10:00 PM'
    : '8:00 AM – 10:30 PM';
}

function isOpenNow() {
  const now = new Date();
  const day = now.getDay();
  const asMinutes = now.getHours() * 60 + now.getMinutes();
  const closeMinutes = day >= 1 && day <= 4 ? 22 * 60 : 22 * 60 + 30;
  return asMinutes >= 8 * 60 && asMinutes < closeMinutes;
}

export function Footer() {
  const open = isOpenNow();
  const today = new Date().getDay();
  const tomorrow = (today + 1) % 7;

  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white/80 py-10 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300">
      <div className="section-shell grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Boutique La Différence
          </h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            A premium neighborhood grocery and home utensils store in Zindiro, Kigali — combining
            freshness, thoughtful curation, and warm service for every visit.
          </p>
          <div className="mt-4 h-28 overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <iframe
              title="Boutique La Différence - Zindiro, Kigali"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63812.01868747985!2d30.067!3d-1.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca7f8a1a0f2c7%3A0x4c5c177b9c3a3c8d!2sZindiro!5e0!3m2!1sen!2srw!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Zindiro%2C+Kigali%2C+Rwanda"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-brand hover:text-brand-dark"
          >
            <MapPin className="h-3.5 w-3.5" />
            Get directions
          </a>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Visit us
          </h4>
          <div className="mt-2 space-y-2 text-sm">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-brand" />
              <span>Zindiro, Kigali, Rwanda</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand" />
              <a href="tel:+250794018454" className="hover:text-brand">
                +250 794 018 454
              </a>
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700">
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  open ? 'bg-emerald-500' : 'bg-red-500'
                }`}
              />
              {open ? 'We are open now' : 'Currently closed'}
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Opening hours
          </h4>
          <div className="mt-2 space-y-1 text-sm">
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand" />
              <span>Today: {getHoursForDay(today)}</span>
            </p>
            <p className="pl-6">Tomorrow: {getHoursForDay(tomorrow)}</p>
          </div>
          <div className="mt-4 flex gap-2">
            <a
              href="https://wa.me/250794018454"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div className="section-shell mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200/70 pt-4 text-xs text-slate-500 dark:border-slate-800 md:flex-row">
        <p>© {new Date().getFullYear()} Boutique La Différence. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="inline-flex items-center gap-1 transition hover:-translate-y-0.5 hover:text-brand"
            aria-label="Visit our Instagram"
          >
            <Instagram className="h-4 w-4" />
            <span>Instagram</span>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-1 transition hover:-translate-y-0.5 hover:text-brand"
            aria-label="Visit our Facebook"
          >
            <Facebook className="h-4 w-4" />
            <span>Facebook</span>
          </a>
          <Link to="/contact" className="transition hover:-translate-y-0.5 hover:text-brand">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
