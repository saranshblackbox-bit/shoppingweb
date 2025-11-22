import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrderConfirmationPage() {
  return (
    <div className="container mx-auto max-w-2xl py-24 px-4 sm:px-6 lg:px-8">
      <Card className="text-center">
        <CardHeader className="py-8">
            <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
            <CardTitle className="mt-4 font-headline text-3xl text-primary">
                Thank You For Your Order!
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pb-8">
            <p className="text-muted-foreground">
                Your order has been successfully placed. You will receive an email confirmation shortly.
            </p>
            <p className="text-sm text-muted-foreground">
                Order #BHARAT-006
            </p>
            <div className="flex justify-center gap-4 pt-4">
                <Button asChild>
                    <Link href="/dashboard">Continue Shopping</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/my-orders">View My Orders</Link>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
