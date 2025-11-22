'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Order } from '@/lib/data';
import { orders as initialOrders } from '@/lib/data';

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id'>) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const addOrder = (order: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      ...order,
      id: `ord-${String(orders.length + 1).padStart(3, '0')}`,
    };
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
  };

  const value = {
    orders,
    addOrder,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}
