'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Order as OrderType } from '@/lib/data';
import { orders as mockOrders } from '@/lib/data';
import { v4 as uuidv4 } from 'uuid';


type OrderContextType = {
  orders: OrderType[];
  addOrder: (order: Omit<OrderType, 'id'>) => OrderType;
  isLoading: boolean;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}

const getInitialOrders = (): OrderType[] => {
    if (typeof window === 'undefined') {
        return mockOrders;
    }
    try {
        const item = window.localStorage.getItem('orders');
        return item ? JSON.parse(item) : mockOrders;
    } catch (error) {
        console.warn(`Error reading localStorage key “orders”:`, error);
        return mockOrders;
    }
};

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    // This prevents hydration mismatch.
    setOrders(getInitialOrders());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // This effect saves to localStorage whenever orders change, but only on the client.
    if (typeof window !== 'undefined' && !isLoading) {
        try {
            window.localStorage.setItem('orders', JSON.stringify(orders));
        } catch (error) {
            console.warn(`Error setting localStorage key “orders”:`, error);
        }
    }
  }, [orders, isLoading]);
  
  const addOrder = (orderData: Omit<OrderType, 'id'>): OrderType => {
    const newOrder: OrderType = {
      ...orderData,
      id: uuidv4(),
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);
    return newOrder;
  };

  const value = {
    orders,
    addOrder,
    isLoading,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}
