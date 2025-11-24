'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, getDocs, collectionGroup } from 'firebase/firestore';
import type { Order } from '@/lib/data';
import { useEffect, useState } from 'react';

export default function AdminOrdersPage() {
  const firestore = useFirestore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!firestore) return;
    
    const fetchOrders = async () => {
      setIsLoading(true);
      const ordersQuery = query(collectionGroup(firestore, 'orders'), orderBy('orderDate', 'desc'));
      const querySnapshot = await getDocs(ordersQuery);
      const allOrders = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Order));
      setOrders(allOrders);
      setIsLoading(false);
    };

    fetchOrders();
  }, [firestore]);


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">All Customer Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <p>Loading orders...</p>}
        {!isLoading && orders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium truncate" style={{maxWidth: '100px'}}>{order.id}</TableCell>
                   <TableCell className="font-medium truncate" style={{maxWidth: '100px'}}>{order.customerId}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === 'Delivered'
                          ? 'default'
                          : order.status === 'Cancelled'
                          ? 'destructive'
                          : 'secondary'
                      }
                      className={cn(
                        order.status === 'Delivered' && 'bg-green-700/80 text-white'
                      )}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          !isLoading && <div className="text-center py-8">
            <p className="text-muted-foreground">No orders have been placed yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
