import fs from 'node:fs';
import fetch from 'node-fetch';
import { IMAGE_CACHE_PATH, UNSPLASH_ACCESS_KEY } from '../config.js';

let cache = {};
let cacheLoaded = false;

function ensureCacheLoaded() {
  if (cacheLoaded) return;
  try {
    if (fs.existsSync(IMAGE_CACHE_PATH)) {
      const content = fs.readFileSync(IMAGE_CACHE_PATH, 'utf8');
      cache = content ? JSON.parse(content) : {};
    } else {
      fs.mkdirSync(new URL('.', new URL('file://' + IMAGE_CACHE_PATH)), { recursive: true });
      cache = {};
    }
  } catch {
    cache = {};
  }
  cacheLoaded = true;
}

function persistCache() {
  try {
    const dir = IMAGE_CACHE_PATH.substring(0, IMAGE_CACHE_PATH.lastIndexOf('\\') + 1) ||
      IMAGE_CACHE_PATH.substring(0, IMAGE_CACHE_PATH.lastIndexOf('/') + 1);
    if (dir && !fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(IMAGE_CACHE_PATH, JSON.stringify(cache, null, 2), 'utf8');
  } catch {
    // ignore write failures
  }
}

export function buildSearchQuery(productName) {
  if (!productName) return '';
  const lower = productName.toLowerCase();
  const withoutUnits = lower.replace(/\b(\d+(\.\d+)?)(kg|g|l|ml|pack|pcs?)\b/gi, ' ');
  const withoutNumbers = withoutUnits.replace(/\b\d+(\.\d+)?\b/g, ' ');
  const cleaned = withoutNumbers.replace(/[^\p{L}\s]/gu, ' ');
  const tokens = cleaned
    .split(/\s+/)
    .filter((token) => token.length > 1 && !['brand', 'original', 'new'].includes(token));

  if (tokens.length === 0) return '';

  if (tokens.includes('noodles')) {
    return 'noodles bowl';
  }
  if (tokens.includes('maize') && tokens.includes('flour')) {
    return 'maize flour bag';
  }
  if (tokens.includes('coca') && tokens.includes('cola')) {
    return 'coca cola bottle';
  }

  return tokens.slice(0, 4).join(' ');
}

export async function getImageForProduct(productName) {
  ensureCacheLoaded();
  if (!productName) return null;

  if (cache[productName]) {
    return cache[productName];
  }

  if (!UNSPLASH_ACCESS_KEY) {
    return null;
  }

  const query = buildSearchQuery(productName);
  if (!query) return null;

  const url = new URL('https://api.unsplash.com/search/photos');
  url.searchParams.set('query', query);
  url.searchParams.set('per_page', '1');
  url.searchParams.set('orientation', 'square');
  url.searchParams.set('content_filter', 'high');

  try {
    const response = await fetch(url.href, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
      }
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const first = data.results?.[0];
    const imageUrl = first?.urls?.small || null;

    cache[productName] = imageUrl;
    persistCache();

    return imageUrl;
  } catch {
    return null;
  }
}

