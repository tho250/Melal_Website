import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'bld-cart';

function loadCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* storage full – silently ignore */
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { id, name, imageUrl, price, costPrice } = action.payload;
      const existing = state.find((item) => item.id === id);
      if (existing) {
        return state.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...state, { id, name, imageUrl, price, costPrice, qty: 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.payload);
    case 'UPDATE_QTY':
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, qty: Math.max(1, action.payload.qty) }
          : item
      );
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, null, loadCart);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem = (product) =>
    dispatch({ type: 'ADD_ITEM', payload: product });

  const removeItem = (id) =>
    dispatch({ type: 'REMOVE_ITEM', payload: id });

  const updateQty = (id, qty) =>
    dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });

  const clearCart = () => dispatch({ type: 'CLEAR' });

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + (Number(i.price) || 0) * i.qty, 0);
  const totalCost = items.reduce((sum, i) => sum + (Number(i.costPrice) || 0) * i.qty, 0);
  const totalProfit = totalPrice - totalCost;

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice, totalProfit }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
