import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ChatWidget } from '@/components/chat-widget';
import { CartProvider } from '@/context/cart-context';
import { OrderProvider } from '@/context/order-context';
import { ProductProvider } from '@/context/product-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProductProvider>
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
    </ProductProvider>
  );
}
