'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Order } from '@/lib/data';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id'>) => Order | undefined;
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
  const { user } = useUser();
  const firestore = useFirestore();
  const [orders, setOrders] = useState<Order[]>([]);

  const ordersCollection = useMemoFirebase(
    () => (user && firestore ? collection(firestore, `users/${user.uid}/orders`) : null),
    [user, firestore]
  );

  const { data, isLoading } = useCollection<Order>(ordersCollection);

  useEffect(() => {
    if (data) {
      const formattedOrders = data.map(o => ({
        ...o,
        id: o.id,
        date: new Date(o.date).toISOString().split('T')[0],
      }));
      setOrders(formattedOrders);
    }
  }, [data]);
  
  const addOrder = (order: Omit<Order, 'id'>) => {
    // This function will now be handled by writing directly to Firestore in the checkout page
    // We can keep this for local state updates if needed, but it's less critical now.
    return undefined;
  };

  const value = {
    orders,
    addOrder,
    isLoading,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}
