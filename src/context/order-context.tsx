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

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<OrderType[]>(mockOrders);
  const [isLoading, setIsLoading] = useState(false);

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
