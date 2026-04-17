import React from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppChatButton() {
  return (
    <a
      href="https://wa.me/250794018454"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-4 w-4" />
      <span>Chat on WhatsApp</span>
    </a>
  );
}

