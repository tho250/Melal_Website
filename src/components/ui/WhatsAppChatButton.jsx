import React from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppChatButton() {
  return (
    <a
      href="https://wa.me/250783350228"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-soft ring-1 ring-emerald-300/60 transition hover:-translate-y-0.5 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-4 w-4" />
      <span>Chat on WhatsApp</span>
    </a>
  );
}

