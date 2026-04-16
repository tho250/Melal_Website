import fs from 'node:fs';
import xlsx from 'xlsx';
import { INVENTORY_FILE_PATH } from '../config.js';

let productsCache = null;
let lastLoadedAt = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

function normalizeWhitespace(value) {
  return String(value || '').trim().replace(/\s+/g, ' ');
}

function stripWeightUnits(text) {
  const withoutUnits = String(text || '').replace(
    /\b\d+(\.\d+)?\s*(kg|g|grams?|ml|l|liters?|litres?|pcs?|pieces?|pack|packs|bottle|bottles|bag|bags|sachet|sachets)\b/gi,
    ' '
  );
  return normalizeWhitespace(withoutUnits);
}

function normalizeCompanyFromName(name) {
  const cleaned = normalizeWhitespace(name);
  if (!cleaned) return 'Generic';
  const firstWord = cleaned.split(/\s+/)[0] || 'Generic';
  const lower = firstWord.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function normalizeCategoryFromSheetName(sheetName) {
  if (!sheetName) return 'General';
  let cleaned = sheetName.replace(/&/g, ' & ');
  cleaned = cleaned.replace(/([a-z])([A-Z])/g, '$1 $2');
  cleaned = cleaned.replace(/\s+/g, ' ');
  cleaned = cleaned.toLowerCase().trim();
  if (!cleaned) return 'General';
  return cleaned
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function parseInventoryFile() {
  if (!fs.existsSync(INVENTORY_FILE_PATH)) {
    throw new Error(`Inventory file not found at ${INVENTORY_FILE_PATH}`);
  }

  const workbook = xlsx.readFile(INVENTORY_FILE_PATH);

  const allProducts = [];
  let idCounter = 1;

  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) return;

    const category = normalizeCategoryFromSheetName(sheetName);

    const rawRows = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: '' });
    const headerIndex = rawRows.findIndex((row) =>
      Array.isArray(row) &&
      row.some((cell) => normalizeWhitespace(cell).toLowerCase() === 'product name')
    );

    if (headerIndex === -1) {
      // eslint-disable-next-line no-console
      console.warn(`[excelService] Skipping sheet "${sheetName}" because no header row was found.`);
      return;
    }

    const rows = xlsx.utils.sheet_to_json(sheet, { defval: '', range: headerIndex });

    rows.forEach((row) => {
      const rawName = row['Product Name'] || '';
      const rawQuantity = row['Quantity'] || 0;
      const rawPrice = row['Price'] || 0;

      const nameClean = normalizeWhitespace(rawName);
      if (!nameClean) {
        return;
      }

      const company = normalizeCompanyFromName(nameClean);

      const price = Number(rawPrice) || 0;
      const quantity = Number(rawQuantity) || 0;

      allProducts.push({
        id: idCounter++,
        name: nameClean,
        company,
        category,
        price,
        quantity
      });
    });
  });

  // Debug log – total and first sample
  // eslint-disable-next-line no-console
  console.log('[excelService] Parsed products count:', allProducts.length);
  if (allProducts.length > 0) {
    // eslint-disable-next-line no-console
    console.log('[excelService] Sample product:', allProducts[0]);
  }

  return allProducts;
}

export function getProducts() {
  const now = Date.now();
  if (productsCache && now - lastLoadedAt < CACHE_TTL_MS) {
    return productsCache;
  }

  const parsed = parseInventoryFile();
  productsCache = parsed;
  lastLoadedAt = now;
  return parsed;
}

