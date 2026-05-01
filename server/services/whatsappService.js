import fetch from 'node-fetch';
import {
  WHATSAPP_OWNER_NUMBER,
  WHATSAPP_PHONE_NUMBER_ID,
  WHATSAPP_ACCESS_TOKEN
} from '../config.js';

const GRAPH_API_URL = `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

export function getWhatsAppStatus() {
  return {
    configured: Boolean(WHATSAPP_PHONE_NUMBER_ID && WHATSAPP_ACCESS_TOKEN && WHATSAPP_OWNER_NUMBER),
    provider: 'meta-cloud-api'
  };
}

export async function sendOwnerWhatsAppMessage(message) {
  if (!WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_ACCESS_TOKEN) {
    throw new Error(
      'Meta Cloud API credentials missing. Set WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_ACCESS_TOKEN in .env'
    );
  }

  if (!WHATSAPP_OWNER_NUMBER) {
    throw new Error('WHATSAPP_OWNER_NUMBER is missing.');
  }

  const body = {
    messaging_product: 'whatsapp',
    to: String(WHATSAPP_OWNER_NUMBER).replace(/\D/g, ''),
    type: 'text',
    text: { body: message }
  };

  const response = await fetch(GRAPH_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (!response.ok) {
    // eslint-disable-next-line no-console
    console.error('[whatsapp] Meta API error:', JSON.stringify(data));
    throw new Error(data?.error?.message || `Meta API returned ${response.status}`);
  }

  // eslint-disable-next-line no-console
  console.log('[whatsapp] Message sent, id:', data?.messages?.[0]?.id);
  return data?.messages?.[0]?.id;
}
