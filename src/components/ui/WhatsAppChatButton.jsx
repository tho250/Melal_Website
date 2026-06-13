import React from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppChatButton() {
  return (
    <a
      href="https://wa.me/250794018454"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 md:hidden inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-xs font-semibold text-white shadow-soft-lg transition-all duration-200 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-soft-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-4 w-4" />
      <span>Chat</span>
    </a>
  );
}

