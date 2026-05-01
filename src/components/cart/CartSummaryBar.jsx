import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext.jsx';

export function CartSummaryBar({ onOpenCart }) {
  const { totalItems, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
          className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
        >
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-3 rounded-full bg-emerald-600 px-5 py-3 shadow-[0_8px_30px_-8px_rgba(5,150,105,0.75)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-[0_12px_36px_-8px_rgba(5,150,105,0.85)] dark:bg-emerald-500 dark:hover:bg-emerald-400"
          >
            {/* Item count badge */}
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/25 text-xs font-bold text-white">
              {totalItems}
            </span>

            <span className="text-sm font-semibold text-white">View Cart</span>

            {totalPrice > 0 && (
              <>
                <span className="h-3.5 w-px bg-white/30" />
                <span className="text-sm font-bold text-white">
                  RWF {totalPrice.toLocaleString()}
                </span>
              </>
            )}

            <ShoppingCart className="h-4 w-4 text-white/75" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
