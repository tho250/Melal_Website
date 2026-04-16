import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart, X, Tag, ArrowUpDown } from 'lucide-react';

const PLACEHOLDER_IMAGE =
  'https://images.pexels.com/photos/4397924/pexels-photo-4397924.jpeg?auto=compress&cs=tinysrgb&w=800';

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.04 * i, ease: 'easeOut' }
  })
};

export function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('asc');
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadProducts() {
      try {
        setLoading(true);
        setError('');
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products.');
        }
        const data = await res.json();
        if (isMounted) {
          // eslint-disable-next-line no-console
          console.log('[ProductsPage] Fetched products:', data.products);
          setProducts(data.products || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load products.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search.trim().toLowerCase()), 200);
    return () => clearTimeout(id);
  }, [search]);

  const companies = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.company) set.add(String(p.company).toLowerCase().trim());
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.category) set.add(String(p.category).toLowerCase().trim());
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const visibleProducts = useMemo(() => {
    let result = [...products];

    const companyFilters = selectedCompanies.map((c) => c.toLowerCase().trim());
    const categoryFilters = selectedCategories.map((c) => c.toLowerCase().trim());

    if (companyFilters.length > 0) {
      result = result.filter(
        (p) =>
          p.company &&
          companyFilters.includes(String(p.company).toLowerCase().trim())
      );
    }

    if (categoryFilters.length > 0) {
      result = result.filter(
        (p) =>
          p.category &&
          categoryFilters.includes(String(p.category).toLowerCase().trim())
      );
    }

    if (debouncedSearch) {
      result = result.filter((p) => {
        const target = `${p.name || ''} ${p.company || ''} ${p.category || ''}`
          .toLowerCase()
          .trim();
        return target.includes(debouncedSearch);
      });
    }

    if (sort) {
      result = [...result].sort((a, b) => {
        const av = a[sort];
        const bv = b[sort];
        const direction = order === 'desc' ? -1 : 1;

        if (av == null && bv == null) return 0;
        if (av == null) return 1;
        if (bv == null) return -1;

        if (typeof av === 'number' && typeof bv === 'number') {
          return (av - bv) * direction;
        }

        const aStr = String(av).toLowerCase();
        const bStr = String(bv).toLowerCase();
        if (aStr < bStr) return -1 * direction;
        if (aStr > bStr) return 1 * direction;
        return 0;
      });
    }

    return result;
  }, [products, selectedCompanies, selectedCategories, debouncedSearch, sort, order]);

  const skeletonCount = 8;

  return (
    <div className="pb-8">
      <header className="sticky top-0 z-30 space-y-4 bg-slate-50/80 pb-4 backdrop-blur-md dark:bg-slate-950/80">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Products at Boutique La Différence
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Browse the latest inventory across all categories. Tap filters to explore by brand,
            shelf, or budget.
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-3xl border border-slate-100 bg-white/70 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-xs">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by product, company, or category..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-0 transition focus:border-brand focus:ring-2 focus:ring-brand/30 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <Tag className="h-3.5 w-3.5" />
              <span>Tap categories and brands to refine your view. Multiple selections are allowed.</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => {
                const active = selectedCategories.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() =>
                      setSelectedCategories((prev) =>
                        prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
                      )
                    }
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition ${
                      active
                        ? 'bg-brand text-white shadow-soft'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>{c}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2">
              {companies.map((c) => {
                const label = c.charAt(0).toUpperCase() + c.slice(1);
                const active = selectedCompanies.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() =>
                      setSelectedCompanies((prev) =>
                        prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
                      )
                    }
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition ${
                      active
                        ? 'bg-slate-900 text-white shadow-soft dark:bg-slate-50 dark:text-slate-900'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 pt-2 text-xs dark:border-slate-800">
            <span className="mr-1 flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <ArrowUpDown className="h-3.5 w-3.5" />
              Sort:
            </span>
            {[
              { key: '', label: 'Default' },
              { key: 'price-asc', label: 'Price ↑' },
              { key: 'price-desc', label: 'Price ↓' },
              { key: 'company-asc', label: 'Company A–Z' },
              { key: 'company-desc', label: 'Company Z–A' }
            ].map((opt) => {
              const isActive = sort ? `${sort}-${order}` === opt.key : opt.key === '';
              return (
                <button
                  key={opt.key || 'default'}
                  type="button"
                  onClick={() => {
                    if (!opt.key) {
                      setSort('');
                      setOrder('asc');
                    } else {
                      const [nextSort, nextOrder] = opt.key.split('-');
                      setSort(nextSort);
                      setOrder(nextOrder);
                    }
                  }}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 transition ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Loading skeletons */}
      {loading && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: skeletonCount }).map((_, idx) => (
            <div
              key={idx}
              className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white/60 text-sm shadow-sm ring-1 ring-slate-100/70 dark:border-slate-800 dark:bg-slate-900/80 dark:ring-slate-800"
            >
              <div className="aspect-[4/3] w-full animate-pulse bg-slate-200/80 dark:bg-slate-800" />
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="h-3 w-20 animate-pulse rounded-full bg-slate-200/80 dark:bg-slate-800" />
                <div className="h-4 w-32 animate-pulse rounded-full bg-slate-200/80 dark:bg-slate-800" />
                <div className="h-4 w-16 animate-pulse rounded-full bg-slate-200/80 dark:bg-slate-800" />
                <div className="mt-2 h-7 w-24 animate-pulse rounded-full bg-slate-200/80 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Masonry layout */}
      {!loading && (
        <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {!loading &&
          !error &&
          visibleProducts.map((product, idx) => (
            <motion.article
              key={product.id || product.name}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="mb-4 inline-block w-full break-inside-avoid overflow-hidden rounded-3xl border border-slate-100 bg-white/70 text-sm shadow-sm ring-1 ring-slate-100/70 transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900/80 dark:ring-slate-800"
            >
              <button
                type="button"
                onClick={() => setQuickViewProduct(product)}
                className="group block text-left"
              >
                <div className="relative">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={product.imageUrl || PLACEHOLDER_IMAGE}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
                    {product.category || 'Uncategorised'}
                  </p>
                  <h2 className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Quantity in stock:{' '}
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      {Number.isFinite(product.quantity) ? product.quantity : '—'}
                    </span>
                  </p>
                  <p className="mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-300">
                    {Number.isFinite(product.price)
                      ? `RWF ${product.price.toLocaleString()}`
                      : 'N/A'}
                  </p>
                </div>
              </button>
            </motion.article>
          ))}

       {!loading && !error && visibleProducts.length === 0 && (
          <div className="rounded-3xl border border-slate-100 bg-white/70 px-6 py-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <p className="font-medium text-slate-700 dark:text-slate-100">
            No products match your current filters.
          </p>
          <button 
            onClick={() => { setSearch(''); setSelectedCategories([]); setSelectedCompanies([]); }}
            className="mt-4 text-xs font-semibold text-emerald-500 hover:underline"
          >
            Clear all filters
          </button>
        </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </div>
        )}
      </div>
      )}
      {/* Quick-view modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="glass-panel relative max-w-lg overflow-hidden p-4"
            >
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/70 text-slate-100 shadow-sm transition hover:bg-slate-800"
                aria-label="Close quick view"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-start">
                <div className="overflow-hidden rounded-2xl bg-slate-900">
                  <img
                    src={quickViewProduct.imageUrl || PLACEHOLDER_IMAGE}
                    alt={quickViewProduct.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-3 text-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
                    {quickViewProduct.category || 'Uncategorised'}
                  </p>
                  <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                    {quickViewProduct.name}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Company:{' '}
                    <span className="font-medium text-slate-800 dark:text-slate-100">
                      {quickViewProduct.company}
                    </span>
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Quantity in stock:{' '}
                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                      {Number.isFinite(quickViewProduct.quantity)
                        ? quickViewProduct.quantity
                        : '—'}
                    </span>
                  </p>
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">
                    {Number.isFinite(quickViewProduct.price)
                      ? `RWF ${quickViewProduct.price.toLocaleString()}`
                      : 'Price on request'}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    For real orders and delivery options, contact the store directly via phone or
                    WhatsApp.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

