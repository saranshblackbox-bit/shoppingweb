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
import type { Order } from '@/lib/data';
import { useOrders } from '@/context/order-context';


export default function AdminOrdersPage() {
  const { orders, isLoading } = useOrders();

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
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium truncate" style={{maxWidth: '100px'}}>{order.id}</TableCell>
                   <TableCell className="font-medium">{order.customerName}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>₹{order.total.toFixed(2)}</TableCell>
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
