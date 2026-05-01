import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PORT = process.env.PORT || 5000;

export const INVENTORY_FILE_PATH =
  process.env.INVENTORY_FILE_PATH || path.join(__dirname, '/../data', 'inventory.xlsx');

export const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || '';

export const IMAGE_CACHE_PATH =
  process.env.IMAGE_CACHE_PATH || path.join(__dirname, '/cache', 'imageCache.json');

export const WHATSAPP_OWNER_NUMBER = process.env.WHATSAPP_OWNER_NUMBER || '250794018454';
export const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || '';
export const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN || '';

