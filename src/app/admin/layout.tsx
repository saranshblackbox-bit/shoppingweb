'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import {
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Home, Package, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { OrderProvider } from '@/context/order-context';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get('role') === 'admin';

  useEffect(() => {
    if (!isAdmin) {
      router.push('/');
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return <div>Loading access...</div>;
  }
  
  const getAdminLink = (path: string) => `${path}?role=admin`;

  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1 container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
            <aside>
              <nav>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === '/admin'}>
                      <Link href={getAdminLink("/admin")}><Home className="mr-2" />Dashboard</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/products')}>
                      <Link href={getAdminLink("/admin/products")}><Package className="mr-2" />Products</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/orders')}>
                      <Link href={getAdminLink("/admin/orders")}><ShoppingCart className="mr-2" />Orders</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </nav>
            </aside>
            <main>{children}</main>
          </div>
        </div>
        <SiteFooter />
      </div>
    </SidebarProvider>
  );
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <OrderProvider>
          <AdminLayoutContent>{children}</AdminLayoutContent>
        </OrderProvider>
    </Suspense>
  );
}
