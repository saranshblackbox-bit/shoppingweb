'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Product } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  // Potentially add more functions here like removeFromCart, updateQuantity etc.
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        // If item exists, you might want to increase quantity instead
        // For this simple case, we'll just notify it's already there
        toast({
          title: 'Already in cart',
          description: `${product.name} is already in your cart.`,
        });
        return prevItems;
      }
      toast({
        title: 'Added to cart',
        description: `${product.name} has been added to your cart.`,
      });
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const value = {
    cartItems,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
