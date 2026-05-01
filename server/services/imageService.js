function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s&-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasAny(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

function determineImageCategory(product) {
  const name = normalizeText(product?.name);
  const category = normalizeText(product?.category);

  if (hasAny(category, ['drink', 'beverage'])) {
    return 'beverage';
  }

  if (hasAny(category, ['snack', 'biscuit', 'cookie', 'chocolate', 'sweet'])) {
    return 'snack';
  }

  if (hasAny(name, ['drink', 'cola', 'water', 'juice', 'soda', 'milk', 'energy', 'tonic'])) {
    return 'beverage';
  }

  if (hasAny(name, ['biscuit', 'cookie', 'chips', 'crisps', 'chocolate', 'nuts', 'sweet', 'candy'])) {
    return 'snack';
  }

  return 'general';
}

function determineBeverageType(name) {
  if (hasAny(name, ['water', 'eau', 'nil'])) return 'water-bottle';
  if (hasAny(name, ['milk'])) return 'milk-carton';
  if (hasAny(name, ['energy', 'tonic', 'champ'])) return 'energy-can';
  if (hasAny(name, ['syrup'])) return 'syrup-bottle';

  if (
    hasAny(name, [
      'cola',
      'cocacola',
      'pepsi',
      'sprite',
      'fanta',
      'mirinda',
      'mountain dew',
      'dew',
      'soda'
    ])
  ) {
    return 'soda-bottle';
  }

  if (
    hasAny(name, [
      'juice',
      'smoothie',
      'mango',
      'apple',
      'orange',
      'passion',
      'berry',
      'fruticana',
      'delmonte',
      'sun sip',
      'inyange',
      'ambiance',
      'kalungi',
      'savanah'
    ])
  ) {
    return 'juice-bottle';
  }

  return 'beverage-bottle';
}

function determineSnackType(name) {
  if (hasAny(name, ['pringles', 'chips', 'crisps'])) return 'chips-can';

  if (hasAny(name, ['chocolate', 'cadbury', 'bubbly', 'bournville', 'fullbar'])) {
    return 'chocolate-bar';
  }

  if (hasAny(name, ['nuts', 'groundnut', 'cashew', 'almond', 'macadamia', 'sesame'])) {
    return 'nuts-pack';
  }

  if (hasAny(name, ['sweet', 'mint', 'candy', 'toffee'])) {
    return 'candy-pack';
  }

  if (hasAny(name, ['donut', 'cake'])) {
    return 'pastry-pack';
  }

  if (
    hasAny(name, [
      'biscuit',
      'cookie',
      'cookies',
      'digestive',
      'cracker',
      'shortcake',
      'beurre',
      'marie'
    ])
  ) {
    return 'biscuit-pack';
  }

  return 'snack-pack';
}

function determineImageType(product, imageCategory) {
  const name = normalizeText(product?.name);

  if (imageCategory === 'beverage') {
    return determineBeverageType(name);
  }

  if (imageCategory === 'snack') {
    return determineSnackType(name);
  }

  return 'general-box';
}

function shapeForImageType(imageType) {
  switch (imageType) {
    case 'soda-bottle':
      return '<g fill="#1f2937" opacity="0.95"><path d="M224 92c0-11 9-20 20-20h24c11 0 20 9 20 20v34c0 6 2 12 6 17l8 11c5 7 8 15 8 24v236c0 22-18 40-40 40h-28c-22 0-40-18-40-40V178c0-9 3-17 8-24l8-11c4-5 6-11 6-17V92z"/></g>';
    case 'water-bottle':
      return '<g fill="#111827" opacity="0.9"><path d="M236 94c0-12 10-22 22-22h12c12 0 22 10 22 22v26c0 7 2 13 6 18l10 12c8 10 12 22 12 35v227c0 24-19 43-43 43h-26c-24 0-43-19-43-43V185c0-13 4-25 12-35l10-12c4-5 6-11 6-18V94z"/></g>';
    case 'juice-bottle':
      return '<g fill="#1f2937" opacity="0.92"><rect x="218" y="88" width="92" height="370" rx="42"/><rect x="240" y="66" width="48" height="26" rx="8"/></g>';
    case 'milk-carton':
      return '<g fill="#111827" opacity="0.9"><path d="M192 132l70-54 70 54v308H192V132z"/><path d="M262 78v68" stroke="#111827" stroke-width="20"/><line x1="192" y1="132" x2="332" y2="132" stroke="#0f172a" stroke-width="12"/></g>';
    case 'energy-can':
      return '<g fill="#1f2937" opacity="0.94"><rect x="218" y="80" width="96" height="380" rx="26"/><rect x="232" y="94" width="68" height="12" rx="6" fill="#334155"/></g>';
    case 'syrup-bottle':
      return '<g fill="#111827" opacity="0.92"><path d="M224 118c0-14 12-26 26-26h32c14 0 26 12 26 26v24c0 8 2 15 7 21l10 13c7 9 11 20 11 31v208c0 22-18 40-40 40h-60c-22 0-40-18-40-40V207c0-11 4-22 11-31l10-13c5-6 7-13 7-21v-24z"/></g>';
    case 'chips-can':
      return '<g fill="#111827" opacity="0.94"><rect x="210" y="90" width="110" height="360" rx="20"/><ellipse cx="265" cy="90" rx="55" ry="12" fill="#334155"/></g>';
    case 'biscuit-pack':
      return '<g fill="#1f2937" opacity="0.92"><rect x="176" y="160" width="178" height="252" rx="24"/><rect x="168" y="140" width="194" height="42" rx="14" fill="#111827"/></g>';
    case 'chocolate-bar':
      return '<g fill="#111827" opacity="0.94"><rect x="182" y="150" width="166" height="266" rx="16"/><line x1="215" y1="182" x2="215" y2="396" stroke="#334155" stroke-width="10"/><line x1="248" y1="182" x2="248" y2="396" stroke="#334155" stroke-width="10"/><line x1="281" y1="182" x2="281" y2="396" stroke="#334155" stroke-width="10"/></g>';
    case 'nuts-pack':
      return '<g fill="#1f2937" opacity="0.92"><path d="M186 180c0-20 16-36 36-36h86c20 0 36 16 36 36v236c0 22-18 40-40 40h-78c-22 0-40-18-40-40V180z"/><rect x="196" y="146" width="148" height="34" rx="12" fill="#0f172a"/></g>';
    case 'candy-pack':
      return '<g fill="#111827" opacity="0.9"><path d="M170 238l48-56h94l48 56-28 180c-3 22-22 38-44 38h-46c-22 0-41-16-44-38l-28-180z"/></g>';
    case 'pastry-pack':
      return '<g fill="#1f2937" opacity="0.92"><rect x="174" y="178" width="182" height="238" rx="30"/><circle cx="264" cy="252" r="34" fill="#334155"/></g>';
    default:
      return '<g fill="#1f2937" opacity="0.9"><rect x="186" y="170" width="156" height="248" rx="24"/><rect x="214" y="134" width="100" height="44" rx="12" fill="#111827"/></g>';
  }
}

function paletteForCategory(imageCategory) {
  switch (imageCategory) {
    case 'beverage':
      return {
        bgTop: '#f1f5f9',
        bgBottom: '#dbeafe',
        ground: '#93c5fd'
      };
    case 'snack':
      return {
        bgTop: '#fef3c7',
        bgBottom: '#fde68a',
        ground: '#f59e0b'
      };
    default:
      return {
        bgTop: '#f3f4f6',
        bgBottom: '#e5e7eb',
        ground: '#9ca3af'
      };
  }
}

function buildShadowFigureSvg({ imageCategory, imageType }) {
  const palette = paletteForCategory(imageCategory);
  const silhouette = shapeForImageType(imageType);

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 530 530" role="img" aria-label="${imageType}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${palette.bgTop}"/>
      <stop offset="100%" stop-color="${palette.bgBottom}"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="160%">
      <feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#0f172a" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="530" height="530" fill="url(#bg)"/>
  <ellipse cx="265" cy="454" rx="150" ry="24" fill="${palette.ground}" opacity="0.45"/>
  <g filter="url(#softShadow)">
    ${silhouette}
  </g>
</svg>`.trim();
}

function svgToDataUri(svg) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function getProductImageProfile(product) {
  const imageCategory = determineImageCategory(product);
  const imageType = determineImageType(product, imageCategory);

  return {
    imageCategory,
    imageType
  };
}

export function getShadowFigureImageForProduct(product) {
  const profile = getProductImageProfile(product);
  const svg = buildShadowFigureSvg(profile);
  return {
    ...profile,
    imageUrl: svgToDataUri(svg)
  };
}

export function enrichProductsWithShadowImages(products) {
  if (!Array.isArray(products)) return [];

  return products.map((product) => {
    const image = getShadowFigureImageForProduct(product);

    return {
      ...product,
      imageCategory: image.imageCategory,
      imageType: image.imageType,
      imageUrl: image.imageUrl
    };
  });
}
