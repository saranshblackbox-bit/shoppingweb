import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ChatWidget } from '@/components/chat-widget';
import { CartProvider } from '@/context/cart-context';
import { OrderProvider } from '@/context/order-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OrderProvider>
      <CartProvider>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <ChatWidget />
          <SiteFooter />
        </div>
      </CartProvider>
    </OrderProvider>
  );
}
