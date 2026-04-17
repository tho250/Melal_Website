import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart, X, Tag, ArrowUpDown, Search, SlidersHorizontal, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const PLACEHOLDER_IMAGE =
  'https://images.pexels.com/photos/4397924/pexels-photo-4397924.jpeg?auto=compress&cs=tinysrgb&w=800';

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.04 * i, ease: [0.25, 0.1, 0.25, 1] }
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

  const { addItem, items: cartItems } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleAddToCart = (product) => {
    addItem({ id: product.id, name: product.name, imageUrl: product.imageUrl });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const activeFilterCount =
    selectedCompanies.length + selectedCategories.length + (debouncedSearch ? 1 : 0);
  const skeletonCount = 8;

  return (
    <div className="pb-12">
      {/* Page header */}
      <header className="sticky top-0 z-30 -mx-5 space-y-4 bg-white/80 px-5 pb-5 pt-1 backdrop-blur-xl dark:bg-slate-950/80 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Our Products
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Browse the latest inventory. Use filters to explore by brand, category, or price.
          </p>
        </div>

        {/* Filter bar */}
        <div className="card-base space-y-3 p-4">
          {/* Search + indicator row */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <label className="relative w-full md:max-w-sm">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, brands, categories…"
                className="input-base pl-10"
              />
            </label>
            <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>
                {activeFilterCount > 0
                  ? `${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''} active`
                  : 'No filters active'}
              </span>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setSelectedCategories([]);
                    setSelectedCompanies([]);
                  }}
                  className="ml-1 font-semibold text-brand hover:text-brand-dark"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Category + Company chips */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-1.5">
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
                    className={`chip ${active ? 'chip-active' : 'chip-inactive'}`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-1.5">
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
                    className={`chip ${
                      active
                        ? 'bg-slate-900 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900'
                        : 'chip-inactive'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort row */}
          <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-3 text-xs dark:border-slate-800">
            <span className="mr-1 flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
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
                  className={`chip ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                      : 'chip-inactive'
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
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: skeletonCount }).map((_, idx) => (
            <div
              key={idx}
              className="card-base overflow-hidden"
            >
              <div className="aspect-[4/3] w-full animate-pulse bg-slate-100 dark:bg-slate-800" />
              <div className="flex flex-col gap-2.5 p-4">
                <div className="h-3 w-16 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
                <div className="h-4 w-32 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
                <div className="h-4 w-20 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
                <div className="mt-1 h-8 w-24 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product grid */}
      {!loading && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!error &&
            visibleProducts.map((product, idx) => (
              <motion.article
                key={product.id || product.name}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={cardVariants}
                className="card-base card-hover group overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setQuickViewProduct(product)}
                  className="block w-full text-left"
                >
                  <div className="relative overflow-hidden">
                    <div className="aspect-[4/3] w-full bg-slate-50 dark:bg-slate-800">
                      <img
                        src={product.imageUrl || PLACEHOLDER_IMAGE}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    {/* Category badge */}
                    <span className="absolute left-3 top-3 rounded-lg bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-700 shadow-sm backdrop-blur-sm dark:bg-slate-900/90 dark:text-slate-300">
                      {product.category || 'Uncategorised'}
                    </span>

                  </div>
                  <div className="flex flex-col p-4">
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {product.name}
                    </h2>

                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-base font-bold text-slate-900 dark:text-white">
                        {Number.isFinite(product.price)
                          ? `RWF ${product.price.toLocaleString()}`
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                </button>
                <div className="px-4 pb-4">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className={`inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                      addedId === product.id
                        ? 'bg-brand text-white'
                        : 'bg-brand/10 text-brand hover:bg-brand hover:text-white'
                    }`}
                  >
                    {addedId === product.id ? (
                      <><Check className="h-3.5 w-3.5" /> Added!</>
                    ) : (
                      <><Plus className="h-3.5 w-3.5" /> Add to Cart</>
                    )}
                  </button>
                </div>
              </motion.article>
            ))}

          {!error && visibleProducts.length === 0 && (
            <div className="col-span-full card-base px-8 py-14 text-center">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                No products match your current filters.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategories([]);
                  setSelectedCompanies([]);
                }}
                className="mt-3 text-xs font-semibold text-brand hover:text-brand-dark hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {error && (
            <div className="col-span-full rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
              {error}
            </div>
          )}
        </div>
      )}

      {/* Quick-view modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative max-w-lg overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft-xl dark:border-slate-700 dark:bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setQuickViewProduct(null)}
                className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/90 text-slate-600 shadow-sm backdrop-blur-sm transition hover:bg-white hover:text-slate-900 dark:bg-slate-800/90 dark:text-slate-300"
                aria-label="Close quick view"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="grid gap-5 p-5 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-start">
                <div className="overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                  <img
                    src={quickViewProduct.imageUrl || PLACEHOLDER_IMAGE}
                    alt={quickViewProduct.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-3 text-sm">
                  <span className="inline-block rounded-lg bg-brand/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand">
                    {quickViewProduct.category || 'Uncategorised'}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                    {quickViewProduct.name}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Company:{' '}
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {quickViewProduct.company}
                    </span>
                  </p>

                  <p className="text-xl font-bold text-brand">
                    {Number.isFinite(quickViewProduct.price)
                      ? `RWF ${quickViewProduct.price.toLocaleString()}`
                      : 'Price on request'}
                  </p>
                  <button
                    type="button"
                    onClick={() => { handleAddToCart(quickViewProduct); setQuickViewProduct(null); }}
                    className="w-full rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-dark"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
